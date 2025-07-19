import type React from 'react';

export type StatusVariant = 
  | 'success' | 'warning' | 'error' | 'info' | 'neutral'
  | 'emerald' | 'blue' | 'teal' | 'purple' | 'amber' | 'red' | 'gray';

export interface StatusBadgeProps {
  readonly text: string;
  readonly variant: StatusVariant;
  readonly icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  readonly size?: 'xs' | 'sm' | 'md' | 'lg';
  readonly className?: string;
  readonly pulse?: boolean;
}

/**
 * 🎨 StatusBadge Atom Component
 * 
 * Reusable status badge with consistent styling and color variants.
 * Supports icons and pulse animation for live states.
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({
  text,
  variant,
  icon: Icon,
  size = "sm",
  className = "",
  pulse = false,
}) => {
  const sizeClasses = {
    xs: "px-2 py-0.5 text-xs gap-1",
    sm: "px-2.5 py-1 text-xs gap-1.5",
    md: "px-3 py-1.5 text-sm gap-2",
    lg: "px-4 py-2 text-base gap-2",
  };

  const iconSizes = {
    xs: "w-3 h-3",
    sm: "w-3 h-3", 
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'success':
      case 'emerald':
        return {
          bg: 'bg-emerald-500/20',
          border: 'border-emerald-400/50',
          text: 'text-emerald-300',
        };
      case 'warning':
      case 'amber':
        return {
          bg: 'bg-amber-500/20',
          border: 'border-amber-400/50',
          text: 'text-amber-300',
        };
      case 'error':
      case 'red':
        return {
          bg: 'bg-red-500/20',
          border: 'border-red-400/50',
          text: 'text-red-300',
        };
      case 'info':
      case 'blue':
        return {
          bg: 'bg-blue-500/20',
          border: 'border-blue-400/50',
          text: 'text-blue-300',
        };
      case 'teal':
        return {
          bg: 'bg-teal-500/20',
          border: 'border-teal-400/50',
          text: 'text-teal-300',
        };
      case 'purple':
        return {
          bg: 'bg-purple-500/20',
          border: 'border-purple-400/50',
          text: 'text-purple-300',
        };
      case 'neutral':
      case 'gray':
      default:
        return {
          bg: 'bg-gray-500/20',
          border: 'border-gray-400/50',
          text: 'text-gray-300',
        };
    }
  };

  const variantClasses = getVariantClasses();

  return (
    <div
      className={`
        inline-flex items-center rounded-full border
        ${sizeClasses[size]}
        ${variantClasses.bg}
        ${variantClasses.border}
        ${variantClasses.text}
        ${pulse ? 'animate-pulse' : ''}
        ${className}
      `}
    >
      {Icon && (
        <Icon 
          className={`
            ${iconSizes[size]}
            ${pulse ? 'animate-pulse' : ''}
          `} 
        />
      )}
      <span className="font-medium">{text}</span>
    </div>
  );
}; 