/**
 * 🔄 Infinite Transactions Hook
 *
 * Infinite scroll functionality for transaction lists with API-based search and filtering.
 * Compatible with wallet API schema and server-side pagination.
 *
 * @module useInfiniteTransactions
 * @version 3.0.0 - API Search Integration
 * @author EV Charging Team
 */

import { useGetAllTransactionsQuery, useProcessRefundMutation } from '../api/walletApi';
import { Transaction, TransactionsQuery, TransactionSummary, TransactionType, TransactionStatus, TransactionQuery, RefundRequest } from '../../../../../../packages/shared/api/src/lib/types/wallet.types';
import { TransactionStatsData } from '../types/wallet.types';
import { useDebounce } from './useDebounce';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useToast } from '@/shared/ui';
import { isApiError } from '@/shared/api/apiHelpers';

interface TransactionsResult {
  transactions: Transaction[];
  summary: TransactionSummary;
  isLoading: boolean;
  isLoadingMore: boolean;
  hasNextPage: boolean;
  error: Error | null;
  loadMore: () => void;
  refresh: () => void;
  total: number;
}

interface UseTransactionsOptions extends Omit<TransactionsQuery, 'type' | 'status'> {
  type?: TransactionType | 'all';
  status?: TransactionStatus | 'all';
  amountRangeFilter?: string;
  enabled?: boolean;
  pageSize?: number;
}

export const useAllTransactions = ({
  search = '',
  type = 'all',
  status = 'all',
  fromDate,
  toDate,
  userId,
  amountRangeFilter = 'all',
  pageSize = 20,
  enabled = true,
}: UseTransactionsOptions): TransactionsResult => {
  const [currentPage, setCurrentPage] = useState(1);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<TransactionSummary>({
    totalTransactions: 0,
    totalAmount: 0,
    averageAmount: 0
  });
  const [total, setTotal] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const debouncedSearchQuery = useDebounce(search, 300);

  const queryParams = useMemo<TransactionQuery>(() => {
    const params: TransactionQuery = {
      limit: pageSize,
    };

    if (debouncedSearchQuery) params.search = debouncedSearchQuery;
    if (fromDate) params.fromDate = fromDate;
    if (toDate) params.toDate = toDate;
    if (userId) params.userId = userId;
    if (status !== 'all') params.status = status;
    if (type !== 'all') params.type = type;

    switch (amountRangeFilter) {
      case 'large':
        params.minAmount = 500;
        break;
      case 'medium':
        params.minAmount = 100;
        params.maxAmount = 500;
        break;
      case 'small':
        params.maxAmount = 100;
        break;
    }

    return params;
  }, [
    currentPage,
    pageSize,
    debouncedSearchQuery,
    type,
    status,
    amountRangeFilter,
    fromDate,
    toDate,
    userId
  ]);

  const {
    data,
    error: queryError,
    isLoading,
    isFetching,
  } = useGetAllTransactionsQuery(queryParams, {
    skip: !enabled || !hasNextPage,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (queryError) {
      setError(queryError as Error);
    } else {
      setError(null);
    }
  }, [queryError]);

  useEffect(() => {
    if (data) {
      setTransactions(prev => {
        const existingIds = new Set(prev.map(t => t.id));
        const newTransactions = data.transactions.filter((t: Transaction)=> !existingIds.has(t.id));
        return currentPage === 1 ? data.transactions : [...prev, ...newTransactions];
      });

      if (currentPage === 1) {
        setSummary(data.summary);
        setTotal(data.pagination.total);
      }

      setHasNextPage(data.pagination.hasMore);
    }
  }, [data, currentPage]);

  const loadMore = useCallback(() => {
    if (!isFetching && hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  }, [isFetching, hasNextPage]);

  const refresh = useCallback(() => {
    setTransactions([]);
    setCurrentPage(1);
    setHasNextPage(true);
  }, []);

  useEffect(() => {
    if (enabled) {
      refresh();
    }
  }, [debouncedSearchQuery, type, status, amountRangeFilter, fromDate, toDate, userId, enabled, refresh]);

  return {
    transactions,
    summary,
    isLoading: isLoading && currentPage === 1,
    isLoadingMore: isFetching && currentPage > 1,
    hasNextPage,
    error,
    loadMore,
    refresh,
    total,
  };
};

interface TransactionStatistics {
  transactions: Transaction[];
  summary: TransactionSummary;
}

export const useTransactionStatistics = (data: TransactionStatistics): TransactionStatsData => {
  return useMemo(() => {
    const { transactions, summary } = data;

    // 1. Calculate total balance (assuming all completed transactions contribute to balance)
    const totalBalance = {
      amount: summary.totalAmount,
      formatted: `${summary.totalAmount.toFixed(2)} PLN`,
    };

    // 2. Calculate daily volume (transactions per day)
    // Group transactions by day
    const dailyCounts = transactions.reduce((acc, tx) => {
      const date = new Date(tx.createdAt).toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const dailyVolume = {
      count: Object.values(dailyCounts).reduce((sum, count) => sum + count, 0),
      formatted: `${summary.totalTransactions} transactions across ${Object.keys(dailyCounts).length} days`,
    };

    // 3. Revenue (simplified - could be commission or profit)
    const revenue = {
      formatted: `${(summary.totalAmount * 0.01).toFixed(2)} PLN`, // Example: 1% revenue
      percentage: "1%",
    };

    // 4. Refund liabilities
    const refunds = transactions.filter(tx => tx.type === 'PLN_REFUND');
    const refundLiabilities = {
      amount: {
        value: refunds.reduce((sum, tx) => sum + tx.amount.value, 0),
        formatted: `${refunds.reduce((sum, tx) => sum + tx.amount.value, 0).toFixed(2)} PLN`,
      },
      pending: refunds.filter(tx => tx.status === 'PENDING').length,
    };

    return {
      totalBalance,
      dailyVolume,
      revenue,
      refundLiabilities,
    };
  }, [data]);
};

export const useTransactionActions = () => {
  const [processRefund] = useProcessRefundMutation();
  const { showToast } = useToast();

  const refundTransaction = useCallback(async (refundData: RefundRequest) => {
    try {
      await processRefund(refundData).unwrap();
      showToast({
        type: 'success',
        title: 'Refund processed',
        message: 'The refund was successfully processed.',
        duration: 4000,
      });
    } catch (error) {
      const errorMessage = isApiError(error) ? error.data.error.message : 'Failed to process refund';
      showToast({
        type: 'error',
        title: 'Refund error',
        message: errorMessage,
        duration: 4000,
      });
    }
  }, [processRefund, showToast]);

  return {
    refundTransaction,
  };
};
