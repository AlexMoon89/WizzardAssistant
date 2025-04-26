import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="mt-16 text-center text-grimoire-parchment opacity-80">
      <p className="font-accent">{t('footer', 'text')}</p>
      <p className="text-sm mt-2">{t('footer', 'subtext')}</p>
    </footer>
  );
};

export default Footer;
