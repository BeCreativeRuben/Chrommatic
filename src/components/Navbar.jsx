import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <>
            <header className="sticky top-0 z-50 bg-black flex justify-between items-center px-6 py-4 border-b border-red-900">
                <a href="#" className="text-2xl font-bold">CHROMATTIC</a>
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

            {menuOpen && (
                <nav className="flex flex-col lg:hidden gap-4 p-6 border-b border-red-700 bg-black text-sm uppercase tracking-wide">
                    <a href="#releases" onClick={toggleMenu}>Releases</a>
                    <a href="#shows" onClick={toggleMenu}>Shows</a>
                    <a href="#media" onClick={toggleMenu}>Media</a>
                    <a href="#bio" onClick={toggleMenu}>Bio</a>
                    <a href="#contact" onClick={toggleMenu}>Contact</a>
                </nav>
            )}
        </>
    );
}

export default Navbar;
