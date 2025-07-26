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
import { useGetAllWalletsQuery } from '../api/walletApi';
import type { Wallet, WalletStats } from '../../../../../../packages/shared/api/src/lib/types/wallet.types';
import { useDebounce } from './useDebounce';

interface WalletsResult {
  wallets: Wallet[];
  stats: WalletStats | null;
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
  enabled = true,
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
    skip: !enabled || !hasNextPage,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (queryError) {
      setError(queryError as Error);
    } else {
      setError(null);
    }
  }, [queryError]);

  useEffect(() => {
    if (data) {
      setWallets(prev => {
        console.log(data)
        const existingIds = new Set(prev.map(w => w.userId));
        const newWallets = data.filter((w: Wallet) => !existingIds.has(w.userId));
        return currentPage === 1 ? data : [...prev, ...newWallets];
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
    if (enabled) {
      refresh();
    }
  }, [debouncedSearchQuery, isActive, userId, enabled, refresh]);

  return {
    wallets,
    stats,
    isLoading: isLoading && currentPage === 1,
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
  return {
    viewDetails: (wallet: Wallet) => {
      console.log('👀 Viewing wallet details:', wallet.userId);
      // TODO: Implement navigation or modal to wallet details page
    },
    activateWallet: (wallet: Wallet) => {
      console.log('✅ Activating wallet:', wallet.userId);
      // TODO: Implement activation logic
    },
    deactivateWallet: (wallet: Wallet) => {
      console.log('❌ Deactivating wallet:', wallet.userId);
      // TODO: Implement deactivation logic
    },
  };
};
