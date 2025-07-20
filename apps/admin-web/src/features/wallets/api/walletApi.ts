/**
 * 💳 Wallet API Integration
 * 
 * Custom hooks and API integration for wallet operations.
 * Temporary mock implementation until shared-api is fully integrated.
 * 
 * @module WalletAPI
 * @version 1.0.0
 * @author EV Charging Team
 */

import type {
  PLNTransaction,
  TransactionType,
  TransactionStatus,
  TransactionQueryParams,
} from '../types/wallet.types';

/**
 * 📊 Mock Data Generator
 * Generates realistic mock transaction data for development
 */
export const generateMockTransactions = (count: number = 10): PLNTransaction[] => {
  const types: TransactionType[] = ['ADD_PLN_FUNDS', 'CHARGING_PAYMENT', 'REFUND', 'TRANSFER'];
  const statuses: TransactionStatus[] = ['COMPLETED', 'PENDING', 'FAILED', 'CANCELLED'];

  return Array.from({ length: count }, (_, index) => ({
    id: `txn-${String(index + 1).padStart(3, '0')}`,
    type: types[Math.floor(Math.random() * types.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    amount: {
      amount: Math.round((Math.random() * 500 + 10) * 100) / 100,
      currency: 'PLN' as const,
      formatted: `${Math.round((Math.random() * 500 + 10) * 100) / 100} zł`,
    },
    description: `Mock transaction ${index + 1} - ${types[Math.floor(Math.random() * types.length)].toLowerCase().replace(/_/g, ' ')}`,
    stripePaymentIntentId: Math.random() > 0.5 ? `pi_${Math.random().toString(36).substr(2, 9)}` : undefined,
    metadata: {
      source: 'mock-generator',
      timestamp: new Date().toISOString(),
    },
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  }));
};

/**
 * 🎯 Mock Transaction Query Hook
 * Simulates API behavior for development
 */
export const useGetAllTransactionsQuery = (params: Partial<TransactionQueryParams> = {}) => {
  // Simulate API delay and response
  const mockTransactions = generateMockTransactions(20);
  
  return {
    data: {
      data: {
        transactions: mockTransactions,
        total: mockTransactions.length,
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
 * 🎯 Transaction Actions (Mock)
 * Mock implementation for transaction actions
 */
export const useTransactionActions = () => {
  return {
    viewDetails: (transaction: PLNTransaction) => {
      console.log('Viewing transaction details:', transaction.id);
      // TODO: Implement real modal or navigation
    },
    retryTransaction: (transaction: PLNTransaction) => {
      console.log('Retrying transaction:', transaction.id);
      // TODO: Implement real retry logic
    },
  };
};

// Export for convenience
export type { PLNTransaction, TransactionType, TransactionStatus }; 