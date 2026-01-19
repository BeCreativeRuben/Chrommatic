/**
 * Contact section component
 */

import { useState } from "react";
import { Mail, Check, X } from "lucide-react";
import { BRAND } from "../../data/constants";
import { socialLinks } from "../../data/socialLinks";
import SocialLink from "../ui/SocialLink";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";

function Contact() {
  const { language } = useLanguage();
  const t = translations[language] || translations.nl;
  const tContact = t.contact;
  const tNewsletter = t.newsletter;

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
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 uppercase tracking-widest font-display gradient-text">
          {tContact.title}
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto"></div>
      </div>

      <div className="bg-gradient-to-br from-black via-red-900/20 to-black rounded-2xl p-8 md:p-12 border border-red-900/50 shadow-2xl">
        <div className="grid md:grid-cols-2 gap-10 text-left">
          {/* Contact column */}
          <div>
            <h3 className="text-2xl font-bold mb-4 uppercase tracking-widest font-display">
              {tContact.title}
            </h3>
            <p className="text-gray-300 mb-4">
              {tContact.description}
            </p>
            <p className="text-red-400 font-semibold text-lg mb-8">
              <a
                href={`mailto:${BRAND.email}`}
                className="hover:underline"
                aria-label={`Stuur een e-mail naar ${BRAND.email}`}
              >
                {BRAND.email}
              </a>
            </p>

            <nav
              aria-label="Social media links"
              className="flex flex-wrap gap-6 text-gray-400 text-2xl"
            >
              {socialLinks.map((link) => (
                <SocialLink
                  key={link.platform}
                  url={link.url}
                  icon={link.icon}
                  ariaLabel={link.ariaLabel}
                />
              ))}
            </nav>
          </div>

          {/* Newsletter column */}
          <div className="md:border-l md:border-red-900/40 md:pl-10">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="text-red-400" size={28} aria-hidden="true" />
              <h3 className="text-2xl font-bold uppercase tracking-widest font-display">
                {tNewsletter.title}
              </h3>
            </div>
            <p className="text-gray-300 mb-6">
              {tNewsletter.description}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={tNewsletter.placeholder}
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
                    <span>{tNewsletter.subscribe}</span>
                  </>
                ) : status === "success" ? (
                  <>
                    <Check size={20} />
                    <span>{tNewsletter.success}</span>
                  </>
                ) : (
                  tNewsletter.subscribe
                )}
              </button>
            </form>

            {status === "error" && (
              <div className="mt-4 flex items-center gap-2 text-red-400">
                <X size={20} />
                <span>{tNewsletter.error}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

