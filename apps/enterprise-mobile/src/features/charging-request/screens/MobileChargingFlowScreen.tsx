/**
 * ⚡ Mobile Charging Flow Screen
 *
 * Multi-step flow for mobile charging requests
 */

import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SPACING } from '../../../shared/constants';
import { Vehicle, Location } from '../types/charging-request.types';
import { mockVehicles, mockServiceTypes } from '../data/mockData';
import { openModal } from '../../common/navigation/stacks/MainStackNavigator';

interface ServiceTypeSelectionProps {
  selectedType: 'standard' | 'premium' | 'emergency';
  onSelect: (type: 'standard' | 'premium' | 'emergency') => void;
}

function ServiceTypeSelection({ selectedType, onSelect }: ServiceTypeSelectionProps) {
  const serviceTypes = [
    {
      id: 'standard' as const,
      title: 'Standart Hizmet',
      subtitle: '45-90 dakika içinde',
      price: 'zł76',
      features: ['Temel şarj hizmeti', 'Sertifikalı teknisyen', '7/24 destek'],
      gradient: ['#6B7280', '#4B5563'],
      borderColor: '#6B7280',
    },
    {
      id: 'premium' as const,
      title: 'Premium Hizmet',
      subtitle: '15-45 dakika içinde',
      price: 'zł156',
      features: [
        'Öncelikli hizmet',
        'Tesla sertifikalı teknisyen',
        'Araç temizlik hizmeti',
        'Premium destek',
      ],
      gradient: ['#F59E0B', '#D97706'],
      borderColor: '#F59E0B',
      popular: true,
    },
    {
      id: 'emergency' as const,
      title: 'Acil Hizmet',
      subtitle: '5-20 dakika içinde',
      price: 'zł256',
      features: ['Anında müdahale', 'En yakın teknisyen', 'Acil durum desteği', '24/7 öncelik'],
      gradient: ['#EF4444', '#DC2626'],
      borderColor: '#EF4444',
    },
  ];

  return (
    <View>
      <Text className="mb-4 text-xl font-bold text-white">Hizmet Türü</Text>
      <Text className="mb-6 text-sm text-gray-400">İhtiyacına uygun mobil şarj hizmetini seç</Text>

      {mockServiceTypes.map((service) => (
        <Pressable
          key={service.id}
          onPress={() => onSelect(service.id)}
          className={`mb-4 overflow-hidden rounded-2xl ${
            selectedType === service.id ? 'opacity-100' : 'opacity-70'
          }`}
          style={{
            shadowColor: service.borderColor,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: selectedType === service.id ? 0.3 : 0.1,
            shadowRadius: 12,
            elevation: 6,
          }}>
          <LinearGradient
            colors={['rgba(31,41,55,0.95)', 'rgba(17,24,39,0.95)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: 16 }}>
            <LinearGradient
              colors={[`${service.borderColor}20`, `${service.borderColor}10`]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ borderRadius: 16 }}>
              <View
                style={{
                  padding: SPACING.lg,
                  borderWidth: selectedType === service.id ? 2 : 1,
                  borderColor:
                    selectedType === service.id ? service.borderColor : `${service.borderColor}30`,
                  borderRadius: 16,
                }}>
                {/* Header */}
                <View className="mb-3 flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <LinearGradient
                      colors={[service.borderColor, `${service.borderColor}CC`]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: SPACING.sm,
                      }}>
                      <Ionicons name="flash" size={20} color="white" />
                    </LinearGradient>
                    <View>
                      <View className="flex-row items-center">
                        <Text className="text-base font-bold text-white">{service.title}</Text>
                        {service.popular && (
                          <View className="ml-2 rounded-full bg-amber-500 px-2 py-1">
                            <Text className="text-xs font-bold text-black">POPÜLER</Text>
                          </View>
                        )}
                      </View>
                      <Text className="text-sm text-gray-300">{service.subtitle}</Text>
                    </View>
                  </View>
                  <Text className="text-lg font-bold text-white">{service.price}</Text>
                </View>

                {/* Features */}
                <View className="space-y-2">
                  {service.features.map((feature, index) => (
                    <View key={index} className="flex-row items-center">
                      <Ionicons name="checkmark-circle" size={16} color={service.borderColor} />
                      <Text className="ml-2 text-sm text-gray-300">{feature}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </LinearGradient>
          </LinearGradient>
        </Pressable>
      ))}
    </View>
  );
}

interface LocationDetailsProps {
  onLocationConfirm: (location: Location, useCarLocation: boolean) => void;
}

function LocationDetails({ onLocationConfirm }: LocationDetailsProps) {
  const [useCarLocation, setUseCarLocation] = useState(false);
  const [customAddress, setCustomAddress] = useState('');

  return (
    <View>
      <Text className="mb-4 text-xl font-bold text-white">Şarj Konumu</Text>
      <Text className="mb-6 text-sm text-gray-400">Teknisyenimizin geleceği konumu belirle</Text>

      {/* Car Location Toggle */}
      <View className="mb-4 rounded-2xl bg-gray-800/50 p-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-1 flex-row items-center">
            <MaterialIcons name="my-location" size={24} color="#3B82F6" />
            <View className="ml-3 flex-1">
              <Text className="text-base font-medium text-white">Araç Konumunu Kullan</Text>
              <Text className="text-sm text-gray-400">
                GPS ile araç konumunu otomatik tespit et
              </Text>
            </View>
          </View>
          <Switch
            value={useCarLocation}
            onValueChange={setUseCarLocation}
            trackColor={{ false: '#374151', true: '#3B82F6' }}
            thumbColor={useCarLocation ? '#FFFFFF' : '#9CA3AF'}
          />
        </View>
      </View>

      {/* Manual Address Input */}
      {!useCarLocation && (
        <View className="mb-4 rounded-2xl bg-gray-800/50 p-4">
          <Text className="mb-3 text-base font-medium text-white">Manuel Adres</Text>
          <TextInput
            value={customAddress}
            onChangeText={setCustomAddress}
            placeholder="Tam adres girin..."
            placeholderTextColor="#9CA3AF"
            className="text-base text-white"
            multiline
          />
        </View>
      )}

      {/* Quick Location Options */}
      <View className="space-y-3">
        <Text className="text-sm font-medium text-gray-400">Hızlı Seçenekler</Text>

        <Pressable className="flex-row items-center rounded-2xl bg-gray-800/50 p-4">
          <Ionicons name="home" size={20} color="#10B981" />
          <Text className="ml-3 font-medium text-white">Ev Adresim</Text>
        </Pressable>

        <Pressable className="flex-row items-center rounded-2xl bg-gray-800/50 p-4">
          <Ionicons name="business" size={20} color="#F59E0B" />
          <Text className="ml-3 font-medium text-white">İş Adresim</Text>
        </Pressable>
      </View>

      {/* Special Instructions */}
      <View className="mt-6">
        <Text className="mb-3 text-base font-medium text-white">Özel Talimatlar (Opsiyonel)</Text>
        <TextInput
          placeholder="Otopark bilgileri, güvenlik kodu, özel notlar..."
          placeholderTextColor="#9CA3AF"
          className="rounded-2xl bg-gray-800/50 p-4 text-base text-white"
          multiline
          numberOfLines={3}
        />
      </View>
    </View>
  );
}

interface MobileChargingFlowScreenProps {
  onClose: () => void;
}

export function MobileChargingFlowScreen({ onClose }: MobileChargingFlowScreenProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedServiceType, setSelectedServiceType] = useState<
    'standard' | 'premium' | 'emergency'
  >('premium');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Show confirmation
      openModal('mobileChargingConfirmation');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onClose();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ServiceTypeSelection
            selectedType={selectedServiceType}
            onSelect={setSelectedServiceType}
          />
        );
      case 2:
        return (
          <LocationDetails
            onLocationConfirm={(location, useCarLocation) => {
              // Handle location confirmation
              setCurrentStep(3);
            }}
          />
        );
      case 3:
        return (
          <View>
            <Text className="mb-4 text-xl font-bold text-white">Araç Seçimi</Text>
            {/* Vehicle selection component */}
          </View>
        );
      case 4:
        return (
          <View>
            <Text className="mb-4 text-xl font-bold text-white">Şarj Detayları</Text>
            {/* Battery level, timing preferences */}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <Pressable
          onPress={handleBack}
          className="h-10 w-10 items-center justify-center rounded-full bg-gray-800">
          <Ionicons name="arrow-back" size={20} color="white" />
        </Pressable>
        <Text className="text-lg font-bold text-white">Mobil Şarj</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 px-6">
        {/* Step Indicator */}
        <View className="mb-6 flex-row items-center justify-center">
          {Array.from({ length: 4 }, (_, index) => (
            <React.Fragment key={index}>
              <View
                className={`h-8 w-8 items-center justify-center rounded-full ${
                  index + 1 <= currentStep ? 'bg-amber-500' : 'bg-gray-700'
                }`}>
                <Text className="text-sm font-bold text-white">{index + 1}</Text>
              </View>
              {index < 3 && (
                <View
                  className={`h-0.5 w-8 ${
                    index + 1 < currentStep ? 'bg-amber-500' : 'bg-gray-700'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </View>

        {renderStepContent()}
      </ScrollView>

      {/* Bottom Action */}
      <View className="px-6 pb-6">
        <Pressable onPress={handleNext} className="rounded-2xl bg-amber-600 py-4">
          <Text className="text-center text-base font-bold text-white">
            {currentStep === 4 ? 'Talebi Onayla' : 'Devam Et'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
