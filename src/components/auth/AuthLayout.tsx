import React from 'react';
import { Logo } from '../Logo';
import { useTranslation } from '../../hooks/useTranslation';
import { GoogleButton } from './GoogleButton';

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthLayout({ title, children, footer }: AuthLayoutProps) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-100 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="animate-bounce mb-4">
              <Logo className="w-20 h-20" />
            </div>
            <h1 className="text-3xl font-bold text-emerald-600 mb-4">{title}</h1>
            <p className="text-lg text-emerald-700 text-center">
              {t('app.description')}
            </p>
          </div>

          <GoogleButton />

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                {t('auth.orContinueWith')}
              </span>
            </div>
          </div>

          {children}

          {footer && (
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}