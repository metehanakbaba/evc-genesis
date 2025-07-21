'use client';

// ✅ Import shared business logic
import { formatLastLogin, getRoleConfig } from '@evc/shared-business-logic';
import {
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
import { Button } from '@ui/forms';
import type React from 'react';
// ✅ Import infinite scroll hooks
import { useInfiniteScrollTrigger } from '../hooks/useIntersectionObserver';
import type { UserProfile } from '../types/user.types';

// ✅ Import skeleton components
import { EndOfListIndicator, LoadMoreSkeleton } from './UserSkeleton';

/**
 * 🎯 User Table Props
 */
export interface UserTableProps {
  readonly users: UserProfile[];
  readonly onViewDetails?: (user: UserProfile) => void;
  readonly onEditUser?: (user: UserProfile) => void;
  readonly onToggleStatus?: (user: UserProfile) => void;
  readonly onDeleteUser?: (user: UserProfile) => void;
  readonly className?: string;
  readonly columns?: {
    user?: boolean;
    role?: boolean;
    status?: boolean;
    contact?: boolean;
    lastLogin?: boolean;
    actions?: boolean;
  };
  // ✅ Infinite scroll props
  readonly onLoadMore?: () => void;
  readonly isLoadingMore?: boolean;
  readonly hasNextPage?: boolean;
  readonly total?: number;
  readonly variant?: 'default' | 'teal' | 'blue' | 'purple' | 'emerald';
}

/**
 * 🚀 Revolutionary User Table Component
 * Reusable table component for displaying users with role-based styling
 */
export const UserTable: React.FC<UserTableProps> = ({
  users,
  onViewDetails,
  onEditUser,
  onToggleStatus,
  onDeleteUser,
  className = '',
  columns = {
    user: true,
    role: true,
    status: true,
    contact: true,
    lastLogin: true,
    actions: true,
  },
  onLoadMore,
  isLoadingMore = false,
  hasNextPage = false,
  total = 0,
  variant = 'purple',
}) => {
  // ✅ Infinite scroll trigger with throttling
  const loadMoreRef = useInfiniteScrollTrigger(
    () => {
      if (onLoadMore && hasNextPage && !isLoadingMore) {
        onLoadMore();
      }
    },
    {
      enabled: hasNextPage && !isLoadingMore,
      rootMargin: '100px',
      throttleMs: 500, // ✅ Prevent rapid successive calls
    },
  );

  return (
    <div className={className}>
      {/* User Table */}
      <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl overflow-hidden backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/30 border-b border-gray-600/30">
              <tr>
                {columns.user && (
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                    User
                  </th>
                )}
                {columns.role && (
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                    Role
                  </th>
                )}
                {columns.status && (
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                    Status
                  </th>
                )}
                {columns.contact && (
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                    Contact
                  </th>
                )}
                {columns.lastLogin && (
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                    Last Login
                  </th>
                )}
                {columns.actions && (
                  <th className="text-right py-4 px-6 text-sm font-medium text-gray-300">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/30">
              {users.map((user) => {
                const roleConfigData = getRoleConfig(user.role);
                // Map icon string to actual icon component
                const roleConfig = {
                  ...roleConfigData,
                  icon:
                    roleConfigData.icon === 'ShieldCheckIcon'
                      ? ShieldCheckIcon
                      : roleConfigData.icon === 'CogIcon'
                        ? CogIcon
                        : UserIcon,
                };

                return (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-700/20 transition-colors group"
                  >
                    {columns.user && (
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg ${roleConfig.badgeColor} flex items-center justify-center`}
                          >
                            <roleConfig.icon
                              className={`w-4 h-4 ${roleConfig.textColor}`}
                            />
                          </div>
                          <div>
                            <div className="text-white font-semibold">
                              {user.name}
                            </div>
                            <div className="text-gray-400 text-sm">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                    )}

                    {columns.role && (
                      <td className="py-4 px-6">
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${roleConfig.badgeColor}`}
                        >
                          <roleConfig.icon
                            className={`w-4 h-4 ${roleConfig.textColor}`}
                          />
                          <span
                            className={`text-xs font-medium ${roleConfig.textColor}`}
                          >
                            {roleConfig.text}
                          </span>
                        </div>
                      </td>
                    )}

                    {columns.status && (
                      <td className="py-4 px-6">
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${
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
                              user.is_active
                                ? 'text-emerald-400'
                                : 'text-red-400'
                            }`}
                          >
                            {user.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </td>
                    )}

                    {columns.contact && (
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-gray-300 text-sm">
                            <EnvelopeIcon className="w-3 h-3 text-gray-400 flex-shrink-0" />
                            <span className="truncate max-w-[200px]">
                              {user.email}
                            </span>
                            {user.verified_email && (
                              <CheckCircleIcon className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-gray-300 text-sm">
                            <PhoneIcon className="w-3 h-3 text-gray-400 flex-shrink-0" />
                            <span>{user.phone}</span>
                          </div>
                        </div>
                      </td>
                    )}

                    {columns.lastLogin && (
                      <td className="py-4 px-6">
                        <span className="text-gray-300 text-sm">
                          {formatLastLogin(user.last_login)}
                        </span>
                      </td>
                    )}

                    {columns.actions && (
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onViewDetails?.(user)}
                            className="bg-gray-700/30 hover:bg-gray-600/40 text-gray-300 hover:text-white px-3 py-2 flex items-center"
                          >
                            <EyeIcon className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onEditUser?.(user)}
                            className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 border border-blue-500/20 flex items-center"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onDeleteUser?.(user)}
                            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 flex items-center"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ✅ Infinite Scroll Loading Indicators */}
        {isLoadingMore && (
          <div className="border-t border-gray-700/30 p-6">
            <LoadMoreSkeleton />
          </div>
        )}

        {/* ✅ Load More Trigger (invisible) */}
        {hasNextPage && !isLoadingMore && (
          <div
            ref={loadMoreRef as React.RefObject<HTMLDivElement>}
            className="h-10 flex items-center justify-center border-t border-gray-700/30"
          >
            {/* Invisible trigger element */}
          </div>
        )}

        {/* ✅ End of List Indicator */}
        {!hasNextPage && users.length > 0 && total > 0 && (
          <div className="border-t border-gray-700/30 p-6">
            <EndOfListIndicator total={total} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTable;
