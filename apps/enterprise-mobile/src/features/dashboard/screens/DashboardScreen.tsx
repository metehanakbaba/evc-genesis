/**
 * 🏠 Dashboard Screen
 * 
 * Main dashboard screen that composes all dashboard components
 */

import React from 'react';
import { ScrollView } from 'react-native';
import { ModernPattern } from '../../../shared/components/HexagonPattern';
import { useDashboard } from '../hooks';
import {
  DashboardHeader,
  WalletBalanceCard,
  MobileChargingCard,
  ActionGrid,
  RecentActivity
} from '../components';

export function DashboardScreen() {
  const {
    recentActivities,
    walletBalance,
    mobileChargingFeatures,
    actionGridItems,
    handlers
  } = useDashboard();

  return (
    <>
      {/* Modern Pattern Component */}
      <ModernPattern
        opacity={0.15}
        size="medium"
        color="rgba(59, 130, 246, 0.4)"
        type="waves"
      />
      
      {/* Dashboard Header - NO SafeAreaView here */}
      <DashboardHeader />

      {/* Main Content */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
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
    </>
  );
} 