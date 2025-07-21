/**
 * Validation script for atomic design system structure
 * This file can be run to verify the atomic design system is properly set up
 */

import type {
  AnimationProps,
  BaseComponentProps,
  SizeProps,
  VariantProps,
} from './atoms/types';
import { atomicTokens } from './theme/theme.config';

// Validate that all required types are available
type ValidationTypes = {
  base: BaseComponentProps;
  variant: VariantProps;
  size: SizeProps;
  animation: AnimationProps;
};

// Validate that atomic tokens are properly structured
const validateAtomicTokens = () => {
  const requiredVariants = ['blue', 'emerald', 'purple', 'teal'] as const;
  const requiredSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

  // Check variants
  requiredVariants.forEach((variant) => {
    if (!atomicTokens.variants[variant]) {
      throw new Error(`Missing variant: ${variant}`);
    }

    const variantConfig = atomicTokens.variants[variant];
    const requiredProps = [
      'primary',
      'secondary',
      'accent',
      'background',
      'border',
      'text',
      'glow',
    ];

    requiredProps.forEach((prop) => {
      if (!variantConfig[prop as keyof typeof variantConfig]) {
        throw new Error(`Missing property ${prop} in variant ${variant}`);
      }
    });
  });

  // Check sizes
  requiredSizes.forEach((size) => {
    if (!atomicTokens.sizes[size]) {
      throw new Error(`Missing size: ${size}`);
    }

    const sizeConfig = atomicTokens.sizes[size];
    const requiredProps = ['scale', 'spacing', 'text'];

    requiredProps.forEach((prop) => {
      if (!sizeConfig[prop as keyof typeof sizeConfig]) {
        throw new Error(`Missing property ${prop} in size ${size}`);
      }
    });
  });

  console.log('✅ Atomic tokens validation passed');
};

// Validate directory structure exists
const validateStructure = () => {
  // This would typically check filesystem, but for TypeScript validation
  // we'll just ensure the imports work
  try {
    require('./atoms');
    require('./molecules');
    require('./organisms');
    require('./templates');
    require('./hooks');
    require('./utils');
    require('./theme/theme.config');

    console.log('✅ Directory structure validation passed');
  } catch (error) {
    throw new Error(`Directory structure validation failed: ${error}`);
  }
};

// Main validation function
export const validateAtomicDesignSystem = () => {
  try {
    validateAtomicTokens();
    validateStructure();
    console.log('🎉 Atomic Design System validation completed successfully!');
    return true;
  } catch (error) {
    console.error('❌ Atomic Design System validation failed:', error);
    return false;
  }
};

// Export validation types for use in components
export type { ValidationTypes };

// Run validation if this file is executed directly
if (typeof window === 'undefined' && require.main === module) {
  validateAtomicDesignSystem();
}
