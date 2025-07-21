import type React from 'react';

export type ActionButtonVariant =
  | 'view'
  | 'edit'
  | 'delete'
  | 'primary'
  | 'secondary';

export interface ActionButtonProps {
  readonly onClick: () => void;
  readonly variant: ActionButtonVariant;
  readonly icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  readonly label?: string;
  readonly size?: 'sm' | 'md' | 'lg';
  readonly className?: string;
  readonly disabled?: boolean;
}

/**
 * 🎯 ActionButton Atom Component
 *
 * Reusable action button with predefined variants for common actions.
 * Supports view, edit, delete and custom variants.
 */
export const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  variant,
  icon: Icon,
  label,
  size = 'sm',
  className = '',
  disabled = false,
}) => {
  const sizeClasses = {
    sm: label ? 'px-3 py-2 text-xs' : 'p-2',
    md: label ? 'px-4 py-2.5 text-sm' : 'p-2.5',
    lg: label ? 'px-5 py-3 text-base' : 'p-3',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'view':
        return `
          bg-gradient-to-r from-gray-700/40 via-gray-600/30 to-gray-700/40
          hover:from-gray-600/50 hover:via-gray-500/40 hover:to-gray-600/50
          text-gray-300 hover:text-white
          border border-gray-600/30 hover:border-gray-500/50
          shadow-md hover:shadow-lg
        `;
      case 'edit':
        return `
          bg-gradient-to-r from-blue-500/15 via-blue-400/10 to-blue-500/15
          hover:from-blue-500/25 hover:via-blue-400/20 hover:to-blue-500/25
          text-blue-400 hover:text-blue-300
          border border-blue-500/30 hover:border-blue-400/50
          shadow-sm shadow-blue-500/10 hover:shadow-md hover:shadow-blue-500/20
        `;
      case 'delete':
        return `
          bg-gradient-to-r from-red-500/15 via-red-400/10 to-red-500/15
          hover:from-red-500/25 hover:via-red-400/20 hover:to-red-500/25
          text-red-400 hover:text-red-300
          border border-red-500/30 hover:border-red-400/50
          shadow-sm shadow-red-500/10 hover:shadow-md hover:shadow-red-500/20
        `;
      case 'primary':
        return `
          bg-gradient-to-r from-teal-500/25 via-teal-400/20 to-teal-500/25
          hover:from-teal-500/35 hover:via-teal-400/30 hover:to-teal-500/35
          text-teal-300 hover:text-white
          border border-teal-400/40 hover:border-teal-300/60
          shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-400/30
        `;
      case 'secondary':
        return `
          bg-gradient-to-r from-purple-500/15 via-purple-400/10 to-purple-500/15
          hover:from-purple-500/25 hover:via-purple-400/20 hover:to-purple-500/25
          text-purple-400 hover:text-purple-300
          border border-purple-500/30 hover:border-purple-400/50
          shadow-sm shadow-purple-500/10 hover:shadow-md hover:shadow-purple-500/20
        `;
      default:
        return `
          bg-gradient-to-r from-gray-700/40 via-gray-600/30 to-gray-700/40
          hover:from-gray-600/50 hover:via-gray-500/40 hover:to-gray-600/50
          text-gray-300 hover:text-white
          border border-gray-600/30 hover:border-gray-500/50
        `;
    }
  };

  const getIconAnimation = () => {
    switch (variant) {
      case 'view':
        return 'group-hover/action:scale-110';
      case 'edit':
        return 'group-hover/action:rotate-12';
      case 'delete':
        return 'group-hover/action:scale-110';
      case 'primary':
        return 'group-hover/action:scale-110';
      case 'secondary':
        return 'group-hover/action:rotate-12';
      default:
        return 'group-hover/action:scale-105';
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative overflow-hidden group/action
        ${sizeClasses[size]}
        ${getVariantClasses()}
        transition-all duration-300 ease-out
        hover:scale-110 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        rounded-lg
        flex items-center justify-center gap-2
        before:absolute before:inset-0 before:bg-gradient-to-r 
        before:from-transparent before:via-white/10 before:to-transparent
        before:translate-x-[-100%] hover:before:translate-x-[100%]
        before:transition-transform before:duration-500
        ${className}
      `}
    >
      <Icon
        className={`
          ${iconSizes[size]} transition-transform duration-300 relative z-10
          ${getIconAnimation()}
        `}
      />
      {label && <span className="font-medium relative z-10">{label}</span>}
    </button>
  );
};
