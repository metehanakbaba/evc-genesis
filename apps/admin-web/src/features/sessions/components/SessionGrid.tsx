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
      {/* Session Grid - Improved spacing and responsiveness */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-5 xl:gap-6">
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
              {/* Revolutionary Floating Session Card - Optimized dimensions */}
              <div
                className={`relative p-4 lg:p-5 ${statusConfig.bgColor} border ${statusConfig.borderColor} rounded-xl lg:rounded-2xl backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] hover:-translate-y-0.5 cursor-pointer ${statusConfig.shadowColor} min-h-[280px] max-h-[320px] flex flex-col will-change-transform`}
              >
                {/* Live Status Pulse */}
                {isActive && (
                  <div
                    className={`absolute -top-1 -right-1 w-3 h-3 ${statusConfig.pulseColor} rounded-full animate-ping opacity-75`}
                  ></div>
                )}

                {/* Floating Background Effect - Optimized */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl lg:rounded-2xl will-change-opacity"></div>

                {/* Session Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Header Section - Compact */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl ${statusConfig.badgeColor} border flex items-center justify-center transition-transform duration-200 group-hover:scale-105 will-change-transform`}
                      >
                        <SessionIcon className={`w-5 h-5 lg:w-6 lg:h-6 ${statusConfig.textColor} transition-transform duration-200 group-hover:scale-110`} />
                      </div>
                      <div className="min-w-0">
                        <div
                          className={`text-xs font-medium ${statusConfig.textColor} mb-0.5 transition-colors duration-200`}
                        >
                          {session.status.toUpperCase()}
                        </div>
                        <div className="text-white font-semibold text-base lg:text-lg truncate transition-colors duration-200 group-hover:text-gray-100">
                          #{session.id.slice(-6)}
                        </div>
                      </div>
                    </div>

                    {/* Power Output Badge - Compact */}
                    <div className="text-right flex-shrink-0">
                      <div className="text-xl lg:text-2xl font-bold text-white transition-transform duration-200 group-hover:scale-105">
                        {session.power_output}kW
                      </div>
                      <div className="text-xs text-gray-400 transition-colors duration-200">
                        {session.connector_type}
                      </div>
                    </div>
                  </div>

                  {/* Station & User Info - Improved spacing */}
                  <div className="space-y-1.5 mb-3">
                    <div className="flex items-center gap-2 text-gray-300 transition-colors duration-200 group-hover:text-gray-200">
                      <MapPinIcon className="w-4 h-4 text-gray-400 flex-shrink-0 transition-colors duration-200 group-hover:text-gray-300" />
                      <span className="text-sm truncate">
                        {session.station_name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300 transition-colors duration-200 group-hover:text-gray-200">
                      <UserIcon className="w-4 h-4 text-gray-400 flex-shrink-0 transition-colors duration-200 group-hover:text-gray-300" />
                      <span className="text-sm truncate">{session.user_email}</span>
                    </div>
                  </div>

                  {/* Energy & Cost Display - Optimized */}
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="text-center p-2.5 bg-gray-800/30 rounded-lg transition-all duration-200 group-hover:bg-gray-800/40 group-hover:scale-105 will-change-transform">
                      <div className="text-base lg:text-lg font-bold text-white transition-colors duration-200">
                        {session.energy_delivered.toFixed(1)}
                      </div>
                      <div className="text-xs text-gray-400 transition-colors duration-200">
                        kWh
                      </div>
                    </div>
                    <div className="text-center p-2.5 bg-gray-800/30 rounded-lg transition-all duration-200 group-hover:bg-gray-800/40 group-hover:scale-105 will-change-transform">
                      <div className="text-base lg:text-lg font-bold text-teal-400 transition-colors duration-200">
                        {session.current_cost.toFixed(2)} zł
                      </div>
                      <div className="text-xs text-gray-400 transition-colors duration-200">
                        Cost
                      </div>
                    </div>
                  </div>

                  {/* Session Timeline - Compact */}
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-3 transition-colors duration-200 group-hover:text-gray-300">
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                      <span className="text-xs">
                        {formatSessionDuration(
                          session.started_at,
                          session.ended_at,
                        )}
                      </span>
                    </div>
                    {session.estimated_completion &&
                      session.status === 'charging' && (
                        <div className="text-emerald-400 text-xs transition-colors duration-200 group-hover:text-emerald-300">
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

                  {/* Action Buttons - Improved spacing */}
                  <div className="flex gap-2 mt-auto pt-2">
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
                        transition-all duration-200 ease-out
                        hover:scale-[1.01] active:scale-[0.98]
                        flex items-center justify-center gap-1.5
                        before:absolute before:inset-0 before:bg-gradient-to-r 
                        before:from-transparent before:via-white/10 before:to-transparent
                        before:translate-x-[-100%] hover:before:translate-x-[100%]
                        before:transition-transform before:duration-300
                        py-2 text-xs lg:text-sm
                        will-change-transform
                      "
                    >
                      <div className="flex items-center gap-1.5 relative z-10">
                        <EyeIcon className="w-4 h-4 group-hover/view:scale-105 transition-transform duration-200" />
                        <span className="font-medium">View</span>
                      </div>
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
                        <StopIcon className="w-4 h-4 group-hover/stop:scale-105 transition-transform duration-200" />
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
        <div className="mt-6 lg:mt-8 flex items-center justify-center py-6 lg:py-8">
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