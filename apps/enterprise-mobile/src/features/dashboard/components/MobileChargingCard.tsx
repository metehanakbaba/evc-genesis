/**
 * 🏠 Mobile Charging Card Component
 * 
 * Premium mobile charging service card
 */

import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SPACING } from '../../../shared/constants';
import { ChargingProgressAnimation, PulseStatusIndicator } from './animations';

// Background image
import futuristicChargeStation from '../../../../assets/dashboard/futuristic-charge-station.jpg';

interface MobileChargingCardProps {
  features: {
    estimatedArrival: string;
    chargingSpeed: string;
    startingPrice: string;
    availability: string;
  };
  onPress: () => void;
  isCharging?: boolean;
  chargingProgress?: number;
  isAvailable?: boolean;
}

export function MobileChargingCard({ 
  features, 
  onPress, 
  isCharging = false,
  chargingProgress = 0,
  isAvailable = true
}: MobileChargingCardProps) {
  return (
    <View style={{ paddingHorizontal: SPACING.lg, marginBottom: SPACING.lg }}>
      <Text className="text-gray-400 text-sm font-medium" style={{ marginBottom: SPACING.lg }}>
        Charging Solutions
      </Text>
      
      <Pressable
        onPress={onPress}
        className="overflow-hidden active:scale-98"
        style={{ 
          marginBottom: SPACING.lg,
          borderRadius: 24,
          shadowColor: '#F59E0B',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.15,
          shadowRadius: 24,
          elevation: 8
        }}
      >
        {/* Background Image */}
        <Image
          source={futuristicChargeStation}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            opacity: 0.6,
            borderRadius: 24,
          }}
          resizeMode="cover"
        />
        
        {/* Multi-Layer Gradients */}
        <LinearGradient
          colors={['rgba(31,41,55,0.7)', 'rgba(17,24,39,0.7)', 'rgba(15,23,42,0.7)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 24 }}
        />
        <LinearGradient
          colors={['rgba(245,158,11,0.2)', 'rgba(217,119,6,0.15)', 'rgba(146,64,14,0.1)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1.2, y: 0.8 }}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 24 }}
        />
        
        <View style={{ padding: SPACING.xl, borderWidth: 1, borderColor: '#F59E0B25', borderRadius: 24 }}>
          {/* Premium Header */}
          <View className="flex-row items-center justify-between" style={{ marginBottom: SPACING.lg }}>
            <View className="flex-row items-center">
              <LinearGradient
                colors={['#FCD34D', '#F59E0B', '#D97706']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  borderRadius: 12,
                  marginRight: SPACING.md
                }}
              >
                <Text className="text-gray-900 text-xs font-black tracking-wider">PREMIUM</Text>
              </LinearGradient>
              <View className="flex-row items-center">
                <PulseStatusIndicator
                  isActive={isAvailable}
                  color="#FCD34D"
                  size={8}
                  pulseIntensity={0.5}
                  pulseSpeed={800}
                  showRing={isAvailable}
                />
                <View style={{ marginLeft: SPACING.xs }}>
                  <Text className="text-amber-300 text-sm font-medium">{features.availability}</Text>
                </View>
              </View>
            </View>
            <ChargingProgressAnimation
              isCharging={isCharging}
              progress={chargingProgress}
              size={60}
              color="#FCD34D"
              showProgress={isCharging}
            />
          </View>

          {/* Content */}
          <Text className="text-white text-2xl font-bold tracking-tight" style={{ marginBottom: SPACING.sm }}>
            Mobile Charging
          </Text>
          <Text className="text-gray-300 text-base leading-relaxed" style={{ marginBottom: SPACING.lg }}>
            Premium concierge service • Tesla-certified technicians
          </Text>
          
          {/* Features Grid */}
          <View className="flex-row justify-between">
            <View className="flex-1">
              <View className="flex-row items-center" style={{ marginBottom: SPACING.xs }}>
                <Ionicons name="time" size={16} color="#FCD34D" />
                <Text className="text-amber-300 text-sm font-medium" style={{ marginLeft: SPACING.xs }}>
                  {features.estimatedArrival}
                </Text>
              </View>
              <Text className="text-gray-400 text-xs">Estimated arrival</Text>
            </View>
            <View className="flex-1">
              <View className="flex-row items-center" style={{ marginBottom: SPACING.xs }}>
                <FontAwesome5 name="battery-full" size={14} color="#FCD34D" />
                <Text className="text-amber-300 text-sm font-medium" style={{ marginLeft: SPACING.xs }}>
                  {features.chargingSpeed}
                </Text>
              </View>
              <Text className="text-gray-400 text-xs">Charging speed</Text>
            </View>
            <View className="flex-1 items-end">
              <Text className="text-white text-lg font-bold">{features.startingPrice}</Text>
              <Text className="text-gray-400 text-xs">Starting price</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
} 