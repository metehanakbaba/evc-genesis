'use client';

import type React from 'react';
import { AccentDot } from '../../atoms/AccentDot';
import { TextElement } from '../../atoms/TextElement';
import { BackgroundEffects } from '../../molecules/BackgroundEffects';
import { cn } from '../../utils';
import type { CardOrganismProps } from '../types';

/**
 * Card Component Props
 *
 * Unified Card organism component that replaces all duplicate card implementations
 * while maintaining all existing variants and functionality. Composes atoms and
 * molecules to create a flexible, reusable card system.
 */
export interface CardProps extends Omit<CardOrganismProps, 'variant'> {
  /** Card visual variant */
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'glass'
    | 'stat'
    | 'management';
  /** Card size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Floating effect intensity */
  floating?: 'none' | 'subtle' | 'medium' | 'strong';
  /** Show floating accent dot */
  showAccent?: boolean;
  /** Enable hover animations */
  animated?: boolean;
  /** Enable background effects */
  backgroundEffects?: boolean;
  /** Background effects variant */
  effectsVariant?: 'blue' | 'emerald' | 'purple' | 'teal';
  /** Fixed height behavior */
  heightMode?: 'auto' | 'fixed' | 'fill';
  /** Custom min height */
  minHeight?: string;
  /** Custom max height */
  maxHeight?: string;
  /** Enable scrollable content */
  scrollable?: boolean;
}

/**
 * Card variant styling configurations
 */
const variantStyles = {
  default: {
    background:
      'bg-gradient-to-br from-gray-800/40 via-gray-700/30 to-gray-900/50',
    border: 'border-gray-600/30',
    accent: 'blue',
  },
  primary: {
    background:
      'bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-blue-600/15',
    border: 'border-blue-400/25',
    accent: 'blue',
  },
  secondary: {
    background:
      'bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-purple-600/15',
    border: 'border-purple-400/25',
    accent: 'purple',
  },
  success: {
    background:
      'bg-gradient-to-br from-emerald-500/10 via-emerald-400/5 to-emerald-600/15',
    border: 'border-emerald-400/25',
    accent: 'emerald',
  },
  warning: {
    background:
      'bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-amber-600/15',
    border: 'border-amber-400/25',
    accent: 'teal',
  },
  danger: {
    background: 'bg-gradient-to-br from-red-500/10 via-red-400/5 to-red-600/15',
    border: 'border-red-400/25',
    accent: 'purple',
  },
  glass: {
    background: 'bg-gray-900/20',
    border: 'border-white/10',
    accent: 'blue',
  },
  stat: {
    background:
      'bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-blue-600/15',
    border: 'border-blue-400/25',
    accent: 'blue',
  },
  management: {
    background:
      'bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-purple-600/15',
    border: 'border-purple-400/25',
    accent: 'purple',
  },
} as const;

/**
 * Size configurations
 */
const sizeStyles = {
  xs: {
    padding: 'p-3',
    borderRadius: 'rounded-lg',
    minHeight: '120px',
    maxHeight: '160px',
  },
  sm: {
    padding: 'p-4',
    borderRadius: 'rounded-lg',
    minHeight: '160px',
    maxHeight: '200px',
  },
  md: {
    padding: 'p-6',
    borderRadius: 'rounded-xl',
    minHeight: '200px',
    maxHeight: '240px',
  },
  lg: {
    padding: 'p-8',
    borderRadius: 'rounded-2xl',
    minHeight: '280px',
    maxHeight: '320px',
  },
  xl: {
    padding: 'p-10',
    borderRadius: 'rounded-3xl',
    minHeight: '320px',
    maxHeight: '380px',
  },
} as const;

/**
 * Floating effect configurations
 */
const floatingStyles = {
  none: '',
  subtle: 'hover:scale-[1.01] hover:-translate-y-0.5',
  medium: 'hover:scale-[1.02] hover:-translate-y-1',
  strong: 'hover:scale-105 hover:-translate-y-2',
} as const;

/**
 * Card - Unified organism component for all card types
 *
 * Replaces all duplicate card implementations with a single, flexible
 * component that composes atoms and molecules. Supports all existing
 * variants while providing enhanced functionality through atomic design.
 *
 * Features:
 * - Multiple visual variants (default, primary, secondary, etc.)
 * - Flexible sizing system
 * - Floating effects and animations
 * - Background effects using BackgroundEffects molecule
 * - Accent dots using AccentDot atoms
 * - Fixed height modes for consistent layouts
 * - Scrollable content support
 * - Full accessibility support
 *
 * @example
 * ```tsx
 * <Card variant="primary" size="md" animated>
 *   <Card.Header title="Card Title" description="Card description" />
 *   <Card.Body>Card content goes here</Card.Body>
 *   <Card.Footer>Footer content</Card.Footer>
 * </Card>
 *
 * <Card
 *   variant="stat"
 *   heightMode="fixed"
 *   backgroundEffects
 *   showAccent
 * >
 *   Statistical content
 * </Card>
 * ```
 */
export const CardComponent: React.FC<CardProps> = ({
  variant = 'default',
  size = 'md',
  floating = 'medium',
  showAccent = true,
  animated = true,
  backgroundEffects = false,
  effectsVariant,
  heightMode = 'auto',
  minHeight,
  maxHeight,
  scrollable = false,
  interactive = false,
  onClick,
  className,
  children,
  'data-testid': testId = 'card',
  ...props
}) => {
  // Get style configurations with fallbacks
  const variantConfig = variantStyles[variant] || variantStyles.default;
  const sizeConfig = sizeStyles[size] || sizeStyles.md;
  const effectiveAccentVariant = effectsVariant || variantConfig.accent;

  // Determine if card is interactive
  const isInteractive = interactive || Boolean(onClick);

  // Build height styles
  const getHeightStyles = () => {
    const styles: React.CSSProperties = {};

    if (heightMode === 'fixed') {
      styles.minHeight = minHeight || sizeConfig.minHeight;
      styles.maxHeight = maxHeight || sizeConfig.maxHeight;
    } else if (heightMode === 'fill') {
      styles.height = '100%';
      styles.minHeight = minHeight || sizeConfig.minHeight;
    } else if (minHeight || maxHeight) {
      if (minHeight) styles.minHeight = minHeight;
      if (maxHeight) styles.maxHeight = maxHeight;
    }

    return styles;
  };

  // Build container classes
  const containerClasses = cn(
    // Base styling
    'relative backdrop-blur-xl border shadow-xl',

    // Variant styling
    variantConfig.background,
    variantConfig.border,

    // Size styling
    sizeConfig.padding,
    sizeConfig.borderRadius,

    // Height mode
    heightMode === 'fill' && 'h-full flex flex-col',
    heightMode === 'fixed' && 'flex flex-col overflow-hidden',

    // Floating effects
    floating !== 'none' && floatingStyles[floating],

    // Animation
    animated && 'transition-all duration-500 ease-out',

    // Interactive effects
    isInteractive &&
      'cursor-pointer active:scale-95 hover:shadow-2xl hover:shadow-white/5',

    // Custom className
    className,
  );

  // Handle click
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (onClick) {
      onClick(event);
    }
  };

  // Determine component type
  const Component = isInteractive ? 'button' : 'div';

  return (
    <Component
      className={containerClasses}
      style={getHeightStyles()}
      onClick={handleClick}
      data-testid={testId}
      data-variant={variant}
      data-size={size}
      data-floating={floating}
      data-interactive={isInteractive}
      data-height-mode={heightMode}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={
        isInteractive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick(e as any);
              }
            }
          : undefined
      }
      {...props}
    >
      {/* Background Effects */}
      {backgroundEffects && (
        <BackgroundEffects
          variant={effectiveAccentVariant}
          size="sm"
          pattern="corners"
          intensity="subtle"
          blur="lg"
          animated={animated}
          data-testid={`${testId}-background-effects`}
        />
      )}

      {/* Accent Dot */}
      {showAccent && variant !== 'glass' && (
        <AccentDot
          variant={effectiveAccentVariant}
          size="sm"
          position="top-right"
          animated={animated}
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            width: '16px',
            height: '16px',
            opacity: 0.6,
          }}
          data-testid={`${testId}-accent-dot`}
        />
      )}

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-[inherit] pointer-events-none" />

      {/* Content Container */}
      <div
        className={cn(
          'relative z-10',
          heightMode === 'fill' && 'flex-1 flex flex-col min-h-0',
          scrollable && 'overflow-y-auto',
        )}
      >
        {children}
      </div>
    </Component>
  );
};

/**
 * Card Header Sub-component
 */
export const CardHeader: React.FC<{
  title?: string;
  description?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  'data-testid'?: string;
}> = ({
  title,
  description,
  action,
  children,
  className,
  'data-testid': testId = 'card-header',
}) => (
  <div
    className={cn(
      'border-b border-white/10 pb-4 mb-4 flex-shrink-0',
      className,
    )}
    data-testid={testId}
  >
    {children || (
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          {title && (
            <TextElement
              as="h3"
              size="lg"
              weight="bold"
              opacity="full"
              className="text-white mb-1"
              data-testid={`${testId}-title`}
            >
              {title}
            </TextElement>
          )}
          {description && (
            <TextElement
              as="p"
              size="sm"
              weight="normal"
              opacity="medium"
              className="text-gray-300"
              data-testid={`${testId}-description`}
            >
              {description}
            </TextElement>
          )}
        </div>
        {action && (
          <div className="ml-4 flex-shrink-0" data-testid={`${testId}-action`}>
            {action}
          </div>
        )}
      </div>
    )}
  </div>
);

/**
 * Card Body Sub-component
 */
export const CardBody: React.FC<{
  children: React.ReactNode;
  className?: string;
  scrollable?: boolean;
  'data-testid'?: string;
}> = ({
  children,
  className,
  scrollable = false,
  'data-testid': testId = 'card-body',
}) => (
  <div
    className={cn(
      'text-gray-100 flex-1',
      scrollable && 'overflow-y-auto min-h-0',
      className,
    )}
    data-testid={testId}
  >
    {children}
  </div>
);

/**
 * Card Footer Sub-component
 */
export const CardFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
  'data-testid'?: string;
}> = ({ children, className, 'data-testid': testId = 'card-footer' }) => (
  <div
    className={cn(
      'border-t border-white/10 pt-4 mt-4 flex-shrink-0',
      className,
    )}
    data-testid={testId}
  >
    {children}
  </div>
);

/**
 * Unified Card component with sub-components
 */
export const Card = Object.assign(CardComponent, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});

Card.displayName = 'Card';
