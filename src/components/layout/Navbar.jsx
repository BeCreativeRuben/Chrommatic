/**
 * Navigation bar component with logo, active states, and improved styling
 */

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { BRAND } from "../../data/constants";
import { IMAGE_PATHS } from "../../utils/imagePaths";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";

const getNavLinks = (t) => [
  { href: "#releases", label: t.nav.releases, id: "releases" },
  { href: "#shows", label: t.nav.shows, id: "shows" },
  { href: "#media", label: t.nav.media, id: "media" },
  { href: "#bio", label: t.nav.bio, id: "bio" },
  { href: "#contact", label: t.nav.contact, id: "contact" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogo, setShowLogo] = useState(true); // Toggle between logo and text
  const sectionIds = ["hero", "releases", "shows", "media", "bio", "contact"];
  const activeSection = useScrollSpy(sectionIds);
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-gradient-to-b from-black via-black/95 to-black/90 backdrop-blur-md flex justify-between items-center px-6 py-4 border-b border-red-900/50 shadow-xl shadow-red-900/20">
        <a 
          href="#hero" 
          className="flex items-center gap-3 group" 
          aria-label="Home"
          onClick={(e) => handleLinkClick(e, "#hero")}
        >
          {showLogo ? (
            <img
              src={IMAGE_PATHS.logo}
              alt="Chromattic logo"
              className="h-10 w-auto logo-metallic cursor-pointer"
              loading="eager"
            />
          ) : (
            <span className="text-2xl font-bold gradient-text tracking-widest font-display">
              {BRAND.name}
            </span>
          )}
        </a>
        
        <button
          className="text-white lg:hidden z-50 relative"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        
        <div className="hidden lg:flex items-center gap-6">
          <nav className="flex gap-8 text-sm uppercase tracking-widest font-semibold" aria-label="Main navigation">
            {getNavLinks(t).map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`nav-link ${isActive ? "active" : ""} transition-all duration-300`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, "#contact")}
            className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold uppercase tracking-widest text-sm rounded-sm hover:from-red-500 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-red-900/50 hover:shadow-red-500/50"
          >
            {t.nav.bookNow}
          </a>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-2 text-sm uppercase tracking-widest font-semibold text-white hover:text-red-400 transition-colors border border-white/20 hover:border-red-400/50 rounded-sm"
            aria-label={`Switch to ${language === "nl" ? "English" : "Nederlands"}`}
            title={`Switch to ${language === "nl" ? "English" : "Nederlands"}`}
          >
            <span className="text-xl">
              {language === "nl" ? "🇳🇱" : "🇬🇧"}
            </span>
            <span>{language === "nl" ? "EN" : "NL"}</span>
          </button>
        </div>
      </header>

      {/* Mobile Menu - Fixed Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-gradient-to-b from-black via-black/98 to-black/95 backdrop-blur-lg lg:hidden">
          <nav
            className="flex flex-col gap-8 p-8 pt-24 text-xl uppercase tracking-widest font-semibold h-full"
            aria-label="Mobile navigation"
          >
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center gap-2 px-4 py-3 text-lg uppercase tracking-widest font-semibold text-white hover:text-red-400 transition-colors border border-white/20 hover:border-red-400/50 rounded-sm mb-4"
              aria-label={`Switch to ${language === "nl" ? "English" : "Nederlands"}`}
            >
              <span className="text-2xl">
                {language === "nl" ? "🇳🇱" : "🇬🇧"}
              </span>
              <span>{language === "nl" ? "EN" : "NL"}</span>
            </button>
            {getNavLinks(t).map((link, index) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`nav-link ${isActive ? "active" : ""} transition-all duration-300 text-white hover:text-red-400`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {link.label}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              className="mt-4 px-8 py-4 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold uppercase tracking-widest text-lg rounded-sm hover:from-red-500 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-red-900/50 hover:shadow-red-500/50 text-center"
            >
              {t.nav.bookNow}
            </a>
          </nav>
        </div>
      )}
    </>
  );
}

export default Navbar;
