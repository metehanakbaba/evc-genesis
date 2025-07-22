'use client'

import React, { useMemo } from 'react';
import { BulkActionBar, type BulkAction } from '@/shared/ui';
import { XCircleIcon, ArrowPathIcon, FireIcon } from '@heroicons/react/24/solid';
import { useSessionActions } from '@/features/sessions/hooks/useSessionActions';

interface SessionBulkActionsProps {
  selectedCount: number;
  totalCount: number;
  selectedIds: string[];
  onClearSelection: () => void;
}

export const SessionBulkActions: React.FC<SessionBulkActionsProps> = ({
  selectedCount,
  totalCount,
  selectedIds,
  onClearSelection,
}) => {
  const { stopSession, retrySession, forceStopSession } = useSessionActions();

  const bulkActions: BulkAction[] = useMemo(
    () => [
      {
        id: 'stop',
        label: 'Stop Sessions',
        icon: XCircleIcon,
        variant: 'danger',
        onClick: (ids: readonly string[]) => {
          ids.forEach((id) => {
            stopSession({ id } as any);
          });
          onClearSelection();
        },
        show: (count: number) => count > 0,
        confirmMessage: 'Are you sure you want to stop {count} selected sessions?',
      },
      {
        id: 'retry',
        label: 'Retry Sessions',
        icon: ArrowPathIcon,
        variant: 'primary',
        onClick: (ids: readonly string[]) => {
          ids.forEach((id) => {
            retrySession({ id } as any);
          });
          onClearSelection();
        },
        show: (count: number) => count > 0,
        confirmMessage: 'Retry all {count} failed sessions?',
      },
      {
        id: 'forceStop',
        label: 'Force Stop',
        icon: FireIcon,
        variant: 'secondary',
        onClick: (ids: readonly string[]) => {
          ids.forEach((id) => {
            forceStopSession({ id } as any);
          });
          onClearSelection();
        },
        show: (count: number) => count > 0,
        confirmMessage:
          'Force stop {count} sessions immediately? This may interrupt in‑progress charging.',
      },
    ],
    [stopSession, retrySession, forceStopSession, onClearSelection]
  );

  return (
    <BulkActionBar
      selectedCount={selectedCount}
      totalCount={totalCount}
      selectedIds={selectedIds}
      actions={bulkActions}
      onClearSelection={onClearSelection}
      entityName="sessions"
      variant="emerald"
    />
  );
};

export default SessionBulkActions;
