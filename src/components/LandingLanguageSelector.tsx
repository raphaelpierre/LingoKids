import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
] as const;

export function LandingLanguageSelector() {
  const { language, toggleLanguage } = useLanguage();

  const handleLanguageChange = (langCode: typeof LANGUAGES[number]['code']) => {
    if (langCode !== language) {
      toggleLanguage();
    }
  };

  return (
    <div className="flex justify-center gap-4">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`
            flex flex-col items-center p-4 rounded-2xl transition-all duration-300
            ${language === lang.code
              ? 'bg-emerald-100 scale-110 shadow-lg'
              : 'bg-white/80 hover:bg-white hover:scale-105'
            }
          `}
        >
          <span className="text-4xl mb-2">{lang.flag}</span>
          <span className={`
            text-lg font-medium
            ${language === lang.code ? 'text-emerald-700' : 'text-gray-600'}
          `}>
            {lang.name}
          </span>
        </button>
      ))}
    </div>
  );
}