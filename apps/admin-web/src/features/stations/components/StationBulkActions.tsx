'use client'

import React, { useMemo } from 'react';
import { XCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import { BulkActionBar, type BulkAction } from '@/shared/ui';
import { ChargingStation } from '@evc/shared-business-logic';

interface StationsBulkActionsProps {
  selectedCount: number;
  totalCount: number;
  selectedIds: string[];
  onClearSelection: () => void;
  onToggleStatus: (stationId: string) => void;
  onDelete: (station: ChargingStation) => void;
}

const StationsBulkActions: React.FC<StationsBulkActionsProps> = ({
  selectedCount,
  totalCount,
  selectedIds,
  onClearSelection,
  onToggleStatus,
  onDelete,
}) => {
  // Два действия: переключить статус и удалить
  const actions: BulkAction[] = useMemo(
    () => [
      {
        id: 'toggle-status',
        label: 'Toggle Status',
        icon: XCircleIcon,
        variant: 'danger',
        onClick: async (selectedIds) => {
            // onToggleStatus();
          onClearSelection();
        },
        show: count => count > 0,
        confirmMessage: 'Toggle status for {count} selected stations?',
      },
      {
        id: 'delete',
        label: 'Delete Stations',
        icon: TrashIcon,
        variant: 'danger',
        onClick: selectedIds => {
        //   onDelete(selectedIds);
          onClearSelection();
        },
        show: count => count > 0,
        confirmMessage: 'Are you sure you want to delete {count} selected stations?',
      },
    ],
    [onToggleStatus, onDelete, onClearSelection]
  );

  if (selectedCount === 0) return null;

  return (
    <BulkActionBar
      selectedCount={selectedCount}
      totalCount={totalCount}
      selectedIds={selectedIds}
      actions={actions}
      onClearSelection={onClearSelection}
      entityName="stations"
      variant="blue"
    />
  );
};

export default StationsBulkActions;

