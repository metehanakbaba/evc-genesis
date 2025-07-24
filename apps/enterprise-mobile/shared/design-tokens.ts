// Shared design tokens for both platforms (admin-web & mobile)
export const DesignTokens = {
  colors: {
    // Standard enterprise color scale - more muted and professional
    blue: {
      primary: '#2563EB', // More standard blue
      gradientColors: ['rgba(37, 99, 235, 0.08)', 'rgba(59, 130, 246, 0.04)', 'rgba(29, 78, 216, 0.02)'],
      border: 'border-blue-300/20',
      text: 'text-blue-300',
      accent: 'bg-blue-500/15',
      glow: 'shadow-blue-500/15',
      psychology: 'Infrastructure & Technical Systems',
      badge: 'bg-blue-500/15 border-blue-300/25'
    },
    emerald: {
      primary: '#059669', // More muted emerald
      gradientColors: ['rgba(5, 150, 105, 0.08)', 'rgba(16, 185, 129, 0.04)', 'rgba(4, 120, 87, 0.02)'],
      border: 'border-emerald-300/20',
      text: 'text-emerald-300',
      accent: 'bg-emerald-500/15',
      glow: 'shadow-emerald-500/15',
      psychology: 'Live Operations & Real-time Data',
      badge: 'bg-emerald-500/15 border-emerald-300/25'
    },
    purple: {
      primary: '#7C3AED', // More muted purple
      gradientColors: ['rgba(124, 58, 237, 0.08)', 'rgba(139, 92, 246, 0.04)', 'rgba(109, 40, 217, 0.02)'],
      border: 'border-purple-300/20',
      text: 'text-purple-300',
      accent: 'bg-purple-500/15',
      glow: 'shadow-purple-500/15',
      psychology: 'User Management & Premium Features',
      badge: 'bg-purple-500/15 border-purple-300/25'
    },
    teal: {
      primary: '#0891B2', // More muted teal
      gradientColors: ['rgba(8, 145, 178, 0.08)', 'rgba(20, 184, 166, 0.04)', 'rgba(15, 118, 110, 0.02)'],
      border: 'border-teal-300/20',
      text: 'text-teal-300',
      accent: 'bg-teal-500/15',
      glow: 'shadow-teal-500/15',
      psychology: 'Financial Systems & Wallet Operations',
      badge: 'bg-teal-500/15 border-teal-300/25'
    },
    // Splash screen colors (more vibrant for marketing/splash use only)
    splash: {
      blue: '#3B82F6',
      emerald: '#10B981',
      purple: '#8B5CF6',
      teal: '#14B8A6'
    },
    // Standard neutral scale for enterprise UI
    neutral: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827'
    }
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48
  },
  sizes: {
    sm: 'p-3 rounded-lg',
    md: 'p-4 rounded-xl', 
    lg: 'p-6 rounded-xl'
  },
  animations: {
    float: 'animate-float',
    glow: 'animate-glow',
    pulseSoft: 'animate-pulse-soft'
  }
} as const;

export type ColorVariant = keyof typeof DesignTokens.colors;
export type SizeVariant = keyof typeof DesignTokens.sizes; 