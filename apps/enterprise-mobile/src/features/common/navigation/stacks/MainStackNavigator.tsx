/**
 * 🔋 Main Stack Navigator
 * 
 * Simplified implementation for React 19 compatibility with proper SafeArea handling
 */

import React, { useState } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Animated, StyleSheet, View } from 'react-native';

import { MainTabNavigator } from './MainTabNavigator';
import { QRScannerScreen } from '../../../qr-scanner/screens/QRScannerScreen';
import { WalletScreen } from '../../../wallet/screens/WalletScreen';
import { StationMapScreen } from '../../../charging-stations/screens/StationMapScreen';

// ============================================================================
// MODAL STATE CONTEXT
// ============================================================================

type ModalType = 'qr' | 'wallet' | 'stations' | null;

// Global modal state - simple approach for React 19
let globalModalState: ModalType = null;
let globalModalSetter: ((modal: ModalType) => void) | null = null;

export const openModal = (modal: ModalType) => {
  if (globalModalSetter) {
    globalModalSetter(modal);
  }
};

// ============================================================================
// MODAL WRAPPER WITH SAFE AREA SUPPORT
// ============================================================================

function ModalWrapper({ 
  children, 
  visible, 
  onClose 
}: { 
  children: React.ReactNode; 
  visible: boolean; 
  onClose: () => void; 
}) {
  const [animatedValue] = React.useState(new Animated.Value(0));
  const insets = useSafeAreaInsets();

  React.useEffect(() => {
    if (visible) {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, animatedValue]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          zIndex: 1000,
          backgroundColor: '#111827',
          // SafeArea için padding ekle - StatusBar'ın altında kalmayacak
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
          opacity: animatedValue,
        },
      ]}
    >
      {/* Modal content container */}
      <View style={{ flex: 1 }}>
        {children}
      </View>
    </Animated.View>
  );
}

// ============================================================================
// MAIN STACK NAVIGATOR
// ============================================================================

export function MainStackNavigator() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  // Register global modal setter
  React.useEffect(() => {
    globalModalSetter = setActiveModal;
    return () => {
      globalModalSetter = null;
    };
  }, []);

  const closeModal = () => setActiveModal(null);

  return (
    <>
      {/* Status Bar Configuration - Transparent */}
      <StatusBar style="light" backgroundColor="transparent" translucent />
      
      {/* Main App Container - No top edge, let content extend under status bar */}
      <SafeAreaView className="flex-1" edges={[]} style={{ backgroundColor: 'transparent' }}>
        <MainTabNavigator />
      </SafeAreaView>
      
      {/* Modal Overlays with SafeArea Support */}
      <ModalWrapper visible={activeModal === 'qr'} onClose={closeModal}>
        <QRScannerScreen onClose={closeModal} />
      </ModalWrapper>
      
      <ModalWrapper visible={activeModal === 'wallet'} onClose={closeModal}>
        <WalletScreen onClose={closeModal} />
      </ModalWrapper>
      
      <ModalWrapper visible={activeModal === 'stations'} onClose={closeModal}>
        <StationMapScreen onClose={closeModal} />
      </ModalWrapper>
      
    </>
  );
} 