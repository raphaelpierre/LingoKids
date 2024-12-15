import React from 'react';
import { useForm } from '../../hooks/useForm';
import { useAuthStore } from '../../stores/authStore';
import { useTranslation } from '../../hooks/useTranslation';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Star } from 'lucide-react';

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export function RegisterForm() {
  const { t } = useTranslation();
  const { signUp, loading, error } = useAuthStore();
  const { values, handleChange, handleSubmit, isValid } = useForm<RegisterFormData>({
    initialValues: { email: '', password: '', confirmPassword: '' },
    onSubmit: async (values) => {
      await signUp(values.email, values.password);
    },
    validate: (values) => {
      const errors: Partial<RegisterFormData> = {};
      if (!values.email) {
        errors.email = t('auth.errors.emailRequired');
      }
      if (!values.password) {
        errors.password = t('auth.errors.passwordRequired');
      }
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = t('auth.errors.passwordMismatch');
      }
      return errors;
    }
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder={t('auth.email')}
          className="text-lg rounded-full"
          required
        />
      </div>
      <div>
        <Input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder={t('auth.password')}
          className="text-lg rounded-full"
          required
        />
      </div>
      <div>
        <Input
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          placeholder={t('auth.confirmPassword')}
          className="text-lg rounded-full"
          required
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}
      <Button
        type="submit"
        disabled={!isValid || loading}
        className="w-full text-lg py-4 rounded-full"
        icon={<Star className="animate-spin-slow" size={24} />}
      >
        {loading ? '✨...' : t('auth.createAccount')}
      </Button>
    </form>
  );
}