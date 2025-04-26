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
  keywords: {
    en: string[];
    es: string[];
  };
  description: {
    en: string;
    es: string;
  };
}

export interface AstrologyInterpretation {
  planet: Planet;
  sign: ZodiacSign;
  house: HouseNumber;
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
export interface SiteTranslations {
  header: {
    title: string;
    subtitle: string;
  };
  navigation: {
    tarot: string;
    astrology: string;
    geomancy: string;
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
      interpretButton: string;
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
}
