import React from 'react';
import { View, Pressable, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DesignTokens } from '../../../../shared/design-tokens';

interface CardProps {
  children: React.ReactNode;
  variant?: 'blue' | 'emerald' | 'purple' | 'teal';
  size?: 'sm' | 'md' | 'lg';
  onPress?: () => void;
  showAccent?: boolean;
  className?: string;
  animated?: boolean;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'blue',
  size = 'md',
  onPress,
  showAccent = true,
  className = '',
  animated = true,
  style
}) => {
  const variantConfig = DesignTokens.colors[variant];
  
  const sizes = {
    sm: 'p-4 rounded-lg',
    md: 'p-6 rounded-xl', 
    lg: 'p-8 rounded-2xl'
  };

  const Component = onPress ? Pressable : View;

  return (
    <Component
      onPress={onPress}
      className={`
        relative 
        ${sizes[size]}
        border
        ${variantConfig.border}
        overflow-hidden
        ${onPress ? 'active:scale-95' : ''}
        ${animated ? 'transition-all duration-300' : ''}
        ${className}
      `}
      style={[
        {
          shadowColor: variantConfig.primary,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.15,
          shadowRadius: 16,
          elevation: 8,
        },
        style
      ]}
    >
      {/* Glassmorphism Background with Multiple Layers */}
      <LinearGradient
        colors={variantConfig.gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />
      
      {/* Subtle overlay for depth */}
      <View className="absolute inset-0 bg-gray-900/20" />
      
      {/* Shimmer effect overlay */}
      <LinearGradient
        colors={['transparent', 'rgba(255,255,255,0.03)', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />
      
      {/* Top inner glow */}
      <View className="absolute top-0 left-0 right-0 h-px bg-white/10" />
      
      {/* Floating accent dot */}
      {showAccent && (
        <View 
          className={`
            absolute -top-2 -right-2 
            w-4 h-4 
            ${variantConfig.accent}
            rounded-full
            animate-pulse
            shadow-lg
          `}
          style={{
            shadowColor: variantConfig.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.6,
            shadowRadius: 8,
          }}
        />
      )}
      
      {/* Content Container */}
      <View className="relative z-10">
        {children}
      </View>
    </Component>
  );
}; 