import type React from 'react';
import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import { cn } from '@/shared/utils/cn';

export interface MinimalStatCardProps {
  /** Card title */
  title: string;
  /** Main value to display */
  value: string;
  /** Icon component */
  icon: React.ComponentType<{ className?: string }>;
  /** Trend information */
  trend: string;
  /** Description text */
  description: string;
  /** Color variant */
  variant: 'blue' | 'emerald' | 'purple' | 'teal';
  /** Additional CSS classes */
  className?: string;
}

/**
 * Minimal Stats Card Component
 * Consistent with GridItem design system for unified dashboard appearance
 */
export const MinimalStatCard: React.FC<MinimalStatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  description,
  variant,
  className = '',
}) => {
  const variantClasses = {
    blue: {
      icon: 'text-blue-400',
      accent: 'text-blue-300',
      background:
        'bg-gradient-to-br from-blue-500/8 via-blue-400/3 to-transparent',
      border: 'border-blue-400/25',
      hover: 'hover:border-blue-300/40',
      glow: 'hover:shadow-blue-500/15',
    },
    emerald: {
      icon: 'text-emerald-400',
      accent: 'text-emerald-300',
      background:
        'bg-gradient-to-br from-emerald-500/8 via-emerald-400/3 to-transparent',
      border: 'border-emerald-400/25',
      hover: 'hover:border-emerald-300/40',
      glow: 'hover:shadow-emerald-500/15',
    },
    purple: {
      icon: 'text-purple-400',
      accent: 'text-purple-300',
      background:
        'bg-gradient-to-br from-purple-500/8 via-purple-400/3 to-transparent',
      border: 'border-purple-400/25',
      hover: 'hover:border-purple-300/40',
      glow: 'hover:shadow-purple-500/15',
    },
    teal: {
      icon: 'text-teal-400',
      accent: 'text-teal-300',
      background:
        'bg-gradient-to-br from-teal-500/8 via-teal-400/3 to-transparent',
      border: 'border-teal-400/25',
      hover: 'hover:border-teal-300/40',
      glow: 'hover:shadow-teal-500/15',
    },
  };

  return (
    <div
      className={cn(
        // Base GridItem-compatible styling
        'backdrop-blur-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 ease-out hover:scale-[1.02] hover:-translate-y-1 border p-6 group relative',
        // Color accent styling consistent with GridItem
        variantClasses[variant].background,
        variantClasses[variant].border,
        variantClasses[variant].hover,
        variantClasses[variant].glow,
        className,
      )}
    >
      {/* Floating accent dot - consistent with GridItem design */}
      <div
        className={cn(
          'absolute -top-2 -right-2 w-4 h-4 rounded-full animate-pulse',
          variantClasses[variant].background.replace(
            'bg-gradient-to-br',
            'bg-gradient-to-r',
          ),
          'border',
          variantClasses[variant].border,
        )}
      />

      <div className="flex items-center justify-between mb-4">
        <div
          className={cn(
            'w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300',
            variantClasses[variant].background,
          )}
        >
          <Icon className={cn('w-7 h-7', variantClasses[variant].icon)} />
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-white mb-1">{value}</div>
          <div
            className={cn(
              'text-xs flex items-center gap-1',
              variantClasses[variant].accent,
            )}
          >
            <ArrowTrendingUpIcon className="w-3 h-3" />
            {trend}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-white font-medium mb-1">{title}</h3>
        <p className="text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {description}
        </p>
      </div>
    </div>
  );
};

export default MinimalStatCard;
