'use client';

import React from 'react';
import { WalletIcon } from 'lucide-react';
import { SearchFilterBar } from '@/shared/ui';

interface WalletsSearchSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  viewMode: 'grid' | 'table';
  onViewModeChange: (mode: 'grid' | 'table') => void;
  onOpenFilterModal: () => void;
  isFilterActive: boolean;
}

/**
 * 👛 Wallets Search Section Component
 * Provides search, view toggles, and filter controls for wallets
 */
export const WalletsSearchSection: React.FC<WalletsSearchSectionProps> = ({
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
        <div className="w-3 h-8 bg-gradient-to-b from-emerald-400 to-emerald-300 rounded-full"></div>
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <WalletIcon className="w-6 h-6 text-emerald-400" />
            Wallet Explorer
          </h2>
          <p className="text-gray-400">
            Search and manage wallets and balances in real-time
          </p>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <SearchFilterBar
        searchValue={searchQuery}
        onSearchChange={onSearchChange}
        searchPlaceholder="Search wallets... (e.g., email, user ID)"
        onFilterClick={onOpenFilterModal}
        isFilterActive={isFilterActive}
        filterLabel="Wallet Filters"
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
        variant="emerald"
      />
    </section>
  );
};
