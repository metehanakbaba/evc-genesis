import React, { useState, useEffect, useCallback } from 'react';
import { AIInsightsHeader } from './AIInsightsHeader';
import { AIInsightCard } from './AIInsightCard';
import { AIInsightsFooter } from './AIInsightsFooter';
import { MOCK_INSIGHTS } from './constants';

/**
 * Main AI Insights Widget - Orchestrates child components
 * Max 50 lines - Single responsibility orchestrator
 */
export const AIInsightsWidget: React.FC = React.memo(() => {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const handleRefresh = useCallback(async (): Promise<void> => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLastUpdate(new Date());
    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-800/60 via-gray-700/40 to-gray-800/60 border border-gray-600 rounded-2xl p-6 backdrop-blur-xl shadow-lg relative">
      <AIInsightsHeader
        title="AI Insights"
        description="Real-time intelligence"
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {MOCK_INSIGHTS.map((insight, index) => (
          <AIInsightCard key={insight.id} insight={insight} index={index} />
        ))}
      </div>

      <AIInsightsFooter lastUpdate={lastUpdate} />

      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none rounded-2xl">
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-2xl animate-pulse" />
        <div
          className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </div>
    </div>
  );
});

AIInsightsWidget.displayName = 'AIInsightsWidget';
