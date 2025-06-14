import { useState } from "react";

const shows = [
    { date: "2025-09-20", title: "Pop Is Dead", location: "Sint-Niklaas"},
    { date: "2025-09-13", title: "50 dagen 50 party (Privé)", location: "Temse"},
    { date: "2025-05-03", title: "Sint-Martinus - Piraten-Barbecue", location: "Nieuwkerken-Waas"},
    { date: "2025-04-03", title: "Café Het Damberd", location: "Gent"},
    { date: "2024-09-21", title: "Pop Is Dead", location: "Sint-Niklaas", image: "/images/shows/pop-is-dead.jpg"},
    { date: "2024-08-31", title: "Frater Field Festival (Privé)", location: "Waasmunster"},
    { date: "2024-08-24", title: "Smeulefeesten", location: "Nieuwkerken-Waas"},
    { date: "2024-05-18", title: "Droomland", location: "Nieuwkerken-Waas"},
    { date: "2024-05-04", title: "Tapaspibar", location: "Sinaai"},
    { date: "2024-04-27", title: "Sint-Martinus - Western Barbecue", location: "Nieuwkerken-Waas"},
    { date: "2023-12-16", title: "Winterrock JOC De Nartist", location: "Temse"},
    { date: "2023-08-11", title: "Bar Bidong", location: "Lede"},
    { date: "2023-04-29", title: "Rock Zutendaal", location: "Zutendaal"},
];

function Shows() {
    const [selectedYear, setSelectedYear] = useState("2025");

    const now = new Date();

    const filteredShows = shows.filter((show) =>
        new Date(show.date).getFullYear().toString() === selectedYear
    );

    const upcoming = filteredShows.filter((show) => new Date(show.date) >= now);
    const past = filteredShows.filter((show) => new Date(show.date) < now);

    const allYears = Array.from(new Set(shows.map((s) => new Date(s.date).getFullYear().toString()))).sort((a, b) => b - a);

    return (
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Shows</h2>

            <div className="mb-8">
                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="bg-black border border-white text-white py-2 px-4 rounded"
                >
                    {allYears.map((year) => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>

            {upcoming.length > 0 && (
                <div>
                    <h3 className="text-2xl font-semibold mb-4">Upcoming Shows</h3>
                    <div className="divide-y divide-white">
                        {upcoming.map((show, i) => (
                            <div key={i} className="flex justify-between items-center py-4">
                                <span className="text-gray-400 w-1/4 text-left">
                                    {new Date(show.date).toLocaleDateString("nl-BE", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </span>
                                <div className="flex-1 text-center">
                                    <p className="font-semibold">{show.title}</p>
                                </div>
                                <span className="text-gray-400 text-sm w-1/4 text-right">
                                    {show.location}, België
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className="mt-12"></div>
            {past.length > 0 && (
                <div>
                    <h3 className="text-2xl font-semibold mb-4">Past Shows</h3>
                    <div className="divide-y divide-white">
                        {past.map((show, i) => (
                            <div key={i} className="flex justify-between items-center py-4">
                                <span className="text-gray-400 w-1/4 text-left">
                                    {new Date(show.date).toLocaleDateString("nl-BE", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </span>
                                <div className="flex-1 text-center">
                                    <p className="font-semibold">{show.title}</p>
                                </div>
                                <span className="text-gray-400 text-sm w-1/4 text-right">
                                    {show.location}, België
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Shows;
