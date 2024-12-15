import { useState, useEffect } from 'react';
import { Word } from '../../../types';
import { shuffleArray } from '../../../utils/shuffle';

export function useMatchingGame(words: Word[], dialect: string, onComplete: (score: number) => void) {
  const [selectedPair, setSelectedPair] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [errorPair, setErrorPair] = useState<string[]>([]);
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);

  useEffect(() => {
    const pairs = [
      ...words.map(w => w.arabic[dialect] || w.arabic.standard),
      ...words.map(w => w.english)
    ];
    setShuffledWords(shuffleArray(pairs));
    setSelectedPair([]);
    setMatchedPairs([]);
    setErrorPair([]);
  }, [words, dialect]);

  const handleCardClick = (word: string) => {
    if (selectedPair.length === 2 || matchedPairs.includes(word)) return;
    if (selectedPair.includes(word)) return;
    if (errorPair.length > 0) return;

    const newPair = [...selectedPair, word];
    setSelectedPair(newPair);

    if (newPair.length === 2) {
      const [first, second] = newPair;
      const isMatch = words.some(w => {
        const arabicText = w.arabic[dialect] || w.arabic.standard;
        return (arabicText === first && w.english === second) ||
               (arabicText === second && w.english === first);
      });

      if (isMatch) {
        setTimeout(() => {
          setMatchedPairs([...matchedPairs, first, second]);
          setSelectedPair([]);
          if (matchedPairs.length + 2 === words.length * 2) {
            onComplete(Math.floor((words.length * 100) * (words.length / (matchedPairs.length + 2))));
          }
        }, 500);
      } else {
        setErrorPair(newPair);
        setTimeout(() => {
          setErrorPair([]);
          setSelectedPair([]);
        }, 1000);
      }
    }
  };

  return {
    selectedPair,
    matchedPairs,
    errorPair,
    shuffledWords,
    handleCardClick
  };
}