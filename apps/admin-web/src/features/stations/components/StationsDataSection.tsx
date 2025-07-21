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
import XCircleIcon from '@heroicons/react/24/outline';
import { Button } from '@/shared/ui';
import {
  EyeIcon,
  WrenchScrewdriverIcon,
  MapPinIcon,
  SignalIcon,
  BoltIcon,
} from '@heroicons/react/24/outline';
import type { Station } from '../types/station.types';

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
  onViewDetails,
  onEdit,
  onClearFilters,
}) => {
  // Grid renderer
  const gridRenderer = useMemo<GridCardRenderer<EnhancedStation>>(() => ({
    getStatusConfig: (st) => {
      const cfg: Record<string, DataGridStatusConfig> = {
        active: {
          bgColor: 'bg-emerald-500/10',
          borderColor: 'border-emerald-500/25',
          badgeColor: 'bg-emerald-500/10',
          textColor: 'text-emerald-400',
          pulseColor: 'bg-emerald-500',
        },
        offline: {
          bgColor: 'bg-red-500/10',
          borderColor: 'border-red-500/25',
          badgeColor: 'bg-red-500/10',
          textColor: 'text-red-400',
          pulseColor: 'bg-red-500',
        },
        maintenance: {
          bgColor: 'bg-amber-500/10',
          borderColor: 'border-amber-500/25',
          badgeColor: 'bg-amber-500/10',
          textColor: 'text-amber-400',
          pulseColor: 'bg-amber-500',
        },
      };
      return cfg[st.status] ?? cfg.offline;
    },
    getAnimationDelay: (i) => `${i * 100}ms`,
    renderHeader: (st) => {
      const cfg = gridRenderer.getStatusConfig(st);
      return (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`
                w-12 h-12 rounded-xl ${cfg.badgeColor} border ${cfg.borderColor}
                flex items-center justify-center
              `}
            >
              <BoltIcon className={`w-6 h-6 ${cfg.textColor}`} />
            </div>
            <h3 className="text-white font-semibold">{st.name}</h3>
          </div>
          <DataStatusBadge
            status={{
              variant: st.status === 'active' ? 'success' : 'danger',
              label: st.status[0].toUpperCase() + st.status.slice(1),
              pulse: st.status === 'active',
            }}
          />
        </div>
      );
    },
    renderContent: (st) => {
      const available = st.connectors.filter((c) => c.status === 'available').length;
      return (
        <>
          <div className="flex items-center gap-2 mb-2">
            <MapPinIcon className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300 line-clamp-1">
              {st.location.address}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <SignalIcon className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300">
              {available}/{st.connectors.length} available
            </span>
          </div>
        </>
      );
    },
  }), []);

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
        const available = st.connectors.filter((c) => c.status === 'available').length;
        return <span className="text-gray-300">{available}/{st.connectors.length}</span>;
      },
    },
  ], []);

  const enhanced = stations as EnhancedStation[];

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

  // Data views
  return viewMode === 'table' ? (
    <GenericDataTable
      items={enhanced}
      columns={tableColumns}
      actions={gridActions}
      onLoadMore={onLoadMore}
      isLoadingMore={isLoadingMore}
      hasNextPage={hasNextPage}
      total={total}
      selectable={false}
      hoverable
    />
  ) : (
    <GenericDataGrid
      items={enhanced}
      renderer={gridRenderer}
      actions={gridActions}
      onLoadMore={onLoadMore}
      isLoadingMore={isLoadingMore}
      hasNextPage={hasNextPage}
      total={total}
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
    />
  );
};

export default StationsDataSection;