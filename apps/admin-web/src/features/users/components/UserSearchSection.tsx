'use client';

import { UserGroupIcon, UserIcon } from '@heroicons/react/24/outline';
import type React from 'react';
import { SearchFilterBar } from '@/shared/ui/molecules';

interface UserSearchSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  viewMode: 'grid' | 'table';
  onViewModeChange: (mode: 'grid' | 'table') => void;
  onOpenFilterModal: () => void;
  isFilterActive: boolean;
}

/**
 * 🔍 User Search Section Component
 * Handles search and filter controls for user management
 */
const UserSearchSection: React.FC<UserSearchSectionProps> = ({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  onOpenFilterModal,
  isFilterActive,
}) => {
  return (
    <section>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-3 h-8 bg-gradient-to-b from-purple-400 to-purple-300 rounded-full"></div>
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <UserGroupIcon className="w-6 h-6 text-purple-400" />
            Enterprise Directory Services
          </h2>
          <p className="text-gray-400">
            Advanced identity search, role-based filtering and comprehensive
            account lifecycle management
          </p>
        </div>
      </div>

      {/* Search & Filter Controls - Enhanced with Icons */}
      <div className="mb-8 p-6 bg-gradient-to-br from-slate-800/50 via-slate-700/30 to-transparent border border-slate-600/30 rounded-2xl backdrop-blur-xl">
        <div className="flex items-center gap-2 mb-4">
          <UserIcon className="w-5 h-5 text-purple-400" />
          <h3 className="text-sm font-medium text-purple-400">
            Identity Search & Filtering
          </h3>
        </div>

        <SearchFilterBar
          searchValue={searchQuery}
          onSearchChange={onSearchChange}
          searchPlaceholder="Identity search... (e.g., john.kowalski@company.com, ADMIN, CUSTOMER)"
          onFilterClick={onOpenFilterModal}
          isFilterActive={isFilterActive}
          filterLabel="Access Filters"
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
          variant="purple"
        />
      </div>
    </section>
  );
};

export default UserSearchSection;
