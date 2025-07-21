/**
 * 👥 Users API Hooks
 *
 * Custom user management hooks that extend the base API.
 * Following WalletsPage pattern for consistency.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { UserProfile } from '../types/user.types';

// Mock data - API schema compliant
const MOCK_USERS: UserProfile[] = [
  {
    id: 'user-001',
    email: 'admin@evcharging.com',
    name: 'Sarah Mitchell',
    phone: '+905551234567',
    role: 'admin',
    created_at: '2024-01-10T08:30:00Z',
    last_login: '2024-01-15T10:45:00Z',
    is_active: true,
    verified_email: true,
  },
  {
    id: 'user-002',
    email: 'john.tech@field.com',
    name: 'John Anderson',
    phone: '+905551234568',
    role: 'operator',
    created_at: '2024-01-12T14:20:00Z',
    last_login: '2024-01-15T09:15:00Z',
    is_active: true,
    verified_email: true,
  },
  {
    id: 'user-003',
    email: 'customer@example.com',
    name: 'Alice Thompson',
    phone: '+905551234569',
    role: 'user',
    created_at: '2024-01-14T16:10:00Z',
    last_login: '2024-01-15T11:20:00Z',
    is_active: true,
    verified_email: false,
  },
  {
    id: 'user-004',
    email: 'inactive@user.com',
    name: 'Mike Wilson',
    phone: '+905551234570',
    role: 'user',
    created_at: '2024-01-08T12:00:00Z',
    last_login: '2024-01-10T15:30:00Z',
    is_active: false,
    verified_email: true,
  },
  // Add more mock users for testing pagination
  {
    id: 'user-005',
    email: 'manager@company.com',
    name: 'Emma Davis',
    phone: '+905551234571',
    role: 'admin',
    created_at: '2024-01-05T09:00:00Z',
    last_login: '2024-01-15T08:30:00Z',
    is_active: true,
    verified_email: true,
  },
];

/**
 * 📊 User Statistics Hook
 * Provides real-time user metrics similar to wallet statistics
 */
export const useUserStatistics = () => {
  const totalUsers = MOCK_USERS.length;
  const activeUsers = MOCK_USERS.filter((user) => user.is_active).length;
  const adminUsers = MOCK_USERS.filter((user) => user.role === 'admin').length;
  const newUsersThisMonth = MOCK_USERS.filter(
    (user) =>
      new Date(user.created_at) >
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
  const viewDetails = useCallback((user: UserProfile) => {
    console.log('👀 Viewing user details:', user.id);
    // TODO: Implement user details modal or navigation
  }, []);

  const editUser = useCallback((user: UserProfile) => {
    console.log('✏️ Editing user:', user.id);
    // TODO: Implement user edit functionality
  }, []);

  const toggleUserStatus = useCallback(async (user: UserProfile) => {
    console.log('🔄 Toggling user status:', user.id, !user.is_active);
    // TODO: Implement API call to toggle user status
    return Promise.resolve();
  }, []);

  const deleteUser = useCallback(async (user: UserProfile) => {
    console.log('🗑️ Deleting user:', user.id);
    // TODO: Implement API call to delete user
    return Promise.resolve();
  }, []);

  const resendVerificationEmail = useCallback(async (user: UserProfile) => {
    console.log('📧 Resending verification email to:', user.email);
    // TODO: Implement API call to resend verification
    return Promise.resolve();
  }, []);

  return {
    viewDetails,
    editUser,
    toggleUserStatus,
    deleteUser,
    resendVerificationEmail,
  };
};

/**
 * 🔄 Infinite Users Hook - Performance Optimized
 * Provides paginated user data with filtering similar to transactions
 */
export const useInfiniteUsers = ({
  filters,
  pageSize = 20,
}: {
  filters: {
    searchQuery: string;
    roleFilter: string;
    statusFilter: string;
  };
  pageSize?: number;
}) => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState<Error | null>(null);

  // ✅ Generate more mock users for pagination testing
  const generateMockUsers = useCallback((count: number = 50): UserProfile[] => {
    const additionalUsers: UserProfile[] = [];
    const roles: UserProfile['role'][] = ['admin', 'operator', 'user'];
    const companies = [
      'TechCorp',
      'EV Solutions',
      'Energy Plus',
      'Smart Grid',
      'PowerFlow',
    ];

    for (let i = 5; i < count; i++) {
      additionalUsers.push({
        id: `user-${String(i + 1).padStart(3, '0')}`,
        email: `user${i + 1}@${companies[i % companies.length].toLowerCase().replace(' ', '')}.com`,
        name: `User ${i + 1}`,
        phone: `+9055512345${String(i + 10)}`,
        role: roles[i % roles.length],
        created_at: new Date(
          Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        last_login: new Date(
          Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        is_active: Math.random() > 0.1, // 90% active
        verified_email: Math.random() > 0.2, // 80% verified
      });
    }

    return [...MOCK_USERS, ...additionalUsers];
  }, []);

  // ✅ All mock users for filtering
  const allUsers = useMemo(() => generateMockUsers(50), [generateMockUsers]);

  // ✅ Apply filters to get filtered dataset
  const filteredUsers = useMemo(() => {
    return allUsers.filter((user: UserProfile) => {
      // Search filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesSearch =
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.phone.includes(query);

        if (!matchesSearch) return false;
      }

      // Role filter
      if (filters.roleFilter !== 'all') {
        if (user.role !== filters.roleFilter) return false;
      }

      // Status filter
      if (filters.statusFilter !== 'all') {
        const isActive = filters.statusFilter === 'active';
        if (user.is_active !== isActive) return false;
      }

      return true;
    });
  }, [allUsers, filters]);

  // ✅ Fetch Users Function with pagination simulation
  const fetchUsers = useCallback(
    async (page: number): Promise<UserProfile[]> => {
      // Simulate API delay
      await new Promise((resolve) =>
        setTimeout(resolve, page === 0 ? 800 : 400),
      );

      // Paginate filtered results
      const offset = page * pageSize;
      const paginatedUsers = filteredUsers.slice(offset, offset + pageSize);

      return paginatedUsers;
    },
    [filteredUsers, pageSize],
  );

  // ✅ Load initial data
  const loadInitialData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setCurrentPage(0);

    try {
      const initialUsers = await fetchUsers(0);

      setUsers(initialUsers);
      setCurrentPage(0);
      setHasNextPage(
        initialUsers.length === pageSize && filteredUsers.length > pageSize,
      );
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load users'));
    } finally {
      setIsLoading(false);
    }
  }, [fetchUsers, filteredUsers.length, pageSize]);

  // ✅ Load more data for infinite scroll
  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasNextPage || isLoading) return;

    setIsLoadingMore(true);
    setError(null);

    try {
      const nextPage = currentPage + 1;
      const moreUsers = await fetchUsers(nextPage);

      setUsers((prev) => {
        const existingIds = new Set(prev.map((u) => u.id));
        const newUsers = moreUsers.filter((u) => !existingIds.has(u.id));
        return [...prev, ...newUsers];
      });

      setCurrentPage(nextPage);
      setHasNextPage((nextPage + 1) * pageSize < filteredUsers.length);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Failed to load more users'),
      );
    } finally {
      setIsLoadingMore(false);
    }
  }, [
    isLoadingMore,
    hasNextPage,
    isLoading,
    currentPage,
    fetchUsers,
    filteredUsers.length,
    pageSize,
  ]);

  // ✅ Refresh data
  const refresh = useCallback(() => {
    setUsers([]);
    setCurrentPage(0);
    setHasNextPage(true);
    loadInitialData();
  }, [loadInitialData]);

  // ✅ Load initial data on mount
  useEffect(() => {
    loadInitialData();
    return undefined; // Explicit return for TypeScript
  }, []); // Only run once on mount

  // ✅ Reload when filters change
  useEffect(() => {
    if (users.length > 0) {
      // Only reload if we have initial data
      setUsers([]);
      setCurrentPage(0);
      setHasNextPage(true);

      // Small delay to batch filter changes
      const timeoutId = setTimeout(() => {
        loadInitialData();
      }, 100);

      return () => clearTimeout(timeoutId);
    }
    return undefined; // Explicit return for all code paths
  }, [filters.searchQuery, filters.roleFilter, filters.statusFilter]);

  return {
    users,
    isLoading,
    isLoadingMore,
    hasNextPage,
    loadMore,
    refresh,
    error,
  };
};
