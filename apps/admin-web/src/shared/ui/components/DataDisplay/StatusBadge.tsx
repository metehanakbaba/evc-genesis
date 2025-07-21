/**
 * 🏷️ Status Badge Component
 *
 * Generic status badge component that abstracts the status display patterns.
 * Used across all feature components for consistent status visualization.
 *
 * @module StatusBadge
 * @version 1.0.0
 * @author EV Charging Team
 */

import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import type React from 'react';

export interface StatusConfig {
  readonly variant:
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'pending'
    | 'neutral';
  readonly label: string;
  readonly icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  readonly pulse?: boolean;
  readonly size?: 'sm' | 'md' | 'lg';
}

export interface StatusBadgeProps {
  readonly status: StatusConfig;
  readonly className?: string;
}

/**
 * 🎨 Status Badge Styling Configuration
 */
const getStatusStyles = (variant: StatusConfig['variant']) => {
  switch (variant) {
    case 'success':
      return {
        container: 'bg-emerald-500/10 border-emerald-500/30',
        text: 'text-emerald-400',
        icon: 'text-emerald-400',
        pulse: 'bg-emerald-500',
      };
    case 'warning':
      return {
        container: 'bg-amber-500/10 border-amber-500/30',
        text: 'text-amber-400',
        icon: 'text-amber-400',
        pulse: 'bg-amber-500',
      };
    case 'danger':
      return {
        container: 'bg-red-500/10 border-red-500/30',
        text: 'text-red-400',
        icon: 'text-red-400',
        pulse: 'bg-red-500',
      };
    case 'info':
      return {
        container: 'bg-blue-500/10 border-blue-500/30',
        text: 'text-blue-400',
        icon: 'text-blue-400',
        pulse: 'bg-blue-500',
      };
    case 'pending':
      return {
        container: 'bg-purple-500/10 border-purple-500/30',
        text: 'text-purple-400',
        icon: 'text-purple-400',
        pulse: 'bg-purple-500',
      };
    case 'neutral':
    default:
      return {
        container: 'bg-gray-500/10 border-gray-500/30',
        text: 'text-gray-400',
        icon: 'text-gray-400',
        pulse: 'bg-gray-500',
      };
  }
};

/**
 * 🎯 Get default icon for status variant
 */
const getDefaultIcon = (variant: StatusConfig['variant']) => {
  switch (variant) {
    case 'success':
      return CheckCircleIcon;
    case 'warning':
      return ExclamationTriangleIcon;
    case 'danger':
      return XCircleIcon;
    case 'info':
      return InformationCircleIcon;
    case 'pending':
      return ClockIcon;
    case 'neutral':
    default:
      return InformationCircleIcon;
  }
};

/**
 * 📐 Get size classes
 */
const getSizeClasses = (size: StatusConfig['size'] = 'md') => {
  switch (size) {
    case 'sm':
      return {
        container: 'px-2 py-0.5 text-xs',
        icon: 'w-3 h-3',
      };
    case 'lg':
      return {
        container: 'px-4 py-2 text-sm',
        icon: 'w-5 h-5',
      };
    case 'md':
    default:
      return {
        container: 'px-3 py-1 text-xs',
        icon: 'w-4 h-4',
      };
  }
};

/**
 * 🚀 Status Badge Component
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className = '',
}) => {
  const styles = getStatusStyles(status.variant);
  const sizeClasses = getSizeClasses(status.size);
  const IconComponent = status.icon || getDefaultIcon(status.variant);

  return (
    <div className="relative">
      {/* Pulse indicator */}
      {status.pulse && (
        <div
          className={`absolute -top-1 -right-1 w-3 h-3 ${styles.pulse} rounded-full animate-ping opacity-75`}
        />
      )}

      {/* Badge */}
      <div
        className={`
          inline-flex items-center gap-2 rounded-full border font-medium
          ${styles.container} ${sizeClasses.container} ${className}
        `}
      >
        <IconComponent className={`${sizeClasses.icon} ${styles.icon}`} />
        <span className={styles.text}>{status.label}</span>
      </div>
    </div>
  );
};

/**
 * 🛠️ Status Badge Utilities
 */

// Common status configurations
export const StatusConfigurations = {
  // User statuses
  userActive: { variant: 'success' as const, label: 'Active', pulse: true },
  userInactive: { variant: 'danger' as const, label: 'Inactive' },
  userPending: { variant: 'pending' as const, label: 'Pending', pulse: true },

  // Station statuses
  stationOnline: { variant: 'success' as const, label: 'Online', pulse: true },
  stationOffline: { variant: 'danger' as const, label: 'Offline' },
  stationMaintenance: { variant: 'warning' as const, label: 'Maintenance' },

  // Transaction statuses
  transactionCompleted: { variant: 'success' as const, label: 'Completed' },
  transactionPending: {
    variant: 'pending' as const,
    label: 'Pending',
    pulse: true,
  },
  transactionFailed: { variant: 'danger' as const, label: 'Failed' },

  // Session statuses
  sessionCharging: {
    variant: 'success' as const,
    label: 'Charging',
    pulse: true,
  },
  sessionStarting: { variant: 'info' as const, label: 'Starting', pulse: true },
  sessionCompleted: { variant: 'success' as const, label: 'Completed' },
  sessionCancelled: { variant: 'neutral' as const, label: 'Cancelled' },
  sessionFailed: { variant: 'danger' as const, label: 'Failed' },
} as const;

/**
 * 🎨 Create status configuration utility
 */
export const createStatusConfig = (
  variant: StatusConfig['variant'],
  label: string,
  options: Partial<Pick<StatusConfig, 'icon' | 'pulse' | 'size'>> = {},
): StatusConfig => ({
  variant,
  label,
  ...options,
});

export default StatusBadge;
