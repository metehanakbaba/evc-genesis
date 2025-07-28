'use client';

import React, { useMemo } from 'react';
import {
  UserIcon,
  ScaleIcon,
  EyeIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@ui/forms';

import {
  type DataGridItem,
  type DataGridStatusConfig,
  DataStatusBadge,
  EmptyState,
  GenericDataGrid,
  GenericDataTable,
  type GridActionButton,
  type GridCardRenderer,
  GridSkeleton,
  type TableColumn,
} from '@/shared/ui';
import { Wallet } from '../../../../../../../packages/shared/api/src/lib/types/wallet.types';

interface EnhancedWallet extends Wallet, Omit<DataGridItem, 'id'> {}

interface WalletsDataSectionProps {
  wallets: Wallet[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasNextPage: boolean;
  error: Error | null;
  viewMode: 'grid' | 'table';
  total: number;
  onLoadMore: () => void;
  onRefresh: () => void;
  onClearFilters: () => void;
  selectedItems: Set<string>;
  onSelectItem: (id: string) => void;
  onSelectAll: () => void;
  onAdjustBalance: (wallet: Wallet) => void;
  onOpenDetails: (wallet: Wallet) => void;
}

export const WalletsDataSection: React.FC<WalletsDataSectionProps> = ({
  wallets,
  isLoading,
  isLoadingMore,
  hasNextPage,
  error,
  viewMode,
  total,
  onLoadMore,
  onRefresh,
  onClearFilters,
  onAdjustBalance,
  onOpenDetails,
  selectedItems,
  onSelectItem,
  onSelectAll,
}) => {
  const enhancedWallets = wallets as EnhancedWallet[];

  const getWalletStatusConfig = (wallet: EnhancedWallet): DataGridStatusConfig => {
    if (wallet.isActive) {
      return {
        bgColor: 'from-emerald-500/15 via-emerald-400/8 to-transparent',
        borderColor: 'border-emerald-400/30 hover:border-emerald-300/50',
        badgeColor: 'bg-emerald-500/10',
        textColor: 'text-emerald-400',
        pulseColor: 'bg-emerald-500',
      };
    }
    return {
      bgColor: 'from-gray-500/15 via-gray-400/8 to-transparent',
      borderColor: 'border-gray-400/30 hover:border-gray-300/50',
      badgeColor: 'bg-gray-500/10',
      textColor: 'text-gray-400',
      pulseColor: 'bg-gray-500',
    };
  };

  const gridRenderer = useMemo<GridCardRenderer<EnhancedWallet>>(() => ({
    getStatusConfig: (wallet) => getWalletStatusConfig(wallet),

    getAnimationDelay: (index: number): string => `${index * 100}ms`,

    renderHeader: (wallet, statusConfig) => (
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-xl ${statusConfig.badgeColor} flex items-center justify-center`}
          >
            <UserIcon className={`w-6 h-6 ${statusConfig.textColor}`} />
          </div>
          <div>
            <div className={`text-sm font-medium ${statusConfig.textColor} mb-1`}>
              Wallet
            </div>
            <div className="text-white font-semibold text-lg truncate">
              {wallet.userEmail}
            </div>
          </div>
        </div>

        <DataStatusBadge
          status={{
            variant: wallet.isActive ? 'success' : 'danger',
            label: wallet.isActive ? 'Active' : 'Inactive',
            size: 'sm',
            icon: wallet.isActive ? UserIcon : ShieldExclamationIcon,
            pulse: wallet.isActive,
          }}
        />
      </div>
    ),

    renderContent: (wallet) => (
      <>
        <div className="space-y-2 mb-4 text-gray-300 text-sm mb-2">
          <div className="flex items-center gap-2">
            <UserIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span>
              Balance: {wallet.balance.value} {wallet.balance.currency}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <UserIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span>Created: {new Date(wallet.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <UserIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span>
              Last Transaction:{' '}
              {wallet.lastTransactionAt
                ? new Date(wallet.lastTransactionAt).toLocaleDateString()
                : 'N/A'}
            </span>
          </div>
        </div>
      </>
    ),
  }), [onAdjustBalance, onOpenDetails]);

  const gridActions = useMemo<GridActionButton[]>(() => [
    {
      icon: ScaleIcon,
      label: 'Adjust Balance',
      onClick: (wallet) => onAdjustBalance(wallet as Wallet),
      variant: 'secondary',
    },
    {
      icon: EyeIcon,
      label: 'Details',
      onClick: (wallet) => onOpenDetails(wallet as Wallet),
      variant: 'secondary',
    },
  ], [onAdjustBalance, onOpenDetails]);

  const tableColumns = useMemo<TableColumn<EnhancedWallet>[]>(() => [
    {
      id: 'wallet',
      label: 'Wallet',
      accessor: 'userEmail',
      sticky: true,
      render: (wallet) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <UserIcon className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <div className="font-medium text-white">{wallet.userEmail}</div>
          </div>
        </div>
      ),
    },
    {
      id: 'balance',
      label: 'Balance',
      accessor: 'balance',
      render: (wallet) => (
        <span className="text-sm font-medium text-white">
          {wallet.balance.value} {wallet.balance.currency}
        </span>
      ),
    },
    {
      id: 'status',
      label: 'Status',
      accessor: 'isActive',
      render: (wallet) => (
        <DataStatusBadge
          status={{
            variant: wallet.isActive ? 'success' : 'danger',
            label: wallet.isActive ? 'Active' : 'Inactive',
            size: 'sm',
          }}
        />
      ),
    },
    {
      id: 'createdAt',
      label: 'Created At',
      accessor: 'createdAt',
      render: (wallet) => (
        <span className="text-sm text-gray-300">
          {new Date(wallet.createdAt).toLocaleDateString()}
        </span>
      ),
    },
  ], []);

  if (isLoading) {
    return (
      <GridSkeleton
        itemCount={viewMode === 'table' ? 10 : 6}
        columns={{
          sm: 1,
          md: viewMode === 'table' ? 1 : 2,
          lg: viewMode === 'table' ? 1 : 2,
          xl: viewMode === 'table' ? 1 : 3,
          '2xl': viewMode === 'table' ? 1 : 4,
        }}
      />
    );
  }

  if (error && !isLoading) {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
          <ShieldExclamationIcon className="w-6 h-6 text-red-400" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">
          Wallet Service Unavailable
        </h3>
        <p className="text-gray-400 mb-4">
          Wallet service connection failed: {error.message}
        </p>
        <Button
          onClick={onClearFilters}
          className="mx-auto bg-purple-600 hover:bg-purple-700"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <>
      {viewMode === 'table' && (
        <GenericDataTable
          items={enhancedWallets}
          columns={tableColumns}
          actions={gridActions}
          isLoading={isLoading}
          onLoadMore={onLoadMore}
          isLoadingMore={isLoadingMore}
          hasNextPage={hasNextPage}
          total={total}
          selectable
          hoverable
          selectedItems={selectedItems}
          onSelectItem={onSelectItem}
          onSelectAll={onSelectAll}
        />
      )}
      {viewMode === 'grid' && (
        <GenericDataGrid
          items={enhancedWallets}
          renderer={gridRenderer}
          actions={gridActions}
          onLoadMore={onLoadMore}
          isLoadingMore={isLoadingMore}
          hasNextPage={hasNextPage}
          total={total}
          columns={{
            sm: 1,
            md: 2,
            lg: 2,
            xl: 3,
            '2xl': 4,
          }}
        />
      )}

      {wallets.length === 0 && (
        <EmptyState
          icon={UserIcon}
          title="No Wallets Found"
          description="Please refine your access control filters or search parameters to view relevant wallets."
          actionLabel="Clear Filters"
          onAction={onClearFilters}
          variant="emerald"
        />
      )}
    </>
  );
};
