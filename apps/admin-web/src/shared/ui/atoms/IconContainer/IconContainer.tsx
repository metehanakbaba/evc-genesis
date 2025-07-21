import type React from 'react';
import { cn } from '../../utils';
import type {
  BaseComponentProps,
  HoverProps,
  SizeProps,
  VariantProps,
} from '../types';

/**
 * IconContainer Component Props
 *
 * Standardized icon wrapper with variants and hover effects
 */
export interface IconContainerProps
  extends BaseComponentProps,
    VariantProps,
    SizeProps,
    HoverProps {
  /** Icon component to render */
  icon: React.ComponentType<{ className?: string }>;
  /** Enable glow effect */
  glowEffect?: boolean;
  /** Custom icon className */
  iconClassName?: string;
  /** Click handler */
  onClick?: () => void;
  /** Disabled state */
  disabled?: boolean;
}

/**
 * Size mappings for IconContainer dimensions
 */
const sizeClasses = {
  xs: 'w-6 h-6 p-1',
  sm: 'w-8 h-8 p-1.5',
  md: 'w-10 h-10 p-2',
  lg: 'w-12 h-12 p-2.5',
  xl: 'w-16 h-16 p-3',
} as const;

/**
 * Icon size mappings based on container size
 */
const iconSizeClasses = {
  xs: 'w-4 h-4',
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-7 h-7',
  xl: 'w-10 h-10',
} as const;

/**
 * IconContainer - Atomic component for standardized icon display
 *
 * Provides consistent styling, sizing, and interactive states for icons.
 * Supports variants, hover effects, and glow effects.
 *
 * @example
 * ```tsx
 * <IconContainer icon={UserIcon} variant="blue" size="md" glowEffect />
 * <IconContainer icon={SettingsIcon} variant="emerald" hoverScale />
 * ```
 */
export const IconContainer: React.FC<IconContainerProps> = ({
  icon: Icon,
  variant = 'blue',
  size = 'md',
  glowEffect = false,
  hoverScale = false,
  hoverGlow = false,
  iconClassName,
  onClick,
  disabled = false,
  className,
  'data-testid': testId = 'icon-container',
  ...props
}) => {
  // Determine if component is interactive
  const isInteractive = Boolean(onClick && !disabled);

  // Build base classes
  const baseClasses = cn(
    // Base styling
    'relative inline-flex items-center justify-center rounded-lg transition-all duration-200',

    // Size classes
    sizeClasses[size],

    // Interactive states
    isInteractive && 'cursor-pointer',
    disabled && 'cursor-not-allowed opacity-50',

    // Hover effects
    hoverScale && !disabled && 'hover:scale-110 active:scale-95',
    hoverGlow && !disabled && 'hover:shadow-lg',

    // Custom className
    className,
  );

  // Build icon classes
  const iconClasses = cn(
    // Base icon styling
    'transition-all duration-200',

    // Size classes
    iconSizeClasses[size],

    // Custom icon className
    iconClassName,
  );

  // Get variant colors
  const getVariantStyles = () => {
    const variantStyles = {
      blue: {
        background: 'bg-blue-500/10',
        border: 'border border-blue-400/20',
        text: 'text-blue-400',
        hover: 'hover:bg-blue-500/20 hover:border-blue-400/40',
        glow: glowEffect ? 'shadow-lg shadow-blue-500/20' : '',
      },
      emerald: {
        background: 'bg-emerald-500/10',
        border: 'border border-emerald-400/20',
        text: 'text-emerald-400',
        hover: 'hover:bg-emerald-500/20 hover:border-emerald-400/40',
        glow: glowEffect ? 'shadow-lg shadow-emerald-500/20' : '',
      },
      purple: {
        background: 'bg-purple-500/10',
        border: 'border border-purple-400/20',
        text: 'text-purple-400',
        hover: 'hover:bg-purple-500/20 hover:border-purple-400/40',
        glow: glowEffect ? 'shadow-lg shadow-purple-500/20' : '',
      },
      teal: {
        background: 'bg-teal-500/10',
        border: 'border border-teal-400/20',
        text: 'text-teal-400',
        hover: 'hover:bg-teal-500/20 hover:border-teal-400/40',
        glow: glowEffect ? 'shadow-lg shadow-teal-500/20' : '',
      },
    };

    return variantStyles[variant];
  };

  const variantStyles = getVariantStyles();

  // Combine all classes
  const containerClasses = cn(
    baseClasses,
    variantStyles.background,
    variantStyles.border,
    variantStyles.glow,
    !disabled && isInteractive && variantStyles.hover,
  );

  const finalIconClasses = cn(iconClasses, variantStyles.text);

  // Handle click
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <div
      className={containerClasses}
      onClick={handleClick}
      data-testid={testId}
      data-variant={variant}
      data-size={size}
      data-interactive={isInteractive}
      data-disabled={disabled}
      data-glow-effect={glowEffect}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={
        isInteractive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick();
              }
            }
          : undefined
      }
      {...props}
    >
      <Icon className={finalIconClasses} />
    </div>
  );
};

IconContainer.displayName = 'IconContainer';
