/**
 * 🏠 Wallet Balance Card Component
 * 
 * Display wallet balance with background image
 */

import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { WalletBalance } from '../types';
import { SPACING } from '../../../shared/constants';

// Background image
import sunsetCarsEvCharge from '../../../../assets/dashboard/sunset-cars-ev-charge.jpg';

interface WalletBalanceCardProps {
  walletBalance: WalletBalance;
  onPress: () => void;
}

export function WalletBalanceCard({ walletBalance, onPress }: WalletBalanceCardProps) {
  return (
    <View style={{ paddingHorizontal: SPACING.lg, marginBottom: SPACING.lg }}>
      <Pressable
        onPress={onPress}
        className="overflow-hidden active:scale-98"
        style={{
          borderRadius: 20,
          shadowColor: '#14B8A6',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 6
        }}
      >
        {/* Background Image */}
        <Image
          source={sunsetCarsEvCharge}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            opacity: 0.5,
            borderRadius: 20,
          }}
          resizeMode="cover"
        />
        
        {/* Gradient Overlays */}
        <LinearGradient
          colors={['rgba(31,41,55,0.8)', 'rgba(17,24,39,0.8)', 'rgba(15,23,42,0.8)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 20 }}
        />
        <LinearGradient
          colors={['rgba(20,184,166,0.2)', 'rgba(15,118,110,0.15)', 'rgba(19,78,74,0.1)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1.2, y: 0.8 }}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 20 }}
        />
        
        <View style={{ padding: SPACING.lg, borderWidth: 1, borderColor: '#14B8A625', borderRadius: 20 }}>
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-gray-400 text-sm">Wallet Balance</Text>
              <Text className="text-white text-2xl font-bold">
                {walletBalance.currency}{walletBalance.amount.toFixed(2)}
              </Text>
            </View>
            <View className="flex-row items-center">
              <View 
                className="w-2 h-2 rounded-full animate-pulse" 
                style={{ 
                  backgroundColor: '#5EEAD4',
                  marginRight: SPACING.sm,
                  shadowColor: '#14B8A6',
                  shadowOpacity: 0.8,
                  shadowRadius: 2
                }} 
              />
              <Text className="text-teal-300 text-sm font-medium">
                Auto-recharge {walletBalance.autoRechargeEnabled ? 'ON' : 'OFF'}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
} 