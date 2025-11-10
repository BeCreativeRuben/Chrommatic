/**
 * Media section component
 */

function Media() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-8">Media</h2>
      <p className="text-gray-300 mb-6">
        Bekijk hier onze officiële videoclip van <strong>Circles</strong>.
      </p>

      <div className="relative w-full max-w-2xl aspect-video mx-auto rounded-lg overflow-hidden shadow-lg">
        <iframe
          className="w-full h-full"
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

