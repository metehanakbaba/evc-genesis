/**
 * 🏠 Clean Dashboard Header
 * 
 * Simple and clean header design for custom app
 */

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthGuard } from '../../common/navigation/AuthGuard';
import { useGreeting } from '../hooks';
import { SPACING } from '../../../shared/constants';

interface DashboardHeaderProps {
  hasBackground?: boolean;
  statusBarHeight?: number;
}

export function DashboardHeader({ hasBackground = false, statusBarHeight = 0 }: DashboardHeaderProps) {
  const { user } = useAuthGuard();
  const greeting = useGreeting();

  const handleNotificationsPress = () => {
    console.log('Notifications pressed');
  };

  const handleProfilePress = () => {
    console.log('Profile pressed');
  };

  return (
    <View
      style={{ 
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.xl + statusBarHeight,
        paddingBottom: SPACING.md
      }}
    >
      {/* Conditional Background */}
      {hasBackground && (
        <LinearGradient
          colors={['rgba(17, 24, 39, 0.95)', 'rgba(31, 41, 55, 0.9)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      )}
      {/* Main Content */}
      <View className="flex-row items-center justify-between">
        {/* Greeting Section */}
        <View className="flex-1">
          <Text className="text-white text-2xl font-semibold">
            {greeting.message}
          </Text>
          <View className="flex-row items-center mt-1">
            <View 
              className="w-2 h-2 rounded-full mr-2"
              style={{ backgroundColor: '#10B981' }}
            />
            <Text className="text-gray-400 text-sm">
              {user?.name || 'Mehmet Yılmaz'}
            </Text>
          </View>
        </View>
        
        {/* Action Buttons */}
        <View className="flex-row items-center" style={{ gap: SPACING.sm }}>
          {/* Notifications */}
          <Pressable
            onPress={handleNotificationsPress}
            className="active:scale-95"
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }}
          >
            <Ionicons name="notifications-outline" size={20} color="#FFF" />
          </Pressable>

          {/* Profile */}
          <Pressable
            onPress={handleProfilePress}
            className="active:scale-95"
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(139, 92, 246, 0.2)',
              borderWidth: 1,
              borderColor: 'rgba(139, 92, 246, 0.3)',
            }}
          >
            <Ionicons name="person-outline" size={18} color="#A78BFA" />
          </Pressable>
                 </View>
      </View>
    </View>
  );
} 