import React from 'react';
import { AstrologyHouse } from '@/types';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Import zodiac images from assets
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

// Map of house numbers to zodiac images and names
const houseToZodiac = {
  1: { image: ariesImage, names: { en: 'Aries', es: 'Aries' } },
  2: { image: taurusImage, names: { en: 'Taurus', es: 'Tauro' } },
  3: { image: geminiImage, names: { en: 'Gemini', es: 'Géminis' } },
  4: { image: cancerImage, names: { en: 'Cancer', es: 'Cáncer' } },
  5: { image: leoImage, names: { en: 'Leo', es: 'Leo' } },
  6: { image: virgoImage, names: { en: 'Virgo', es: 'Virgo' } },
  7: { image: libraImage, names: { en: 'Libra', es: 'Libra' } },
  8: { image: scorpioImage, names: { en: 'Scorpio', es: 'Escorpio' } },
  9: { image: sagittariusImage, names: { en: 'Sagittarius', es: 'Sagitario' } },
  10: { image: capricornImage, names: { en: 'Capricorn', es: 'Capricornio' } },
  11: { image: aquariusImage, names: { en: 'Aquarius', es: 'Acuario' } },
  12: { image: piscesImage, names: { en: 'Pisces', es: 'Piscis' } },
};

interface HouseInfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  houseNumber: number | null;
  houseInfo: AstrologyHouse | null;
  language: 'en' | 'es';
  onPrev: () => void;
  onNext: () => void;
}

const HouseInfoModal: React.FC<HouseInfoModalProps> = ({
  open,
  onOpenChange,
  houseNumber,
  houseInfo,
  language,
  onPrev,
  onNext,
}) => {
  if (!houseNumber || !houseInfo) return null;
  
  const romanNumeral = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'][houseNumber - 1];
  const zodiacInfo = houseToZodiac[houseNumber as keyof typeof houseToZodiac];
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-grimoire-dark border-grimoire-gold/50 text-grimoire-parchment sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center justify-between mb-2">
            <button 
              className="text-grimoire-gold hover:text-grimoire-amber transition-colors p-2"
              onClick={onPrev}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            
            <DialogTitle className="text-grimoire-gold font-display">
              {language === 'en' ? `House ${romanNumeral}` : `Casa ${romanNumeral}`}
            </DialogTitle>
            
            <button 
              className="text-grimoire-gold hover:text-grimoire-amber transition-colors p-2"
              onClick={onNext}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
          
          <DialogDescription className="text-grimoire-parchment">
            <div className="flex flex-col md:flex-row gap-4 pt-4">
              <div className="flex-shrink-0 flex flex-col items-center">
                {zodiacInfo.image && (
                  <img 
                    src={zodiacInfo.image} 
                    alt={`House ${romanNumeral}`} 
                    className="w-[120px] h-[120px] object-contain mx-auto mb-2" 
                  />
                )}
                <div className="text-center">
                  <div className="text-2xl font-accent text-grimoire-gold">{romanNumeral}</div>
                  <div className="text-sm text-grimoire-parchment">{zodiacInfo.names[language]}</div>
                </div>
              </div>
              
              <div className="flex-grow space-y-4">
                <div className="space-y-2">
                  <h3 className="font-display text-grimoire-amber">{houseInfo.name[language]}</h3>
                  <p className="text-grimoire-parchment">{houseInfo.description[language]}</p>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-accent text-grimoire-amber text-sm">{language === 'en' ? 'Keywords' : 'Palabras clave'}</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {houseInfo.keywords[language].map((keyword, idx) => (
                      <span 
                        key={idx} 
                        className="bg-grimoire-dark/60 border border-grimoire-gold/30 text-grimoire-parchment px-2 py-1 text-xs rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default HouseInfoModal;