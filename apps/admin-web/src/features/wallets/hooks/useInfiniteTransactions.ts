/**
 * 🔄 Infinite Transactions Hook
 * 
 * Infinite scroll functionality for transaction lists with smooth animations.
 * Compatible with wallet API schema and pagination structure.
 * 
 * @module useInfiniteTransactions
 * @version 2.0.0 - Performance Optimized
 * @author EV Charging Team
 */

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import type { PLNTransaction } from '../types/wallet.types';
import { generateMockTransactions } from '../api/walletApi';

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
  };
  pageSize?: number;
  enabled?: boolean;
}

/**
 * 🚀 useInfiniteTransactions Hook - Performance Optimized
 * Provides infinite scroll functionality with API-compatible pagination
 */
export const useInfiniteTransactions = (
  options: UseInfiniteTransactionsOptions = {}
): InfiniteTransactionsResult => {
  const {
    filters = {},
    pageSize = 20,
    enabled = true,
  } = options;

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
  const filterString = useMemo(() => 
    JSON.stringify(filters), [filters]
  );

  /**
   * 🔄 Fetch Transactions Function - Optimized
   */
  const fetchTransactions = useCallback(async (
    page: number,
    currentFilters: typeof filters,
  ): Promise<{ transactions: PLNTransaction[]; total: number }> => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    try {
      // Simulate API delay
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(resolve, page === 0 ? 800 : 300);
        
        abortControllerRef.current?.signal.addEventListener('abort', () => {
          clearTimeout(timeout);
          reject(new Error('Request aborted'));
        });
      });

      // Generate stable mock data
      const mockData = generateMockTransactions(100);
      let filteredData = mockData;
      
      // Apply filters
      if (currentFilters.searchQuery?.trim()) {
        const query = currentFilters.searchQuery.toLowerCase().trim();
        filteredData = filteredData.filter(t => 
          t.description.toLowerCase().includes(query) ||
          t.id.toLowerCase().includes(query)
        );
      }

      if (currentFilters.typeFilter && currentFilters.typeFilter !== 'all') {
        filteredData = filteredData.filter(t => t.type === currentFilters.typeFilter);
      }

      if (currentFilters.statusFilter && currentFilters.statusFilter !== 'all') {
        filteredData = filteredData.filter(t => t.status === currentFilters.statusFilter);
      }

      // Paginate results
      const offset = page * pageSize;
      const paginatedData = filteredData.slice(offset, offset + pageSize);
      
      return {
        transactions: paginatedData,
        total: filteredData.length,
      };
    } catch (error) {
      if (error instanceof Error && error.message === 'Request aborted') {
        throw error; // Re-throw abort errors
      }
      throw new Error('Failed to fetch transactions');
    }
  }, [pageSize]);

  /**
   * 📊 Load Initial Data - Optimized
   */
  const loadInitialData = useCallback(async (currentFilters: typeof filters) => {
    if (!enabled) return;

    setIsLoading(true);
    setError(null);
    setCurrentPage(0);
    
    try {
      const result = await fetchTransactions(0, currentFilters);
      
      // Only update if not aborted
      if (!abortControllerRef.current?.signal.aborted) {
        setTransactions(result.transactions);
        setTotal(result.total);
        setCurrentPage(0);
        setHasNextPage(result.transactions.length === pageSize && result.total > pageSize);
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
  }, [enabled, fetchTransactions, pageSize]);

  /**
   * 📄 Load More Data - Optimized
   */
  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasNextPage || isLoading) return;

    setIsLoadingMore(true);
    setError(null);

    try {
      const nextPage = currentPage + 1;
      const result = await fetchTransactions(nextPage, filters);
      
      // Only update if not aborted
      if (!abortControllerRef.current?.signal.aborted) {
        setTransactions(prev => {
          const existingIds = new Set(prev.map(t => t.id));
          const newTransactions = result.transactions.filter(t => !existingIds.has(t.id));
          return [...prev, ...newTransactions];
        });
        
        setCurrentPage(nextPage);
        setTotal(result.total);
        
        // Calculate if more pages exist
        setHasNextPage((nextPage + 1) * pageSize < result.total);
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
  }, [isLoadingMore, hasNextPage, isLoading, currentPage, fetchTransactions, filters, pageSize]);

  /**
   * 🔄 Refresh Data - Optimized
   */
  const refresh = useCallback(() => {
    setTransactions([]);
    setCurrentPage(0);
    setHasNextPage(true);
    loadInitialData(filters);
  }, [loadInitialData, filters]);

  /**
   * 🎯 Effect: Load initial data only once on mount
   */
  useEffect(() => {
    if (!isInitializedRef.current && enabled) {
      isInitializedRef.current = true;
      loadInitialData(filters);
    }
    return undefined; // Explicit return for TypeScript
  }, [enabled]); // Only depend on enabled

  /**
   * 🎯 Effect: Handle filter changes with debounce-like behavior
   */
  useEffect(() => {
    if (isInitializedRef.current) {
      // Reset state and reload data when filters change
      setTransactions([]);
      setCurrentPage(0);
      setHasNextPage(true);
      
      // Small delay to batch multiple filter changes
      const timeoutId = setTimeout(() => {
        loadInitialData(filters);
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