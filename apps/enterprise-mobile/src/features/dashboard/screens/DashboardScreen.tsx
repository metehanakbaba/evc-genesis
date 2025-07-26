/**
 * 🏠 Dashboard Screen
 * 
 * Main dashboard screen with reliable smart animated header
 */

import React, { useRef, useState } from 'react';
import { ScrollView, Animated, SafeAreaView } from 'react-native';
import { ModernPattern } from '../../../shared/components/HexagonPattern';
import { useDashboard } from '../hooks';
import {
  DashboardHeader,
  WalletBalanceCard,
  MobileChargingCard,
  ActionGrid,
  RecentActivity
} from '../components';
import { LinearGradient } from 'expo-linear-gradient';

const HEADER_HEIGHT = 140; // Adjusted for solid background header

export function DashboardScreen() {
  const {
    recentActivities,
    walletBalance,
    mobileChargingFeatures,
    actionGridItems,
    handlers
  } = useDashboard();

  // Animated values for reliable header
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerTranslateY = useRef(new Animated.Value(0)).current;
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  // Reliable scroll detection
  const handleScroll = (event: any) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    
    // Immediate response - no complex logic
    if (currentScrollY > 80) {
      // Hide header when scrolling down past threshold
      if (isHeaderVisible) {
        setIsHeaderVisible(false);
        Animated.timing(headerTranslateY, {
          toValue: -HEADER_HEIGHT,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    } else {
      // Show header when near top
      if (!isHeaderVisible) {
        setIsHeaderVisible(true);
        Animated.timing(headerTranslateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  return (
    <LinearGradient
    colors={['#111827', '#1F2937', '#0F172A', '#111827']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={{ flex: 1 }}
  >
    {/* Modern Pattern Component */}
    <ModernPattern
      opacity={0.1025}
      size="medium"
      color="rgba(59, 130, 246, 0.4)"
      type="diamonds"
    />
    
    {/* Reliable Animated Header */}
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transform: [{ translateY: headerTranslateY }],
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 10,
      }}
    >
      <DashboardHeader />
    </Animated.View>

    {/* Main Content */}
    <ScrollView 
      className="flex-1" 
      showsVerticalScrollIndicator={false}
      onScroll={handleScroll}
      scrollEventThrottle={8}
      contentContainerStyle={{ 
        paddingTop: HEADER_HEIGHT,
      }}
    >
      {/* Wallet Balance Card */}
      <WalletBalanceCard
        walletBalance={walletBalance}
        onPress={handlers.handleWalletPress}
      />

      {/* Mobile Charging Card */}
      <MobileChargingCard
        features={mobileChargingFeatures}
        onPress={handlers.handleMobileChargingPress}
      />

      {/* Action Grid */}
      <ActionGrid items={actionGridItems} />

      {/* Recent Activity */}
      <RecentActivity
        activities={recentActivities}
        onActivityPress={handlers.handleActivityPress}
      />
    </ScrollView>
  </LinearGradient>
  );
} 