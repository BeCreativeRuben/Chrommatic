/**
 * Language Context for i18n support
 */

import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../data/translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // Get from localStorage or default to 'nl'
    const saved = localStorage.getItem("chromattic-language");
    return saved || "nl";
  });

  useEffect(() => {
    localStorage.setItem("chromattic-language", language);
    document.documentElement.lang = language === "en" ? "en" : "nl";
    const meta = (translations[language] || translations.nl).meta;
    if (meta?.title) document.title = meta.title;
    const description = document.querySelector('meta[name="description"]');
    if (description && meta?.description) description.setAttribute("content", meta.description);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "nl" ? "en" : "nl"));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

