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
  PLNTransaction,
  CreateTopUpRequest,
  ProcessPaymentRequest,
  TransactionQuery,
  TransactionListResponse,
  WalletBalance,
  PaymentMethod,
  RefundRequest
} from '../types/wallet.types';
import type {
  AdminTransactionQuery,
  AdminWalletQuery,
  AdminProcessRefundRequest 
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

  // 📈 Top Up Wallet
  topUpWallet: builder.mutation<PLNTransaction, CreateTopUpRequest>({
    query: (topUpData) => ({
      url: '/wallets/top-up',
      method: 'POST',
      body: topUpData,
    }),
    transformResponse,
    invalidatesTags: (result, error, { walletId }) => [
      { type: 'Wallet', id: walletId },
      { type: 'WalletBalance', id: walletId },
      'Transaction'
    ],
  }),

  // 💸 Process Payment
  processPayment: builder.mutation<PLNTransaction, ProcessPaymentRequest>({
    query: (paymentData) => ({
      url: '/payments/process',
      method: 'POST',
      body: paymentData,
    }),
    transformResponse,
    invalidatesTags: (result, error, { walletId }) => [
      { type: 'Wallet', id: walletId },
      { type: 'WalletBalance', id: walletId },
      'Transaction'
    ],
  }),

  // 📋 Get User Transactions
  getUserTransactions: builder.query<TransactionListResponse, { userId: string } & TransactionQuery>({
    query: ({ userId, ...params }) => ({
      url: `/users/${userId}/transactions`,
      params,
    }),
    transformResponse,
    providesTags: (result, error, { userId }) => [
      { type: 'UserTransactions', id: userId },
      'Transaction'
    ],
  }),

  // 🎯 Get Transaction by ID
  getTransaction: builder.query<PLNTransaction, string>({
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
      url: '/admin/wallets',
      params,
    }),
    transformResponse,
    providesTags: ['Wallet'],
  }),

  // 📋 Get All Transactions (Admin)
  getAllTransactions: builder.query<TransactionListResponse, AdminTransactionQuery>({
    query: (params) => ({
      url: '/admin/transactions',
      params,
    }),
    transformResponse,
    providesTags: ['Transaction'],
  }),

  // ✅ Process Refund (Admin)
  processRefund: builder.mutation<void, AdminProcessRefundRequest>({
    query: (refundData) => ({
      url: '/admin/transactions/refund',
      method: 'POST',
      body: refundData,
    }),
    invalidatesTags: ['Transaction'],
  }),

  // 📈 Get Wallet Statistics (Admin)
  getWalletStats: builder.query<any, { period?: string }>({
    query: (params) => ({
      url: '/admin/wallets/stats',
      params,
    }),
    transformResponse,
    providesTags: ['WalletStats'],
  }),

  // 🔍 Search Transactions (Admin)
  searchTransactions: builder.query<TransactionListResponse, { query: string; filters?: any }>({
    query: ({ query, filters }) => ({
      url: '/admin/transactions/search',
      params: { q: query, ...filters },
    }),
    transformResponse,
    providesTags: ['Transaction'],
  }),
}); 