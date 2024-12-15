import React from 'react';
import { cn } from '../../../utils/classNames';

interface MemoryCardProps {
  word: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export function MemoryCard({ word, isFlipped, isMatched, onClick }: MemoryCardProps) {
  const isArabic = /[\u0600-\u06FF]/.test(word);

  return (
    <div className="relative perspective-1000">
      <button
        onClick={onClick}
        disabled={isMatched}
        className={cn(
          "w-full aspect-square rounded-lg text-lg font-bold",
          "transition-all duration-500 transform-style-3d",
          isFlipped && "rotate-y-180",
          isMatched && "animate-success"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 backface-hidden",
            "bg-emerald-600 rounded-lg flex items-center justify-center text-white",
            "shadow-md"
          )}
        >
          ?
        </div>
        <div
          className={cn(
            "absolute inset-0 backface-hidden rotate-y-180",
            "bg-white rounded-lg flex items-center justify-center",
            "shadow-md",
            isMatched && "bg-emerald-100 text-emerald-700",
            isArabic && "font-arabic"
          )}
        >
          {word}
        </div>
      </button>
    </div>
  );
}