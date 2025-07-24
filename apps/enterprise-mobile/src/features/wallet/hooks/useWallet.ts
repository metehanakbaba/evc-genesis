/**
 * 💳 useWallet Hook
 * 
 * Business logic for wallet management
 */

import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { WalletData, Transaction, PaymentMethod, WalletTab, WalletSettings } from '../types/wallet.types';
import { mockWalletData, mockTransactions, mockPaymentMethods } from '../data/mockWallet';

export function useWallet() {
  const [walletData] = useState<WalletData>(mockWalletData);
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [paymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);
  const [selectedTab, setSelectedTab] = useState<WalletTab>('overview');
  const [settings, setSettings] = useState<WalletSettings>({
    autoRechargeEnabled: true,
    notifications: true,
    biometric: false,
    currency: '₺'
  });

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
  }, []);

  const handleTopUp = useCallback(() => {
    Alert.alert(
      "Top-up Wallet 💳",
      "How much would you like to add to your wallet?",
      [
        { text: "₺50", onPress: () => console.log('Top-up ₺50') },
        { text: "₺100", onPress: () => console.log('Top-up ₺100') },
        { text: "₺200", onPress: () => console.log('Top-up ₺200') },
        { text: "Custom", onPress: () => console.log('Custom top-up') }
      ]
    );
  }, []);

  const handlePaymentMethodSelect = useCallback((method: PaymentMethod) => {
    console.log('Selected payment method:', method.title);
    Alert.alert("Payment Method", `Selected: ${method.title}`);
  }, []);

  const handleTransactionDetails = useCallback((transaction: Transaction) => {
    console.log('Transaction details:', transaction.title);
    Alert.alert("Transaction Details", `${transaction.title}\n${transaction.subtitle}\nAmount: ${transaction.amount > 0 ? '+' : ''}${walletData.currency}${Math.abs(transaction.amount)}`);
  }, [walletData.currency]);

  const updateSettings = useCallback((newSettings: Partial<WalletSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const toggleAutoRecharge = useCallback(() => {
    updateSettings({ autoRechargeEnabled: !settings.autoRechargeEnabled });
  }, [settings.autoRechargeEnabled, updateSettings]);

  return {
    // Data
    walletData,
    transactions,
    paymentMethods,
    settings,
    selectedTab,
    
    // Actions
    setSelectedTab,
    formatDate,
    handleTopUp,
    handlePaymentMethodSelect,
    handleTransactionDetails,
    updateSettings,
    toggleAutoRecharge,
  };
} 