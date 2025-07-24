/**
 * 🏪 Station Card Component
 * 
 * Reusable card for displaying charging station information
 */

import React from 'react';
import { View, Text, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StationCardProps } from '../types/station.types';
import { SPACING } from '../../../shared/constants/spacing';

const { width: screenWidth } = Dimensions.get('window');

export function StationCard({ station, onPress }: StationCardProps) {
  const getStationMarkerColor = (status: string) => {
    switch (status) {
      case 'available': return '#10B981';
      case 'busy': return '#F59E0B';
      case 'maintenance': return '#8B5CF6';
      case 'offline': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <Pressable
      onPress={() => onPress(station)}
      className="active:scale-95"
      style={{
        width: screenWidth * 0.75,
        marginRight: SPACING.md,
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6
      }}
    >
      <LinearGradient
        colors={['#1F2937', '#111827']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ 
          padding: SPACING.lg, 
          borderWidth: 1, 
          borderColor: '#374151', 
          borderRadius: 20 
        }}
      >
        {/* Station Header */}
        <View className="flex-row items-start justify-between" style={{ marginBottom: SPACING.md }}>
          <View className="flex-1">
            <View className="flex-row items-center" style={{ marginBottom: SPACING.xs }}>
              <Text className="text-white text-lg font-bold">{station.name}</Text>
              {station.isSuperfast && (
                <View 
                  style={{
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    backgroundColor: '#EF444420',
                    borderRadius: 4,
                    marginLeft: SPACING.sm
                  }}
                >
                  <Text className="text-red-400 text-xs font-bold">FAST</Text>
                </View>
              )}
            </View>
            <Text className="text-gray-400 text-sm">{station.address}</Text>
          </View>
          <View 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: getStationMarkerColor(station.status) }}
          />
        </View>

        {/* Station Stats */}
        <View className="flex-row justify-between">
          <View>
            <Text className="text-gray-500 text-xs">Available</Text>
            <Text className="text-white text-sm font-medium">
              {station.availablePorts}/{station.totalPorts}
            </Text>
          </View>
          <View>
            <Text className="text-gray-500 text-xs">Power</Text>
            <Text className="text-white text-sm font-medium">{station.maxPower}kW</Text>
          </View>
          <View>
            <Text className="text-gray-500 text-xs">Distance</Text>
            <Text className="text-white text-sm font-medium">{station.distance}km</Text>
          </View>
          <View>
            <Text className="text-gray-500 text-xs">Price</Text>
            <Text className="text-white text-sm font-medium">₺{station.pricePerKwh}</Text>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
} 