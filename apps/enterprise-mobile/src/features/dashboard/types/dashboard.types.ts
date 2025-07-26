/**
 * 🏠 Dashboard Types
 * 
 * Type definitions for dashboard functionality
 */

export interface ActivityItem {
  id: number;
  type: 'session_completed' | 'payment' | 'mobile_charging' | 'station_booking';
  title: string;
  subtitle: string;
  value: string;
  icon: string;
  iconFamily: 'Ionicons' | 'MaterialIcons' | 'FontAwesome5';
  color: string;
  status: 'completed' | 'pending' | 'success' | 'failed';
}

export interface GreetingData {
  message: string;
  icon: string;
  colors: readonly [string, string, string];
  shadowColor: string;
  isEvening: boolean;
  isMorning: boolean;
  isAfternoon: boolean;
}

export interface DashboardSettings {
  showWalletBalance: boolean;
  showMobileCharging: boolean;
  showRecentActivity: boolean;
  activityLimit: number;
}

export interface DashboardModalProps {
  visible: boolean;
  onClose: () => void;
}

export interface WalletBalance {
  amount: number;
  currency: string;
  autoRechargeEnabled: boolean;
}

export interface ActionGridItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  shadowColor: string;
  onPress: () => void;
  backgroundImage?: any;
  statusText: string;
  statusColor: string;
  additionalInfo?: string;
  additionalInfoColor?: string;
} 