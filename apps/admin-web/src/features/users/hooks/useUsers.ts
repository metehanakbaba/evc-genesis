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
import { useDebounce, useToast } from '@/shared/ui';
import { isApiError } from '@/shared/api/apiHelpers';

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
  const { showToast } = useToast();
  const [deleteUserApi] = useDeleteUserMutation();
  const [updateUserApi] = useUpdateUserMutation();
  const router = useRouter();

  const viewDetails = useCallback((user: UserProfile) => {
    router.push(`/users/${user.id}`);
  }, [router, showToast]);

  const editUser = useCallback(async (id: string, data: UpdateUserRequest) => {
    try {
      await updateUserApi({ id, data }).unwrap();
      
      showToast({
        type: 'success',
        title: 'Profile Updated',
        message: 'User information has been successfully saved',
        duration: 3000
      });
      
      return { success: true };
    } catch (error) {
      const errorMessage = isApiError(error) 
        ? error.data.error.message 
        : error instanceof Error 
          ? error.message 
          : 'Failed to update user';
      
      showToast({
        type: 'error',
        title: 'Update Failed',
        message: errorMessage,
        duration: 5000,
      });
      
      return { 
        success: false, 
        error: errorMessage 
      };
    }
  }, [updateUserApi, showToast]);

  const toggleUserStatus = useCallback(async (user: UserProfile) => {
    const newStatus = !user.isActive;
    
    try {
      await updateUserApi({
        id: user.id,
        data: { isActive: newStatus }
      }).unwrap();
      
      showToast({
        type: 'success',
        title: 'Status Changed',
        message: `${user.firstName} is now ${newStatus ? 'active' : 'inactive'}`,
        duration: 3000
      });
      
      return { success: true };
    } catch (error) {
      const errorMessage = isApiError(error)
        ? error.data.error.message
        : `Failed to ${newStatus ? 'activate' : 'deactivate'} user`;
      
      showToast({
        type: 'error',
        title: 'Operation Failed',
        message: errorMessage,
        duration: 5000
      });
      
      return { 
        success: false, 
        error: errorMessage 
      };
    }
  }, [updateUserApi, showToast]);

  const deleteUser = useCallback(async (userId: string, userName?: string) => {
    try {
      await deleteUserApi(userId).unwrap();
      
      showToast({
        type: 'success',
        title: 'User Deleted',
        message: userName 
          ? `${userName} has been removed from the system`
          : 'User account deleted',
        duration: 4000,
      });
      
      return { success: true };
    } catch (error) {
      const errorMessage = isApiError(error)
        ? error.data.error.message
        : 'Failed to delete user account';
      
      showToast({
        type: 'error',
        title: 'Deletion Failed',
        message: errorMessage,
        duration: 6000,
      });
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }, [deleteUserApi, showToast]);

  const resendVerificationEmail = useCallback(async (email: string) => {
    showToast({
      type: 'info',
      title: 'Feature Coming Soon',
      message: 'Email verification resend will be available in the next update',
      duration: 4000,
    });
    
    // TODO: Implement actual API call
    console.log('Resend verification to:', email);
    return { success: false, error: 'Not implemented' };
  }, [showToast]);

  return {
    viewDetails,
    editUser,
    toggleUserStatus,
    deleteUser,
    resendVerificationEmail,
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