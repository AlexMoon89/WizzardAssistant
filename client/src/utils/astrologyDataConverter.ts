import { AstrologyInterpretation, Planet, ZodiacSign, HouseNumber, Dignity, Decan } from '@/types';

// Helper functions
function extractPlanetId(planetString: string): Planet {
  // Extract the planet name from the string "Sun: ThPhARTh (6) - heart, circulation, spine, chest, divine self"
  const planetMap: Record<string, Planet> = {
    'Sun': 'sun',
    'Moon': 'moon',
    'Mercury': 'mercury',
    'Venus': 'venus',
    'Mars': 'mars',
    'Jupiter': 'jupiter',
    'Saturn': 'saturn',
    'Uranus': 'uranus',
    'Neptune': 'neptune',
    'Pluto': 'pluto'
  };
  
  for (const [key, value] of Object.entries(planetMap)) {
    if (planetString.startsWith(key)) {
      return value;
    }
  }
  
  // Default fallback
  return 'sun';
}

function extractSignId(signString: string): ZodiacSign {
  // Extract the sign name from the string "Aries: Head"
  const signMap: Record<string, ZodiacSign> = {
    'Aries': 'aries',
    'Taurus': 'taurus',
    'Gemini': 'gemini',
    'Cancer': 'cancer',
    'Leo': 'leo',
    'Virgo': 'virgo',
    'Libra': 'libra',
    'Scorpio': 'scorpio',
    'Sagittarius': 'sagittarius',
    'Capricorn': 'capricorn',
    'Aquarius': 'aquarius',
    'Pisces': 'pisces'
  };
  
  for (const [key, value] of Object.entries(signMap)) {
    if (signString.startsWith(key)) {
      return value;
    }
  }
  
  // Default fallback
  return 'aries';
}

function extractHouseNumber(houseString: string): HouseNumber {
  // Extract house number from string like "I: body, vitality, physical self"
  const romanNumeralMap: Record<string, HouseNumber> = {
    'I': 1,
    'II': 2,
    'III': 3,
    'IV': 4,
    'V': 5,
    'VI': 6,
    'VII': 7,
    'VIII': 8,
    'IX': 9,
    'X': 10,
    'XI': 11,
    'XII': 12
  };
  
  for (const [roman, number] of Object.entries(romanNumeralMap)) {
    if (houseString.startsWith(roman)) {
      return number as HouseNumber;
    }
  }
  
  // Default fallback
  return 1;
}

// Traditional planetary dignities lookup
function getTraditionalDignity(planet: Planet, sign: ZodiacSign): Dignity | undefined {
  const dignities: Record<Planet, { domicile: ZodiacSign[], exaltation: ZodiacSign[], detriment: ZodiacSign[], fall: ZodiacSign[] }> = {
    sun: {
      domicile: ['leo'],
      exaltation: ['aries'],
      detriment: ['aquarius'],
      fall: ['libra']
    },
    moon: {
      domicile: ['cancer'],
      exaltation: ['taurus'],
      detriment: ['capricorn'],
      fall: ['scorpio']
    },
    mercury: {
      domicile: ['gemini', 'virgo'],
      exaltation: ['virgo'],
      detriment: ['sagittarius', 'pisces'],
      fall: ['pisces']
    },
    venus: {
      domicile: ['taurus', 'libra'],
      exaltation: ['pisces'],
      detriment: ['scorpio', 'aries'],
      fall: ['virgo']
    },
    mars: {
      domicile: ['aries', 'scorpio'],
      exaltation: ['capricorn'],
      detriment: ['libra', 'taurus'],
      fall: ['cancer']
    },
    jupiter: {
      domicile: ['sagittarius', 'pisces'],
      exaltation: ['cancer'],
      detriment: ['gemini', 'virgo'],
      fall: ['capricorn']
    },
    saturn: {
      domicile: ['capricorn', 'aquarius'],
      exaltation: ['libra'],
      detriment: ['cancer', 'leo'],
      fall: ['aries']
    },
    uranus: { domicile: ['aquarius'], exaltation: [], detriment: ['leo'], fall: [] },
    neptune: { domicile: ['pisces'], exaltation: [], detriment: ['virgo'], fall: [] },
    pluto: { domicile: ['scorpio'], exaltation: [], detriment: ['taurus'], fall: [] }
  };

  const planetDignities = dignities[planet];
  if (!planetDignities) return undefined;

  if (planetDignities.domicile.includes(sign)) return 'domicile';
  if (planetDignities.exaltation.includes(sign)) return 'exaltation';
  if (planetDignities.detriment.includes(sign)) return 'detriment';
  if (planetDignities.fall.includes(sign)) return 'fall';
  
  return undefined;
}

function extractDignityAndDecan(dignityDecanString: string, planet?: Planet, sign?: ZodiacSign, notes?: string): { dignity?: Dignity, decan?: Decan, decanRuler?: string } {
  const result: { dignity?: Dignity, decan?: Decan, decanRuler?: string } = {};
  
  // Debug
  console.log('Extracting from dignity string:', dignityDecanString);
  
  // First, try to get traditional dignity if we have planet and sign
  if (planet && sign) {
    const traditionalDignity = getTraditionalDignity(planet, sign);
    if (traditionalDignity) {
      result.dignity = traditionalDignity;
    }
  }
  
  // Check notes for dignity information
  if (notes) {
    if (notes.toLowerCase().includes('domicile') || notes.toLowerCase().includes('rulership')) {
      result.dignity = 'domicile';
    } else if (notes.toLowerCase().includes('exaltation') || notes.toLowerCase().includes('exalted')) {
      result.dignity = 'exaltation';
    } else if (notes.toLowerCase().includes('detriment')) {
      result.dignity = 'detriment';
    } else if (notes.toLowerCase().includes('fall')) {
      result.dignity = 'fall';
    }
  }
  
  if (!dignityDecanString) return result;
  
  // Check if this is a decan format like "Decan: Mars (Domicile) - Tarot: 2 of Wands (Dominion)"
  if (dignityDecanString.includes('Decan:')) {
    // Extract decan planet and its dignity if present
    if (dignityDecanString.toLowerCase().includes('(domicile)')) {
      result.dignity = 'domicile';
    } else if (dignityDecanString.toLowerCase().includes('(exaltation)')) {
      result.dignity = 'exaltation';
    } else if (dignityDecanString.toLowerCase().includes('(detriment)')) {
      result.dignity = 'detriment';
    } else if (dignityDecanString.toLowerCase().includes('(fall)')) {
      result.dignity = 'fall';
    }
    
    // Extract the decan ruling planet
    const decanPlanetMatch = dignityDecanString.match(/Decan: (\w+)/i);
    if (decanPlanetMatch && decanPlanetMatch[1]) {
      // Store the ruling planet of the decan
      result.decanRuler = decanPlanetMatch[1].toLowerCase();
    }
    
    // Determine decan number from the Tarot card if present
    const tarotMatch = dignityDecanString.match(/Tarot: (\d+) of/);
    if (tarotMatch && tarotMatch[1]) {
      const cardNumber = parseInt(tarotMatch[1], 10);
      if (cardNumber >= 2 && cardNumber <= 4) {
        result.decan = 1;
      } else if (cardNumber >= 5 && cardNumber <= 7) {
        result.decan = 2;
      } else if (cardNumber >= 8 && cardNumber <= 10) {
        result.decan = 3;
      }
    }
  } else {
    // Standard zodiac dignity format
    if (dignityDecanString.toLowerCase().includes('domicile')) {
      result.dignity = 'domicile';
    } else if (dignityDecanString.toLowerCase().includes('exaltation')) {
      result.dignity = 'exaltation';
    } else if (dignityDecanString.toLowerCase().includes('detriment')) {
      result.dignity = 'detriment';
    } else if (dignityDecanString.toLowerCase().includes('fall')) {
      result.dignity = 'fall';
    } else if (dignityDecanString.toLowerCase().includes('neutral')) {
      result.dignity = 'neutral';
    } else if (dignityDecanString.toLowerCase().includes('peregrine')) {
      result.dignity = 'peregrine';
    }
    
    // Extract decan number if present
    if (dignityDecanString.toLowerCase().includes('decan')) {
      if (dignityDecanString.toLowerCase().includes('first') || 
          dignityDecanString.toLowerCase().includes('1st')) {
        result.decan = 1;
      } else if (dignityDecanString.toLowerCase().includes('second') || 
                dignityDecanString.toLowerCase().includes('2nd')) {
        result.decan = 2;
      } else if (dignityDecanString.toLowerCase().includes('third') || 
                dignityDecanString.toLowerCase().includes('3rd')) {
        result.decan = 3;
      }
    }
  }
  
  console.log('Extracted dignity and decan:', result);
  return result;
}

// Simple translator functions
function translateToSpanish(term: string): string {
  // Simple translation dictionary for common astrological terms
  const translations: Record<string, string> = {
    // Positive keywords
    'leadership': 'liderazgo',
    'initiative': 'iniciativa',
    'courage': 'coraje',
    'self-reliance': 'autosuficiencia',
    'charisma': 'carisma',
    'vitality': 'vitalidad',
    'confidence': 'confianza',
    'strength': 'fuerza',
    'creativity': 'creatividad',
    'inspiration': 'inspiración',
    'passion': 'pasión',
    'determination': 'determinación',
    'willpower': 'fuerza de voluntad',
    'optimism': 'optimismo',
    'loyalty': 'lealtad',
    'generosity': 'generosidad',
    'wisdom': 'sabiduría',
    'intuition': 'intuición',
    'empathy': 'empatía',
    'compassion': 'compasión',
    'healing': 'sanación',
    'intelligence': 'inteligencia',
    'adaptability': 'adaptabilidad',
    'communication': 'comunicación',
    'versatility': 'versatilidad',
    'resourcefulness': 'ingenio',
    'discipline': 'disciplina',
    'patience': 'paciencia',
    'responsibility': 'responsabilidad',
    'organization': 'organización',
    'persistence': 'persistencia',
    'stability': 'estabilidad',
    'harmony': 'armonía',
    'balance': 'equilibrio',
    'beauty': 'belleza',
    'love': 'amor',
    'charm': 'encanto',
    'diplomacy': 'diplomacia',
    'fairness': 'equidad',
    'power': 'poder',
    'intensity': 'intensidad',
    'transformation': 'transformación',
    'depth': 'profundidad',
    'resilience': 'resiliencia',
    'magnetism': 'magnetismo',
    'growth': 'crecimiento',
    'expansion': 'expansión',
    'abundance': 'abundancia',
    'fortune': 'fortuna',
    'luck': 'suerte',
    'vision': 'visión',

    // Negative keywords
    'arrogance': 'arrogancia',
    'impulsiveness': 'impulsividad',
    'dominance': 'dominación',
    'egotism': 'egoísmo',
    'aggression': 'agresión',
    'impatience': 'impaciencia',
    'insecurity': 'inseguridad',
    'pessimism': 'pesimismo',
    'laziness': 'pereza',
    'sluggishness': 'lentitud',
    'indecision': 'indecisión',
    'inconsistency': 'inconsistencia',
    'anxiety': 'ansiedad',
    'nervousness': 'nerviosismo',
    'restlessness': 'inquietud',
    'scattered thinking': 'pensamiento disperso',
    'overthinking': 'sobrepensar',
    'coldness': 'frialdad',
    'rigidity': 'rigidez',
    'severity': 'severidad',
    'negativity': 'negatividad',
    'materialism': 'materialismo',
    'possessiveness': 'posesividad',
    'indulgence': 'indulgencia',
    'greed': 'avaricia',
    'superficiality': 'superficialidad',
    'vanity': 'vanidad',
    'jealousy': 'celos',
    'envy': 'envidia',
    'indecisiveness': 'indecisión',
    'manipulation': 'manipulación',
    'obsession': 'obsesión',
    'vengefulness': 'venganza',
    'excess': 'exceso',
    'overindulgence': 'sobreindulgencia',
    'wastefulness': 'derroche',
    'exaggeration': 'exageración',
    'carelessness': 'descuido',
    'recklessness': 'imprudencia',
    'impracticality': 'falta de practicidad',
    'detachment': 'desapego',
    'unpredictability': 'imprevisibilidad',
    'rebelliousness': 'rebeldía',
    'eccentricity': 'excentricidad',
    'emotional distance': 'distancia emocional',
    'emotional detachment': 'desapego emocional',
    'confusion': 'confusión',
    'delusion': 'delirio',
    'escapism': 'escapismo',
    'lack of boundaries': 'falta de límites',
    'martyrdom': 'martirio',
    'cynicism': 'cinismo',
    'harshness': 'dureza'
  };
  
  const lowerTerm = term.toLowerCase();
  return translations[lowerTerm] || `[es] ${term}`;
}

// Convert raw JSON data from the source to our AstrologyInterpretation format
export function convertRawDataToInterpretations(rawData: any[]): AstrologyInterpretation[] {
  const interpretations: AstrologyInterpretation[] = [];
  
  let currentPlanet: Planet | null = null;
  let currentSign: ZodiacSign | null = null;
  
  // Process each entry
  rawData.forEach(entry => {
    // If this entry has a Planet field, update currentPlanet
    if (entry.Planet) {
      currentPlanet = extractPlanetId(entry.Planet);
      console.log('Updated current planet to:', currentPlanet);
    }
    
    // If this entry has a Sign field, update currentSign
    if (entry.Sign) {
      currentSign = extractSignId(entry.Sign);
      console.log('Updated current sign to:', currentSign);
    }
    
    // Skip if we don't have a house field or if we're missing both planet and sign
    if (!entry.House || (!currentPlanet && !currentSign)) {
      console.log('Skipping incomplete entry:', entry);
      return;
    }
    
    const houseNumber = extractHouseNumber(entry.House);
    console.log('Processing house:', houseNumber);
    
    // Extract dignity, decan, and decan ruler if available
    const { dignity, decan, decanRuler } = entry['Dignity/Decan'] ? 
      extractDignityAndDecan(entry['Dignity/Decan'], currentPlanet as Planet, currentSign as ZodiacSign, entry.Notes) : 
      extractDignityAndDecan('', currentPlanet as Planet, currentSign as ZodiacSign, entry.Notes);
    
    // Process keywords - handle both comma-separated strings and arrays
    let positiveKeywords: string[] = [];
    if (entry['Positively Aspected Keywords']) {
      if (typeof entry['Positively Aspected Keywords'] === 'string') {
        positiveKeywords = entry['Positively Aspected Keywords'].split(', ');
      } else if (Array.isArray(entry['Positively Aspected Keywords'])) {
        positiveKeywords = entry['Positively Aspected Keywords'];
      }
    }
    
    let negativeKeywords: string[] = [];
    if (entry['Negatively Aspected Keywords']) {
      if (typeof entry['Negatively Aspected Keywords'] === 'string') {
        negativeKeywords = entry['Negatively Aspected Keywords'].split(', ');
      } else if (Array.isArray(entry['Negatively Aspected Keywords'])) {
        negativeKeywords = entry['Negatively Aspected Keywords'];
      }
    }
    
    // Create the interpretation text - prioritizing the Notes field or creating from keywords
    let interpretationText = 'This celestial combination influences your life in unique ways.';
    let spanishInterpretation = 'Esta combinación celestial influye en tu vida de manera única.';
    
    if (entry.Notes) {
      interpretationText = entry.Notes;
      // We could have a more sophisticated Spanish translation here in the future
      spanishInterpretation = `[ES] ${entry.Notes}`;
    } else if (positiveKeywords.length > 0 && negativeKeywords.length > 0) {
      // Create a descriptive interpretation from the keywords if no Notes are provided
      const formattedPlanet = currentPlanet ? 
        `${currentPlanet.charAt(0).toUpperCase()}${currentPlanet.slice(1)}` : 
        'This planetary energy';
        
      const positiveString = positiveKeywords.slice(0, 3)
        .map(k => k.toLowerCase())
        .filter(Boolean)
        .join(', ');
        
      const negativeString = negativeKeywords.slice(0, 2)
        .map(k => k.toLowerCase())
        .filter(Boolean)
        .join(' and ');
      
      interpretationText = `${formattedPlanet} in ${currentSign} in the ${houseNumber}th house brings ${positiveString}. Be mindful of tendencies toward ${negativeString}.`;
      spanishInterpretation = `${formattedPlanet} en ${currentSign} en la casa ${houseNumber} trae ${positiveString}. Ten cuidado con las tendencias hacia ${negativeString}.`;
    }
    
    // Create the interpretation object
    const interpretation: AstrologyInterpretation = {
      planet: currentPlanet as Planet,
      sign: currentSign as ZodiacSign,
      house: houseNumber,
      interpretation: {
        en: interpretationText,
        es: spanishInterpretation
      }
    };
    
    // Add optional fields if they exist
    if (dignity) interpretation.dignity = dignity;
    if (decan) interpretation.decan = decan;
    if (decanRuler) interpretation.decanRuler = decanRuler;
    
    // Translate the keywords if they exist
    if (positiveKeywords.length > 0) {
      interpretation.positiveAspects = {
        en: positiveKeywords,
        es: positiveKeywords.map(keyword => translateToSpanish(keyword))
      };
    }
    
    if (negativeKeywords.length > 0) {
      interpretation.negativeAspects = {
        en: negativeKeywords,
        es: negativeKeywords.map(keyword => translateToSpanish(keyword))
      };
    }
    
    // Add tarot card info if it's in the Dignity/Decan field
    if (entry['Dignity/Decan'] && entry['Dignity/Decan'].includes('Tarot:')) {
      const tarotMatch = entry['Dignity/Decan'].match(/Tarot: (.+?)(\)|\s-|$)/);
      if (tarotMatch && tarotMatch[1]) {
        interpretation.tarotCorrespondence = tarotMatch[1].trim();
      }
    }
    
    // Add to interpretations array
    interpretations.push(interpretation);
    console.log(`Added interpretation for ${currentPlanet} in ${currentSign} in house ${houseNumber}`);
  });
  
  console.log(`Total interpretations created: ${interpretations.length}`);
  return interpretations;
}