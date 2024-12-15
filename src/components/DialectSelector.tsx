import React from 'react';
import { useDialect } from '../hooks/useDialect';
import { useLanguage } from '../hooks/useLanguage';
import { dialects } from '../data/dialects';

interface DialectSelectorProps {
  className?: string;
}

export function DialectSelector({ className = '' }: DialectSelectorProps) {
  const { dialect, changeDialect } = useDialect();
  const { language } = useLanguage();
  const currentDialect = dialects.find(d => d.id === dialect)!;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={() => {
          const currentIndex = dialects.findIndex(d => d.id === dialect);
          const nextIndex = (currentIndex + 1) % dialects.length;
          changeDialect(dialects[nextIndex].id);
        }}
        className="flex items-center gap-2 px-3 py-1 bg-emerald-700 rounded-md hover:bg-emerald-800 transition-colors text-white"
      >
        <span className="text-lg">{currentDialect.flag}</span>
        <span>{language === 'en' ? currentDialect.name : currentDialect.nameFr}</span>
      </button>
    </div>
  );
}