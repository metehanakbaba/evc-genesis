'use client';

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Modal } from '@ui/display';
import { TransactionRefundModal } from './TransactionRefundModal';
import { useAllTransactions, useTransactionStatistics } from '../../hooks/useTransactions';
import { Transaction, TransactionStatus, TransactionType } from '../../../../../../../packages/shared/api/src/lib/types/wallet.types';
import { useRouter, useSearchParams } from 'next/navigation';
import { TransactionSearchSection } from './TransactionSearchSection';
import { QuickFilterButtons, QuickFilterGroup } from '@/shared/ui';
import GenericFilterModal, { FilterGroup } from '@/shared/ui/components/DataDisplay/GenericFilterModal';
import { 
  CheckCircleIcon,
  ArrowPathIcon, 
  ArrowsRightLeftIcon, 
  BoltIcon, 
  CheckBadgeIcon, 
  ClockIcon, 
  CreditCardIcon, 
  PlusCircleIcon, 
  XCircleIcon 
} from '@heroicons/react/20/solid';
import { BanIcon } from 'lucide-react';
import { TransactionsDataSection } from './TransactionsDataSection';

interface TransactionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TransactionsModal: React.FC<TransactionsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Filters state

  const [search, setSearch] = useState('');
  const [type, setType] = useState<'all' | TransactionType>('all');
  const [status, setStatus] = useState<'all' | TransactionStatus>('all');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>();
  const [minAmount, setMinAmount] = useState<number | undefined>();
  const [maxAmount, setMaxAmount] = useState<number | undefined>();

  // Selected transaction ID from state or route param
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);

  // Refund modal open state
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Fetch transactions list with filters
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
    pageSize: 20,
    enabled: isOpen,
  });

  const refetchSelectedTransaction = () => {}; // noop since no separate fetch

  const isFilterActive = useMemo(() => (
   type !== 'all' || 
    status !== 'all' || 
    search !== '' || 
    fromDate !== '' || 
    toDate !== '' || 
    minAmount !== undefined || 
    maxAmount !== undefined
  ), [type, status, search, fromDate, toDate, minAmount, maxAmount])

  const clearFilters = () => {
    setFromDate('');
    setToDate('');
    setMaxAmount(0);
    setMinAmount(0);
    setType('all');
    setStatus('all');
    setSearch('')
  }

  // Define quick filter groups for type and status
  const quickFilterGroups = useMemo((): QuickFilterGroup[] => [
    {
      id: 'type',
      title: 'Transaction Type',
      icon: CheckCircleIcon,
      selectedValue: type,
      onChange: (value: string) => setType(value as Transaction['type'] | 'all'),
      options: [
        { id: 'all', label: 'All Types', icon: CheckCircleIcon, color: 'emerald' },
        { id: 'STRIPE_PLN_PAYMENT', label: 'Stripe PLN Payment', icon: CheckCircleIcon, color: 'emerald' },
        { id: 'ADD_PLN_FUNDS', label: 'Add PLN Funds', icon: CheckCircleIcon, color: 'emerald' },
        { id: 'PLN_CHARGING_PAYMENT', label: 'PLN Charging Payment', icon: CheckCircleIcon, color: 'emerald' },
        { id: 'PLN_REFUND', label: 'PLN Refund', icon: CheckCircleIcon, color: 'emerald' },
      ],
    },
    {
      id: 'status',
      title: 'Transaction Status',
      icon: CheckCircleIcon,
      selectedValue: status,
      onChange: (value: string) => setStatus(value as Transaction['status'] | 'all'),
      options: [
        { id: 'all', label: 'All Statuses', icon: CheckCircleIcon, color: 'emerald' },
        { id: 'PENDING', label: 'Pending', icon: CheckCircleIcon, color: 'emerald' },
        { id: 'COMPLETED', label: 'Completed', icon: CheckCircleIcon, color: 'emerald' },
        { id: 'FAILED', label: 'Failed', icon: CheckCircleIcon, color: 'emerald' },
        { id: 'CANCELLED', label: 'Cancelled', icon: CheckCircleIcon, color: 'emerald' },
      ],
    },
    {
      id: 'amountRange',
      title: 'Amount Range',
      icon: CheckCircleIcon,
      selectedValue: '',
      onChange: () => {},
      options: [
        { id: 'small', label: 'Small (<100)', icon: CheckCircleIcon, color: 'emerald' },
        { id: 'medium', label: 'Medium (100-500)', icon: CheckCircleIcon, color: 'emerald' },
        { id: 'large', label: 'Large (>500)', icon: CheckCircleIcon, color: 'emerald' },
      ],
    },
  ], [type, status]);

  // Define filter groups for date and amount ranges
  const filterGroups: FilterGroup[] = useMemo(() => [
    {
      id: 'dateRange',
      title: 'Date Range',
      type: 'date',
      from: fromDate,
      selectedValue: '',
      onChange: () => {},
      to: toDate,
      onRangeChange: (from, to) => {
        setFromDate(from as string || '');
        setToDate(to as string || '');
      },
      options: [],
    },
    {
      id: 'amountRange',
      title: 'Amount Range',
      type: 'range',
      selectedValue: '',
      from: minAmount,
      to: maxAmount,
      onChange: () => {},
      onRangeChange: (from, to) => {
        setMinAmount(from as number || undefined);
        setMaxAmount(to as number || undefined);
      },
      options: [],
    },
    {
      id: 'status',
      title: 'Status',
      selectedValue: status,
      onChange: (value) => setStatus(value as Transaction['status'] | 'all'),
      options: [
        { id: 'all', label: 'All Statuses', icon: CheckCircleIcon, color: 'gray' },
        { id: 'PENDING', label: 'Pending', icon: ClockIcon, color: 'amber' },
        { id: 'COMPLETED', label: 'Completed', icon: CheckBadgeIcon, color: 'emerald' },
        { id: 'FAILED', label: 'Failed', icon: XCircleIcon, color: 'red' },
        { id: 'CANCELLED', label: 'Cancelled', icon: BanIcon, color: 'gray' },
      ],
    },
    {
      id: 'type',
      title: 'Type',
      selectedValue: type,
      onChange: (value) => setType(value as Transaction['type'] | 'all'),
      options: [
        { id: 'all', label: 'All Types', icon: ArrowsRightLeftIcon, color: 'gray' },
        { id: 'STRIPE_PLN_PAYMENT', label: 'Stripe PLN', icon: CreditCardIcon, color: 'blue' },
        { id: 'ADD_PLN_FUNDS', label: 'Add Funds', icon: PlusCircleIcon, color: 'emerald' },
        { id: 'PLN_CHARGING_PAYMENT', label: 'Charging', icon: BoltIcon, color: 'amber' },
        { id: 'PLN_REFUND', label: 'Refund', icon: ArrowPathIcon, color: 'purple' },
      ],
    },
    {
      id: 'status',
      title: 'Status',
      selectedValue: '',
      onChange: () => {},
      options: []
    },
  ], [fromDate, toDate, minAmount, maxAmount, type, status]);

   // Sync selectedTransactionId with route
  useEffect(() => {
    if (!isOpen) {
      setSelectedTransactionId(null);
      return;
    }
    const transactionIdFromRoute = searchParams?.get('transactionId');
    if (transactionIdFromRoute) {
      setSelectedTransactionId(transactionIdFromRoute);
    }
  }, [isOpen, searchParams]);

  // Update route when selectedTransactionId changes
  useEffect(() => {
    if (!isOpen) return;
    const url = new URL(window.location.href);
    if (selectedTransactionId) {
      url.searchParams.set('transactionId', selectedTransactionId);
    } else {
      url.searchParams.delete('transactionId');
    }
    router.replace(url.toString(), { scroll: false });
  }, [selectedTransactionId, isOpen, router]);

  const onSearchChange = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const onClearFilters = useCallback(() => {
    setSearch('');
    setType('all');
    setStatus('all');
    setFromDate('');
    setToDate('');
    setMinAmount(undefined);
    setMaxAmount(undefined);
  }, []);

  const onSelectTransaction = (id: string) => {
    setSelectedTransactionId(id);
  };

  const onRefundSuccess = () => {
    refresh();
    refetchSelectedTransaction();
  };

  React.useEffect(() => {
    const handleOpenRefundModal = (event: CustomEvent) => {
      setSelectedTransactionId(event.detail);
      setIsRefundModalOpen(true);
    };
    window.addEventListener('openRefundModal', handleOpenRefundModal as EventListener);
    return () => {
      window.removeEventListener('openRefundModal', handleOpenRefundModal as EventListener);
    };
  }, []);

  const onOpenRefundModal = () => {
    setIsRefundModalOpen(true);
  };

  const onCloseRefundModal = () => {
    setIsRefundModalOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setSelectedTransactionId(null);
      }}
      title="Transactions"
      size="full"
      variant="default"
    >
      <div className="flex flex-col space-y-4">
        <TransactionSearchSection
          searchQuery={search}
          onSearchChange={onSearchChange}
          viewMode="table"
          onViewModeChange={() => {}}
          onOpenFilterModal={() => {}}
          isFilterActive={isFilterActive}
        />

        <TransactionsDataSection 
          transactions={transactions}
          hasNextPage={hasNextPage}
          error={error}
          onLoadMore={loadMore}
          onRefresh={refresh}
          onClearFilters={clearFilters}
          isLoading={isLoading}
          onSelectTransaction={(tx) => onSelectTransaction(tx.id)}
          selectedTransaction={transactions.find(t => t.id === selectedTransactionId) ?? null}
        />

        <TransactionRefundModal
          isOpen={isRefundModalOpen}
          onClose={onCloseRefundModal}
          transactionId={selectedTransactionId ?? ''}
          onRefundSuccess={onRefundSuccess}
        />

        <GenericFilterModal 
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          filterGroups={filterGroups}
          onClearFilters={onClearFilters}
        />
      </div>
    </Modal>
  );
};
