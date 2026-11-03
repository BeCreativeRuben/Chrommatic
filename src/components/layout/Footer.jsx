/**
 * Footer component
 */

import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";

function Footer() {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();
  const t = (translations[language] || translations.nl).footer;

  return (
    <footer className="w-full bg-black py-6 text-center border-t border-red-700 text-sm text-gray-300">
      <div>&copy; {currentYear} {t.rights}</div>
      <div className="mt-2 text-sm text-gray-300">
        Website created by{" "}
        <a
          href="https://studiothielman.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center min-h-11 text-gray-200 hover:text-red-400 transition-colors underline underline-offset-4"
        >
          Studio Thielman
        </a>
        .
      </div>
      <div className="mt-3">
        <button
          type="button"
          className="min-h-11 px-3 text-sm text-gray-200 underline underline-offset-4 hover:text-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          onClick={() => window.dispatchEvent(new Event("chromattic-consent-open"))}
        >
          {t.cookies}
        </button>
      </div>
    </footer>
  );
}

export default Footer;
