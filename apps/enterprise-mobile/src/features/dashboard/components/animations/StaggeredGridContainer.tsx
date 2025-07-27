/**
 * 🎭 Staggered Grid Container Component
 * 
 * Orchestrates sophisticated grid-wide animations
 */

import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import { SPACING } from '../../../../shared/constants';

interface StaggeredGridContainerProps {
  children: React.ReactNode;
  animationDelay?: number;
  enablePullToRefreshAnimation?: boolean;
}

export function StaggeredGridContainer({ 
  children,
  animationDelay = 200,
  enablePullToRefreshAnimation = false
}: StaggeredGridContainerProps) {
  // Container animations
  const containerOpacity = useRef(new Animated.Value(0)).current;
  const containerSlide = useRef(new Animated.Value(0)).current;
  const headerScale = useRef(new Animated.Value(0.9)).current;

  // Pull to refresh animation (for future use)
  const refreshAnim = useRef(new Animated.Value(0)).current;

  // Container entrance animation
  useEffect(() => {
    Animated.sequence([
      // Wait for header to settle
      Animated.delay(animationDelay),
      
      // Container entrance
      Animated.parallel([
        // Fade in container
        Animated.timing(containerOpacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        // Slide container up
        Animated.timing(containerSlide, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        // Scale header section
        Animated.timing(headerScale, {
          toValue: 1,
          duration: 500,
          easing: Easing.out(Easing.back(1.1)),
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [animationDelay]);

  // Pull to refresh animation method
  const triggerRefreshAnimation = () => {
    Animated.sequence([
      Animated.timing(refreshAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(refreshAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View
      style={{
        paddingHorizontal: SPACING.lg,
        marginBottom: SPACING.lg,
        opacity: containerOpacity,
        transform: [
          {
            translateY: containerSlide.interpolate({
              inputRange: [0, 1],
              outputRange: [30, 0],
            }),
          },
          {
            scale: refreshAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.02],
            }),
          },
        ],
      }}
    >
      {/* Grid Header with Animation */}
      <Animated.View
        style={{
          transform: [{ scale: headerScale }],
          marginBottom: SPACING.sm,
        }}
      >
        {/* Future: Add grid title/subtitle here if needed */}
      </Animated.View>

      {/* Animated Grid Content */}
      <Animated.View
        style={{
          transform: [
            {
              translateY: containerSlide.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        }}
      >
        <View 
          className="flex-row" 
          style={{ 
            gap: SPACING.sm,
            marginBottom: SPACING.md 
          }}
        >
          {children}
        </View>
      </Animated.View>

      {/* Subtle background animation */}
      <Animated.View
        style={{
          position: 'absolute',
          top: -10,
          left: SPACING.lg - 5,
          right: SPACING.lg - 5,
          bottom: -10,
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          borderRadius: 24,
          opacity: containerOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.5],
          }),
        }}
        pointerEvents="none"
      />
    </Animated.View>
  );
} 