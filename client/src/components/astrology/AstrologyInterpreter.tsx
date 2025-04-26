import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { zodiacSigns, planets, astroHouses, interpretations } from '@/data/astrology';
import { Planet, ZodiacSign, HouseNumber, AstrologyInterpretation } from '@/types';

const AstrologyInterpreter: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | ''>('');
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | ''>('');
  const [selectedHouse, setSelectedHouse] = useState<HouseNumber | ''>('');
  const [interpretation, setInterpretation] = useState<AstrologyInterpretation | null>(null);

  const handleInterpret = () => {
    if (!selectedPlanet || !selectedSign || !selectedHouse) return;

    // Try to find a matching interpretation
    const match = interpretations.find(
      interp => interp.planet === selectedPlanet && 
                interp.sign === selectedSign && 
                interp.house === selectedHouse
    );

    if (match) {
      setInterpretation(match);
    } else {
      // Fallback to a generic interpretation
      const genericInterpretation: AstrologyInterpretation = {
        planet: selectedPlanet as Planet,
        sign: selectedSign as ZodiacSign,
        house: selectedHouse as HouseNumber,
        interpretation: {
          en: `The influence of ${selectedPlanet} in ${selectedSign} in the ${selectedHouse}th house creates a unique cosmic pattern that shapes your life experience in this area.`,
          es: `La influencia de ${selectedPlanet} en ${selectedSign} en la casa ${selectedHouse} crea un patrón cósmico único que da forma a tu experiencia de vida en esta área.`
        }
      };
      setInterpretation(genericInterpretation);
    }
  };

  const findPlanetById = (id: Planet) => {
    return planets.find(p => p.id === id);
  };

  const findSignById = (id: ZodiacSign) => {
    return zodiacSigns.find(s => s.id === id);
  };

  const findHouseByNumber = (num: HouseNumber) => {
    return astroHouses.find(h => h.number === num);
  };

  return (
    <div className="bg-grimoire-dark bg-opacity-80 rounded-lg border-2 border-grimoire-gold p-6 mb-10">
      <h3 className="font-display text-2xl text-grimoire-amber mb-4">{t('astrology', 'interpreter', 'title')}</h3>
      <p className="mb-6 text-grimoire-parchment">{t('astrology', 'interpreter', 'description')}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Planet Selection */}
        <div>
          <label className="block text-grimoire-gold font-accent mb-2">{t('astrology', 'interpreter', 'planet')}</label>
          <select 
            className="w-full bg-grimoire-blue bg-opacity-90 border border-grimoire-gold text-grimoire-parchment rounded p-3 font-serif"
            value={selectedPlanet}
            onChange={(e) => setSelectedPlanet(e.target.value as Planet)}
          >
            <option value="">{t('astrology', 'interpreter', 'planet')}</option>
            {planets.map(planet => (
              <option key={planet.id} value={planet.id}>
                {planet.name[language]}
              </option>
            ))}
          </select>
        </div>
        
        {/* Sign Selection */}
        <div>
          <label className="block text-grimoire-gold font-accent mb-2">{t('astrology', 'interpreter', 'sign')}</label>
          <select 
            className="w-full bg-grimoire-blue bg-opacity-90 border border-grimoire-gold text-grimoire-parchment rounded p-3 font-serif"
            value={selectedSign}
            onChange={(e) => setSelectedSign(e.target.value as ZodiacSign)}
          >
            <option value="">{t('astrology', 'interpreter', 'sign')}</option>
            {zodiacSigns.map(sign => (
              <option key={sign.id} value={sign.id}>
                {sign.name[language]}
              </option>
            ))}
          </select>
        </div>
        
        {/* House Selection */}
        <div>
          <label className="block text-grimoire-gold font-accent mb-2">{t('astrology', 'interpreter', 'house')}</label>
          <select 
            className="w-full bg-grimoire-blue bg-opacity-90 border border-grimoire-gold text-grimoire-parchment rounded p-3 font-serif"
            value={selectedHouse}
            onChange={(e) => setSelectedHouse(Number(e.target.value) as HouseNumber)}
          >
            <option value="">{t('astrology', 'interpreter', 'house')}</option>
            {astroHouses.map(house => (
              <option key={house.number} value={house.number}>
                {house.name[language]}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <button 
          className="px-6 py-3 bg-grimoire-purple border-2 border-grimoire-gold rounded-md font-accent tracking-wider text-grimoire-gold hover:bg-grimoire-blue transition-all duration-300"
          onClick={handleInterpret}
          disabled={!selectedPlanet || !selectedSign || !selectedHouse}
        >
          <i className="fas fa-sparkles mr-2"></i> {t('astrology', 'interpreter', 'interpretButton')}
        </button>
      </div>
      
      {/* Interpretation Display */}
      {interpretation && (
        <div className="mt-8 p-6 bg-grimoire-blue bg-opacity-50 rounded-lg border border-grimoire-amber">
          <div className="flex items-center mb-4">
            {/* Planet icon */}
            <div className="w-12 h-12 rounded-full bg-grimoire-purple flex items-center justify-center border-2 border-grimoire-gold">
              <span className="text-grimoire-amber text-2xl font-serif">
                {findPlanetById(interpretation.planet)?.symbol}
              </span>
            </div>
            <span className="mx-3 text-grimoire-gold text-xl">+</span>
            {/* Sign icon */}
            <div className="w-12 h-12 rounded-full bg-grimoire-purple flex items-center justify-center border-2 border-grimoire-gold">
              <span className="text-grimoire-amber text-2xl font-serif">
                {findSignById(interpretation.sign)?.symbol}
              </span>
            </div>
            <span className="mx-3 text-grimoire-gold text-xl">+</span>
            {/* House number */}
            <div className="w-12 h-12 rounded-full bg-grimoire-purple flex items-center justify-center border-2 border-grimoire-gold">
              <span className="text-grimoire-amber font-accent text-xl">{interpretation.house}</span>
            </div>
          </div>
          
          <h4 className="font-display text-xl text-grimoire-amber mb-2">
            {findPlanetById(interpretation.planet)?.name[language]} in {findSignById(interpretation.sign)?.name[language]} in {findHouseByNumber(interpretation.house)?.name[language]}
          </h4>
          
          <p className="text-grimoire-parchment leading-relaxed">
            {interpretation.interpretation[language]}
          </p>
          
          {interpretation.sign && (
            <div className="mt-4 flex justify-between items-center text-sm">
              <span className="text-grimoire-gold italic">
                {t('astrology', 'elements', findSignById(interpretation.sign)?.element || 'fire')}
              </span>
              <span className="text-grimoire-gold italic">
                {t('astrology', 'modalities', findSignById(interpretation.sign)?.modality || 'cardinal')}
              </span>
              <span className="text-grimoire-gold italic">
                {findSignById(interpretation.sign)?.rulingPlanet && 
                  `${t('astrology', 'interpreter', 'planet')}: ${findPlanetById(findSignById(interpretation.sign)?.rulingPlanet as Planet)?.name[language]}`
                }
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AstrologyInterpreter;
