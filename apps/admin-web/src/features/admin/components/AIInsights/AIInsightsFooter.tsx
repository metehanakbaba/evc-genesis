import { ClockIcon } from '@heroicons/react/24/outline';
import React from 'react';
import type { AIInsightsFooterProps } from './types';
// ✅ Import shared business logic
import { formatTimeAgo } from '@evc/shared-business-logic';

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
