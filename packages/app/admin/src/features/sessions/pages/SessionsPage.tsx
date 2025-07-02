'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
// import { MinimalStatCard, FloatingCard } from '@ui/display';
import { AppHeader } from '@ui/layout';
import { Button, Input, Select } from '@ui/forms';
import { useRouter } from 'next/navigation';
import {
  BoltIcon,
  ClockIcon,
  UserIcon,
  CurrencyDollarIcon,
  HomeIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  ViewColumnsIcon,
  TableCellsIcon,
  CheckCircleIcon,
  PlayIcon,
  XCircleIcon,
  SignalIcon,
  MapPinIcon,
  CalendarIcon,
  EyeIcon,
  StopIcon,
  BanknotesIcon,
  ChartBarIcon,
  FireIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';
import type { SessionStatus } from '@/types/global.types';

// Type for icon components - fixed for Heroicons
type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

/**
 * 🔋 API Schema Ready - Live Charging Session Types
 * Based on session.types.ts and backend schema
 */
interface LiveChargingSession {
  readonly id: string;
  readonly connector_id: string;
  readonly user_id: string;
  readonly station_id: string;
  readonly station_name: string;
  readonly user_email: string;
  readonly status: SessionStatus;
  readonly connector_type: 'CCS' | 'CHAdeMO' | 'Type2' | 'CCS_CHAdeMO';
  readonly power_output: number; // kW
  readonly started_at: string;
  readonly ended_at?: string;
  readonly energy_delivered: number; // kWh
  readonly current_cost: number; // TL
  readonly total_cost?: number; // TL
  readonly estimated_completion?: string;
  readonly created_at: string;
  readonly updated_at: string;
}

/**
 * 📊 Live Session Statistics
 * Revolutionary floating stats with real-time data
 */
interface SessionStats {
  readonly title: string;
  readonly value: string;
  readonly icon: IconComponent;
  readonly variant: 'emerald' | 'blue' | 'teal' | 'purple' | 'amber';
  readonly trend: string;
  readonly description: string;
  readonly isLive?: boolean;
}

/**
 * 🚀 Revolutionary Sessions Page - Live Operations Theme
 * Sophisticated floating card design with real-time monitoring
 *
 * Features:
 * - Real-time session monitoring with WebSocket ready structure
 * - Emerald theme with pulse animations
 * - Revolutionary floating card design
 * - API schema compliant TypeScript
 * - Live Operations critical monitoring focus
 */
const SessionsPage: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isLiveDataEnabled, setIsLiveDataEnabled] = useState(true);

  // Revolutionary floating stats with live data
  const sessionStats: SessionStats[] = [
    {
      title: 'Active Sessions',
      value: '23',
      icon: BoltIcon,
      variant: 'emerald',
      trend: '+3 in last hour',
      description: 'Currently charging vehicles with live power monitoring',
      isLive: true,
    },
    {
      title: 'Power Output',
      value: '3.2 MW',
      icon: FireIcon,
      variant: 'amber',
      trend: '↗️ Peak load active',
      description: 'Total network power consumption in real-time',
      isLive: true,
    },
    {
      title: 'Completed Today',
      value: '187',
      icon: CheckCircleIcon,
      variant: 'blue',
      trend: '+15% vs yesterday',
      description: 'Successfully completed charging sessions',
    },
    {
      title: 'Revenue Flow',
      value: '₺8,524',
      icon: BanknotesIcon,
      variant: 'teal',
      trend: '+22% revenue growth',
      description: 'Live revenue from active charging sessions',
      isLive: true,
    },
  ];

  // API Schema Ready - Mock sessions data
  const sessions: LiveChargingSession[] = [
    {
      id: 'session-001',
      connector_id: 'conn-001-ccs',
      user_id: 'user-123',
      station_id: 'station-001',
      station_name: 'Mall Center Supercharger',
      user_email: 'john@example.com',
      status: 'charging',
      connector_type: 'CCS',
      power_output: 150,
      started_at: '2024-01-15T09:30:00Z',
      energy_delivered: 45.5,
      current_cost: 113.75,
      estimated_completion: '2024-01-15T11:00:00Z',
      created_at: '2024-01-15T09:30:00Z',
      updated_at: '2024-01-15T10:30:00Z',
    },
    {
      id: 'session-002',
      connector_id: 'conn-002-chademo',
      user_id: 'user-456',
      station_id: 'station-002',
      station_name: 'Airport Fast Charging Hub',
      user_email: 'sarah@example.com',
      status: 'charging',
      connector_type: 'CHAdeMO',
      power_output: 75,
      started_at: '2024-01-15T08:45:00Z',
      energy_delivered: 32.8,
      current_cost: 98.4,
      estimated_completion: '2024-01-15T11:15:00Z',
      created_at: '2024-01-15T08:45:00Z',
      updated_at: '2024-01-15T10:30:00Z',
    },
    {
      id: 'session-003',
      connector_id: 'conn-001-ccs-2',
      user_id: 'user-789',
      station_id: 'station-001',
      station_name: 'Mall Center Supercharger',
      user_email: 'mike@example.com',
      status: 'completed',
      connector_type: 'CCS',
      power_output: 150,
      started_at: '2024-01-15T07:00:00Z',
      ended_at: '2024-01-15T08:30:00Z',
      energy_delivered: 65.2,
      current_cost: 163.0,
      total_cost: 163.0,
      created_at: '2024-01-15T07:00:00Z',
      updated_at: '2024-01-15T08:30:00Z',
    },
    {
      id: 'session-004',
      connector_id: 'conn-003-type2',
      user_id: 'user-101',
      station_id: 'station-003',
      station_name: 'City Center Charging Plaza',
      user_email: 'alice@example.com',
      status: 'starting',
      connector_type: 'Type2',
      power_output: 22,
      started_at: '2024-01-15T10:20:00Z',
      energy_delivered: 0,
      current_cost: 0,
      estimated_completion: '2024-01-15T14:00:00Z',
      created_at: '2024-01-15T10:20:00Z',
      updated_at: '2024-01-15T10:20:00Z',
    },
  ];

  /**
   * 🎨 Revolutionary Status Configuration
   * Floating card design with sophisticated color mapping
   */
  const getSessionStatusConfig = (status: SessionStatus) => {
    const configs = {
      starting: {
        color: 'amber',
        icon: PlayIcon,
        text: 'Starting',
        bgColor:
          'bg-gradient-to-br from-amber-500/15 via-amber-400/8 to-transparent',
        borderColor: 'border-amber-400/25 hover:border-amber-300/40',
        textColor: 'text-amber-400',
        badgeColor: 'bg-amber-500/10 border border-amber-500/20',
        pulseColor: 'bg-amber-500',
      },
      charging: {
        color: 'emerald',
        icon: BoltIcon,
        text: 'Charging',
        bgColor:
          'bg-gradient-to-br from-emerald-500/15 via-emerald-400/8 to-transparent',
        borderColor: 'border-emerald-400/25 hover:border-emerald-300/40',
        textColor: 'text-emerald-400',
        badgeColor: 'bg-emerald-500/10 border border-emerald-500/20',
        pulseColor: 'bg-emerald-500',
      },
      completed: {
        color: 'blue',
        icon: CheckCircleIcon,
        text: 'Completed',
        bgColor:
          'bg-gradient-to-br from-blue-500/15 via-blue-400/8 to-transparent',
        borderColor: 'border-blue-400/25 hover:border-blue-300/40',
        textColor: 'text-blue-400',
        badgeColor: 'bg-blue-500/10 border border-blue-500/20',
        pulseColor: 'bg-blue-500',
      },
      failed: {
        color: 'red',
        icon: XCircleIcon,
        text: 'Failed',
        bgColor:
          'bg-gradient-to-br from-red-500/15 via-red-400/8 to-transparent',
        borderColor: 'border-red-400/25 hover:border-red-300/40',
        textColor: 'text-red-400',
        badgeColor: 'bg-red-500/10 border border-red-500/20',
        pulseColor: 'bg-red-500',
      },
      cancelled: {
        color: 'gray',
        icon: XCircleIcon,
        text: 'Cancelled',
        bgColor:
          'bg-gradient-to-br from-gray-500/15 via-gray-400/8 to-transparent',
        borderColor: 'border-gray-400/25 hover:border-gray-300/40',
        textColor: 'text-gray-400',
        badgeColor: 'bg-gray-500/10 border border-gray-500/20',
        pulseColor: 'bg-gray-500',
      },
    };
    return configs[status];
  };

  /**
   * 🕒 Enhanced Duration Formatter
   */
  const formatDuration = (startTime: string, endTime?: string): string => {
    const start = new Date(startTime);
    const end = endTime ? new Date(endTime) : new Date();
    const diffMs = end.getTime() - start.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  /**
   * 🎯 Enhanced Session Filtering
   */
  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.station_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.user_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.connector_type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || session.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  /**
   * 🔄 WebSocket Ready - Live Data Effect
   */
  useEffect(() => {
    if (!isLiveDataEnabled) return;

    // TODO: Implement WebSocket connection for real-time updates
    const interval = setInterval(() => {
      // Simulate live data updates
      console.log('🔄 Live data update simulation');
    }, 5000);

    return () => clearInterval(interval);
  }, [isLiveDataEnabled]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <AppHeader showNotifications={true} notificationCount={3} />

      {/* Revolutionary Page Header with Live Operations Theme */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/')}
            className="p-2 hover:bg-gray-700/30"
          >
            <HomeIcon className="w-4 h-4" />
          </Button>
          <ChevronRightIcon className="w-4 h-4" />
          <span className="text-emerald-400 font-medium">Live Sessions</span>
        </div>

        {/* Revolutionary Hero Section - Live Operations */}
        <div className="relative mb-10">
          {/* Floating Background Orbs */}
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-green-600/15 rounded-full blur-2xl animate-pulse delay-1000"></div>

          <div className="relative z-10">
            {/* Live Operations Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-4 h-12 bg-gradient-to-b from-emerald-400 to-green-400 rounded-full animate-pulse"></div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    Live Charging Sessions
                  </h1>
                  <p className="text-gray-300 text-lg">
                    Critical real-time monitoring & management
                  </p>
                </div>
              </div>

              {/* Live Status Indicator */}
              <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-xl">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>
                <span className="text-emerald-400 font-semibold">
                  LIVE DATA
                </span>
                <span className="text-gray-400 text-sm">
                  {sessions.filter((s) => s.status === 'charging').length}{' '}
                  active
                </span>
              </div>
            </div>

            {/* Revolutionary Floating Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
              {sessionStats.map((stat, index) => (
                <div
                  key={stat.title}
                  className="group relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Revolutionary Floating Card */}
                  <div className="relative p-6 bg-gradient-to-br from-gray-800/40 via-gray-700/30 to-gray-800/20 border border-gray-600/30 rounded-2xl backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                    {/* Live Pulse Indicator */}
                    {stat.isLive && (
                      <div
                        className={`absolute -top-2 -right-2 w-5 h-5 bg-${stat.variant}-500 rounded-full animate-ping opacity-75`}
                      ></div>
                    )}

                    {/* Floating Background Elements */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                    <div
                      className={`absolute -inset-1 bg-gradient-to-r from-${stat.variant}-500/20 to-${stat.variant}-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`}
                    ></div>

                    {/* Card Content */}
                    <div className="relative z-10">
                      {/* Icon Container */}
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-${stat.variant}-500/20 to-${stat.variant}-400/10 border border-${stat.variant}-400/25 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}
                      >
                        <stat.icon
                          className={`w-7 h-7 text-${stat.variant}-400`}
                        />
                      </div>

                      {/* Value & Title */}
                      <div className="mb-3">
                        <div className="text-3xl font-bold text-white mb-1 group-hover:text-white transition-colors duration-300">
                          {stat.value}
                        </div>
                        <div className="text-gray-300 font-medium">
                          {stat.title}
                        </div>
                      </div>

                      {/* Trend Indicator */}
                      <div className="flex items-center gap-2 mb-2">
                        <ArrowTrendingUpIcon
                          className={`w-4 h-4 text-${stat.variant}-400`}
                        />
                        <span
                          className={`text-sm text-${stat.variant}-400 font-medium`}
                        >
                          {stat.trend}
                        </span>
                      </div>

                      {/* Hidden Description - Revealed on Hover */}
                      <div className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-relaxed">
                        {stat.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6 mb-8 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search Input */}
              <div className="relative flex-1 max-w-md">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search sessions, stations, users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                />
              </div>

              {/* Status Filter */}
              <Select
                value={statusFilter}
                onChange={(value) => setStatusFilter(value || 'all')}
                className="min-w-[160px]"
                options={[
                  { value: 'all', label: 'All Statuses' },
                  { value: 'starting', label: 'Starting' },
                  { value: 'charging', label: 'Charging' },
                  { value: 'completed', label: 'Completed' },
                  { value: 'failed', label: 'Failed' },
                  { value: 'cancelled', label: 'Cancelled' },
                ]}
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-gray-700/30 rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="p-2"
              >
                <ViewColumnsIcon className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'table' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('table')}
                className="p-2"
              >
                <TableCellsIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Revolutionary Sessions Grid */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredSessions.map((session, index) => {
              const statusConfig = getSessionStatusConfig(session.status);
              const isActive =
                session.status === 'charging' || session.status === 'starting';

              return (
                <div
                  key={session.id}
                  className="group relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Revolutionary Floating Session Card */}
                  <div
                    className={`relative p-6 ${statusConfig.bgColor} border ${statusConfig.borderColor} rounded-2xl backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer`}
                  >
                    {/* Live Status Pulse */}
                    {isActive && (
                      <div
                        className={`absolute -top-2 -right-2 w-4 h-4 ${statusConfig.pulseColor} rounded-full animate-ping opacity-75`}
                      ></div>
                    )}

                    {/* Floating Background Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                    {/* Session Header */}
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 rounded-xl ${statusConfig.badgeColor} flex items-center justify-center`}
                          >
                            <statusConfig.icon
                              className={`w-6 h-6 ${statusConfig.textColor}`}
                            />
                          </div>
                          <div>
                            <div
                              className={`text-sm font-medium ${statusConfig.textColor} mb-1`}
                            >
                              {statusConfig.text}
                            </div>
                            <div className="text-white font-semibold text-lg">
                              Session #{session.id.slice(-6)}
                            </div>
                          </div>
                        </div>

                        {/* Power Output Badge */}
                        <div className="text-right">
                          <div className="text-2xl font-bold text-white">
                            {session.power_output}kW
                          </div>
                          <div className="text-xs text-gray-400">
                            {session.connector_type}
                          </div>
                        </div>
                      </div>

                      {/* Station & User Info */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-gray-300">
                          <MapPinIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">
                            {session.station_name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <UserIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{session.user_email}</span>
                        </div>
                      </div>

                      {/* Energy & Cost Display */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                          <div className="text-lg font-bold text-white">
                            {session.energy_delivered.toFixed(1)}
                          </div>
                          <div className="text-xs text-gray-400">
                            kWh Delivered
                          </div>
                        </div>
                        <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                          <div className="text-lg font-bold text-teal-400">
                            ₺{session.current_cost.toFixed(2)}
                          </div>
                          <div className="text-xs text-gray-400">
                            Current Cost
                          </div>
                        </div>
                      </div>

                      {/* Session Timeline */}
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                        <div className="flex items-center gap-1">
                          <ClockIcon className="w-4 h-4" />
                          <span>
                            {formatDuration(
                              session.started_at,
                              session.ended_at,
                            )}
                          </span>
                        </div>
                        {session.estimated_completion &&
                          session.status === 'charging' && (
                            <div className="text-emerald-400">
                              ~
                              {new Date(
                                session.estimated_completion,
                              ).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </div>
                          )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="flex-1 bg-gray-700/30 hover:bg-gray-600/40 text-gray-300 hover:text-white"
                        >
                          <EyeIcon className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        {isActive && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20"
                          >
                            <StopIcon className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {filteredSessions.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-700/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BoltIcon className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No sessions found
            </h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button
              variant="primary"
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionsPage;
