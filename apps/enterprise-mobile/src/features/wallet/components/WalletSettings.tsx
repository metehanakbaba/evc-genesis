/**
 * ⚙️ Wallet Settings Component
 * 
 * Wallet configuration and preferences
 */

import React from 'react';
import { View, Text, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WalletSettings as WalletSettingsType, WalletData } from '../types/wallet.types';
import { SPACING } from '../../../shared/constants/spacing';

interface WalletSettingsProps {
  settings: WalletSettingsType;
  walletData: WalletData;
  onToggleAutoRecharge: () => void;
  onUpdateSettings: (newSettings: Partial<WalletSettingsType>) => void;
}

export function WalletSettings({ 
  settings, 
  walletData, 
  onToggleAutoRecharge, 
  onUpdateSettings 
}: WalletSettingsProps) {
  const settingsItems = [
    {
      id: 'auto_recharge',
      title: 'Auto-recharge',
      subtitle: `Add ${walletData.currency}${walletData.autoRechargeAmount} when balance drops below ${walletData.currency}${walletData.autoRechargeThreshold}`,
      icon: 'refresh-circle',
      value: settings.autoRechargeEnabled,
      onToggle: onToggleAutoRecharge
    },
    {
      id: 'notifications',
      title: 'Transaction Notifications',
      subtitle: 'Get notified about payments and recharges',
      icon: 'notifications',
      value: settings.notifications,
      onToggle: () => onUpdateSettings({ notifications: !settings.notifications })
    },
    {
      id: 'biometric',
      title: 'Biometric Authentication',
      subtitle: 'Use fingerprint or face ID for wallet access',
      icon: 'finger-print',
      value: settings.biometric,
      onToggle: () => onUpdateSettings({ biometric: !settings.biometric })
    }
  ];

  return (
    <ScrollView 
      className="flex-1" 
      showsVerticalScrollIndicator={false}
      style={{ padding: SPACING.lg }}
    >
      {/* Header */}
      <View style={{ marginBottom: SPACING.lg }}>
        <Text className="text-white text-xl font-bold mb-2">Wallet Settings</Text>
        <Text className="text-gray-400 text-sm">
          Configure your wallet preferences
        </Text>
      </View>

      {/* Settings List */}
      <View style={{ gap: SPACING.md }}>
        {settingsItems.map((item) => (
          <View
            key={item.id}
            style={{
              padding: SPACING.lg,
              backgroundColor: '#1F2937',
              borderRadius: 16,
              borderWidth: 1,
              borderColor: '#374151'
            }}
          >
            <View className="flex-row items-center justify-between">
              {/* Setting Info */}
              <View className="flex-row items-center flex-1">
                {/* Icon */}
                <View 
                  className="w-12 h-12 rounded-2xl items-center justify-center"
                  style={{ 
                    backgroundColor: item.value ? '#14B8A620' : '#37415120',
                    marginRight: SPACING.md
                  }}
                >
                  <Ionicons 
                    name={item.icon as any} 
                    size={20} 
                    color={item.value ? '#14B8A6' : '#6B7280'} 
                  />
                </View>
                
                {/* Setting Details */}
                <View className="flex-1">
                  <Text className="text-white text-base font-medium" style={{ marginBottom: 4 }}>
                    {item.title}
                  </Text>
                  <Text className="text-gray-400 text-sm leading-relaxed">
                    {item.subtitle}
                  </Text>
                </View>
              </View>
              
              {/* Toggle Switch */}
              <Switch
                value={item.value}
                onValueChange={item.onToggle}
                trackColor={{ 
                  false: '#374151', 
                  true: '#14B8A6' 
                }}
                thumbColor={item.value ? '#5EEAD4' : '#9CA3AF'}
                ios_backgroundColor="#374151"
                style={{ marginLeft: SPACING.sm }}
              />
            </View>
          </View>
        ))}
      </View>

      {/* Currency Settings */}
      <View style={{ marginTop: SPACING.xl }}>
        <Text className="text-gray-400 text-sm font-medium" style={{ marginBottom: SPACING.md }}>
          Currency & Limits
        </Text>
        
        <View
          style={{
            padding: SPACING.lg,
            backgroundColor: '#1F2937',
            borderRadius: 16,
            borderWidth: 1,
            borderColor: '#374151'
          }}
        >
          <View className="flex-row items-center justify-between" style={{ marginBottom: SPACING.md }}>
            <View>
              <Text className="text-white text-base font-medium">Primary Currency</Text>
              <Text className="text-gray-400 text-sm">Polish Zloty (zł)</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </View>
          
          <View className="border-t border-gray-700" style={{ paddingTop: SPACING.md, marginTop: SPACING.md }}>
            <View className="flex-row justify-between" style={{ marginBottom: SPACING.sm }}>
              <Text className="text-gray-400 text-sm">Daily limit</Text>
              <Text className="text-white text-sm font-medium">zł850.00</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-400 text-sm">Monthly limit</Text>
              <Text className="text-white text-sm font-medium">zł8,500.00</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Security Section */}
      <View style={{ marginTop: SPACING.xl }}>
        <Text className="text-gray-400 text-sm font-medium" style={{ marginBottom: SPACING.md }}>
          Security & Privacy
        </Text>
        
        <View style={{ gap: SPACING.sm }}>
          <View
            style={{
              padding: SPACING.lg,
              backgroundColor: '#1F2937',
              borderRadius: 16,
              borderWidth: 1,
              borderColor: '#374151'
            }}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons name="key" size={20} color="#F59E0B" style={{ marginRight: SPACING.md }} />
                <View>
                  <Text className="text-white text-base font-medium">Change PIN</Text>
                  <Text className="text-gray-400 text-sm">Update your wallet PIN</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </View>
          </View>
          
          <View
            style={{
              padding: SPACING.lg,
              backgroundColor: '#1F2937',
              borderRadius: 16,
              borderWidth: 1,
              borderColor: '#374151'
            }}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons name="shield-checkmark" size={20} color="#10B981" style={{ marginRight: SPACING.md }} />
                <View>
                  <Text className="text-white text-base font-medium">Security Center</Text>
                  <Text className="text-gray-400 text-sm">Manage security settings</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
} 