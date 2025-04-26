import React from 'react';
import { GeomancyFigure } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

interface GeomancyDetailProps {
  figure: GeomancyFigure;
}

const GeomancyDetail: React.FC<GeomancyDetailProps> = ({ figure }) => {
  const { language, t } = useLanguage();

  return (
    <div className="mt-10 bg-grimoire-dark bg-opacity-80 rounded-lg border-2 border-grimoire-gold p-6">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto bg-grimoire-blue rounded-full border-4 border-grimoire-gold flex items-center justify-center">
              <div className="py-3">
                {figure.pattern.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex justify-center space-x-3 mb-3">
                    {row.map((dot, dotIndex) => (
                      <div 
                        key={`${rowIndex}-${dotIndex}`}
                        className={`w-4 h-4 rounded-full ${dot ? 'bg-grimoire-paper' : 'bg-grimoire-paper mr-10'}`}
                      ></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <h3 className="font-display text-2xl text-grimoire-amber mt-4">{figure.name[language]}</h3>
            <p className="font-accent text-grimoire-gold">{figure.meaning[language]}</p>
          </div>
        </div>
        
        <div className="md:w-2/3 md:pl-6 border-t md:border-t-0 md:border-l border-grimoire-gold md:pl-10 pt-6 md:pt-0">
          <div className="space-y-4">
            <div>
              <h4 className="font-accent text-grimoire-gold text-lg">{t('geomancy', 'element')}</h4>
              <p className="text-grimoire-parchment">
                {figure.element === 'fire' && `${t('astrology', 'elements', 'fire')} - ${language === 'en' ? 'Passionate, transformative, energetic' : 'Apasionado, transformador, energético'}`}
                {figure.element === 'air' && `${t('astrology', 'elements', 'air')} - ${language === 'en' ? 'Intellectual, communicative, connecting' : 'Intelectual, comunicativo, conectivo'}`}
                {figure.element === 'water' && `${t('astrology', 'elements', 'water')} - ${language === 'en' ? 'Emotional, intuitive, flowing' : 'Emocional, intuitivo, fluido'}`}
                {figure.element === 'earth' && `${t('astrology', 'elements', 'earth')} - ${language === 'en' ? 'Practical, stable, material' : 'Práctico, estable, material'}`}
              </p>
            </div>
            
            <div>
              <h4 className="font-accent text-grimoire-gold text-lg">{t('geomancy', 'planetaryRuler')}</h4>
              <p className="text-grimoire-parchment">
                {figure.planet === 'mercury' && `${language === 'en' ? 'Mercury' : 'Mercurio'} - ${language === 'en' ? 'The messenger, commerce, exchange of ideas' : 'El mensajero, comercio, intercambio de ideas'}`}
                {figure.planet === 'moon' && `${language === 'en' ? 'Moon' : 'Luna'} - ${language === 'en' ? 'Emotions, intuition, the subconscious' : 'Emociones, intuición, el subconsciente'}`}
                {figure.planet === 'sun' && `${language === 'en' ? 'Sun' : 'Sol'} - ${language === 'en' ? 'Vitality, ego, life force' : 'Vitalidad, ego, fuerza vital'}`}
                {figure.planet === 'venus' && `${language === 'en' ? 'Venus' : 'Venus'} - ${language === 'en' ? 'Love, beauty, harmony' : 'Amor, belleza, armonía'}`}
                {figure.planet === 'mars' && `${language === 'en' ? 'Mars' : 'Marte'} - ${language === 'en' ? 'Action, desire, conflict' : 'Acción, deseo, conflicto'}`}
              </p>
            </div>
            
            <div>
              <h4 className="font-accent text-grimoire-gold text-lg">{t('geomancy', 'astrologicalHouse')}</h4>
              <p className="text-grimoire-parchment">
                {language === 'en' ? `${figure.house}${figure.house === 1 ? 'st' : figure.house === 2 ? 'nd' : figure.house === 3 ? 'rd' : 'th'} House` : `Casa ${figure.house}`} - 
                {figure.house === 1 && (language === 'en' ? ' Self, identity, beginnings' : ' Yo, identidad, comienzos')}
                {figure.house === 2 && (language === 'en' ? ' Possessions, values, resources' : ' Posesiones, valores, recursos')}
                {figure.house === 3 && (language === 'en' ? ' Communication, siblings, short journeys' : ' Comunicación, hermanos, viajes cortos')}
                {figure.house === 9 && (language === 'en' ? ' Philosophy, higher learning, long journeys' : ' Filosofía, educación superior, viajes largos')}
              </p>
            </div>
            
            <div>
              <h4 className="font-accent text-grimoire-gold text-lg">{t('geomancy', 'divinatoryMeaning')}</h4>
              <p className="text-grimoire-parchment">{figure.description[language]}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeomancyDetail;
