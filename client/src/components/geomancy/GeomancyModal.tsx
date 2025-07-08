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
import { GeomancyFigure as GeomancyFigureType } from '@/types';
import { geomancyFigures } from '@/data/geomancy';
import GeomancyImage from './GeomancyImage';

interface GeomancyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  figure: GeomancyFigureType;
}

const GeomancyModal: React.FC<GeomancyModalProps> = ({ 
  open, 
  onOpenChange, 
  figure 
}) => {
  const { language, t } = useLanguage();
  const [currentFigure, setCurrentFigure] = useState<GeomancyFigureType>(figure);

  // Update current figure when props change
  useEffect(() => {
    setCurrentFigure(figure);
  }, [figure]);

  // Navigate to previous figure
  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const currentIndex = geomancyFigures.findIndex(f => f.id === currentFigure.id);
    if (currentIndex > 0) {
      setCurrentFigure(geomancyFigures[currentIndex - 1]);
    } else {
      // Wrap around to the end
      setCurrentFigure(geomancyFigures[geomancyFigures.length - 1]);
    }
  };

  // Navigate to next figure
  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const currentIndex = geomancyFigures.findIndex(f => f.id === currentFigure.id);
    if (currentIndex < geomancyFigures.length - 1) {
      setCurrentFigure(geomancyFigures[currentIndex + 1]);
    } else {
      // Wrap around to the beginning
      setCurrentFigure(geomancyFigures[0]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-3xl max-h-[90vh] bg-grimoire-dark bg-opacity-95 border-2 border-grimoire-gold">
        <DialogTitle className="font-display text-xl sm:text-2xl text-grimoire-gold break-words">
          {currentFigure.name[language]}
        </DialogTitle>
        <DialogDescription className="sr-only">Details about geomancy figure</DialogDescription>
        
        {/* Navigation controls */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50">
          <button 
            onClick={goToPrevious}
            className="p-2 rounded-full bg-grimoire-gold/80 hover:bg-grimoire-gold text-grimoire-dark transition-colors shadow-md"
            aria-label={language === 'en' ? 'Previous figure' : 'Figura anterior'}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50">
          <button 
            onClick={goToNext}
            className="p-2 rounded-full bg-grimoire-gold/80 hover:bg-grimoire-gold text-grimoire-dark transition-colors shadow-md"
            aria-label={language === 'en' ? 'Next figure' : 'Figura siguiente'}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <ScrollArea className="max-h-[calc(90vh-4rem)] pr-4">
          <div className="space-y-4 py-4">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
                <div className="text-center">
                  <div className="w-48 h-48 mx-auto flex items-center justify-center bg-grimoire-blue rounded-full shadow-lg">
                    <GeomancyImage 
                      figureId={currentFigure.id}
                      size="large"
                      altText={currentFigure.name.en}
                      pattern={currentFigure.pattern}
                    />
                  </div>
                  <p className="font-accent text-grimoire-gold mt-4 text-center text-lg">{currentFigure.meaning[language]}</p>
                </div>
              </div>
              
              <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-grimoire-gold/50 md:pl-10 pt-6 md:pt-0">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-accent text-grimoire-gold text-lg">{t('geomancy', 'element')}</h4>
                    <p className="text-grimoire-parchment">
                      {currentFigure.element === 'fire' && `${t('astrology', 'elements', 'fire')} - ${language === 'en' ? 'Passionate, transformative, energetic' : 'Apasionado, transformador, energético'}`}
                      {currentFigure.element === 'air' && `${t('astrology', 'elements', 'air')} - ${language === 'en' ? 'Intellectual, communicative, connecting' : 'Intelectual, comunicativo, conectivo'}`}
                      {currentFigure.element === 'water' && `${t('astrology', 'elements', 'water')} - ${language === 'en' ? 'Emotional, intuitive, flowing' : 'Emocional, intuitivo, fluido'}`}
                      {currentFigure.element === 'earth' && `${t('astrology', 'elements', 'earth')} - ${language === 'en' ? 'Practical, stable, material' : 'Práctico, estable, material'}`}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-accent text-grimoire-gold text-lg">{t('geomancy', 'planetaryRuler')}</h4>
                    <p className="text-grimoire-parchment">
                      {currentFigure.planet === 'mercury' && `${language === 'en' ? 'Mercury' : 'Mercurio'} - ${language === 'en' ? 'The messenger, commerce, exchange of ideas' : 'El mensajero, comercio, intercambio de ideas'}`}
                      {currentFigure.planet === 'moon' && `${language === 'en' ? 'Moon' : 'Luna'} - ${language === 'en' ? 'Emotions, intuition, the subconscious' : 'Emociones, intuición, el subconsciente'}`}
                      {currentFigure.planet === 'sun' && `${language === 'en' ? 'Sun' : 'Sol'} - ${language === 'en' ? 'Vitality, ego, life force' : 'Vitalidad, ego, fuerza vital'}`}
                      {currentFigure.planet === 'venus' && `${language === 'en' ? 'Venus' : 'Venus'} - ${language === 'en' ? 'Love, beauty, harmony' : 'Amor, belleza, armonía'}`}
                      {currentFigure.planet === 'mars' && `${language === 'en' ? 'Mars' : 'Marte'} - ${language === 'en' ? 'Action, desire, conflict' : 'Acción, deseo, conflicto'}`}
                      {currentFigure.planet === 'jupiter' && `${language === 'en' ? 'Jupiter' : 'Júpiter'} - ${language === 'en' ? 'Growth, expansion, prosperity' : 'Crecimiento, expansión, prosperidad'}`}
                      {currentFigure.planet === 'saturn' && `${language === 'en' ? 'Saturn' : 'Saturno'} - ${language === 'en' ? 'Limitation, discipline, structure' : 'Limitación, disciplina, estructura'}`}
                      {currentFigure.planet === 'uranus' && `${language === 'en' ? 'Uranus' : 'Urano'} - ${language === 'en' ? 'Innovation, rebellion, awakening' : 'Innovación, rebelión, despertar'}`}
                      {currentFigure.planet === 'neptune' && `${language === 'en' ? 'Neptune' : 'Neptuno'} - ${language === 'en' ? 'Dreams, illusions, spirituality' : 'Sueños, ilusiones, espiritualidad'}`}
                      {currentFigure.planet === 'pluto' && `${language === 'en' ? 'Pluto' : 'Plutón'} - ${language === 'en' ? 'Transformation, power, regeneration' : 'Transformación, poder, regeneración'}`}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-accent text-grimoire-gold text-lg">{t('geomancy', 'astrologicalHouse')}</h4>
                    <p className="text-grimoire-parchment">
                      {language === 'en' ? `${currentFigure.house}${currentFigure.house === 1 ? 'st' : currentFigure.house === 2 ? 'nd' : currentFigure.house === 3 ? 'rd' : 'th'} House` : `Casa ${currentFigure.house}`} - 
                      {currentFigure.house === 1 && (language === 'en' ? ' Self, identity, beginnings' : ' Yo, identidad, comienzos')}
                      {currentFigure.house === 2 && (language === 'en' ? ' Possessions, values, resources' : ' Posesiones, valores, recursos')}
                      {currentFigure.house === 3 && (language === 'en' ? ' Communication, siblings, short journeys' : ' Comunicación, hermanos, viajes cortos')}
                      {currentFigure.house === 4 && (language === 'en' ? ' Home, family, roots' : ' Hogar, familia, raíces')}
                      {currentFigure.house === 5 && (language === 'en' ? ' Creativity, pleasure, children' : ' Creatividad, placer, hijos')}
                      {currentFigure.house === 6 && (language === 'en' ? ' Health, service, routine' : ' Salud, servicio, rutina')}
                      {currentFigure.house === 7 && (language === 'en' ? ' Partnerships, contracts, open enemies' : ' Asociaciones, contratos, enemigos abiertos')}
                      {currentFigure.house === 8 && (language === 'en' ? ' Shared resources, transformation, death' : ' Recursos compartidos, transformación, muerte')}
                      {currentFigure.house === 9 && (language === 'en' ? ' Philosophy, higher learning, long journeys' : ' Filosofía, educación superior, viajes largos')}
                      {currentFigure.house === 10 && (language === 'en' ? ' Career, reputation, public standing' : ' Carrera, reputación, posición pública')}
                      {currentFigure.house === 11 && (language === 'en' ? ' Friends, groups, aspirations' : ' Amistades, grupos, aspiraciones')}
                      {currentFigure.house === 12 && (language === 'en' ? ' Secrets, isolation, self-undoing' : ' Secretos, aislamiento, autodestrucción')}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-accent text-grimoire-gold text-lg">{t('geomancy', 'divinatoryMeaning')}</h4>
                    <p className="text-grimoire-parchment mt-2">{currentFigure.description[language]}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default GeomancyModal;