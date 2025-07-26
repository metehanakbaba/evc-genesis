'use client';

import React from 'react';
import { BulkActionBar, BulkAction } from '@/shared/ui/components/DataDisplay/BulkActionBar';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface WalletsBulkActionsProps {
  selectedCount: number;
  selectedIds: readonly string[];
  onClearSelection: () => void;
  onActivate: (ids: readonly string[]) => void;
  onDeactivate: (ids: readonly string[]) => void;
}

export const WalletsBulkActions: React.FC<WalletsBulkActionsProps> = ({
  selectedCount,
  selectedIds,
  onClearSelection,
  onActivate,
  onDeactivate,
}) => {
  const bulkActions: BulkAction[] = [
    {
      id: 'activate',
      label: 'Activate',
      icon: CheckCircleIcon,
      variant: 'success',
      onClick: onActivate,
      show: (count) => count > 0,
    },
    {
      id: 'deactivate',
      label: 'Deactivate',
      icon: XCircleIcon,
      variant: 'danger',
      onClick: onDeactivate,
      show: (count) => count > 0,
    },
  ];

  return (
    <BulkActionBar
      selectedCount={selectedCount}
      selectedIds={selectedIds}
      actions={bulkActions}
      onClearSelection={onClearSelection}
      entityName="wallets"
      variant="emerald"
    />
  );
};
