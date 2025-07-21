/**
 * 🔄 Infinite Sessions Hook
 * 
 * Infinite scroll functionality for session lists with smooth animations.
 * Based on the wallet infinite transactions pattern.
 * 
 * @module useInfiniteSessions
 * @version 1.0.0 - Performance Optimized
 * @author EV Charging Team
 */

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import type { LiveChargingSession } from '../types/session.types';
import { generateMockSessions } from '../api/sessionsApi';

interface InfiniteSessionsResult {
  sessions: LiveChargingSession[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasNextPage: boolean;
  error: Error | null;
  loadMore: () => void;
  refresh: () => void;
  total: number;
}

interface UseInfiniteSessionsOptions {
  filters?: {
    searchQuery?: string;
    statusFilter?: string;
    connectorTypeFilter?: string;
    powerOutputFilter?: string;
  };
  pageSize?: number;
  enabled?: boolean;
}

/**
 * 🚀 useInfiniteSessions Hook - Performance Optimized
 * Provides infinite scroll functionality with API-compatible pagination
 */
export const useInfiniteSessions = (
  options: UseInfiniteSessionsOptions = {}
): InfiniteSessionsResult => {
  const {
    filters = {},
    pageSize = 20,
    enabled = true,
  } = options;

  // ✅ State Management
  const [sessions, setSessions] = useState<LiveChargingSession[]>([]);
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
   * 🔄 Fetch Sessions Function - Optimized
   */
  const fetchSessions = useCallback(async (
    page: number,
    currentFilters: typeof filters,
  ): Promise<{ sessions: LiveChargingSession[]; total: number }> => {
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
      const mockData = generateMockSessions(100);
      let filteredData = mockData;
      
      // Apply filters
      if (currentFilters.searchQuery?.trim()) {
        const query = currentFilters.searchQuery.toLowerCase().trim();
        filteredData = filteredData.filter((s: LiveChargingSession) => 
          s.station_name.toLowerCase().includes(query) ||
          s.user_email.toLowerCase().includes(query) ||
          s.id.toLowerCase().includes(query)
        );
      }

      if (currentFilters.statusFilter && currentFilters.statusFilter !== 'all') {
        filteredData = filteredData.filter((s: LiveChargingSession) => s.status === currentFilters.statusFilter);
      }

      if (currentFilters.connectorTypeFilter && currentFilters.connectorTypeFilter !== 'all') {
        filteredData = filteredData.filter((s: LiveChargingSession) => s.connector_type === currentFilters.connectorTypeFilter);
      }

      if (currentFilters.powerOutputFilter && currentFilters.powerOutputFilter !== 'all') {
        if (currentFilters.powerOutputFilter === 'fast') {
          filteredData = filteredData.filter((s: LiveChargingSession) => s.power_output >= 50);
        } else if (currentFilters.powerOutputFilter === 'slow') {
          filteredData = filteredData.filter((s: LiveChargingSession) => s.power_output < 50);
        }
      }

      // Paginate results
      const offset = page * pageSize;
      const paginatedData = filteredData.slice(offset, offset + pageSize);
      
      return {
        sessions: paginatedData,
        total: filteredData.length,
      };
    } catch (error) {
      if (error instanceof Error && error.message === 'Request aborted') {
        throw error; // Re-throw abort errors
      }
      throw new Error('Failed to fetch sessions');
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
      const result = await fetchSessions(0, currentFilters);
      
      // Only update if not aborted
      if (!abortControllerRef.current?.signal.aborted) {
        setSessions(result.sessions);
        setTotal(result.total);
        setCurrentPage(0);
        setHasNextPage(result.sessions.length === pageSize && result.total > pageSize);
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
  }, [enabled, fetchSessions, pageSize]);

  /**
   * 📄 Load More Data - Optimized
   */
  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasNextPage || isLoading) return;

    setIsLoadingMore(true);
    setError(null);

    try {
      const nextPage = currentPage + 1;
      const result = await fetchSessions(nextPage, filters);
      
      // Only update if not aborted
      if (!abortControllerRef.current?.signal.aborted) {
        setSessions(prev => {
          const existingIds = new Set(prev.map(s => s.id));
          const newSessions = result.sessions.filter(s => !existingIds.has(s.id));
          return [...prev, ...newSessions];
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
  }, [isLoadingMore, hasNextPage, isLoading, currentPage, fetchSessions, filters, pageSize]);

  /**
   * 🔄 Refresh Data - Optimized
   */
  const refresh = useCallback(() => {
    setSessions([]);
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
  }, [enabled]);

  /**
   * 🎯 Effect: Handle filter changes with debounce-like behavior
   */
  useEffect(() => {
    if (isInitializedRef.current) {
      // Reset state and reload data when filters change
      setSessions([]);
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
    sessions,
    isLoading,
    isLoadingMore,
    hasNextPage,
    error,
    loadMore,
    refresh,
    total,
  };
}; 