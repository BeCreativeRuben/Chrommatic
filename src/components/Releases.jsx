function Releases() {
    return (
        <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold mb-10 text-center">Releases</h2>

            <div className="grid md:grid-cols-2 gap-12">
                {/* SUNRISE */}
                <div className="bg-red-800 p-6 rounded-lg shadow-lg">
                    <img src="/images/sunrise-cover.jpg" alt="Sunrise cover" className="mb-4 rounded-lg" />
                    <h3 className="text-2xl font-semibold mb-2">Sunrise – release op 21 juni 2025</h3>
                    <p className="text-gray-300 mb-2">Beluister onze nieuwe single binnenkort!</p>
                </div>

                {/* EP */}
                <div className="bg-red-800 p-6 rounded-lg shadow-lg">
                    <img src="/images/silent-dejection-cover.jpg" alt="Silent Dejection cover" className="mb-4 rounded-lg" />
                    <h3 className="text-2xl font-semibold mb-2">Silent Dejection (EP, 26 april 2024)</h3>
                    <p className="text-gray-300 mb-2">
                        Onze debuut-EP met de tracks <em>Running Away</em>, <em>Alex</em>, <em>Circles</em> en <em>Super Messy</em>.
                    </p>
                    <a
                        href="https://open.spotify.com/album/0lXsZjxYHudBcbREiMVmPS?si=x8YtyAR2ShSkHgR0SFveeQ"
                        target="_blank"
                        className="text-green-400 hover:underline"
                    >
                        Beluister op Spotify →
                    </a>
                </div>

                {/* CIRCLES */}
                <div className="bg-red-800 p-6 rounded-lg shadow-lg">
                    <img src="/images/logo.jpg" alt="Circles single cover" className="mb-4 rounded-lg" />
                    <h3 className="text-2xl font-semibold mb-2">Circles (Single, 27 augustus 2023)</h3>
                    <p className="text-gray-300 mb-4">
                        De eerste single van Chromattic – een krachtige introductie tot onze sound.
                    </p>
                    <div className="flex flex-col gap-2">
                        <a
                            href="https://open.spotify.com/track/0MPvnRkSL8lHW6L4DawEcr?si=15c059e11dde448a"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-400 hover:underline"
                        >
                            Beluister op Spotify →
                        </a>
                        <a
                            href="https://www.youtube.com/watch?v=g9ULqy29kZw"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-400 hover:underline"
                        >
                            Bekijk de videoclip →
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Releases;
