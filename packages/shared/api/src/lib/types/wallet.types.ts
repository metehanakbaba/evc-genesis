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

import type { PaginationParams, DateRangeParams, AmountRangeParams } from './common.types.js';

export type WalletStatus = 'ACTIVE';

// 💱 Transaction Type Enumeration
export type TransactionType = 
  | 'STRIPE_PLN_PAYMENT' 
  | 'ADD_PLN_FUNDS' 
  | 'PLN_CHARGING_PAYMENT' 
  | 'PLN_REFUND';

// 📊 Transaction Status Enumeration
export type TransactionStatus = 
  | 'PENDING' 
  | 'COMPLETED' 
  | 'FAILED' 
  | 'CANCELLED';

export type Period = "7d" | "30d" | "90d" | "1y" ;
export type AlertSeverity = "LOW" | "MEDIUM" | "HIGH";
export type AlertType = "HIGH_BALANCE";

export type Currency = 
  | 'ALL'
  | 'BGN'
  | 'CHF'
  | 'CZK'
  | 'DKK'
  | 'EUR'
  | 'GBP'
  | 'HRK'
  | 'HUF'
  | 'ISK'
  | 'NOK'
  | 'PLN'
  | 'RON'
  | 'RSD'
  | 'SEK';

// 💰 PLN Amount Structure
export interface PLNAmount {
  amount: number;
  currency: 'PLN';
  formatted: string;
}

// 💳 PLN Transaction Entity
export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  status: TransactionStatus;
  amount: {
    value: number;
    currency: Currency
  };
  createdAt: string;
}

export interface TransactionSummary {
  totalTransactions: number;
  totalAmount: number;
  averageAmount: number;
}

// 👛 Wallet Entity
export interface Wallet {
  id: string; 
  userId: string;
  userEmail: string;
  balance: {
    value: number;
    currency: Currency
  };
  status: WalletStatus;
  createdAt: string;
}
export interface WalletResult {
  wallets: Wallet[];
  pagination: {
    total: number;
    limit: number;
    offset: 0;
    hasMore: boolean;
  }
}

export interface WalletStatistics {
  totalDeposited: number;
  totalSpent: number;
  transactionCount: number;
  averageTransactionAmount: number;
}

// 💰 Wallet Details Response
export interface WalletDetails extends Omit<Wallet, 'balance'> {
  balance: number;
  currency: Currency;
  isActive: boolean;
  statistics: WalletStatistics;
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
export interface TransactionsQuery extends PaginationParams, DateRangeParams {
  userId?: string;
  type?: TransactionType;
  status?: TransactionStatus;
  search?: string;
}

// 📊 Transaction List Response
export interface Transactions {
  transactions: Transaction[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
  summary: TransactionSummary
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
export interface FullPransaction extends Transaction {
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
export interface TransactionQuery extends PaginationParams, DateRangeParams, AmountRangeParams {
  type?: TransactionType;
  status?: TransactionStatus;
  userId?: string;
  search?: string;
}

// 📊 Wallet Statistics
export interface WalletStats {
  totalTransactions: number;
  totalVolume: PLNAmount;
  pendingTransactions: number;
  completedTransactions: number;
  failedTransactions: number;
} 

export interface AdjustBalanceData {
  amount: number;
  reason: string;
  reference: string;
}

export interface AdjustBalance {
  transactionId: string;
  userId: string;
  previousBalance: number;
  adjustmentAmount: number;
  newBalance: number;
  reason: string;
  performedBy: string;
  performedAt: string;
}

export interface TransactionRefundData {
  amount: number;
  reason: string;
  notifyUser: boolean;
}

export interface TransactionRefund {
  refundId: string;
  originalTransactionId: string;
  refundAmount: number;
  reason: string;
  status: string;
  processedBy: string;
  processedAt: string;
}

interface Averages {
  depositAmount: number;
  chargeAmount: number;
  userBalance: number;
}

interface Trends {
  balanceGrowth: string;
  transactionGrowth: string;
  userGrowth: string;
}

interface Alert {
  type: AlertType;
  message: string;
  severity: AlertSeverity;
}

export interface WalletAnalyticsQueryParams {
  period: Period;
  includeCharts: boolean;
}

interface TransactionVolume {
  total: number;
  deposits: number;
  charges: number;
  refunds: number;
}

interface TransactionCounts extends TransactionVolume {}

export interface SystemHealth {
  transactionSuccessRate: number;
  averageWalletBalance: number;
}

export interface WalletAnalytics { 
  period: Period;
  totalSystemBalance: number;
  totalUsers: number;
  activeUsers: number;
  systemHealth: SystemHealth
}