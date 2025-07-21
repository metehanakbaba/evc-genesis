import type { AnimationProps } from '../atoms/types';

/**
 * Animation utility functions for consistent motion across components
 */

// Animation duration mappings
export const animationDurations = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
  slowest: '1000ms',
} as const;

// Animation easing functions
export const animationEasings = {
  linear: 'linear',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

// Common animation classes
export const animationClasses = {
  // Fade animations
  fadeIn: 'animate-fade-in',
  fadeOut: 'animate-fade-out',

  // Scale animations
  scaleIn: 'animate-scale-in',
  scaleOut: 'animate-scale-out',
  pulse: 'animate-pulse',

  // Movement animations
  slideInLeft: 'animate-slide-in-left',
  slideInRight: 'animate-slide-in-right',
  slideInUp: 'animate-slide-in-up',
  slideInDown: 'animate-slide-in-down',

  // Rotation animations
  spin: 'animate-spin',
  bounce: 'animate-bounce',

  // Glow animations
  glow: 'animate-glow',
  glowPulse: 'animate-glow-pulse',

  // Float animations
  float: 'animate-float',
  floatSlow: 'animate-float-slow',
} as const;

/**
 * Generate animation delay class
 */
export function getAnimationDelay(delay: number = 0): string {
  if (delay === 0) return '';
  return `animation-delay-${delay}ms`;
}

/**
 * Generate animation duration class
 */
export function getAnimationDuration(speed: number = 1): string {
  const duration = Math.round(300 / speed); // Base 300ms, adjusted by speed
  return `animation-duration-${duration}ms`;
}

/**
 * Create animation style object for inline styles
 */
export function createAnimationStyle(
  animation: keyof typeof animationClasses,
  options: {
    duration?: keyof typeof animationDurations | number;
    delay?: number;
    easing?: keyof typeof animationEasings;
    iterationCount?: number | 'infinite';
  } = {},
): React.CSSProperties {
  const {
    duration = 'normal',
    delay = 0,
    easing = 'smooth',
    iterationCount = 1,
  } = options;

  const durationValue =
    typeof duration === 'number'
      ? `${duration}ms`
      : animationDurations[duration];

  return {
    animationDuration: durationValue,
    animationDelay: `${delay}ms`,
    animationTimingFunction: animationEasings[easing],
    animationIterationCount: iterationCount,
  };
}

/**
 * Generate animation classes based on props
 */
export function getAnimationClasses(props: AnimationProps): string {
  const { animated = false, animationSpeed = 1, animationDelay = 0 } = props;

  if (!animated) return '';

  const classes = [];

  if (animationDelay > 0) {
    classes.push(getAnimationDelay(animationDelay));
  }

  if (animationSpeed !== 1) {
    classes.push(getAnimationDuration(animationSpeed));
  }

  return classes.join(' ');
}

/**
 * Create hover animation classes
 */
export function getHoverAnimationClasses(
  hoverScale: boolean = false,
  hoverGlow: boolean = false,
): string {
  const classes = [];

  if (hoverScale) {
    classes.push('hover:scale-105 active:scale-95');
  }

  if (hoverGlow) {
    classes.push('hover:animate-glow-pulse');
  }

  if (classes.length > 0) {
    classes.push('transition-all duration-300');
  }

  return classes.join(' ');
}

/**
 * Create staggered animation delays for multiple elements
 */
export function createStaggeredDelays(
  count: number,
  baseDelay: number = 100,
): number[] {
  return Array.from({ length: count }, (_, index) => index * baseDelay);
}

/**
 * Generate keyframe animation CSS
 */
export function generateKeyframes(
  name: string,
  keyframes: Record<string, React.CSSProperties>,
): string {
  const keyframeEntries = Object.entries(keyframes)
    .map(([percentage, styles]) => {
      const styleString = Object.entries(styles)
        .map(([property, value]) => `${property}: ${value}`)
        .join('; ');
      return `${percentage} { ${styleString} }`;
    })
    .join('\n  ');

  return `@keyframes ${name} {\n  ${keyframeEntries}\n}`;
}

/**
 * Common animation presets
 */
export const animationPresets = {
  // Gentle floating animation
  gentleFloat: {
    animation: 'float',
    duration: 'slowest' as const,
    easing: 'smooth' as const,
    iterationCount: 'infinite' as const,
  },

  // Quick pulse animation
  quickPulse: {
    animation: 'pulse',
    duration: 'fast' as const,
    easing: 'easeInOut' as const,
    iterationCount: 'infinite' as const,
  },

  // Smooth glow animation
  smoothGlow: {
    animation: 'glow',
    duration: 'slow' as const,
    easing: 'smooth' as const,
    iterationCount: 'infinite' as const,
  },

  // Bounce entrance
  bounceIn: {
    animation: 'scaleIn',
    duration: 'normal' as const,
    easing: 'bounce' as const,
    iterationCount: 1,
  },
} as const;
