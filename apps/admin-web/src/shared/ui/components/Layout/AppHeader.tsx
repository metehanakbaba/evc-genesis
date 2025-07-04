'use client';

import {
  ArrowRightOnRectangleIcon,
  BellIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  CpuChipIcon,
  SparklesIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import React from 'react';
import { RevolutionaryStationIcon } from '@/features/admin/components';
import { useAppSelector } from '@/lib/store/hooks';

export interface AppHeaderProps {
  /** Additional CSS classes */
  className?: string;
  /** Show notifications badge */
  showNotifications?: boolean;
  /** Notification count */
  notificationCount?: number;
  /** Header variant */
  variant?: 'default' | 'compact';
  /** Intelligence sidebar state */
  isIntelligenceSidebarOpen?: boolean;
  /** Notification sidebar state */
  isNotificationSidebarOpen?: boolean;
  /** Toggle intelligence sidebar */
  onToggleIntelligenceSidebar?: () => void;
  /** Toggle notification sidebar */
  onToggleNotificationSidebar?: () => void;
}

/**
 * EV Charging Admin Dashboard Header Component
 * Features Welcome Back message, user info, and logout functionality
 */
export const AppHeader: React.FC<AppHeaderProps> = ({
  className = '',
  showNotifications = true,
  notificationCount = 0,
  variant = 'default',
  isIntelligenceSidebarOpen = false,
  isNotificationSidebarOpen = false,
  onToggleIntelligenceSidebar,
  onToggleNotificationSidebar,
}) => {
  const user = useAppSelector((state) => state.auth.user);
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logout clicked');
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const headerHeight = variant === 'compact' ? 'h-16' : 'h-20';

  return (
    <header
      className={`
      ${headerHeight} 
      bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
      border-b border-gray-700/50 
      backdrop-blur-xl 
      sticky top-0 z-40
      ${className}
    `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Left Side - Logo & Welcome */}
          <div className="flex items-center space-x-6">
            {/* EV Charging Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-cyan-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25 backdrop-blur-xl">
                  <RevolutionaryStationIcon className="w-7 h-7 animate-pulse" />
                </div>
                {/* Charging indicator */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full animate-ping border-2 border-gray-900" />
              </div>

              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-white">EV Admin</h1>
                <p className="text-xs text-gray-400">Charging Network</p>
              </div>
            </div>

            {/* Welcome Message */}
            {variant === 'default' && (
              <div className="hidden lg:block border-l border-gray-700 pl-6">
                <p className="text-sm text-gray-400">{getGreeting()},</p>
                <p className="text-lg font-semibold text-white">
                  Welcome Back {user?.email?.split('@')[0] || 'Administrator'}
                </p>
              </div>
            )}
          </div>

          {/* Center - AI Intelligence Center Button */}
          <div className="flex items-center">
            <button
              onClick={onToggleIntelligenceSidebar}
              className={`
                flex items-center space-x-3 px-4 py-2 rounded-xl 
                bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-purple-600/20 
                border border-purple-500/30 
                text-purple-300 hover:text-purple-200 
                hover:border-purple-400/50 
                transition-all duration-300 
                backdrop-blur-sm
                ${isIntelligenceSidebarOpen ? 'bg-purple-600/30 border-purple-400/60' : ''}
              `}
            >
              <div className="relative">
                <SparklesIcon className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              </div>
              <span className="font-medium hidden sm:block">
                AI Intelligence Center
              </span>
              <CpuChipIcon className="w-4 h-4 opacity-60" />
            </button>
          </div>

          {/* Right Side - Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            {showNotifications && (
              <button
                onClick={onToggleNotificationSidebar}
                className={`
                  relative p-2 text-gray-400 hover:text-white 
                  transition-colors duration-200 hover:bg-gray-700/50 rounded-lg
                  ${isNotificationSidebarOpen ? 'bg-gray-700/50 text-white' : ''}
                `}
              >
                <BellIcon className="w-6 h-6" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {notificationCount > 99 ? '99+' : notificationCount}
                  </span>
                )}
              </button>
            )}

            {/* Settings */}
            <button className="p-2 text-gray-400 hover:text-white transition-colors duration-200 hover:bg-gray-700/50 rounded-lg">
              <Cog6ToothIcon className="w-6 h-6" />
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 p-2 text-gray-300 hover:text-white transition-colors duration-200 hover:bg-gray-700/50 rounded-lg"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <UserCircleIcon className="w-5 h-5 text-white" />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium">
                    {user?.email?.split('@')[0] || 'Admin'}
                  </p>
                  <p className="text-xs text-gray-400">Administrator</p>
                </div>
                <ChevronDownIcon
                  className={`w-4 h-4 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`}
                />
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl shadow-black/20 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <p className="text-sm font-medium text-white">
                      {user?.email || 'admin@example.com'}
                    </p>
                    <p className="text-xs text-gray-400">
                      System Administrator
                    </p>
                  </div>

                  <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors duration-200 flex items-center space-x-2">
                    <UserCircleIcon className="w-4 h-4" />
                    <span>Profile Settings</span>
                  </button>

                  <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors duration-200 flex items-center space-x-2">
                    <Cog6ToothIcon className="w-4 h-4" />
                    <span>Preferences</span>
                  </button>

                  <div className="border-t border-gray-700 mt-2 pt-2">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <ArrowRightOnRectangleIcon className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Revolutionary Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating charging particles */}
        <div className="absolute top-2 left-1/4 w-1 h-1 bg-blue-400/40 rounded-full animate-ping" />
        <div className="absolute top-4 right-1/3 w-1 h-1 bg-cyan-400/40 rounded-full animate-pulse" />
        <div className="absolute bottom-2 left-2/3 w-1 h-1 bg-green-400/40 rounded-full animate-ping animation-delay-1000" />

        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/5 via-transparent to-cyan-900/5" />
      </div>
    </header>
  );
};

export default AppHeader;
