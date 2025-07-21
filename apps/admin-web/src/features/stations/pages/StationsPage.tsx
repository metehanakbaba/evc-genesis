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
import { useInfiniteStations, useStationStatistics, useStationActions } from '../hooks';
import { StationStatsSection } from '../components/StationsStatsSection';
import { StationsSearchSection } from '../components/StationsSearchSection';
import { StationsDataSection } from '../components/StationsDataSection';
import StationBulkActions from '../components/StationBulkActions';
import { Station } from '../types/station.types';

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

const statusOptions = [
  { id: 'all', label: 'All Status', icon: FunnelIcon, color: 'gray' },
  { id: 'active', label: 'Operational', icon: CheckCircleIcon, color: 'emerald' },
  { id: 'offline', label: 'Offline', icon: XCircleIcon, color: 'red' },
  { id: 'maintenance', label: 'Maintenance', icon: WrenchScrewdriverIcon, color: 'amber' },
] as const;

const connectorOptions = [
  { id: 'all', label: 'All Standards', icon: BoltIcon, color: 'gray' },
  { id: 'CCS2', label: 'CCS2', icon: BoltIcon, color: 'blue' },
  { id: 'CHAdeMO', label: 'CHAdeMO', icon: BoltIcon, color: 'purple' },
  { id: 'Type2', label: 'Type 2', icon: BoltIcon, color: 'green' },
  { id: 'AC', label: 'AC', icon: BoltIcon, color: 'teal' },
  { id: 'DC', label: 'DC', icon: BoltIcon, color: 'red' },
] as const;


const StationsPage: React.FC = () => {
  const router = useRouter();
  // Search & filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [connectorTypeFilter, setConnectorTypeFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

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
  } = useBulkSelection(stations as Station[])

  // Actions hook
  const {handleToggleStatus, handleDelete, handleEdit, handleViewDetails} = useStationActions();

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
          onViewDetails={handleViewDetails}
          onEdit={handleEdit}
          onClearFilters={handleClearFilters}
        />
      </PageContainer>

      {/* Filter Modal */}
      <GenericFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title=''
        description=''
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

    </MainLayout>
  );
};

export default StationsPage;
