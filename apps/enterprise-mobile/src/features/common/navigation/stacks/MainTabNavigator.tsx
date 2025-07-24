/**
 * 🔋 Main Tab Navigator - Clean Architecture Version
 * 
 * Modern, clean implementation using feature-based architecture
 */

import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthGuard } from '../AuthGuard';

// 🎯 CLEAN ARCHITECTURE IMPORTS
import { SPACING, DESIGN_SYSTEM_COLORS } from '../../../../shared/constants';
import { StationMapModal } from '../../../charging-stations';
import { QRScannerModal } from '../../../qr-scanner'; 
import { WalletManagementModal } from '../../../wallet';

// ============================================================================
// HOME SCREEN COMPONENT
// ============================================================================

function HomeScreen() {
  const { user, logout } = useAuthGuard();
  const [qrScannerVisible, setQrScannerVisible] = useState(false);
  const [walletModalVisible, setWalletModalVisible] = useState(false);
  const [stationMapVisible, setStationMapVisible] = useState(false);

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
    }
  ];

  const handleQRScanSuccess = (data: string) => {
    setQrScannerVisible(false);
    Alert.alert(
      "Station Found! 🎉",
      `Connected to: ${data.replace(/_/g, ' ')}\n\nStarting charging session...`,
      [
        { 
          text: "Start Charging", 
          onPress: () => console.log('Starting charging session with data:', data)
        }
      ]
    );
  };

  return (
    <View className="flex-1 bg-gray-900">
      {/* Floating Profile Header */}
      <View className="flex-row items-center justify-between" style={{ 
        paddingHorizontal: SPACING.lg, 
        paddingTop: SPACING.lg, 
        paddingBottom: SPACING.md 
      }}>
        <View>
          <Text className="text-white text-2xl font-bold">EV Charging</Text>
          <Text className="text-gray-400 text-sm">Welcome back, {user?.name || 'Driver'}</Text>
        </View>
        <Pressable
          onPress={() => console.log('Profile pressed')}
          className="w-12 h-12 rounded-full items-center justify-center bg-gray-800 active:scale-95"
        >
          <Ionicons name="person-circle" size={28} color="#8B5CF6" />
        </Pressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Wallet Balance Card - Header Priority */}
        <View style={{ paddingHorizontal: SPACING.lg, marginBottom: SPACING.lg }}>
          <Pressable
            onPress={() => setWalletModalVisible(true)}
            className="overflow-hidden active:scale-98"
            style={{
              borderRadius: 20,
              shadowColor: '#14B8A6',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 12,
              elevation: 6
            }}
          >
            <LinearGradient
              colors={['#1F2937', '#111827', '#0F172A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            />
            <LinearGradient
              colors={['#14B8A620', '#0F766E15', '#134E4A10']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1.2, y: 0.8 }}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            />
            
            <View style={{ padding: SPACING.lg, borderWidth: 1, borderColor: '#14B8A625', borderRadius: 20 }}>
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-gray-400 text-sm">Wallet Balance</Text>
                  <Text className="text-white text-2xl font-bold">₺145.80</Text>
                </View>
                <View className="flex-row items-center">
                  <View 
                    className="w-2 h-2 rounded-full animate-pulse" 
                    style={{ 
                      backgroundColor: '#5EEAD4',
                      marginRight: SPACING.sm,
                      shadowColor: '#14B8A6',
                      shadowOpacity: 0.8,
                      shadowRadius: 2
                    }} 
                  />
                  <Text className="text-teal-300 text-sm font-medium">Auto-recharge ON</Text>
                </View>
              </View>
            </View>
          </Pressable>
        </View>

        {/* Premium Mobile Charging - Hero Card */}
        <View style={{ paddingHorizontal: SPACING.lg, marginBottom: SPACING.lg }}>
          <Text className="text-gray-400 text-sm font-medium" style={{ marginBottom: SPACING.lg }}>
            Charging Solutions
          </Text>
          
          <Pressable
            onPress={() => console.log('Mobile charging pressed')}
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
                    <Text className="text-amber-300 text-sm font-medium">Available Now</Text>
                  </View>
                </View>
                <LinearGradient
                  colors={['#FCD34D30', '#F59E0B25', '#D9770615']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: '#F59E0B35'
                  }}
                >
                  <MaterialIcons name="electric-car" size={28} color="#FCD34D" />
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
        </View>



        {/* Smart Action Grid */}
        <View style={{ paddingHorizontal: SPACING.lg, marginBottom: SPACING.lg }}>
          <View className="flex-row" style={{ gap: SPACING.sm, marginBottom: SPACING.md }}>
            {/* Find Stations Navigation */}
            <Pressable
              onPress={() => setStationMapVisible(true)}
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
              <LinearGradient
                colors={['#1F2937', '#111827', '#0F172A']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
              />
              <LinearGradient
                colors={['#3B82F620', '#1E40AF15', '#1E3A8A10']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1.2, y: 0.8 }}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
              />
              
              <View style={{ padding: SPACING.md, borderWidth: 1, borderColor: '#3B82F620', borderRadius: 18 }}>
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
                  Find Stations
                </Text>
                <Text className="text-gray-400 text-xs leading-relaxed" style={{ marginBottom: SPACING.sm }}>
                  89 available • 12 superfast
                </Text>
                
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

            {/* Quick Start QR Action */}
            <Pressable
              onPress={() => setQrScannerVisible(true)}
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
              <LinearGradient
                colors={['#1F2937', '#111827', '#0F172A']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
              />
              <LinearGradient
                colors={['#10B98120', '#04785715', '#065F4610']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1.2, y: 0.8 }}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
              />
              
              <View style={{ padding: SPACING.md, borderWidth: 1, borderColor: '#10B98120', borderRadius: 18 }}>
                <LinearGradient
                  colors={['#34D39930', '#10B98620', '#04785710']}
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
                  Quick Start QR
                </Text>
                <Text className="text-gray-400 text-xs leading-relaxed" style={{ marginBottom: SPACING.sm }}>
                  Instant session start
                </Text>
                
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <View 
                      className="w-1.5 h-1.5 rounded-full animate-pulse" 
                      style={{ 
                        backgroundColor: '#34D399',
                        marginRight: SPACING.xs,
                        shadowColor: '#10B981',
                        shadowOpacity: 0.6,
                        shadowRadius: 2
                      }} 
                    />
                    <Text className="text-emerald-300 text-xs font-medium">Ready</Text>
                  </View>
                  <Ionicons name="flash" size={10} color="#34D399" />
                </View>
              </View>
            </Pressable>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={{ paddingHorizontal: SPACING.lg, marginBottom: SPACING.xl }}>
          <Text className="text-white text-lg font-bold" style={{ marginBottom: SPACING.md }}>
            Recent Activity
          </Text>
          
          <View style={{ gap: SPACING.xs }}>
            {recentActivities.map((activity) => (
              <Pressable
                key={activity.id}
                onPress={() => console.log(`Navigate to ${activity.type} details`)}
                className="active:scale-98"
                style={{
                  padding: SPACING.md,
                  backgroundColor: '#1F2937',
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: '#374151'
                }}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1">
                    <View 
                      className="w-8 h-8 rounded-lg items-center justify-center"
                      style={{ 
                        backgroundColor: activity.color + '15',
                        marginRight: SPACING.sm
                      }}
                    >
                      {activity.iconFamily === 'MaterialIcons' ? (
                        <MaterialIcons name={activity.icon as any} size={14} color={activity.color} />
                      ) : (
                        <Ionicons name={activity.icon as any} size={14} color={activity.color} />
                      )}
                    </View>
                    
                    <View className="flex-1">
                      <Text className="text-white text-sm font-medium">{activity.title}</Text>
                      <Text className="text-gray-500 text-xs">{activity.subtitle}</Text>
                    </View>
                  </View>
                  
                  <Text className="text-gray-300 text-sm font-medium">{activity.value}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Modals - Using Clean Architecture Components */}
      <QRScannerModal
        visible={qrScannerVisible}
        onClose={() => setQrScannerVisible(false)}
        onSuccess={handleQRScanSuccess}
      />

      <WalletManagementModal
        visible={walletModalVisible}
        onClose={() => setWalletModalVisible(false)}
      />

      <StationMapModal
        visible={stationMapVisible}
        onClose={() => setStationMapVisible(false)}
      />
    </View>
  );
}

// ============================================================================
// MAIN TAB NAVIGATOR
// ============================================================================

export function MainTabNavigator() {
  return (
    <SafeAreaView className="flex-1 bg-gray-900" edges={['top', 'left', 'right', 'bottom']}>
      <HomeScreen />
    </SafeAreaView>
  );
} 