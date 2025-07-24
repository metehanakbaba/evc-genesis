/**
 * 👥 Users Pages Index
 *
 * Centralized export for all user-related pages.
 * Provides clean imports for user management pages.
 *
 * @module UserPages
 * @version 2.0.0
 * @author EV Charging Team
 */

// Page exports
export { default as UsersPage } from './UsersPage';
export { default as UserDetailsPage } from './UserDetailsPage'
export { default as CreateUserPage } from './CreateUserPage';

export interface UserDetailsPageProps {
  userId: string;
}

// Re-export component types for convenience
export type {
  UserActionHandlers,
  UserBulkSelection,
  UserDataState,
  UserFilterState,
  UserStatsSectionProps,
  UserSearchSectionProps,
  UserBulkActionsProps,
  UserDataSectionProps,
  IconComponent,
  ViewMode,
  ColorVariant,
} from '@/features/users/types/components.types';
