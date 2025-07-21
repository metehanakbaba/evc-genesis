// StationStatsSection.tsx
import React from 'react';
import { CogIcon } from '@heroicons/react/24/outline';
import type { IconComponent } from '@/shared/ui';

export interface StationStats {
  title: string;
  value: string;
  icon: IconComponent;
  variant: 'blue' | 'emerald' | 'amber' | 'red';
  trend: string;
  description: string;
  isLive?: boolean;
}

interface StationStatsSectionProps {
  stats: StationStats[];
}

export const StationStatsSection: React.FC<StationStatsSectionProps> = ({
  stats,
}) => (
  <section>
    <div className="flex items-center gap-3 mb-8">
      <div className="w-3 h-8 bg-gradient-to-b from-blue-400 to-blue-300 rounded-full" />
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <CogIcon className="w-6 h-6 text-blue-400" />
          Infrastructure Analytics
        </h2>
        <p className="text-gray-400">
          Real‑time deployment & operational metrics
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((s, i) => (
        <div key={s.title} className="group relative" style={{ animationDelay: `${i * 150}ms` }}>
          <div
            className={`
              relative p-6 bg-gradient-to-br from-${s.variant}-500/10 via-${s.variant}-400/5 to-transparent
              border border-${s.variant}-400/25 hover:border-${s.variant}-300/40
              rounded-2xl backdrop-blur-xl shadow-2xl hover:shadow-3xl
              transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1
              cursor-pointer flex flex-col h-[300px]
            `}
          >
            {s.isLive && (
              <div className={`absolute -top-2 -right-2 w-4 h-4 bg-${s.variant}-500 rounded-full animate-ping opacity-75`} />
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            <div className="relative z-10 flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-${s.variant}-500/10 border border-${s.variant}-500/20 flex items-center justify-center`}>
                  <s.icon className={`w-6 h-6 text-${s.variant}-400`} />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white mb-1">{s.value}</div>
                  <div className={`text-xs font-medium text-${s.variant}-400`}>{s.trend}</div>
                </div>
              </div>
              <div className="mt-auto">
                <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm">{s.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);
