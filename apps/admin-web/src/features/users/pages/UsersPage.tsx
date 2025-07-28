'use client';

import {
  CheckCircleIcon,
  CogIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  UserIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';
import { MainLayout, PageContainer, PageHeader } from '@ui/layout';
import type React from 'react';
import { useMemo, useState } from 'react';
// ✅ Import NEW shared components
// ✅ Import shared debounce hook
import {
  type GenericFilterGroup,
  GenericFilterModal,
  type QuickFilterGroup,
  QuickFilterButtons,
  useBulkSelection,
} from '@/shared/ui';
import { Breadcrumb } from '@/shared/ui/components/Navigation';
// ✅ Import new component sections
import {
  UserDataSection,
  UserSearchSection,
  type UserStatsData,
  UserStatsSection,
} from '@/features/users/components';
// ✅ Import API hooks and types
import { useUserActions, useUserStatistics } from '@/features/users/hooks';
import { useFetchUsers } from '../hooks/useUsers';
import { useRouter } from 'next/navigation';
import { EditUserModal } from '../components/EditUserModal';
import { UserProfile } from '@evc/shared-business-logic';

/**
 * 🚀 Revolutionary Users Management Page - Purple Theme
 * NOW USING SHARED COMPONENTS! 🎉
 *
 * Features:
 * - ✅ Separated into logical components
 * - ✅ Clean separation of concerns
 * - ✅ Reusable component architecture
 * - ✅ 75% less code in main page
 * - ✅ Improved maintainability
 */
const UsersPage: React.FC = () => {
  const route = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const {
    users,
    isLoading,
    isLoadingMore,
    hasNextPage,
    loadMore,
    refresh,
    error,
  } = useFetchUsers({
    searchQuery,
    roleFilter,
    statusFilter,
    pageSize: 20
  });
    // ✅ Use API hooks for data and actions
  const { totalUsers, activeUsers, adminUsers, newUsersThisMonth } =
    useUserStatistics(users);

  const { viewDetails, deleteUser } = useUserActions();

  // ✅ Bulk selection management
  const { selectedIds, toggleItem, toggleAll } =
    useBulkSelection(users);

  // ✅ Prepare user stats data
  const userStatsData: UserStatsData = {
    totalUsers,
    activeUsers: {
      ...activeUsers,
      percentage: String(activeUsers.percentage),
    },
    adminUsers,
    newUsersThisMonth,
  };

  // ✅ CREATE FILTER GROUPS for GenericFilterModal
  const filterGroups = useMemo(
    (): GenericFilterGroup[] => [
      {
        id: 'role',
        title: 'User Role',
        selectedValue: roleFilter,
        onChange: setRoleFilter,
        options: [
          { id: 'all', label: 'All Roles', icon: UserGroupIcon, color: 'gray' },
          { id: 'user', label: 'Customer', icon: UserIcon, color: 'blue' },
          {
            id: 'admin',
            label: 'Administrator',
            icon: ShieldCheckIcon,
            color: 'purple',
          },
          {
            id: 'operator',
            label: 'Field Worker',
            icon: CogIcon,
            color: 'amber',
          },
        ],
      },
      {
        id: 'status',
        title: 'Account Status',
        selectedValue: statusFilter,
        onChange: setStatusFilter,
        options: [
          {
            id: 'all',
            label: 'All Statuses',
            icon: UserGroupIcon,
            color: 'gray',
          },
          {
            id: 'active',
            label: 'Active',
            icon: CheckCircleIcon,
            color: 'emerald',
          },
          { id: 'inactive', label: 'Inactive', icon: UserIcon, color: 'red' },
        ],
      },
    ],
    [roleFilter, statusFilter],
  );

  // ✅ CREATE QUICK FILTER GROUPS for Universal Component
  const quickFilterGroups = useMemo(
    (): QuickFilterGroup[] => [
      {
        id: 'role',
        title: 'User Roles',
        icon: UserGroupIcon,
        selectedValue: roleFilter,
        onChange: setRoleFilter,
        options: [
          { id: 'all', label: 'All Roles', icon: UserGroupIcon, color: 'purple' },
          { id: 'CUSTOMER', label: 'Customer', icon: UserIcon, color: 'blue' },
          {
            id: 'ADMIN',
            label: 'Administrator',
            icon: ShieldCheckIcon,
            color: 'purple',
          },
          {
            id: 'FIELD_WORKER',
            label: 'Field Worker',
            icon: CogIcon,
            color: 'amber',
          },
        ],
      },
      {
        id: 'status',
        title: 'Account Status',
        icon: CheckCircleIcon,
        selectedValue: statusFilter,
        onChange: setStatusFilter,
        options: [
          {
            id: 'all',
            label: 'All Status',
            icon: UserGroupIcon,
            color: 'purple',
          },
          {
            id: 'active',
            label: 'Active',
            icon: CheckCircleIcon,
            color: 'emerald',
          },
          { id: 'inactive', label: 'Inactive', icon: UserIcon, color: 'red' },
        ],
      },
    ],
    [roleFilter, statusFilter],
  );

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
          currentPageLabel="Identity & Access Management"
          variant="purple"
        />

        <PageHeader
          title="Enterprise Identity Center"
          description="Comprehensive user lifecycle management and role-based access control administration"
          variant="purple"
          actionButton={{
            label: 'Provision Account',
            onClick: () => {
              route.push('/users/new')
            },
            icon: UserPlusIcon,
            iconAnimation: 'rotate-90',
          }}
        />
      </PageContainer>

      <PageContainer paddingY="lg" className="space-y-10">
        {/* ✅ User Statistics Section */}
        <UserStatsSection userStats={userStatsData} />

        {/* ✅ User Search Section */}
        <UserSearchSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onOpenFilterModal={() => setIsFilterModalOpen(true)}
          isFilterActive={roleFilter !== 'all' || statusFilter !== 'all'}
        />

        {/* ✅ Universal Quick Filter Buttons */}
        <QuickFilterButtons
          filterGroups={quickFilterGroups}
          variant="purple"
        />

        {/* ✅ User Data Section */}
        <UserDataSection
          users={users}
          isLoading={isLoading}
          isLoadingMore={isLoadingMore}
          hasNextPage={hasNextPage}
          error={error}
          viewMode={viewMode}
          totalUsers={totalUsers}
          onLoadMore={loadMore}
          onRefresh={refresh}
          onViewDetails={viewDetails}
          onEditUser={(user: UserProfile) => {
            setSelectedUser(user);
            setOpenEditModal(true);
          }}
          onDeleteUser={(user) => deleteUser(user.id)}
          onClearFilters={handleClearFilters}
          selectedItems={new Set(selectedIds)}
          onSelectItem={toggleItem}
          onSelectAll={() => toggleAll(true)}
        />
      </PageContainer>

      {/* ✅ Filter Modal */}
      <GenericFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title="User Access Filters"
        description="Filter users by role and account status to manage organizational access control"
        filterGroups={filterGroups}
        onClearFilters={handleClearFilters}
        variant="purple"
      />

      {/* Render EditUserModal */}
      {selectedUser && (
        <EditUserModal
          user={selectedUser}
          isOpen={openEditModal}
          onClose={() => setOpenEditModal(false)}
          refresh={refresh}
        />
      )}
    </MainLayout>
  );
};

export default UsersPage;
