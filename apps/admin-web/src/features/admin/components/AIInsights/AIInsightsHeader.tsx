import { ArrowPathIcon, SparklesIcon } from '@heroicons/react/24/outline';
import React from 'react';
import type { AIInsightsHeaderProps } from './types';

/**
 * AI Insights widget header with refresh functionality
 * Max 50 lines - Single responsibility component
 */
export const AIInsightsHeader: React.FC<AIInsightsHeaderProps> = React.memo(
  ({ title, description, isRefreshing, onRefresh }) => (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/30 via-pink-400/20 to-rose-500/25 border border-purple-400/40 flex items-center justify-center backdrop-blur-xl">
          <SparklesIcon className="w-5 h-5 text-purple-300" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
      </div>

      <button
        onClick={onRefresh}
        disabled={isRefreshing}
        className="p-2 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600 rounded-lg transition-all duration-200 group"
        type="button"
      >
        <ArrowPathIcon
          className={`w-4 h-4 text-gray-300 transition-transform duration-500 ${
            isRefreshing ? 'animate-spin' : 'group-hover:rotate-180'
          }`}
        />
      </button>
    </div>
  ),
);

AIInsightsHeader.displayName = 'AIInsightsHeader';
