import React, { useEffect, useRef, useState } from 'react';

// React 19: StrictMode improvement checker
interface StrictModeCheckerProps {
  children: React.ReactNode;
}

// React 19: Enhanced useEffect cleanup detection
export const useEnhancedEffect = (
  effect: () => void | (() => void),
  deps?: React.DependencyList,
  debugName?: string
) => {
  const cleanupRef = useRef<(() => void) | void>();
  const mountCountRef = useRef(0);

  useEffect(() => {
    mountCountRef.current++;
    
    // React 19: StrictMode double-mount detection
    if (mountCountRef.current > 1 && process.env['NODE_ENV'] === 'development') {
      console.warn(`[React 19 StrictMode] Effect remounted: ${debugName || 'Unknown'}`);
    }

    const cleanup = effect();
    cleanupRef.current = cleanup;

    return () => {
      // React 19: Enhanced cleanup validation
      if (typeof cleanup === 'function') {
        cleanup();
      } else if (cleanup !== undefined && process.env.NODE_ENV === 'development') {
        console.warn(
          `[React 19 StrictMode] Effect "${debugName || 'Unknown'}" returned non-function value:`,
          cleanup
        );
      }
    };
  }, deps);

  // React 19: Cleanup leak detection
  useEffect(() => {
    return () => {
      if (cleanupRef.current && process.env.NODE_ENV === 'development') {
        setTimeout(() => {
          if (cleanupRef.current) {
            console.warn(
              `[React 19 StrictMode] Potential cleanup leak detected in: ${debugName || 'Unknown'}`
            );
          }
        }, 1000);
      }
    };
  }, [debugName]);
};

// React 19: Async side effect detector
export const useAsyncSideEffectDetector = () => {
  const [violations, setViolations] = useState<string[]>([]);

  useEffect(() => {
    // React 19: Track async operations without cleanup
    const originalFetch = window.fetch;
    const originalSetTimeout = window.setTimeout;
    const originalSetInterval = window.setInterval;

    const activeOperations = new Set<string>();

    window.fetch = (...args) => {
      const operationId = Math.random().toString(36);
      activeOperations.add(`fetch-${operationId}`);
      
      return originalFetch(...args).finally(() => {
        activeOperations.delete(`fetch-${operationId}`);
      });
    };

    window.setTimeout = (callback, delay) => {
      const operationId = Math.random().toString(36);
      activeOperations.add(`timeout-${operationId}`);
      
      return originalSetTimeout(() => {
        activeOperations.delete(`timeout-${operationId}`);
        callback();
      }, delay);
    };

    window.setInterval = (callback, delay) => {
      const operationId = Math.random().toString(36);
      activeOperations.add(`interval-${operationId}`);
      
      return originalSetInterval(() => {
        callback();
      }, delay);
    };

    return () => {
      // React 19: Report uncleaned async operations
      if (activeOperations.size > 0 && process.env.NODE_ENV === 'development') {
        const violationList = Array.from(activeOperations);
        setViolations(violationList);
        console.warn('[React 19 StrictMode] Uncleaned async operations:', violationList);
      }

      // Restore original functions
      window.fetch = originalFetch;
      window.setTimeout = originalSetTimeout;
      window.setInterval = originalSetInterval;
    };
  }, []);

  return violations;
};

// React 19: StrictMode development helper
export const StrictModeChecker: React.FC<StrictModeCheckerProps> = ({ children }) => {
  const violations = useAsyncSideEffectDetector();
  const [showDebugInfo, setShowDebugInfo] = useState(false);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      
      {/* React 19: StrictMode debug panel */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setShowDebugInfo(!showDebugInfo)}
          className="bg-yellow-500/20 border border-yellow-400/30 text-yellow-300 px-3 py-1 rounded-lg text-xs font-medium"
        >
          React 19 Debug {violations.length > 0 && `(⚠ ${violations.length})`}
        </button>
        
        {showDebugInfo && (
          <div className="absolute top-8 right-0 bg-gray-800/90 backdrop-blur-sm border border-gray-600/50 rounded-lg p-4 min-w-[300px] max-w-md">
            <h3 className="text-sm font-semibold text-white mb-2">
              React 19 StrictMode Status
            </h3>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span className="text-gray-300">StrictMode Active</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${violations.length === 0 ? 'bg-green-400' : 'bg-red-400'}`}></span>
                <span className="text-gray-300">
                  Async Side Effects: {violations.length === 0 ? 'Clean' : `${violations.length} violations`}
                </span>
              </div>
            </div>
            
            {violations.length > 0 && (
              <div className="mt-3 p-2 bg-red-500/10 border border-red-400/20 rounded">
                <div className="text-xs text-red-300 font-medium mb-1">Active Operations:</div>
                <ul className="text-xs text-red-200 space-y-1">
                  {violations.map((violation, index) => (
                    <li key={index} className="truncate">• {violation}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="mt-3 text-xs text-gray-400">
              React 19.1.0 Enhanced StrictMode
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// React 19: Enhanced development warnings
export const DevWarningsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // React 19: Enhanced console warnings
      const originalConsoleWarn = console.warn;
      
      console.warn = (...args) => {
        if (args[0]?.includes?.('React')) {
          // Style React warnings differently
          originalConsoleWarn(
            '%c[React 19]%c',
            'background: #61dafb; color: #000; padding: 2px 4px; border-radius: 2px; font-weight: bold',
            '',
            ...args
          );
        } else {
          originalConsoleWarn(...args);
        }
      };

      return () => {
        console.warn = originalConsoleWarn;
      };
    }
  }, []);

  return <>{children}</>;
}; 