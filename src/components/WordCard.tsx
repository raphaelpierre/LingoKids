import React from 'react';
import { AudioButton } from './AudioButton';
import { useLanguage } from '../hooks/useLanguage';
import { useDialect } from '../hooks/useDialect';
import { Word } from '../types';

interface WordCardProps extends Omit<Word, 'arabic' | 'pronunciation'> {
  arabic: {
    standard: string;
    moroccan?: string;
    tunisian?: string;
  };
  pronunciation: {
    standard: string;
    moroccan?: string;
    tunisian?: string;
  };
  onLearn?: () => void;
}

export function WordCard({ 
  arabic, 
  english, 
  french, 
  pronunciation, 
  image,
  onLearn 
}: WordCardProps) {
  const { language } = useLanguage();
  const { dialect } = useDialect();
  
  const displayText = arabic[dialect] || arabic.standard;
  const displayPronunciation = pronunciation[dialect] || pronunciation.standard;
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
      <img 
        src={image} 
        alt={language === 'en' ? english : french} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-3xl font-bold text-right mb-2 font-arabic">{displayText}</h3>
        <p className="text-gray-600 mb-2">{language === 'en' ? english : french}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AudioButton text={displayText} />
            <span className="text-sm text-gray-500">{displayPronunciation}</span>
          </div>
          {onLearn && (
            <button
              onClick={onLearn}
              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
            >
              {language === 'en' ? 'Mark as learned' : 'Marquer comme appris'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}