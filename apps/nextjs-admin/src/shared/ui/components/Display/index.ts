/**
 * Display Category - Content display components
 * Components for displaying content, data, and visual elements
 */

// Content Containers
export { Card, CardHeader, CardBody, CardFooter } from './Card/Card';
export type { CardProps } from './Card/Card';

export { HeroSection } from './HeroSection/HeroSection';
export type { HeroSectionProps } from './HeroSection/HeroSection';

// Data Display
export { StatCard } from './StatCard/StatCard';
export type { StatCardProps } from './StatCard/StatCard';

export { MinimalStatCard } from './MinimalStatCard/MinimalStatCard';
export type { MinimalStatCardProps } from './MinimalStatCard/MinimalStatCard';

// Visual Elements
export { Badge } from './Badge/Badge';
export type { BadgeProps } from './Badge/Badge';

export { Spinner } from './Spinner/Spinner';
export type { SpinnerProps } from './Spinner/Spinner';

// Modal/Dialog
export { Modal } from './Modal/Modal';
export type { ModalProps } from './Modal/Modal';

export { FloatingCard } from './FloatingCard/FloatingCard';
export type { FloatingCardProps } from './FloatingCard/FloatingCard';

// Revolutionary Animation Components (using default exports)
export { default as RevolutionaryLoadingVisual } from './RevolutionaryLoadingVisual/RevolutionaryLoadingVisual';
export { default as RevolutionaryLoader } from './RevolutionaryLoader/RevolutionaryLoader';
export { default as RouteTransition } from './RouteTransition/RouteTransition';

// Export types for Revolutionary components
export type { RevolutionaryLoadingVisualProps } from './RevolutionaryLoadingVisual/RevolutionaryLoadingVisual';
export type {
  RevolutionaryLoaderProps,
  LoadingPhase,
} from './RevolutionaryLoader/RevolutionaryLoader';
export type {
  RouteTransitionProps,
  TransitionPhase,
} from './RouteTransition/RouteTransition';
