/**
 * 🎬 Dashboard Animation Components
 * 
 * Modular animation components for premium interactions
 */

// Grid animations
export { AnimatedGridItem } from './AnimatedGridItem';
export { StaggeredGridContainer } from './StaggeredGridContainer';

// Financial animations
export { AnimatedCounter } from './AnimatedCounter';

// Charging animations
export { ChargingProgressAnimation } from './ChargingProgressAnimation';

// Status animations
export { PulseStatusIndicator } from './PulseStatusIndicator';

// Types are imported directly when needed

// Animation configuration constants
export const ANIMATION_CONSTANTS = {
  // Timing
  STAGGER_DELAY: 150,
  ENTRANCE_DURATION: 600,
  PRESS_DURATION: 100,
  
  // Easing
  ENTRANCE_EASING: 'back(1.2)',
  PRESS_EASING: 'quad',
  
  // Transforms
  ENTRANCE_SLIDE: 40,
  ENTRANCE_SCALE: 0.8,
  PRESS_SCALE: 0.95,
} as const; 