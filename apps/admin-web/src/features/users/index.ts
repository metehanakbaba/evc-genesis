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
} from './pages';

export type {
  UserDetailsPageProps,
} from './pages';

// ===============================
// COMPONENTS EXPORTS
// ===============================
export {
  UserBulkActions,
  UserDataSection,
  UserSearchSection,
  UserStatsSection,
} from './components';

// ===============================
// TYPES EXPORTS
// ===============================
export type {
  // Core component types
  UserActionHandlers,
  UserBulkSelection,
  UserDataState,
  UserFilterState,
  UserStatsData,
  UserStatsSectionProps,
  UserSearchSectionProps,
  UserBulkActionsProps,
  UserDataSectionProps,
  
  // UI types
  IconComponent,
  ViewMode,
  ColorVariant,
  
  // Form and API types
  UserFormData,
  UserFormErrors,
  UserFormProps,
  UserQueryParams,
  UsersApiResponse,
  UseFetchUsersParams,
  UseFetchUsersReturn,
  
  // Configuration types
  UserStatConfig,
  FilterOption,
  
} from './types/components.types';

// ===============================
// HOOKS EXPORTS
// ===============================
export {
  useUserActions,
} from './hooks/useUsers';

// ===============================
// API EXPORTS
// ===============================
export {
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from './api/usersApi';

// ===============================
// BUSINESS LOGIC RE-EXPORTS
// ===============================
export {
  // User role management
  getRoleConfig,
  getRoleOptions,
  getStatusOptions,
  
  // User filtering
  filterUsers,
  getDefaultFilters,
  
  // User utilities
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
