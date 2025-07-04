import {
  BellIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
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
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Payment Processing Alert',
    message: 'High transaction volume detected on Station #127',
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    isRead: false,
  },
  {
    id: '2',
    type: 'success',
    title: 'LLM Model Updated',
    message: 'AI Intelligence model v2.1 deployed successfully',
    timestamp: new Date(Date.now() - 900000), // 15 minutes ago
    isRead: false,
  },
  {
    id: '3',
    type: 'error',
    title: 'Anomaly Detected',
    message: 'Unusual charging pattern in Zone C requires attention',
    timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
    isRead: true,
  },
  {
    id: '4',
    type: 'info',
    title: 'System Maintenance',
    message: 'Scheduled maintenance in 2 hours - backup systems ready',
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    isRead: true,
  },
];

/**
 * Notification Sidebar Component
 * Displays real-time notifications from the right side
 */
export const NotificationSidebar: React.FC<NotificationSidebarProps> = ({
  isOpen,
  onClose,
  notificationCount = 0,
}) => {
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
      default:
        return <BellIcon className="w-5 h-5 text-gray-400" />;
    }
  };

  const getNotificationBgColor = (
    type: Notification['type'],
    isRead: boolean,
  ) => {
    const opacity = isRead ? '10' : '20';
    switch (type) {
      case 'success':
        return `bg-green-500/${opacity} border-green-500/30`;
      case 'warning':
        return `bg-yellow-500/${opacity} border-yellow-500/30`;
      case 'error':
        return `bg-red-500/${opacity} border-red-500/30`;
      case 'info':
        return `bg-blue-500/${opacity} border-blue-500/30`;
      default:
        return `bg-gray-500/${opacity} border-gray-500/30`;
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

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
          fixed top-0 right-0 h-full w-[520px] 
          bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 
          border-l border-gray-700/50 
          backdrop-blur-xl shadow-2xl
          transform transition-transform duration-300 ease-out z-50
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <BellIcon className="w-5 h-5 text-white" />
              </div>
              {notificationCount > 0 && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Notifications</h2>
              <p className="text-xs text-gray-400">
                {notificationCount} unread
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="h-full overflow-y-auto pb-20 p-6 space-y-4">
          {MOCK_NOTIFICATIONS.map((notification, index) => (
            <div
              key={notification.id}
              className={`
                p-4 rounded-xl border backdrop-blur-sm
                ${getNotificationBgColor(notification.type, notification.isRead)}
                ${notification.isRead ? 'opacity-60' : ''}
                transition-all duration-200
              `}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getNotificationIcon(notification.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white">
                      {notification.title}
                    </p>
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    )}
                  </div>

                  <p className="text-sm text-gray-300 mt-1">
                    {notification.message}
                  </p>

                  <div className="flex items-center mt-2 text-xs text-gray-400">
                    <ClockIcon className="w-3 h-3 mr-1" />
                    {formatTime(notification.timestamp)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: '1s' }}
          />
        </div>
      </div>
    </>
  );
};
