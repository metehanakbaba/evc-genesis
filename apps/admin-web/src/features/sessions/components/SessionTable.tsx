'use client';

import {
  ArrowPathIcon,
  BoltIcon,
  CheckCircleIcon,
  ClockIcon,
  EyeIcon,
  MapPinIcon,
  PlayIcon,
  StopIcon,
  UserIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@ui/forms';
import type React from 'react';
import type { LiveChargingSession } from '../types/session.types';
// ✅ Import shared business logic
import { getSessionStatusConfig, formatSessionDuration } from '@evc/shared-business-logic';
// ✅ Import infinite scroll hooks from users feature (reusing existing)
import { useInfiniteScrollTrigger } from '../../users/hooks/useIntersectionObserver';

// Type for icon components
type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

/**
 * 🎯 Session Table Props
 */
export interface SessionTableProps {
  readonly sessions: LiveChargingSession[];
  readonly onViewDetails?: (session: LiveChargingSession) => void;
  readonly onStopSession?: (session: LiveChargingSession) => void;
  readonly showStopButton?: boolean;
  readonly className?: string;
  readonly columns?: {
    session?: boolean;
    status?: boolean;
    station?: boolean;
    user?: boolean;
    power?: boolean;
    energy?: boolean;
    cost?: boolean;
    duration?: boolean;
    actions?: boolean;
  };
  // ✅ Infinite scroll props
  readonly onLoadMore?: () => void;
  readonly isLoadingMore?: boolean;
  readonly hasNextPage?: boolean;
  readonly total?: number;
}

/**
 * 🚀 Revolutionary Session Table Component
 * Reusable table component for displaying charging sessions
 */
export const SessionTable: React.FC<SessionTableProps> = ({
  sessions,
  onViewDetails,
  onStopSession,
  showStopButton = true,
  className = "",
  columns = {
    session: true,
    status: true,
    station: true,
    user: true,
    power: true,
    energy: true,
    cost: true,
    duration: true,
    actions: true,
  },
  onLoadMore,
  isLoadingMore = false,
  hasNextPage = false,
  total = 0,
}) => {
  // ✅ Infinite scroll trigger with throttling
  const loadMoreRef = useInfiniteScrollTrigger(
    () => {
      if (onLoadMore && hasNextPage && !isLoadingMore) {
        onLoadMore();
      }
    },
    {
      enabled: hasNextPage && !isLoadingMore,
      rootMargin: '100px',
      throttleMs: 500, // ✅ Prevent rapid successive calls
    }
  );

  // Icon mapping for session status
  const getSessionIcon = (status: string): IconComponent => {
    switch (status) {
      case 'charging':
        return BoltIcon;
      case 'starting':
        return PlayIcon;
      case 'completed':
        return CheckCircleIcon;
      case 'failed':
      case 'cancelled':
        return XCircleIcon;
      default:
        return ClockIcon;
    }
  };

  // Color configuration for session status
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'charging':
        return {
          badgeColor: 'bg-emerald-500/10 border-emerald-500/30',
          textColor: 'text-emerald-400',
          pulseColor: 'bg-emerald-500',
        };
      case 'starting':
        return {
          badgeColor: 'bg-blue-500/10 border-blue-500/30',
          textColor: 'text-blue-400',
          pulseColor: 'bg-blue-500',
        };
      case 'completed':
        return {
          badgeColor: 'bg-green-500/10 border-green-500/30',
          textColor: 'text-green-400',
          pulseColor: 'bg-green-500',
        };
      case 'failed':
        return {
          badgeColor: 'bg-red-500/10 border-red-500/30',
          textColor: 'text-red-400',
          pulseColor: 'bg-red-500',
        };
      case 'cancelled':
        return {
          badgeColor: 'bg-gray-500/10 border-gray-500/30',
          textColor: 'text-gray-400',
          pulseColor: 'bg-gray-500',
        };
      default:
        return {
          badgeColor: 'bg-gray-500/10 border-gray-500/30',
          textColor: 'text-gray-400',
          pulseColor: 'bg-gray-500',
        };
    }
  };

  return (
    <div className={className}>
      {/* Session Table */}
      <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl overflow-hidden backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/30 border-b border-gray-600/30">
              <tr>
                {columns.session && (
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                    Session
                  </th>
                )}
                {columns.status && (
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                    Status
                  </th>
                )}
                {columns.station && (
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                    Station
                  </th>
                )}
                {columns.user && (
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                    User
                  </th>
                )}
                {columns.power && (
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                    Power
                  </th>
                )}
                {columns.energy && (
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                    Energy
                  </th>
                )}
                {columns.cost && (
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                    Cost
                  </th>
                )}
                {columns.duration && (
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                    Duration
                  </th>
                )}
                {columns.actions && (
                  <th className="text-right py-4 px-6 text-sm font-medium text-gray-300">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/30">
              {sessions.map((session) => {
                const statusConfig = getStatusConfig(session.status);
                const SessionIcon = getSessionIcon(session.status);
                const isActive = session.status === 'charging' || session.status === 'starting';
                
                return (
                  <tr
                    key={session.id}
                    className="hover:bg-gray-700/20 transition-colors group"
                  >
                    {columns.session && (
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg ${statusConfig.badgeColor} border flex items-center justify-center relative`}>
                            {isActive && (
                              <div className={`absolute -top-1 -right-1 w-3 h-3 ${statusConfig.pulseColor} rounded-full animate-ping opacity-75`}></div>
                            )}
                            <SessionIcon className={`w-4 h-4 ${statusConfig.textColor}`} />
                          </div>
                          <div>
                            <span className="text-white font-medium">
                              #{session.id.slice(-6)}
                            </span>
                            <div className="text-xs text-gray-400">
                              {session.connector_type}
                            </div>
                          </div>
                        </div>
                      </td>
                    )}
                    
                    {columns.status && (
                      <td className="py-4 px-6">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${statusConfig.badgeColor} border`}>
                          <span className={`text-xs font-medium ${statusConfig.textColor} uppercase tracking-wide`}>
                            {session.status}
                          </span>
                        </div>
                      </td>
                    )}
                    
                    {columns.station && (
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <MapPinIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-white">{session.station_name}</span>
                        </div>
                      </td>
                    )}
                    
                    {columns.user && (
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <UserIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">{session.user_email}</span>
                        </div>
                      </td>
                    )}
                    
                    {columns.power && (
                      <td className="py-4 px-6">
                        <span className="text-white font-semibold">
                          {session.power_output}kW
                        </span>
                      </td>
                    )}
                    
                    {columns.energy && (
                      <td className="py-4 px-6">
                        <span className="text-emerald-400 font-medium">
                          {session.energy_delivered.toFixed(1)} kWh
                        </span>
                      </td>
                    )}
                    
                    {columns.cost && (
                      <td className="py-4 px-6">
                        <span className="text-teal-400 font-semibold">
                          {session.current_cost.toFixed(2)} zł
                        </span>
                      </td>
                    )}
                    
                    {columns.duration && (
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1 text-gray-300">
                          <ClockIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">
                            {formatSessionDuration(session.started_at, session.ended_at)}
                          </span>
                        </div>
                      </td>
                    )}
                    
                    {columns.actions && (
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 justify-end">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onViewDetails?.(session)}
                            className="
                              relative overflow-hidden group/view p-2
                              bg-gradient-to-r from-gray-700/40 via-gray-600/30 to-gray-700/40
                              hover:from-gray-600/50 hover:via-gray-500/40 hover:to-gray-600/50
                              text-gray-300 hover:text-white
                              border border-gray-600/30 hover:border-gray-500/50
                              transition-all duration-300 ease-out
                              hover:scale-105 active:scale-95
                              flex items-center
                            "
                          >
                            <EyeIcon className="w-4 h-4 group-hover/view:scale-110 transition-transform duration-300" />
                          </Button>
                          
                          {showStopButton && isActive && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => onStopSession?.(session)}
                              className="
                                relative overflow-hidden p-2 group/stop
                                bg-gradient-to-r from-red-500/15 via-red-400/10 to-red-500/15
                                hover:from-red-500/25 hover:via-red-400/20 hover:to-red-500/25
                                text-red-400 hover:text-red-300
                                border border-red-500/30 hover:border-red-400/50
                                shadow-sm shadow-red-500/10 hover:shadow-lg hover:shadow-red-500/20
                                transition-all duration-300 ease-out
                                hover:scale-110 active:scale-95
                                flex items-center
                              "
                            >
                              <StopIcon className="w-4 h-4 group-hover/stop:scale-110 transition-transform duration-300" />
                            </Button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ Infinite Scroll Loading Indicators */}
      {isLoadingMore && (
        <div className="mt-8 flex items-center justify-center py-8">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-gray-600 border-t-emerald-400 rounded-full animate-spin"></div>
            <span className="text-gray-400 font-medium">Loading more sessions...</span>
          </div>
        </div>
      )}

      {/* ✅ Load More Trigger (invisible) */}
      {hasNextPage && !isLoadingMore && (
        <div 
          ref={loadMoreRef as React.RefObject<HTMLDivElement>}
          className="h-10 flex items-center justify-center"
        >
          {/* Invisible trigger element */}
        </div>
      )}

      {/* ✅ End of List Indicator */}
      {!hasNextPage && sessions.length > 0 && total > 0 && (
        <div className="mt-8 flex flex-col items-center justify-center py-8 text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full flex items-center justify-center mb-3">
            <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full"></div>
          </div>
          
          <h3 className="text-white font-semibold mb-1">All sessions loaded</h3>
          <p className="text-gray-400 text-sm">
            Showing all {total} sessions
          </p>
          
          <div className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
        </div>
      )}
    </div>
  );
}; 