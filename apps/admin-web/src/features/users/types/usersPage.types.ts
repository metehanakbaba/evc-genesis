import type React from 'react';
import type { UserProfile } from './user.types';

// Type for icon components
export type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

/**
 * 👥 User Management Statistics
 * Revolutionary floating stats with role-based data
 */
export interface UserStats {
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
 * User statistics data interface
 */
export interface UserStatsData {
  totalUsers: { formatted: string; count: number };
  activeUsers: { formatted: string; percentage: string };
  adminUsers: { formatted: string };
  newUsersThisMonth: { formatted: string };
}

/**
 * Filter groups configuration interface
 */
export interface UserFilterOption {
  id: string;
  label: string;
  icon: IconComponent;
  color: string;
}

/**
 * User management filter state
 */
export interface UserFilterState {
  searchQuery: string;
  roleFilter: string;
  statusFilter: string;
  viewMode: 'grid' | 'table';
}

/**
 * User action handlers interface
 */
export interface UserActionHandlers {
  onViewDetails: (user: UserProfile) => void;
  onEditUser: (user: UserProfile) => void;
  onDeleteUser: (user: UserProfile) => void;
  onToggleUserStatus: (user: UserProfile) => void;
}

/**
 * Bulk selection interface
 */
export interface UserBulkSelection {
  selectedIds: string[];
  selectedItems: Set<string>;
  selectedCount: number;
  isSelected: (id: string) => boolean;
  isAllSelected: boolean;
  isIndeterminate: boolean;
  toggleItem: (id: string) => void;
  toggleAll: () => void;
  clearSelection: () => void;
}

/**
 * User data loading state
 */
export interface UserDataState {
  users: UserProfile[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasNextPage: boolean;
  error: Error | null;
  refresh: () => void;
  loadMore: () => void;
}
