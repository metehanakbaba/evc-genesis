import { clsx } from 'clsx';
import { forwardRef } from 'react';

interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'white'
    | 'gradient';
  className?: string;
  'aria-label'?: string;
  /** Revolutionary floating effect */
  floating?: boolean;
  /** Show revolutionary pulsing background */
  withBackground?: boolean;
}

const Spinner = forwardRef<SVGSVGElement, SpinnerProps>(
  (
    {
      size = 'md',
      variant = 'primary',
      className,
      'aria-label': ariaLabel = 'Loading...',
      floating = false,
      withBackground = false,
      ...props
    },
    ref,
  ) => {
    // Revolutionary size system
    const sizeClasses = {
      xs: 'w-4 h-4',
      sm: 'w-5 h-5',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
      xl: 'w-10 h-10',
    };

    // Revolutionary stroke width based on size
    const strokeWidthClasses = {
      xs: '2',
      sm: '2.5',
      md: '3',
      lg: '3.5',
      xl: '4',
    };

    // Revolutionary variant colors with glassmorphism
    const variantClasses = {
      primary: 'text-blue-400',
      secondary: 'text-purple-400',
      success: 'text-emerald-400',
      warning: 'text-amber-400',
      danger: 'text-red-400',
      white: 'text-white',
      gradient: 'text-blue-400', // Special gradient handling below
    };

    // Revolutionary background colors for floating effect
    const backgroundClasses = {
      primary: 'bg-blue-500/10 shadow-lg shadow-blue-500/20',
      secondary: 'bg-purple-500/10 shadow-lg shadow-purple-500/20',
      success: 'bg-emerald-500/10 shadow-lg shadow-emerald-500/20',
      warning: 'bg-amber-500/10 shadow-lg shadow-amber-500/20',
      danger: 'bg-red-500/10 shadow-lg shadow-red-500/20',
      white: 'bg-white/10 shadow-lg shadow-white/20',
      gradient:
        'bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-blue-500/10 shadow-lg shadow-blue-500/20',
    };

    const spinnerElement = (
      <svg
        ref={ref}
        className={clsx(
          // Revolutionary base animation
          'animate-spin transition-all duration-300',
          // Revolutionary size
          sizeClasses[size],
          // Revolutionary color
          variantClasses[variant],
          // Revolutionary floating effect
          floating && 'hover:scale-110',
          className,
        )}
        fill="none"
        viewBox="0 0 24 24"
        aria-label={ariaLabel}
        role="img"
        {...props}
      >
        {variant === 'gradient' ? (
          // Revolutionary gradient spinner
          <>
            <defs>
              <linearGradient
                id="spinner-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity="1" />
              </linearGradient>
            </defs>
            <circle
              className="opacity-20"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth={strokeWidthClasses[size]}
            />
            <path
              fill="url(#spinner-gradient)"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </>
        ) : (
          // Revolutionary standard spinner with enhanced opacity
          <>
            <circle
              className="opacity-20"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth={strokeWidthClasses[size]}
              strokeLinecap="round"
            />
            <path
              className="opacity-90"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </>
        )}
      </svg>
    );

    // Revolutionary floating background container
    if (withBackground) {
      return (
        <div
          className={clsx(
            // Revolutionary glassmorphism container
            'relative inline-flex items-center justify-center rounded-full backdrop-blur-xl border border-white/10 transition-all duration-300',
            // Revolutionary size-based padding
            size === 'xs' && 'p-2',
            size === 'sm' && 'p-2.5',
            size === 'md' && 'p-3',
            size === 'lg' && 'p-4',
            size === 'xl' && 'p-5',
            // Revolutionary background
            backgroundClasses[variant],
            // Revolutionary floating effects
            floating && 'hover:scale-105 hover:-translate-y-1 hover:shadow-xl',
          )}
        >
          {/* Revolutionary pulsing accent ring */}
          <div className="absolute inset-0 rounded-full border border-current/20 animate-pulse" />

          {spinnerElement}
        </div>
      );
    }

    return spinnerElement;
  },
);

Spinner.displayName = 'Spinner';

export { Spinner };
export type { SpinnerProps };
