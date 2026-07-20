import { type FormEvent, type ReactElement } from 'react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Phone, LoaderCircle } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import FormInput from '../components/FormInput';
import type { LoginFormData } from '../types';

const initialValues: LoginFormData = {
  mobileNumber: '',
  password: '',
};

const LoginPage = (): ReactElement => {
  const [formData, setFormData] = useState<LoginFormData>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validations = useMemo(() => {
    const nextErrors: Partial<Record<keyof LoginFormData, string>> = {};

    if (!formData.mobileNumber.trim()) {
      nextErrors.mobileNumber = 'Mobile number is required.';
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      nextErrors.mobileNumber = 'Enter a valid 10-digit mobile number.';
    }

    if (!formData.password.trim()) {
      nextErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.';
    }

    return nextErrors;
  }, [formData]);

  const isFormValid = Object.keys(validations).length === 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setErrors(validations);

    if (Object.keys(validations).length > 0) {
      return;
    }

    setIsSubmitting(true);
    window.setTimeout(() => {
      console.log('Login form submitted', formData);
      setIsSubmitting(false);
    }, 600);
  };

  const handleChange = (field: keyof LoginFormData, value: string): void => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl">
        <Card title="Welcome back" description="Sign in with your mobile number and password to continue.">
          <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
            <FormInput
              id="mobileNumber"
              label="Mobile Number"
              type="tel"
              value={formData.mobileNumber}
              onChange={(value) => handleChange('mobileNumber', value)}
              placeholder="Enter 10-digit mobile number"
              error={errors.mobileNumber}
              icon={<Phone size={16} />}
              autoComplete="tel"
            />

            <FormInput
              id="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={(value) => handleChange('password', value)}
              placeholder="Enter your password"
              error={errors.password}
              icon={<Lock size={16} />}
              showToggle
              isPasswordVisible={showPassword}
              onToggleVisibility={() => setShowPassword((current) => !current)}
            />

            <Button type="submit" className="w-full justify-center" disabled={!isFormValid || isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <LoaderCircle size={16} className="animate-spin" />
                  Logging in...
                </span>
              ) : (
                'Login'
              )}
            </Button>

            <p className="text-center text-sm text-slate-600">
              New user?{' '}
              <Link to="/register" className="font-semibold text-orange-500 hover:text-orange-600">
                Register here
              </Link>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
