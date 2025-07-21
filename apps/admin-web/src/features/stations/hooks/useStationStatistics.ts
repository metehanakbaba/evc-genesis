import { useMemo } from 'react';
import { mockStations } from '../data/mockStations';
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
  const statistics = useMemo(() => {
    const stations: Station[] = mockStations;

    const totalStationsCount = stations.length;
    const activeStationsCount = stations.filter(
      (s: Station) => s.status === 'active',
    ).length;
    const offlineStationsCount = stations.filter(
      (s: Station) => s.status === 'offline',
    ).length;
    const maintenanceStationsCount = stations.filter(
      (s: Station) => s.status === 'maintenance',
    ).length;

    const allConnectors = stations.flatMap((s: Station) => s.connectors);
    const totalConnectorsCount = allConnectors.length;
    const availableConnectorsCount = allConnectors.filter(
      (c) => c.status === 'available',
    ).length;

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
  }, []); // Empty dependency array since we're using static mock data

  return statistics;
};
