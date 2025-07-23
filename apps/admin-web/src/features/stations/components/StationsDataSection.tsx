'use client'

import React, { useMemo } from 'react';
import {
  GenericDataGrid,
  GenericDataTable,
  GridSkeleton,
  DataStatusBadge,
  type DataGridItem,
  type DataGridStatusConfig,
  type GridActionButton,
  type GridCardRenderer,
  type TableColumn,
} from '@/shared/ui';
import { EmptyState } from '@/shared/ui/molecules';
import {
  EyeIcon,
  WrenchScrewdriverIcon,
  MapPinIcon,
  SignalIcon,
  BoltIcon,
} from '@heroicons/react/24/outline';
import type { Station, Connector } from '../types/station.types';

interface EnhancedStation extends Station, DataGridItem {}

interface StationsDataSectionProps {
  stations: readonly Station[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasNextPage: boolean;
  total: number;
  viewMode: 'grid' | 'table';
  onLoadMore: () => void;
  onRefresh: () => void;
  onViewDetails: (stationId: string) => void;
  onEdit: (station: Station) => void;
  onClearFilters: () => void;
  selectedItems: Set<string>;
  onSelectItem: (id: string) => void;
  onSelectAll: () => void;
}

export const StationsDataSection: React.FC<StationsDataSectionProps> = ({
  stations,
  isLoading,
  isLoadingMore,
  hasNextPage,
  total,
  viewMode,
  onLoadMore,
  onRefresh,
  selectedItems,
  onSelectItem,
  onSelectAll,
  onViewDetails,
  onEdit,
  onClearFilters,
}) => {
  // ✅ Helper function to get station status config
  const getStationStatusConfig = (station: EnhancedStation): DataGridStatusConfig => {
    const statusConfigs = {
      active: {
        bgColor: 'from-emerald-500/15 via-emerald-400/8 to-transparent',
        borderColor: 'border-emerald-400/30 hover:border-emerald-300/50',
        badgeColor: 'bg-emerald-500/10',
        textColor: 'text-emerald-400',
        pulseColor: 'bg-emerald-500',
      },
      offline: {
        bgColor: 'from-red-500/15 via-red-400/8 to-transparent',
        borderColor: 'border-red-400/30 hover:border-red-300/50',
        badgeColor: 'bg-red-500/10',
        textColor: 'text-red-400',
        pulseColor: 'bg-red-500',
      },
      maintenance: {
        bgColor: 'from-amber-500/15 via-amber-400/8 to-transparent',
        borderColor: 'border-amber-400/30 hover:border-amber-300/50',
        badgeColor: 'bg-amber-500/10',
        textColor: 'text-amber-400',
        pulseColor: 'bg-amber-500',
      },
    };
    return statusConfigs[station.status] || statusConfigs.offline;
  };

  // ✅ CREATE GRID RENDERER for GenericDataGrid
  const gridRenderer = useMemo(
    (): GridCardRenderer<EnhancedStation> => ({
      getStatusConfig: (station: EnhancedStation): DataGridStatusConfig => {
        return getStationStatusConfig(station);
      },

      getAnimationDelay: (index: number): string => `${index * 100}ms`,

      renderHeader: (station: EnhancedStation): React.ReactNode => {
        const statusConfig = getStationStatusConfig(station);

        return (
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-xl ${statusConfig.badgeColor} flex items-center justify-center`}
              >
                <BoltIcon className={`w-6 h-6 ${statusConfig.textColor}`} />
              </div>
              <div>
                <div
                  className={`text-sm font-medium ${statusConfig.textColor} mb-1`}
                >
                  Charging Station
                </div>
                <div className="text-white font-semibold text-lg">
                  {station.name}
                </div>
              </div>
            </div>

            {/* ✅ Use shared StatusBadge */}
            <DataStatusBadge
              status={{
                variant: station.status === 'active' ? 'success' : 
                         station.status === 'maintenance' ? 'warning' : 'danger',
                label: station.status.charAt(0).toUpperCase() + station.status.slice(1),
                pulse: station.status === 'active',
              }}
            />
          </div>
        );
      },

      renderContent: (station: EnhancedStation): React.ReactNode => {
        // Handle both old (connectors array) and new (single connectorType) data structure
        const connectors = (station as any).connectors || [];
        const available = Array.isArray(connectors) ? 
          connectors.filter((c) => c && typeof c === 'object' && (c as any).status === 'available').length : 0;
        const total = connectors.length || 1; // Fallback to 1 for single connector stations
        
        // Support both new (latitude/longitude) and legacy (lat/lng) location formats
        const locationData = station.location as any;
        const displayLocation = locationData.address || 
          `${locationData.latitude || locationData.lat}, ${locationData.longitude || locationData.lng}`;
        
        return (
        <div className="h-full flex flex-1 flex-col">
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2 text-gray-300">
              <MapPinIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-sm truncate">{displayLocation}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <SignalIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-sm">
                {station.connectorType ? 
                  `${station.connectorType} • ${station.powerOutput}kW` : 
                  `${available}/${total} connectors available`
                }
              </span>
            </div>
          </div>

          <div className="mt-auto pb-2">
            <div className="flex items-center justify-between text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <BoltIcon className="w-4 h-4 flex-shrink-0" />
                <span>{station.pricePerKWh ? `${station.pricePerKWh} PLN/kWh` : `ID: ${station.id.slice(-11)}`}</span>
              </div>
              <div className="text-gray-300">
                {locationData.city || locationData.address}
              </div>
            </div>
          </div>
        </div>
        )
      }
    }),
    [],
  );

  // Grid action buttons
  const gridActions = useMemo<GridActionButton[]>(() => [
    {
      icon: EyeIcon,
      label: 'View',
      onClick: (item) => onViewDetails(item.id),
      variant: 'ghost',
    },
    {
      icon: WrenchScrewdriverIcon,
      label: 'Edit',
      onClick: (item) => onEdit(item as Station),
      variant: 'primary',
    },
  ], [onViewDetails, onEdit]);

  // Table columns
  const tableColumns = useMemo<TableColumn<EnhancedStation>[]>(() => [
    {
      id: 'name',
      label: 'Station',
      accessor: 'name',
      sticky: true,
      render: (st) => <span className="text-white font-medium">{st.name}</span>,
    },
    {
      id: 'location',
      label: 'Location',
      accessor: 'location',
      render: (st) => <span className="text-gray-300">{st.location.address}</span>,
    },
    {
      id: 'status',
      label: 'Status',
      accessor: 'status',
      render: (st) => (
        <DataStatusBadge
          status={{
            variant: st.status === 'active' ? 'success' : 'danger',
            label: st.status[0].toUpperCase() + st.status.slice(1),
          }}
        />
      ),
    },
    {
      id: 'connectors',
      label: 'Available',
      accessor: 'connectors',
      render: (st) => {
        // Handle both old (connectors array) and new (single connectorType) data structure
        const connectors = (st as any).connectors || [];
        const available = Array.isArray(connectors) ? 
          connectors.filter((c: any) => c && c.status === 'available').length : 0;
        const total = connectors.length || 1;
        
        return (
          <span className="text-gray-300">
            {(st as any).connectorType ? 
              `${(st as any).connectorType} • ${(st as any).powerOutput}kW` : 
              `${available}/${total}`
            }
          </span>
        );
      },
    },
  ], []);

  const enhanced = (stations || []) as EnhancedStation[];

  // Loading state
  if (isLoading) {
    return <GridSkeleton itemCount={viewMode === 'table' ? 10 : 6} />;
  }

  // Empty state
  if (enhanced.length === 0) {
    return (
      <EmptyState
        icon={BoltIcon}
        title="No Stations Found"
        description="Try resetting filters or changing your search."
        actionLabel="Clear Filters"
        onAction={onClearFilters}
        variant="blue"
      />
    );
  }

  return (
    <>
      {viewMode === 'table' && (
        <GenericDataTable
            items={enhanced}
            columns={tableColumns}
            actions={gridActions}
            onLoadMore={onLoadMore}
            isLoadingMore={isLoadingMore}
            hasNextPage={hasNextPage}
            selectable={true}
            hoverable={true}
            selectedItems={selectedItems}
            onSelectItem={onSelectItem}
            onSelectAll={onSelectAll}
        />
      )}

      {viewMode === 'grid' && (
        <GenericDataGrid
          items={enhanced}
          renderer={gridRenderer}
          actions={gridActions}
          onLoadMore={onLoadMore}
          isLoadingMore={isLoadingMore}
          hasNextPage={hasNextPage}
          total={total}
          columns={{
            sm: 1,
            md: 2,
            lg: 3, 
            xl: 3,
            '2xl': 3
          }}
          gridClassName="gap-4 lg:gap-6"
          cardClassName="min-h-[280px]"
        />
      )}
    </>
  );
};

export default StationsDataSection;