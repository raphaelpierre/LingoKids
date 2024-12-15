import React, { useState, useEffect } from 'react';
import { Word } from '../../types';
import { useAuthStore } from '../../stores/authStore';
import { useProgressStore } from '../../stores/progressStore';

interface MemoryGameProps {
  words: Word[];
}

export function MemoryGame({ words }: MemoryGameProps) {
  const [cards, setCards] = useState<(Word & { matched: boolean; flipped: boolean })[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const { user } = useAuthStore();
  const { updatePoints, addGameScore } = useProgressStore();

  // Prepare game cards
  useEffect(() => {
    const prepareCards = () => {
      // Duplicate words to create pairs
      const gameCards = words.flatMap(word => [
        { ...word, matched: false, flipped: false },
        { ...word, matched: false, flipped: false }
      ]);

      // Shuffle cards
      const shuffledCards = gameCards.sort(() => Math.random() - 0.5);
      setCards(shuffledCards);
    };

    prepareCards();
  }, [words]);

  // Handle card flip
  const handleCardFlip = (index: number) => {
    // Prevent flipping matched or already flipped cards
    if (cards[index].matched || cards[index].flipped || flippedCards.length === 2) return;

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);
    setFlippedCards([...flippedCards, index]);
  };

  // Check for match
  useEffect(() => {
    if (flippedCards.length === 2) {
      setAttempts(prev => prev + 1);
      const [first, second] = flippedCards;
      
      // Check if cards match
      const isMatch = cards[first].english === cards[second].english;
      
      setTimeout(() => {
        const newCards = [...cards];
        
        if (isMatch) {
          newCards[first].matched = true;
          newCards[second].matched = true;
          setMatchedPairs(prev => prev + 1);
        } else {
          newCards[first].flipped = false;
          newCards[second].flipped = false;
        }
        
        setCards(newCards);
        setFlippedCards([]);
      }, 1000);
    }
  }, [flippedCards]);

  // Game over logic
  useEffect(() => {
    if (matchedPairs === words.length) {
      setGameOver(true);
      calculateScore();
    }
  }, [matchedPairs]);

  // Calculate and save score
  const calculateScore = () => {
    if (!user) return;

    // Score calculation based on attempts and total words
    const baseScore = words.length * 10;
    const attemptPenalty = attempts * 2;
    const finalScore = Math.max(baseScore - attemptPenalty, 0);

    try {
      // Update user points
      updatePoints(user.uid, finalScore);

      // Log game score
      addGameScore(user.uid, {
        gameId: 'memory_game',
        score: finalScore,
        date: new Date().toISOString()
      });

      console.log(` Memory Game Score: ${finalScore}`);
    } catch (error) {
      console.error('Failed to save game score', error);
    }
  };

  return (
    <div className="memory-game">
      <div className="game-grid">
        {cards.map((card, index) => (
          <div 
            key={index} 
            className={`card 
              ${card.flipped ? 'flipped' : ''} 
              ${card.matched ? 'matched' : ''}
            `}
            onClick={() => handleCardFlip(index)}
          >
            {card.flipped || card.matched ? (
              <span className="card-image">
                {card.english}
              </span>
            ) : (
              <div className="card-back">?</div>
            )}
          </div>
        ))}
      </div>

      {gameOver && (
        <div className="game-over">
          <h2>Congratulations!</h2>
          <p>You completed the Memory Game!</p>
          <p>Score: {calculateScore()}</p>
        </div>
      )}
    </div>
  );
}