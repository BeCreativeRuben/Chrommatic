function Hero() {
    return (
        <section className="bg-gradient-to-b from-black via-gray-900 to-black text-white py-20 px-4 text-center">
            <div className="max-w-3xl mx-auto">
                <img
                    src="/images/logo.jpg"
                    alt="Chromattic logo"
                    className="w-40 h-auto mx-auto mb-6 max-w-xs"
                />
                <h1 className="text-5xl font-bold mb-4">CHROMATTIC</h1>
                <p className="text-lg mb-6 text-gray-300">
                    Een Belgische alternatieve rockband die nostalgie naar 2000's pop punk mengt met moderne producties. 🎸🔥
                </p>
                <div className="flex justify-center gap-4">
                    <a
                        href="https://open.spotify.com/artist/1XSbF4aeeJK66wbdcaMTRx?si=uFAA2ckASXaGwnylrM51MQ"
                        target="_blank"
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition"
                    >
                        🎧 Beluister op Spotify
                    </a>
                    <a
                        href="https://www.instagram.com/chromattic_band/"
                        target="_blank"
                        className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full transition"
                    >
                        📸 Volg ons op Instagram
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Hero;
