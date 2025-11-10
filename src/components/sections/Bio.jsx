/**
 * Bio section component - Redesigned with multiple sections and improved visuals
 */

import { IMAGE_PATHS } from "../../utils/imagePaths";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";
import { Music, Users, Calendar, TrendingUp } from "lucide-react";

function Bio() {
  const { language } = useLanguage();
  const t = translations[language].bio || translations.nl.bio; // Fallback to Dutch

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 uppercase tracking-widest font-display gradient-text">
          {t.title || "Bio"}
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto"></div>
      </div>

      {/* Intro Section - Full Width Card */}
      <div className="mb-20">
        <div className="bg-gradient-to-br from-red-900/30 via-black to-black rounded-2xl p-8 md:p-12 border border-red-900/50 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-6 text-center md:text-left">
            <div className="p-3 bg-red-900/50 rounded-lg flex-shrink-0">
              <Users className="text-red-400" size={32} />
            </div>
            <div className="flex-1 w-full md:w-auto">
              <h3 className="text-2xl font-bold mb-4 text-red-400 uppercase tracking-wide">
                {language === "nl" ? "Het Verhaal" : "The Story"}
              </h3>
              <p className="text-lg leading-relaxed text-gray-200">
                {language === "nl" 
                  ? "Chromattic is een alternatieve rockband uit het Waasland die de nostalgie van 2000's poppunk mengt met moderne sounds. Sinds hun ontstaan begin 2023 heeft het viertal een indrukwekkend parcours afgelegd: optredens in iconische cafés en jeugdhuizen, een debuutsingle, een stevige EP en binnenkort zelfs een volledig album. De band bestaat uit vier jeugdvrienden die al jaren samen muziek maken, wat duidelijk voelbaar is in hun energieke live-shows en hechte groepsdynamiek."
                  : "Chromattic is an alternative rock band from the Waasland region that blends the nostalgia of 2000's pop punk with modern sounds. Since their formation in early 2023, the quartet has had an impressive journey: performances in iconic cafes and youth centers, a debut single, a solid EP, and soon even a full album. The band consists of four childhood friends who have been making music together for years, which is clearly felt in their energetic live shows and tight group dynamics."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Releases Section - Card with Image */}
      <div className="mb-20">
        <div className="bg-gradient-to-r from-black via-red-950/50 to-black rounded-2xl overflow-hidden border border-red-800/30 shadow-xl">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2">
              <img
                src={IMAGE_PATHS.shows.droomballon}
                alt="Chromattic live @ Droomland"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-900/50 rounded-lg">
                  <Music className="text-red-400" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-red-400 uppercase tracking-wide">
                  {language === "nl" ? "Releases" : "Releases"}
                </h3>
              </div>
              <p className="text-lg leading-relaxed text-gray-200 mb-4">
                {language === "nl"
                  ? "In augustus 2023 brachten ze hun eerste single 'Circles' uit, gevolgd door de EP"
                  : "In August 2023, they released their first single 'Circles', followed by the EP"}
                {" "}
                <span className="italic text-red-300 font-semibold">Silent Dejection</span>
                {language === "nl" ? " in april 2024." : " in April 2024."}
              </p>
              <p className="text-lg leading-relaxed text-gray-200">
                {language === "nl"
                  ? "Hierop staan de nummers 'Running Away', 'Alex', 'Circles' en 'Super Messy', die allemaal de verschillende gezichten van de band tonen – van melancholie tot pure chaos."
                  : "It features the tracks 'Running Away', 'Alex', 'Circles' and 'Super Messy', all showing the different faces of the band – from melancholy to pure chaos."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Shows Section - Reversed Layout */}
      <div className="mb-20">
        <div className="bg-gradient-to-l from-black via-red-950/50 to-black rounded-2xl overflow-hidden border border-red-800/30 shadow-xl">
          <div className="flex flex-col lg:flex-row-reverse">
            <div className="lg:w-1/2">
              <img
                src={IMAGE_PATHS.shows.popIsDead}
                alt="Chromattic @ Pop Is Dead"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-900/50 rounded-lg">
                  <Calendar className="text-red-400" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-red-400 uppercase tracking-wide">
                  {language === "nl" ? "Live Shows" : "Live Shows"}
                </h3>
              </div>
              <p className="text-lg leading-relaxed text-gray-200">
                {language === "nl"
                  ? "Met optredens op o.a. Pop Is Dead, Droomland en Damberd heeft Chromattic zich snel in de alternatieve scene genesteld. De band staat bekend om hun ruwe maar eerlijke sound, die zowel live als in studio tot uiting komt. Elk optreden is een mix van nostalgie, energie en connectie met het publiek."
                  : "With performances at Pop Is Dead, Droomland and Damberd, Chromattic has quickly established itself in the alternative scene. The band is known for their raw but honest sound, which comes through both live and in the studio. Each performance is a mix of nostalgia, energy and connection with the audience."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Future Section - Highlight Card */}
      <div className="mb-12">
        <div className="bg-gradient-to-br from-red-800/40 via-red-900/30 to-black rounded-2xl p-8 md:p-12 border-2 border-red-600/50 shadow-2xl relative overflow-hidden">
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-red-600/50 rounded-lg">
                <TrendingUp className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-wide">
                {language === "nl" ? "De Toekomst" : "The Future"}
              </h3>
            </div>
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="lg:w-1/2">
                <img
                  src={IMAGE_PATHS.shows.damberd}
                  alt="Chromattic @ Damberd"
                  className="w-full rounded-lg shadow-xl border-2 border-red-600/30"
                  loading="lazy"
                />
              </div>
              <div className="lg:w-1/2">
                <p className="text-lg leading-relaxed text-gray-100">
                  {language === "nl"
                    ? "Met een debuutalbum in de maak en een eerste single gepland op 21 juni 2025, kijkt Chromattic vooruit. De groep belooft een nog ambitieuzer geluid, maar zonder hun roots te vergeten. De toekomst oogt fel, luid en vooral: oprecht."
                    : "With a debut album in the works and a first single planned for June 21, 2025, Chromattic looks ahead. The group promises an even more ambitious sound, but without forgetting their roots. The future looks bright, loud and above all: honest."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats/Highlights Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-black/50 rounded-xl p-6 border border-red-900/30 text-center hover:border-red-500/50 transition-all duration-300 hover:transform hover:scale-105">
          <div className="text-4xl font-bold text-red-400 mb-2">2023</div>
          <div className="text-gray-300 uppercase tracking-wide text-sm">
            {language === "nl" ? "Opgericht" : "Formed"}
          </div>
        </div>
        <div className="bg-black/50 rounded-xl p-6 border border-red-900/30 text-center hover:border-red-500/50 transition-all duration-300 hover:transform hover:scale-105">
          <div className="text-4xl font-bold text-red-400 mb-2">4</div>
          <div className="text-gray-300 uppercase tracking-wide text-sm">
            {language === "nl" ? "Leden" : "Members"}
          </div>
        </div>
        <div className="bg-black/50 rounded-xl p-6 border border-red-900/30 text-center hover:border-red-500/50 transition-all duration-300 hover:transform hover:scale-105">
          <div className="text-4xl font-bold text-red-400 mb-2">2025</div>
          <div className="text-gray-300 uppercase tracking-wide text-sm">
            {language === "nl" ? "Debut Album" : "Debut Album"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bio;
