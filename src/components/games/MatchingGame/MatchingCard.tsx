import React from 'react';
import { cn } from '../../../utils/classNames';

interface MatchingCardProps {
  word: string;
  isMatched: boolean;
  isSelected: boolean;
  isError: boolean;
  onClick: () => void;
}

export function MatchingCard({ 
  word, 
  isMatched, 
  isSelected, 
  isError,
  onClick 
}: MatchingCardProps) {
  const isArabic = /[\u0600-\u06FF]/.test(word);
  
  return (
    <div className="relative">
      <button
        onClick={onClick}
        disabled={isMatched}
        className={cn(
          "w-full p-4 rounded-lg text-lg font-bold h-24 flex items-center justify-center",
          "transition-all duration-300 transform shadow-md",
          isMatched && "bg-emerald-100 text-emerald-700 animate-success",
          isSelected && "bg-emerald-600 text-white scale-105",
          isError && "bg-red-100 text-red-700 animate-shake",
          !isMatched && !isSelected && !isError && "bg-white hover:bg-emerald-50",
          isArabic && "font-arabic"
        )}
      >
        {word}
      </button>
    </div>
  );
}