import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import LanguageToggle from './LanguageToggle';

const Header: React.FC = () => {
  const { t } = useLanguage();

  return (
    <header className="mb-8 text-center">
      <h1 className="font-display text-4xl md:text-6xl text-grimoire-gold mb-2 tracking-wider">
        {t('header', 'title')}
      </h1>
      <p className="font-accent text-xl md:text-2xl text-grimoire-amber italic tracking-wide opacity-90">
        {t('header', 'subtitle')}
      </p>
      
      {/* Language Toggle */}
      <div className="mt-6 inline-block">
        <LanguageToggle />
      </div>
    </header>
  );
};

export default Header;
