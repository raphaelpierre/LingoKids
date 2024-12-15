import React from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { RegisterForm } from '../components/auth/RegisterForm';
import { useTranslation } from '../hooks/useTranslation';
import { Button } from '../components/ui/Button';

interface RegisterViewProps {
  onSwitchToLogin: () => void;
}

export function RegisterView({ onSwitchToLogin }: RegisterViewProps) {
  const { t } = useTranslation();

  return (
    <AuthLayout
      title={t('auth.registerTitle')}
      footer={
        <div className="space-y-4">
          <p className="text-gray-600">
            {t('auth.haveAccount')}
          </p>
          <Button
            variant="outline"
            onClick={onSwitchToLogin}
          >
            {t('auth.login')}
          </Button>
        </div>
      }
    >
      <RegisterForm />
    </AuthLayout>
  );
}