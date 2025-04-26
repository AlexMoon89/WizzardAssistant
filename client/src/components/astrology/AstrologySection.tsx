import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import AstrologyInterpreter from './AstrologyInterpreter';
import AstrologyReference from './AstrologyReference';

const AstrologySection: React.FC = () => {
  const { t } = useLanguage();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <section id="astrology-content" className="tab-content">
      <div className="mb-8">
        <h2 className="font-display text-3xl md:text-4xl text-grimoire-amber border-b border-grimoire-gold pb-2">
          {t('astrology', 'title')}
        </h2>
        <p className="mt-3 text-lg italic text-grimoire-parchment opacity-90">
          {t('astrology', 'subtitle')}
        </p>
      </div>
      
      {/* Astrology Interpreter Tool */}
      <AstrologyInterpreter />
      
      {/* Astrology Reference Accordion */}
      <AstrologyReference openSection={openSection} toggleSection={toggleSection} />
    </section>
  );
};

export default AstrologySection;
