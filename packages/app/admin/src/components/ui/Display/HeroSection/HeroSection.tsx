import type React from 'react';
import type { ComponentSize } from '../../../theme/theme.config';
import { cn } from '@/shared/utils/cn';

export interface HeroSectionProps {
  /** Hero title */
  title: string;
  /** Hero subtitle/description */
  subtitle?: string;
  /** Icon component */
  icon?: React.ComponentType<{ className?: string }>;
  /** Hero size */
  size?: ComponentSize;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Bottom margin */
  marginBottom?: ComponentSize;
  /** Custom className */
  className?: string;
  /** Children content */
  children?: React.ReactNode;
}

/**
 * Hero Section Component
 * Displays page header with title, subtitle, and optional icon
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  icon: Icon,
  size = 'lg',
  align = 'center',
  marginBottom = 'lg',
  className = '',
  children,
}) => {
  // Size variants for title
  const titleSizes = {
    xs: 'text-2xl',
    sm: 'text-3xl',
    md: 'text-4xl',
    lg: 'text-4xl',
    xl: 'text-5xl',
  };

  // Size variants for subtitle
  const subtitleSizes = {
    xs: 'text-sm',
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  // Size variants for icon
  const iconSizes = {
    xs: 'h-6 w-6',
    sm: 'h-7 w-7',
    md: 'h-8 w-8',
    lg: 'h-8 w-8',
    xl: 'h-10 w-10',
  };

  // Alignment classes
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  // Margin bottom classes
  const marginClasses = {
    xs: 'mb-4',
    sm: 'mb-6',
    md: 'mb-8',
    lg: 'mb-10',
    xl: 'mb-12',
  };

  // Flex justify classes for alignment
  const flexJustifyClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  return (
    <div
      className={cn(
        alignmentClasses[align],
        marginClasses[marginBottom],
        className,
      )}
    >
      <div
        className={cn(
          'flex items-center gap-3 mb-2',
          flexJustifyClasses[align],
        )}
      >
        {Icon && <Icon className={cn(iconSizes[size], 'text-blue-400')} />}
        <h1 className={cn('font-bold text-white', titleSizes[size])}>
          {title}
        </h1>
      </div>
      {subtitle && (
        <p className={cn('text-gray-300', subtitleSizes[size])}>{subtitle}</p>
      )}
      {children}
    </div>
  );
};
