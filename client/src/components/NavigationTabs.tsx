
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface NavigationTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeTab, setActiveTab }) => {
  const { t } = useLanguage();
  
  const tabs = [
    { 
      id: 'tarot', 
      imageSrc: 'https://i.pinimg.com/736x/7a/b4/68/7ab468eed38daa32ac0c79d0486284ef.jpg',
      color: 'bg-grimoire-purple' 
    },
    { 
      id: 'astrology', 
      imageSrc: 'https://i.pinimg.com/736x/c4/59/68/c45968d09c3f39a1b925fe1095a15405.jpg',
      color: 'bg-grimoire-blue' 
    },
    { 
      id: 'geomancy', 
      imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Ghoreh_001.JPG/1200px-Ghoreh_001.JPG',
      color: 'bg-grimoire-blue' 
    }
  ];

  return (
    <nav className="mb-8 flex justify-center">
      <div className="flex space-x-2 md:space-x-6 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="seal-button flex flex-col items-center"
          >
            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${tab.color} border-2 border-grimoire-gold flex items-center justify-center text-grimoire-gold glow-effect ${activeTab === tab.id ? 'active' : ''}`}>
              <img 
                src={tab.imageSrc} 
                alt={tab.id}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span className="font-accent text-sm md:text-base mt-2">
              {t('navigation', tab.id)}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default NavigationTabs;
