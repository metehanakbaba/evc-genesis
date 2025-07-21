'use client';

import {
  BoltIcon,
  CheckCircleIcon,
  ClockIcon,
  EyeIcon,
  MapPinIcon,
  PlayIcon,
  StopIcon,
  UserIcon,
  XCircleIcon,
  ArrowTrendingUpIcon,
  FireIcon,
  BanknotesIcon,
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



  return (
    <div className={className}>
      {/* Session Table - Compact Two-Line Design */}
      <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl overflow-hidden backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/30 border-b border-gray-600/30">
              <tr>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-300 min-w-[200px]">
                  Session Details
                </th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-300 min-w-[220px]">
                  Station & User
                </th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-300 min-w-[160px]">
                  Power & Energy
                </th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-300 min-w-[140px]">
                  Duration & Cost
                </th>
                <th className="text-right py-4 px-4 text-sm font-medium text-gray-300 min-w-[120px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/30">
              {sessions.map((session) => {
                const statusConfig = getSessionStatusConfig(session.status as any);
                const SessionIcon = getSessionIcon(session.status);
                const isActive = session.status === 'charging' || session.status === 'starting';
                
                return (
                  <tr
                    key={session.id}
                    className="hover:bg-gray-700/20 transition-colors duration-200 group will-change-transform"
                  >
                    {/* Session Details - Two-line layout */}
                    <td className="py-4 px-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg ${statusConfig.badgeColor} border flex items-center justify-center relative flex-shrink-0 transition-transform duration-200 group-hover:scale-105 will-change-transform`}>
                          {isActive && (
                            <div className={`absolute -top-1 -right-1 w-2.5 h-2.5 ${statusConfig.pulseColor} rounded-full animate-ping opacity-75`}></div>
                          )}
                          <SessionIcon className={`w-5 h-5 ${statusConfig.textColor} transition-transform duration-200 group-hover:scale-110`} />
                        </div>
                        <div className="min-w-0 flex-1">
                          {/* First line: Session ID and Status */}
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-white font-semibold text-sm transition-colors duration-200 group-hover:text-gray-100">
                              #{session.id.slice(-6)}
                            </span>
                            <div className={`inline-flex items-center px-2 py-0.5 rounded-full ${statusConfig.badgeColor} border transition-transform duration-200 group-hover:scale-105 will-change-transform`}>
                              <span className={`text-xs font-medium ${statusConfig.textColor} uppercase tracking-wide`}>
                                {session.status}
                              </span>
                            </div>
                          </div>
                          {/* Second line: Connector type and timing */}
                          <div className="flex items-center gap-3 text-xs text-gray-400 transition-colors duration-200 group-hover:text-gray-300">
                            <span>{session.connector_type}</span>
                            <div className="flex items-center gap-1">
                              <ClockIcon className="w-3 h-3 transition-transform duration-200 group-hover:scale-110" />
                              <span>{formatSessionDuration(session.started_at, session.ended_at)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Station & User - Two-line layout */}
                    <td className="py-4 px-4">
                      <div className="space-y-1.5">
                        {/* First line: Station */}
                        <div className="flex items-center gap-2 transition-colors duration-200 group-hover:text-gray-200">
                          <MapPinIcon className="w-4 h-4 text-gray-400 flex-shrink-0 transition-colors duration-200 group-hover:text-gray-300" />
                          <span className="text-white text-sm font-medium truncate transition-colors duration-200 group-hover:text-gray-100">{session.station_name}</span>
                        </div>
                        {/* Second line: User */}
                        <div className="flex items-center gap-2 transition-colors duration-200 group-hover:text-gray-200">
                          <UserIcon className="w-4 h-4 text-gray-400 flex-shrink-0 transition-colors duration-200 group-hover:text-gray-300" />
                          <span className="text-gray-300 text-sm truncate transition-colors duration-200 group-hover:text-gray-200">{session.user_email}</span>
                        </div>
                      </div>
                    </td>

                    {/* Power & Energy - Two-line layout */}
                    <td className="py-4 px-4">
                      <div className="space-y-1.5">
                        {/* First line: Power */}
                        <div className="flex items-center gap-2">
                          <BoltIcon className="w-4 h-4 text-yellow-400 transition-transform duration-200 group-hover:scale-110" />
                          <span className="text-white font-semibold text-sm transition-colors duration-200 group-hover:text-gray-100">
                            {session.power_output} kW
                          </span>
                        </div>
                        {/* Second line: Energy */}
                        <div className="flex items-center gap-2">
                          <FireIcon className="w-4 h-4 text-emerald-400 transition-transform duration-200 group-hover:scale-110" />
                          <span className="text-emerald-400 font-medium text-sm transition-colors duration-200 group-hover:text-emerald-300">
                            {session.energy_delivered.toFixed(1)} kWh
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Duration & Cost - Two-line layout */}
                    <td className="py-4 px-4">
                      <div className="space-y-1.5">
                        {/* First line: Cost */}
                        <div className="flex items-center gap-2">
                          <BanknotesIcon className="w-4 h-4 text-teal-400 transition-transform duration-200 group-hover:scale-110" />
                          <span className="text-teal-400 font-semibold text-sm transition-colors duration-200 group-hover:text-teal-300">
                            {session.current_cost.toFixed(2)} zł
                          </span>
                        </div>
                        {/* Second line: Progress or completion time */}
                        <div className="text-xs text-gray-400 transition-colors duration-200 group-hover:text-gray-300">
                          {session.estimated_completion && session.status === 'charging' ? (
                            <div className="flex items-center gap-1">
                              <ArrowTrendingUpIcon className="w-3 h-3 transition-transform duration-200 group-hover:scale-110" />
                              <span>
                                ~{new Date(session.estimated_completion).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <ClockIcon className="w-3 h-3 transition-transform duration-200 group-hover:scale-110" />
                              <span>Started: {new Date(session.started_at).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Actions - Compact */}
                    <td className="py-4 px-4">
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
                            transition-all duration-200 ease-out
                            hover:scale-105 active:scale-95
                            flex items-center
                            will-change-transform
                          "
                        >
                          <EyeIcon className="w-4 h-4 group-hover/view:scale-110 transition-transform duration-200" />
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
                              transition-all duration-200 ease-out
                              hover:scale-105 active:scale-95
                              flex items-center
                              will-change-transform
                            "
                          >
                            <StopIcon className="w-4 h-4 group-hover/stop:scale-110 transition-transform duration-200" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ Infinite Scroll Loading Indicators */}
      {isLoadingMore && (
        <div className="mt-6 lg:mt-8 flex items-center justify-center py-6 lg:py-8">
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
        <div className="mt-6 lg:mt-8 flex flex-col items-center justify-center py-6 lg:py-8 text-center">
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