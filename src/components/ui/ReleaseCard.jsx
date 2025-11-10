/**
 * Release card component
 * @param {Object} props
 * @param {Object} props.release - Release data object
 */

function ReleaseCard({ release }) {
  const { title, type, releaseDate, coverImage, description, links, tracks } = release;

  return (
    <article className="bg-red-800 p-6 rounded-lg shadow-lg">
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
      {links && links.length > 0 && (
        <div className="flex flex-col gap-2 mt-4">
          {links.map((link, i) => {
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
    </article>
  );
}

export default ReleaseCard;

