import { Switch as HeadlessSwitch } from '@headlessui/react';
import { clsx } from 'clsx';
import { forwardRef } from 'react';

interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  description?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  switchClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  errorClassName?: string;
  /** Revolutionary variant colors */
  variant?: 'primary' | 'success' | 'warning' | 'danger';
  /** Revolutionary floating effect */
  floating?: boolean;
}

const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked,
      defaultChecked,
      onChange,
      disabled = false,
      label,
      description,
      error,
      size = 'md',
      className,
      switchClassName,
      labelClassName,
      descriptionClassName,
      errorClassName,
      variant = 'primary',
      floating = false,
      ...props
    },
    ref,
  ) => {
    // Revolutionary size system with floating effects
    const sizeClasses = {
      sm: {
        switch: 'h-5 w-10',
        thumb: 'w-3 h-3',
        padding: 'p-0.5',
      },
      md: {
        switch: 'h-7 w-14',
        thumb: 'w-5 h-5',
        padding: 'p-1',
      },
      lg: {
        switch: 'h-9 w-18',
        thumb: 'w-7 h-7',
        padding: 'p-1',
      },
    };

    // Revolutionary translate distances
    const translateClasses = {
      sm: 'group-data-[checked]:translate-x-5',
      md: 'group-data-[checked]:translate-x-7',
      lg: 'group-data-[checked]:translate-x-9',
    };

    // Revolutionary variant colors with glassmorphism
    const variantClasses = {
      primary: {
        unchecked: 'bg-gray-700/60',
        checked:
          'data-[checked]:bg-gradient-to-r data-[checked]:from-blue-500/80 data-[checked]:to-blue-600/80',
        thumb: 'bg-white shadow-lg shadow-blue-500/20',
        glow: 'shadow-blue-500/30',
      },
      success: {
        unchecked: 'bg-gray-700/60',
        checked:
          'data-[checked]:bg-gradient-to-r data-[checked]:from-emerald-500/80 data-[checked]:to-emerald-600/80',
        thumb: 'bg-white shadow-lg shadow-emerald-500/20',
        glow: 'shadow-emerald-500/30',
      },
      warning: {
        unchecked: 'bg-gray-700/60',
        checked:
          'data-[checked]:bg-gradient-to-r data-[checked]:from-amber-500/80 data-[checked]:to-amber-600/80',
        thumb: 'bg-white shadow-lg shadow-amber-500/20',
        glow: 'shadow-amber-500/30',
      },
      danger: {
        unchecked: 'bg-gray-700/60',
        checked:
          'data-[checked]:bg-gradient-to-r data-[checked]:from-red-500/80 data-[checked]:to-red-600/80',
        thumb: 'bg-white shadow-lg shadow-red-500/20',
        glow: 'shadow-red-500/30',
      },
    };

    const switchClasses = clsx(
      // Revolutionary base styles
      'group relative inline-flex cursor-pointer rounded-full transition-all duration-300 ease-out',
      // Revolutionary glassmorphism
      'backdrop-blur-xl border border-gray-600/40',
      // Revolutionary size
      sizeClasses[size].switch,
      sizeClasses[size].padding,
      // Revolutionary variant colors
      variantClasses[variant].unchecked,
      variantClasses[variant].checked,
      // Revolutionary floating effects
      floating && 'hover:scale-105 hover:-translate-y-0.5',
      // Revolutionary glow effect when checked
      'data-[checked]:shadow-xl',
      checked && variantClasses[variant].glow,
      // Revolutionary focus states
      'focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-gray-900',
      // Error state
      error && 'border-red-400/60 focus:ring-red-400/30',
      // Disabled state
      disabled &&
        'opacity-50 cursor-not-allowed hover:scale-100 hover:translate-y-0',
      switchClassName,
    );

    const switchProps = {
      ref,
      disabled,
      className: switchClasses,
      ...(checked !== undefined && { checked }),
      ...(defaultChecked !== undefined && { defaultChecked }),
      ...(onChange && { onChange }),
      ...props,
    };

    const content = (
      <div className="relative">
        <HeadlessSwitch {...switchProps}>
          <span
            aria-hidden="true"
            className={clsx(
              // Revolutionary thumb styling
              'pointer-events-none inline-block rounded-full transition-all duration-300 ease-out',
              // Revolutionary size
              sizeClasses[size].thumb,
              // Revolutionary colors and shadows
              variantClasses[variant].thumb,
              // Revolutionary transform
              'translate-x-0',
              translateClasses[size],
              // Revolutionary scaling on checked
              'group-data-[checked]:scale-110',
            )}
          />

          {/* Revolutionary gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full pointer-events-none" />
        </HeadlessSwitch>

        {/* Revolutionary floating accent dot */}
        {!disabled && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-white/60 to-white/30 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
      </div>
    );

    if (!label && !description && !error) {
      return content;
    }

    return (
      <div className={clsx('flex items-center justify-between', className)}>
        <div className="flex-1 min-w-0">
          {label && (
            <label
              className={clsx(
                'text-sm font-medium text-gray-300 block mb-1',
                labelClassName,
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <p
              className={clsx('text-sm text-gray-400/80', descriptionClassName)}
            >
              {description}
            </p>
          )}
          {error && (
            <p className={clsx('mt-1 text-sm text-red-400/80', errorClassName)}>
              {error}
            </p>
          )}
        </div>
        <div className="ml-6 shrink-0">{content}</div>
      </div>
    );
  },
);

Switch.displayName = 'Switch';

export { Switch };
export type { SwitchProps };
