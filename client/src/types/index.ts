// Language types
export type Language = 'en' | 'es';

// Tarot types
export type TarotCardType = 'major' | 'minor';
export type TarotSuit = 'wands' | 'cups' | 'swords' | 'pentacles' | null;

export interface TarotCard {
  id: number;
  name: {
    en: string;
    es: string;
  };
  title: {
    en: string;
    es: string;
  };
  number: string | number;
  type: TarotCardType;
  suit: TarotSuit;
  keywords: {
    en: {
      upright: string[];
      reversed: string[];
    };
    es: {
      upright: string[];
      reversed: string[];
    };
  };
  element?: string;
  planet?: string;
  zodiac?: string;
  hebrewLetter?: string;
  path?: string;
  description: {
    en: string;
    es: string;
  };
  imageSrc: string;
}

// Astrology types
export type ZodiacSign = 
  'aries' | 'taurus' | 'gemini' | 'cancer' | 'leo' | 'virgo' | 
  'libra' | 'scorpio' | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces';

export type Element = 'fire' | 'earth' | 'air' | 'water';
export type Modality = 'cardinal' | 'fixed' | 'mutable';
export type HouseNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type Planet = 
  'sun' | 'moon' | 'mercury' | 'venus' | 'mars' | 
  'jupiter' | 'saturn' | 'uranus' | 'neptune' | 'pluto';

export interface AstrologySign {
  id: ZodiacSign;
  name: {
    en: string;
    es: string;
  };
  symbol: string;
  dates: string;
  element: Element;
  modality: Modality;
  rulingPlanet: Planet;
  traits: {
    en: string[];
    es: string[];
  };
  description: {
    en: string;
    es: string;
  };
}

export interface AstrologyHouse {
  number: HouseNumber;
  name: {
    en: string;
    es: string;
  };
  keywords: {
    en: string[];
    es: string[];
  };
  description: {
    en: string;
    es: string;
  };
}

export interface AstrologyPlanet {
  id: Planet;
  name: {
    en: string;
    es: string;
  };
  symbol: string;
  imageUrl?: string; // Optional image URL for the planet
  keywords: {
    en: string[];
    es: string[];
  };
  description: {
    en: string;
    es: string;
  };
}

export type Decan = 1 | 2 | 3;
export type Dignity = 'domicile' | 'exaltation' | 'detriment' | 'fall' | 'neutral' | 'peregrine';

export interface AstrologyInterpretation {
  planet: Planet;
  sign: ZodiacSign;
  house: HouseNumber;
  decan?: Decan;
  decanRuler?: string; // The planet ruling this decan (e.g., "mars", "venus")
  dignity?: Dignity;
  tarotCorrespondence?: string; // References to Tarot cards like "2 of Wands (Dominion)"
  positiveAspects?: {
    en: string[];
    es: string[];
  };
  negativeAspects?: {
    en: string[];
    es: string[];
  };
  interpretation: {
    en: string;
    es: string;
  };
}

// Geomancy types
export type GeomancyFigureId = 
  'populus' | 'via' | 'albus' | 'conjunctio' | 'puella' | 'amissio' | 
  'fortuna-major' | 'fortuna-minor' | 'puer' | 'rubeus' | 'acquisitio' | 
  'laetitia' | 'tristitia' | 'carcer' | 'caput-draconis' | 'cauda-draconis';

export interface GeomancyFigure {
  id: GeomancyFigureId;
  name: {
    en: string;
    es: string;
  };
  meaning: {
    en: string;
    es: string;
  };
  element: Element;
  planet: Planet;
  house: HouseNumber;
  pattern: boolean[][];
  description: {
    en: string;
    es: string;
  };
}

// General site translation interface
export interface TarotSpreadPosition {
  id: number;
  name: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  element: Element | 'spirit';
}

export interface TarotSpread {
  id: string;
  name: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  positions: TarotSpreadPosition[];
  layout: string; // Path to the layout image
}

export interface TarotReading {
  spreadId: string;
  cards: Array<{
    position: number;
    card: TarotCard;
    isReversed: boolean;
  }>;
  date: Date;
}

export interface SiteTranslations {
  header: {
    title: string;
    subtitle: string;
  };
  navigation: {
    tarot: string;
    astrology: string;
    geomancy: string;
    planetaryHours: string;
    treeOfLife: string;
  };
  tarot: {
    title: string;
    subtitle: string;
    drawButton: string;
    tapToReveal: string;
    upright: string;
    reversed: string;
    element: string;
    planet: string;
    zodiac: string;
    keywords: string;
    spreads: {
      title: string;
      subtitle: string;
      selectSpread: string;
      threeCardSpread: string;
      crossSpread: string;
      drawCards: string;
      position: string;
      interpretation: string;
      saveReading: string;
      newReading: string;
      elementMeaning: string;
    };
  };
  astrology: {
    title: string;
    subtitle: string;
    interpreter: {
      title: string;
      description: string;
      planet: string;
      sign: string;
      house: string;
      decan: string;
      dignity: string;
      positiveAspects: string;
      negativeAspects: string;
      notes: string;
      interpretButton: string;
    },
    dignities: {
      domicile: string;
      exaltation: string;
      detriment: string;
      fall: string;
      neutral: string;
      peregrine: string;
    },
    decans: {
      title: string;
      explanation: string;
      planetaryRuler: string;
    },
    reference: {
      zodiac: string;
      planets: string;
      houses: string;
      aspects: string;
    },
    elements: {
      fire: string;
      earth: string;
      air: string;
      water: string;
    };
    modalities: {
      cardinal: string;
      fixed: string;
      mutable: string;
    };
  };
  geomancy: {
    title: string;
    subtitle: string;
    element: string;
    planetaryRuler: string;
    astrologicalHouse: string;
    divinatoryMeaning: string;
  };
  footer: {
    text: string;
    subtext: string;
  };
  planetaryHours: {
    title: string;
    subtitle: string;
    currentTime: string;
    location: string;
    dayRuler: string;
    hourRuler: string;
    hourNumber: string;
    tattvicTide: string;
    sunPosition: string;
    moonPosition: string;
    moonPhase: string;
    ascendant: string;
    midheaven: string;
    getLocation: string;
    calculating: string;
  };
}

// Planetary Hours types
export interface PlanetaryHoursInput {
  latitude: number;
  longitude: number;
  datetime?: string; // optional ISO string, defaults to now
  date?: Date; // optional Date object, defaults to now
  language?: Language; // optional, for translation support
}

export interface TattvicTide {
  name: string;           // e.g. "akasha"
  icon: string;           // e.g. "/assets/tattvic-tides/akasha.png"
  color: string;          // e.g. "#000000"
  label: string;          // e.g. "Akasha" or "Éter"
}

export interface ZodiacPosition {
  degrees: number;
  minutes: number;
  sign: string;
  formatted: string;
}

export interface PlanetaryHoursData {
  datetime: string;
  location: {
    latitude: number;
    longitude: number;
    timezone: string;
  };
  planetaryHour: {
    dayRuler: string;       // e.g. "Sun" or "Sol"
    hourRuler: string;      // e.g. "Venus" or "Venus"
    hourNumber: number;     // 1–24
  };
  tattvicTide: TattvicTide;
  astrology: {
    sunPosition: ZodiacPosition;
    moonPosition: ZodiacPosition;
    moonPhase: string;      // e.g. "Full Moon" or "Luna Llena"
    ascendant: ZodiacPosition;
    midheaven: ZodiacPosition;
  };
}
