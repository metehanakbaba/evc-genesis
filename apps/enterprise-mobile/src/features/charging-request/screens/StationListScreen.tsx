/**
 * ⚡ Station List Screen
 * 
 * List of available charging stations with booking functionality
 */

import { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SPACING } from '../../../shared/constants';
import { ChargingStation } from '../types/charging-request.types';
import { mockChargingStations } from '../data/mockData';

interface StationListScreenProps {
  onClose: () => void;
}

interface StationCardProps {
  station: ChargingStation;
  onSelect: (station: ChargingStation) => void;
}

function StationCard({ station, onSelect }: StationCardProps) {
  return (
    <Pressable
      onPress={() => onSelect(station)}
      className="mb-4 overflow-hidden active:scale-98"
      style={{
        borderRadius: 16,
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 6
      }}
    >
      <LinearGradient
        colors={['rgba(31,41,55,0.95)', 'rgba(17,24,39,0.95)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderRadius: 16 }}
      >
        <LinearGradient
          colors={['rgba(59,130,246,0.15)', 'rgba(59,130,246,0.05)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 16 }}
        >
          <View
            style={{
              padding: SPACING.lg,
              borderWidth: 1,
              borderColor: 'rgba(59,130,246,0.2)',
              borderRadius: 16,
            }}
          >
            {/* Header */}
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-1">
                <Text className="text-white text-lg font-bold">{station.name}</Text>
                <Text className="text-gray-300 text-sm">{station.location.address}</Text>
              </View>
              <View className="items-end">
                <Text className="text-blue-400 text-base font-bold">{station.distance} km</Text>
                <View className="flex-row items-center">
                  <Ionicons name="star" size={12} color="#F59E0B" />
                  <Text className="text-gray-300 text-xs ml-1">{station.rating}</Text>
                </View>
              </View>
            </View>

            {/* Status Row */}
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center">
                <View
                  className={`w-2 h-2 rounded-full mr-2 ${
                    station.availableConnectors > 0 ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                <Text className="text-gray-300 text-sm">
                  {station.availableConnectors}/{station.totalConnectors} müsait
                </Text>
              </View>
              <Text className="text-blue-400 text-sm font-medium">
                {station.chargingSpeed}
              </Text>
            </View>

            {/* Price and Wait Time */}
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-white text-base font-bold">
                zł{station.pricePerKwh}/kWh
              </Text>
              <View className="flex-row items-center">
                <Ionicons name="time" size={14} color="#9CA3AF" />
                <Text className="text-gray-400 text-sm ml-1">
                  {station.estimatedWaitTime === 0 ? 'Hemen' : `${station.estimatedWaitTime} dk`}
                </Text>
              </View>
            </View>

            {/* Amenities */}
            <View className="flex-row flex-wrap">
              {station.amenities.slice(0, 3).map((amenity, index) => (
                <View
                  key={index}
                  className="bg-gray-700/50 rounded-full px-2 py-1 mr-2 mb-1"
                >
                  <Text className="text-gray-300 text-xs">{amenity}</Text>
                </View>
              ))}
              {station.amenities.length > 3 && (
                <View className="bg-blue-600/20 rounded-full px-2 py-1">
                  <Text className="text-blue-400 text-xs">
                    +{station.amenities.length - 3}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </LinearGradient>
      </LinearGradient>
    </Pressable>
  );
}

export function StationListScreen({ onClose }: StationListScreenProps) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'available' | 'fast'>('all');
  const [sortBy, setSortBy] = useState<'distance' | 'price' | 'rating'>('distance');

  const filteredStations = mockChargingStations
    .filter(station => {
      switch (selectedFilter) {
        case 'available':
          return station.availableConnectors > 0;
        case 'fast':
          return station.chargingSpeed.includes('150kW') || station.chargingSpeed.includes('200kW');
        default:
          return true;
      }
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.pricePerKwh - b.pricePerKwh;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.distance - b.distance;
      }
    });

  const handleStationSelect = (station: ChargingStation) => {
    // Here you would navigate to booking confirmation
    console.log('Selected station:', station.name);
    onClose();
  };

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
        <Text className="text-white text-lg font-bold">Şarj İstasyonları</Text>
        <Pressable className="w-10 h-10 rounded-full bg-gray-800 items-center justify-center">
          <Ionicons name="map" size={20} color="white" />
        </Pressable>
      </View>

      {/* Filters */}
      <View className="px-6 mb-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row space-x-3">
            {[
              { key: 'all', label: 'Tümü' },
              { key: 'available', label: 'Müsait' },
              { key: 'fast', label: 'Hızlı Şarj' }
            ].map((filter) => (
              <Pressable
                key={filter.key}
                onPress={() => setSelectedFilter(filter.key as any)}
                className={`px-4 py-2 rounded-full ${
                  selectedFilter === filter.key
                    ? 'bg-blue-600'
                    : 'bg-gray-800'
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    selectedFilter === filter.key
                      ? 'text-white'
                      : 'text-gray-300'
                  }`}
                >
                  {filter.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Sort Options */}
      <View className="flex-row items-center justify-between px-6 mb-4">
        <Text className="text-gray-400 text-sm">
          {filteredStations.length} istasyon bulundu
        </Text>
        <Pressable
          onPress={() => {
            const options: ('distance' | 'price' | 'rating')[] = ['distance', 'price', 'rating'];
            const currentIndex = options.indexOf(sortBy);
            const nextIndex = (currentIndex + 1) % options.length;
            setSortBy(options[nextIndex]);
          }}
          className="flex-row items-center"
        >
          <Ionicons name="swap-vertical" size={16} color="#9CA3AF" />
          <Text className="text-gray-400 text-sm ml-1">
            {sortBy === 'distance' ? 'Mesafe' : sortBy === 'price' ? 'Fiyat' : 'Puan'}
          </Text>
        </Pressable>
      </View>

      {/* Station List */}
      <ScrollView className="flex-1 px-6">
        {filteredStations.map((station) => (
          <StationCard
            key={station.id}
            station={station}
            onSelect={handleStationSelect}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}