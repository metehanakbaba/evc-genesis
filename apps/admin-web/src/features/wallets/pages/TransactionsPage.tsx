'use client';

import {
  ArrowDownTrayIcon,
  ArrowUpIcon,
  BanknotesIcon,
  BoltIcon,
  CheckCircleIcon,
  ClockIcon,
  PlusIcon,
  ReceiptRefundIcon,
  ViewColumnsIcon,
  WalletIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { MainLayout, PageContainer, PageHeader } from '@ui/layout';
import type React from 'react';
import { useState, useMemo } from 'react';
// ✅ Import shared GenericFilterModal instead of custom TransactionFilterModal
import {
  type FilterGroup,
  GenericFilterModal,
} from '@/shared/ui/components/DataDisplay/GenericFilterModal';
import { Breadcrumb } from '@/shared/ui/components/Navigation';
// ✅ Import shared debounce hook
import { useSearchDebounce } from '@/shared/ui/hooks/useDebounce';
// ✅ Import API hooks and types
import { useTransactionActions } from '@/features/wallets/api/walletApi';
// ✅ Import new reusable components
import { TransactionStatsSection, TransactionSearchSection, TransactionsDataSection, TransactionBulkActions} from '@/features/wallets/components/index';
import { QuickFilterButtons, QuickFilterGroup, useBulkSelection } from '@/shared/ui';
import { useAllTransactions, useTransactionStatistics } from '../hooks/useTransactions';
import { TransactionType, TransactionStatus } from '../../../../../../packages/shared/api/src/lib/types/wallet.types';

/**
 * Transactions Page
 * Displays all transactions with search, filters, bulk actions, and refund modal
 *  !! TODO Implement Transactions page 
 */

const TransactionsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [amountRangeFilter, setAmountRangeFilter] = useState<string>('small');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // ✅ Debounce search query to prevent excessive API calls
  const debouncedSearchQuery = useSearchDebounce(searchQuery, 300);

  const {
    transactions,
    summary,
    isLoading,
    isLoadingMore,
    hasNextPage,
    error,
    loadMore,
    refresh,
    total,
  } = useAllTransactions({
      search: debouncedSearchQuery,
      type: typeFilter as TransactionType,
      status: statusFilter as TransactionStatus,
      amountRangeFilter: amountRangeFilter,
  });

  const { viewDetails, retryTransaction, refundTransaction } = useTransactionActions();

  // ✅ Bulk selection management
  const { selectedIds, selectedCount, toggleItem, toggleAll, clearSelection } =
    useBulkSelection(transactions);

  // ✅ Create revolutionary filter groups for GenericFilterModal
  const filterGroups: FilterGroup[] = [
    {
      id: 'transaction-type',
      title: 'Transaction Type',
      selectedValue: typeFilter,
      onChange: setTypeFilter,
      options: [
        {
          id: 'all',
          label: 'All Types',
          icon: WalletIcon,
          color: 'gray',
        },
        {
          id: 'ADD_PLN_FUNDS',
          label: 'Top-up',
          icon: ArrowDownTrayIcon,
          color: 'emerald',
        },
        {
          id: 'PLN_CHARGING_PAYMENT',
          label: 'Payment',
          icon: BoltIcon,
          color: 'blue',
        },
        {
          id: 'PLN_REFUND',
          label: 'Refund',
          icon: ReceiptRefundIcon,
          color: 'amber',
        },
        {
          id: 'STRIPE_PLN_PAYMENT',
          label: 'Transfer',
          icon: ArrowUpIcon,
          color: 'purple',
        },
      ],
    },
    {
      id: 'status',
      title: 'Status',
      selectedValue: statusFilter,
      onChange: setStatusFilter,
      options: [
        {
          id: 'all',
          label: 'All Status',
          icon: ViewColumnsIcon,
          color: 'gray',
        },
        {
          id: 'COMPLETED',
          label: 'Completed',
          icon: CheckCircleIcon,
          color: 'emerald',
        },
        {
          id: 'PENDING',
          label: 'Pending',
          icon: ClockIcon,
          color: 'amber',
        },
        {
          id: 'FAILED',
          label: 'Failed',
          icon: XCircleIcon,
          color: 'red',
        },
        {
          id: 'CANCELLED',
          label: 'Cancelled',
          icon: XMarkIcon,
          color: 'red',
        },
      ],
    },
    {
      id: 'amount-range',
      title: 'Amount Range',
      selectedValue: amountRangeFilter,
      onChange: setAmountRangeFilter,
      options: [
        {
          id: 'all',
          label: 'All Amounts',
          icon: ViewColumnsIcon,
          color: 'gray',
        },
        {
          id: 'large',
          label: 'Large (500+ zł)',
          icon: BanknotesIcon,
          color: 'red',
        },
        {
          id: 'medium',
          label: 'Medium (100-500 zł)',
          icon: BanknotesIcon,
          color: 'amber',
        },
        {
          id: 'small',
          label: 'Small (<100 zł)',
          icon: BanknotesIcon,
          color: 'blue',
        },
      ],
    },
  ];

  const quickFilterGroups: QuickFilterGroup[] = useMemo(
    () => [
      {
        id: 'transaction-type',
        title: 'Type',
        icon: WalletIcon,
        selectedValue: typeFilter,
        onChange: setTypeFilter,
        options: [
          { id: 'all', label: 'All', icon: WalletIcon, color: 'gray' },
          { id: 'ADD_PLN_FUNDS', label: 'Top-up', icon: ArrowDownTrayIcon, color: 'emerald' },
          { id: 'PLN_CHARGING_PAYMENT', label: 'Payment', icon: BoltIcon, color: 'blue' },
          { id: 'PLN_REFUND', label: 'Refund', icon: ReceiptRefundIcon, color: 'amber' },
        ],
      },
      {
        id: 'transaction-status',
        title: 'Status',
        icon: ViewColumnsIcon,
        selectedValue: statusFilter,
        onChange: setStatusFilter,
        options: [
          { id: 'all', label: 'All', icon: ViewColumnsIcon, color: 'gray' },
          { id: 'COMPLETED', label: 'Done', icon: CheckCircleIcon, color: 'emerald' },
          { id: 'PENDING', label: 'Pending', icon: ClockIcon, color: 'amber' },
          { id: 'FAILED', label: 'Failed', icon: XCircleIcon, color: 'red' },
        ],
      },
      {
        id: 'amount-range',
        title: 'Amount',
        icon: BanknotesIcon,
        selectedValue: amountRangeFilter,
        onChange: setAmountRangeFilter,
        options: [
          { id: 'all', label: 'All', icon: BanknotesIcon, color: 'gray' },
          { id: 'large', label: '500+ zł', icon: BanknotesIcon, color: 'red' },
          { id: 'medium', label: '100-500 zł', icon: BanknotesIcon, color: 'amber' },
          { id: 'small', label: '<100 zł', icon: BanknotesIcon, color: 'blue' },
        ],
      },
    ],
    [typeFilter, statusFilter, amountRangeFilter]
  );

  const transactionStatsData = useTransactionStatistics({ transactions: transactions, summary: summary});

  // ✅ Filtering is now handled by useInfiniteTransactions hook

  /**
   * 🎨 Clear All Filters
   */
  const handleClearFilters = () => {
    setTypeFilter('all');
    setStatusFilter('all');
    setAmountRangeFilter('all');
    setSearchQuery('');
  };

  return (
    <MainLayout
      showNotifications={true}
      notificationCount={3}
      headerVariant="default"
    >
      {/* Revolutionary Page Header with Teal Theme */}
      <PageContainer paddingY="md">
        {/* Revolutionary Breadcrumb Navigation */}
        <Breadcrumb currentPageLabel="Enterprise Treasury" variant="teal" />

        <PageHeader
          title="Enterprise Treasury Management"
          description="Comprehensive financial operations, payment processing, and liquidity oversight"
          variant="teal"
          actionButton={{
            label: 'Initiate Transaction',
            onClick: () => {
              /* Add transaction logic */
            },
            icon: PlusIcon,
            iconAnimation: 'rotate-90',
          }}
        />
      </PageContainer>

      <PageContainer paddingY="lg" className="space-y-10">
        {/* Revolutionary Network Stats Section */}
        <TransactionStatsSection transactionStats={transactionStatsData} />

        {/* Revolutionary Transaction Management Section */}
        <section>

          <TransactionSearchSection 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onOpenFilterModal={() => setIsFilterModalOpen(true)}
            isFilterActive={              
              typeFilter !== 'all' ||
              statusFilter !== 'all' ||
              amountRangeFilter !== 'all'
            }
          />

          <QuickFilterButtons 
            filterGroups={quickFilterGroups} 
            variant="teal"
           />

          {/* Transactions Data Section */}
          <TransactionsDataSection
            transactions={transactions}
            isLoading={isLoading}
            isLoadingMore={isLoadingMore}
            hasNextPage={hasNextPage}
            error={error}
            viewMode={viewMode}
            total={total}
            onLoadMore={loadMore}
            onViewDetails={viewDetails}
            onRetryTransaction={retryTransaction}
            showRetryButton={true}
            onRefresh={refresh}
            onClearFilters={handleClearFilters}
            selectedItems={new Set(selectedIds)}
            onSelectItem={toggleItem}
            onSelectAll={() => toggleAll(true)}
          />
        </section>
      </PageContainer>

      {/* Generic Filter Modal */}
      <GenericFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title="Transaction Filters"
        description="Filter transactions by type, status, and amount range"
        filterGroups={filterGroups}
        onClearFilters={handleClearFilters}
        variant="teal"
      />

      <TransactionBulkActions 
          transactions={transactions}
          selectedIds={selectedIds}
          selectedCount={selectedCount}
          clearSelection={clearSelection}
          totalCount={transactions.length}
          viewDetails={viewDetails}
          retryTransaction={retryTransaction}
          refundTransaction={refundTransaction}
      />
    </MainLayout>
  );
};

export default TransactionsPage;
