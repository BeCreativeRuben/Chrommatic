/**
 * Carousel
 * - variant="step": multi-image slider with arrows + autoplay
 * - variant="continuous": smooth marquee-style infinite scroll
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LazyImage from "./LazyImage";

function clampIndex(next, length) {
  if (length <= 0) return 0;
  return ((next % length) + length) % length;
}

function CarouselContinuous({ images, className = "", marqueeDurationMs = 40000 }) {
  const [paused, setPaused] = useState(false);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const rafRef = useRef(0);
  const lastTsRef = useRef(0);
  const offsetRef = useRef(0);
  const setWidthRef = useRef(0);

  const GAP_PX = 16; // tailwind gap-4
  const PADDING_PX = 16; // tailwind p-4

  const doubled = useMemo(() => [...images, ...images], [images]);
  const [layout, setLayout] = useState({ slidesPerView: 1, cardWidthPx: 0 });

  if (images.length === 0) return null;

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const measure = () => {
      const width = viewport.getBoundingClientRect().width;
      const innerWidth = Math.max(0, width - PADDING_PX * 2);

      // Match the previous "1 / 2 / 3 cards" look
      const slidesPerView = width >= 1024 ? 3 : width >= 640 ? 2 : 1;
      const gaps = GAP_PX * (slidesPerView - 1);
      const cardWidthPx = Math.max(180, Math.floor((innerWidth - gaps) / slidesPerView));

      setLayout({ slidesPerView, cardWidthPx });
      setWidthRef.current = Math.max(0, images.length * (cardWidthPx + GAP_PX) - GAP_PX);

      // Keep offset within bounds after resize
      if (setWidthRef.current > 0) {
        offsetRef.current = ((offsetRef.current % setWidthRef.current) + setWidthRef.current) % setWidthRef.current;
      } else {
        offsetRef.current = 0;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }
    };

    measure();

    const ro = new ResizeObserver(() => measure());
    ro.observe(viewport);
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [images.length]);

  useEffect(() => {
    // Continuous animation (no "steps")
    if (images.length <= 1) return;
    if (!trackRef.current) return;

    const tick = (ts) => {
      if (!lastTsRef.current) lastTsRef.current = ts;
      const dt = ts - lastTsRef.current;
      lastTsRef.current = ts;

      const setWidth = setWidthRef.current;
      if (!paused && setWidth > 0) {
        const pxPerMs = setWidth / Math.max(1, marqueeDurationMs);
        offsetRef.current += pxPerMs * dt;
        // wrap
        if (offsetRef.current >= setWidth) offsetRef.current -= setWidth;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      lastTsRef.current = 0;
    };
  }, [paused, images.length, marqueeDurationMs]);

  const stepByOne = (dir) => {
    const setWidth = setWidthRef.current;
    if (!setWidth) return;
    const step = layout.cardWidthPx > 0 ? layout.cardWidthPx + GAP_PX : 300;
    offsetRef.current = ((offsetRef.current + dir * step) % setWidth + setWidth) % setWidth;
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
    }
  };

  return (
    <div
      className={`relative w-full ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") stepByOne(-1);
        if (e.key === "ArrowRight") stepByOne(1);
      }}
      aria-label="Photo carousel"
    >
      <div
        ref={viewportRef}
        className="relative w-full rounded-2xl overflow-hidden border border-red-900/40 shadow-2xl bg-black/40"
      >
        <div className="w-full" style={{ aspectRatio: "16 / 9" }}>
          <div
            ref={trackRef}
            className="absolute inset-0 flex gap-4 p-4 will-change-transform"
          >
            {doubled.map((img, i) => {
              // Map back to original index (doubled array wraps)
              const originalIndex = i % images.length;
              return (
                <div
                  key={`${img?.src || "img"}-${i}`}
                  className="flex-none h-full rounded-xl overflow-hidden border border-red-900/30 bg-black/60 shadow-lg"
                  style={{ width: layout.cardWidthPx || undefined }}
                >
                  <LazyImage
                    src={img?.src}
                    alt={img?.alt || "Carousel image"}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    draggable={false}
                    imageGroup={images}
                    currentIndex={originalIndex}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Gradient edges for aesthetic */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
      </div>
    </div>
  );
}

function CarouselStep({ images, className = "", autoAdvanceMs = 7000 }) {
  const safeImages = images;

  const [paused, setPaused] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [stridePx, setStridePx] = useState(0);
  const [withTransition, setWithTransition] = useState(true);

  const viewportRef = useRef(null);
  const firstRef = useRef(null);
  const secondRef = useRef(null);

  // We render clones on both sides for a seamless loop.
  const headClones = useMemo(
    () => (safeImages.length > 0 ? safeImages.slice(-slidesPerView) : []),
    [safeImages, slidesPerView]
  );
  const tailClones = useMemo(
    () => (safeImages.length > 0 ? safeImages.slice(0, slidesPerView) : []),
    [safeImages, slidesPerView]
  );
  const extendedImages = useMemo(
    () => [...headClones, ...safeImages, ...tailClones],
    [headClones, safeImages, tailClones]
  );

  const baseIndex = slidesPerView; // first "real" slide in the extended array
  const [index, setIndex] = useState(baseIndex);

  useEffect(() => {
    // Re-align index when slidesPerView changes or images change
    setWithTransition(false);
    setIndex(baseIndex);
    const t = setTimeout(() => setWithTransition(true), 0);
    return () => clearTimeout(t);
  }, [baseIndex, safeImages.length]);

  useEffect(() => {
    if (!viewportRef.current) return;

    const measure = () => {
      const viewport = viewportRef.current;
      if (!viewport) return;

      const viewportWidth = viewport.getBoundingClientRect().width;
      const a = firstRef.current?.getBoundingClientRect();
      const b = secondRef.current?.getBoundingClientRect();

      // stride = distance between the first two cards (includes gap)
      let stride = 0;
      if (a && b) stride = Math.max(1, b.left - a.left);
      else if (a) stride = Math.max(1, a.width);

      if (stride > 0) {
        setStridePx(stride);
        const count = Math.max(1, Math.min(safeImages.length || 1, Math.floor(viewportWidth / stride)));
        setSlidesPerView(count);
      } else {
        setStridePx(0);
        setSlidesPerView(1);
      }
    };

    measure();

    const ro = new ResizeObserver(() => measure());
    ro.observe(viewportRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [safeImages.length]);

  useEffect(() => {
    if (paused) return;
    if (safeImages.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => i + 1);
    }, autoAdvanceMs);
    return () => clearInterval(id);
  }, [paused, safeImages.length, autoAdvanceMs]);

  useEffect(() => {
    // Preload next image
    if (safeImages.length <= 1) return;
    const realIndex = clampIndex(index - baseIndex, safeImages.length);
    const next = safeImages[clampIndex(realIndex + 1, safeImages.length)];
    if (!next?.src) return;
    const img = new Image();
    img.src = next.src;
  }, [index, safeImages, baseIndex]);

  const realIndex = safeImages.length > 0 ? clampIndex(index - baseIndex, safeImages.length) : 0;

  const goPrev = () => setIndex((i) => i - 1);
  const goNext = () => setIndex((i) => i + 1);

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
  };

  if (safeImages.length === 0) return null;

  const translateX = stridePx > 0 ? -index * stridePx : 0;

  const handleTrackTransitionEnd = () => {
    // If we moved into the tail clones, jump back to the real start without animation.
    if (safeImages.length <= 0) return;

    const firstReal = baseIndex;
    const lastReal = baseIndex + safeImages.length - 1;

    if (index > lastReal) {
      setWithTransition(false);
      setIndex(firstReal);
      const t = setTimeout(() => setWithTransition(true), 0);
      return () => clearTimeout(t);
    }

    if (index < firstReal) {
      setWithTransition(false);
      setIndex(lastReal);
      const t = setTimeout(() => setWithTransition(true), 0);
      return () => clearTimeout(t);
    }

    return undefined;
  };

  return (
    <div
      className={`relative w-full ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      tabIndex={0}
      onKeyDown={onKeyDown}
      aria-label="Photo carousel"
    >
      <div
        ref={viewportRef}
        className="relative w-full rounded-2xl overflow-hidden border border-red-900/40 shadow-2xl bg-black/40"
      >
        <div className="w-full" style={{ aspectRatio: "16 / 9" }}>
          <div
            className={[
              "absolute inset-0 flex gap-4 px-4 py-4",
              withTransition ? "transition-transform duration-700 ease-in-out" : "",
            ].join(" ")}
            style={{ transform: `translate3d(${translateX}px, 0, 0)` }}
            onTransitionEnd={handleTrackTransitionEnd}
          >
            {extendedImages.map((img, i) => {
              // Map back to original index (extended array has clones)
              // headClones: i < baseIndex -> map to last slidesPerView images
              // safeImages: baseIndex <= i < baseIndex + safeImages.length -> map to i - baseIndex
              // tailClones: i >= baseIndex + safeImages.length -> map to i - baseIndex - safeImages.length
              let originalIndex;
              if (i < baseIndex) {
                // Head clones (last slidesPerView images)
                originalIndex = safeImages.length - slidesPerView + i;
              } else if (i < baseIndex + safeImages.length) {
                // Real images
                originalIndex = i - baseIndex;
              } else {
                // Tail clones (first slidesPerView images)
                originalIndex = i - baseIndex - safeImages.length;
              }
              return (
                <div
                  key={`${img?.src || "img"}-${i}`}
                  ref={i === 0 ? firstRef : i === 1 ? secondRef : undefined}
                  className="flex-none w-full sm:w-[48%] lg:w-[32%] h-full rounded-xl overflow-hidden border border-red-900/30 bg-black/60 shadow-lg"
                >
                  <LazyImage
                    src={img?.src}
                    alt={img?.alt || "Carousel image"}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    draggable={false}
                    imageGroup={safeImages}
                    currentIndex={originalIndex}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Gradient edges for aesthetic */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>

        {/* Controls */}
        {safeImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 hover:border-white/20 text-white transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Previous photo"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 hover:border-white/20 text-white transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Next photo"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}

        {/* Counter */}
        {safeImages.length > 1 && (
          <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/60 border border-white/10 text-xs uppercase tracking-widest text-gray-200">
            {realIndex + 1} / {safeImages.length}
          </div>
        )}
      </div>
    </div>
  );
}

function Carousel({ images, className = "", autoAdvanceMs = 7000, variant = "step", marqueeDurationMs = 40000 }) {
  const safeImages = useMemo(() => images?.filter(Boolean) ?? [], [images]);

  if (variant === "continuous") {
    return <CarouselContinuous images={safeImages} className={className} marqueeDurationMs={marqueeDurationMs} />;
  }

  return <CarouselStep images={safeImages} className={className} autoAdvanceMs={autoAdvanceMs} />;
}

export default Carousel;

