import React, { useEffect } from 'react';
import { Header } from '../components/Header';
import { WordCard } from '../components/WordCard';
import { MatchingGame } from '../components/games/MatchingGame';
import { MemoryGame } from '../components/games/MemoryGame';
import { WordScramble } from '../components/games/WordScramble';
import { CategorySelector } from '../components/CategorySelector';
import { GameSelector } from '../components/GameSelector';
import { ProgressBar } from '../components/ProgressBar';
import { ProfileView } from './ProfileView';
import { LoadingScreen } from '../components/ui/LoadingScreen';
import { categories } from '../data/categories';
import { useNavigation } from '../hooks/useNavigation';
import { useLanguageRefresh } from '../hooks/useLanguageRefresh';
import { useAuthStore } from '../stores/authStore';
import { useProgressStore } from '../stores/progressStore';

export function MainApp() {
  const [selectedCategory, setSelectedCategory] = React.useState(categories[0].id);
  const [selectedGame, setSelectedGame] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  
  const { progress, loading: progressLoading } = useProgressStore();
  const { user } = useAuthStore();
  const { currentSection, navigateTo } = useNavigation();
  const { key } = useLanguageRefresh();

  useEffect(() => {
    const initializeApp = async () => {
      if (user && !progress) {
        try {
          await useProgressStore.getState().loadProgress(user.uid);
        } catch (error) {
          console.error('Failed to load progress:', error);
        }
      }
      setIsLoading(false);
    };

    initializeApp();
  }, [user, progress]);

  if (isLoading || progressLoading) {
    return <LoadingScreen />;
  }

  if (!progress || !user) {
    return <LoadingScreen />;
  }

  const currentCategory = categories.find(c => c.id === selectedCategory)!;

  const handleGameComplete = async (score: number) => {
    if (user) {
      await useProgressStore.getState().updatePoints(user.uid, score);
      await useProgressStore.getState().addGameScore(user.uid, {
        gameId: selectedGame!,
        score,
        date: new Date().toISOString()
      });
      setSelectedGame(null);
    }
  };

  const handleWordLearned = async (wordId: string) => {
    if (user) {
      await useProgressStore.getState().addLearnedWord(user.uid, wordId);
    }
  };

  const renderGame = () => {
    if (!selectedGame) return null;

    const gameProps = {
      words: currentCategory.words,
      onComplete: handleGameComplete
    };

    switch (selectedGame) {
      case 'matching':
        return <MatchingGame key={`game-${key}`} {...gameProps} />;
      case 'memory':
        return <MemoryGame key={`game-${key}`} {...gameProps} />;
      case 'scramble':
        return (
          <WordScramble 
            key={`game-${key}`}
            word={currentCategory.words[0]} 
            onComplete={handleGameComplete} 
          />
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'profile':
        return <ProfileView key={`profile-${key}`} />;
      case 'words':
        return (
          <>
            <CategorySelector
              key={`categories-${key}`}
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-0">
              {currentCategory.words.map((word, index) => (
                <WordCard
                  key={`${index}-${key}`}
                  {...word}
                  onLearn={() => handleWordLearned(word.arabic.standard)}
                />
              ))}
            </div>
          </>
        );
      case 'games':
        return selectedGame ? (
          <div className="px-4 md:px-0">
            {renderGame()}
          </div>
        ) : (
          <GameSelector key={`games-${key}`} onSelect={setSelectedGame} />
        );
      case 'progress':
        return (
          <div className="px-4 md:px-0">
            <ProgressBar key={`progress-${key}`} progress={progress} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50">
      <Header
        currentSection={currentSection}
        onNavigate={navigateTo}
      />
      
      <main className="container mx-auto py-8">
        {progress && currentSection !== 'profile' && (
          <div className="px-4 md:px-0 mb-8">
            <ProgressBar progress={progress} />
          </div>
        )}
        {renderContent()}
      </main>
    </div>
  );
}