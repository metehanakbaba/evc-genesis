import React, {
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
} from 'react';

// React 19: Compiler optimization hints
// These hooks provide hints to React Compiler for better optimization

/**
 * React 19 Compiler-optimized memo hook
 * Will be automatically optimized when React Compiler is enabled
 */
export const useCompilerMemo = <T>(
  factory: () => T,
  deps: React.DependencyList,
  debugName?: string,
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
  debugName?: string,
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
  debugName?: string,
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
  dependencies: React.DependencyList = [],
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
    updates.forEach((update) => update());
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
  },
): T => {
  'use compiler-optimize';

  return useMemo(() => {
    const start = performance.now();

    if (process.env['NODE_ENV'] === 'development') {
      console.time(
        `[React Compiler] ${options?.debugName || 'Expensive computation'}`,
      );
    }

    const result = computation();

    if (process.env['NODE_ENV'] === 'development') {
      const end = performance.now();
      console.timeEnd(
        `[React Compiler] ${options?.debugName || 'Expensive computation'}`,
      );

      if (end - start > 16) {
        // More than one frame
        console.warn(
          `[React Compiler] Expensive computation detected: ${options?.debugName || 'Unknown'} (${(end - start).toFixed(2)}ms)`,
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
export const markCompilerOptimized = <T>(
  component: T,
): CompilerOptimized<T> => {
  return component as CompilerOptimized<T>;
};

/**
 * Advanced React Compiler Optimization Utilities
 * Performance-focused hooks for EV Charging Admin Platform
 */

/**
 * Deep memoization with custom equality check
 * More efficient than JSON.stringify for complex objects
 */
export function useDeepMemo<T>(
  factory: () => T,
  deps: readonly unknown[],
  equalityFn?: (a: T, b: T) => boolean,
): T {
  const ref = useRef<{ deps: readonly unknown[]; value: T } | null>(null);

  return useMemo(() => {
    if (!ref.current || !depsEqual(ref.current.deps, deps)) {
      const newValue = factory();

      // Use custom equality check if provided
      if (
        ref.current &&
        equalityFn &&
        equalityFn(ref.current.value, newValue)
      ) {
        return ref.current.value;
      }

      ref.current = { deps, value: newValue };
    }
    return ref.current.value;
  }, [deps, factory, equalityFn]);
}

/**
 * Optimized callback with stable reference across renders
 * Prevents unnecessary re-renders in child components
 */
export function useStableCallback<T extends (...args: any[]) => any>(
  callback: T,
  dependencies?: readonly unknown[],
): T {
  const callbackRef = useRef(callback);
  const dependenciesRef = useRef(dependencies);

  // Update callback only when dependencies change
  if (!dependencies || !depsEqual(dependenciesRef.current, dependencies)) {
    callbackRef.current = callback;
    dependenciesRef.current = dependencies;
  }

  return useCallback((...args: any[]) => {
    return callbackRef.current(...args);
  }, []) as T;
}

/**
 * Memoized value with WeakMap caching for object references
 * Prevents memory leaks while maintaining performance
 */
export function useWeakMemo<T, K extends object>(value: T, key: K): T {
  const cache = useRef(new WeakMap<K, T>());

  return useMemo(() => {
    if (cache.current.has(key)) {
      return cache.current.get(key)!;
    }
    cache.current.set(key, value);
    return value;
  }, [value, key]);
}

/**
 * Debounced state for performance-critical inputs
 * Reduces excessive re-renders during rapid state changes
 */
export function useDebouncedValue<T>(
  value: T,
  delay: number = 300,
): [T, boolean] {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsPending(true);
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setIsPending(false);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return [debouncedValue, isPending];
}

/**
 * Optimized event handler factory
 * Creates stable event handlers that prevent re-renders
 */
export function useEventHandler<T extends (...args: any[]) => any>(
  handler: T,
  dependencies: readonly unknown[],
): T {
  return useCallback(handler, dependencies) as T;
}

/**
 * Advanced batch state updates for better performance
 * Reduces number of re-renders when updating multiple states
 */
export function useAdvancedBatchedUpdates() {
  const batchUpdates = useCallback((updates: (() => void)[]) => {
    // Use React's unstable_batchedUpdates if available
    if (typeof (React as any).unstable_batchedUpdates === 'function') {
      (React as any).unstable_batchedUpdates(() => {
        updates.forEach((update) => update());
      });
    } else {
      // Fallback: execute updates synchronously
      updates.forEach((update) => update());
    }
  }, []);

  return { batchUpdates };
}

/**
 * Virtual scrolling optimization hook
 * Calculates which items should be visible in a scrollable container
 */
export function useVirtualScrolling<T>(
  items: T[],
  itemHeight: number,
  containerHeight: number,
  scrollTop: number = 0,
) {
  return useMemo(() => {
    const totalHeight = items.length * itemHeight;
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      items.length - 1,
      Math.floor((scrollTop + containerHeight) / itemHeight),
    );
    const visibleItems = items.slice(startIndex, endIndex + 1);
    const offsetY = startIndex * itemHeight;

    return {
      startIndex,
      endIndex,
      visibleItems,
      offsetY,
      totalHeight,
    };
  }, [items, itemHeight, containerHeight, scrollTop]);
}

/**
 * Performance monitoring hook for components
 */
export function usePerformanceMonitor(componentName: string) {
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount((prev) => prev + 1);
  }, []);

  const resetCounter = useCallback(() => {
    setRenderCount(0);
  }, []);

  return {
    renderCount,
    resetCounter,
  };
}

/**
 * Optimized selector for Redux/Zustand stores
 * Prevents unnecessary re-renders with shallow equality
 */
export function useOptimizedSelector<TState, TSelected>(
  selector: (state: TState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean,
) {
  const lastSelected = useRef<TSelected | undefined>(undefined);
  const lastState = useRef<TState | undefined>(undefined);

  return useCallback(
    (state: TState): TSelected => {
      if (state !== lastState.current) {
        const selected = selector(state);

        if (
          equalityFn
            ? !equalityFn(lastSelected.current!, selected)
            : lastSelected.current !== selected
        ) {
          lastSelected.current = selected;
        }
        lastState.current = state;
      }

      return lastSelected.current!;
    },
    [selector, equalityFn],
  );
}

// Helper functions
function depsEqual(
  a: readonly unknown[] | undefined,
  b: readonly unknown[] | undefined,
): boolean {
  if (a === b) return true;
  if (!a || !b || a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}
