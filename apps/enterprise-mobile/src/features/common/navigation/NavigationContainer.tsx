/**
 * 🧭 Main Navigation Container
 * 
 * Root navigation setup with auth integration
 */

import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuthGuard } from './AuthGuard';
import { AuthNavigator } from '../../../../auth/AuthNavigator';
import { MainStackNavigator } from './stacks/MainStackNavigator';

// ============================================================================
// SIMPLE NAVIGATION CONTAINER
// ============================================================================

export function AppNavigationContainer() {
  const { isAuthenticated, isLoading, completeAuth } = useAuthGuard();

  const handleAuthComplete = () => {
    console.log('🎉 Auth flow completed - transitioning to main app');
    completeAuth({
      name: 'EV Driver',
      email: 'driver@example.com'
    });
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-900 items-center justify-center">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-white text-lg">Loading...</Text>
      </SafeAreaView>
    );
  }

  // Simple conditional rendering - works with React 19
  return isAuthenticated ? (
    <MainStackNavigator />
  ) : (
    <AuthNavigator onAuthComplete={handleAuthComplete} />
  );
} 