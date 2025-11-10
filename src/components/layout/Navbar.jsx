/**
 * Navigation bar component
 */

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { BRAND } from "../../data/constants";

const navLinks = [
  { href: "#releases", label: "Releases" },
  { href: "#shows", label: "Shows" },
  { href: "#media", label: "Media" },
  { href: "#bio", label: "Bio" },
  { href: "#contact", label: "Contact" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-black flex justify-between items-center px-6 py-4 border-b border-red-900">
        <a href="#hero" className="text-2xl font-bold" aria-label="Home">
          {BRAND.name}
        </a>
        <button
          className="text-white lg:hidden"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        <nav className="hidden lg:flex gap-6 text-sm uppercase tracking-wide" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-red-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      {menuOpen && (
        <nav
          className="flex flex-col lg:hidden gap-4 p-6 border-b border-red-700 bg-black text-sm uppercase tracking-wide"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="hover:text-red-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </>
  );
}

export default Navbar;

