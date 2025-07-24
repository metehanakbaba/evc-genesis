'use client';

import { UserGroupIcon } from '@heroicons/react/24/outline';
import type React from 'react';
import { SearchFilterBar } from '@/shared/ui/molecules';

// Import types from the centralized types file
import type { UserSearchSectionProps } from '../types/components.types';

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
    </section>
  );
};

export default UserSearchSection;
