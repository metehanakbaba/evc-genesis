/**
 * 🏠 Dashboard Header Component
 * 
 * Header with greeting and notifications - Enhanced Integrated Design
 */

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthGuard } from '../../common/navigation/AuthGuard';
import { useGreeting } from '../hooks';
import { SPACING } from '../../../shared/constants';
import { NotificationCard } from '../../../../shared/components';

export function DashboardHeader() {
  const { user } = useAuthGuard();
  const greeting = useGreeting();

  const handleNotificationsPress = () => {
    console.log('Notifications pressed');
  };

  const handleProfilePress = () => {
    console.log('Profile pressed');
  };

  return (
    <LinearGradient
      colors={['#1F2937', '#111827', '#1F2937']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ 
        paddingHorizontal: SPACING.lg, 
        paddingTop: SPACING.lg,
        paddingBottom: SPACING.sm
      }}
    >
      {/* Main Header Row */}
      <View className="flex-row items-center justify-between" style={{ marginBottom: SPACING.md }}>
        {/* Enhanced Greeting Section */}
        <View className="flex-row items-center flex-1">
          <LinearGradient
            colors={greeting.colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: 42,
              height: 42,
              borderRadius: 14,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: SPACING.md,
              shadowColor: greeting.shadowColor,
              shadowOpacity: 0.4,
              shadowRadius: 8,
              elevation: 4
            }}
          >
            <Ionicons 
              name={greeting.icon as any} 
              size={22} 
              color="#FFF" 
            />
          </LinearGradient>
          <View className="flex-1">
            <Text className="text-white text-xl font-bold tracking-tight">
              {greeting.message}
            </Text>
            <View className="flex-row items-center mt-1">
              <View 
                className="w-2 h-2 rounded-full mr-2"
                style={{ backgroundColor: '#10B981' }}
              />
              <Text className="text-gray-400 text-sm">
                {user?.name || 'Mehmet Yılmaz'} • Ready to charge
              </Text>
            </View>
          </View>
        </View>
        
        {/* User Profile Icon */}
        <Pressable
          onPress={handleProfilePress}
          className="active:scale-95"
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#8B5CF6',
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 4
          }}
        >
          <LinearGradient
            colors={['rgba(139, 92, 246, 0.2)', 'rgba(124, 58, 237, 0.1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 22,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2,
              borderColor: '#8B5CF6'
            }}
          >
            <Ionicons name="person" size={20} color="#8B5CF6" />
          </LinearGradient>
        </Pressable>
      </View>
    </LinearGradient>
  );
} 