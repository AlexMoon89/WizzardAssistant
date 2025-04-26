import React from 'react';
import { GeomancyFigure as GeomancyFigureType } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

interface GeomancyFigureProps {
  figure: GeomancyFigureType;
  onClick: () => void;
  isSelected: boolean;
}

const GeomancyFigure: React.FC<GeomancyFigureProps> = ({ figure, onClick, isSelected }) => {
  const { language } = useLanguage();

  return (
    <div 
      className={`glow-effect bg-grimoire-dark bg-opacity-80 rounded-lg border-2 border-grimoire-gold p-4 flex flex-col items-center cursor-pointer ${isSelected ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="py-3">
        {figure.pattern.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center space-x-2 mb-2">
            {row.map((dot, dotIndex) => (
              <div 
                key={`${rowIndex}-${dotIndex}`}
                className={`w-3 h-3 rounded-full ${dot ? 'bg-grimoire-paper' : 'bg-grimoire-paper mr-8'}`}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <h3 className="font-display text-xl text-grimoire-amber mt-2">{figure.name[language]}</h3>
      <p className="text-sm text-center text-grimoire-parchment mt-1">{figure.meaning[language]}</p>
    </div>
  );
};

export default GeomancyFigure;
