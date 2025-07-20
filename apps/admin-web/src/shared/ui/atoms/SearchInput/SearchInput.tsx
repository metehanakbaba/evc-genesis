import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import type React from 'react';

export interface SearchInputProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly placeholder?: string;
  readonly className?: string;
  readonly size?: 'sm' | 'md' | 'lg';
  readonly disabled?: boolean;
}

/**
 * 🔍 SearchInput Atom Component
 * 
 * Reusable search input with consistent styling and behavior.
 * Used across all data management pages.
 */
export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  size = "md",
  disabled = false,
}) => {
  const sizeClasses = {
    sm: "h-9 text-sm",
    md: "h-11 text-sm", 
    lg: "h-12 text-base",
  };

  const paddingClasses = {
    sm: "pl-9 pr-3",
    md: "pl-11 pr-4", 
    lg: "pl-12 pr-4",
  };

  const iconClasses = {
    sm: "w-4 h-4 left-2.5",
    md: "w-5 h-5 left-3",
    lg: "w-5 h-5 left-3.5",
  };

  return (
    <div className={`relative flex-1 max-w-md ${className}`}>
      <div className={`absolute top-1/2 transform -translate-y-1/2 z-10 pointer-events-none ${iconClasses[size]}`}>
        <MagnifyingGlassIcon className="text-gray-400" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`
          w-full ${sizeClasses[size]} ${paddingClasses[size]}
          bg-gray-700/50 border border-gray-600/50 
          text-white placeholder:text-gray-400 
          focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20 focus:outline-none
          disabled:opacity-50 disabled:cursor-not-allowed
          rounded-xl
          transition-all duration-200
        `}
      />
    </div>
  );
}; 