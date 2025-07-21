'use client';

import {
  ArrowPathIcon,
  BoltIcon,
  CheckCircleIcon,
  ClockIcon,
  EyeIcon,
  FireIcon,
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
import { formatSessionDuration } from '@evc/shared-business-logic';
// ✅ Import infinite scroll hooks from users feature (reusing existing)
import { useInfiniteScrollTrigger } from '../../users/hooks/useIntersectionObserver';

// Type for icon components
type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

/**
 * 🎯 Session Grid Props
 */
export interface SessionGridProps {
  readonly sessions: LiveChargingSession[];
  readonly onViewDetails?: (session: LiveChargingSession) => void;
  readonly onStopSession?: (session: LiveChargingSession) => void;
  readonly showStopButton?: boolean;
  readonly className?: string;
  // ✅ Infinite scroll props
  readonly onLoadMore?: () => void;
  readonly isLoadingMore?: boolean;
  readonly hasNextPage?: boolean;
  readonly total?: number;
}

/**
 * 🚀 Revolutionary Session Grid Component
 * Reusable grid component for displaying charging sessions
 */
export const SessionGrid: React.FC<SessionGridProps> = ({
  sessions,
  onViewDetails,
  onStopSession,
  showStopButton = true,
  className = "",
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
          bgColor: 'bg-gradient-to-br from-emerald-500/10 via-emerald-400/5 to-transparent',
          borderColor: 'border-emerald-400/25 hover:border-emerald-300/40',
          badgeColor: 'bg-emerald-500/10 border-emerald-500/30',
          textColor: 'text-emerald-400',
          pulseColor: 'bg-emerald-500',
          shadowColor: 'hover:shadow-emerald-500/25',
        };
      case 'starting':
        return {
          bgColor: 'bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-transparent',
          borderColor: 'border-blue-400/25 hover:border-blue-300/40',
          badgeColor: 'bg-blue-500/10 border-blue-500/30',
          textColor: 'text-blue-400',
          pulseColor: 'bg-blue-500',
          shadowColor: 'hover:shadow-blue-500/25',
        };
      case 'completed':
        return {
          bgColor: 'bg-gradient-to-br from-green-500/10 via-green-400/5 to-transparent',
          borderColor: 'border-green-400/25 hover:border-green-300/40',
          badgeColor: 'bg-green-500/10 border-green-500/30',
          textColor: 'text-green-400',
          pulseColor: 'bg-green-500',
          shadowColor: 'hover:shadow-green-500/25',
        };
      case 'failed':
        return {
          bgColor: 'bg-gradient-to-br from-red-500/10 via-red-400/5 to-transparent',
          borderColor: 'border-red-400/25 hover:border-red-300/40',
          badgeColor: 'bg-red-500/10 border-red-500/30',
          textColor: 'text-red-400',
          pulseColor: 'bg-red-500',
          shadowColor: 'hover:shadow-red-500/25',
        };
      case 'cancelled':
        return {
          bgColor: 'bg-gradient-to-br from-gray-500/10 via-gray-400/5 to-transparent',
          borderColor: 'border-gray-400/25 hover:border-gray-300/40',
          badgeColor: 'bg-gray-500/10 border-gray-500/30',
          textColor: 'text-gray-400',
          pulseColor: 'bg-gray-500',
          shadowColor: 'hover:shadow-gray-500/25',
        };
      default:
        return {
          bgColor: 'bg-gradient-to-br from-gray-500/10 via-gray-400/5 to-transparent',
          borderColor: 'border-gray-400/25 hover:border-gray-300/40',
          badgeColor: 'bg-gray-500/10 border-gray-500/30',
          textColor: 'text-gray-400',
          pulseColor: 'bg-gray-500',
          shadowColor: 'hover:shadow-gray-500/25',
        };
    }
  };

  return (
    <div className={className}>
      {/* Session Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {sessions.map((session, index) => {
          const statusConfig = getStatusConfig(session.status);
          const SessionIcon = getSessionIcon(session.status);
          const isActive = session.status === 'charging' || session.status === 'starting';

          return (
            <div
              key={session.id}
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Revolutionary Floating Session Card */}
              <div
                className={`relative p-6 ${statusConfig.bgColor} border ${statusConfig.borderColor} rounded-2xl backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer ${statusConfig.shadowColor} h-[320px] flex flex-col`}
              >
                {/* Live Status Pulse */}
                {isActive && (
                  <div
                    className={`absolute -top-2 -right-2 w-4 h-4 ${statusConfig.pulseColor} rounded-full animate-ping opacity-75`}
                  ></div>
                )}

                {/* Floating Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                {/* Session Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Header Section */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl ${statusConfig.badgeColor} border flex items-center justify-center`}
                      >
                        <SessionIcon className={`w-6 h-6 ${statusConfig.textColor}`} />
                      </div>
                      <div>
                        <div
                          className={`text-sm font-medium ${statusConfig.textColor} mb-1`}
                        >
                          {session.status.toUpperCase()}
                        </div>
                        <div className="text-white font-semibold text-lg">
                          Session #{session.id.slice(-6)}
                        </div>
                      </div>
                    </div>

                    {/* Power Output Badge */}
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">
                        {session.power_output}kW
                      </div>
                      <div className="text-xs text-gray-400">
                        {session.connector_type}
                      </div>
                    </div>
                  </div>

                  {/* Station & User Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPinIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">
                        {session.station_name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <UserIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{session.user_email}</span>
                    </div>
                  </div>

                  {/* Energy & Cost Display */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                      <div className="text-lg font-bold text-white">
                        {session.energy_delivered.toFixed(1)}
                      </div>
                      <div className="text-xs text-gray-400">
                        kWh Delivered
                      </div>
                    </div>
                    <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                      <div className="text-lg font-bold text-teal-400">
                        {session.current_cost.toFixed(2)} zł
                      </div>
                      <div className="text-xs text-gray-400">
                        Current Cost
                      </div>
                    </div>
                  </div>

                  {/* Session Timeline */}
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-4 h-4" />
                      <span>
                        {formatSessionDuration(
                          session.started_at,
                          session.ended_at,
                        )}
                      </span>
                    </div>
                    {session.estimated_completion &&
                      session.status === 'charging' && (
                        <div className="text-emerald-400">
                          ~
                          {new Date(
                            session.estimated_completion,
                          ).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      )}
                  </div>

                  {/* Revolutionary Action Buttons */}
                  <div className="flex gap-2 mt-auto">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onViewDetails?.(session)}
                      className="
                        flex-1 relative overflow-hidden group/view
                        bg-gradient-to-r from-gray-700/40 via-gray-600/30 to-gray-700/40
                        hover:from-gray-600/50 hover:via-gray-500/40 hover:to-gray-600/50
                        text-gray-300 hover:text-white
                        border border-gray-600/30 hover:border-gray-500/50
                        shadow-md hover:shadow-lg
                        transition-all duration-300 ease-out
                        hover:scale-[1.02] active:scale-[0.98]
                        flex items-center justify-center gap-2
                        before:absolute before:inset-0 before:bg-gradient-to-r 
                        before:from-transparent before:via-white/10 before:to-transparent
                        before:translate-x-[-100%] hover:before:translate-x-[100%]
                        before:transition-transform before:duration-500
                      "
                    >
                      <div className="flex items-center gap-2 relative z-10">
                        <EyeIcon className="w-4 h-4 group-hover/view:scale-110 transition-transform duration-300" />
                        <span className="font-medium">View Details</span>
                      </div>
                    </Button>
                    
                    {showStopButton && isActive && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onStopSession?.(session)}
                        className="
                          relative overflow-hidden p-3 group/stop
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
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ✅ Infinite Scroll Loading Indicators */}
      {isLoadingMore && (
        <div className="mt-8 flex items-center justify-center py-8">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-gray-600 border-t-emerald-400 rounded-full animate-spin"></div>
            <span className="text-gray-400 font-medium">Loading more sessions...</span>
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
              <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
            </div>
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