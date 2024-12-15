import React, { useState, useEffect } from 'react';
import { Word } from '../../types';
import { Shuffle } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { useDialect } from '../../hooks/useDialect';

interface MatchingGameProps {
  words: Word[];
  onComplete: (score: number) => void;
}

export function MatchingGame({ words, onComplete }: MatchingGameProps) {
  const { t } = useTranslation();
  const { dialect } = useDialect();
  const [selectedPair, setSelectedPair] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);

  useEffect(() => {
    const pairs = [
      ...words.map(w => w.arabic[dialect] || w.arabic.standard),
      ...words.map(w => w.english)
    ];
    setShuffledWords(pairs.sort(() => Math.random() - 0.5));
    setSelectedPair([]);
    setMatchedPairs([]);
  }, [words, dialect]);

  const handleCardClick = (word: string) => {
    if (selectedPair.length === 2) return;
    if (selectedPair.includes(word)) return;
    
    const newPair = [...selectedPair, word];
    setSelectedPair(newPair);

    if (newPair.length === 2) {
      const [first, second] = newPair;
      const isMatch = words.some(w => {
        const arabicText = w.arabic[dialect] || w.arabic.standard;
        return (arabicText === first && w.english === second) ||
               (arabicText === second && w.english === first);
      });

      setTimeout(() => {
        if (isMatch) {
          setMatchedPairs([...matchedPairs, first, second]);
          if (matchedPairs.length + 2 === words.length * 2) {
            onComplete(Math.floor((words.length * 100) * (words.length / (matchedPairs.length + 2))));
          }
        }
        setSelectedPair([]);
      }, 1000);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Shuffle className="text-emerald-600" />
        <h3 className="text-xl font-bold">{t('games.matching.title')}</h3>
      </div>
      <p className="text-gray-600 mb-4">{t('games.matching.instructions')}</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {shuffledWords.map((word, index) => (
          <button
            key={index}
            onClick={() => handleCardClick(word)}
            disabled={matchedPairs.includes(word)}
            className={`
              p-4 rounded-lg text-lg font-bold h-24 flex items-center justify-center
              ${matchedPairs.includes(word) 
                ? 'bg-emerald-100 text-emerald-700' 
                : selectedPair.includes(word)
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white hover:bg-emerald-50'
              }
              transition-colors shadow-md
              ${/[\u0600-\u06FF]/.test(word) ? 'font-arabic' : ''}
            `}
          >
            {word}
          </button>
        ))}
      </div>
    </div>
  );
}