/**
 * Hero section: band photo backdrop, logo, title, tagline, CTAs and
 * (when there is one) the next upcoming show pulled from src/data/shows.js.
 */

import { useMemo } from "react";
import { IMAGE_PATHS } from "../../utils/imagePaths";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";
import { shows } from "../../data/shows";
import { formatDate, isFutureDateTime } from "../../utils/dateFormatter";
import { ArrowDown, Calendar, MapPin, Ticket } from "lucide-react";
import { useLightbox } from "../../contexts/LightboxContext";

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Hero() {
  const { language } = useLanguage();
  const t = translations[language].hero || translations.nl.hero;
  const tShows = translations[language].shows || translations.nl.shows;
  const { open } = useLightbox();

  const nextShow = useMemo(
    () =>
      shows
        .filter((s) => isFutureDateTime(s.date, s.time))
        .sort((a, b) => `${a.date}${a.time || ""}`.localeCompare(`${b.date}${b.time || ""}`))[0] || null,
    []
  );

  const openLogo = () => open({ src: IMAGE_PATHS.logo, alt: "Chromattic logo" });

  return (
    <div className="relative isolate overflow-hidden min-h-[calc(100svh-3.5rem)] sm:min-h-[calc(100svh-4.5rem)] flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-8 pt-10 pb-20 sm:pt-16 sm:pb-24">
      {/* Backdrop: live photo, desaturated and tinted into the red/black palette */}
      <picture className="absolute inset-0 -z-20" aria-hidden="true">
        <source media="(max-width: 640px)" srcSet={IMAGE_PATHS.heroBandMobile} />
        <img
          src={IMAGE_PATHS.heroBand}
          alt=""
          className="w-full h-full object-cover object-center opacity-40 grayscale contrast-125"
          fetchPriority="low"
          decoding="async"
        />
      </picture>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-red-900/80 via-black/70 to-black" aria-hidden="true"></div>
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(ellipse at center, rgba(127,29,29,0.25) 0%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.85) 100%)" }}
        aria-hidden="true"
      ></div>
      <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse -z-10" aria-hidden="true"></div>
      <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse delay-1000 -z-10" aria-hidden="true"></div>

      <div className="relative max-w-4xl mx-auto w-full">
        {/* Logo (transparent cut-out, no more grey box) */}
        <div className="animate-fade-in">
          <img
            src={IMAGE_PATHS.logoTransparent}
            alt="Chromattic logo"
            width="640"
            height="640"
            className="w-40 sm:w-52 md:w-60 lg:w-72 h-auto mx-auto logo-metallic cursor-zoom-in drop-shadow-[0_0_35px_rgba(239,68,68,0.35)]"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            role="button"
            tabIndex={0}
            onClick={openLogo}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openLogo();
              }
            }}
          />
        </div>

        {/* Title */}
        <div className="animate-fade-in-delay">
          <h1 className="mt-2 sm:mt-4 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold uppercase leading-none tracking-wide sm:tracking-wider font-display gradient-text drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
            {t.title || "CHROMATTIC"}
          </h1>
          <div className="w-24 sm:w-32 md:w-40 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mt-5 sm:mt-6"></div>
        </div>

        {/* Tagline + description */}
        <div className="animate-fade-in-delay-2 mt-5 sm:mt-6 px-2">
          <p className="text-sm sm:text-base md:text-lg text-white font-bold uppercase tracking-widest">
            {t.tagline}
          </p>
          {t.description && (
            <p className="mt-2 text-base sm:text-lg md:text-xl text-gray-300 font-light max-w-xl mx-auto">
              {t.description}
            </p>
          )}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-8 sm:mt-10 animate-fade-in-delay-3 w-full px-2">
          <button
            type="button"
            onClick={() => scrollToId("contact")}
            className="group w-full max-w-xs sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold uppercase tracking-widest text-sm sm:text-base rounded-sm hover:from-red-500 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-red-900/50 hover:shadow-red-500/50 flex items-center justify-center gap-2 sm:gap-3 sm:min-w-[200px] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <Calendar size={18} className="sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform" aria-hidden="true" />
            <span>{t.bookNow}</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToId("shows")}
            className="group w-full max-w-xs sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-black/40 backdrop-blur-sm border-2 border-red-600 text-white font-bold uppercase tracking-widest text-sm sm:text-base rounded-sm hover:bg-red-600 hover:border-red-500 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 sm:min-w-[200px] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <ArrowDown size={18} className="sm:w-5 sm:h-5 text-red-400 group-hover:text-white group-hover:translate-y-1 transition-all" aria-hidden="true" />
            <span>{t.viewShows}</span>
          </button>
        </div>

        {/* Next show (only rendered when shows.js has an upcoming date) */}
        {nextShow && (
          <div className="mt-8 sm:mt-10 animate-fade-in-delay-4 px-2">
            <a
              href="#shows"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("shows");
              }}
              className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 max-w-full px-5 py-3 rounded-xl bg-black/60 backdrop-blur-sm border border-red-900/60 hover:border-red-500/70 transition-colors text-sm sm:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              <span className="text-red-400 font-bold uppercase tracking-widest text-xs sm:text-sm">
                {t.nextShow}
              </span>
              <span className="text-white font-semibold">
                <time dateTime={nextShow.time ? `${nextShow.date}T${nextShow.time}` : nextShow.date}>
                  {formatDate(nextShow.date)}
                  {nextShow.time ? ` · ${nextShow.time}` : ""}
                </time>
              </span>
              <span className="text-white font-bold uppercase tracking-wide">{nextShow.title}</span>
              <span className="inline-flex items-center gap-1 text-gray-300">
                <MapPin size={14} className="text-red-400" aria-hidden="true" />
                {nextShow.venue ? `${nextShow.venue}, ` : ""}
                {nextShow.location}
              </span>
              {nextShow.free && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-900/60 border border-red-500/40 text-xs font-bold uppercase tracking-widest text-white">
                  <Ticket size={12} className="text-red-400" aria-hidden="true" />
                  {tShows.free}
                </span>
              )}
            </a>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute inset-x-0 bottom-4 sm:bottom-8 flex justify-center animate-bounce pointer-events-none" aria-hidden="true">
        <ArrowDown className="text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />
      </div>
    </div>
  );
}

export default Hero;
