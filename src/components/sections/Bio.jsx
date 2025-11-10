/**
 * Bio section component
 */

import { IMAGE_PATHS } from "../../utils/imagePaths";

function Bio() {
  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12">Bio</h2>

      {/* Eerste blok - Tekst */}
      <div className="mb-16">
        <p className="text-lg leading-relaxed text-gray-300">
          Chromattic is een alternatieve rockband uit het Waasland die de nostalgie van 2000's poppunk mengt met moderne sounds. Sinds hun ontstaan begin 2023 heeft het viertal een indrukwekkend parcours afgelegd: optredens in iconische cafés en jeugdhuizen, een debuutsingle, een stevige EP en binnenkort zelfs een volledig album. De band bestaat uit vier jeugdvrienden die al jaren samen muziek maken, wat duidelijk voelbaar is in hun energieke live-shows en hechte groepsdynamiek.
        </p>
      </div>

      {/* Tweede blok - Foto + Tekst */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
        <img
          src={IMAGE_PATHS.shows.droomballon}
          alt="Chromattic live @ Droomland"
          className="w-full md:w-1/2 rounded-lg shadow-lg"
          loading="lazy"
        />
        <p className="text-lg leading-relaxed text-gray-300 md:w-1/2">
          In augustus 2023 brachten ze hun eerste single 'Circles' uit, gevolgd door de EP <i>Silent Dejection</i> in april 2024. Hierop staan de nummers 'Running Away', 'Alex', 'Circles' en 'Super Messy', die allemaal de verschillende gezichten van de band tonen – van melancholie tot pure chaos.
        </p>
      </div>

      {/* Derde blok - Foto + Tekst */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-16">
        <img
          src={IMAGE_PATHS.shows.popIsDead}
          alt="Chromattic @ Pop Is Dead"
          className="w-full md:w-1/2 rounded-lg shadow-lg"
          loading="lazy"
        />
        <p className="text-lg leading-relaxed text-gray-300 md:w-1/2">
          Met optredens op o.a. Pop Is Dead, Droomland en Damberd heeft Chromattic zich snel in de alternatieve scene genesteld. De band staat bekend om hun ruwe maar eerlijke sound, die zowel live als in studio tot uiting komt. Elk optreden is een mix van nostalgie, energie en connectie met het publiek.
        </p>
      </div>

      {/* Vierde blok - Foto + Tekst */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        <img
          src={IMAGE_PATHS.shows.damberd}
          alt="Chromattic @ Damberd"
          className="w-full md:w-1/2 rounded-lg shadow-lg"
          loading="lazy"
        />
        <p className="text-lg leading-relaxed text-gray-300 md:w-1/2">
          Met een debuutalbum in de maak en een eerste single gepland op 21 juni 2025, kijkt Chromattic vooruit. De groep belooft een nog ambitieuzer geluid, maar zonder hun roots te vergeten. De toekomst oogt fel, luid en vooral: oprecht.
        </p>
      </div>
    </div>
  );
}

export default Bio;

