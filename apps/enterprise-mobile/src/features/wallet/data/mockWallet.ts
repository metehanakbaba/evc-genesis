/**
 * 💰 Mock Wallet Data
 * 
 * Sample wallet data for development and testing
 */

import { WalletData, Transaction, PaymentMethod } from '../types/wallet.types';

export const mockWalletData: WalletData = {
  balance: 247.30,
  currency: 'zł',
  monthlySpent: 396.80,
  pendingAmount: 0,
  autoRechargeThreshold: 85,
  autoRechargeAmount: 170,
  totalSavings: 2118.50
};

export const mockTransactions: Transaction[] = [
  {
    id: 1,
    type: 'charge_payment',
    title: 'Charging Session Payment',
    subtitle: 'Warsaw Central EV Hub • Port 3',
    amount: -43.70,
    date: '2024-01-20T14:30:00Z',
    status: 'completed',
    icon: 'battery-charging-full',
    iconFamily: 'MaterialIcons'
  },
  {
    id: 2,
    type: 'auto_recharge',
    title: 'Auto-recharge',
    subtitle: 'Threshold triggered at zł81.70',
    amount: +170.00,
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
    amount: +85.00,
    date: '2024-01-19T16:45:00Z',
    status: 'completed',
    icon: 'add-circle',
    iconFamily: 'Ionicons'
  },
  {
    id: 4,
    type: 'charge_payment',
    title: 'Charging Session Payment',
    subtitle: 'Kraków Old Town • Port 1',
    amount: -71.90,
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
    amount: +21.20,
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
    title: 'PKO Bank Polski',
    subtitle: 'PL84 1020 1026 0000 4202 0501 9283',
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