'use client'

import React from 'react';
import { UserGroupIcon } from '@heroicons/react/24/outline';
import { SearchFilterBar } from '@/shared/ui';

interface SessionSearchSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  viewMode: 'grid' | 'table';
  onViewModeChange: (mode: 'grid' | 'table') => void;
  onOpenFilterModal: () => void;
  isFilterActive: boolean;
}

/**
 * 🔍 Session Search Section Component
 * Handles search and view controls for live session monitoring
 */
export const SessionSearchSection: React.FC<SessionSearchSectionProps> = ({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  onOpenFilterModal,
  isFilterActive,
}) => (
  <section>
    <div className="flex items-center gap-3 mb-8">
      <div className="w-3 h-8 bg-gradient-to-b from-emerald-400 to-emerald-300 rounded-full" />
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <UserGroupIcon className="w-6 h-6 text-emerald-400" />
          Live Session Monitoring
        </h2>
        <p className="text-gray-400">
          Search sessions, stations, users; filter by status, connector, power
        </p>
      </div>
    </div>

    <SearchFilterBar
      searchValue={searchQuery}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search sessions, stations, users..."
      onFilterClick={onOpenFilterModal}
      isFilterActive={isFilterActive}
      filterLabel="Session Filters"
      viewMode={viewMode}
      onViewModeChange={onViewModeChange}
      variant="emerald"
    />
  </section>
);
