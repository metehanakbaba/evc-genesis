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
    <View className="flex-1 px-6 py-8 justify-center items-center">
      {/* Icon Container with Gradient */}
      <LinearGradient
        colors={[tabConfig.primary + '20', tabConfig.primary + '10']}
        style={{
          width: 96,
          height: 96,
          borderRadius: 24,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 32
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

      <Text className="text-white text-3xl font-bold mb-3 text-center">{title}</Text>
      <Text className="text-gray-400 text-lg mb-2 text-center">Feature in Development</Text>
      <Text className="text-gray-500 text-center max-w-sm leading-relaxed mb-2">
        This feature is being built with the latest EV charging technology
      </Text>
      
      {/* Psychology Info */}
      <View className="mt-4 p-4 rounded-2xl border border-gray-700/30 bg-gray-800/30 max-w-sm">
        <Text className="text-gray-300 text-sm font-medium mb-1">Feature Psychology</Text>
        <Text className="text-gray-400 text-xs leading-relaxed">{tabConfig.psychology}</Text>
      </View>
      
      <Pressable
        onPress={() => setCurrentTab?.('Home')}
        className="mt-8 px-8 py-4 rounded-2xl border flex-row items-center gap-2"
        style={{ 
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

  return (
    <SafeAreaView className="flex-1 bg-gray-900" edges={['top', 'left', 'right']}>
      <ScrollView 
        className="flex-1" 
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 pt-8 pb-12">
          {/* Clean Header - App Name Only */}
          <View className="mb-8">
            <Text className="text-white text-3xl font-bold tracking-tight">
              EV Charging
            </Text>
            <Text className="text-gray-400 text-base mt-1">
              Power your journey
            </Text>
          </View>

          {/* Network Status - Prominent */}
          <LinearGradient
            colors={[DESIGN_SYSTEM_COLORS.MyCharging.primary + '15', DESIGN_SYSTEM_COLORS.MyCharging.primary + '08']}
            style={{
              borderRadius: 20,
              padding: 24,
              marginBottom: 24,
              borderWidth: 1,
              borderColor: DESIGN_SYSTEM_COLORS.MyCharging.primary + '30'
            }}
          >
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center">
                <View className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse mr-3" />
                <Text className="text-emerald-300 font-semibold text-lg">Network Online</Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="wifi" size={16} color="#10B981" />
                <Text className="text-emerald-400 text-sm font-medium ml-1">Connected</Text>
              </View>
            </View>
            <Text className="text-emerald-200/90 leading-relaxed">
              156 stations available • 89 ready to charge
            </Text>
          </LinearGradient>

          {/* Core Actions - EV Charging Focus */}
          <View className="space-y-4">
            {/* Primary Action - Find Stations */}
            <Pressable
              onPress={() => setCurrentTab('FindStations')}
              className="bg-gray-800/40 backdrop-blur-xl rounded-2xl border border-gray-700/30 overflow-hidden active:scale-98"
            >
              <LinearGradient
                colors={[DESIGN_SYSTEM_COLORS.FindStations.primary + '15', 'transparent']}
                style={{ padding: 24 }}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="text-white text-xl font-bold mb-2">
                      Find Charging Stations
                    </Text>
                    <Text className="text-gray-300 leading-relaxed mb-4">
                      Discover the closest available charging points
                    </Text>
                    <View className="flex-row items-center">
                      <Ionicons name="location" size={14} color={DESIGN_SYSTEM_COLORS.FindStations.primary} />
                      <Text className="text-blue-400 text-sm font-medium ml-1">89 available now</Text>
                    </View>
                  </View>
                  <View 
                    className="w-14 h-14 rounded-2xl items-center justify-center ml-4"
                    style={{ backgroundColor: DESIGN_SYSTEM_COLORS.FindStations.primary + '20' }}
                  >
                    <Ionicons name="location" size={24} color={DESIGN_SYSTEM_COLORS.FindStations.primary} />
                  </View>
                </View>
              </LinearGradient>
            </Pressable>

            {/* Quick Start Charging */}
            <Pressable
              className="bg-gray-800/40 backdrop-blur-xl rounded-2xl border border-gray-700/30 p-6 active:scale-98"
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-white text-lg font-bold mb-1">
                    Quick Start Charging
                  </Text>
                  <Text className="text-gray-400">
                    Scan QR code to begin charging session
                  </Text>
                </View>
                <View 
                  className="w-12 h-12 rounded-2xl items-center justify-center"
                  style={{ backgroundColor: DESIGN_SYSTEM_COLORS.MyCharging.primary + '20' }}
                >
                  <Ionicons name="qr-code" size={22} color={DESIGN_SYSTEM_COLORS.MyCharging.primary} />
                </View>
              </View>
            </Pressable>

            {/* Wallet Balance Card */}
            <Pressable
              onPress={() => setCurrentTab('Wallet')}
              className="bg-gray-800/40 backdrop-blur-xl rounded-2xl border border-gray-700/30 p-6 active:scale-98"
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-gray-400 text-sm font-medium mb-1">Wallet Balance</Text>
                  <Text className="text-white text-2xl font-bold mb-1">₺145.80</Text>
                  <View className="flex-row items-center">
                    <View className="w-2 h-2 bg-emerald-400 rounded-full mr-2" />
                    <Text className="text-gray-400 text-sm">Auto-recharge enabled</Text>
                  </View>
                </View>
                <View 
                  className="w-12 h-12 rounded-2xl items-center justify-center"
                  style={{ backgroundColor: DESIGN_SYSTEM_COLORS.Wallet.primary + '20' }}
                >
                  <FontAwesome5 name="wallet" size={18} color={DESIGN_SYSTEM_COLORS.Wallet.primary} />
                </View>
              </View>
            </Pressable>
          </View>

          {/* Recent Activity - Minimal */}
          <View className="mt-8">
            <Text className="text-gray-400 text-sm font-medium mb-4">Recent Activity</Text>
            <Pressable
              onPress={() => setCurrentTab('MyCharging')}
              className="bg-gray-800/30 backdrop-blur rounded-2xl p-5 border border-gray-700/20 active:scale-98"
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View 
                    className="w-10 h-10 rounded-xl items-center justify-center mr-3"
                    style={{ backgroundColor: DESIGN_SYSTEM_COLORS.MyCharging.primary + '20' }}
                  >
                    <MaterialIcons name="battery-charging-full" size={18} color={DESIGN_SYSTEM_COLORS.MyCharging.primary} />
                  </View>
                  <View>
                    <Text className="text-white font-medium">Last session completed</Text>
                    <Text className="text-gray-400 text-sm">2 hours ago • Maltepe Station</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#6B7280" />
              </View>
            </Pressable>
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
        className={`flex-1 items-center justify-center py-2 ${
          isActive ? 'bg-white/5' : 'bg-transparent'
        }`}
        style={{ minHeight: 70 }}
      >
        {/* Icon Container - Apple style */}
        <View 
          className={`p-2 rounded-xl mb-1 ${isActive ? 'shadow-sm' : ''}`}
          style={{
            backgroundColor: isActive ? config.primary + '15' : 'transparent',
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
        <View className="flex-row justify-around px-2" style={{ minHeight: 68 }}>
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