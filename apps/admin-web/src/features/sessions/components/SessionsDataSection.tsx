'use client'

import React, { useMemo } from 'react';
import {
  DataGridItem,
  GenericDataGrid,
  GenericDataTable,
  GridSkeleton,
  type GridCardRenderer,
  type TableColumn,
} from '@/shared/ui';
import { EmptyState } from '@/shared/ui/molecules';
import { BoltIcon, PlayIcon, CheckCircleIcon, XCircleIcon, ClockIcon, MapPinIcon, UserIcon } from '@heroicons/react/24/solid';
import { type LiveChargingSession } from '../types/session.types';
import { formatSessionDuration, getSessionStatusConfig } from '@evc/shared-business-logic';

interface EnhancedSession extends LiveChargingSession, DataGridItem {}

interface SessionsDataSectionProps {
  sessions: LiveChargingSession[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasNextPage: boolean;
  total: number;
  viewMode: 'grid' | 'table';
  onLoadMore: () => void;
  onViewDetails: (session: LiveChargingSession) => void;
  onStopSession: (session: LiveChargingSession) => void;
  showStopButton?: boolean;
  error?: Error | null;
  onClear?: () => void;
}

export const SessionsDataSection: React.FC<SessionsDataSectionProps> = ({
  sessions,
  isLoading,
  isLoadingMore,
  hasNextPage,
  total,
  viewMode,
  onLoadMore,
  onViewDetails,
  onStopSession,
  showStopButton = true,
  error,
  onClear,
}) => {
  // Renderer for grid view
  const gridRenderer = useMemo<GridCardRenderer<EnhancedSession>>(
    () => ({
      getStatusConfig: (s) => getSessionStatusConfig(s.status),
      getAnimationDelay: (i) => `${i * 100}ms`,
      renderHeader: (s) => {
        const cfg = getSessionStatusConfig(s.status);
        const Icon =
          s.status === 'charging'
            ? BoltIcon
            : s.status === 'starting'
            ? PlayIcon
            : s.status === 'completed'
            ? CheckCircleIcon
            : s.status === 'failed'
            ? XCircleIcon
            : ClockIcon;
        return (
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-lg ${cfg.badgeColor} border flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${cfg.textColor}`} />
              </div>
              <div>
                <div className={`text-xs font-medium ${cfg.textColor}`}>{s.status.toUpperCase()}</div>
                <div className="text-white font-semibold truncate">#{s.id.slice(-6)}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-white">{s.power_output}kW</div>
              <div className="text-xs text-gray-400">{s.connector_type}</div>
            </div>
          </div>
        );
      },
      renderContent: (s) => (
        <>
          <div className="space-y-2 mb-3">
            <div className="flex items-center gap-2 text-gray-300">
              <MapPinIcon className="w-4 h-4" />
              <span className="text-sm truncate">{s.station_name}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <UserIcon className="w-4 h-4" />
              <span className="text-sm truncate">{s.user_email}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="text-center p-2 bg-gray-800/30 rounded-lg">
              <div className="text-base font-bold text-white">{s.energy_delivered.toFixed(1)}</div>
              <div className="text-xs text-gray-400">kWh</div>
            </div>
            <div className="text-center p-2 bg-gray-800/30 rounded-lg">
              <div className="text-base font-bold text-teal-400">{s.current_cost.toFixed(2)} zł</div>
              <div className="text-xs text-gray-400">Cost</div>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>
              <ClockIcon className="w-4 h-4 inline-block" />{' '}
              {formatSessionDuration(s.started_at, s.ended_at)}
            </span>
          </div>
        </>
      ),
      renderFooter: (s) => (
        <div className="flex gap-2 mt-auto pt-2">
          <button onClick={() => onViewDetails(s)} className="btn-ghost btn-sm">View</button>
          {showStopButton && (s.status === 'charging' || s.status === 'starting') && (
            <button onClick={() => onStopSession(s)} className="btn-danger btn-sm">Stop</button>
          )}
        </div>
      ),
    }),
    [onViewDetails, onStopSession, showStopButton]
  );

  // Table columns
  const tableColumns = useMemo<TableColumn<EnhancedSession>[]>(
    () => [
      {
        id: 'session',
        label: 'Session',
        accessor: 'id',
        sticky: true,
        render: (s) => {
          const cfg = getSessionStatusConfig(s.status);
          const Icon =
            s.status === 'charging'
              ? BoltIcon
              : s.status === 'starting'
              ? PlayIcon
              : s.status === 'completed'
              ? CheckCircleIcon
              : s.status === 'failed'
              ? XCircleIcon
              : ClockIcon;
          return (
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg ${cfg.badgeColor} flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${cfg.textColor}`} />
              </div>
              <div>
                <div className="text-white font-semibold">#{s.id.slice(-6)}</div>
                <div className="text-xs text-gray-400">{s.status}</div>
              </div>
            </div>
          );
        },
      },
      {
        id: 'station',
        label: 'Station',
        accessor: 'station_name',
      },
      {
        id: 'power',
        label: 'Power',
        accessor: 'power_output',
        render: (s) => <span className="font-semibold">{s.power_output} kW</span>,
      },
      {
        id: 'cost',
        label: 'Cost',
        accessor: 'current_cost',
        render: (s) => <span>{s.current_cost.toFixed(2)} zł</span>,
      },
    ],
    []
  );

  const data = sessions as EnhancedSession[];

  if (isLoading) {
    return <GridSkeleton itemCount={viewMode === 'table' ? 10 : 6} columns={{ sm: 1, md: viewMode === 'table' ? 1 : 2, lg: viewMode === 'table' ? 1 : 2, xl: viewMode === 'table' ? 1 : 3, '2xl': viewMode === 'table' ? 1 : 4 }} />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">Error loading sessions: {error.message}</p>
        {onClear && <button onClick={onClear} className="btn-primary">Retry</button>}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <EmptyState
        icon={BoltIcon}
        title="No sessions found"
        description="Try different filters or search"
        actionLabel={onClear ? 'Clear Filters' : undefined}
        onAction={onClear}
        variant="emerald"
      />
    );
  }

  return (
    <>
      {viewMode === 'table' ? (
        <GenericDataTable
          items={data}
          columns={tableColumns}
          actions={[]}
          onLoadMore={onLoadMore}
          isLoadingMore={isLoadingMore}
          hasNextPage={hasNextPage}
          total={total}
          selectable={false}
        />
      ) : (
        <GenericDataGrid
          items={data}
          renderer={gridRenderer}
          actions={[]}
          onLoadMore={onLoadMore}
          isLoadingMore={isLoadingMore}
          hasNextPage={hasNextPage}
          total={total}
          columns={{ sm: 1, md: 2, lg: 2, xl: 3, '2xl': 4 }}
        />
      )}
    </>
  );
};

export default SessionsDataSection;