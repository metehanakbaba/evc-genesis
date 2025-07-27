/**
 * ⚡ Mobile Charging Confirmation Screen
 * 
 * Final confirmation and booking screen for mobile charging
 */

import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SPACING } from '../../../shared/constants';
import { MobileChargingTechnician } from '../types/charging-request.types';
import { mockTechnicians } from '../data/mockData';

interface MobileChargingConfirmationScreenProps {
  onClose: () => void;
}

interface BookingSummaryProps {
  serviceType: string;
  estimatedPrice: string;
  estimatedTime: string;
  location: string;
  vehicle: string;
}

function BookingSummary({ serviceType, estimatedPrice, estimatedTime, location, vehicle }: BookingSummaryProps) {
  return (
    <View className="bg-gray-800/50 rounded-2xl p-4 mb-6">
      <Text className="text-white text-lg font-bold mb-4">Rezervasyon Özeti</Text>
      
      <View className="space-y-3">
        <View className="flex-row justify-between">
          <Text className="text-gray-400">Hizmet Türü</Text>
          <Text className="text-white font-medium">{serviceType}</Text>
        </View>
        
        <View className="flex-row justify-between">
          <Text className="text-gray-400">Tahmini Fiyat</Text>
          <Text className="text-amber-400 font-bold">{estimatedPrice}</Text>
        </View>
        
        <View className="flex-row justify-between">
          <Text className="text-gray-400">Tahmini Süre</Text>
          <Text className="text-white font-medium">{estimatedTime}</Text>
        </View>
        
        <View className="flex-row justify-between">
          <Text className="text-gray-400">Konum</Text>
          <Text className="text-white font-medium flex-1 text-right">{location}</Text>
        </View>
        
        <View className="flex-row justify-between">
          <Text className="text-gray-400">Araç</Text>
          <Text className="text-white font-medium">{vehicle}</Text>
        </View>
      </View>
    </View>
  );
}

interface TechnicianCardProps {
  technician: MobileChargingTechnician;
}

function TechnicianCard({ technician }: TechnicianCardProps) {
  return (
    <View className="bg-gray-800/50 rounded-2xl p-4 mb-6">
      <Text className="text-white text-lg font-bold mb-4">Atanan Teknisyen</Text>
      
      <View className="flex-row items-center">
        <LinearGradient
          colors={['#F59E0B', '#D97706']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: SPACING.md,
          }}
        >
          <Ionicons name="person" size={24} color="white" />
        </LinearGradient>
        
        <View className="flex-1">
          <Text className="text-white text-base font-bold">{technician.name}</Text>
          <View className="flex-row items-center mt-1">
            <Ionicons name="star" size={14} color="#F59E0B" />
            <Text className="text-gray-300 text-sm ml-1">{technician.rating} puan</Text>
          </View>
          <Text className="text-gray-400 text-sm mt-1">{technician.vehicleInfo}</Text>
        </View>
        
        <View className="items-end">
          <Text className="text-amber-400 text-lg font-bold">{technician.estimatedArrival} dk</Text>
          <Text className="text-gray-400 text-xs">Tahmini varış</Text>
        </View>
      </View>
      
      <Pressable className="flex-row items-center justify-center mt-4 py-3 bg-green-600/20 border border-green-500/30 rounded-xl">
        <Ionicons name="call" size={16} color="#10B981" />
        <Text className="text-green-400 font-medium ml-2">Teknisyeni Ara</Text>
      </Pressable>
    </View>
  );
}

export function MobileChargingConfirmationScreen({ onClose }: MobileChargingConfirmationScreenProps) {
  const [isBooked, setIsBooked] = useState(false);
  const [assignedTechnician, setAssignedTechnician] = useState<MobileChargingTechnician | null>(null);

  // Simulate technician assignment
  useEffect(() => {
    if (isBooked) {
      const timer = setTimeout(() => {
        setAssignedTechnician(mockTechnicians[0]);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isBooked]);

  const handleBooking = () => {
    setIsBooked(true);
  };

  const mockBookingData = {
    serviceType: 'Premium Hizmet',
    estimatedPrice: 'zł156',
    estimatedTime: '15-45 dakika',
    location: 'Mevcut Konum (GPS)',
    vehicle: 'Tesla Model 3 - WA 12345'
  };

  if (isBooked) {
    return (
      <SafeAreaView className="flex-1 bg-gray-900">
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4">
          <Pressable
            onPress={onClose}
            className="w-10 h-10 rounded-full bg-gray-800 items-center justify-center"
          >
            <Ionicons name="close" size={20} color="white" />
          </Pressable>
          <Text className="text-white text-lg font-bold">Rezervasyon Onaylandı</Text>
          <View className="w-10" />
        </View>

        <ScrollView className="flex-1 px-6">
          {/* Success Message */}
          <View className="items-center mb-8">
            <LinearGradient
              colors={['#10B981', '#059669']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: SPACING.lg,
              }}
            >
              <Ionicons name="checkmark" size={40} color="white" />
            </LinearGradient>
            
            <Text className="text-white text-2xl font-bold text-center mb-2">
              Rezervasyonunuz Onaylandı!
            </Text>
            <Text className="text-gray-400 text-center">
              Teknisyenimiz size en kısa sürede ulaşacak
            </Text>
          </View>

          <BookingSummary {...mockBookingData} />
          
          {assignedTechnician ? (
            <TechnicianCard technician={assignedTechnician} />
          ) : (
            <View className="bg-gray-800/50 rounded-2xl p-4 mb-6">
              <Text className="text-white text-lg font-bold mb-4">Teknisyen Atanıyor...</Text>
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-gray-700 rounded-full animate-pulse mr-4" />
                <View className="flex-1">
                  <View className="h-4 bg-gray-700 rounded animate-pulse mb-2" />
                  <View className="h-3 bg-gray-700 rounded animate-pulse w-2/3" />
                </View>
              </View>
            </View>
          )}

          {/* Action Buttons */}
          <View className="space-y-3 mb-8">
            <Pressable className="flex-row items-center justify-center py-4 bg-blue-600 rounded-2xl">
              <Ionicons name="location" size={20} color="white" />
              <Text className="text-white font-bold ml-2">Teknisyeni Takip Et</Text>
            </Pressable>
            
            <Pressable className="flex-row items-center justify-center py-4 bg-gray-800 border border-gray-700 rounded-2xl">
              <Ionicons name="chatbubble" size={20} color="#9CA3AF" />
              <Text className="text-gray-300 font-medium ml-2">Destek ile İletişim</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

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
        <Text className="text-white text-lg font-bold">Rezervasyon Onayı</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 px-6">
        {/* Title */}
        <View className="mb-8">
          <Text className="text-white text-2xl font-bold mb-2">
            Rezervasyonu Onayla
          </Text>
          <Text className="text-gray-400 text-base">
            Detayları kontrol edin ve rezervasyonunuzu onaylayın
          </Text>
        </View>

        <BookingSummary {...mockBookingData} />

        {/* Terms */}
        <View className="bg-gray-800/30 rounded-2xl p-4 mb-6">
          <Text className="text-white text-base font-medium mb-3">Önemli Bilgiler</Text>
          <View className="space-y-2">
            <Text className="text-gray-400 text-sm">• Teknisyen varışından 15 dakika önce bildirim alacaksınız</Text>
            <Text className="text-gray-400 text-sm">• İptal işlemi varıştan 30 dakika öncesine kadar ücretsizdir</Text>
            <Text className="text-gray-400 text-sm">• Ödeme şarj işlemi tamamlandıktan sonra alınacaktır</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View className="px-6 pb-6">
        <Pressable
          onPress={handleBooking}
          className="py-4 rounded-2xl bg-amber-600"
        >
          <Text className="text-white text-center text-base font-bold">
            Rezervasyonu Onayla - zł156
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}