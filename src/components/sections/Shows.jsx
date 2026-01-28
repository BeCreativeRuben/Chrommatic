/**
 * Shows section component - Redesigned with improved visuals and accessibility
 */

import { useEffect, useMemo, useState } from "react";
import { shows } from "../../data/shows";
import { BRAND } from "../../data/constants";
import { getYear, isFutureDate, formatDate } from "../../utils/dateFormatter";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";
import { Calendar, MapPin, Clock } from "lucide-react";
import Carousel from "../ui/Carousel";
import { allCarouselImages } from "../../data/carrouselImages";

// Seeded shuffle function for consistent randomization
function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return function rng() {
    a |= 0;
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle(items, seed) {
  const arr = [...items];
  const rand = mulberry32(seed);
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getShowKey(show) {
  return `${show?.date || ""}::${show?.title || ""}`;
}

function hasShowDetails(show) {
  return Boolean(show?.venue || show?.area || show?.durationMinutes || show?.galleryTag);
}

function Shows() {
  const allYears = Array.from(new Set(shows.map((s) => getYear(s.date)))).sort((a, b) =>
    b.localeCompare(a)
  );

  const [selectedYear, setSelectedYear] = useState(allYears[0] || "2025");
  const [selectedShowKey, setSelectedShowKey] = useState(null);
  const { language } = useLanguage();
  const t = translations[language].shows || translations.nl.shows;

  const filteredShows = shows.filter(
    (show) => getYear(show.date) === selectedYear
  );

  const upcoming = filteredShows.filter((show) => isFutureDate(show.date));
  const past = filteredShows.filter((show) => !isFutureDate(show.date));

  useEffect(() => {
    setSelectedShowKey(null);
  }, [selectedYear]);

  const selectedShow = useMemo(() => {
    if (!selectedShowKey) return null;
    return filteredShows.find((s) => getShowKey(s) === selectedShowKey) || null;
  }, [filteredShows, selectedShowKey]);

  const selectedShowGalleryImages = useMemo(() => {
    if (!selectedShow?.galleryTag) return [];
    const tag = String(selectedShow.galleryTag).toLowerCase();
    const filtered = allCarouselImages.filter((img) => String(img?.alt || "").toLowerCase().startsWith(tag));
    
    // Shuffle the filtered images with daily seed for consistent but random order
    const seed = hashString(`chromattic-show-${selectedShow.galleryTag}:${new Date().toISOString().slice(0, 10)}`);
    return seededShuffle(filtered, seed);
  }, [selectedShow]);

  // Keep the details centered as a modal (no scroll-jump)
  useEffect(() => {
    if (!selectedShow) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") setSelectedShowKey(null);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedShow]);

  const openDetails = (show) => {
    const key = getShowKey(show);
    setSelectedShowKey(key);
  };

  const closeDetails = () => setSelectedShowKey(null);

  const formatDuration = (minutes) => {
    if (!minutes) return "";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (language === "nl") {
      if (hours > 0 && mins > 0) {
        return `${hours} uur ${mins} minuten`;
      } else if (hours > 0) {
        return `${hours} uur`;
      } else {
        return `${mins} minuten`;
      }
    }
    // English
    if (hours > 0 && mins > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ${mins} minute${mins > 1 ? "s" : ""}`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""}`;
    } else {
      return `${mins} minute${mins > 1 ? "s" : ""}`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 uppercase tracking-widest font-display gradient-text">
          {t.title}
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mb-8"></div>
      </div>

      {/* Year selector - all years visible */}
      <div className="mb-12 flex justify-center">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calendar className="text-red-400" size={20} aria-hidden="true" />
            <p className="text-sm font-semibold text-gray-300">{t.selectYear}</p>
          </div>

          <div
            className="flex flex-wrap justify-center gap-2"
            role="radiogroup"
            aria-label={t.selectYear}
          >
            {allYears.map((year) => {
              const isSelected = year === selectedYear;
              return (
                <button
                  key={year}
                  type="button"
                  onClick={() => setSelectedYear(year)}
                  role="radio"
                  aria-checked={isSelected}
                  className={[
                    "px-5 py-2 rounded-full border text-sm font-semibold tracking-wide transition-all",
                    "focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black",
                    isSelected
                      ? "bg-red-600 border-red-500 text-white shadow-lg shadow-red-900/40"
                      : "bg-black/40 border-red-900/50 text-gray-300 hover:border-red-600 hover:text-white",
                  ].join(" ")}
                >
                  {year}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Details modal (centered overlay) */}
      {selectedShow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
          {/* Backdrop */}
          <button
            type="button"
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeDetails}
            aria-label={language === "nl" ? "Sluiten" : "Close"}
          />

          {/* Modal */}
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="show-details-title"
            className="relative w-full max-w-5xl max-h-[85vh] overflow-y-auto bg-gradient-to-br from-red-900/30 via-black to-black rounded-2xl p-6 sm:p-8 md:p-10 border border-red-900/50 shadow-2xl"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
              <div className="flex items-center">
                <h3
                  id="show-details-title"
                  className="text-3xl md:text-4xl font-bold text-white uppercase tracking-widest font-display"
                >
                  {selectedShow.title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={closeDetails}
                  className="px-6 py-3 bg-black/40 hover:bg-black/60 border border-red-900/40 hover:border-red-500/60 text-white font-bold uppercase tracking-widest text-sm rounded-sm transition-all duration-300"
                >
                  {t.backToList}
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
              <div className="text-left">
                <h4 className="text-2xl font-bold mb-4 uppercase tracking-widest font-display text-red-400">
                  {t.highlights}
                </h4>
                <div className="text-gray-300 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-red-400" aria-hidden="true" />
                    <span>{formatDate(selectedShow.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-red-400" aria-hidden="true" />
                    <span>
                      {selectedShow.location}
                      {selectedShow.venue ? `, ${selectedShow.venue}` : ""}
                      {selectedShow.area ? `, ${selectedShow.area}` : ""}, {BRAND.country}
                    </span>
                  </div>
                  {selectedShow.durationMinutes ? (
                    <div className="flex items-center gap-2">
                      <Clock size={18} className="text-red-400" aria-hidden="true" />
                      <span>
                        {t.duration}: {formatDuration(selectedShow.durationMinutes)}
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>

              <div>
                <h4 className="text-2xl font-bold mb-4 uppercase tracking-widest font-display text-red-400 text-left">
                  {t.photos}
                </h4>
                <Carousel images={selectedShowGalleryImages} autoAdvanceMs={4500} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* List view */}
      <>
      {/* Upcoming Shows Section */}
      {upcoming.length > 0 && (
        <section 
          aria-labelledby="upcoming-shows-heading"
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-red-900/30 via-black to-black rounded-2xl p-8 md:p-12 border border-red-900/50 shadow-2xl mb-8">
            <h3 
              id="upcoming-shows-heading" 
              className="text-3xl font-bold mb-8 text-red-400 uppercase tracking-wide flex items-center gap-3"
            >
              <Clock className="text-red-400" size={32} />
              {t.upcoming}
            </h3>
            <ul 
              className="space-y-4" 
              role="list"
              aria-label={language === "nl" ? "Aankomende shows" : "Upcoming shows"}
            >
              {upcoming.map((show, i) => (
                <li 
                  key={`upcoming-${i}`} 
                  role="listitem"
                >
                  <article 
                    className="bg-black/50 rounded-xl p-6 border border-red-900/30 hover:border-red-500/50 transition-all duration-300 hover:transform hover:scale-[1.02] focus-within:ring-2 focus-within:ring-red-500 focus-within:outline-none"
                    tabIndex={0}
                    aria-label={`${language === "nl" ? "Show" : "Show"}: ${show.title} op ${formatDate(show.date)} in ${show.location}`}
                  >
                    <div className="relative">
                      <div className="flex items-start gap-4 justify-center">
                        <div className="p-2 bg-red-900/50 rounded-lg flex-shrink-0 self-center">
                          <Calendar className="text-red-400" size={20} />
                        </div>
                        <div className="flex-1 max-w-2xl">
                          <time 
                            dateTime={show.date}
                            className="block text-lg font-semibold text-white mb-2"
                            aria-label={language === "nl" ? `Datum: ${formatDate(show.date)}` : `Date: ${formatDate(show.date)}`}
                          >
                            {formatDate(show.date)}
                          </time>
                          <h4 className="text-xl font-bold text-white mb-2">
                            {show.title}
                          </h4>
                          <div className="flex items-center justify-center gap-2 text-gray-300">
                            <MapPin size={16} className="text-red-400" aria-hidden="true" />
                            <address className="not-italic">
                              {show.location}, {BRAND.country}
                            </address>
                          </div>
                        </div>
                      </div>

                      {(show.ticketsUrl || hasShowDetails(show)) && (
                        <div className="mt-6 md:mt-0 md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 flex flex-col gap-3 w-full md:w-auto">
                          {show.ticketsUrl && (
                            <a
                              href={show.ticketsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold uppercase tracking-widest text-sm rounded-sm hover:from-red-500 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-red-900/50 hover:shadow-red-500/50 w-full md:w-auto"
                              aria-label={
                                language === "nl"
                                  ? `Tickets voor ${show.title} op ${formatDate(show.date)}`
                                  : `Tickets for ${show.title} on ${formatDate(show.date)}`
                              }
                            >
                              {t.tickets || "Tickets"}
                            </a>
                          )}
                          {hasShowDetails(show) && (
                            <button
                              type="button"
                              onClick={() => openDetails(show)}
                              className="inline-flex items-center justify-center px-6 py-3 bg-black/40 hover:bg-black/60 border border-red-900/40 hover:border-red-500/60 text-white font-bold uppercase tracking-widest text-sm rounded-sm transition-all duration-300 w-full md:w-auto"
                            >
                              {t.highlights}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Past Shows Section */}
      {past.length > 0 && (
        <section 
          aria-labelledby="past-shows-heading"
          className={upcoming.length > 0 ? "mt-12" : ""}
        >
          <div className="bg-gradient-to-br from-black via-red-950/30 to-black rounded-2xl p-8 md:p-12 border border-red-800/30 shadow-2xl">
            <h3 
              id="past-shows-heading" 
              className="text-3xl font-bold mb-8 text-red-400 uppercase tracking-wide flex items-center gap-3"
            >
              <Calendar className="text-red-400" size={32} />
              {t.past}
            </h3>
            <ul 
              className="space-y-4" 
              role="list"
              aria-label={language === "nl" ? "Vorige shows" : "Past shows"}
            >
              {past.map((show, i) => (
                <li 
                  key={`past-${i}`} 
                  role="listitem"
                >
                  <article 
                    className="bg-black/50 rounded-xl p-6 border border-red-900/30 hover:border-red-500/50 transition-all duration-300 hover:transform hover:scale-[1.02] focus-within:ring-2 focus-within:ring-red-500 focus-within:outline-none"
                    tabIndex={0}
                    aria-label={`${language === "nl" ? "Show" : "Show"}: ${show.title} op ${formatDate(show.date)} in ${show.location}`}
                  >
                    <div className="relative">
                      <div className="flex items-start gap-4 justify-center">
                        <div className="p-2 bg-red-900/50 rounded-lg flex-shrink-0 self-center">
                          <Calendar className="text-red-400" size={20} />
                        </div>
                        <div className="flex-1 max-w-2xl">
                          <time 
                            dateTime={show.date}
                            className="block text-lg font-semibold text-white mb-2"
                            aria-label={language === "nl" ? `Datum: ${formatDate(show.date)}` : `Date: ${formatDate(show.date)}`}
                          >
                            {formatDate(show.date)}
                          </time>
                          <h4 className="text-xl font-bold text-white mb-2">
                            {show.title}
                          </h4>
                          <div className="flex items-center justify-center gap-2 text-gray-300">
                            <MapPin size={16} className="text-red-400" aria-hidden="true" />
                            <address className="not-italic">
                              {show.location}, {BRAND.country}
                            </address>
                          </div>
                        </div>
                      </div>

                      {hasShowDetails(show) && (
                        <div className="mt-6 md:mt-0 md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2">
                          <button
                            type="button"
                            onClick={() => openDetails(show)}
                            className="inline-flex items-center justify-center px-6 py-3 bg-black/40 hover:bg-black/60 border border-red-900/40 hover:border-red-500/60 text-white font-bold uppercase tracking-widest text-sm rounded-sm transition-all duration-300 w-full md:w-auto"
                          >
                            {t.highlights}
                          </button>
                        </div>
                      )}
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Empty State */}
      {filteredShows.length === 0 && (
        <div 
          className="text-center py-12 bg-black/50 rounded-xl border border-red-900/30"
          role="status"
          aria-live="polite"
        >
          <p className="text-gray-400 text-lg">
            {language === "nl" 
              ? `Geen shows gevonden voor ${selectedYear}.`
              : `No shows found for ${selectedYear}.`}
          </p>
        </div>
      )}
      </>
    </div>
  );
}

export default Shows;
