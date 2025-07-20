'use client';

import {
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
  CogIcon,
  UserGroupIcon,
  UserPlusIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { SearchFilterBar, EmptyState } from '@/shared/ui/molecules';
import { Button } from '@ui/forms';
import { MainLayout, PageHeader, PageContainer } from '@ui/layout';
import { Breadcrumb } from '@/shared/ui/components/Navigation';
import type React from 'react';
import { useState } from 'react';

// ✅ Import new reusable components
import { 
  UserGrid, 
  UserTable, 
  UserFilterModal,
  UserGridSkeleton,
  UserTableSkeleton,
  LoadMoreSkeleton,
  EndOfListIndicator
} from '../components';

// ✅ Import API hooks and types
import {
  useUserStatistics,
  useUserActions,
  useInfiniteUsers,
  useSearchDebounce,
} from '../hooks';

// Type for icon components
type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

/**
 * 👥 User Management Statistics
 * Revolutionary floating stats with role-based data
 */
interface UserStats {
  readonly title: string;
  readonly value: string;
  readonly icon: IconComponent;
  readonly variant: 'purple' | 'blue' | 'teal' | 'emerald' | 'amber';
  readonly trend: string;
  readonly description: string;
  readonly isLive?: boolean;
}

/**
 * 🚀 Revolutionary Users Management Page - Purple Theme
 * Sophisticated floating card design with role management
 *
 * Features:
 * - User list with search/filter capabilities
 * - Role management (CUSTOMER, ADMIN, FIELD_WORKER)
 * - Account status control with visual indicators
 * - Permission matrix visualization
 * - Bulk operations support
 * - Revolutionary table view with glassmorphism
 * - Modal-based filtering system
 * - API schema compliant TypeScript
 * - ✅ Now uses reusable components and API hooks
 * - ✅ Clean separation of concerns
 */
const UsersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // ✅ Debounce search query to prevent excessive API calls
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
    total,
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

  // Revolutionary floating stats with role-based data
  const userStats: UserStats[] = [
    {
      title: 'Total Users',
      value: totalUsers.formatted,
      icon: UserGroupIcon,
      variant: 'purple',
      trend: `+${newUsersThisMonth.formatted} this month`,
      description: 'Active accounts across all user roles with live statistics',
      isLive: true,
    },
    {
      title: 'Active Users',
      value: activeUsers.formatted,
      icon: UserIcon,
      variant: 'blue',
      trend: `${activeUsers.percentage}% active`,
      description: 'Users with active account status',
    },
    {
      title: 'Admin Users',
      value: adminUsers.formatted,
      icon: ShieldCheckIcon,
      variant: 'teal',
      trend: 'Full access',
      description: 'Administrative users with full system access',
    },
    {
      title: 'New This Month',
      value: newUsersThisMonth.formatted,
      icon: UserPlusIcon,
      variant: 'emerald',
      trend: '+8 today',
      description: 'New customer accounts created in the last 30 days',
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
          currentPageLabel="User Management"
          variant="purple"
        />

        <PageHeader
          title="User Management"
          description="Role-based access control & account administration"
          variant="purple"
          actionButton={{
            label: "New User",
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
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-8 bg-gradient-to-b from-purple-400 to-purple-300 rounded-full"></div>
            <div>
              <h2 className="text-xl font-bold text-white">User Statistics</h2>
              <p className="text-gray-400">
                Real-time user metrics and role distribution
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
                {/* Revolutionary MinimalStatCard Design */}
                <div
                  className={`
                  relative p-6 bg-gradient-to-br from-${stat.variant}-500/10 via-${stat.variant}-400/5 to-transparent
                  border border-${stat.variant}-400/25 hover:border-${stat.variant}-300/40
                  rounded-2xl backdrop-blur-xl shadow-2xl hover:shadow-3xl
                  transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1
                  cursor-pointer
                `}
                >
                  {/* Live indicator */}
                  {stat.isLive && (
                    <div
                      className={`absolute -top-2 -right-2 w-4 h-4 bg-${stat.variant}-500 rounded-full animate-ping opacity-75`}
                    ></div>
                  )}

                  {/* Floating background effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-${stat.variant}-500/10 border border-${stat.variant}-500/20 flex items-center justify-center`}
                      >
                        <stat.icon
                          className={`w-7 h-7 text-${stat.variant}-400`}
                        />
                      </div>
                      <ArrowTrendingUpIcon
                        className={`w-5 h-5 text-${stat.variant}-400`}
                      />
                    </div>

                    <div className="mb-2">
                      <div className="text-3xl font-bold text-white mb-1">
                        {stat.value}
                      </div>
                      <div
                        className={`text-sm font-medium text-${stat.variant}-400`}
                      >
                        {stat.title}
                      </div>
                    </div>

                    <div className="text-xs text-gray-400 mb-3">
                      {stat.trend}
                    </div>

                    {/* Hidden description - shows on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-8 bg-gradient-to-b from-purple-400 to-purple-300 rounded-full"></div>
            <div>
              <h2 className="text-xl font-bold text-white">User Directory</h2>
              <p className="text-gray-400">
                Search, filter and manage user accounts
              </p>
            </div>
          </div>

          {/* Search & Filter Controls - Using New SearchFilterBar Component */}
          <SearchFilterBar
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search users, emails, roles..."
            onFilterClick={() => setIsFilterModalOpen(true)}
            isFilterActive={roleFilter !== 'all' || statusFilter !== 'all'}
            filterLabel="Filters"
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            variant="purple"
            className="mb-8"
          />

          {/* ✅ Loading States - Skeleton Components */}
          {isLoading && viewMode === 'table' && (
            <UserTableSkeleton count={10} />
          )}

          {isLoading && viewMode === 'grid' && (
            <UserGridSkeleton count={6} />
          )}

          {/* ✅ Error State */}
          {error && !isLoading && (
            <div className="text-center py-12">
              <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <ShieldCheckIcon className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Failed to Load Users</h3>
              <p className="text-gray-400 mb-4">{error.message}</p>
              <Button 
                onClick={refresh}
                className="mx-auto bg-purple-600 hover:bg-purple-700"
              >
                Try Again
              </Button>
            </div>
          )}

          {/* ✅ Data Views - Only show when loaded */}
          {!isLoading && !error && (
            <>
              {/* Table View */}
              {viewMode === 'table' && (
                <>
                  {users.length > 0 ? (
                    <UserTable
                      users={users}
                      onViewDetails={viewDetails}
                      onEditUser={editUser}
                      onToggleStatus={toggleUserStatus}
                      onDeleteUser={deleteUser}
                      onLoadMore={loadMore}
                      isLoadingMore={isLoadingMore}
                      hasNextPage={hasNextPage}
                      total={total}
                      variant="purple"
                    />
                  ) : (
                    <EmptyState
                      icon={UserIcon}
                      title="No Users Found"
                      description="No users match your current filter criteria."
                      actionLabel="Clear Filters"
                      onAction={() => {
                        setRoleFilter('all');
                        setStatusFilter('all');
                        setSearchQuery('');
                      }}
                      variant="purple"
                    />
                  )}
                </>
              )}

              {/* Grid View */}
              {viewMode === 'grid' && (
                <>
                  {users.length > 0 ? (
                    <UserGrid
                      users={users}
                      onViewDetails={viewDetails}
                      onEditUser={editUser}
                      onToggleStatus={toggleUserStatus}
                      onDeleteUser={deleteUser}
                      onLoadMore={loadMore}
                      isLoadingMore={isLoadingMore}
                      hasNextPage={hasNextPage}
                      total={total}
                      variant="purple"
                    />
                  ) : (
                    <EmptyState
                      icon={UserIcon}
                      title="No Users Found"
                      description="No users match your current filter criteria."
                      actionLabel="Clear Filters"
                      onAction={() => {
                        setRoleFilter('all');
                        setStatusFilter('all');
                        setSearchQuery('');
                      }}
                      variant="purple"
                    />
                  )}
                </>
              )}
            </>
          )}
        </section>
      </PageContainer>

      {/* ✅ Use new reusable UserFilterModal component */}
      <UserFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        roleFilter={roleFilter}
        statusFilter={statusFilter}
        onRoleChange={setRoleFilter}
        onStatusChange={setStatusFilter}
        onClearFilters={handleClearFilters}
        variant="purple"
      />
    </MainLayout>
  );
};

export default UsersPage;
