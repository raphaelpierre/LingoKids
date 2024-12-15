import React from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { LoginForm } from '../components/auth/LoginForm';
import { useTranslation } from '../hooks/useTranslation';
import { Button } from '../components/ui/Button';

interface LoginViewProps {
  onSwitchToRegister: () => void;
}

export function LoginView({ onSwitchToRegister }: LoginViewProps) {
  const { t } = useTranslation();

  return (
    <AuthLayout
      title={t('auth.loginTitle')}
      footer={
        <div className="space-y-4">
          <p className="text-gray-600">
            {t('auth.noAccount')}
          </p>
          <Button
            variant="outline"
            onClick={onSwitchToRegister}
          >
            {t('auth.createAccount')}
          </Button>
        </div>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
}