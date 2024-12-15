import React, { useState } from 'react';
import { LoginView } from './LoginView';
import { RegisterView } from './RegisterView';

type AuthView = 'login' | 'register';

export function AuthView() {
  const [view, setView] = useState<AuthView>('login');

  return view === 'login' ? (
    <LoginView onSwitchToRegister={() => setView('register')} />
  ) : (
    <RegisterView onSwitchToLogin={() => setView('login')} />
  );
}