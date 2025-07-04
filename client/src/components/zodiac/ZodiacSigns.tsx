import React from 'react';

// Zodiac sign components as SVGs
export const AriesSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <path d="M50,20 L80,65 L20,65 Z" fill="#e34234" stroke="#d4a256" strokeWidth="2" />
  </svg>
);

export const TaurusSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <circle cx="50" cy="40" r="20" fill="#2a7e43" stroke="#d4a256" strokeWidth="2" />
    <path d="M30,65 L70,65 M50,60 L50,80" stroke="#d4a256" strokeWidth="4" fill="none" />
  </svg>
);

export const GeminiSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <path d="M35,20 L35,80 M65,20 L65,80 M35,35 L65,35 M35,65 L65,65" stroke="#f9e04c" strokeWidth="4" fill="none" />
  </svg>
);

export const CancerSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <path d="M20,40 A20,20 0 0,1 50,40 A20,20 0 0,0 80,40 M20,60 A20,20 0 0,0 50,60 A20,20 0 0,1 80,60" fill="none" stroke="#4f81c7" strokeWidth="4" />
  </svg>
);

export const LeoSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <circle cx="50" cy="50" r="25" fill="none" stroke="#e34234" strokeWidth="4" />
    <path d="M50,25 C60,35 60,45 50,55 C40,45 40,35 50,25" fill="#e34234" stroke="#d4a256" strokeWidth="2" />
  </svg>
);

export const VirgoSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <path d="M40,30 L40,70 Q40,85 55,85 Q70,85 70,70 L70,40" fill="none" stroke="#2a7e43" strokeWidth="4" />
    <path d="M40,50 L70,50" stroke="#2a7e43" strokeWidth="4" fill="none" />
  </svg>
);

export const LibraSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <path d="M20,60 L80,60 M50,60 L50,30" stroke="#f9e04c" strokeWidth="4" fill="none" />
    <path d="M30,40 L70,40" stroke="#f9e04c" strokeWidth="4" fill="none" />
  </svg>
);

export const ScorpioSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <path d="M20,50 L65,50 L65,65 L80,50 L65,35 L65,50" fill="none" stroke="#1c2b5a" strokeWidth="4" />
  </svg>
);

export const SagittariusSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <path d="M30,70 L70,30 M70,30 L70,55 M70,30 L45,30" stroke="#b5525b" strokeWidth="4" fill="none" />
  </svg>
);

export const CapricornSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <path d="M40,30 L40,60 Q40,75 55,75 Q70,75 70,60 L70,40 L85,25" fill="none" stroke="#2a7e43" strokeWidth="4" />
  </svg>
);

export const AquariusSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <path d="M30,40 Q50,70 70,40 M30,60 Q50,90 70,60" fill="none" stroke="#f9e04c" strokeWidth="4" />
  </svg>
);

export const PiscesSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <path d="M30,35 A20,15 0 0,1 30,65 A20,15 0 0,1 30,35" fill="none" stroke="#1c2b5a" strokeWidth="4" />
    <path d="M70,35 A20,15 0 0,0 70,65 A20,15 0 0,0 70,35" fill="none" stroke="#1c2b5a" strokeWidth="4" />
    <path d="M30,50 L70,50" stroke="#1c2b5a" strokeWidth="4" fill="none" />
  </svg>
);

// Helper function to get zodiac sign component by name
export function getZodiacSignComponent(sign: string): React.FC<{ className?: string }> {
  const signMap: Record<string, React.FC<{ className?: string }>> = {
    'aries': AriesSvg,
    'taurus': TaurusSvg,
    'gemini': GeminiSvg,
    'cancer': CancerSvg,
    'leo': LeoSvg,
    'virgo': VirgoSvg,
    'libra': LibraSvg,
    'scorpio': ScorpioSvg,
    'sagittarius': SagittariusSvg,
    'capricorn': CapricornSvg,
    'aquarius': AquariusSvg,
    'pisces': PiscesSvg,
  };
  
  return signMap[sign.toLowerCase()] || AriesSvg;
}

// Fixed zodiac sign names in English and Spanish
export const zodiacSignNames: Record<string, { en: string; es: string }> = {
  '1': { en: 'Aries', es: 'Aries' },
  '2': { en: 'Taurus', es: 'Tauro' },
  '3': { en: 'Gemini', es: 'Géminis' },
  '4': { en: 'Cancer', es: 'Cáncer' },
  '5': { en: 'Leo', es: 'Leo' },
  '6': { en: 'Virgo', es: 'Virgo' },
  '7': { en: 'Libra', es: 'Libra' },
  '8': { en: 'Scorpio', es: 'Escorpio' },
  '9': { en: 'Sagittarius', es: 'Sagitario' },
  '10': { en: 'Capricorn', es: 'Capricornio' },
  '11': { en: 'Aquarius', es: 'Acuario' },
  '12': { en: 'Pisces', es: 'Piscis' },
};

// Element associations for zodiac signs
export const zodiacElements: Record<string, string> = {
  '1': 'fire',   // Aries
  '2': 'earth',  // Taurus
  '3': 'air',    // Gemini
  '4': 'water',  // Cancer
  '5': 'fire',   // Leo
  '6': 'earth',  // Virgo
  '7': 'air',    // Libra
  '8': 'water',  // Scorpio
  '9': 'fire',   // Sagittarius
  '10': 'earth', // Capricorn
  '11': 'air',   // Aquarius
  '12': 'water', // Pisces
};