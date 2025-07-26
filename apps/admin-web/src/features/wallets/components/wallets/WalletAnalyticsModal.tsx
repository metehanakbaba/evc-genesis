'use client';

import React from 'react';
import { Modal } from '@ui/display';
import { Button } from '@ui/forms';
import { useWalletAnalytics } from '../../api/walletApi';

export interface WalletAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  onRefresh: () => void;
}

export const WalletAnalyticsModal: React.FC<WalletAnalyticsModalProps> = ({
  isOpen,
  onClose,
  isLoading,
  isError,
  error,
  onRefresh,
}) => {
  // Use wallet analytics hook with default params
  const { data, isLoading: hookLoading, isError: hookError, error: hookErrorData, refetch } = useWalletAnalytics({
    period: '30d',
    includeCharts: true,
  });

  // Combine loading and error states from props and hook
  const loading = isLoading || hookLoading;
  const errorState = isError || hookError;
  const errorData = error || hookErrorData;

  // Handle refresh click
  const handleRefresh = () => {
    onRefresh();
    refetch();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Wallet Analytics"
      size="lg"
      variant="default"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRefresh} disabled={loading}>
            Refresh
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {loading && (
          <div className="text-center text-gray-400">Loading analytics data...</div>
        )}

        {errorState && (
          <div className="text-center text-red-500">
            Error loading analytics data: {String(errorData)}
          </div>
        )}

        {!loading && !errorState && data && (
          <div className="text-gray-300 space-y-4">
            <div>
              <strong>Period:</strong> {data.period}
            </div>
            <div>
              <strong>Total System Balance:</strong> {data.totalSystemBalance.toFixed(2)}
            </div>
            <div>
              <strong>Total Users:</strong> {data.totalUsers}
            </div>
            <div>
              <strong>Active Users:</strong> {data.activeUsers}
            </div>
            <div>
              <strong>Transaction Volume:</strong>
              <ul className="list-disc list-inside ml-4">
                <li>Total: {data.transactionVolume.total}</li>
                <li>Deposits: {data.transactionVolume.deposits}</li>
                <li>Charges: {data.transactionVolume.charges}</li>
                <li>Refunds: {data.transactionVolume.refunds}</li>
              </ul>
            </div>
            <div>
              <strong>Transaction Counts:</strong>
              <ul className="list-disc list-inside ml-4">
                <li>Total: {data.transactionCounts.total}</li>
                <li>Deposits: {data.transactionCounts.deposits}</li>
                <li>Charges: {data.transactionCounts.charges}</li>
                <li>Refunds: {data.transactionCounts.refunds}</li>
              </ul>
            </div>
            <div>
              <strong>Averages:</strong>
              <ul className="list-disc list-inside ml-4">
                <li>Deposit Amount: {data.averages.depositAmount.toFixed(2)}</li>
                <li>Charge Amount: {data.averages.chargeAmount.toFixed(2)}</li>
                <li>User Balance: {data.averages.userBalance.toFixed(2)}</li>
              </ul>
            </div>
            <div>
              <strong>Trends:</strong>
              <ul className="list-disc list-inside ml-4">
                <li>Balance Growth: {data.trends.balanceGrowth}</li>
                <li>Transaction Growth: {data.trends.transactionGrowth}</li>
                <li>User Growth: {data.trends.userGrowth}</li>
              </ul>
            </div>
            <div>
              <strong>Alerts:</strong>
              {data.alerts.length === 0 ? (
                <div>No alerts</div>
              ) : (
                <ul className="list-disc list-inside ml-4">
                  {data.alerts.map((alert: any, idx: number) => (
                    <li key={idx} className={`text-${alert.severity.toLowerCase()}`}>
                      [{alert.severity}] {alert.message}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
