/**
 * 👥 Users Feature Index
 *
 * Centralized export for the complete users management feature.
 * Provides clean imports for all user-related functionality.
 *
 * @module UsersFeature
 * @version 2.0.0
 * @author EV Charging Team
 */

// ===============================
// PAGES EXPORTS
// ===============================
export {
  UsersPage,
  UserDetailsPage,
  CreateUserPage,
} from '@/features/users/pages';

export type {
  UserDetailsPageProps,
} from '@/features/users/pages';

// ===============================
// COMPONENTS EXPORTS
// ===============================
export {
  UserBulkActions,
  UserDataSection,
  UserSearchSection,
  UserStatsSection,
} from '@/features/users/components';

// ===============================
// TYPES EXPORTS
// ===============================
export type {
  UserStatsSectionProps,
  UserSearchSectionProps,
  UserBulkActionsProps,
  UserDataSectionProps,
  ColorVariant,
  ViewMode,
  UserActionHandlers,
  UserBulkSelection,
  UserDataState,
  UserFilterState,
} from '@/features/users/types/components.types';

export type {
  PaymentMethod,
  UpdateProfileRequest,
  UsersQueryParams,
  CreateUserRequest,
  UpdateUserRequest,
  UserStatistics,
} from '@/features/users/types/user.types';

// ===============================
// HOOKS EXPORTS
// ===============================
export {
  useSearchDebounce,
  useInfiniteScrollTrigger,
  useIntersectionObserver,
  useUserActions,
  useUserStatistics,
} from '@/features/users/hooks';

// ===============================
// API EXPORTS
// ===============================
export {
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from '@/features/users/api/usersApi';

// ===============================
// BUSINESS LOGIC RE-EXPORTS
// ===============================
export {
  getRoleConfig,
  getRoleOptions,
  getStatusOptions,
  filterUsers,
  getDefaultFilters,
  formatLastLogin,
  hasPermission,
  getAvailableActions,
  validateUserData,
  calculateUserStats,
} from '@evc/shared-business-logic';

export type {
  UserProfile,
  UserRole,
  UserRoleConfig,
  UserFilterOptions,
  RoleOption,
  StatusOption,
} from '@evc/shared-business-logic';

// ===============================
// FEATURE METADATA
// ===============================
export const USERS_FEATURE_INFO = {
  name: 'Users Management',
  version: '2.0.0',
  description: 'Comprehensive user management system with role-based access control',
  components: [
    'UsersPage',
    'UserDetailsPage',
    'UserStatsSection',
    'UserSearchSection',
    'UserDataSection',
    'UserBulkActions',
  ],
  features: [
    'User CRUD operations',
    'Role-based access control',
    'Bulk user operations',
    'Advanced filtering and search',
    'Real-time statistics',
    'Activity tracking',
    'Email verification',
    'Account status management',
  ],
  permissions: [
    'users.read',
    'users.write',
    'users.delete',
    'users.admin',
  ],
} as const;
