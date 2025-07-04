import type { ReactNode } from 'react';
import { cn } from '../../../utils/cn';

/**
 * Icon Component Type - Compatible with Heroicons and other icon libraries
 */
export type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

/**
 * Section Header Component Props
 */
export interface SectionHeaderProps {
  readonly title: string;
  readonly description?: string;
  readonly icon?: IconComponent;
  readonly children?: ReactNode;
  readonly className?: string;
  readonly titleLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  readonly size?: 'sm' | 'md' | 'lg' | 'xl';
  readonly variant?: 'default' | 'primary' | 'secondary';
}

/**
 * Size Mappings for Title and Icon
 */
const titleSizeMap = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
  xl: 'text-3xl',
} as const;

const iconSizeMap = {
  sm: 'h-5 w-5',
  md: 'h-6 w-6',
  lg: 'h-7 w-7',
  xl: 'h-8 w-8',
} as const;

const gapSizeMap = {
  sm: 'gap-2',
  md: 'gap-2',
  lg: 'gap-3',
  xl: 'gap-3',
} as const;

const marginSizeMap = {
  sm: 'mb-3',
  md: 'mb-4',
  lg: 'mb-5',
  xl: 'mb-6',
} as const;

/**
 * Variant Color Mappings
 */
const variantMap = {
  default: {
    title: 'text-white',
    description: 'text-gray-300',
    icon: 'text-primary-400',
  },
  primary: {
    title: 'text-blue-400',
    description: 'text-blue-300',
    icon: 'text-blue-400',
  },
  secondary: {
    title: 'text-gray-300',
    description: 'text-gray-400',
    icon: 'text-gray-400',
  },
} as const;

/**
 * Type-safe Section Header Component
 *
 * @example
 * ```tsx
 * import { CursorArrowRaysIcon } from '@heroicons/react/24/outline';
 *
 * <SectionHeader
 *   title="Button Components"
 *   description="Interactive elements for user actions"
 *
 *   size="lg"
 *   variant="primary"
 * />
 * ```
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  icon: Icon,
  children,
  className,
  titleLevel = 'h2',
  size = 'md',
  variant = 'default',
}) => {
  const TitleComponent = titleLevel;
  const colors = variantMap[variant];

  const headerClasses = cn(
    'flex items-center',
    gapSizeMap[size],
    marginSizeMap[size],
    className,
  );

  const titleClasses = cn('font-semibold', titleSizeMap[size], colors.title);

  const iconClasses = cn(iconSizeMap[size], colors.icon);

  const descriptionClasses = cn('text-sm mt-1', colors.description);

  return (
    <div className={className}>
      <div className={headerClasses}>
        {Icon && <Icon className={iconClasses} aria-hidden={true} />}
        <div className="flex-1">
          <TitleComponent className={titleClasses}>{title}</TitleComponent>
          {description && <p className={descriptionClasses}>{description}</p>}
        </div>
        {children && <div className="flex items-center gap-2">{children}</div>}
      </div>
    </div>
  );
};

SectionHeader.displayName = 'SectionHeader';
