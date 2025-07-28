/**
 * 🔄 Infinite Wallets Hook
 *
 * Infinite scroll functionality for wallet lists with API-based search and filtering.
 * Compatible with wallet API schema and server-side pagination.
 *
 * @module useInfiniteWallets
 * @version 1.0.0
 * @author EV Charging Team
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAdjustBalanceMutation,  useGetWalletAnalyticsQuery, useGetAllWalletsQuery, useGetUserWalletDetailsQuery } from '../api/walletApi';
import { Wallet, WalletStats, WalletAnalyticsQueryParams, WalletAnalytics, AdjustBalanceData } from '../../../../../../packages/shared/api/src/lib/types/wallet.types';
import { useDebounce } from './useDebounce';
import { WalletsStatsData } from '../types/wallet.types';
import { useToast } from '@/shared/ui';
import { isApiError } from '@/shared/api/apiHelpers';

interface WalletsResult {
  readonly wallets: Wallet[];
  readonly stats: WalletStats | null;
  isLoading: boolean;
  isLoadingMore: boolean;
  hasNextPage: boolean;
  error: Error | null;
  loadMore: () => void;
  refresh: () => void;
  total: number;
}

interface UseWalletsOptions {
  search?: string;
  isActive?: boolean | 'all';
  userId?: string;
  pageSize?: number;
  enabled?: boolean;
}

export const useAllWallets = ({
  search = '',
  isActive = 'all',
  userId,
  pageSize = 20,
}: UseWalletsOptions): WalletsResult => {
  const [currentPage, setCurrentPage] = useState(1);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [stats, setStats] = useState<WalletStats | null>(null);
  const [total, setTotal] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const debouncedSearchQuery = useDebounce(search, 300);

  const queryParams = useMemo(() => {
    const params: any = {
      limit: pageSize,
      offset: (currentPage - 1) * pageSize,
    };

    if (debouncedSearchQuery) params.search = debouncedSearchQuery;
    if (userId) params.userId = userId;
    if (isActive !== 'all') params.isActive = isActive;

    return params;
  }, [currentPage, pageSize, debouncedSearchQuery, isActive, userId]);

  const {
    data,
    error: queryError,
    isLoading,
    isFetching,
  } = useGetAllWalletsQuery(queryParams, {
    skip: !hasNextPage,
    refetchOnMountOrArgChange: true,
    keepUnusedDataFor: 60, 
  });

  useEffect(() => {
    if (queryError) {
      setError(queryError as Error);
    }
  }, [queryError]);

  useEffect(() => {
    if (data) {
      setWallets(prev => {
        const existingIds = new Set(prev.map(w => w.userId));
        const newWallets = data.wallets.filter((w: Wallet) => !existingIds.has(w.userId));
        return currentPage === 1 ? data.wallets : [...prev, ...newWallets];
      });

      if (currentPage === 1) {
        setStats(data.stats || null);
        setTotal(data.pagination?.total || 0);
      }

      setHasNextPage(data.pagination?.hasMore || false);
    }
  }, [data, currentPage]);

  const loadMore = useCallback(() => {
    if (!isFetching && hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  }, [isFetching, hasNextPage]);

  const refresh = useCallback(() => {
    setWallets([]);
    setCurrentPage(1);
    setHasNextPage(true);
  }, []);

  useEffect(() => {
    refresh();
  }, [debouncedSearchQuery, isActive, userId, refresh]);

  return {
    wallets,
    stats,
    isLoading,
    isLoadingMore: isFetching && currentPage > 1,
    hasNextPage,
    error,
    loadMore,
    refresh,
    total,
  };
};

/**
 * 💼 Wallet Actions Hook
 * Group wallet-related actions such as view details, activate/deactivate, etc.
 */
export const useWalletActions = () => {
  const { showToast } = useToast();

   const [adjustBalance] = useAdjustBalanceMutation();

  const adjustWalletBalance = useCallback(async (userId: string, data: AdjustBalanceData) => {
    
    try {
      const response = await adjustBalance({ userId, data }).unwrap();
      showToast({
        type: 'success',
        title: 'Balance adjusted',
        message: "Wallet balance was adjusted successfully",
        duration: 4000,
      });
      return { success: true, data: response  }
    } catch (error){
      const errorMessage = isApiError(error)
      ? error.data.error.message : 'Failed to adjust wallet baance'
      showToast({
        type: 'error',
        title: 'Error adjusting wallet',
        message: errorMessage,
        duration: 4000,
      });
    }
  }, [showToast, adjustBalance]);

  const viewWalletBalance = useCallback(async (userId: string) => {
    try {
      const response = await useGetUserWalletDetailsQuery(userId).unwrap();
      return { success: true, data: response.data }
    } catch (error){
      const errorMessage = isApiError(error)
      ? error.data.error.message : 'Failed to adjust wallet baance'
      showToast({
        type: 'error',
        title: 'Error getting walet details',
        message: errorMessage,
        duration: 4000,
      });
    }
  }, [])

  return {
    adjustWalletBalance,
    viewWalletBalance
  }
};


export const useWalletStatistics = (wallets: Wallet[]): WalletsStatsData => {
  if (wallets.length === 0) {
    return {
      totalBalance: {
        amount: 0,
        formatted: '0 PLN',
      },
      totalWallets: {
        count: 0,
        formatted: '0 wallets',
      },
      activeWallets: {
        count: 0,
        percentage: '0%',
        formatted: '0 active',
      },
      newWalletsThisMonth: {
        count: 0,
        formatted: '0 new',
      },
    };
  }

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const total = wallets.length;

  const totalBalance = wallets.reduce((sum, w) => sum + w.balance.value, 0);
  const currency = wallets[0].balance.currency;

  const activeCount = wallets.filter(w => w.status === 'ACTIVE').length;

  const recentlyCreated = wallets.filter(w => {
    const createdAt = new Date(w.createdAt);
    return createdAt.getMonth() === currentMonth && createdAt.getFullYear() === currentYear;
  }).length;

  const activePercentage = total === 0 ? 0 : (activeCount / total) * 100;

  return {
    totalBalance: {
      amount: totalBalance,
      formatted: `${totalBalance.toFixed(2)} ${currency}`,
    },
    totalWallets: {
      count: total,
      formatted: `${total} wallet${total === 1 ? '' : 's'}`,
    },
    activeWallets: {
      count: activeCount,
      percentage: `${activePercentage.toFixed(1)}%`,
      formatted: `${activeCount} active`,
    },
    newWalletsThisMonth: {
      count: recentlyCreated,
      formatted: `${recentlyCreated} new`,
    }
  };
};

export const useWalletAnalytics = (
  params: WalletAnalyticsQueryParams,
  enabled: boolean
) => {
  const {
    data: apiResponse,
    isLoading,
    error,
    isError,
    refetch,
    isFetching,
  } = useGetWalletAnalyticsQuery(params, {
    skip: enabled
  });

  const analyticsData: WalletAnalytics = apiResponse || {
    period: params.period,
    totalSystemBalance: 0,
    totalUsers: 0,
    activeUsers: 0,
    systemHealth: {
      transactionSuccessRate: 0,
      averageWalletBalance: 0,
    },
  };

  // Вычисляемые производные данные
  const derivedData = {
    successRateFormatted: `${(analyticsData.systemHealth.transactionSuccessRate * 100).toFixed(1)}%`,
    avgWalletBalance: analyticsData.systemHealth.averageWalletBalance,
  };

  return {
    data: analyticsData,
    period: analyticsData.period,
    isEmpty: !apiResponse?.data,
    lastUpdated: new Date().toISOString(),
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
    ...derivedData,
    get mainMetrics() {
      return {
        totalBalance: analyticsData.totalSystemBalance,
        activeUsers: analyticsData.activeUsers,
        transactionSuccessRate: derivedData.successRateFormatted,
        avgWalletBalance: derivedData.avgWalletBalance,
      };
    },
  };
};
