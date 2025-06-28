import type React from 'react';
import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import { cn } from '@/shared/utils/cn';

export interface FloatingCardProps {
  /** Card title */
  title: string;
  /** Main value to display */
  value: string;
  /** Icon component */
  icon: React.ComponentType<{ className?: string }>;
  /** Color variant */
  variant?:
    | 'blue'
    | 'emerald'
    | 'purple'
    | 'teal'
    | 'cyan'
    | 'amber'
    | 'rose'
    | 'indigo';
  /** Trend indicator text (optional) */
  trend?: string;
  /** Additional description shown on hover (optional) */
  description?: string;
  /** Card size */
  size?: 'sm' | 'md' | 'lg';
  /** Custom className */
  className?: string;
  /** Animation delay for staggered effects */
  animationDelay?: number;
  /** Whether to show floating accent dot */
  showAccent?: boolean;
  /** Custom content for trend area */
  trendContent?: React.ReactNode;
}

/**
 * Modern Floating Card Component
 * Ultra-sophisticated design with glassmorphism, animations, and interactive elements
 */
export const FloatingCard: React.FC<FloatingCardProps> = ({
  title,
  value,
  icon: Icon,
  variant = 'blue',
  trend,
  description,
  size = 'md',
  className,
  animationDelay = 0,
  showAccent = true,
  trendContent,
}) => {
  // Color variants with sophisticated gradients
  const colorVariants = {
    blue: {
      background:
        'bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-transparent',
      border: 'border border-blue-400/20',
      icon: 'text-blue-300/80',
      accent: 'bg-blue-500/20',
      glow: 'hover:shadow-blue-500/20',
      trend: 'text-blue-300',
      hover: 'hover:border-blue-300/30',
    },
    emerald: {
      background:
        'bg-gradient-to-br from-emerald-500/10 via-emerald-400/5 to-transparent',
      border: 'border border-emerald-400/20',
      icon: 'text-emerald-300/80',
      accent: 'bg-emerald-500/20',
      glow: 'hover:shadow-emerald-500/20',
      trend: 'text-emerald-300',
      hover: 'hover:border-emerald-300/30',
    },
    purple: {
      background:
        'bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-transparent',
      border: 'border border-purple-400/20',
      icon: 'text-purple-300/80',
      accent: 'bg-purple-500/20',
      glow: 'hover:shadow-purple-500/20',
      trend: 'text-purple-300',
      hover: 'hover:border-purple-300/30',
    },
    teal: {
      background:
        'bg-gradient-to-br from-teal-500/10 via-teal-400/5 to-transparent',
      border: 'border border-teal-400/20',
      icon: 'text-teal-300/80',
      accent: 'bg-teal-500/20',
      glow: 'hover:shadow-teal-500/20',
      trend: 'text-teal-300',
      hover: 'hover:border-teal-300/30',
    },
    cyan: {
      background:
        'bg-gradient-to-br from-cyan-500/10 via-cyan-400/5 to-transparent',
      border: 'border border-cyan-400/20',
      icon: 'text-cyan-300/80',
      accent: 'bg-cyan-500/20',
      glow: 'hover:shadow-cyan-500/20',
      trend: 'text-cyan-300',
      hover: 'hover:border-cyan-300/30',
    },
    amber: {
      background:
        'bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-transparent',
      border: 'border border-amber-400/20',
      icon: 'text-amber-300/80',
      accent: 'bg-amber-500/20',
      glow: 'hover:shadow-amber-500/20',
      trend: 'text-amber-300',
      hover: 'hover:border-amber-300/30',
    },
    rose: {
      background:
        'bg-gradient-to-br from-rose-500/10 via-rose-400/5 to-transparent',
      border: 'border border-rose-400/20',
      icon: 'text-rose-300/80',
      accent: 'bg-rose-500/20',
      glow: 'hover:shadow-rose-500/20',
      trend: 'text-rose-300',
      hover: 'hover:border-rose-300/30',
    },
    indigo: {
      background:
        'bg-gradient-to-br from-indigo-500/10 via-indigo-400/5 to-transparent',
      border: 'border border-indigo-400/20',
      icon: 'text-indigo-300/80',
      accent: 'bg-indigo-500/20',
      glow: 'hover:shadow-indigo-500/20',
      trend: 'text-indigo-300',
      hover: 'hover:border-indigo-300/30',
    },
  };

  // Size variants
  const sizeVariants = {
    sm: {
      container: 'p-4',
      iconContainer: 'w-10 h-10',
      icon: 'w-5 h-5',
      value: 'text-2xl',
      accent: 'w-3 h-3 -top-1 -right-1',
    },
    md: {
      container: 'p-6',
      iconContainer: 'w-14 h-14',
      icon: 'w-7 h-7',
      value: 'text-3xl',
      accent: 'w-4 h-4 -top-2 -right-2',
    },
    lg: {
      container: 'p-8',
      iconContainer: 'w-16 h-16',
      icon: 'w-8 h-8',
      value: 'text-4xl',
      accent: 'w-5 h-5 -top-2 -right-2',
    },
  };

  return (
    <div
      className={cn(
        // Base floating card styles
        'group relative backdrop-blur-xl rounded-2xl',
        'shadow-2xl hover:shadow-3xl',
        'transition-all duration-500 ease-out',
        'hover:scale-105 hover:-translate-y-2',
        // Variant specific styling
        colorVariants[variant].background,
        colorVariants[variant].border,
        colorVariants[variant].glow,
        colorVariants[variant].hover,
        // Size specific padding
        sizeVariants[size].container,
        // Custom classes
        className,
      )}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Floating accent dot */}
      {showAccent && (
        <div
          className={cn(
            'absolute rounded-full animate-pulse',
            colorVariants[variant].accent,
            sizeVariants[size].accent,
          )}
        />
      )}

      {/* Icon with background */}
      <div
        className={cn(
          'inline-flex items-center justify-center rounded-2xl mb-4 backdrop-blur-sm',
          colorVariants[variant].accent,
          sizeVariants[size].iconContainer,
        )}
      >
        <Icon
          className={cn(colorVariants[variant].icon, sizeVariants[size].icon)}
        />
      </div>

      {/* Value */}
      <div
        className={cn(
          'font-bold text-white mb-1 tracking-tight',
          sizeVariants[size].value,
        )}
      >
        {value}
      </div>

      {/* Title */}
      <div className="text-gray-300 text-sm font-medium mb-2">{title}</div>

      {/* Trend indicator or custom content */}
      {(trend || trendContent) && (
        <div
          className={cn(
            'flex items-center gap-1 text-xs font-medium',
            colorVariants[variant].trend,
          )}
        >
          {trendContent || (
            <>
              <ArrowTrendingUpIcon className="w-3 h-3" />
              {trend}
            </>
          )}
        </div>
      )}

      {/* Description */}
      {description && (
        <div className="text-xs text-gray-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {description}
        </div>
      )}

      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-br from-white/5 to-transparent transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};
