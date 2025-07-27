/**
 * 🟢 Pulse Status Indicator Component
 * 
 * Animated status indicators with pulse effects
 */

import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';

interface PulseStatusIndicatorProps {
  isActive?: boolean;
  color?: string;
  size?: number;
  pulseIntensity?: number;
  pulseSpeed?: number;
  showRing?: boolean;
}

export function PulseStatusIndicator({
  isActive = true,
  color = '#10B981',
  size = 8,
  pulseIntensity = 0.3,
  pulseSpeed = 1000,
  showRing = true
}: PulseStatusIndicatorProps) {
  // Animation values
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  // Pulse animation
  useEffect(() => {
    if (isActive) {
      // Main pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: pulseSpeed,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: pulseSpeed,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Active state animations
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.back(1.1)),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Inactive state
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 300,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.6,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isActive, pulseSpeed]);

  return (
    <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
      {/* Outer pulse ring */}
      {showRing && isActive && (
        <Animated.View
          style={{
            position: 'absolute',
            width: size * 3,
            height: size * 3,
            borderRadius: (size * 3) / 2,
            backgroundColor: color,
            opacity: pulseAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [pulseIntensity, 0],
            }),
            transform: [
              {
                scale: pulseAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1.4],
                }),
              },
            ],
          }}
        />
      )}

      {/* Middle ring */}
      {showRing && isActive && (
        <Animated.View
          style={{
            position: 'absolute',
            width: size * 2,
            height: size * 2,
            borderRadius: (size * 2) / 2,
            backgroundColor: color,
            opacity: pulseAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [pulseIntensity * 0.7, 0],
            }),
            transform: [
              {
                scale: pulseAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.2],
                }),
              },
            ],
          }}
        />
      )}

      {/* Main status dot */}
      <Animated.View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          transform: [
            { scale: scaleAnim },
            {
              scale: isActive
                ? pulseAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.1],
                  })
                : 1,
            },
          ],
          opacity: opacityAnim,
          shadowColor: color,
          shadowOpacity: isActive ? 0.6 : 0.3,
          shadowRadius: size / 2,
          shadowOffset: { width: 0, height: 0 },
          elevation: 4,
        }}
      />

      {/* Inner highlight */}
      <Animated.View
        style={{
          position: 'absolute',
          width: size * 0.4,
          height: size * 0.4,
          borderRadius: (size * 0.4) / 2,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          top: size * 0.2,
          left: size * 0.3,
          transform: [
            {
              scale: isActive
                ? pulseAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.8],
                  })
                : 0.8,
            },
          ],
          opacity: opacityAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.4, 0.8],
          }),
        }}
      />
    </View>
  );
} 