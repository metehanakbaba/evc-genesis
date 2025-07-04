'use client';

import type React from 'react';
import { useState } from 'react';
import { DashboardFooter } from '@/features/admin/components/DashboardFooter';
import { FloatingOrbs } from '@/features/admin/components/FloatingOrbs';
import { AppHeader } from './AppHeader';
import { IntelligenceSidebar } from './IntelligenceSidebar';
import { NotificationSidebar } from './NotificationSidebar';

export interface MainLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  showFloatingOrbs?: boolean;
  showNotifications?: boolean;
  notificationCount?: number;
  headerVariant?: 'default' | 'compact';
  className?: string;
}

/**
 * Main Layout Component - Merkezi layout sistemi
 * Header, FloatingOrbs ve Footer'ı otomatik yönetir
 */
export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  showHeader = true,
  showFooter = true,
  showFloatingOrbs = true,
  showNotifications = true,
  notificationCount = 0,
  headerVariant = 'default',
  className = '',
}) => {
  const [isIntelligenceSidebarOpen, setIsIntelligenceSidebarOpen] =
    useState(false);
  const [isNotificationSidebarOpen, setIsNotificationSidebarOpen] =
    useState(false);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden ${className}`}
    >
      {/* Floating Background Orbs */}
      {showFloatingOrbs && <FloatingOrbs />}

      {/* Header */}
      {showHeader && (
        <AppHeader
          showNotifications={showNotifications}
          notificationCount={notificationCount}
          variant={headerVariant}
          isIntelligenceSidebarOpen={isIntelligenceSidebarOpen}
          isNotificationSidebarOpen={isNotificationSidebarOpen}
          onToggleIntelligenceSidebar={() =>
            setIsIntelligenceSidebarOpen(!isIntelligenceSidebarOpen)
          }
          onToggleNotificationSidebar={() =>
            setIsNotificationSidebarOpen(!isNotificationSidebarOpen)
          }
        />
      )}

      {/* Sidebars */}
      <IntelligenceSidebar
        isOpen={isIntelligenceSidebarOpen}
        onClose={() => setIsIntelligenceSidebarOpen(false)}
      />

      <NotificationSidebar
        isOpen={isNotificationSidebarOpen}
        onClose={() => setIsNotificationSidebarOpen(false)}
        notificationCount={notificationCount}
      />

      {/* Main Content */}
      <main className="relative z-10 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>

      {/* Footer */}
      {showFooter && <DashboardFooter />}
    </div>
  );
};

export default MainLayout;
