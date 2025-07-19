import React from 'react';
import { cn } from '../../utils';
import { TextElement } from '../../atoms/TextElement';
import { AccentDot } from '../../atoms/AccentDot';
import type { 
  BaseComponentProps, 
  VariantProps, 
  SizeProps 
} from '../../atoms/types';

/**
 * TrendIndicator Component Props
 * 
 * Molecule component that composes AccentDot and TextElement atoms
 * to display live status indicators with animated dots and trend information
 */
export interface TrendIndicatorProps 
  extends BaseComponentProps, 
          VariantProps, 
          SizeProps {
  /** Status of the indicator */
  status?: 'live' | 'offline' | 'warning' | 'success' | 'error';
  /** Trend text to display (e.g., "+12%", "Stable", "Increasing") */
  trend?: string;
  /** Label text for the indicator */
  label?: string;
  /** Enable animated dot for live status */
  animated?: boolean;
  /** Layout orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Dot position relative to text */
  dotPosition?: 'left' | 'right' | 'top' | 'bottom';
  /** Custom animation speed for the dot */
  animationSpeed?: number;
  /** Click handler for interactive indicators */
  onClick?: () => void;
}

/**
 * Status mappings for TrendIndicator styling
 */
const statusConfig = {
  live: {
    variant: 'emerald' as const,
    dotVariant: 'emerald' as const,
    label: 'Live',
    animated: true,
  },
  offline: {
    variant: 'purple' as const,
    dotVariant: 'purple' as const,
    label: 'Offline',
    animated: false,
  },
  warning: {
    variant: 'teal' as const,
    dotVariant: 'teal' as const,
    label: 'Warning',
    animated: true,
  },
  success: {
    variant: 'emerald' as const,
    dotVariant: 'emerald' as const,
    label: 'Success',
    animated: false,
  },
  error: {
    variant: 'purple' as const,
    dotVariant: 'purple' as const,
    label: 'Error',
    animated: true,
  },
} as const;

/**
 * Size mappings for TrendIndicator layout
 */
const layoutSizes = {
  xs: {
    container: 'gap-1',
    dotSize: 'xs' as const,
    textSize: 'xs' as const,
    trendSize: 'xs' as const,
  },
  sm: {
    container: 'gap-1.5',
    dotSize: 'sm' as const,
    textSize: 'sm' as const,
    trendSize: 'xs' as const,
  },
  md: {
    container: 'gap-2',
    dotSize: 'sm' as const,
    textSize: 'sm' as const,
    trendSize: 'sm' as const,
  },
  lg: {
    container: 'gap-2',
    dotSize: 'md' as const,
    textSize: 'md' as const,
    trendSize: 'sm' as const,
  },
  xl: {
    container: 'gap-3',
    dotSize: 'md' as const,
    textSize: 'lg' as const,
    trendSize: 'md' as const,
  },
} as const;

/**
 * TrendIndicator - Molecule component for live status and trend display
 * 
 * Composes AccentDot and TextElement atoms to create status indicators
 * with animated dots and trend information. Supports multiple status types
 * and flexible layout options.
 * 
 * @example
 * ```tsx
 * <TrendIndicator 
 *   status="live" 
 *   trend="+12%" 
 *   size="md" 
 *   animated 
 * />
 * <TrendIndicator 
 *   status="warning" 
 *   label="System Status"
 *   trend="Degraded Performance"
 *   orientation="vertical"
 * />
 * ```
 */
export const TrendIndicator: React.FC<TrendIndicatorProps> = ({
  status = 'live',
  trend,
  label,
  variant,
  size = 'md',
  animated,
  orientation = 'horizontal',
  dotPosition = 'left',
  animationSpeed = 1,
  onClick,
  className,
  'data-testid': testId = 'trend-indicator',
  ...props
}) => {
  // Get status configuration
  const statusConf = statusConfig[status];
  
  // Use variant override or status variant
  const effectiveVariant = variant || statusConf.variant;
  const dotVariant = statusConf.dotVariant;
  
  // Determine if dot should be animated
  const shouldAnimate = animated !== undefined ? animated : statusConf.animated;
  
  // Get size configuration
  const sizeConfig = layoutSizes[size];
  
  // Determine if component is interactive
  const isInteractive = Boolean(onClick);
  
  // Get display label
  const displayLabel = label !== undefined ? label : statusConf.label;

  // Build container classes based on orientation and dot position
  const getContainerClasses = () => {
    const baseClasses = [
      'relative inline-flex items-center',
      sizeConfig.container,
    ];

    if (orientation === 'horizontal') {
      if (dotPosition === 'left' || dotPosition === 'right') {
        baseClasses.push('flex-row');
        if (dotPosition === 'right') {
          baseClasses.push('flex-row-reverse');
        }
      } else {
        baseClasses.push('flex-col');
        if (dotPosition === 'bottom') {
          baseClasses.push('flex-col-reverse');
        }
      }
    } else {
      baseClasses.push('flex-col');
      if (dotPosition === 'bottom') {
        baseClasses.push('flex-col-reverse');
      }
    }

    if (isInteractive) {
      baseClasses.push('cursor-pointer', 'transition-all', 'duration-200', 'hover:scale-105');
    }

    return baseClasses;
  };

  const containerClasses = cn(
    ...getContainerClasses(),
    className
  );

  // Handle click
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={containerClasses}
      onClick={handleClick}
      data-testid={testId}
      data-status={status}
      data-variant={effectiveVariant}
      data-size={size}
      data-orientation={orientation}
      data-dot-position={dotPosition}
      data-interactive={isInteractive}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={isInteractive ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      } : undefined}
      {...props}
    >
      {/* Status Dot */}
      <div className="relative">
        <AccentDot
          variant={dotVariant}
          size={sizeConfig.dotSize}
          position="center"
          animated={shouldAnimate}
          animationSpeed={animationSpeed}
          data-testid={`${testId}-dot`}
        />
      </div>

      {/* Content Section */}
      <div className={cn(
        'flex',
        orientation === 'horizontal' ? 'flex-col' : 'flex-row items-center gap-2'
      )}>
        {/* Status Label */}
        <TextElement
          as="span"
          variant={effectiveVariant}
          size={sizeConfig.textSize}
          weight="medium"
          opacity="high"
          data-testid={`${testId}-label`}
        >
          {displayLabel}
        </TextElement>

        {/* Trend Information */}
        {trend && (
          <TextElement
            as="span"
            variant={effectiveVariant}
            size={sizeConfig.trendSize}
            weight="normal"
            opacity="medium"
            data-testid={`${testId}-trend`}
          >
            {trend}
          </TextElement>
        )}
      </div>
    </div>
  );
};

TrendIndicator.displayName = 'TrendIndicator';