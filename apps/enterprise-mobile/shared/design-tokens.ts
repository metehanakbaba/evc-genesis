// Shared design tokens for both platforms (admin-web & mobile)
export const DesignTokens = {
  colors: {
    blue: {
      primary: '#3B82F6',
      gradientColors: ['rgba(59, 130, 246, 0.1)', 'rgba(37, 99, 235, 0.05)', 'rgba(29, 78, 216, 0.02)'],
      border: 'border-blue-400/25',
      text: 'text-blue-200',
      accent: 'bg-blue-500/20',
      glow: 'shadow-blue-500/20',
      psychology: 'Infrastructure & Technical Systems',
      badge: 'bg-blue-500/20 border-blue-400/30'
    },
    emerald: {
      primary: '#10B981', 
      gradientColors: ['rgba(16, 185, 129, 0.1)', 'rgba(5, 150, 105, 0.05)', 'rgba(4, 120, 87, 0.02)'],
      border: 'border-emerald-400/25',
      text: 'text-emerald-200',
      accent: 'bg-emerald-500/20',
      glow: 'shadow-emerald-500/20',
      psychology: 'Live Operations & Real-time Data',
      badge: 'bg-emerald-500/20 border-emerald-400/30'
    },
    purple: {
      primary: '#8B5CF6',
      gradientColors: ['rgba(139, 92, 246, 0.1)', 'rgba(124, 58, 237, 0.05)', 'rgba(109, 40, 217, 0.02)'],
      border: 'border-purple-400/25',
      text: 'text-purple-200',
      accent: 'bg-purple-500/20',
      glow: 'shadow-purple-500/20',
      psychology: 'User Management & Premium Features',
      badge: 'bg-purple-500/20 border-purple-400/30'
    },
    teal: {
      primary: '#14B8A6',
      gradientColors: ['rgba(20, 184, 166, 0.1)', 'rgba(13, 148, 136, 0.05)', 'rgba(15, 118, 110, 0.02)'],
      border: 'border-teal-400/25',
      text: 'text-teal-200',
      accent: 'bg-teal-500/20',
      glow: 'shadow-teal-500/20',
      psychology: 'Financial Systems & Wallet Operations',
      badge: 'bg-teal-500/20 border-teal-400/30'
    }
  },
  sizes: {
    sm: 'p-4 rounded-lg',
    md: 'p-6 rounded-xl', 
    lg: 'p-8 rounded-2xl'
  },
  animations: {
    float: 'animate-float',
    glow: 'animate-glow',
    pulseSoft: 'animate-pulse-soft'
  }
} as const;

export type ColorVariant = keyof typeof DesignTokens.colors;
export type SizeVariant = keyof typeof DesignTokens.sizes; 