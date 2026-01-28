/**
 * Contact section component
 */

import { useEffect } from "react";
import { Mail } from "lucide-react";
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

  // Load Mailchimp validation script
  useEffect(() => {
    // Check if script is already loaded
    if (document.querySelector('script[src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"]')) {
      return;
    }

    const script = document.createElement("script");
    script.src = "//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js";
    script.async = true;
    document.body.appendChild(script);

    // Initialize Mailchimp field types
    if (typeof window !== "undefined") {
      window.fnames = new Array();
      window.ftypes = new Array();
      window.fnames[0] = "EMAIL";
      window.ftypes[0] = "email";
    }

    return () => {
      const existingScript = document.querySelector('script[src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"]');
      if (existingScript && document.body.contains(existingScript)) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

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
            <p className="text-red-400 font-semibold text-lg mb-4">
              <a
                href={`mailto:${BRAND.email}`}
                className="hover:underline"
                aria-label={`Stuur een e-mail naar ${BRAND.email}`}
              >
                {BRAND.email}
              </a>
            </p>

            <p className="text-gray-300 mb-6">
              {language === "nl" ? "Of via onze social media kanalen:" : "Or via our social media channels:"}
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

            {/* Mailchimp Embedded Form */}
            <div id="mc_embed_signup">
              <form
                action="https://rocks.us5.list-manage.com/subscribe/post?u=ba3ecc779bc4063fd1d13b7dc&amp;id=c87632ad01&amp;f_id=003948edf0"
                method="post"
                id="mc-embedded-subscribe-form"
                name="mc-embedded-subscribe-form"
                className="validate"
                target="_blank"
                noValidate
              >
                <div id="mc_embed_signup_scroll">
                  <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <div className="flex-1 relative">
                      <input
                        type="email"
                        name="EMAIL"
                        className="required email w-full px-6 py-3 bg-black/50 border border-red-900/50 rounded-sm text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 transition-all"
                        id="mce-EMAIL"
                        placeholder={tNewsletter.placeholder}
                        required
                      />
                      {/* Real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
                      <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
                        <input
                          type="text"
                          name="b_ba3ecc779bc4063fd1d13b7dc_c87632ad01"
                          tabIndex="-1"
                          value=""
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      name="subscribe"
                      id="mc-embedded-subscribe"
                      className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold uppercase tracking-widest text-sm rounded-sm hover:from-red-500 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-red-900/50 hover:shadow-red-500/50 flex items-center justify-center gap-2"
                    >
                      {tNewsletter.subscribe}
                    </button>
                  </div>
                  <div id="mce-responses" className="clear">
                    <div className="response text-red-400 text-sm mt-2" id="mce-error-response" style={{ display: "none" }}></div>
                    <div className="response text-red-400 text-sm mt-2" id="mce-success-response" style={{ display: "none" }}></div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

