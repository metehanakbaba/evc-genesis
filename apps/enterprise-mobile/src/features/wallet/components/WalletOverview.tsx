/**
 * 💰 Wallet Overview Component
 * 
 * Main wallet balance and statistics display
 */

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { WalletData, WalletSettings } from '../types/wallet.types';
import { SPACING } from '../../../shared/constants/spacing';

interface WalletOverviewProps {
  walletData: WalletData;
  settings: WalletSettings;
  onTopUp: () => void;
}

export function WalletOverview({ walletData, settings, onTopUp }: WalletOverviewProps) {
  return (
    <View style={{ padding: SPACING.lg }}>
      {/* Main Balance Card */}
      <View
        className="overflow-hidden"
        style={{
          borderRadius: 24,
          marginBottom: SPACING.xl,
          shadowColor: '#14B8A6',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.15,
          shadowRadius: 24,
          elevation: 8
        }}
      >
        <LinearGradient
          colors={['#1F2937', '#111827', '#0F172A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />
        <LinearGradient
          colors={['#14B8A625', '#0F766E20', '#134E4A15']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1.2, y: 0.8 }}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />
        <LinearGradient
          colors={['transparent', '#14B8A610', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />

        <View style={{ padding: SPACING.xl, borderWidth: 1, borderColor: '#14B8A630', borderRadius: 24 }}>
          {/* Header */}
          <View className="flex-row items-center justify-between" style={{ marginBottom: SPACING.lg }}>
            <View>
              <Text className="text-gray-400 text-sm font-medium">Available Balance</Text>
              <Text className="text-white text-4xl font-bold tracking-tight" style={{ marginTop: SPACING.xs }}>
                {walletData.currency}{walletData.balance.toFixed(2)}
              </Text>
            </View>
            <LinearGradient
              colors={['#5EEAD430', '#14B8A625', '#0F766E15']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: '#14B8A635'
              }}
            >
              <FontAwesome5 name="wallet" size={28} color="#5EEAD4" />
            </LinearGradient>
          </View>

          {/* Stats Row */}
          <View className="flex-row justify-between" style={{ marginBottom: SPACING.lg }}>
            <View>
              <Text className="text-teal-300 text-lg font-bold">{walletData.currency}{walletData.monthlySpent}</Text>
              <Text className="text-gray-500 text-xs">This month</Text>
            </View>
            <View>
              <Text className="text-teal-300 text-lg font-bold">{walletData.currency}{walletData.totalSavings}</Text>
              <Text className="text-gray-500 text-xs">Total saved</Text>
            </View>
            <View>
              <Text className="text-teal-300 text-lg font-bold">{walletData.currency}{walletData.pendingAmount}</Text>
              <Text className="text-gray-500 text-xs">Pending</Text>
            </View>
          </View>

          {/* Auto-recharge Status */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View 
                className="w-2 h-2 rounded-full animate-pulse" 
                style={{ 
                  backgroundColor: settings.autoRechargeEnabled ? '#5EEAD4' : '#6B7280',
                  marginRight: SPACING.sm,
                  shadowColor: settings.autoRechargeEnabled ? '#14B8A6' : '#374151',
                  shadowOpacity: 0.8,
                  shadowRadius: 2
                }} 
              />
              <Text className={`text-sm font-medium ${settings.autoRechargeEnabled ? 'text-teal-300' : 'text-gray-400'}`}>
                Auto-recharge {settings.autoRechargeEnabled ? 'enabled' : 'disabled'}
              </Text>
            </View>
            <Text className="text-gray-500 text-xs">
              {settings.autoRechargeEnabled ? `Triggers at ${walletData.currency}${walletData.autoRechargeThreshold}` : 'Tap to configure'}
            </Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View className="flex-row" style={{ gap: SPACING.md }}>
        <Pressable
          onPress={onTopUp}
          className="flex-1 overflow-hidden active:scale-98"
          style={{
            borderRadius: 16,
            shadowColor: '#14B8A6',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 4
          }}
        >
          <LinearGradient
            colors={['#14B8A6', '#0F766E']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              paddingVertical: SPACING.md,
              alignItems: 'center',
              borderRadius: 16
            }}
          >
            <Text className="text-white text-sm font-bold">Top Up</Text>
          </LinearGradient>
        </Pressable>

        <Pressable
          className="flex-1 overflow-hidden active:scale-98"
          style={{
            borderRadius: 16,
            backgroundColor: '#1F2937',
            borderWidth: 1,
            borderColor: '#374151'
          }}
        >
          <View style={{ paddingVertical: SPACING.md, alignItems: 'center' }}>
            <Text className="text-gray-300 text-sm font-bold">Send Money</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
} 