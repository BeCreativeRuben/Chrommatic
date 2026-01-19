/**
 * Release card component
 * @param {Object} props
 * @param {Object} props.release - Release data object
 */

import { Apple, Music2, Youtube } from "lucide-react";

function ReleaseCard({ release }) {
  const { title, type, releaseDate, coverImage, description, links, tracks } = release;

  // Separate Spotify and YouTube links
  const spotifyLink = links?.find(link => link.platform === "Spotify");
  const youtubeLink = links?.find(link => link.platform === "YouTube");
  const appleMusicLink = links?.find(link => link.platform === "Apple Music");

  return (
    <article className="bg-red-800 p-6 rounded-lg shadow-lg flex flex-col h-full">
      <div>
        <img
          src={coverImage}
          alt={`${title} cover artwork`}
          className="mb-4 rounded-lg w-full"
          loading="lazy"
        />
        <h3 className="text-2xl font-semibold mb-2">
          {title} ({type}, {new Date(releaseDate).toLocaleDateString("nl-BE", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })})
        </h3>
        <p className="text-gray-300 mb-2">{description}</p>
        {tracks && (
          <p className="text-gray-300 mb-2 text-sm">
            Tracks: {tracks.map((track, i) => (
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
        {(spotifyLink || youtubeLink || appleMusicLink) && (
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mt-6">
            {spotifyLink && (
              <a
                href={spotifyLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="spotify-button flex-1 min-w-[160px] flex items-center justify-center gap-2 px-6 py-3 bg-[#1DB954] hover:bg-[#1ed760] text-white font-bold uppercase tracking-widest text-sm rounded-sm transform hover:scale-105 transition-all duration-300 shadow-lg shadow-[#1DB954]/50 hover:shadow-[#1ed760]/50 relative overflow-hidden group"
                aria-label={`Beluister ${title} op Spotify`}
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
                aria-label={`Bekijk ${title} op YouTube`}
              >
                <Youtube size={20} className="youtube-icon transition-transform duration-300" />
                <span className="relative z-10">YouTube</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </a>
            )}
            {appleMusicLink && (
              <a
                href={appleMusicLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="apple-music-button flex-1 min-w-[160px] flex items-center justify-center gap-2 px-6 py-3 bg-black hover:bg-zinc-900 text-white font-bold uppercase tracking-widest text-sm rounded-sm transform hover:scale-105 transition-all duration-300 shadow-lg shadow-black/40 hover:shadow-black/60 border border-white/15 hover:border-white/25 relative overflow-hidden group"
                aria-label={`Beluister ${title} op Apple Music`}
              >
                <Apple size={20} className="apple-icon transition-transform duration-300 group-hover:-rotate-6" />
                <span className="relative z-10">Apple Music</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </a>
            )}
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
                  const colorClass = link.color === "green-400" ? "text-green-400" : "text-red-400";
                  return (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${colorClass} hover:underline`}
                    >
                      {link.label || `Beluister op ${link.platform}`} →
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
