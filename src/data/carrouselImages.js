/**
 * Carousel images (served from /public/images/carrousel)
 */

const BASE_URL = import.meta.env.BASE_URL;

function hashString(str) {
  // Simple deterministic hash
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return function rng() {
    a |= 0;
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle(items, seed) {
  const arr = [...items];
  const rand = mulberry32(seed);
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const imageFiles = [
  "burgies on stage joeri.jpg",
  "burgies on stage korneel.jpg",
  "burgies on stage korneel1.jpg",
  "burgies on stage korneel2.jpg",
  "burgies on stage korneel3.jpg",
  "burgies on stage nand.jpg",
  "burgies on stage publiek.jpg",
  "burgies on stage publiek01.jpg",
  "burgies on stage publiek02.jpg",
  "burgies on stage publiek03.jpg",
  "burgies on stage publiek04.jpg",
  "burgies on stage publiek05.jpg",
  "burgies on stage publiek06.jpg",
  "burgies on stage publiek07.jpg",
  "burgies on stage publiek08.jpg",
  "burgies on stage publiek09.jpg",
  "burgies on stage publiek10.jpg",
  "burgies on stage samen.jpg",
  "burgies on stage samen1.jpg",
  "burgies on stage tijl.jpg",
  "burgies on stage tijl1.jpg",
  "burgies on stage tijl2.jpg",
  "burgies on stage tijl3.jpg",
  "burgies on stage tijl4.jpg",
  "damberd gitaren.jpg",
  "damberd korneel.jpg",
  "damberd nand.jpg",
  "damberd nand1.jpg",
  "damberd nt.jpg",
  "damberd samen.jpg",
  "damberd samen1.jpg",
  "damberd samen2.jpg",
  "damberd tj.jpg",
  "damberd tj1.jpg",
  "damberd tj2.jpg",
  "droomballon joeri.jpg",
  "droomballon joeri1.jpg",
  "droomballon joeri2.jpg",
  "droomballon korneel.jpg",
  "droomballon korneel1.jpg",
  "droomballon korneel2.jpg",
  "droomballon nand.jpg",
  "droomballon nand1.jpg",
  "droomballon nand2.jpg",
  "droomballon nand3.jpg",
  "droomballon nt.jpg",
  "droomballon samen.jpg",
  "droomballon samen1.jpg",
  "droomballon samen2.jpg",
  "droomballon tijl.jpg",
  "fotoshoot gek zw.jpg",
  "fotoshoot gek.jpg",
  "Pop Is Dead (26).jpg",
  "Pop Is Dead (27).jpg",
  "Pop Is Dead (28).jpg",
  "Pop Is Dead (29).jpg",
  "Pop Is Dead (30).jpg",
  "Pop Is Dead (31).jpg",
  "Pop Is Dead (32).jpg",
  "Pop Is Dead (33).jpg",
  "Pop Is Dead (34).jpg",
  "Pop Is Dead (35).jpg",
  "Pop Is Dead (36).jpg",
  "Pop Is Dead (37).jpg",
  "Pop Is Dead (38).jpg",
  "Pop Is Dead (41).jpg",
  "Pop Is Dead (42).jpg",
  "Pop Is Dead (43).jpg",
  "Pop Is Dead (44).jpg",
  "Pop Is Dead (45).jpg",
  "Pop Is Dead (46).jpg",
  "Pop Is Dead (47).jpg",
  "Pop Is Dead (48).jpg",
  "Pop Is Dead (49).jpg",
  "Pop Is Dead (50).jpg",
  "Pop Is Dead (51).jpg",
  "Pop Is Dead (52).jpg",
  "Pop Is Dead (53).jpg",
  "Pop Is Dead (54).jpg",
  "Pop Is Dead (55).jpg",
  "Pop Is Dead (56).jpg",
  "Pop Is Dead (57).jpg",

  // Charlatan (12 maart 2026) - highlights + Media kanaal
  "charlatan-01.png",
  "charlatan-02.png",
  "charlatan-03.png",
  "charlatan-04.png",
  "charlatan-05.png",
  "charlatan-06.png",
  "charlatan-07.png",
  "charlatan-08.png",
  "charlatan-09.png",
  "charlatan-10.png",
  "charlatan-11.png",
  "charlatan-12.png",
  "charlatan-13.png",
  "charlatan-14.png",
  "charlatan-15.png",
  "charlatan-16.png",
  "charlatan-17.png",
  "charlatan-18.png",
  "charlatan-19.png",
  "charlatan-20.png",
  "charlatan-21.png",
  "charlatan-22.png",
  "charlatan-23.png",
  "charlatan-24.png",
  "charlatan-25.png",
  "charlatan-26.png",
  "charlatan-27.png",
  "charlatan-28.png",
  "charlatan-29.png",
  "charlatan-30.png",
  "charlatan-31.png",
  "charlatan-32.png",
  "charlatan-33.png",
  "charlatan-34.png",
  "charlatan-35.png",
  "charlatan-36.png",
  "charlatan-37.png",
  "charlatan-38.png",
];

export const allCarouselImages = imageFiles.map((file) => ({
  src: `${BASE_URL}images/carrousel/${encodeURIComponent(file)}`,
  alt: file.replace(/\.[^.]+$/, ""),
}));

// Shuffle daily (stable within a day, different from day-to-day)
const seed = hashString(`chromattic-carousel:${new Date().toISOString().slice(0, 10)}`);
const shuffledFiles = seededShuffle(imageFiles, seed);

export const carouselImages = shuffledFiles.map((file) => ({
  src: `${BASE_URL}images/carrousel/${encodeURIComponent(file)}`,
  alt: file.replace(/\.[^.]+$/, ""),
}));

