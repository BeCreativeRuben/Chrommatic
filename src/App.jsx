// src/App.jsx
import { useState } from "react";
import Hero from "./components/Hero";
import Releases from "./components/Releases";
import Shows from "./components/Shows";
import Media from "./components/Media";
import Bio from "./components/Bio";
import Contact from "./components/Contact";
import { Menu, X } from "lucide-react";

function App() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <div className="bg-black text-white font-sans">
            {/* Navbar */}
            <header className="flex justify-between items-center px-6 py-4 border-b border-red-700">
                <div className="text-2xl font-bold">CHROMATTIC</div>
                <button
                    className="text-white lg:hidden"
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                >
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
                <nav className="hidden lg:flex gap-6 text-sm uppercase tracking-wide">
                    <a href="#releases" className="hover:text-red-400">Releases</a>
                    <a href="#shows" className="hover:text-red-400">Shows</a>
                    <a href="#media" className="hover:text-red-400">Media</a>
                    <a href="#bio" className="hover:text-red-400">Bio</a>
                    <a href="#contact" className="hover:text-red-400">Contact</a>
                </nav>
            </header>

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
