/**
 * 🎨 Design System Colors & Psychology
 * 
 * Color psychology mapping from EV Admin Design Guide
 */

export type TabName = 'Home' | 'FindStations' | 'MyCharging' | 'Wallet' | 'Profile';

export const DESIGN_SYSTEM_COLORS = {
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

export type DesignSystemColor = typeof DESIGN_SYSTEM_COLORS[TabName]; 