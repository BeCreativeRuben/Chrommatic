/**
 * Bio section component - Redesigned with multiple sections and improved visuals
 */

import { IMAGE_PATHS } from "../../utils/imagePaths";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";
import { Music, Users, Calendar, TrendingUp } from "lucide-react";
import LazyImage from "../ui/LazyImage";

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
                  ? "Chromattic is een rockband uit het Waasland, ontstaan in 2021 toen vier jonge gasten samenkwamen op een zolder met twee luide gitaren, een basgitaar en een drum. Ze hebben deze zolder omgebouwd van \"rommelkot\" naar hun repetitieruimte, waar ze begonnen met simpele covers te spelen en evolueerden tot een hechte groep die ook eigen nummers schrijft. Sindsdien hebben ze de zolder al regelmatig verlaten om energieke optredens te leveren met een garantie op veel sfeer."
                  : "Chromattic is a rock band from the Waasland, formed in 2021 when four young guys came together in an attic with two loud guitars, a bass guitar and drums. They converted this attic from a \"junk room\" into their rehearsal space, where they started playing simple covers and evolved into a tight-knit group that also writes their own songs. Since then, they have regularly left the attic to deliver energetic performances with a guarantee of great atmosphere."}
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
              <LazyImage
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
              <p className="text-lg leading-relaxed text-gray-200">
                {language === "nl"
                  ? "In augustus 2023 brachten ze hun eerste single Circles uit, gevolgd door de EP Silent Dejection in april 2024. Vanaf juni 2025 volgde er een reeks singles — Sunrise, Alex (rerecorded), Walk of Death en SH!T — die tonen hoe de band geëvolueerd is sinds hun debuutsingle. Momenteel werkt de band aan nieuwe opnames en staat er nog meer muziek gepland voor de toekomst."
                  : "In August 2023, they released their first single Circles, followed by the EP Silent Dejection in April 2024. From June 2025 onwards, a series of singles followed — Sunrise, Alex (rerecorded), Walk of Death and SH!T — showing how the band has evolved since their debut single. Currently, the band is working on new recordings and more music is planned for the future."}
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
              <LazyImage
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
                  ? "Sinds het ontstaan van de band speelden ze al op verschillende grote podia, waaronder Rock Zutendaal, Droomland en de Smeulefeesten. Ook kleinere sfeervolle locaties zoals Pop is Dead (in den Egelantier), Café Damberd en Burgies on Stage (in Café Delta) ontbreken niet aan hun parcours. Waar ze ook spelen, slagen ze erin om het publiek mee te trekken in hun energie."
                  : "Since the band's formation, they have already played on various major stages, including Rock Zutendaal, Droomland and the Smeulefeesten. Smaller atmospheric venues such as Pop is Dead (in den Egelantier), Café Damberd and Burgies on Stage (in Café Delta) are also part of their journey. Wherever they play, they succeed in drawing the audience into their energy."}
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
                <LazyImage
                  src={IMAGE_PATHS.shows.damberd}
                  alt="Chromattic @ Damberd"
                  className="w-full rounded-lg shadow-xl border-2 border-red-600/30"
                  loading="lazy"
                />
              </div>
              <div className="lg:w-1/2">
                <p className="text-lg leading-relaxed text-gray-100">
                  {language === "nl"
                    ? "Ook zijn ze nog steeds volop bezig met nieuwe opnames, waardoor meermaals per jaar nieuwe nummers uitgebracht worden. Tegelijk willen ze hun live-reputatie verder uitbouwen door meer shows te spelen en hun publiek uit te breiden, zowel binnen als buiten het Waasland."
                    : "They are also still fully engaged in new recordings, releasing new songs multiple times per year. At the same time, they want to further build their live reputation by playing more shows and expanding their audience, both within and outside the Waasland."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bio;
