import React from 'react';
import { useForm } from '../../hooks/useForm';
import { useAuthStore } from '../../stores/authStore';
import { useTranslation } from '../../hooks/useTranslation';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Rocket } from 'lucide-react';

interface LoginFormData {
  email: string;
  password: string;
}

export function LoginForm() {
  const { t } = useTranslation();
  const { signIn, loading, error } = useAuthStore();
  const { values, handleChange, handleSubmit, isValid } = useForm<LoginFormData>({
    initialValues: { email: '', password: '' },
    onSubmit: async (values) => {
      await signIn(values.email, values.password);
    },
    validate: (values) => {
      const errors: Partial<LoginFormData> = {};
      if (!values.email) {
        errors.email = t('auth.errors.emailRequired');
      }
      if (!values.password) {
        errors.password = t('auth.errors.passwordRequired');
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
      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}
      <Button
        type="submit"
        disabled={!isValid || loading}
        className="w-full text-lg py-4 rounded-full"
        icon={<Rocket className="animate-bounce" size={24} />}
      >
        {loading ? '🚀...' : t('auth.login')}
      </Button>
    </form>
  );
}