import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getLocales } from 'expo-localization';
import { en, pl, TranslationKeys } from './translations';

export type SupportedLocale = 'en' | 'pl';

interface I18nContextType {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  t: TranslationKeys;
  isLoading: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations = {
  en,
  pl,
};

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [locale, setLocale] = useState<SupportedLocale>('en');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get device locale using expo-localization
    const deviceLocales = getLocales();
    const primaryLocale = deviceLocales[0]?.languageCode;
    
    // Set locale based on device language, fallback to English
    const supportedLocale: SupportedLocale = 
      primaryLocale === 'pl' ? 'pl' : 'en';
    
    setLocale(supportedLocale);
    setIsLoading(false);
  }, []);

  const contextValue: I18nContextType = {
    locale,
    setLocale,
    t: translations[locale],
    isLoading,
  };

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
} 