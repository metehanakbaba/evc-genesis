/**
 * 💳 Wallet Management Modal
 * 
 * Main modal for wallet management with tab navigation
 */

import React from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { WalletManagementModalProps, WalletTab } from '../types/wallet.types';
import { useWallet } from '../hooks/useWallet';
import { WalletOverview } from './WalletOverview';
import { TransactionHistory } from './TransactionHistory';
import { PaymentMethods } from './PaymentMethods';
import { WalletSettings } from './WalletSettings';
import { SPACING } from '../../../shared/constants/spacing';

export function WalletManagementModal({ visible, onClose }: WalletManagementModalProps) {
  const {
    walletData,
    transactions,
    paymentMethods,
    settings,
    selectedTab,
    setSelectedTab,
    formatDate,
    handleTopUp,
    handlePaymentMethodSelect,
    handleTransactionDetails,
    updateSettings,
    toggleAutoRecharge,
  } = useWallet();

  const tabs: { id: WalletTab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: 'wallet' },
    { id: 'transactions', label: 'History', icon: 'list' },
    { id: 'methods', label: 'Methods', icon: 'card' },
    { id: 'settings', label: 'Settings', icon: 'settings' }
  ];

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'overview':
        return (
          <WalletOverview
            walletData={walletData}
            settings={settings}
            onTopUp={handleTopUp}
          />
        );
      case 'transactions':
        return (
          <TransactionHistory
            transactions={transactions}
            currency={walletData.currency}
            onTransactionPress={handleTransactionDetails}
            formatDate={formatDate}
          />
        );
      case 'methods':
        return (
          <PaymentMethods
            paymentMethods={paymentMethods}
            onMethodSelect={handlePaymentMethodSelect}
          />
        );
      case 'settings':
        return (
          <WalletSettings
            settings={settings}
            walletData={walletData}
            onToggleAutoRecharge={toggleAutoRecharge}
            onUpdateSettings={updateSettings}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
    >
      <View className="flex-1 bg-gray-900">
        {/* Header */}
        <SafeAreaView className="bg-gray-900" edges={['top', 'left', 'right']}>
          <View className="flex-row items-center justify-between" style={{ padding: SPACING.lg }}>
            <Pressable
              onPress={onClose}
              className="w-10 h-10 rounded-full items-center justify-center bg-gray-800"
            >
              <Ionicons name="close" size={20} color="#9CA3AF" />
            </Pressable>
            <Text className="text-white text-lg font-bold">Wallet Management</Text>
            <View className="w-10" />
          </View>
        </SafeAreaView>

        {/* Tab Navigation */}
        <View 
          className="flex-row bg-gray-800"
          style={{ 
            paddingHorizontal: SPACING.lg,
            paddingVertical: SPACING.sm,
            borderBottomWidth: 1,
            borderBottomColor: '#374151'
          }}
        >
          {tabs.map((tab) => (
            <Pressable
              key={tab.id}
              onPress={() => setSelectedTab(tab.id)}
              className="flex-1 items-center active:scale-95"
              style={{ paddingVertical: SPACING.sm }}
            >
              <View className="items-center">
                <View 
                  className="w-10 h-10 rounded-2xl items-center justify-center mb-1"
                  style={{ 
                    backgroundColor: selectedTab === tab.id ? '#14B8A620' : 'transparent'
                  }}
                >
                  <Ionicons 
                    name={tab.icon as any} 
                    size={18} 
                    color={selectedTab === tab.id ? '#14B8A6' : '#6B7280'} 
                  />
                </View>
                <Text 
                  className="text-xs font-medium"
                  style={{ 
                    color: selectedTab === tab.id ? '#14B8A6' : '#6B7280'
                  }}
                >
                  {tab.label}
                </Text>
              </View>
              
              {/* Active Tab Indicator */}
              {selectedTab === tab.id && (
                <View 
                  className="absolute bottom-0 w-12 h-1 bg-teal-500 rounded-full"
                  style={{ 
                    shadowColor: '#14B8A6',
                    shadowOpacity: 0.6,
                    shadowRadius: 4
                  }}
                />
              )}
            </Pressable>
          ))}
        </View>

        {/* Tab Content */}
        <View className="flex-1">
          {renderTabContent()}
        </View>
      </View>
    </Modal>
  );
} 