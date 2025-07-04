export interface DecanInfo {
  decan: string;
  sign: {
    en: string;
    es: string;
  };
  minor_arcana: {
    en: string;
    es: string;
  };
  planet: {
    en: string;
    es: string;
  };
}

export const decans: DecanInfo[] = [
  { "decan": "1°", "sign": { "en": "Leo", "es": "Leo" }, "minor_arcana": { "en": "5 of Wands \"Strife\"", "es": "5 Bastos \"Lucha\"" }, "planet": { "en": "Saturn", "es": "Saturno" } },
  { "decan": "2°", "sign": { "en": "Leo", "es": "Leo" }, "minor_arcana": { "en": "6 of Wands \"Victory\"", "es": "6 Bastos \"Victoria\"" }, "planet": { "en": "Jupiter", "es": "Júpiter" } },
  { "decan": "3°", "sign": { "en": "Leo", "es": "Leo" }, "minor_arcana": { "en": "7 of Wands \"Valour\"", "es": "7 Bastos \"Valor\"" }, "planet": { "en": "Mars", "es": "Marte" } },

  { "decan": "1°", "sign": { "en": "Virgo", "es": "Virgo" }, "minor_arcana": { "en": "8 of Pentacles \"Prudence\"", "es": "8 Pentáculos \"Prudencia\"" }, "planet": { "en": "Sun", "es": "Sol" } },
  { "decan": "2°", "sign": { "en": "Virgo", "es": "Virgo" }, "minor_arcana": { "en": "9 of Pentacles \"Material Gain\"", "es": "9 Pentáculos \"Ganancia Material\"" }, "planet": { "en": "Venus", "es": "Venus" } },
  { "decan": "3°", "sign": { "en": "Virgo", "es": "Virgo" }, "minor_arcana": { "en": "10 of Pentacles \"Wealth\"", "es": "10 Pentáculos \"Riqueza\"" }, "planet": { "en": "Mercury", "es": "Mercurio" } },

  { "decan": "1°", "sign": { "en": "Libra", "es": "Libra" }, "minor_arcana": { "en": "2 of Swords \"Peace Restored\"", "es": "2 Espadas \"Paz Restaurada\"" }, "planet": { "en": "Moon", "es": "Luna" } },
  { "decan": "2°", "sign": { "en": "Libra", "es": "Libra" }, "minor_arcana": { "en": "3 of Swords \"Lord of Sorrow\"", "es": "3 Espadas \"El Señor del Dolor\"" }, "planet": { "en": "Saturn", "es": "Saturno" } },
  { "decan": "3°", "sign": { "en": "Libra", "es": "Libra" }, "minor_arcana": { "en": "4 of Swords \"Rest after Strife\"", "es": "4 Espadas \"Descanso después de la Lucha\"" }, "planet": { "en": "Jupiter", "es": "Júpiter" } },

  { "decan": "1°", "sign": { "en": "Scorpio", "es": "Escorpio" }, "minor_arcana": { "en": "5 of Cups \"Loss of Pleasure\"", "es": "5 Copas \"Pérdida del Placer\"" }, "planet": { "en": "Mars", "es": "Marte" } },
  { "decan": "2°", "sign": { "en": "Scorpio", "es": "Escorpio" }, "minor_arcana": { "en": "6 of Cups \"Pleasure\"", "es": "6 Copas \"Placer\"" }, "planet": { "en": "Sun", "es": "Sol" } },
  { "decan": "3°", "sign": { "en": "Scorpio", "es": "Escorpio" }, "minor_arcana": { "en": "7 of Cups \"Illusory Success\"", "es": "7 Copas \"Éxito Ilusorio\"" }, "planet": { "en": "Venus", "es": "Venus" } },

  { "decan": "1°", "sign": { "en": "Sagittarius", "es": "Sagitario" }, "minor_arcana": { "en": "8 of Wands \"Swiftness\"", "es": "8 Bastos \"Rapidez\"" }, "planet": { "en": "Mercury", "es": "Mercurio" } },
  { "decan": "2°", "sign": { "en": "Sagittarius", "es": "Sagitario" }, "minor_arcana": { "en": "9 of Wands \"Great Strength\"", "es": "9 Bastos \"Gran Fuerza\"" }, "planet": { "en": "Moon", "es": "Luna" } },
  { "decan": "3°", "sign": { "en": "Sagittarius", "es": "Sagitario" }, "minor_arcana": { "en": "10 of Wands \"Oppression\"", "es": "10 Bastos \"Opresión\"" }, "planet": { "en": "Saturn", "es": "Saturno" } },

  { "decan": "1°", "sign": { "en": "Capricorn", "es": "Capricornio" }, "minor_arcana": { "en": "2 of Pentacles \"Harmonious Change\"", "es": "2 Pentáculos \"Cambio Armonioso\"" }, "planet": { "en": "Jupiter", "es": "Júpiter" } },
  { "decan": "2°", "sign": { "en": "Capricorn", "es": "Capricornio" }, "minor_arcana": { "en": "3 of Pentacles \"Material Works\"", "es": "3 Pentáculos \"Obras Materiales\"" }, "planet": { "en": "Mars", "es": "Marte" } },
  { "decan": "3°", "sign": { "en": "Capricorn", "es": "Capricornio" }, "minor_arcana": { "en": "4 of Pentacles \"Earthly Power\"", "es": "4 Pentáculos \"Poder Terrestre\"" }, "planet": { "en": "Sun", "es": "Sol" } },

  { "decan": "1°", "sign": { "en": "Aquarius", "es": "Acuario" }, "minor_arcana": { "en": "5 of Swords \"Defeat\"", "es": "5 Espadas \"Derrota\"" }, "planet": { "en": "Venus", "es": "Venus" } },
  { "decan": "2°", "sign": { "en": "Aquarius", "es": "Acuario" }, "minor_arcana": { "en": "6 of Swords \"Earned Success\"", "es": "6 Espadas \"Éxito Merecido\"" }, "planet": { "en": "Mercury", "es": "Mercurio" } },
  { "decan": "3°", "sign": { "en": "Aquarius", "es": "Acuario" }, "minor_arcana": { "en": "7 of Swords \"Unstable Effort\"", "es": "7 Espadas \"Esfuerzo Inestable\"" }, "planet": { "en": "Moon", "es": "Luna" } },

  { "decan": "1°", "sign": { "en": "Pisces", "es": "Piscis" }, "minor_arcana": { "en": "8 of Cups \"Abandoned Success\"", "es": "8 Copas \"Éxito Abandonado\"" }, "planet": { "en": "Saturn", "es": "Saturno" } },
  { "decan": "2°", "sign": { "en": "Pisces", "es": "Piscis" }, "minor_arcana": { "en": "9 of Cups \"Material Happiness\"", "es": "9 Copas \"Felicidad Material\"" }, "planet": { "en": "Jupiter", "es": "Júpiter" } },
  { "decan": "3°", "sign": { "en": "Pisces", "es": "Piscis" }, "minor_arcana": { "en": "10 of Cups \"Perfect Success\"", "es": "10 Copas \"Éxito Perfecto\"" }, "planet": { "en": "Mars", "es": "Marte" } },

  { "decan": "1°", "sign": { "en": "Aries", "es": "Aries" }, "minor_arcana": { "en": "2 of Wands \"Dominion\"", "es": "2 Bastos \"Dominio\"" }, "planet": { "en": "Mars", "es": "Marte" } },
  { "decan": "2°", "sign": { "en": "Aries", "es": "Aries" }, "minor_arcana": { "en": "3 of Wands \"Established Strength\"", "es": "3 Bastos \"Fuerza Establecida\"" }, "planet": { "en": "Sun", "es": "Sol" } },
  { "decan": "3°", "sign": { "en": "Aries", "es": "Aries" }, "minor_arcana": { "en": "4 of Wands \"Perfected Work\"", "es": "4 Bastos \"Obra Perfeccionada\"" }, "planet": { "en": "Venus", "es": "Venus" } },

  { "decan": "1°", "sign": { "en": "Taurus", "es": "Tauro" }, "minor_arcana": { "en": "5 of Pentacles \"Material Trouble\"", "es": "5 Pentáculos \"Problemas Materiales\"" }, "planet": { "en": "Mercury", "es": "Mercurio" } },
  { "decan": "2°", "sign": { "en": "Taurus", "es": "Tauro" }, "minor_arcana": { "en": "6 of Pentacles \"Material Success\"", "es": "6 Pentáculos \"Eéxito Material\"" }, "planet": { "en": "Moon", "es": "Luna" } },
  { "decan": "3°", "sign": { "en": "Taurus", "es": "Tauro" }, "minor_arcana": { "en": "7 of Pentacles \"Unfulfilled Success\"", "es": "7 Pentáculos \"Eéxito Incompleto\"" }, "planet": { "en": "Saturn", "es": "Saturno" } },

  { "decan": "1°", "sign": { "en": "Gemini", "es": "Géminis" }, "minor_arcana": { "en": "8 of Swords \"Shortened Force\"", "es": "8 Espadas \"Fuerza Amortiguada\"" }, "planet": { "en": "Jupiter", "es": "Júpiter" } },
  { "decan": "2°", "sign": { "en": "Gemini", "es": "Géminis" }, "minor_arcana": { "en": "9 of Swords \"Despair and Cruelty\"", "es": "9 Espadas \"Desesperación y Crueldad\"" }, "planet": { "en": "Mars", "es": "Marte" } },
  { "decan": "3°", "sign": { "en": "Gemini", "es": "Géminis" }, "minor_arcana": { "en": "10 of Swords \"Ruin\"", "es": "10 Espadas \"Ruina\"" }, "planet": { "en": "Sun", "es": "Sol" } },

  { "decan": "1°", "sign": { "en": "Cancer", "es": "Cáncer" }, "minor_arcana": { "en": "2 of Cups \"Love\"", "es": "2 Copas \"Amor\"" }, "planet": { "en": "Venus", "es": "Venus" } },
  { "decan": "2°", "sign": { "en": "Cancer", "es": "Cáncer" }, "minor_arcana": { "en": "3 of Cups \"Abundance\"", "es": "3 Copas \"Abundancia\"" }, "planet": { "en": "Mercury", "es": "Mercurio" } },
  { "decan": "3°", "sign": { "en": "Cancer", "es": "Cáncer" }, "minor_arcana": { "en": "4 of Cups \"Blended Pleasure\"", "es": "4 Copas \"Placer Mezclado\"" }, "planet": { "en": "Moon", "es": "Luna" } }
];

// Helper function to get all decans for a specific zodiac sign
export function getDecansBySign(signName: string): DecanInfo[] {
  // Convert signName to lowercase for case-insensitive comparison
  const lowerCaseSignName = signName.toLowerCase();
  
  return decans.filter(decan => 
    decan.sign.en.toLowerCase() === lowerCaseSignName || 
    decan.sign.es.toLowerCase() === lowerCaseSignName
  );
}