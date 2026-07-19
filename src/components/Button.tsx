import { type ButtonHTMLAttributes, type ReactElement, type ReactNode } from 'react';
import { cn } from '../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  asChild?: boolean;
  children: ReactNode;
}

const Button = ({
  children,
  className,
  variant = 'primary',
  asChild = false,
  ...props
}: ButtonProps): ReactElement => {
  const baseClasses = 'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2';
  const variantClasses = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600',
    secondary: 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
  };

  if (asChild && props.type === undefined) {
    props.type = 'button';
  }

  return (
    <button className={cn(baseClasses, variantClasses[variant], className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
