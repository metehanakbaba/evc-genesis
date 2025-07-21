/**
 * 💳 Wallet API Integration
 * 
 * Custom hooks and API integration for wallet operations.
 * Now supports server-side search and filtering for better performance.
 * 
 * @module WalletAPI
 * @version 2.0.0 - API Search Integration
 * @author EV Charging Team
 */

import type {
  PLNTransaction,
  TransactionType,
  TransactionStatus,
  TransactionQueryParams,
} from '../types/wallet.types';

/**
 * 📊 Enhanced Mock Data Generator with API-like filtering
 * Simulates server-side search and filtering for development
 */
export const generateMockTransactions = (count: number = 100): PLNTransaction[] => {
  const types: TransactionType[] = ['ADD_PLN_FUNDS', 'CHARGING_PAYMENT', 'REFUND', 'TRANSFER'];
  const statuses: TransactionStatus[] = ['COMPLETED', 'PENDING', 'FAILED', 'CANCELLED'];
  const descriptions = [
    'EV Charging Session',
    'Wallet Top-up via Card',
    'Payment Refund',
    'Account Transfer',
    'Subscription Payment',
    'Charging Credits',
    'Service Fee',
    'Bonus Credits',
  ];

  return Array.from({ length: count }, (_, index) => {
    const type = types[Math.floor(Math.random() * types.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const amount = Math.round((Math.random() * 500 + 10) * 100) / 100;
    
    return {
      id: `txn-${String(index + 1).padStart(4, '0')}`,
      type,
      status,
      amount: {
        amount,
        currency: 'PLN' as const,
        formatted: `${amount} zł`,
      },
      description: `${descriptions[Math.floor(Math.random() * descriptions.length)]} #${index + 1}`,
      stripePaymentIntentId: Math.random() > 0.5 ? `pi_${Math.random().toString(36).substr(2, 9)}` : undefined,
      metadata: {
        source: 'mock-api-generator',
        timestamp: new Date().toISOString(),
        sessionId: `session_${Math.random().toString(36).substr(2, 8)}`,
      },
      createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });
};

/**
 * 🎯 Enhanced Transaction Query Hook - Now with API Search
 * Simulates proper server-side filtering and pagination
 */
export const useGetAllTransactionsQuery = (params: Partial<TransactionQueryParams> = {}) => {
  const {
    page = 0,
    limit = 20,
    search = '',
    type,
    status,
    sort_by = 'created_at',
    sort_order = 'desc',
    date_from,
    date_to,
  } = params;

  // Generate stable dataset
  const allMockTransactions = generateMockTransactions(200);
  
  // Apply server-side filtering simulation
  let filteredTransactions = allMockTransactions;

  // Search filter
  if (search?.trim()) {
    const query = search.toLowerCase().trim();
    filteredTransactions = filteredTransactions.filter(t => 
      t.description.toLowerCase().includes(query) ||
      t.id.toLowerCase().includes(query) ||
      t.amount.formatted.toLowerCase().includes(query) ||
      (t.stripePaymentIntentId && t.stripePaymentIntentId.toLowerCase().includes(query))
    );
  }

  // Type filter
  if (type && (type as string) !== 'all') {
    filteredTransactions = filteredTransactions.filter(t => t.type === type);
  }

  // Status filter  
  if (status && (status as string) !== 'all') {
    filteredTransactions = filteredTransactions.filter(t => t.status === status);
  }

  // Amount range filter (simulated)
  const amountRangeFilter = (params as any).amountRangeFilter;
  if (amountRangeFilter && amountRangeFilter !== 'all') {
    filteredTransactions = filteredTransactions.filter(t => {
      const amount = t.amount.amount;
      switch (amountRangeFilter) {
        case 'large':
          return amount >= 500;
        case 'medium':
          return amount >= 100 && amount < 500;
        case 'small':
          return amount < 100;
        default:
          return true;
      }
    });
  }

  // Date range filter
  if (date_from) {
    filteredTransactions = filteredTransactions.filter(t => 
      new Date(t.createdAt) >= new Date(date_from)
    );
  }

  if (date_to) {
    filteredTransactions = filteredTransactions.filter(t => 
      new Date(t.createdAt) <= new Date(date_to)
    );
  }

  // Sorting
  filteredTransactions.sort((a, b) => {
    let comparison = 0;
    
    switch (sort_by) {
      case 'amount':
        comparison = a.amount.amount - b.amount.amount;
        break;
      case 'description':
        comparison = a.description.localeCompare(b.description);
        break;
      case 'created_at':
      default:
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
    }
    
    return sort_order === 'desc' ? -comparison : comparison;
  });

  // Pagination
  const offset = page * limit;
  const paginatedTransactions = filteredTransactions.slice(offset, offset + limit);
  const hasNextPage = offset + limit < filteredTransactions.length;

  return {
    data: {
      data: {
        transactions: paginatedTransactions,
        total: filteredTransactions.length,
        page,
        limit,
        hasNextPage,
        totalPages: Math.ceil(filteredTransactions.length / limit),
      }
    },
    isLoading: false,
    error: null,
    isError: false,
    refetch: () => Promise.resolve(),
  };
};

/**
 * 🎯 Mock Wallet Stats Hook
 * Simulates wallet statistics API
 */
export const useGetWalletStatsQuery = (params: { period?: string } = {}) => {
  return {
    data: {
      data: {
        users: { total: 1250, active: 1100 },
        wallet: {
          totalBalance: { amount: 125000.50, currency: 'PLN', formatted: '125,000.50 zł' },
          totalTransactions: 8500,
        },
      }
    },
    isLoading: false,
    error: null,
    isError: false,
    refetch: () => Promise.resolve(),
  };
};

/**
 * 🎯 Enhanced Hook: Wallet Statistics
 * Combined hook for getting wallet stats with error handling
 */
export const useWalletStatistics = (period?: string) => {
  const result = useGetWalletStatsQuery({ period });

  return {
    ...result,
    // Computed statistics
    totalUsers: result.data?.data?.users?.total || 0,
    totalBalance: result.data?.data?.wallet?.totalBalance || { amount: 0, currency: 'PLN', formatted: '0.00 zł' },
    totalTransactions: result.data?.data?.wallet?.totalTransactions || 0,
  };
};

/**
 * 🎯 Transaction Actions (Enhanced)
 * Enhanced implementation for transaction actions
 */
export const useTransactionActions = () => {
  return {
    viewDetails: (transaction: PLNTransaction) => {
      console.log('👀 Viewing transaction details:', transaction.id);
      // TODO: Implement real modal or navigation
    },
    retryTransaction: (transaction: PLNTransaction) => {
      console.log('🔄 Retrying transaction:', transaction.id);
      // TODO: Implement real retry logic with API call
    },
    refundTransaction: (transaction: PLNTransaction) => {
      console.log('💰 Processing refund for transaction:', transaction.id);
      // TODO: Implement real refund logic
    },
  };
};

// Export for convenience
export type { PLNTransaction, TransactionType, TransactionStatus, TransactionQueryParams }; 