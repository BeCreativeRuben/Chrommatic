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


// Human-readable alt text per photo set (the file name stays the gallery "tag")
const SET_LABELS = {
  "burgies on stage": "Burgies on Stage (Delta Club, Gent)",
  charlatan: "Charlatan (Gent)",
  damberd: "Café Het Damberd (Gent)",
  droomballon: "Droomland (Nieuwkerken-Waas)",
  "pop is dead": "Pop Is Dead (Sint-Niklaas)",
  fotoshoot: "fotoshoot",
};

function toImage(file) {
  const tag = file.replace(/\.[^.]+$/, "");
  const lower = tag.toLowerCase();
  const set = Object.keys(SET_LABELS).find((k) => lower.startsWith(k));
  const alt = set
    ? set === "fotoshoot"
      ? "Chromattic tijdens een fotoshoot"
      : `Chromattic live op ${SET_LABELS[set]}`
    : `Chromattic - ${tag}`;
  return {
    src: `${BASE_URL}images/carrousel/${encodeURIComponent(file)}`,
    alt,
    tag,
  };
}

const imageFiles = [
  "burgies on stage joeri.webp",
  "burgies on stage korneel.webp",
  "burgies on stage korneel1.webp",
  "burgies on stage korneel2.webp",
  "burgies on stage korneel3.webp",
  "burgies on stage nand.webp",
  "burgies on stage publiek.webp",
  "burgies on stage publiek01.webp",
  "burgies on stage publiek02.webp",
  "burgies on stage publiek03.webp",
  "burgies on stage publiek04.webp",
  "burgies on stage publiek05.webp",
  "burgies on stage publiek06.webp",
  "burgies on stage publiek07.webp",
  "burgies on stage publiek08.webp",
  "burgies on stage publiek09.webp",
  "burgies on stage publiek10.webp",
  "burgies on stage samen.webp",
  "burgies on stage samen1.webp",
  "burgies on stage tijl.webp",
  "burgies on stage tijl1.webp",
  "burgies on stage tijl2.webp",
  "burgies on stage tijl3.webp",
  "burgies on stage tijl4.webp",
  "damberd gitaren.webp",
  "damberd korneel.webp",
  "damberd nand.webp",
  "damberd nand1.webp",
  "damberd nt.webp",
  "damberd samen.webp",
  "damberd samen1.webp",
  "damberd samen2.webp",
  "damberd tj.webp",
  "damberd tj1.webp",
  "damberd tj2.webp",
  "droomballon joeri.webp",
  "droomballon joeri1.webp",
  "droomballon joeri2.webp",
  "droomballon korneel.webp",
  "droomballon korneel1.webp",
  "droomballon korneel2.webp",
  "droomballon nand.webp",
  "droomballon nand1.webp",
  "droomballon nand2.webp",
  "droomballon nand3.webp",
  "droomballon nt.webp",
  "droomballon samen.webp",
  "droomballon samen1.webp",
  "droomballon samen2.webp",
  "droomballon tijl.webp",
  "fotoshoot gek zw.webp",
  "fotoshoot gek.webp",
  "Pop Is Dead (26).webp",
  "Pop Is Dead (27).webp",
  "Pop Is Dead (28).webp",
  "Pop Is Dead (29).webp",
  "Pop Is Dead (30).webp",
  "Pop Is Dead (31).webp",
  "Pop Is Dead (32).webp",
  "Pop Is Dead (33).webp",
  "Pop Is Dead (34).webp",
  "Pop Is Dead (35).webp",
  "Pop Is Dead (36).webp",
  "Pop Is Dead (37).webp",
  "Pop Is Dead (38).webp",
  "Pop Is Dead (41).webp",
  "Pop Is Dead (42).webp",
  "Pop Is Dead (43).webp",
  "Pop Is Dead (44).webp",
  "Pop Is Dead (45).webp",
  "Pop Is Dead (46).webp",
  "Pop Is Dead (47).webp",
  "Pop Is Dead (48).webp",
  "Pop Is Dead (49).webp",
  "Pop Is Dead (50).webp",
  "Pop Is Dead (51).webp",
  "Pop Is Dead (52).webp",
  "Pop Is Dead (53).webp",
  "Pop Is Dead (54).webp",
  "Pop Is Dead (55).webp",
  "Pop Is Dead (56).webp",
  "Pop Is Dead (57).webp",

  // Charlatan (12 maart 2026) - highlights + Media kanaal
  "charlatan-01.webp",
  "charlatan-02.webp",
  "charlatan-03.webp",
  "charlatan-04.webp",
  "charlatan-05.webp",
  "charlatan-06.webp",
  "charlatan-07.webp",
  "charlatan-08.webp",
  "charlatan-09.webp",
  "charlatan-10.webp",
  "charlatan-11.webp",
  "charlatan-12.webp",
  "charlatan-13.webp",
  "charlatan-14.webp",
  "charlatan-15.webp",
  "charlatan-16.webp",
  "charlatan-17.webp",
  "charlatan-18.webp",
  "charlatan-19.webp",
  "charlatan-20.webp",
  "charlatan-21.webp",
  "charlatan-22.webp",
  "charlatan-23.webp",
  "charlatan-24.webp",
  "charlatan-25.webp",
  "charlatan-26.webp",
  "charlatan-27.webp",
  "charlatan-28.webp",
  "charlatan-29.webp",
  "charlatan-30.webp",
  "charlatan-31.webp",
  "charlatan-32.webp",
  "charlatan-33.webp",
  "charlatan-34.webp",
  "charlatan-35.webp",
  "charlatan-36.webp",
  "charlatan-37.webp",
  "charlatan-38.webp",
];

export const allCarouselImages = imageFiles.map(toImage);

// Shuffle daily (stable within a day, different from day-to-day)
const seed = hashString(`chromattic-carousel:${new Date().toISOString().slice(0, 10)}`);
const shuffledFiles = seededShuffle(imageFiles, seed);

export const carouselImages = shuffledFiles.map(toImage);

