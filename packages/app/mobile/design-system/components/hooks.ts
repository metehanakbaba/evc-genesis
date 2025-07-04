import { useRef, useCallback, useEffect, useState } from 'react';
import { useColorScheme, Platform } from 'react-native';

// Revolutionary Reanimated 4 + NativeWind Color Hook
export const useMobileColors = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return {
    // Tailwind-compatible color system
    blue: {
      primary: isDark ? '#60A5FA' : '#3B82F6',
      background: 'rgba(59, 130, 246, 0.15)',
      // Tailwind classes for NativeWind
      bgClass: 'bg-blue-500/15',
      borderClass: 'border-blue-400/25',
      textClass: 'text-blue-100',
      shadowClass: 'ios:shadow-blue-500/20 android:elevation-8',
    },
    emerald: {
      primary: isDark ? '#34D399' : '#10B981',
      background: 'rgba(16, 185, 129, 0.15)',
      bgClass: 'bg-emerald-500/15',
      borderClass: 'border-emerald-400/25', 
      textClass: 'text-emerald-100',
      shadowClass: 'ios:shadow-emerald-500/20 android:elevation-8',
    },
    purple: {
      primary: isDark ? '#A78BFA' : '#8B5CF6',
      background: 'rgba(139, 92, 246, 0.15)',
      bgClass: 'bg-purple-500/15',
      borderClass: 'border-purple-400/25',
      textClass: 'text-purple-100', 
      shadowClass: 'ios:shadow-purple-500/20 android:elevation-8',
    },
    teal: {
      primary: isDark ? '#2DD4BF' : '#14B8A6',
      background: 'rgba(20, 184, 166, 0.15)',
      bgClass: 'bg-teal-500/15',
      borderClass: 'border-teal-400/25',
      textClass: 'text-teal-100',
      shadowClass: 'ios:shadow-teal-500/20 android:elevation-8',
    },
  };
};

// Reanimated 4 CSS Animation Presets Hook
export const useCSSAnimationPresets = () => {
  return {
    // Revolutionary floating animation with CSS syntax
    revolutionaryFloat: {
      animationName: 'revolutionaryFloat',
      animationDuration: '3s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'ease-in-out',
      animationDirection: 'alternate',
    },

    // Entrance animation
    revolutionaryEntrance: {
      animationName: 'slideInUp',
      animationDuration: '0.8s',
      animationFillMode: 'both',
      animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },

    // Pulse animation for live indicators
    revolutionaryPulse: {
      animationName: 'pulse',
      animationDuration: '2s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },

    // Spin animation for loading
    revolutionarySpin: {
      animationName: 'spin',
      animationDuration: '1s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'linear',
    },

    // Bounce animation
    revolutionaryBounce: {
      animationName: 'bounce',
      animationDuration: '1s',
      animationIterationCount: 'infinite',
    },
  };
};

// Moti Animation Presets for Complex Animations
export const useMotiPresets = () => {
  return {
    // Revolutionary Floating Preset
    revolutionaryFloat: {
      from: {
        opacity: 0,
        scale: 0.8,
        translateY: 20,
        rotateZ: '0deg'
      },
      animate: {
        opacity: 1,
        scale: 1,
        translateY: [-5, 0, -5],
        rotateZ: ['0deg', '2deg', '0deg']
      },
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
        loop: true,
        repeatReverse: true,
        duration: 3000
      }
    },

    // Entrance Animation
    revolutionaryEntrance: {
      from: {
        opacity: 0,
        scale: 0.5,
        translateY: 50
      },
      animate: {
        opacity: 1,
        scale: 1,
        translateY: 0
      },
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 150,
        duration: 800
      }
    },

    // Hover Effect Preset
    revolutionaryHover: {
      from: {
        scale: 1,
        translateY: 0
      },
      animate: {
        scale: 1.05,
        translateY: -8
      },
      transition: {
        type: 'spring',
        damping: 20,
        duration: 200
      }
    },

    // Pulse Effect
    revolutionaryPulse: {
      from: {
        scale: 1,
        opacity: 1
      },
      animate: {
        scale: [1, 1.1, 1],
        opacity: [1, 0.8, 1]
      },
      transition: {
        type: 'timing',
        duration: 1500,
        loop: true,
        repeatReverse: false
      }
    }
  };
};

// NativeWind Platform Utility Hook
export const usePlatformClasses = () => {
  return {
    // Glass effect with platform-specific optimizations
    getGlassClasses: (variant = 'blue') => `
      backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6
      ios:shadow-2xl android:elevation-16
      ${variant === 'blue' ? 'bg-blue-500/15 border-blue-400/30' : ''}
      ${variant === 'emerald' ? 'bg-emerald-500/15 border-emerald-400/30' : ''}
      ${variant === 'purple' ? 'bg-purple-500/15 border-purple-400/30' : ''}
      ${variant === 'teal' ? 'bg-teal-500/15 border-teal-400/30' : ''}
    `.trim(),

    // Button with platform-specific styling
    getButtonClasses: (variant = 'primary', size = 'md') => `
      ${size === 'sm' ? 'px-3 py-2 text-sm' : 'px-6 py-4 text-base'}
      ${size === 'lg' ? 'px-8 py-6 text-lg' : ''}
      rounded-xl font-semibold
      ios:shadow-lg android:elevation-8
      native:will-change-transform
      ${variant === 'primary' ? 'bg-blue-500 text-white' : ''}
      ${variant === 'secondary' ? 'bg-gray-500/20 text-white border border-gray-400/30' : ''}
      ${variant === 'success' ? 'bg-emerald-500 text-white' : ''}
    `.trim(),

    // Card with adaptive styling
    getCardClasses: (elevated = true) => `
      bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4
      ${elevated ? 'ios:shadow-lg android:elevation-8' : ''}
      native:will-change-transform
    `.trim(),

    // Grid layout with responsive design
    getGridClasses: () => `
      flex-row flex-wrap gap-4 p-6
      sm:grid sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
    `.trim(),
  };
};

// Performance Optimization Hook for Battery Efficiency
export const useAdaptiveAnimations = () => {
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);
  const [deviceCapabilities, setDeviceCapabilities] = useState({
    supportsBlur: true,
    maxFPS: 60,
    reducedMotion: false,
  });

  useEffect(() => {
    // Check device capabilities and performance settings
    const checkPerformance = async () => {
      const isLowEnd = Platform.select({
        ios: false, // iOS generally handles blur well
        android: true, // More conservative on Android
        default: false,
      });

      setIsLowPowerMode(isLowEnd);
      setDeviceCapabilities({
        supportsBlur: !isLowEnd,
        maxFPS: isLowEnd ? 30 : 60,
        reducedMotion: isLowEnd,
      });
    };

    checkPerformance();
  }, []);

  return {
    // Adaptive animation duration based on device
    getDuration: (defaultDuration: number) => 
      deviceCapabilities.reducedMotion ? defaultDuration / 2 : defaultDuration,
    
    // Adaptive blur intensity
    getBlurIntensity: (defaultIntensity: number) =>
      deviceCapabilities.supportsBlur ? defaultIntensity : 0,
    
    // Adaptive FPS target
    getFPSTarget: () => deviceCapabilities.maxFPS,
    
    // Check if advanced effects should be enabled
    shouldUseAdvancedEffects: () => !isLowPowerMode && deviceCapabilities.supportsBlur,
    
    // Get adaptive CSS animation properties
    getAdaptiveCSSAnimation: (animationName: string, duration: string) => ({
      animationName: deviceCapabilities.reducedMotion ? 'none' : animationName,
      animationDuration: deviceCapabilities.reducedMotion ? '0s' : duration,
      animationPlayState: deviceCapabilities.reducedMotion ? 'paused' : 'running',
    }),
  };
};

// Revolutionary Staggered Reveal Hook for Lists
export const useStaggeredReveal = (itemCount: number, delay = 100) => {
  const [visibleItems, setVisibleItems] = useState(0);

  const startReveal = useCallback(() => {
    setVisibleItems(0);
    
    // Reveal items progressively
    for (let i = 0; i <= itemCount; i++) {
      setTimeout(() => {
        setVisibleItems(i);
      }, i * delay);
    }
  }, [itemCount, delay]);

  const getItemStyle = useCallback((index: number) => {
    const isVisible = index < visibleItems;
    
    return {
      opacity: isVisible ? 1 : 0,
      transform: [
        { translateY: isVisible ? 0 : 30 },
        { scale: isVisible ? 1 : 0.8 },
      ],
      // CSS animation fallback
      animationDelay: `${index * delay}ms`,
      animationName: isVisible ? 'slideInUp' : 'none',
      animationDuration: '0.6s',
      animationFillMode: 'both',
    };
  }, [visibleItems, delay]);

  const getTailwindClasses = useCallback((index: number) => {
    const isVisible = index < visibleItems;
    return `
      transition-all duration-600 ease-out
      ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}
    `;
  }, [visibleItems]);

  return {
    startReveal,
    getItemStyle,
    getTailwindClasses,
    visibleCount: visibleItems,
  };
}; 