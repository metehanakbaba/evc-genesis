import { Button as HeadlessButton } from '@headlessui/react';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import {
  getComponentSize,
  type ComponentSize,
} from '../../../theme/theme.config';

interface ButtonProps {
  children?: React.ReactNode;
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'info'
    | 'danger'
    | 'ghost';
  styleType?: 'solid' | 'outline' | 'ghost';
  size?: ComponentSize;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
  /** Icon to display (should be a React component) */
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** Icon position relative to text */
  iconPosition?: 'left' | 'right';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      styleType = 'solid',
      size = 'md',
      disabled = false,
      loading = false,
      type = 'button',
      onClick,
      className,
      icon: Icon,
      iconPosition = 'left',
      ...props
    },
    ref,
  ) => {
    // Revolutionary design - floating card sizes
    const sizeClasses = {
      xs: 'px-3 py-1.5 text-xs rounded-lg min-h-[28px]',
      sm: 'px-4 py-2 text-sm rounded-lg min-h-[32px]',
      md: 'px-6 py-3 text-sm rounded-xl min-h-[40px]',
      lg: 'px-8 py-4 text-base rounded-xl min-h-[48px]',
      xl: 'px-10 py-5 text-lg rounded-2xl min-h-[56px]',
    };

    // Icon sizes for different button sizes
    const iconSizeClasses = {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-4 h-4',
      lg: 'w-5 h-5',
      xl: 'w-6 h-6',
    };

    // Revolutionary floating glassmorphism design
    const variantClasses = {
      primary: {
        solid:
          'bg-gradient-to-br from-blue-500/20 via-blue-400/15 to-blue-600/25 backdrop-blur-xl border border-blue-400/30 text-white shadow-2xl hover:shadow-blue-500/25 hover:scale-105 hover:-translate-y-1 transition-all duration-500 ease-out',
        outline:
          'bg-gray-800/30 backdrop-blur-xl border border-blue-400/40 text-blue-300 hover:bg-blue-500/10 hover:border-blue-300/60 hover:scale-[1.02] transition-all duration-300',
        ghost:
          'bg-transparent text-blue-400 hover:bg-blue-500/10 hover:backdrop-blur-sm rounded-xl transition-all duration-300',
      },
      secondary: {
        solid:
          'bg-gradient-to-br from-gray-700/50 via-gray-600/40 to-gray-800/60 backdrop-blur-xl border border-gray-600/40 text-white shadow-2xl hover:shadow-gray-500/20 hover:scale-105 hover:-translate-y-1 transition-all duration-500 ease-out',
        outline:
          'bg-gray-800/30 backdrop-blur-xl border border-gray-600/40 text-gray-300 hover:bg-gray-700/30 hover:border-gray-500/60 hover:scale-[1.02] transition-all duration-300',
        ghost:
          'bg-transparent text-gray-300 hover:bg-gray-700/20 hover:backdrop-blur-sm rounded-xl transition-all duration-300',
      },
      success: {
        solid:
          'bg-gradient-to-br from-emerald-500/20 via-emerald-400/15 to-emerald-600/25 backdrop-blur-xl border border-emerald-400/30 text-white shadow-2xl hover:shadow-emerald-500/25 hover:scale-105 hover:-translate-y-1 transition-all duration-500 ease-out',
        outline:
          'bg-gray-800/30 backdrop-blur-xl border border-emerald-400/40 text-emerald-300 hover:bg-emerald-500/10 hover:border-emerald-300/60 hover:scale-[1.02] transition-all duration-300',
        ghost:
          'bg-transparent text-emerald-400 hover:bg-emerald-500/10 hover:backdrop-blur-sm rounded-xl transition-all duration-300',
      },
      warning: {
        solid:
          'bg-gradient-to-br from-amber-500/20 via-amber-400/15 to-amber-600/25 backdrop-blur-xl border border-amber-400/30 text-white shadow-2xl hover:shadow-amber-500/25 hover:scale-105 hover:-translate-y-1 transition-all duration-500 ease-out',
        outline:
          'bg-gray-800/30 backdrop-blur-xl border border-amber-400/40 text-amber-300 hover:bg-amber-500/10 hover:border-amber-300/60 hover:scale-[1.02] transition-all duration-300',
        ghost:
          'bg-transparent text-amber-400 hover:bg-amber-500/10 hover:backdrop-blur-sm rounded-xl transition-all duration-300',
      },
      info: {
        solid:
          'bg-gradient-to-br from-sky-500/20 via-sky-400/15 to-sky-600/25 backdrop-blur-xl border border-sky-400/30 text-white shadow-2xl hover:shadow-sky-500/25 hover:scale-105 hover:-translate-y-1 transition-all duration-500 ease-out',
        outline:
          'bg-gray-800/30 backdrop-blur-xl border border-sky-400/40 text-sky-300 hover:bg-sky-500/10 hover:border-sky-300/60 hover:scale-[1.02] transition-all duration-300',
        ghost:
          'bg-transparent text-sky-400 hover:bg-sky-500/10 hover:backdrop-blur-sm rounded-xl transition-all duration-300',
      },
      danger: {
        solid:
          'bg-gradient-to-br from-red-500/20 via-red-400/15 to-red-600/25 backdrop-blur-xl border border-red-400/30 text-white shadow-2xl hover:shadow-red-500/25 hover:scale-105 hover:-translate-y-1 transition-all duration-500 ease-out',
        outline:
          'bg-gray-800/30 backdrop-blur-xl border border-red-400/40 text-red-300 hover:bg-red-500/10 hover:border-red-300/60 hover:scale-[1.02] transition-all duration-300',
        ghost:
          'bg-transparent text-red-400 hover:bg-red-500/10 hover:backdrop-blur-sm rounded-xl transition-all duration-300',
      },
      ghost: {
        solid:
          'bg-gradient-to-br from-gray-700/30 via-gray-600/20 to-gray-800/40 backdrop-blur-xl border border-gray-600/25 text-gray-300 shadow-2xl hover:shadow-gray-500/15 hover:scale-105 hover:-translate-y-1 transition-all duration-500 ease-out',
        outline:
          'bg-gray-800/30 backdrop-blur-xl border border-gray-600/40 text-gray-300 hover:bg-gray-700/30 hover:border-gray-500/60 hover:scale-[1.02] transition-all duration-300',
        ghost:
          'bg-transparent text-gray-300 hover:bg-gray-700/20 hover:backdrop-blur-sm rounded-xl transition-all duration-300',
      },
    };

    return (
      <HeadlessButton
        ref={ref}
        type={type}
        disabled={disabled || loading}
        onClick={onClick}
        className={clsx(
          'relative group font-medium transition-all duration-500 ease-out',
          // Revolutionary floating effects
          'active:scale-95 active:transition-transform active:duration-150',
          // Disabled state with opacity
          disabled &&
            'opacity-50 cursor-not-allowed hover:scale-100 hover:translate-y-0',
          // Size classes
          sizeClasses[size],
          // Variant classes
          variantClasses[variant][styleType],
          className,
        )}
        {...props}
      >
        {/* Revolutionary floating accent dots for solid buttons */}
        {styleType === 'solid' && !disabled && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-white/40 to-white/20 rounded-full animate-pulse opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
        )}

        {/* Content with proper icon and text alignment */}
        <div className="relative z-10 flex items-center justify-center gap-2">
          {loading && (
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          )}

          {/* Icon on the left */}
          {Icon && iconPosition === 'left' && !loading && (
            <Icon className={clsx(iconSizeClasses[size], 'shrink-0')} />
          )}

          {/* Text content */}
          {children && (
            <span className="whitespace-nowrap font-medium">{children}</span>
          )}

          {/* Icon on the right */}
          {Icon && iconPosition === 'right' && !loading && (
            <Icon className={clsx(iconSizeClasses[size], 'shrink-0')} />
          )}
        </div>

        {/* Revolutionary floating gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[inherit]" />
      </HeadlessButton>
    );
  },
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
