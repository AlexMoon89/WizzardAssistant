import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/types';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (selectedLanguage: Language) => {
    setLanguage(selectedLanguage);
  };

  return (
    <div className="relative flex items-center justify-center border-2 border-grimoire-gold rounded-full p-1 bg-grimoire-dark bg-opacity-50">
      <button 
        className={`px-4 py-2 rounded-full ${language === 'en' 
          ? 'bg-grimoire-gold bg-opacity-100 text-grimoire-dark' 
          : 'text-grimoire-gold'} font-accent tracking-wider text-sm`}
        onClick={() => handleLanguageChange('en')}
      >
        English
      </button>
      <button 
        className={`px-4 py-2 rounded-full ${language === 'es' 
          ? 'bg-grimoire-gold bg-opacity-100 text-grimoire-dark' 
          : 'text-grimoire-gold'} font-accent tracking-wider text-sm`}
        onClick={() => handleLanguageChange('es')}
      >
        Español
      </button>
      <div className="absolute top-0 right-0 -mt-2 -mr-2">
        <div className="w-5 h-5 rounded-full bg-grimoire-crimson animate-pulse"></div>
      </div>
    </div>
  );
};

export default LanguageToggle;
