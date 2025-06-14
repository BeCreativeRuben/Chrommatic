import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Releases from "./components/Releases";
import Shows from "./components/Shows";
import Media from "./components/Media";
import Bio from "./components/Bio";
import Contact from "./components/Contact";

function App() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <div className="bg-black text-white font-sans">
            {/* Navbar */}
            <Navbar />

            {/* Mobile Menu */}
            {menuOpen && (
                <nav className="flex flex-col lg:hidden gap-4 p-6 border-b border-red-700 bg-black text-sm uppercase tracking-wide">
                    <a href="#releases" onClick={toggleMenu}>Releases</a>
                    <a href="#shows" onClick={toggleMenu}>Shows</a>
                    <a href="#media" onClick={toggleMenu}>Media</a>
                    <a href="#bio" onClick={toggleMenu}>Bio</a>
                    <a href="#contact" onClick={toggleMenu}>Contact</a>
                </nav>
            )}

            {/* Hero Section */}
            <Hero />

            {/* Placeholder Sections */}
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
