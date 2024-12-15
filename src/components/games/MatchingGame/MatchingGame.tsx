import React from 'react';
import { Shuffle } from 'lucide-react';
import { Word } from '../../../types';
import { useTranslation } from '../../../hooks/useTranslation';
import { useDialect } from '../../../hooks/useDialect';
import { MatchingCard } from './MatchingCard';
import { useMatchingGame } from './useMatchingGame';
import { GameAnimation } from '../../animations/GameAnimation';

interface MatchingGameProps {
  words: Word[];
  onComplete: (score: number) => void;
}

export function MatchingGame({ words, onComplete }: MatchingGameProps) {
  const { t } = useTranslation();
  const { dialect } = useDialect();
  const { selectedPair, matchedPairs, errorPair, shuffledWords, handleCardClick } = useMatchingGame(words, dialect, onComplete);

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Shuffle className="text-emerald-600" />
        <h3 className="text-xl font-bold">{t('games.matching.title')}</h3>
      </div>
      <p className="text-gray-600 mb-4">{t('games.matching.instructions')}</p>
      
      <div className="relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {shuffledWords.map((word, index) => (
            <MatchingCard
              key={`${word}-${index}`}
              word={word}
              isMatched={matchedPairs.includes(word)}
              isSelected={selectedPair.includes(word)}
              isError={errorPair.includes(word)}
              onClick={() => handleCardClick(word)}
            />
          ))}
        </div>
        <GameAnimation 
          type="success" 
          isVisible={matchedPairs.length === words.length * 2}
        >
          {t('games.matching.success')}
        </GameAnimation>
      </div>
    </div>
  );
}