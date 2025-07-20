import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Station } from '../types/station.types';
import { mockStations, filterMockStations } from '../data/mockStations';

interface UseInfiniteStationsFilters {
  readonly searchQuery?: string;
  readonly statusFilter?: string;
  readonly connectorTypeFilter?: string;
}

interface UseInfiniteStationsParams {
  readonly filters: UseInfiniteStationsFilters;
  readonly pageSize?: number;
}

interface UseInfiniteStationsReturn {
  readonly stations: ReadonlyArray<Station>;
  readonly isLoading: boolean;
  readonly isLoadingMore: boolean;
  readonly hasNextPage: boolean;
  readonly total: number;
  readonly loadMore: () => void;
  readonly refresh: () => void;
}

export const useInfiniteStations = ({
  filters,
  pageSize = 20,
}: UseInfiniteStationsParams): UseInfiniteStationsReturn => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Filter mock data based on current filters
  const filteredStations = useMemo(() => {
    return filterMockStations(mockStations, filters);
  }, [filters.searchQuery, filters.statusFilter, filters.connectorTypeFilter]);

  // Calculate paginated data
  const paginatedData = useMemo(() => {
    const startIndex = 0;
    const endIndex = currentPage * pageSize;
    const currentStations = filteredStations.slice(startIndex, endIndex);
    const hasMore = endIndex < filteredStations.length;

    return {
      stations: currentStations,
      hasMore,
      total: filteredStations.length,
    };
  }, [filteredStations, currentPage, pageSize]);

  // Reset when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters.searchQuery, filters.statusFilter, filters.connectorTypeFilter]);

  // Simulate initial loading
  useEffect(() => {
    setIsInitialLoading(true);
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 800); // Simulate loading time

    return () => clearTimeout(timer);
  }, [filters.searchQuery, filters.statusFilter, filters.connectorTypeFilter]);

  const loadMore = useCallback(() => {
    if (!paginatedData.hasMore || isLoadingMore || isInitialLoading) return;
    
    setIsLoadingMore(true);
    
    // Simulate loading delay
    setTimeout(() => {
      setCurrentPage(prev => prev + 1);
      setIsLoadingMore(false);
    }, 600);
  }, [paginatedData.hasMore, isLoadingMore, isInitialLoading]);

  const refresh = useCallback(() => {
    setCurrentPage(1);
    setIsInitialLoading(true);
    
    setTimeout(() => {
      setIsInitialLoading(false);
    }, 500);
  }, []);

  return {
    stations: paginatedData.stations,
    isLoading: isInitialLoading,
    isLoadingMore,
    hasNextPage: paginatedData.hasMore,
    total: paginatedData.total,
    loadMore,
    refresh,
  };
}; 