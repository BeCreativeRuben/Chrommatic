/**
 * LazyImage
 * - Uses IntersectionObserver to only set `src` when near viewport.
 * - Helps prevent browsers eagerly loading many carousel/gallery images at once.
 */

import { useEffect, useRef, useState } from "react";
import { useLightbox } from "../../contexts/LightboxContext";

const TRANSPARENT_PIXEL =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

function LazyImage({
  src,
  alt,
  className,
  draggable = false,
  loading = "lazy",
  rootMargin = "600px",
  lightbox = true,
  imageGroup,
  currentIndex,
  ...rest
}) {
  const ref = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const { open } = useLightbox();

  useEffect(() => {
    if (shouldLoad) return;
    const el = ref.current;
    if (!el) return;

    // If IO isn't supported, fall back to loading immediately.
    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          obs.disconnect();
        }
      },
      { root: null, rootMargin, threshold: 0.01 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin, shouldLoad]);

  return (
    <img
      ref={ref}
      src={shouldLoad ? src : TRANSPARENT_PIXEL}
      data-src={src}
      alt={alt}
      className={[className, lightbox ? "cursor-zoom-in" : ""].filter(Boolean).join(" ")}
      loading={loading}
      decoding="async"
      fetchPriority="low"
      draggable={draggable}
      onClick={
        lightbox
          ? (e) => {
              // Don't trigger lightbox when image is inside a link.
              const isInsideLink = e.currentTarget.closest("a");
              if (isInsideLink) return;
              // If imageGroup is provided, use group navigation
              if (imageGroup && Array.isArray(imageGroup) && imageGroup.length > 1) {
                open({ src, alt, imageGroup, currentIndex });
              } else {
                open({ src, alt });
              }
            }
          : undefined
      }
      role={lightbox ? "button" : undefined}
      tabIndex={lightbox ? 0 : undefined}
      onKeyDown={
        lightbox
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                // If imageGroup is provided, use group navigation
                if (imageGroup && Array.isArray(imageGroup) && imageGroup.length > 1) {
                  open({ src, alt, imageGroup, currentIndex });
                } else {
                  open({ src, alt });
                }
              }
            }
          : undefined
      }
      {...rest}
    />
  );
}

export default LazyImage;

