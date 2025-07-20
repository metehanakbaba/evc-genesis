import {
  BeakerIcon,
  BugAntIcon,
  ClockIcon,
  ComputerDesktopIcon,
  CpuChipIcon,
  CurrencyDollarIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@ui/forms';
import React from 'react';
import type { IntelligenceEventCardProps } from './types';
// ✅ Import shared business logic
import { formatTimeAgo } from '@evc/shared-business-logic';

const TYPE_ICONS = {
  anomaly: ShieldExclamationIcon,
  payment: CurrencyDollarIcon,
  system: ComputerDesktopIcon,
  security: BugAntIcon,
  performance: CpuChipIcon,
  prediction: BeakerIcon,
} as const;

const SEVERITY_COLORS = {
  low: 'from-green-500/20 via-emerald-400/15 to-lime-500/10',
  medium: 'from-yellow-500/20 via-amber-400/15 to-orange-500/10',
  high: 'from-orange-500/20 via-red-400/15 to-pink-500/10',
  critical: 'from-red-500/20 via-pink-400/15 to-rose-500/10',
} as const;

const SEVERITY_BORDERS = {
  low: 'border-green-400/30',
  medium: 'border-yellow-400/30',
  high: 'border-orange-400/30',
  critical: 'border-red-400/30',
} as const;

// ✅ formatTimeAgo now handled by shared business logic

/**
 * Individual intelligence event card component
 * Max 50 lines - Single responsibility
 */
export const IntelligenceEventCard: React.FC<IntelligenceEventCardProps> =
  React.memo(({ event, index }) => {
    const IconComponent = TYPE_ICONS[event.type];

    return (
      <div
        className={`group relative p-6 bg-gradient-to-r ${SEVERITY_COLORS[event.severity]} 
        border ${SEVERITY_BORDERS[event.severity]} rounded-2xl backdrop-blur-xl 
        hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500 ease-out
        shadow-lg hover:shadow-2xl cursor-pointer`}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping opacity-75" />

        <div className="flex items-start gap-4">
          <div
            className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${SEVERITY_COLORS[event.severity]} 
          border ${SEVERITY_BORDERS[event.severity]} flex items-center justify-center backdrop-blur-xl`}
          >
            {/* @ts-ignore - React 19 + Heroicons compatibility issue */}
            <IconComponent className="w-6 h-6 text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white mb-2">
              {event.title}
            </h3>
            <p className="text-gray-300 mb-3">{event.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                {/* @ts-ignore - React 19 + Heroicons compatibility issue */}
                <ClockIcon className="w-4 h-4" />
                <span>{formatTimeAgo(event.timestamp)}</span>
              </div>

              {event.action && (
                <Button
                  size="sm"
                  variant="primary"
                  className="bg-purple-500/20 hover:bg-purple-500/30"
                >
                  {event.action}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  });

IntelligenceEventCard.displayName = 'IntelligenceEventCard';
