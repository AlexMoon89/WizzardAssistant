import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { zodiacSigns, planets, astroHouses, interpretations } from '@/data/astrology';
import { Planet, ZodiacSign, HouseNumber, AstrologyInterpretation } from '@/types';
import { capitalizeFirstLetter } from '@/lib/utils';
import PlanetImage from './PlanetImages';
import ZodiacImage from './ZodiacImage';

const AstrologyInterpreter: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | ''>('');
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | ''>('');
  const [selectedHouse, setSelectedHouse] = useState<HouseNumber | ''>('');
  const [interpretation, setInterpretation] = useState<AstrologyInterpretation | null>(null);
  
  // Reset interpretation when any selection is cleared
  useEffect(() => {
    if (!selectedPlanet || !selectedSign || !selectedHouse) {
      setInterpretation(null);
    }
  }, [selectedPlanet, selectedSign, selectedHouse]);
  
  // Debug: Log the interpretations array on component mount
  useEffect(() => {
    console.log('Total interpretations:', interpretations.length);
    
    // Check if we have at least one interpretation
    if (interpretations.length > 0) {
      console.log('Sample interpretation:', interpretations[0]);
      
      // Count interpretations with various properties
      const interpretationsWithDecan = interpretations.filter(i => i.decan);
      const interpretationsWithDecanRuler = interpretations.filter(i => i.decanRuler);
      const interpretationsWithDignity = interpretations.filter(i => i.dignity);
      const interpretationsWithPositiveAspects = interpretations.filter(i => i.positiveAspects);
      const interpretationsWithNegativeAspects = interpretations.filter(i => i.negativeAspects);
      const interpretationsWithTarot = interpretations.filter(i => i.tarotCorrespondence);
      
      console.log('Interpretations with decan:', interpretationsWithDecan.length);
      console.log('Interpretations with decanRuler:', interpretationsWithDecanRuler.length);
      console.log('Interpretations with dignity:', interpretationsWithDignity.length);
      console.log('Interpretations with positiveAspects:', interpretationsWithPositiveAspects.length);
      console.log('Interpretations with negativeAspects:', interpretationsWithNegativeAspects.length);
      console.log('Interpretations with tarotCorrespondence:', interpretationsWithTarot.length);
      
      // Find a known record with decan information for testing
      if (interpretationsWithDecan.length > 0) {
        const sampleWithDecan = interpretationsWithDecan[0];
        console.log('Sample with decan:', sampleWithDecan);
        
        // Log property keys and values for debugging
        console.log('Property keys:', Object.keys(sampleWithDecan));
        console.log('Property values:');
        for (const key of Object.keys(sampleWithDecan)) {
          console.log(`- ${key}:`, (sampleWithDecan as any)[key]);
        }
        
        // Verify we can access the decan and decanRuler properties
        console.log('Direct access to decan:', sampleWithDecan.decan);
        console.log('Direct access to decanRuler:', sampleWithDecan.decanRuler);
      }
      
      // Find all Sun-Aries-House1 records with decan info
      const sunAriesHouse1WithDecan = interpretationsWithDecan.filter(
        i => i.planet === 'sun' && i.sign === 'aries' && i.house === 1
      );
      
      console.log(`Found ${sunAriesHouse1WithDecan.length} Sun-Aries-House1 records with decan info`);
      
      if (sunAriesHouse1WithDecan.length > 0) {
        // Log all Sun-Aries-House1 with decan info to understand what's happening
        sunAriesHouse1WithDecan.forEach((record, index) => {
          console.log(`Record ${index + 1}:`, record);
        });
        
        // Do not set a default interpretation - we want the section hidden by default
        // setInterpretation(sunAriesHouse1WithDecan[0]);
        console.log('Setting test interpretation with decan info - skipped');
        
        // Let's also log all Sun-Aries-House1 records to see the full picture
        const allSunAriesHouse1 = interpretations.filter(
          i => i.planet === 'sun' && i.sign === 'aries' && i.house === 1
        );
        
        console.log(`Found ${allSunAriesHouse1.length} total Sun-Aries-House1 records`);
        
        // Log the first few records to see what might be causing the issue
        allSunAriesHouse1.slice(0, 3).forEach((record, index) => {
          console.log(`All Sun-Aries-House1 Record ${index + 1}:`, record);
        });
      }
    }
  }, []);

  const handleInterpret = () => {
    if (!selectedPlanet || !selectedSign || !selectedHouse) return;

    // Try to find a matching interpretation
    // First attempt an exact match WITH decan info if possible
    const exactMatchWithDecan = interpretations.find(
      interp => interp.planet === selectedPlanet && 
                interp.sign === selectedSign && 
                interp.house === selectedHouse &&
                interp.decan !== undefined
    );
    
    // If no match with decan, fall back to a regular exact match
    const exactMatch = exactMatchWithDecan || interpretations.find(
      interp => interp.planet === selectedPlanet && 
                interp.sign === selectedSign && 
                interp.house === selectedHouse
    );
    
    // Log how many matches we found that have decan info
    const allPossibleMatches = interpretations.filter(
      interp => interp.planet === selectedPlanet && 
                interp.sign === selectedSign && 
                interp.house === selectedHouse
    );
    
    console.log(`Found ${allPossibleMatches.length} total matches for ${selectedPlanet}-${selectedSign}-${selectedHouse}`);
    
    const matchesWithDecan = allPossibleMatches.filter(m => m.decan !== undefined);
    console.log(`Found ${matchesWithDecan.length} matches with decan info for ${selectedPlanet}-${selectedSign}-${selectedHouse}`);

    // Log debug info about the search
    console.log('Searching for interpretation:', { selectedPlanet, selectedSign, selectedHouse });
    console.log('Found exact match:', exactMatch ? 'Yes' : 'No');
    
    // If we have an exact match, use it
    if (exactMatch) {
      console.log('Using exact match:', exactMatch);
      console.log('Exact match decan info:', {
        decan: exactMatch.decan,
        decanRuler: exactMatch.decanRuler,
        tarotCorrespondence: exactMatch.tarotCorrespondence
      });
      
      // Use the exact match with all dignity, decan, and tarot information
      const matchCopy: AstrologyInterpretation = {
        ...exactMatch,
        // Keep all properties including dignity, decan, and tarot info
        planet: exactMatch.planet,
        sign: exactMatch.sign,
        house: exactMatch.house,
        dignity: exactMatch.dignity,
        decan: exactMatch.decan,
        decanRuler: exactMatch.decanRuler,
        tarotCorrespondence: exactMatch.tarotCorrespondence,
        interpretation: {
          en: exactMatch.interpretation.en,
          es: exactMatch.interpretation.es
        },
        positiveAspects: exactMatch.positiveAspects,
        negativeAspects: exactMatch.negativeAspects
      };
      
      console.log('Copied match decan info:', {
        decan: matchCopy.decan,
        decanRuler: matchCopy.decanRuler,
        tarotCorrespondence: matchCopy.tarotCorrespondence
      });
      
      setInterpretation(matchCopy);
      return;
    }
    
    // If no exact match, try a partial match (just planet and sign)
    const partialMatch = interpretations.find(
      interp => interp.planet === selectedPlanet && 
                interp.sign === selectedSign
    );
    
    console.log('Found partial match (planet+sign):', partialMatch ? 'Yes' : 'No');
    
    if (partialMatch) {
      console.log('Using partial match:', partialMatch);
      
      // Create a modified copy preserving all dignity, decan, and tarot info
      const modifiedMatch: AstrologyInterpretation = {
        ...partialMatch,
        house: selectedHouse as HouseNumber,
        // Preserve all dignity, decan, and tarot information
        dignity: partialMatch.dignity,
        decan: partialMatch.decan,
        decanRuler: partialMatch.decanRuler,
        tarotCorrespondence: partialMatch.tarotCorrespondence,
        // Modify the interpretation to mention the new house
        interpretation: {
          en: partialMatch.interpretation.en + ` This combination manifests uniquely in the ${selectedHouse}th house.`,
          es: partialMatch.interpretation.es + ` Esta combinación se manifiesta de manera única en la casa ${selectedHouse}.`
        }
      };
      
      // Debug log for checking properties
      console.log('Modified match:', {
        decan: modifiedMatch.decan,
        decanRuler: modifiedMatch.decanRuler,
        dignity: modifiedMatch.dignity,
        tarotCorrespondence: modifiedMatch.tarotCorrespondence
      });
      
      setInterpretation(modifiedMatch);
      return;
    }
    
    // Fallback to a generic interpretation as last resort
    const genericInterpretation: AstrologyInterpretation = {
      planet: selectedPlanet as Planet,
      sign: selectedSign as ZodiacSign,
      house: selectedHouse as HouseNumber,
      interpretation: {
        en: `The influence of ${selectedPlanet} in ${selectedSign} in the ${selectedHouse}th house creates a unique cosmic pattern that shapes your life experience in this area.`,
        es: `La influencia de ${selectedPlanet} en ${selectedSign} en la casa ${selectedHouse} crea un patrón cósmico único que da forma a tu experiencia de vida en esta área.`
      }
    };
    
    console.log('Using generic fallback interpretation');
    setInterpretation(genericInterpretation);
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
            <div className="w-12 h-12 rounded-full bg-grimoire-purple flex items-center justify-center border-2 border-grimoire-gold overflow-hidden">
              <PlanetImage 
                planet={interpretation.planet} 
                symbol={findPlanetById(interpretation.planet)?.symbol || ''} 
                size="small" 
                altText={findPlanetById(interpretation.planet)?.name[language] || ''}
              />
            </div>
            <span className="mx-3 text-grimoire-gold text-xl">+</span>
            {/* Sign icon with ZodiacImage */}
            <div className="w-12 h-12 rounded-full bg-grimoire-purple flex items-center justify-center border-2 border-grimoire-gold overflow-hidden">
              <ZodiacImage 
                sign={interpretation.sign} 
                size="small" 
                altText={findSignById(interpretation.sign)?.name[language] || ''}
              />
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
          
          {/* Removing the larger planet image display as requested */}
          
          <div className="mb-3 flex flex-wrap gap-2">
            {interpretation.dignity && (
              <span className="px-3 py-1 bg-grimoire-purple bg-opacity-60 rounded text-grimoire-gold text-sm border border-grimoire-gold font-accent">
                {t('astrology', 'dignities', interpretation.dignity)} ✧
              </span>
            )}
          </div>
          
          <p className="text-grimoire-parchment leading-relaxed mb-4">
            {interpretation.interpretation[language]}
          </p>
          
          {/* Display positive and negative aspects if they exist */}
          {interpretation.positiveAspects && interpretation.positiveAspects[language] && (
            <div className="mb-3">
              <h5 className="text-grimoire-gold font-accent text-lg mb-1">{t('astrology', 'interpreter', 'positiveAspects')}</h5>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(interpretation.positiveAspects[language]) ? 
                  interpretation.positiveAspects[language].map((keyword, index) => (
                    <span key={index} className="px-3 py-1 bg-grimoire-purple bg-opacity-30 rounded-full text-grimoire-parchment text-sm border border-grimoire-amber">
                      {capitalizeFirstLetter(keyword)}
                    </span>
                  )) : 
                  <span className="px-3 py-1 bg-grimoire-purple bg-opacity-30 rounded-full text-grimoire-parchment text-sm border border-grimoire-amber">
                    {capitalizeFirstLetter(interpretation.positiveAspects[language])}
                  </span>
                }
              </div>
            </div>
          )}
          
          {interpretation.negativeAspects && interpretation.negativeAspects[language] && (
            <div className="mb-3">
              <h5 className="text-grimoire-gold font-accent text-lg mb-1">{t('astrology', 'interpreter', 'negativeAspects')}</h5>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(interpretation.negativeAspects[language]) ? 
                  interpretation.negativeAspects[language].map((keyword, index) => (
                    <span key={index} className="px-3 py-1 bg-grimoire-dark bg-opacity-30 rounded-full text-grimoire-parchment text-sm border border-grimoire-red">
                      {capitalizeFirstLetter(keyword)}
                    </span>
                  )) :
                  <span className="px-3 py-1 bg-grimoire-dark bg-opacity-30 rounded-full text-grimoire-parchment text-sm border border-grimoire-red">
                    {capitalizeFirstLetter(interpretation.negativeAspects[language])}
                  </span>
                }
              </div>
            </div>
          )}
          
          {interpretation.sign && (
            <div className="mt-4 flex flex-wrap justify-between items-center text-sm">
              <span className="text-grimoire-gold italic mr-3">
                {t('astrology', 'elements', findSignById(interpretation.sign)?.element || 'fire')}
              </span>
              <span className="text-grimoire-gold italic mr-3">
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
