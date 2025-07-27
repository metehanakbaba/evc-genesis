/**
 * 🏠 useDashboard Hook
 * 
 * Main business logic for dashboard functionality
 */

import { useState, useCallback, useEffect } from 'react';
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
  
  // Charging simulation states
  const [isCharging, setIsCharging] = useState(false);
  const [chargingProgress, setChargingProgress] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);
  const [isWalletLoading, setIsWalletLoading] = useState(false);

  // Demo charging simulation
  useEffect(() => {
    // Start charging simulation after 2 seconds
    const startChargingTimer = setTimeout(() => {
      setIsCharging(true);
    }, 2000);

    // Progress simulation
    let progressInterval: NodeJS.Timeout;
    if (isCharging) {
      progressInterval = setInterval(() => {
        setChargingProgress(prev => {
          if (prev >= 100) {
            setIsCharging(false);
            return 0;
          }
          return prev + 1;
        });
      }, 100);
    }

    // Availability simulation
    const availabilityTimer = setInterval(() => {
      setIsAvailable(prev => !prev);
    }, 6000);

    // Wallet loading simulation
    const walletLoadingTimer = setTimeout(() => {
      setIsWalletLoading(true);
      setTimeout(() => setIsWalletLoading(false), 2500);
    }, 4000);

    return () => {
      clearTimeout(startChargingTimer);
      clearTimeout(walletLoadingTimer);
      clearInterval(availabilityTimer);
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [isCharging]);

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

  const handleRequestCharging = useCallback(() => {
    openModal('chargingRequest');
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
    // Animation states
    isCharging,
    chargingProgress,
    isAvailable,
    isWalletLoading,
    handlers: {
      handleQRScanPress,
      handleWalletPress,
      handleStationMapPress,
      handleMobileChargingPress,
      handleRequestCharging,
      handleActivityPress,
    }
  };
} 