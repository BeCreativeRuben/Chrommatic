/**
 * Centralized image path constants
 */

const BASE_URL = import.meta.env.BASE_URL;

export const IMAGE_PATHS = {
  logo: `${BASE_URL}images/logo.jpg`,
  covers: {
    sunrise: `${BASE_URL}images/covers/sunrise-cover.jpg`,
    silentDejection: `${BASE_URL}images/covers/silent-dejection-cover.jpg`,
  },
  shows: {
    droomballon: `${BASE_URL}images/shows/droomballon.jpg`,
    popIsDead: `${BASE_URL}images/shows/pop-is-dead.jpg`,
    damberd: `${BASE_URL}images/shows/damberd.jpg`,
  },
};

