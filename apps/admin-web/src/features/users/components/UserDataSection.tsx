'use client';

// ✅ Import shared business logic
import { formatLastLogin, getRoleConfig } from '@evc/shared-business-logic';
import {
  CheckCircleIcon,
  EyeIcon,
  PencilIcon,
  ShieldExclamationIcon,
  TrashIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@ui/forms';
import type React from 'react';
import { useMemo } from 'react';

// ✅ Import NEW shared components
import {
  type DataGridItem,
  type DataGridStatusConfig,
  DataStatusBadge,
  GenericDataGrid,
  GenericDataTable,
  type GridActionButton,
  type GridCardRenderer,
  GridSkeleton,
  type TableColumn,
} from '@/shared/ui';
import { EmptyState } from '@/shared/ui/molecules';
// Import types
import type { UserProfile } from '@evc/shared-business-logic';

/**
 * 🔄 Extend UserProfile to work with shared components
 */
interface EnhancedUser extends UserProfile, DataGridItem {
  // UserProfile already has `id` field, so this automatically works
}

interface UserDataSectionProps {
  users: UserProfile[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasNextPage: boolean;
  error: Error | null;
  viewMode: 'grid' | 'table';
  totalUsers: { count: number };
  onLoadMore: () => void;
  onRefresh: () => void;
  onViewDetails: (user: UserProfile) => void;
  onEditUser: (user: UserProfile) => void;
  onDeleteUser: (user: UserProfile) => void;
  onClearFilters: () => void;
  selectedItems: Set<string>;
  onSelectItem: (id: string) => void;
  onSelectAll: () => void;
}

/**
 * 📊 User Data Section Component
 * Handles the display of user data in grid or table format
 */
const UserDataSection: React.FC<UserDataSectionProps> = ({
  users,
  isLoading,
  isLoadingMore,
  hasNextPage,
  error,
  viewMode,
  totalUsers,
  onLoadMore,
  onRefresh,
  onViewDetails,
  onEditUser,
  onDeleteUser,
  onClearFilters,
  selectedItems,
  onSelectItem,
  onSelectAll,
}) => {
  // ✅ CREATE GRID RENDERER for GenericDataGrid
  const gridRenderer = useMemo(
    (): GridCardRenderer<EnhancedUser> => ({
      getStatusConfig: (user: EnhancedUser): DataGridStatusConfig => {
        const roleConfig = getRoleConfig(user.role);
        return {
          bgColor: roleConfig.bgColor,
          borderColor: roleConfig.borderColor,
          badgeColor: roleConfig.badgeColor,
          textColor: roleConfig.textColor,
          pulseColor: roleConfig.pulseColor,
        };
      },

      getAnimationDelay: (index: number): string => `${index * 100}ms`,

      renderHeader: (user: EnhancedUser): React.ReactNode => {
        const roleConfig = getRoleConfig(user.role);
        const RoleIcon =
          roleConfig.icon === 'ShieldCheckIcon'
            ? CheckCircleIcon
            : // Use CheckCircleIcon instead
              roleConfig.icon === 'CogIcon'
              ? UserIcon
              : UserIcon; // Fallback to UserIcon

        return (
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-xl ${roleConfig.badgeColor} flex items-center justify-center`}
              >
                <RoleIcon className={`w-6 h-6 ${roleConfig.textColor}`} />
              </div>
              <div>
                <div
                  className={`text-sm font-medium ${roleConfig.textColor} mb-1`}
                >
                  {roleConfig.text}
                </div>
                <div className="text-white font-semibold text-lg">
                  {user.firstName} {user.lastName}
                </div>
              </div>
            </div>

            {/* ✅ Use shared StatusBadge */}
            <DataStatusBadge
              status={{
                variant: user.isActive ? 'success' : 'danger',
                label: user.isActive ? 'Active' : 'Inactive',
                pulse: user.isActive,
              }}
            />
          </div>
        );
      },

      renderContent: (user: EnhancedUser): React.ReactNode => (
        <>
          {/* Contact Info */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-gray-300">
              <UserIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-sm truncate">{user.email}</span>
              {user.verified_email && (
                <CheckCircleIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              )}
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <UserIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-sm">{user.phoneNumber}</span>
            </div>
          </div>

          {/* Activity Info */}
          <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
            <div className="flex items-center gap-2">
              <UserIcon className="w-4 h-4 flex-shrink-0" />
              <span>
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="text-gray-300">
              Last: {formatLastLogin(user.lastLogin)}
            </div>
          </div>
        </>
      ),
    }),
    [],
  );

  // ✅ CREATE ACTION BUTTONS for GenericDataGrid
  const gridActions = useMemo(
    (): GridActionButton[] => [
      {
        icon: EyeIcon,
        label: 'View',
        onClick: (user) => onViewDetails(user as EnhancedUser),
        variant: 'ghost',
      },
      {
        icon: PencilIcon,
        label: 'Edit',
        onClick: (user) => onEditUser(user as EnhancedUser),
        variant: 'primary',
      },
      {
        icon: TrashIcon,
        label: 'Delete',
        onClick: (user) => onDeleteUser(user as EnhancedUser),
        variant: 'danger',
      },
    ],
    [onViewDetails, onEditUser, onDeleteUser],
  );

  // ✅ CREATE TABLE COLUMNS for GenericDataTable
  const tableColumns = useMemo(
    (): TableColumn<EnhancedUser>[] => [
      {
        id: 'user',
        label: 'User',
        accessor: 'name',
        sticky: true,
        render: (user) => (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <UserIcon className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <div className="font-medium text-white">{user.firstName}</div>
              <div className="text-sm text-gray-400">{user.email}</div>
            </div>
          </div>
        ),
      },
      {
        id: 'role',
        label: 'Role',
        accessor: 'role',
        render: (user) => {
          const roleConfig = getRoleConfig(user.role);
          return (
            <span className={`text-sm font-medium ${roleConfig.textColor}`}>
              {roleConfig.text}
            </span>
          );
        },
      },
      {
        id: 'status',
        label: 'Status',
        accessor: 'is_active',
        render: (user) => (
          <DataStatusBadge
            status={{
              variant: user.isActive ? 'success' : 'danger',
              label: user.isActive ? 'Active' : 'Inactive',
              size: 'sm',
            }}
          />
        ),
      },
      {
        id: 'lastLogin',
        label: 'Last Login',
        accessor: 'last_login',
        render: (user) => (
          <span className="text-sm text-gray-300">
            {formatLastLogin(user.lastLogin)}
          </span>
        ),
      },
    ],
    [],
  );

  // ✅ Convert users to enhanced format
  const enhancedUsers = users as EnhancedUser[];

  // ✅ Loading States - NEW Shared Skeleton
  if (isLoading) {
    return (
      <GridSkeleton
        itemCount={viewMode === 'table' ? 10 : 6}
        columns={{
          sm: 1,
          md: viewMode === 'table' ? 1 : 2,
          lg: viewMode === 'table' ? 1 : 2,
          xl: viewMode === 'table' ? 1 : 3,
          '2xl': viewMode === 'table' ? 1 : 4,
        }}
      />
    );
  }

  // ✅ Error State
  if (error && !isLoading) {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
          <ShieldExclamationIcon className="w-6 h-6 text-red-400" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">
          Identity Service Unavailable
        </h3>
        <p className="text-gray-400 mb-4">
          Directory service connection failed: {error.message}
        </p>
        <Button
          onClick={onRefresh}
          className="mx-auto bg-purple-600 hover:bg-purple-700"
        >
          Retry
        </Button>
      </div>
    );
  }

  // ✅ Data Views - NOW USING SHARED COMPONENTS! 🎉
  if (enhancedUsers.length > 0) {
    return (
      <>
        {/* ✅ NEW: GenericDataTable for table view */}
        {viewMode === 'table' && (
          <GenericDataTable
            items={enhancedUsers}
            columns={tableColumns}
            actions={gridActions}
            isLoading={isLoading}
            onLoadMore={onLoadMore}
            isLoadingMore={isLoadingMore}
            hasNextPage={hasNextPage}
            total={totalUsers.count}
            selectable={true}
            hoverable={true}
            selectedItems={selectedItems}
            onSelectItem={onSelectItem}
            onSelectAll={onSelectAll}
          />
        )}

        {/* ✅ NEW: GenericDataGrid for grid view */}
        {viewMode === 'grid' && (
          <GenericDataGrid
            items={enhancedUsers}
            renderer={gridRenderer}
            actions={gridActions}
            onLoadMore={onLoadMore}
            isLoadingMore={isLoadingMore}
            hasNextPage={hasNextPage}
            total={totalUsers.count}
            columns={{
              sm: 1,
              md: 2,
              lg: 2,
              xl: 3,
              '2xl': 4,
            }}
          />
        )}
      </>
    );
  }

  // ✅ Empty State
  return (
    <EmptyState
      icon={UserIcon}
      title="No Identity Records Found"
      description="Please refine your access control filters or search parameters to view relevant identity records."
      actionLabel="Clear Filters"
      onAction={onClearFilters}
      variant="purple"
    />
  );
};

export default UserDataSection;
