'use client';

import React from 'react';
import {
  CoreManagementSection,
  DeveloperToolsSection,
  LiveOperationsSection,
  RevolutionaryStatCard,
} from '@/features/admin/components';
import { useDashboardData } from '@/features/admin/hooks/useDashboardData';
import { MainLayout } from '@/shared/ui/components/Layout/MainLayout';

/**
 * Revolutionary Admin Dashboard - Main Page (Root Path)
 */
const DashboardPage: React.FC = React.memo(() => {
  const {
    networkStats,
    coreManagement,
    activeOperations,
    developerTools,
    isDeveloperMode,
  } = useDashboardData();

  return (
    <MainLayout
      showNotifications={true}
      notificationCount={3}
      headerVariant="default"
    >
      <div className="space-y-12">
        {/* Hero Header */}
        <header className="text-center py-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-500/15 to-teal-600/10 rounded-3xl blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-6 mb-8 transform hover:scale-105 transition-transform duration-700">
              <div className="relative">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500/30 via-cyan-400/20 to-teal-500/25 border border-cyan-400/40 flex items-center justify-center backdrop-blur-xl shadow-2xl">
                  <RevolutionaryStationIcon className="w-12 h-12 animate-pulse" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full animate-ping" />
              </div>
              <div className="text-left">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent mb-2">
                  EV Admin Dashboard
                </h1>
                <p className="text-gray-300">
                  Electric vehicle charging network management system
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Network Stats with fixed grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 grid-align-stretch">
          {networkStats.map((stat) => (
            <RevolutionaryStatCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Live Operations */}
        <LiveOperationsSection activeOperations={activeOperations} />

        {/* Core Management */}
        <CoreManagementSection coreManagement={coreManagement} />

        {/* Developer Tools */}
        <DeveloperToolsSection
          developerTools={developerTools}
          isDeveloperMode={isDeveloperMode}
        />
      </div>
    </MainLayout>
  );
});

DashboardPage.displayName = 'DashboardPage';

export default DashboardPage;

/**
 * Revolutionary Station Icon Component
 */
const RevolutionaryStationIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L2 7V12C2 16.5 4.23 20.68 7.62 23.15L12 24L16.38 23.15C19.77 20.68 22 16.5 22 12V7L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 7V17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M8 12H16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle
      cx="12"
      cy="12"
      r="3"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);
