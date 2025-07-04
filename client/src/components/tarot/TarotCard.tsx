import React, { useState, useEffect } from 'react';
import { TarotCard as TarotCardType } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import tarotCards from '@/data/tarot';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TarotCardProps {
  card: TarotCardType;
}

const TarotCard: React.FC<TarotCardProps> = ({ card }) => {
  const [open, setOpen] = useState(false);
  const [currentCardId, setCurrentCardId] = useState<number>(card.id);
  const [currentCard, setCurrentCard] = useState<TarotCardType>(card);
  const { language, t } = useLanguage();

  // Update current card when the card prop changes
  useEffect(() => {
    setCurrentCardId(card.id);
    setCurrentCard(card);
  }, [card]);

  // Update current card when currentCardId changes
  useEffect(() => {
    const foundCard = tarotCards.find(c => c.id === currentCardId);
    if (foundCard) {
      setCurrentCard(foundCard);
    }
  }, [currentCardId]);

  // Format title with proper spacing between elements
  const formatTitle = (title: string) => {
    // Add spaces between Title Words if they're in "The Something Of The Something" format
    const parts = title.split(" ");
    if (parts.length > 2) {
      // Add proper spacing for titles like "The Magus of the Eternal Gods"
      return parts.join(" ");
    }
    return title;
  };

  // Navigate to the previous card
  const goToPreviousCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = tarotCards.findIndex(c => c.id === currentCardId);
    if (currentIndex > 0) {
      setCurrentCardId(tarotCards[currentIndex - 1].id);
    } else {
      // Loop back to the last card
      setCurrentCardId(tarotCards[tarotCards.length - 1].id);
    }
  };

  // Navigate to the next card
  const goToNextCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = tarotCards.findIndex(c => c.id === currentCardId);
    if (currentIndex < tarotCards.length - 1) {
      setCurrentCardId(tarotCards[currentIndex + 1].id);
    } else {
      // Loop back to the first card
      setCurrentCardId(tarotCards[0].id);
    }
  };

  return (
    <>
      <div className="group">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <div className="cursor-pointer transition-all duration-300 hover:scale-105">
              <div className="h-80 w-full flex flex-col items-center justify-center rounded-lg p-4 bg-grimoire-blue border-2 border-grimoire-gold bg-opacity-80 hover:shadow-[0_0_15px_3px] hover:shadow-grimoire-gold/40">
                <div className="text-center">
                  <span className="font-accent text-lg text-grimoire-amber">{card.number}</span>
                  <h3 className="font-display text-xl">{formatTitle(card.name[language])}</h3>
                  <div className="mt-4 mb-2">
                    <img 
                      src={card.imageSrc} 
                      alt={card.name[language]} 
                      className="h-40 mx-auto rounded-md"
                      loading="lazy"
                    />
                  </div>
                  <p className="font-serif text-sm italic mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {language === 'en' ? 'Click to view details' : 'Haga clic para ver detalles'}
                  </p>
                </div>
              </div>
            </div>
          </DialogTrigger>
          
          <DialogContent className="max-w-5xl max-h-[95vh] bg-grimoire-dark bg-opacity-95 border-2 border-grimoire-gold shadow-[0_0_20px_5px] shadow-grimoire-gold/20">
            <DialogTitle className="sr-only">{formatTitle(currentCard.name[language])}</DialogTitle>
            <DialogDescription className="sr-only">{language === 'en' ? 'Details about this Tarot card' : 'Detalles sobre esta carta del Tarot'}</DialogDescription>
            
            {/* Card navigation controls */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50">
              <button 
                onClick={goToPreviousCard}
                className="p-2 rounded-full bg-grimoire-gold/80 hover:bg-grimoire-gold text-grimoire-dark transition-colors shadow-md"
                aria-label={language === 'en' ? 'Previous card' : 'Carta anterior'}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>
            
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50">
              <button 
                onClick={goToNextCard}
                className="p-2 rounded-full bg-grimoire-gold/80 hover:bg-grimoire-gold text-grimoire-dark transition-colors shadow-md"
                aria-label={language === 'en' ? 'Next card' : 'Carta siguiente'}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            
            <ScrollArea className="max-h-[calc(95vh-4rem)] pr-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 py-4">
                {/* Image column */}
                <div className="flex flex-col items-center md:col-span-2">
                  <img 
                    src={currentCard.imageSrc} 
                    alt={currentCard.name[language]} 
                    className="w-full max-w-[300px] rounded-md border-2 border-grimoire-gold"
                  />
                  <div className="mt-4 text-center">
                    <span className="font-accent text-xl text-grimoire-amber">{currentCard.number}</span>
                    <h2 className="font-display text-2xl md:text-3xl text-grimoire-gold">
                      {formatTitle(currentCard.name[language])}
                    </h2>
                    {currentCard.title && (
                      <h3 className="font-serif text-lg text-grimoire-parchment italic mt-1">
                        "{currentCard.title[language]}"
                      </h3>
                    )}
                    {currentCard.hebrewLetter && (
                      <div className="mt-2">
                        <span className="text-grimoire-amber font-accent">{language === 'en' ? 'Hebrew Letter:' : 'Letra Hebrea:'}</span> 
                        <span className="ml-2 text-grimoire-parchment">{currentCard.hebrewLetter}</span>
                      </div>
                    )}
                    {currentCard.path && (
                      <div className="mt-1">
                        <span className="text-grimoire-amber font-accent">{language === 'en' ? 'Path:' : 'Sendero:'}</span> 
                        <span className="ml-2 text-grimoire-parchment">{currentCard.path}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Content column */}
                <div className="space-y-3 md:col-span-3">
                  <div className="bg-grimoire-dark border border-grimoire-gold/50 rounded-md p-4">
                    <h3 className="font-accent text-lg text-grimoire-amber mb-2">
                      {language === 'en' ? 'Esoteric Meaning' : 'Significado Esotérico'}
                    </h3>
                    <div className="text-grimoire-parchment max-h-[350px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-grimoire-gold/60 hover:scrollbar-thumb-grimoire-gold/90 scrollbar-track-grimoire-dark/30 rounded-md">
                      <p className="whitespace-pre-line leading-relaxed tracking-wide px-3 py-2 text-base font-serif">{currentCard.description[language]}</p>
                    </div>
                  </div>
                  
                  <div className="bg-grimoire-dark border border-grimoire-gold/50 rounded-md p-3">
                    <h3 className="font-accent text-lg text-grimoire-amber mb-1">
                      {language === 'en' ? 'Correspondences' : 'Correspondencias'}
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {currentCard.element && (
                        <div>
                          <p className="text-grimoire-gold text-sm">{t('tarot', 'element')}</p>
                          <p className="text-grimoire-parchment">{currentCard.element}</p>
                        </div>
                      )}
                      {currentCard.planet && (
                        <div>
                          <p className="text-grimoire-gold text-sm">{t('tarot', 'planet')}</p>
                          <p className="text-grimoire-parchment">{currentCard.planet}</p>
                        </div>
                      )}
                      {currentCard.zodiac && (
                        <div>
                          <p className="text-grimoire-gold text-sm">{t('tarot', 'zodiac')}</p>
                          <p className="text-grimoire-parchment">{currentCard.zodiac}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-grimoire-dark border border-grimoire-gold/50 rounded-md p-3">
                    <div className="mb-2">
                      <h3 className="font-accent text-lg text-grimoire-amber mb-1">
                        {t('tarot', 'upright')}
                      </h3>
                      <div className="flex flex-wrap gap-1">
                        {currentCard.keywords[language].upright.map((keyword, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-grimoire-blue/50 rounded-md text-grimoire-parchment text-sm">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-accent text-lg text-grimoire-amber mb-1">
                        {t('tarot', 'reversed')}
                      </h3>
                      <div className="flex flex-wrap gap-1">
                        {currentCard.keywords[language].reversed.map((keyword, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-grimoire-crimson/30 rounded-md text-grimoire-parchment text-sm">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default TarotCard;
