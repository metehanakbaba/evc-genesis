'use client';

import React, { useEffect, useState } from 'react';
import { MainLayout } from '@/shared/ui/components/Layout/MainLayout';
import {
  CoreManagementSection,
  DeveloperToolsSection,
  LiveOperationsSection,
} from '../components';
import { useDashboardData } from '../hooks/useDashboardData';

/**
 * Revolutionary & Live Dashboard - Sophisticated Enterprise Focus
 */
const DashboardPage: React.FC = React.memo(() => {
  const { coreManagement, activeOperations, isDeveloperMode } =
    useDashboardData();

  const [isLiveDataEnabled, _] = useState(true);

  /**
   * 🔄 Live Data Effect for real-time updates
   */
  useEffect(() => {
    if (!isLiveDataEnabled) return;

    const interval = setInterval(() => {
      // Simulate live data updates
      console.log('🔄 Live dashboard update');
    }, 5000);

    return () => clearInterval(interval);
  }, [isLiveDataEnabled]);

  return (
    <MainLayout
      showNotifications={true}
      notificationCount={3}
      headerVariant="default"
    >
      {/* Revolutionary Floating Background Orbs - Fixed positioning */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-emerald-600/12 rounded-full blur-2xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-teal-600/8 rounded-full blur-3xl animate-pulse delay-3000"></div>
      </div>

      <div className="min-h-screen relative z-10">
        <div className="p-8">
          <div className="max-w-7xl mx-auto space-y-12">
            {/* Minimal Header */}
            <header className="text-center py-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-emerald-400 text-sm font-medium">
                  LIVE
                </span>
              </div>

              <h1 className="text-4xl font-light text-white mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-400">Enterprise System Management</p>
            </header>

            {/* Live Operations - Minimal Design */}
            <section className="relative">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-light text-white mb-1">
                      Live Operations
                    </h2>
                    <p className="text-gray-400 text-sm">
                      Critical infrastructure monitoring
                    </p>
                  </div>
                  {/* Live Operations Indicator */}
                  <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-emerald-400 text-xs font-medium">
                      {activeOperations.length} Active
                    </span>
                  </div>
                </div>
              </div>

              <LiveOperationsSection activeOperations={activeOperations} />
            </section>

            {/* Core System Administration - Minimal Design */}
            <section className="relative">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-light text-white mb-1">
                      Core System Administration
                    </h2>
                    <p className="text-gray-400 text-sm">
                      System management and controls
                    </p>
                  </div>
                  {/* System Health Indicator */}
                  <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-blue-400 text-xs font-medium">
                      99.7% Uptime
                    </span>
                  </div>
                </div>
              </div>

              <CoreManagementSection coreManagement={coreManagement} />
            </section>

            {/* Developer Resources - Minimal Design */}
            {isDeveloperMode && (
              <section className="relative">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-light text-white mb-1">
                        Developer Resources
                      </h2>
                      <p className="text-gray-400 text-sm">
                        Development tools and documentation
                      </p>
                    </div>
                    {/* Dev Mode Indicator */}
                    <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-purple-400 text-xs font-medium">
                        DEV MODE
                      </span>
                    </div>
                  </div>
                </div>

                <DeveloperToolsSection
                  developerTools={[
                    {
                      title: 'Documentation',
                      description:
                        'API documentation, guides, and technical references',
                      path: '/docs',
                      badge: 'Docs',
                      variant: 'cyan',
                      icon: require('@heroicons/react/24/outline')
                        .DocumentTextIcon,
                    },
                    {
                      title: 'Project Management',
                      description:
                        'AI-powered project tracking and status management',
                      path: '/project-management',
                      badge: 'AI',
                      variant: 'purple',
                      icon: require('@heroicons/react/24/outline').ChartBarIcon,
                    },
                  ]}
                  isDeveloperMode={isDeveloperMode}
                />
              </section>
            )}

            {/* System Status Footer */}
            <footer className="text-center py-8">
              <div className="flex items-center justify-center gap-6 mb-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full backdrop-blur-xl">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm">
                    All Systems Operational
                  </span>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-xl">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300"></div>
                  <span className="text-blue-400 text-sm">
                    Live Data Active
                  </span>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full backdrop-blur-xl">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-600"></div>
                  <span className="text-purple-400 text-sm">AI Ready</span>
                </div>
              </div>

              <p className="text-gray-500 text-sm">
                Last updated: {new Date().toLocaleTimeString()} • Version 1.0.0
              </p>
            </footer>
          </div>
        </div>
      </div>
    </MainLayout>
  );
});

DashboardPage.displayName = 'DashboardPage';

export default DashboardPage;
