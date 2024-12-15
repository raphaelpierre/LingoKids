import React, { useState, useEffect } from 'react';
import { Word } from '../../types';
import { shuffleArray } from '../../utils/shuffle';
import { RefreshCw } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { useDialect } from '../../hooks/useDialect';
import { AudioButton } from '../AudioButton';

interface WordScrambleProps {
  word: Word;
  onComplete: (score: number) => void;
}

export function WordScramble({ word, onComplete }: WordScrambleProps) {
  const { t } = useTranslation();
  const { dialect } = useDialect();
  const [scrambledLetters, setScrambledLetters] = useState<string[]>([]);
  const [userAnswer, setUserAnswer] = useState<string[]>([]);
  const [remainingLetters, setRemainingLetters] = useState<string[]>([]);

  const currentWord = word.arabic[dialect] || word.arabic.standard;
  const currentPronunciation = word.pronunciation[dialect] || word.pronunciation.standard;

  useEffect(() => {
    resetGame();
  }, [word, dialect]);

  const resetGame = () => {
    const letters = currentWord.split('');
    setScrambledLetters(shuffleArray(letters));
    setRemainingLetters(shuffleArray(letters));
    setUserAnswer([]);
  };

  const handleLetterClick = (letter: string, index: number) => {
    setUserAnswer([...userAnswer, letter]);
    setRemainingLetters(remainingLetters.filter((_, i) => i !== index));

    if (userAnswer.length + 1 === currentWord.length) {
      const isCorrect = [...userAnswer, letter].join('') === currentWord;
      if (isCorrect) {
        onComplete(100);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">{t('games.scramble.title')}</h3>
        <div className="flex gap-4">
          <AudioButton text={currentWord} />
          <button
            onClick={resetGame}
            className="text-emerald-600 hover:text-emerald-700"
          >
            <RefreshCw size={24} />
          </button>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-gray-600 mb-2">{t('games.scramble.instructions')}</p>
        <p className="text-gray-600 mb-2">Meaning: {word.english}</p>
        <p className="text-gray-600">Pronunciation: {currentPronunciation}</p>
      </div>

      <div className="flex justify-center gap-2 mb-8">
        {userAnswer.map((letter, index) => (
          <div
            key={index}
            className="w-12 h-12 flex items-center justify-center text-xl font-bold border-2 border-emerald-600 rounded font-arabic"
          >
            {letter}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {remainingLetters.map((letter, index) => (
          <button
            key={index}
            onClick={() => handleLetterClick(letter, index)}
            className="w-12 h-12 bg-emerald-100 hover:bg-emerald-200 text-xl font-bold rounded font-arabic"
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
}