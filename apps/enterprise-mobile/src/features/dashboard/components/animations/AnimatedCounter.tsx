/**
 * 💰 Animated Counter Component
 * 
 * Premium number counter with smooth transitions for wallet balance
 */

import React, { useEffect, useRef, useState } from 'react';
import { Text, Animated, Easing } from 'react-native';

interface AnimatedCounterProps {
  value: number;
  currency?: string;
  duration?: number;
  isLoading?: boolean;
  decimals?: number;
  textStyle?: any;
  onAnimationComplete?: () => void;
}

export function AnimatedCounter({
  value,
  currency = '$',
  duration = 1500,
  isLoading = false,
  decimals = 2,
  textStyle,
  onAnimationComplete
}: AnimatedCounterProps) {
  // Animation values
  const animatedValue = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(isLoading ? 0.3 : 1)).current;
  const loadingAnim = useRef(new Animated.Value(0)).current;
  
  // State for current displayed value
  const [displayValue, setDisplayValue] = useState(0);

  // Loading skeleton animation
  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(loadingAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(loadingAnim, {
            toValue: 0,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
      
      Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isLoading]);

  // Counter animation
  useEffect(() => {
    if (!isLoading && value !== undefined) {
      animatedValue.setValue(displayValue);
      
      Animated.timing(animatedValue, {
        toValue: value,
        duration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start(() => {
        onAnimationComplete?.();
      });

      // Update displayed value during animation
      const listener = animatedValue.addListener(({ value: animValue }) => {
        setDisplayValue(animValue);
      });

      return () => {
        animatedValue.removeListener(listener);
      };
    }
  }, [value, isLoading, duration]);

  // Format number for display
  const formatValue = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(Math.abs(num));
  };

  if (isLoading) {
    return (
      <Animated.View
        style={{
          opacity: loadingAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.3, 0.7],
          }),
        }}
      >
        <Text style={[textStyle, { color: '#6B7280' }]}>
          {currency}••••••
        </Text>
      </Animated.View>
    );
  }

  return (
    <Animated.Text
      style={[
        textStyle,
        {
          opacity: fadeAnim,
        },
      ]}
    >
      {currency}
      <Animated.Text style={[textStyle, { color: '#5EEAD4' }]}>
        {formatValue(displayValue)}
      </Animated.Text>
    </Animated.Text>
  );
} 