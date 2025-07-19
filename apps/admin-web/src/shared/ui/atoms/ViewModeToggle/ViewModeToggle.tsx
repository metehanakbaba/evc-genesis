import { ViewColumnsIcon, TableCellsIcon } from '@heroicons/react/24/outline';
import type React from 'react';

export type ViewMode = 'grid' | 'table';

export interface ViewModeToggleProps {
  readonly viewMode: ViewMode;
  readonly onViewModeChange: (mode: ViewMode) => void;
  readonly size?: 'sm' | 'md' | 'lg';
  readonly variant?: 'default' | 'primary';
  readonly className?: string;
  readonly disabled?: boolean;
}

/**
 * 🔄 ViewModeToggle Atom Component
 * 
 * Toggle between grid and table view modes.
 * Provides consistent styling across all data management pages.
 */
export const ViewModeToggle: React.FC<ViewModeToggleProps> = ({
  viewMode,
  onViewModeChange,
  size = "md",
  variant = "default",
  className = "",
  disabled = false,
}) => {
  const sizeClasses = {
    sm: "p-2",
    md: "p-3",
    lg: "p-4",
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const getVariantClasses = (isActive: boolean) => {
    if (variant === 'primary') {
      return isActive
        ? `bg-gradient-to-r from-teal-500/25 via-teal-400/20 to-teal-500/25 
           text-teal-300 border border-teal-400/40 shadow-lg shadow-teal-500/20
           scale-[1.05]`
        : `bg-gray-700/40 text-gray-400 hover:bg-gray-600/50 hover:text-gray-300 
           hover:scale-[1.02] border border-transparent`;
    }
    
    return isActive
      ? `bg-gradient-to-r from-blue-500/25 via-blue-400/20 to-blue-500/25 
         text-blue-300 border border-blue-400/40 shadow-lg shadow-blue-500/20
         scale-[1.05]`
      : `bg-gray-700/40 text-gray-400 hover:bg-gray-600/50 hover:text-gray-300 
         hover:scale-[1.02] border border-transparent`;
  };

  return (
    <div className={`flex gap-1 bg-gray-800/60 backdrop-blur-sm p-1 rounded-xl border border-gray-600/30 ${className}`}>
      <button
        onClick={() => onViewModeChange('grid')}
        disabled={disabled}
        className={`
          relative overflow-hidden transition-all duration-300 ease-out
          ${sizeClasses[size]}
          ${getVariantClasses(viewMode === 'grid')}
          group/toggle flex items-center
          disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
          rounded-lg
        `}
      >
        <ViewColumnsIcon 
          className={`
            ${iconSizes[size]} transition-transform duration-300 
            ${viewMode === 'grid' ? 'scale-110' : 'group-hover/toggle:scale-105'}
          `} 
        />
      </button>
      
      <button
        onClick={() => onViewModeChange('table')}
        disabled={disabled}
        className={`
          relative overflow-hidden transition-all duration-300 ease-out
          ${sizeClasses[size]}
          ${getVariantClasses(viewMode === 'table')}
          group/toggle flex items-center
          disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
          rounded-lg
        `}
      >
        <TableCellsIcon 
          className={`
            ${iconSizes[size]} transition-transform duration-300 
            ${viewMode === 'table' ? 'scale-110' : 'group-hover/toggle:scale-105'}
          `} 
        />
      </button>
    </div>
  );
}; 