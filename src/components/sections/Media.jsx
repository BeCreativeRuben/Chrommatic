/**
 * Media section component
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";
import Carousel from "../ui/Carousel";
import { carouselImages } from "../../data/carrouselImages";
import LazyImage from "../ui/LazyImage";

function Media() {
  const { language } = useLanguage();
  const t = translations[language].media || translations.nl.media;
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const circlesYouTubeUrl = "https://www.youtube.com/watch?v=g9ULqy29kZw";

  // Keep the moving carousel lightweight: show a subset (text says "small selection").
  const previewImages = useMemo(() => carouselImages.slice(0, 24), []);
  const allImages = useMemo(() => carouselImages, []);

  // Virtualize the "all photos" overlay: render in batches instead of all at once.
  const BATCH_SIZE = 24;
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (!showAllPhotos) return;
    setVisibleCount(BATCH_SIZE);
  }, [BATCH_SIZE, showAllPhotos]);

  useEffect(() => {
    if (!showAllPhotos) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showAllPhotos]);

  useEffect(() => {
    if (!showAllPhotos) return;
    if (visibleCount >= allImages.length) return;
    const el = loadMoreRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") return;

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setVisibleCount((c) => Math.min(allImages.length, c + BATCH_SIZE));
        }
      },
      { root: null, rootMargin: "1200px", threshold: 0.01 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [BATCH_SIZE, allImages.length, showAllPhotos, visibleCount]);

  return (
    <div className="max-w-6xl mx-auto text-center px-4">
      <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-widest font-display gradient-text">
        {t.title}
      </h2>

      {/* Photo carousel */}
      <div className="mt-12">
        <h3 className="text-2xl md:text-3xl font-bold mb-4 uppercase tracking-widest font-display text-red-400">
          {language === "nl" ? "Foto's" : "Photos"}
        </h3>
        <p className="text-gray-300 mb-6">
          {language === "nl"
            ? "Een kleine selectie live- en bandfoto’s."
            : "A small selection of live and band photos."}
        </p>
        <Carousel images={previewImages} variant="continuous" marqueeDurationMs={90000} />

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAllPhotos(true)}
            className="px-8 py-3 bg-black/40 hover:bg-black/60 border border-red-900/40 hover:border-red-500/60 text-white font-bold uppercase tracking-widest text-sm rounded-sm transition-all duration-300"
          >
            {language === "nl" ? "Bekijk alle foto's" : "View all photos"}
          </button>
        </div>
      </div>

      {/* Video clip */}
      <div className="mt-12">
        <p
          className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          role="link"
          tabIndex={0}
          aria-label={
            language === "nl"
              ? "Open de videoclip van Circles op YouTube (nieuwe tab)"
              : "Open the Circles music video on YouTube (new tab)"
          }
          onClick={() => {
            const w = window.open(circlesYouTubeUrl, "_blank", "noopener,noreferrer");
            if (w) w.opener = null;
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              const w = window.open(circlesYouTubeUrl, "_blank", "noopener,noreferrer");
              if (w) w.opener = null;
            }
          }}
        >
          {t.description} <strong className="text-red-400">Circles</strong>.
        </p>

        <div className="relative w-full max-w-5xl mx-auto rounded-lg overflow-hidden shadow-2xl border-2 border-red-900/30" style={{ aspectRatio: '16/9' }}>
          <iframe
            className="w-full h-full absolute inset-0"
            src="https://www.youtube.com/embed/g9ULqy29kZw"
            title="Chromattic - Circles (Official Video)"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            aria-label="Chromattic - Circles officiële videoclip"
          ></iframe>
        </div>
      </div>

      {/* "Detail page" overlay with masonry */}
      {showAllPhotos && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label={language === "nl" ? "Alle foto's" : "All photos"}
          onKeyDown={(e) => {
            if (e.key === "Escape") setShowAllPhotos(false);
          }}
          tabIndex={-1}
        >
          <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="flex items-center justify-between gap-4 mb-8">
              <div className="text-left">
                <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-widest font-display text-red-400">
                  {language === "nl" ? "Foto's" : "Photos"}
                </h3>
                <p className="text-gray-300 mt-2">
                  {language === "nl"
                    ? "Totaaloverzicht van alle foto’s."
                    : "Full overview of all photos."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAllPhotos(false)}
                className="p-3 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 hover:border-white/20 text-white transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label={language === "nl" ? "Sluiten" : "Close"}
              >
                <X size={22} />
              </button>
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
              {allImages.slice(0, visibleCount).map((img, i) => (
                <div key={`${img.src}-${i}`} className="mb-4 break-inside-avoid">
                  <div className="rounded-xl overflow-hidden border border-red-900/30 bg-black/60 shadow-lg">
                    <LazyImage
                      src={img.src}
                      alt={img.alt || "Photo"}
                      loading="lazy"
                      className="w-full h-auto block"
                    />
                  </div>
                </div>
              ))}
            </div>

            {visibleCount < allImages.length && (
              <div ref={loadMoreRef} className="h-10 w-full" aria-hidden="true" />
            )}

            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllPhotos(false)}
                className="px-8 py-3 bg-black/40 hover:bg-black/60 border border-red-900/40 hover:border-red-500/60 text-white font-bold uppercase tracking-widest text-sm rounded-sm transition-all duration-300"
              >
                {language === "nl" ? "Terug" : "Back"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Media;
