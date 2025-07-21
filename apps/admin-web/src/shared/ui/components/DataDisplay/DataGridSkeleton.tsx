/**
 * 💀 Data Grid Skeleton Components
 * 
 * Generic skeleton components for loading states.
 * Used across all data grid implementations.
 * 
 * @module DataGridSkeleton
 * @version 1.0.0
 * @author EV Charging Team
 */

import type React from 'react';

/**
 * 🔄 Load More Skeleton
 * Shows loading animation while fetching more items
 */
export const LoadMoreSkeleton: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-6 lg:py-8">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 border-2 border-gray-600 border-t-blue-400 rounded-full animate-spin"></div>
        <span className="text-gray-400 font-medium">Loading more items...</span>
        <div className="flex gap-1">
          <div 
            className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" 
            style={{ animationDelay: '0ms' }}
          ></div>
          <div 
            className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" 
            style={{ animationDelay: '200ms' }}
          ></div>
          <div 
            className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" 
            style={{ animationDelay: '400ms' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

/**
 * 🏁 End of List Indicator
 * Shows when all items have been loaded
 */
export interface EndOfListIndicatorProps {
  readonly total: number;
  readonly itemName?: string;
  readonly variant?: 'default' | 'minimal';
}

export const EndOfListIndicator: React.FC<EndOfListIndicatorProps> = ({
  total,
  itemName = 'items',
  variant = 'default',
}) => {
  if (variant === 'minimal') {
    return (
      <div className="mt-6 lg:mt-8 flex flex-col items-center justify-center py-4 text-center">
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-4"></div>
        <p className="text-gray-400 text-sm">
          All {total} {itemName} loaded
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 lg:mt-8 flex flex-col items-center justify-center py-6 lg:py-8 text-center">
      <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mb-3">
        <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
      </div>
      
      <h3 className="text-white font-semibold mb-1">All {itemName} loaded</h3>
      <p className="text-gray-400 text-sm">
        Showing all {total} {itemName}
      </p>
      
      <div className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
    </div>
  );
};

/**
 * 🎴 Grid Item Skeleton
 * Skeleton placeholder for individual grid items
 */
export interface GridItemSkeletonProps {
  readonly className?: string;
  readonly animated?: boolean;
}

export const GridItemSkeleton: React.FC<GridItemSkeletonProps> = ({
  className = '',
  animated = true,
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 bg-gray-700 rounded-xl ${animated ? 'animate-pulse' : ''}`}></div>
          <div className="space-y-2">
            <div className={`h-4 w-20 bg-gray-700 rounded ${animated ? 'animate-pulse' : ''}`}></div>
            <div className={`h-5 w-32 bg-gray-600 rounded ${animated ? 'animate-pulse' : ''}`}></div>
          </div>
        </div>
        <div className={`h-6 w-16 bg-gray-700 rounded-full ${animated ? 'animate-pulse' : ''}`}></div>
      </div>
      
      {/* Content skeleton */}
      <div className="space-y-3">
        <div className={`h-4 w-full bg-gray-700 rounded ${animated ? 'animate-pulse' : ''}`}></div>
        <div className={`h-4 w-3/4 bg-gray-700 rounded ${animated ? 'animate-pulse' : ''}`}></div>
        <div className={`h-4 w-1/2 bg-gray-700 rounded ${animated ? 'animate-pulse' : ''}`}></div>
      </div>
      
      {/* Action buttons skeleton */}
      <div className="flex gap-2 pt-4">
        <div className={`flex-1 h-9 bg-gray-700 rounded ${animated ? 'animate-pulse' : ''}`}></div>
        <div className={`w-9 h-9 bg-gray-700 rounded ${animated ? 'animate-pulse' : ''}`}></div>
      </div>
    </div>
  );
};

/**
 * 🗂️ Grid Skeleton
 * Full grid skeleton with multiple items
 */
export interface GridSkeletonProps {
  readonly itemCount?: number;
  readonly columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
  readonly className?: string;
}

export const GridSkeleton: React.FC<GridSkeletonProps> = ({
  itemCount = 6,
  columns = {
    sm: 1,
    md: 2,
    lg: 2,
    xl: 3,
    '2xl': 4,
  },
  className = '',
}) => {
  // Generate grid classes from columns config
  const gridCols = `
    grid-cols-${columns.sm || 1}
    md:grid-cols-${columns.md || 2}
    lg:grid-cols-${columns.lg || 2}
    xl:grid-cols-${columns.xl || 3}
    2xl:grid-cols-${columns['2xl'] || 4}
  `.replace(/\s+/g, ' ').trim();

  return (
    <div className={`grid ${gridCols} gap-4 lg:gap-5 xl:gap-6 ${className}`}>
      {Array.from({ length: itemCount }).map((_, index) => (
        <div
          key={index}
          className="relative p-4 lg:p-5 bg-gray-800/40 border border-gray-700/50 rounded-xl lg:rounded-2xl backdrop-blur-xl min-h-[280px]"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <GridItemSkeleton />
        </div>
      ))}
    </div>
  );
};

export default {
  LoadMoreSkeleton,
  EndOfListIndicator,
  GridItemSkeleton,
  GridSkeleton,
}; 