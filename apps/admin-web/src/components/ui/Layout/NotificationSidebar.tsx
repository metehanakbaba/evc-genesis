'use client';

import {
  BellIcon,
  XMarkIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  WrenchScrewdriverIcon,
  InboxIcon
} from '@heroicons/react/24/outline';
import type React from 'react';

export interface NotificationSidebarProps {
  /** Sidebar open state */
  isOpen: boolean;
  /** Close sidebar handler */
  onClose: () => void;
  /** Notification count */
  notificationCount?: number;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'success' | 'warning' | 'error' | 'info' | 'alert';
  isRead: boolean;
}

// Mock notifications data
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    title: 'New Station Online',
    message: 'Station #156 is now operational in Downtown area',
    time: '2 minutes ago',
    type: 'success',
    isRead: false,
  },
  {
    id: 2,
    title: 'High Usage Alert',
    message: 'Station #23 experiencing high demand - consider load balancing',
    time: '15 minutes ago',
    type: 'warning',
    isRead: false,
  },
  {
    id: 3,
    title: 'System Update',
    message:
      'Firmware update v2.1.0 completed successfully across all stations',
    time: '1 hour ago',
    type: 'info',
    isRead: true,
  },
  {
    id: 4,
    title: 'Maintenance Required',
    message: 'Station #42 requires scheduled maintenance within 24 hours',
    time: '2 hours ago',
    type: 'alert',
    isRead: false,
  },
  {
    id: 5,
    title: 'Revenue Milestone',
    message: 'Daily revenue target of ₺25,000 achieved ahead of schedule',
    time: '3 hours ago',
    type: 'success',
    isRead: true,
  },
];

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return <CheckCircleIcon className="w-5 h-5 text-green-400" />;
    case 'warning':
      return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-400" />;
    case 'error':
      return <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />;
    case 'info':
      return <InformationCircleIcon className="w-5 h-5 text-blue-400" />;
    case 'alert':
      return <WrenchScrewdriverIcon className="w-5 h-5 text-purple-400" />;
    default:
      return <BellIcon className="w-5 h-5 text-gray-400" />;
  }
};



const getNotificationBgColor = (type: string, isRead: boolean): string => {
  const baseClasses = isRead
    ? 'bg-gray-800/30 border-gray-700/30'
    : 'bg-gray-800/50 border-gray-700/50';

  switch (type) {
    case 'success':
      return `${baseClasses} hover:bg-green-500/5`;
    case 'warning':
      return `${baseClasses} hover:bg-yellow-500/5`;
    case 'error':
      return `${baseClasses} hover:bg-red-500/5`;
    case 'info':
      return `${baseClasses} hover:bg-blue-500/5`;
    case 'alert':
      return `${baseClasses} hover:bg-purple-500/5`;
    default:
      return baseClasses;
  }
};

/**
 * Notification Sidebar Component
 * Displays real-time notifications from the right side
 */
export const NotificationSidebar: React.FC<NotificationSidebarProps> = ({
  isOpen,
  onClose,
  notificationCount = 0,
}) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed right-0 top-0 h-full w-96 bg-gradient-to-b from-gray-900/95 via-gray-800/95 to-gray-900/95 
          backdrop-blur-xl border-l border-gray-700/50 shadow-2xl z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <BellIcon className="w-6 h-6 text-gray-300" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {notificationCount}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Notifications
                </h2>
                <p className="text-sm text-gray-400">
                  {MOCK_NOTIFICATIONS.filter((n) => !n.isRead).length} new
                  notifications
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700/50"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="p-6 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          {MOCK_NOTIFICATIONS.map((notification) => (
            <div
              key={notification.id}
              className={`
                p-4 rounded-xl border backdrop-blur-sm cursor-pointer
                ${getNotificationBgColor(notification.type, notification.isRead)}
                ${notification.isRead ? 'opacity-60' : ''}
                transition-all duration-200 hover:scale-[1.02]
              `}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3
                      className={`text-sm font-medium truncate ${notification.isRead ? 'text-gray-400' : 'text-white'}`}
                    >
                      {notification.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <ClockIcon className="w-3 h-3" />
                      <span>{notification.time}</span>
                    </div>
                  </div>

                  <p
                    className={`text-sm leading-relaxed ${notification.isRead ? 'text-gray-500' : 'text-gray-300'}`}
                  >
                    {notification.message}
                  </p>

                  {!notification.isRead && (
                    <div className="mt-3 flex items-center justify-between">
                      <button className="text-xs text-blue-400 hover:text-blue-300 font-medium">
                        Mark as read
                      </button>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {MOCK_NOTIFICATIONS.length === 0 && (
            <div className="text-center py-12">
              <InboxIcon className="w-16 h-16 mx-auto mb-4 text-gray-500 opacity-50" />
              <p className="text-gray-400 text-lg">No notifications</p>
              <p className="text-gray-500 text-sm mt-2">
                You're all caught up!
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700/50 bg-gray-900/90 backdrop-blur-xl">
          <div className="space-y-3">
            <button className="w-full py-2 px-4 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">
              Mark All as Read
            </button>
            <button className="w-full py-2 px-4 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 rounded-lg text-gray-300 hover:text-white transition-colors text-sm font-medium">
              View All Notifications
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationSidebar;
