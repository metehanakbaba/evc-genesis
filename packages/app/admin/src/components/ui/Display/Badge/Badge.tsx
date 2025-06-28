import { clsx } from 'clsx';
import { forwardRef } from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'neutral';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  /** Revolutionary floating effect */
  floating?: boolean;
  /** Show pulsing accent dot */
  pulse?: boolean;
  /** Make badge interactive */
  onClick?: () => void;
}

const Badge = forwardRef<HTMLElement, BadgeProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      className,
      floating = false,
      pulse = false,
      onClick,
      ...props
    },
    ref,
  ) => {
    // Revolutionary size system with floating effects
    const sizeClasses = {
      xs: 'px-2 py-0.5 text-xs font-medium rounded-md',
      sm: 'px-2.5 py-1 text-xs font-medium rounded-lg',
      md: 'px-3 py-1.5 text-sm font-semibold rounded-xl',
      lg: 'px-4 py-2 text-sm font-bold rounded-xl',
      xl: 'px-5 py-2.5 text-base font-bold rounded-2xl',
    };

    // Revolutionary glassmorphism variants
    const variantClasses = {
      primary:
        'bg-gradient-to-br from-blue-500/20 via-blue-400/15 to-blue-600/25 text-blue-200 border border-blue-400/40 shadow-lg shadow-blue-500/20',
      secondary:
        'bg-gradient-to-br from-purple-500/20 via-purple-400/15 to-purple-600/25 text-purple-200 border border-purple-400/40 shadow-lg shadow-purple-500/20',
      success:
        'bg-gradient-to-br from-emerald-500/20 via-emerald-400/15 to-emerald-600/25 text-emerald-200 border border-emerald-400/40 shadow-lg shadow-emerald-500/20',
      danger:
        'bg-gradient-to-br from-red-500/20 via-red-400/15 to-red-600/25 text-red-200 border border-red-400/40 shadow-lg shadow-red-500/20',
      warning:
        'bg-gradient-to-br from-amber-500/20 via-amber-400/15 to-amber-600/25 text-amber-200 border border-amber-400/40 shadow-lg shadow-amber-500/20',
      info: 'bg-gradient-to-br from-sky-500/20 via-sky-400/15 to-sky-600/25 text-sky-200 border border-sky-400/40 shadow-lg shadow-sky-500/20',
      neutral:
        'bg-gradient-to-br from-gray-500/20 via-gray-400/15 to-gray-600/25 text-gray-200 border border-gray-400/40 shadow-lg shadow-gray-500/20',
    };

    // Revolutionary pulse dot colors
    const pulseColors = {
      primary: 'bg-blue-400',
      secondary: 'bg-purple-400',
      success: 'bg-emerald-400',
      danger: 'bg-red-400',
      warning: 'bg-amber-400',
      info: 'bg-sky-400',
      neutral: 'bg-gray-400',
    };

    const commonClasses = clsx(
      // Revolutionary base styling
      'relative inline-flex items-center justify-center backdrop-blur-xl transition-all duration-300 ease-out',
      // Revolutionary size
      sizeClasses[size],
      // Revolutionary variant
      variantClasses[variant],
      // Revolutionary floating effects
      floating && 'hover:scale-105 hover:-translate-y-1 hover:shadow-xl',
      // Revolutionary interactive effects
      onClick && 'cursor-pointer active:scale-95 hover:brightness-110',
      className,
    );

    const badgeContent = (
      <>
        {/* Revolutionary floating accent dot */}
        {pulse && (
          <div
            className={clsx(
              'absolute -top-1 -right-1 w-2 h-2 rounded-full animate-pulse',
              pulseColors[variant],
            )}
          />
        )}

        {/* Revolutionary gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-[inherit] pointer-events-none" />

        {/* Content */}
        <span className="relative z-10 tracking-wide">{children}</span>
      </>
    );

    if (onClick) {
      return (
        <button
          ref={ref as React.ForwardedRef<HTMLButtonElement>}
          onClick={onClick}
          className={commonClasses}
          {...props}
        >
          {badgeContent}
        </button>
      );
    }

    return (
      <span
        ref={ref as React.ForwardedRef<HTMLSpanElement>}
        className={commonClasses}
        {...props}
      >
        {badgeContent}
      </span>
    );
  },
);

Badge.displayName = 'Badge';

export { Badge };
export type { BadgeProps };
