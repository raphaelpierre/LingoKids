import { useEffect, useState } from 'react';
import { useLanguage } from './useLanguage';
import { useDialect } from './useDialect';

export function useLanguageRefresh() {
  const { language } = useLanguage();
  const { dialect } = useDialect();
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Force a re-render of components using this hook
    setKey(prev => prev + 1);
    
    // Update document attributes
    document.documentElement.lang = language;
    document.documentElement.setAttribute('data-dialect', dialect);

    // Force a re-render of the entire app
    window.dispatchEvent(new Event('languagechange'));
  }, [language, dialect]);

  return { key };
}