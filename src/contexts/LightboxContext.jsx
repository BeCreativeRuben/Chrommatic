/**
 * LightboxContext
 * Global image lightbox for "click to enlarge".
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import Lightbox from "../components/ui/Lightbox";

const LightboxContext = createContext(null);

export function LightboxProvider({ children }) {
  const [active, setActive] = useState(null); // { src, alt }

  const open = useCallback(({ src, alt }) => {
    if (!src) return;
    setActive({ src, alt: alt || "" });
  }, []);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active, close]);

  const value = useMemo(
    () => ({
      isOpen: Boolean(active),
      active,
      open,
      close,
    }),
    [active, close, open]
  );

  return (
    <LightboxContext.Provider value={value}>
      {children}
      <Lightbox isOpen={Boolean(active)} src={active?.src} alt={active?.alt} onClose={close} />
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

