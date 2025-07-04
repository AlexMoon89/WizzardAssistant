import React from 'react';
import { Planet } from '@/types';

// Direct imports of planet images
import sunImage from '@/assets/planets/sun.jpg';
import moonImage from '@/assets/planets/moon.jpg';
import mercuryImage from '@/assets/planets/mercury.jpg';
import venusImage from '@/assets/planets/venus.jpg';
import marsImage from '@/assets/planets/mars.jpg';
import jupiterImage from '@/assets/planets/jupiter.jpg';
import saturnImage from '@/assets/planets/saturn.jpg';

// Map of planet names to their image imports
const planetImageMap: Record<string, string> = {
  sun: sunImage,
  moon: moonImage,
  mercury: mercuryImage,
  venus: venusImage,
  mars: marsImage,
  jupiter: jupiterImage,
  saturn: saturnImage
};

interface PlanetImageProps {
  planet: Planet;
  symbol: string;
  size: 'small' | 'large';
  altText: string;
}

const PlanetImage: React.FC<PlanetImageProps> = ({ planet, symbol, size, altText }) => {
  const sizeClass = size === 'small' ? 'text-2xl' : 'text-5xl';
  const [imageError, setImageError] = React.useState(false);
  
  // For planets without images (Neptune, Uranus, Pluto) or if image loading fails
  if (!planetImageMap[planet] || ['neptune', 'uranus', 'pluto'].includes(planet) || imageError) {
    return (
      <span className={`${sizeClass} text-grimoire-gold font-serif`}>
        {symbol}
      </span>
    );
  }
  
  // Otherwise use the directly imported image
  return (
    <>
      <img 
        src={planetImageMap[planet]}
        alt={altText}
        className="w-full h-full object-cover"
        onError={() => {
          console.log(`Failed to load planet image: ${planet}`);
          setImageError(true);
        }}
      />
      {imageError && (
        <span className={`${sizeClass} text-grimoire-gold font-serif`}>
          {symbol}
        </span>
      )}
    </>
  );
};

export default PlanetImage;