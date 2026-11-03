/**
 * Cookie banner. Analytics and the Mailchimp popup stay off until "Akkoord".
 */

import { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";
import { applyConsent, readConsent, writeConsent } from "../../utils/analytics";

function CookieConsent() {
  const { language } = useLanguage();
  const t = (translations[language] || translations.nl).cookies;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = readConsent();
    if (stored === "accepted") {
      applyConsent(true);
      setOpen(false);
    } else if (stored === "denied") {
      applyConsent(false);
      setOpen(false);
    } else {
      setOpen(true);
    }

    const reopen = () => setOpen(true);
    window.addEventListener("chromattic-consent-open", reopen);
    return () => window.removeEventListener("chromattic-consent-open", reopen);
  }, []);

  const choose = (value) => {
    writeConsent(value);
    applyConsent(value === "accepted");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="region"
      aria-label={t.title}
      className="fixed inset-x-0 bottom-0 z-[80] p-4 sm:p-6"
    >
      <div className="mx-auto max-w-3xl rounded-xl border border-red-900/60 bg-black/95 p-4 sm:p-6 text-left shadow-2xl shadow-black/60">
        <p className="text-xs font-bold uppercase tracking-widest text-red-400">{t.title}</p>
        <p className="mt-2 text-sm sm:text-base text-gray-200 leading-relaxed">{t.body}</p>
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="min-h-11 px-5 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold uppercase tracking-widest text-sm rounded-sm hover:from-red-500 hover:to-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            {t.accept}
          </button>
          <button
            type="button"
            onClick={() => choose("denied")}
            className="min-h-11 px-5 py-3 bg-black border border-red-600 text-white font-bold uppercase tracking-widest text-sm rounded-sm hover:bg-red-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            {t.reject}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieConsent;
