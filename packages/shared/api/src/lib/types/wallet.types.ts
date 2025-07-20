/**
 * 💰 PLN Wallet Domain Types
 * 
 * Type definitions for PLN wallet entities, transactions, and payment operations.
 * Based on wallet.ts schema definitions.
 * 
 * @module WalletTypes
 * @version 2.0.0
 * @author EV Charging Team
 */

import type { PaginationParams, DateRangeParams } from './common.types.js';

// 💱 Transaction Type Enumeration
export type TransactionType = 
  | 'STRIPE_PLN_PAYMENT' 
  | 'ADD_PLN_FUNDS' 
  | 'PLN_CHARGING_PAYMENT' 
  | 'PLN_REFUND';

// 📊 Transaction Status Enumeration
export type TransactionStatus = 
  | 'PENDING' 
  | 'PROCESSING' 
  | 'COMPLETED' 
  | 'FAILED' 
  | 'CANCELLED';

// 💰 PLN Amount Structure
export interface PLNAmount {
  amount: number;
  currency: 'PLN';
  formatted: string;
}

// 💳 PLN Transaction Entity
export interface PLNTransaction {
  id: string;
  type: TransactionType;
  status: TransactionStatus;
  amount: PLNAmount;
  description: string;
  stripePaymentIntentId?: string;
  chargingSessionId?: string;
  chargeStationId?: string;
  metadata?: Record<string, unknown>;
  errorMessage?: string;
  processedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// 👛 Wallet Entity
export interface Wallet {
  id: string;
  userId: string;
  balance: PLNAmount;
  totalAdded: PLNAmount;
  totalSpent: PLNAmount;
  status: 'ACTIVE' | 'SUSPENDED' | 'CLOSED';
  createdAt: string;
  updatedAt: string;
}

// 💰 Wallet Balance Response
export interface WalletBalance {
  balance: PLNAmount;
  pendingAmount: PLNAmount;
  totalAdded: PLNAmount;
  totalSpent: PLNAmount;
  lastUpdated: string;
}

// 🎫 Create Top-up Request
export interface CreateTopUpRequest {
  walletId: string;
  amount: number;
  paymentMethodId?: string;
  returnUrl?: string;
  cancelUrl?: string;
  metadata?: Record<string, string>;
}

// ⚡ Process Payment Request
export interface ProcessPaymentRequest {
  walletId: string;
  amount: number;
  chargingSessionId: string;
  chargeStationId: string;
  description?: string;
  metadata?: Record<string, unknown>;
}

// 📋 Transaction Query Parameters
export interface TransactionQuery extends PaginationParams, DateRangeParams {
  type?: TransactionType;
  status?: TransactionStatus;
  userId?: string;
}

// 📊 Transaction List Response
export interface TransactionListResponse {
  transactions: PLNTransaction[];
  total: number;
  page: number;
  limit: number;
}

// 💳 Payment Method
export interface PaymentMethod {
  id: string;
  type: 'CARD' | 'BANK_ACCOUNT' | 'DIGITAL_WALLET';
  provider: 'STRIPE' | 'PAYPAL' | 'BANK';
  isDefault: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

// 🔄 Refund Request
export interface RefundRequest {
  transactionId: string;
  amount?: number; // Optional - refund partial amount
  reason: string;
  metadata?: Record<string, unknown>;
}

// 💳 Full Transaction (Admin View - includes sensitive fields)
export interface FullPLNTransaction extends PLNTransaction {
  userId: string;
  walletId: string;
}

// 💰 Wallet Balance Entity
export interface WalletBalance {
  current: PLNAmount;
  pending: PLNAmount;
  available: PLNAmount;
}

// 💳 Payment Intent Creation Request
export interface CreatePaymentIntentRequest {
  amount: number;
  returnUrl?: string;
  cancelUrl?: string;
  metadata?: Record<string, string>;
}

// ⚡ Charging Payment Request
export interface ProcessChargingPaymentRequest {
  chargingSessionId: string;
  chargeStationId: string;
  amount: number;
  description?: string;
  powerConsumed?: number;
  chargingDuration?: number;
  metadata?: Record<string, unknown>;
}

// 🔍 Transaction Query Parameters
export interface TransactionQuery extends PaginationParams, DateRangeParams {
  type?: TransactionType;
  status?: TransactionStatus;
}

// 📊 Wallet Statistics
export interface WalletStats {
  totalTransactions: number;
  totalVolume: PLNAmount;
  pendingTransactions: number;
  completedTransactions: number;
  failedTransactions: number;
} 