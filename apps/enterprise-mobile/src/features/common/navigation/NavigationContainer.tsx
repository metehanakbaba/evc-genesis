/**
 * 🧭 Main Navigation Container
 * 
 * Root navigation setup with auth integration (simplified for React 19 compatibility)
 */

import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuthGuard } from './AuthGuard';
import { AuthNavigator } from '../../../../auth/AuthNavigator';
import { MainTabNavigator } from './stacks/MainTabNavigator';

// ============================================================================
// MAIN NAVIGATION CONTAINER (SIMPLIFIED)
// ============================================================================

export function AppNavigationContainer() {
  const { isAuthenticated, isLoading, completeAuth } = useAuthGuard();

  const handleAuthComplete = () => {
    console.log('🎉 Auth flow completed - transitioning to main app');
    // Use the completeAuth method to properly set authentication state
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

  // Simple conditional rendering without NavigationContainer for React 19 compatibility
  return isAuthenticated ? (
    <MainTabNavigator />
  ) : (
    <AuthNavigator onAuthComplete={handleAuthComplete} />
  );
} 