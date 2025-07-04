import React, { useState } from 'react';
import { MinimalStatCard } from '@/shared/ui/components/Display';
import { MainLayout } from '@/shared/ui/components/Layout';
import { Button, Input, Select } from '@/shared/ui/components/Forms';
import { useRouter } from 'next/navigation';
import {
  MapPinIcon,
  BoltIcon,
  MagnifyingGlassIcon,
  SignalIcon,
  CheckCircleIcon,
  XCircleIcon,
  WrenchScrewdriverIcon,
  ClockIcon,
  CurrencyDollarIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  HomeIcon,
  ChevronRightIcon,
  ViewColumnsIcon,
  TableCellsIcon,
} from '@heroicons/react/24/outline';

// Electric Charging Station Icon - Revolutionary Design
const ChargingStationIcon: React.FC<{ className?: string }> = ({
  className,
}) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 74 69"
    fill="none"
  >
    <defs>
      <linearGradient id="stationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" className="stop-color-blue-400" />
        <stop offset="100%" className="stop-color-cyan-400" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g transform="translate(-12, -16)">
      <path
        d="M74.49,82h-61a1.5,1.5,0,1,0,0,3h61a1.5,1.5,0,1,0,0-3Z"
        fill="url(#stationGradient)"
        className="drop-shadow-lg"
      />
      <path
        d="M84.48,82h-2a1.5,1.5,0,0,0,0,3h2a1.5,1.5,0,1,0,0-3Z"
        fill="url(#stationGradient)"
        className="drop-shadow-lg"
      />
      <path
        d="M68,77a2,2,0,0,0-2-2H24a2,2,0,0,0-2,2v3H68Z"
        fill="url(#stationGradient)"
        className="drop-shadow-lg"
      />
      <path
        d="M74,60.3v4.2a1.5,1.5,0,0,1-3,0V55a2,2,0,0,0-2-2H65V21a5,5,0,0,0-5-5H30a5,5,0,0,0-5,5V73H65V56h3v8.5a4.5,4.5,0,0,0,9,0V36H74ZM60,47H30V24a3,3,0,0,1,3-3H57a3,3,0,0,1,3,3Z"
        fill="url(#stationGradient)"
        className="drop-shadow-lg"
        filter="url(#glow)"
      />
      <path
        d="M82,31V23H80V17.5a1.5,1.5,0,0,0-3,0V23H74V17.5a1.5,1.5,0,0,0-3,0V23H69v8a3,3,0,0,0,3,3h7A3,3,0,0,0,82,31Z"
        fill="url(#stationGradient)"
        className="drop-shadow-lg"
      />
      <path
        d="M45,23A11,11,0,1,0,56,34,11,11,0,0,0,45,23ZM42.6,42l1.2-6.5H40.9L47.4,27l-1.2,6.5h2.9Z"
        fill="url(#stationGradient)"
        className="drop-shadow-xl animate-pulse"
        filter="url(#glow)"
      />
    </g>
    <style>{`
      .stop-color-blue-400 { stop-color: rgb(96 165 250); }
      .stop-color-cyan-400 { stop-color: rgb(34 211 238); }
    `}</style>
  </svg>
);

// API Schema based types (chargeStation.ts)
interface ChargingStation {
  id: string;
  name: string;
  location: string;
  status: 'AVAILABLE' | 'CHARGING' | 'MAINTENANCE' | 'OFFLINE';
  powerOutput: number;
  connectorType: 'CCS' | 'CHAdeMO' | 'Type2' | 'CCS_CHAdeMO';
  pricePerKwh: number;
  isActive: boolean;
  lastHeartbeat: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Charging Stations Management Page - Infrastructure Theme
 * API Schema Ready with Real-time Monitoring
 */
const StationsPage: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [connectorFilter, setConnectorFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Mock data based on API schema
  const stationStats = [
    {
      title: 'Total Stations',
      value: '156',
      icon: ChargingStationIcon,
      variant: 'blue' as const,
      trend: '+8 new this week',
      description: 'Registered charging infrastructure',
    },
    {
      title: 'Available Now',
      value: '134',
      icon: CheckCircleIcon,
      variant: 'emerald' as const,
      trend: '86% availability',
      description: 'Ready for EV charging',
    },
    {
      title: 'Currently Charging',
      value: '18',
      icon: BoltIcon,
      variant: 'teal' as const,
      trend: '+3 vs last hour',
      description: 'Active charging sessions',
    },
    {
      title: 'Under Maintenance',
      value: '4',
      icon: WrenchScrewdriverIcon,
      variant: 'purple' as const,
      trend: '2.5% downtime',
      description: 'Scheduled maintenance',
    },
  ];

  // Mock stations data (API schema compatible)
  const stations: ChargingStation[] = [
    {
      id: 'station-001',
      name: 'Mall Center Supercharger',
      location: 'Shopping Mall Istanbul, Floor B1',
      status: 'AVAILABLE',
      powerOutput: 150,
      connectorType: 'CCS',
      pricePerKwh: 2.5,
      isActive: true,
      lastHeartbeat: '2024-01-15T10:30:00Z',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
    },
    {
      id: 'station-002',
      name: 'Airport Fast Charging Hub',
      location: 'Istanbul Airport, Terminal 1 Parking',
      status: 'CHARGING',
      powerOutput: 75,
      connectorType: 'CCS_CHAdeMO',
      pricePerKwh: 3.0,
      isActive: true,
      lastHeartbeat: '2024-01-15T10:29:45Z',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T10:29:45Z',
    },
    {
      id: 'station-003',
      name: 'City Center Type2 Station',
      location: 'Taksim Square, Public Parking',
      status: 'MAINTENANCE',
      powerOutput: 22,
      connectorType: 'Type2',
      pricePerKwh: 1.8,
      isActive: false,
      lastHeartbeat: '2024-01-15T08:15:00Z',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T08:15:00Z',
    },
    {
      id: 'station-004',
      name: 'Business District CHAdeMO',
      location: 'Levent Business Center, Ground Floor',
      status: 'OFFLINE',
      powerOutput: 50,
      connectorType: 'CHAdeMO',
      pricePerKwh: 2.2,
      isActive: true,
      lastHeartbeat: '2024-01-15T06:45:00Z',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T06:45:00Z',
    },
  ];

  const getStatusConfig = (status: ChargingStation['status']) => {
    switch (status) {
      case 'AVAILABLE':
        return {
          color: 'emerald',
          icon: CheckCircleIcon,
          text: 'Available',
          bgColor: 'bg-emerald-500/10',
          borderColor: 'border-emerald-500/20',
          textColor: 'text-emerald-400',
        };
      case 'CHARGING':
        return {
          color: 'amber',
          icon: BoltIcon,
          text: 'Charging',
          bgColor: 'bg-amber-500/10',
          borderColor: 'border-amber-500/20',
          textColor: 'text-amber-400',
        };
      case 'MAINTENANCE':
        return {
          color: 'orange',
          icon: WrenchScrewdriverIcon,
          text: 'Maintenance',
          bgColor: 'bg-orange-500/10',
          borderColor: 'border-orange-500/20',
          textColor: 'text-orange-400',
        };
      case 'OFFLINE':
        return {
          color: 'red',
          icon: XCircleIcon,
          text: 'Offline',
          bgColor: 'bg-red-500/10',
          borderColor: 'border-red-500/20',
          textColor: 'text-red-400',
        };
    }
  };

  const filteredStations = stations.filter((station) => {
    const matchesSearch =
      station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || station.status === statusFilter;
    const matchesConnector =
      connectorFilter === 'all' || station.connectorType === connectorFilter;

    return matchesSearch && matchesStatus && matchesConnector;
  });

  return (
    <MainLayout
      showNotifications={true}
      notificationCount={3}
      headerVariant="default"
      showFooter={false}
    >
      <div className="space-y-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <HomeIcon className="w-4 h-4" />
            Dashboard
          </button>
          <ChevronRightIcon className="w-4 h-4" />
          <span className="text-blue-400 font-medium">Charging Stations</span>
        </nav>

        {/* Header Section - Infrastructure Theme */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Charging Stations
            </h1>
            <p className="text-gray-400">
              Infrastructure management & real-time monitoring
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="md"
            >
              Add Station
            </Button>
          </div>
        </header>

        {/* Infrastructure Statistics */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-3 h-8 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full"></div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Infrastructure Overview
                </h2>
                <p className="text-gray-400">
                  Real-time charging network statistics
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-blue-400 font-medium">
                Live Monitoring
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {stationStats.map((stat) => (
              <MinimalStatCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                variant={stat.variant}
                trend={stat.trend}
                description={stat.description}
              />
            ))}
          </div>
        </section>

        {/* Search & Filters */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-8 bg-gradient-to-b from-blue-400 to-blue-300 rounded-full"></div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Station Management
                </h2>
                <p className="text-gray-400">
                  Search, filter and manage charging stations
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-blue-500/20 border border-blue-500/30 text-blue-400'
                    : 'bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:text-white'
                }`}
              >
                <ViewColumnsIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'table'
                    ? 'bg-blue-500/20 border border-blue-500/30 text-blue-400'
                    : 'bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:text-white'
                }`}
              >
                <TableCellsIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8">
            {/* Search Input */}
            <div className="lg:col-span-6">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search stations by name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  size="md"
                  className="h-12"
                  inputClassName="pl-11"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="lg:col-span-3">
              <Select
                value={statusFilter}
                onChange={(value) => setStatusFilter(value || 'all')}
                placeholder="Filter by status"
                size="md"
                className="h-12"
                options={[
                  { value: 'all', label: 'All Statuses' },
                  { value: 'AVAILABLE', label: 'Available' },
                  { value: 'CHARGING', label: 'Charging' },
                  { value: 'MAINTENANCE', label: 'Maintenance' },
                  { value: 'OFFLINE', label: 'Offline' },
                ]}
              />
            </div>

            {/* Connector Filter */}
            <div className="lg:col-span-3">
              <Select
                value={connectorFilter}
                onChange={(value) => setConnectorFilter(value || 'all')}
                placeholder="Filter by connector"
                size="md"
                className="h-12"
                options={[
                  { value: 'all', label: 'All Connectors' },
                  { value: 'CCS', label: 'CCS' },
                  { value: 'CHAdeMO', label: 'CHAdeMO' },
                  { value: 'Type2', label: 'Type 2' },
                  { value: 'CCS_CHAdeMO', label: 'CCS + CHAdeMO' },
                ]}
              />
            </div>
          </div>
        </section>

        {/* Stations List */}
        <section>
          {viewMode === 'grid' ? (
            // Grid View - Cards
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredStations.map((station) => {
                const statusConfig = getStatusConfig(station.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <div
                    key={station.id}
                    className="group relative p-8 bg-gradient-to-br from-blue-500/15 via-blue-400/8 to-transparent border border-blue-400/25 rounded-2xl hover:scale-105 hover:-translate-y-2 hover:border-blue-300/40 hover:shadow-3xl transition-all duration-500 ease-out backdrop-blur-xl shadow-2xl"
                  >
                    {/* Floating accent dots */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-pulse opacity-75"></div>
                    <div className="absolute top-4 -left-1 w-2 h-2 bg-blue-400/60 rounded-full animate-ping"></div>

                    {/* Background decoration */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                      <div className="absolute top-8 right-8 w-32 h-32 border border-blue-400/20 rounded-full"></div>
                      <div className="absolute bottom-6 left-6 w-20 h-20 border border-cyan-400/15 rounded-full"></div>
                    </div>

                    <div className="relative z-10 flex items-start justify-between mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/25 via-blue-400/15 to-cyan-400/10 border border-blue-400/30 flex items-center justify-center backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
                        <ChargingStationIcon className="w-8 h-8 text-blue-400 drop-shadow-lg" />
                      </div>
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${statusConfig.bgColor} ${statusConfig.borderColor} border`}
                      >
                        <StatusIcon
                          className={`w-4 h-4 ${statusConfig.textColor}`}
                        />
                        <span
                          className={`text-xs font-medium ${statusConfig.textColor}`}
                        >
                          {statusConfig.text}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-white mb-2">
                        {station.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-3">
                        {station.location}
                      </p>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="text-gray-300">
                          <BoltIcon className="w-4 h-4 inline mr-1" />
                          {station.powerOutput}kW
                        </div>
                        <div className="text-gray-300">
                          {station.connectorType}
                        </div>
                        <div className="text-gray-300">
                          <CurrencyDollarIcon className="w-4 h-4 inline mr-1" />
                          ₺{station.pricePerKwh}/kWh
                        </div>
                        <div className="text-xs text-gray-400">
                          <ClockIcon className="w-3 h-3 inline mr-1" />
                          {new Date(station.lastHeartbeat).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="flex-1 py-2 px-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 text-xs text-gray-400 hover:text-white transition-colors">
                        <EyeIcon className="w-4 h-4 inline mr-1" />
                        View
                      </button>
                      <button className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 transition-colors">
                        <PencilIcon className="w-4 h-4 text-gray-400 hover:text-white" />
                      </button>
                      <button className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-colors">
                        <TrashIcon className="w-4 h-4 text-red-400 hover:text-red-300" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // Table View - Dense table for large datasets
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700/30 border-b border-gray-600/30">
                    <tr>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                        Station
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                        Status
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                        Power
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                        Connector
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                        Price
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                        Last Update
                      </th>
                      <th className="text-right py-4 px-6 text-sm font-medium text-gray-300">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/30">
                    {filteredStations.map((station) => {
                      const statusConfig = getStatusConfig(station.status);
                      const StatusIcon = statusConfig.icon;

                      return (
                        <tr
                          key={station.id}
                          className="hover:bg-gray-700/20 transition-colors"
                        >
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-4">
                              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/25 via-blue-400/15 to-cyan-400/10 border border-blue-400/30 flex items-center justify-center backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                                <ChargingStationIcon className="w-5 h-5 text-blue-400 drop-shadow-lg" />
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse opacity-60"></div>
                              </div>
                              <div>
                                <div className="font-medium text-white">
                                  {station.name}
                                </div>
                                <div className="text-sm text-gray-400">
                                  {station.location}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div
                              className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full ${statusConfig.bgColor} ${statusConfig.borderColor} border`}
                            >
                              <StatusIcon
                                className={`w-3 h-3 ${statusConfig.textColor}`}
                              />
                              <span
                                className={`text-xs font-medium ${statusConfig.textColor}`}
                              >
                                {statusConfig.text}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-300">
                            {station.powerOutput}kW
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-300">
                            {station.connectorType}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-300">
                            ₺{station.pricePerKwh}/kWh
                          </td>
                          <td className="py-4 px-6 text-xs text-gray-400">
                            {new Date(station.lastHeartbeat).toLocaleString()}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center justify-end gap-2">
                              <button className="p-1.5 rounded-lg hover:bg-gray-700/50 transition-colors">
                                <EyeIcon className="w-4 h-4 text-gray-400 hover:text-white" />
                              </button>
                              <button className="p-1.5 rounded-lg hover:bg-gray-700/50 transition-colors">
                                <PencilIcon className="w-4 h-4 text-gray-400 hover:text-white" />
                              </button>
                              <button className="p-1.5 rounded-lg hover:bg-red-500/20 transition-colors">
                                <TrashIcon className="w-4 h-4 text-red-400 hover:text-red-300" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {filteredStations.length === 0 && (
            <div className="text-center py-12">
              <MapPinIcon className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-400 mb-2">
                No stations found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="pt-8 border-t border-gray-700/30">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <SignalIcon className="w-4 h-4" />
                <span>Infrastructure Online</span>
              </div>
              <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
              <span>Monitoring: {filteredStations.length} stations</span>
              <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
              <span>Last sync: Just now</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 text-sm bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-lg text-gray-300 hover:text-white transition-colors"
              >
                Refresh Data
              </button>
              <button className="px-4 py-2 text-sm bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg text-blue-400 hover:text-blue-300 transition-colors">
                Export Report
              </button>
            </div>
          </div>
        </footer>
      </div>
    </MainLayout>
  );
};

export default StationsPage;
