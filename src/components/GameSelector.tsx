import React from 'react';
import { Gamepad2 } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface Game {
  id: string;
  name: string;
  nameFr: string;
  icon: React.ReactNode;
}

const games: Game[] = [
  { id: 'matching', name: 'Matching', nameFr: 'Association', icon: '🎯' },
  { id: 'memory', name: 'Memory', nameFr: 'Mémoire', icon: '🧠' },
  { id: 'scramble', name: 'Word Scramble', nameFr: 'Mots Mélangés', icon: '🔤' },
];

interface GameSelectorProps {
  onSelect: (gameId: string) => void;
}

export function GameSelector({ onSelect }: GameSelectorProps) {
  const { language } = useLanguage();

  return (
    <div className="mb-8 px-4 md:px-0">
      <div className="flex items-center gap-2 mb-4">
        <Gamepad2 className="text-emerald-600" />
        <h2 className="text-xl font-bold">
          {language === 'en' ? 'Choose a Game' : 'Choisir un Jeu'}
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {games.map((game) => (
          <button
            key={game.id}
            onClick={() => onSelect(game.id)}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center gap-2 justify-center"
          >
            <span className="text-2xl">{game.icon}</span>
            <span className="font-medium">
              {language === 'en' ? game.name : game.nameFr}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}