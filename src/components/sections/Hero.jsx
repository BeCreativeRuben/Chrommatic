/**
 * Hero section component with CTA buttons and improved visuals
 */

import { IMAGE_PATHS } from "../../utils/imagePaths";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";
import { ArrowDown, Calendar } from "lucide-react";

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
    <section id="hero" className="min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-center items-center text-center relative overflow-hidden w-full">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 via-black to-black"></div>
      <div className="absolute inset-0 bg-gradient-radial from-red-900/10 via-transparent to-transparent"></div>
      
      {/* Animated background elements - Responsive sizes */}
      <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-red-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-red-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 max-w-4xl mx-auto w-full px-4 sm:px-6 md:px-8">
        {/* Logo - Responsive sizing */}
        <div className="mb-6 sm:mb-8 animate-fade-in">
          <img
            src={IMAGE_PATHS.logo}
            alt="Chromattic logo"
            className="w-48 sm:w-56 md:w-64 lg:w-80 h-auto mx-auto logo-metallic mb-4 sm:mb-6"
            loading="eager"
          />
        </div>

        {/* Main Title - Responsive text sizes */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 uppercase tracking-wider sm:tracking-widest font-display gradient-text animate-fade-in-delay px-2">
          {t.title || "CHROMATTIC"}
        </h1>

        {/* Tagline - Responsive text sizes */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-3 sm:mb-4 font-light tracking-wide animate-fade-in-delay-2 px-2">
          {t.tagline}
        </p>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-delay-3 px-2">
          {t.description}
        </p>

        {/* CTA Buttons - Responsive sizing */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-16 animate-fade-in-delay-4 w-full px-2">
          <button
            onClick={handleScrollToContact}
            className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold uppercase tracking-widest text-sm sm:text-base rounded-sm hover:from-red-500 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-red-900/50 hover:shadow-red-500/50 flex items-center justify-center gap-2 sm:gap-3 min-w-[180px] sm:min-w-[200px]"
            aria-label={t.bookNow}
          >
            <Calendar size={18} className="sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform" />
            <span>{t.bookNow}</span>
          </button>
          
          <button
            onClick={handleScrollToShows}
            className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-red-600 text-red-400 font-bold uppercase tracking-widest text-sm sm:text-base rounded-sm hover:bg-red-600 hover:text-white hover:border-red-500 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 min-w-[180px] sm:min-w-[200px]"
            aria-label={t.viewShows}
          >
            <ArrowDown size={18} className="sm:w-5 sm:h-5 group-hover:translate-y-1 transition-transform" />
            <span>{t.viewShows}</span>
          </button>
        </div>

        {/* Scroll indicator - Responsive positioning */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
