/**
 * 🎯 User Components TypeScript Interfaces
 * 
 * Comprehensive type definitions for all user management components
 * with full TypeScript validation and JSDoc documentation.
 * 
 * @module UserComponentTypes
 * @version 2.0.0
 * @author EV Charging Team
 */

import type React from 'react';
import type { UserProfile, UserRole } from '@evc/shared-business-logic';
import type { PaginationResponse } from '@/types/global.types';

// ===============================
// ICON & UI COMPONENT TYPES
// ===============================

/**
 * Standard icon component type for Heroicons
 */
export type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

/**
 * View mode options for data display
 */
export type ViewMode = 'grid' | 'table';

/**
 * Color variant options for UI components
 */
export type ColorVariant = 'purple' | 'blue' | 'emerald' | 'amber' | 'red' | 'gray';

// ===============================
// USER STATISTICS INTERFACES
// ===============================

/**
 * Individual user statistic configuration
 * 
 * @interface UserStatConfig
 */
export interface UserStatConfig {
  /** Display title for the statistic */
  readonly title: string;
  /** Formatted value to display */
  readonly value: string;
  /** Icon component to render */
  readonly icon: IconComponent;
  /** Background gradient classes */
  readonly bgColor: string;
  /** Border color classes */
  readonly borderColor: string;
  /** Icon color classes */
  readonly iconColor: string;
  /** Accent color classes */
  readonly accentColor: string;
  /** Trend description text */
  readonly trend: string;
  /** Detailed description */
  readonly description: string;
  /** Whether to show live indicator */
  readonly isLive?: boolean;
}

/**
 * Aggregated user statistics data
 * 
 * @interface UserStatsData
 */
export interface UserStatsData {
  /** Total user count statistics */
  readonly totalUsers: {
    readonly formatted: string;
    readonly count: number;
  };
  /** Active user statistics */
  readonly activeUsers: {
    readonly formatted: string;
    readonly percentage: string;
    readonly count: number;
  };
  /** Admin user statistics */
  readonly adminUsers: {
    readonly formatted: string;
    readonly count: number;
  };
  /** New users this month statistics */
  readonly newUsersThisMonth: {
    readonly formatted: string;
    readonly count: number;
  };
}

/**
 * Props for UserStatsSection component
 * 
 * @interface UserStatsSectionProps
 */
export interface UserStatsSectionProps {
  /** User statistics data to display */
  readonly userStats: UserStatsData;
  /** Optional loading state */
  readonly isLoading?: boolean;
  /** Optional error state */
  readonly error?: Error | null;
  /** Optional refresh callback */
  readonly onRefresh?: () => void;
}

// ===============================
// SEARCH & FILTER INTERFACES
// ===============================

/**
 * Filter option configuration
 * 
 * @interface FilterOption
 */
export interface FilterOption {
  /** Unique identifier */
  readonly id: string;
  /** Display label */
  readonly label: string;
  /** Icon component */
  readonly icon: IconComponent;
  /** Color variant */
  readonly color: ColorVariant;
  /** Optional description */
  readonly description?: string;
}

/**
 * User filter state
 * 
 * @interface UserFilterState
 */
export interface UserFilterState {
  /** Search query string */
  readonly searchQuery: string;
  /** Selected role filter */
  readonly roleFilter: string;
  /** Selected status filter */
  readonly statusFilter: string;
  /** Current view mode */
  readonly viewMode: ViewMode;
}

/**
 * Props for UserSearchSection component
 * 
 * @interface UserSearchSectionProps
 */
export interface UserSearchSectionProps {
  /** Current search query */
  readonly searchQuery: string;
  /** Search change handler */
  readonly onSearchChange: (value: string) => void;
  /** Current view mode */
  readonly viewMode: ViewMode;
  /** View mode change handler */
  readonly onViewModeChange: (mode: ViewMode) => void;
  /** Filter modal open handler */
  readonly onOpenFilterModal: () => void;
  /** Whether any filters are active */
  readonly isFilterActive: boolean;
  /** Optional loading state */
  readonly isLoading?: boolean;
  /** Optional placeholder text */
  readonly searchPlaceholder?: string;
}

// ===============================
// USER ACTION INTERFACES
// ===============================

/**
 * User action handlers
 * 
 * @interface UserActionHandlers
 */
export interface UserActionHandlers {
  /** View user details handler */
  readonly onViewDetails: (user: UserProfile) => void;
  /** Edit user handler */
  readonly onEditUser: (user: UserProfile) => void;
  /** Delete user handler */
  readonly onDeleteUser: (user: UserProfile) => void;
  /** Toggle user status handler */
  readonly onToggleUserStatus?: (user: UserProfile) => Promise<{ success: boolean; error?: string }>;
  /** Resend verification email handler */
  readonly onResendVerification?: (user: UserProfile) => Promise<{ success: boolean; error?: string }>;
}

/**
 * Bulk selection state and handlers
 * 
 * @interface UserBulkSelection
 */
export interface UserBulkSelection {
  /** Array of selected user IDs */
  readonly selectedIds: string[];
  /** Set of selected items for O(1) lookup */
  readonly selectedItems: Set<string>;
  /** Count of selected items */
  readonly selectedCount: number;
  /** Check if item is selected */
  readonly isSelected: (id: string) => boolean;
  /** Whether all items are selected */
  readonly isAllSelected: boolean;
  /** Whether selection is indeterminate */
  readonly isIndeterminate: boolean;
  /** Toggle single item selection */
  readonly toggleItem: (id: string) => void;
  /** Toggle all items selection */
  readonly toggleAll: (selected?: boolean) => void;
  /** Clear all selections */
  readonly clearSelection: () => void;
}

/**
 * Props for UserBulkActions component
 * 
 * @interface UserBulkActionsProps
 */
export interface UserBulkActionsProps {
  /** Number of selected items */
  readonly selectedCount: number;
  /** Total number of items */
  readonly totalCount: number;
  /** Array of selected user IDs */
  readonly selectedIds: string[];
  /** Clear selection handler */
  readonly onClearSelection: () => void;
  /** Optional bulk action handlers */
  readonly onBulkActivate?: (userIds: string[]) => Promise<{ success: boolean; error?: string }>;
  readonly onBulkDeactivate?: (userIds: string[]) => Promise<{ success: boolean; error?: string }>;
  readonly onBulkDelete?: (userIds: string[]) => Promise<{ success: boolean; error?: string }>;
  /** Optional loading state */
  readonly isLoading?: boolean;
}

// ===============================
// DATA DISPLAY INTERFACES
// ===============================

/**
 * User data loading state
 * 
 * @interface UserDataState
 */
export interface UserDataState {
  /** Array of user profiles */
  readonly users: UserProfile[];
  /** Initial loading state */
  readonly isLoading: boolean;
  /** Loading more data state */
  readonly isLoadingMore: boolean;
  /** Whether more data is available */
  readonly hasNextPage: boolean;
  /** Error state */
  readonly error: Error | null;
  /** Refresh data handler */
  readonly refresh: () => void;
  /** Load more data handler */
  readonly loadMore: () => void;
}

/**
 * Props for UserDataSection component
 * 
 * @interface UserDataSectionProps
 */
export interface UserDataSectionProps extends UserDataState, UserActionHandlers {
  /** Current view mode */
  readonly viewMode: ViewMode;
  /** Total users count */
  readonly totalUsers: { readonly count: number };
  /** Clear filters handler */
  readonly onClearFilters: () => void;
  /** Selected items set */
  readonly selectedItems: Set<string>;
  /** Select item handler */
  readonly onSelectItem: (id: string) => void;
  /** Select all handler */
  readonly onSelectAll: () => void;
  /** Optional empty state configuration */
  readonly emptyState?: {
    readonly title?: string;
    readonly description?: string;
    readonly actionLabel?: string;
  };
}

// ===============================
// API INTEGRATION INTERFACES
// ===============================

/**
 * User query parameters for API calls
 * 
 * @interface UserQueryParams
 */
export interface UserQueryParams {
  /** Page number for pagination */
  readonly page?: number;
  /** Items per page limit */
  readonly limit?: number;
  /** Search query string */
  readonly search?: string;
  /** Role filter */
  readonly role?: UserRole | 'all';
  /** Active status filter */
  readonly is_active?: boolean;
  /** Sort field */
  readonly sort_by?: 'created_at' | 'last_login' | 'name' | 'email';
  /** Sort order */
  readonly sort_order?: 'asc' | 'desc';
}

/**
 * API response for users list
 * 
 * @interface UsersApiResponse
 */
export interface UsersApiResponse {
  /** Array of user profiles */
  readonly users: ReadonlyArray<UserProfile>;
  /** Pagination information */
  readonly pagination: PaginationResponse;
}

/**
 * Hook parameters for fetching users
 * 
 * @interface UseFetchUsersParams
 */
export interface UseFetchUsersParams {
  /** Search query string */
  readonly searchQuery: string;
  /** Role filter */
  readonly roleFilter: string;
  /** Status filter */
  readonly statusFilter: string;
  /** Page size for pagination */
  readonly pageSize?: number;
  /** Whether to enable real-time updates */
  readonly enableRealTime?: boolean;
  /** Debounce delay for search */
  readonly debounceDelay?: number;
}

/**
 * Return type for useFetchUsers hook
 * 
 * @interface UseFetchUsersReturn
 */
export interface UseFetchUsersReturn extends UserDataState {
  /** Query parameters used */
  readonly queryParams: UserQueryParams;
  /** Refetch data with new parameters */
  readonly refetch: (params?: Partial<UserQueryParams>) => void;
}

// ===============================
// FORM & MODAL INTERFACES
// ===============================

/**
 * User form data for create/edit operations
 * 
 * @interface UserFormData
 */
export interface UserFormData {
  /** User email address */
  readonly email: string;
  /** User full name */
  readonly name: string;
  /** User phone number */
  readonly phone: string;
  /** User role */
  readonly role: UserRole;
  /** User active status */
  readonly is_active: boolean;
  /** Password (for creation) */
  readonly password?: string;
  /** Confirm password (for creation) */
  readonly confirmPassword?: string;
}

/**
 * Form validation errors
 * 
 * @interface UserFormErrors
 */
export interface UserFormErrors {
  readonly email?: string;
  readonly name?: string;
  readonly phone?: string;
  readonly role?: string;
  readonly password?: string;
  readonly confirmPassword?: string;
  readonly general?: string;
}

/**
 * Props for user form components
 * 
 * @interface UserFormProps
 */
export interface UserFormProps {
  /** Initial form data */
  readonly initialData?: Partial<UserFormData>;
  /** Form submission handler */
  readonly onSubmit: (data: UserFormData) => Promise<{ success: boolean; error?: string }>;
  /** Form cancellation handler */
  readonly onCancel: () => void;
  /** Whether form is in loading state */
  readonly isLoading?: boolean;
  /** Form validation errors */
  readonly errors?: UserFormErrors;
  /** Whether this is an edit form */
  readonly isEdit?: boolean;
}

// ===============================
// EXPORT ALL TYPES
// ===============================

export type {
  // Re-export from business logic
  UserProfile,
  UserRole,
} from '@evc/shared-business-logic';

export type {
  // Re-export from global types
  ApiResponse,
  PaginationResponse,
} from '@/types/global.types';
