/**
 * LightboxContext
 * Global image lightbox for "click to enlarge".
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import Lightbox from "../components/ui/Lightbox";

const LightboxContext = createContext(null);

export function LightboxProvider({ children }) {
  const [active, setActive] = useState(null); // { src, alt, imageGroup, currentIndex }

  const open = useCallback(({ src, alt, imageGroup, currentIndex }) => {
    if (!src) return;
    // If imageGroup is provided and has multiple images, use group navigation
    if (imageGroup && Array.isArray(imageGroup) && imageGroup.length > 1) {
      const index = typeof currentIndex === "number" ? currentIndex : 
        imageGroup.findIndex(img => img?.src === src || img === src);
      setActive({ 
        src, 
        alt: alt || "", 
        imageGroup, 
        currentIndex: index >= 0 ? index : 0 
      });
    } else {
      // Single image mode
      setActive({ src, alt: alt || "" });
    }
  }, []);

  const close = useCallback(() => setActive(null), []);

  const goToNext = useCallback(() => {
    if (!active?.imageGroup || active.currentIndex === undefined) return;
    const nextIndex = (active.currentIndex + 1) % active.imageGroup.length;
    const nextImg = active.imageGroup[nextIndex];
    if (nextImg) {
      const src = typeof nextImg === "string" ? nextImg : nextImg?.src;
      const alt = typeof nextImg === "string" ? "" : (nextImg?.alt || "");
      setActive({ ...active, src, alt, currentIndex: nextIndex });
    }
  }, [active]);

  const goToPrevious = useCallback(() => {
    if (!active?.imageGroup || active.currentIndex === undefined) return;
    const prevIndex = (active.currentIndex - 1 + active.imageGroup.length) % active.imageGroup.length;
    const prevImg = active.imageGroup[prevIndex];
    if (prevImg) {
      const src = typeof prevImg === "string" ? prevImg : prevImg?.src;
      const alt = typeof prevImg === "string" ? "" : (prevImg?.alt || "");
      setActive({ ...active, src, alt, currentIndex: prevIndex });
    }
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        close();
      } else if (active.imageGroup && active.imageGroup.length > 1) {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          goToNext();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          goToPrevious();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active, close, goToNext, goToPrevious]);

  const value = useMemo(
    () => ({
      isOpen: Boolean(active),
      active,
      open,
      close,
      goToNext,
      goToPrevious,
      hasNext: active?.imageGroup && active.currentIndex !== undefined 
        ? active.currentIndex < active.imageGroup.length - 1 || active.imageGroup.length > 1
        : false,
      hasPrevious: active?.imageGroup && active.currentIndex !== undefined
        ? active.currentIndex > 0 || active.imageGroup.length > 1
        : false,
    }),
    [active, close, open, goToNext, goToPrevious]
  );

  return (
    <LightboxContext.Provider value={value}>
      {children}
      <Lightbox 
        isOpen={Boolean(active)} 
        src={active?.src} 
        alt={active?.alt} 
        onClose={close}
        imageGroup={active?.imageGroup}
        currentIndex={active?.currentIndex}
        onNext={goToNext}
        onPrevious={goToPrevious}
      />
    </LightboxContext.Provider>
  );
}

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) {
    throw new Error("useLightbox must be used within a LightboxProvider");
  }
  return ctx;
}

