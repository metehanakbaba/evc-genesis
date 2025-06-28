'use client';

import React, { useState } from 'react';
import { AppHeader } from './AppHeader';
import { IntelligenceSidebar } from './IntelligenceSidebar';
import { NotificationSidebar } from './NotificationSidebar';
import { FloatingOrbs } from '@/features/admin/components/FloatingOrbs';
import { DashboardFooter } from '@/features/admin/components/DashboardFooter';

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
  const [isIntelligenceSidebarOpen, setIsIntelligenceSidebarOpen] = useState(false);
  const [isNotificationSidebarOpen, setIsNotificationSidebarOpen] = useState(false);
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
          onToggleIntelligenceSidebar={() => setIsIntelligenceSidebarOpen(!isIntelligenceSidebarOpen)}
          onToggleNotificationSidebar={() => setIsNotificationSidebarOpen(!isNotificationSidebarOpen)}
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

      {/* Global animations */}
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(2rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out forwards;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default MainLayout;
