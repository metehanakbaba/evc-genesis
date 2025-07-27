/**
 * 🏠 Premium Animated Dashboard Header
 * 
 * Enhanced with smooth animations and engaging interactions
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, Pressable, Animated, Easing } from 'react-native';
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

  // Animation references
  const backgroundOpacity = useRef(new Animated.Value(0)).current;
  const backgroundProgress = useRef(new Animated.Value(0)).current; // For color interpolations
  const greetingOpacity = useRef(new Animated.Value(1)).current;
  const notificationButtonScale = useRef(new Animated.Value(1)).current;
  const profileButtonScale = useRef(new Animated.Value(1)).current;

  // Smooth background transition
  useEffect(() => {
    // Background opacity (native driver for opacity)
    Animated.timing(backgroundOpacity, {
      toValue: hasBackground ? 1 : 0,
      duration: 400,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    // Background progress (JS driver for color interpolations)
    Animated.timing(backgroundProgress, {
      toValue: hasBackground ? 1 : 0,
      duration: 400,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    // Removed content scaling - cleaner look without side gaps

    // Greeting text opacity change
    Animated.timing(greetingOpacity, {
      toValue: hasBackground ? 0.9 : 1,
      duration: 250,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [hasBackground]);

  const handleNotificationsPress = () => {
    // Button press animation
    Animated.sequence([
      Animated.timing(notificationButtonScale, {
        toValue: 0.9,
        duration: 100,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.spring(notificationButtonScale, {
        toValue: 1,
        tension: 300,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start();
    
    console.log('Notifications pressed');
  };

  const handleProfilePress = () => {
    // Button press animation
    Animated.sequence([
      Animated.timing(profileButtonScale, {
        toValue: 0.9,
        duration: 100,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.spring(profileButtonScale, {
        toValue: 1,
        tension: 300,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start();
    
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
      {/* Smooth Conditional Background */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: backgroundOpacity,
        }}
        pointerEvents="none"
      >
        <LinearGradient
          colors={[
            'rgba(17, 24, 39, 0.98)', 
            'rgba(31, 41, 55, 0.95)',
            'rgba(15, 23, 42, 0.98)'
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            flex: 1,
            borderRadius: 0,
          }}
        />
        
                 {/* Subtle animated border */}
         <Animated.View
           style={{
             position: 'absolute',
             bottom: 0,
             left: SPACING.lg,
             right: SPACING.lg,
             height: 1,
             opacity: backgroundProgress.interpolate({
               inputRange: [0, 1],
               outputRange: [0, 0.3],
             }),
             backgroundColor: 'rgba(255, 255, 255, 0.1)',
           }}
         />
      </Animated.View>

      {/* Main Content with Enhanced Animations */}
      <Animated.View 
        className="flex-row items-center justify-between"
        style={{
          opacity: greetingOpacity,
        }}
      >
        {/* Enhanced Greeting Section */}
        <View className="flex-1">
          <Animated.Text 
            className="text-white text-2xl font-semibold"
                         style={{
               transform: [{
                 translateY: backgroundProgress.interpolate({
                   inputRange: [0, 1],
                   outputRange: [0, -2],
                 })
               }],
               opacity: greetingOpacity,
             }}
          >
            {greeting.message}
          </Animated.Text>
          
                     <Animated.View 
             className="flex-row items-center mt-1"
             style={{
               transform: [{
                 translateY: backgroundProgress.interpolate({
                   inputRange: [0, 1],
                   outputRange: [0, -1],
                 })
               }],
             }}
          >
                         <Animated.View 
               className="w-2 h-2 rounded-full mr-2"
               style={{ 
                 backgroundColor: '#10B981',
                 transform: [{
                   scale: backgroundProgress.interpolate({
                     inputRange: [0, 1],
                     outputRange: [1, 0.9],
                   })
                 }],
               }}
            />
            <Animated.Text 
              className="text-gray-400 text-sm"
              style={{
                opacity: greetingOpacity,
              }}
            >
              {user?.name || 'Mehmet Yılmaz'}
            </Animated.Text>
          </Animated.View>
        </View>
        
        {/* Enhanced Action Buttons */}
        <View className="flex-row items-center" style={{ gap: SPACING.sm }}>
          {/* Animated Notifications Button */}
          <Pressable
            onPress={handleNotificationsPress}
            style={({ pressed }) => [
              {
                transform: [
                  { scale: pressed ? 0.95 : 1 },
                  { scale: notificationButtonScale }
                ]
              }
            ]}
          >
            <Animated.View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                                 backgroundColor: backgroundProgress.interpolate({
                   inputRange: [0, 1],
                   outputRange: ['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.12)'],
                 }),
                 borderWidth: 1,
                 borderColor: backgroundProgress.interpolate({
                   inputRange: [0, 1],
                   outputRange: ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.15)'],
                 }),
                 shadowOpacity: backgroundProgress.interpolate({
                   inputRange: [0, 1],
                   outputRange: [0, 0.1],
                 }),
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 2 },
                elevation: 2,
              }}
            >
                             <Animated.View
                 style={{
                   transform: [{
                     rotate: backgroundProgress.interpolate({
                       inputRange: [0, 1],
                       outputRange: ['0deg', '5deg'],
                     })
                   }],
                 }}
              >
                <Ionicons name="notifications-outline" size={20} color="#FFF" />
              </Animated.View>
              
                             {/* Animated notification badge */}
               <Animated.View 
                 style={{
                   position: 'absolute',
                   top: 6,
                   right: 6,
                   width: 8,
                   height: 8,
                   borderRadius: 4,
                   backgroundColor: '#EF4444',
                   transform: [{
                     scale: backgroundProgress.interpolate({
                       inputRange: [0, 1],
                       outputRange: [1, 1.2],
                     })
                   }],
                   shadowColor: '#EF4444',
                   shadowOpacity: 0.6,
                   shadowRadius: 4,
                   elevation: 2,
                 }} 
               />
            </Animated.View>
          </Pressable>

          {/* Enhanced Profile Button */}
          <Pressable
            onPress={handleProfilePress}
            style={({ pressed }) => [
              {
                transform: [
                  { scale: pressed ? 0.95 : 1 },
                  { scale: profileButtonScale }
                ]
              }
            ]}
          >
            <Animated.View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                                 backgroundColor: backgroundProgress.interpolate({
                   inputRange: [0, 1],
                   outputRange: ['rgba(139, 92, 246, 0.15)', 'rgba(139, 92, 246, 0.25)'],
                 }),
                 borderWidth: 1,
                 borderColor: backgroundProgress.interpolate({
                   inputRange: [0, 1],
                   outputRange: ['rgba(139, 92, 246, 0.25)', 'rgba(139, 92, 246, 0.4)'],
                 }),
                 shadowColor: '#8B5CF6',
                 shadowOpacity: backgroundProgress.interpolate({
                   inputRange: [0, 1],
                   outputRange: [0.1, 0.2],
                 }),
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 2 },
                elevation: 3,
              }}
            >
                             <Animated.View
                 style={{
                   transform: [{
                     scale: backgroundProgress.interpolate({
                       inputRange: [0, 1],
                       outputRange: [1, 1.1],
                     })
                   }],
                 }}
              >
                <Ionicons name="person-outline" size={18} color="#A78BFA" />
              </Animated.View>
            </Animated.View>
          </Pressable>
                 </View>
       </Animated.View>
     </View>
  );
} 