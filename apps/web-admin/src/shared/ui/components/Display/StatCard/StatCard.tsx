import type React from 'react';
import type { ComponentSize } from '../../../theme/theme.config';
import { cn } from '@/shared/utils/cn';

export interface StatCardProps {
  /** Stat title */
  title: string;
  /** Stat value */
  value: string;
  /** Icon component */
  icon: React.ComponentType<{ className?: string }>;
  /** Color variant for subtle accent */
  variant?: 'blue' | 'purple' | 'teal' | 'emerald';
  /** Card size */
  size?: ComponentSize;
  /** Custom className */
  className?: string;
}

/**
 * Stat Card Component
 * Displays statistical information with subtle glassmorphism accent colors
 */
export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  variant = 'blue',
  size = 'md',
  className = '',
}) => {
  // Modern glassmorphism color variants - subtle but elegant
  const colorVariants = {
    blue: {
      background: 'bg-blue-500/6 backdrop-blur-sm border border-blue-500/15',
      icon: 'text-blue-300/70 group-hover:text-blue-200',
      value: 'text-white group-hover:text-blue-50',
      glow: 'group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.2)]',
      hover: 'group-hover:bg-blue-500/10 group-hover:border-blue-400/25',
    },
    purple: {
      background:
        'bg-purple-500/6 backdrop-blur-sm border border-purple-500/15',
      icon: 'text-purple-300/70 group-hover:text-purple-200',
      value: 'text-white group-hover:text-purple-50',
      glow: 'group-hover:drop-shadow-[0_0_8px_rgba(147,51,234,0.2)]',
      hover: 'group-hover:bg-purple-500/10 group-hover:border-purple-400/25',
    },
    teal: {
      background: 'bg-teal-500/6 backdrop-blur-sm border border-teal-500/15',
      icon: 'text-teal-300/70 group-hover:text-teal-200',
      value: 'text-white group-hover:text-teal-50',
      glow: 'group-hover:drop-shadow-[0_0_8px_rgba(20,184,166,0.2)]',
      hover: 'group-hover:bg-teal-500/10 group-hover:border-teal-400/25',
    },
    emerald: {
      background:
        'bg-emerald-500/6 backdrop-blur-sm border border-emerald-500/15',
      icon: 'text-emerald-300/70 group-hover:text-emerald-200',
      value: 'text-white group-hover:text-emerald-50',
      glow: 'group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.2)]',
      hover: 'group-hover:bg-emerald-500/10 group-hover:border-emerald-400/25',
    },
  };

  // Size variants for text and icons
  const sizeVariants = {
    xs: {
      value: 'text-xl',
      icon: 'w-5 h-5',
    },
    sm: {
      value: 'text-2xl',
      icon: 'w-6 h-6',
    },
    md: {
      value: 'text-3xl',
      icon: 'w-8 h-8',
    },
    lg: {
      value: 'text-4xl',
      icon: 'w-10 h-10',
    },
    xl: {
      value: 'text-5xl',
      icon: 'w-12 h-12',
    },
  };

  return (
    <div
      className={cn(
        'text-center p-4 rounded-lg transition-all duration-300 group cursor-default',
        colorVariants[variant].background,
        colorVariants[variant].hover,
        className,
      )}
    >
      <div
        className={cn(
          'font-bold mb-3 flex items-center justify-center gap-3',
          'transition-all duration-300',
          colorVariants[variant].value,
          colorVariants[variant].glow,
          sizeVariants[size].value,
        )}
      >
        <Icon
          className={cn(
            'transition-all duration-300',
            colorVariants[variant].icon,
            sizeVariants[size].icon,
          )}
        />
        {value}
      </div>
      <div className="text-gray-400 text-sm font-medium group-hover:text-gray-300 transition-colors duration-300">
        {title}
      </div>
    </div>
  );
};
