import { XMarkIcon } from '@heroicons/react/24/outline';
import type React from 'react';
import { ActionButton } from '../../atoms/ActionButton/ActionButton';

export interface EmptyStateProps {
  readonly icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  readonly title: string;
  readonly description: string;
  readonly actionLabel?: string;
  readonly onAction?: () => void;
  readonly variant?: 'default' | 'teal' | 'blue' | 'purple' | 'emerald';
  readonly className?: string;
}

/**
 * 🫙 EmptyState Molecule Component
 *
 * Displays when no data is available with optional clear filters action.
 * Provides consistent empty state experience across all data lists.
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel = 'Clear Filters',
  onAction,
  variant = 'default',
  className = '',
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'teal':
        return {
          iconBg: 'bg-gray-700/30',
          iconColor: 'text-gray-500',
          actionVariant: 'primary' as const,
        };
      case 'blue':
        return {
          iconBg: 'bg-gray-700/30',
          iconColor: 'text-gray-500',
          actionVariant: 'edit' as const,
        };
      case 'purple':
        return {
          iconBg: 'bg-gray-700/30',
          iconColor: 'text-gray-500',
          actionVariant: 'secondary' as const,
        };
      case 'emerald':
        return {
          iconBg: 'bg-gray-700/30',
          iconColor: 'text-gray-500',
          actionVariant: 'primary' as const,
        };
      default:
        return {
          iconBg: 'bg-gray-700/30',
          iconColor: 'text-gray-500',
          actionVariant: 'view' as const,
        };
    }
  };

  const variantClasses = getVariantClasses();

  return (
    <div className={`text-center py-12 ${className}`}>
      {/* Icon Container */}
      <div
        className={`
        w-24 h-24 ${variantClasses.iconBg} rounded-2xl 
        flex items-center justify-center mx-auto mb-4
      `}
      >
        <Icon className={`w-12 h-12 ${variantClasses.iconColor}`} />
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>

      {/* Action Button */}
      {onAction && (
        <ActionButton
          variant={variantClasses.actionVariant}
          onClick={onAction}
          icon={XMarkIcon}
          label={actionLabel}
          size="md"
          className="
            relative overflow-hidden
            before:absolute before:inset-0 before:bg-gradient-to-r 
            before:from-transparent before:via-white/20 before:to-transparent
            before:translate-x-[-100%] hover:before:translate-x-[100%]
            before:transition-transform before:duration-700
          "
        />
      )}
    </div>
  );
};
