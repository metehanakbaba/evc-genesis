/**
 * 🔄 Infinite Scroll Trigger Hook
 * 
 * Specialized hook for infinite scroll detection with throttling.
 * Moved to shared to be reused across all data grid components.
 * 
 * @module useInfiniteScrollTrigger
 * @version 1.0.0
 * @author EV Charging Team
 */

import { useEffect, useRef, useState, useCallback } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  enabled?: boolean;
}

interface UseIntersectionObserverResult {
  ref: React.RefObject<HTMLElement | null>;
  isIntersecting: boolean;
  hasIntersected: boolean;
}

/**
 * 🚀 useIntersectionObserver Hook
 * Provides intersection detection with customizable options
 */
export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverResult => {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    triggerOnce = false,
    enabled = true,
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isCurrentlyIntersecting = entry.isIntersecting;
        
        setIsIntersecting(isCurrentlyIntersecting);
        
        if (isCurrentlyIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }

        // If triggerOnce is true, disconnect after first intersection
        if (triggerOnce && isCurrentlyIntersecting) {
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, enabled, hasIntersected]);

  return {
    ref,
    isIntersecting,
    hasIntersected,
  };
};

/**
 * 🔄 useInfiniteScrollTrigger Hook - Performance Optimized
 * Specialized hook for infinite scroll detection with throttling
 */
export const useInfiniteScrollTrigger = (
  onIntersect: () => void,
  options: {
    enabled?: boolean;
    threshold?: number;
    rootMargin?: string;
    throttleMs?: number;
  } = {}
) => {
  const {
    enabled = true,
    threshold = 0.1,
    rootMargin = '100px',
    throttleMs = 300,
  } = options;

  const lastTriggeredRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    enabled,
  });

  // ✅ Throttled callback to prevent excessive calls
  const throttledCallback = useCallback(() => {
    const now = Date.now();
    const timeSinceLastTrigger = now - lastTriggeredRef.current;

    if (timeSinceLastTrigger >= throttleMs) {
      lastTriggeredRef.current = now;
      onIntersect();
    } else {
      // Schedule for later if called too soon
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        lastTriggeredRef.current = Date.now();
        onIntersect();
      }, throttleMs - timeSinceLastTrigger);
    }
  }, [onIntersect, throttleMs]);

  useEffect(() => {
    if (isIntersecting && enabled) {
      throttledCallback();
    }
  }, [isIntersecting, enabled, throttledCallback]);

  // ✅ Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return ref;
}; 