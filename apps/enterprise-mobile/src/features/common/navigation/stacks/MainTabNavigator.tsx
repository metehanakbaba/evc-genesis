/**
 * 🔋 Main Tab Navigator - Clean Architecture Version
 * 
 * Modern, clean implementation using feature-based architecture
 */

import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DashboardScreen } from '../../../dashboard';

// ============================================================================
// MAIN TAB NAVIGATOR - Transparent Bottom SafeArea
// ============================================================================

export function MainTabNavigator() {
  return (
    <SafeAreaView className="flex-1" edges={[]} style={{ backgroundColor: 'transparent' }}>
      <DashboardScreen />
    </SafeAreaView>
  );
} 