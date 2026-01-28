/**
 * Releases data for Chromattic
 */

const BASE_URL = import.meta.env.BASE_URL;

export const releases = [
  {
    id: "shit",
    title: "SH!T",
    type: "Single",
    releaseDate: "2025-10-24",
    coverImage: `${BASE_URL}images/covers/shit-cover.jpg`,
    description: {
      nl: "Dit nummer is rechtlijnig en ruw opgebouwd, met vettige riffs en een energie die live meteen het publiek mee krijgt.",
      en: "This track is straightforward and roughly structured, with greasy riffs and energy that immediately gets the audience going live.",
    },
    links: [
      {
        platform: "Spotify",
        url: "https://open.spotify.com/album/7Hg286ePUEth3GutxzYtXf?si=WqwakX2yRbaFiBZA1fRJNw",
        color: "green-400",
      },
      {
        platform: "YouTube",
        url: "https://music.youtube.com/playlist?list=OLAK5uy_k6mzkolxdO6pZBKdpiMgsOoHn-xsml98Q&si=YHWQoIWJgiHasuW4",
        color: "red-400",
      },
      {
        platform: "Apple Music",
        url: "https://music.apple.com/us/album/sh-t-single/1847668706",
        color: "gray-300",
      },
    ],
  },
  {
    id: "walk-of-death",
    title: "Walk of Death",
    type: "Single",
    releaseDate: "2025-08-18",
    coverImage: `${BASE_URL}images/covers/walk-of-death-cover.jpg`,
    description: {
      nl: "Het contrast tussen rustige strofes en stevige refreinen geeft het nummer een sterke opbouw naar een donkere climax.",
      en: "The contrast between quiet verses and powerful choruses gives the track a strong build-up toward a dark climax.",
    },
    links: [
      {
        platform: "Spotify",
        url: "https://open.spotify.com/album/5B5uTe2CvcyqzQXijqFkbf?si=hMHmiHNwRnu2LwpMtumK9A",
        color: "green-400",
      },
      {
        platform: "YouTube",
        url: "https://music.youtube.com/playlist?list=OLAK5uy_klxWNsnFvWZdjiyiB7kE4GLTCNTQSHOnw&si=EkoNiEuJAcM3T6-N",
        color: "red-400",
      },
      {
        platform: "Apple Music",
        url: "https://music.apple.com/us/album/walk-of-death-single/1833011844",
        color: "gray-300",
      },
    ],
  },
  {
    id: "alex",
    title: "Alex",
    type: "Single",
    releaseDate: "2025-07-11",
    coverImage: `${BASE_URL}images/covers/alex-cover.jpg`,
    description: {
      nl: "Deze herwerkte versie geeft het nummer meer punch en dynamiek dan de originele opname op Silent Dejection.",
      en: "This reworked version gives the track more punch and dynamics than the original recording on Silent Dejection.",
    },
    links: [
      {
        platform: "Spotify",
        url: "https://open.spotify.com/album/0ER6e6HmuvVu7lAuXZNEJU?si=wLrq2TKDSkiJHPs-slghGg",
        color: "green-400",
      },
      {
        platform: "YouTube",
        url: "https://music.youtube.com/playlist?list=OLAK5uy_lg-_gy2_HBm9IfDT8E7YIxD-qFTlGUL3A&si=0o7t6Ll1Oji7iuLl",
        color: "red-400",
      },
      {
        platform: "Apple Music",
        url: "https://music.apple.com/us/album/alex-rerecorded-single/1824744227",
        color: "gray-300",
      },
    ],
  },
  {
    id: "sunrise",
    title: "Sunrise",
    type: "Single",
    releaseDate: "2025-06-21",
    coverImage: `${BASE_URL}images/covers/sunrise-cover.jpg`,
    description: {
      nl: "Met het hogere tempo en epische solo toont dit nummer een zwaardere en technischere kant van de band.",
      en: "With its higher tempo and epic solo, this track shows a heavier and more technical side of the band.",
    },
    links: [
      {
        platform: "Spotify",
        url: "https://open.spotify.com/album/4kQ4layIvH2VJK14LjZGZ5?si=Mlq_zZ5_SQu8g6TvyRsiBQ",
        color: "green-400",
      },
      {
        platform: "YouTube",
        url: "https://music.youtube.com/playlist?list=OLAK5uy_mNvT4beQ6xpzhyJ_qCx8G-ySXR8qjF1QM&si=JyLgIxHxwG0pNJmq",
        color: "red-400",
      },
      {
        platform: "Apple Music",
        url: "https://music.apple.com/us/album/sunrise-single/1815827151",
        color: "gray-300",
      },
    ],
  },
  {
    id: "silent-dejection",
    title: "Silent Dejection",
    type: "EP",
    releaseDate: "2024-04-26",
    coverImage: `${BASE_URL}images/covers/silent-dejection-cover.jpg`,
    description: {
      nl: "Onze debuut-EP met 3 nieuwe nummers die onze sound verder ontdekken",
      en: "Our debut EP with 3 new tracks that further explore our sound",
    },
    tracks: ["Running Away", "Alex", "Circles", "Super Messy"],
    links: [
      {
        platform: "Spotify",
        url: "https://open.spotify.com/album/30rLjgsQGTbm6j9Mwi6fgq?si=M16sGxnWSySaJXC8pAYAqg",
        color: "green-400",
      },
      {
        platform: "YouTube",
        url: "https://music.youtube.com/playlist?list=OLAK5uy_k9L8TLNusj3Xd5WVMZGQy5ZC3MYv9ZZv4&si=x8bi-oeP1NeBxcJD",
        color: "red-400",
      },
      {
        platform: "Apple Music",
        url: "https://music.apple.com/us/album/silent-dejection-ep/1743551521",
        color: "gray-300",
      },
    ],
  },
  {
    id: "circles",
    title: "Circles",
    type: "Single",
    releaseDate: "2023-08-27",
    coverImage: `${BASE_URL}images/logo.jpg`,
    description: {
      nl: "Onze eerste single, een krachtige introductie tot onze sound",
      en: "Our first single, a powerful introduction to our sound",
    },
    links: [
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/0MPvnRkSL8lHW6L4DawEcr?si=15c059e11dde448a",
        color: "green-400",
      },
      {
        platform: "YouTube",
        url: "https://music.youtube.com/playlist?list=OLAK5uy_k-7gdh57bLwMj6iNMoKNGqxOe-DOB6Zoc&si=YWC4uDaxTDmGBRcL",
        color: "red-400",
      },
      {
        platform: "Apple Music",
        url: "https://music.apple.com/us/album/circles-single/1704554170",
        color: "gray-300",
      },
      {
        platform: "YouTube Video",
        url: "https://www.youtube.com/watch?v=g9ULqy29kZw",
        color: "red-400",
        label: { nl: "Bekijk de videoclip", en: "Watch the video" },
      },
    ],
  },
];
