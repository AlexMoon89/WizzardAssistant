import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import NavigationTabs from '@/components/NavigationTabs';
import Footer from '@/components/Footer';
import TarotSection from '@/components/tarot/TarotSection';
import AstrologySection from '@/components/astrology/AstrologySection';
import GeomancySection from '@/components/geomancy/GeomancySection';
import PlanetaryHours from '@/components/planetary/PlanetaryHours';
import TreeOfLifeSection from '@/components/treeoflife/TreeOfLifeSection';
import { isOffline } from '@/lib/utils';

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tarot');
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    // Check offline status initially and on network status changes
    const checkNetworkStatus = () => {
      setOffline(isOffline());
    };

    window.addEventListener('online', checkNetworkStatus);
    window.addEventListener('offline', checkNetworkStatus);
    
    checkNetworkStatus();
    
    return () => {
      window.removeEventListener('online', checkNetworkStatus);
      window.removeEventListener('offline', checkNetworkStatus);
    };
  }, []);

  return (
    <div className="bg-parchment bg-cover bg-center min-h-screen relative overflow-hidden">
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-grimoire-dark bg-opacity-80"></div>

      {/* Offline indicator */}
      {offline && (
        <div className="fixed top-0 left-0 right-0 bg-grimoire-crimson text-white py-1 px-4 text-center z-50 font-accent">
          You're currently offline. The grimoire's power persists beyond the ethereal network.
        </div>
      )}
      
      {/* Main content container */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        <Header />
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main>
          {/* Tarot Tab Content */}
          {activeTab === 'tarot' && <TarotSection />}

          {/* Astrology Tab Content */}
          {activeTab === 'astrology' && <AstrologySection />}

          {/* Geomancy Tab Content */}
          {activeTab === 'geomancy' && <GeomancySection />}

          {/* Planetary Hours Tab Content */}
          {activeTab === 'planetaryHours' && <PlanetaryHours />}

          {/* Tree of Life Tab Content */}
          {activeTab === 'treeOfLife' && <TreeOfLifeSection />}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Home;
