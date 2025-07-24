'use client'

/**
 * 👥 Users API Hooks
 *
 * Custom user management hooks that extend the base API.
 * Following WalletsPage pattern for consistency.
 */

import { useCallback, useEffect, useState } from 'react';
import type { UserProfile } from '@evc/shared-business-logic';
import { useRouter } from 'next/navigation';
import { useDebounce } from '@/shared/ui';

import { 
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "@/features/users/api/usersApi";
import { UpdateUserRequest } from '../types/user.types';

/**
 * 📊 User Statistics Hook
 * Provides real-time user metrics similar to wallet statistics
 */
export const useUserStatistics = (users: UserProfile[]) => {
  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.isActive).length;
  const adminUsers = users.filter((user) => user.role === 'ADMIN').length;
  const newUsersThisMonth = users.filter(
    (user) =>
      new Date(user.createdAt) >
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  ).length;

  return {
    totalUsers: {
      count: totalUsers,
      formatted: totalUsers.toLocaleString(),
    },
    activeUsers: {
      count: activeUsers,
      formatted: activeUsers.toLocaleString(),
      percentage: Math.round((activeUsers / totalUsers) * 100),
    },
    adminUsers: {
      count: adminUsers,
      formatted: adminUsers.toLocaleString(),
    },
    newUsersThisMonth: {
      count: newUsersThisMonth,
      formatted: newUsersThisMonth.toLocaleString(),
    },
  };
};

/**
 * ⚡ User Actions Hook
 * Provides user management actions similar to transaction actions
 */
export const useUserActions = () => {
  const [deleteUserApi] = useDeleteUserMutation();
  const [updateUserApi] = useUpdateUserMutation();
  const router = useRouter();

  const viewDetails = useCallback((user: UserProfile) => {
    router.push(`/users/${user.id}`);
  }, [router]);

  const editUser = useCallback(async (id: string, data: UpdateUserRequest) => {
    try {
      await updateUserApi({
        id: id,
        data: data
      }).unwrap();
      return { success: true }
    } catch (error){
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }, [updateUserApi]);

  const toggleUserStatus = useCallback(async (user: UserProfile) => {
    try {
      await updateUserApi({
        id: user.id,
        data: { is_active: !user.isActive }
      }).unwrap();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }, [updateUserApi]);

  const deleteUser = useCallback(async (userId: string) => {
    try {
      await deleteUserApi(userId).unwrap();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete user'
      };
    }
  }, [deleteUserApi]);

  // const resendVerificationEmail = useCallback(async (email: string) => {
    
  //   // TODO: API for resending verification code 

  // }, []);

  return {
    viewDetails,
    editUser,
    toggleUserStatus,
    deleteUser,
    // resendVerificationEmail,
  };
};

interface UseFetchUsersParams {
  searchQuery: string;
  roleFilter: string;
  statusFilter: string;
  pageSize?: number;
}

export const useFetchUsers = ({
  searchQuery,
  roleFilter,
  statusFilter,
  pageSize = 20,
}: UseFetchUsersParams) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Prepare query parameters
  const queryParams = {
    page: currentPage,
    limit: pageSize,
    search: debouncedSearchQuery,
    role: roleFilter !== 'all' ? roleFilter : undefined,
    is_active: statusFilter !== 'all' ? statusFilter === 'active' : undefined,
  };

  // Use RTK Query hook
  const {
    data,
    error: queryError,
    isLoading,
    isFetching,
    refetch 
  } = useGetAllUsersQuery(queryParams, {
    skip: !hasNextPage,
    refetchOnMountOrArgChange: true,
    keepUnusedDataFor: 60, 
  });

  // Error handling
  useEffect(() => {
    if (queryError) {
      setError(null);
    }
  }, [queryError]);

  // Process received data
  useEffect(() => {
    if (data?.data) {
      setUsers(prev => {
        // Ensure unique users (avoid duplicates)
        const existingIds = new Set(prev.map(u => u.id));
        const newUsers = data.data.users.filter((u: UserProfile) => !existingIds.has(u.id));
        return [...prev, ...newUsers];
      });
      
      // Check if there's a next page
      setHasNextPage(
        data.data.pagination.current_page < data.data.pagination.total_pages
      );
    }
  }, [data]);

  // Function to load next page
  const loadMore = useCallback(() => {
    if (!isFetching && hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  }, [isFetching, hasNextPage]);

  // Function to refresh data
  const refresh = useCallback(() => {
    setUsers([]);
    setCurrentPage(1);
    setHasNextPage(true);
  }, []);

  // Reset when filters change
  useEffect(() => {
    refresh();
  }, [debouncedSearchQuery, roleFilter, statusFilter, refresh]);

  return {
    users,
    refetch,
    isLoading,
    isLoadingMore: isFetching,
    hasNextPage,
    loadMore,
    refresh,
    error,
  };
};