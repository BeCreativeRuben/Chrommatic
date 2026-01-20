/**
 * Meet The Band section
 */

import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";

const BASE_URL = import.meta.env.BASE_URL;

const members = [
  {
    name: "Tijl",
    roles: {
      nl: "Leadzanger & Gitarist",
      en: "Lead vocalist & guitarist",
    },
    imageFile: "fotoshoot tijl.jpg",
  },
  {
    name: "Nand",
    roles: {
      nl: "Gitarist",
      en: "Guitarist",
    },
    imageFile: "fotoshoot nand.jpg",
  },
  {
    name: "Joeri",
    roles: {
      nl: "Zanger, Gitarist & Keyboard",
      en: "Vocalist, guitarist & keys",
    },
    imageFile: "fotoshoot joeri.jpg",
  },
  {
    name: "Korneel",
    roles: {
      nl: "Drummer",
      en: "Drummer",
    },
    imageFile: "fotoshoot korneel.jpg",
  },
];

function MeetTheBand() {
  const { language } = useLanguage();
  const t = translations[language] || translations.nl;
  const mtb = t.meetTheBand || {
    title: "The Band",
    subtitle: language === "nl" ? "De leden van Chromattic." : "The members of Chromattic.",
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 uppercase tracking-widest font-display gradient-text">
          {mtb.title}
        </h2>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8">
          {mtb.subtitle}
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto"></div>
      </div>

      {/* Members grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {members.map((m) => {
          const src = `${BASE_URL}images/meettheband/${encodeURIComponent(m.imageFile)}`;
          const role = m.roles?.[language] || m.roles?.nl || "";
          return (
            <article
              key={m.name}
              className="group bg-black/50 rounded-2xl overflow-hidden border border-red-900/30 shadow-2xl hover:border-red-500/50 transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={src}
                  alt={`${m.name} - Chromattic`}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
              </div>
              <div className="p-6 text-left">
                <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">
                  {m.name}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {role}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default MeetTheBand;

