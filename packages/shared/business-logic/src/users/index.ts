/**
 * 👥 Users Domain Business Logic
 * 
 * Centralized business logic for user management, role-based access control,
 * and user filtering operations.
 * 
 * Extracted from: apps/admin-web/src/features/users/pages/UsersPage.tsx
 */

// User role type definition
export type UserRole = 'ADMIN' | 'FIELD_WORKER' | 'CUSTOMER';

// ===============================
// TYPES & INTERFACES
// ===============================

export interface UserRoleConfig {
  readonly color: string;
  readonly icon: string;
  readonly text: string;
  readonly bgColor: string;
  readonly borderColor: string;
  readonly textColor: string;
  readonly badgeColor: string;
  readonly pulseColor: string;
}

export interface UserFilterOptions {
  readonly searchQuery: string;
  readonly roleFilter: string;
  readonly statusFilter: string;
}

export interface UserProfile {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly phone: string;
  readonly role: UserRole;
  readonly created_at: string;
  readonly last_login?: string;
  readonly is_active: boolean;
  readonly verified_email: boolean;
}

export interface RoleOption {
  readonly id: string;
  readonly label: string;
  readonly icon: string;
  readonly color: string;
}

export interface StatusOption {
  readonly id: string;
  readonly label: string;
  readonly icon: string;
  readonly color: string;
}

// ===============================
// ROLE MANAGEMENT BUSINESS LOGIC
// ===============================

/**
 * 🎨 Get Role Configuration
 * Returns styling and display configuration for user roles
 * 
 * @param role - User role (admin, operator, user)
 * @returns Role configuration object
 */
export const getRoleConfig = (role: UserRole): UserRoleConfig => {
  const configs: Record<UserRole, UserRoleConfig> = {
    ADMIN: {
      color: 'purple',
      icon: 'ShieldCheckIcon',
      text: 'Admin',
      bgColor: 'bg-gradient-to-br from-purple-500/15 via-purple-400/8 to-transparent',
      borderColor: 'border-purple-400/25 hover:border-purple-300/40',
      textColor: 'text-purple-400',
      badgeColor: 'bg-purple-500/10 border border-purple-500/20',
      pulseColor: 'bg-purple-500',
    },
    FIELD_WORKER: {
      color: 'teal',
      icon: 'CogIcon',
      text: 'Field Worker',
      bgColor: 'bg-gradient-to-br from-teal-500/15 via-teal-400/8 to-transparent',
      borderColor: 'border-teal-400/25 hover:border-teal-300/40',
      textColor: 'text-teal-400',
      badgeColor: 'bg-teal-500/10 border border-teal-500/20',
      pulseColor: 'bg-teal-500',
    },
    CUSTOMER: {
      color: 'blue',
      icon: 'UserIcon',
      text: 'Customer',
      bgColor: 'bg-gradient-to-br from-blue-500/15 via-blue-400/8 to-transparent',
      borderColor: 'border-blue-400/25 hover:border-blue-300/40',
      textColor: 'text-blue-400',
      badgeColor: 'bg-blue-500/10 border border-blue-500/20',
      pulseColor: 'bg-blue-500',
    },
  };
  
  return configs[role];
};

/**
 * 🎯 Get Role Options for Filtering
 * Returns available role options for filter dropdowns
 */
export const getRoleOptions = (): RoleOption[] => [
  { id: 'all', label: 'All Roles', icon: 'UserGroupIcon', color: 'gray' },
  { id: 'ADMIN', label: 'Admin', icon: 'ShieldCheckIcon', color: 'purple' },
  { id: 'FIELD_WORKER', label: 'Field Worker', icon: 'CogIcon', color: 'teal' },
  { id: 'CUSTOMER', label: 'Customer', icon: 'UserIcon', color: 'blue' },
];

/**
 * 🎯 Get Status Options for Filtering
 * Returns available status options for filter dropdowns
 */
export const getStatusOptions = (): StatusOption[] => [
  { id: 'all', label: 'All Status', icon: 'UserIcon', color: 'gray' },
  { id: 'active', label: 'Active', icon: 'CheckCircleIcon', color: 'emerald' },
  { id: 'inactive', label: 'Inactive', icon: 'XCircleIcon', color: 'red' },
];

// ===============================
// USER FILTERING BUSINESS LOGIC
// ===============================

/**
 * 🔍 Filter Users
 * Applies search, role, and status filters to user list
 * 
 * @param users - Array of users to filter
 * @param options - Filter options (search, role, status)
 * @returns Filtered user array
 */
export const filterUsers = (
  users: UserProfile[],
  options: UserFilterOptions
): UserProfile[] => {
  const { searchQuery, roleFilter, statusFilter } = options;
  
  return users.filter((user) => {
    // Search filter - name, email, phone
    const matchesSearch = searchQuery === '' || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);

    // Role filter
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    // Status filter
    const matchesStatus = statusFilter === 'all' ||
      (statusFilter === 'active' && user.is_active) ||
      (statusFilter === 'inactive' && !user.is_active);

    return matchesSearch && matchesRole && matchesStatus;
  });
};

/**
 * 📅 Format Last Login Time
 * Converts last login timestamp to human-readable format
 * 
 * @param lastLogin - ISO timestamp string
 * @returns Human-readable last login text
 */
export const formatLastLogin = (lastLogin?: string): string => {
  if (!lastLogin) return 'Never';
  
  const date = new Date(lastLogin);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return 'Today';
  if (diffDays === 2) return 'Yesterday';
  if (diffDays <= 7) return `${diffDays} days ago`;
  
  return date.toLocaleDateString();
};

// ===============================
// PERMISSION BUSINESS LOGIC
// ===============================

/**
 * 🔐 Check User Permissions
 * Determines if a user has specific permissions based on their role
 * 
 * @param userRole - User's role
 * @param permission - Permission to check
 * @returns Whether user has permission
 */
export const hasPermission = (
  userRole: UserRole,
  permission: 'read' | 'write' | 'delete' | 'admin'
): boolean => {
  const rolePermissions: Record<UserRole, string[]> = {
    ADMIN: ['read', 'write', 'delete', 'admin'],
    FIELD_WORKER: ['read', 'write'],
    CUSTOMER: ['read'],
  };
  
  return rolePermissions[userRole]?.includes(permission) || false;
};

/**
 * 🎯 Get Available Actions for User
 * Returns available actions based on user role and permissions
 * 
 * @param userRole - Current user's role
 * @param targetUser - Target user object
 * @returns Array of available actions
 */
export const getAvailableActions = (
  userRole: UserRole,
  targetUser: UserProfile
): string[] => {
  const actions: string[] = [];
  
  // Everyone can view
  if (hasPermission(userRole, 'read')) {
    actions.push('view');
  }
  
  // Operators and admins can edit
  if (hasPermission(userRole, 'write')) {
    actions.push('edit');
  }
  
  // Only admins can delete, and not themselves
  if (hasPermission(userRole, 'admin') && hasPermission(userRole, 'delete')) {
    actions.push('delete');
  }
  
  return actions;
};

/**
 * 📊 Validate User Data
 * Validates user profile data for creation/updates
 * 
 * @param userData - User data to validate
 * @returns Validation result with errors
 */
export const validateUserData = (userData: Partial<UserProfile>): {
  isValid: boolean;
  errors: Record<string, string>;
} => {
  const errors: Record<string, string> = {};
  
  // Name validation
  if (!userData.name || userData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!userData.email || !emailRegex.test(userData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  // Phone validation (Polish format)
  const phoneRegex = /^\+48[0-9]{9}$/;
  if (!userData.phone || !phoneRegex.test(userData.phone)) {
    errors.phone = 'Please enter a valid Polish phone number (+48XXXXXXXXX)';
  }
  
  // Role validation
  if (!userData.role || !['admin', 'operator', 'user'].includes(userData.role)) {
    errors.role = 'Please select a valid role';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * 🔄 Clear All Filters
 * Returns default filter state
 */
export const getDefaultFilters = (): UserFilterOptions => ({
  searchQuery: '',
  roleFilter: 'all',
  statusFilter: 'all',
});

// ===============================
// USER STATISTICS BUSINESS LOGIC
// ===============================

/**
 * 📈 Calculate User Statistics
 * Calculates various statistics from user data
 * 
 * @param users - Array of users
 * @returns User statistics object
 */
export const calculateUserStats = (users: UserProfile[]) => {
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.is_active).length;
  const adminUsers = users.filter(u => u.role === 'ADMIN').length;
  const operatorUsers = users.filter(u => u.role === 'FIELD_WORKER').length;
  const customerUsers = users.filter(u => u.role === 'CUSTOMER').length;
  const verifiedUsers = users.filter(u => u.verified_email).length;
  
  // Recent registrations (last 24 hours)
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const recentRegistrations = users.filter(
    u => new Date(u.created_at) > oneDayAgo
  ).length;
  
  return {
    totalUsers,
    activeUsers,
    inactiveUsers: totalUsers - activeUsers,
    adminUsers,
    operatorUsers,
    customerUsers,
    verifiedUsers,
    unverifiedUsers: totalUsers - verifiedUsers,
    recentRegistrations,
    activityRate: totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0,
    verificationRate: totalUsers > 0 ? Math.round((verifiedUsers / totalUsers) * 100) : 0,
  };
}; 