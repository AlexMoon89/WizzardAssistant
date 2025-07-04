import React from 'react';
import { ZodiacSign } from '@/types';

// Import all zodiac sign images
import ariesImage from '@/assets/zodiac/aries.png';
import taurusImage from '@/assets/zodiac/tauro.png';
import geminiImage from '@/assets/zodiac/geminis.png';
import cancerImage from '@/assets/zodiac/cancer.png';
import leoImage from '@/assets/zodiac/leo.png';
import virgoImage from '@/assets/zodiac/virgo.png';
import libraImage from '@/assets/zodiac/libra.png';
import scorpioImage from '@/assets/zodiac/escorpio.png';
import sagittariusImage from '@/assets/zodiac/sagitario.png';
import capricornImage from '@/assets/zodiac/capricornio.png';
import aquariusImage from '@/assets/zodiac/acuario.png';
import piscesImage from '@/assets/zodiac/piscis.png';

// Map zodiac signs to their image paths
const zodiacImages: Record<ZodiacSign, string> = {
  aries: ariesImage,
  taurus: taurusImage,
  gemini: geminiImage,
  cancer: cancerImage,
  leo: leoImage,
  virgo: virgoImage,
  libra: libraImage,
  scorpio: scorpioImage,
  sagittarius: sagittariusImage,
  capricorn: capricornImage,
  aquarius: aquariusImage,
  pisces: piscesImage,
};

interface ZodiacImageProps {
  sign: ZodiacSign;
  size: 'small' | 'medium' | 'large';
  altText: string;
}

const ZodiacImage: React.FC<ZodiacImageProps> = ({ sign, size, altText }) => {
  // Define sizes for different display options
  const sizeClass = {
    small: 'w-10 h-10',
    medium: 'w-16 h-16',
    large: 'w-24 h-24',
  };

  // If we have an image for this sign, display it
  if (zodiacImages[sign]) {
    return (
      <img 
        src={zodiacImages[sign]} 
        alt={altText} 
        className={`${sizeClass[size]} object-contain transition-all duration-300`}
      />
    );
  }

  // Fallback to displaying the symbol if no image is available
  return (
    <div className={`${sizeClass[size]} flex items-center justify-center text-grimoire-amber`}>
      <span className="text-2xl font-serif">{sign.charAt(0).toUpperCase()}</span>
    </div>
  );
};

export default ZodiacImage;