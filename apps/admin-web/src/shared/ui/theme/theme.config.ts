/**
 * Design Tokens System for EV Charging Admin
 * Centralized, typesafe design configuration
 */

// Core Design Tokens
export const designTokens = {
  // Size System (used across all components)
  size: {
    xs: 'xs',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
  },

  // Spacing Scale
  spacing: {
    '0': '0',
    '1': '0.25rem', // 4px
    '2': '0.5rem', // 8px
    '3': '0.75rem', // 12px
    '4': '1rem', // 16px
    '5': '1.25rem', // 20px
    '6': '1.5rem', // 24px
    '8': '2rem', // 32px
    '10': '2.5rem', // 40px
    '12': '3rem', // 48px
    '16': '4rem', // 64px
    '20': '5rem', // 80px
    '24': '6rem', // 96px
  },

  // Border Radius
  radius: {
    none: '0',
    sm: '0.125rem', // 2px
    md: '0.375rem', // 6px
    lg: '0.5rem', // 8px
    xl: '0.75rem', // 12px
    '2xl': '1rem', // 16px
    full: '9999px',
  },

  // Animation Durations
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slowest: '1000ms',
  },

  // Z-Index Layers
  zIndex: {
    base: 0,
    dropdown: 10,
    sticky: 20,
    fixed: 30,
    modal: 100,
    popover: 200,
    toast: 300,
    tooltip: 400,
  },

  // Typography Scale
  fontSize: {
    xs: 'text-xs', // 12px
    sm: 'text-sm', // 14px
    base: 'text-base', // 16px
    lg: 'text-lg', // 18px
    xl: 'text-xl', // 20px
    '2xl': 'text-2xl', // 24px
    '3xl': 'text-3xl', // 30px
    '4xl': 'text-4xl', // 36px
  },
} as const;

// Component-specific Design Tokens
export const componentTokens = {
  // Input Component Tokens
  input: {
    // Base styles by variant
    base: {
      default:
        'block w-full rounded-xl border transition-all duration-300 outline-none text-white placeholder-gray-400 bg-gray-700/50 backdrop-blur-sm',
      macos:
        'block w-full rounded-lg border-none bg-white/5 text-white focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25',
    },
    // Size variations
    sizes: {
      xs: {
        default: 'px-2 py-1.5 text-xs',
        macos: 'px-2 py-1 text-xs/5',
      },
      sm: {
        default: 'px-3 py-2 text-sm',
        macos: 'px-2 py-1 text-xs/5',
      },
      md: {
        default: 'px-4 py-3 text-base',
        macos: 'px-3 py-1.5 text-sm/6',
      },
      lg: {
        default: 'px-5 py-4 text-lg',
        macos: 'px-4 py-2 text-base/7',
      },
      xl: {
        default: 'px-6 py-5 text-xl',
        macos: 'px-5 py-3 text-lg/8',
      },
    },
    // Focus states
    focus: {
      default: 'border-blue-500 ring-2 ring-blue-500/20 bg-gray-700/70',
      macos: 'data-focus:outline-white/25',
      error: 'border-red-600 focus:border-red-500 focus:ring-red-500/20',
    },
    // Hover states
    hover: {
      default: 'hover:border-gray-500',
      macos: '',
    },
  },

  // Button Component Tokens
  button: {
    // Base styles by style type
    base: {
      default:
        'relative group w-full rounded-xl font-semibold text-white transition-all duration-300 transform overflow-hidden',
      macos:
        'inline-flex items-center gap-2 rounded-md px-3 py-1.5 font-semibold shadow-inner focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white',
    },
    // Size variations
    sizes: {
      xs: {
        default: 'py-1.5 px-2 text-xs',
        macos: 'text-xs/4 px-2 py-1',
      },
      sm: {
        default: 'py-2 px-3 text-sm',
        macos: 'text-xs/5 px-2 py-1',
      },
      md: {
        default: 'py-3 px-4 text-base',
        macos: 'text-sm/6 px-3 py-1.5',
      },
      lg: {
        default: 'py-4 px-6 text-lg',
        macos: 'text-base/7 px-4 py-2',
      },
      xl: {
        default: 'py-5 px-8 text-xl',
        macos: 'text-lg/8 px-5 py-3',
      },
    },
    // Animation states
    animations: {
      default: {
        idle: '',
        loading: 'scale-95 opacity-50 cursor-not-allowed',
        hover: 'hover:scale-[1.02] active:scale-[0.98]',
      },
      macos: '',
    },
  },

  // Badge Component Tokens
  badge: {
    base: 'inline-flex items-center font-medium rounded-full',
    sizes: {
      xs: 'px-1.5 py-0.5 text-xs',
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-0.5 text-sm',
      lg: 'px-3 py-1 text-base',
      xl: 'px-4 py-1.5 text-lg',
    },
  },

  // Checkbox & Switch Component Tokens
  checkbox: {
    sizes: {
      xs: 'h-3 w-3',
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
      xl: 'h-7 w-7',
    },
  },

  // Spinner Component Tokens
  spinner: {
    base: 'animate-spin',
    sizes: {
      xs: 'h-3 w-3',
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
      xl: 'h-12 w-12',
    },
  },

  // Modal Component Tokens
  modal: {
    sizes: {
      xs: 'max-w-xs',
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
    },
  },

  // Card Component Tokens
  card: {
    base: {
      default:
        'bg-gray-800/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50',
      macos: 'bg-white rounded-lg shadow-sm',
    },
    padding: {
      none: '',
      xs: 'p-2',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-10',
    },
  },
} as const;

// Legacy theme for backward compatibility
export const theme = {
  // Button variants
  button: {
    base: componentTokens.button.base.default,
    variants: {
      primary: {
        solid:
          'bg-gray-700 text-white shadow-white/10 data-hover:bg-gray-600 data-open:bg-gray-700',
        outline:
          'border-2 border-gray-700 text-gray-700 bg-transparent data-hover:bg-gray-50 data-open:bg-gray-50',
        ghost:
          'bg-transparent text-gray-700 shadow-none data-hover:bg-gray-100 data-open:bg-transparent',
      },
      secondary: {
        solid:
          'bg-white/10 text-white shadow-white/10 data-hover:bg-white/20 data-open:bg-white/10',
        outline:
          'border-2 border-white text-white bg-transparent data-hover:bg-white/10 data-open:bg-white/10',
        ghost:
          'bg-transparent text-white shadow-none data-hover:bg-white/10 data-open:bg-transparent',
      },
      danger: {
        solid:
          'bg-red-600 text-white shadow-red-500/10 data-hover:bg-red-700 data-open:bg-red-600',
        outline:
          'border-2 border-red-600 text-red-600 bg-transparent data-hover:bg-red-50 data-open:bg-red-50',
        ghost:
          'bg-transparent text-red-600 shadow-none data-hover:bg-red-50 data-open:bg-transparent',
      },
      ghost: {
        solid:
          'bg-transparent text-white shadow-none data-hover:bg-white/10 data-open:bg-transparent',
        outline:
          'border-2 border-white/20 text-white bg-transparent data-hover:bg-white/10 data-open:bg-white/10',
        ghost:
          'bg-transparent text-white shadow-none data-hover:bg-white/10 data-open:bg-transparent',
      },
    },
    sizes: componentTokens.button.sizes,
  },

  // Input styles
  input: {
    base: componentTokens.input.base.default,
    variants: {
      default:
        'border-secondary-300 focus:border-primary-500 focus:ring-primary-500',
      error: 'border-danger-300 focus:border-danger-500 focus:ring-danger-500',
      success:
        'border-success-300 focus:border-success-500 focus:ring-success-500',
    },
    sizes: componentTokens.input.sizes,
  },

  // Card styles
  card: {
    base: componentTokens.card.base.default,
    variants: {
      default: 'border border-gray-700',
      elevated: 'shadow-2xl hover:shadow-blue-500/10 transition-shadow',
      interactive:
        'border border-gray-700 hover:border-blue-500/50 hover:shadow-blue-500/10 transition-all cursor-pointer',
    },
    padding: componentTokens.card.padding,
  },

  // Badge styles
  badge: {
    base: componentTokens.badge.base,
    variants: {
      primary:
        'bg-blue-500/25 text-blue-200 border-2 border-blue-400/60 shadow-md shadow-blue-400/15',
      secondary:
        'bg-purple-500/25 text-purple-200 border-2 border-purple-400/60 shadow-md shadow-purple-400/15',
      success:
        'bg-emerald-500/25 text-emerald-200 border-2 border-emerald-400/60 shadow-md shadow-emerald-400/15',
      danger:
        'bg-rose-500/25 text-rose-200 border-2 border-rose-400/60 shadow-md shadow-rose-400/15',
      warning:
        'bg-amber-500/25 text-amber-200 border-2 border-amber-400/60 shadow-md shadow-amber-400/15',
    },
    sizes: componentTokens.badge.sizes,
  },

  // Spinner styles
  spinner: {
    base: componentTokens.spinner.base,
    sizes: componentTokens.spinner.sizes,
    colors: {
      primary: 'text-primary-600',
      secondary: 'text-secondary-600',
      white: 'text-white',
      current: 'text-current',
    },
  },

  // Animation durations
  animation: designTokens.duration,

  // Z-index levels
  zIndex: designTokens.zIndex,
} as const;

// Atomic Design System Tokens
export const atomicTokens = {
  // Variant system for atomic components
  variants: {
    blue: {
      primary: 'blue-500',
      secondary: 'blue-400',
      accent: 'blue-300',
      background: 'blue-500/15',
      border: 'blue-400/60',
      text: 'blue-200',
      glow: 'blue-400/15',
    },
    emerald: {
      primary: 'emerald-500',
      secondary: 'emerald-400',
      accent: 'emerald-300',
      background: 'emerald-500/15',
      border: 'emerald-400/60',
      text: 'emerald-200',
      glow: 'emerald-400/15',
    },
    purple: {
      primary: 'purple-500',
      secondary: 'purple-400',
      accent: 'purple-300',
      background: 'purple-500/15',
      border: 'purple-400/60',
      text: 'purple-200',
      glow: 'purple-400/15',
    },
    teal: {
      primary: 'teal-500',
      secondary: 'teal-400',
      accent: 'teal-300',
      background: 'teal-500/15',
      border: 'teal-400/60',
      text: 'teal-200',
      glow: 'teal-400/15',
    },
  },

  // Size system for atomic components
  sizes: {
    xs: { scale: '0.75', spacing: '0.25rem', text: 'text-xs' },
    sm: { scale: '0.875', spacing: '0.5rem', text: 'text-sm' },
    md: { scale: '1', spacing: '0.75rem', text: 'text-base' },
    lg: { scale: '1.125', spacing: '1rem', text: 'text-lg' },
    xl: { scale: '1.25', spacing: '1.25rem', text: 'text-xl' },
  },

  // Animation system for atomic components
  animations: {
    durations: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slowest: '1000ms',
    },
    easings: {
      linear: 'linear',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  // Effect system for visual components
  effects: {
    blur: {
      sm: 'blur-sm',
      md: 'blur-md',
      lg: 'blur-lg',
      xl: 'blur-xl',
    },
    intensity: {
      subtle: '0.1',
      medium: '0.25',
      strong: '0.5',
    },
  },
} as const;

// Type exports for TypeScript safety
export type DesignTokens = typeof designTokens;
export type ComponentTokens = typeof componentTokens;
export type AtomicTokens = typeof atomicTokens;
export type Theme = typeof theme;

// Size type for component props
export type ComponentSize = keyof typeof designTokens.size;
export type AtomicVariant = keyof typeof atomicTokens.variants;
export type AtomicSize = keyof typeof atomicTokens.sizes;

// Utility functions for getting token values
export const getComponentSize = <T extends keyof ComponentTokens>(
  component: T,
  size: ComponentSize,
): string => {
  const componentToken = componentTokens[component];

  if ('sizes' in componentToken) {
    const sizeToken = componentToken.sizes[size];

    if (typeof sizeToken === 'object') {
      return sizeToken.default || '';
    }

    return sizeToken || '';
  }

  return '';
};

export const getSpacing = (key: keyof typeof designTokens.spacing): string => {
  return designTokens.spacing[key];
};

export const getDuration = (
  key: keyof typeof designTokens.duration,
): string => {
  return designTokens.duration[key];
};
