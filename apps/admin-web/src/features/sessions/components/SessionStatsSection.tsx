'use client';

import {
  ArrowTrendingUpIcon,
  BoltIcon,
  CheckCircleIcon,
  ClockIcon,
  PlayIcon,
} from '@heroicons/react/24/outline';
import type React from 'react';

// Type for icon components
type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

/**
 * ⚡ Session Management Statistics
 * Revolutionary floating stats with charging session data
 */
interface SessionStats {
  readonly title: string;
  readonly value: string;
  readonly icon: IconComponent;
  readonly bgColor: string;
  readonly borderColor: string;
  readonly iconColor: string;
  readonly accentColor: string;
  readonly trend: string;
  readonly description: string;
  readonly isLive?: boolean;
}

interface SessionStatsData {
  totalSessions: { formatted: string; count: number };
  activeSessions: { formatted: string; percentage: string };
  completedSessions: { formatted: string };
  newSessionsToday: { formatted: string };
}

interface SessionStatsSectionProps {
  sessionStats: SessionStatsData;
}

/**
 * 📊 Session Statistics Section Component
 * Displays enterprise charging session analytics
 */
export const SessionStatsSection: React.FC<SessionStatsSectionProps> = ({ sessionStats }) => {
  const { totalSessions, activeSessions, completedSessions, newSessionsToday } = sessionStats;

  // Enterprise charging session management statistics
  const statsConfig: SessionStats[] = [
    {
      title: 'Total Sessions',
      value: totalSessions.formatted,
      icon: BoltIcon,
      bgColor: 'from-emerald-500/15 via-emerald-400/8 to-transparent',
      borderColor: 'border-emerald-400/30 hover:border-emerald-300/50',
      iconColor: 'text-emerald-400',
      accentColor: 'bg-emerald-500',
      trend: `+${newSessionsToday.formatted} today`,
      description:
        'Total charging sessions initiated across all stations with comprehensive energy delivery tracking',
      isLive: true,
    },
    {
      title: 'Active Sessions',
      value: activeSessions.formatted,
      icon: PlayIcon,
      bgColor: 'from-blue-500/15 via-blue-400/8 to-transparent',
      borderColor: 'border-blue-400/30 hover:border-blue-300/50',
      iconColor: 'text-blue-400',
      accentColor: 'bg-blue-500',
      trend: `${activeSessions.percentage}% of capacity`,
      description:
        'Currently active charging sessions with real-time energy delivery and payment processing',
      isLive: true,
    },
    {
      title: 'Completed Sessions',
      value: completedSessions.formatted,
      icon: CheckCircleIcon,
      bgColor: 'from-purple-500/15 via-purple-400/8 to-transparent',
      borderColor: 'border-purple-400/30 hover:border-purple-300/50',
      iconColor: 'text-purple-400',
      accentColor: 'bg-purple-500',
      trend: 'Successfully finished',
      description:
        'Successfully completed charging sessions with full payment settlement and energy delivery confirmation',
    },
    {
      title: 'New Sessions Today',
      value: newSessionsToday.formatted,
      icon: ClockIcon,
      bgColor: 'from-amber-500/15 via-amber-400/8 to-transparent',
      borderColor: 'border-amber-400/30 hover:border-amber-300/50',
      iconColor: 'text-amber-400',
      accentColor: 'bg-amber-500',
      trend: '+12 this hour',
      description:
        'New charging sessions initiated within the last 24-hour operational cycle with automated billing',
      isLive: true,
    },
  ];

  return (
    <section>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-3 h-8 bg-gradient-to-b from-emerald-400 to-emerald-300 rounded-full"></div>
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BoltIcon className="w-6 h-6 text-emerald-400" />
            Live Session Analytics
          </h2>
          <p className="text-gray-400">
            Real-time charging session metrics and energy delivery intelligence
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsConfig.map((stat, index) => (
          <div
            key={stat.title}
            className="group relative"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {/* Revolutionary MinimalStatCard Design - Fixed Height */}
            <div
              className={`
              relative p-6 bg-gradient-to-br ${stat.bgColor}
              border ${stat.borderColor}
              rounded-2xl backdrop-blur-xl shadow-2xl hover:shadow-3xl
              transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1
              cursor-pointer h-[300px] flex flex-col
            `}
            >
              {/* Live indicator */}
              {stat.isLive && (
                <div
                  className={`absolute -top-2 -right-2 w-4 h-4 ${stat.accentColor} rounded-full animate-ping opacity-75`}
                ></div>
              )}

              {/* Floating background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

              <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl ${stat.bgColor} border ${stat.borderColor} flex items-center justify-center backdrop-blur-sm`}
                  >
                    <stat.icon className={`w-7 h-7 ${stat.iconColor}`} />
                  </div>
                  <ArrowTrendingUpIcon
                    className={`w-5 h-5 ${stat.iconColor}`}
                  />
                </div>

                {/* Main Content - Fixed spacing */}
                <div className="flex-1 flex flex-col">
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-white mb-2">
                      {stat.value}
                    </div>
                    <div className={`text-sm font-medium ${stat.iconColor}`}>
                      {stat.title}
                    </div>
                  </div>

                  <div className={`text-xs ${stat.iconColor} mb-4 font-medium`}>
                    {stat.trend}
                  </div>
                </div>

                {/* Description - Fixed at bottom */}
                <div className="mt-auto">
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
