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
  const [selectedYear, setSelectedYear] = useState("2025");
  const { language } = useLanguage();
  const t = translations[language].shows || translations.nl.shows;

  const filteredShows = shows.filter(
    (show) => getYear(show.date) === selectedYear
  );

  const upcoming = filteredShows.filter((show) => isFutureDate(show.date));
  const past = filteredShows.filter((show) => !isFutureDate(show.date));

  const allYears = Array.from(
    new Set(shows.map((s) => getYear(s.date)))
  ).sort((a, b) => b.localeCompare(a));

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
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

      {/* Year Selector - Improved Accessibility */}
      <div className="mb-12 flex justify-center">
        <div className="relative">
          <label 
            htmlFor="year-select" 
            className="block text-sm font-semibold text-gray-300 mb-2 text-center"
          >
            {t.selectYear}
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400" size={20} />
            <select
              id="year-select"
              value={selectedYear}
              onChange={handleYearChange}
              className="bg-black border-2 border-red-900/50 text-white py-3 pl-10 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all appearance-none cursor-pointer hover:border-red-600"
              aria-label={t.selectYear}
              aria-describedby="year-select-description"
            >
              {allYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <span id="year-select-description" className="sr-only">
            {language === "nl" 
              ? `Selecteer een jaar om shows te filteren. Huidig geselecteerd: ${selectedYear}`
              : `Select a year to filter shows. Currently selected: ${selectedYear}`}
          </span>
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
