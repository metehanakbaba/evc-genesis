import type { ComponentType, MouseEventHandler } from 'react';
import type {
  BaseComponentProps,
  SizeProps,
  VariantProps,
} from '../atoms/types';
import type { ContentProps, StatusProps } from '../molecules/types';

/**
 * Base interfaces for organism components
 */

// Base organism props
export interface BaseOrganismProps
  extends BaseComponentProps,
    Partial<VariantProps & SizeProps> {
  // Organisms can have complex interactions
  onClick?: MouseEventHandler<HTMLElement>;
  onHover?: MouseEventHandler<HTMLElement>;
  loading?: boolean;
  disabled?: boolean;
}

// Card-like organism props
export interface CardOrganismProps extends BaseOrganismProps, ContentProps {
  icon?: ComponentType<{ className?: string }>;
  footer?: string;
  interactive?: boolean;
}

// Stat-related organism props
export interface StatOrganismProps extends CardOrganismProps, StatusProps {
  // Additional stat-specific props can be added here
}

// Transition-related organism props
export interface TransitionOrganismProps extends BaseOrganismProps {
  duration?: number;
  easing?: string;
  direction?: 'horizontal' | 'vertical';
}

// Common organism prop combinations
export type OrganismProps = BaseOrganismProps;
export type InteractiveOrganismProps = OrganismProps & {
  onClick?: MouseEventHandler<HTMLElement>;
  interactive?: boolean;
};
