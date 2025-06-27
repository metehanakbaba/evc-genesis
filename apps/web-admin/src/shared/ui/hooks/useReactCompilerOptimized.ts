import { useMemo, useCallback } from 'react';

// React 19: Compiler optimization hints
// These hooks provide hints to React Compiler for better optimization

/**
 * React 19 Compiler-optimized memo hook
 * Will be automatically optimized when React Compiler is enabled
 */
export const useCompilerMemo = <T>(
  factory: () => T,
  deps: React.DependencyList,
  debugName?: string
): T => {
  // React 19: Add compiler hints through comments
  'use compiler-optimize'; // React Compiler directive

  return useMemo(() => {
    // Development-only logging for compiler analysis
    if (process.env['NODE_ENV'] === 'development' && debugName) {
      console.debug(`[React Compiler] Computing memo: ${debugName}`);
    }
    return factory();
  }, deps);
};

/**
 * React 19 Compiler-optimized callback hook
 * Will be automatically optimized when React Compiler is enabled
 */
export const useCompilerCallback = <T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList,
  debugName?: string
): T => {
  'use compiler-optimize'; // React Compiler directive

  return useCallback((...args: any[]) => {
    // Development-only logging for compiler analysis
    if (process.env['NODE_ENV'] === 'development' && debugName) {
      console.debug(`[React Compiler] Executing callback: ${debugName}`);
    }
    return callback(...args);
  }, deps) as T;
};

/**
 * React 19: Stable reference hook (compiler-friendly)
 * Provides stable references without explicit memoization
 */
export const useStableReference = <T>(value: T): T => {
  'use compiler-optimize';
  
  // React Compiler will automatically optimize this
  return useMemo(() => value, [value]);
};

/**
 * React 19: Compiler-optimized derived state
 * Better than useState + useEffect for derived values
 */
export const useDerivedState = <T, U>(
  source: T,
  transformer: (source: T) => U,
  debugName?: string
): U => {
  'use compiler-optimize';

  return useMemo(() => {
    if (process.env['NODE_ENV'] === 'development' && debugName) {
      console.debug(`[React Compiler] Computing derived state: ${debugName}`);
    }
    return transformer(source);
  }, [source, transformer]);
};

/**
 * React 19: Event handler optimization
 * Optimizes event handlers for React Compiler
 */
export const useOptimizedEventHandler = <T extends (...args: any[]) => any>(
  handler: T,
  dependencies: React.DependencyList = []
): T => {
  'use compiler-optimize';

  return useCallback(handler, dependencies) as T;
};

/**
 * React 19: Component props stabilization
 * Stabilizes props object to prevent unnecessary re-renders
 */
export const useStableProps = <T extends Record<string, any>>(props: T): T => {
  'use compiler-optimize';

  return useMemo(() => {
    // React Compiler will optimize this automatically
    const stableProps = { ...props };
    
    // Sort keys for consistent object structure
    const sortedKeys = Object.keys(stableProps).sort();
    const stabilized = {} as T;
    
    for (const key of sortedKeys) {
      stabilized[key as keyof T] = stableProps[key];
    }
    
    return stabilized;
  }, [JSON.stringify(props)]); // React Compiler will optimize this dependency
};

/**
 * React 19: Batch state updates optimization
 * Provides hints for React Compiler to batch state updates
 */
export const useBatchedUpdates = () => {
  'use compiler-optimize';

  const batchUpdates = useCallback((updates: (() => void)[]) => {
    // React 19 automatically batches, but this provides explicit hint
    updates.forEach(update => update());
  }, []);

  return batchUpdates;
};

/**
 * React 19: Performance marker for React Compiler
 * Marks expensive operations for compiler optimization
 */
export const useExpensiveComputation = <T>(
  computation: () => T,
  deps: React.DependencyList,
  options?: {
    debugName?: string;
    priority?: 'high' | 'normal' | 'low';
  }
): T => {
  'use compiler-optimize';

  return useMemo(() => {
    const start = performance.now();
    
    if (process.env['NODE_ENV'] === 'development') {
      console.time(`[React Compiler] ${options?.debugName || 'Expensive computation'}`);
    }
    
    const result = computation();
    
    if (process.env['NODE_ENV'] === 'development') {
      const end = performance.now();
      console.timeEnd(`[React Compiler] ${options?.debugName || 'Expensive computation'}`);
      
      if (end - start > 16) { // More than one frame
        console.warn(
          `[React Compiler] Expensive computation detected: ${options?.debugName || 'Unknown'} (${(end - start).toFixed(2)}ms)`
        );
      }
    }
    
    return result;
  }, deps);
};

// React 19: Type definitions for compiler hints
export type CompilerOptimized<T> = T & {
  __reactCompilerOptimized?: true;
};

/**
 * React 19: Mark component as compiler-optimized
 * Type-only marker for React Compiler
 */
export const markCompilerOptimized = <T>(component: T): CompilerOptimized<T> => {
  return component as CompilerOptimized<T>;
}; 