import { useState } from "react";
import { Menu, X } from "lucide-react"; // Voor hamburger & sluit icoon

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className="bg-black text-white fixed w-full z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="text-2xl font-bold tracking-widest">CHROMATTIC</div>

                <nav className="hidden md:flex space-x-6">
                    <a href="#bio" className="hover:text-pink-400">Bio</a>
                    <a href="#shows" className="hover:text-pink-400">Shows</a>
                    <a href="#releases" className="hover:text-pink-400">Releases</a>
                    <a href="#contact" className="hover:text-pink-400">Contact</a>
                </nav>

                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={toggleMenu}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-black border-t border-gray-800 px-4 pb-4 flex flex-col space-y-3">
                    <a href="#bio" className="hover:text-pink-400" onClick={toggleMenu}>Bio</a>
                    <a href="#shows" className="hover:text-pink-400" onClick={toggleMenu}>Shows</a>
                    <a href="#releases" className="hover:text-pink-400" onClick={toggleMenu}>Releases</a>
                    <a href="#contact" className="hover:text-pink-400" onClick={toggleMenu}>Contact</a>
                </div>
            )}
        </header>
    );
}

export default Navbar;
