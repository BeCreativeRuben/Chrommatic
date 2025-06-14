function Contact() {
    return (
        <div className="bg-black text-white font-sans p-8">
            <h2 className="text-4xl font-bold mb-6">Contact</h2>
            <p className="text-gray-300 mb-4">
                Boekingen, vragen of samenwerkingen? Je kan ons altijd bereiken via e-mail:
            </p>
            <p className="text-red-400 font-semibold text-lg mb-8">
                <a href="mailto:chromattic.contact@gmail.com">chromattic.contact@gmail.com</a>
            </p>

            <div className="flex justify-center gap-6 text-gray-400 text-2xl mb-8">
                <a href="https://www.instagram.com/chromattictheband" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-red-500">
                    <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.facebook.com/chromattictheband" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-red-500">
                    <i className="fab fa-facebook"></i>
                </a>
                <a href="https://www.youtube.com/@chromattictheband" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-red-500">
                    <i className="fab fa-youtube"></i>
                </a>
                {/* Voeg eventueel andere links toe, zoals Spotify, TikTok, etc. */}
            </div>

            <p className="text-gray-400 text-sm">
                Binnenkort lanceren we een nieuwsbrief waarmee je als eerste op de hoogte bent van nieuwe releases en shows.
            </p>
        </div>
    );
}

export default Contact;