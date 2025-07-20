'use client';

import type React from 'react';

interface StationSkeletonProps {
  readonly count?: number;
}

export const StationGridSkeleton: React.FC<StationSkeletonProps> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="relative p-6 bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-transparent border border-blue-400/25 rounded-2xl backdrop-blur-xl animate-pulse"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Status Indicator Skeleton */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-gray-600/50 rounded-full"></div>

          {/* Header Skeleton */}
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gray-600/50"></div>
            <div className="w-20 h-6 bg-gray-600/50 rounded-full"></div>
          </div>

          {/* Content Skeleton */}
          <div className="space-y-3 mb-4">
            {/* Station Name */}
            <div className="w-3/4 h-5 bg-gray-600/50 rounded"></div>
            
            {/* Location */}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-600/50 rounded"></div>
              <div className="w-2/3 h-4 bg-gray-600/50 rounded"></div>
            </div>

            {/* Connector Info */}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-600/50 rounded"></div>
              <div className="w-1/2 h-4 bg-gray-600/50 rounded"></div>
            </div>

            {/* Connector Types */}
            <div className="flex flex-wrap gap-2 mt-3">
              <div className="w-16 h-6 bg-gray-600/50 rounded"></div>
              <div className="w-20 h-6 bg-gray-600/50 rounded"></div>
              <div className="w-14 h-6 bg-gray-600/50 rounded"></div>
            </div>
          </div>

          {/* Action Buttons Skeleton */}
          <div className="grid grid-cols-2 gap-3">
            <div className="h-8 bg-gray-600/50 rounded"></div>
            <div className="h-8 bg-gray-600/50 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const StationTableSkeleton: React.FC<StationSkeletonProps> = ({ count = 10 }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/5 via-blue-400/3 to-transparent border border-blue-400/20 backdrop-blur-xl">
      {/* Table Header */}
      <div className="relative z-10 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-blue-400/10">
              <th className="text-left p-6 text-blue-300 font-semibold text-sm tracking-wider">
                Station
              </th>
              <th className="text-left p-6 text-blue-300 font-semibold text-sm tracking-wider">
                Location
              </th>
              <th className="text-left p-6 text-blue-300 font-semibold text-sm tracking-wider">
                Status
              </th>
              <th className="text-left p-6 text-blue-300 font-semibold text-sm tracking-wider">
                Connectors
              </th>
              <th className="text-right p-6 text-blue-300 font-semibold text-sm tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: count }).map((_, index) => (
              <tr
                key={index}
                className="border-b border-blue-400/5 animate-pulse"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Station Info Skeleton */}
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-600/50"></div>
                    <div className="space-y-2">
                      <div className="w-32 h-4 bg-gray-600/50 rounded"></div>
                      <div className="w-20 h-3 bg-gray-600/50 rounded"></div>
                    </div>
                  </div>
                </td>

                {/* Location Skeleton */}
                <td className="p-6">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-600/50 rounded"></div>
                    <div className="w-40 h-4 bg-gray-600/50 rounded"></div>
                  </div>
                </td>

                {/* Status Skeleton */}
                <td className="p-6">
                  <div className="w-20 h-7 bg-gray-600/50 rounded-full"></div>
                </td>

                {/* Connectors Skeleton */}
                <td className="p-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-600/50 rounded"></div>
                      <div className="w-24 h-4 bg-gray-600/50 rounded"></div>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-16 h-5 bg-gray-600/50 rounded"></div>
                      <div className="w-18 h-5 bg-gray-600/50 rounded"></div>
                    </div>
                  </div>
                </td>

                {/* Actions Skeleton */}
                <td className="p-6">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-8 h-8 bg-gray-600/50 rounded"></div>
                    <div className="w-8 h-8 bg-gray-600/50 rounded"></div>
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