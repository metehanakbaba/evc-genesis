'use client';

import {
  ArrowTrendingUpIcon,
  BanknotesIcon,
  BoltIcon,
  CheckCircleIcon,
  ClockIcon,
  EyeIcon,
  FireIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  PlayIcon,
  StopIcon,
  TableCellsIcon,
  UserIcon,
  ViewColumnsIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { Button, Input, Select } from '@ui/forms';
// import { MinimalStatCard, FloatingCard } from '@ui/display';
import { MainLayout, PageHeader, PageContainer } from '@ui/layout';
import { Breadcrumb } from '@/shared/ui/components/Navigation';
import type React from 'react';
import { useEffect, useState } from 'react';
import type { SessionStatus } from '@/types/global.types';
// ✅ Import shared business logic
import { 
  getSessionStatusConfig,
  filterSessions,
  formatSessionDuration, 
} from '@evc/shared-business-logic';

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
 * - ✅ Uses new Breadcrumb and PageContainer components
 */
const SessionsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isLiveDataEnabled, _] = useState(true);

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
      value: '8,524 zł',
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

  // ✅ Session status configuration now handled by shared business logic

  // ✅ Use shared business logic for filtering and formatting
  const filteredSessions = filterSessions(sessions, {
    searchQuery,
    statusFilter,
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
    <MainLayout
      showNotifications={true}
      notificationCount={3}
      headerVariant="default"
    >
      {/* Revolutionary Page Header with Live Operations Theme */}
      <PageContainer paddingY="lg">
        {/* Revolutionary Breadcrumb Navigation */}
        <Breadcrumb 
          currentPageLabel="Live Sessions"
          variant="emerald"
        />

        <PageHeader
          title="Live Charging Sessions"
          description="Critical real-time monitoring & management"
          variant="emerald"
          actionButton={{
            label: "Monitor Sessions",
            onClick: () => {
              /* Monitor logic */
            },
            icon: BoltIcon,
            iconAnimation: "rotate-12"
          }}
          indicator={
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
          }
        />

        {/* Revolutionary Hero Section - Live Operations */}
        <div className="relative mb-10">
          {/* Floating Background Orbs */}
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-green-600/15 rounded-full blur-2xl animate-pulse delay-1000"></div>

          <div className="relative z-10">

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

            {/* Revolutionary View Mode Toggle */}
            <div className="flex gap-1 bg-gray-800/60 backdrop-blur-sm p-1 rounded-xl border border-gray-600/30">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={`
                  relative overflow-hidden p-3 transition-all duration-300 ease-out
                  ${viewMode === 'grid'
                    ? `bg-gradient-to-r from-emerald-500/25 via-emerald-400/20 to-emerald-500/25 
                       text-emerald-300 border border-emerald-400/40 shadow-lg shadow-emerald-500/20
                       scale-[1.05]`
                    : `bg-gray-700/40 text-gray-400 hover:bg-gray-600/50 hover:text-gray-300 
                       hover:scale-[1.02] border border-transparent`
                  }
                  group/toggle flex items-center
                `}
              >
                <ViewColumnsIcon className={`w-4 h-4 transition-transform duration-300 ${
                  viewMode === 'grid' ? 'scale-110' : 'group-hover/toggle:scale-105'
                }`} />
              </Button>
              <Button
                variant={viewMode === 'table' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('table')}
                className={`
                  relative overflow-hidden p-3 transition-all duration-300 ease-out
                  ${viewMode === 'table'
                    ? `bg-gradient-to-r from-emerald-500/25 via-emerald-400/20 to-emerald-500/25 
                       text-emerald-300 border border-emerald-400/40 shadow-lg shadow-emerald-500/20
                       scale-[1.05]`
                    : `bg-gray-700/40 text-gray-400 hover:bg-gray-600/50 hover:text-gray-300 
                       hover:scale-[1.02] border border-transparent`
                  }
                  group/toggle flex items-center
                `}
              >
                <TableCellsIcon className={`w-4 h-4 transition-transform duration-300 ${
                  viewMode === 'table' ? 'scale-110' : 'group-hover/toggle:scale-105'
                }`} />
              </Button>
            </div>
          </div>
        </div>

        {/* Revolutionary Sessions Grid */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredSessions.map((session, index) => {
              const statusConfigData = getSessionStatusConfig(session.status);
              // Map icon string to actual icon component
              const statusConfig = {
                ...statusConfigData,
                icon: statusConfigData.icon === 'PlayIcon' ? PlayIcon :
                      statusConfigData.icon === 'BoltIcon' ? BoltIcon :
                      statusConfigData.icon === 'CheckCircleIcon' ? CheckCircleIcon : XCircleIcon,
              };
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
                            {session.current_cost.toFixed(2)} zł
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
                            {formatSessionDuration(
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

                      {/* Revolutionary Action Buttons */}
                      <div className="flex gap-2 mt-4">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="
                            flex-1 relative overflow-hidden group/view
                            bg-gradient-to-r from-gray-700/40 via-gray-600/30 to-gray-700/40
                            hover:from-gray-600/50 hover:via-gray-500/40 hover:to-gray-600/50
                            text-gray-300 hover:text-white
                            border border-gray-600/30 hover:border-gray-500/50
                            shadow-md hover:shadow-lg
                            transition-all duration-300 ease-out
                            hover:scale-[1.02] active:scale-[0.98]
                            flex items-center justify-center gap-2
                            before:absolute before:inset-0 before:bg-gradient-to-r 
                            before:from-transparent before:via-white/10 before:to-transparent
                            before:translate-x-[-100%] hover:before:translate-x-[100%]
                            before:transition-transform before:duration-500
                          "
                        >
                          <div className="flex items-center gap-2 relative z-10">
                            <EyeIcon className="w-4 h-4 group-hover/view:scale-110 transition-transform duration-300" />
                            <span className="font-medium">View Details</span>
                          </div>
                        </Button>
                        {isActive && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="
                              relative overflow-hidden p-3 group/stop
                              bg-gradient-to-r from-red-500/15 via-red-400/10 to-red-500/15
                              hover:from-red-500/25 hover:via-red-400/20 hover:to-red-500/25
                              text-red-400 hover:text-red-300
                              border border-red-500/30 hover:border-red-400/50
                              shadow-sm shadow-red-500/10 hover:shadow-lg hover:shadow-red-500/20
                              transition-all duration-300 ease-out
                              hover:scale-110 active:scale-95
                              flex items-center
                            "
                          >
                            <StopIcon className="w-4 h-4 group-hover/stop:scale-110 transition-transform duration-300" />
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
              className="
                relative overflow-hidden group/empty
                bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600
                hover:from-emerald-500 hover:via-emerald-400 hover:to-emerald-500
                text-white font-semibold
                shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-400/30
                border border-emerald-400/20 hover:border-emerald-300/40
                transition-all duration-300 ease-out
                hover:scale-[1.05] active:scale-[0.95]
                flex items-center
                before:absolute before:inset-0 before:bg-gradient-to-r 
                before:from-transparent before:via-white/20 before:to-transparent
                before:translate-x-[-100%] hover:before:translate-x-[100%]
                before:transition-transform before:duration-700
              "
            >
              <span className="relative z-10 font-medium">Clear Filters</span>
            </Button>
          </div>
        )}
      </PageContainer>
    </MainLayout>
  );
};

export default SessionsPage;
