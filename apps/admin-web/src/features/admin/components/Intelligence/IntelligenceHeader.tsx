import React from 'react';
import type { IntelligenceHeaderProps } from './types';

/**
 * Intelligence section header with AI status indicator
 * Max 50 lines - Single responsibility component
 */
export const IntelligenceHeader: React.FC<IntelligenceHeaderProps> = React.memo(
  ({ title, description }) => (
    <div className="flex items-center gap-6 mb-8">
      <div className="flex items-center gap-4">
        <div className="w-3 h-8 bg-gradient-to-b from-purple-500 via-pink-400 to-rose-500 rounded-full" />
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">{title}</h2>
          <p className="text-gray-400">{description}</p>
        </div>
      </div>

      {/* AI Status Indicator */}
      <div className="ml-auto flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-500/20 via-pink-400/15 to-rose-500/10 border border-purple-400/30 rounded-full backdrop-blur-xl">
          <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" />
          <span className="text-sm text-purple-200 font-medium">AI Active</span>
        </div>
      </div>
    </div>
  ),
);

IntelligenceHeader.displayName = 'IntelligenceHeader';
