import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatCard, NavigationCard, I18nProvider, useI18n, LanguageSelector } from './src/features';
import { AuthNavigator } from './auth/AuthNavigator';

import './global.css';

function AppContent() {
  const { t, isLoading } = useI18n();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthComplete = () => {
    setIsAuthenticated(true);
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-900 items-center justify-center">
        <Text className="text-white text-lg">{t.common.loading}</Text>
      </SafeAreaView>
    );
  }

  // Show auth flow if not authenticated
  if (!isAuthenticated) {
    return <AuthNavigator onAuthComplete={handleAuthComplete} />;
  }

  // Main dashboard after authentication
  const stats = [
    {
      title: t.stats.activeStations,
      value: "156", 
      variant: "blue" as const,
      trend: `+8 ${t.stats.newThisWeek}`,
      description: t.stats.ccsDescription,
      icon: (
        <View className="w-6 h-6 bg-blue-400 rounded-full items-center justify-center">
          <Text className="text-white text-xs font-bold">⚡</Text>
        </View>
      )
    },
    {
      title: t.stats.activeLiveSessions, 
      value: "89",
      variant: "emerald" as const,
      trend: `↗ 12% ${t.stats.vsYesterday}`,
      description: t.stats.realTimeDescription,
      icon: (
        <View className="w-6 h-6 bg-emerald-400 rounded-full items-center justify-center">
          <Text className="text-white text-xs font-bold">🔋</Text>
        </View>
      )
    },
    {
      title: t.stats.activeUsers,
      value: "2.1K",
      variant: "purple" as const, 
      trend: `+156 ${t.stats.thisMonth}`,
      description: t.stats.registeredUsersDescription,
      icon: (
        <View className="w-6 h-6 bg-purple-400 rounded-full items-center justify-center">
          <Text className="text-white text-xs font-bold">👥</Text>
        </View>
      )
    },
    {
      title: t.stats.walletVolume,
      value: "₺45.2K", 
      variant: "teal" as const,
      trend: `+23% ${t.stats.revenueGrowth}`,
      description: t.stats.dailyVolumeDescription,
      icon: (
        <View className="w-6 h-6 bg-teal-400 rounded-full items-center justify-center">
          <Text className="text-white text-xs font-bold">💰</Text>
        </View>
      )
    }
  ];

  const navigationCards = [
    {
      title: t.navigation.chargingStations.title,
      description: t.navigation.chargingStations.description,
      variant: "blue" as const,
      badge: `156 ${t.navigation.chargingStations.badge}`,
      icon: (
        <View className="w-6 h-6 bg-blue-400 rounded-full items-center justify-center">
          <Text className="text-white text-xs font-bold">📍</Text>
        </View>
      ),
      onPress: () => console.log('Navigate to stations')
    },
    {
      title: t.navigation.liveOperations.title, 
      description: t.navigation.liveOperations.description,
      variant: "emerald" as const,
      badge: `89 ${t.navigation.liveOperations.badge}`,
      icon: (
        <View className="w-6 h-6 bg-emerald-400 rounded-full items-center justify-center">
          <Text className="text-white text-xs font-bold">⚡</Text>
        </View>
      ),
      onPress: () => console.log('Navigate to sessions')
    },
    {
      title: t.navigation.userManagement.title,
      description: t.navigation.userManagement.description, 
      variant: "purple" as const,
      badge: `2.1K ${t.navigation.userManagement.badge}`,
      icon: (
        <View className="w-6 h-6 bg-purple-400 rounded-full items-center justify-center">
          <Text className="text-white text-xs font-bold">👤</Text>
        </View>
      ),
      onPress: () => console.log('Navigate to users')
    },
    {
      title: t.navigation.plnWallet.title,
      description: t.navigation.plnWallet.description,
      variant: "teal" as const, 
      badge: `₺45.2K ${t.navigation.plnWallet.badge}`,
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
          {/* Header with Auth Status and Language Selector */}
          <View className="space-y-4 text-center items-center">
            <View className="space-y-2 text-center items-center">
              <Text className="text-3xl font-bold text-white">
                {t.appTitle}
              </Text>
              <Text className="text-gray-300 text-center">
                {t.appSubtitle}
              </Text>
            </View>
            
            {/* Language Selector */}
            <LanguageSelector variant="compact" />
            
            {/* Live Indicator */}
            <View className="flex-row items-center justify-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-400/25">
              <View className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
              <Text className="text-emerald-300 text-sm font-medium">{t.liveDataStream}</Text>
            </View>
          </View>

          {/* Stats Grid */}
          <View className="space-y-4">
            <Text className="text-xl font-semibold text-white">
              {t.networkOverview}
            </Text>
            <View className="space-y-4">
              {stats.map((stat, index) => (
                <StatCard
                  key={stat.title}
                  {...stat}
                />
              ))}
            </View>
          </View>

          {/* Management Navigation */}
          <View className="space-y-4">
            <Text className="text-xl font-semibold text-white">
              {t.managementCenter}
            </Text>
            <View className="space-y-4">
              {navigationCards.map((card, index) => (
                <NavigationCard
                  key={card.title}
                  {...card}
                />
              ))}
            </View>
          </View>

          {/* Auth Demo Button */}
          <View className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10">
            <Text className="text-white text-sm font-medium mb-2">{t.demoControls}</Text>
            <View 
              className="px-4 py-2 rounded-lg bg-gray-500/20 border border-gray-400/25"
              onTouchEnd={() => setIsAuthenticated(false)}
            >
              <Text className="text-gray-300 text-sm text-center">
                {t.logout}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}
