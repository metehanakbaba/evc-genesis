/**
 * 💳 Wallet Types
 * 
 * Type definitions for wallet management functionality
 */

export interface WalletData {
  balance: number;
  currency: string;
  monthlySpent: number;
  pendingAmount: number;
  autoRechargeThreshold: number;
  autoRechargeAmount: number;
  totalSavings: number;
}

export interface Transaction {
  id: number;
  type: 'charge_payment' | 'auto_recharge' | 'manual_topup' | 'refund';
  title: string;
  subtitle: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  icon: string;
  iconFamily: 'Ionicons' | 'MaterialIcons' | 'FontAwesome5';
}

export interface PaymentMethod {
  id: number;
  type: 'credit_card' | 'bank_account' | 'digital_wallet';
  title: string;
  subtitle: string;
  isDefault: boolean;
  icon: string;
  brand: 'visa' | 'mastercard' | 'bank' | 'apple' | 'google';
}

export interface WalletManagementModalProps {
  visible: boolean;
  onClose: () => void;
}

export interface WalletSettings {
  autoRechargeEnabled: boolean;
  notifications: boolean;
  biometric: boolean;
  currency: string;
}

export type WalletTab = 'overview' | 'transactions' | 'methods' | 'settings'; 