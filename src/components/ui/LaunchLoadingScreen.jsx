/**
 * Launch Loading Screen
 * Shown when countdown hits 0: centered loading screen with progress bar,
 * then reveals the website.
 */

import { useState, useEffect } from "react";
import { IMAGE_PATHS } from "../../utils/imagePaths";

const LOAD_DURATION_MS = 2500;
const TICK_MS = 50;
const FADE_OUT_MS = 500;

function LaunchLoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const value = Math.min(100, (elapsed / LOAD_DURATION_MS) * 100);
      setProgress(value);
      if (value >= 100) {
        clearInterval(interval);
        setFadeOut(true);
        const t = setTimeout(() => {
          if (onComplete) onComplete();
        }, FADE_OUT_MS);
        return () => clearTimeout(t);
      }
    }, TICK_MS);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-center px-6 w-full max-w-md">
        <div className="mb-8 animate-fade-in">
          <img
            src={IMAGE_PATHS.logo}
            alt="Chromattic"
            className="w-28 sm:w-36 h-auto mx-auto logo-metallic"
            loading="eager"
          />
        </div>
        <p className="text-sm sm:text-base uppercase tracking-widest text-gray-400 mb-6 font-semibold">
          Website laden...
        </p>
        {/* Progress bar track */}
        <div className="h-1.5 sm:h-2 bg-red-950/60 rounded-full overflow-hidden border border-red-900/40">
          <div
            className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-red-500/50 to-transparent mx-auto mt-4" />
      </div>
    </div>
  );
}

export default LaunchLoadingScreen;
