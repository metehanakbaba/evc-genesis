'use client';

import {
  CheckCircleIcon,
  ShieldExclamationIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import type React from 'react';
import { useMemo } from 'react';

import { type BulkAction, BulkActionBar } from '@/shared/ui';

// Import types from the centralized types file
import type { UserBulkActionsProps } from '../types/components.types';

/**
 * 🔧 User Bulk Actions Component
 * Handles bulk operations for user management
 */
const UserBulkActions: React.FC<UserBulkActionsProps> = ({
  selectedCount,
  totalCount,
  selectedIds,
  onClearSelection,
}) => {
  // ✅ BULK ACTIONS configuration
  const bulkActions = useMemo(
    (): BulkAction[] => [
      {
        id: 'activate',
        label: 'Activate Users',
        icon: CheckCircleIcon,
        variant: 'success',
        onClick: async (selectedIds) => {
          // TODO
          // Implementation would call API to activate selected users
          console.log('Activating users:', selectedIds);
          onClearSelection();
        },
        show: (count) => count > 0,
        confirmMessage:
          'Are you sure you want to activate {count} selected users?',
      },
      {
        id: 'deactivate',
        label: 'Deactivate Users',
        icon: ShieldExclamationIcon,
        variant: 'secondary',
        onClick: async (selectedIds) => {
          // TODO
          // Implementation would call API to deactivate selected users
          console.log('Deactivating users:', selectedIds);
          onClearSelection();
        },
        show: (count) => count > 0,
        confirmMessage:
          'Are you sure you want to deactivate {count} selected users?',
      },
      {
        id: 'delete',
        label: 'Delete Users',
        icon: TrashIcon,
        variant: 'danger',
        onClick: async (selectedIds) => {
          // TODO
          // Implementation would call API to delete selected users
          console.log('Deleting users:', selectedIds);
          onClearSelection();
        },
        show: (count) => count > 0,
        disabled: (count) => count > 10, // Example: Don't allow bulk delete of more than 10 users
        confirmMessage:
          'Are you sure you want to permanently delete {count} selected users? This action cannot be undone.',
      },
    ],
    [onClearSelection],
  );

  return (
    <BulkActionBar
      selectedCount={selectedCount}
      totalCount={totalCount}
      selectedIds={selectedIds}
      actions={bulkActions}
      onClearSelection={onClearSelection}
      entityName="users"
      variant="blue"
    />
  );
};

export default UserBulkActions;
