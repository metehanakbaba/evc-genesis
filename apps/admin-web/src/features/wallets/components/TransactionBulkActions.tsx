import React from 'react';
import { ArrowPathIcon } from '@heroicons/react/20/solid';
import { EyeIcon, BanIcon} from 'lucide-react';
import { BulkAction, BulkActionBar } from '@/shared/ui';
import { PLNTransaction } from '@/features/wallets/types/wallet.types';

export interface TransactionBulkActionsProps {
  transactions: PLNTransaction[];
  selectedIds: string[];
  selectedCount: number;
  clearSelection: () => void;
  totalCount?: number;
  viewDetails: (tx: PLNTransaction) => void;
  retryTransaction: (tx: PLNTransaction) => void;
  refundTransaction: (tx: PLNTransaction) => void;
}

export const TransactionBulkActions: React.FC<TransactionBulkActionsProps> = ({
  transactions,
  selectedIds,
  selectedCount,
  clearSelection,
  totalCount,
  viewDetails,
  retryTransaction,
  refundTransaction,
}) => {
  const actions: BulkAction[] = [
    {
      id: 'view',
      label: 'View',
      icon: EyeIcon,
      variant: 'secondary',
      onClick: (selectedIds: readonly string[]) => {
        const tx = transactions.find(t => t.id === selectedIds[0]);
        if (tx) viewDetails(tx);
      },
      show: (count) => count > 0,
    },
    {
      id: 'retry',
      label: 'Retry',
      icon: ArrowPathIcon,
      variant: 'success',
      onClick: (selectedIds: readonly string[]) => {
        selectedIds.forEach(id => {
          const tx = transactions.find(t => t.id === id);
          if (tx) retryTransaction(tx);
        });
      },
      show: (count) => count > 0,
    },
    {
      id: 'refund',
      label: 'Refund',
      icon: BanIcon,
      variant: 'danger',
      confirmMessage: 'Are you sure you want to refund {count} transactions?',
      onClick: (selectedIds: readonly string[]) => {
        selectedIds.forEach(id => {
          const tx = transactions.find(t => t.id === id);
          if (tx) refundTransaction(tx);
        });
      },
      show: (count) => count > 0,
    },
  ];

  return (
    <BulkActionBar
      selectedCount={selectedCount}
      totalCount={totalCount}
      selectedIds={selectedIds}
      actions={actions}
      onClearSelection={clearSelection}
      entityName="transactions"
      variant="purple"
    />
  );
};
