'use client';

import {
  BoltIcon,
  CheckCircleIcon,
  EyeIcon,
  PlusIcon,
  SignalIcon,
  WrenchScrewdriverIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@ui/forms';
import { MainLayout, PageContainer, PageHeader } from '@ui/layout';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useState } from 'react';
import { Breadcrumb } from '@/shared/ui/components/Navigation';
import { EmptyState, SearchFilterBar } from '@/shared/ui/molecules';
// ✅ Import debounce hook from wallets
import { useSearchDebounce } from '../../wallets/hooks/useDebounce';
// ✅ Import new reusable components
import { StationFilterModal, StationGrid, StationTable } from '../components';
// ✅ Import skeleton components
import {
  StationGridSkeleton,
  StationTableSkeleton,
} from '../components/StationSkeleton';
// ✅ Import hooks for demo data
import {
  useInfiniteStations,
  useStationActions,
  useStationStatistics,
} from '../hooks';

/**
 * ⚡ Station Management Statistics
 * Revolutionary floating stats with charging data
 */
interface StationStats {
  readonly title: string;
  readonly value: string;
  readonly icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  readonly variant: 'blue' | 'emerald' | 'amber' | 'red';
  readonly trend: string;
  readonly description: string;
  readonly isLive?: boolean;
}

/**
 * 🚀 Revolutionary EV Station Management Page - Blue Theme
 * Sophisticated floating card design with charging operations
 *
 * Features:
 * - Station overview with real-time status
 * - Connector availability tracking
 * - Status management with filters
 * - Location and maintenance tracking
 * - Revolutionary table view with glassmorphism
 * - Modal-based filtering system
 * - API schema compliant TypeScript
 * - ✅ Now uses reusable components and API hooks
 * - ✅ Clean separation of concerns
 */
const StationsPage: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [connectorTypeFilter, setConnectorTypeFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // ✅ Debounce search query to prevent excessive API calls
  const debouncedSearchQuery = useSearchDebounce(searchQuery, 300);

  // ✅ Use infinite scroll hook for data fetching
  const { stations, isLoading, isLoadingMore, hasNextPage, loadMore, total } =
    useInfiniteStations({
      filters: {
        searchQuery: debouncedSearchQuery,
        statusFilter,
        connectorTypeFilter,
      },
      pageSize: 20,
    });

  const {
    totalStations,
    activeStations,
    maintenanceStations,
    totalConnectors,
    availableConnectors,
  } = useStationStatistics();

  const { handleViewDetails, handleEdit } = useStationActions();

  // Wrapper functions to match component expectations
  const viewDetails = (station: any) => handleViewDetails(station.id);
  const editStation = (station: any) => handleEdit(station);

  // Revolutionary floating stats with station data
  const stationStats: StationStats[] = [
    {
      title: 'Infrastructure Assets',
      value: totalStations.formatted,
      icon: BoltIcon,
      variant: 'blue',
      trend: '+3 this week',
      description:
        'Total charging infrastructure deployment across operational territories',
      isLive: true,
    },
    {
      title: 'Operational Status',
      value: activeStations.formatted,
      icon: CheckCircleIcon,
      variant: 'emerald',
      trend: `${Math.round((activeStations.count / totalStations.count) * 100) || 0}% operational`,
      description:
        'Infrastructure assets currently operational and service-ready',
    },
    {
      title: 'Service Availability',
      value: availableConnectors.formatted,
      icon: SignalIcon,
      variant: 'blue',
      trend: `${Math.round((availableConnectors.count / totalConnectors.count) * 100) || 0}% available`,
      description:
        'Charging points available for immediate customer service delivery',
      isLive: true,
    },
    {
      title: 'Service Interruptions',
      value: maintenanceStations.formatted,
      icon: WrenchScrewdriverIcon,
      variant: 'amber',
      trend: 'Planned maintenance',
      description:
        'Infrastructure assets currently undergoing scheduled maintenance protocols',
    },
  ];

  /**
   * 🎨 Clear All Filters
   */
  const handleClearFilters = () => {
    setStatusFilter('all');
    setConnectorTypeFilter('all');
    setSearchQuery('');
  };

  return (
    <MainLayout
      showNotifications={true}
      notificationCount={3}
      headerVariant="default"
    >
      {/* Revolutionary Page Header with Blue Theme */}
      <PageContainer paddingY="md">
        {/* Revolutionary Breadcrumb Navigation */}
        <Breadcrumb
          currentPageLabel="Charging Infrastructure Management"
          variant="blue"
        />

        <PageHeader
          title="Infrastructure Operations Center"
          description="Enterprise-grade charging network administration and performance monitoring across Polish markets"
          variant="blue"
          actionButton={{
            label: 'Deploy Infrastructure',
            onClick: () => {
              router.push('/stations/new');
            },
            icon: PlusIcon,
            iconAnimation: 'rotate-90',
          }}
        />
      </PageContainer>

      <PageContainer paddingY="lg" className="space-y-10">
        {/* Revolutionary Network Stats Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-8 bg-gradient-to-b from-blue-400 to-blue-300 rounded-full"></div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Network Performance Dashboard
              </h2>
              <p className="text-gray-400">
                Comprehensive infrastructure analytics and operational
                intelligence
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stationStats.map((stat, index) => (
              <div
                key={stat.title}
                className="group relative"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Revolutionary MinimalStatCard Design */}
                <div
                  className={`
                  relative p-6 bg-gradient-to-br from-${stat.variant}-500/10 via-${stat.variant}-400/5 to-transparent
                  border border-${stat.variant}-400/25 hover:border-${stat.variant}-300/40
                  rounded-2xl backdrop-blur-xl shadow-2xl hover:shadow-3xl
                  transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1
                  cursor-pointer h-full min-h-[280px] flex flex-col
                `}
                >
                  {/* Live indicator */}
                  {stat.isLive && (
                    <div
                      className={`absolute -top-2 -right-2 w-4 h-4 bg-${stat.variant}-500 rounded-full animate-ping opacity-75`}
                    ></div>
                  )}

                  {/* Floating Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                  {/* Content */}
                  <div className="relative z-10 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-${stat.variant}-500/10 border border-${stat.variant}-500/20 flex items-center justify-center`}
                      >
                        <stat.icon
                          className={`w-6 h-6 text-${stat.variant}-400`}
                        />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white mb-1">
                          {stat.value}
                        </div>
                        <div
                          className={`text-xs font-medium text-${stat.variant}-400`}
                        >
                          {stat.trend}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 flex-grow">
                      <h3 className="text-lg font-semibold text-white leading-tight line-clamp-2">
                        {stat.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                        {stat.description}
                      </p>
                    </div>

                    {/* Revolutionary Interactive Elements */}
                    <div className="mt-auto pt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                      <div className="relative overflow-hidden rounded-lg">
                        <Button
                          size="sm"
                          variant="ghost"
                          className={`
                            w-full relative overflow-hidden backdrop-blur-sm
                            bg-gradient-to-r from-${stat.variant}-500/15 via-${stat.variant}-400/10 to-${stat.variant}-500/15
                            border border-${stat.variant}-400/30 hover:border-${stat.variant}-300/50
                            text-${stat.variant}-300 hover:text-white
                            shadow-lg hover:shadow-${stat.variant}-500/25 hover:shadow-xl
                            transition-all duration-300 ease-out
                            hover:scale-[1.02] active:scale-[0.98]
                            group/button flex items-center justify-center
                          `}
                        >
                          {/* Shine Effect */}
                          <div
                            className={`
                            absolute inset-0 z-0
                            bg-gradient-to-r from-transparent via-white/15 to-transparent
                            translate-x-[-100%] group-hover/button:translate-x-[100%]
                            transition-transform duration-700 ease-out
                          `}
                          ></div>

                          {/* Button Content */}
                          <div className="flex items-center gap-2 relative z-10">
                            <EyeIcon
                              className={`w-4 h-4 text-${stat.variant}-400 group-hover/button:text-white transition-colors duration-300`}
                            />
                            <span className="font-medium text-sm">
                              View Analytics
                            </span>
                            <div
                              className={`w-1 h-1 bg-${stat.variant}-400 rounded-full opacity-60 group-hover/button:opacity-100 transition-opacity duration-300`}
                            ></div>
                          </div>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Revolutionary Station Management Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-8 bg-gradient-to-b from-blue-400 to-blue-300 rounded-full"></div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Infrastructure Asset Management
              </h2>
              <p className="text-gray-400">
                Advanced filtering, monitoring and administration of charging
                infrastructure assets
              </p>
            </div>
          </div>

          {/* Search & Filter Controls - Using New SearchFilterBar Component */}
          <SearchFilterBar
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search assets... (e.g. Warszawa, Kraków, Gdańsk, CCS2, Station-001)"
            onFilterClick={() => setIsFilterModalOpen(true)}
            isFilterActive={
              statusFilter !== 'all' || connectorTypeFilter !== 'all'
            }
            filterLabel="Filters"
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            variant="blue"
            className="mb-6"
          />

          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            {/* Status Quick Filters */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400 font-medium">
                Operational Status:
              </span>
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                  statusFilter === 'all'
                    ? 'bg-blue-500/20 border border-blue-400/40 text-blue-300'
                    : 'bg-gray-700/30 border border-gray-600/30 text-gray-400 hover:bg-gray-600/40 hover:text-gray-300'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter('active')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 flex items-center gap-1.5 ${
                  statusFilter === 'active'
                    ? 'bg-emerald-500/20 border border-emerald-400/40 text-emerald-300'
                    : 'bg-gray-700/30 border border-gray-600/30 text-gray-400 hover:bg-gray-600/40 hover:text-gray-300'
                }`}
              >
                <CheckCircleIcon className="w-3 h-3" />
                Operational
              </button>
              <button
                onClick={() => setStatusFilter('offline')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 flex items-center gap-1.5 ${
                  statusFilter === 'offline'
                    ? 'bg-red-500/20 border border-red-400/40 text-red-300'
                    : 'bg-gray-700/30 border border-gray-600/30 text-gray-400 hover:bg-gray-600/40 hover:text-gray-300'
                }`}
              >
                <XCircleIcon className="w-3 h-3" />
                Offline
              </button>
              <button
                onClick={() => setStatusFilter('maintenance')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 flex items-center gap-1.5 ${
                  statusFilter === 'maintenance'
                    ? 'bg-amber-500/20 border border-amber-400/40 text-amber-300'
                    : 'bg-gray-700/30 border border-gray-600/30 text-gray-400 hover:bg-gray-600/40 hover:text-gray-300'
                }`}
              >
                <WrenchScrewdriverIcon className="w-3 h-3" />
                Maintenance
              </button>
            </div>

            {/* Connector Type Quick Filters */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400 font-medium">
                Connector Standards:
              </span>
              <button
                onClick={() => setConnectorTypeFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                  connectorTypeFilter === 'all'
                    ? 'bg-blue-500/20 border border-blue-400/40 text-blue-300'
                    : 'bg-gray-700/30 border border-gray-600/30 text-gray-400 hover:bg-gray-600/40 hover:text-gray-300'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setConnectorTypeFilter('CCS2')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                  connectorTypeFilter === 'CCS2'
                    ? 'bg-blue-500/20 border border-blue-400/40 text-blue-300'
                    : 'bg-gray-700/30 border border-gray-600/30 text-gray-400 hover:bg-gray-600/40 hover:text-gray-300'
                }`}
              >
                CCS2
              </button>
              <button
                onClick={() => setConnectorTypeFilter('CHAdeMO')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                  connectorTypeFilter === 'CHAdeMO'
                    ? 'bg-purple-500/20 border border-purple-400/40 text-purple-300'
                    : 'bg-gray-700/30 border border-gray-600/30 text-gray-400 hover:bg-gray-600/40 hover:text-gray-300'
                }`}
              >
                CHAdeMO
              </button>
              <button
                onClick={() => setConnectorTypeFilter('Type2')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                  connectorTypeFilter === 'Type2'
                    ? 'bg-green-500/20 border border-green-400/40 text-green-300'
                    : 'bg-gray-700/30 border border-gray-600/30 text-gray-400 hover:bg-gray-600/40 hover:text-gray-300'
                }`}
              >
                Type2
              </button>
            </div>
          </div>

          {/* ✅ Loading States */}
          {isLoading && viewMode === 'table' && (
            <StationTableSkeleton count={10} />
          )}

          {isLoading && viewMode === 'grid' && (
            <StationGridSkeleton count={6} />
          )}

          {/* ✅ Use new reusable StationTable component with infinite scroll */}
          {!isLoading && viewMode === 'table' && (
            <StationTable
              stations={stations}
              onViewDetails={viewDetails}
              onEditStation={editStation}
              onLoadMore={loadMore}
              isLoadingMore={isLoadingMore}
              hasNextPage={hasNextPage}
              total={total}
            />
          )}

          {/* ✅ Use new reusable StationGrid component with infinite scroll */}
          {!isLoading && viewMode === 'grid' && (
            <StationGrid
              stations={stations}
              onViewDetails={viewDetails}
              onEditStation={editStation}
              onLoadMore={loadMore}
              isLoadingMore={isLoadingMore}
              hasNextPage={hasNextPage}
              total={total}
            />
          )}

          {/* Empty State - Using New EmptyState Component */}
          {!isLoading && stations.length === 0 && (
            <EmptyState
              icon={BoltIcon}
              title="No infrastructure assets match criteria"
              description="Refine search parameters or adjust operational status filters to display relevant assets"
              actionLabel="Reset Filters"
              onAction={handleClearFilters}
              variant="blue"
            />
          )}
        </section>
      </PageContainer>

      {/* ✅ Use new reusable StationFilterModal component */}
      <StationFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        statusFilter={statusFilter}
        connectorTypeFilter={connectorTypeFilter}
        onStatusChange={setStatusFilter}
        onConnectorTypeChange={setConnectorTypeFilter}
        onClearFilters={handleClearFilters}
      />
    </MainLayout>
  );
};

export default StationsPage;
