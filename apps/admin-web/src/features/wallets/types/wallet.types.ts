/**
 * 💳 PLN Wallet Types
 * API Schema Ready types for wallet management
 */
import { Transaction, WalletBalance } from "../../../../../../packages/shared/api/src/lib/types/wallet.types";

export interface PLNTransaction extends Transaction {
  readonly currency: 'PLN',
  readonly formatted: string;
  readonly stripePaymentIntentId?: string;
  readonly metadata?: Record<string, unknown>;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface PLNWalletBalance extends WalletBalance {}

export interface ClientPaymentIntent {
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

export interface WalletsStatsData {
  /** Total wallet balance across system */
  readonly totalBalance: {
    readonly formatted: string;
    readonly amount: number;
  };

  /** Total wallets created */
  readonly totalWallets: {
    readonly formatted: string;
    readonly count: number;
  };

  /** Active wallets */
  readonly activeWallets: {
    readonly formatted: string;
    readonly percentage: string;
    readonly count: number;
  };

  /** Wallets created this month */
  readonly newWalletsThisMonth: {
    readonly formatted: string;
    readonly count: number;
  };
}

export interface TransactionStatsData {
  totalBalance: { formatted: string; amount: number };
  dailyVolume: { formatted: string; count: number };
  revenue: { formatted: string; percentage: string };
  refundLiabilities: {
    amount: {
      formatted: string;
      value: number;
    },
    pending: number 
  };
}