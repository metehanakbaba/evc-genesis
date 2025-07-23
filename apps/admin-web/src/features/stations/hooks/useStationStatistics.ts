import { useMemo } from 'react';
import { useGetAllStationsQuery } from '../api/stationsApi';
import type { Station } from '../types/station.types';

interface StationStatistics {
  readonly totalStations: {
    readonly count: number;
    readonly formatted: string;
  };
  readonly activeStations: {
    readonly count: number;
    readonly formatted: string;
  };
  readonly offlineStations: {
    readonly count: number;
    readonly formatted: string;
  };
  readonly maintenanceStations: {
    readonly count: number;
    readonly formatted: string;
  };
  readonly totalConnectors: {
    readonly count: number;
    readonly formatted: string;
  };
  readonly availableConnectors: {
    readonly count: number;
    readonly formatted: string;
  };
}

export const useStationStatistics = (): StationStatistics => {
  // Get all stations for statistics calculation
  const { data: apiResponse } = useGetAllStationsQuery({ 
    page: 1, 
    limit: 1000 // Get all stations for accurate statistics
  });

  const statistics = useMemo(() => {
    // Handle actual API response format: data is directly an array
    const rawStations = apiResponse?.data || [];
    const stations: Station[] = Array.isArray(rawStations) 
      ? rawStations 
      : rawStations.stations || [];

    const totalStationsCount = stations.length;
    const activeStationsCount = stations.filter((s: Station) => {
      const status = (s.status as string).toLowerCase();
      return status === 'active' || status === 'available';
    }).length;
    
    const offlineStationsCount = stations.filter((s: Station) => {
      const status = (s.status as string).toLowerCase();
      return status === 'offline';
    }).length;
    
    const maintenanceStationsCount = stations.filter((s: Station) => {
      const status = (s.status as string).toLowerCase();
      return status === 'maintenance';
    }).length;

    // Handle both old (connectors array) and new (single connectorType) data structure
    const allConnectors = stations.flatMap((s: Station) => (s as any).connectors || []);
    const totalConnectorsCount = allConnectors.length || stations.length; // Fallback to station count
    const availableConnectorsCount = allConnectors.length 
      ? allConnectors.filter((c) => c.status === 'available').length
      : activeStationsCount; // Fallback to active stations count

    return {
      totalStations: {
        count: totalStationsCount,
        formatted: totalStationsCount.toLocaleString(),
      },
      activeStations: {
        count: activeStationsCount,
        formatted: activeStationsCount.toLocaleString(),
      },
      offlineStations: {
        count: offlineStationsCount,
        formatted: offlineStationsCount.toLocaleString(),
      },
      maintenanceStations: {
        count: maintenanceStationsCount,
        formatted: maintenanceStationsCount.toLocaleString(),
      },
      totalConnectors: {
        count: totalConnectorsCount,
        formatted: totalConnectorsCount.toLocaleString(),
      },
      availableConnectors: {
        count: availableConnectorsCount,
        formatted: availableConnectorsCount.toLocaleString(),
      },
    };
  }, [apiResponse]);

  return statistics;
};
