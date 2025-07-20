import React from 'react';
import { cn } from '../../utils';
import type { 
  BaseComponentProps, 
  VariantProps, 
  SizeProps 
} from '../types';

/**
 * TextElement Component Props
 * 
 * Typography atoms with size and color variants
 */
export interface TextElementProps 
  extends BaseComponentProps, 
          VariantProps, 
          SizeProps {
  /** HTML element to render */
  as?: 'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label';
  /** Font weight variant */
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  /** Text alignment */
  align?: 'left' | 'center' | 'right' | 'justify';
  /** Enable text truncation */
  truncate?: boolean;
  /** Maximum number of lines before truncation */
  lines?: number;
  /** Text opacity */
  opacity?: 'low' | 'medium' | 'high' | 'full';
  /** Text content */
  children: React.ReactNode;
  /** HTML for attribute (when as="label") */
  htmlFor?: string;
}

/**
 * Size mappings for TextElement typography
 */
const sizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm', 
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
} as const;

/**
 * Weight mappings for font weights
 */
const weightClasses = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
} as const;

/**
 * Alignment mappings for text alignment
 */
const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
} as const;

/**
 * Opacity mappings for text opacity
 */
const opacityClasses = {
  low: 'opacity-40',
  medium: 'opacity-60',
  high: 'opacity-80',
  full: 'opacity-100',
} as const;

/**
 * TextElement - Atomic component for typography
 * 
 * Provides consistent typography styling with variants, sizes, and responsive behavior.
 * Supports truncation, alignment, and semantic HTML elements.
 * 
 * @example
 * ```tsx
 * <TextElement variant="blue" size="lg" weight="semibold">Title Text</TextElement>
 * <TextElement as="p" truncate lines={2}>Long paragraph text...</TextElement>
 * ```
 */
export const TextElement: React.FC<TextElementProps> = ({
  as: Component = 'span',
  variant = 'blue',
  size = 'md',
  weight = 'normal',
  align = 'left',
  truncate = false,
  lines,
  opacity = 'full',
  className,
  children,
  'data-testid': testId = 'text-element',
  ...props
}) => {
  // Get variant colors
  const getVariantColor = () => {
    const variantColors = {
      blue: 'text-blue-200',
      emerald: 'text-emerald-200',
      purple: 'text-purple-200',
      teal: 'text-teal-200',
    };
    
    return variantColors[variant];
  };

  // Build truncation classes
  const getTruncationClasses = () => {
    if (!truncate) return '';
    
    if (lines && lines > 1) {
      // Multi-line truncation using line-clamp
      return `line-clamp-${lines}`;
    }
    
    // Single line truncation
    return 'truncate';
  };

  // Build base classes
  const baseClasses = cn(
    // Base typography styling
    'transition-colors duration-200',
    
    // Size classes
    sizeClasses[size],
    
    // Weight classes
    weightClasses[weight],
    
    // Alignment classes
    alignClasses[align],
    
    // Color classes
    getVariantColor(),
    
    // Opacity classes
    opacityClasses[opacity],
    
    // Truncation classes
    getTruncationClasses(),
    
    // Custom className
    className
  );

  return (
    <Component
      className={baseClasses}
      data-testid={testId}
      data-variant={variant}
      data-size={size}
      data-weight={weight}
      data-align={align}
      data-truncate={truncate}
      data-lines={lines}
      data-opacity={opacity}
      {...props}
    >
      {children}
    </Component>
  );
};

TextElement.displayName = 'TextElement';