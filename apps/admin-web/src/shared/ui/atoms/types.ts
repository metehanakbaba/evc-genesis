import type { ReactNode } from 'react';

/**
 * Base interfaces for all atomic components
 */

// Base component props that all components should extend
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
  'data-testid'?: string;
}

// Variant system for consistent theming
export interface VariantProps {
  variant?: 'blue' | 'emerald' | 'purple' | 'teal';
}

// Size system for consistent scaling
export interface SizeProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

// Animation properties for consistent motion
export interface AnimationProps {
  animated?: boolean;
  animationSpeed?: number;
  animationDelay?: number;
}

// Position properties for layout control
export interface PositionProps {
  position?:
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'center';
}

// Intensity properties for visual effects
export interface IntensityProps {
  intensity?: 'subtle' | 'medium' | 'strong';
}

// Blur properties for visual effects
export interface BlurProps {
  blur?: 'sm' | 'md' | 'lg' | 'xl';
}

// Opacity properties for transparency control
export interface OpacityProps {
  opacity?: number;
}

// Hover effect properties
export interface HoverProps {
  hoverScale?: boolean;
  hoverGlow?: boolean;
}

// Common atom prop combinations
export type AtomicProps = BaseComponentProps &
  Partial<VariantProps & SizeProps & AnimationProps>;
export type VisualEffectProps = IntensityProps & BlurProps & OpacityProps;
export type InteractiveProps = HoverProps & AnimationProps;
