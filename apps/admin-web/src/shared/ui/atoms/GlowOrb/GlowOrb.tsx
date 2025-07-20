import React from 'react';
import { cn } from '../../utils/class-utils';

import type { 
  BaseComponentProps, 
  VariantProps, 
  SizeProps, 
  AnimationProps,
  IntensityProps,
  BlurProps 
} from '../types';

/**
 * GlowOrb Component Props
 * 
 * Animated gradient orbs used for background effects and visual enhancement
 */
export interface GlowOrbProps 
  extends BaseComponentProps, 
          VariantProps, 
          SizeProps, 
          AnimationProps,
          IntensityProps,
          BlurProps {
  /** Position of the orb in the layout */
  position?: 'background' | 'foreground';
  /** Custom positioning styles */
  style?: React.CSSProperties;
}

/**
 * Size mappings for GlowOrb dimensions
 */
const sizeClasses = {
  xs: 'w-8 h-8',
  sm: 'w-16 h-16', 
  md: 'w-24 h-24',
  lg: 'w-32 h-32',
  xl: 'w-48 h-48',
} as const;

/**
 * Blur effect mappings
 */
const blurClasses = {
  sm: 'blur-sm',
  md: 'blur-md', 
  lg: 'blur-lg',
  xl: 'blur-xl',
} as const;

/**
 * Animation keyframes for floating effect
 */
const animationClasses = {
  float: 'animate-pulse',
  slow: 'animate-bounce',
  normal: 'animate-pulse',
  fast: 'animate-ping',
} as const;

/**
 * GlowOrb - Atomic component for animated gradient orbs
 * 
 * Used as background decoration and visual effects throughout the application.
 * Supports multiple variants, sizes, and animation options.
 * 
 * @example
 * ```tsx
 * <GlowOrb variant="blue" size="lg" animated />
 * <GlowOrb variant="emerald" size="md" intensity="strong" blur="lg" />
 * ```
 */
export const GlowOrb: React.FC<GlowOrbProps> = ({
  variant = 'blue',
  size = 'md',
  animated = false,
  animationSpeed = 1,
  animationDelay = 0,
  intensity = 'medium',
  blur = 'md',
  position = 'background',
  className,
  style,
  'data-testid': testId = 'glow-orb',
  ...props
}) => {
  // Note: atomicTokens.variants[variant] available for future enhancements
  
  // Build base classes
  const baseClasses = cn(
    // Base styling
    'absolute rounded-full pointer-events-none select-none',
    
    // Size classes
    sizeClasses[size],
    
    // Blur effect
    blurClasses[blur],
    
    // Position-based z-index
    position === 'background' ? 'z-0' : 'z-10',
    
    // Animation classes
    animated && animationClasses.normal,
    
    // Custom className
    className
  );

  // Build background gradient based on variant and intensity
  const getBackgroundGradient = () => {
    const opacityMap = {
      subtle: '0.1',
      medium: '0.25', 
      strong: '0.5',
    };
    
    const opacity = opacityMap[intensity];
    
    // Use Tailwind color classes instead of CSS variables for better compatibility
    const gradientColors = {
      blue: `radial-gradient(circle, rgba(59, 130, 246, ${opacity}) 0%, transparent 70%)`,
      emerald: `radial-gradient(circle, rgba(16, 185, 129, ${opacity}) 0%, transparent 70%)`,
      purple: `radial-gradient(circle, rgba(139, 92, 246, ${opacity}) 0%, transparent 70%)`,
      teal: `radial-gradient(circle, rgba(20, 184, 166, ${opacity}) 0%, transparent 70%)`,
    };
    
    return {
      background: gradientColors[variant],
      ...style,
    };
  };

  // Animation style with custom speed and delay
  const animationStyle = animated ? {
    animationDuration: `${2000 / animationSpeed}ms`,
    animationDelay: `${animationDelay}ms`,
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
  } : {};

  return (
    <div
      className={baseClasses}
      style={{
        ...getBackgroundGradient(),
        ...animationStyle,
      }}
      data-testid={testId}
      data-variant={variant}
      data-size={size}
      data-animated={animated}
      {...props}
    />
  );
};

GlowOrb.displayName = 'GlowOrb';