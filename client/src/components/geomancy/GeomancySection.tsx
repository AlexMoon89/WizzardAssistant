import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import GeomancyFigure from './GeomancyFigure';
import GeomancyDetail from './GeomancyDetail';
import { geomancyFigures, geomancyInfo, elementalReading, figureGenerationMethods } from '@/data/geomancy';
import { GeomancyFigure as GeomancyFigureType } from '@/types';

const GeomancySection: React.FC = () => {
  const { t } = useLanguage();
  const [selectedFigure, setSelectedFigure] = useState<GeomancyFigureType | null>(null);

  const handleSelectFigure = (figure: GeomancyFigureType) => {
    setSelectedFigure(figure);
  };

  const { language } = useLanguage();

  return (
    <section id="geomancy-content" className="tab-content">
      <div className="mb-8">
        <h2 className="font-display text-3xl md:text-4xl text-grimoire-amber border-b border-grimoire-gold pb-2">
          {t('geomancy', 'title')}
        </h2>
        <p className="mt-3 text-lg italic text-grimoire-parchment opacity-90">
          {t('geomancy', 'subtitle')}
        </p>
      </div>

      {/* Introduction to Geomancy */}
      <div className="mb-10 bg-grimoire-dark/60 p-6 rounded-lg border border-grimoire-gold/30">
        <h3 className="text-xl md:text-2xl text-grimoire-amber font-display mb-4">
          {language === 'en' ? 'Introduction to Geomancy' : 'Introducción a la Geomancia'}
        </h3>
        <div className="prose prose-invert max-w-none">
          <p className="whitespace-pre-line">{geomancyInfo[language]}</p>
        </div>
      </div>
      
      {/* Elemental Reading */}
      <div className="mb-10 bg-grimoire-dark/60 p-6 rounded-lg border border-grimoire-gold/30">
        <h3 className="text-xl md:text-2xl text-grimoire-amber font-display mb-4">
          {language === 'en' ? 'Elemental Reading' : 'Lectura Elemental'}
        </h3>
        <div className="prose prose-invert max-w-none">
          <p className="whitespace-pre-line">{elementalReading[language]}</p>
        </div>
      </div>

      {/* Figure Generation Methods */}
      <div className="mb-10 bg-grimoire-dark/60 p-6 rounded-lg border border-grimoire-gold/30">
        <h3 className="text-xl md:text-2xl text-grimoire-amber font-display mb-4">
          {language === 'en' ? 'Methods for Generating Figures' : 'Métodos para el Levantamiento de Figuras'}
        </h3>
        <div className="prose prose-invert max-w-none">
          <p className="whitespace-pre-line">{figureGenerationMethods[language]}</p>
        </div>
      </div>
      
      {/* Geomancy Figures */}
      <div className="mb-8">
        <h3 className="text-xl md:text-2xl text-grimoire-amber font-display mb-4">
          {language === 'en' ? 'The 16 Geomantic Figures' : 'Las 16 Figuras Geománticas'}
        </h3>
      </div>
      
      {/* Geomancy Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {geomancyFigures.map(figure => (
          <GeomancyFigure 
            key={figure.id}
            figure={figure}
            onClick={() => handleSelectFigure(figure)}
            isSelected={selectedFigure?.id === figure.id}
          />
        ))}
      </div>
      
      {/* Geomancy Details Panel */}
      {selectedFigure && (
        <GeomancyDetail figure={selectedFigure} />
      )}
    </section>
  );
};

export default GeomancySection;
