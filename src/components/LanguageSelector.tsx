import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const FLAGS = {
  en: '🇬🇧',
  fr: '🇫🇷',
  ar: '🇸🇦'
} as const;

interface LanguageSelectorProps {
  className?: string;
}

export function LanguageSelector({ className = '' }: LanguageSelectorProps) {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-2 px-3 py-1 bg-emerald-700 rounded-md hover:bg-emerald-800 transition-colors ${className}`}
    >
      <span className="text-lg">{FLAGS[language]}</span>
      <span>{language.toUpperCase()}</span>
    </button>
  );
}