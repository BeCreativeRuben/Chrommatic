function Releases() {
    return (
        <section className="bg-black text-white py-16 px-4">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-4xl font-bold mb-10 text-center">🎶 Releases</h2>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* SUNRISE */}
                    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
                        <img src="/images/sunrise-cover.jpg" alt="Nieuwe single" className="mb-4 rounded-lg" />
                        <h3 className="text-2xl font-semibold mb-2">Sunrise – release op 21 juni 2025</h3>
                        <p className="text-gray-300 mb-2">Beluister onze nieuwe single binnenkort!</p>
                    </div>

                    {/* EP */}
                    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
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
                    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
                        <img src="/images/logo.jpg" alt="Circles cover" className="mb-4 rounded-lg" />
                        <h3 className="text-2xl font-semibold mb-2">Circles (Single, 27 augustus 2023)</h3>
                        <p className="text-gray-300 mb-2">
                            De eerste single van Chromattic – een krachtige introductie tot onze sound.
                        </p>
                        <a
                            href="https://open.spotify.com/track/0MPvnRkSL8lHW6L4DawEcr?si=15c059e11dde448a"
                            target="_blank"
                            className="text-green-400 hover:underline"
                        >
                            Beluister op Spotify →
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Releases;
