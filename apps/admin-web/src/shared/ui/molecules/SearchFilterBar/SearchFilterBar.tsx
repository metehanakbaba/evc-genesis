import type React from 'react';
import { FilterButton } from '../../atoms/FilterButton/FilterButton';
import { SearchInput } from '../../atoms/SearchInput/SearchInput';
import {
  type ViewMode,
  ViewModeToggle,
} from '../../atoms/ViewModeToggle/ViewModeToggle';

export interface SearchFilterBarProps {
  // Search
  readonly searchValue: string;
  readonly onSearchChange: (value: string) => void;
  readonly searchPlaceholder?: string;

  // Filter
  readonly onFilterClick: () => void;
  readonly isFilterActive?: boolean;
  readonly filterLabel?: string;

  // View Mode
  readonly viewMode: ViewMode;
  readonly onViewModeChange: (mode: ViewMode) => void;

  // Layout
  readonly variant?:
    | 'default'
    | 'primary'
    | 'teal'
    | 'blue'
    | 'purple'
    | 'emerald';
  readonly className?: string;
  readonly showViewToggle?: boolean;
}

/**
 * 🔄 SearchFilterBar Molecule Component
 *
 * Combines SearchInput, FilterButton, and ViewModeToggle into a unified bar.
 * Provides consistent layout across all data management pages.
 */
export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  onFilterClick,
  isFilterActive = false,
  filterLabel = 'Filters',
  viewMode,
  onViewModeChange,
  variant = 'purple',
  className = '',
  showViewToggle = true,
}) => {
  return (
    <div
      className={`
      bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-xl
      ${className}
    `}
    >
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Search Input */}
          <SearchInput
            value={searchValue}
            onChange={onSearchChange}
            placeholder={searchPlaceholder}
            size="md"
          />

          {/* Filter Button */}
          <FilterButton
            onClick={onFilterClick}
            isActive={isFilterActive}
            label={filterLabel}
            variant={variant}
            size="md"
          />
        </div>

        {/* View Mode Toggle */}
        {showViewToggle && (
          <ViewModeToggle
            viewMode={viewMode}
            onViewModeChange={onViewModeChange}
            variant={variant}
            size="md"
          />
        )}
      </div>
    </div>
  );
};
