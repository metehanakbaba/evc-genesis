'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@ui/display';
import { ChartBarIcon, Cog6ToothIcon} from '@heroicons/react/20/solid';
import { Button, Select,  } from '@ui/forms';
import { useWalletAnalytics } from '../../hooks/useWallets';
import { Period } from '../../../../../../../packages/shared/api/src/lib/types/wallet.types';

export interface WalletAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
}


export const WalletAnalyticsModal: React.FC<WalletAnalyticsModalProps> = ({
  isOpen,
  onClose,
  onRefresh,
}) => {
  const [period, setPeriod] = useState<Period>('30d');
  const [includeCharts, setIncludeCharts] = useState<'true' | 'false'>('true');

  const { data, isLoading, isError, error, refetch } = useWalletAnalytics(
    {
      period,
      includeCharts: includeCharts === 'true',
    },
    !isOpen
  );

  const loading = isLoading;
  const errorState = isError;
  const errorData = error;

  const handleRefresh = () => {
    onRefresh();
    refetch();
  };

  useEffect(() => {
    if (isOpen) refetch();
  }, [period, includeCharts]);

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
      <div className="space-y-6 text-gray-300">
        <div className="flex gap-4">
          <Select
            label="Period"
            value={period}
            onChange={(val) => setPeriod(val as any)}
            options={[
              { value: '7d', label: 'Last 7 days' },
              { value: '30d', label: 'Last 30 days' },
              { value: '90d', label: 'Last 90 days' },
              { value: '1y', label: 'Last year' },
            ]}
          />

          <Select
            label="Include Charts"
            value={includeCharts}
            onChange={(val) => setIncludeCharts(val as any)}
            options={[
              { value: 'true', label: 'Yes' },
              { value: 'false', label: 'No' },
            ]}
          />
        </div>

        {loading && (
          <div className="text-center text-gray-400">Loading analytics data...</div>
        )}

        {errorState && (
          <div className="text-center text-red-500">
            Error loading analytics data: {String(errorData)}
          </div>
        )}

        {!loading && !errorState && data && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <section className="bg-white/5 border border-white/10 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <ChartBarIcon className="w-5 h-5 text-sky-400" />
                <h4 className="text-white font-semibold">General Overview</h4>
              </div>
              <ul className="text-sm space-y-1">
                <li><strong>Period:</strong> {data.period}</li>
                <li><strong>Total System Balance:</strong> {data.totalSystemBalance.toFixed(2)}</li>
                <li><strong>Total Users:</strong> {data.totalUsers}</li>
                <li><strong>Active Users:</strong> {data.activeUsers}</li>
              </ul>
            </section>

            {/* System Health */}
            <section className="bg-white/5 border border-white/10 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Cog6ToothIcon className="w-5 h-5 text-purple-400" />
                <h4 className="text-white font-semibold">System Health</h4>
              </div>
              <ul className="text-sm space-y-1">
                <li>Average Wallet Balance: {data.systemHealth.averageWalletBalance.toFixed(2)}</li>
                <li>Transaction Success Rate: {data.systemHealth.transactionSuccessRate.toFixed(2)}%</li>
              </ul>
            </section>
          </div>
        )}
      </div>
    </Modal>
  );
};
