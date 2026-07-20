import { type ReactElement, type ReactNode } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface FormInputProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'tel';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  autoComplete?: string;
  icon?: ReactNode;
  showToggle?: boolean;
  isPasswordVisible?: boolean;
  onToggleVisibility?: () => void;
}

const FormInput = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  autoComplete,
  icon,
  showToggle = false,
  isPasswordVisible = false,
  onToggleVisibility,
}: FormInputProps): ReactElement => {
  const resolvedType = showToggle ? (isPasswordVisible ? 'text' : 'password') : type;

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        {icon ? (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            {icon}
          </div>
        ) : null}
        <input
          id={id}
          type={resolvedType}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition ${icon ? 'pl-10' : ''} ${error ? 'border-red-400 focus:ring-2 focus:ring-red-400' : 'border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100'}`}
        />
        {showToggle && onToggleVisibility ? (
          <button
            type="button"
            onClick={onToggleVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500"
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
          >
            {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        ) : null}
      </div>
      {error ? <p className="text-xs text-red-500">{error}</p> : null}
    </div>
  );
};

export default FormInput;
