'use client';

import {
  CheckCircleIcon,
  CogIcon,
  EyeIcon,
  PencilIcon,
  ShieldCheckIcon,
  TrashIcon,
  UserIcon,
  XCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@ui/forms';
import type React from 'react';
import type { UserProfile } from '../types/user.types';
// ✅ Import shared business logic
import { 
  getRoleConfig, 
  formatLastLogin 
} from '@evc/shared-business-logic';

// ✅ Import infinite scroll hooks
import { useInfiniteScrollTrigger } from '../hooks/useIntersectionObserver';

// ✅ Import skeleton components
import { LoadMoreSkeleton, EndOfListIndicator } from './UserSkeleton';

// Type for icon components
type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

/**
 * 🎯 User Grid Props
 */
export interface UserGridProps {
  readonly users: UserProfile[];
  readonly onViewDetails?: (user: UserProfile) => void;
  readonly onEditUser?: (user: UserProfile) => void;
  readonly onToggleStatus?: (user: UserProfile) => void;
  readonly onDeleteUser?: (user: UserProfile) => void;
  readonly className?: string;
  // ✅ Infinite scroll props
  readonly onLoadMore?: () => void;
  readonly isLoadingMore?: boolean;
  readonly hasNextPage?: boolean;
  readonly total?: number;
  readonly variant?: 'default' | 'teal' | 'blue' | 'purple' | 'emerald';
}

/**
 * 🚀 Revolutionary User Grid Component
 * Reusable grid component for displaying users with role-based styling
 */
export const UserGrid: React.FC<UserGridProps> = ({
  users,
  onViewDetails,
  onEditUser,
  onToggleStatus,
  onDeleteUser,
  className = "",
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
    }
  );

  return (
    <div className={className}>
      {/* User Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {users.map((user, index) => {
          const roleConfigData = getRoleConfig(user.role);
          // Map icon string to actual icon component
          const roleConfig = {
            ...roleConfigData,
            icon: roleConfigData.icon === 'ShieldCheckIcon' ? ShieldCheckIcon :
                  roleConfigData.icon === 'CogIcon' ? CogIcon : UserIcon,
          };

          return (
            <div
              key={user.id}
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Revolutionary Floating User Card */}
              <div
                className={`relative p-6 ${roleConfig.bgColor} border ${roleConfig.borderColor} rounded-2xl backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer`}
              >
                {/* Active Status Pulse */}
                {user.is_active && (
                  <div
                    className={`absolute -top-2 -right-2 w-4 h-4 ${roleConfig.pulseColor} rounded-full animate-ping opacity-75`}
                  ></div>
                )}

                {/* Floating Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                {/* User Header */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl ${roleConfig.badgeColor} flex items-center justify-center`}
                      >
                        <roleConfig.icon
                          className={`w-6 h-6 ${roleConfig.textColor}`}
                        />
                      </div>
                      <div>
                        <div
                          className={`text-sm font-medium ${roleConfig.textColor} mb-1`}
                        >
                          {roleConfig.text}
                        </div>
                        <div className="text-white font-semibold text-lg">
                          {user.name}
                        </div>
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
                          user.is_active
                            ? 'text-emerald-400'
                            : 'text-red-400'
                        }`}
                      >
                        {user.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <EnvelopeIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-sm truncate">
                        {user.email}
                      </span>
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
                      <span>
                        Joined{' '}
                        {new Date(user.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-gray-300">
                      Last: {formatLastLogin(user.last_login)}
                    </div>
                  </div>

                  {/* Revolutionary Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onViewDetails?.(user)}
                      className="
                        flex-1 relative overflow-hidden group/view
                        bg-gradient-to-r from-gray-700/40 via-gray-600/30 to-gray-700/40
                        hover:from-gray-600/50 hover:via-gray-500/40 hover:to-gray-600/50
                        text-gray-300 hover:text-white
                        border border-gray-600/30 hover:border-gray-500/50
                        shadow-md hover:shadow-lg
                        transition-all duration-300 ease-out
                        hover:scale-[1.02] active:scale-[0.98]
                        flex items-center justify-center gap-2
                        before:absolute before:inset-0 before:bg-gradient-to-r 
                        before:from-transparent before:via-white/10 before:to-transparent
                        before:translate-x-[-100%] hover:before:translate-x-[100%]
                        before:transition-transform before:duration-500
                      "
                    >
                      <div className="flex items-center gap-2 relative z-10">
                        <EyeIcon className="w-4 h-4 group-hover/view:scale-110 transition-transform duration-300" />
                        <span className="font-medium">View</span>
                      </div>
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onEditUser?.(user)}
                      className="
                        relative overflow-hidden p-2 group/edit
                        bg-gradient-to-r from-blue-500/15 via-blue-400/10 to-blue-500/15
                        hover:from-blue-500/25 hover:via-blue-400/20 hover:to-blue-500/25
                        text-blue-400 hover:text-blue-300
                        border border-blue-500/30 hover:border-blue-400/50
                        shadow-sm shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20
                        transition-all duration-300 ease-out
                        hover:scale-110 active:scale-95
                        flex items-center
                      "
                    >
                      <PencilIcon className="w-4 h-4 group-hover/edit:rotate-12 transition-transform duration-300" />
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDeleteUser?.(user)}
                      className="
                        relative overflow-hidden p-2 group/delete
                        bg-gradient-to-r from-red-500/15 via-red-400/10 to-red-500/15
                        hover:from-red-500/25 hover:via-red-400/20 hover:to-red-500/25
                        text-red-400 hover:text-red-300
                        border border-red-500/30 hover:border-red-400/50
                        shadow-sm shadow-red-500/10 hover:shadow-lg hover:shadow-red-500/20
                        transition-all duration-300 ease-out
                        hover:scale-110 active:scale-95
                        flex items-center
                      "
                    >
                      <TrashIcon className="w-4 h-4 group-hover/delete:scale-110 transition-transform duration-300" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ✅ Infinite Scroll Loading Indicators */}
      {isLoadingMore && (
        <div className="mt-8">
          <LoadMoreSkeleton />
        </div>
      )}

      {/* ✅ Load More Trigger (invisible) */}
      {hasNextPage && !isLoadingMore && (
        <div 
          ref={loadMoreRef as React.RefObject<HTMLDivElement>}
          className="h-10 flex items-center justify-center"
        >
          {/* Invisible trigger element */}
        </div>
      )}

      {/* ✅ End of List Indicator */}
      {!hasNextPage && users.length > 0 && total > 0 && (
        <div className="mt-8">
          <EndOfListIndicator total={total} />
        </div>
      )}
    </div>
  );
};

export default UserGrid; 