import { StyleSheet, Platform, Dimensions } from 'react-native';

// Revolutionary dark/light mode styles creator
export const createMobileStyles = (colors: any) => StyleSheet.create({
  revolutionaryContainer: {
    flex: 1,
    backgroundColor: colors.background.primary,
    paddingHorizontal: 20,
    paddingTop: Platform.select({
      ios: 60, // Account for safe area
      android: 40,
    }),
  },
  glassmorphismCard: {
    borderRadius: 20,
    padding: 20,
    marginVertical: 8,
    backgroundColor: colors.blue.background,
    borderWidth: 1,
    borderColor: colors.blue.border,
    ...Platform.select({
      ios: {
        shadowColor: colors.blue.shadow,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  floatingCard: {
    borderRadius: 20,
    padding: 16,
    marginVertical: 6,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  accentDot: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 12,
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    opacity: 0.8,
    lineHeight: 20,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    opacity: 0.8,
  },
  liveIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  liveText: {
    fontSize: 10,
    fontWeight: '600',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  trend: {
    fontSize: 12,
    fontWeight: '500',
  },
});

// Mobile color variants
export const mobileColorVariants = {
  blue: {
    primary: '#3B82F6',
    light: '#60A5FA',
    dark: '#1D4ED8',
  },
  emerald: {
    primary: '#10B981',
    light: '#34D399',
    dark: '#047857',
  },
  purple: {
    primary: '#8B5CF6',
    light: '#A78BFA',
    dark: '#7C3AED',
  },
  teal: {
    primary: '#14B8A6',
    light: '#2DD4BF',
    dark: '#0F766E',
  },
};

// Platform-specific styles
export const platformStyles = StyleSheet.create({
  iosCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  androidCard: {
    elevation: 4,
  },
  iosBlur: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  androidBlur: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
});

// Device and Platform Detection
export const DeviceInfo = {
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
  isWeb: Platform.OS === 'web',
  isNative: Platform.OS !== 'web',
  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,
  
  // Device size categories for responsive design
  isSmallDevice: Dimensions.get('window').width < 375,
  isMediumDevice: Dimensions.get('window').width >= 375 && Dimensions.get('window').width < 414,
  isLargeDevice: Dimensions.get('window').width >= 414,
  
  // Device orientation
  isLandscape: Dimensions.get('window').width > Dimensions.get('window').height,
  isPortrait: Dimensions.get('window').width <= Dimensions.get('window').height,
};

// CSS Animation Keyframes Generator for Reanimated 4
export const createCSSKeyframes = {
  // Revolutionary floating animation
  revolutionaryFloat: `
    @keyframes revolutionaryFloat {
      0%, 100% { transform: translateY(0px) scale(1) rotateZ(0deg); }
      25% { transform: translateY(-8px) scale(1.02) rotateZ(1deg); }
      50% { transform: translateY(-5px) scale(1.01) rotateZ(0deg); }
      75% { transform: translateY(-10px) scale(1.03) rotateZ(-1deg); }
    }
  `,
  
  // Entrance animations
  slideInUp: `
    @keyframes slideInUp {
      from { 
        opacity: 0; 
        transform: translateY(30px) scale(0.9); 
      }
      to { 
        opacity: 1; 
        transform: translateY(0) scale(1); 
      }
    }
  `,
  
  slideInRight: `
    @keyframes slideInRight {
      from { 
        opacity: 0; 
        transform: translateX(30px) scale(0.9); 
      }
      to { 
        opacity: 1; 
        transform: translateX(0) scale(1); 
      }
    }
  `,
  
  // Revolutionary pulse for live indicators
  revolutionaryPulse: `
    @keyframes revolutionaryPulse {
      0%, 100% { 
        transform: scale(1); 
        opacity: 1; 
      }
      50% { 
        transform: scale(1.1); 
        opacity: 0.8; 
      }
    }
  `,
  
  // Shake animation for error states
  shake: `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
  `,
};

// NativeWind Responsive Utility Classes
export const ResponsiveClasses = {
  // Container classes with platform-specific optimizations
  container: {
    base: 'w-full px-4 mx-auto',
    sm: 'sm:px-6 sm:max-w-md',
    md: 'md:px-8 md:max-w-lg',
    lg: 'lg:px-10 lg:max-w-xl',
    native: 'native:px-6',
  },
  
  // Grid system with responsive columns
  grid: {
    base: 'flex-row flex-wrap gap-4',
    responsive: 'sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    native: 'native:flex-row native:flex-wrap',
  },
  
  // Typography scale
  text: {
    xs: 'text-xs leading-4',
    sm: 'text-sm leading-5',
    base: 'text-base leading-6',
    lg: 'text-lg leading-7',
    xl: 'text-xl leading-8',
    '2xl': 'text-2xl leading-9',
    '3xl': 'text-3xl leading-10',
    responsive: 'text-sm sm:text-base md:text-lg lg:text-xl',
  },
  
  // Spacing scale
  spacing: {
    xs: 'p-2 gap-2',
    sm: 'p-4 gap-3', 
    base: 'p-6 gap-4',
    lg: 'p-8 gap-6',
    xl: 'p-10 gap-8',
  },
};

// Platform-Specific Style Utilities
export const PlatformStyles = {
  // Shadow styles for different platforms
  getShadow: (elevation: 'sm' | 'md' | 'lg' | 'xl' = 'md', color = 'black') => {
    const shadows = {
      sm: 'ios:shadow-sm android:elevation-2',
      md: 'ios:shadow-md android:elevation-6',
      lg: 'ios:shadow-lg android:elevation-12',
      xl: 'ios:shadow-xl android:elevation-20',
    };
    
    return `${shadows[elevation]} ios:shadow-${color}/20`;
  },
  
  // Glass morphism effects
  getGlassEffect: (intensity: 'light' | 'medium' | 'strong' = 'medium') => {
    const effects = {
      light: 'backdrop-blur-sm bg-white/5 border-white/10',
      medium: 'backdrop-blur-md bg-white/10 border-white/20',
      strong: 'backdrop-blur-xl bg-white/20 border-white/30',
    };
    
    return `${effects[intensity]} border border-solid`;
  },
  
  // Button variants with platform optimization
  getButtonVariant: (variant: 'primary' | 'secondary' | 'success' | 'danger' = 'primary') => {
    const variants = {
      primary: 'bg-blue-500 text-white ios:shadow-blue-500/30 android:elevation-8',
      secondary: 'bg-gray-500/20 text-white border border-gray-400/30',
      success: 'bg-emerald-500 text-white ios:shadow-emerald-500/30 android:elevation-8',
      danger: 'bg-red-500 text-white ios:shadow-red-500/30 android:elevation-8',
    };
    
    return `${variants[variant]} px-6 py-4 rounded-xl font-semibold native:will-change-transform`;
  },
};

// Animation Timing and Easing Utilities
export const AnimationConfig = {
  // CSS-compatible timing functions
  timing: {
    linear: 'linear',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    spring: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  
  // Duration presets
  duration: {
    fast: '200ms',
    normal: '300ms',
    slow: '500ms',
    slower: '800ms',
    slowest: '1200ms',
  },
  
  // Animation delay utilities
  delay: {
    none: '0ms',
    short: '100ms',
    medium: '200ms',
    long: '500ms',
  },
  
  // Stagger timing for list animations
  getStaggerDelay: (index: number, baseDelay = 100) => `${index * baseDelay}ms`,
};

// Color Utility Functions
export const ColorUtils = {
  // Generate color variants with opacity
  generateColorVariants: (baseColor: string) => ({
    5: `${baseColor}/5`,
    10: `${baseColor}/10`,
    15: `${baseColor}/15`,
    20: `${baseColor}/20`,
    25: `${baseColor}/25`,
    30: `${baseColor}/30`,
    40: `${baseColor}/40`,
    50: `${baseColor}/50`,
    60: `${baseColor}/60`,
    70: `${baseColor}/70`,
    80: `${baseColor}/80`,
    90: `${baseColor}/90`,
  }),
  
  // EV charging status colors
  evChargingColors: {
    available: {
      primary: 'emerald-500',
      background: 'emerald-500/15',
      border: 'emerald-400/25',
      text: 'emerald-100',
      classes: 'bg-emerald-500/15 border-emerald-400/25 text-emerald-100',
    },
    charging: {
      primary: 'blue-500',
      background: 'blue-500/15',
      border: 'blue-400/25',
      text: 'blue-100',
      classes: 'bg-blue-500/15 border-blue-400/25 text-blue-100',
    },
    offline: {
      primary: 'gray-500',
      background: 'gray-500/15',
      border: 'gray-400/25',
      text: 'gray-100',
      classes: 'bg-gray-500/15 border-gray-400/25 text-gray-100',
    },
    maintenance: {
      primary: 'yellow-500',
      background: 'yellow-500/15',
      border: 'yellow-400/25',
      text: 'yellow-100',
      classes: 'bg-yellow-500/15 border-yellow-400/25 text-yellow-100',
    },
    error: {
      primary: 'red-500',
      background: 'red-500/15',
      border: 'red-400/25', 
      text: 'red-100',
      classes: 'bg-red-500/15 border-red-400/25 text-red-100',
    },
  },
};

// Performance Optimization Utilities
export const PerformanceUtils = {
  // Check if device supports advanced effects
  shouldUseAdvancedEffects: () => {
    if (DeviceInfo.isWeb) return true;
    if (DeviceInfo.isIOS) return true;
    if (DeviceInfo.isAndroid && DeviceInfo.isLargeDevice) return true;
    return false;
  },
  
  // Get optimized animation duration based on device
  getOptimizedDuration: (baseDuration: number) => {
    if (DeviceInfo.isSmallDevice) return baseDuration * 0.8;
    if (DeviceInfo.isAndroid && !DeviceInfo.isLargeDevice) return baseDuration * 0.9;
    return baseDuration;
  },
  
  // Get blur intensity based on device capabilities
  getOptimizedBlurIntensity: (baseIntensity: number) => {
    if (!PerformanceUtils.shouldUseAdvancedEffects()) return 0;
    if (DeviceInfo.isAndroid) return Math.min(baseIntensity * 0.7, 20);
    return baseIntensity;
  },
  
  // FPS target based on device
  getTargetFPS: () => {
    if (DeviceInfo.isSmallDevice) return 30;
    if (DeviceInfo.isAndroid && !DeviceInfo.isLargeDevice) return 45;
    return 60;
  },
};

// Layout Utility Functions
export const LayoutUtils = {
  // Safe area classes
  getSafeAreaClasses: () => 'pt-safe-top pb-safe-bottom',
  
  // Full screen classes
  getFullScreenClasses: () => 'flex-1 w-full h-full',
  
  // Center content classes
  getCenterClasses: () => 'flex-1 justify-center items-center',
  
  // Flex utilities
  getFlexClasses: (direction: 'row' | 'col' = 'col', align: 'start' | 'center' | 'end' = 'start') => {
    const directions = { row: 'flex-row', col: 'flex-col' };
    const alignments = { start: 'items-start', center: 'items-center', end: 'items-end' };
    return `flex ${directions[direction]} ${alignments[align]}`;
  },
  
  // Grid layout generator
  getGridLayout: (cols: number = 2, gap: 'sm' | 'md' | 'lg' = 'md') => {
    const gaps = { sm: 'gap-2', md: 'gap-4', lg: 'gap-6' };
    return `grid grid-cols-${cols} ${gaps[gap]}`;
  },
};

// Accessibility Utilities
export const AccessibilityUtils = {
  // Screen reader support
  getScreenReaderClasses: (label: string) => `sr-only`,
  
  // Focus states
  getFocusClasses: () => 'focus:ring-2 focus:ring-blue-500/50 focus:outline-none',
  
  // High contrast mode support
  getHighContrastClasses: () => 'contrast-more:border-black contrast-more:text-black',
  
  // Reduced motion support
  getReducedMotionClasses: () => 'motion-reduce:animate-none motion-reduce:transition-none',
};

// Validation and Type Utilities
export const ValidationUtils = {
  // Check if className is valid
  isValidClassName: (className: string): boolean => {
    return typeof className === 'string' && className.length > 0;
  },
  
  // Combine class names safely
  combineClasses: (...classes: (string | undefined | null)[]): string => {
    return classes
      .filter((cls): cls is string => Boolean(cls))
      .join(' ')
      .trim();
  },
  
  // Remove duplicates from class string
  deduplicateClasses: (className: string): string => {
    const classes = className.split(' ').filter(Boolean);
    return Array.from(new Set(classes)).join(' ');
  },
};

// Export everything as a unified utilities object
export const MobileUtils = {
  DeviceInfo,
  createCSSKeyframes,
  ResponsiveClasses,
  PlatformStyles,
  AnimationConfig,
  ColorUtils,
  PerformanceUtils,
  LayoutUtils,
  AccessibilityUtils,
  ValidationUtils,
};

export default MobileUtils; 