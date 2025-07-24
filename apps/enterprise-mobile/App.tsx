import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FloatingStatCard, NavigationGlassCard } from './shared/components';
import { AuthNavigator } from './auth/AuthNavigator';

import './global.css';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthComplete = () => {
    setIsAuthenticated(true);
  };

  // Show auth flow if not authenticated
  if (!isAuthenticated) {
    return <AuthNavigator onAuthComplete={handleAuthComplete} />;
  }

  // Main dashboard after authentication
  const stats = [
    {
      title: "Active Stations",
      value: "156", 
      variant: "blue" as const,
      trend: "+8 new this week",
      description: "CCS, CHAdeMO & Type2 connectors",
      icon: (
        <View className="w-6 h-6 bg-blue-400 rounded-full items-center justify-center">
          <Text className="text-white text-xs font-bold">⚡</Text>
        </View>
      )
    },
    {
      title: "Live Sessions", 
      value: "89",
      variant: "emerald" as const,
      trend: "↗ 12% vs yesterday",
      description: "Real-time charging sessions",
      icon: (
        <View className="w-6 h-6 bg-emerald-400 rounded-full items-center justify-center">
          <Text className="text-white text-xs font-bold">🔋</Text>
        </View>
      )
    },
    {
      title: "Active Users",
      value: "2.1K",
      variant: "purple" as const, 
      trend: "+156 this month",
      description: "Registered mobile users",
      icon: (
        <View className="w-6 h-6 bg-purple-400 rounded-full items-center justify-center">
          <Text className="text-white text-xs font-bold">👥</Text>
        </View>
      )
    },
    {
      title: "Wallet Volume",
      value: "₺45.2K", 
      variant: "teal" as const,
      trend: "+23% revenue growth",
      description: "Daily transaction volume",
      icon: (
        <View className="w-6 h-6 bg-teal-400 rounded-full items-center justify-center">
          <Text className="text-white text-xs font-bold">💰</Text>
        </View>
      )
    }
  ];

  const navigationCards = [
    {
      title: "Charging Stations",
      description: "Monitor infrastructure and real-time status",
      variant: "blue" as const,
      badge: "156 Active",
      icon: (
        <View className="w-6 h-6 bg-blue-400 rounded-full items-center justify-center">
          <Text className="text-white text-xs font-bold">📍</Text>
        </View>
      ),
      onPress: () => console.log('Navigate to stations')
    },
    {
      title: "Live Operations", 
      description: "Real-time session monitoring and control",
      variant: "emerald" as const,
      badge: "89 Sessions",
      icon: (
        <View className="w-6 h-6 bg-emerald-400 rounded-full items-center justify-center">
          <Text className="text-white text-xs font-bold">⚡</Text>
        </View>
      ),
      onPress: () => console.log('Navigate to sessions')
    },
    {
      title: "User Management",
      description: "Customer accounts and user analytics", 
      variant: "purple" as const,
      badge: "2.1K Users",
      icon: (
        <View className="w-6 h-6 bg-purple-400 rounded-full items-center justify-center">
          <Text className="text-white text-xs font-bold">👤</Text>
        </View>
      ),
      onPress: () => console.log('Navigate to users')
    },
    {
      title: "PLN Wallet",
      description: "Financial operations and transactions",
      variant: "teal" as const, 
      badge: "₺45.2K Volume",
      icon: (
        <View className="w-6 h-6 bg-teal-400 rounded-full items-center justify-center">
          <Text className="text-white text-xs font-bold">💳</Text>
        </View>
      ),
      onPress: () => console.log('Navigate to wallets')
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <ScrollView className="flex-1">
        <View className="px-6 py-8 space-y-8">
          {/* Header with Auth Status */}
          <View className="space-y-2 text-center items-center">
            <Text className="text-3xl font-bold text-white">
              EV Command Center
            </Text>
            <Text className="text-gray-300 text-center">
              Real-time network monitoring & control
            </Text>
            
            {/* Live Indicator */}
            <View className="flex-row items-center justify-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-400/25 mt-4">
              <View className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
              <Text className="text-emerald-300 text-sm font-medium">Live Data Stream</Text>
            </View>
          </View>

          {/* Stats Grid */}
          <View className="space-y-4">
            <Text className="text-xl font-semibold text-white">
              Network Overview
            </Text>
            <View className="space-y-4">
              {stats.map((stat, index) => (
                <FloatingStatCard
                  key={stat.title}
                  {...stat}
                />
              ))}
            </View>
          </View>

          {/* Management Navigation */}
          <View className="space-y-4">
            <Text className="text-xl font-semibold text-white">
              Management Center
            </Text>
            <View className="space-y-4">
              {navigationCards.map((card, index) => (
                <NavigationGlassCard
                  key={card.title}
                  {...card}
                />
              ))}
            </View>
          </View>

          {/* Auth Demo Button */}
          <View className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10">
            <Text className="text-white text-sm font-medium mb-2">Demo Controls:</Text>
            <View 
              className="px-4 py-2 rounded-lg bg-gray-500/20 border border-gray-400/25"
              onTouchEnd={() => setIsAuthenticated(false)}
            >
              <Text className="text-gray-300 text-sm text-center">
                Logout (Test Auth Flow)
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
