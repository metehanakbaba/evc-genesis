import React from 'react';
import type { IntelligenceLiveIndicatorProps } from './types';

const formatTimeAgo = (date: Date): string => {
  const diff = Date.now() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m ago`;
};

/**
 * Live update indicator with status
 * Max 50 lines - Single responsibility component
 */
export const IntelligenceLiveIndicator: React.FC<IntelligenceLiveIndicatorProps> =
  React.memo(({ lastUpdate }) => (
    <div className="mt-8 flex items-center justify-center">
      <div className="flex items-center gap-3 px-4 py-2 bg-gray-800/60 border border-gray-600 rounded-full backdrop-blur-xl">
        <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse" />
        <span className="text-sm text-gray-300">
          Live updates enabled • Last update: {formatTimeAgo(lastUpdate)}
        </span>
      </div>
    </div>
  ));

IntelligenceLiveIndicator.displayName = 'IntelligenceLiveIndicator';
