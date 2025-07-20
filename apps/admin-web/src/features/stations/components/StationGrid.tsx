'use client';

import {
  BoltIcon,
  EyeIcon,
  MapPinIcon,
  WrenchScrewdriverIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  SignalIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@ui/forms';
import type React from 'react';
import type { Station } from '../types/station.types';

interface StationGridProps {
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

export const StationGrid: React.FC<StationGridProps> = ({
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

      {/* Revolutionary Station Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stations.map((station, index) => {
          const statusConfig = getStatusConfig(station.status);
          const availableConnectors = station.connectors.filter(c => c.status === 'available').length;
          const totalConnectors = station.connectors.length;

          return (
            <div
              key={station.id}
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Revolutionary Station Card */}
              <div className={`relative p-6 bg-gradient-to-br from-${statusConfig.variant}-500/10 via-${statusConfig.variant}-400/5 to-transparent border border-${statusConfig.variant}-400/25 hover:border-${statusConfig.variant}-300/40 rounded-2xl backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer`}>
                
                {/* Status Indicator */}
                <div className={`absolute -top-2 -right-2 w-4 h-4 ${statusConfig.bg} ${statusConfig.border} border-2 rounded-full`}>
                  <div className={`w-full h-full ${statusConfig.text.replace('text-', 'bg-')} rounded-full opacity-75 ${station.status === 'active' ? 'animate-pulse' : ''}`}></div>
                </div>

                {/* Floating Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Header */}
                                      <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-${statusConfig.variant}-500/10 border border-${statusConfig.variant}-500/20 flex items-center justify-center`}>
                        <BoltIcon className={`w-6 h-6 text-${statusConfig.variant}-400`} />
                      </div>
                    <div className="text-right">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${statusConfig.bg} ${statusConfig.border} border`}>
                        <statusConfig.icon className={`w-4 h-4 ${statusConfig.text}`} />
                        <span className={`text-xs font-medium ${statusConfig.text}`}>
                          {statusConfig.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Station Info */}
                  <div className="space-y-3 mb-4">
                    <h3 className="text-lg font-semibold text-white line-clamp-1">
                      {station.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <MapPinIcon className={`w-4 h-4 text-${statusConfig.variant}-400`} />
                      <span className="line-clamp-1">
                        {station.location.address}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <SignalIcon className={`w-4 h-4 text-${statusConfig.variant}-400`} />
                      <span>
                        {availableConnectors}/{totalConnectors} connectors available
                      </span>
                    </div>

                    {/* Connectors Info */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {station.connectors.slice(0, 3).map((connector, idx) => (
                        <div
                          key={idx}
                          className={`px-2 py-1 rounded-md text-xs font-medium ${
                            connector.status === 'available'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25'
                              : 'bg-gray-500/10 text-gray-400 border border-gray-500/25'
                          }`}
                        >
                          {connector.type} {connector.power}kW
                        </div>
                      ))}
                      {station.connectors.length > 3 && (
                        <div className="px-2 py-1 rounded-md text-xs font-medium bg-gray-500/10 text-gray-400 border border-gray-500/25">
                          +{station.connectors.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onViewDetails(station)}
                      className={`relative overflow-hidden backdrop-blur-sm bg-gradient-to-r from-${statusConfig.variant}-500/15 via-${statusConfig.variant}-400/10 to-${statusConfig.variant}-500/15 border border-${statusConfig.variant}-400/30 hover:border-${statusConfig.variant}-300/50 text-${statusConfig.variant}-300 hover:text-white transition-all duration-300`}
                    >
                      <div className="flex items-center gap-2 relative z-10">
                        <EyeIcon className="w-4 h-4" />
                        <span className="font-medium text-sm">View</span>
                      </div>
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onEditStation(station)}
                      className="relative overflow-hidden backdrop-blur-sm bg-gradient-to-r from-blue-500/15 via-blue-400/10 to-blue-500/15 border border-blue-400/30 hover:border-blue-300/50 text-blue-300 hover:text-white transition-all duration-300"
                    >
                      <div className="flex items-center gap-2 relative z-10">
                        <WrenchScrewdriverIcon className="w-4 h-4" />
                        <span className="font-medium text-sm">Edit</span>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More Button */}
      {hasNextPage && (
        <div className="flex justify-center pt-8">
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
      )}
    </div>
  );
}; 