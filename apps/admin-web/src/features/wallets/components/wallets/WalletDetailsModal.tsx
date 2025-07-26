'use client';

import React from 'react';
import { Modal } from '@ui/display';
import { Wallet } from '../../../../../../../packages/shared/api/src/lib/types/wallet.types';
import { StatusBadge, StatusConfig } from '@/shared/ui/components/DataDisplay/StatusBadge';

interface WalletDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallet: Wallet | null;
}

const getWalletStatusConfig = (wallet: Wallet): StatusConfig => {
  if (wallet.isActive) {
    return {
      variant: 'success',
      label: 'Active',
    };
  }
  return {
    variant: 'danger',
    label: 'Inactive',
  };
};

export const WalletDetailsModal: React.FC<WalletDetailsModalProps> = ({
  isOpen,
  onClose,
  wallet,
}) => {
  if (!wallet) return null;

  const statusConfig = getWalletStatusConfig(wallet);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Wallet Details" size="md" variant="default">
      <div className="space-y-4 text-white">
        <div>
          <h3 className="text-lg font-semibold mb-2">User Email</h3>
          <p>{wallet.userEmail}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Balance</h3>
          <p>{wallet.balance.toFixed(2)} {wallet.currency}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Status</h3>
          <StatusBadge status={statusConfig} />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Created At</h3>
          <p>{new Date(wallet.createdAt).toLocaleString()}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Last Transaction At</h3>
          <p>{wallet.lastTransactionAt ? new Date(wallet.lastTransactionAt).toLocaleString() : 'N/A'}</p>
        </div>
      </div>
    </Modal>
  );
};
