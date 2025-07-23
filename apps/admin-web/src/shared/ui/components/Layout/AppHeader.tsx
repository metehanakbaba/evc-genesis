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
import { useAuthMiddleware } from '@/features/auth/hooks/useAuthMiddleware';
import { ProfileModal } from './ProfileModal';

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
 * Features Welcome Back message, user info, logout functionality, and enterprise-grade design
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
  const [showProfileModal, setShowProfileModal] = React.useState(false);
  const [modalTab, setModalTab] = React.useState<'profile' | 'security'>('profile');
  const { logout: handleLogout, isLoggingOut } = useAuthMiddleware();

  const handleProfileClick = () => {
    setShowUserMenu(false);
    setModalTab('profile');
    setShowProfileModal(true);
  };

  const handlePreferencesClick = () => {
    setShowUserMenu(false);
    setModalTab('security'); // Security settings as preferences
    setShowProfileModal(true);
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
              <div className="hidden lg:block border-l border-gray-700/50 pl-6">
                <p className="text-sm text-gray-400">{getGreeting()},</p>
                <p className="text-lg font-semibold text-white">
                  Welcome Back {user?.firstName || user?.email?.split('@')[0] || 'Administrator'}
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

            {/* Enhanced User Avatar & Menu with Enterprise Styling */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 p-3 rounded-2xl bg-gradient-to-r from-gray-800/60 via-gray-700/40 to-gray-800/60 border border-gray-600/30 hover:border-cyan-400/30 backdrop-blur-xl transition-all duration-300 group hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 via-blue-500/30 to-purple-500/20 rounded-xl flex items-center justify-center border border-cyan-400/20 shadow-lg">
                    <UserCircleIcon className="w-6 h-6 text-cyan-300 group-hover:text-cyan-200 transition-colors" />
                  </div>
                  {/* Online status indicator */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-gray-900 rounded-full animate-pulse"></div>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-white group-hover:text-cyan-200 transition-colors">
                    {user?.firstName || user?.email?.split('@')[0] || 'Admin'}
                  </p>
                  <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                    System Administrator
                  </p>
                </div>
                <ChevronDownIcon
                  className={`w-4 h-4 text-gray-400 group-hover:text-cyan-300 transition-all duration-300 ${showUserMenu ? 'rotate-180 text-cyan-400' : ''}`}
                />
              </button>

              {/* Enhanced User Dropdown Menu with Enterprise Design */}
              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-56 bg-gradient-to-br from-gray-800/95 via-gray-700/90 to-gray-900/95 backdrop-blur-2xl border border-gray-600/40 rounded-2xl shadow-2xl shadow-black/40 py-3 z-50 animate-in slide-in-from-top-2 duration-200">
                  {/* User Info Header */}
                  <div className="px-5 py-3 border-b border-gray-600/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-500/20 to-blue-500/30 rounded-lg flex items-center justify-center border border-cyan-400/20">
                        <UserCircleIcon className="w-5 h-5 text-cyan-300" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {user?.firstName ? `${user.firstName} ${user.lastName}` : user?.email || 'admin@evc.com'}
                        </p>
                        <p className="text-xs text-cyan-400 font-medium">
                          System Administrator
                        </p>
                      </div>
                    </div>
                    {/* Account stats */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-600/20">
                      <span className="text-xs text-gray-400">Role</span>
                      <span className="text-xs font-medium text-emerald-400">{user?.role || 'ADMIN'}</span>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="px-2 py-1">
                    <button 
                      onClick={handleProfileClick}
                      className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 hover:border-cyan-400/20 border border-transparent rounded-xl transition-all duration-200 flex items-center space-x-3 group"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <UserCircleIcon className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div>
                        <span className="font-medium">Profile Settings</span>
                        <p className="text-xs text-gray-500">Manage your account</p>
                      </div>
                    </button>

                    <button 
                      onClick={handlePreferencesClick}
                      className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 hover:border-purple-400/20 border border-transparent rounded-xl transition-all duration-200 flex items-center space-x-3 group"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Cog6ToothIcon className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <span className="font-medium">Preferences</span>
                        <p className="text-xs text-gray-500">Customize settings</p>
                      </div>
                    </button>
                  </div>

                  {/* Logout Section */}
                  <div className="border-t border-gray-600/30 mt-2 pt-2 px-2">
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="w-full text-left px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-red-600/10 hover:border-red-400/20 border border-transparent rounded-xl transition-all duration-200 flex items-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        {isLoggingOut ? (
                          <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                        ) : (
                          <ArrowRightOnRectangleIcon className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                      <div>
                        <span className="font-medium">
                          {isLoggingOut ? 'Signing Out...' : 'Sign Out'}
                        </span>
                        <p className="text-xs text-gray-500">
                          {isLoggingOut ? 'Please wait...' : 'End your session'}
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Settings Modal */}
      <ProfileModal 
        isOpen={showProfileModal} 
        onClose={() => setShowProfileModal(false)}
        initialTab={modalTab}
      />

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
