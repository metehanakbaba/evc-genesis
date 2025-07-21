'use client';

import {
  BanknotesIcon,
  BoltIcon,
  CheckCircleIcon,
  FireIcon,
} from '@heroicons/react/24/outline';
import { MainLayout, PageContainer, PageHeader } from '@ui/layout';
import type React from 'react';
import { useState, useMemo } from 'react';
import { Breadcrumb } from '@/shared/ui/components/Navigation';
import { useBulkSelection } from '@/shared/ui';


// ✅ Import new session components and hooks
import {
  useInfiniteSessions,
  useSearchDebounce,
  useSessionActions,
  useSessionStatistics,
} from '../components';
import { GenericFilterGroup, GenericFilterModal, QuickFilterGroup, QuickFilterButtons } from '@/shared/ui';
import SessionBulkActions from '../components/SessionBulkActions';
import SessionsDataSection from '../components/SessionsDataSection';
import { SessionStatsSection } from '../components/SessionStatsSection';
import { SessionSearchSection } from '../components/SessionSearchSection';

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

  const debouncedSearchQuery = useSearchDebounce(searchQuery, 300);

  const {    viewDetails,
    stopSession,
  } = useSessionActions();


  const { sessions, isLoading, isLoadingMore, hasNextPage, loadMore, total, error } =
    useInfiniteSessions({
      filters: {
        searchQuery: debouncedSearchQuery,
        statusFilter,
        connectorTypeFilter,
        powerOutputFilter,
      },
      pageSize: 20,
    });

        // ✅ Bulk selection management
    const { selectedIds, selectedCount, clearSelection } =
      useBulkSelection(sessions);

      const {      
        activeSessions,
      totalPowerOutput,
      completedToday,
      revenueFlow,} = useSessionStatistics();

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


  const filterGroups = useMemo((): GenericFilterGroup[] => [
    {
      id: 'status',
      title: 'Session Status',
      selectedValue: statusFilter,
      onChange: setStatusFilter,
      options: [
        { id: 'all', label: 'All Status', icon: BoltIcon, color: 'gray' },
        { id: 'charging', label: 'Charging', icon: BoltIcon, color: 'emerald' },
        { id: 'starting', label: 'Starting', icon: BoltIcon, color: 'blue' },
        { id: 'completed', label: 'Completed', icon: CheckCircleIcon, color: 'green' },
        { id: 'failed', label: 'Failed', icon: BoltIcon, color: 'red' },
        { id: 'cancelled', label: 'Cancelled', icon: BoltIcon, color: 'gray' },
      ],
    },
    {
      id: 'connector',
      title: 'Connector Type',
      selectedValue: connectorTypeFilter,
      onChange: setConnectorTypeFilter,
      options: [
        { id: 'all', label: 'All Connectors', icon: BoltIcon, color: 'gray' },
        { id: 'CCS', label: 'CCS', icon: BoltIcon, color: 'blue' },
        { id: 'CHAdeMO', label: 'CHAdeMO', icon: BoltIcon, color: 'purple' },
        { id: 'Type2', label: 'Type 2', icon: BoltIcon, color: 'green' },
      ],
    },
    {
      id: 'power',
      title: 'Power Output',
      selectedValue: powerOutputFilter,
      onChange: setPowerOutputFilter,
      options: [
        { id: 'all', label: 'All Power', icon: FireIcon, color: 'gray' },
        { id: 'fast', label: 'Fast (50kW+)', icon: FireIcon, color: 'red' },
        { id: 'slow', label: 'Standard (<50kW)', icon: FireIcon, color: 'blue' },
      ],
    },
  ], [statusFilter, connectorTypeFilter, powerOutputFilter]);

  // ✅ CREATE QUICK FILTER GROUPS for Universal Component
  const quickFilterGroups = useMemo(
    (): QuickFilterGroup[] => [
      {
        id: 'status',
        title: 'Session Status',
        icon: BoltIcon,
        selectedValue: statusFilter,
        onChange: setStatusFilter,
        options: [
          { id: 'all', label: 'All Status', icon: BoltIcon, color: 'gray' },
          { id: 'charging', label: 'Charging', icon: BoltIcon, color: 'emerald' },
          { id: 'starting', label: 'Starting', icon: BoltIcon, color: 'blue' },
          { id: 'completed', label: 'Completed', icon: CheckCircleIcon, color: 'emerald' },
          { id: 'failed', label: 'Failed', icon: BoltIcon, color: 'red' },
          { id: 'cancelled', label: 'Cancelled', icon: BoltIcon, color: 'red' },
        ],
      },
      {
        id: 'connector',
        title: 'Connector Type',
        icon: BoltIcon,
        selectedValue: connectorTypeFilter,
        onChange: setConnectorTypeFilter,
        options: [
          { id: 'all', label: 'All Connectors', icon: BoltIcon, color: 'gray' },
          { id: 'CCS', label: 'CCS', icon: BoltIcon, color: 'blue' },
          { id: 'CHAdeMO', label: 'CHAdeMO', icon: BoltIcon, color: 'purple' },
          { id: 'Type2', label: 'Type 2', icon: BoltIcon, color: "emerald" },
          { id: 'CCS_CHAdeMO', label: 'CCS + CHAdeMO', icon: BoltIcon, color: 'amber' },
        ],
      },
      {
        id: 'power',
        title: 'Power Output',
        icon: FireIcon,
        selectedValue: powerOutputFilter,
        onChange: setPowerOutputFilter,
        options: [
          { id: 'all', label: 'All Power Levels', icon: FireIcon, color: 'gray' },
          { id: 'fast', label: 'Fast (50kW+)', icon: FireIcon, color: 'red' },
          { id: 'slow', label: 'Standard (<50kW)', icon: BoltIcon, color: 'blue' },
        ],
      },
    ],
    [statusFilter, connectorTypeFilter, powerOutputFilter],
  );

  const handleClearFilters = () => {
    setStatusFilter('all');
    setConnectorTypeFilter('all');
    setPowerOutputFilter('all');
    setSearchQuery('');
  };

  return (
    <MainLayout showNotifications notificationCount={3} headerVariant="default">
      <PageContainer paddingY="lg">
        <Breadcrumb currentPageLabel="Live Sessions" variant="emerald" />
        <PageHeader
          title="Live Charging Sessions"
          description="Critical real-time monitoring & management"
          variant="emerald"
          indicator={
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
              <span className="text-emerald-400 font-semibold">LIVE</span>
            </div>
          }
        />
      </PageContainer>

      <PageContainer paddingY="lg" className="space-y-10">

        <SessionStatsSection stats={sessionStats} />

        <SessionSearchSection 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onOpenFilterModal={() => setIsFilterModalOpen(true)}
          isFilterActive={            
            statusFilter !== 'all' ||
            connectorTypeFilter !== 'all' ||
            powerOutputFilter !== 'all'}
        />

        {/* ✅ Universal Quick Filter Buttons */}
        <QuickFilterButtons
          filterGroups={quickFilterGroups}
          variant="purple"
        />

        <SessionsDataSection 
          sessions={sessions}
          isLoading={isLoading}
          isLoadingMore={isLoadingMore}
          hasNextPage={hasNextPage}
          total={total}
          viewMode={viewMode}
          onLoadMore={loadMore}
          onViewDetails={viewDetails}
          onStopSession={stopSession}
          error={error}
          onClear={clearSelection}
          />
      </PageContainer>

      <GenericFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title="Session Filters"
        description="Filter sessions by status, connector, and power"
        filterGroups={filterGroups}
        onClearFilters={handleClearFilters}
        variant="emerald"
      />

      <SessionBulkActions 
        selectedCount={selectedCount}
        totalCount={activeSessions.count}
        selectedIds={selectedIds}
        onClearSelection={clearSelection}
      />
    </MainLayout>
  );
};

export default SessionsPage;
