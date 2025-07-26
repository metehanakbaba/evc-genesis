'use client';

import React, { useState, useMemo } from 'react';
import type { Wallet } from '../../../../../../packages/shared/api/src/lib/types/wallet.types';
import { useAllWallets } from '../hooks/useWallets';
import { CheckCircleIcon, XCircleIcon, ReceiptRefundIcon} from '@heroicons/react/24/outline';
import { BulkActionBar, BulkAction } from '@/shared/ui/components/DataDisplay/BulkActionBar';
import QuickFilterButtons, { QuickFilterGroup } from '@/shared/ui/components/DataDisplay/QuickFilterButtons';
import { 
  WalletAnalyticsModal, 
  TransactionsModal, 
  WalletDetailsModal, 
  WalletsDataSection,
  WalletsStatsSection
 } from '../components';
 import { MainLayout, PageHeader, Breadcrumb } from '@/shared/ui';
 import { PageContainer } from '@/shared/ui/components/Layout';
import { generateWalletsStats } from '../utils/walletStats';

const WalletsPage: React.FC = () => {

  // Filters state
  const [search, setSearch] = useState('');
  const [isActiveFilter, setIsActiveFilter] = useState<'all' | 'true' | 'false'>('all');
  const [selectedWalletIds, setSelectedWalletIds] = useState<string[]>([]);
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [isTransactionsModalOpen, setIsTransactionsModalOpen] = useState(false);
  const [isWalletDetailsModalOpen, setIsWalletDetailsModalOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);

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
    search,
    isActive: isActiveFilter === 'all' ? 'all' : isActiveFilter === 'true',
  });

  // Wallet actions
  const walletActions = {
    viewDetails: (wallet: Wallet) => {
      setSelectedWallet(wallet);
      setIsWalletDetailsModalOpen(true);
    },
  };


  // Bulk actions configuration
  const bulkActions: BulkAction[] = useMemo(() => [
    {
      id: 'activate',
      label: 'Activate',
      icon: CheckCircleIcon,
      variant: 'success',
      onClick: (ids) => {
        // TODO: Implement bulk activate logic
        console.log('Bulk activate wallets:', ids);
      },
      show: (count) => count > 0,
    },
    {
      id: 'deactivate',
      label: 'Deactivate',
      icon: XCircleIcon,
      variant: 'danger',
      onClick: (ids) => {
        // TODO: Implement bulk deactivate logic
        console.log('Bulk deactivate wallets:', ids);
      },
      show: (count) => count > 0,
    },
  ], [])

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

  return (  
  
    <MainLayout>
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

        <WalletsStatsSection stats={generateWalletsStats(wallets)} />

        {/* <WalletsSearchSection 
          searchQuery={}
          onSearchChange={}
          viewMode={}
          onViewModeChange={}
          onOpenFilterModal={}
          isFilterActive={}
        /> */}
      
      <QuickFilterButtons filterGroups={filterGroups} variant="teal" />

      <WalletsDataSection
        wallets={wallets}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
        hasNextPage={hasNextPage}
        error={error}
        viewMode="grid"
        total={total}
        onLoadMore={loadMore}
        onRefresh={refresh}
        onViewDetails={walletActions.viewDetails}
        onEditWallet={() => {}}
        onDeleteWallet={() => {}}
        onClearFilters={() => {
          setSearch('');
          setIsActiveFilter('all');
          setSelectedWalletIds([]);
        }}
        selectedItems={new Set(selectedWalletIds)}
        onSelectItem={(id: string) => {
          // handleSelectionChange expects string[], but onSelectItem provides string
          // So update selectedWalletIds accordingly
          setSelectedWalletIds((prevSelected) => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(id)) {
              newSelected.delete(id);
            } else {
              newSelected.add(id);
            }
            return Array.from(newSelected);
          });
        }}
        onSelectAll={() => {
          if (wallets.length === selectedWalletIds.length) {
            setSelectedWalletIds([]);
          } else {
            setSelectedWalletIds(wallets.map(w => w.userId));
          }
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

      <WalletDetailsModal
        isOpen={isWalletDetailsModalOpen}
        onClose={() => setIsWalletDetailsModalOpen(false)}
        wallet={selectedWallet}
      />

      <WalletAnalyticsModal
        isOpen={isAnalyticsModalOpen}
        onClose={() => setIsAnalyticsModalOpen(false)}
        isLoading={false}
        isError={false}
        error={null}
        onRefresh={refresh}
      />

      <TransactionsModal
        isOpen={isTransactionsModalOpen}
        onClose={() => setIsTransactionsModalOpen(false)}
      />

      </PageContainer>
    </MainLayout>

  );
};

export default WalletsPage;
