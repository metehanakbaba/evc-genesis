/**
 * 👥 User Grid Renderer Example
 *
 * This demonstrates how to create a renderer for the GenericDataGrid
 * to replace the existing UserGrid component with reusable patterns.
 *
 * @module UserGridRenderer
 * @version 1.0.0
 * @author EV Charging Team
 */

import {
  CalendarIcon,
  CheckCircleIcon,
  CogIcon,
  EnvelopeIcon,
  EyeIcon,
  PencilIcon,
  PhoneIcon,
  ShieldCheckIcon,
  TrashIcon,
  UserIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import type React from 'react';
import type {
  ActionButton,
  GridCardRenderer,
  GridItem,
  StatusConfig as GridStatusConfig,
} from '../GenericDataGrid';

// Example User type - this would come from your feature types
interface User extends GridItem {
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly role: 'CUSTOMER' | 'ADMIN' | 'FIELD_WORKER';
  readonly is_active: boolean;
  readonly verified_email: boolean;
  readonly created_at: string;
  readonly last_login: string | null;
}

/**
 * 🎨 Role Configuration Utility
 * This replaces the getRoleConfig function from shared business logic
 */
const getRoleConfig = (role: User['role']) => {
  switch (role) {
    case 'ADMIN':
      return {
        icon: ShieldCheckIcon,
        text: 'Admin',
        bgColor:
          'bg-gradient-to-br from-red-500/10 via-red-400/5 to-transparent',
        borderColor: 'border-red-400/25 hover:border-red-300/40',
        badgeColor: 'bg-red-500/10 border-red-500/30',
        textColor: 'text-red-400',
        pulseColor: 'bg-red-500',
        shadowColor: 'hover:shadow-red-500/25',
      };
    case 'FIELD_WORKER':
      return {
        icon: CogIcon,
        text: 'Field Worker',
        bgColor:
          'bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-transparent',
        borderColor: 'border-blue-400/25 hover:border-blue-300/40',
        badgeColor: 'bg-blue-500/10 border-blue-500/30',
        textColor: 'text-blue-400',
        pulseColor: 'bg-blue-500',
        shadowColor: 'hover:shadow-blue-500/25',
      };
    case 'CUSTOMER':
    default:
      return {
        icon: UserIcon,
        text: 'Customer',
        bgColor:
          'bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-transparent',
        borderColor: 'border-purple-400/25 hover:border-purple-300/40',
        badgeColor: 'bg-purple-500/10 border-purple-500/30',
        textColor: 'text-purple-400',
        pulseColor: 'bg-purple-500',
        shadowColor: 'hover:shadow-purple-500/25',
      };
  }
};

/**
 * 📅 Format Last Login Utility
 * This replaces the formatLastLogin function from shared business logic
 */
const formatLastLogin = (lastLogin: string | null): string => {
  if (!lastLogin) return 'Never';

  const date = new Date(lastLogin);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString();
};

/**
 * 🚀 User Grid Renderer
 * Configures how users are displayed in the GenericDataGrid
 */
export const createUserGridRenderer = (): GridCardRenderer<User> => ({
  getStatusConfig: (user: User): GridStatusConfig => {
    const roleConfig = getRoleConfig(user.role);
    return {
      bgColor: roleConfig.bgColor,
      borderColor: roleConfig.borderColor,
      badgeColor: roleConfig.badgeColor,
      textColor: roleConfig.textColor,
      pulseColor: roleConfig.pulseColor,
      shadowColor: roleConfig.shadowColor,
    };
  },

  getAnimationDelay: (index: number): string => `${index * 100}ms`,

  renderHeader: (
    user: User,
    statusConfig: GridStatusConfig,
  ): React.ReactNode => {
    const roleConfig = getRoleConfig(user.role);
    const RoleIcon = roleConfig.icon;

    return (
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-xl ${roleConfig.badgeColor} border flex items-center justify-center`}
          >
            <RoleIcon className={`w-6 h-6 ${roleConfig.textColor}`} />
          </div>
          <div>
            <div className={`text-sm font-medium ${roleConfig.textColor} mb-1`}>
              {roleConfig.text}
            </div>
            <div className="text-white font-semibold text-lg">{user.name}</div>
          </div>
        </div>

        {/* Status Badge */}
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full ${
            user.is_active
              ? 'bg-emerald-500/10 border border-emerald-500/20'
              : 'bg-red-500/10 border border-red-500/20'
          }`}
        >
          {user.is_active ? (
            <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
          ) : (
            <XCircleIcon className="w-4 h-4 text-red-400" />
          )}
          <span
            className={`text-xs font-medium ${
              user.is_active ? 'text-emerald-400' : 'text-red-400'
            }`}
          >
            {user.is_active ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>
    );
  },

  renderContent: (user: User): React.ReactNode => (
    <>
      {/* Contact Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-gray-300">
          <EnvelopeIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="text-sm truncate">{user.email}</span>
          {user.verified_email && (
            <CheckCircleIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          )}
        </div>
        <div className="flex items-center gap-2 text-gray-300">
          <PhoneIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="text-sm">{user.phone}</span>
        </div>
      </div>

      {/* Activity Info */}
      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 flex-shrink-0" />
          <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
        </div>
        <div className="text-gray-300">
          Last: {formatLastLogin(user.last_login)}
        </div>
      </div>
    </>
  ),
});

/**
 * 🎯 User Grid Action Buttons
 * Defines the action buttons for user management
 */
export const createUserGridActions = (
  onViewDetails?: (user: User) => void,
  onEditUser?: (user: User) => void,
  onDeleteUser?: (user: User) => void,
): ActionButton[] => [
  {
    icon: EyeIcon,
    label: 'View',
    onClick: (user) => onViewDetails?.(user as User),
    variant: 'ghost',
  },
  {
    icon: PencilIcon,
    label: 'Edit',
    onClick: (user) => onEditUser?.(user as User),
    variant: 'primary',
  },
  {
    icon: TrashIcon,
    label: 'Delete',
    onClick: (user) => onDeleteUser?.(user as User),
    variant: 'danger',
  },
];

/**
 * 📖 Usage Example:
 *
 * ```tsx
 * import { GenericDataGrid } from '@/shared/ui';
 * import { createUserGridRenderer, createUserGridActions } from './UserGridRenderer';
 *
 * const UserManagementPage: React.FC = () => {
 *   const renderer = createUserGridRenderer();
 *   const actions = createUserGridActions(
 *     handleViewDetails,
 *     handleEditUser,
 *     handleDeleteUser
 *   );
 *
 *   return (
 *     <GenericDataGrid
 *       items={users}
 *       renderer={renderer}
 *       actions={actions}
 *       onLoadMore={loadMore}
 *       isLoadingMore={isLoadingMore}
 *       hasNextPage={hasNextPage}
 *       total={total}
 *       columns={{
 *         sm: 1,
 *         md: 2,
 *         lg: 2,
 *         xl: 3,
 *         '2xl': 4,
 *       }}
 *     />
 *   );
 * };
 * ```
 */

export default {
  createUserGridRenderer,
  createUserGridActions,
};
