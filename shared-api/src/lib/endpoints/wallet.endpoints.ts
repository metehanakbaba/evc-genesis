/**
 * 💰 PLN Wallet Endpoints
 * 
 * Type-safe RTK Query endpoints for PLN wallet and transaction operations.
 * Single responsibility: Wallet and payment operations only.
 * 
 * @module WalletEndpoints
 * @version 2.0.0
 * @author EV Charging Team
 */

import type { EndpointBuilder } from '@reduxjs/toolkit/query/react';
import type { 
  ApiSuccessResponse,
  ApiErrorResponse,
  PaginatedResponse 
} from '../types/common.types.js';
import type { 
  PLNTransaction,
  FullPLNTransaction,
  WalletBalance,
  CreatePaymentIntentRequest,
  ProcessChargingPaymentRequest,
  TransactionQuery,
  WalletStats 
} from '../types/wallet.types.js';
import type { 
  AdminAdjustBalanceRequest,
  AdminProcessRefundRequest 
} from '../types/admin.types.js';
import { transformResponse, createApiTags } from '../baseApi.js';

export const walletEndpoints = (
  builder: EndpointBuilder<any, any, any>
) => ({
  // 💰 Get Wallet Balance
  getWalletBalance: builder.query<WalletBalance, void>({
    query: () => '/wallet/balance',
    transformResponse: (response: ApiSuccessResponse<WalletBalance>) =>
      transformResponse(response),
    transformErrorResponse: (response: ApiErrorResponse) => response,
    providesTags: [createApiTags.wallet('balance')],
  }),

  // 📋 Get Transaction History
  getTransactions: builder.query<PaginatedResponse<PLNTransaction>, TransactionQuery>({
    query: (params = {}) => ({
      url: '/wallet/transactions',
      params,
    }),
    transformResponse: (response: ApiSuccessResponse<PaginatedResponse<PLNTransaction>>) =>
      transformResponse(response),
    transformErrorResponse: (response: ApiErrorResponse) => response,
    providesTags: (result) => [
      createApiTags.list('Transaction'),
      ...(result?.items.map((tx) => createApiTags.transaction(tx.id)) || []),
    ],
  }),

  // 💳 Get Transaction by ID
  getTransactionById: builder.query<PLNTransaction, string>({
    query: (transactionId) => `/wallet/transactions/${transactionId}`,
    transformResponse: (response: ApiSuccessResponse<{ transaction: PLNTransaction }>) =>
      transformResponse(response).transaction,
    transformErrorResponse: (response: ApiErrorResponse) => response,
    providesTags: (result, error, transactionId) => [createApiTags.transaction(transactionId)],
  }),

  // 💳 Create Payment Intent
  createPaymentIntent: builder.mutation<{ clientSecret: string; paymentIntentId: string }, CreatePaymentIntentRequest>({
    query: (data) => ({
      url: '/wallet/payment-intent',
      method: 'POST',
      body: data,
    }),
    transformResponse: (response: ApiSuccessResponse<{ clientSecret: string; paymentIntentId: string }>) =>
      transformResponse(response),
    transformErrorResponse: (response: ApiErrorResponse) => response,
    invalidatesTags: [createApiTags.wallet('balance'), createApiTags.list('Transaction')],
  }),

  // ⚡ Process Charging Payment
  processChargingPayment: builder.mutation<PLNTransaction, ProcessChargingPaymentRequest>({
    query: (data) => ({
      url: '/wallet/charge-payment',
      method: 'POST',
      body: data,
    }),
    transformResponse: (response: ApiSuccessResponse<{ transaction: PLNTransaction }>) =>
      transformResponse(response).transaction,
    transformErrorResponse: (response: ApiErrorResponse) => response,
    invalidatesTags: [
      createApiTags.wallet('balance'),
      createApiTags.list('Transaction'),
      createApiTags.list('Session'),
    ],
  }),

  // 📊 Admin: Get All Transactions
  getAdminTransactions: builder.query<PaginatedResponse<FullPLNTransaction>, TransactionQuery>({
    query: (params = {}) => ({
      url: '/admin/transactions',
      params,
    }),
    transformResponse: (response: ApiSuccessResponse<PaginatedResponse<FullPLNTransaction>>) =>
      transformResponse(response),
    transformErrorResponse: (response: ApiErrorResponse) => response,
    providesTags: (result) => [
      createApiTags.list('Transaction'),
      ...(result?.items.map((tx) => createApiTags.transaction(tx.id)) || []),
    ],
  }),

  // 💰 Admin: Adjust User Balance
  adjustUserBalance: builder.mutation<PLNTransaction, { userId: string; data: AdminAdjustBalanceRequest }>({
    query: ({ userId, data }) => ({
      url: `/admin/wallets/${userId}/adjust-balance`,
      method: 'POST',
      body: data,
    }),
    transformResponse: (response: ApiSuccessResponse<{ transaction: PLNTransaction }>) =>
      transformResponse(response).transaction,
    transformErrorResponse: (response: ApiErrorResponse) => response,
    invalidatesTags: [
      createApiTags.wallet('balance'),
      createApiTags.list('Transaction'),
      createApiTags.user(),
    ],
  }),

  // 🔄 Admin: Process Refund
  processRefund: builder.mutation<PLNTransaction, { transactionId: string; data: AdminProcessRefundRequest }>({
    query: ({ transactionId, data }) => ({
      url: `/admin/transactions/${transactionId}/refund`,
      method: 'POST',
      body: data,
    }),
    transformResponse: (response: ApiSuccessResponse<{ transaction: PLNTransaction }>) =>
      transformResponse(response).transaction,
    transformErrorResponse: (response: ApiErrorResponse) => response,
    invalidatesTags: [
      createApiTags.wallet('balance'),
      createApiTags.list('Transaction'),
      createApiTags.transaction(),
    ],
  }),

  // 📊 Admin: Get Wallet Statistics
  getWalletStats: builder.query<WalletStats, void>({
    query: () => '/admin/wallets/stats',
    transformResponse: (response: ApiSuccessResponse<WalletStats>) =>
      transformResponse(response),
    transformErrorResponse: (response: ApiErrorResponse) => response,
    providesTags: [createApiTags.list('Wallet')],
  }),

  // 💰 Admin: Get User Wallet Balance
  getAdminUserBalance: builder.query<WalletBalance, string>({
    query: (userId) => `/admin/wallets/${userId}/balance`,
    transformResponse: (response: ApiSuccessResponse<WalletBalance>) =>
      transformResponse(response),
    transformErrorResponse: (response: ApiErrorResponse) => response,
    providesTags: (result, error, userId) => [createApiTags.wallet(userId)],
  }),
}); 