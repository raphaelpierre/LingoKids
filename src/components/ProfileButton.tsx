import React, { useState } from 'react';
import { UserCircle, LogOut, Settings } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useTranslation } from '../hooks/useTranslation';
import { Button } from './ui/Button';

export function ProfileButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuthStore();
  const { t } = useTranslation();

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-white hover:text-emerald-200 transition-colors"
      >
        {user.photoURL ? (
          <img 
            src={user.photoURL} 
            alt={user.displayName || user.email || ''} 
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <UserCircle size={24} />
        )}
        <span className="hidden md:inline">
          {user.displayName || user.email}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
          <button
            onClick={() => {
              setIsOpen(false);
              // TODO: Implement profile settings
            }}
            className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-emerald-50 transition-colors"
          >
            <Settings size={18} />
            {t('profile.settings')}
          </button>
          <Button
            variant="outline"
            onClick={() => {
              setIsOpen(false);
              signOut();
            }}
            className="w-full px-4 py-2 text-left flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut size={18} />
            {t('profile.logout')}
          </Button>
        </div>
      )}
    </div>
  );
}