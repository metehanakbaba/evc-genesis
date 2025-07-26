/**
 * 💰 Wallet & Transaction Endpoints
 * 
 * RTK Query endpoints for wallet operations and payment management.
 * Includes balance management, transactions, and payment processing.
 * 
 * @module WalletEndpoints
 * @version 2.0.0
 * @author EV Charging Team
 */

import type { EndpointBuilder } from '@reduxjs/toolkit/query';
import type {
  Wallet,
  WalletBalance,
  PaymentMethod,
  RefundRequest,
  Transactions,
  TransactionsQuery,
  WalletAnalytics,
  WalletAnalyticsQueryParams,
  TransactionRefund,
  TransactionRefundData,
  WalletDetails,
  AdjustBalance,
  AdjustBalanceData
} from '../types/wallet.types';
import type {
  AdminWalletQuery,
} from '../types/admin.types';
import { transformResponse } from '../baseApi';

export const walletEndpoints = (
  builder: EndpointBuilder<any, any, any>
) => ({
  // 💳 Get User Wallet
  getUserWallet: builder.query<Wallet, string>({
    query: (userId) => `/users/${userId}/wallet`,
    transformResponse,
    providesTags: (result, error, userId) => [{ type: 'Wallet', id: userId }],
  }),

  // 💰 Get Wallet Balance
  getWalletBalance: builder.query<WalletBalance, string>({
    query: (walletId) => `/wallets/${walletId}/balance`,
    transformResponse,
    providesTags: (result, error, walletId) => [{ type: 'WalletBalance', id: walletId }],
  }),

  // TODO implement once contract made 
  // 📈 Top Up Wallet
  topUpWallet: builder.mutation
  // <Transaction, CreateTopUpRequest>
  ({
    query: (topUpData) => ({
      url: '/wallets/top-up',
      method: 'POST',
      body: topUpData,
    }),
    transformResponse,
    // invalidatesTags: (result, error, { walletId }) => [
    //   { type: 'Wallet', id: walletId },
    //   { type: 'WalletBalance', id: walletId },
    //   'Transaction'
    // ],
  }),

  // // 💸 Process Payment
  processPayment: builder.mutation
  // <PLNTransaction, ProcessPaymentRequest>
  ({
    query: (paymentData) => ({
      url: '/payments/process',
      method: 'POST',
      body: paymentData,
    }),
    transformResponse,
    // invalidatesTags: (result, error, { walletId }) => [
    //   { type: 'Wallet', id: walletId },
    //   { type: 'WalletBalance', id: walletId },
    //   'Transaction'
    // ],
  }),

  // 📋 Get User Transactions
  getUserTransactions: builder.query
  // <TransactionListResponse, { userId: string } & TransactionQuery>
  ({
    query: ({ userId, ...params }) => ({
      url: `/users/${userId}/transactions`,
      params,
    }),
    transformResponse,
    // providesTags: (result, error, { userId }) => [
    //   { type: 'UserTransactions', id: userId },
    //   'Transaction'
    // ],
  }),

  // 🎯 Get Transaction by ID
  getTransaction: builder.query
  // <PLNTransaction, string>
  ({
    query: (id) => `/transactions/${id}`,
    transformResponse,
    providesTags: (result, error, id) => [{ type: 'Transaction', id }],
  }),

  // 💳 Get Payment Methods
  getPaymentMethods: builder.query<PaymentMethod[], string>({
    query: (userId) => `/users/${userId}/payment-methods`,
    transformResponse,
    providesTags: (result, error, userId) => [{ type: 'PaymentMethods', id: userId }],
  }),

  // ➕ Add Payment Method
  addPaymentMethod: builder.mutation<PaymentMethod, { userId: string; method: Partial<PaymentMethod> }>({
    query: ({ userId, method }) => ({
      url: `/users/${userId}/payment-methods`,
      method: 'POST',
      body: method,
    }),
    transformResponse,
    invalidatesTags: (result, error, { userId }) => [{ type: 'PaymentMethods', id: userId }],
  }),

  // 🗑️ Remove Payment Method
  removePaymentMethod: builder.mutation<void, { userId: string; methodId: string }>({
    query: ({ userId, methodId }) => ({
      url: `/users/${userId}/payment-methods/${methodId}`,
      method: 'DELETE',
    }),
    invalidatesTags: (result, error, { userId }) => [{ type: 'PaymentMethods', id: userId }],
  }),

  // 🔄 Request Refund
  requestRefund: builder.mutation<void, RefundRequest>({
    query: (refundData) => ({
      url: '/transactions/refund',
      method: 'POST',
      body: refundData,
    }),
    invalidatesTags: ['Transaction'],
  }),

  // === ADMIN ENDPOINTS ===

  // 📊 Get All Wallets (Admin)
  getAllWallets: builder.query<Wallet[], AdminWalletQuery>({
    query: (params) => ({
      url: '/api/admin/wallets',
      params,
    }),
    transformResponse,
    providesTags: ['Wallet'],
  }),

  // Get User Wallet details (Admin) 
  getUserWalletDetails: builder.query<WalletDetails, string>({
    query: (userId) => ({
      url: `/api/admin/wallets/${userId}/balance`,
    }),
    transformResponse,
    providesTags: ['Wallet']
  }),

  // 📋 Get All Transactions (Admin)
  getAllTransactions: builder.query<Transactions, TransactionsQuery>({
    query: (params) => ({
      url: 'api/admin/transactions',
      params,
    }),
    transformResponse,
    providesTags: ['Transaction'],
  }),

  // Adjust balance (Admin) 
  adjustBalance: builder.mutation<AdjustBalance, {userId: string; data: AdjustBalanceData}>({
    query: ({userId, data}) => ({
      url: `/api/admin/wallets/${userId}/adjust-balance`,
      method: 'POST',
      body: data,
    }),
    transformResponse,
    invalidatesTags: ['Transaction']
  }),

  // ✅ Process Refund (Admin)
  processRefund: builder.mutation<TransactionRefund, { transactionId: string; data: TransactionRefundData }>({
    query: ({ transactionId, data}) => ({
      url: `/api/admin/transactions/${transactionId}/refund`,
      method: 'POST',
      body: data,
    }),
    transformResponse,
    invalidatesTags: ['Transaction'],
  }),

  // 📈 Get Wallet Statistics (Admin)
  getWalletStats: builder.query<any, { period?: string }>({
    query: (params) => ({
      url: '/api/admin/wallets/stats',
      params,
    }),
    transformResponse,
    providesTags: ['WalletStats'],
  }),

  // Get Wallet Analytics (Admin) 
  getWalletAnalytics: builder.query<WalletAnalytics, WalletAnalyticsQueryParams>({
    query: (params) => ({
      url: '/api/admin/wallet-analytics',
      params,
    }),
    transformResponse,
    providesTags: ['WalletAnalytics'],
  }),

  // 🔍 Search Transactions (Admin)
  searchTransactions: builder.query
  // <TransactionListResponse, 
  // { query: string; filters?: any }>
  ({
    query: ({ query, filters }) => ({
      url: '/api/admin/transactions/search',
      params: { q: query, ...filters },
    }),
    transformResponse,
    providesTags: ['Transaction'],
  }),
}); 