/**
 * 🏠 Dashboard Mock Data
 * 
 * Mock data for dashboard functionality
 */

import { ActivityItem, WalletBalance } from '../types';
import { DESIGN_SYSTEM_COLORS } from '../../../shared/constants';

export const mockWalletBalance: WalletBalance = {
  amount: 247.30,
  currency: 'zł',
  autoRechargeEnabled: true,
};

export const mockRecentActivities: ActivityItem[] = [
  {
    id: 1,
    type: 'session_completed',
    title: 'Charging session completed',
    subtitle: '2 hours ago • Warsaw Central',
    value: '45.2 kWh',
    icon: 'battery-charging-full',
    iconFamily: 'MaterialIcons',
    color: DESIGN_SYSTEM_COLORS.MyCharging.primary,
    status: 'completed'
  },
  {
    id: 2,
    type: 'payment',
    title: 'Payment processed',
    subtitle: '3 hours ago • Auto-charge',
    value: 'zł43.70',
    icon: 'credit-card',
    iconFamily: 'Ionicons',
    color: DESIGN_SYSTEM_COLORS.Wallet.primary,
    status: 'success'
  },
  {
    id: 3,
    type: 'mobile_charging',
    title: 'Mobile charging booked',
    subtitle: '1 day ago • Premium service',
    value: 'zł156.00',
    icon: 'electric-car',
    iconFamily: 'MaterialIcons',
    color: '#F59E0B',
    status: 'completed'
  }
];

export const mobileChargingFeatures = {
  estimatedArrival: '15-45 min',
  chargingSpeed: 'Up to 150kW',
  startingPrice: 'zł76',
  availability: 'Available Now'
}; 