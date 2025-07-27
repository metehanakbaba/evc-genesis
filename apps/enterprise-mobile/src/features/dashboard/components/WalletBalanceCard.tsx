/**
 * 🏠 Premium Wallet Balance Card Component
 * 
 * Display wallet balance with teal/cyan financial theme
 * Psychology: Teal colors represent trust, reliability, and digital financial operations
 */

import React, { useState } from 'react';
import { View, Text, Pressable, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { WalletBalance } from '../types';
import { SPACING } from '../../../shared/constants';
import { AnimatedCounter, PulseStatusIndicator } from './animations';

// Background image
import sunsetCarsEvCharge from '../../../../assets/dashboard/sunset-cars-ev-charge.jpg';

interface WalletBalanceCardProps {
  walletBalance: WalletBalance;
  onPress: () => void;
  isLoading?: boolean;
}

const { width } = Dimensions.get('window');

export function WalletBalanceCard({ 
  walletBalance, 
  onPress, 
  isLoading = false 
}: WalletBalanceCardProps) {
  const [showBalance, setShowBalance] = useState(true);
  return (
    <View style={{ paddingHorizontal: SPACING.lg, marginBottom: SPACING.lg }}>
      <Pressable
        onPress={onPress}
        className="overflow-hidden active:scale-[0.98]"
        style={{
          borderRadius: 24,
          shadowColor: '#14B8A6',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.25,
          shadowRadius: 16,
          elevation: 12
        }}
      >
        {/* Premium Background Image with Overlay */}
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
            opacity: 0.3,
            borderRadius: 24,
          }}
          resizeMode="cover"
        />
        
        {/* Sophisticated Gradient Overlays */}
        <LinearGradient
          colors={[
            'rgba(17,24,39,0.95)', 
            'rgba(31,41,55,0.9)', 
            'rgba(15,23,42,0.95)'
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 24 }}
        />
        
        {/* Teal Financial Accent Overlay */}
        <LinearGradient
          colors={[
            'rgba(20,184,166,0.15)', 
            'rgba(15,118,110,0.12)', 
            'rgba(19,78,74,0.08)',
            'rgba(13,60,60,0.05)'
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1.2, y: 0.8 }}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 24 }}
        />

        {/* Premium Glassmorphism Border */}
        <LinearGradient
          colors={['rgba(20,184,166,0.3)', 'rgba(15,118,110,0.2)', 'rgba(19,78,74,0.1)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 24,
            padding: 1,
          }}
        >
          <View style={{ 
            flex: 1, 
            borderRadius: 23, 
            backgroundColor: 'transparent' 
          }} />
        </LinearGradient>
        
        <View style={{ 
          padding: SPACING.xl, 
          borderRadius: 24,
          minHeight: 140 
        }}>
          {/* Header Section with Enhanced Typography */}
          <View className="flex-row items-center justify-between mb-6">
            <View className="flex-1">
              <View className="flex-row items-center mb-2">
                <MaterialIcons name="account-balance-wallet" size={16} color="#14B8A6" />
                <Text className="text-teal-300 text-sm font-semibold ml-2 tracking-wide">
                  WALLET BALANCE
                </Text>
              </View>
              <AnimatedCounter
                value={walletBalance.amount}
                currency={walletBalance.currency}
                isLoading={isLoading}
                duration={2000}
                textStyle={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  letterSpacing: -0.5,
                  lineHeight: 36,
                  color: '#FFF'
                }}
                onAnimationComplete={() => {
                  console.log('Balance animation completed');
                }}
              />
            </View>
            
            {/* Premium Teal Icon */}
            <View style={{
              width: 56,
              height: 56,
              borderRadius: 18,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(20,184,166,0.1)',
              borderWidth: 1,
              borderColor: 'rgba(20,184,166,0.3)',
              shadowColor: '#14B8A6',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 4
            }}>
              <FontAwesome5 name="wallet" size={24} color="#5EEAD4" />
            </View>
          </View>

          {/* Enhanced Status Indicator */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <PulseStatusIndicator
                isActive={walletBalance.autoRechargeEnabled}
                color={walletBalance.autoRechargeEnabled ? '#10B981' : '#6B7280'}
                size={10}
                pulseIntensity={0.4}
                pulseSpeed={1200}
                showRing={walletBalance.autoRechargeEnabled}
              />
              <View style={{ marginLeft: SPACING.sm }}>
                <Text className={`text-sm font-medium ${
                  walletBalance.autoRechargeEnabled ? 'text-emerald-300' : 'text-gray-400'
                }`}>
                  Auto-recharge {walletBalance.autoRechargeEnabled ? 'Active' : 'Inactive'}
                </Text>
              </View>
            </View>
            
            {/* Premium Status Badge */}
            <View style={{
              paddingHorizontal: SPACING.md,
              paddingVertical: SPACING.xs,
              borderRadius: 12,
              backgroundColor: 'rgba(20,184,166,0.12)',
              borderWidth: 1,
              borderColor: 'rgba(20,184,166,0.25)'
            }}>
              <Text className="text-teal-200 text-xs font-semibold tracking-wider">
                DIGITAL
              </Text>
            </View>
          </View>

          {/* Subtle Bottom Accent Line */}
          <LinearGradient
            colors={['transparent', 'rgba(20,184,166,0.4)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: SPACING.xl,
              right: SPACING.xl,
              height: 2,
              borderRadius: 1
            }}
          />
        </View>
      </Pressable>
    </View>
  );
}