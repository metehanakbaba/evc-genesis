import React from 'react';
import {
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/solid';
import { CogIcon } from '@heroicons/react/24/outline';
import type { IconComponent } from '@/shared/ui';

export interface SessionStats {
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

interface SessionStatsSectionProps {
  stats: SessionStats[];
}

export const SessionStatsSection: React.FC<SessionStatsSectionProps> = ({
  stats,
}) => (
  <section>
    <div className="flex items-center gap-3 mb-8">
      <div className="w-3 h-8 bg-gradient-to-b from-emerald-400 to-emerald-300 rounded-full" />
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <CogIcon className="w-6 h-6 text-emerald-400" />
          Live Session Statistics
        </h2>
        <p className="text-gray-400">
          Revolutionary floating stats with real-time data
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={stat.title}
          className="group relative"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <div
            className={`
              relative p-6 bg-gradient-to-br ${stat.bgColor}
              border ${stat.borderColor}
              rounded-2xl backdrop-blur-xl shadow-2xl hover:shadow-3xl
              transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1
              cursor-pointer h-[300px] flex flex-col
            `}
          >
            {stat.isLive && (
              <div
                className={`absolute -top-2 -right-2 w-4 h-4 ${stat.accentColor} rounded-full animate-ping opacity-75`}
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-14 h-14 rounded-2xl ${stat.bgColor} border ${stat.borderColor} flex items-center justify-center`}
                >
                  <stat.icon className={`w-7 h-7 ${stat.iconColor}`} />
                </div>
                <ArrowTrendingUpIcon
                  className={`w-5 h-5 ${stat.iconColor}`}
                />
              </div>

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
