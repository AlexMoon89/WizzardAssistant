import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PlanetImage from './PlanetImages';
import ZodiacImage from './ZodiacImage';
import DecanDisplay from './DecanDisplay';
import { getDecansBySign } from '@/data/decans';
import { zodiacSigns, planets, astroHouses } from '@/data/astrology';
import { ZodiacSign, Planet } from '@/types';

interface AstrologyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'zodiac' | 'planet' | 'house';
  data: any;
}

const AstrologyModal: React.FC<AstrologyModalProps> = ({ 
  open, 
  onOpenChange, 
  type, 
  data 
}) => {
  const { language } = useLanguage();
  const [currentData, setCurrentData] = useState<any>(data);

  // Update current data when props change
  useEffect(() => {
    if (data) {
      setCurrentData(data);
    }
  }, [data]);

  // Get the appropriate data array based on type
  const getDataArray = () => {
    switch(type) {
      case 'zodiac': return zodiacSigns;
      case 'planet': return planets;
      case 'house': return astroHouses;
      default: return [];
    }
  };

  // Get identifier for the current item
  const getCurrentId = () => {
    if (!currentData) return null;
    
    switch(type) {
      case 'zodiac': 
      case 'planet': 
        return currentData.id;
      case 'house': 
        return currentData.number;
      default: return null;
    }
  };

  // Navigate to previous item
  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const dataArray = getDataArray();
    const currentId = getCurrentId();
    if (currentId === null || dataArray.length === 0) return;
    
    // Find current index
    const currentIndex = dataArray.findIndex(item => {
      if (type === 'house') {
        return (item as any).number === currentId;
      }
      return (item as any).id === currentId;
    });
    
    if (currentIndex > 0) {
      setCurrentData(dataArray[currentIndex - 1]);
    } else {
      // Wrap around to the end
      setCurrentData(dataArray[dataArray.length - 1]);
    }
  };

  // Navigate to next item
  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const dataArray = getDataArray();
    const currentId = getCurrentId();
    if (currentId === null || dataArray.length === 0) return;
    
    // Find current index
    const currentIndex = dataArray.findIndex(item => {
      if (type === 'house') {
        return (item as any).number === currentId;
      }
      return (item as any).id === currentId;
    });
    
    if (currentIndex < dataArray.length - 1) {
      setCurrentData(dataArray[currentIndex + 1]);
    } else {
      // Wrap around to the beginning
      setCurrentData(dataArray[0]);
    }
  };

  if (!currentData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-3xl max-h-[90vh] bg-grimoire-dark bg-opacity-95 border-2 border-grimoire-gold">
        <DialogTitle className="font-display text-xl sm:text-2xl text-grimoire-gold break-words">
          {currentData.name[language]}
          {currentData.symbol && <span className="ml-2">{currentData.symbol}</span>}
          {type === 'house' && <span className="ml-2">({currentData.number})</span>}
        </DialogTitle>
        <DialogDescription className="sr-only">Details about this {type}</DialogDescription>
        
        {/* Navigation controls */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50">
          <button 
            onClick={goToPrevious}
            className="p-2 rounded-full bg-grimoire-gold/80 hover:bg-grimoire-gold text-grimoire-dark transition-colors shadow-md"
            aria-label={language === 'en' ? 'Previous' : 'Anterior'}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50">
          <button 
            onClick={goToNext}
            className="p-2 rounded-full bg-grimoire-gold/80 hover:bg-grimoire-gold text-grimoire-dark transition-colors shadow-md"
            aria-label={language === 'en' ? 'Next' : 'Siguiente'}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <ScrollArea className="max-h-[calc(90vh-4rem)] pr-4">
          <div className="space-y-4 py-4">
            {/* Description */}
            <div className="bg-grimoire-dark border border-grimoire-gold/50 rounded-md p-4">
              <p className="text-grimoire-parchment">{currentData.description[language]}</p>
            </div>

            {/* Additional Info */}
            <div className="bg-grimoire-dark border border-grimoire-gold/50 rounded-md p-4">
              {type === 'zodiac' && (
                <div>
                  {/* Symbol and properties */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 mb-4">
                    {/* Zodiac image circle */}
                    <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-grimoire-gold flex items-center justify-center mb-4 sm:mb-0 bg-grimoire-blue/30">
                      {currentData.id ? (
                        <ZodiacImage 
                          sign={currentData.id as ZodiacSign}
                          size="large"
                          altText={currentData.name[language]}
                        />
                      ) : (
                        <span className="text-4xl text-grimoire-gold font-serif">{currentData.symbol}</span>
                      )}
                    </div>
                    
                    {/* Zodiac properties */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-accent text-grimoire-amber">Dates</h3>
                        <p className="text-grimoire-parchment">{currentData.dates}</p>
                      </div>
                      <div>
                        <h3 className="font-accent text-grimoire-amber">Element</h3>
                        <p className="text-grimoire-parchment capitalize">{currentData.element}</p>
                      </div>
                      <div>
                        <h3 className="font-accent text-grimoire-amber">Modality</h3>
                        <p className="text-grimoire-parchment capitalize">{currentData.modality}</p>
                      </div>
                      <div>
                        <h3 className="font-accent text-grimoire-amber">Ruling Planet</h3>
                        <p className="text-grimoire-parchment capitalize">{currentData.rulingPlanet}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Display the three decans for this zodiac sign */}
                  {currentData.name && (
                    <DecanDisplay decans={getDecansBySign(currentData.name.en)} />
                  )}
                </div>
              )}

              {type === 'planet' && (
                <div>
                  {/* Planet image and keywords */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 mb-4">
                    {/* Circular planet image container */}
                    <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-grimoire-gold flex items-center justify-center mb-4 sm:mb-0 bg-grimoire-blue/30">
                      {currentData.id ? (
                        <PlanetImage 
                          planet={currentData.id as Planet} 
                          symbol={currentData.symbol} 
                          size="large" 
                          altText={currentData.name[language]} 
                        />
                      ) : (
                        <span className="text-5xl text-grimoire-gold font-serif">
                          {currentData.symbol}
                        </span>
                      )}
                    </div>
                    
                    {/* Keywords */}
                    <div className="flex-1">
                      <h3 className="font-accent text-grimoire-amber mb-2">Keywords</h3>
                      <div className="flex flex-wrap gap-2">
                        {currentData.keywords && currentData.keywords[language] ? 
                          currentData.keywords[language].map((keyword: string, idx: number) => (
                            <span key={idx} className="px-2 py-1 bg-grimoire-blue/50 rounded-md text-grimoire-parchment">
                              {keyword}
                            </span>
                          )) : 
                          <span className="px-2 py-1 bg-grimoire-blue/50 rounded-md text-grimoire-parchment">
                            {language === 'en' ? 'No keywords available' : 'No hay palabras clave disponibles'}
                          </span>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {type === 'house' && (
                <div>
                  {/* House number visual and keywords */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 mb-4">
                    {/* House number visual indicator */}
                    <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-grimoire-gold flex items-center justify-center mb-4 sm:mb-0 bg-grimoire-blue/30">
                      <span className="text-4xl font-display text-grimoire-gold">{currentData.number}</span>
                    </div>
                    
                    {/* Keywords */}
                    <div className="flex-1">
                      <h3 className="font-accent text-grimoire-amber mb-2">Keywords</h3>
                      <div className="flex flex-wrap gap-2">
                        {currentData.keywords && currentData.keywords[language] ? 
                          currentData.keywords[language].map((keyword: string, idx: number) => (
                            <span key={idx} className="px-2 py-1 bg-grimoire-blue/50 rounded-md text-grimoire-parchment">
                              {keyword}
                            </span>
                          )) : 
                          <span className="px-2 py-1 bg-grimoire-blue/50 rounded-md text-grimoire-parchment">
                            {language === 'en' ? 'No keywords available' : 'No hay palabras clave disponibles'}
                          </span>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AstrologyModal;