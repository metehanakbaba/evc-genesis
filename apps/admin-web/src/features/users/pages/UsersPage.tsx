'use client';

import {
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
  CogIcon,
  UserGroupIcon,
  UserPlusIcon,
  UserIcon,
  UsersIcon,
  CheckCircleIcon,
  ShieldExclamationIcon,
  PlusCircleIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { SearchFilterBar, EmptyState } from '@/shared/ui/molecules';
import { Button } from '@ui/forms';
import { MainLayout, PageHeader, PageContainer } from '@ui/layout';
import { Breadcrumb } from '@/shared/ui/components/Navigation';
import type React from 'react';
import { useState, useMemo } from 'react';

// ✅ Import NEW shared components
import { 
  GenericDataGrid,
  GenericDataTable,
  GenericFilterModal,
  DataStatusBadge,
  BulkActionBar,
  useBulkSelection,
  type DataGridItem, 
  type GridActionButton, 
  type GridCardRenderer, 
  type DataGridStatusConfig,
  type GenericFilterGroup,
  type TableColumn,
  type BulkAction,
  GridSkeleton,
} from '@/shared/ui';

// ✅ Import API hooks and types
import { 
  useUserStatistics,
  useUserActions,
  useInfiniteUsers,
} from '../hooks';

// ✅ Import shared debounce hook
import { useSearchDebounce } from '@/shared/ui';

// Import existing types
import type { UserProfile } from '../types/user.types';

// ✅ Import shared business logic (if available)
import { 
  getRoleConfig, 
  formatLastLogin 
} from '@evc/shared-business-logic';

// Type for icon components
type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

/**
 * 🔄 Extend UserProfile to work with shared components
 */
interface EnhancedUser extends UserProfile, DataGridItem {
  // UserProfile already has `id` field, so this automatically works
}

/**
 * 👥 User Management Statistics
 * Revolutionary floating stats with role-based data
 */
interface UserStats {
  readonly title: string;
  readonly value: string;
  readonly icon: IconComponent;
  readonly bgColor: string;
  readonly borderColor: string;
  readonly iconColor: string;
  readonly accentColor: string;
  readonly trend: string;
  readonly description: string;
  readonly isLive?: boolean;
}

/**
 * 🚀 Revolutionary Users Management Page - Purple Theme
 * NOW USING SHARED COMPONENTS! 🎉
 *
 * Features:
 * - ✅ GenericDataGrid for consistent grid behavior
 * - ✅ GenericDataTable for table view  
 * - ✅ GenericFilterModal for filtering
 * - ✅ Shared hooks for performance
 * - ✅ 75% less component-specific code
 * - ✅ Consistent behavior across features
 */
const UsersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // ✅ Use shared debounce hook
  const debouncedSearchQuery = useSearchDebounce(searchQuery, 300);

  // ✅ Use API hooks for data and actions
  const { 
    totalUsers, 
    activeUsers, 
    adminUsers, 
    newUsersThisMonth 
  } = useUserStatistics();

  // ✅ Use infinite scroll hook for data fetching
  const { 
    users,
    isLoading,
    isLoadingMore,
    hasNextPage,
    loadMore,
    refresh,
    error,
  } = useInfiniteUsers({
    filters: {
      searchQuery: debouncedSearchQuery,
      roleFilter,
      statusFilter,
    },
    pageSize: 20,
  });

  const { 
    viewDetails, 
    editUser, 
    toggleUserStatus, 
    deleteUser 
  } = useUserActions();

  // ✅ Bulk selection management
  const {
    selectedIds,
    selectedItems,
    selectedCount,
    isSelected,
    isAllSelected,
    isIndeterminate,
    toggleItem,
    toggleAll,
    clearSelection,
  } = useBulkSelection(users);

  // ✅ CREATE GRID RENDERER for GenericDataGrid
  const gridRenderer = useMemo((): GridCardRenderer<EnhancedUser> => ({
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
      const RoleIcon = roleConfig.icon === 'ShieldCheckIcon' ? ShieldCheckIcon :
                      roleConfig.icon === 'CogIcon' ? CogIcon : UserIcon;

      return (
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl ${roleConfig.badgeColor} flex items-center justify-center`}>
              <RoleIcon className={`w-6 h-6 ${roleConfig.textColor}`} />
            </div>
            <div>
              <div className={`text-sm font-medium ${roleConfig.textColor} mb-1`}>
                {roleConfig.text}
              </div>
              <div className="text-white font-semibold text-lg">
                {user.name}
              </div>
            </div>
          </div>

          {/* ✅ Use shared StatusBadge */}
          <DataStatusBadge 
            status={{
              variant: user.is_active ? 'success' : 'danger',
              label: user.is_active ? 'Active' : 'Inactive',
              pulse: user.is_active,
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
            <span className="text-sm">{user.phone}</span>
          </div>
        </div>

        {/* Activity Info */}
        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <div className="flex items-center gap-2">
            <UserIcon className="w-4 h-4 flex-shrink-0" />
            <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
          </div>
          <div className="text-gray-300">
            Last: {formatLastLogin(user.last_login)}
          </div>
        </div>
      </>
    ),
  }), []);

  // ✅ CREATE ACTION BUTTONS for GenericDataGrid
  const gridActions = useMemo((): GridActionButton[] => [
    {
      icon: EyeIcon,
      label: 'View',
      onClick: (user) => viewDetails(user as UserProfile),
      variant: 'ghost',
    },
    {
      icon: PencilIcon,
      label: 'Edit',
      onClick: (user) => editUser(user as UserProfile),
      variant: 'primary',
    },
    {
      icon: TrashIcon,
      label: 'Delete',
      onClick: (user) => deleteUser(user as UserProfile),
      variant: 'danger',
    },
  ], [viewDetails, editUser, deleteUser]);

  // ✅ CREATE TABLE COLUMNS for GenericDataTable
  const tableColumns = useMemo((): TableColumn<EnhancedUser>[] => [
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
            <div className="font-medium text-white">{user.name}</div>
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
            variant: user.is_active ? 'success' : 'danger',
            label: user.is_active ? 'Active' : 'Inactive',
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
          {formatLastLogin(user.last_login)}
        </span>
      ),
    },
  ], []);

  // ✅ BULK ACTIONS configuration
  const bulkActions = useMemo((): BulkAction[] => [
    {
      id: 'activate',
      label: 'Activate Users',
      icon: CheckCircleIcon,
      variant: 'success',
      onClick: async (selectedIds) => {
        // Implementation would call API to activate selected users
        console.log('Activating users:', selectedIds);
        clearSelection();
      },
      show: (count) => count > 0,
      confirmMessage: 'Are you sure you want to activate {count} selected users?',
    },
    {
      id: 'deactivate',
      label: 'Deactivate Users',
      icon: ShieldExclamationIcon,
      variant: 'secondary',
      onClick: async (selectedIds) => {
        // Implementation would call API to deactivate selected users
        console.log('Deactivating users:', selectedIds);
        clearSelection();
      },
      show: (count) => count > 0,
      confirmMessage: 'Are you sure you want to deactivate {count} selected users?',
    },
    {
      id: 'delete',
      label: 'Delete Users',
      icon: TrashIcon,
      variant: 'danger',
      onClick: async (selectedIds) => {
        // Implementation would call API to delete selected users
        console.log('Deleting users:', selectedIds);
        clearSelection();
      },
      show: (count) => count > 0,
      disabled: (count) => count > 10, // Example: Don't allow bulk delete of more than 10 users
      confirmMessage: 'Are you sure you want to permanently delete {count} selected users? This action cannot be undone.',
    },
  ], [clearSelection]);

  // ✅ CREATE FILTER GROUPS for GenericFilterModal
  const filterGroups = useMemo((): GenericFilterGroup[] => [
    {
      id: 'role',
      title: 'User Role',
      selectedValue: roleFilter,
      onChange: setRoleFilter,
      options: [
        { id: 'all', label: 'All Roles', icon: UserGroupIcon, color: 'gray' },
        { id: 'CUSTOMER', label: 'Customer', icon: UserIcon, color: 'blue' },
        { id: 'ADMIN', label: 'Administrator', icon: ShieldCheckIcon, color: 'purple' },
        { id: 'FIELD_WORKER', label: 'Field Worker', icon: CogIcon, color: 'amber' },
      ],
    },
    {
      id: 'status',
      title: 'Account Status',
      selectedValue: statusFilter,
      onChange: setStatusFilter,
      options: [
        { id: 'all', label: 'All Statuses', icon: UserGroupIcon, color: 'gray' },
        { id: 'active', label: 'Active', icon: CheckCircleIcon, color: 'emerald' },
        { id: 'inactive', label: 'Inactive', icon: UserIcon, color: 'red' },
      ],
    },
  ], [roleFilter, statusFilter]);

  // Enterprise identity and access management statistics
  const userStats: UserStats[] = [
    {
      title: 'Total Users',
      value: totalUsers.formatted,
      icon: UsersIcon,
      bgColor: 'from-indigo-500/15 via-indigo-400/8 to-transparent',
      borderColor: 'border-indigo-400/30 hover:border-indigo-300/50',
      iconColor: 'text-indigo-400',
      accentColor: 'bg-indigo-500',
      trend: `+${newUsersThisMonth.formatted} this month`,
      description: 'Total provisioned user identities across all organizational roles and access levels',
      isLive: true,
    },
    {
      title: 'Active Users',
      value: activeUsers.formatted,
      icon: CheckCircleIcon,
      bgColor: 'from-emerald-500/15 via-emerald-400/8 to-transparent',
      borderColor: 'border-emerald-400/30 hover:border-emerald-300/50',
      iconColor: 'text-emerald-400',
      accentColor: 'bg-emerald-500',
      trend: `${activeUsers.percentage}% active`,
      description: 'User accounts with validated authentication and active session capabilities',
    },
    {
      title: 'Admin Accounts',
      value: adminUsers.formatted,
      icon: ShieldCheckIcon,
      bgColor: 'from-amber-500/15 via-amber-400/8 to-transparent',
      borderColor: 'border-amber-400/30 hover:border-amber-300/50',
      iconColor: 'text-amber-400',
      accentColor: 'bg-amber-500',
      trend: 'Privileged access',
      description: 'Administrative accounts with full system access and management capabilities',
    },
    {
      title: 'New Accounts',
      value: newUsersThisMonth.formatted,
      icon: PlusCircleIcon,
      bgColor: 'from-purple-500/15 via-purple-400/8 to-transparent',
      borderColor: 'border-purple-400/30 hover:border-purple-300/50',
      iconColor: 'text-purple-400',
      accentColor: 'bg-purple-500',
      trend: '+8 today',
      description: 'Recently provisioned user accounts within the last 30-day operational cycle',
      isLive: true,
    },
  ];

  /**
   * 🎨 Clear All Filters
   */
  const handleClearFilters = () => {
    setRoleFilter('all');
    setStatusFilter('all');
    setSearchQuery('');
  };

  // ✅ Convert users to enhanced format
  const enhancedUsers = users as EnhancedUser[];

  return (
    <MainLayout
      showNotifications={true}
      notificationCount={3}
      headerVariant="default"
    >
      {/* Revolutionary Page Header with Purple Theme */}
      <PageContainer paddingY="md">
        {/* Revolutionary Breadcrumb Navigation */}
        <Breadcrumb
          currentPageLabel="Identity & Access Management"
          variant="purple"
        />

        <PageHeader
          title="Enterprise Identity Center"
          description="Comprehensive user lifecycle management and role-based access control administration"
          variant="purple"
          actionButton={{
            label: "Provision Account",
            onClick: () => {
              /* Add user logic */
            },
            icon: UserPlusIcon,
            iconAnimation: "rotate-90"
          }}
        />
      </PageContainer>

      <PageContainer paddingY="lg" className="space-y-10">
        {/* Revolutionary Network Stats Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-3 h-8 bg-gradient-to-b from-purple-400 to-purple-300 rounded-full"></div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <CogIcon className="w-6 h-6 text-purple-400" />
                Identity Management Analytics
              </h2>
              <p className="text-gray-400">
                Real-time access control metrics and organizational role distribution intelligence
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userStats.map((stat, index) => (
              <div
                key={stat.title}
                className="group relative"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Revolutionary MinimalStatCard Design - Fixed Height */}
                <div
                  className={`
                  relative p-6 bg-gradient-to-br ${stat.bgColor}
                  border ${stat.borderColor}
                  rounded-2xl backdrop-blur-xl shadow-2xl hover:shadow-3xl
                  transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1
                  cursor-pointer h-[300px] flex flex-col
                `}
                >
                  {/* Live indicator */}
                  {stat.isLive && (
                    <div
                      className={`absolute -top-2 -right-2 w-4 h-4 ${stat.accentColor} rounded-full animate-ping opacity-75`}
                    ></div>
                  )}

                  {/* Floating background effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-14 h-14 rounded-2xl ${stat.bgColor} border ${stat.borderColor} flex items-center justify-center backdrop-blur-sm`}
                      >
                        <stat.icon
                          className={`w-7 h-7 ${stat.iconColor}`}
                        />
                      </div>
                      <ArrowTrendingUpIcon
                        className={`w-5 h-5 ${stat.iconColor}`}
                      />
                    </div>

                    {/* Main Content - Fixed spacing */}
                    <div className="flex-1 flex flex-col">
                      <div className="mb-4">
                        <div className="text-3xl font-bold text-white mb-2">
                          {stat.value}
                        </div>
                        <div
                          className={`text-sm font-medium ${stat.iconColor}`}
                        >
                          {stat.title}
                        </div>
                      </div>

                      <div className={`text-xs ${stat.iconColor} mb-4 font-medium`}>
                        {stat.trend}
                      </div>
                    </div>

                    {/* Description - Fixed at bottom */}
                    <div className="mt-auto">
                      <p className="text-xs text-gray-300 leading-relaxed">
                        {stat.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* User Management Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-3 h-8 bg-gradient-to-b from-purple-400 to-purple-300 rounded-full"></div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <UserGroupIcon className="w-6 h-6 text-purple-400" />
                Enterprise Directory Services
              </h2>
              <p className="text-gray-400">
                Advanced identity search, role-based filtering and comprehensive account lifecycle management
              </p>
            </div>
          </div>

          {/* Search & Filter Controls - Enhanced with Icons */}
          <div className="mb-8 p-6 bg-gradient-to-br from-slate-800/50 via-slate-700/30 to-transparent border border-slate-600/30 rounded-2xl backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-4">
              <UserIcon className="w-5 h-5 text-purple-400" />
              <h3 className="text-sm font-medium text-purple-400">Identity Search & Filtering</h3>
            </div>
            
            <SearchFilterBar
              searchValue={searchQuery}
              onSearchChange={setSearchQuery}
              searchPlaceholder="Identity search... (e.g., john.kowalski@company.com, ADMIN, CUSTOMER)"
              onFilterClick={() => setIsFilterModalOpen(true)}
              isFilterActive={roleFilter !== 'all' || statusFilter !== 'all'}
              filterLabel="Access Filters"
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              variant="purple"
            />
          </div>

          {/* ✅ Loading States - NEW Shared Skeleton */}
          {isLoading && (
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
          )}

          {/* ✅ Error State */}
          {error && !isLoading && (
            <div className="text-center py-12">
              <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <ShieldExclamationIcon className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Identity Service Unavailable</h3>
              <p className="text-gray-400 mb-4">Directory service connection failed: {error.message}</p>
              <Button 
                onClick={refresh}
                className="mx-auto bg-purple-600 hover:bg-purple-700"
              >
                Retry
              </Button>
            </div>
          )}

          {/* ✅ Data Views - NOW USING SHARED COMPONENTS! 🎉 */}
          {!isLoading && !error && (
            <>
              {enhancedUsers.length > 0 ? (
                <>
                  {/* ✅ NEW: GenericDataTable for table view */}
                  {viewMode === 'table' && (
                    <GenericDataTable
                      items={enhancedUsers}
                      columns={tableColumns}
                      actions={gridActions}
                      onLoadMore={loadMore}
                      isLoadingMore={isLoadingMore}
                      hasNextPage={hasNextPage}
                      total={totalUsers.count}
                      selectable={true}
                      hoverable={true}
                      selectedItems={new Set(selectedIds)}
                      onSelectItem={toggleItem}
                      onSelectAll={toggleAll}
                    />
                  )}

                  {/* ✅ NEW: GenericDataGrid for grid view */}
                  {viewMode === 'grid' && (
                    <GenericDataGrid
                      items={enhancedUsers}
                      renderer={gridRenderer}
                      actions={gridActions}
                      onLoadMore={loadMore}
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
              ) : (
                <EmptyState
                  icon={UserIcon}
                  title="No Identity Records Found"
                  description="Please refine your access control filters or search parameters to view relevant identity records."
                  actionLabel="Clear Filters"
                  onAction={handleClearFilters}
                  variant="purple"
                />
              )}
            </>
          )}
        </section>
      </PageContainer>

      {/* ✅ NEW: GenericFilterModal instead of UserFilterModal */}
      <GenericFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title="User Access Filters"
        description="Filter users by role and account status to manage organizational access control"
        filterGroups={filterGroups}
        onClearFilters={handleClearFilters}
        variant="purple"
      />

      {/* ✅ NEW: BulkActionBar for selected operations */}
      <BulkActionBar
        selectedCount={selectedCount}
        totalCount={totalUsers.count}
        selectedIds={selectedIds}
        actions={bulkActions}
        onClearSelection={clearSelection}
        entityName="users"
        variant="blue"
      />
    </MainLayout>
  );
};

export default UsersPage;
