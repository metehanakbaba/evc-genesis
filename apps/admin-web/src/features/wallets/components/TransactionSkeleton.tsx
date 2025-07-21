/**
 * 💀 Transaction Skeleton Components
 *
 * Animated skeleton loaders for transaction components.
 * Provides smooth loading states for infinite scroll.
 *
 * @module TransactionSkeleton
 * @version 1.0.0
 * @author EV Charging Team
 */

import type React from 'react';

/**
 * 🎨 Base Skeleton Component
 */
const Skeleton: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ className = '', children }) => (
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
 * 🃏 Transaction Grid Skeleton
 * Skeleton for grid card layout
 */
export const TransactionGridSkeleton: React.FC<{ count?: number }> = ({
  count = 6,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={`grid-skeleton-${index}`}
          className="group relative"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Card Container */}
          <div className="relative p-6 bg-gradient-to-br from-gray-800/40 via-gray-700/20 to-transparent border border-gray-700/30 rounded-2xl backdrop-blur-xl">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {/* Icon */}
                <Skeleton className="w-12 h-12 rounded-xl" />

                <div className="space-y-2">
                  {/* Type Label */}
                  <Skeleton className="h-4 w-16 rounded" />
                  {/* Amount */}
                  <Skeleton className="h-6 w-24 rounded" />
                </div>
              </div>

              {/* Status Badge */}
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>

            {/* Description */}
            <div className="mb-4">
              <Skeleton className="h-4 w-full rounded mb-2" />
              <Skeleton className="h-4 w-3/4 rounded" />
            </div>

            {/* Details */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <Skeleton className="h-3 w-20 rounded" />
                <Skeleton className="h-3 w-16 rounded" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-3 w-12 rounded" />
                <Skeleton className="h-3 w-24 rounded" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
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
 * 📋 Transaction Table Skeleton
 * Skeleton for table row layout
 */
export const TransactionTableSkeleton: React.FC<{ count?: number }> = ({
  count = 10,
}) => {
  return (
    <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl overflow-hidden backdrop-blur-xl">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700/30 border-b border-gray-600/30">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                Type
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                Amount
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                Status
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                Description
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                Date
              </th>
              <th className="text-right py-4 px-6 text-sm font-medium text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/30">
            {Array.from({ length: count }, (_, index) => (
              <tr
                key={`table-skeleton-${index}`}
                className="hover:bg-gray-700/20 transition-colors"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Type */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-8 h-8 rounded-lg" />
                    <Skeleton className="h-4 w-16 rounded" />
                  </div>
                </td>

                {/* Amount */}
                <td className="py-4 px-6">
                  <Skeleton className="h-5 w-20 rounded" />
                </td>

                {/* Status */}
                <td className="py-4 px-6">
                  <Skeleton className="h-6 w-24 rounded-full" />
                </td>

                {/* Description */}
                <td className="py-4 px-6">
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-48 rounded" />
                    <Skeleton className="h-3 w-20 rounded" />
                  </div>
                </td>

                {/* Date */}
                <td className="py-4 px-6">
                  <Skeleton className="h-4 w-24 rounded" />
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
        <div className="w-6 h-6 border-2 border-gray-600 border-t-teal-400 rounded-full animate-spin"></div>

        {/* Text */}
        <span className="text-gray-400 font-medium">
          Loading more transactions...
        </span>

        {/* Dots Animation */}
        <div className="flex gap-1">
          <div
            className="w-1 h-1 bg-teal-400 rounded-full animate-pulse"
            style={{ animationDelay: '0ms' }}
          ></div>
          <div
            className="w-1 h-1 bg-teal-400 rounded-full animate-pulse"
            style={{ animationDelay: '200ms' }}
          ></div>
          <div
            className="w-1 h-1 bg-teal-400 rounded-full animate-pulse"
            style={{ animationDelay: '400ms' }}
          ></div>
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
      <div className="w-12 h-12 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-full flex items-center justify-center mb-3">
        <div className="w-6 h-6 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full"></div>
      </div>

      <h3 className="text-white font-semibold mb-1">All transactions loaded</h3>
      <p className="text-gray-400 text-sm">Showing all {total} transactions</p>

      <div className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
    </div>
  );
};
