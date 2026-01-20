/**
 * Releases section component
 */

import { releases } from "../../data/releases";
import ReleaseCard from "../ui/ReleaseCard";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";

function Releases() {
  const { language } = useLanguage();
  const t = translations[language]?.releases || translations.nl.releases;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 uppercase tracking-widest font-display gradient-text">
          {t.title}
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {releases.map((release) => (
          <ReleaseCard key={release.id} release={release} />
        ))}
      </div>
    </div>
  );
}

export default Releases;

