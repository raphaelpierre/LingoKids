import { useLanguage } from './useLanguage';
import { translations } from '../i18n/translations';
import { useEffect, useState } from 'react';

export function useTranslation() {
  const { language } = useLanguage();
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const handleLanguageChange = () => {
      setVersion(prev => prev + 1);
    };

    window.addEventListener('languagechange', handleLanguageChange);
    return () => window.removeEventListener('languagechange', handleLanguageChange);
  }, []);

  const t = (key: string) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    return value as string;
  };

  return { t, version };
}