import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Releases from "./components/Releases";
import Shows from "./components/Shows";
import Media from "./components/Media";
import Bio from "./components/Bio";
import Contact from "./components/Contact";

function App() {
    return (
        <div className="bg-black text-white font-sans">
            <Navbar />

            <section id="hero" className="py-20 px-4 text-center bg-red-900">
                <Hero />
            </section>

            <section id="releases" className="py-20 px-4 text-center">
                <Releases />
            </section>

            <section id="shows" className="py-20 px-4 text-center bg-red-900">
                <Shows />
            </section>

            <section id="media" className="py-20 px-4 text-center">
                <Media />
            </section>

            <section id="bio" className="py-20 px-4 text-center bg-red-900">
                <Bio />
            </section>

            <section id="contact" className="py-20 px-4 text-center">
                <Contact />
            </section>

            <footer className="fixed-bottom-0 left-0 w-full bg-black py-6 text-center border-t border-red-700 text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Chromattic. All rights reserved.
            </footer>
        </div>
    );
}

export default App;
