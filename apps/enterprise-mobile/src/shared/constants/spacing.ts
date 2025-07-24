/**
 * 📏 Spacing and Layout Constants
 * 
 * Consistent spacing system for the mobile app
 */

import { useSafeAreaInsets } from 'react-native-safe-area-context';

// ============================================================================
// BASIC SPACING SYSTEM
// ============================================================================

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
} as const;

// ============================================================================
// SAFE AREA UTILITIES
// ============================================================================

/**
 * Hook to get safe area insets
 * Use this in components that need dynamic safe area calculations
 */
export const useSafeArea = () => {
  const insets = useSafeAreaInsets();
  
  return {
    // Basic insets
    top: insets.top,
    bottom: insets.bottom,
    left: insets.left,
    right: insets.right,
    
    // Combined spacing utilities
    headerPadding: {
      paddingTop: SPACING.md,
      paddingBottom: SPACING.md,
      paddingHorizontal: SPACING.lg,
    },
    
    footerPadding: {
      paddingTop: SPACING.md,
      paddingBottom: Math.max(insets.bottom, SPACING.md),
      paddingHorizontal: SPACING.lg,
    },
    
    modalPadding: {
      paddingTop: insets.top + SPACING.md,
      paddingBottom: Math.max(insets.bottom, SPACING.md),
      paddingHorizontal: Math.max(insets.left, SPACING.lg),
    },
  };
};

// ============================================================================
// MODAL UTILITIES
// ============================================================================

export const MODAL_STYLES = {
  // Modal overlay background
  overlay: {
    backgroundColor: '#111827',
    flex: 1,
  },
  
  // Header heights for different screens
  headerHeight: {
    modal: 60,
    screen: 56,
    compact: 48,
  },
  
  // Animation durations
  animation: {
    enterDuration: 300,
    exitDuration: 250,
  },
} as const; 