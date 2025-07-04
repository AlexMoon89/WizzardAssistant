import React, { useState, useMemo } from 'react';
import TarotCard from './TarotCard';
import TarotSpreads from './TarotSpreads';
import tarotCards from '@/data/tarot';
import { useLanguage } from '@/context/LanguageContext';
import { shuffleArray } from '@/lib/utils';
import { TarotCard as TarotCardType } from '@/types';

const TarotSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [displayedCards, setDisplayedCards] = useState(tarotCards);
  const [activeFilter, setActiveFilter] = useState<'all' | 'major' | 'minor' | 'wands' | 'cups' | 'swords' | 'pentacles'>('all');
  const [activeView, setActiveView] = useState<'cards' | 'spreads'>('cards');
  
  // Filter cards based on the selected category
  const filterCards = (filterType: typeof activeFilter) => {
    setActiveFilter(filterType);
    
    switch (filterType) {
      case 'all':
        setDisplayedCards(tarotCards);
        break;
      case 'major':
        setDisplayedCards(tarotCards.filter((card: TarotCardType) => card.type === 'major'));
        break;
      case 'minor':
        setDisplayedCards(tarotCards.filter((card: TarotCardType) => card.type === 'minor'));
        break;
      case 'wands':
      case 'cups':
      case 'swords':
      case 'pentacles':
        setDisplayedCards(tarotCards.filter((card: TarotCardType) => card.suit === filterType));
        break;
    }
  };
  
  // Handle random card draw
  const handleDrawCard = () => {
    let cardPool: TarotCardType[] = [...tarotCards];
    
    // Filter the pool based on the active filter if needed
    if (activeFilter !== 'all') {
      if (activeFilter === 'major') {
        cardPool = cardPool.filter((card: TarotCardType) => card.type === 'major');
      } else if (activeFilter === 'minor') {
        cardPool = cardPool.filter((card: TarotCardType) => card.type === 'minor');
      } else {
        cardPool = cardPool.filter((card: TarotCardType) => card.suit === activeFilter);
      }
    }
    
    // Draw 1-3 random cards
    const numCards = Math.floor(Math.random() * 3) + 1;
    const shuffled = shuffleArray(cardPool).slice(0, numCards);
    setDisplayedCards(shuffled);
    
    // Scroll to the top with animation
    setTimeout(() => {
      window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      });
    }, 100);
  };

  // Group cards by category for better display
  const groupedCards = useMemo(() => {
    if (activeFilter !== 'all') return null;
    
    return {
      major: tarotCards.filter((card: TarotCardType) => card.type === 'major'),
      wands: tarotCards.filter((card: TarotCardType) => card.suit === 'wands'),
      cups: tarotCards.filter((card: TarotCardType) => card.suit === 'cups'),
      swords: tarotCards.filter((card: TarotCardType) => card.suit === 'swords'),
      pentacles: tarotCards.filter((card: TarotCardType) => card.suit === 'pentacles'),
    };
  }, [activeFilter]);

  // Used when viewing all cards
  const renderGroupedCards = () => {
    if (!groupedCards) return null;
    
    return (
      <>
        {/* Major Arcana Section */}
        <div className="mb-12">
          <h3 className="font-display text-2xl text-grimoire-gold border-b border-grimoire-gold/30 pb-2 mb-6">
            {language === 'en' ? 'Major Arcana' : 'Arcanos Mayores'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {groupedCards.major.map((card: TarotCardType) => (
              <TarotCard key={card.id} card={card} />
            ))}
          </div>
        </div>
        
        {/* Suit of Wands */}
        {groupedCards.wands.length > 0 && (
          <div className="mb-12">
            <h3 className="font-display text-2xl text-grimoire-amber border-b border-grimoire-gold/30 pb-2 mb-6">
              {language === 'en' ? 'Suit of Wands' : 'Palo de Bastos'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {groupedCards.wands.map((card: TarotCardType) => (
                <TarotCard key={card.id} card={card} />
              ))}
            </div>
          </div>
        )}
        
        {/* Suit of Cups */}
        {groupedCards.cups.length > 0 && (
          <div className="mb-12">
            <h3 className="font-display text-2xl text-grimoire-amber border-b border-grimoire-gold/30 pb-2 mb-6">
              {language === 'en' ? 'Suit of Cups' : 'Palo de Copas'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {groupedCards.cups.map((card: TarotCardType) => (
                <TarotCard key={card.id} card={card} />
              ))}
            </div>
          </div>
        )}
        
        {/* Suit of Swords */}
        {groupedCards.swords.length > 0 && (
          <div className="mb-12">
            <h3 className="font-display text-2xl text-grimoire-amber border-b border-grimoire-gold/30 pb-2 mb-6">
              {language === 'en' ? 'Suit of Swords' : 'Palo de Espadas'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {groupedCards.swords.map((card: TarotCardType) => (
                <TarotCard key={card.id} card={card} />
              ))}
            </div>
          </div>
        )}
        
        {/* Suit of Pentacles */}
        {groupedCards.pentacles.length > 0 && (
          <div className="mb-12">
            <h3 className="font-display text-2xl text-grimoire-amber border-b border-grimoire-gold/30 pb-2 mb-6">
              {language === 'en' ? 'Suit of Pentacles' : 'Palo de Oros'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {groupedCards.pentacles.map((card: TarotCardType) => (
                <TarotCard key={card.id} card={card} />
              ))}
            </div>
          </div>
        )}
      </>
    );
  };

  // Used when viewing filtered cards
  const renderFilteredCards = () => {
    if (activeFilter === 'all') return null;
    
    let title = '';
    switch (activeFilter) {
      case 'major':
        title = language === 'en' ? 'Major Arcana' : 'Arcanos Mayores';
        break;
      case 'minor':
        title = language === 'en' ? 'Minor Arcana' : 'Arcanos Menores';
        break;
      case 'wands':
        title = language === 'en' ? 'Suit of Wands' : 'Palo de Bastos';
        break;
      case 'cups':
        title = language === 'en' ? 'Suit of Cups' : 'Palo de Copas';
        break;
      case 'swords':
        title = language === 'en' ? 'Suit of Swords' : 'Palo de Espadas';
        break;
      case 'pentacles':
        title = language === 'en' ? 'Suit of Pentacles' : 'Palo de Pentáculos';
        break;
    }
    
    return (
      <div className="mb-12">
        <h3 className="font-display text-2xl text-grimoire-gold border-b border-grimoire-gold/30 pb-2 mb-6">
          {title}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {displayedCards.map((card: TarotCardType) => (
            <TarotCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="tarot-content" className="tab-content mystical-fade-in">
      <div className="mb-8">
        <h2 className="font-display text-3xl md:text-4xl text-grimoire-amber border-b border-grimoire-gold pb-2">
          {t('tarot', 'title')}
        </h2>
        <p className="mt-3 text-lg italic text-grimoire-parchment opacity-90">
          {t('tarot', 'subtitle')}
        </p>
      </div>
      
      {/* View Selector Tabs */}
      <div className="mb-8 flex justify-center gap-4">
        <button
          onClick={() => setActiveView('cards')}
          className={`px-6 py-3 rounded-md font-display text-lg tracking-wider transition-colors ${
            activeView === 'cards'
              ? 'bg-grimoire-amber text-grimoire-dark'
              : 'bg-grimoire-dark/60 text-grimoire-amber border border-grimoire-amber/50 hover:bg-grimoire-dark'
          }`}
        >
          {language === 'en' ? 'Card Library' : 'Biblioteca de Cartas'}
        </button>
        <button
          onClick={() => setActiveView('spreads')}
          className={`px-6 py-3 rounded-md font-display text-lg tracking-wider transition-colors ${
            activeView === 'spreads'
              ? 'bg-grimoire-purple text-white'
              : 'bg-grimoire-dark/60 text-grimoire-parchment border border-grimoire-purple/50 hover:bg-grimoire-dark'
          }`}
        >
          {language === 'en' ? 'Tarot Spreads' : 'Tiradas de Tarot'}
        </button>
      </div>
      
      {activeView === 'cards' ? (
        <>
          {/* Filter Tabs */}
          <div className="mb-8 flex flex-wrap gap-2">
            <button 
              onClick={() => filterCards('all')}
              className={`px-4 py-2 rounded-md font-accent tracking-wider transition-colors ${
                activeFilter === 'all'
                  ? 'bg-grimoire-gold text-grimoire-dark'
                  : 'bg-grimoire-dark/60 text-grimoire-gold border border-grimoire-gold/50 hover:bg-grimoire-dark'
              }`}
            >
              {language === 'en' ? 'All Cards' : 'Todas las Cartas'}
            </button>
            <button 
              onClick={() => filterCards('major')}
              className={`px-4 py-2 rounded-md font-accent tracking-wider transition-colors ${
                activeFilter === 'major'
                  ? 'bg-grimoire-gold text-grimoire-dark'
                  : 'bg-grimoire-dark/60 text-grimoire-gold border border-grimoire-gold/50 hover:bg-grimoire-dark'
              }`}
            >
              {language === 'en' ? 'Major Arcana' : 'Arcanos Mayores'}
            </button>
            <button 
              onClick={() => filterCards('minor')}
              className={`px-4 py-2 rounded-md font-accent tracking-wider transition-colors ${
                activeFilter === 'minor'
                  ? 'bg-grimoire-gold text-grimoire-dark'
                  : 'bg-grimoire-dark/60 text-grimoire-gold border border-grimoire-gold/50 hover:bg-grimoire-dark'
              }`}
            >
              {language === 'en' ? 'Minor Arcana' : 'Arcanos Menores'}
            </button>
            <button 
              onClick={() => filterCards('wands')}
              className={`px-4 py-2 rounded-md font-accent tracking-wider transition-colors ${
                activeFilter === 'wands'
                  ? 'bg-grimoire-crimson text-grimoire-dark'
                  : 'bg-grimoire-dark/60 text-grimoire-crimson border border-grimoire-amber/50 hover:bg-grimoire-dark'
              }`}
            >
              {language === 'en' ? 'Wands' : 'Bastos'}
            </button>
            <button 
              onClick={() => filterCards('cups')}
              className={`px-4 py-2 rounded-md font-accent tracking-wider transition-colors ${
                activeFilter === 'cups'
                  ? 'bg-grimoire-teal text-grimoire-dark'
                  : 'bg-grimoire-dark/60 text-grimoire-teal border border-grimoire-teal/50 hover:bg-grimoire-dark'
              }`}
            >
              {language === 'en' ? 'Cups' : 'Copas'}
            </button>
            <button 
              onClick={() => filterCards('swords')}
              className={`px-4 py-2 rounded-md font-accent tracking-wider transition-colors ${
                activeFilter === 'swords'
                  ? 'bg-grimoire-purple text-white'
                  : 'bg-grimoire-dark/60 text-grimoire-parchment border border-grimoire-purple/50 hover:bg-grimoire-dark'
              }`}
            >
              {language === 'en' ? 'Swords' : 'Espadas'}
            </button>
            <button 
              onClick={() => filterCards('pentacles')}
              className={`px-4 py-2 rounded-md font-accent tracking-wider transition-colors ${
                activeFilter === 'pentacles'
                  ? 'bg-grimoire-gold text-white'
                  : 'bg-grimoire-dark/60 text-grimoire-gold border border-grimoire-gold/50 hover:bg-grimoire-dark'
              }`}
            >
              {language === 'en' ? 'Pentacles' : 'Pentáculos'}
            </button>
          </div>
          
          {/* Cards display - either grouped or filtered */}
          {activeFilter === 'all' ? renderGroupedCards() : renderFilteredCards()}
          
          {/* Random Draw Button */}
          <div className="mt-12 text-center">
            <button 
              onClick={handleDrawCard}
              className="px-8 py-3 bg-grimoire-purple border-2 border-grimoire-gold rounded-md font-accent tracking-wider text-grimoire-gold hover:bg-grimoire-blue transition-all duration-300"
            >
              <i className="fas fa-hand-sparkles mr-2"></i> {t('tarot', 'drawButton')}
            </button>
          </div>
        </>
      ) : (
        <TarotSpreads />
      )}
    </section>
  );
};

export default TarotSection;
