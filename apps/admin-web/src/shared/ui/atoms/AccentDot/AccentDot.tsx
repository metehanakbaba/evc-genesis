import React from 'react';
import { cn } from '../../utils';
import type { 
  BaseComponentProps, 
  VariantProps, 
  SizeProps, 
  AnimationProps,
  OpacityProps 
} from '../types';

/**
 * AccentDot Component Props
 * 
 * Small floating accent elements used for visual decoration
 */
export interface AccentDotProps 
  extends BaseComponentProps, 
          VariantProps, 
          SizeProps, 
          AnimationProps,
          OpacityProps {
  /** Position of the dot relative to its container */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  /** Custom positioning styles */
  style?: React.CSSProperties;
}

/**
 * Size mappings for AccentDot dimensions
 */
const sizeClasses = {
  xs: 'w-1 h-1',
  sm: 'w-2 h-2', 
  md: 'w-3 h-3',
  lg: 'w-4 h-4',
  xl: 'w-6 h-6',
} as const;

/**
 * Position mappings for AccentDot placement
 */
const positionClasses = {
  'top-left': 'top-2 left-2',
  'top-right': 'top-2 right-2',
  'bottom-left': 'bottom-2 left-2',
  'bottom-right': 'bottom-2 right-2',
  'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
} as const;

/**
 * Animation classes for AccentDot effects
 */
const animationClasses = {
  pulse: 'animate-pulse',
  ping: 'animate-ping',
  bounce: 'animate-bounce',
  spin: 'animate-spin',
} as const;

/**
 * AccentDot - Atomic component for small floating accent elements
 * 
 * Used as decorative elements to enhance visual hierarchy and add subtle animation.
 * Supports multiple variants, sizes, positions, and animation options.
 * 
 * @example
 * ```tsx
 * <AccentDot variant="blue" size="sm" position="top-right" animated />
 * <AccentDot variant="emerald" size="md" opacity={0.7} />
 * ```
 */
export const AccentDot: React.FC<AccentDotProps> = ({
  variant = 'blue',
  size = 'sm',
  position = 'top-right',
  animated = false,
  animationSpeed = 1,
  animationDelay = 0,
  opacity = 1,
  className,
  style,
  'data-testid': testId = 'accent-dot',
  ...props
}) => {
  // Build base classes
  const baseClasses = cn(
    // Base styling
    'absolute rounded-full pointer-events-none select-none z-10',
    
    // Size classes
    sizeClasses[size],
    
    // Position classes
    positionClasses[position],
    
    // Animation classes
    animated && animationClasses.pulse,
    
    // Custom className
    className
  );

  // Build background color based on variant
  const getBackgroundColor = () => {
    const variantColors = {
      blue: 'rgb(59, 130, 246)', // blue-500
      emerald: 'rgb(16, 185, 129)', // emerald-500
      purple: 'rgb(139, 92, 246)', // purple-500
      teal: 'rgb(20, 184, 166)', // teal-500
    };
    
    return variantColors[variant];
  };

  // Animation style with custom speed and delay
  const animationStyle = animated ? {
    animationDuration: `${2000 / animationSpeed}ms`,
    animationDelay: `${animationDelay}ms`,
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
  } : {};

  // Combined styles
  const combinedStyle = {
    backgroundColor: getBackgroundColor(),
    opacity,
    boxShadow: `0 0 ${size === 'xs' ? '4px' : size === 'sm' ? '6px' : size === 'md' ? '8px' : size === 'lg' ? '10px' : '12px'} ${getBackgroundColor()}40`,
    ...animationStyle,
    ...style,
  };

  return (
    <div
      className={baseClasses}
      style={combinedStyle}
      data-testid={testId}
      data-variant={variant}
      data-size={size}
      data-position={position}
      data-animated={animated}
      {...props}
    />
  );
};

AccentDot.displayName = 'AccentDot';