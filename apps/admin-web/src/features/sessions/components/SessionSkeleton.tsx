/**
 * 💀 Session Skeleton Components
 * 
 * Animated skeleton loaders for session components.
 * Provides smooth loading states for infinite scroll.
 * 
 * @module SessionSkeleton
 * @version 1.0.0
 * @author EV Charging Team
 */

import type React from 'react';

/**
 * 🎨 Base Skeleton Component
 */
const Skeleton: React.FC<{ className?: string; children?: React.ReactNode }> = ({ 
  className = "", 
  children 
}) => (
  <div 
    className={`animate-pulse bg-gradient-to-r from-gray-700/40 via-gray-600/20 to-gray-700/40 bg-[length:200%_100%] ${className}`}
    style={{
      animation: 'shimmer 2s ease-in-out infinite',
    }}
  >
    {children}
    <style jsx>{`
      @keyframes shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `}</style>
  </div>
);

/**
 * 🃏 Session Grid Skeleton
 * Skeleton for grid card layout
 */
export const SessionGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={`grid-skeleton-${index}`}
          className="group relative"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Card Container */}
          <div className="relative p-6 bg-gradient-to-br from-gray-800/40 via-gray-700/20 to-transparent border border-gray-700/30 rounded-2xl backdrop-blur-xl h-[320px] flex flex-col">
            
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {/* Icon */}
                <Skeleton className="w-12 h-12 rounded-xl" />
                
                <div className="space-y-2">
                  {/* Status Label */}
                  <Skeleton className="h-4 w-16 rounded" />
                  {/* Session ID */}
                  <Skeleton className="h-6 w-24 rounded" />
                </div>
              </div>
              
              {/* Power Output */}
              <div className="text-right space-y-1">
                <Skeleton className="h-8 w-16 rounded" />
                <Skeleton className="h-3 w-12 rounded" />
              </div>
            </div>

            {/* Station & User Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <Skeleton className="w-4 h-4 rounded" />
                <Skeleton className="h-4 w-32 rounded" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="w-4 h-4 rounded" />
                <Skeleton className="h-4 w-28 rounded" />
              </div>
            </div>

            {/* Energy & Cost Display */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                <Skeleton className="h-6 w-12 rounded mx-auto mb-1" />
                <Skeleton className="h-3 w-16 rounded mx-auto" />
              </div>
              <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                <Skeleton className="h-6 w-16 rounded mx-auto mb-1" />
                <Skeleton className="h-3 w-14 rounded mx-auto" />
              </div>
            </div>

            {/* Timeline */}
            <div className="flex items-center justify-between text-sm mb-4">
              <div className="flex items-center gap-1">
                <Skeleton className="w-4 h-4 rounded" />
                <Skeleton className="h-4 w-20 rounded" />
              </div>
              <Skeleton className="h-4 w-12 rounded" />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-auto">
              <Skeleton className="flex-1 h-9 rounded-lg" />
              <Skeleton className="w-9 h-9 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * 📋 Session Table Skeleton
 * Skeleton for table row layout
 */
export const SessionTableSkeleton: React.FC<{ count?: number }> = ({ count = 10 }) => {
  return (
    <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl overflow-hidden backdrop-blur-xl">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700/30 border-b border-gray-600/30">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Session</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Status</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Station</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">User</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Power</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Energy</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Cost</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">Duration</th>
              <th className="text-right py-4 px-6 text-sm font-medium text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/30">
            {Array.from({ length: count }, (_, index) => (
              <tr 
                key={`table-skeleton-${index}`}
                className="hover:bg-gray-700/20 transition-colors"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Session */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-8 h-8 rounded-lg" />
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-16 rounded" />
                      <Skeleton className="h-3 w-12 rounded" />
                    </div>
                  </div>
                </td>
                
                {/* Status */}
                <td className="py-4 px-6">
                  <Skeleton className="h-6 w-20 rounded-full" />
                </td>
                
                {/* Station */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-4 h-4 rounded" />
                    <Skeleton className="h-4 w-32 rounded" />
                  </div>
                </td>
                
                {/* User */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-4 h-4 rounded" />
                    <Skeleton className="h-4 w-28 rounded" />
                  </div>
                </td>
                
                {/* Power */}
                <td className="py-4 px-6">
                  <Skeleton className="h-5 w-16 rounded" />
                </td>
                
                {/* Energy */}
                <td className="py-4 px-6">
                  <Skeleton className="h-5 w-20 rounded" />
                </td>
                
                {/* Cost */}
                <td className="py-4 px-6">
                  <Skeleton className="h-5 w-18 rounded" />
                </td>
                
                {/* Duration */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-1">
                    <Skeleton className="w-4 h-4 rounded" />
                    <Skeleton className="h-4 w-16 rounded" />
                  </div>
                </td>
                
                {/* Actions */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 justify-end">
                    <Skeleton className="w-8 h-8 rounded-lg" />
                    <Skeleton className="w-8 h-8 rounded-lg" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/**
 * 🔄 Load More Skeleton
 * Skeleton for load more trigger area
 */
export const LoadMoreSkeleton: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="flex items-center gap-3">
        {/* Spinner */}
        <div className="w-6 h-6 border-2 border-gray-600 border-t-emerald-400 rounded-full animate-spin"></div>
        
        {/* Text */}
        <span className="text-gray-400 font-medium">Loading more sessions...</span>
        
        {/* Dots Animation */}
        <div className="flex gap-1">
          <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
          <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
          <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
        </div>
      </div>
    </div>
  );
};

/**
 * 🎯 End of List Indicator
 * Shows when no more data to load
 */
export const EndOfListIndicator: React.FC<{ total: number }> = ({ total }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full flex items-center justify-center mb-3">
        <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full"></div>
      </div>
      
      <h3 className="text-white font-semibold mb-1">All sessions loaded</h3>
      <p className="text-gray-400 text-sm">
        Showing all {total} sessions
      </p>
      
      <div className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
    </div>
  );
}; 