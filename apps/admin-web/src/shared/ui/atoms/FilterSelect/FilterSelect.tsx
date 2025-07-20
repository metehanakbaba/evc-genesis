import type React from 'react';
import { Select } from '@ui/forms';

export interface FilterSelectOption {
  readonly value: string;
  readonly label: string;
}

export interface FilterSelectProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly options: readonly FilterSelectOption[];
  readonly label?: string;
  readonly placeholder?: string;
  readonly size?: 'sm' | 'md' | 'lg';
  readonly variant?: 'default' | 'primary' | 'teal' | 'blue' | 'purple' | 'emerald';
  readonly className?: string;
  readonly disabled?: boolean;
}

/**
 * 🎯 FilterSelect Atom Component
 * 
 * Reusable filter select with consistent styling and theming.
 * Used for dropdown filters across all data management pages.
 */
export const FilterSelect: React.FC<FilterSelectProps> = ({
  value,
  onChange,
  options,
  label,
  placeholder = "Select...",
  size = "md",
  variant = "default",
  className = "",
  disabled = false,
}) => {
  const sizeClasses = {
    sm: "w-[140px]",
    md: "w-[180px]",
    lg: "w-[220px]",
  };

  const variantColors = {
    default: "text-gray-400",
    primary: "text-teal-400",
    teal: "text-teal-400",
    blue: "text-blue-400",
    purple: "text-purple-400",
    emerald: "text-emerald-400",
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {label && (
        <label className={`text-sm font-medium ${variantColors[variant]} whitespace-nowrap`}>
          {label}:
        </label>
      )}
      <Select
        value={value}
        onChange={(selectedValue) => onChange(selectedValue || '')}
        className={sizeClasses[size]}
        disabled={disabled}
        options={options.map(option => ({
          value: option.value,
          label: option.label,
        }))}
      />
    </div>
  );
};