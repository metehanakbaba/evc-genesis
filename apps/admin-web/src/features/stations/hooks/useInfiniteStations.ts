import { useCallback, useEffect, useMemo, useState } from 'react';
import { useGetAllStationsQuery } from '../api/stationsApi';
import { ChargingStation } from '@evc/shared-business-logic';

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
  readonly stations: ReadonlyArray<ChargingStation>;
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
  const [allStations, setAllStations] = useState<ChargingStation[]>([]);

  // Query parameters for API
  const queryParams = useMemo(() => ({
    page: currentPage,
    limit: pageSize,
    ...(filters.searchQuery && { search: filters.searchQuery }),
    ...(filters.statusFilter !== 'all' && { status: filters.statusFilter }),
    ...(filters.connectorTypeFilter !== 'all' && { connectorType: filters.connectorTypeFilter }),
  }), [currentPage, pageSize, filters.searchQuery, filters.statusFilter, filters.connectorTypeFilter]);

  // API query
  const { 
    data: apiResponse, 
    isLoading, 
    isFetching,
    refetch 
  } = useGetAllStationsQuery(queryParams);

  // Update stations when new data arrives
  useEffect(() => {
    console.log('🔍 API Response:', apiResponse);
    console.log('🔍 Current Page:', currentPage);
    
    if (apiResponse?.data) {
      console.log('✅ API Data received:', apiResponse.data);
      
      // Handle actual API response format: data is directly an array
      const rawStationsData = Array.isArray(apiResponse.data) 
        ? apiResponse.data 
        : apiResponse.data.stations || [];
      
      // Transform station data to match expected format
      const stationsData = rawStationsData.map((station: any) => ({
        ...station,
        // Transform location string to object format if needed
        location: typeof station.location === 'string' 
          ? { 
              address: station.location,
              city: station.location.split(',')[0]?.trim() || station.location,
              latitude: null,
              longitude: null
            }
          : station.location || { address: 'Unknown', city: 'Unknown' }
      }));
        
      console.log('📊 Stations count:', stationsData.length);
      console.log('🔧 Transformed stations:', stationsData);
      
      if (currentPage === 1) {
        // Reset stations for new search/filter
        setAllStations(stationsData);
        console.log('🔄 Reset stations for page 1');
      } else {
        // Append new page data
        setAllStations(prev => {
          const newStations = [...prev, ...stationsData];
          console.log('➕ Appended stations, total count:', newStations.length);
          return newStations;
        });
      }
    } else {
      console.log('❌ No API data received');
    }
  }, [apiResponse, currentPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
    setAllStations([]);
  }, [filters.searchQuery, filters.statusFilter, filters.connectorTypeFilter]);

  // Calculate pagination info
  const paginationInfo = useMemo(() => {
    if (!apiResponse?.data) return { hasNextPage: false, total: 0 };
    
    // Handle actual API response format
    const rawStationsData = Array.isArray(apiResponse.data) 
      ? apiResponse.data 
      : apiResponse.data.stations || [];
    
    const stationsData = rawStationsData.map((station: any) => ({
      ...station,
      location: typeof station.location === 'string' 
        ? { 
            address: station.location,
            city: station.location.split(',')[0]?.trim() || station.location,
            latitude: null,
            longitude: null
          }
        : station.location || { address: 'Unknown', city: 'Unknown' }
    }));
    
    // If we have a specific pagination object, use it
    const pagination = apiResponse.data?.pagination;
    if (pagination) {
      return {
        hasNextPage: pagination.page < pagination.pages,
        total: pagination.total,
      };
    }
    
    // Otherwise, assume single page for now (since API doesn't provide pagination)
    return {
      hasNextPage: false,
      total: stationsData.length,
    };
  }, [apiResponse]);

  const loadMore = useCallback(() => {
    if (!paginationInfo.hasNextPage || isFetching) return;
    setCurrentPage(prev => prev + 1);
  }, [paginationInfo.hasNextPage, isFetching]);

  const refresh = useCallback(() => {
    setCurrentPage(1);
    setAllStations([]);
    refetch();
  }, [refetch]);

  const returnData = {
    stations: allStations,
    isLoading: isLoading && currentPage === 1, // Only show loading for initial load
    isLoadingMore: isFetching && currentPage > 1, // Show loading more for subsequent pages
    hasNextPage: paginationInfo.hasNextPage,
    total: paginationInfo.total,
    loadMore,
    refresh,
  };

  console.log('🚀 useInfiniteStations returning:', {
    stationsCount: allStations.length,
    isLoading: returnData.isLoading,
    isLoadingMore: returnData.isLoadingMore,
    total: returnData.total,
    hasNextPage: returnData.hasNextPage,
  });

  return returnData;
};
