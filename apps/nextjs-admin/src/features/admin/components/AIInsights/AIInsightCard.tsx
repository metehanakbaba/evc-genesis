import React from 'react';
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from '@heroicons/react/24/outline';
import type { AIInsightCardProps } from './types';
import { INSIGHT_ICONS, INSIGHT_COLORS, INSIGHT_BORDERS } from './constants';

/**
 * Individual AI insight card component
 * Max 50 lines - Single responsibility
 */
export const AIInsightCard: React.FC<AIInsightCardProps> = React.memo(
  ({ insight, index }) => {
    const IconComponent = INSIGHT_ICONS[insight.type];

    return (
      <div
        className={`group relative p-4 bg-gradient-to-r ${INSIGHT_COLORS[insight.type]} 
        border ${INSIGHT_BORDERS[insight.type]} rounded-xl backdrop-blur-xl 
        hover:scale-[1.02] transition-all duration-300 cursor-pointer`}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse opacity-60" />

        <div className="flex items-start gap-3">
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br ${INSIGHT_COLORS[insight.type]} 
          border ${INSIGHT_BORDERS[insight.type]} flex items-center justify-center`}
          >
            <IconComponent className="w-4 h-4 text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-sm font-medium text-white truncate">
                {insight.title}
              </h4>
              <span className="px-2 py-0.5 bg-white/10 text-white text-xs rounded-full">
                {insight.confidence}%
              </span>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg font-bold text-white">
                {insight.value}
              </span>
              {insight.change !== 0 && (
                <div
                  className={`flex items-center gap-1 ${
                    insight.impact === 'positive'
                      ? 'text-green-400'
                      : insight.impact === 'negative'
                        ? 'text-red-400'
                        : 'text-gray-400'
                  }`}
                >
                  {insight.impact === 'positive' ? (
                    <ArrowTrendingUpIcon className="w-3 h-3" />
                  ) : insight.impact === 'negative' ? (
                    <ArrowTrendingDownIcon className="w-3 h-3" />
                  ) : null}
                  <span className="text-xs font-medium">
                    {insight.change > 0 ? '+' : ''}
                    {insight.change}%
                  </span>
                </div>
              )}
            </div>

            <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
              {insight.description}
            </p>
          </div>
        </div>
      </div>
    );
  },
);

AIInsightCard.displayName = 'AIInsightCard';
