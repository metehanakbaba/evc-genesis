'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { WalletIcon } from '@heroicons/react/20/solid';
import { MainLayout, PageContainer, PageHeader } from '@ui/layout';
import { Breadcrumb, Button } from '@/shared/ui';
import { useWalletAnalytics, useAdjustBalanceMutation, useGetUserWalletQuery } from '@/features/wallets/api/walletApi';
import { WalletAnalyticsModal } from '@/features/wallets/components/WalletAnalyticsModal';
import { WalletUpdateModal } from '@/features/wallets/components/WalletUpdateModal';
import { TransactionStatsSection } from '@/features/wallets/components/TransactionStatsSection';
import { TransactionStatsData } from '../types/wallet.types';

/**
 * Wallet Details Page
 * Shows wallet details, analytics, and allows balance update
 */
export const WalletDetailsPage: React.FC = () => {
  // Assuming userId is passed as a route param
  const params = useParams();
  const userId = typeof params === 'object' && params?.userId ? String(params.userId) : '';

  // Fetch wallet details
  const { data: walletDetails, isLoading, error } = useGetUserWalletQuery(userId, {
    skip: !userId,
  });

  // Fetch wallet analytics
  const {
    data: analyticsData,
    isLoading: isAnalyticsLoading,
    isError: isAnalyticsError,
    error: analyticsError,
    refetch: refetchAnalytics,
  } = useWalletAnalytics({ period: '30d', includeCharts: true });

  // State for modals
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // Mutation for adjusting wallet balance
  const [adjustWalletBalance, { isLoading: isAdjusting }] = useAdjustBalanceMutation();

  if (isLoading) {
    return (
      <MainLayout>
        <PageContainer paddingY="md">
          <p>Loading wallet details...</p>
        </PageContainer>
      </MainLayout>
    );
  }

  if (error || !walletDetails) {
    return (
      <MainLayout>
        <PageContainer paddingY="md">
          <p>Error loading wallet details.</p>
        </PageContainer>
      </MainLayout>
    );
  }

  // Prepare transaction stats data for TransactionStatsSection
  const transactionStatsData: TransactionStatsData = {
    totalBalance: {
      formatted: walletDetails.balance.toFixed(2) + ' PLN',
      amount: walletDetails.balance,
    },
    dailyVolume: {
      formatted: analyticsData?.transactionVolume.total.toString() || '0',
      count: analyticsData?.transactionVolume.total || 0,
    },
    revenue: {
      formatted: analyticsData?.averages.depositAmount.toFixed(2) + ' PLN' || '0 PLN',
      percentage: analyticsData?.trends.balanceGrowth || '0%',
    },
    refundLiabilities: {
      amount: {
        formatted: analyticsData?.transactionVolume.refunds.toString() || '0',
        value: analyticsData?.transactionCounts.refunds || 0,
      },
      pending: analyticsData?.transactionCounts.refunds || 0
    },
  };

  return (
    <MainLayout showNotifications={true} headerVariant="default">
      <PageContainer paddingY="md">
        <Breadcrumb currentPageLabel="Wallet Details" variant="teal" />
        <PageHeader
          title={`Wallet Details - ${walletDetails.userFullName || walletDetails.userId}`}
          description={`Email: ${walletDetails.userEmail}`}
          variant="teal"
          actionButton={{
            label: 'Update Balance',
            onClick: () => setIsUpdateModalOpen(true),
            icon: WalletIcon,
          }}
        />
      </PageContainer>

      <PageContainer paddingY="lg" className="space-y-10">
        <TransactionStatsSection transactionStats={transactionStatsData} />

        <Button variant="outline" onClick={() => setIsAnalyticsModalOpen(true)}>
          View Wallet Analytics
        </Button>
      </PageContainer>

      {/* Wallet Analytics Modal */}
      <WalletAnalyticsModal
        isOpen={isAnalyticsModalOpen}
        onClose={() => setIsAnalyticsModalOpen(false)}
        analyticsData={analyticsData}
        isLoading={isAnalyticsLoading}
        isError={isAnalyticsError}
        error={analyticsError}
        onRefresh={refetchAnalytics}
      />

      {/* Wallet Update Modal */}
      <WalletUpdateModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        userId={userId}
        onAdjustBalance={adjustWalletBalance}
        isLoading={isAdjusting}
      />
    </MainLayout>
  );
};
