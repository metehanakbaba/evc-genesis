import React, { type ReactNode } from 'react';
import { cn } from '../../../shared/utils/cn';

/**
 * Grid Item Component Props
 */
export interface GridItemProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly id?: string;
  readonly span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  readonly mdSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  readonly lgSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  readonly variant?: 'default' | 'glass' | 'solid' | 'minimal' | 'floating';
  readonly padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  readonly as?: React.ElementType;
  readonly colorAccent?:
    | 'blue'
    | 'purple'
    | 'teal'
    | 'emerald'
    | 'cyan'
    | 'amber'
    | 'rose'
    | 'neutral';
  readonly showAccent?: boolean;
  readonly animationDelay?: number;
}

/**
 * Grid Span Mapping
 */
const spanMap = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  7: 'col-span-7',
  8: 'col-span-8',
  9: 'col-span-9',
  10: 'col-span-10',
  11: 'col-span-11',
  12: 'col-span-12',
} as const;

const mdSpanMap = {
  1: 'md:col-span-1',
  2: 'md:col-span-2',
  3: 'md:col-span-3',
  4: 'md:col-span-4',
  5: 'md:col-span-5',
  6: 'md:col-span-6',
  7: 'md:col-span-7',
  8: 'md:col-span-8',
  9: 'md:col-span-9',
  10: 'md:col-span-10',
  11: 'md:col-span-11',
  12: 'md:col-span-12',
} as const;

const lgSpanMap = {
  1: 'lg:col-span-1',
  2: 'lg:col-span-2',
  3: 'lg:col-span-3',
  4: 'lg:col-span-4',
  5: 'lg:col-span-5',
  6: 'lg:col-span-6',
  7: 'lg:col-span-7',
  8: 'lg:col-span-8',
  9: 'lg:col-span-9',
  10: 'lg:col-span-10',
  11: 'lg:col-span-11',
  12: 'lg:col-span-12',
} as const;

/**
 * Color accent variants for sophisticated theming
 */
const colorAccentMap = {
  blue: {
    background:
      'bg-gradient-to-br from-blue-500/8 via-blue-400/3 to-transparent',
    border: 'border-blue-400/25',
    accent: 'bg-blue-500/20',
    glow: 'hover:shadow-blue-500/15',
    hover: 'hover:border-blue-300/40',
  },
  purple: {
    background:
      'bg-gradient-to-br from-purple-500/8 via-purple-400/3 to-transparent',
    border: 'border-purple-400/25',
    accent: 'bg-purple-500/20',
    glow: 'hover:shadow-purple-500/15',
    hover: 'hover:border-purple-300/40',
  },
  teal: {
    background:
      'bg-gradient-to-br from-teal-500/8 via-teal-400/3 to-transparent',
    border: 'border-teal-400/25',
    accent: 'bg-teal-500/20',
    glow: 'hover:shadow-teal-500/15',
    hover: 'hover:border-teal-300/40',
  },
  emerald: {
    background:
      'bg-gradient-to-br from-emerald-500/8 via-emerald-400/3 to-transparent',
    border: 'border-emerald-400/25',
    accent: 'bg-emerald-500/20',
    glow: 'hover:shadow-emerald-500/15',
    hover: 'hover:border-emerald-300/40',
  },
  cyan: {
    background:
      'bg-gradient-to-br from-cyan-500/8 via-cyan-400/3 to-transparent',
    border: 'border-cyan-400/25',
    accent: 'bg-cyan-500/20',
    glow: 'hover:shadow-cyan-500/15',
    hover: 'hover:border-cyan-300/40',
  },
  amber: {
    background:
      'bg-gradient-to-br from-amber-500/8 via-amber-400/3 to-transparent',
    border: 'border-amber-400/25',
    accent: 'bg-amber-500/20',
    glow: 'hover:shadow-amber-500/15',
    hover: 'hover:border-amber-300/40',
  },
  rose: {
    background:
      'bg-gradient-to-br from-rose-500/8 via-rose-400/3 to-transparent',
    border: 'border-rose-400/25',
    accent: 'bg-rose-500/20',
    glow: 'hover:shadow-rose-500/15',
    hover: 'hover:border-rose-300/40',
  },
  neutral: {
    background: 'bg-gradient-to-br from-white/6 via-white/2 to-transparent',
    border: 'border-white/20',
    accent: 'bg-white/15',
    glow: 'hover:shadow-white/10',
    hover: 'hover:border-white/30',
  },
};

/**
 * Variant Styles - Revolutionary Glassmorphism Design
 */
const variantMap = {
  default:
    'bg-white/5 shadow-md backdrop-blur-sm rounded-lg border border-white/10',
  glass:
    'bg-white/5 shadow-md backdrop-blur-sm rounded-lg hover:bg-white/8 hover:shadow-lg transition-all duration-300',
  floating:
    'backdrop-blur-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 ease-out hover:scale-[1.02] hover:-translate-y-1 border',
  solid:
    'bg-gray-800 border border-gray-700 rounded-lg shadow-lg shadow-gray-900/20',
  minimal:
    'bg-gray-800/30 border border-gray-700/50 rounded-2xl backdrop-blur-sm hover:bg-gray-800/40 transition-all duration-300',
} as const;

/**
 * Padding Mapping
 */
const paddingMap = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-12',
} as const;

/**
 * Type-safe Grid Item Component with Revolutionary Glassmorphism Design
 *
 * @example
 * ```tsx
 * <GridItem variant="floating" colorAccent="blue" padding="xl" showAccent>
 *   <SectionHeader title="My Section"  />
 *   <div className="space-y-4">
 *     Content goes here
 *   </div>
 * </GridItem>
 * ```
 */
export const GridItem: React.FC<GridItemProps> = ({
  children,
  className,
  id,
  span,
  mdSpan,
  lgSpan,
  variant = 'glass',
  padding = 'md',
  as = 'section',
  colorAccent = 'neutral',
  showAccent = false,
  animationDelay = 0,
}) => {
  const Component = as as React.ElementType;
  const colorAccentStyles = colorAccentMap[colorAccent];
  const isFloating = variant === 'floating';
  const isMinimal = variant === 'minimal';
  const hasColorAccent = isFloating || isMinimal;

  const gridItemClasses = cn(
    // Base styles
    'group relative transition-all duration-300',
    // Span classes
    span && spanMap[span],
    mdSpan && mdSpanMap[mdSpan],
    lgSpan && lgSpanMap[lgSpan],
    // Variant styling
    variantMap[variant],
    // Color accent for floating and minimal variants
    hasColorAccent && colorAccentStyles.background,
    hasColorAccent && colorAccentStyles.border,
    hasColorAccent && colorAccentStyles.glow,
    hasColorAccent && colorAccentStyles.hover,
    // Padding
    paddingMap[padding],
    // Custom classes
    className,
  );

  return (
    <Component
      id={id}
      className={gridItemClasses}
      style={
        animationDelay > 0
          ? { animationDelay: `${animationDelay}ms` }
          : undefined
      }
    >
      {/* Floating accent dot for sophisticated look */}
      {isFloating && showAccent && (
        <div
          className={cn(
            'absolute -top-2 -right-2 w-4 h-4 rounded-full animate-pulse',
            colorAccentStyles.accent,
          )}
        />
      )}

      {children}

      {/* Gradient overlay on hover for floating variant */}
      {isFloating && (
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-br from-white/3 to-transparent transition-opacity duration-500 pointer-events-none" />
      )}
    </Component>
  );
};

GridItem.displayName = 'GridItem';
