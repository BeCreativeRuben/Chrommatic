/**
 * Social media links for Chromattic
 */

import { Instagram, Facebook, Youtube } from "lucide-react";
import { SOCIAL_URLS } from "./constants";

const [instagramUrl, facebookUrl, youtubeUrl] = SOCIAL_URLS;

export const socialLinks = [
  {
    platform: "Instagram",
    url: instagramUrl,
    icon: Instagram,
    ariaLabel: "Instagram",
  },
  {
    platform: "Facebook",
    url: facebookUrl,
    icon: Facebook,
    ariaLabel: "Facebook",
  },
  {
    platform: "YouTube",
    url: youtubeUrl,
    icon: Youtube,
    ariaLabel: "YouTube",
  },
];

