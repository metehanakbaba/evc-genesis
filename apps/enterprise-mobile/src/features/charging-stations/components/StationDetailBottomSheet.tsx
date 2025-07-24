/**
 * 📋 Station Detail Bottom Sheet
 * 
 * Detailed view for charging station information and actions
 */

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StationDetailBottomSheetProps } from '../types/station.types';
import { SPACING } from '../../../shared/constants/spacing';

export function StationDetailBottomSheet({ 
  station, 
  onClose, 
  onReserve, 
  onNavigate 
}: StationDetailBottomSheetProps) {
  if (!station) return null;

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
    <View className="absolute bottom-0 left-0 right-0">
      <LinearGradient
        colors={['transparent', '#000000AA']}
        style={{ height: 20 }}
      />
      <View 
        className="bg-gray-900 rounded-t-3xl"
        style={{ 
          paddingTop: SPACING.lg,
          paddingHorizontal: SPACING.lg,
          paddingBottom: SPACING.xl,
          borderTopWidth: 1,
          borderTopColor: '#374151'
        }}
      >
        {/* Handle Bar */}
        <View 
          className="w-12 h-1 bg-gray-600 rounded-full self-center" 
          style={{ marginBottom: SPACING.lg }} 
        />
        
        {/* Station Header */}
        <View className="flex-row items-start justify-between" style={{ marginBottom: SPACING.lg }}>
          <View className="flex-1">
            <View className="flex-row items-center" style={{ marginBottom: SPACING.sm }}>
              <Text className="text-white text-xl font-bold tracking-tight">{station.name}</Text>
              {station.isSuperfast && (
                <View 
                  style={{
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                    backgroundColor: '#EF444420',
                    borderRadius: 6,
                    marginLeft: SPACING.sm
                  }}
                >
                  <Text className="text-red-400 text-xs font-bold">SUPERFAST</Text>
                </View>
              )}
            </View>
            <Text className="text-gray-400 text-sm" style={{ marginBottom: SPACING.xs }}>
              {station.address}
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="star" size={14} color="#F59E0B" />
              <Text className="text-gray-300 text-sm ml-1">{station.rating}</Text>
              <Text className="text-gray-500 text-sm ml-2">• {station.distance}km away</Text>
            </View>
          </View>
          <Pressable
            onPress={onClose}
            className="w-8 h-8 rounded-full items-center justify-center bg-gray-800"
          >
            <Ionicons name="close" size={16} color="#9CA3AF" />
          </Pressable>
        </View>

        {/* Status & Availability */}
        <View 
          className="rounded-2xl"
          style={{ 
            padding: SPACING.md,
            backgroundColor: '#1F2937',
            borderWidth: 1,
            borderColor: '#374151',
            marginBottom: SPACING.lg
          }}
        >
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <View 
                className="w-3 h-3 rounded-full"
                style={{ 
                  backgroundColor: getStationMarkerColor(station.status),
                  marginRight: SPACING.sm
                }}
              />
              <Text className="text-white text-sm font-medium capitalize">
                {station.status}
              </Text>
            </View>
            <Text className="text-gray-300 text-sm">
              {station.availablePorts}/{station.totalPorts} ports available
            </Text>
          </View>
          
          <View className="flex-row justify-between mt-3">
            <View>
              <Text className="text-gray-400 text-xs">Max Power</Text>
              <Text className="text-white text-sm font-medium">{station.maxPower}kW</Text>
            </View>
            <View>
              <Text className="text-gray-400 text-xs">Price</Text>
              <Text className="text-white text-sm font-medium">₺{station.pricePerKwh}/kWh</Text>
            </View>
            <View>
              <Text className="text-gray-400 text-xs">Network</Text>
              <Text className="text-white text-sm font-medium">{station.network}</Text>
            </View>
            <View>
              <Text className="text-gray-400 text-xs">ETA</Text>
              <Text className="text-white text-sm font-medium">{station.estimatedTime}min</Text>
            </View>
          </View>
        </View>

        {/* Connectors */}
        <View style={{ marginBottom: SPACING.lg }}>
          <Text className="text-gray-400 text-sm font-medium" style={{ marginBottom: SPACING.sm }}>
            Available Connectors
          </Text>
          <View className="flex-row flex-wrap" style={{ gap: SPACING.sm }}>
            {station.connectorTypes.map((connector, index) => (
              <View
                key={index}
                style={{
                  paddingHorizontal: SPACING.sm,
                  paddingVertical: SPACING.xs,
                  backgroundColor: '#374151',
                  borderRadius: 8
                }}
              >
                <Text className="text-gray-300 text-xs font-medium">{connector}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row" style={{ gap: SPACING.md }}>
          <Pressable
            onPress={() => onNavigate(station)}
            className="flex-1 overflow-hidden active:scale-98"
            style={{
              borderRadius: 16,
              shadowColor: '#3B82F6',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 4
            }}
          >
            <LinearGradient
              colors={['#3B82F6', '#1E40AF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                paddingVertical: SPACING.md,
                alignItems: 'center',
                borderRadius: 16
              }}
            >
              <View className="flex-row items-center">
                <Ionicons name="navigate" size={18} color="#FFF" />
                <Text className="text-white text-sm font-bold ml-2">Navigate</Text>
              </View>
            </LinearGradient>
          </Pressable>

          {station.status === 'available' && (
            <Pressable
              onPress={() => onReserve(station)}
              className="flex-1 overflow-hidden active:scale-98"
              style={{
                borderRadius: 16,
                shadowColor: '#10B981',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
                elevation: 4
              }}
            >
              <LinearGradient
                colors={['#10B981', '#047857']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  paddingVertical: SPACING.md,
                  alignItems: 'center',
                  borderRadius: 16
                }}
              >
                <View className="flex-row items-center">
                  <Ionicons name="time" size={18} color="#FFF" />
                  <Text className="text-white text-sm font-bold ml-2">Reserve</Text>
                </View>
              </LinearGradient>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
} 