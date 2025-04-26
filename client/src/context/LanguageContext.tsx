import React, { createContext, useContext, ReactNode } from 'react';
import { Language } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import translations from '@/data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (section: keyof typeof translations.en, key: string, nestedKey?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useLocalStorage<Language>('language', 'en');

  // Translation function that navigates the nested structure
  const t = (section: keyof typeof translations.en, key: string, nestedKey?: string): string => {
    try {
      const sectionObj = translations[language][section] as any;
      
      if (!sectionObj) {
        console.error(`Translation section "${section}" not found`);
        return key;
      }
      
      if (nestedKey) {
        if (!sectionObj[key] || !sectionObj[key][nestedKey]) {
          console.error(`Translation key "${section}.${key}.${nestedKey}" not found`);
          return nestedKey;
        }
        return sectionObj[key][nestedKey];
      } else {
        if (!sectionObj[key]) {
          console.error(`Translation key "${section}.${key}" not found`);
          return key;
        }
        return sectionObj[key];
      }
    } catch (error) {
      console.error('Translation error:', error);
      return nestedKey || key;
    }
  };

  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
