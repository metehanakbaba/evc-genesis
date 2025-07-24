/**
 * 🔋 Main Tab Navigator - EV Charging Client App
 * 
 * Apple-inspired design with sophisticated layouts and personalized experience
 */

import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthGuard } from '../AuthGuard';
import { StatCard, NavigationCard, useI18n, LanguageSelector } from '../../../../features';

// ============================================================================
// SEMANTIC SPACING SYSTEM
// ============================================================================

const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

// ============================================================================
// DESIGN SYSTEM COLOR PSYCHOLOGY (from admin design guide)
// ============================================================================

type TabName = 'Home' | 'FindStations' | 'MyCharging' | 'Wallet' | 'Profile';

const DESIGN_SYSTEM_COLORS = {
  Home: {
    icon: 'home',
    family: 'Ionicons' as const,
    primary: '#3B82F6',    // Blue - Trust, reliability (infrastructure)
    psychology: 'Stability, technology, professionalism',
    usage: 'Technical systems, infrastructure',
    gradient: ['#3B82F6', '#1D4ED8'],
    label: 'Home'
  },
  FindStations: {
    icon: 'location',
    family: 'Ionicons' as const,
    primary: '#3B82F6',    // Blue - Charging stations, infrastructure
    psychology: 'Trust, reliability, infrastructure',
    usage: 'Charging stations, technical systems',
    gradient: ['#3B82F6', '#1E40AF'],
    label: 'Find Stations'
  },
  MyCharging: {
    icon: 'battery-charging-full',
    family: 'MaterialIcons' as const,
    primary: '#10B981',    // Emerald - Growth, energy (live operations)
    psychology: 'Energy, growth, real-time activity',
    usage: 'Live monitoring, active sessions, real-time data',
    gradient: ['#10B981', '#047857'],
    label: 'My Charging'
  },
  Wallet: {
    icon: 'wallet',
    family: 'FontAwesome5' as const,
    primary: '#14B8A6',    // Teal - Balance, financial (wallet systems)
    psychology: 'Balance, financial stability, trust',
    usage: 'PLN wallet, transactions, financial systems',
    gradient: ['#14B8A6', '#0F766E'],
    label: 'Wallet'
  },
  Profile: {
    icon: 'person-circle',
    family: 'Ionicons' as const,
    primary: '#8B5CF6',    // Purple - Creativity, premium (user management)
    psychology: 'Premium, human-focused, sophisticated',
    usage: 'User management, accounts, premium features',
    gradient: ['#8B5CF6', '#7C3AED'],
    label: 'Profile'
  }
} as const;

// ============================================================================
// MODERN PLACEHOLDER SCREENS
// ============================================================================

const PlaceholderScreen = ({ 
  title, 
  tabConfig,
  setCurrentTab 
}: { 
  title: string;
  tabConfig: typeof DESIGN_SYSTEM_COLORS[TabName];
  setCurrentTab?: (tab: TabName) => void;
}) => (
  <SafeAreaView className="flex-1 bg-gray-900" edges={['top', 'left', 'right']}>
    <View className="flex-1 justify-center items-center" style={{ paddingHorizontal: SPACING.lg, paddingVertical: SPACING.xl }}>
      {/* Icon Container with Horizontal Gradient */}
      <LinearGradient
        colors={[tabConfig.primary + '20', tabConfig.primary + '10']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          width: 96,
          height: 96,
          borderRadius: 24,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: SPACING.xl
        }}
      >
        {tabConfig.family === 'MaterialIcons' ? (
          <MaterialIcons name={tabConfig.icon as any} size={40} color={tabConfig.primary} />
        ) : tabConfig.family === 'FontAwesome5' ? (
          <FontAwesome5 name={tabConfig.icon as any} size={36} color={tabConfig.primary} />
        ) : (
          <Ionicons name={tabConfig.icon as any} size={40} color={tabConfig.primary} />
        )}
      </LinearGradient>

      <Text className="text-white text-3xl font-bold text-center" style={{ marginBottom: SPACING.sm }}>
        {title}
      </Text>
      <Text className="text-gray-400 text-lg text-center" style={{ marginBottom: SPACING.sm }}>
        Feature in Development
      </Text>
      <Text className="text-gray-500 text-center max-w-sm leading-relaxed" style={{ marginBottom: SPACING.sm }}>
        This feature is being built with the latest EV charging technology
      </Text>
      
      {/* Psychology Info */}
      <View 
        className="rounded-2xl border border-gray-700/30 bg-gray-800/30 max-w-sm"
        style={{ marginTop: SPACING.md, padding: SPACING.md }}
      >
        <Text className="text-gray-300 text-sm font-medium" style={{ marginBottom: SPACING.xs }}>
          Feature Psychology
        </Text>
        <Text className="text-gray-400 text-xs leading-relaxed">{tabConfig.psychology}</Text>
      </View>
      
      <Pressable
        onPress={() => setCurrentTab?.('Home')}
        className="flex-row items-center border rounded-2xl"
        style={{ 
          marginTop: SPACING.xl,
          paddingHorizontal: SPACING.xl,
          paddingVertical: SPACING.md,
          gap: SPACING.sm,
          backgroundColor: tabConfig.primary + '15',
          borderColor: tabConfig.primary + '30'
        }}
      >
        <Ionicons name="arrow-back" size={18} color={tabConfig.primary} />
        <Text style={{ color: tabConfig.primary }} className="font-semibold">Back to Home</Text>
      </Pressable>
    </View>
  </SafeAreaView>
);

// ============================================================================
// CLEAN HOME SCREEN - CORE EV CHARGING FUNCTIONALITY
// ============================================================================

function HomeScreen({ setCurrentTab }: { setCurrentTab: (tab: TabName) => void }) {
  const { user } = useAuthGuard();

  // Mock recent activity data
  const recentActivities = [
    {
      id: 1,
      type: 'session_completed',
      title: 'Charging session completed',
      subtitle: '2 hours ago • Maltepe Station',
      value: '45.2 kWh',
      icon: 'battery-charging-full' as const,
      iconFamily: 'MaterialIcons' as const,
      color: DESIGN_SYSTEM_COLORS.MyCharging.primary,
      status: 'completed'
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment processed',
      subtitle: '3 hours ago • Auto-charge',
      value: '₺25.80',
      icon: 'credit-card' as const,
      iconFamily: 'Ionicons' as const,
      color: DESIGN_SYSTEM_COLORS.Wallet.primary,
      status: 'success'
    },
    {
      id: 3,
      type: 'booking',
      title: 'Station reserved',
      subtitle: 'Tomorrow 09:00 • Kadıköy Plaza',
      value: '30 min',
      icon: 'calendar' as const,
      iconFamily: 'Ionicons' as const,
      color: DESIGN_SYSTEM_COLORS.FindStations.primary,
      status: 'upcoming'
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-900" edges={['top', 'left', 'right']}>
      <ScrollView 
        className="flex-1" 
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: SPACING.lg, paddingTop: SPACING.xl, paddingBottom: SPACING.xxl }}>
          {/* Clean Header - App Name Only */}
          <View style={{ marginBottom: SPACING.xl }}>
            <Text className="text-white text-3xl font-bold tracking-tight">
              EV Charging
            </Text>
            <Text className="text-gray-400 text-base" style={{ marginTop: SPACING.xs }}>
              Power your journey
            </Text>
          </View>

          {/* Wallet Balance - Premium Card */}
          <Pressable
            onPress={() => setCurrentTab('Wallet')}
            className="overflow-hidden active:scale-98"
            style={{
              marginBottom: SPACING.xl,
              borderRadius: 20,
              shadowColor: '#14B8A6',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.12,
              shadowRadius: 16,
              elevation: 6
            }}
          >
            {/* Sophisticated Wallet Background */}
            <LinearGradient
              colors={['#0F2027', '#203A43', '#2C5364']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            />
            <LinearGradient
              colors={['#14B8A620', '#0F766E15', '#134E4A08']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1.1, y: 0.7 }}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            />
            <LinearGradient
              colors={['transparent', '#14B8A608', 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            />
            
            <View style={{ padding: SPACING.lg, borderWidth: 1, borderColor: '#14B8A625', borderRadius: 20 }}>
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-gray-400 text-sm font-medium" style={{ marginBottom: SPACING.xs }}>
                    Wallet Balance
                  </Text>
                  <Text className="text-white text-3xl font-bold tracking-tight" style={{ marginBottom: SPACING.sm }}>
                    ₺145.80
                  </Text>
                  <View className="flex-row items-center">
                    <View 
                      className="w-2 h-2 rounded-full animate-pulse" 
                      style={{ 
                        backgroundColor: '#5EEAD4',
                        marginRight: SPACING.sm,
                        shadowColor: '#14B8A6',
                        shadowOpacity: 0.8,
                        shadowRadius: 4
                      }} 
                    />
                    <Text className="text-teal-300 text-sm font-medium">Auto-recharge enabled</Text>
                  </View>
                </View>
                <LinearGradient
                  colors={['#5EEAD430', '#14B8A620', '#0F766E10']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 16,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: '#14B8A630'
                  }}
                >
                  <FontAwesome5 name="wallet" size={22} color="#5EEAD4" />
                </LinearGradient>
              </View>
            </View>
          </Pressable>

          {/* Apple-Inspired Modern Charging Options */}
          <View style={{ marginBottom: SPACING.xl }}>
            <Text className="text-gray-400 text-sm font-medium" style={{ marginBottom: SPACING.lg }}>
              Charging Solutions
            </Text>
            
            {/* Premium Mobile Charging - Hero Card */}
            <Pressable
              className="overflow-hidden active:scale-98"
              style={{ 
                marginBottom: SPACING.lg,
                borderRadius: 24,
                shadowColor: '#F59E0B',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.15,
                shadowRadius: 24,
                elevation: 8
              }}
            >
              {/* Complex Multi-Layer Gradient Background */}
              <LinearGradient
                colors={['#1F2937', '#111827', '#0F172A']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
              />
              <LinearGradient
                colors={['#F59E0B20', '#D9770615', '#92400E10']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1.2, y: 0.8 }}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
              />
              <LinearGradient
                colors={['transparent', '#F59E0B08', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
              />
              
              <View style={{ padding: SPACING.xl, borderWidth: 1, borderColor: '#F59E0B25', borderRadius: 24 }}>
                {/* Premium Header with Ambient Lighting Effect */}
                <View className="flex-row items-center justify-between" style={{ marginBottom: SPACING.lg }}>
                  <View className="flex-row items-center">
                    <LinearGradient
                      colors={['#FCD34D', '#F59E0B', '#D97706']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{
                        paddingHorizontal: 12,
                        paddingVertical: 4,
                        borderRadius: 12,
                        marginRight: SPACING.md
                      }}
                    >
                      <Text className="text-gray-900 text-xs font-black tracking-wider">PREMIUM</Text>
                    </LinearGradient>
                    <View className="flex-row items-center">
                      <View 
                        className="w-2 h-2 rounded-full animate-pulse" 
                        style={{ 
                          backgroundColor: '#FCD34D',
                          marginRight: SPACING.xs,
                          shadowColor: '#F59E0B',
                          shadowOpacity: 0.8,
                          shadowRadius: 4
                        }} 
                      />
                      <Text className="text-amber-300 text-xs font-semibold">3 units en route</Text>
                    </View>
                  </View>
                  {/* Ambient Icon Container */}
                  <LinearGradient
                    colors={['#FCD34D30', '#F59E0B20', '#D9770610']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 16,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#F59E0B30'
                    }}
                  >
                    <FontAwesome5 name="shipping-fast" size={24} color="#FCD34D" />
                  </LinearGradient>
                </View>

                {/* Content */}
                <Text className="text-white text-2xl font-bold tracking-tight" style={{ marginBottom: SPACING.sm }}>
                  Mobile Charging
                </Text>
                <Text className="text-gray-300 text-base leading-relaxed" style={{ marginBottom: SPACING.lg }}>
                  Premium concierge service • Tesla-certified technicians
                </Text>
                
                {/* Features Grid */}
                <View className="flex-row justify-between">
                  <View className="flex-1">
                    <View className="flex-row items-center" style={{ marginBottom: SPACING.xs }}>
                      <Ionicons name="time" size={16} color="#FCD34D" />
                      <Text className="text-amber-300 text-sm font-medium" style={{ marginLeft: SPACING.xs }}>
                        15-45 min
                      </Text>
                    </View>
                    <Text className="text-gray-400 text-xs">Estimated arrival</Text>
                  </View>
                  <View className="flex-1">
                    <View className="flex-row items-center" style={{ marginBottom: SPACING.xs }}>
                      <FontAwesome5 name="battery-full" size={14} color="#FCD34D" />
                      <Text className="text-amber-300 text-sm font-medium" style={{ marginLeft: SPACING.xs }}>
                        Up to 150kW
                      </Text>
                    </View>
                    <Text className="text-gray-400 text-xs">Charging speed</Text>
                  </View>
                  <View className="flex-1 items-end">
                    <Text className="text-white text-lg font-bold">₺45</Text>
                    <Text className="text-gray-400 text-xs">Starting price</Text>
                  </View>
                </View>
              </View>
            </Pressable>

            {/* Modern 3-Grid Layout */}
            <View className="flex-row" style={{ gap: SPACING.sm, marginBottom: SPACING.md }}>
              {/* Nearby Stations - With Superfast Info */}
              <Pressable
                onPress={() => setCurrentTab('FindStations')}
                className="flex-1 overflow-hidden active:scale-96"
                style={{ 
                  borderRadius: 18,
                  shadowColor: '#3B82F6',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.1,
                  shadowRadius: 12,
                  elevation: 4
                }}
              >
                {/* Sophisticated Background System */}
                <LinearGradient
                  colors={['#1E293B', '#0F172A', '#020617']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                />
                <LinearGradient
                  colors={['#3B82F620', '#1E40AF15', '#1E3A8A08']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1.3, y: 1.2 }}
                  style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                />
                <LinearGradient
                  colors={['transparent', '#3B82F608', 'transparent']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                />
                
                <View style={{ padding: SPACING.md, borderWidth: 1, borderColor: '#3B82F620', borderRadius: 18 }}>
                  {/* Icon with Glow Effect */}
                  <LinearGradient
                    colors={['#60A5FA30', '#3B82F620', '#1E40AF10']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: SPACING.sm,
                      borderWidth: 1,
                      borderColor: '#3B82F625'
                    }}
                  >
                    <Ionicons name="location" size={20} color="#60A5FA" />
                  </LinearGradient>
                  
                  <Text className="text-white text-base font-bold tracking-tight" style={{ marginBottom: SPACING.xs }}>
                    Nearby Stations
                  </Text>
                  <Text className="text-gray-400 text-xs leading-relaxed" style={{ marginBottom: SPACING.sm }}>
                    89 available • 12 superfast
                  </Text>
                  
                  {/* Status Indicators */}
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                      <View 
                        className="w-1.5 h-1.5 rounded-full" 
                        style={{ 
                          backgroundColor: '#60A5FA',
                          marginRight: SPACING.xs,
                          shadowColor: '#3B82F6',
                          shadowOpacity: 0.6,
                          shadowRadius: 2
                        }} 
                      />
                      <Text className="text-blue-300 text-xs font-medium">Ready</Text>
                    </View>
                    <View className="flex-row items-center">
                      <Ionicons name="flash" size={10} color="#F87171" />
                      <Text className="text-red-300 text-xs font-medium" style={{ marginLeft: 2 }}>Fast</Text>
                    </View>
                  </View>
                </View>
              </Pressable>

              {/* Quick Start QR - Redesigned */}
              <Pressable
                className="flex-1 overflow-hidden active:scale-96"
                style={{ 
                  borderRadius: 18,
                  shadowColor: '#10B981',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.1,
                  shadowRadius: 12,
                  elevation: 4
                }}
              >
                {/* Emerald Gradient Background */}
                <LinearGradient
                  colors={['#064E3B', '#022C22', '#011716']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                />
                <LinearGradient
                  colors={['#10B98120', '#04785715', '#065F4608']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1.2, y: 0.9 }}
                  style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                />
                <LinearGradient
                  colors={['transparent', '#10B98108', 'transparent']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                />
                
                <View style={{ padding: SPACING.md, borderWidth: 1, borderColor: '#10B98120', borderRadius: 18 }}>
                  {/* QR Icon with Glow */}
                  <LinearGradient
                    colors={['#34D39930', '#10B98120', '#04785710']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: SPACING.sm,
                      borderWidth: 1,
                      borderColor: '#10B98125'
                    }}
                  >
                    <Ionicons name="qr-code" size={20} color="#34D399" />
                  </LinearGradient>
                  
                  <Text className="text-white text-base font-bold tracking-tight" style={{ marginBottom: SPACING.xs }}>
                    Quick Start
                  </Text>
                  <Text className="text-gray-400 text-xs leading-relaxed" style={{ marginBottom: SPACING.sm }}>
                    Scan QR to charge
                  </Text>
                  
                  {/* Quick Indicator */}
                  <View className="flex-row items-center">
                    <View 
                      className="w-1.5 h-1.5 rounded-full animate-pulse" 
                      style={{ 
                        backgroundColor: '#34D399',
                        marginRight: SPACING.xs,
                        shadowColor: '#10B981',
                        shadowOpacity: 0.8,
                        shadowRadius: 3
                      }} 
                    />
                    <Text className="text-emerald-300 text-xs font-medium">Instant</Text>
                  </View>
                </View>
              </Pressable>
            </View>

            {/* AI Smart Queue - Bottom Row */}
            <Pressable
              className="overflow-hidden active:scale-98"
              style={{ 
                borderRadius: 18,
                shadowColor: '#8B5CF6',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.08,
                shadowRadius: 10,
                elevation: 3
              }}
            >
              {/* Purple AI Background */}
              <LinearGradient
                colors={['#2D1B69', '#1E1B3A', '#0F0A1E']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0.8 }}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
              />
                             <LinearGradient
                 colors={['#8B5CF620', '#7C3AED15', '#6D28D908']}
                 start={{ x: 0, y: 0 }}
                 end={{ x: 1.1, y: 0.6 }}
                 style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
               />
              <LinearGradient
                colors={['transparent', '#8B5CF608', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
              />
              
              <View style={{ padding: SPACING.lg, borderWidth: 1, borderColor: '#8B5CF620', borderRadius: 18 }}>
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <View className="flex-row items-center" style={{ marginBottom: SPACING.sm }}>
                      <LinearGradient
                        colors={['#A78BFA', '#8B5CF6', '#7C3AED']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                          paddingHorizontal: 8,
                          paddingVertical: 2,
                          borderRadius: 8,
                          marginRight: SPACING.sm
                        }}
                      >
                        <Text className="text-gray-900 text-xs font-bold">AI POWERED</Text>
                      </LinearGradient>
                      <View 
                        className="w-1 h-1 rounded-full animate-pulse" 
                        style={{ backgroundColor: '#A78BFA' }} 
                      />
                    </View>
                    <Text className="text-white text-base font-bold tracking-tight">Smart Queue System</Text>
                    <Text className="text-gray-400 text-sm">Skip the wait • Reserve your spot intelligently</Text>
                  </View>
                  <LinearGradient
                    colors={['#A78BFA30', '#8B5CF620', '#7C3AED10']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#8B5CF625'
                    }}
                  >
                    <MaterialIcons name="smart-toy" size={22} color="#A78BFA" />
                  </LinearGradient>
                </View>
              </View>
            </Pressable>
          </View>

          {/* Recent Activity - Rich Content */}
          <View style={{ marginTop: SPACING.xl }}>
            <View className="flex-row items-center justify-between" style={{ marginBottom: SPACING.md }}>
              <Text className="text-gray-400 text-sm font-medium">Recent Activity</Text>
              <Pressable onPress={() => setCurrentTab('MyCharging')}>
                <Text className="text-blue-400 text-sm font-medium">View All</Text>
              </Pressable>
            </View>
            
            <View style={{ gap: SPACING.sm }}>
              {recentActivities.map((activity, index) => (
                <Pressable
                  key={activity.id}
                  onPress={() => setCurrentTab(activity.type === 'session_completed' ? 'MyCharging' : 'Wallet')}
                  className="bg-gray-800/30 backdrop-blur rounded-2xl border border-gray-700/20 active:scale-98"
                  style={{ padding: SPACING.md }}
                >
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center flex-1">
                      <LinearGradient
                        colors={[activity.color + '20', activity.color + '10']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 12,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: SPACING.sm
                        }}
                      >
                        {activity.iconFamily === 'MaterialIcons' ? (
                          <MaterialIcons name={activity.icon as any} size={18} color={activity.color} />
                        ) : (
                          <Ionicons name={activity.icon as any} size={18} color={activity.color} />
                        )}
                      </LinearGradient>
                      <View className="flex-1">
                        <Text className="text-white font-medium">{activity.title}</Text>
                        <Text className="text-gray-400 text-sm">{activity.subtitle}</Text>
                      </View>
                    </View>
                    <View className="items-end">
                      <Text 
                        className="font-semibold" 
                        style={{ color: activity.color, marginBottom: SPACING.xs }}
                      >
                        {activity.value}
                      </Text>
                      <View 
                        className="px-2 py-1 rounded-full"
                        style={{ backgroundColor: activity.color + '15' }}
                      >
                        <Text 
                          className="text-xs font-medium capitalize"
                          style={{ color: activity.color }}
                        >
                          {activity.status}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ============================================================================
// APPLE-STYLE TAB NAVIGATION
// ============================================================================

export function MainTabNavigator() {
  const [currentTab, setCurrentTab] = React.useState<TabName>('Home');

  const renderCurrentScreen = () => {
    switch (currentTab) {
      case 'Home':
        return <HomeScreen setCurrentTab={setCurrentTab} />;
      case 'FindStations':
        return <PlaceholderScreen title="Find Charging Stations" tabConfig={DESIGN_SYSTEM_COLORS.FindStations} setCurrentTab={setCurrentTab} />;
      case 'MyCharging':
        return <PlaceholderScreen title="My Charging Sessions" tabConfig={DESIGN_SYSTEM_COLORS.MyCharging} setCurrentTab={setCurrentTab} />;
      case 'Wallet':
        return <PlaceholderScreen title="Digital Wallet" tabConfig={DESIGN_SYSTEM_COLORS.Wallet} setCurrentTab={setCurrentTab} />;
      case 'Profile':
        return <PlaceholderScreen title="My Profile" tabConfig={DESIGN_SYSTEM_COLORS.Profile} setCurrentTab={setCurrentTab} />;
      default:
        return <HomeScreen setCurrentTab={setCurrentTab} />;
    }
  };

  const TabButton = ({ tab }: { tab: TabName }) => {
    const config = DESIGN_SYSTEM_COLORS[tab];
    const isActive = currentTab === tab;
    const iconColor = isActive ? config.primary : '#6B7280';
    const iconSize = 22;
    
    const renderIcon = () => {
      switch (config.family) {
        case 'MaterialIcons':
          return <MaterialIcons name={config.icon as any} size={iconSize} color={iconColor} />;
        case 'FontAwesome5':
          return <FontAwesome5 name={config.icon as any} size={iconSize} color={iconColor} />;
        default:
          return <Ionicons name={config.icon as any} size={iconSize} color={iconColor} />;
      }
    };
    
    return (
      <Pressable
        onPress={() => setCurrentTab(tab)}
        className={`flex-1 items-center justify-center ${
          isActive ? 'bg-white/5' : 'bg-transparent'
        }`}
        style={{ minHeight: 70, paddingVertical: SPACING.sm }}
      >
        {/* Icon Container - Apple style */}
        <View 
          className={`rounded-xl ${isActive ? 'shadow-sm' : ''}`}
          style={{
            backgroundColor: isActive ? config.primary + '15' : 'transparent',
            padding: SPACING.sm,
            marginBottom: SPACING.xs
          }}
        >
          {renderIcon()}
        </View>
        
        {/* Label - SF Pro Display inspired */}
        <Text 
          className={`text-xs font-medium text-center tracking-tight`}
          style={{
            color: isActive ? config.primary : '#9CA3AF',
            maxWidth: 65,
            fontWeight: isActive ? '600' : '500'
          }}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {config.label}
        </Text>
        
        {/* Subtle Active Indicator */}
        {isActive && (
          <View 
            className="absolute top-0 w-1 h-1 rounded-full"
            style={{ backgroundColor: config.primary }}
          />
        )}
      </Pressable>
    );
  };

  return (
    <View className="flex-1 bg-gray-900">
      {/* Current Screen */}
      <View className="flex-1">
        {renderCurrentScreen()}
      </View>

      {/* Apple-style Bottom Tab Bar */}
      <SafeAreaView edges={['bottom', 'left', 'right']} className="bg-gray-900/98 border-t border-gray-700/30 backdrop-blur-xl">
        <View 
          className="flex-row justify-around" 
          style={{ 
            minHeight: 68,
            paddingHorizontal: SPACING.sm
          }}
        >
          <TabButton tab="Home" />
          <TabButton tab="FindStations" />
          <TabButton tab="MyCharging" />
          <TabButton tab="Wallet" />
          <TabButton tab="Profile" />
        </View>
      </SafeAreaView>
    </View>
  );
} 