'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { GenericDataPane } from '@/shared/ui/components/DataDisplay/GeneticDataPane';
import { QuickFilterGroup } from '@/shared/ui/components/DataDisplay/QuickFilterButtons';
import { RangeOption } from '@/shared/ui/molecules/Ranges/RangeSelector';
import { Transaction, TransactionType, TransactionStatus } from '../../../../../../../packages/shared/api/src/lib/types/wallet.types';
import { ClockIcon, CurrencyDollarIcon, DocumentDuplicateIcon, UserIcon,  } from '@heroicons/react/20/solid';
import { Button } from '@/shared/ui';

interface TransactionsDataSectionProps {
  transactions: Transaction[];
  hasNextPage?: boolean;
  userId?: string;
  onSelectTransaction: (transaction: Transaction) => void;
  selectedTransaction: Transaction | null;
  scrollable?: boolean;
  scrollHeight?: string;
  error?: Error | null;
  isLoading?: boolean;
  onRefresh?: () => void;
  onLoadMore?: () => void;
  onClearFilters?: () => void;
}

interface FilterParams {
  type?: TransactionType | 'all';
  status?: TransactionStatus | 'all';
  userId?: string;
  search?: string;
  minAmount?: number;
  maxAmount?: number;
  fromDate?: string;
  toDate?: string;
}

const amountRangeOptions: RangeOption[] = [
  { id: 'upTo100', label: '> 100', from: undefined, to: 100 },
  { id: '100to500', label: '100 to 500', from: 100, to: 500 },
  { id: 'above500', label: '< 500', from: 500, to: undefined },
];

const dateRangeOptions: RangeOption[] = [
  { id: '7d', label: '1w', from: undefined, to: undefined },
  { id: '30d', label: '30d', from: undefined, to: undefined },
  { id: '90d', label: '90d', from: undefined, to: undefined },
  { id: '1y', label: '1y', from: undefined, to: undefined },
];

// Quick filter groups with fixed options
const quickFilterGroups: QuickFilterGroup[] = [
  {
    id: 'type',
    title: 'Transaction Type',
    icon: () => null, // no icon for simplicity
    selectedValue: 'all',
    onChange: () => {},
    options: [
      { id: 'all', label: 'All', icon: () => null, color: 'gray' },
      { id: 'deposit', label: 'Deposit', icon: () => null, color: 'emerald' },
      { id: 'withdrawal', label: 'Withdrawal', icon: () => null, color: 'blue' },
      { id: 'transfer', label: 'Transfer', icon: () => null, color: 'purple' },
    ],
  },
  {
    id: 'status',
    title: 'Status',
    icon: () => null,
    selectedValue: 'all',
    onChange: () => {},
    options: [
      { id: 'all', label: 'All', icon: () => null, color: 'gray' },
      { id: 'pending', label: 'Pending', icon: () => null, color: 'amber' },
      { id: 'completed', label: 'Completed', icon: () => null, color: 'emerald' },
      { id: 'failed', label: 'Failed', icon: () => null, color: 'red' },
    ],
  },
];

export const TransactionsDataSection: React.FC<TransactionsDataSectionProps> = ({
  transactions,
  userId,
  onSelectTransaction,
  selectedTransaction,
  scrollable = false,
  scrollHeight = '400px',
}) => {
  // Filter state
  const [filterParams, setFilterParams] = useState<FilterParams>({
    userId,
    type: 'all',
    status: 'all',
    search: '',
    minAmount: undefined,
    maxAmount: undefined,
    fromDate: undefined,
    toDate: undefined,
  });

  // Handlers for quick filter changes
  const handleQuickFilterChange = useCallback((groupId: string, value: string) => {
    setFilterParams((prev) => ({
      ...prev,
      [groupId]: value === 'all' ? undefined : value,
    }));
  }, []);

  // Handlers for range selector changes
  const handleAmountRangeChange = useCallback((from?: number | string, to?: number | string, optionId?: string) => {
    setFilterParams((prev) => ({
      ...prev,
      minAmount: typeof from === 'number' ? from : undefined,
      maxAmount: typeof to === 'number' ? to : undefined,
    }));
  }, []);

  const handleDateRangeChange = useCallback((from?: number | string, to?: number | string, optionId?: string) => {
    setFilterParams((prev) => ({
      ...prev,
      fromDate: typeof from === 'string' ? from : undefined,
      toDate: typeof to === 'string' ? to : undefined,
    }));
  }, []);

  // Compose quick filter groups with handlers
  const quickFilters = useMemo(() => {
    return quickFilterGroups.map((group) => ({
      ...group,
      selectedValue: filterParams[group.id as keyof FilterParams] ?? 'all',
      onChange: (value: string) => handleQuickFilterChange(group.id, value),
    }));
  }, [filterParams, handleQuickFilterChange]);

  // Compose detailed filter groups for GenericDataPane
const filterGroups: QuickFilterGroup[] = [
    {
      id: 'amount',
      title: 'Amount Range',
      icon: () => null,
      selectedValue: '',
      onChange: () => {},
      options: amountRangeOptions.map(({ id, label }) => ({
        id,
        label,
        icon: () => null,
        color: 'gray',
      })),
      // type and onRangeChange handled via rangeSelectorConfig
    },
    {
      id: 'date',
      title: 'Date Range',
      icon: () => null,
      selectedValue: '',
      onChange: () => {},
      options: dateRangeOptions.map(({ id, label }) => ({
        id,
        label,
        icon: () => null,
        color: 'gray',
      })),
      // options: dateRangeOptions,
    },
  ];

  // Filter transactions based on filterParams
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      if (filterParams.userId && tx.userId !== filterParams.userId) return false;
      if (filterParams.type && filterParams.type !== 'all' && tx.type !== filterParams.type) return false;
      if (filterParams.status && filterParams.status !== 'all' && tx.status !== filterParams.status) return false;
      if (filterParams.search && !tx.id.includes(filterParams.search)) return false;
      if (filterParams.minAmount !== undefined && tx.amount.value < filterParams.minAmount) return false;
      if (filterParams.maxAmount !== undefined && tx.amount.value > filterParams.maxAmount) return false;
      if (filterParams.fromDate && tx.createdAt < filterParams.fromDate) return false;
      if (filterParams.toDate && tx.createdAt > filterParams.toDate) return false;
      return true;
    });
  }, [transactions, filterParams]);

  const renderListItem = (tx: Transaction) => (
    <div>
      <div className="inline-flex items-center rounded-lg px-3 py-[2.5]">
        <span className="text-xs font-medium text-gray-400 mr-4">ID</span>
        <span className="font-mono text-sm text-indigo-300">{tx.id}</span>
        <Button 
          className="ml-2 text-gray-400 hover:text-indigo-300 transition-colors p-0"
          onClick={() => navigator.clipboard.writeText(tx.id)}
        >
          <DocumentDuplicateIcon className="h-4 w-4 bgColor-transparent p-0" />
        </Button>
      </div>
    </div>
  );

  // Render details pane
  const renderDetails = (tx: Transaction) => (
    <div className={`rounded-xl p-5 bg-gray-900/50 border-gray-700`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center`}>
            <CurrencyDollarIcon className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <div className="text-sm font-medium text-indigo-400 mb-1">
              Transaction #{tx.id.slice(0, 6)}
            </div>
            <div className="text-white font-semibold text-lg">
              {tx.type === 'ADD_PLN_FUNDS' ? 'Deposit' : 'Withdrawal'}
            </div>
          </div>
        </div>

        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          tx.status === 'COMPLETED' 
            ? 'bg-emerald-500/10 text-emerald-400' 
            : 'bg-amber-500/10 text-amber-400'
        }`}>
          {tx.status}
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-gray-300">
          <UserIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="text-sm">User ID: {tx.userId}</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-300">
          <CurrencyDollarIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="text-sm">
            Amount: <span className="text-white font-medium">
              {tx.amount.value.toFixed(2)} {tx.amount.currency}
            </span>
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <ClockIcon className="w-4 h-4 flex-shrink-0" />
          <span>{new Date(tx.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="text-gray-300">
          {new Date(tx.createdAt).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );

  return (
    <div className={scrollable ? 'overflow-auto' : undefined} style={scrollable ? { maxHeight: scrollHeight } : undefined}>

      <GenericDataPane
        items={filteredTransactions}
        selectedItem={selectedTransaction}
        onSelectItem={onSelectTransaction}
        renderListItem={renderListItem}
        renderDetails={renderDetails}
      actions={[
          {
            id: 'refund',
            label: 'Refund',
            onClick: (tx) => {
              if (typeof window !== 'undefined' && window.dispatchEvent) {
                window.dispatchEvent(new CustomEvent('openRefundModal', { detail: tx.id }));
              }
            },
            variant: 'secondary',
          },
          {
            id: 'edit',
            label: 'Refund',
            onClick: (tx) => {
              if (typeof window !== 'undefined' && window.dispatchEvent) {
                window.dispatchEvent(new CustomEvent('openRefundModal', { detail: tx.id }));
              }
            },
            variant: 'secondary',
          },
          {
            id: 'edit2',
            label: 'Refund',
            onClick: (tx) => {
              if (typeof window !== 'undefined' && window.dispatchEvent) {
                window.dispatchEvent(new CustomEvent('openRefundModal', { detail: tx.id }));
              }
            },
            variant: 'secondary',
          },
          {
            id: 'edit3',
            label: 'Refund',
            onClick: (tx) => {
              if (typeof window !== 'undefined' && window.dispatchEvent) {
                window.dispatchEvent(new CustomEvent('openRefundModal', { detail: tx.id }));
              }
            },
            variant: 'secondary',
          },
        ]}
        filters={filterGroups}
        onClearFilters={() => setFilterParams({
          userId,
          type: 'all',
          status: 'all',
          search: '',
          minAmount: undefined,
          maxAmount: undefined,
          fromDate: undefined,
          toDate: undefined,
        })}
        size="full"
        listWidthRatio={0.4}
        listPosition="left"
        rangeSelectorConfig={{
          type: 'number',
          options: amountRangeOptions,
          selectedOptionId: undefined,
          fromValue: filterParams.minAmount,
          toValue: filterParams.maxAmount,
          onRangeChange: handleAmountRangeChange,
          minFrom: 0,
          maxFrom: undefined,
          minTo: 0,
          maxTo: undefined,
        }}
        scrollable={true}
        scrollHeight={'300px'}
      />
    </div>
  );
};
