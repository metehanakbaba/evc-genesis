/**
 * ⚡ Charging Request Selection Screen
 * 
 * Main selection screen for charging request types
 */

import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { openModal } from '../../common/navigation/stacks/MainStackNavigator';
import { SPACING } from '../../../shared/constants';

interface ChargingOptionProps {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  iconFamily: 'Ionicons' | 'MaterialIcons';
  borderColor: string;
  estimatedTime: string;
  startingPrice: string;
  onPress: () => void;
}

function ChargingOption({
  title,
  subtitle,
  description,
  icon,
  iconFamily,
  borderColor,
  estimatedTime,
  startingPrice,
  onPress
}: ChargingOptionProps) {
  const IconComponent = iconFamily === 'Ionicons' ? Ionicons : MaterialIcons;

  return (
    <Pressable
      onPress={onPress}
      className="overflow-hidden active:scale-98 mb-4"
      style={{ 
        borderRadius: 20,
        shadowColor: borderColor,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 24,
        elevation: 8
      }}
    >
      <LinearGradient
        colors={['rgba(31,41,55,0.95)', 'rgba(17,24,39,0.95)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderRadius: 20 }}
      >
        <LinearGradient
          colors={[`${borderColor}20`, `${borderColor}10`, `${borderColor}05`]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1.2, y: 0.8 }}
          style={{ borderRadius: 20 }}
        >
          <View
            style={{
              padding: SPACING.lg,
              borderWidth: 1,
              borderColor: `${borderColor}30`,
              borderRadius: 20,
            }}
          >
            {/* Header */}
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center">
                <LinearGradient
                  colors={[borderColor, `${borderColor}CC`, `${borderColor}99`]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 16,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: SPACING.md,
                    borderWidth: 1,
                    borderColor: `${borderColor}40`,
                  }}
                >
                  <IconComponent name={icon as any} size={24} color="white" />
                </LinearGradient>
                <View>
                  <Text className="text-white text-lg font-bold">{title}</Text>
                  <Text className="text-gray-300 text-sm">{subtitle}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </View>

            {/* Description */}
            <Text className="text-gray-300 text-sm leading-relaxed mb-4">
              {description}
            </Text>

            {/* Info Row */}
            <View className="flex-row justify-between">
              <View className="flex-row items-center">
                <Ionicons name="time" size={16} color={borderColor} />
                <Text className="text-gray-300 text-sm ml-2">{estimatedTime}</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-white text-base font-bold">{startingPrice}</Text>
                <Text className="text-gray-400 text-sm ml-1">başlangıç</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </LinearGradient>
    </Pressable>
  );
}

interface ChargingRequestSelectionScreenProps {
  onClose: () => void;
}

export function ChargingRequestSelectionScreen({ onClose }: ChargingRequestSelectionScreenProps) {

  const chargingOptions = [
    {
      title: 'İstasyon Şarjı',
      subtitle: 'Yakındaki istasyonları keşfet',
      description: 'En yakın şarj istasyonlarını bul, rezervasyon yap ve doğrudan git. Hızlı ve ekonomik çözüm.',
      icon: 'ev-station',
      iconFamily: 'MaterialIcons' as const,

      borderColor: '#3B82F6',
      estimatedTime: '5-15 dk',
      startingPrice: 'zł2.40/kWh',
      onPress: () => openModal('stationCharging')
    },
    {
      title: 'Mobil Şarj',
      subtitle: 'Premium concierge hizmeti',
      description: 'Sertifikalı teknisyenimiz bulunduğun konuma gelsin. Arabanı park ettiğin yerde şarj et.',
      icon: 'car-sport',
      iconFamily: 'Ionicons' as const,

      borderColor: '#F59E0B',
      estimatedTime: '15-45 dk',
      startingPrice: 'zł76',
      onPress: () => openModal('mobileCharging')
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <Pressable
          onPress={onClose}
          className="w-10 h-10 rounded-full bg-gray-800 items-center justify-center"
        >
          <Ionicons name="arrow-back" size={20} color="white" />
        </Pressable>
        <Text className="text-white text-lg font-bold">Şarj Talebi</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 px-6">
        {/* Title Section */}
        <View className="mb-8">
          <Text className="text-white text-2xl font-bold mb-2">
            Nasıl şarj etmek istiyorsun?
          </Text>
          <Text className="text-gray-400 text-base leading-relaxed">
            İhtiyacına en uygun şarj çözümünü seç. Her iki seçenek için de detaylı bilgi ve fiyatlandırma sunuyoruz.
          </Text>
        </View>

        {/* Charging Options */}
        {chargingOptions.map((option, index) => (
          <ChargingOption key={index} {...option} />
        ))}

        {/* Emergency Contact */}
        <View className="mt-6 mb-8">
          <Pressable className="flex-row items-center justify-center py-4 px-6 bg-red-900/20 border border-red-500/30 rounded-2xl">
            <Ionicons name="call" size={20} color="#EF4444" />
            <Text className="text-red-400 text-base font-medium ml-3">
              Acil Durum Şarj Hizmeti
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}