/**
 * Hero section component with CTA buttons and improved visuals
 */

import { IMAGE_PATHS } from "../../utils/imagePaths";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";
import { ArrowDown, Calendar, Mail } from "lucide-react";

function Hero() {
  const { language } = useLanguage();
  const t = translations[language].hero || translations.nl.hero;

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleScrollToShows = (e) => {
    e.preventDefault();
    const showsSection = document.getElementById("shows");
    if (showsSection) {
      showsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="min-h-[90vh] flex flex-col justify-center items-center text-center relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 via-black to-black"></div>
      <div className="absolute inset-0 bg-gradient-radial from-red-900/10 via-transparent to-transparent"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {/* Logo */}
        <div className="mb-8 animate-fade-in">
          <img
            src={IMAGE_PATHS.logo}
            alt="Chromattic logo"
            className="w-64 md:w-80 h-auto mx-auto logo-metallic mb-6"
            loading="eager"
          />
        </div>

        {/* Main Title */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 uppercase tracking-widest font-display gradient-text animate-fade-in-delay">
          {t.title || "CHROMATTIC"}
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-gray-300 mb-4 font-light tracking-wide animate-fade-in-delay-2">
          {language === "nl"
            ? "Alternatieve Rock uit het Waasland"
            : "Alternative Rock from the Waasland"}
        </p>
        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-delay-3">
          {language === "nl"
            ? "Nostalgie van 2000's poppunk gemengd met moderne sounds"
            : "Nostalgia of 2000's pop punk blended with modern sounds"}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-delay-4">
          <button
            onClick={handleScrollToContact}
            className="group px-8 py-4 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold uppercase tracking-widest text-base rounded-sm hover:from-red-500 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-red-900/50 hover:shadow-red-500/50 flex items-center gap-3 min-w-[200px] justify-center"
          >
            <Calendar size={20} className="group-hover:rotate-12 transition-transform" />
            <span>{t.bookNow}</span>
          </button>
          
          <button
            onClick={handleScrollToShows}
            className="group px-8 py-4 bg-transparent border-2 border-red-600 text-red-400 font-bold uppercase tracking-widest text-base rounded-sm hover:bg-red-600 hover:text-white hover:border-red-500 transform hover:scale-105 transition-all duration-300 flex items-center gap-3 min-w-[200px] justify-center"
          >
            <ArrowDown size={20} className="group-hover:translate-y-1 transition-transform" />
            <span>{t.viewShows}</span>
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="text-gray-400" size={24} />
        </div>
      </div>
    </div>
  );
}

export default Hero;
