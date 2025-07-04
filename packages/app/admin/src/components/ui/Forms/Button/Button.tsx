import { clsx } from 'clsx';
import type React from 'react';
import type { ComponentSize } from '../../../../lib/theme.config';
import { componentTokens, getComponentSize } from '../../../../lib/theme.config';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost';
  size?: ComponentSize;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  // React 19: ref as a normal prop
  ref?: React.Ref<HTMLButtonElement>;
}

// React 19: No more forwardRef needed!
const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className,
  onClick,
  type = 'button',
  ref, // React 19: ref is now a normal prop!
  ...props
}) => {
  const sizeClasses = getComponentSize('button', size);
  const baseClasses = componentTokens.button.base;

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg hover:shadow-xl',
    secondary:
      'bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-800 hover:to-gray-700 text-white',
    destructive:
      'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white',
    outline:
      'border-2 border-gray-600 hover:border-gray-500 bg-transparent hover:bg-gray-800/20 text-gray-300',
    ghost: 'bg-transparent hover:bg-gray-800/30 text-gray-300',
  };

  const classes = clsx(
    baseClasses,
    sizeClasses,
    variantClasses[variant],
    'rounded-lg font-medium transition-all duration-200 transform',
    'focus:outline-none focus:ring-2 focus:ring-blue-500/20',
    'active:scale-[0.98]',
    (disabled || loading) && 'opacity-60 cursor-not-allowed',
    !disabled && !loading && 'hover:scale-[1.02]',
    className,
  );

  return (
    <button
      ref={ref} // React 19: Direct ref usage!
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
