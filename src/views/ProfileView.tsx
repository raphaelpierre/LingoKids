import React from 'react';
import { useAuthStore } from '../stores/authStore';
import { useProgressStore } from '../stores/progressStore';
import { useTranslation } from '../hooks/useTranslation';
import { Trophy, Star, Book } from 'lucide-react';

export function ProfileView() {
  const { user } = useAuthStore();
  const { progress } = useProgressStore();
  const { t } = useTranslation();

  if (!user || !progress) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="bg-emerald-100 p-4 rounded-full">
            <Trophy className="w-12 h-12 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">{user.email}</h2>
            <p className="text-gray-600">{t('profile.memberSince', { date: new Date().toLocaleDateString() })}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-emerald-50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Star className="text-yellow-500" />
              <h3 className="text-lg font-semibold">{t('profile.totalPoints')}</h3>
            </div>
            <p className="text-3xl font-bold text-emerald-600">{progress.points}</p>
          </div>

          <div className="bg-emerald-50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Book className="text-emerald-600" />
              <h3 className="text-lg font-semibold">{t('profile.wordsLearned')}</h3>
            </div>
            <p className="text-3xl font-bold text-emerald-600">{progress.wordsLearned.length}</p>
          </div>

          <div className="bg-emerald-50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="text-emerald-600" />
              <h3 className="text-lg font-semibold">{t('profile.gamesPlayed')}</h3>
            </div>
            <p className="text-3xl font-bold text-emerald-600">{progress.gameScores.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-xl font-bold mb-6">{t('profile.recentActivity')}</h3>
        <div className="space-y-4">
          {progress.gameScores.slice(-5).reverse().map((score, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{t(`games.${score.gameId}.title`)}</p>
                <p className="text-sm text-gray-600">{new Date(score.date).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <Star className="text-yellow-500" size={18} />
                <span className="font-bold">{score.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}