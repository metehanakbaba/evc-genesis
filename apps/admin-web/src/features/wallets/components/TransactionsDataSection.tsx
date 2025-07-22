'use client';

import {
  ArrowPathIcon,
  BanknotesIcon,
  ClockIcon,
  EyeIcon,
  ShieldExclamationIcon,
  WalletIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@ui/forms';
import type React from 'react';
import { useMemo } from 'react';

// ✅ Import NEW shared components
import {
  type DataGridItem,
  type DataGridStatusConfig,
  DataStatusBadge,
  GenericDataGrid,
  GenericDataTable,
  type GridActionButton,
  type GridCardRenderer,
  GridSkeleton,
  type TableColumn,
} from '@/shared/ui';
import { EmptyState } from '@/shared/ui/molecules';
// Import types
import type { PLNTransaction, TransactionType } from '../types/wallet.types';

/**
 * 🔄 Extend PLNTransaction to work with shared components
 */
interface EnhancedTransaction extends PLNTransaction, DataGridItem {
  // PLNTransaction already has `id` field, so this automatically works
}

interface TransactionsDataSectionProps {
  transactions: PLNTransaction[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasNextPage: boolean;
  error: Error | null;
  viewMode: 'grid' | 'table';
  total: number;
  onLoadMore: () => void;
  onViewDetails: (transaction: PLNTransaction) => void;
  onRetryTransaction: (transaction: PLNTransaction) => void;
  showRetryButton: boolean;
  onClearFilters: () => void;
  selectedItems?: Set<string>;
  onSelectItem?: (id: string) => void;
  onSelectAll?: () => void;
}

/**
 * 📊 Transaction Data Section Component
 * Handles the display of transaction data in grid or table format
 */
export const TransactionsDataSection: React.FC<TransactionsDataSectionProps> = ({
  transactions,
  isLoading,
  isLoadingMore,
  hasNextPage,
  error,
  viewMode,
  total,
  onLoadMore,
  onViewDetails,
  onRetryTransaction,
  showRetryButton,
  onClearFilters,
  selectedItems,
  onSelectItem,
  onSelectAll,
}) => {
  // ✅ Helper function to get transaction status config
  const getTransactionStatusConfig = (transaction: EnhancedTransaction): DataGridStatusConfig => {
    const statusConfigs = {
      COMPLETED: {
        bgColor: 'from-emerald-500/15 via-emerald-400/8 to-transparent',
        borderColor: 'border-emerald-400/30 hover:border-emerald-300/50',
        badgeColor: 'bg-emerald-500/10',
        textColor: 'text-emerald-400',
        pulseColor: 'bg-emerald-500',
      },
      PENDING: {
        bgColor: 'from-amber-500/15 via-amber-400/8 to-transparent',
        borderColor: 'border-amber-400/30 hover:border-amber-300/50',
        badgeColor: 'bg-amber-500/10',
        textColor: 'text-amber-400',
        pulseColor: 'bg-amber-500',
      },
      FAILED: {
        bgColor: 'from-red-500/15 via-red-400/8 to-transparent',
        borderColor: 'border-red-400/30 hover:border-red-300/50',
        badgeColor: 'bg-red-500/10',
        textColor: 'text-red-400',
        pulseColor: 'bg-red-500',
      },
      CANCELLED: {
        bgColor: 'from-gray-500/15 via-gray-400/8 to-transparent',
        borderColor: 'border-gray-400/30 hover:border-gray-300/50',
        badgeColor: 'bg-gray-500/10',
        textColor: 'text-gray-400',
        pulseColor: 'bg-gray-500',
      },
    };
    return statusConfigs[transaction.status] || statusConfigs.FAILED;
  };

  // ✅ Helper function to get transaction type icon
  const getTransactionTypeIcon = (type: TransactionType) => {
    const typeIcons: Record<TransactionType, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
      ADD_PLN_FUNDS: WalletIcon,
      CHARGING_PAYMENT: BanknotesIcon,
      REFUND: ArrowPathIcon,
      TRANSFER: ArrowPathIcon,
    };
    return typeIcons[type] || WalletIcon;
  };

  // ✅ CREATE GRID RENDERER for GenericDataGrid
  const gridRenderer = useMemo(
    (): GridCardRenderer<EnhancedTransaction> => ({
      getStatusConfig: (transaction: EnhancedTransaction): DataGridStatusConfig => {
        return getTransactionStatusConfig(transaction);
      },

      getAnimationDelay: (index: number): string => `${index * 100}ms`,

      renderHeader: (transaction: EnhancedTransaction): React.ReactNode => {
        const statusConfig = getTransactionStatusConfig(transaction);
        const TypeIcon = getTransactionTypeIcon(transaction.type);

        return (
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-xl ${statusConfig.badgeColor} flex items-center justify-center`}
              >
                <TypeIcon className={`w-6 h-6 ${statusConfig.textColor}`} />
              </div>
              <div>
                <div
                  className={`text-sm font-medium ${statusConfig.textColor} mb-1`}
                >
                  {transaction.type.replace('_', ' ')}
                </div>
                <div className="text-white font-semibold text-lg">
                  {transaction.amount.formatted}
                </div>
              </div>
            </div>

            {/* ✅ Use shared StatusBadge */}
            <DataStatusBadge
              status={{
                variant: transaction.status === 'COMPLETED' ? 'success' : 
                         transaction.status === 'PENDING' ? 'warning' : 'danger',
                label: transaction.status,
                pulse: transaction.status === 'PENDING',
              }}
            />
          </div>
        );
      },

      renderContent: (transaction: EnhancedTransaction): React.ReactNode => (
        <>
          {/* Transaction Info */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-gray-300">
              <ClockIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-sm truncate">
                {new Date(transaction.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <BanknotesIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-sm">{transaction.amount.currency}</span>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
            <div className="flex items-center gap-2">
              <WalletIcon className="w-4 h-4 flex-shrink-0" />
              <span>
                ID: {transaction.id.slice(-8)}
              </span>
            </div>
            <div className="text-gray-300">
              {new Date(transaction.createdAt).toLocaleTimeString()}
            </div>
          </div>
        </>
      ),
    }),
    [],
  );

  // ✅ CREATE ACTION BUTTONS for GenericDataGrid
  const gridActions = useMemo(
    (): GridActionButton[] => [
      {
        icon: EyeIcon,
        label: 'View',
        onClick: (transaction) => onViewDetails(transaction as PLNTransaction),
        variant: 'ghost',
      },
      {
        icon: ArrowPathIcon,
        label: 'Retry',
        onClick: (transaction) => onRetryTransaction(transaction as PLNTransaction),
        variant: 'primary',
      }],
    [onViewDetails, onRetryTransaction, showRetryButton],
  );

  // ✅ CREATE TABLE COLUMNS for GenericDataTable
  const tableColumns = useMemo(
    (): TableColumn<EnhancedTransaction>[] => [
      {
        id: 'transaction',
        label: 'Transaction',
        accessor: 'type',
        sticky: true,
        render: (transaction) => {
          const TypeIcon = getTransactionTypeIcon(transaction.type);
          return (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center">
                <TypeIcon className="w-4 h-4 text-teal-400" />
              </div>
              <div>
                <div className="font-medium text-white">{transaction.type.replace('_', ' ')}</div>
                <div className="text-sm text-gray-400">ID: {transaction.id.slice(-8)}</div>
              </div>
            </div>
          );
        },
      },
      {
        id: 'amount',
        label: 'Amount',
        accessor: 'amount',
        render: (transaction) => (
          <span className="text-sm font-medium text-white">
            {transaction.amount.formatted}
          </span>
        ),
      },
      {
        id: 'status',
        label: 'Status',
        accessor: 'status',
        render: (transaction) => (
          <DataStatusBadge
            status={{
              variant: transaction.status === 'COMPLETED' ? 'success' : 
                       transaction.status === 'PENDING' ? 'warning' : 'danger',
              label: transaction.status,
              size: 'sm',
            }}
          />
        ),
      },
      {
        id: 'date',
        label: 'Date',
        accessor: 'createdAt',
        render: (transaction) => (
          <span className="text-sm text-gray-300">
            {new Date(transaction.createdAt).toLocaleDateString()}
          </span>
        ),
      },
    ],
    [],
  );

  // ✅ Convert transactions to enhanced format
  const enhancedTransactions = transactions as EnhancedTransaction[];

  // ✅ Loading States - NEW Shared Skeleton
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

  // ✅ Error State
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
          Transaction service connection failed: {error.message}
        </p>
        <Button
          onClick={onClearFilters}
          className="mx-auto bg-teal-600 hover:bg-teal-700"
        >
          Clear Filters
        </Button>
      </div>
    );
  }

  // ✅ Data Views - NOW USING SHARED COMPONENTS! 🎉
  if (enhancedTransactions.length > 0) {
    return (
      <>
        {/* ✅ NEW: GenericDataTable for table view */}
        {viewMode === 'table' && (
          <GenericDataTable
            items={enhancedTransactions}
            columns={tableColumns}
            actions={gridActions}
            onLoadMore={onLoadMore}
            isLoadingMore={isLoadingMore}
            hasNextPage={hasNextPage}
            total={total}
            selectable={!!selectedItems && !!onSelectItem}
            hoverable={true}
            selectedItems={selectedItems}
            onSelectItem={onSelectItem}
            onSelectAll={onSelectAll}
          />
        )}

        {/* ✅ NEW: GenericDataGrid for grid view */}
        {viewMode === 'grid' && (
          <GenericDataGrid
            items={enhancedTransactions}
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
      </>
    );
  }

  // ✅ Empty State
  return (
    <EmptyState
      icon={BanknotesIcon}
      title="No Payment Records Found"
      description="Adjust search parameters or transaction filters to view relevant financial operations."
      actionLabel="Clear Filters"
      onAction={onClearFilters}
      variant="teal"
    />
  );
};