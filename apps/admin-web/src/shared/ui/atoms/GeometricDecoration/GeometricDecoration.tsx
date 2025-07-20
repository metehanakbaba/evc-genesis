import React from 'react';
import { cn } from '../../utils';
import type { 
  BaseComponentProps, 
  VariantProps, 
  SizeProps, 
  AnimationProps,
  PositionProps 
} from '../types';

/**
 * GeometricDecoration Component Props
 * 
 * Geometric decoration elements (circles, borders, lines) for visual enhancement
 */
export interface GeometricDecorationProps 
  extends BaseComponentProps, 
          VariantProps, 
          SizeProps, 
          AnimationProps,
          PositionProps {
  /** Type of geometric decoration shape */
  shape?: 'circle' | 'ring' | 'line' | 'arc' | 'dots';
  /** Pattern variant for the decoration */
  pattern?: 'solid' | 'dashed' | 'dotted' | 'gradient';
  /** Thickness of the decoration */
  thickness?: 'thin' | 'medium' | 'thick';
  /** Custom positioning styles */
  style?: React.CSSProperties;
}

/**
 * Size mappings for GeometricDecoration dimensions
 */
const sizeClasses = {
  xs: 'w-4 h-4',
  sm: 'w-8 h-8', 
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24',
} as const;

/**
 * Position mappings for GeometricDecoration placement
 */
const positionClasses = {
  'top-left': 'top-4 left-4',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
} as const;

/**
 * Thickness mappings for decoration elements
 */
const thicknessClasses = {
  thin: 'border',
  medium: 'border-2',
  thick: 'border-4',
} as const;

/**
 * Pattern mappings for decoration styles
 */
const patternClasses = {
  solid: '',
  dashed: 'border-dashed',
  dotted: 'border-dotted',
  gradient: '', // Handled via CSS
} as const;

/**
 * GeometricDecoration - Atomic component for geometric visual elements
 * 
 * Used to add geometric patterns and decorative elements to enhance visual hierarchy.
 * Supports multiple shapes, patterns, and positioning options.
 * 
 * @example
 * ```tsx
 * <GeometricDecoration shape="circle" size="md" position="top-right" />
 * <GeometricDecoration shape="line" pattern="dashed" thickness="medium" />
 * ```
 */
export const GeometricDecoration: React.FC<GeometricDecorationProps> = ({
  variant = 'blue',
  shape = 'circle',
  size = 'md',
  pattern = 'solid',
  thickness = 'medium',
  position = 'top-right',
  animated = false,
  animationSpeed = 1,
  animationDelay = 0,
  className,
  style,
  'data-testid': testId = 'geometric-decoration',
  ...props
}) => {
  // Get variant colors
  const getVariantColor = () => {
    const variantColors = {
      blue: 'border-blue-400/30',
      emerald: 'border-emerald-400/30',
      purple: 'border-purple-400/30',
      teal: 'border-teal-400/30',
    };
    
    return variantColors[variant];
  };

  // Build base classes based on decoration type
  const getDecorationClasses = () => {
    const baseClasses = cn(
      'absolute pointer-events-none select-none',
      sizeClasses[size],
      positionClasses[position],
      getVariantColor(),
      thicknessClasses[thickness],
      patternClasses[pattern],
      animated && 'animate-pulse',
      className
    );

    switch (shape) {
      case 'circle':
        return cn(baseClasses, 'rounded-full');
      
      case 'ring':
        return cn(baseClasses, 'rounded-full bg-transparent');
      
      case 'line':
        return cn(
          'absolute pointer-events-none select-none',
          'w-16 h-0', // Horizontal line by default
          positionClasses[position],
          getVariantColor(),
          thicknessClasses[thickness],
          patternClasses[pattern],
          animated && 'animate-pulse',
          className
        );
      
      case 'arc':
        return cn(
          baseClasses,
          'rounded-full',
          'border-t-transparent border-r-transparent' // Creates arc effect
        );
      
      case 'dots':
        return cn(
          'absolute pointer-events-none select-none flex gap-1',
          positionClasses[position],
          animated && 'animate-pulse',
          className
        );
      
      default:
        return baseClasses;
    }
  };

  // Animation style with custom speed and delay
  const animationStyle = animated ? {
    animationDuration: `${2000 / animationSpeed}ms`,
    animationDelay: `${animationDelay}ms`,
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
  } : {};

  // Handle gradient pattern
  const getGradientStyle = () => {
    if (pattern === 'gradient') {
      return {
        background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.3) 0%, transparent 50%, rgba(59, 130, 246, 0.3) 100%)',
        border: 'none',
      };
    }
    return {};
  };

  // Combined styles
  const combinedStyle = {
    ...getGradientStyle(),
    ...animationStyle,
    ...style,
  };

  // Render dots pattern
  if (shape === 'dots') {
    const dotCount = size === 'xs' ? 2 : size === 'sm' ? 3 : size === 'md' ? 4 : size === 'lg' ? 5 : 6;
    const dotSize = size === 'xs' ? 'w-1 h-1' : size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2';
    
    return (
      <div
        className={getDecorationClasses()}
        style={combinedStyle}
        data-testid={testId}
        data-variant={variant}
        data-shape={shape}
        data-size={size}
        data-pattern={pattern}
        data-position={position}
        data-animated={animated}
        {...props}
      >
        {Array.from({ length: dotCount }).map((_, index) => (
          <div
            key={index}
            className={cn(
              'rounded-full bg-blue-400/30',
              dotSize
            )}
          />
        ))}
      </div>
    );
  }

  // Render other decoration types
  return (
    <div
      className={getDecorationClasses()}
      style={combinedStyle}
      data-testid={testId}
      data-variant={variant}
      data-shape={shape}
      data-size={size}
      data-pattern={pattern}
      data-thickness={thickness}
      data-position={position}
      data-animated={animated}
      {...props}
    />
  );
};

GeometricDecoration.displayName = 'GeometricDecoration';