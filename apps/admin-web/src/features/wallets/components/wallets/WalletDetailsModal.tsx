'use client';

import React from 'react';
import { Modal } from '@ui/display';
import { Wallet } from '../../../../../../../packages/shared/api/src/lib/types/wallet.types';
import { StatusBadge, StatusConfig } from '@/shared/ui/components/DataDisplay/StatusBadge';
import { IconValueRow } from '@/shared/ui/molecules/IconValueRow/IconValueRow'; // Import IconValueRow
import { CurrencyDollarIcon, CalendarIcon, DocumentTextIcon, ChartBarIcon, XCircleIcon, IdentificationIcon, UserCircleIcon,EnvelopeIcon } from '@heroicons/react/20/solid';
import { useGetUserWalletDetailsQuery } from '../../api/walletApi';
import { Button } from '@/shared/ui';

interface WalletDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallet: Wallet | null;
}

const getWalletStatusConfig = (wallet: Wallet): StatusConfig => {
  if (wallet.status === "ACTIVE") {
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

  const { data, isLoading, error, refetch } = useGetUserWalletDetailsQuery(wallet.userId);

  const statusConfig = data
    ? getWalletStatusConfig({
        status: data.isActive ? 'ACTIVE' : 'INACTIVE',
      } as Wallet)
    : null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Wallet Details" size="xl" variant="default">
      <div className="flex flex-col h-[500px] overflow-y-auto text-white px-4 py-4 space-y-8">
        {isLoading && (
          <div className="text-center text-gray-400 py-12">Loading wallet details...</div>
        )}

        {error && (
          <div className="text-center text-red-500 py-12">
            Failed to load wallet details.
            <div className="mt-4">
              <Button onClick={() => refetch()} variant="ghost" size="md">
                Retry
              </Button>
            </div>
          </div>
        )}

        {!isLoading && !error && data && (
          <>
            <div>
              <div className="flex flex-row gap-3 items-center text-xl font-semibold mb-4 text-gray-200">
                <DocumentTextIcon className="h-8 w-8" /> Wallet Data
              </div>
              <div className="space-y-4">
                <IconValueRow icon={<IdentificationIcon className="h-5 w-5 text-gray-400" />} label="Wallet ID" value={wallet.id} />
                <IconValueRow icon={<UserCircleIcon className="h-5 w-5 text-gray-400" />} label="User ID" value={wallet.userId} />
                <IconValueRow icon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />} label="Email" value={wallet.userEmail} />
                <IconValueRow icon={<CurrencyDollarIcon className="h-5 w-5 text-gray-400" />} label="Balance" value={`${data.balance} ${data.currency}`} />
                <IconValueRow icon={<XCircleIcon className="h-5 w-5 text-gray-400" />} label="Status" value={<StatusBadge status={statusConfig!} />} />
                <IconValueRow icon={<CalendarIcon className="h-5 w-5 text-gray-400" />} label="Created At" value={new Date(wallet.createdAt).toLocaleString()} />
              </div>
            </div>

            <div>
              <div className="flex flex-row gap-3 items-center text-xl font-semibold mb-4 text-gray-200">
                <ChartBarIcon className="h-8 w-8" />
                Statistics 
              </div>
              <div className="space-y-4">
                <IconValueRow label="Total Deposited" value={`${data.statistics.totalDeposited} ${data.currency}`} />
                <IconValueRow label="Total Spent" value={`${data.statistics.totalSpent} ${data.currency}`} />
                <IconValueRow label="Transaction Count" value={data.statistics.transactionCount} />
              </div>
            </div>
          </>
        )}
      </div>

      {!isLoading && (
        <div className="flex justify-end mt-4 px-4">
          <Button onClick={() => refetch()} variant="ghost" size="md">
            Retry
          </Button>
        </div>
      )}
    </Modal>
  );
};
