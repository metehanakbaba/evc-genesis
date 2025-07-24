'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  BoltIcon,
  CheckCircleIcon,
  SignalIcon,
  WrenchScrewdriverIcon,
  PlusIcon,
  XCircleIcon,
  FunnelIcon,
} from '@heroicons/react/24/solid';
import { IconComponent } from '@/components/ui/Layout';
import { 
  MainLayout, 
  Breadcrumb, 
  PageHeader, 
  useBulkSelection, 
  GenericFilterModal, 
  QuickFilterButtons,
  GenericFilterGroup,
  QuickFilterGroup
} from '@/shared/ui';
import { PageContainer } from '@/shared/ui/components/Layout';
import { useSearchDebounce } from '@/shared/ui';
import { useInfiniteStations, useStationStatistics, useStationActions } from '@/features/stations/hooks';
import { StationsSearchSection, StationStatsSection, StationsDataSection, EditStationModal } from '@/features/stations/components/index';
import StationBulkActions from '@/features/stations/components/StationBulkActions';
import { ChargingStation, ConnectorType, StationStatus } from '@evc/shared-business-logic';

/**
 * ⚡ Station Management Statistics
 */
interface StationStats {
  readonly title: string;
  readonly value: string;
  readonly icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  readonly variant: 'blue' | 'emerald' | 'amber' | 'red';
  readonly trend: string;
  readonly description: string;
  readonly isLive?: boolean;
}

interface StatusOption {
  id: StationStatus | 'all',
  label: string;
  icon: IconComponent;
  color: 'blue' | 'emerald' | 'amber' | 'red' | 'gray'
}

interface ConnectorOption {
  id: ConnectorType | 'all';
  label: string;
  icon: IconComponent;
  color: 'teal' | 'blue' | 'emerald' | 'purple' | 'red' | 'gray'
}

const statusOptions: StatusOption[] = [
  { id: 'all', label: 'All Status', icon: FunnelIcon, color: 'gray' },
  { id: 'AVAILABLE', label: 'Operational', icon: CheckCircleIcon, color: 'emerald' },
  { id: 'OFFLINE', label: 'Offline', icon: XCircleIcon, color: 'red' },
  { id: 'MAINTENANCE', label: 'Maintenance', icon: WrenchScrewdriverIcon, color: 'amber' },
  { id: 'CHARGING', label: 'Charging', icon: BoltIcon, color: 'blue'}
] as const;

const connectorOptions: ConnectorOption[] = [
  { id: 'all', label: 'All Standards', icon: BoltIcon, color: 'gray' },
  { id: 'CCS', label: 'CCS2', icon: BoltIcon, color: 'blue' },
  { id: 'CHAdeMO', label: 'CHAdeMO', icon: BoltIcon, color: 'purple' },
  { id: 'Type2', label: 'Type 2', icon: BoltIcon, color: 'emerald' },
  { id: 'CCS_CHAdeMO', label: 'AC', icon: BoltIcon, color: 'teal' },
] as const;

const StationsPage: React.FC = () => {
  const router = useRouter();
  // Search & filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [connectorTypeFilter, setConnectorTypeFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [editingStation, setEditingStation] = useState<ChargingStation | null>(null)

  // Debounced search
  const debouncedSearch = useSearchDebounce(searchQuery, 300);

  // Data hooks
  const {
    stations,
    isLoading,
    isLoadingMore,
    hasNextPage,
    loadMore,
    total,
    refresh,
  } = useInfiniteStations({
    filters: {
      searchQuery: debouncedSearch,
      statusFilter,
      connectorTypeFilter,
    },
    pageSize: 20,
  });

  // Statistics hook
  const {
    totalStations,
    activeStations,
    maintenanceStations,
    totalConnectors,
    availableConnectors,
  } = useStationStatistics();

  const {    
    selectedIds,
    selectedCount,
    clearSelection,
    toggleItem,
    toggleAll
  } = useBulkSelection(stations)

  // Actions hook
  const {handleToggleStatus, handleDelete} = useStationActions();

  // Revolutionary floating stats with station data
  const stationStats: StationStats[] = [
    {
      title: 'Infrastructure Assets',
      value: totalStations.formatted,
      icon: BoltIcon,
      variant: 'blue',
      trend: '+3 this week',
      description:
        'Total charging infrastructure deployment across operational territories',
      isLive: true,
    },
    {
      title: 'Operational Status',
      value: activeStations.formatted,
      icon: CheckCircleIcon,
      variant: 'emerald',
      trend: `${Math.round((activeStations.count / totalStations.count) * 100) || 0}% operational`,
      description:
        'Infrastructure assets currently operational and service-ready',
    },
    {
      title: 'Service Availability',
      value: availableConnectors.formatted,
      icon: SignalIcon,
      variant: 'blue',
      trend: `${Math.round((availableConnectors.count / totalConnectors.count) * 100) || 0}% available`,
      description:
        'Charging points available for immediate customer service delivery',
      isLive: true,
    },
    {
      title: 'Service Interruptions',
      value: maintenanceStations.formatted,
      icon: WrenchScrewdriverIcon,
      variant: 'amber',
      trend: 'Planned maintenance',
      description:
        'Infrastructure assets currently undergoing scheduled maintenance protocols',
    },
  ];

  // Clear filters
  const handleClearFilters = () => {
    setStatusFilter('all');
    setConnectorTypeFilter('all');
    setSearchQuery('');
  };

  // !!! not to forget 
  const filterGroups = useMemo(
    (): GenericFilterGroup[] => [
    {
      id: 'status',
      title: 'Operational Status',
      options: statusOptions.map(({ id, label, icon, color }) => ({
        id, label, icon: icon as IconComponent, color,
      })),
      selectedValue: statusFilter,
      onChange: setStatusFilter,
    },
    {
      id: 'connectorType',
      title: 'Connector Standard',
      options: connectorOptions.map(({ id, label, icon, color }) => ({
        id, label, icon: icon as IconComponent, color,
      })),
      selectedValue: connectorTypeFilter,
      onChange: setConnectorTypeFilter,
    },
  ], 
  
    [statusFilter, connectorTypeFilter]
  );

  const quickFilterGroups = useMemo<QuickFilterGroup[]>(
    () => [
      {
        id: 'status',
        title: 'Status',
        icon: FunnelIcon,
        selectedValue: statusFilter,
        onChange: setStatusFilter,
        options: statusOptions.map(({ id, label, icon, color }) => ({
          id, label, icon: icon as IconComponent, color,
        })),
      },
      {
        id: 'connectorType',
        title: 'Connector',
        icon: BoltIcon,
        selectedValue: connectorTypeFilter,
        onChange: setConnectorTypeFilter,
        options: connectorOptions.map(({ id, label, icon, color }) => ({
          id, label, icon: icon as IconComponent, color,
        })),
      },
    ],
    [statusFilter, connectorTypeFilter]
  );

  const handleOpenEditModal = (station: ChargingStation) => {
    setEditingStation(station);
  };

  const handleCloseEditModal = () => {
    setEditingStation(null);
  };

  return (
    <MainLayout showNotifications notificationCount={3} headerVariant="default">
      {/* Header */}
      <PageContainer paddingY="md">
        <Breadcrumb currentPageLabel="Charging Infrastructure" variant="blue" />
        <PageHeader
          title="Infrastructure Operations Center"
          description="Enterprise‑grade charging network monitoring & management"
          variant="blue"
          actionButton={{
            label: 'Deploy Infrastructure',
            onClick: () => router.push('/stations/new'),
            icon: PlusIcon,
            iconAnimation: 'rotate-90',
          }}
        />
      </PageContainer>

      <PageContainer paddingY="lg" className="space-y-10">
        {/* Stats Section */}
        <StationStatsSection stats={stationStats} />

        {/* Search & Filters */}
        <StationsSearchSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onOpenFilterModal={() => setIsFilterModalOpen(true)}
          isFilterActive={statusFilter !== 'all' || connectorTypeFilter !== 'all'}
        />

        <QuickFilterButtons
          filterGroups={quickFilterGroups}
          variant="purple"
        />

        {/* Data Section */}
        <StationsDataSection
          stations={stations}
          isLoading={isLoading}
          isLoadingMore={isLoadingMore}
          hasNextPage={hasNextPage}
          total={total}
          viewMode={viewMode}
          onRefresh={refresh}
          onLoadMore={loadMore}
          onDelete={handleDelete}
          onEdit={handleOpenEditModal}
          onClearFilters={handleClearFilters}
          selectedItems={new Set(selectedIds)}
          onSelectItem={toggleItem}
          onSelectAll={() => toggleAll(true)}
        />
      </PageContainer>

      {/* Filter Modal */}
      <GenericFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title='Stations Filters'
        description='Filter stations by status, connector'
        filterGroups={filterGroups}
        onClearFilters={handleClearFilters}
      />

      <StationBulkActions 
          selectedCount={selectedCount}
          totalCount={totalStations.count}
          selectedIds={selectedIds}
          onClearSelection={clearSelection}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
      />

      {editingStation && (
        <EditStationModal
          station={editingStation}
          isOpen={!!editingStation}
          onClose={handleCloseEditModal}
          queryParams={{
            status: statusFilter !== 'all' ? statusFilter : undefined,
            connectorType: connectorTypeFilter !== 'all' ? connectorTypeFilter : undefined,
            search: debouncedSearch,
          }}
        />
      )}

    </MainLayout>
  );
};

export default StationsPage;
