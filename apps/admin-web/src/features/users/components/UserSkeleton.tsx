/**
 * 💀 User Skeleton Components
 *
 * Animated skeleton loaders for user components.
 * Provides smooth loading states for infinite scroll.
 *
 * @module UserSkeleton
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
 * 🃏 User Grid Skeleton
 * Skeleton for grid card layout
 */
export const UserGridSkeleton: React.FC<{ count?: number }> = ({
  count = 6,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={`user-grid-skeleton-${index}`}
          className="group relative"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* User Card Container */}
          <div className="relative p-6 bg-gradient-to-br from-gray-800/40 via-gray-700/20 to-transparent border border-gray-700/30 rounded-2xl backdrop-blur-xl">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {/* Role Icon */}
                <Skeleton className="w-12 h-12 rounded-xl" />

                <div className="space-y-2">
                  {/* Role Label */}
                  <Skeleton className="h-4 w-16 rounded" />
                  {/* User Name */}
                  <Skeleton className="h-6 w-28 rounded" />
                </div>
              </div>

              {/* Status Badge */}
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              {/* Email */}
              <div className="flex items-center gap-2">
                <Skeleton className="w-4 h-4 rounded" />
                <Skeleton className="h-4 w-48 rounded" />
                <Skeleton className="w-4 h-4 rounded" />
              </div>
              {/* Phone */}
              <div className="flex items-center gap-2">
                <Skeleton className="w-4 h-4 rounded" />
                <Skeleton className="h-4 w-32 rounded" />
              </div>
            </div>

            {/* Activity Info */}
            <div className="flex items-center justify-between text-sm mb-4">
              <div className="flex items-center gap-2">
                <Skeleton className="w-4 h-4 rounded" />
                <Skeleton className="h-4 w-20 rounded" />
              </div>
              <Skeleton className="h-4 w-24 rounded" />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Skeleton className="flex-1 h-9 rounded-lg" />
              <Skeleton className="w-9 h-9 rounded-lg" />
              <Skeleton className="w-9 h-9 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * 📋 User Table Skeleton
 * Skeleton for table row layout
 */
export const UserTableSkeleton: React.FC<{ count?: number }> = ({
  count = 10,
}) => {
  return (
    <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl overflow-hidden backdrop-blur-xl">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700/30 border-b border-gray-600/30">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                User
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                Role
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                Status
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                Contact
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                Last Login
              </th>
              <th className="text-right py-4 px-6 text-sm font-medium text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/30">
            {Array.from({ length: count }, (_, index) => (
              <tr
                key={`user-table-skeleton-${index}`}
                className="hover:bg-gray-700/20 transition-colors"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* User Column */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-8 h-8 rounded-lg" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32 rounded" />
                      <Skeleton className="h-3 w-48 rounded" />
                    </div>
                  </div>
                </td>

                {/* Role Column */}
                <td className="py-4 px-6">
                  <Skeleton className="h-6 w-20 rounded-full" />
                </td>

                {/* Status Column */}
                <td className="py-4 px-6">
                  <Skeleton className="h-6 w-16 rounded-full" />
                </td>

                {/* Contact Column */}
                <td className="py-4 px-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Skeleton className="w-3 h-3 rounded" />
                      <Skeleton className="h-3 w-40 rounded" />
                      <Skeleton className="w-3 h-3 rounded" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Skeleton className="w-3 h-3 rounded" />
                      <Skeleton className="h-3 w-28 rounded" />
                    </div>
                  </div>
                </td>

                {/* Last Login Column */}
                <td className="py-4 px-6">
                  <Skeleton className="h-4 w-24 rounded" />
                </td>

                {/* Actions Column */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 justify-end">
                    <Skeleton className="h-8 w-16 rounded" />
                    <Skeleton className="w-8 h-8 rounded" />
                    <Skeleton className="w-8 h-8 rounded" />
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
 * Loading state for infinite scroll
 */
export const LoadMoreSkeleton: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="flex items-center gap-3">
        {/* Spinner */}
        <div className="w-6 h-6 border-2 border-gray-600 border-t-purple-400 rounded-full animate-spin"></div>

        {/* Text */}
        <span className="text-gray-400 font-medium">Loading more users...</span>

        {/* Dots Animation */}
        <div className="flex gap-1">
          <div
            className="w-1 h-1 bg-purple-400 rounded-full animate-pulse"
            style={{ animationDelay: '0ms' }}
          ></div>
          <div
            className="w-1 h-1 bg-purple-400 rounded-full animate-pulse"
            style={{ animationDelay: '200ms' }}
          ></div>
          <div
            className="w-1 h-1 bg-purple-400 rounded-full animate-pulse"
            style={{ animationDelay: '400ms' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

/**
 * 🔚 End of List Indicator
 * Shows when all users have been loaded
 */
export const EndOfListIndicator: React.FC<{ total?: number }> = ({ total }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-full flex items-center justify-center mb-3">
        <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full"></div>
      </div>

      <h3 className="text-white font-semibold mb-1">All users loaded</h3>
      {total && (
        <p className="text-gray-400 text-sm">Showing all {total} users</p>
      )}

      <div className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
    </div>
  );
};

export default {
  UserGridSkeleton,
  UserTableSkeleton,
  LoadMoreSkeleton,
  EndOfListIndicator,
};
