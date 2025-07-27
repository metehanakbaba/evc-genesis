/**
 * 🎬 Animated Grid Item Component
 * 
 * Premium animated wrapper for individual grid items
 */

import React, { useEffect, useRef } from 'react';
import { Pressable, Animated, Easing } from 'react-native';
import { ActionGridItem } from '../../types';
import { SPACING } from '../../../../shared/constants';

interface AnimatedGridItemProps {
  item: ActionGridItem;
  index: number;
  children: React.ReactNode;
  delay?: number;
}

export function AnimatedGridItem({ 
  item, 
  index, 
  children, 
  delay = 0 
}: AnimatedGridItemProps) {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const pressAnim = useRef(new Animated.Value(1)).current;

  // Entrance animation on mount
  useEffect(() => {
    const startDelay = delay + (index * 150); // Staggered delay

    Animated.parallel([
      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay: startDelay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      // Slide up
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 700,
        delay: startDelay,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
      // Scale up
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        delay: startDelay + 100,
        easing: Easing.out(Easing.back(1.1)),
        useNativeDriver: true,
      }),
    ]).start();
  }, [index, delay]);

  // Press animation handlers
  const handlePressIn = () => {
    Animated.spring(pressAnim, {
      toValue: 0.95,
      tension: 300,
      friction: 20,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressAnim, {
      toValue: 1,
      tension: 300,
      friction: 20,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    // Enhanced press feedback
    Animated.sequence([
      Animated.timing(pressAnim, {
        toValue: 0.92,
        duration: 100,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.spring(pressAnim, {
        toValue: 1,
        tension: 400,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Call original onPress
    item.onPress();
  };

  return (
    <Animated.View
      style={{
        flex: 1,
        opacity: fadeAnim,
        transform: [
          {
            translateY: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [40, 0],
            }),
          },
          { scale: scaleAnim },
          { scale: pressAnim },
        ],
      }}
    >
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{ 
          borderRadius: 18,
          shadowColor: item.shadowColor,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.15,
          shadowRadius: 16,
          elevation: 8,
        }}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
} 