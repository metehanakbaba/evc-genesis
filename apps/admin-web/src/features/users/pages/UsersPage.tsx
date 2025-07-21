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
  ViewColumnsIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { FilterContainer, EmptyState, FilterModal } from '@/shared/ui/molecules';
import { SearchInput, FilterButton, ViewModeToggle } from '@/shared/ui/atoms';
import { Button } from '@ui/forms';
import type { FilterGroup } from '@/shared/ui/molecules';
import { MainLayout, PageHeader, PageContainer } from '@ui/layout';
import { Breadcrumb } from '@/shared/ui/components/Navigation';
import type React from 'react';
import { useState } from 'react';

// ✅ Import new reusable components
import { 
  UserGrid, 
  UserTable,
  UserGridSkeleton,
  UserTableSkeleton,
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

  /**
   * 🎯 Filter Groups Configuration for Universal FilterModal
   */
  const filterGroups: FilterGroup[] = [
    {
      id: 'role',
      label: 'User Role',
      description: 'Filter users by their organizational role and access level',
      icon: UserGroupIcon,
      value: roleFilter,
      onChange: setRoleFilter,
      gridCols: 2,
      options: [
        {
          id: 'all',
          label: 'All Roles',
          icon: ViewColumnsIcon,
          color: 'gray',
          description: 'Show all users regardless of role'
        },
        {
          id: 'user',
          label: 'Customer',
          icon: UserIcon,
          color: 'blue',
          description: 'Standard customer accounts'
        },
        {
          id: 'admin',
          label: 'Administrator',
          icon: ShieldCheckIcon,
          color: 'purple',
          description: 'Administrative accounts with full access'
        },
        {
          id: 'operator',
          label: 'Field Worker',
          icon: CogIcon,
          color: 'emerald',
          description: 'Field maintenance and support staff'
        },
      ]
    },
    {
      id: 'status',
      label: 'Account Status',
      description: 'Filter users by their account activation status',
      icon: CheckCircleIcon,
      value: statusFilter,
      onChange: setStatusFilter,
      gridCols: 2,
      options: [
        {
          id: 'all',
          label: 'All Statuses',
          icon: ViewColumnsIcon,
          color: 'gray',
          description: 'Show all users regardless of status'
        },
        {
          id: 'active',
          label: 'Active',
          icon: CheckCircleIcon,
          color: 'green',
          description: 'Active user accounts'
        },
        {
          id: 'inactive',
          label: 'Inactive',
          icon: XCircleIcon,
          color: 'red',
          description: 'Deactivated user accounts'
        },
      ]
    }
  ];

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

          {/* Search & Filter Controls - Using Universal FilterModal */}
          <FilterContainer className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                {/* Search Input */}
                <SearchInput
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Identity search... (e.g., john.kowalski@company.com, ADMIN, CUSTOMER)"
                  size="md"
                />

                {/* Filter Button */}
                <FilterButton
                  onClick={() => setIsFilterModalOpen(true)}
                  isActive={roleFilter !== 'all' || statusFilter !== 'all'}
                  label="Access Filters"
                  variant="purple"
                  size="md"
                />
              </div>

              {/* View Mode Toggle */}
              <ViewModeToggle
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                variant="purple"
                size="md"
              />
            </div>
          </FilterContainer>

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
                      total={totalUsers.count}
                      variant="purple"
                    />
                  ) : (
                    <EmptyState
                      icon={UserIcon}
                      title="No Identity Records Found"
                      description="Please refine your access control filters or search parameters to view relevant identity records."
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
                      total={totalUsers.count}
                      variant="purple"
                    />
                  ) : (
                    <EmptyState
                      icon={UserIcon}
                      title="No Identity Records Found"
                      description="Please refine your access control filters or search parameters to view relevant identity records."
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

      {/* ✅ Universal FilterModal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title="Identity Access Control Filters"
        description="Configure role-based access criteria and account status parameters"
        filterGroups={filterGroups}
        onClearFilters={handleClearFilters}
        variant="purple"
        size="lg"
        clearButtonLabel="Reset Criteria"
        applyButtonLabel="Apply Configuration"
      />
    </MainLayout>
  );
};

export default UsersPage;
