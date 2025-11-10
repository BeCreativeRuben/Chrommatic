/**
 * Newsletter subscription component
 */

import { useState } from "react";
import { Mail, Check, X } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";

function Newsletter() {
  const { language } = useLanguage();
  const t = translations[language].newsletter;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    // Using Formspree (free service) - replace with your form ID
    // Alternative: Mailchimp, EmailJS, etc.
    try {
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, language }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section className="bg-gradient-to-b from-black via-red-900/20 to-black py-16 px-4 border-t border-red-900/50">
      <div className="max-w-2xl mx-auto text-center">
        <Mail className="mx-auto mb-6 text-red-400" size={48} />
        <h2 className="text-4xl font-bold mb-4 uppercase tracking-widest font-display">
          {t.title}
        </h2>
        <p className="text-gray-300 mb-8 text-lg">
          {t.description}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.placeholder}
            required
            className="flex-1 px-6 py-3 bg-black/50 border border-red-900/50 rounded-sm text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 transition-all"
            disabled={status === "loading"}
          />
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold uppercase tracking-widest text-sm rounded-sm hover:from-red-500 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-red-900/50 hover:shadow-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            {status === "loading" ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>{t.subscribe}</span>
              </>
            ) : status === "success" ? (
              <>
                <Check size={20} />
                <span>{t.success}</span>
              </>
            ) : (
              t.subscribe
            )}
          </button>
        </form>

        {status === "error" && (
          <div className="mt-4 flex items-center justify-center gap-2 text-red-400">
            <X size={20} />
            <span>{t.error}</span>
          </div>
        )}
      </div>
    </section>
  );
}

export default Newsletter;

