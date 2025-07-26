'use client';

import React from 'react';
import { Modal, Button, Spinner } from '@/shared/ui';
import type { WalletAnalyticsResponse } from '@evc/shared-business-logic';

interface WalletAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  analyticsData?: WalletAnalyticsResponse;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  onRefresh: () => void;
}

/**
 * Wallet Analytics Modal
 * Displays wallet analytics data with refresh capability
 */
export const WalletAnalyticsModal: React.FC<WalletAnalyticsModalProps> = ({
  isOpen,
  onClose,
  analyticsData,
  isLoading,
  isError,
  error,
  onRefresh,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Wallet Analytics" size="lg">
      <div className="space-y-4">
        {isLoading && (
          <div className="flex justify-center py-10">
            <Spinner size="lg" />
          </div>
        )}

        {isError && (
          <div className="text-red-500">
            <p>Error loading analytics data.</p>
            <pre>{String(error)}</pre>
          </div>
        )}

        {!isLoading && !isError && analyticsData && (
          <div>
            <p>Period: {analyticsData.period || 'N/A'}</p>
            <p>Total System Balance: {analyticsData.totalSystemBalance.toFixed(2)}</p>
            <p>Total Users: {analyticsData.totalUsers}</p>
            <p>Active Users: {analyticsData.activeUsers}</p>
            <p>Transaction Volume - Total: {analyticsData.transactionVolume.total}</p>
            <p>Deposits: {analyticsData.transactionVolume.deposits}</p>
            <p>Charges: {analyticsData.transactionVolume.charges}</p>
            <p>Refunds: {analyticsData.transactionVolume.refunds}</p>
            {/* Add more detailed analytics display as needed */}
          </div>
        )}

        <div className="flex justify-end space-x-2 pt-4">
          <Button onClick={onRefresh} variant="primary" disabled={isLoading}>
            Refresh
          </Button>
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
