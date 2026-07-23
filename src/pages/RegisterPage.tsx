import { type ReactElement, type FormEvent } from 'react';
import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Lock, Mail, LoaderCircle, Phone, User } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import FormInput from '../components/FormInput';
import { useAuth } from '../context/AuthContext';
import type { RegisterFormData } from '../types';

const initialValues: RegisterFormData = {
  fullName: '',
  mobileNumber: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const RegisterPage = (): ReactElement => {
  const [formData, setFormData] = useState<RegisterFormData>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const validations = useMemo(() => {
    const nextErrors: Partial<Record<keyof RegisterFormData, string>> = {};

    if (!formData.fullName.trim()) {
      nextErrors.fullName = 'Full name is required.';
    }

    if (!formData.mobileNumber.trim()) {
      nextErrors.mobileNumber = 'Mobile number is required.';
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      nextErrors.mobileNumber = 'Enter a valid 10-digit mobile number.';
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!formData.password.trim()) {
      nextErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.';
    }

    if (!formData.confirmPassword.trim()) {
      nextErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.confirmPassword !== formData.password) {
      nextErrors.confirmPassword = 'Passwords do not match.';
    }

    return nextErrors;
  }, [formData]);

  const isFormValid = Object.keys(validations).length === 0;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setErrors(validations);

    if (Object.keys(validations).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          mobileNumber: formData.mobileNumber,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      navigate('/login', {
        state: {
          message: 'Registration successful. Please login with your mobile number and password.',
        },
        replace: true,
      });
    } catch (error) {
      setErrors((current) => ({
        ...current,
        email: error instanceof Error ? error.message : 'Registration failed',
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof RegisterFormData, value: string): void => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl">
        <Card title="Create account" description="Register with your mobile number and password to join BGMI matches.">
          <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
            <FormInput
              id="fullName"
              label="Full Name"
              type="text"
              value={formData.fullName}
              onChange={(value) => handleChange('fullName', value)}
              placeholder="Enter your full name"
              error={errors.fullName}
              icon={<User size={16} />}
              autoComplete="name"
            />

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
              id="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={(value) => handleChange('email', value)}
              placeholder="Enter your email"
              error={errors.email}
              icon={<Mail size={16} />}
              autoComplete="email"
            />

            <FormInput
              id="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={(value) => handleChange('password', value)}
              placeholder="Minimum 6 characters"
              error={errors.password}
              icon={<Lock size={16} />}
              showToggle
              isPasswordVisible={showPassword}
              onToggleVisibility={() => setShowPassword((current) => !current)}
            />

            <FormInput
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={(value) => handleChange('confirmPassword', value)}
              placeholder="Re-enter your password"
              error={errors.confirmPassword}
              icon={<Lock size={16} />}
              showToggle
              isPasswordVisible={showConfirmPassword}
              onToggleVisibility={() => setShowConfirmPassword((current) => !current)}
            />

            <Button type="submit" className="w-full justify-center" disabled={!isFormValid || isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <LoaderCircle size={16} className="animate-spin" />
                  Creating account...
                </span>
              ) : (
                'Register'
              )}
            </Button>

            <p className="text-center text-sm text-slate-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-orange-500 hover:text-orange-600">
                Login here
              </Link>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
