import { FunnelIcon } from '@heroicons/react/24/outline';
import type React from 'react';

export interface FilterButtonProps {
  readonly onClick: () => void;
  readonly isActive?: boolean;
  readonly label?: string;
  readonly size?: 'sm' | 'md' | 'lg';
  readonly variant?: 'default' | 'primary' | 'teal' | 'blue' | 'purple' | 'emerald';
  readonly className?: string;
  readonly disabled?: boolean;
}

/**
 * 🔽 FilterButton Atom Component
 * 
 * Reusable filter button with active state indicator.
 * Shows a pulse animation when filters are applied.
 */
export const FilterButton: React.FC<FilterButtonProps> = ({
  onClick,
  isActive = false,
  label = "Filters",
  size = "md",
  variant = "default",
  className = "",
  disabled = false,
}) => {
  const sizeClasses = {
    sm: "px-3 py-2 text-sm min-w-[100px]",
    md: "px-4 py-3 text-sm min-w-[120px]",
    lg: "px-5 py-3 text-base min-w-[140px]",
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const variantClasses = {
    default: `
      bg-gradient-to-r from-gray-700/40 via-gray-600/30 to-gray-700/40
      hover:from-gray-600/50 hover:via-gray-500/40 hover:to-gray-600/50
      border border-gray-600/40 hover:border-gray-500/60
      text-gray-300 hover:text-white
    `,
    primary: `
      bg-gradient-to-r from-teal-600/40 via-teal-500/30 to-teal-600/40
      hover:from-teal-500/50 hover:via-teal-400/40 hover:to-teal-500/50
      border border-teal-500/40 hover:border-teal-400/60
      text-teal-300 hover:text-white
    `,
    teal: `
      bg-gradient-to-r from-teal-600/40 via-teal-500/30 to-teal-600/40
      hover:from-teal-500/50 hover:via-teal-400/40 hover:to-teal-500/50
      border border-teal-500/40 hover:border-teal-400/60
      text-teal-300 hover:text-white
    `,
    blue: `
      bg-gradient-to-r from-blue-600/40 via-blue-500/30 to-blue-600/40
      hover:from-blue-500/50 hover:via-blue-400/40 hover:to-blue-500/50
      border border-blue-500/40 hover:border-blue-400/60
      text-blue-300 hover:text-white
    `,
    purple: `
      bg-gradient-to-r from-purple-600/40 via-purple-500/30 to-purple-600/40
      hover:from-purple-500/50 hover:via-purple-400/40 hover:to-purple-500/50
      border border-purple-500/40 hover:border-purple-400/60
      text-purple-300 hover:text-white
    `,
    emerald: `
      bg-gradient-to-r from-emerald-600/40 via-emerald-500/30 to-emerald-600/40
      hover:from-emerald-500/50 hover:via-emerald-400/40 hover:to-emerald-500/50
      border border-emerald-500/40 hover:border-emerald-400/60
      text-emerald-300 hover:text-white
    `,
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative overflow-hidden group/filter 
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        backdrop-blur-sm shadow-md hover:shadow-lg
        transition-all duration-300 ease-out
        hover:scale-[1.01] active:scale-[0.99]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        rounded-xl
        flex items-center justify-center gap-2
        before:absolute before:inset-0 before:bg-gradient-to-r 
        before:from-transparent before:via-white/10 before:to-transparent
        before:translate-x-[-100%] hover:before:translate-x-[100%]
        before:transition-transform before:duration-500
        ${className}
      `}
    >
      <FunnelIcon className={`${iconSizes[size]} group-hover/filter:rotate-12 transition-transform duration-300 relative z-10`} />
      <span className="font-medium relative z-10">{label}</span>
      {isActive && (
        <div className={`w-2 h-2 ${
          variant === 'purple' ? 'bg-purple-400 shadow-purple-400/50' :
          variant === 'blue' ? 'bg-blue-400 shadow-blue-400/50' :
          variant === 'emerald' ? 'bg-emerald-400 shadow-emerald-400/50' :
          'bg-teal-400 shadow-teal-400/50'
        } rounded-full animate-pulse shadow-sm relative z-10`}></div>
      )}
    </button>
  );
}; 