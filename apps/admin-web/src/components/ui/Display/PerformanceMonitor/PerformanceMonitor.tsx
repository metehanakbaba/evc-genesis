import React, { useState, useEffect } from 'react';

interface PerformanceMetrics {
  bundleSize: number;
  renderCount: number;
  memoryUsage: number;
  loadTime: number;
  apiCalls: number;
  cacheHitRate: number;
}

interface PerformanceMonitorProps {
  enabled?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  showDetails?: boolean;
}

/**
 * Development Performance Monitor
 * Shows real-time performance metrics in development mode
 */
export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  enabled = false,
  position = 'bottom-right',
  showDetails = false,
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    bundleSize: 0,
    renderCount: 0,
    memoryUsage: 0,
    loadTime: 0,
    apiCalls: 0,
    cacheHitRate: 85, // Mock value for now
  });

  useEffect(() => {
    if (!enabled) return;

    const updateMetrics = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const memory = (performance as any).memory;

      setMetrics(prev => ({
        ...prev,
        bundleSize: Math.round(performance.getEntriesByType('resource').length / 10),
        renderCount: prev.renderCount + 1,
        memoryUsage: memory ? Math.round(memory.usedJSHeapSize / 1024 / 1024) : 0,
        loadTime: navigation ? Math.round(navigation.loadEventEnd - navigation.fetchStart) : 0,
        apiCalls: prev.apiCalls,
        cacheHitRate: 85, // Mock value
      }));
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 2000);

    return () => clearInterval(interval);
  }, [enabled]);

  if (!enabled) return null;

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50 pointer-events-none`}>
      <div className="bg-black/80 backdrop-blur-sm border border-gray-600 rounded-lg p-3 text-xs text-white font-mono shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="font-medium">Performance</span>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between gap-3">
            <span>Memory:</span>
            <span className="text-green-400">{metrics.memoryUsage}MB</span>
          </div>
          <div className="flex justify-between gap-3">
            <span>Load:</span>
            <span className="text-blue-400">{metrics.loadTime}ms</span>
          </div>
          {showDetails && (
            <>
              <div className="flex justify-between gap-3">
                <span>Renders:</span>
                <span className="text-yellow-400">{metrics.renderCount}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span>Resources:</span>
                <span className="text-purple-400">{metrics.bundleSize}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span>Cache:</span>
                <span className="text-cyan-400">{Math.round(metrics.cacheHitRate)}%</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Hook for monitoring component performance
 */
export function useComponentPerformance(componentName: string) {
  const [renderTimes, setRenderTimes] = useState<number[]>([]);
  const startTime = React.useRef<number>(0);

  useEffect(() => {
    startTime.current = performance.now();
  });

  useEffect(() => {
    if (startTime.current) {
      const renderTime = performance.now() - startTime.current;
      setRenderTimes(prev => [...prev.slice(-9), renderTime]); // Keep last 10 renders
      
      if (renderTime > 16) { // More than one frame
        console.warn(`[Performance] Slow render in ${componentName}: ${renderTime.toFixed(2)}ms`);
      }
    }
  });

  const averageRenderTime = renderTimes.length > 0 
    ? renderTimes.reduce((sum, time) => sum + time, 0) / renderTimes.length 
    : 0;

  return {
    renderTimes,
    averageRenderTime,
    lastRenderTime: renderTimes[renderTimes.length - 1] || 0,
  };
} 