// 🚀 REVOLUTIONARY MOBILE DESIGN SYSTEM (2025)
// Reanimated 4 + NativeWind Integration
// EV Charging Platform - Mobile Admin Panel

// Type definitions for better TypeScript support
export type AnimationPreset = {
  from: Record<string, any>;
  animate: Record<string, any>;
  transition: Record<string, any>;
};

export type CSSAnimationStyle = {
  animationName: string;
  animationDuration: string;
  animationIterationCount?: string | number;
  animationTimingFunction?: string;
  animationDirection?: string;
  animationFillMode?: string;
  animationPlayState?: string;
  animationDelay?: string;
};

export type ColorVariant = 'blue' | 'emerald' | 'purple' | 'teal';
export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger';
export type SizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ElevationLevel = 'sm' | 'md' | 'lg' | 'xl';
export type BlurIntensity = 'light' | 'medium' | 'strong';

export type EVChargingStatus = 'available' | 'charging' | 'offline' | 'maintenance' | 'error';

export type DeviceCapabilities = {
  supportsBlur: boolean;
  maxFPS: number;
  reducedMotion: boolean;
};

// Revolutionary component type definitions for better IntelliSense
export interface RevolutionaryComponentProps {
  variant?: ColorVariant;
  size?: SizeVariant;
  elevation?: ElevationLevel;
  className?: string;
  children?: React.ReactNode;
}

export interface MotiAnimatedProps extends RevolutionaryComponentProps {
  from?: Record<string, any>;
  animate?: Record<string, any>;
  transition?: Record<string, any>;
  exit?: Record<string, any>;
  whileHover?: Record<string, any>;
  whileTap?: Record<string, any>;
}

export interface CSSAnimatedProps extends RevolutionaryComponentProps {
  style?: CSSAnimationStyle & Record<string, any>;
  animationName?: string;
  animationDuration?: string;
  animationDelay?: string;
}

// Platform-specific prop types
export interface PlatformSpecificProps {
  ios?: Record<string, any>;
  android?: Record<string, any>;
  web?: Record<string, any>;
  native?: Record<string, any>;
}

// Utility type for combining platform-specific and regular props
export type PlatformAwareProps<T = {}> = T & PlatformSpecificProps;

// Export constants for common values
export const REVOLUTIONARY_COLORS = {
  blue: 'blue-500',
  emerald: 'emerald-500', 
  purple: 'purple-500',
  teal: 'teal-500',
} as const;

export const ANIMATION_DURATIONS = {
  fast: '200ms',
  normal: '300ms',
  slow: '500ms',
  slower: '800ms',
} as const;

export const ELEVATION_LEVELS = {
  sm: 'ios:shadow-sm android:elevation-2',
  md: 'ios:shadow-md android:elevation-6',
  lg: 'ios:shadow-lg android:elevation-12',
  xl: 'ios:shadow-xl android:elevation-20',
} as const;

// Revolutionary design system version
export const MOBILE_DESIGN_VERSION = '2025.1.0';
export const SUPPORTED_PLATFORMS = ['ios', 'android', 'web'] as const;
export const MINIMUM_REACT_NATIVE_VERSION = '0.76.9';
export const MINIMUM_EXPO_VERSION = '52.0.0';

// Feature flags for progressive enhancement
export const FEATURES = {
  REANIMATED_4_CSS_ANIMATIONS: true,
  NATIVEWIND_PLATFORM_MODIFIERS: true,
  ADVANCED_BLUR_EFFECTS: true,
  HAPTIC_FEEDBACK: true,
  ADAPTIVE_PERFORMANCE: true,
  DARK_MODE_SUPPORT: true,
  ACCESSIBILITY_ENHANCED: true,
} as const;

// Components will import hooks and utils directly when needed
// import { useMobileColors } from './hooks';
// import { PlatformStyles } from './utils'; 