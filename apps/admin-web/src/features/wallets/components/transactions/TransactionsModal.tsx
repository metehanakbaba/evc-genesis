'use client';

import React, { useState, useCallback } from 'react';
import { Modal } from '@ui/display';
import { TransactionsDataSection } from './TransactionsDataSection';
import { TransactionStatsSection } from './TransactionStatsSection';
import { TransactionSearchSection } from './TransactionSearchSection';
import { useAllTransactions, useTransactionStatistics } from '../../hooks/useTransactions';
import { Transaction } from '../../../../../../../packages/shared/api/src/lib/types/wallet.types';

interface TransactionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Transactions Modal Component
 * Displays transactions with filters and analytics in tabs inside a modal
 */
export const TransactionsModal: React.FC<TransactionsModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Filters state
  const [search, setSearch] = useState('');
  const [type, setType] = useState<'all' | Transaction['type']>('all');
  const [status, setStatus] = useState<'all' | Transaction['status']>('all');
  const [fromDate, setFromDate] = useState<string | undefined>(undefined);
  const [toDate, setToDate] = useState<string | undefined>(undefined);
  const [amountRangeFilter, setAmountRangeFilter] = useState<'all' | 'small' | 'medium' | 'large'>('all');

  // Tab state: 0 = Transactions, 1 = Analytics
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  // Use transactions hook with filters
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
    search,
    type,
    status,
    fromDate,
    toDate,
    amountRangeFilter,
    pageSize: 20,
    enabled: isOpen,
  });

  // Use statistics hook for short stats
  const transactionStats = useTransactionStatistics({ transactions, summary });

  // Handlers
  const onSearchChange = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const onClearFilters = useCallback(() => {
    setSearch('');
    setType('all');
    setStatus('all');
    setFromDate(undefined);
    setToDate(undefined);
    setAmountRangeFilter('all');
  }, []);

  // Placeholder handlers for view details, retry transaction
  const onViewDetails = useCallback((transaction: Transaction) => {
    // Implement view details logic or open details modal
    console.log('View details for transaction', transaction.id);
  }, []);

  const onRetryTransaction = useCallback((transaction: Transaction) => {
    // Implement retry transaction logic
    console.log('Retry transaction', transaction.id);
  }, []);

  // For selection handlers, assuming no selection needed in modal for now
  const selectedItems = undefined;
  const onSelectItem = undefined;
  const onSelectAll = undefined;
  const showRetryButton = true;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Transactions"
      size="xl"
      variant="default"
    >
      <div>
        <div className="flex border-b border-gray-700/50 mb-4">
          <button
            className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              selectedTabIndex === 0
                ? 'border-b-2 border-cyan-400 text-cyan-400'
                : 'text-gray-400 hover:text-cyan-400'
            }`}
            onClick={() => setSelectedTabIndex(0)}
          >
            Transactions
          </button>
          <button
            className={`ml-4 px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              selectedTabIndex === 1
                ? 'border-b-2 border-cyan-400 text-cyan-400'
                : 'text-gray-400 hover:text-cyan-400'
            }`}
            onClick={() => setSelectedTabIndex(1)}
          >
            Analytics
          </button>
        </div>

        {selectedTabIndex === 0 && (
          <>
            <TransactionSearchSection
              searchQuery={search}
              onSearchChange={onSearchChange}
              viewMode="table" // fixed to table for cards
              onViewModeChange={() => {}} // no view mode change in modal
              onOpenFilterModal={() => {}} // no separate filter modal, filters inline or can be extended
              isFilterActive={
                search !== '' ||
                type !== 'all' ||
                status !== 'all' ||
                amountRangeFilter !== 'all' ||
                !!fromDate ||
                !!toDate
              }
            />

            <TransactionStatsSection transactionStats={transactionStats} />

            <TransactionsDataSection
              transactions={transactions}
              isLoading={isLoading}
              isLoadingMore={isLoadingMore}
              hasNextPage={hasNextPage}
              error={error}
              viewMode="table"
              total={total}
              onLoadMore={loadMore}
              onRefresh={refresh}
              onViewDetails={onViewDetails}
              onRetryTransaction={onRetryTransaction}
              showRetryButton={showRetryButton}
              onClearFilters={onClearFilters}
              selectedItems={selectedItems}
              onSelectItem={onSelectItem}
              onSelectAll={onSelectAll}
            />
          </>
        )}

        {selectedTabIndex === 1 && (
          <>
            {/* Analytics tab content */}
            {/* For now reuse TransactionStatsSection or add more analytics components */}
            <TransactionStatsSection transactionStats={transactionStats} />
            {/* Additional analytics can be added here */}
          </>
        )}
      </div>
    </Modal>
  );
};
