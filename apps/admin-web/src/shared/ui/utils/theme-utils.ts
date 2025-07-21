import type { SizeProps, VariantProps } from '../atoms/types';

/**
 * Theme utility functions for consistent styling across components
 */

// Variant color mappings
export const variantColors = {
  blue: {
    primary: 'blue-500',
    secondary: 'blue-400',
    accent: 'blue-300',
    background: 'blue-500/15',
    border: 'blue-400/60',
    text: 'blue-200',
    glow: 'blue-400/15',
  },
  emerald: {
    primary: 'emerald-500',
    secondary: 'emerald-400',
    accent: 'emerald-300',
    background: 'emerald-500/15',
    border: 'emerald-400/60',
    text: 'emerald-200',
    glow: 'emerald-400/15',
  },
  purple: {
    primary: 'purple-500',
    secondary: 'purple-400',
    accent: 'purple-300',
    background: 'purple-500/15',
    border: 'purple-400/60',
    text: 'purple-200',
    glow: 'purple-400/15',
  },
  teal: {
    primary: 'teal-500',
    secondary: 'teal-400',
    accent: 'teal-300',
    background: 'teal-500/15',
    border: 'teal-400/60',
    text: 'teal-200',
    glow: 'teal-400/15',
  },
} as const;

// Size mappings for different properties
export const sizeScale = {
  xs: {
    width: 'w-3',
    height: 'h-3',
    padding: 'p-1',
    text: 'text-xs',
    spacing: 'space-1',
  },
  sm: {
    width: 'w-4',
    height: 'h-4',
    padding: 'p-2',
    text: 'text-sm',
    spacing: 'space-2',
  },
  md: {
    width: 'w-6',
    height: 'h-6',
    padding: 'p-3',
    text: 'text-base',
    spacing: 'space-3',
  },
  lg: {
    width: 'w-8',
    height: 'h-8',
    padding: 'p-4',
    text: 'text-lg',
    spacing: 'space-4',
  },
  xl: {
    width: 'w-12',
    height: 'h-12',
    padding: 'p-6',
    text: 'text-xl',
    spacing: 'space-6',
  },
} as const;

// Blur scale for visual effects
export const blurScale = {
  sm: 'blur-sm',
  md: 'blur-md',
  lg: 'blur-lg',
  xl: 'blur-xl',
} as const;

// Intensity scale for effects
export const intensityScale = {
  subtle: '0.1',
  medium: '0.25',
  strong: '0.5',
} as const;

/**
 * Get variant-specific color classes
 */
export function getVariantColors(variant: VariantProps['variant'] = 'blue') {
  return variantColors[variant];
}

/**
 * Get size-specific classes
 */
export function getSizeClasses(size: SizeProps['size'] = 'md') {
  return sizeScale[size];
}

/**
 * Generate background gradient classes for variants
 */
export function getVariantGradient(variant: VariantProps['variant'] = 'blue') {
  const colors = getVariantColors(variant);
  return `bg-gradient-to-br from-${colors.primary}/20 to-${colors.secondary}/10`;
}

/**
 * Generate glow effect classes for variants
 */
export function getVariantGlow(
  variant: VariantProps['variant'] = 'blue',
  intensity: 'subtle' | 'medium' | 'strong' = 'medium',
) {
  const colors = getVariantColors(variant);
  const alpha = intensityScale[intensity];
  return `shadow-lg shadow-${colors.primary}/${Math.round(parseFloat(alpha) * 100)}`;
}

/**
 * Generate border classes for variants
 */
export function getVariantBorder(variant: VariantProps['variant'] = 'blue') {
  const colors = getVariantColors(variant);
  return `border border-${colors.border}`;
}

/**
 * Generate text color classes for variants
 */
export function getVariantText(variant: VariantProps['variant'] = 'blue') {
  const colors = getVariantColors(variant);
  return `text-${colors.text}`;
}

/**
 * Generate hover effect classes
 */
export function getHoverEffects(variant: VariantProps['variant'] = 'blue') {
  const colors = getVariantColors(variant);
  return `hover:shadow-${colors.primary}/30 hover:border-${colors.primary}/80 transition-all duration-300`;
}

/**
 * Create a complete theme class set for a component
 */
export function createThemeClasses(
  variant: VariantProps['variant'] = 'blue',
  size: SizeProps['size'] = 'md',
  options: {
    includeGlow?: boolean;
    includeBorder?: boolean;
    includeHover?: boolean;
    includeGradient?: boolean;
  } = {},
) {
  const {
    includeGlow = false,
    includeBorder = false,
    includeHover = false,
    includeGradient = false,
  } = options;

  const classes: string[] = [
    getSizeClasses(size).width,
    getSizeClasses(size).height,
  ];

  if (includeGradient) {
    classes.push(getVariantGradient(variant));
  }

  if (includeBorder) {
    classes.push(getVariantBorder(variant));
  }

  if (includeGlow) {
    classes.push(getVariantGlow(variant));
  }

  if (includeHover) {
    classes.push(getHoverEffects(variant));
  }

  return classes.filter(Boolean).join(' ');
}
