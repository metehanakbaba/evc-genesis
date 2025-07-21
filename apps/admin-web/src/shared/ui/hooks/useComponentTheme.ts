import { useMemo } from 'react';
import type { SizeProps, VariantProps } from '../atoms/types';
import { atomicTokens } from '../theme/theme.config';
import {
  createThemeClasses,
  getSizeClasses,
  getVariantColors,
} from '../utils/theme-utils';

/**
 * Hook for managing component theming with atomic design tokens
 */
export function useComponentTheme(
  variant: VariantProps['variant'] = 'blue',
  size: SizeProps['size'] = 'md',
) {
  const themeClasses = useMemo(() => {
    return {
      variant: getVariantColors(variant),
      size: getSizeClasses(size),
      base: createThemeClasses(variant, size),
      withGlow: createThemeClasses(variant, size, { includeGlow: true }),
      withBorder: createThemeClasses(variant, size, { includeBorder: true }),
      withHover: createThemeClasses(variant, size, { includeHover: true }),
      withGradient: createThemeClasses(variant, size, {
        includeGradient: true,
      }),
      complete: createThemeClasses(variant, size, {
        includeGlow: true,
        includeBorder: true,
        includeHover: true,
        includeGradient: true,
      }),
    };
  }, [variant, size]);

  const tokens = useMemo(() => {
    return {
      variant: atomicTokens.variants[variant],
      size: atomicTokens.sizes[size],
      animations: atomicTokens.animations,
      effects: atomicTokens.effects,
    };
  }, [variant, size]);

  return {
    classes: themeClasses,
    tokens,
    variant,
    size,
  };
}

/**
 * Hook for creating dynamic theme classes based on props
 */
export function useDynamicTheme<T extends VariantProps & SizeProps>(
  props: T,
  options: {
    includeGlow?: boolean;
    includeBorder?: boolean;
    includeHover?: boolean;
    includeGradient?: boolean;
  } = {},
) {
  const { variant = 'blue', size = 'md' } = props;

  const themeClasses = useMemo(() => {
    return createThemeClasses(variant, size, options);
  }, [variant, size, options]);

  const variantColors = useMemo(() => {
    return getVariantColors(variant);
  }, [variant]);

  const sizeClasses = useMemo(() => {
    return getSizeClasses(size);
  }, [size]);

  return {
    themeClasses,
    variantColors,
    sizeClasses,
    variant,
    size,
  };
}

/**
 * Hook for managing component state-based theming
 */
export function useStateTheme(
  variant: VariantProps['variant'] = 'blue',
  state: {
    isHovered?: boolean;
    isFocused?: boolean;
    isActive?: boolean;
    isDisabled?: boolean;
    isLoading?: boolean;
  } = {},
) {
  const { isHovered, isFocused, isActive, isDisabled, isLoading } = state;

  const stateClasses = useMemo(() => {
    const colors = getVariantColors(variant);
    const classes: string[] = [];

    if (isDisabled) {
      classes.push('opacity-50 cursor-not-allowed');
    } else if (isLoading) {
      classes.push('opacity-75 cursor-wait');
    } else {
      if (isHovered) {
        classes.push(`shadow-${colors.primary}/30 border-${colors.primary}/80`);
      }

      if (isFocused) {
        classes.push(`ring-2 ring-${colors.primary}/50 outline-none`);
      }

      if (isActive) {
        classes.push(`bg-${colors.background} scale-95`);
      }
    }

    classes.push('transition-all duration-300');

    return classes.join(' ');
  }, [variant, isHovered, isFocused, isActive, isDisabled, isLoading]);

  return {
    stateClasses,
    isDisabled,
    isLoading,
  };
}
