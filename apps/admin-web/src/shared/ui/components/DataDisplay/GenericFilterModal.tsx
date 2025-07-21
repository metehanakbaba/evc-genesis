/**
 * 🔍 Generic Filter Modal Component
 *
 * Reusable filter modal component with EXACT same design as SessionFilterModal.
 * Features the same sophisticated gradients, shimmer effects, and premium animations.
 *
 * @module GenericFilterModal
 * @version 2.0.0 - Revolutionary Design Update
 * @author EV Charging Team
 */

import { XMarkIcon } from '@heroicons/react/24/outline';
import { Modal } from '@ui/display';
import { Button } from '@ui/forms';
import type React from 'react';

// Type for icon components
type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

// Generic filter option interface - EXACTLY like SessionFilterModal
export interface FilterOption {
  readonly id: string;
  readonly label: string;
  readonly icon: IconComponent;
  readonly color: string;
}

// Filter group interface
export interface FilterGroup {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly options: FilterOption[];
  readonly selectedValue: string;
  readonly onChange: (value: string) => void;
}

// Modal props interface
export interface GenericFilterModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly title?: string;
  readonly description?: string;
  readonly filterGroups: FilterGroup[];
  readonly onClearFilters: () => void;
  readonly variant?: 'emerald' | 'blue' | 'purple' | 'teal' | 'default';
}

/**
 * 🚀 Revolutionary Generic Filter Modal Component
 * EXACTLY same design as SessionFilterModal - no scroll, proper sizing
 */
export const GenericFilterModal: React.FC<GenericFilterModalProps> = ({
  isOpen,
  onClose,
  title = 'Filter Options',
  description,
  filterGroups,
  onClearFilters,
  variant = 'emerald',
}) => {
  /**
   * 🎨 Get color classes based on option color
   */
  const getColorClasses = (color: string, isSelected: boolean) => {
    const colorMap = {
      emerald: {
        selected: 'bg-gradient-to-r from-emerald-500/20 via-emerald-400/15 to-emerald-500/20 border-emerald-400/50 text-emerald-300 shadow-lg shadow-emerald-500/20',
        icon: 'bg-emerald-500/20 border border-emerald-400/30',
        text: 'text-emerald-400'
      },
      blue: {
        selected: 'bg-gradient-to-r from-blue-500/20 via-blue-400/15 to-blue-500/20 border-blue-400/50 text-blue-300 shadow-lg shadow-blue-500/20',
        icon: 'bg-blue-500/20 border border-blue-400/30',
        text: 'text-blue-400'
      },
      purple: {
        selected: 'bg-gradient-to-r from-purple-500/20 via-purple-400/15 to-purple-500/20 border-purple-400/50 text-purple-300 shadow-lg shadow-purple-500/20',
        icon: 'bg-purple-500/20 border border-purple-400/30',
        text: 'text-purple-400'
      },
      amber: {
        selected: 'bg-gradient-to-r from-amber-500/20 via-amber-400/15 to-amber-500/20 border-amber-400/50 text-amber-300 shadow-lg shadow-amber-500/20',
        icon: 'bg-amber-500/20 border border-amber-400/30',
        text: 'text-amber-400'
      },
      red: {
        selected: 'bg-gradient-to-r from-red-500/20 via-red-400/15 to-red-500/20 border-red-400/50 text-red-300 shadow-lg shadow-red-500/20',
        icon: 'bg-red-500/20 border border-red-400/30',
        text: 'text-red-400'
      },
      gray: {
        selected: 'bg-gradient-to-r from-gray-500/20 via-gray-400/15 to-gray-500/20 border-gray-400/50 text-gray-300 shadow-lg shadow-gray-500/20',
        icon: 'bg-gray-500/20 border border-gray-400/30',
        text: 'text-gray-400'
      },
    };

    return colorMap[color as keyof typeof colorMap] || colorMap.gray;
  };

  /**
   * 🎨 Render Filter Option Button - EXACTLY like TransactionFilterModal
   */
  const renderFilterOption = (
    option: FilterOption,
    isSelected: boolean,
    onClick: () => void,
  ) => {
    const IconComponent = option.icon;
    const colors = getColorClasses(option.color, isSelected);

    return (
      <button
        key={option.id}
        onClick={onClick}
        className={`
          group relative p-4 rounded-xl border transition-all duration-300 ease-out
          ${
            isSelected
              ? `${colors.selected} scale-[1.02]`
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
        <div className="flex items-center gap-3 relative z-10">
          <div
            className={`
              w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
              ${
                isSelected
                  ? colors.icon
                  : `bg-gray-600/30 border border-gray-500/30 group-hover:bg-gray-500/40`
              }
            `}
          >
            <IconComponent
              className={`
                w-5 h-5 transition-transform duration-300
                ${
                  isSelected
                    ? `${colors.text} scale-110`
                    : `text-gray-400 group-hover:text-gray-300 group-hover:scale-105`
                }
              `}
            />
          </div>
          <span className="font-medium text-sm">{option.label}</span>
        </div>
      </button>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      size="lg"
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
              <span className="font-medium">Clear All</span>
            </div>
          </Button>
          <Button
            variant="primary"
            onClick={onClose}
            className={`
              relative overflow-hidden group/apply
              ${variant === 'emerald' ? 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:via-emerald-400 hover:to-emerald-500 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-400/30 border border-emerald-400/20 hover:border-emerald-300/40' :
                variant === 'blue' ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-500 hover:via-blue-400 hover:to-blue-500 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-400/30 border border-blue-400/20 hover:border-blue-300/40' :
                variant === 'purple' ? 'bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 hover:from-purple-500 hover:via-purple-400 hover:to-purple-500 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-400/30 border border-purple-400/20 hover:border-purple-300/40' :
                variant === 'teal' ? 'bg-gradient-to-r from-teal-600 via-teal-500 to-teal-600 hover:from-teal-500 hover:via-teal-400 hover:to-teal-500 shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-400/30 border border-teal-400/20 hover:border-teal-300/40' :
                'bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:via-emerald-400 hover:to-emerald-500 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-400/30 border border-emerald-400/20 hover:border-emerald-300/40'}
              text-white font-semibold
              transition-all duration-300 ease-out
              hover:scale-[1.02] active:scale-[0.98]
              flex items-center
              before:absolute before:inset-0 before:bg-gradient-to-r 
              before:from-transparent before:via-white/20 before:to-transparent
              before:translate-x-[-100%] hover:before:translate-x-[100%]
              before:transition-transform before:duration-700
            `}
          >
            <span className="relative z-10 font-medium">Apply Filters</span>
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {filterGroups.map((group) => (
          <div key={group.id}>
            {/* Revolutionary Section Header */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                {group.title}
              </h3>
            </div>

            {/* Revolutionary Grid Layout - EXACTLY like SessionFilterModal */}
            <div className="grid grid-cols-2 gap-3">
              {group.options.map((option) =>
                renderFilterOption(
                  option,
                  group.selectedValue === option.id,
                  () => group.onChange(option.id),
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default GenericFilterModal;
