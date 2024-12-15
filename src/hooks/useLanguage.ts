import { create } from 'zustand';
import { APP_CONFIG } from '../constants/config';
import { getStorageItem, setStorageItem } from '../utils/localStorage';

interface LanguageState {
  language: 'en' | 'fr';
  setLanguage: (language: 'en' | 'fr') => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: getStorageItem('language', APP_CONFIG.defaultLanguage),
  setLanguage: (language) => {
    set({ language });
    setStorageItem('language', language);
    window.dispatchEvent(new Event('languagechange'));
  },
}));

export function useLanguage() {
  const { language, setLanguage } = useLanguageStore();

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'fr' : 'en';
    setLanguage(newLanguage);
  };

  return { language, toggleLanguage };
}