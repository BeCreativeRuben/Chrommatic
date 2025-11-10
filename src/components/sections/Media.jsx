/**
 * Media section component
 */

import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";

function Media() {
  const { language } = useLanguage();
  const t = translations[language].media || translations.nl.media;

  return (
    <div className="max-w-6xl mx-auto text-center px-4">
      <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-widest font-display gradient-text">
        {t.title}
      </h2>
      <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
        {t.description} <strong className="text-red-400">Circles</strong>.
      </p>

      <div className="relative w-full max-w-5xl mx-auto rounded-lg overflow-hidden shadow-2xl border-2 border-red-900/30" style={{ aspectRatio: '16/9' }}>
        <iframe
          className="w-full h-full absolute inset-0"
          src="https://www.youtube.com/embed/g9ULqy29kZw"
          title="Chromattic - Circles (Official Video)"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          aria-label="Chromattic - Circles officiële videoclip"
        ></iframe>
      </div>
    </div>
  );
}

export default Media;
