import Link from 'next/link';
import type React from 'react';
import { cn } from '@/shared/utils/cn';
import { Badge } from '../../Display/Badge/Badge';
import type { ComponentSize } from '../../../../lib/theme.config';

export interface NavigationCardProps {
  /** Navigation title */
  title: string;
  /** Navigation description */
  description: string;
  /** Router path */
  path: string;
  /** Icon component */
  icon: React.ComponentType<{ className?: string }>;
  /** Badge text (optional) */
  badge?: string | undefined;
  /** Color variant for sophisticated accent */
  variant?: 'blue' | 'purple' | 'teal' | 'cyan' | 'emerald' | 'amber' | 'rose';
  /** Card size */
  size?: ComponentSize;
  /** Custom className */
  className?: string;
  /** Animation delay for staggered effects */
  animationDelay?: number;
  /** Whether to show floating accent dot */
  showAccent?: boolean;
}

/**
 * Navigation Card Component
 * Revolutionary floating card design with ultra-sophisticated glassmorphism
 */
export const NavigationCard: React.FC<NavigationCardProps> = ({
  title,
  description,
  path,
  icon: Icon,
  badge,
  variant = 'blue',
  size = 'md',
  className = '',
  animationDelay = 0,
  showAccent = true,
}) => {
  // Revolutionary glassmorphism color variants with ultra-sophisticated gradients
  const colorVariants = {
    blue: {
      background:
        'bg-gradient-to-br from-blue-500/12 via-blue-400/6 to-blue-300/2',
      border: 'border border-blue-400/30',
      icon: 'text-blue-300/70 group-hover:text-blue-200/90',
      title: 'text-white/90 group-hover:text-blue-50',
      hover:
        'hover:bg-gradient-to-br hover:from-blue-500/18 hover:to-blue-300/4 hover:shadow-blue-500/20 hover:border-blue-300/50',
      ring: 'focus:ring-blue-500/40',
      accent: 'bg-blue-500/25',
      glow: 'hover:shadow-2xl',
    },
    purple: {
      background:
        'bg-gradient-to-br from-purple-500/12 via-purple-400/6 to-purple-300/2',
      border: 'border border-purple-400/30',
      icon: 'text-purple-300/70 group-hover:text-purple-200/90',
      title: 'text-white/90 group-hover:text-purple-50',
      hover:
        'hover:bg-gradient-to-br hover:from-purple-500/18 hover:to-purple-300/4 hover:shadow-purple-500/20 hover:border-purple-300/50',
      ring: 'focus:ring-purple-500/40',
      accent: 'bg-purple-500/25',
      glow: 'hover:shadow-2xl',
    },
    teal: {
      background:
        'bg-gradient-to-br from-teal-500/12 via-teal-400/6 to-teal-300/2',
      border: 'border border-teal-400/30',
      icon: 'text-teal-300/70 group-hover:text-teal-200/90',
      title: 'text-white/90 group-hover:text-teal-50',
      hover:
        'hover:bg-gradient-to-br hover:from-teal-500/18 hover:to-teal-300/4 hover:shadow-teal-500/20 hover:border-teal-300/50',
      ring: 'focus:ring-teal-500/40',
      accent: 'bg-teal-500/25',
      glow: 'hover:shadow-2xl',
    },
    cyan: {
      background:
        'bg-gradient-to-br from-cyan-500/12 via-cyan-400/6 to-cyan-300/2',
      border: 'border border-cyan-400/30',
      icon: 'text-cyan-300/70 group-hover:text-cyan-200/90',
      title: 'text-white/90 group-hover:text-cyan-50',
      hover:
        'hover:bg-gradient-to-br hover:from-cyan-500/18 hover:to-cyan-300/4 hover:shadow-cyan-500/20 hover:border-cyan-300/50',
      ring: 'focus:ring-cyan-500/40',
      accent: 'bg-cyan-500/25',
      glow: 'hover:shadow-2xl',
    },
    emerald: {
      background:
        'bg-gradient-to-br from-emerald-500/12 via-emerald-400/6 to-emerald-300/2',
      border: 'border border-emerald-400/30',
      icon: 'text-emerald-300/70 group-hover:text-emerald-200/90',
      title: 'text-white/90 group-hover:text-emerald-50',
      hover:
        'hover:bg-gradient-to-br hover:from-emerald-500/18 hover:to-emerald-300/4 hover:shadow-emerald-500/20 hover:border-emerald-300/50',
      ring: 'focus:ring-emerald-500/40',
      accent: 'bg-emerald-500/25',
      glow: 'hover:shadow-2xl',
    },
    amber: {
      background:
        'bg-gradient-to-br from-amber-500/12 via-amber-400/6 to-amber-300/2',
      border: 'border border-amber-400/30',
      icon: 'text-amber-300/70 group-hover:text-amber-200/90',
      title: 'text-white/90 group-hover:text-amber-50',
      hover:
        'hover:bg-gradient-to-br hover:from-amber-500/18 hover:to-amber-300/4 hover:shadow-amber-500/20 hover:border-amber-300/50',
      ring: 'focus:ring-amber-500/40',
      accent: 'bg-amber-500/25',
      glow: 'hover:shadow-2xl',
    },
    rose: {
      background:
        'bg-gradient-to-br from-rose-500/12 via-rose-400/6 to-rose-300/2',
      border: 'border border-rose-400/30',
      icon: 'text-rose-300/70 group-hover:text-rose-200/90',
      title: 'text-white/90 group-hover:text-rose-50',
      hover:
        'hover:bg-gradient-to-br hover:from-rose-500/18 hover:to-rose-300/4 hover:shadow-rose-500/20 hover:border-rose-300/50',
      ring: 'focus:ring-rose-500/40',
      accent: 'bg-rose-500/25',
      glow: 'hover:shadow-2xl',
    },
  };

  // Size variants with modern proportions
  const sizeClasses = {
    xs: 'p-3',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  const iconSizes = {
    xs: 'w-4 h-4',
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-7 h-7',
    xl: 'w-8 h-8',
  };

  const titleSizes = {
    xs: 'text-base',
    sm: 'text-lg',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
  };

  return (
    <Link
      href={path}
      className={cn(
        // Revolutionary floating card base styles
        'group relative flex flex-col cursor-pointer rounded-2xl',
        'backdrop-blur-xl shadow-2xl',
        'transition-all duration-500 ease-out',
        'hover:scale-105 hover:-translate-y-2',
        'focus:outline-none focus:ring-2',
        'transform-gpu', // GPU acceleration
        // Variant specific sophisticated styling
        colorVariants[variant].background,
        colorVariants[variant].border,
        colorVariants[variant].hover,
        colorVariants[variant].ring,
        colorVariants[variant].glow,
        // Size specific padding
        sizeClasses[size],
        // Custom classes
        className,
      )}
      style={
        animationDelay > 0
          ? { animationDelay: `${animationDelay}ms` }
          : undefined
      }
    >
      {/* Floating accent dot for ultra-modern feel */}
      {showAccent && (
        <div
          className={cn(
            'absolute -top-2 -right-2 w-4 h-4 rounded-full animate-pulse',
            colorVariants[variant].accent,
          )}
        />
      )}

      {/* Content container */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          {/* Icon with subtle glow effect */}
          <div
            className={cn(
              'flex items-center justify-center w-10 h-10 rounded-xl backdrop-blur-sm transition-all duration-300',
              colorVariants[variant].accent,
              'group-hover:scale-110',
            )}
          >
            <Icon
              className={cn(
                'transition-all duration-300',
                colorVariants[variant].icon,
                iconSizes[size],
              )}
            />
          </div>

          <h3
            className={cn(
              'font-semibold flex items-center gap-2 transition-all duration-300',
              colorVariants[variant].title,
              titleSizes[size],
            )}
          >
            {title}
            {badge && (
              <Badge variant="primary" size="sm">
                {badge}
              </Badge>
            )}
          </h3>
        </div>

        <p className="text-gray-300/80 text-sm opacity-90 group-hover:opacity-100 group-hover:text-gray-200 transition-all duration-300">
          {description}
        </p>
      </div>

      {/* Ultra-sophisticated gradient overlay on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-br from-white/4 via-white/2 to-transparent transition-opacity duration-500 pointer-events-none" />

      {/* Subtle inner glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-50 bg-gradient-to-br from-transparent via-white/1 to-transparent transition-opacity duration-500 pointer-events-none" />
    </Link>
  );
};
