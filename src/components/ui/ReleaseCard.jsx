/**
 * Release card component
 * @param {Object} props
 * @param {Object} props.release - Release data object
 */

import { useState, useEffect, useRef } from "react";
import { Apple, Music2, Youtube, ChevronDown, Music } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";
import LazyImage from "./LazyImage";

function ReleaseCard({ release }) {
  const { language } = useLanguage();
  const t = translations[language] || translations.nl;
  const [showOtherServices, setShowOtherServices] = useState(false);
  const dropdownRef = useRef(null);

  const { title, type, releaseDate, coverImage, description, links, tracks } = release;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowOtherServices(false);
      }
    };

    if (showOtherServices) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOtherServices]);

  const descriptionText =
    typeof description === "string" ? description : (description?.[language] || description?.nl || "");

  // Separate Spotify and YouTube links
  const spotifyLink = links?.find(link => link.platform === "Spotify");
  const youtubeLink = links?.find(link => link.platform === "YouTube");
  const appleMusicLink = links?.find(link => link.platform === "Apple Music");

  const locale = language === "nl" ? "nl-BE" : "en-GB";
  const formattedDate = new Date(releaseDate).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const getOtherLinkLabel = (link) => {
    const label = link?.label;
    if (typeof label === "string") return label;
    if (label && typeof label === "object") return label[language] || label.nl || label.en;
    return `${t.releases?.listenOn || (language === "nl" ? "Beluister op" : "Listen on")} ${link.platform}`;
  };

  return (
    <article className="bg-red-800 p-6 rounded-lg shadow-lg flex flex-col h-full">
      <div>
        <LazyImage
          src={coverImage}
          alt={`${title} cover artwork`}
          className="mb-4 rounded-lg w-full"
          loading="lazy"
        />
        <h3 className="text-2xl font-semibold mb-2">
          {title}
        </h3>
        <p className="text-gray-300 text-sm mb-2">
          {type}, {formattedDate}
        </p>
        <p className="text-gray-300 mb-2">{descriptionText}</p>
        {tracks && (
          <p className="text-gray-300 mb-2 text-sm">
            {language === "nl" ? "Tracks" : "Tracks"}: {tracks.map((track, i) => (
              <span key={i}>
                <em>{track}</em>
                {i < tracks.length - 1 && ", "}
              </span>
            ))}
          </p>
        )}
      </div>

      <div className="mt-auto">
        {/* Primary buttons */}
        {(spotifyLink || youtubeLink) && (
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mt-6">
            {spotifyLink && (
              <a
                href={spotifyLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="spotify-button flex-1 min-w-[160px] flex items-center justify-center gap-2 px-6 py-3 bg-[#1DB954] hover:bg-[#1ed760] text-white font-bold uppercase tracking-widest text-sm rounded-sm transform hover:scale-105 transition-all duration-300 shadow-lg shadow-[#1DB954]/50 hover:shadow-[#1ed760]/50 relative overflow-hidden group"
                aria-label={language === "nl" ? `Beluister ${title} op Spotify` : `Listen to ${title} on Spotify`}
              >
                <Music2 size={20} className="spotify-icon transition-transform duration-300 group-hover:rotate-12" />
                <span className="relative z-10">Spotify</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </a>
            )}
            {youtubeLink && (
              <a
                href={youtubeLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="youtube-button flex-1 min-w-[160px] flex items-center justify-center gap-2 px-6 py-3 bg-[#FF0000] hover:bg-[#ff1a1a] text-white font-bold uppercase tracking-widest text-sm rounded-sm transform hover:scale-105 transition-all duration-300 shadow-lg shadow-[#FF0000]/50 hover:shadow-[#ff1a1a]/50 relative overflow-hidden group"
                aria-label={language === "nl" ? `Bekijk ${title} op YouTube` : `Watch ${title} on YouTube`}
              >
                <Youtube size={20} className="youtube-icon transition-transform duration-300" />
                <span className="relative z-10">YouTube</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </a>
            )}
            
            {/* Other Streaming Services dropdown */}
            <div className="relative flex-1 min-w-[160px]" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setShowOtherServices(!showOtherServices)}
                className="other-services-button w-full flex items-center justify-center gap-2 px-6 py-3 bg-black/40 hover:bg-black/60 border border-red-900/40 hover:border-red-500/60 text-white font-bold uppercase tracking-widest text-sm rounded-sm transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
                aria-label={language === "nl" ? "Andere streamingdiensten" : "Other streaming services"}
                aria-expanded={showOtherServices}
              >
                <Music size={20} className="transition-transform duration-300" />
                <span className="relative z-10">
                  {language === "nl" ? "Andere Diensten" : "Other Services"}
                </span>
                <ChevronDown 
                  size={16} 
                  className={`transition-transform duration-300 ${showOtherServices ? "rotate-180" : ""}`}
                />
              </button>
              
              {showOtherServices && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-black/90 border border-red-900/50 rounded-sm shadow-2xl z-10 overflow-hidden">
                  {appleMusicLink && (
                    <a
                      href={appleMusicLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-red-900/30 transition-colors text-white border-b border-red-900/30"
                    >
                      <Apple size={20} className="flex-shrink-0" />
                      <span className="text-sm font-semibold">Apple Music</span>
                    </a>
                  )}
                  <a
                    href="https://www.deezer.com/en/artist/227349135"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-red-900/30 transition-colors text-white border-b border-red-900/30"
                  >
                    <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 16.894c-1.789 1.789-4.105 2.894-6.894 2.894s-5.105-1.105-6.894-2.894C2.105 15.105 1 12.789 1 10s1.105-5.105 2.894-6.894C5.683 1.317 7.999.212 10.788.212s5.105 1.105 6.894 2.894C19.471 4.895 20.576 7.211 20.576 10s-1.105 5.105-2.894 6.894z"/>
                        <path d="M10.5 7.5v9l7.5-4.5z"/>
                      </svg>
                    </div>
                    <span className="text-sm font-semibold">Deezer</span>
                  </a>
                  <a
                    href="https://music.amazon.com/artists/B0CGPXPYNH/chromattic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-red-900/30 transition-colors text-white border-b border-red-900/30"
                  >
                    <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                        <path d="M23.624 14.077c-.142.688-.506 1.234-1.098 1.627-.59.395-1.433.594-2.527.594H4.001v-4.968h15.995c1.094 0 1.936.2 2.527.594.592.393.956.939 1.098 1.627l.003.12zm-1.763 2.935c1.552 0 2.416-.385 2.594-1.155.177-.77.177-1.925 0-3.464-.178-1.54-1.042-2.315-2.594-2.315H4.001V3.001H0v17.998h3.999v-4.968h15.86z"/>
                      </svg>
                    </div>
                    <span className="text-sm font-semibold">Amazon Music</span>
                  </a>
                  <a
                    href="https://play.qobuz.com/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-red-900/30 transition-colors text-white"
                  >
                    <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2z"/>
                        <path d="M8 7v10l8-5z"/>
                      </svg>
                    </div>
                    <span className="text-sm font-semibold">Qobuz</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Other links (if any) */}
        {links &&
          links.length > 0 &&
          links.filter(
            (link) =>
              link.platform !== "Spotify" &&
              link.platform !== "YouTube" &&
              link.platform !== "Apple Music"
          ).length > 0 && (
            <div className="flex flex-col gap-2 mt-4">
              {links
                .filter(
                  (link) =>
                    link.platform !== "Spotify" &&
                    link.platform !== "YouTube" &&
                    link.platform !== "Apple Music"
                )
                .map((link, i) => {
                  const colorClass = link.color === "green-400" ? "text-green-300" : "text-white";
                  return (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${colorClass} hover:underline hover:text-gray-200`}
                    >
                      {getOtherLinkLabel(link)} →
                    </a>
                  );
                })}
            </div>
          )}
      </div>
    </article>
  );
}

export default ReleaseCard;
