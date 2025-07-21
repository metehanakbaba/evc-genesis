/**
 * 💳 PLN Wallet Types
 * API Schema Ready types for wallet management
 */

export interface PLNAmount {
  readonly amount: number;
  readonly currency: 'PLN';
  readonly formatted: string;
}

export type TransactionType =
  | 'ADD_PLN_FUNDS'
  | 'CHARGING_PAYMENT'
  | 'REFUND'
  | 'TRANSFER';

export type TransactionStatus =
  | 'PENDING'
  | 'COMPLETED'
  | 'FAILED'
  | 'CANCELLED';

export interface PLNTransaction {
  readonly id: string;
  readonly type: TransactionType;
  readonly status: TransactionStatus;
  readonly amount: PLNAmount;
  readonly description: string;
  readonly stripePaymentIntentId?: string;
  readonly metadata?: Record<string, unknown>;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface WalletBalance {
  readonly balance: PLNAmount;
  readonly pendingAmount: PLNAmount;
  readonly lastUpdated: string;
}

export interface PaymentIntent {
  readonly amount: number;
  readonly returnUrl?: string;
  readonly cancelUrl?: string;
  readonly metadata?: Record<string, string>;
}

export interface ChargingPayment {
  readonly chargingSessionId: string;
  readonly chargeStationId: string;
  readonly amount: number;
  readonly description?: string;
  readonly powerConsumed?: number;
  readonly chargingDuration?: number;
  readonly metadata?: Record<string, unknown>;
}

export interface TransactionQueryParams {
  readonly page?: number;
  readonly limit?: number;
  readonly search?: string;
  readonly type?: TransactionType;
  readonly status?: TransactionStatus;
  readonly sort_by?: 'created_at' | 'amount' | 'description';
  readonly sort_order?: 'asc' | 'desc';
  readonly date_from?: string;
  readonly date_to?: string;
}

export interface WalletStatistics {
  readonly totalBalance: number;
  readonly totalTransactions: number;
  readonly totalSpent: number;
  readonly totalRefunds: number;
  readonly thisMonthSpending: number;
  readonly averageTransactionAmount: number;
}
