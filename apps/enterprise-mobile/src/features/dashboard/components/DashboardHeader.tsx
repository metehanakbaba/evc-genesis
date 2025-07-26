/**
 * 🏠 Dashboard Header Component
 * 
 * Header with greeting and notifications
 */

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthGuard } from '../../common/navigation/AuthGuard';
import { useGreeting } from '../hooks';
import { SPACING } from '../../../shared/constants';

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
    <View style={{ 
      paddingHorizontal: SPACING.lg, 
      paddingTop: SPACING.lg, 
      paddingBottom: SPACING.md 
    }}>
      {/* Time-based Greeting Row */}
      <View className="flex-row items-center justify-between" style={{ marginBottom: SPACING.sm }}>
        <View className="flex-row items-center">
          <LinearGradient
            colors={greeting.colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
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
              size={20} 
              color="#FFF" 
            />
          </LinearGradient>
          <View>
            <Text className="text-white text-xl font-bold">
              {greeting.message}
            </Text>
            <Text className="text-gray-400 text-sm">
              {user?.name || 'Driver'} • Ready to charge
            </Text>
          </View>
        </View>
        
        {/* Profile & Notifications */}
        <View className="flex-row items-center" style={{ gap: SPACING.sm }}>
          {/* Notification Bell */}
          <Pressable
            onPress={handleNotificationsPress}
            className="w-10 h-10 rounded-2xl items-center justify-center bg-gray-800 active:scale-95"
            style={{
              shadowColor: '#10B981',
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 2
            }}
          >
            <Ionicons name="notifications" size={18} color="#10B981" />
            {/* Notification Badge */}
            <View 
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full items-center justify-center"
              style={{ backgroundColor: '#EF4444' }}
            >
              <Text className="text-white text-xs font-bold">2</Text>
            </View>
          </Pressable>
          
          {/* Profile */}
          <Pressable
            onPress={handleProfilePress}
            className="w-10 h-10 rounded-2xl items-center justify-center bg-gray-800 active:scale-95"
          >
            <Ionicons name="person-circle" size={20} color="#8B5CF6" />
          </Pressable>
        </View>
      </View>
    </View>
  );
} 