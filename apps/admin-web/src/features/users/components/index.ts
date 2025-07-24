/**
 * 👥 Users Components Index
 *
 * Centralized export for all user-related components.
 * Provides clean imports for reusable user components.
 *
 * @module UserComponents
 * @version 2.0.0
 * @author EV Charging Team
 */

// Re-export types for convenience
export type {
  UserActionHandlers,
  UserBulkSelection,
  UserDataState,
  UserFilterState,
  UserStatsData,
  // New comprehensive types
  UserStatsSectionProps,
  UserSearchSectionProps,
  UserBulkActionsProps,
  UserDataSectionProps,
  IconComponent,
  ViewMode,
  ColorVariant,
} from '../types/components.types';

// Legacy types for backward compatibility
export type {
  UserActionHandlers as LegacyUserActionHandlers,
  UserBulkSelection as LegacyUserBulkSelection,
  UserDataState as LegacyUserDataState,
  UserFilterState as LegacyUserFilterState,
  UserStatsData as LegacyUserStatsData,
} from '../types/usersPage.types';

// Component exports
export { default as UserBulkActions } from './UserBulkActions';
export { default as UserDataSection } from './UserDataSection';
export { default as UserSearchSection } from './UserSearchSection';
export { default as UserStatsSection } from './UserStatsSection';
