/**
 * 🏠 Action Grid Component
 * 
 * Grid of action buttons for quick access
 */

import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ActionGridItem } from '../types';
import { SPACING } from '../../../shared/constants';

interface ActionGridProps {
  items: ActionGridItem[];
}

export function ActionGrid({ items }: ActionGridProps) {
  return (
    <View style={{ paddingHorizontal: SPACING.lg, marginBottom: SPACING.lg }}>
      <View className="flex-row" style={{ gap: SPACING.sm, marginBottom: SPACING.md }}>
        {items.map((item) => (
          <Pressable
            key={item.id}
            onPress={item.onPress}
            className="flex-1 overflow-hidden active:scale-96"
            style={{ 
              borderRadius: 18,
              shadowColor: item.shadowColor,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 4
            }}
          >
            {/* Background Image */}
            {item.backgroundImage && (
              <Image
                source={item.backgroundImage}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0.5,
                  borderRadius: 18,
                }}
                resizeMode="cover"
              />
            )}
            
            {/* Gradient Overlays */}
            <LinearGradient
              colors={['rgba(31,41,55,0.8)', 'rgba(17,24,39,0.8)', 'rgba(15,23,42,0.8)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 18 }}
            />
            <LinearGradient
              colors={[`${item.color}33`, `${item.color}20`, `${item.color}10`]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1.2, y: 0.8 }}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 18 }}
            />
            
            <View style={{ padding: SPACING.md, borderWidth: 1, borderColor: `${item.color}20`, borderRadius: 18 }}>
              {/* Icon */}
              <LinearGradient
                colors={[`${item.color}30`, `${item.color}20`, `${item.color}10`]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: SPACING.sm,
                  borderWidth: 1,
                  borderColor: `${item.color}25`
                }}
              >
                <Ionicons name={item.icon as any} size={20} color={item.color} />
              </LinearGradient>
              
              {/* Content */}
              <Text className="text-white text-base font-bold tracking-tight" style={{ marginBottom: SPACING.xs }}>
                {item.title}
              </Text>
              <Text className="text-gray-400 text-xs leading-relaxed" style={{ marginBottom: SPACING.sm }}>
                {item.subtitle}
              </Text>
              
              {/* Status */}
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View 
                    className="w-1.5 h-1.5 rounded-full" 
                    style={{ 
                      backgroundColor: item.statusColor,
                      marginRight: SPACING.xs,
                      shadowColor: item.shadowColor,
                      shadowOpacity: 0.6,
                      shadowRadius: 2
                    }} 
                  />
                  <Text className="text-xs font-medium" style={{ color: item.statusColor }}>
                    {item.statusText}
                  </Text>
                </View>
                {item.additionalInfo && (
                  <View className="flex-row items-center">
                    <Ionicons name="flash" size={10} color={item.additionalInfoColor} />
                    <Text className="text-xs font-medium" style={{ 
                      marginLeft: 2, 
                      color: item.additionalInfoColor 
                    }}>
                      {item.additionalInfo}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
} 