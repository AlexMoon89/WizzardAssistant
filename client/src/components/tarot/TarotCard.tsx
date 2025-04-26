import React, { useState } from 'react';
import { TarotCard as TarotCardType } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

interface TarotCardProps {
  card: TarotCardType;
}

const TarotCard: React.FC<TarotCardProps> = ({ card }) => {
  const [open, setOpen] = useState(false);
  const { language, t } = useLanguage();

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
          
          <DialogContent className="max-w-4xl bg-grimoire-dark bg-opacity-95 border-2 border-grimoire-gold">
            <DialogTitle className="sr-only">{formatTitle(card.name[language])}</DialogTitle>
            <DialogDescription className="sr-only">{language === 'en' ? 'Details about this Tarot card' : 'Detalles sobre esta carta del Tarot'}</DialogDescription>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              {/* Image column */}
              <div className="flex flex-col items-center">
                <img 
                  src={card.imageSrc} 
                  alt={card.name[language]} 
                  className="w-full max-w-[300px] rounded-md border-2 border-grimoire-gold"
                />
                <div className="mt-4 text-center">
                  <span className="font-accent text-xl text-grimoire-amber">{card.number}</span>
                  <h2 className="font-display text-2xl md:text-3xl text-grimoire-gold">
                    {formatTitle(card.name[language])}
                  </h2>
                  {card.title && (
                    <h3 className="font-serif text-lg text-grimoire-parchment italic mt-1">
                      "{card.title[language]}"
                    </h3>
                  )}
                  {card.hebrewLetter && (
                    <div className="mt-2">
                      <span className="text-grimoire-amber font-accent">{language === 'en' ? 'Hebrew Letter:' : 'Letra Hebrea:'}</span> 
                      <span className="ml-2 text-grimoire-parchment">{card.hebrewLetter}</span>
                    </div>
                  )}
                  {card.path && (
                    <div className="mt-1">
                      <span className="text-grimoire-amber font-accent">{language === 'en' ? 'Path:' : 'Sendero:'}</span> 
                      <span className="ml-2 text-grimoire-parchment">{card.path}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Content column */}
              <div className="space-y-4">
                <div className="bg-grimoire-dark border border-grimoire-gold/50 rounded-md p-4">
                  <h3 className="font-accent text-lg text-grimoire-amber mb-2">
                    {language === 'en' ? 'Esoteric Meaning' : 'Significado Esotérico'}
                  </h3>
                  <p className="text-grimoire-parchment italic">{card.description[language]}</p>
                </div>
                
                <div className="bg-grimoire-dark border border-grimoire-gold/50 rounded-md p-4">
                  <h3 className="font-accent text-lg text-grimoire-amber mb-2">
                    {language === 'en' ? 'Correspondences' : 'Correspondencias'}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {card.element && (
                      <div>
                        <p className="text-grimoire-gold">{t('tarot', 'element')}</p>
                        <p className="text-grimoire-parchment">{card.element}</p>
                      </div>
                    )}
                    {card.planet && (
                      <div>
                        <p className="text-grimoire-gold">{t('tarot', 'planet')}</p>
                        <p className="text-grimoire-parchment">{card.planet}</p>
                      </div>
                    )}
                    {card.zodiac && (
                      <div>
                        <p className="text-grimoire-gold">{t('tarot', 'zodiac')}</p>
                        <p className="text-grimoire-parchment">{card.zodiac}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-grimoire-dark border border-grimoire-gold/50 rounded-md p-4">
                  <div className="mb-4">
                    <h3 className="font-accent text-lg text-grimoire-amber mb-2">
                      {t('tarot', 'upright')}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {card.keywords[language].upright.map((keyword, idx) => (
                        <span key={idx} className="px-2 py-1 bg-grimoire-blue/50 rounded-md text-grimoire-parchment">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-accent text-lg text-grimoire-amber mb-2">
                      {t('tarot', 'reversed')}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {card.keywords[language].reversed.map((keyword, idx) => (
                        <span key={idx} className="px-2 py-1 bg-grimoire-crimson/30 rounded-md text-grimoire-parchment">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default TarotCard;
