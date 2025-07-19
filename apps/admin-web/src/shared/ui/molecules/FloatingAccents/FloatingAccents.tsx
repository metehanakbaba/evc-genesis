import React from 'react';
import { cn } from '../../utils';
import { AccentDot } from '../../atoms/AccentDot';
import type { 
  BaseComponentProps, 
  VariantProps, 
  SizeProps 
} from '../../atoms/types';

/**
 * FloatingAccents Component Props
 * 
 * Molecule component that composes multiple AccentDot atoms into a coordinated
 * floating accent collection with synchronized animation sequences and positioning
 */
export interface FloatingAccentsProps 
  extends BaseComponentProps, 
          VariantProps, 
          SizeProps {
  /** Custom inline styles */
  style?: React.CSSProperties;
  /** Number of accent dots to render */
  accentCount?: number;
  /** Enable coordinated animations */
  animated?: boolean;
  /** Base animation speed multiplier */
  animationSpeed?: number;
  /** Animation sequence type */
  sequence?: 'cascade' | 'synchronized' | 'random' | 'wave';
  /** Layout pattern for accent positioning */
  pattern?: 'scattered' | 'linear' | 'circular' | 'corners' | 'edges';
  /** Container dimensions */
  containerWidth?: string;
  containerHeight?: string;
  /** Enable responsive behavior */
  responsive?: boolean;
  /** Opacity for all accents */
  opacity?: number;
  /** Custom accent configurations */
  customAccents?: Array<{
    variant?: 'blue' | 'emerald' | 'purple' | 'teal';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    position?: { top?: string; left?: string; right?: string; bottom?: string };
    animationDelay?: number;
    opacity?: number;
  }>;
}

/**
 * Predefined positioning patterns for accents
 */
const positionPatterns = {
  scattered: (index: number, total: number) => ({
    top: `${Math.random() * 90 + 5}%`,
    left: `${Math.random() * 90 + 5}%`,
  }),
  linear: (index: number, total: number) => ({
    top: `${20 + (index / (total - 1)) * 60}%`,
    left: `${10 + (index / (total - 1)) * 80}%`,
  }),
  circular: (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI;
    const radius = 35; // percentage from center
    return {
      top: `${50 + Math.sin(angle) * radius}%`,
      left: `${50 + Math.cos(angle) * radius}%`,
    };
  },
  corners: (index: number, total: number) => {
    const positions = [
      { top: '15%', left: '15%' },
      { top: '15%', right: '15%' },
      { bottom: '15%', left: '15%' },
      { bottom: '15%', right: '15%' },
      { top: '50%', left: '5%' },
      { top: '50%', right: '5%' },
      { top: '5%', left: '50%' },
      { bottom: '5%', left: '50%' },
    ];
    return positions[index % positions.length] || positions[0];
  },
  edges: (index: number, total: number) => {
    const positions = [
      { top: '10%', left: '50%' },
      { top: '50%', right: '10%' },
      { bottom: '10%', left: '50%' },
      { top: '50%', left: '10%' },
      { top: '25%', right: '5%' },
      { bottom: '25%', left: '5%' },
    ];
    return positions[index % positions.length] || positions[0];
  },
} as const;

/**
 * Animation sequence configurations
 */
const animationSequences = {
  cascade: (index: number, total: number, baseSpeed: number) => ({
    animationDelay: index * 0.3,
    animationSpeed: baseSpeed,
  }),
  synchronized: (index: number, total: number, baseSpeed: number) => ({
    animationDelay: 0,
    animationSpeed: baseSpeed,
  }),
  random: (index: number, total: number, baseSpeed: number) => ({
    animationDelay: Math.random() * 2,
    animationSpeed: baseSpeed + (Math.random() - 0.5) * 0.5,
  }),
  wave: (index: number, total: number, baseSpeed: number) => ({
    animationDelay: Math.sin((index / total) * Math.PI * 2) * 0.5 + 0.5,
    animationSpeed: baseSpeed,
  }),
} as const;

/**
 * Size configurations for different accent collections
 */
const sizeConfigs = {
  xs: {
    accentSizes: ['xs', 'xs'] as const,
    defaultCount: 2,
  },
  sm: {
    accentSizes: ['xs', 'sm', 'xs'] as const,
    defaultCount: 3,
  },
  md: {
    accentSizes: ['xs', 'sm', 'sm', 'xs'] as const,
    defaultCount: 4,
  },
  lg: {
    accentSizes: ['sm', 'sm', 'md', 'sm', 'xs'] as const,
    defaultCount: 5,
  },
  xl: {
    accentSizes: ['sm', 'md', 'md', 'sm', 'xs', 'xs'] as const,
    defaultCount: 6,
  },
} as const;

/**
 * FloatingAccents - Molecule component for coordinated floating accent effects
 * 
 * Composes multiple AccentDot atoms into synchronized floating collections
 * with various positioning patterns and animation sequences. Provides
 * performance-optimized rendering and flexible customization options.
 * 
 * @example
 * ```tsx
 * <FloatingAccents 
 *   variant="blue" 
 *   size="md" 
 *   pattern="circular" 
 *   sequence="cascade"
 *   animated 
 * />
 * <FloatingAccents 
 *   accentCount={8}
 *   pattern="scattered"
 *   sequence="wave"
 *   customAccents={[
 *     { variant: 'emerald', size: 'md', position: { top: '20%', left: '30%' } }
 *   ]}
 * />
 * ```
 */
export const FloatingAccents: React.FC<FloatingAccentsProps> = ({
  variant = 'blue',
  size = 'md',
  accentCount,
  animated = true,
  animationSpeed = 1,
  sequence = 'cascade',
  pattern = 'scattered',
  containerWidth = '100%',
  containerHeight = '100%',
  responsive = true,
  opacity = 0.8,
  customAccents,
  className,
  'data-testid': testId = 'floating-accents',
  ...props
}) => {
  // Get size configuration
  const sizeConfig = sizeConfigs[size];
  const effectiveAccentCount = accentCount !== undefined ? accentCount : (customAccents?.length !== undefined ? customAccents.length : sizeConfig.defaultCount);
  
  // Generate accent configurations
  const generateAccentConfigs = () => {
    if (customAccents) {
      return customAccents.map((accent, index) => {
        const animationConfig = animationSequences[sequence](index, customAccents.length, animationSpeed);
        return {
          variant: accent.variant || variant,
          size: accent.size || sizeConfig.accentSizes[index % sizeConfig.accentSizes.length],
          position: accent.position || positionPatterns[pattern](index, customAccents.length),
          animationDelay: accent.animationDelay !== undefined ? accent.animationDelay : animationConfig.animationDelay,
          animationSpeed: animationConfig.animationSpeed,
          opacity: accent.opacity !== undefined ? accent.opacity : opacity,
        };
      });
    }
    
    return Array.from({ length: effectiveAccentCount }, (_, index) => {
      const animationConfig = animationSequences[sequence](index, effectiveAccentCount, animationSpeed);
      return {
        variant,
        size: sizeConfig.accentSizes[index % sizeConfig.accentSizes.length],
        position: positionPatterns[pattern](index, effectiveAccentCount),
        animationDelay: animationConfig.animationDelay,
        animationSpeed: animationConfig.animationSpeed,
        opacity,
      };
    });
  };

  const accentConfigs = generateAccentConfigs();

  // Build container classes
  const containerClasses = cn(
    // Base styling
    'absolute inset-0 overflow-hidden pointer-events-none',
    
    // Responsive behavior
    responsive && 'w-full h-full',
    
    // Custom className
    className
  );

  // Container styles
  const containerStyles = {
    width: containerWidth,
    height: containerHeight,
  };

  return (
    <div
      className={containerClasses}
      style={containerStyles}
      data-testid={testId}
      data-variant={variant}
      data-size={size}
      data-accent-count={effectiveAccentCount}
      data-pattern={pattern}
      data-sequence={sequence}
      data-animated={animated}
      {...props}
    >
      {accentConfigs.map((config, index) => (
        <AccentDot
          key={`accent-${index}`}
          variant={config.variant}
          size={config.size}
          position="center"
          animated={animated}
          animationSpeed={config.animationSpeed}
          animationDelay={config.animationDelay}
          opacity={config.opacity}
          style={config.position}
          data-testid={`${testId}-dot-${index}`}
        />
      ))}
    </div>
  );
};

FloatingAccents.displayName = 'FloatingAccents';