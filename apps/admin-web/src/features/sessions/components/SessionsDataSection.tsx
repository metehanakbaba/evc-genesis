'use client'

import React, { useMemo } from 'react';
import {
  DataGridItem,
  GenericDataGrid,
  GenericDataTable,
  GridSkeleton,
  type GridCardRenderer,
  type TableColumn,
  Button,
  GridActionButton,
  DataStatusBadge
} from '@/shared/ui';
import { EmptyState } from '@/shared/ui/molecules';
import { BoltIcon, PlayIcon, CheckCircleIcon, XCircleIcon, ClockIcon, MapPinIcon, UserIcon, EyeIcon, StopIcon, ArrowPathIcon, ExclamationTriangleIcon, BoltSlashIcon } from '@heroicons/react/24/solid';
import { type LiveChargingSession } from '@/features/sessions/types/session.types';
import { formatSessionDuration, getSessionStatusConfig } from '@evc/shared-business-logic';


interface EnhancedSession extends LiveChargingSession, DataGridItem {}

interface SessionsDataSectionProps {
  sessions: readonly LiveChargingSession[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasNextPage: boolean;
  totalSessions: number;
  viewMode: 'grid' | 'table';
  onLoadMore: () => void;
  onViewDetails: (session: EnhancedSession) => void;
  onStopSession: (session: EnhancedSession) => void;
  onRetrySession: (session: EnhancedSession) => void;
  onForceStopSession: (session: EnhancedSession) => void;
  showStopButton?: boolean;
  showAdminActions?: boolean;
  error?: Error | null;
  onClear?: () => void;
  selectedItems?: Set<string>;
  onSelectItem?: (id: string) => void;
  onSelectAll?: (selected: boolean) => void;
  selectable?: boolean;
}

export const SessionsDataSection: React.FC<SessionsDataSectionProps> = ({
  sessions,
  isLoading,
  isLoadingMore,
  hasNextPage,
  totalSessions,
  viewMode,
  onLoadMore,
  onViewDetails,
  onStopSession,
  onRetrySession,
  onForceStopSession,
  error,
  selectedItems = new Set<string>(),
  onSelectItem,
  onSelectAll,
  selectable = false, 
  onClear,
}) => {
  // Renderer for grid view
  const gridRenderer = useMemo<GridCardRenderer<EnhancedSession>>(
    () => ({
      getStatusConfig: (session) => {
        const statusConfig = getSessionStatusConfig(session.status);
        return {
          bgColor: statusConfig.bgColor,
          borderColor: statusConfig.borderColor,
          badgeColor: statusConfig.badgeColor,
          textColor: statusConfig.textColor,
          pulseColor: statusConfig.pulseColor,
        };
      },

      getAnimationDelay: (index) => `${index * 100}ms`,

      renderHeader: (session) => {
        const statusConfig = getSessionStatusConfig(session.status);
        const StatusIcon = 
          session.status === 'charging' ? BoltIcon :
          session.status === 'starting' ? PlayIcon :
          session.status === 'completed' ? CheckCircleIcon :
          session.status === 'failed' ? XCircleIcon : ClockIcon;

        return (
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl ${statusConfig.badgeColor} flex items-center justify-center`}>
                <StatusIcon className={`w-6 h-6 ${statusConfig.textColor}`} />
              </div>
              <div>
                <div className={`text-sm font-medium ${statusConfig.textColor} mb-1`}>
                  {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                </div>
                <div className="text-white font-semibold text-lg">
                  #{session.id.slice(-6)}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xl font-bold text-white">
                {session.power_output}kW
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {session.connector_type}
              </div>
            </div>
          </div>
        );
      },

      renderContent: (session) => (
        <div className="h-full flex flex-col">
          {/* Session Info */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2 text-gray-300">
              <MapPinIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-sm truncate">{session.station_name}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <UserIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-sm truncate">{session.user_email}</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="text-center p-2 bg-gray-800/30 rounded-lg">
              <div className="text-base font-bold text-white">
                {session.energy_delivered.toFixed(1)}
              </div>
              <div className="text-xs text-gray-400">kWh</div>
            </div>
            <div className="text-center p-2 bg-gray-800/30 rounded-lg">
              <div className="text-base font-bold text-teal-400">
                {session.current_cost.toFixed(2)} zł
              </div>
              <div className="text-xs text-gray-400">Cost</div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <ClockIcon className="w-4 h-4 text-gray-400" />
              <span>
                {formatSessionDuration(session.started_at, session.ended_at)}
              </span>
            </div>
            <DataStatusBadge
              status={{
                variant: session.status === 'completed' ? 'success' : 
                        session.status === 'failed' ? 'danger' : 'warning',
                label: session.status.toUpperCase(),
                size: 'sm',
              }}
            />
          </div>
        </div>
      ),
    }),
    []
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

  const gridActions = useMemo((): GridActionButton[] => [
        {
      icon: EyeIcon,
      label: 'View',
      onClick: (session) => onViewDetails(session as EnhancedSession),
      variant: 'ghost'
    },
    {
      icon: ExclamationTriangleIcon,
      label: 'Force Stop',
      onClick: (session) => onForceStopSession(session as EnhancedSession),
      variant: 'danger',
      className: 'bg-red-900/30 hover:bg-red-900/40'
    }, 
    {
      icon: ArrowPathIcon,
      label: 'Retry',
      onClick: (session) =>  onRetrySession(session as EnhancedSession),
      variant: 'primary',
      show: (session) => session.status === 'failed'
    }, 
    {
      icon: StopIcon,
      label: 'Stop',
      onClick: (session) => onStopSession(session as EnhancedSession),
      variant: 'danger',
      show: (session) => ['charging', 'starting'].includes(session.status)
    },

  ], [onViewDetails, onRetrySession, onForceStopSession, onStopSession])

  const data = sessions as EnhancedSession[];

  if (isLoading) {
    return (
      <GridSkeleton
        itemCount={viewMode === 'table' ? 10 : 6}
        columns={{
          sm: 1,
          md: viewMode === 'table' ? 1 : 2,
          lg: viewMode === 'table' ? 1 : 2,
          xl: viewMode === 'table' ? 1 : 3,
          '2xl': viewMode === 'table' ? 1 : 4,
        }}
      />
    );
  }

  if (error && !isLoading) {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
          <BoltSlashIcon className="w-6 h-6 text-red-400" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">
          Charging Sessions Unavailable
        </h3>
        <p className="text-gray-400 mb-4">
          Failed to load charging sessions: {error.message}
        </p>
        {onClear && (
          <Button
            onClick={onClear}
            className="mx-auto bg-blue-600 hover:bg-blue-700"
          >
            Retry
          </Button>
        )}
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
          actions={gridActions}
          onLoadMore={onLoadMore}
          isLoadingMore={isLoadingMore}
          hasNextPage={hasNextPage}
          total={totalSessions}
          selectable={selectable}
          hoverable={true}
          selectedItems={selectedItems}
          onSelectItem={onSelectItem}
          onSelectAll={onSelectAll}
        />
      ) : (
        <GenericDataGrid
          items={data}
          renderer={gridRenderer}
          actions={gridActions}
          onLoadMore={onLoadMore}
          isLoadingMore={isLoadingMore}
          hasNextPage={hasNextPage}
          total={totalSessions}
          columns={{ sm: 1, md: 2, lg: 3 }}
          gridClassName="gap-4"
          cardClassName="hover:border-blue-400/50 transition-all"
        />
      )}
    </>
  );
};

export default SessionsDataSection;