/**
 * 🎨 Navigation Theme Configuration
 * 
 * Theme configuration for navigation components with glassmorphism design
 */

import { DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';

// ============================================================================
// DARK THEME (Primary - matches glassmorphism design)
// ============================================================================

export const DarkNavigationTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#3B82F6', // Blue-500
    background: '#111827', // Gray-900 - matches app background
    card: 'rgba(17, 24, 39, 0.8)', // Glass card background
    text: '#F9FAFB', // Gray-50
    border: 'rgba(55, 65, 81, 0.3)', // Gray-700 with opacity
    notification: '#EF4444', // Red-500
  },
};

// ============================================================================
// LIGHT THEME (Secondary - for future use)
// ============================================================================

export const LightNavigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3B82F6', // Blue-500
    background: '#F9FAFB', // Gray-50
    card: 'rgba(255, 255, 255, 0.8)', // Glass card background
    text: '#111827', // Gray-900
    border: 'rgba(229, 231, 235, 0.8)', // Gray-200 with opacity
    notification: '#EF4444', // Red-500
  },
};

// ============================================================================
// TAB BAR THEME
// ============================================================================

export const TabBarTheme = {
  activeTintColor: '#3B82F6', // Blue-500
  inactiveTintColor: '#9CA3AF', // Gray-400
  backgroundColor: 'rgba(17, 24, 39, 0.95)', // Glass background
  borderTopColor: 'rgba(55, 65, 81, 0.3)', // Glass border
  borderTopWidth: 1,
  elevation: 0, // Remove shadow on Android
  shadowOpacity: 0, // Remove shadow on iOS
};

// ============================================================================
// HEADER THEME
// ============================================================================

export const HeaderTheme = {
  headerStyle: {
    backgroundColor: 'rgba(17, 24, 39, 0.95)', // Glass background
    borderBottomColor: 'rgba(55, 65, 81, 0.3)', // Glass border
    borderBottomWidth: 1,
    elevation: 0, // Remove shadow on Android
    shadowOpacity: 0, // Remove shadow on iOS
  },
  headerTintColor: '#F9FAFB', // Gray-50
  headerTitleStyle: {
    fontWeight: '600' as const,
    color: '#F9FAFB', // Gray-50
  },
  headerBackTitleVisible: false,
}; 