import React from 'react';
import { DecanInfo } from '@/data/decans';
import { useLanguage } from '@/context/LanguageContext';

interface DecanDisplayProps {
  decans: DecanInfo[];
}

const DecanDisplay: React.FC<DecanDisplayProps> = ({ decans }) => {
  const { language, t } = useLanguage();

  return (
    <div className="mt-4 space-y-3">
      <h4 className="font-accent text-grimoire-gold text-lg border-b border-grimoire-gold/50 pb-1">
        {t('astrology', 'decans', 'title')}
      </h4>
      
      <div className="space-y-3">
        {decans.map((decan, index) => (
          <div key={index} className="bg-grimoire-blue bg-opacity-30 p-3 rounded border border-grimoire-gold/50">
            <div className="flex items-center">
              <span className="text-grimoire-amber text-lg font-serif mr-2">
                {decan.decan}
              </span>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-grimoire-gold">
                    {t('astrology', 'decans', 'planetaryRuler')}: 
                    <span className="text-grimoire-parchment ml-1">
                      {decan.planet[language]}
                    </span>
                  </span>
                  <span className="text-grimoire-amber mt-1 sm:mt-0">
                    {decan.minor_arcana[language]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <p className="text-xs text-grimoire-parchment/80 italic mt-2">
        {t('astrology', 'decans', 'explanation')}
      </p>
    </div>
  );
};

export default DecanDisplay;