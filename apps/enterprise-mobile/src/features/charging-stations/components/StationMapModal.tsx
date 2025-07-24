/**
 * 🗺️ Station Map Modal
 * 
 * Main modal for discovering and managing charging stations
 */

import React, { useEffect } from 'react';
import { View, Text, ScrollView, Pressable, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StationMapModalProps } from '../types/station.types';
import { useStations } from '../hooks/useStations';
import { useLocation } from '../hooks/useLocation';
import { StationCard } from './StationCard';
import { StationDetailBottomSheet } from './StationDetailBottomSheet';
import { SPACING } from '../../../shared/constants/spacing';

export function StationMapModal({ visible, onClose }: StationMapModalProps) {
  const {
    stations,
    selectedStation,
    availableStationsCount,
    handleStationSelect,
    handleStationReserve,
    handleStationNavigate,
    clearSelection,
  } = useStations();

  const {
    getCurrentLocation,
    isLoading: locationLoading,
  } = useLocation();

  // Get user location when modal opens
  useEffect(() => {
    if (visible) {
      getCurrentLocation();
    }
  }, [visible, getCurrentLocation]);

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
              <Ionicons name="arrow-back" size={20} color="#9CA3AF" />
            </Pressable>
            <Text className="text-white text-lg font-bold">Charging Stations</Text>
            <Pressable
              onPress={clearSelection}
              className="w-10 h-10 rounded-full items-center justify-center bg-gray-800"
            >
              <Ionicons name="filter" size={20} color="#9CA3AF" />
            </Pressable>
          </View>
        </SafeAreaView>

        {/* Map Container - Fallback Implementation */}
        <View className="flex-1 relative">
          {/* Map Placeholder with Station List */}
          <View className="flex-1 bg-gray-800">
            {/* Map Background Gradient */}
            <LinearGradient
              colors={['#1F2937', '#111827', '#0F172A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            />
            
            {/* Map Notice */}
            <View className="absolute inset-0 items-center justify-center">
              <View 
                className="rounded-3xl items-center justify-center"
                style={{
                  backgroundColor: '#1F2937',
                  borderWidth: 1,
                  borderColor: '#374151',
                  padding: SPACING.xl,
                  margin: SPACING.lg
                }}
              >
                <Ionicons name="map" size={48} color="#6B7280" style={{ marginBottom: SPACING.md }} />
                <Text className="text-white text-lg font-bold text-center mb-2">Interactive Map</Text>
                <Text className="text-gray-400 text-sm text-center leading-relaxed max-w-sm">
                  Map integration requires development build. For now, explore stations below or use the location button.
                </Text>
              </View>
            </View>

            {/* Station List Overlay */}
            <ScrollView 
              className="absolute bottom-20 left-0 right-0"
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: SPACING.lg }}
            >
              {stations.map((station) => (
                <StationCard
                  key={station.id}
                  station={station}
                  onPress={handleStationSelect}
                />
              ))}
            </ScrollView>
          </View>

          {/* Map Controls */}
          <View className="absolute top-4 right-4">
            <Pressable
              onPress={getCurrentLocation}
              disabled={locationLoading}
              className="w-12 h-12 rounded-2xl items-center justify-center mb-3 active:scale-95"
              style={{
                backgroundColor: '#1F2937',
                borderWidth: 1,
                borderColor: '#374151',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 4
              }}
            >
              <Ionicons 
                name={locationLoading ? "hourglass" : "locate"} 
                size={22} 
                color="#3B82F6" 
              />
            </Pressable>
          </View>

          {/* Station Count Indicator */}
          <View className="absolute top-4 left-4">
            <View 
              className="rounded-2xl flex-row items-center"
              style={{
                backgroundColor: '#1F2937',
                borderWidth: 1,
                borderColor: '#374151',
                paddingHorizontal: SPACING.md,
                paddingVertical: SPACING.sm,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 4
              }}
            >
              <View 
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: '#10B981', marginRight: SPACING.sm }}
              />
              <Text className="text-white text-sm font-medium">
                {availableStationsCount} available
              </Text>
            </View>
          </View>
        </View>

        {/* Station Detail Bottom Sheet */}
        <StationDetailBottomSheet
          station={selectedStation}
          onClose={clearSelection}
          onReserve={handleStationReserve}
          onNavigate={handleStationNavigate}
        />
      </View>
    </Modal>
  );
} 