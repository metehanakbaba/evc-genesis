/**
 * 🏠 useDashboard Hook
 * 
 * Main business logic for dashboard functionality
 */

import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { ActivityItem, WalletBalance, ActionGridItem } from '../types';
import { mockRecentActivities, mockWalletBalance, mobileChargingFeatures } from '../data';
import { openModal } from '../../common/navigation/stacks/MainStackNavigator';

// Import background images
import stationImage from '../../../../assets/dashboard/station.jpg';
import carsCharging from '../../../../assets/dashboard/cars-charging.jpg';

export function useDashboard() {
  const [recentActivities] = useState<ActivityItem[]>(mockRecentActivities);
  const [walletBalance] = useState<WalletBalance>(mockWalletBalance);

  // Navigation handlers
  const handleQRScanPress = useCallback(() => {
    openModal('qr');
  }, []);

  const handleWalletPress = useCallback(() => {
    openModal('wallet');
  }, []);

  const handleStationMapPress = useCallback(() => {
    openModal('stations');
  }, []);

  const handleMobileChargingPress = useCallback(() => {
    Alert.alert(
      "Mobile Charging 🚗⚡",
      "Premium concierge service is available. Book your mobile charging session?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Book Now", onPress: () => console.log('Mobile charging booked') }
      ]
    );
  }, []);

  const handleActivityPress = useCallback((activity: ActivityItem) => {
    console.log(`Navigate to ${activity.type} details:`, activity.id);
  }, []);

  // Action grid items
  const actionGridItems: ActionGridItem[] = [
    {
      id: 'find-stations',
      title: 'Find Stations',
      subtitle: '89 available • 12 superfast',
      icon: 'location',
      color: '#60A5FA',
      shadowColor: '#3B82F6',
      onPress: handleStationMapPress,
      backgroundImage: stationImage,
      statusText: 'Ready',
      statusColor: '#60A5FA',
      additionalInfo: 'Fast',
      additionalInfoColor: '#F87171'
    },
    {
      id: 'quick-qr',
      title: 'Quick Start QR',
      subtitle: 'Instant session start',
      icon: 'qr-code',
      color: '#34D399',
      shadowColor: '#10B981',
      onPress: handleQRScanPress,
      backgroundImage: carsCharging,
      statusText: 'Ready',
      statusColor: '#34D399'
    }
  ];

  return {
    recentActivities,
    walletBalance,
    mobileChargingFeatures,
    actionGridItems,
    handlers: {
      handleQRScanPress,
      handleWalletPress,
      handleStationMapPress,
      handleMobileChargingPress,
      handleActivityPress,
    }
  };
} 