import type React from 'react';
import { GlowOrb } from '../../atoms/GlowOrb';
import type {
  BaseComponentProps,
  SizeProps,
  VariantProps,
} from '../../atoms/types';
import { cn } from '../../utils';

/**
 * BackgroundEffects Component Props
 *
 * Molecule component that composes multiple GlowOrb atoms into a coordinated
 * background effect collection with orchestrated animation timing and positioning
 */
export interface BackgroundEffectsProps
  extends BaseComponentProps,
    VariantProps,
    SizeProps {
  /** Custom inline styles */
  style?: React.CSSProperties;
  /** Number of orbs to render */
  orbCount?: number;
  /** Animation intensity for all orbs */
  intensity?: 'subtle' | 'medium' | 'strong';
  /** Blur level for all orbs */
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  /** Enable coordinated animations */
  animated?: boolean;
  /** Base animation speed multiplier */
  animationSpeed?: number;
  /** Layout pattern for orb positioning */
  pattern?: 'random' | 'grid' | 'corners' | 'center' | 'edges';
  /** Container dimensions */
  containerWidth?: string;
  containerHeight?: string;
  /** Enable responsive behavior */
  responsive?: boolean;
  /** Custom orb configurations */
  customOrbs?: Array<{
    variant?: 'blue' | 'emerald' | 'purple' | 'teal';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    position?: { top?: string; left?: string; right?: string; bottom?: string };
    animationDelay?: number;
    intensity?: 'subtle' | 'medium' | 'strong';
  }>;
}

/**
 * Predefined positioning patterns for orbs
 */
const positionPatterns = {
  random: (index: number, total: number) => ({
    top: `${Math.random() * 80 + 10}%`,
    left: `${Math.random() * 80 + 10}%`,
  }),
  grid: (index: number, total: number) => {
    const cols = Math.ceil(Math.sqrt(total));
    const row = Math.floor(index / cols);
    const col = index % cols;
    return {
      top: `${(row / Math.ceil(total / cols)) * 80 + 10}%`,
      left: `${(col / cols) * 80 + 10}%`,
    };
  },
  corners: (index: number, total: number) => {
    const positions = [
      { top: '10%', left: '10%' },
      { top: '10%', right: '10%' },
      { bottom: '10%', left: '10%' },
      { bottom: '10%', right: '10%' },
    ];
    return positions[index % positions.length] || positions[0];
  },
  center: (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI;
    const radius = 30; // percentage
    return {
      top: `${50 + Math.sin(angle) * radius}%`,
      left: `${50 + Math.cos(angle) * radius}%`,
    };
  },
  edges: (index: number, total: number) => {
    const positions = [
      { top: '0%', left: '50%' },
      { top: '50%', right: '0%' },
      { bottom: '0%', left: '50%' },
      { top: '50%', left: '0%' },
    ];
    return positions[index % positions.length] || positions[0];
  },
} as const;

/**
 * Size configurations for different orb collections
 */
const sizeConfigs = {
  xs: {
    orbSizes: ['xs', 'xs', 'sm'] as const,
    defaultCount: 3,
  },
  sm: {
    orbSizes: ['xs', 'sm', 'sm', 'md'] as const,
    defaultCount: 4,
  },
  md: {
    orbSizes: ['sm', 'md', 'md', 'lg'] as const,
    defaultCount: 5,
  },
  lg: {
    orbSizes: ['md', 'lg', 'lg', 'xl'] as const,
    defaultCount: 6,
  },
  xl: {
    orbSizes: ['lg', 'xl', 'xl', 'xl'] as const,
    defaultCount: 8,
  },
} as const;

/**
 * BackgroundEffects - Molecule component for orchestrated background orb effects
 *
 * Composes multiple GlowOrb atoms into coordinated background collections
 * with various positioning patterns and animation sequences. Provides
 * performance-optimized rendering and responsive behavior.
 *
 * @example
 * ```tsx
 * <BackgroundEffects
 *   variant="blue"
 *   size="md"
 *   pattern="corners"
 *   animated
 * />
 * <BackgroundEffects
 *   orbCount={6}
 *   intensity="strong"
 *   pattern="random"
 *   customOrbs={[
 *     { variant: 'emerald', size: 'lg', position: { top: '20%', left: '30%' } }
 *   ]}
 * />
 * ```
 */
export const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({
  variant = 'blue',
  size = 'md',
  orbCount,
  intensity = 'medium',
  blur = 'md',
  animated = true,
  animationSpeed = 1,
  pattern = 'random',
  containerWidth = '100%',
  containerHeight = '100%',
  responsive = true,
  customOrbs,
  className,
  'data-testid': testId = 'background-effects',
  ...props
}) => {
  // Get size configuration
  const sizeConfig = sizeConfigs[size];
  const effectiveOrbCount =
    orbCount !== undefined
      ? orbCount
      : customOrbs?.length !== undefined
        ? customOrbs.length
        : sizeConfig.defaultCount;

  // Generate orb configurations
  const generateOrbConfigs = () => {
    if (customOrbs) {
      return customOrbs.map((orb, index) => ({
        variant: orb.variant || variant,
        size:
          orb.size || sizeConfig.orbSizes[index % sizeConfig.orbSizes.length],
        position:
          orb.position || positionPatterns[pattern](index, customOrbs.length),
        animationDelay: orb.animationDelay || index * 0.5,
        intensity: orb.intensity || intensity,
      }));
    }

    return Array.from({ length: effectiveOrbCount }, (_, index) => ({
      variant,
      size: sizeConfig.orbSizes[index % sizeConfig.orbSizes.length],
      position: positionPatterns[pattern](index, effectiveOrbCount),
      animationDelay: index * 0.5,
      intensity,
    }));
  };

  const orbConfigs = generateOrbConfigs();

  // Build container classes
  const containerClasses = cn(
    // Base styling
    'absolute inset-0 overflow-hidden pointer-events-none',

    // Responsive behavior
    responsive && 'w-full h-full',

    // Custom className
    className,
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
      data-orb-count={effectiveOrbCount}
      data-pattern={pattern}
      data-animated={animated}
      data-intensity={intensity}
      {...props}
    >
      {orbConfigs.map((config, index) => (
        <GlowOrb
          key={`orb-${index}`}
          variant={config.variant}
          size={config.size}
          intensity={config.intensity}
          blur={blur}
          animated={animated}
          animationSpeed={animationSpeed}
          animationDelay={config.animationDelay}
          position="background"
          style={config.position}
          data-testid={`${testId}-orb-${index}`}
        />
      ))}
    </div>
  );
};

BackgroundEffects.displayName = 'BackgroundEffects';
