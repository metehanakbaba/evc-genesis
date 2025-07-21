import type React from 'react';
import { IconContainer } from '../../atoms/IconContainer';
import { TextElement } from '../../atoms/TextElement';
import type {
  BaseComponentProps,
  SizeProps,
  VariantProps,
} from '../../atoms/types';
import { cn } from '../../utils';

/**
 * StatValue Component Props
 *
 * Molecule component that composes TextElement and IconContainer atoms
 * to display statistical values with icons and trend information
 */
export interface StatValueProps
  extends BaseComponentProps,
    VariantProps,
    SizeProps {
  /** The main statistical value to display */
  value: string;
  /** The title/label for the statistic */
  title: string;
  /** Optional icon component to display */
  icon?: React.ComponentType<{ className?: string }>;
  /** Optional trend indicator (e.g., "+12%", "-5%") */
  trend?: string;
  /** Optional description text */
  description?: string;
  /** Layout orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Value formatting function */
  formatValue?: (value: string) => string;
  /** Click handler for interactive stats */
  onClick?: () => void;
}

/**
 * Size mappings for StatValue layout
 */
const layoutSizes = {
  xs: {
    container: 'gap-2',
    iconSize: 'xs' as const,
    valueSize: 'sm' as const,
    titleSize: 'xs' as const,
    trendSize: 'xs' as const,
  },
  sm: {
    container: 'gap-2',
    iconSize: 'sm' as const,
    valueSize: 'md' as const,
    titleSize: 'sm' as const,
    trendSize: 'xs' as const,
  },
  md: {
    container: 'gap-3',
    iconSize: 'md' as const,
    valueSize: 'lg' as const,
    titleSize: 'sm' as const,
    trendSize: 'sm' as const,
  },
  lg: {
    container: 'gap-3',
    iconSize: 'lg' as const,
    valueSize: 'xl' as const,
    titleSize: 'md' as const,
    trendSize: 'sm' as const,
  },
  xl: {
    container: 'gap-4',
    iconSize: 'xl' as const,
    valueSize: 'xl' as const,
    titleSize: 'lg' as const,
    trendSize: 'md' as const,
  },
} as const;

/**
 * StatValue - Molecule component for displaying statistical values
 *
 * Composes TextElement and IconContainer atoms to create a cohesive
 * statistical display with optional trend indicators and descriptions.
 *
 * @example
 * ```tsx
 * <StatValue
 *   value="1,234"
 *   title="Active Sessions"
 *   icon={UserIcon}
 *   trend="+12%"
 *   variant="blue"
 *   size="md"
 * />
 * ```
 */
export const StatValue: React.FC<StatValueProps> = ({
  value,
  title,
  icon,
  trend,
  description,
  variant = 'blue',
  size = 'md',
  orientation = 'vertical',
  formatValue,
  onClick,
  className,
  'data-testid': testId = 'stat-value',
  ...props
}) => {
  // Get size configuration
  const sizeConfig = layoutSizes[size];

  // Format the value if formatter is provided
  const displayValue = formatValue ? formatValue(value) : value;

  // Determine if component is interactive
  const isInteractive = Boolean(onClick);

  // Determine trend direction and styling
  const getTrendStyling = () => {
    if (!trend) return null;

    const isPositive = trend.startsWith('+');
    const isNegative = trend.startsWith('-');

    if (isPositive) {
      return {
        variant: 'emerald' as const,
        opacity: 'high' as const,
      };
    } else if (isNegative) {
      return {
        variant: 'purple' as const,
        opacity: 'high' as const,
      };
    }

    return {
      variant: variant,
      opacity: 'medium' as const,
    };
  };

  const trendStyling = getTrendStyling();

  // Build container classes
  const containerClasses = cn(
    // Base layout
    'flex items-start',

    // Orientation
    orientation === 'horizontal' ? 'flex-row items-center' : 'flex-col',

    // Spacing
    sizeConfig.container,

    // Interactive states
    isInteractive &&
      'cursor-pointer transition-all duration-200 hover:scale-105',

    // Custom className
    className,
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
      data-variant={variant}
      data-size={size}
      data-orientation={orientation}
      data-interactive={isInteractive}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={
        isInteractive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick();
              }
            }
          : undefined
      }
      {...props}
    >
      {/* Icon Section */}
      {icon && (
        <IconContainer
          icon={icon}
          variant={variant}
          size={sizeConfig.iconSize}
          glowEffect={isInteractive}
          hoverScale={isInteractive}
          data-testid={`${testId}-icon`}
        />
      )}

      {/* Content Section */}
      <div
        className={cn(
          'flex flex-col',
          orientation === 'horizontal' && 'flex-1',
        )}
      >
        {/* Title */}
        <TextElement
          as="span"
          variant={variant}
          size={sizeConfig.titleSize}
          weight="medium"
          opacity="medium"
          data-testid={`${testId}-title`}
        >
          {title}
        </TextElement>

        {/* Value and Trend */}
        <div className="flex items-baseline gap-2">
          <TextElement
            as="span"
            variant={variant}
            size={sizeConfig.valueSize}
            weight="bold"
            opacity="full"
            data-testid={`${testId}-value`}
          >
            {displayValue}
          </TextElement>

          {/* Trend Indicator */}
          {trend && trendStyling && (
            <TextElement
              as="span"
              variant={trendStyling.variant}
              size={sizeConfig.trendSize}
              weight="semibold"
              opacity={trendStyling.opacity}
              data-testid={`${testId}-trend`}
            >
              {trend}
            </TextElement>
          )}
        </div>

        {/* Description */}
        {description && (
          <TextElement
            as="span"
            variant={variant}
            size={sizeConfig.titleSize}
            weight="normal"
            opacity="low"
            truncate
            data-testid={`${testId}-description`}
          >
            {description}
          </TextElement>
        )}
      </div>
    </div>
  );
};

StatValue.displayName = 'StatValue';
