import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { zodiacSigns, planets, astroHouses } from '@/data/astrology';
import AstrologyModal from './AstrologyModal';
import ZodiacImage from './ZodiacImage';
import { ZodiacSign } from '@/types';

interface AstrologyReferenceProps {
  openSection: string | null;
  toggleSection: (section: string) => void;
}

const AstrologyReference: React.FC<AstrologyReferenceProps> = ({ 
  openSection, 
  toggleSection 
}) => {
  const { language, t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'zodiac' | 'planet' | 'house'>('zodiac');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleItemClick = (type: 'zodiac' | 'planet' | 'house', item: any) => {
    setModalType(type);
    setSelectedItem(item);
    setModalOpen(true);
  };

  const sections = [
    { id: 'zodiac', title: t('astrology', 'reference', 'zodiac') },
    { id: 'planets', title: t('astrology', 'reference', 'planets') },
    { id: 'houses', title: t('astrology', 'reference', 'houses') },
    { id: 'aspects', title: t('astrology', 'reference', 'aspects') }
  ];

  return (
    <div className="bg-grimoire-dark bg-opacity-70 border-2 border-grimoire-gold rounded-lg overflow-hidden">
      <div className="divide-y divide-grimoire-gold">
        {sections.map((section) => (
          <div key={section.id} className="p-4">
            <button 
              className="w-full flex justify-between items-center text-left focus:outline-none"
              onClick={() => toggleSection(section.id)}
            >
              <h3 className="font-display text-xl text-grimoire-amber">{section.title}</h3>
              <i className={`fas fa-chevron-${openSection === section.id ? 'up' : 'down'} text-grimoire-gold`}></i>
            </button>
            
            <div className={`mt-4 ${openSection === section.id ? '' : 'hidden'}`}>
              {section.id === 'zodiac' && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {zodiacSigns.map(sign => (
                    <div 
                      key={sign.id} 
                      className="bg-grimoire-blue bg-opacity-50 p-3 rounded border border-grimoire-gold cursor-pointer hover:bg-opacity-70 transition-all"
                      onClick={() => handleItemClick('zodiac', sign)}
                    >
                      <h4 className="font-accent text-grimoire-amber flex items-center gap-2">
                        <span className="w-6 h-6 inline-flex items-center justify-center">
                          <ZodiacImage sign={sign.id as ZodiacSign} size="small" altText={sign.name[language]} />
                        </span>
                        {sign.name[language]}
                      </h4>
                      <p className="text-sm mt-1">
                        {t('astrology', 'elements', sign.element)}, {t('astrology', 'modalities', sign.modality)}
                      </p>
                      <p className="text-sm">{sign.dates}</p>
                    </div>
                  ))}
                </div>
              )}
              
              {section.id === 'planets' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {planets.map(planet => (
                    <div 
                      key={planet.id} 
                      className="bg-grimoire-blue bg-opacity-50 p-3 rounded border border-grimoire-gold cursor-pointer hover:bg-opacity-70 transition-all"
                      onClick={() => handleItemClick('planet', planet)}
                    >
                      <h4 className="font-accent text-grimoire-amber">
                        {planet.symbol} {planet.name[language]}
                      </h4>
                      <p className="text-sm mt-1">
                        {planet.keywords[language].slice(0, 3).join(", ")}...
                      </p>
                    </div>
                  ))}
                </div>
              )}
              
              {section.id === 'houses' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {astroHouses.map(house => (
                    <div 
                      key={house.number} 
                      className="bg-grimoire-blue bg-opacity-50 p-3 rounded border border-grimoire-gold cursor-pointer hover:bg-opacity-70 transition-all"
                      onClick={() => handleItemClick('house', house)}
                    >
                      <h4 className="font-accent text-grimoire-amber">
                        {house.name[language]}
                      </h4>
                      <p className="text-sm mt-1">
                        {house.keywords[language].slice(0, 3).join(", ")}...
                      </p>
                    </div>
                  ))}
                </div>
              )}
              
              {section.id === 'aspects' && (
                <div className="bg-grimoire-blue bg-opacity-50 p-4 rounded border border-grimoire-gold">
                  <p className="text-grimoire-parchment">
                    {language === 'en' 
                      ? "Aspects are the angles formed between planets that affect how their energies blend and interact. Major aspects include Conjunction (0°), Sextile (60°), Square (90°), Trine (120°), and Opposition (180°)."
                      : "Los aspectos son los ángulos formados entre planetas que afectan cómo sus energías se mezclan e interactúan. Los aspectos principales incluyen Conjunción (0°), Sextil (60°), Cuadratura (90°), Trígono (120°) y Oposición (180°)."}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <AstrologyModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          type={modalType}
          data={selectedItem}
        />
      )}
    </div>
  );
};

export default AstrologyReference;
