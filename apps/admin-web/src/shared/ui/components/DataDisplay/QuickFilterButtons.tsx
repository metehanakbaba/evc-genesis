/**
 * 🚀 Universal Quick Filter Buttons Component
 *
 * Reusable quick filter component that works across all pages.
 * Features consistent design with theme variants and configurable filter groups.
 *
 * @module QuickFilterButtons
 * @version 1.0.0 - Universal Design
 * @author EV Charging Team
 */

import type React from 'react';

// Type for icon components
type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

// Quick filter option interface
export interface QuickFilterOption {
  readonly id: string;
  readonly label: string;
  readonly icon: IconComponent;
  readonly color: 'emerald' | 'blue' | 'purple' | 'amber' | 'red' | 'gray' | 'teal';
}

// Quick filter group interface
export interface QuickFilterGroup {
  readonly id: string;
  readonly title: string;
  readonly icon: IconComponent;
  readonly selectedValue: string;
  readonly onChange: (value: string) => void;
  readonly options: QuickFilterOption[];
}

// Component props interface
export interface QuickFilterButtonsProps {
  readonly filterGroups: QuickFilterGroup[];
  readonly variant?: 'emerald' | 'blue' | 'purple' | 'teal' | 'amber' | 'default';
  readonly className?: string;
}

/**
 * 🎨 Get color classes for buttons based on color
 */
const getButtonColorClasses = (
  color: QuickFilterOption['color'], 
  isSelected: boolean
) => {
  const colorMap = {
    emerald: isSelected 
      ? 'bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 shadow-lg shadow-emerald-500/20'
      : 'bg-gray-700/30 border border-gray-600/30 text-gray-400 hover:bg-gray-600/40 hover:text-gray-300',
    blue: isSelected
      ? 'bg-blue-500/20 border border-blue-400/40 text-blue-300 shadow-lg shadow-blue-500/20'
      : 'bg-gray-700/30 border border-gray-600/30 text-gray-400 hover:bg-gray-600/40 hover:text-gray-300',
    purple: isSelected
      ? 'bg-purple-500/20 border border-purple-400/40 text-purple-300 shadow-lg shadow-purple-500/20'
      : 'bg-gray-700/30 border border-gray-600/30 text-gray-400 hover:bg-gray-600/40 hover:text-gray-300',
    amber: isSelected
      ? 'bg-amber-500/20 border border-amber-400/40 text-amber-300 shadow-lg shadow-amber-500/20'
      : 'bg-gray-700/30 border border-gray-600/30 text-gray-400 hover:bg-gray-600/40 hover:text-gray-300',
    red: isSelected
      ? 'bg-red-500/20 border border-red-400/40 text-red-300 shadow-lg shadow-red-500/20'
      : 'bg-gray-700/30 border border-gray-600/30 text-gray-400 hover:bg-gray-600/40 hover:text-gray-300',
    teal: isSelected
      ? 'bg-teal-500/20 border border-teal-400/40 text-teal-300 shadow-lg shadow-teal-500/20'
      : 'bg-gray-700/30 border border-gray-600/30 text-gray-400 hover:bg-gray-600/40 hover:text-gray-300',
    gray: isSelected
      ? 'bg-gray-500/20 border border-gray-400/40 text-gray-300 shadow-lg shadow-gray-500/20'
      : 'bg-gray-700/30 border border-gray-600/30 text-gray-400 hover:bg-gray-600/40 hover:text-gray-300',
  };

  return colorMap[color] || colorMap.gray;
};

/**
 * 🎨 Get theme color for group titles
 */
const getThemeColor = (variant: QuickFilterButtonsProps['variant']) => {
  const themeMap = {
    emerald: 'text-emerald-300',
    blue: 'text-blue-300',
    purple: 'text-purple-300',
    teal: 'text-teal-300',
    amber: 'text-amber-300',
    default: 'text-gray-300',
  };

  return themeMap[variant || 'default'] || themeMap.default;
};

/**
 * 🚀 Universal Quick Filter Buttons Component
 */
export const QuickFilterButtons: React.FC<QuickFilterButtonsProps> = ({
  filterGroups,
  variant = 'default',
  className = '',
}) => {
  const themeColor = getThemeColor(variant);

  return (
    <div className={`flex flex-wrap gap-6 mb-8 p-6 bg-gradient-to-r from-gray-800/40 via-gray-700/30 to-gray-800/40 rounded-2xl border border-gray-600/30 ${className}`}>
      {filterGroups.map((group) => (
        <div key={group.id} className="flex items-center gap-3">
          {/* Group Title with Icon */}
          <span className={`text-sm font-semibold flex items-center gap-2 ${themeColor}`}>
            <group.icon className="w-4 h-4" />
            {group.title}:
          </span>

          {/* Filter Options */}
          {group.options.map((option) => {
            const IconComponent = option.icon;
            const isSelected = group.selectedValue === option.id;
            const buttonClasses = getButtonColorClasses(option.color, isSelected);

            return (
              <button
                key={option.id}
                onClick={() => group.onChange(option.id)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-300 flex items-center gap-2 ${buttonClasses}`}
              >
                <IconComponent className="w-3 h-3" />
                {option.label}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default QuickFilterButtons; 