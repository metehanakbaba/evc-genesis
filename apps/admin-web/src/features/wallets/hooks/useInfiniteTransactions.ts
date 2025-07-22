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

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useGetAllTransactionsQuery } from '../api/walletApi';
import type {
  PLNTransaction,
  TransactionQueryParams,
} from '../types/wallet.types';

interface InfiniteTransactionsResult {
  transactions: PLNTransaction[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasNextPage: boolean;
  error: Error | null;
  loadMore: () => void;
  refresh: () => void;
  total: number;
}

interface UseInfiniteTransactionsOptions {
  filters?: {
    searchQuery?: string;
    typeFilter?: string;
    statusFilter?: string;
    amountRangeFilter?: string;
  };
  pageSize?: number;
  enabled?: boolean;
}

/**
 * 🚀 useInfiniteTransactions Hook - API Search Integration
 * Provides infinite scroll functionality with server-side search and filtering
 */
export const useInfiniteTransactions = (
  options: UseInfiniteTransactionsOptions = {},
): InfiniteTransactionsResult => {
  const { filters = {}, pageSize = 20, enabled = true } = options;

  // ✅ State Management
  const [transactions, setTransactions] = useState<PLNTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);

  // ✅ Refs for avoiding stale closures
  const abortControllerRef = useRef<AbortController | null>(null);
  const isInitializedRef = useRef(false);

  // ✅ Memoized filter values to prevent unnecessary re-renders
  const filterString = useMemo(() => JSON.stringify(filters), [filters]);

  // ✅ Build API query parameters
  const buildQueryParams = useCallback(
    (page: number): TransactionQueryParams => {
      const params: TransactionQueryParams = {
        page,
        limit: pageSize,
        search: filters.searchQuery?.trim() || undefined,
        type:
          filters.typeFilter && filters.typeFilter !== 'all'
            ? (filters.typeFilter as any)
            : undefined,
        status:
          filters.statusFilter && filters.statusFilter !== 'all'
            ? (filters.statusFilter as any)
            : undefined,
        sort_by: 'created_at',
        sort_order: 'desc',
      };

      // Handle amount range filtering
      if (filters.amountRangeFilter && filters.amountRangeFilter !== 'all') {
        switch (filters.amountRangeFilter) {
          case 'large':
            // Large amounts (500+ zł) - we'll filter client-side
            break;
          case 'medium':
            // Medium amounts (100-500 zł) - we'll filter client-side
            break;
          case 'small':
            // Small amounts (<100 zł) - we'll filter client-side
            break;
        }
      }

      return params;
    },
    [filters, pageSize],
  );

  /**
   * 🔄 Fetch Transactions Function - API Integration
   */
  const fetchTransactions = useCallback(
    async (
      page: number,
    ): Promise<{
      transactions: PLNTransaction[];
      total: number;
      hasNextPage: boolean;
    }> => {
      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController();

      try {
        // Simulate API delay for realistic behavior
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(resolve, page === 0 ? 500 : 200);

          abortControllerRef.current?.signal.addEventListener('abort', () => {
            clearTimeout(timeout);
            reject(new Error('Request aborted'));
          });
        });

        // Check if request was aborted
        if (abortControllerRef.current?.signal.aborted) {
          throw new Error('Request aborted');
        }

        // Build query parameters
        const queryParams = buildQueryParams(page);

        // Use the enhanced API hook (simulated)
        const result = useGetAllTransactionsQuery(queryParams);

        if (result.isError || result.error) {
          throw new Error('Failed to fetch transactions');
        }

        const apiData = result.data?.data;
        if (!apiData) {
          throw new Error('Invalid API response');
        }

        // Apply amount range filtering client-side
        let filteredTransactions = apiData.transactions;
        if (filters.amountRangeFilter && filters.amountRangeFilter !== 'all') {
          filteredTransactions = apiData.transactions.filter((transaction) => {
            const amount = transaction.amount.amount;
            switch (filters.amountRangeFilter) {
              case 'large':
                return amount >= 500;
              case 'medium':
                return amount >= 100 && amount < 500;
              case 'small':
                return amount < 100;
              default:
                return true;
            }
          });
        }

        return {
          transactions: filteredTransactions,
          total: apiData.total,
          hasNextPage: apiData.hasNextPage || false,
        };
      } catch (error) {
        if (error instanceof Error && error.message === 'Request aborted') {
          throw error; // Re-throw abort errors
        }
        throw new Error('Failed to fetch transactions');
      }
    },
    [buildQueryParams, filters.amountRangeFilter],
  );

  /**
   * 📊 Load Initial Data - API Integration
   */
  const loadInitialData = useCallback(async () => {
    if (!enabled) return;

    setIsLoading(true);
    setError(null);
    setCurrentPage(0);

    try {
      const result = await fetchTransactions(0);

      // Only update if not aborted
      if (!abortControllerRef.current?.signal.aborted) {
        setTransactions(result.transactions);
        setTotal(result.total);
        setCurrentPage(0);
        setHasNextPage(result.hasNextPage);
      }
    } catch (err) {
      if (err instanceof Error && err.message !== 'Request aborted') {
        setError(err);
      }
    } finally {
      if (!abortControllerRef.current?.signal.aborted) {
        setIsLoading(false);
      }
    }
  }, [enabled, fetchTransactions]);

  /**
   * 📄 Load More Data - API Integration
   */
  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasNextPage || isLoading) return;

    setIsLoadingMore(true);
    setError(null);

    try {
      const nextPage = currentPage + 1;
      const result = await fetchTransactions(nextPage);

      // Only update if not aborted
      if (!abortControllerRef.current?.signal.aborted) {
        setTransactions((prev) => {
          const existingIds = new Set(prev.map((t) => t.id));
          const newTransactions = result.transactions.filter(
            (t) => !existingIds.has(t.id),
          );
          return [...prev, ...newTransactions];
        });

        setCurrentPage(nextPage);
        setTotal(result.total);
        setHasNextPage(result.hasNextPage);
      }
    } catch (err) {
      if (err instanceof Error && err.message !== 'Request aborted') {
        setError(err);
      }
    } finally {
      if (!abortControllerRef.current?.signal.aborted) {
        setIsLoadingMore(false);
      }
    }
  }, [isLoadingMore, hasNextPage, isLoading, currentPage, fetchTransactions]);

  /**
   * 🔄 Refresh Data - API Integration
   */
  const refresh = useCallback(() => {
    setTransactions([]);
    setCurrentPage(0);
    setHasNextPage(true);
    loadInitialData();
  }, [loadInitialData]);

  /**
   * 🎯 Effect: Load initial data only once on mount
   */
  useEffect(() => {
    if (!isInitializedRef.current && enabled) {
      isInitializedRef.current = true;
      loadInitialData();
    }
    return undefined; // Explicit return for TypeScript
  }, [enabled]); // Only depend on enabled

  /**
   * 🎯 Effect: Handle filter changes with API reload
   */
  useEffect(() => {
    if (isInitializedRef.current) {
      // Reset state and reload data when filters change
      setTransactions([]);
      setCurrentPage(0);
      setHasNextPage(true);

      // Small delay to batch multiple filter changes
      const timeoutId = setTimeout(() => {
        loadInitialData();
      }, 100);

      return () => clearTimeout(timeoutId);
    }
    return undefined; // Explicit return for all code paths
  }, [filterString]); // Use memoized filter string

  /**
   * 🧹 Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    transactions,
    isLoading,
    isLoadingMore,
    hasNextPage,
    error,
    loadMore,
    refresh,
    total,
  };
};
