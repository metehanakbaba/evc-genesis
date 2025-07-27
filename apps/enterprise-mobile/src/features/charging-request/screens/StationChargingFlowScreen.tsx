/**
 * ⚡ Station Charging Flow Screen
 * 
 * Multi-step flow for station charging requests
 */

import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SPACING } from '../../../shared/constants';
import { Vehicle, Location } from '../types/charging-request.types';
import { mockVehicles } from '../data/mockData';
import { openModal } from '../../common/navigation/stacks/MainStackNavigator';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <View className="flex-row items-center justify-center mb-6">
      {Array.from({ length: totalSteps }, (_, index) => (
        <React.Fragment key={index}>
          <View
            className={`w-8 h-8 rounded-full items-center justify-center ${
              index + 1 <= currentStep ? 'bg-blue-500' : 'bg-gray-700'
            }`}
          >
            <Text className="text-white text-sm font-bold">{index + 1}</Text>
          </View>
          {index < totalSteps - 1 && (
            <View
              className={`w-8 h-0.5 ${
                index + 1 < currentStep ? 'bg-blue-500' : 'bg-gray-700'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </View>
  );
}

interface VehicleSelectionProps {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  onSelect: (vehicle: Vehicle) => void;
}

function VehicleSelection({ vehicles, selectedVehicle, onSelect }: VehicleSelectionProps) {
  return (
    <View>
      <Text className="text-white text-xl font-bold mb-4">Aracını Seç</Text>
      <Text className="text-gray-400 text-sm mb-6">
        Hangi aracın için şarj istasyonu arıyorsun?
      </Text>
      
      {vehicles.map((vehicle) => (
        <Pressable
          key={vehicle.id}
          onPress={() => onSelect(vehicle)}
          className={`p-4 rounded-2xl mb-3 border ${
            selectedVehicle?.id === vehicle.id
              ? 'bg-blue-900/30 border-blue-500/50'
              : 'bg-gray-800/50 border-gray-700/50'
          }`}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <MaterialIcons name="electric-car" size={24} color="#3B82F6" />
              <View className="ml-3">
                <Text className="text-white text-base font-medium">
                  {vehicle.make} {vehicle.model}
                </Text>
                <Text className="text-gray-400 text-sm">
                  {vehicle.year} • {vehicle.chargingPortType} • {vehicle.licensePlate}
                </Text>
              </View>
            </View>
            <View className="items-end">
              <Text className="text-blue-400 text-sm font-medium">
                %{vehicle.currentBatteryLevel}
              </Text>
              <Text className="text-gray-500 text-xs">
                {vehicle.batteryCapacity} kWh
              </Text>
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

interface LocationSelectionProps {
  onLocationSelect: (location: Location) => void;
}

function LocationSelection({ onLocationSelect }: LocationSelectionProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View>
      <Text className="text-white text-xl font-bold mb-4">Konum Belirle</Text>
      <Text className="text-gray-400 text-sm mb-6">
        Hangi bölgede şarj istasyonu arıyorsun?
      </Text>

      {/* Search Input */}
      <View className="bg-gray-800 rounded-2xl p-4 mb-4">
        <View className="flex-row items-center">
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Adres, şehir veya bölge ara..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 text-white ml-3"
          />
        </View>
      </View>

      {/* Quick Options */}
      <View className="space-y-3">
        <Pressable
          onPress={() => onLocationSelect({
            latitude: 52.2297,
            longitude: 21.0122,
            address: 'Mevcut Konum',
            city: 'Warszawa',
            postalCode: '00-001'
          })}
          className="flex-row items-center p-4 bg-gray-800/50 rounded-2xl"
        >
          <Ionicons name="location" size={20} color="#3B82F6" />
          <Text className="text-white ml-3 font-medium">Mevcut Konumum</Text>
        </Pressable>

        <Pressable
          onPress={() => onLocationSelect({
            latitude: 52.2297,
            longitude: 21.0122,
            address: 'Ev Adresi',
            city: 'Warszawa',
            postalCode: '00-001'
          })}
          className="flex-row items-center p-4 bg-gray-800/50 rounded-2xl"
        >
          <Ionicons name="home" size={20} color="#10B981" />
          <Text className="text-white ml-3 font-medium">Ev Adresim</Text>
        </Pressable>

        <Pressable
          onPress={() => onLocationSelect({
            latitude: 52.2297,
            longitude: 21.0122,
            address: 'İş Adresi',
            city: 'Warszawa',
            postalCode: '00-001'
          })}
          className="flex-row items-center p-4 bg-gray-800/50 rounded-2xl"
        >
          <Ionicons name="business" size={20} color="#F59E0B" />
          <Text className="text-white ml-3 font-medium">İş Adresim</Text>
        </Pressable>
      </View>
    </View>
  );
}

interface StationChargingFlowScreenProps {
  onClose: () => void;
}

export function StationChargingFlowScreen({ onClose }: StationChargingFlowScreenProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);



  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Show station list
      openModal('stationList');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onClose();
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedVehicle !== null;
      case 2:
        return selectedLocation !== null;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <VehicleSelection
            vehicles={mockVehicles}
            selectedVehicle={selectedVehicle}
            onSelect={setSelectedVehicle}
          />
        );
      case 2:
        return <LocationSelection onLocationSelect={setSelectedLocation} />;
      case 3:
        return (
          <View>
            <Text className="text-white text-xl font-bold mb-4">Şarj Tercihleri</Text>
            <Text className="text-gray-400 text-sm mb-6">
              Şarj hedefini ve tercihlerini belirle
            </Text>
            {/* Battery level selector, time preferences, etc. */}
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
          className="w-10 h-10 rounded-full bg-gray-800 items-center justify-center"
        >
          <Ionicons name="arrow-back" size={20} color="white" />
        </Pressable>
        <Text className="text-white text-lg font-bold">İstasyon Şarjı</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 px-6">
        <StepIndicator currentStep={currentStep} totalSteps={3} />
        {renderStepContent()}
      </ScrollView>

      {/* Bottom Action */}
      <View className="px-6 pb-6">
        <Pressable
          onPress={handleNext}
          disabled={!canProceed()}
          className={`py-4 rounded-2xl ${
            canProceed() ? 'bg-blue-600' : 'bg-gray-700'
          }`}
        >
          <Text className="text-white text-center text-base font-bold">
            {currentStep === 3 ? 'İstasyonları Göster' : 'Devam Et'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}