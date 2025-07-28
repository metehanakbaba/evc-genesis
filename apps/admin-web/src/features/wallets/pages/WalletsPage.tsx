'use client';

import React, { useState, useMemo } from 'react';
import { Wallet } from '../../../../../../packages/shared/api/src/lib/types/wallet.types';
import { useAllWallets, useWalletStatistics } from '../hooks/useWallets';
import { CheckCircleIcon, XCircleIcon, ReceiptRefundIcon } from '@heroicons/react/24/outline';
import { BulkActionBar, BulkAction, useBulkSelection } from '@/shared/ui/components/DataDisplay/BulkActionBar';
import QuickFilterButtons, { QuickFilterGroup } from '@/shared/ui/components/DataDisplay/QuickFilterButtons';
import { GenericFilterModal } from '@/shared/ui/components/DataDisplay/GenericFilterModal';
import {
  WalletAnalyticsModal,
  TransactionsModal,
  WalletDetailsModal,
  WalletsDataSection,
  WalletsStatsSection,
  WalletsSearchSection,
  AdjustBalanceModal 
} from '../components';

import { MainLayout, PageHeader, Breadcrumb } from '@/shared/ui';
import { PageContainer } from '@/shared/ui/components/Layout';

export const WalletsPage: React.FC = () => {
  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [isActiveFilter, setIsActiveFilter] = useState<'all' | 'true' | 'false'>('all');
  const [selectedWalletIds, setSelectedWalletIds] = useState<string[]>([]);

  // Modals state
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [isTransactionsModalOpen, setIsTransactionsModalOpen] = useState(false);
  const [isWalletDetailsModalOpen, setIsWalletDetailsModalOpen] = useState(false);
  const [isWalletAdjustModalOpen, setIsWalletAdjustModalOpen] = useState(false);

  // Adjust Balance modal state
  const [chosenWallet, setChosenWallet] = useState<Wallet | null>(null);
  // System state
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Fetch wallets using custom hook
  const {
    wallets,
    isLoading,
    isLoadingMore,
    hasNextPage,
    error,
    loadMore,
    refresh,
    total,
  } = useAllWallets({
    search: searchQuery,
    isActive: isActiveFilter === 'all' ? 'all' : isActiveFilter === 'true',
  });

  const { toggleAll } = useBulkSelection(wallets);
  const statistics = useWalletStatistics(wallets);

  // Bulk actions configuration
  const bulkActions: BulkAction[] = useMemo(() => [
    {
      id: 'activate',
      label: 'Activate',
      icon: CheckCircleIcon,
      variant: 'success',
      onClick: (data) => { },
      show: (count) => count > 0,
    },
  ], []);

  // Filter groups for QuickFilterButtons
  const filterGroups: QuickFilterGroup[] = useMemo(() => [
    {
      id: 'activeStatus',
      title: 'Status',
      icon: CheckCircleIcon,
      selectedValue: isActiveFilter,
      onChange: (value) => setIsActiveFilter(value as 'all' | 'true' | 'false'),
      options: [
        { id: 'all', label: 'All', icon: CheckCircleIcon, color: 'gray' },
        { id: 'true', label: 'Active', icon: CheckCircleIcon, color: 'emerald' },
        { id: 'false', label: 'Inactive', icon: XCircleIcon, color: 'red' },
      ],
    },
  ], [isActiveFilter]);

  const openAdjustModal = (wallet: Wallet) => {
    setChosenWallet(wallet);
    setIsWalletAdjustModalOpen(true);
  };

  const closeAdjustModal = () => {
    setChosenWallet(null);
    setIsWalletAdjustModalOpen(false);
  };

  const openDetailsModal = (wallet: Wallet) => {
    setChosenWallet(wallet);
    setIsWalletDetailsModalOpen(true);
  }

  const closeDetailsModal = () => {
    setChosenWallet(null);
    setIsWalletDetailsModalOpen(false);
  }

  return (
    <MainLayout
      showNotifications={true}
      notificationCount={3}
      headerVariant="default"
    >
      <PageContainer paddingY="md">
        {/* Revolutionary Breadcrumb Navigation */}
        <Breadcrumb
          currentPageLabel="Wallets & Transactions Management"
          variant="purple"
        />

        <PageHeader
          title="Payment system"
          description="Comprehensive wallet lifecycle management and role-based access control administration"
          variant="purple"
          actionButton={{
            label: 'All transactions',
            icon: ReceiptRefundIcon,
            onClick: () => setIsTransactionsModalOpen(true)
          }}
        />
      </PageContainer>

      <PageContainer paddingY="lg" className="space-y-10">

        <WalletsStatsSection
          stats={statistics}
          onOpenAnalytics={() => setIsAnalyticsModalOpen(true)}
        />

        <WalletsSearchSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onOpenFilterModal={() => setIsFilterModalOpen(true)}
          isFilterActive={isActiveFilter !== 'all'}
        />

        <QuickFilterButtons
          filterGroups={filterGroups}
          variant="teal"
        />

        <WalletsDataSection
          wallets={wallets}
          isLoading={isLoading}
          isLoadingMore={isLoadingMore}
          hasNextPage={hasNextPage}
          error={error}
          viewMode={viewMode}
          total={total}
          onLoadMore={loadMore}
          onRefresh={refresh}
          selectedItems={new Set(selectedWalletIds)}
          onSelectAll={() => toggleAll(true)}
          onSelectItem={(walletId) => {
            const wallet = wallets.find(w => w.id === walletId || w.userId === walletId);
          }}
          onAdjustBalance={openAdjustModal}
          onOpenDetails={openDetailsModal}
          onClearFilters={() => {
            setSearchQuery('');
            setIsActiveFilter('all');
            setSelectedWalletIds([]);
          }}
        />

        <BulkActionBar
          selectedCount={selectedWalletIds.length}
          selectedIds={selectedWalletIds}
          actions={bulkActions}
          onClearSelection={() => setSelectedWalletIds([])}
          entityName="wallets"
          variant="emerald"
        />

        <GenericFilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          title="Filter Wallets"
          filterGroups={filterGroups}
          onClearFilters={() => {
            setSearchQuery('');
            setIsActiveFilter('all');
            setSelectedWalletIds([]);
          }}
        />

        <WalletDetailsModal
          isOpen={isWalletDetailsModalOpen}
          onClose={closeDetailsModal}
          wallet={chosenWallet}
        />

        <WalletAnalyticsModal
          isOpen={isAnalyticsModalOpen}
          onClose={() => setIsAnalyticsModalOpen(false)}
        />

        <TransactionsModal
          isOpen={isTransactionsModalOpen}
          onClose={() => setIsTransactionsModalOpen(false)}
        />

        <AdjustBalanceModal
          isOpen={isWalletAdjustModalOpen}
          onClose={closeAdjustModal}
          wallet={chosenWallet}
          onRefresh={refresh}
        />

      </PageContainer>
    </MainLayout>
  );
};

export default WalletsPage;
