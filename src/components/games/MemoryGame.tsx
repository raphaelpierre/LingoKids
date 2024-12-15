import React, { useState, useEffect } from 'react';
import { Word } from '../../types';
import { shuffleArray } from '../../utils/shuffle';
import { Brain } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

interface MemoryGameProps {
  words: Word[];
  onComplete: (score: number) => void;
}

interface Card {
  id: number;
  word: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export function MemoryGame({ words, onComplete }: MemoryGameProps) {
  const { t } = useTranslation();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);

  useEffect(() => {
    initializeCards();
  }, [words]);

  const initializeCards = () => {
    const cardPairs = words.flatMap((word) => [
      { word: word.arabic, type: 'arabic' },
      { word: word.english, type: 'english' },
    ]);

    const shuffledCards = shuffleArray(cardPairs).map((card, index) => ({
      id: index,
      word: card.word,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(0);
  };

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return;
    if (cards[cardId].isMatched) return;
    if (flippedCards.includes(cardId)) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards[firstId];
      const secondCard = cards[secondId];

      const isMatch = words.some(
        (word) =>
          (firstCard.word === word.arabic && secondCard.word === word.english) ||
          (firstCard.word === word.english && secondCard.word === word.arabic)
      );

      if (isMatch) {
        setCards(
          cards.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, isMatched: true }
              : card
          )
        );
        setMatchedPairs(matchedPairs + 1);

        if (matchedPairs + 1 === words.length) {
          onComplete(100);
        }
      }

      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="text-emerald-600" />
        <h3 className="text-xl font-bold">{t('games.memory.title')}</h3>
      </div>
      <p className="text-gray-600 mb-4">{t('games.memory.instructions')}</p>

      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`
              aspect-square rounded-lg p-2 text-center flex items-center justify-center
              transition-all duration-300 transform
              ${
                card.isMatched || flippedCards.includes(card.id)
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-emerald-600 text-white'
              }
              ${/[\u0600-\u06FF]/.test(card.word) ? 'font-arabic' : ''}
            `}
          >
            <span className="text-lg font-bold">
              {card.isMatched || flippedCards.includes(card.id)
                ? card.word
                : '?'}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}