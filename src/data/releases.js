/**
 * Releases data for Chromattic
 */

const BASE_URL = import.meta.env.BASE_URL;

export const releases = [
  {
    id: "sunrise",
    title: "Sunrise",
    type: "Single",
    releaseDate: "2025-06-21",
    coverImage: `${BASE_URL}images/covers/sunrise-cover.jpg`,
    description: "Beluister onze nieuwe single binnenkort!",
    links: [],
  },
  {
    id: "silent-dejection",
    title: "Silent Dejection",
    type: "EP",
    releaseDate: "2024-04-26",
    coverImage: `${BASE_URL}images/covers/silent-dejection-cover.jpg`,
    description: "Onze debuut-EP met de tracks Running Away, Alex, Circles en Super Messy.",
    tracks: ["Running Away", "Alex", "Circles", "Super Messy"],
    links: [
      {
        platform: "Spotify",
        url: "https://open.spotify.com/album/0lXsZjxYHudBcbREiMVmPS?si=x8YtyAR2ShSkHgR0SFveeQ",
        color: "green-400",
      },
    ],
  },
  {
    id: "circles",
    title: "Circles",
    type: "Single",
    releaseDate: "2023-08-27",
    coverImage: `${BASE_URL}images/logo.jpg`,
    description: "De eerste single van Chromattic – een krachtige introductie tot onze sound.",
    links: [
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/0MPvnRkSL8lHW6L4DawEcr?si=15c059e11dde448a",
        color: "green-400",
      },
      {
        platform: "YouTube",
        url: "https://www.youtube.com/watch?v=g9ULqy29kZw",
        color: "red-400",
        label: "Bekijk de videoclip",
      },
    ],
  },
];

