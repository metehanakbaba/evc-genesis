'use client';

import {
  ArrowTrendingUpIcon,
  BanknotesIcon,
  BoltIcon,
  CheckCircleIcon,
  FireIcon,
} from '@heroicons/react/24/outline';
import { MainLayout, PageHeader, PageContainer } from '@ui/layout';
import { Breadcrumb } from '@/shared/ui/components/Navigation';
import { SearchFilterBar, EmptyState } from '@/shared/ui/molecules';
import type React from 'react';
import { useEffect, useState } from 'react';

// ✅ Import new session components and hooks
import { 
  SessionGrid, 
  SessionTable, 
  SessionFilterModal,
  SessionGridSkeleton,
  SessionTableSkeleton,
  useInfiniteSessions,
  useSessionActions,
  useSessionStatistics,
  useSearchDebounce,
} from '../components';

// Type for icon components - fixed for Heroicons
type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

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
 * - Real-time session monitoring with infinite scroll
 * - Emerald theme with pulse animations
 * - Revolutionary floating card design
 * - API schema compliant TypeScript
 * - Live Operations critical monitoring focus
 * - ✅ Uses new infinite scroll components and filter modal
 * - ✅ Integrated SearchFilterBar and debounced search
 */
const SessionsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [connectorTypeFilter, setConnectorTypeFilter] = useState<string>('all');
  const [powerOutputFilter, setPowerOutputFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isLiveDataEnabled, _] = useState(true);

  // ✅ Debounce search query to prevent excessive API calls
  const debouncedSearchQuery = useSearchDebounce(searchQuery, 300);

  // ✅ Use session statistics hook
  const { 
    activeSessions, 
    totalPowerOutput, 
    completedToday, 
    revenueFlow 
  } = useSessionStatistics();

  // ✅ Use infinite scroll hook for data fetching
  const {
    sessions,
    isLoading,
    isLoadingMore,
    hasNextPage,
    loadMore,
    total,
  } = useInfiniteSessions({
    filters: {
      searchQuery: debouncedSearchQuery,
      statusFilter,
      connectorTypeFilter,
      powerOutputFilter,
    },
    pageSize: 20,
  });

  // ✅ Use session actions hook
  const { viewDetails, stopSession } = useSessionActions();

  // Revolutionary floating stats with live data
  const sessionStats: SessionStats[] = [
    {
      title: 'Active Sessions',
      value: activeSessions.formatted,
      icon: BoltIcon,
      variant: 'emerald',
      trend: '+3 in last hour',
      description: 'Currently charging vehicles with live power monitoring',
      isLive: true,
    },
    {
      title: 'Power Output',
      value: totalPowerOutput.formatted,
      icon: FireIcon,
      variant: 'amber',
      trend: '↗️ Peak load active',
      description: 'Total network power consumption in real-time',
      isLive: true,
    },
    {
      title: 'Completed Today',
      value: completedToday.formatted,
      icon: CheckCircleIcon,
      variant: 'blue',
      trend: '+15% vs yesterday',
      description: 'Successfully completed charging sessions',
    },
    {
      title: 'Revenue Flow',
      value: revenueFlow.formatted,
      icon: BanknotesIcon,
      variant: 'teal',
      trend: '+22% revenue growth',
      description: 'Live revenue from active charging sessions',
      isLive: true,
    },
  ];

  /**
   * 🎨 Clear All Filters
   */
  const handleClearFilters = () => {
    setStatusFilter('all');
    setConnectorTypeFilter('all');
    setPowerOutputFilter('all');
    setSearchQuery('');
  };

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

        {/* ✅ Updated PageHeader - Removed Monitor Sessions button */}
        <PageHeader
          title="Live Charging Sessions"
          description="Critical real-time monitoring & management"
          variant="emerald"
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

        {/* ✅ New SearchFilterBar Integration */}
        <SearchFilterBar
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search sessions, stations, users..."
          onFilterClick={() => setIsFilterModalOpen(true)}
          isFilterActive={statusFilter !== 'all' || connectorTypeFilter !== 'all' || powerOutputFilter !== 'all'}
          filterLabel="Session Filters"
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          variant="primary"
          className="mb-8"
        />

        {/* ✅ Loading States */}
        {isLoading && viewMode === 'table' && (
          <SessionTableSkeleton count={10} />
        )}

        {isLoading && viewMode === 'grid' && (
          <SessionGridSkeleton count={6} />
        )}

        {/* ✅ Use new reusable SessionTable component with infinite scroll */}
        {!isLoading && viewMode === 'table' && (
          <SessionTable
            sessions={sessions}
            onViewDetails={viewDetails}
            onStopSession={stopSession}
            showStopButton={true}
            onLoadMore={loadMore}
            isLoadingMore={isLoadingMore}
            hasNextPage={hasNextPage}
            total={total}
          />
        )}

        {/* ✅ Use new reusable SessionGrid component with infinite scroll */}
        {!isLoading && viewMode === 'grid' && (
          <SessionGrid
            sessions={sessions}
            onViewDetails={viewDetails}
            onStopSession={stopSession}
            showStopButton={true}
            onLoadMore={loadMore}
            isLoadingMore={isLoadingMore}
            hasNextPage={hasNextPage}
            total={total}
          />
        )}

        {/* Empty State - Using New EmptyState Component */}
        {!isLoading && sessions.length === 0 && (
          <EmptyState
            icon={BoltIcon}
            title="No sessions found"
            description="Try adjusting your search or filter criteria"
            actionLabel="Clear Filters"
            onAction={handleClearFilters}
            variant="emerald"
          />
        )}
      </PageContainer>

      {/* ✅ Use new reusable SessionFilterModal component */}
      <SessionFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        statusFilter={statusFilter}
        connectorTypeFilter={connectorTypeFilter}
        powerOutputFilter={powerOutputFilter}
        onStatusChange={setStatusFilter}
        onConnectorTypeChange={setConnectorTypeFilter}
        onPowerOutputChange={setPowerOutputFilter}
        onClearFilters={handleClearFilters}
      />
    </MainLayout>
  );
};

export default SessionsPage;
