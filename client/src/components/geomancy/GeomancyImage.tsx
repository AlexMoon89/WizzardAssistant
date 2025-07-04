import React, { useState } from 'react';
import { GeomancyFigureId } from '@/types';

// Import all geomancy figure reference images
import populusImage from '@/assets/geomancy-images/Geomantic_populus.svg.png';
import viaImage from '@/assets/geomancy-images/Geomantic_via.svg.png';
import albusImage from '@/assets/geomancy-images/Geomantic_albus.svg.png';
import conjunctioImage from '@/assets/geomancy-images/Geomantic_conjunctio.svg.png';
import puellaImage from '@/assets/geomancy-images/Geomantic_puella.svg.png';
import amissioImage from '@/assets/geomancy-images/Geomantic_amissio.svg.png';
import fortunaMajorImage from '@/assets/geomancy-images/Geomantic_fortunamajor.svg.png';
import fortunaMinorImage from '@/assets/geomancy-images/Geomantic_fortunaminor.svg.png';
import puerImage from '@/assets/geomancy-images/Geomantic_puer.svg.png';
import rubeusImage from '@/assets/geomancy-images/Geomantic_rubeus.svg.png';
import acquisitioImage from '@/assets/geomancy-images/Geomantic_acquisitio.svg.png';
import laetitiaImage from '@/assets/geomancy-images/Geomantic_laetitia.svg.png';
import tristitiaImage from '@/assets/geomancy-images/Geomantic_tristitia.svg.png';
import carcerImage from '@/assets/geomancy-images/Geomantic_carcer.svg.png';
import caputDraconisImage from '@/assets/geomancy-images/Geomantic_caputdraconis.svg.png';
import caudaDraconisImage from '@/assets/geomancy-images/Geomantic_caudadraconis.svg.png';

// Map geomancy figures to their image paths
const geomancyImages: Record<GeomancyFigureId, string> = {
  'populus': populusImage,
  'via': viaImage,
  'albus': albusImage,
  'conjunctio': conjunctioImage,
  'puella': puellaImage,
  'amissio': amissioImage,
  'fortuna-major': fortunaMajorImage,
  'fortuna-minor': fortunaMinorImage,
  'puer': puerImage,
  'rubeus': rubeusImage,
  'acquisitio': acquisitioImage,
  'laetitia': laetitiaImage,
  'tristitia': tristitiaImage,
  'carcer': carcerImage,
  'caput-draconis': caputDraconisImage,
  'cauda-draconis': caudaDraconisImage
};

interface GeomancyImageProps {
  figureId: GeomancyFigureId;
  size: 'small' | 'medium' | 'large';
  altText: string;
  pattern?: boolean[][]; // For fallback rendering
}

const GeomancyImage: React.FC<GeomancyImageProps> = ({ figureId, size, altText, pattern }) => {
  const [imageError, setImageError] = useState(false);
  
  // Define sizes for different display options
  const sizeClass = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-36 h-36',
  };

  // Render fallback pattern if image fails to load or if explicitly requested
  const renderPatternFallback = () => {
    if (!pattern) return null;
    
    return (
      <div className="flex flex-col items-center justify-center h-full">
        {pattern.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center mb-2">
            {row.map((active, dotIndex) => (
              active ? (
                // Single dot (active)
                <div 
                  key={`${rowIndex}-${dotIndex}`}
                  className="w-3 h-3 rounded-full bg-grimoire-paper mx-1.5"
                ></div>
              ) : (
                // Double dots (passive)
                <div key={`${rowIndex}-${dotIndex}`} className="flex">
                  <div className="w-3 h-3 rounded-full bg-grimoire-paper mx-1.5"></div>
                  <div className="w-3 h-3 rounded-full bg-grimoire-paper mx-1.5"></div>
                </div>
              )
            ))}
          </div>
        ))}
      </div>
    );
  };

  // If we have an image for this figure and no error, display it
  if (geomancyImages[figureId] && !imageError) {
    return (
      <div className={`${sizeClass[size]} relative`}>
        <div className="w-full h-full flex items-center justify-center">
          <img 
            src={geomancyImages[figureId]} 
            alt={altText} 
            className="w-[80%] h-[80%] object-contain transition-all duration-300 invert brightness-200"
            onError={() => setImageError(true)}
          />
        </div>
        {imageError && renderPatternFallback()}
      </div>
    );
  }

  // Fallback to displaying the pattern
  return (
    <div className={`${sizeClass[size]} flex items-center justify-center`}>
      {renderPatternFallback()}
    </div>
  );
};

export default GeomancyImage;