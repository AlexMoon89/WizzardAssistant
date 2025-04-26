import { SiteTranslations, Language } from "@/types";

const translations: Record<Language, SiteTranslations> = {
  en: {
    header: {
      title: "Wizard Assistant",
      subtitle: "Your Digital Grimoire of Arcane Knowledge",
    },
    navigation: {
      tarot: "Tarot",
      astrology: "Astrology",
      geomancy: "Geomancy",
    },
    tarot: {
      title: "Tarot Arcana",
      subtitle: "Explore the Major Arcana and divine their mystical meanings.",
      drawButton: "Draw a Card",
      tapToReveal: "Tap to reveal meaning",
      upright: "Upright",
      reversed: "Reversed",
      element: "Element",
      planet: "Planet",
      zodiac: "Zodiac",
    },
    astrology: {
      title: "Celestial Divination",
      subtitle: "Uncover the secrets written in the stars and celestial bodies.",
      interpreter: {
        title: "Celestial Interpreter",
        description: "Select a planet, sign, and house to reveal your personalized celestial meaning.",
        planet: "Planet",
        sign: "Sign",
        house: "House",
        interpretButton: "Interpret Celestial Pattern",
      },
      reference: {
        zodiac: "Zodiac Signs",
        planets: "Planets",
        houses: "Houses",
        aspects: "Aspects",
      },
      elements: {
        fire: "Fire",
        earth: "Earth",
        air: "Air",
        water: "Water",
      },
      modalities: {
        cardinal: "Cardinal",
        fixed: "Fixed",
        mutable: "Mutable",
      },
    },
    geomancy: {
      title: "Geomantic Figures",
      subtitle: "Ancient figures of earth divination reveal hidden patterns of fate.",
      element: "Element",
      planetaryRuler: "Planetary Ruler",
      astrologicalHouse: "Astrological House",
      divinatoryMeaning: "Divinatory Meaning",
    },
    footer: {
      text: "Wizard Assistant – Your Digital Grimoire",
      subtext: "The secrets of the universe, now at your fingertips",
    },
  },
  es: {
    header: {
      title: "Asistente del Mago",
      subtitle: "Tu Grimorio Digital de Conocimiento Arcano",
    },
    navigation: {
      tarot: "Tarot",
      astrology: "Astrología",
      geomancy: "Geomancia",
    },
    tarot: {
      title: "Arcanos del Tarot",
      subtitle: "Explora los Arcanos Mayores y descubre sus significados místicos.",
      drawButton: "Sacar una Carta",
      tapToReveal: "Toca para revelar significado",
      upright: "Derecha",
      reversed: "Invertida",
      element: "Elemento",
      planet: "Planeta",
      zodiac: "Zodíaco",
    },
    astrology: {
      title: "Adivinación Celestial",
      subtitle: "Descubre los secretos escritos en las estrellas y cuerpos celestes.",
      interpreter: {
        title: "Intérprete Celestial",
        description: "Selecciona un planeta, signo y casa para revelar tu significado celestial personalizado.",
        planet: "Planeta",
        sign: "Signo",
        house: "Casa",
        interpretButton: "Interpretar Patrón Celestial",
      },
      reference: {
        zodiac: "Signos del Zodíaco",
        planets: "Planetas",
        houses: "Casas",
        aspects: "Aspectos",
      },
      elements: {
        fire: "Fuego",
        earth: "Tierra",
        air: "Aire",
        water: "Agua",
      },
      modalities: {
        cardinal: "Cardinal",
        fixed: "Fijo",
        mutable: "Mutable",
      },
    },
    geomancy: {
      title: "Figuras Geománticas",
      subtitle: "Las antiguas figuras de adivinación terrestre revelan patrones ocultos del destino.",
      element: "Elemento",
      planetaryRuler: "Regente Planetario",
      astrologicalHouse: "Casa Astrológica",
      divinatoryMeaning: "Significado Adivinatorio",
    },
    footer: {
      text: "Asistente del Mago – Tu Grimorio Digital",
      subtext: "Los secretos del universo, ahora al alcance de tus dedos",
    },
  },
};

export default translations;
