/**
 * 👋 Welcome Screen
 * 
 * Initial screen for unauthenticated users
 */

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootStackScreenProps } from '../navigation/types';

type Props = RootStackScreenProps<'Welcome'>;

export function WelcomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <View className="flex-1 px-6 py-8 justify-center items-center space-y-8">
        {/* App Logo/Title */}
        <View className="items-center space-y-4">
          <View className="w-24 h-24 bg-blue-500 rounded-full items-center justify-center">
            <Text className="text-white text-3xl font-bold">⚡</Text>
          </View>
          <Text className="text-4xl font-bold text-white text-center">
            EV Charging
          </Text>
          <Text className="text-gray-300 text-lg text-center max-w-sm">
            Find, reserve, and charge your electric vehicle at thousands of stations
          </Text>
        </View>

        {/* Features */}
        <View className="space-y-4 w-full max-w-sm">
          <View className="flex-row items-center space-x-3">
            <View className="w-2 h-2 bg-blue-400 rounded-full" />
            <Text className="text-gray-300">Real-time station availability</Text>
          </View>
          <View className="flex-row items-center space-x-3">
            <View className="w-2 h-2 bg-emerald-400 rounded-full" />
            <Text className="text-gray-300">Instant charging session start</Text>
          </View>
          <View className="flex-row items-center space-x-3">
            <View className="w-2 h-2 bg-purple-400 rounded-full" />
            <Text className="text-gray-300">Digital wallet integration</Text>
          </View>
        </View>

        {/* Actions */}
        <View className="space-y-4 w-full max-w-sm">
          <Pressable
            onPress={() => navigation.navigate('Auth', { screen: 'Login' })}
            className="bg-blue-500 py-4 px-8 rounded-xl items-center active:bg-blue-600"
          >
            <Text className="text-white font-semibold text-lg">Get Started</Text>
          </Pressable>
          
          <Pressable
            onPress={() => navigation.navigate('Auth', { screen: 'Register' })}
            className="border border-gray-600 py-4 px-8 rounded-xl items-center active:bg-gray-800"
          >
            <Text className="text-gray-300 font-semibold text-lg">Create Account</Text>
          </Pressable>
        </View>

        <Text className="text-gray-500 text-sm text-center">
          Join thousands of EV drivers across the network
        </Text>
      </View>
    </SafeAreaView>
  );
} 