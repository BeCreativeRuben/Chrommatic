/**
 * Contact section component
 */

import { BRAND } from "../../data/constants";
import { socialLinks } from "../../data/socialLinks";
import SocialLink from "../ui/SocialLink";

function Contact() {
  return (
    <div className="bg-black text-white font-sans p-8">
      <h2 className="text-4xl font-bold mb-6">Contact</h2>
      <p className="text-gray-300 mb-4">
        Boekingen, vragen of samenwerkingen? Je kan ons altijd bereiken via e-mail:
      </p>
      <p className="text-red-400 font-semibold text-lg mb-8">
        <a href={`mailto:${BRAND.email}`} className="hover:underline" aria-label={`Stuur een e-mail naar ${BRAND.email}`}>
          {BRAND.email}
        </a>
      </p>

      <nav aria-label="Social media links" className="flex justify-center gap-6 text-gray-400 text-2xl mb-8">
        {socialLinks.map((link) => (
          <SocialLink
            key={link.platform}
            url={link.url}
            icon={link.icon}
            ariaLabel={link.ariaLabel}
          />
        ))}
      </nav>

      <p className="text-gray-400 text-sm">
        Binnenkort lanceren we een nieuwsbrief waarmee je als eerste op de hoogte bent van nieuwe releases en shows.
      </p>
    </div>
  );
}

export default Contact;

