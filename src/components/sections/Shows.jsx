/**
 * Shows section component - Redesigned with improved visuals and accessibility
 */

import { useState } from "react";
import { shows } from "../../data/shows";
import { BRAND } from "../../data/constants";
import { getYear, isFutureDate, formatDate } from "../../utils/dateFormatter";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";
import { Calendar, MapPin, Clock } from "lucide-react";

function Shows() {
  const allYears = Array.from(new Set(shows.map((s) => getYear(s.date)))).sort((a, b) =>
    b.localeCompare(a)
  );

  const [selectedYear, setSelectedYear] = useState(allYears[0] || "2025");
  const { language } = useLanguage();
  const t = translations[language].shows || translations.nl.shows;

  const filteredShows = shows.filter(
    (show) => getYear(show.date) === selectedYear
  );

  const upcoming = filteredShows.filter((show) => isFutureDate(show.date));
  const past = filteredShows.filter((show) => !isFutureDate(show.date));

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
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-2 bg-red-900/50 rounded-lg flex-shrink-0">
                          <Calendar className="text-red-400" size={20} />
                        </div>
                        <div className="flex-1">
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
                          <div className="flex items-center gap-2 text-gray-300">
                            <MapPin size={16} className="text-red-400" aria-hidden="true" />
                            <address className="not-italic">
                              {show.location}, {BRAND.country}
                            </address>
                          </div>
                        </div>
                      </div>

                      {show.ticketsUrl && (
                        <div className="md:flex-shrink-0">
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
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-2 bg-red-900/50 rounded-lg flex-shrink-0">
                          <Calendar className="text-red-400" size={20} />
                        </div>
                        <div className="flex-1">
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
                          <div className="flex items-center gap-2 text-gray-300">
                            <MapPin size={16} className="text-red-400" aria-hidden="true" />
                            <address className="not-italic">
                              {show.location}, {BRAND.country}
                            </address>
                          </div>
                        </div>
                      </div>
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
    </div>
  );
}

export default Shows;
