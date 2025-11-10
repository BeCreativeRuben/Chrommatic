/**
 * Shows section component
 */

import { useState } from "react";
import { shows } from "../../data/shows";
import { BRAND } from "../../data/constants";
import { getYear, isFutureDate } from "../../utils/dateFormatter";
import ShowCard from "../ui/ShowCard";

function Shows() {
  const [selectedYear, setSelectedYear] = useState("2025");

  const filteredShows = shows.filter(
    (show) => getYear(show.date) === selectedYear
  );

  const upcoming = filteredShows.filter((show) => isFutureDate(show.date));
  const past = filteredShows.filter((show) => !isFutureDate(show.date));

  const allYears = Array.from(
    new Set(shows.map((s) => getYear(s.date)))
  ).sort((a, b) => b.localeCompare(a));

  return (
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-6">Shows</h2>

      <div className="mb-8">
        <label htmlFor="year-select" className="sr-only">
          Selecteer jaar
        </label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="bg-black border border-white text-white py-2 px-4 rounded"
          aria-label="Selecteer jaar"
        >
          {allYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {upcoming.length > 0 && (
        <section aria-labelledby="upcoming-shows-heading">
          <h3 id="upcoming-shows-heading" className="text-2xl font-semibold mb-4">Upcoming Shows</h3>
          <ul className="divide-y divide-white" role="list">
            {upcoming.map((show, i) => (
              <li key={i} role="listitem">
                <ShowCard show={show} country={BRAND.country} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {past.length > 0 && (
        <section className={upcoming.length > 0 ? "mt-12" : ""} aria-labelledby="past-shows-heading">
          <h3 id="past-shows-heading" className="text-2xl font-semibold mb-4">Past Shows</h3>
          <ul className="divide-y divide-white" role="list">
            {past.map((show, i) => (
              <li key={i} role="listitem">
                <ShowCard show={show} country={BRAND.country} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default Shows;

