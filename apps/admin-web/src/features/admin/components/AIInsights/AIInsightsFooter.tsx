import { ClockIcon } from '@heroicons/react/24/outline';
import React from 'react';
import type { AIInsightsFooterProps } from './types';

const formatTimeAgo = (date: Date): string => {
  const diff = Date.now() - date.getTime();
  const seconds = Math.floor(diff / 1000);

  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
};

/**
 * AI Insights footer with status indicators
 * Max 50 lines - Single responsibility component
 */
export const AIInsightsFooter: React.FC<AIInsightsFooterProps> = React.memo(
  ({ lastUpdate }) => (
    <div className="flex items-center justify-between pt-4 border-t border-gray-600/50">
      <div className="flex items-center gap-2 text-gray-400 text-xs">
        <ClockIcon className="w-3 h-3" />
        <span>Updated {formatTimeAgo(lastUpdate)}</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse" />
        <span className="text-xs text-gray-400">AI Active</span>
      </div>
    </div>
  ),
);

AIInsightsFooter.displayName = 'AIInsightsFooter';
