/**
 * 💰 Mock Wallet Data
 * 
 * Sample wallet data for development and testing
 */

import { WalletData, Transaction, PaymentMethod } from '../types/wallet.types';

export const mockWalletData: WalletData = {
  balance: 145.80,
  currency: '₺',
  monthlySpent: 234.50,
  pendingAmount: 0,
  autoRechargeThreshold: 50,
  autoRechargeAmount: 100,
  totalSavings: 1250.30
};

export const mockTransactions: Transaction[] = [
  {
    id: 1,
    type: 'charge_payment',
    title: 'Charging Session Payment',
    subtitle: 'Maltepe EV Station • Port 3',
    amount: -25.80,
    date: '2024-01-20T14:30:00Z',
    status: 'completed',
    icon: 'battery-charging-full',
    iconFamily: 'MaterialIcons'
  },
  {
    id: 2,
    type: 'auto_recharge',
    title: 'Auto-recharge',
    subtitle: 'Threshold triggered at ₺48.20',
    amount: +100.00,
    date: '2024-01-20T09:15:00Z',
    status: 'completed',
    icon: 'refresh-circle',
    iconFamily: 'Ionicons'
  },
  {
    id: 3,
    type: 'manual_topup',
    title: 'Manual Top-up',
    subtitle: 'Credit Card ****4532',
    amount: +50.00,
    date: '2024-01-19T16:45:00Z',
    status: 'completed',
    icon: 'add-circle',
    iconFamily: 'Ionicons'
  },
  {
    id: 4,
    type: 'charge_payment',
    title: 'Charging Session Payment',
    subtitle: 'Kadıköy Plaza • Port 1',
    amount: -42.30,
    date: '2024-01-19T11:20:00Z',
    status: 'completed',
    icon: 'battery-charging-full',
    iconFamily: 'MaterialIcons'
  },
  {
    id: 5,
    type: 'refund',
    title: 'Session Refund',
    subtitle: 'Incomplete session compensation',
    amount: +12.50,
    date: '2024-01-18T08:30:00Z',
    status: 'completed',
    icon: 'arrow-undo-circle',
    iconFamily: 'Ionicons'
  }
];

export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 1,
    type: 'credit_card',
    title: 'Visa •••• 4532',
    subtitle: 'Expires 12/26',
    isDefault: true,
    icon: 'card',
    brand: 'visa'
  },
  {
    id: 2,
    type: 'bank_account',
    title: 'İş Bankası',
    subtitle: 'TR33 0006 4000 0011 2345 6789',
    isDefault: false,
    icon: 'business',
    brand: 'bank'
  },
  {
    id: 3,
    type: 'digital_wallet',
    title: 'Apple Pay',
    subtitle: 'iPhone 15 Pro',
    isDefault: false,
    icon: 'phone-portrait',
    brand: 'apple'
  }
]; 