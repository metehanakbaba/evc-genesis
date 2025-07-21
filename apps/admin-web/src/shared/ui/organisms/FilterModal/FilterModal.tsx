'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { Modal } from '@/shared/ui/components/Display/Modal/Modal';
import { Button } from '@/shared/ui/components/Forms/Button/Button';
import type React from 'react';

// Type for icon components
type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

/**
 * 🎯 Filter Option Interface
 */
export interface FilterOption {
  readonly id: string;
  readonly label: string;
  readonly icon?: IconComponent;
  readonly color?: string;
  readonly description?: string;
}

/**
 * 🎯 Filter Group Interface
 */
export interface FilterGroup {
  readonly id: string;
  readonly label: string;
  readonly description?: string;
  readonly icon?: IconComponent;
  readonly options: readonly FilterOption[];
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly gridCols?: 1 | 2 | 3;
}

/**
 * 🎯 Universal Filter Modal Props
 */
export interface FilterModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly title?: string;
  readonly description?: string;
  readonly filterGroups: readonly FilterGroup[];
  readonly onClearFilters: () => void;
  readonly variant?: 'default' | 'primary' | 'teal' | 'blue' | 'purple' | 'emerald';
  readonly size?: 'sm' | 'md' | 'lg' | 'xl';
  readonly clearButtonLabel?: string;
  readonly applyButtonLabel?: string;
}

/**
 * 🚀 Universal Filter Modal Component
 * Reusable filter modal that can handle any type of filtering with multiple groups
 */
export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  title = 'Filter Options',
  description = 'Configure your filtering criteria',
  filterGroups,
  onClearFilters,
  variant = 'default',
  size = 'lg',
  clearButtonLabel = 'Clear All',
  applyButtonLabel = 'Apply Filters',
}) => {
  /**
   * 🎨 Render Filter Option Button
   */
  const renderFilterOption = (
    option: FilterOption,
    isSelected: boolean,
    onClick: () => void
  ) => {
    const IconComponent = option.icon;
    const color = option.color || 'blue';
    
    return (
      <button
        key={option.id}
        onClick={onClick}
        className={`
          group relative p-4 rounded-xl border transition-all duration-300 ease-out
          ${isSelected
            ? `bg-gradient-to-r from-${color}-500/20 via-${color}-400/15 to-${color}-500/20 
               border-${color}-400/50 text-${color}-300 shadow-lg shadow-${color}-500/20
               scale-[1.02]`
            : `bg-gradient-to-r from-gray-700/30 via-gray-600/20 to-gray-700/30
               border-gray-600/30 text-gray-300 hover:bg-gray-600/40 hover:border-gray-500/50
               hover:scale-[1.01]`
          }
          overflow-hidden
          before:absolute before:inset-0 before:bg-gradient-to-r 
          before:from-transparent before:via-white/5 before:to-transparent
          before:translate-x-[-100%] hover:before:translate-x-[100%]
          before:transition-transform before:duration-700
        `}
      >
        {/* Background shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Content */}
        <div className="relative z-10 flex items-center gap-3">
          {IconComponent && (
            <div
              className={`w-10 h-10 rounded-xl ${
                isSelected
                  ? `bg-${color}-500/20 border border-${color}-400/30`
                  : 'bg-gray-600/30 border border-gray-500/30'
              } flex items-center justify-center transition-all duration-300`}
            >
              <IconComponent 
                className={`w-5 h-5 ${
                  isSelected 
                    ? `text-${color}-400` 
                    : 'text-gray-400 group-hover:text-gray-300'
                } transition-colors duration-300`} 
              />
            </div>
          )}
          <div className="text-left flex-1">
            <span className={`font-medium text-sm ${
              isSelected ? `text-${color}-300` : 'text-gray-300'
            }`}>
              {option.label}
            </span>
            {option.description && (
              <p className={`text-xs mt-1 ${
                isSelected ? `text-${color}-200/80` : 'text-gray-400'
              }`}>
                {option.description}
              </p>
            )}
          </div>
        </div>
      </button>
    );
  };

  /**
   * 🎨 Render Filter Group
   */
  const renderFilterGroup = (group: FilterGroup) => {
    const IconComponent = group.icon;
    const gridColsClass = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    };

    return (
      <div key={group.id} className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
            {IconComponent && (
              <IconComponent className={`w-5 h-5 text-${variant}-400`} />
            )}
            {group.label}
          </h3>
          {group.description && (
            <p className="text-gray-400 text-sm mb-4">
              {group.description}
            </p>
          )}
        </div>
        <div className={`grid ${gridColsClass[group.gridCols || 2]} gap-3`}>
          {group.options.map((option) =>
            renderFilterOption(
              option,
              group.value === option.id,
              () => group.onChange(option.id)
            )
          )}
        </div>
      </div>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      size={size}
      variant="default"
      footer={
        <div className="flex gap-3 justify-end">
          <Button
            variant="ghost"
            onClick={onClearFilters}
            className="
              relative overflow-hidden group/clear
              bg-gradient-to-r from-gray-700/40 via-gray-600/30 to-gray-700/40
              hover:from-gray-600/50 hover:via-gray-500/40 hover:to-gray-600/50
              text-gray-300 hover:text-white
              border border-gray-600/30 hover:border-gray-500/50
              transition-all duration-300 ease-out
              hover:scale-[1.02] active:scale-[0.98]
              flex items-center
              before:absolute before:inset-0 before:bg-gradient-to-r 
              before:from-transparent before:via-white/10 before:to-transparent
              before:translate-x-[-100%] hover:before:translate-x-[100%]
              before:transition-transform before:duration-500
            "
          >
            <div className="flex items-center gap-2 relative z-10">
              <XMarkIcon className="w-4 h-4 group-hover/clear:rotate-90 transition-transform duration-300" />
              <span className="font-medium">{clearButtonLabel}</span>
            </div>
          </Button>
          <Button
            variant="primary"
            onClick={onClose}
            className={`
              relative overflow-hidden group/apply
              bg-gradient-to-r from-${variant}-600 via-${variant}-500 to-${variant}-600
              hover:from-${variant}-500 hover:via-${variant}-400 hover:to-${variant}-500
              text-white font-semibold
              shadow-lg shadow-${variant}-500/25 hover:shadow-xl hover:shadow-${variant}-400/30
              border border-${variant}-400/20 hover:border-${variant}-300/40
              transition-all duration-300 ease-out
              hover:scale-[1.02] active:scale-[0.98]
              flex items-center
              before:absolute before:inset-0 before:bg-gradient-to-r 
              before:from-transparent before:via-white/20 before:to-transparent
              before:translate-x-[-100%] hover:before:translate-x-[100%]
              before:transition-transform before:duration-700
            `}
          >
            <span className="relative z-10 font-medium">{applyButtonLabel}</span>
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {filterGroups.map(renderFilterGroup)}
      </div>
    </Modal>
  );
};

export default FilterModal;