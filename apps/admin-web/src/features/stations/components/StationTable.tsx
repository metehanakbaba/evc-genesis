'use client';

import {
  BoltIcon,
  CheckCircleIcon,
  ClockIcon,
  EyeIcon,
  MapPinIcon,
  SignalIcon,
  WrenchScrewdriverIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@ui/forms';
import type React from 'react';
import type { Station } from '../types/station.types';

interface StationTableProps {
  readonly stations: ReadonlyArray<Station>;
  readonly onViewDetails: (station: Station) => void;
  readonly onEditStation: (station: Station) => void;
  readonly onLoadMore?: () => void;
  readonly isLoadingMore?: boolean;
  readonly hasNextPage?: boolean;
  readonly total?: number;
}

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'active':
      return {
        icon: CheckCircleIcon,
        color: 'emerald',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/25',
        text: 'text-emerald-400',
        label: 'Active',
        variant: 'emerald' as const,
      };
    case 'offline':
      return {
        icon: XCircleIcon,
        color: 'red',
        bg: 'bg-red-500/10',
        border: 'border-red-500/25',
        text: 'text-red-400',
        label: 'Offline',
        variant: 'red' as const,
      };
    case 'maintenance':
      return {
        icon: WrenchScrewdriverIcon,
        color: 'amber',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/25',
        text: 'text-amber-400',
        label: 'Maintenance',
        variant: 'amber' as const,
      };
    default:
      return {
        icon: ClockIcon,
        color: 'gray',
        bg: 'bg-gray-500/10',
        border: 'border-gray-500/25',
        text: 'text-gray-400',
        label: 'Unknown',
        variant: 'gray' as const,
      };
  }
};

export const StationTable: React.FC<StationTableProps> = ({
  stations,
  onViewDetails,
  onEditStation,
  onLoadMore,
  isLoadingMore,
  hasNextPage,
  total,
}) => {
  return (
    <div className="space-y-6">
      {/* Station Count Info */}
      {total !== undefined && (
        <div className="flex items-center justify-between">
          <p className="text-gray-400 text-sm">
            Showing {stations.length} of {total} stations
          </p>
        </div>
      )}

      {/* Revolutionary Table Container */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/5 via-blue-400/3 to-transparent border border-blue-400/20 backdrop-blur-xl">
        {/* Floating Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        </div>

        {/* Table */}
        <div className="relative z-10 overflow-x-auto">
          <table className="w-full">
            {/* Revolutionary Table Header */}
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

            {/* Revolutionary Table Body */}
            <tbody>
              {stations.map((station, index) => {
                const statusConfig = getStatusConfig(station.status);
                const availableConnectors = station.connectors.filter(
                  (c) => c.status === 'available',
                ).length;
                const totalConnectors = station.connectors.length;

                return (
                  <tr
                    key={station.id}
                    className="group border-b border-blue-400/5 hover:bg-gradient-to-r hover:from-blue-500/5 hover:via-blue-400/3 hover:to-transparent transition-all duration-300"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Station Info */}
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-xl bg-${statusConfig.variant}-500/10 border border-${statusConfig.variant}-500/20 flex items-center justify-center`}
                        >
                          <BoltIcon
                            className={`w-5 h-5 text-${statusConfig.variant}-400`}
                          />
                        </div>
                        <div>
                          <div className="text-white font-semibold text-sm line-clamp-1">
                            {station.name}
                          </div>
                          <div className="text-gray-400 text-xs mt-1">
                            ID: {station.id}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="p-6">
                      <div className="flex items-center gap-2 text-gray-300 text-sm">
                        <MapPinIcon
                          className={`w-4 h-4 text-${statusConfig.variant}-400 flex-shrink-0`}
                        />
                        <span className="line-clamp-2 max-w-xs">
                          {station.location.address}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="p-6">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${statusConfig.bg} ${statusConfig.border} border`}
                      >
                        <statusConfig.icon
                          className={`w-4 h-4 ${statusConfig.text}`}
                        />
                        <span
                          className={`text-xs font-medium ${statusConfig.text}`}
                        >
                          {statusConfig.label}
                        </span>
                      </div>
                    </td>

                    {/* Connectors */}
                    <td className="p-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-300 text-sm">
                          <SignalIcon
                            className={`w-4 h-4 text-${statusConfig.variant}-400`}
                          />
                          <span>
                            {availableConnectors}/{totalConnectors} available
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {station.connectors
                            .slice(0, 2)
                            .map((connector, idx) => (
                              <div
                                key={idx}
                                className={`px-2 py-0.5 rounded text-xs font-medium ${
                                  connector.status === 'available'
                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25'
                                    : 'bg-gray-500/10 text-gray-400 border border-gray-500/25'
                                }`}
                              >
                                {connector.type} {connector.power}kW
                              </div>
                            ))}
                          {station.connectors.length > 2 && (
                            <div className="px-2 py-0.5 rounded text-xs font-medium bg-gray-500/10 text-gray-400 border border-gray-500/25">
                              +{station.connectors.length - 2}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-6">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onViewDetails(station)}
                          className={`opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 bg-gradient-to-r from-${statusConfig.variant}-500/15 via-${statusConfig.variant}-400/10 to-${statusConfig.variant}-500/15 border border-${statusConfig.variant}-400/30 hover:border-${statusConfig.variant}-300/50 text-${statusConfig.variant}-300 hover:text-white`}
                        >
                          <EyeIcon className="w-4 h-4" />
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onEditStation(station)}
                          className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 bg-gradient-to-r from-blue-500/15 via-blue-400/10 to-blue-500/15 border border-blue-400/30 hover:border-blue-300/50 text-blue-300 hover:text-white delay-[50ms]"
                        >
                          <WrenchScrewdriverIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Load More Section */}
        {hasNextPage && (
          <div className="relative z-10 p-6 border-t border-blue-400/10">
            <div className="flex justify-center">
              <Button
                onClick={onLoadMore}
                disabled={isLoadingMore}
                variant="outline"
                size="lg"
                className="bg-blue-500/10 border-blue-400/25 hover:border-blue-300/40 text-blue-300 hover:text-white transition-all duration-300"
              >
                {isLoadingMore ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                    <span>Loading...</span>
                  </div>
                ) : (
                  'Load More Stations'
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
