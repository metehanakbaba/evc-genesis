import type React from 'react';
import { cn } from '@/shared/utils/cn';

export interface FixedCardProps {
  /** Content of the card */
  children: React.ReactNode;
  /** Card variant for styling */
  variant?: 'stat' | 'management' | 'default';
  /** Custom class name */
  className?: string;
  /** Click handler */
  onClick?: () => void;
  /** Whether the card should have hover effects */
  hoverable?: boolean;
  /** Custom min height */
  minHeight?: string;
  /** Custom max height */
  maxHeight?: string;
}

/**
 * Fixed Card Component
 * Ensures consistent heights and proper overflow handling across all cards
 */
export const FixedCard: React.FC<FixedCardProps> = ({
  children,
  variant = 'default',
  className,
  onClick,
  hoverable = true,
  minHeight,
  maxHeight,
}) => {
  // Height configurations for different card types
  const heightConfig = {
    stat: {
      min: minHeight || '180px',
      max: maxHeight || '220px',
    },
    management: {
      min: minHeight || '320px',
      max: maxHeight || '380px',
    },
    default: {
      min: minHeight || '200px',
      max: maxHeight || 'none',
    },
  };

  const config = heightConfig[variant];

  return (
    <div
      className={cn(
        // Base styles
        'relative h-full flex flex-col overflow-hidden',
        // Height constraints
        `min-h-[${config.min}]`,
        config.max !== 'none' && `max-h-[${config.max}]`,
        // Hover effects
        hoverable && onClick && 'cursor-pointer',
        hoverable && 'transition-all duration-300',
        // Custom classes
        className,
      )}
      style={{
        minHeight: config.min,
        maxHeight: config.max === 'none' ? undefined : config.max,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

/**
 * Fixed Card Header Component
 * For consistent header sections in cards
 */
export const FixedCardHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={cn('flex-shrink-0', className)}>{children}</div>
);

/**
 * Fixed Card Content Component
 * For flexible content areas that fill available space
 */
export const FixedCardContent: React.FC<{
  children: React.ReactNode;
  className?: string;
  scrollable?: boolean;
}> = ({ children, className, scrollable = false }) => (
  <div
    className={cn(
      'flex-1 flex flex-col min-h-0',
      scrollable && 'overflow-y-auto content-scrollable',
      className,
    )}
  >
    {children}
  </div>
);

/**
 * Fixed Card Footer Component
 * For footer sections that stay at the bottom
 */
export const FixedCardFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={cn('flex-shrink-0 mt-auto', className)}>{children}</div>
); 