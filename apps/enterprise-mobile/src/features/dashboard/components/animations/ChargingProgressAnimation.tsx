/**
 * ⚡ Charging Progress Animation Component
 * 
 * Premium charging animations for mobile charging card
 */

import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface ChargingProgressAnimationProps {
  isCharging?: boolean;
  progress?: number; // 0-100
  size?: number;
  color?: string;
  showProgress?: boolean;
}

export function ChargingProgressAnimation({
  isCharging = false,
  progress = 0,
  size = 60,
  color = '#FCD34D',
  showProgress = true
}: ChargingProgressAnimationProps) {
  // Animation values
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;

  // Pulse animation for charging indicator
  useEffect(() => {
    if (isCharging) {
      // Main pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Glow effect
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 2000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 2000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Sparkle animation
      Animated.loop(
        Animated.timing(sparkleAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [isCharging]);

  // Progress animation
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress / 100,
      duration: 1500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [progress]);

  // Rotation for charging icon
  useEffect(() => {
    if (isCharging) {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 4000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [isCharging]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
      {/* Outer glow ring */}
      <Animated.View
        style={{
          position: 'absolute',
          width: size + 20,
          height: size + 20,
          borderRadius: (size + 20) / 2,
          backgroundColor: color,
          opacity: glowAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.1],
          }),
          transform: [
            {
              scale: glowAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.2],
              }),
            },
          ],
        }}
      />

      {/* Progress ring background */}
      {showProgress && (
        <View
          style={{
            position: 'absolute',
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 3,
            borderColor: 'rgba(255, 255, 255, 0.1)',
          }}
        />
      )}

      {/* Animated progress ring */}
      {showProgress && (
        <Animated.View
          style={{
            position: 'absolute',
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 3,
            borderColor: 'transparent',
            borderTopColor: color,
            borderRightColor: color,
            transform: [
              { rotate: rotateInterpolate },
              {
                scale: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1],
                }),
              },
            ],
            opacity: progressAnim,
          }}
        />
      )}

      {/* Main container with gradient */}
      <Animated.View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: `${color}20`,
          borderWidth: 1,
          borderColor: `${color}35`,
          transform: [
            {
              scale: pulseAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.05],
              }),
            },
          ],
          shadowColor: color,
          shadowOpacity: pulseAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 0.6],
          }),
          shadowRadius: 8,
          elevation: 4,
        }}
      >
        {/* Charging icon */}
        <Animated.View
          style={{
            transform: [
              {
                scale: isCharging
                  ? pulseAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.1],
                    })
                  : 1,
              },
            ],
          }}
        >
          <MaterialIcons 
            name="electric-car" 
            size={size * 0.5} 
            color={color} 
          />
        </Animated.View>

        {/* Sparkle effects */}
        {isCharging && (
          <>
            <Animated.View
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                width: 4,
                height: 4,
                borderRadius: 2,
                backgroundColor: '#FFF',
                opacity: sparkleAnim.interpolate({
                  inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
                  outputRange: [0, 1, 0, 1, 0, 0],
                }),
                transform: [
                  {
                    scale: sparkleAnim.interpolate({
                      inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
                      outputRange: [0, 1.5, 0, 1.5, 0, 0],
                    }),
                  },
                ],
              }}
            />
            <Animated.View
              style={{
                position: 'absolute',
                bottom: 12,
                left: 10,
                width: 3,
                height: 3,
                borderRadius: 1.5,
                backgroundColor: color,
                opacity: sparkleAnim.interpolate({
                  inputRange: [0, 0.3, 0.6, 1],
                  outputRange: [0, 1, 0, 0],
                }),
              }}
            />
          </>
        )}
      </Animated.View>

      {/* Status dot */}
      <Animated.View
        style={{
          position: 'absolute',
          top: -2,
          right: -2,
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: isCharging ? '#10B981' : '#6B7280',
          borderWidth: 2,
          borderColor: '#111827',
          transform: [
            {
              scale: isCharging
                ? pulseAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.2],
                  })
                : 1,
            },
          ],
        }}
      />
    </View>
  );
} 