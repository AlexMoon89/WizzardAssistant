import React from 'react';
import { GeomancyFigure as GeomancyFigureType } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import GeomancyImage from './GeomancyImage';

interface GeomancyFigureProps {
  figure: GeomancyFigureType;
  onClick: () => void;
  isSelected: boolean;
}

const GeomancyFigure: React.FC<GeomancyFigureProps> = ({ figure, onClick, isSelected }) => {
  const { language } = useLanguage();

  return (
    <div 
      className={`glow-effect bg-grimoire-dark bg-opacity-80 rounded-lg border-2 ${isSelected ? 'border-grimoire-gold-bright shadow-glow' : 'border-grimoire-gold/70'} p-4 flex flex-col items-center cursor-pointer transition-all duration-300 hover:border-grimoire-gold hover:shadow-sm`}
      onClick={onClick}
    >
      <div className="w-32 h-32 py-3 flex justify-center items-center bg-grimoire-blue rounded-lg shadow-inner">
        <GeomancyImage 
          figureId={figure.id}
          size="medium"
          altText={figure.name.en}
          pattern={figure.pattern}
        />
      </div>
      <h3 className="font-display text-xl text-grimoire-amber mt-3 text-center">{figure.name[language]}</h3>
      <p className="text-sm text-center text-grimoire-parchment mt-1 opacity-90">{figure.meaning[language]}</p>
    </div>
  );
};

export default GeomancyFigure;
