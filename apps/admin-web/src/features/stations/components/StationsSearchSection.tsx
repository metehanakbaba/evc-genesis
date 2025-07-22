'use client'

import React from 'react';
import { SearchFilterBar } from '@/shared/ui';

interface StationsSearchSectionProps {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  viewMode: 'grid' | 'table';
  onViewModeChange: (m: 'grid' | 'table') => void;
  onOpenFilterModal: () => void;
  isFilterActive: boolean;
}

export const StationsSearchSection: React.FC<StationsSearchSectionProps> = ({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  onOpenFilterModal,
  isFilterActive,
}) => (
  <section>
    <div className="flex items-center gap-3 mb-6">
      <div className="w-3 h-8 bg-gradient-to-b from-blue-400 to-blue-300 rounded-full" />
      <div>
        <h2 className="text-xl font-bold text-white">Asset Management</h2>
        <p className="text-gray-400">
          Search and filter charging infrastructure assets
        </p>
      </div>
    </div>

    <SearchFilterBar
      searchValue={searchQuery}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search assets... (e.g. Station name, CCS2)"
      onFilterClick={onOpenFilterModal}
      isFilterActive={isFilterActive}
      filterLabel="Filters"
      viewMode={viewMode}
      onViewModeChange={onViewModeChange}
      variant="blue"
    />
  </section>
);
