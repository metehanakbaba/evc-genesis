import type { ComponentType } from 'react';
import type {
  AnimationProps,
  BaseComponentProps,
  SizeProps,
  VariantProps,
} from '../atoms/types';

/**
 * Base interfaces for molecule components
 */

// Base molecule props extending atomic props
export interface BaseMoleculeProps
  extends BaseComponentProps,
    Partial<VariantProps & SizeProps> {
  // Molecules can have more complex state
  loading?: boolean;
  disabled?: boolean;
  error?: boolean;
}

// Icon-related props for molecules that use icons
export interface IconProps {
  icon?: ComponentType<{ className?: string }>;
  iconPosition?: 'left' | 'right' | 'top' | 'bottom';
}

// Content-related props for molecules with text/values
export interface ContentProps {
  title?: string;
  description?: string;
  value?: string | number;
}

// Status-related props for molecules that show state
export interface StatusProps {
  status?: 'live' | 'offline' | 'warning' | 'success' | 'error';
  trend?: string;
}

// Common molecule prop combinations
export type MoleculeProps = BaseMoleculeProps & Partial<AnimationProps>;
export type ContentMoleculeProps = MoleculeProps & ContentProps;
export type StatusMoleculeProps = MoleculeProps & StatusProps;
export type IconMoleculeProps = MoleculeProps & IconProps;
