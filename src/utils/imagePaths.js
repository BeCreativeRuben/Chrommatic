/**
 * Centralized image path constants
 */

const BASE_URL = import.meta.env.BASE_URL;

export const IMAGE_PATHS = {
  logo: `${BASE_URL}images/logo.jpg`,
  logoNav: `${BASE_URL}images/logo-nav.webp`,
  logoTransparent: `${BASE_URL}images/logo-transparent.webp`,
  heroBand: `${BASE_URL}images/hero-band.webp`,
  heroBandMobile: `${BASE_URL}images/hero-band-mobile.webp`,
  covers: {
    sunrise: `${BASE_URL}images/covers/sunrise-cover.webp`,
    silentDejection: `${BASE_URL}images/covers/silent-dejection-cover.webp`,
  },
  shows: {
    droomballon: `${BASE_URL}images/shows/droomballon.webp`,
    popIsDead: `${BASE_URL}images/shows/pop-is-dead.webp`,
    damberd: `${BASE_URL}images/shows/damberd.webp`,
  },
};

