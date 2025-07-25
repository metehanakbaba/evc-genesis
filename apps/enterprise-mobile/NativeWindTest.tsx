import React from 'react';
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function NativeWindTest() {
  return (
    <View className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100">
      <View className="flex-1 justify-center items-center p-6">
        <View className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <Text className="text-3xl font-bold text-gray-900 text-center mb-2">
            EV Charging
          </Text>
          <Text className="text-lg text-gray-600 text-center mb-6">
            Enterprise Mobile
          </Text>
          <View className="bg-blue-500 rounded-lg p-4 mb-4">
            <Text className="text-white text-center font-semibold">
              NativeWind is working! 🎉
            </Text>
          </View>
          <View className="bg-green-500 rounded-lg p-4 mb-4">
            <Text className="text-white text-center font-semibold">
              Tailwind CSS classes are applied correctly
            </Text>
          </View>
          <View className="bg-purple-500 rounded-lg p-4">
            <Text className="text-white text-center font-semibold">
              Monorepo setup is complete ✅
            </Text>
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}