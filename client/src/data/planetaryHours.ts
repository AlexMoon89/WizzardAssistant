import { TattvicTide } from "@/types";

// Chaldean order for planetary hours
export const CHALDEAN_ORDER = [
  "saturn",
  "jupiter",
  "mars",
  "sun",
  "venus",
  "mercury",
  "moon",
];

// Day rulers (Sunday = Sun, Monday = Moon, etc.)
export const DAY_RULERS = [
  "sun", // Sunday
  "moon", // Monday
  "mars", // Tuesday
  "mercury", // Wednesday
  "jupiter", // Thursday
  "venus", // Friday
  "saturn", // Saturday
];

// Planet names in both languages
export const PLANET_NAMES = {
  sun: { en: "Sun", es: "Sol" },
  moon: { en: "Moon", es: "Luna" },
  mars: { en: "Mars", es: "Marte" },
  mercury: { en: "Mercury", es: "Mercurio" },
  jupiter: { en: "Jupiter", es: "Júpiter" },
  venus: { en: "Venus", es: "Venus" },
  saturn: { en: "Saturn", es: "Saturno" },
};

// Tattvic Tides - 5 elements cycling every 24 minutes from sunrise
export const TATTVIC_TIDES = ["akasha", "vayu", "tejas", "apas", "prithvi"];

export const TATTVA_DATA = {
  akasha: {
    name: "akasha",
    icon: "/src/assets/tattvic-tides/akasha.png",
    color: "#000000",
    label: { en: "Akasha", es: "Éter" },
  },
  vayu: {
    name: "vayu",
    icon: "/src/assets/tattvic-tides/vayu.png",
    color: "#87CEEB",
    label: { en: "Vayu", es: "Aire" },
  },
  tejas: {
    name: "tejas",
    icon: "/src/assets/tattvic-tides/tejas.png",
    color: "#FF4500",
    label: { en: "Tejas", es: "Fuego" },
  },
  apas: {
    name: "apas",
    icon: "/src/assets/tattvic-tides/apas.png",
    color: "#4169E1",
    label: { en: "Apas", es: "Agua" },
  },
  prithvi: {
    name: "prithvi",
    icon: "/src/assets/tattvic-tides/prithvi.png",
    color: "#8B4513",
    label: { en: "Prithvi", es: "Tierra" },
  },
};

// Moon phase names
export const MOON_PHASES = {
  "New Moon": { en: "New Moon", es: "Luna Nueva" },
  "Waxing Crescent": { en: "Waxing Crescent", es: "Luna Creciente" },
  "First Quarter": { en: "First Quarter", es: "Cuarto Creciente" },
  "Waxing Gibbous": { en: "Waxing Gibbous", es: "Gibosa Creciente" },
  "Full Moon": { en: "Full Moon", es: "Luna Llena" },
  "Waning Gibbous": { en: "Waning Gibbous", es: "Gibosa Menguante" },
  "Third Quarter": { en: "Third Quarter", es: "Cuarto Menguante" },
  "Waning Crescent": { en: "Waning Crescent", es: "Luna Menguante" },
};

// Zodiac glyphs
export const ZODIAC_GLYPHS = {
  aries: "♈",
  taurus: "♉", 
  gemini: "♊",
  cancer: "♋",
  leo: "♌",
  virgo: "♍",
  libra: "♎",
  scorpio: "♏",
  sagittarius: "♐",
  capricorn: "♑",
  aquarius: "♒",
  pisces: "♓"
};

// Zodiac images for UI display
export const ZODIAC_IMAGES = {
  aries: "/src/assets/zodiac/aries.png",
  taurus: "/src/assets/zodiac/tauro.png",
  gemini: "/src/assets/zodiac/geminis.png",
  cancer: "/src/assets/zodiac/cancer.png",
  leo: "/src/assets/zodiac/leo.png",
  virgo: "/src/assets/zodiac/virgo.png",
  libra: "/src/assets/zodiac/libra.png",
  scorpio: "/src/assets/zodiac/escorpio.png",
  sagittarius: "/src/assets/zodiac/sagitario.png",
  capricorn: "/src/assets/zodiac/capricornio.png",
  aquarius: "/src/assets/zodiac/acuario.png",
  pisces: "/src/assets/zodiac/piscis.png"
};

// Zodiac sign names with translations
export const ZODIAC_NAMES = {
  aries: { en: "Aries", es: "Aries" },
  taurus: { en: "Taurus", es: "Tauro" },
  gemini: { en: "Gemini", es: "Géminis" },
  cancer: { en: "Cancer", es: "Cáncer" },
  leo: { en: "Leo", es: "Leo" },
  virgo: { en: "Virgo", es: "Virgo" },
  libra: { en: "Libra", es: "Libra" },
  scorpio: { en: "Scorpio", es: "Escorpio" },
  sagittarius: { en: "Sagittarius", es: "Sagitario" },
  capricorn: { en: "Capricorn", es: "Capricornio" },
  aquarius: { en: "Aquarius", es: "Acuario" },
  pisces: { en: "Pisces", es: "Piscis" }
};

export const PLANET_IMAGES = {
  sun: "/src/assets/planets/sun.jpg",
  moon: "/src/assets/planets/moon.jpg", 
  mercury: "/src/assets/planets/mercury.jpg",
  venus: "/src/assets/planets/venus.jpg",
  mars: "/src/assets/planets/mars.jpg",
  jupiter: "/src/assets/planets/jupiter.jpg",
  saturn: "/src/assets/planets/saturn.jpg"
};
