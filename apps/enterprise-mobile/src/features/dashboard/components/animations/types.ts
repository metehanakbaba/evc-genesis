/**
 * 🎯 Animation Component Types
 * 
 * Type definitions for dashboard animation components
 */

import { Animated } from 'react-native';

export interface AnimationConfig {
  duration: number;
  delay: number;
  easing: any;
  useNativeDriver: boolean;
}

export interface GridAnimationProps {
  staggerDelay?: number;
  entranceDuration?: number;
  enablePressAnimation?: boolean;
  enableHoverEffect?: boolean;
}

export interface AnimatedGridItemConfig {
  fadeInDuration: number;
  slideInDuration: number;
  scaleInDuration: number;
  pressResponseDuration: number;
  staggerOffset: number;
}

export interface StaggeredContainerConfig {
  containerDelay: number;
  itemStaggerDelay: number;
  enableRefreshAnimation: boolean;
  enableBackgroundAnimation: boolean;
}

// Animation value types
export type AnimatedValue = Animated.Value;
export type AnimatedValueXY = Animated.ValueXY;

// Animation timing types
export type EasingFunction = (value: number) => number;
export type AnimationEndCallback = (finished: boolean) => void; 