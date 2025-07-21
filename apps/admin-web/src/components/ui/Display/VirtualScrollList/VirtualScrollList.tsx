import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useVirtualScrolling } from '@/shared/ui/hooks/useReactCompilerOptimized';

interface VirtualScrollListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  overscan?: number; // Number of items to render outside visible area
  onScroll?: (scrollTop: number) => void;
  loading?: boolean;
  loadingComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
}

/**
 * High-performance virtual scrolling list component
 * Optimized for rendering thousands of items efficiently
 */
export function VirtualScrollList<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  className = '',
  overscan = 5,
  onScroll,
  loading = false,
  loadingComponent,
  emptyComponent,
}: VirtualScrollListProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const { startIndex, offsetY, totalHeight } = useVirtualScrolling(
    items,
    itemHeight,
    containerHeight,
  );

  // Calculate which items to render with overscan
  const startWithOverscan = Math.max(0, startIndex - overscan);
  const endWithOverscan = Math.min(
    items.length,
    startIndex + Math.ceil(containerHeight / itemHeight) + overscan * 2,
  );
  const itemsToRender = items.slice(startWithOverscan, endWithOverscan);

  // Memoized render function for performance
  const renderItems = useMemo(() => {
    return itemsToRender.map((item, index) => {
      const actualIndex = startWithOverscan + index;
      return (
        <div
          key={actualIndex}
          style={{
            position: 'absolute',
            top: actualIndex * itemHeight,
            left: 0,
            right: 0,
            height: itemHeight,
          }}
        >
          {renderItem(item, actualIndex)}
        </div>
      );
    });
  }, [itemsToRender, startWithOverscan, itemHeight, renderItem]);

  // Optimized scroll handler
  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const newScrollTop = event.currentTarget.scrollTop;
      setScrollTop(newScrollTop);
      onScroll?.(newScrollTop);
    },
    [onScroll],
  );

  // Scroll restoration effect
  useEffect(() => {
    if (containerRef.current && scrollTop !== containerRef.current.scrollTop) {
      containerRef.current.scrollTop = scrollTop;
    }
  }, [scrollTop]);

  // Loading state
  if (loading) {
    return (
      <div
        className={`relative ${className}`}
        style={{ height: containerHeight }}
      >
        {loadingComponent || (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>
    );
  }

  // Empty state
  if (items.length === 0) {
    return (
      <div
        className={`relative ${className}`}
        style={{ height: containerHeight }}
      >
        {emptyComponent || (
          <div className="flex items-center justify-center h-full text-gray-500">
            No items to display
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-auto ${className}`}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      {/* Total height spacer */}
      <div style={{ height: totalHeight, position: 'relative' }}>
        {/* Visible items container */}
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: 'relative',
          }}
        >
          {renderItems}
        </div>
      </div>
    </div>
  );
}

/**
 * Memoized version for better performance
 */
export const MemoizedVirtualScrollList = React.memo(
  VirtualScrollList,
) as typeof VirtualScrollList;

/**
 * Hook for managing virtual scroll state externally
 */
export function useVirtualScrollState(initialScrollTop = 0) {
  const [scrollTop, setScrollTop] = useState(initialScrollTop);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>(null);

  const handleScroll = useCallback((newScrollTop: number) => {
    setScrollTop(newScrollTop);
    setIsScrolling(true);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
  }, []);

  const scrollTo = useCallback((position: number) => {
    setScrollTop(position);
  }, []);

  const scrollToItem = useCallback((itemIndex: number, itemHeight: number) => {
    const position = itemIndex * itemHeight;
    setScrollTop(position);
  }, []);

  return {
    scrollTop,
    isScrolling,
    handleScroll,
    scrollTo,
    scrollToItem,
  };
}

/**
 * Performance metrics for virtual scrolling
 */
export function useVirtualScrollMetrics<T>(
  items: T[],
  containerHeight: number,
  itemHeight: number,
) {
  return useMemo(() => {
    const visibleItemCount = Math.ceil(containerHeight / itemHeight);
    const renderRatio = visibleItemCount / items.length;
    const memoryUsage = visibleItemCount * 1000; // Approximate memory per item in bytes

    return {
      totalItems: items.length,
      visibleItems: visibleItemCount,
      renderRatio: Math.min(renderRatio, 1),
      estimatedMemoryUsage: memoryUsage,
      performanceGain:
        items.length > visibleItemCount ? items.length / visibleItemCount : 1,
    };
  }, [items.length, containerHeight, itemHeight]);
}
