import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { tarotSpreads } from '@/data/tarotSpreads';
import tarotCards from '@/data/tarot';
import { TarotSpread, TarotCard, TarotReading } from '@/types';

// Define three-card spread position descriptions
const THREE_CARD_DESCRIPTIONS: Record<string, {en: string; es: string}> = {
  '1': {
    en: 'The Past position represents influences, events, or patterns from the past that have shaped the current situation.',
    es: 'La posición del Pasado representa influencias, eventos o patrones del pasado que han moldeado la situación actual.'
  },
  '2': {
    en: 'The Present position reveals the current energies, challenges, and opportunities at work in your situation right now.',
    es: 'La posición del Presente revela las energías, desafíos y oportunidades actuales que actúan en tu situación en este momento.'
  },
  '3': {
    en: 'The Future position shows potential outcomes and energies that are developing if you continue on your current path.',
    es: 'La posición del Futuro muestra resultados potenciales y energías que se están desarrollando si continúas en tu camino actual.'
  }
};

// Define cross spread position descriptions
const CROSS_SPREAD_DESCRIPTIONS: Record<string, {en: string; es: string}> = {
  '1': {
    en: 'The Spirit position represents the core essence of the situation, the conscious awareness, and the integration of all four elements. It reflects your spiritual path and higher purpose in relation to the question.',
    es: 'La posición del Espíritu representa la esencia central de la situación, la conciencia consciente y la integración de los cuatro elementos. Refleja tu camino espiritual y propósito superior en relación con la pregunta.'
  },
  '2': {
    en: 'The Air position represents the mental and intellectual aspects of the situation. It reveals thoughts, ideas, communication patterns, and the rational approach to the question.',
    es: 'La posición del Aire representa los aspectos mentales e intelectuales de la situación. Revela pensamientos, ideas, patrones de comunicación y el enfoque racional de la pregunta.'
  },
  '3': {
    en: 'The Fire position represents energy, passion, inspiration, and action. It shows the creative and transformative forces at work and how your willpower affects the question.',
    es: 'La posición del Fuego representa energía, pasión, inspiración y acción. Muestra las fuerzas creativas y transformadoras en funcionamiento y cómo tu fuerza de voluntad afecta la pregunta.'
  },
  '4': {
    en: 'The Water position represents emotions, intuition, relationships, and subconscious influences. It reveals the emotional undercurrents, dreams, and feelings related to the question.',
    es: 'La posición del Agua representa emociones, intuición, relaciones e influencias subconscientes. Revela las corrientes emocionales subyacentes, sueños y sentimientos relacionados con la pregunta.'
  },
  '5': {
    en: 'The Earth position represents the physical and material aspects of the situation. This card shows practical concerns, resources, health, and how tangible realities are influencing the question.',
    es: 'La posición de la Tierra representa los aspectos físicos y materiales de la situación. Esta carta muestra preocupaciones prácticas, recursos, salud y cómo las realidades tangibles están influyendo en la pregunta.'
  }
};
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getRandomInt, shuffleArray } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, RefreshCw, Save, Hand } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import HouseInfoModal from '@/components/astrology/HouseInfoModal';

import { astroHouses, zodiacSigns } from '@/data/astrology';

// Zodiac sign names mapping
const zodiacSignNames: Record<string, { en: string; es: string }> = {
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
const zodiacElements: Record<string, string> = {
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

// Import zodiac sign images from assets/zodiac folder
import ariesImage from '@assets/zodiac/aries.png';
import taurusImage from '@assets/zodiac/tauro.png';
import geminiImage from '@assets/zodiac/geminis.png';
import cancerImage from '@assets/zodiac/cancer.png';
import leoImage from '@assets/zodiac/leo.png';
import virgoImage from '@assets/zodiac/virgo.png';
import libraImage from '@assets/zodiac/libra.png';
import scorpioImage from '@assets/zodiac/escorpio.png';
import sagittariusImage from '@assets/zodiac/sagitario.png';
import capricornImage from '@assets/zodiac/capricornio.png';
import aquariusImage from '@assets/zodiac/acuario.png';
import piscesImage from '@assets/zodiac/piscis.png';

// Import element symbols
import AirSymbol from "@assets/Air.png";
import EarthSymbol from "@assets/Earth.png";
import FireSymbol from "@assets/Fire.png";
import SpiritSymbol from "@assets/Spirit.png";
import WaterSymbol from "@assets/Water.png";

const TarotSpreads: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedSpread, setSelectedSpread] = useState<TarotSpread | null>(null);
  const [reading, setReading] = useState<TarotReading | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [revealedCards, setRevealedCards] = useState<number[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isShowingHouseInfo, setIsShowingHouseInfo] = useState<boolean>(false);
  const [isManualSelection, setIsManualSelection] = useState<boolean>(false);
  const [cardSelectionMode, setCardSelectionMode] = useState<boolean>(false);
  const [nextPositionToFill, setNextPositionToFill] = useState<number>(1);
  const [selectedCards, setSelectedCards] = useState<{position: number, card: TarotCard}[]>([]);

  // Reset revealed cards when spread changes
  useEffect(() => {
    setRevealedCards([]);
    setReading(null);
    setSelectedPosition(null);
    setIsManualSelection(false);
    setCardSelectionMode(false);
    setNextPositionToFill(1);
    setSelectedCards([]);
  }, [selectedSpread]);

  const handleSpreadChange = (spreadId: string) => {
    const spread = tarotSpreads.find(s => s.id === spreadId) || null;
    setSelectedSpread(spread);
  };

  const startManualSelection = () => {
    if (!selectedSpread) return;
    
    // Reset all state for manual selection
    setReading(null);
    setIsManualSelection(true);
    setNextPositionToFill(1);
    setSelectedCards([]);
    setRevealedCards([]);
    
    console.log('Started manual selection mode for', selectedSpread.id);
    
    // Show visual indicator on all card positions
    setTimeout(() => {
      // Find all card position elements based on spread type
      let cardElements;
      
      if (selectedSpread.id === 'zodiac-spread') {
        cardElements = document.querySelectorAll('[data-position-id]');
      } else if (selectedSpread.id === 'cross-spread') {
        cardElements = document.querySelectorAll('.cross-card');
      } else {
        // Three-card spread
        cardElements = document.querySelectorAll('.three-card');
      }
      
      console.log(`Found ${cardElements.length} card elements to highlight for ${selectedSpread.id}`);
      
      // Highlight each one in sequence with temporary class instead of inline styles
      cardElements.forEach((card, index) => {
        setTimeout(() => {
          const el = card as HTMLElement;
          el.classList.add('selection-highlight');
          setTimeout(() => {
            el.classList.remove('selection-highlight');
          }, 500);
        }, index * 200);
      });
    }, 100);
    
    // Show instructions to user - now we'll use a toast notification instead of alert
    toast({
      title: language === 'en' ? 'Manual Selection Mode' : 'Modo de Selección Manual',
      description: language === 'en' 
        ? 'Click on each position to select a card.'
        : 'Haz clic en cada posición para seleccionar una carta.',
      variant: 'default',
    });
  };

  const selectRandomCardForPosition = (positionId: number) => {
    console.log('Selecting card for position:', positionId);
    if (!selectedSpread || !isManualSelection) {
      console.log('Not in manual selection mode or no spread selected');
      return;
    }
    
    try {
      // Already selected this position
      if (selectedCards.some(sc => sc.position === positionId) || revealedCards.includes(positionId)) {
        console.log('Position already has a card assigned - showing visual feedback');
        // Show feedback that this card is already selected using toast
        toast({
          title: language === 'en' ? 'Card Already Selected' : 'Carta Ya Seleccionada',
          description: language === 'en' ? 'You have already selected a card for this position!' : '¡Ya has seleccionado una carta para esta posición!',
          variant: 'destructive',
        });
        return;
      }
      
      // Get a random card that hasn't been selected yet
      const shuffledCards = shuffleArray([...tarotCards]);
      const usedCardIds = selectedCards.map(sc => sc.card.id);
      const availableCards = shuffledCards.filter(card => !usedCardIds.includes(card.id));
      const randomCard = availableCards[0]; // Get the first card from the shuffled deck
      
      if (!randomCard) {
        console.error('No available cards!');
        return;
      }
      
      console.log('Selected card:', randomCard?.name?.en || 'unknown card', 'for position', positionId);
      
      // Add this card to the selected cards
      setSelectedCards(prev => [...prev, { position: positionId, card: randomCard }]);
      setRevealedCards(prev => [...prev, positionId]);
      
      // Show feedback about selected card
      toast({
        title: language === 'en' ? 'Card Selected' : 'Carta Seleccionada',
        description: language === 'en'
          ? `Selected ${randomCard.name.en} for position ${positionId}`
          : `Seleccionado ${randomCard.name.es} para la posición ${positionId}`,
        variant: 'default',
      });
      
      // In manual selection mode, we don't want to automatically show the card interpretation
      // This prevents unwanted popups when selecting cards
      if (!isManualSelection) {
        // Only show card info after a delay if we're not in manual selection mode
        setTimeout(() => {
          showCardInfo(positionId);
        }, 300);
      }
      
      // Check if all positions are filled
      if (selectedCards.length + 1 >= selectedSpread.positions.length) {
        // Show final feedback
        toast({
          title: language === 'en' ? 'Reading Complete' : 'Lectura Completa',
          description: language === 'en' ? 'All cards selected! Creating your reading...' : 'Todas las cartas seleccionadas! Creando tu lectura...',
          variant: 'default',
        });
        
        // Create the reading
        setTimeout(() => {
          const newReading: TarotReading = {
            spreadId: selectedSpread.id,
            cards: [...selectedCards, { position: positionId, card: randomCard }].map(sc => ({
              position: sc.position,
              card: sc.card,
              isReversed: false // All cards upright as requested
            })),
            date: new Date()
          };
          
          setReading(newReading);
          setIsManualSelection(false);
          
          // Reveal all cards automatically
          const allPositions = selectedSpread.positions.map(p => p.id);
          setRevealedCards(allPositions);
          setSelectedPosition(1); // Focus on the first card
        }, 1000); // Short delay for a better experience
      }
    } catch (error) {
      console.error('Error selecting card:', error);
      toast({
        title: language === 'en' ? 'Error' : 'Error',
        description: language === 'en' ? 'Error selecting card. Please try again.' : 'Error al seleccionar la carta. Por favor, intenta de nuevo.',
        variant: 'destructive',
      });
    }
  };

  const drawCards = () => {
    if (!selectedSpread) return;

    setIsDrawing(true);
    
    // Simulate card drawing with a slight delay
    setTimeout(() => {
      const shuffledCards = shuffleArray([...tarotCards]);
      const drawnCards = shuffledCards.slice(0, selectedSpread.positions.length);
      
      const newReading: TarotReading = {
        spreadId: selectedSpread.id,
        cards: drawnCards.map((card, index) => ({
          position: index + 1,
          card,
          isReversed: false // All cards upright as requested
        })),
        date: new Date()
      };
      
      setReading(newReading);
      setIsDrawing(false);
      
      // Reveal all cards automatically for a better experience
      const allPositions = selectedSpread.positions.map(p => p.id);
      setRevealedCards(allPositions);
      setSelectedPosition(1); // Still focus on the first card
    }, 1000);
  };

  const revealCard = (positionId: number) => {
    if (!revealedCards.includes(positionId)) {
      setRevealedCards(prev => [...prev, positionId]);
    }
    // Use our showCardInfo function instead of directly showing the modal
    showCardInfo(positionId);
  };

  // State for inline position info display (not using modals)
  const [inlinePositionInfo, setInlinePositionInfo] = useState<{id: number, spreadId: string} | null>(null);
  
  // Display information about a position inline (not using modal)
  const showPositionInfo = (positionId: number, spreadId: string) => {
    console.log('showPositionInfo called for position:', positionId, 'in spread:', spreadId);
    try {
      // Never show position info during manual selection
      if (isManualSelection) {
        console.log('In manual selection mode, not showing position info');
        // Instead treat this as a card selection
        if (spreadId === 'three-card' || spreadId === 'cross-spread') {
          selectRandomCardForPosition(positionId);
        }
        return;
      }
      
      // Only allow for supported spread types
      if (spreadId !== 'three-card' && spreadId !== 'cross-spread') {
        console.log('Spread type not supported for position info:', spreadId);
        return;
      }
      
      // Toggle info display
      if (inlinePositionInfo?.id === positionId && inlinePositionInfo?.spreadId === spreadId) {
        setInlinePositionInfo(null); // Hide if already showing for this position
      } else {
        setInlinePositionInfo({id: positionId, spreadId}); // Show for this position
      }
    } catch (e) {
      console.error('Error showing position info:', e);
    }
  };
  
  // State for house info display in zodiac spread
  const [houseInfoModal, setHouseInfoModal] = useState<{number: number} | null>(null);

  // Show house information specifically for the zodiac spread (in a separate modal)
  const showHouseInfo = (positionId: number) => {
    console.log('showHouseInfo called for position:', positionId);
    try {
      // In manual selection mode, treat clicks as card selection
      if (isManualSelection) {
        console.log('In manual selection mode - selecting card instead');
        selectRandomCardForPosition(positionId);
        return;
      }
      
      // Only show house info for zodiac spread
      if (selectedSpread?.id !== 'zodiac-spread') {
        console.log('Not a zodiac spread, not showing house info');
        return;
      }
      
      console.log('Setting position for house info:', positionId);
      setHouseInfoModal({number: positionId});
    } catch (e) {
      console.error('Error showing house info:', e);
    }
  };
  
  // Display card interpretation when clicked
  const showCardInfo = (positionId: number) => {
    console.log('showCardInfo called for position:', positionId);
    try {
      console.log('Setting position for card info:', positionId);
      setSelectedPosition(positionId);
      
      // Always close any house info modal first
      if (modalOpen && isShowingHouseInfo) {
        setModalOpen(false);
        // Small delay before showing card modal
        setTimeout(() => {
          setIsShowingHouseInfo(false);
          setModalOpen(true);
        }, 100);
      } else {
        // Use a short timeout to ensure state update before showing the modal
        setTimeout(() => {
          console.log('Opening card interpretation modal for position:', positionId);
          // Clear any house info flag
          setIsShowingHouseInfo(false);
          setModalOpen(true);
        }, 10);
      }
    } catch (e) {
      console.error('Error showing card info:', e);
    }
  };

  const resetReading = () => {
    setReading(null);
    setRevealedCards([]);
    setSelectedPosition(null);
  };

  const saveReading = () => {
    // This would typically save to a database
    // For now, just show a toast notification
    const saveText = t('tarot', 'spreads', 'saveReading');
    toast({
      title: language === 'en' ? 'Reading Saved' : 'Lectura Guardada',
      description: saveText + ' ' + new Date().toLocaleString(),
      variant: 'default',
    });
  };

  const getCardByPosition = (positionId: number) => {
    if (!reading) return null;
    return reading.cards.find(c => c.position === positionId) || null;
  };

  const getCurrentPositionInfo = () => {
    if (!selectedSpread || !selectedPosition) return null;
    return selectedSpread.positions.find(p => p.id === selectedPosition) || null;
  };

  const getCardKeywords = (positionCard: { card: TarotCard, isReversed: boolean } | null) => {
    if (!positionCard) return [];
    // Always use upright keywords as requested by user
    const keywordList = positionCard.card.keywords[language].upright;
    return keywordList;
  };

  const getElementColor = (element: string) => {
    switch(element) {
      case 'fire': return 'bg-grimoire-fire/60';
      case 'water': return 'bg-grimoire-water/60';
      case 'air': return 'bg-grimoire-air/60';
      case 'earth': return 'bg-grimoire-earth/60';
      case 'spirit': return 'bg-grimoire-spirit/60';
      default: return 'bg-grimoire-gold/30';
    }
  };

  const getElementName = (element: string) => {
    if (element === 'spirit') return language === 'en' ? 'Spirit' : 'Espíritu';
    // Handle known element types
    const elementTranslations: Record<string, string> = {
      fire: t('astrology', 'elements', 'fire'),
      water: t('astrology', 'elements', 'water'),
      air: t('astrology', 'elements', 'air'),
      earth: t('astrology', 'elements', 'earth')
    };
    return elementTranslations[element] || element;
  };
  
  // Helper function to get zodiac sign image from assets/zodiac folder
  const getZodiacImage = (signNumber: string) => {
    switch(signNumber) {
      case '1': return ariesImage;         // Aries
      case '2': return taurusImage;        // Taurus
      case '3': return geminiImage;        // Gemini
      case '4': return cancerImage;        // Cancer
      case '5': return leoImage;           // Leo
      case '6': return virgoImage;         // Virgo
      case '7': return libraImage;         // Libra
      case '8': return scorpioImage;       // Scorpio
      case '9': return sagittariusImage;   // Sagittarius
      case '10': return capricornImage;    // Capricorn
      case '11': return aquariusImage;     // Aquarius
      case '12': return piscesImage;       // Pisces
      default: return null;
    }
  };

  return (
    <div className="space-y-6 py-6">
      <div className="text-center">
        <h2 className="font-display text-3xl text-grimoire-gold mb-3">{t('tarot', 'spreads', 'title')}</h2>
        <p className="text-grimoire-parchment max-w-2xl mx-auto">{t('tarot', 'spreads', 'subtitle')}</p>
      </div>

      {/* House Info Modal - Separate from card modals */}
      {houseInfoModal && (
        <Dialog 
          open={houseInfoModal !== null} 
          onOpenChange={(open) => {
            if (!open) setHouseInfoModal(null);
          }}
        >
          <DialogContent className="bg-grimoire-dark border-grimoire-gold/50 text-grimoire-parchment sm:max-w-[600px]">
            <DialogHeader>
              <div className="flex items-center justify-between mb-2">
                <DialogTitle className="text-grimoire-gold font-display">
                  {(() => {
                    if (!houseInfoModal) return '';
                    const romanNumeral = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'][houseInfoModal.number - 1];
                    return language === 'en' ? `House ${romanNumeral}` : `Casa ${romanNumeral}`;
                  })()}
                </DialogTitle>
                <DialogClose className="text-grimoire-gold hover:text-grimoire-amber">
                  <X size={24} />
                </DialogClose>
              </div>
            </DialogHeader>
            <div className="mt-2">
              {houseInfoModal && (
                <div className="space-y-4">
                  {/* Zodiac house info */}
                  <div className="flex items-start gap-4">
                    <div className="bg-grimoire-dark rounded-full p-2 w-16 h-16 flex items-center justify-center shrink-0 border-2 border-grimoire-gold/60">
                      <div className="text-center text-grimoire-gold font-bold">
                        <span className="text-2xl font-serif">{['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'][houseInfoModal.number - 1]}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-grimoire-gold font-bold text-lg">
                        {astroHouses.find(h => h.number === houseInfoModal.number)?.name[language] || ''}  
                      </h3>
                      <div className="text-grimoire-parchment text-sm mt-1">
                        {astroHouses.find(h => h.number === houseInfoModal.number)?.keywords[language].join(', ') || ''}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-b border-grimoire-gold/20 py-4">
                    <p className="text-grimoire-parchment">
                      {astroHouses.find(h => h.number === houseInfoModal.number)?.description[language] || ''}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {(astroHouses.find(h => h.number === houseInfoModal.number)?.keywords[language] || []).map(keyword => (
                      <span key={keyword} className="px-2 py-1 rounded-full bg-grimoire-gold/10 border border-grimoire-gold/30 text-grimoire-gold text-xs">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      <Card className="bg-grimoire-dark border-grimoire-gold/50">
        <CardHeader>
          <CardTitle className="text-grimoire-amber font-accent">{t('tarot', 'spreads', 'selectSpread')}</CardTitle>
          <CardDescription className="text-grimoire-parchment">
            {reading ? (
              <div className="flex justify-between items-center">
                <span>{selectedSpread?.name[language]}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-grimoire-gold/50 text-grimoire-amber hover:bg-grimoire-dark/50"
                  onClick={resetReading}
                >
                  <RefreshCw className="mr-2 h-4 w-4" /> {t('tarot', 'spreads', 'newReading')}
                </Button>
              </div>
            ) : (
              <Select onValueChange={handleSpreadChange}>
                <SelectTrigger className="w-full sm:w-[300px] bg-grimoire-dark border-grimoire-gold/50 text-grimoire-parchment">
                  <SelectValue placeholder={t('tarot', 'spreads', 'selectSpread')} />
                </SelectTrigger>
                <SelectContent className="bg-grimoire-dark border-grimoire-gold/50 text-grimoire-parchment">
                  {tarotSpreads.map(spread => (
                    <SelectItem 
                      key={spread.id} 
                      value={spread.id}
                      className="text-grimoire-parchment hover:bg-grimoire-gold focus:bg-grimoire-gold/20"
                    >
                      {spread.name[language]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {selectedSpread && !reading && (
            <div className="space-y-4">
              <div className="bg-grimoire-dark/60 border border-grimoire-gold/30 rounded-md p-4">
                <p className="text-grimoire-parchment mb-4">{selectedSpread.description[language]}</p>
                
                <div className="flex justify-center mb-6">
                  {selectedSpread.id === 'three-card' ? (
                    <div className="relative">
                      <svg width="300" height="120" viewBox="0 0 300 120" className="opacity-80">
                        <g 
                          className="three-card cursor-pointer" 
                          data-position-id="1"
                          onClick={() => { isManualSelection ? selectRandomCardForPosition(1) : showPositionInfo(1, 'three-card'); }}
                        >
                          <rect x="10" y="10" width="80" height="100" rx="5" fill="#967439" opacity="0.3" stroke="#d4a256" strokeWidth="2" />
                          <text x="50" y="65" textAnchor="middle" fill="#d4a256" fontFamily="serif" fontSize="16">{language === 'en' ? 'Past' : 'Pasado'}</text>
                        </g>
                        <g 
                          className="three-card cursor-pointer" 
                          data-position-id="2"
                          onClick={() => { isManualSelection ? selectRandomCardForPosition(2) : showPositionInfo(2, 'three-card'); }}
                        >
                          <rect x="110" y="10" width="80" height="100" rx="5" fill="#b5525b" opacity="0.3" stroke="#d4a256" strokeWidth="2" />
                          <text x="150" y="65" textAnchor="middle" fill="#d4a256" fontFamily="serif" fontSize="16">{language === 'en' ? 'Present' : 'Presente'}</text>
                        </g>
                        <g 
                          className="three-card cursor-pointer" 
                          data-position-id="3"
                          onClick={() => { isManualSelection ? selectRandomCardForPosition(3) : showPositionInfo(3, 'three-card'); }}
                        >
                          <rect x="210" y="10" width="80" height="100" rx="5" fill="#a2c4db" opacity="0.3" stroke="#d4a256" strokeWidth="2" />
                          <text x="250" y="65" textAnchor="middle" fill="#d4a256" fontFamily="serif" fontSize="16">{language === 'en' ? 'Future' : 'Futuro'}</text>
                        </g>
                      </svg>
                      
                      {/* Inline position information for three-card spread */}
                      {inlinePositionInfo?.spreadId === 'three-card' && (
                        <div className="absolute p-4 bg-grimoire-dark/95 border-2 border-grimoire-gold/80 rounded-lg shadow-lg z-50 text-grimoire-parchment"
                             style={{ 
                               width: '280px', 
                               top: '130px', 
                               left: inlinePositionInfo.id === 1 ? '10px' : 
                                    inlinePositionInfo.id === 2 ? '110px' : 
                                    '210px' 
                             }}>
                          <div className="flex items-center mb-3">
                            <h3 className="font-accent text-grimoire-gold text-lg">
                              {inlinePositionInfo.id === 1 && (language === 'en' ? 'Past' : 'Pasado')}
                              {inlinePositionInfo.id === 2 && (language === 'en' ? 'Present' : 'Presente')}
                              {inlinePositionInfo.id === 3 && (language === 'en' ? 'Future' : 'Futuro')}
                            </h3>
                            <button 
                              className="ml-auto text-grimoire-gold hover:text-grimoire-amber"
                              onClick={(e) => {
                                e.stopPropagation();
                                setInlinePositionInfo(null);
                              }}
                            >
                              <X size={18} />
                            </button>
                          </div>
                          <p className="text-sm">{THREE_CARD_DESCRIPTIONS[inlinePositionInfo.id.toString()][language]}</p>
                        </div>
                      )}
                    </div>
                  ) : selectedSpread.id === 'cross-spread' ? (
                    <div className="flex justify-center items-center relative w-[700px] h-[700px] opacity-90">
                      {/* Center - Spirit */}
                      <div className="absolute" style={{ top: '300px', left: '300px' }}>
                        <div 
                          className="w-[100px] h-[140px] flex flex-col items-center bg-purple-800/20 border-2 border-grimoire-gold/70 rounded-md p-1 cross-card cursor-pointer"
                          data-position-id="1"
                          onClick={() => { isManualSelection ? selectRandomCardForPosition(1) : showPositionInfo(1, 'cross-spread'); }}
                        >
                          <img src={SpiritSymbol} alt="Spirit" className="w-[60px] h-[60px] object-contain mt-2" />
                          <span className="text-grimoire-parchment text-sm mt-1">{language === 'en' ? 'Spirit' : 'Espíritu'}</span>
                        </div>
                      </div>
                      
                      {/* Top - Air */}
                      <div className="absolute" style={{ top: '80px', left: '300px' }}>
                        <div 
                          className="w-[100px] h-[140px] flex flex-col items-center bg-blue-300/20 border-2 border-grimoire-gold/70 rounded-md p-1 cross-card cursor-pointer"
                          data-position-id="2"
                          onClick={() => { isManualSelection ? selectRandomCardForPosition(2) : showPositionInfo(2, 'cross-spread'); }}
                        >
                          <img src={AirSymbol} alt="Air" className="w-[60px] h-[60px] object-contain mt-2" />
                          <span className="text-grimoire-parchment text-sm mt-1">{language === 'en' ? 'Air' : 'Aire'}</span>
                        </div>
                      </div>
                      
                      {/* Right - Fire */}
                      <div className="absolute" style={{ top: '300px', left: '520px' }}>
                        <div 
                          className="w-[100px] h-[140px] flex flex-col items-center bg-red-500/20 border-2 border-grimoire-gold/70 rounded-md p-1 cross-card cursor-pointer"
                          data-position-id="3"
                          onClick={() => { isManualSelection ? selectRandomCardForPosition(3) : showPositionInfo(3, 'cross-spread'); }}
                        >
                          <img src={FireSymbol} alt="Fire" className="w-[60px] h-[60px] object-contain mt-2" />
                          <span className="text-grimoire-parchment text-sm mt-1">{language === 'en' ? 'Fire' : 'Fuego'}</span>
                        </div>
                      </div>
                      
                      {/* Bottom - Water */}
                      <div className="absolute" style={{ top: '520px', left: '300px' }}>
                        <div 
                          className="w-[100px] h-[140px] flex flex-col items-center bg-blue-800/20 border-2 border-grimoire-gold/70 rounded-md p-1 cross-card cursor-pointer"
                          data-position-id="4"
                          onClick={() => { isManualSelection ? selectRandomCardForPosition(4) : showPositionInfo(4, 'cross-spread'); }}
                        >
                          <img src={WaterSymbol} alt="Water" className="w-[60px] h-[60px] object-contain mt-2" />
                          <span className="text-grimoire-parchment text-sm mt-1">{language === 'en' ? 'Water' : 'Agua'}</span>
                        </div>
                      </div>
                      
                      {/* Left - Earth */}
                      <div className="absolute" style={{ top: '300px', left: '80px' }}>
                        <div 
                          className="w-[100px] h-[140px] flex flex-col items-center bg-green-600/20 border-2 border-grimoire-gold/70 rounded-md p-1 cross-card cursor-pointer"
                          data-position-id="5"
                          onClick={() => { isManualSelection ? selectRandomCardForPosition(5) : showPositionInfo(5, 'cross-spread'); }}
                        >
                          <img src={EarthSymbol} alt="Earth" className="w-[60px] h-[60px] object-contain mt-2" />
                          <span className="text-grimoire-parchment text-sm mt-1">{language === 'en' ? 'Earth' : 'Tierra'}</span>
                        </div>
                      </div>
                      
                      {/* Inline position information for cross spread */}
                      {inlinePositionInfo?.spreadId === 'cross-spread' && (
                        <div className="absolute p-4 bg-grimoire-dark/95 border-2 border-grimoire-gold/80 rounded-lg shadow-lg z-50 text-grimoire-parchment"
                             style={{ 
                               width: '300px',
                               top: inlinePositionInfo.id === 1 ? '360px' : // Spirit - Center
                                    inlinePositionInfo.id === 2 ? '140px' : // Air - Top
                                    inlinePositionInfo.id === 3 ? '280px' : // Fire - Right
                                    inlinePositionInfo.id === 4 ? '420px' : // Water - Bottom
                                    '280px', // Earth - Left 
                               left: inlinePositionInfo.id === 1 ? '200px' : // Spirit - Center
                                     inlinePositionInfo.id === 2 ? '350px' : // Air - Top
                                     inlinePositionInfo.id === 3 ? '430px' : // Fire - Right
                                     inlinePositionInfo.id === 4 ? '350px' : // Water - Bottom
                                     '150px', // Earth - Left
                             }}>
                          <div className="flex items-center mb-3">
                            <h3 className="font-accent text-grimoire-gold text-lg">
                              {inlinePositionInfo.id === 1 && (language === 'en' ? 'Spirit' : 'Espíritu')}
                              {inlinePositionInfo.id === 2 && (language === 'en' ? 'Air' : 'Aire')}
                              {inlinePositionInfo.id === 3 && (language === 'en' ? 'Fire' : 'Fuego')}
                              {inlinePositionInfo.id === 4 && (language === 'en' ? 'Water' : 'Agua')}
                              {inlinePositionInfo.id === 5 && (language === 'en' ? 'Earth' : 'Tierra')}
                            </h3>
                            <button 
                              className="ml-auto text-grimoire-gold hover:text-grimoire-amber"
                              onClick={(e) => {
                                e.stopPropagation();
                                setInlinePositionInfo(null);
                              }}
                            >
                              <X size={18} />
                            </button>
                          </div>
                          {inlinePositionInfo.id === 1 && (
                            <p className="text-sm">{language === 'en' ? 
                              'The Spirit position represents the core essence of the situation, the conscious awareness, and the integration of all four elements. It reflects your spiritual path and higher purpose in relation to the question.' : 
                              'La posición del Espíritu representa la esencia central de la situación, la conciencia consciente y la integración de los cuatro elementos. Refleja tu camino espiritual y propósito superior en relación con la pregunta.'}</p>
                          )}
                          {inlinePositionInfo.id === 2 && (
                            <p className="text-sm">{language === 'en' ? 
                              'The Air position represents the mental and intellectual aspects of the situation. It reveals thoughts, ideas, communication patterns, and the rational approach to the question.' : 
                              'La posición del Aire representa los aspectos mentales e intelectuales de la situación. Revela pensamientos, ideas, patrones de comunicación y el enfoque racional de la pregunta.'}</p>
                          )}
                          {inlinePositionInfo.id === 3 && (
                            <p className="text-sm">{language === 'en' ? 
                              'The Fire position represents energy, passion, inspiration, and action. It shows the creative and transformative forces at work and how your willpower affects the question.' : 
                              'La posición del Fuego representa energía, pasión, inspiración y acción. Muestra las fuerzas creativas y transformadoras en funcionamiento y cómo tu fuerza de voluntad afecta la pregunta.'}</p>
                          )}
                          {inlinePositionInfo.id === 4 && (
                            <p className="text-sm">{language === 'en' ? 
                              'The Water position represents emotions, intuition, relationships, and the subconscious. It reflects feelings, dreams, and emotional patterns related to the question.' : 
                              'La posición del Agua representa emociones, intuición, relaciones y el subconsciente. Refleja sentimientos, sueños y patrones emocionales relacionados con la pregunta.'}</p>
                          )}
                          {inlinePositionInfo.id === 5 && (
                            <p className="text-sm">{language === 'en' ? 
                              'The Earth position represents the physical world, practical matters, and manifestation. It shows the tangible outcomes, material aspects, and grounding forces influencing the question.' : 
                              'La posición de la Tierra representa el mundo físico, asuntos prácticos y manifestación. Muestra los resultados tangibles, aspectos materiales y fuerzas de anclaje que influyen en la pregunta.'}</p>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Zodiac Spread Layout - 12 positions in a circle without the circle outline */
                    <div className="flex justify-center items-center relative w-[800px] h-[800px] opacity-90">
                      {/* Generate 12 positions in a circle - with Aries at 9 o'clock position (180 degrees rotation) */}
                      {selectedSpread.positions.map((position, index) => {
                        // Map position id to zodiac index (1-12)
                        const zodiacIndex = position.id;
                        
                        // Calculate angle - start with Aries (1) at 9 o'clock (180 degrees)
                        // Counterclockwise arrangement (negative angle) to follow traditional zodiac order
                        const angle = (180 - ((zodiacIndex - 1) * 30)) * (Math.PI / 180); 
                        
                        // Calculate position with adjusted radius - larger to avoid overlapping cards
                        const radius = 350; // Increased radius for more space between cards
                        const left = 400 + radius * Math.cos(angle);
                        const top = 400 + radius * Math.sin(angle);
                        
                        // Get zodiac sign name and element
                        const signName = zodiacSignNames[zodiacIndex];
                        const element = zodiacElements[zodiacIndex];
                        
                        // Get the zodiac image
                        const zodiacImg = getZodiacImage(zodiacIndex.toString());
                        
                        // Get element color
                        const elementColorClass = getElementColor(element);
                        
                        // Convert house number to Roman numeral
                        const romanNumeral = [
                          'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'
                        ][position.id - 1];
                        
                        // Determine if this is just a display (no active reading) or selection mode
                        const isDisplayOnly = !isManualSelection && !reading;
                        
                        // Clickable card for random selection
                        return (
                          <div 
                            key={position.id} 
                            className="absolute" 
                            style={{ 
                              left: `${left}px`, 
                              top: `${top}px`,
                              transform: 'translate(-50%, -50%)', // Center the card on its position point
                              zIndex: isManualSelection ? 5 : 0, // Increase z-index when in selection mode
                            }}
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent event bubbling
                              console.log('ZODIAC CARD CLICKED - display mode:', isDisplayOnly, 'position:', position.id);
                              
                              if (isManualSelection) {
                                console.log('Manual selection mode - selecting random card');
                                selectRandomCardForPosition(position.id);
                              } else if (isDisplayOnly) {
                                // Show house info when clicking in display mode
                                console.log('Display-only mode - showing house info modal');
                                showHouseInfo(position.id);
                              }
                            }}
                          >
                            <div 
                              data-position-id={position.id}
                              className={`w-[80px] h-[140px] flex flex-col items-center ${elementColorClass} 
                                border-2 ${isManualSelection || isDisplayOnly ? 'cursor-pointer hover:border-white hover:shadow-xl' : ''} 
                                border-grimoire-gold/70 rounded-md p-2 transition-all duration-200`}
                              onClick={(e) => {
                                e.stopPropagation(); // Stop click event bubbling
                                console.log('Inner zodiac card element clicked', position.id);
                                
                                if (isManualSelection) {
                                  // In manual selection mode, select a random card for this position
                                  console.log('Manual selection mode - selecting card for position', position.id);
                                  
                                  // Create and trigger a custom event with direct DOM access
                                  const event = new CustomEvent('selectCard', { detail: { positionId: position.id } });
                                  document.dispatchEvent(event);
                                  
                                  // Also directly call the function as backup
                                  selectRandomCardForPosition(position.id);
                                  
                                  // Visual feedback that card was selected
                                  const card = e.currentTarget as HTMLElement;
                                  card.style.border = '3px solid gold';
                                  setTimeout(() => {
                                    card.style.border = '';
                                  }, 300);
                                  
                                } else if (isDisplayOnly) {
                                  // In display-only mode, show house info modal
                                  console.log('Display mode - showing house info modal');
                                  showHouseInfo(position.id);
                                  return;
                                }
                              }}
                            >
                              {zodiacImg ? (
                                <img 
                                  src={zodiacImg} 
                                  alt={signName[language]} 
                                  className="w-[40px] h-[40px] mt-1 object-contain" 
                                />
                              ) : (
                                <div className="w-[40px] h-[40px] mt-1 flex items-center justify-center text-grimoire-gold text-xl font-serif">
                                  {position.id}
                                </div>
                              )}
                              <span className="text-grimoire-parchment text-xs mt-1 text-center font-accent">{signName[language]}</span>
                              <span className="text-grimoire-gold text-xs mt-1">
                                {language === 'en' ? `House ${romanNumeral}` : `Casa ${romanNumeral}`}
                              </span>
                              
                              {isManualSelection && (
                                <span className="text-xs text-grimoire-amber mt-1 text-center">
                                  {language === 'en' ? 'Click to select' : 'Haz clic'}
                                </span>
                              )}
                              
                              {/* Only show "Click for Info" in display mode when not in manual selection mode */}
                              {isDisplayOnly && selectedSpread && !isManualSelection && (
                                <span className="text-xs text-grimoire-amber mt-1 text-center font-bold">
                                  {language === 'en' ? 'Click for Info' : 'Clic para Info'}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                
                {/* Only show the draw cards button, removing the position grid */}
                
                {/* Move house buttons to the reading section */}
                
                <div className="mt-2 flex flex-col space-y-4">
                  
                  <div className="flex space-x-4 justify-end">
                    <Button 
                      variant="outline" 
                      className="border-grimoire-gold/50 text-grimoire-amber hover:bg-grimoire-dark/50"
                      onClick={startManualSelection}
                      disabled={isManualSelection}
                    >
                      <Hand className="mr-2 h-4 w-4" />
                      {language === 'en' ? 'Select cards individually' : 'Seleccionar individualmente'}
                    </Button>
                    
                    <Button 
                      variant="default" 
                      className="bg-grimoire-gold hover:bg-grimoire-amber"
                      onClick={drawCards}
                      disabled={isDrawing || isManualSelection}
                    >
                      {isDrawing ? (
                        <>
                          <span className="animate-pulse mr-2">...</span>
                          {t('tarot', 'spreads', 'drawCards')}
                        </>
                      ) : (
                        t('tarot', 'spreads', 'drawCards')
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {reading && (
            <div className="space-y-4 bg-grimoire-dark/60 border border-grimoire-gold/30 rounded-md p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-accent text-grimoire-amber text-lg">
                  {selectedSpread?.name[language]}
                </h3>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-grimoire-gold/50 text-grimoire-amber hover:bg-grimoire-dark/50"
                    onClick={saveReading}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {t('tarot', 'spreads', 'saveReading')}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-grimoire-gold/50 text-grimoire-amber hover:bg-grimoire-dark/50"
                    onClick={resetReading}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    {t('tarot', 'spreads', 'newReading')}
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-center pt-4 pb-8">
                {selectedSpread?.id === 'three-card' ? (
                  <div className="flex justify-center gap-6">
                    {[1, 2, 3].map(positionId => {
                      const positionCard = getCardByPosition(positionId);
                      const isRevealed = revealedCards.includes(positionId);
                      
                      return (
                        <div 
                          key={positionId}
                          className={`w-[120px] h-[210px] rounded-md three-card cursor-pointer ${isRevealed ? 'border-grimoire-gold' : 'border-2 border-grimoire-gold/60 hover:border-grimoire-gold'}`}
                          data-position-id={positionId}
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('Three card clicked - position:', positionId, 'isManualSelection:', isManualSelection);
                            
                            // In manual selection mode, always select a card no matter what
                            if (isManualSelection) {
                              console.log('Manual selection mode - selecting card for three-card spread');
                              selectRandomCardForPosition(positionId);
                              return;
                            }
                            
                            // In reading mode, either show interpretation or reveal
                            if (isRevealed) {
                              showCardInfo(positionId);
                            } else {
                              // Reveal card
                              console.log('Revealing card for position:', positionId);
                              setRevealedCards(prev => [...prev, positionId]);
                              
                              // After revealing, show the card interpretation
                              setTimeout(() => showCardInfo(positionId), 300);
                            }
                          }}
                        >
                          {isRevealed && positionCard ? (
                            <div className="relative w-full h-full flex flex-col justify-center items-center">
                              <img 
                                src={positionCard.card.imageSrc} 
                                alt={positionCard.card.name[language]} 
                                className="object-contain h-full rounded-md shadow-md transition-all hover:shadow-xl" 
                              />
                              <div className="absolute -bottom-14 text-center w-full">
                                <div className="text-grimoire-amber text-xs font-serif">
                                  {positionId === 1 && (language === 'en' ? 'Past' : 'Pasado')}
                                  {positionId === 2 && (language === 'en' ? 'Present' : 'Presente')}
                                  {positionId === 3 && (language === 'en' ? 'Future' : 'Futuro')}
                                </div>
                                <div className="text-grimoire-gold text-xs font-serif mt-1 max-w-full truncate px-1">
                                  {positionCard.card.name[language]}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div 
                              className={`w-full h-full rounded-md border-2 border-grimoire-gold/50 bg-grimoire-dark flex flex-col items-center justify-center ${!isRevealed ? 'hover:bg-grimoire-dark/70 hover:border-grimoire-gold' : ''}`}
                              
                            >
                              <span className="text-grimoire-gold text-lg font-serif">{positionId}</span>
                              <div className="flex flex-col items-center">
                                <span className="text-grimoire-parchment text-xs mt-2">
                                  {!isRevealed ? t('tarot', 'tapToReveal') : ''}
                                </span>
                                
                                {/* Add position info button */}
                                {!isManualSelection && (
                                  <button 
                                    className="mt-2 px-2 py-0.5 text-xs rounded-full bg-grimoire-amber text-grimoire-dark font-bold"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // Use our predefined constant for descriptions
                                      showPositionInfo(positionId, 'three-card');
                                    }}
                                  >
                                    {language === 'en' ? 'Position Info' : 'Info de Posición'}
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : selectedSpread?.id === 'cross-spread' ? (
                  <div className="relative w-[600px] h-[600px] mx-auto border border-grimoire-gold/30 rounded-md p-4">
                    {/* Cross positions - 1 to 5 */}
                    {[1, 2, 3, 4, 5].map(positionId => {
                      // Position 1 (Spirit) = center
                      // Position 2 (Air) = top
                      // Position 3 (Fire) = right
                      // Position 4 (Water) = bottom
                      // Position 5 (Earth) = left
                      
                      const positionStyles = {
                        1: { top: '225px', left: '225px' },  // Center - Spirit
                        2: { top: '50px', left: '225px' },   // Top - Air
                        3: { top: '225px', left: '400px' },  // Right - Fire
                        4: { top: '400px', left: '225px' }, // Bottom - Water
                        5: { top: '225px', left: '50px' },  // Left - Earth
                      }[positionId];
                      
                      const positionCard = getCardByPosition(positionId);
                      const isRevealed = revealedCards.includes(positionId);
                      
                      return (
                        <div 
                          key={positionId}
                          className="absolute"
                          style={positionStyles}
                        >
                          {/* Show inline position info if this card is selected */}
                          {inlinePositionInfo?.id === positionId && inlinePositionInfo?.spreadId === 'cross-spread' && (
                            <div className="absolute p-4 bg-grimoire-dark/95 border-2 border-grimoire-gold/80 rounded-lg shadow-lg z-50 text-grimoire-parchment"
                                 style={{ width: '280px', top: '0px', left: positionId === 3 ? '-300px' : positionId === 5 ? '120px' : (positionId === 1 || positionId === 4) ? '-90px' : '-90px' }}>
                              <div className="flex items-center mb-3">
                                {positionId === 1 && <img src={SpiritSymbol} alt="Spirit" className="w-8 h-8 mr-2" />}
                                {positionId === 2 && <img src={AirSymbol} alt="Air" className="w-8 h-8 mr-2" />}
                                {positionId === 3 && <img src={FireSymbol} alt="Fire" className="w-8 h-8 mr-2" />}
                                {positionId === 4 && <img src={WaterSymbol} alt="Water" className="w-8 h-8 mr-2" />}
                                {positionId === 5 && <img src={EarthSymbol} alt="Earth" className="w-8 h-8 mr-2" />}
                                <h3 className="font-accent text-grimoire-gold text-lg">
                                  {positionId === 1 && (language === 'en' ? 'Spirit' : 'Espíritu')}
                                  {positionId === 2 && (language === 'en' ? 'Air' : 'Aire')}
                                  {positionId === 3 && (language === 'en' ? 'Fire' : 'Fuego')}
                                  {positionId === 4 && (language === 'en' ? 'Water' : 'Agua')}
                                  {positionId === 5 && (language === 'en' ? 'Earth' : 'Tierra')}
                                </h3>
                                <button 
                                  className="ml-auto text-grimoire-gold hover:text-grimoire-amber"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setInlinePositionInfo(null);
                                  }}
                                >
                                  <X size={18} />
                                </button>
                              </div>
                              <p className="text-sm">{CROSS_SPREAD_DESCRIPTIONS[positionId.toString()][language]}</p>
                            </div>
                          )}
                          <div 
                            className={`w-[100px] h-[150px] rounded-md cross-card cursor-pointer ${isRevealed ? 'border-grimoire-gold' : 'border-2 border-grimoire-gold/60 hover:border-grimoire-gold'}`}
                            data-position-id={positionId}
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('Cross card clicked - position:', positionId, 'isManualSelection:', isManualSelection);
                              
                              // In manual selection mode, always select a card no matter what
                              if (isManualSelection) {
                                console.log('Manual selection mode - selecting card for cross spread');
                                selectRandomCardForPosition(positionId);
                                return;
                              }
                              
                              // In reading mode, either show interpretation or reveal
                              if (isRevealed) {
                                showCardInfo(positionId);
                              } else {
                                // Reveal card
                                console.log('Revealing card for position:', positionId);
                                setRevealedCards(prev => [...prev, positionId]);
                                
                                // After revealing, show the card interpretation
                                setTimeout(() => showCardInfo(positionId), 300);
                              }
                            }}
                          >
                            {isRevealed && positionCard ? (
                              <div className="relative flex flex-col items-center w-full h-full">
                                <img 
                                  src={positionCard.card.imageSrc} 
                                  alt={positionCard.card.name[language]} 
                                  className="object-contain w-full h-full rounded-md shadow-md transition-all hover:shadow-xl" 
                                />
                                <div className="absolute -bottom-6 text-center w-full">
                                  <span className="text-grimoire-gold text-xs font-serif truncate max-w-full">
                                    {positionCard.card.name[language]}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <div 
                                className={`w-full h-full rounded-md border-2 border-grimoire-gold/50 bg-grimoire-dark flex flex-col items-center justify-center ${!isRevealed ? 'hover:bg-grimoire-dark/70 hover:border-grimoire-gold' : ''}`}
                                
                              >
                                {/* Show element images instead of position numbers */}
                                <div className="relative">
                                  {positionId === 1 && <img src={SpiritSymbol} alt="Spirit" className="w-[40px] h-[40px] object-contain" />}
                                  {positionId === 2 && <img src={AirSymbol} alt="Air" className="w-[40px] h-[40px] object-contain" />}
                                  {positionId === 3 && <img src={FireSymbol} alt="Fire" className="w-[40px] h-[40px] object-contain" />}
                                  {positionId === 4 && <img src={WaterSymbol} alt="Water" className="w-[40px] h-[40px] object-contain" />}
                                  {positionId === 5 && <img src={EarthSymbol} alt="Earth" className="w-[40px] h-[40px] object-contain" />}
                                  
                                  {/* Add info button for elements */}
                                  <button 
                                    className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-grimoire-amber text-grimoire-dark text-xs font-bold"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // Only show position info when not in manual selection mode
                                      if (!isManualSelection) {
                                        showPositionInfo(positionId, 'cross-spread');
                                      }
                                    }}
                                  >
                                    i
                                  </button>
                                </div>
                                
                                <span className="text-grimoire-parchment text-xs mt-2">
                                  {!isRevealed ? t('tarot', 'tapToReveal') : ''}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* Zodiac Spread Layout - 12 positions in a circle */
                  <div className="relative w-[800px] h-[800px] mx-auto">
                    {selectedSpread?.positions.map(position => {
                      const positionId = position.id;
                      const positionCard = getCardByPosition(positionId);
                      const isRevealed = revealedCards.includes(positionId);
                      
                      // Calculate position on circle - with Aries at 9 o'clock (180 degrees)
                      // Counterclockwise arrangement (negative angle) to follow traditional zodiac order
                      const angle = (180 - ((positionId - 1) * 30)) * (Math.PI / 180);
                      const radius = 320; // Increased radius to prevent card overlap
                      const left = 400 + radius * Math.cos(angle);
                      const top = 400 + radius * Math.sin(angle);
                      
                      // Get zodiac sign image
                      const zodiacImg = getZodiacImage(positionId.toString());
                      const zodiacName = zodiacSignNames[positionId];
                      
                      // Determine if this is display-only mode
                      const isDisplayOnly = !isManualSelection && !reading;
                      
                      return (
                        <div 
                          key={positionId}
                          className="absolute" 
                          style={{ 
                            left: `${left - 50}px`, 
                            top: `${top - 75}px`,
                          }}
                        >
                          <div 
                            data-position-id={positionId}
                            className="w-[100px] h-[150px] rounded-md cursor-pointer border-2 border-grimoire-gold/50 hover:border-grimoire-gold hover:shadow-lg"
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('CONTAINER clicked in zodiac spread - position:', positionId, 'isManualSelection:', isManualSelection, 'isDisplayOnly:', isDisplayOnly);
                              
                              // Make card selection the highest priority in manual selection mode
                              if (isManualSelection) {
                                console.log('Manual selection mode - selecting card from container');
                                selectRandomCardForPosition(positionId);
                                return;
                              }
                              
                              // Only remaining case is in reading mode with revealed or unrevealed cards
                              if (isRevealed && positionCard) {
                                console.log('Showing card interpretation for revealed card');
                                showCardInfo(positionId);
                              } else if (!isRevealed) {
                                console.log('Revealing card for position:', positionId);
                                setRevealedCards(prev => [...prev, positionId]);
                                // After revealing, show the card interpretation
                                setTimeout(() => showCardInfo(positionId), 300);
                              }
                            }}
                          >
                            {isRevealed && positionCard ? (
                              <div className="relative w-full h-full flex flex-col items-center">
                                <img 
                                  src={positionCard.card.imageSrc} 
                                  alt={positionCard.card.name[language]} 
                                  className="object-contain w-full h-full rounded-md shadow-md transition-all hover:shadow-xl" 
                                />
                                <div className="absolute -bottom-14 text-center w-full">
                                  <div className="text-grimoire-amber text-xs font-serif">
                                    {zodiacName[language]}
                                  </div>
                                  <div className="text-grimoire-gold text-xs font-serif mt-1 max-w-full truncate px-1">
                                    {positionCard.card.name[language]}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div 
                                className={`w-full h-full rounded-md border-2 border-grimoire-gold/50 bg-grimoire-dark flex flex-col items-center justify-center ${!isRevealed ? 'hover:bg-grimoire-dark/70 hover:border-grimoire-gold' : ''}`}
                                
                              >
                                {zodiacImg ? (
                                  <img 
                                    src={zodiacImg} 
                                    alt={zodiacName[language]} 
                                    className="w-[40px] h-[40px] object-contain" 
                                  />
                                ) : (
                                  <span className="text-grimoire-gold text-lg font-serif">{positionId}</span>
                                )}
                                
                                <span className="text-grimoire-parchment text-xs mt-2 text-center">
                                  {zodiacName[language]}
                                </span>
                                
                                <span className="text-grimoire-parchment text-xs mt-1">
                                  {!isRevealed ? t('tarot', 'tapToReveal') : ''}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="font-accent text-grimoire-amber text-lg mb-2">
                  {t('tarot', 'spreads', 'interpretation')}
                </h3>
                <p className="text-grimoire-parchment mb-4">
                  {language === 'en' ? 
                    'Click on a card to view its detailed interpretation in the context of its position.' :
                    'Haz clic en una carta para ver su interpretación detallada en el contexto de su posición.'
                  }
                </p>
                
                {/* Show astrological house reference buttons for zodiac spread */}
                {selectedSpread?.id === 'zodiac-spread' && (
                  <div className="mt-4 mb-6">
                    <h3 className="text-grimoire-amber text-lg font-accent text-center mb-3">{language === 'en' ? 'House Information' : 'Información de las Casas'}</h3>
                    <p className="text-grimoire-parchment text-sm mb-4 text-center">
                      {language === 'en' ? 'Click on a house number below to learn about its meaning and influence.' : 'Haga clic en un número de casa a continuación para conocer su significado e influencia.'}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                      {Array.from({length: 12}, (_, i) => i + 1).map(houseNumber => {
                        const romanNumeral = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'][houseNumber - 1];
                        return (
                          <button 
                            key={houseNumber}
                            id={`house-button-${houseNumber}`}
                            className="px-3 py-1.5 text-sm rounded-md border-2 border-grimoire-gold/50 bg-grimoire-dark text-grimoire-gold hover:bg-grimoire-dark/70 hover:border-grimoire-gold hover:shadow-md"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent event bubbling
                              console.log('House button clicked:', houseNumber);
                              showHouseInfo(houseNumber);
                            }}
                          >
                            {language === 'en' ? `House ${romanNumeral}` : `Casa ${romanNumeral}`}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                {/* Modified Dialog with explicit controls */}
                <Dialog 
                  open={modalOpen} 
                  onOpenChange={(open) => {
                    console.log('Dialog onOpenChange called, setting modalOpen to:', open);
                    setModalOpen(open);
                  }}
                >
                  <DialogContent className="bg-grimoire-dark border-grimoire-gold/50 text-grimoire-parchment sm:max-w-[600px]">
                    <DialogHeader>
                      <div className="flex items-center justify-between mb-2">
                        <button 
                          className="text-grimoire-gold hover:text-grimoire-amber transition-colors p-2" 
                          onClick={() => {
                            if (!selectedSpread || !selectedPosition) return;
                            
                            // Get previous position ID (loop back to max if at 1)
                            let prevPosition = selectedPosition - 1;
                            if (prevPosition < 1) {
                              prevPosition = selectedSpread.positions.length;
                            }
                            
                            // In display-only mode, we can always navigate
                            const isDisplayOnly = !isManualSelection && !reading;
                            if (isDisplayOnly || revealedCards.includes(prevPosition)) {
                              setSelectedPosition(prevPosition);
                            }
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                        </button>
                        
                        <DialogTitle className="text-grimoire-gold font-display">
                          {(() => {
                            const currentPosition = getCurrentPositionInfo();
                            const positionCard = currentPosition ? getCardByPosition(currentPosition.id) : null;
                            
                            // If we're showing house info specifically
                            if (isShowingHouseInfo && currentPosition) {
                              const romanNumeral = [
                                'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'
                              ][currentPosition.id - 1];
                              return language === 'en' ? `House ${romanNumeral}` : `Casa ${romanNumeral}`;
                            }
                            
                            // Otherwise show card + position info
                            if (!currentPosition || !positionCard) {
                              return 'Card Interpretation';
                            }
                            
                            // For zodiac spread, show House number in Roman numerals
                            if (selectedSpread?.id === 'zodiac-spread') {
                              const romanNumeral = [
                                'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'
                              ][currentPosition.id - 1];
                              return `${positionCard.card.name[language]} - ${language === 'en' ? `House ${romanNumeral}` : `Casa ${romanNumeral}`}`;
                            }
                            
                            return `${positionCard.card.name[language]} - ${currentPosition.name[language]}`;
                          })()}
                        </DialogTitle>
                        
                        <button 
                          className="text-grimoire-gold hover:text-grimoire-amber transition-colors p-2" 
                          onClick={() => {
                            if (!selectedSpread || !selectedPosition) return;
                            
                            // Get next position ID (loop back to 1 if at max)
                            let nextPosition = selectedPosition + 1;
                            if (nextPosition > selectedSpread.positions.length) {
                              nextPosition = 1;
                            }
                            
                            // In display-only mode, we can always navigate
                            const isDisplayOnly = !isManualSelection && !reading;
                            if (isDisplayOnly || revealedCards.includes(nextPosition)) {
                              setSelectedPosition(nextPosition);
                            }
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                        </button>
                      </div>
                      {/* Use Fragment instead of DialogDescription for complex children */}
                      <div className="text-grimoire-parchment mt-4">
                        {(() => {
                          const currentPosition = getCurrentPositionInfo();
                          const positionCard = currentPosition ? getCardByPosition(currentPosition.id) : null;
                          
                          // If we're showing position/house info specifically
                          if (isShowingHouseInfo && currentPosition) {
                            // Three-Card spread position info
                            if (selectedSpread?.id === 'three-card') {
                              const positionId = currentPosition.id;
                              
                              // Use our constant for position descriptions
                              const threeCardDescriptions = THREE_CARD_DESCRIPTIONS;
                              
                              // Get the position name
                              const positionNames: Record<string, string> = {
                                '1': language === 'en' ? 'Past' : 'Pasado',
                                '2': language === 'en' ? 'Present' : 'Presente',
                                '3': language === 'en' ? 'Future' : 'Futuro'
                              };
                              
                              return (
                                <div className="space-y-4">
                                  <div className="flex items-center">
                                    <div className="bg-grimoire-darkamber text-grimoire-gold font-display text-2xl px-3 py-1 rounded-md mr-3">
                                      {positionId}
                                    </div>
                                    <h3 className="text-grimoire-gold text-xl font-display">
                                      {positionNames[positionId.toString()]}
                                    </h3>
                                  </div>
                                  
                                  <div className="text-grimoire-parchment text-base">  
                                    {threeCardDescriptions[positionId.toString()][language]}
                                  </div>
                                </div>
                              );
                            }
                            
                            // Cross Spread position info
                            if (selectedSpread?.id === 'cross-spread') {
                              const positionId = currentPosition.id;
                              const elementNames: Record<string, string> = {
                                '1': language === 'en' ? 'Spirit' : 'Espíritu',
                                '2': language === 'en' ? 'Air' : 'Aire',
                                '3': language === 'en' ? 'Fire' : 'Fuego',
                                '4': language === 'en' ? 'Water' : 'Agua',
                                '5': language === 'en' ? 'Earth' : 'Tierra'
                              };
                              
                              const elementSymbols: Record<string, string> = {
                                '1': SpiritSymbol,
                                '2': AirSymbol,
                                '3': FireSymbol,
                                '4': WaterSymbol,
                                '5': EarthSymbol
                              };
                              
                              const elementDescriptions: Record<string, {en: string; es: string}> = {
                                '1': {
                                  en: 'The Spirit position represents the core essence of the situation, the conscious awareness, and the integration of all four elements. It reflects your spiritual path and higher purpose in relation to the question.',
                                  es: 'La posición del Espíritu representa la esencia central de la situación, la conciencia consciente y la integración de los cuatro elementos. Refleja tu camino espiritual y propósito superior en relación con la pregunta.'
                                },
                                '2': {
                                  en: 'The Air position represents the mental and intellectual aspects of the situation. It reveals thoughts, ideas, communication patterns, and the rational approach to the question.',
                                  es: 'La posición del Aire representa los aspectos mentales e intelectuales de la situación. Revela pensamientos, ideas, patrones de comunicación y el enfoque racional de la pregunta.'
                                },
                                '3': {
                                  en: 'The Fire position represents energy, passion, inspiration, and action. It shows the creative and transformative forces at work and how your willpower affects the question.',
                                  es: 'La posición del Fuego representa energía, pasión, inspiración y acción. Muestra las fuerzas creativas y transformadoras en funcionamiento y cómo tu fuerza de voluntad afecta la pregunta.'
                                },
                                '4': {
                                  en: 'The Water position represents emotions, intuition, relationships, and subconscious influences. It reveals the emotional undercurrents, dreams, and feelings related to the question.',
                                  es: 'La posición del Agua representa emociones, intuición, relaciones e influencias subconscientes. Revela las corrientes emocionales, los sueños y los sentimientos relacionados con la pregunta.'
                                },
                                '5': {
                                  en: 'The Earth position represents the physical and material aspects of the situation. It relates to health, finances, work, and the practical manifestation of the question in everyday life.',
                                  es: 'La posición de la Tierra representa los aspectos físicos y materiales de la situación. Se relaciona con la salud, las finanzas, el trabajo y la manifestación práctica de la pregunta en la vida cotidiana.'
                                }
                              };
                              
                              return (
                                <div className="flex flex-col gap-4 pt-2">
                                  <div className="flex items-center gap-3">
                                    <div className={`${getElementColor(currentPosition.element)} p-2 rounded-md`}>
                                      <img 
                                        src={elementSymbols[positionId.toString()]} 
                                        alt={elementNames[positionId.toString()]} 
                                        className="w-12 h-12 object-contain"
                                      />
                                    </div>
                                    <h3 className="text-grimoire-gold text-xl font-accent">
                                      {elementNames[positionId.toString()]}
                                    </h3>
                                  </div>
                                  
                                  <div className="mt-2">
                                    <h4 className="text-grimoire-amber font-accent mb-2">
                                      {currentPosition.name[language]}
                                    </h4>
                                    <div className="text-grimoire-parchment">
                                      {CROSS_SPREAD_DESCRIPTIONS[positionId.toString()][language]}
                                    </div>
                                  </div>
                                  
                                  <div className="mt-4 border-t border-grimoire-gold/30 pt-4">
                                    <h5 className="text-grimoire-amber font-accent mb-2">
                                      {language === 'en' ? 'Position Meaning:' : 'Significado de la Posición:'}
                                    </h5>
                                    <div className="text-grimoire-parchment">
                                      {currentPosition.description[language]}
                                    </div>
                                  </div>
                                </div>
                              );
                            } else {
                              // Zodiac spread house info
                              // Find the corresponding house information from the astrology data
                              const houseNumber = currentPosition.id;
                              const houseInfo = astroHouses.find((house) => house.number === houseNumber as any);
                              
                              if (!houseInfo) return null;
                              
                              const romanNumeral = [
                                'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'
                              ][houseNumber - 1];
                              
                              // Get the zodiac sign image
                              const zodiacImg = getZodiacImage(houseNumber.toString());
                              
                              return (
                                <div className="flex flex-col md:flex-row gap-4 pt-4">
                                  <div className="flex-shrink-0 flex flex-col items-center">
                                    {zodiacImg && (
                                      <img 
                                        src={zodiacImg} 
                                        alt={`House ${romanNumeral}`} 
                                        className="w-[120px] h-[120px] object-contain mx-auto mb-2" 
                                      />
                                    )}
                                    <div className="text-center">
                                      <div className="text-2xl font-accent text-grimoire-gold">{romanNumeral}</div>
                                      <div className="text-grimoire-amber text-sm">
                                        {houseInfo.name[language]}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex-grow space-y-4">
                                    <div className="space-y-2">
                                      <div className="text-grimoire-parchment text-sm mb-4">
                                        {houseInfo.description[language]}
                                      </div>
                                      
                                      <h4 className="text-grimoire-amber font-accent">
                                        {language === 'en' ? 'Keywords' : 'Palabras clave'}
                                      </h4>
                                      <div className="flex flex-wrap gap-2 mt-2">
                                        {houseInfo.keywords[language].map((keyword: string, idx: number) => (
                                          <span 
                                            key={idx}
                                            className="bg-grimoire-gold/20 text-grimoire-gold px-2 py-1 text-xs rounded-md"
                                          >
                                            {keyword}
                                          </span>
                                        ))}
                                      </div>
                                      
                                      <h4 className="text-grimoire-amber font-accent mt-4">
                                        {language === 'en' ? 'Corresponds to Zodiac Sign' : 'Corresponde al Signo Zodiacal'}
                                      </h4>
                                      <div className="text-grimoire-parchment text-sm">
                                        {(() => {
                                          // Map house numbers to corresponding zodiac signs
                                          const zodiacForHouse = [
                                            'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 
                                            'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
                                          ];
                                          const signId = zodiacForHouse[houseNumber - 1];
                                          const sign = zodiacSigns.find((s: any) => s.id === signId);
                                          
                                          return sign ? sign.name[language] : '';
                                        })()}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          }
                          
                          // If not in display-only mode, show card info
                          if (!currentPosition || !positionCard) {
                            return null;
                          }
                          
                          return (
                            <div className="flex flex-col md:flex-row gap-4 pt-4">
                              <div className="flex-shrink-0">
                                <img 
                                  src={positionCard.card.imageSrc} 
                                  alt={positionCard.card.name[language]} 
                                  className="h-[300px] object-contain mx-auto"
                                />
                              </div>
                              
                              <div className="flex-grow space-y-4">
                                <div className="space-y-2">
                                  <div className="flex justify-between text-grimoire-gold/70">
                                    <span>{t('tarot', 'spreads', 'position')}:</span>
                                    <span>{currentPosition.name[language]}</span>
                                  </div>
                                  
                                  <div className="text-grimoire-parchment/80 text-sm italic">
                                    {currentPosition.description[language]}
                                  </div>
                                  
                                  <div className="flex justify-between text-grimoire-gold/70 mt-2">
                                    <span>{positionCard.card.type === 'major' ? 
                                      (language === 'en' ? 'Major Arcana' : 'Arcanos Mayores') : 
                                      (language === 'en' ? 'Minor Arcana' : 'Arcanos Menores')
                                    }</span>
                                    {positionCard.card.type === 'minor' && positionCard.card.suit && (
                                      <span>
                                        {positionCard.card.suit === 'wands' && (language === 'en' ? 'Wands' : 'Bastos')}
                                        {positionCard.card.suit === 'cups' && (language === 'en' ? 'Cups' : 'Copas')}
                                        {positionCard.card.suit === 'swords' && (language === 'en' ? 'Swords' : 'Espadas')}
                                        {positionCard.card.suit === 'pentacles' && (language === 'en' ? 'Pentacles' : 'Oros')}
                                      </span>
                                    )}
                                  </div>
                                  
                                  {positionCard.card.element && (
                                    <div className="flex justify-between text-grimoire-parchment/80">
                                      <span>{t('tarot', 'element')}:</span>
                                      <span>{positionCard.card.element}</span>
                                    </div>
                                  )}
                                  
                                  {positionCard.card.planet && (
                                    <div className="flex justify-between text-grimoire-parchment/80">
                                      <span>{t('tarot', 'planet')}:</span>
                                      <span>{positionCard.card.planet}</span>
                                    </div>
                                  )}
                                  
                                  {positionCard.card.zodiac && (
                                    <div className="flex justify-between text-grimoire-parchment/80">
                                      <span>{t('tarot', 'zodiac')}:</span>
                                      <span>{positionCard.card.zodiac}</span>
                                    </div>
                                  )}
                                  
                                  <div 
                                    className={`${getElementColor(currentPosition.element)} text-grimoire-dark px-2 py-1 rounded-md text-sm flex items-center gap-1`}
                                  >
                                    <span>{t('tarot', 'spreads', 'elementMeaning')}:</span>
                                    <span>({getElementName(currentPosition.element)})</span>
                                  </div>
                                </div>
                                
                                <div className="mt-4">
                                  <h4 className="text-grimoire-amber font-accent">
                                    {t('tarot', 'keywords')}
                                  </h4>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {getCardKeywords(positionCard).map((keyword, idx) => (
                                      <span 
                                        key={idx}
                                        className="bg-grimoire-gold/20 text-grimoire-gold px-2 py-1 text-xs rounded-md"
                                      >
                                        {keyword}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                
                                <div className="mt-4">
                                  <h4 className="text-grimoire-amber font-accent">
                                    {t('tarot', 'spreads', 'interpretation')}
                                  </h4>
                                  <div className="text-grimoire-parchment/90 text-sm mt-2">
                                    {positionCard.card.description[language]}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </DialogHeader>
                    <DialogClose className="absolute right-4 top-4 text-grimoire-parchment hover:text-grimoire-gold">
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close</span>
                    </DialogClose>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Add the HouseInfoModal component for zodiac spread */}
      {selectedSpread?.id === 'zodiac-spread' && selectedPosition && (
        <HouseInfoModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          houseNumber={selectedPosition}
          houseInfo={astroHouses.find(h => h.number === selectedPosition as any) || null}
          language={language}
          onPrev={() => {
            if (!selectedSpread || !selectedPosition) return;
            
            // Get previous position ID (loop back to 12 if at 1)
            let prevPosition = selectedPosition - 1;
            if (prevPosition < 1) {
              prevPosition = 12; // 12 zodiac signs/houses
            }
            
            setSelectedPosition(prevPosition);
          }}
          onNext={() => {
            if (!selectedSpread || !selectedPosition) return;
            
            // Get next position ID (loop back to 1 if at 12)
            let nextPosition = selectedPosition + 1;
            if (nextPosition > 12) {
              nextPosition = 1;
            }
            
            setSelectedPosition(nextPosition);
          }}
        />
      )}
    </div>
  );
};

export default TarotSpreads;
