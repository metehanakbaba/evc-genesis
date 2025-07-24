import React, { useRef } from 'react';
import { 
  Pressable, 
  Text, 
  View, 
  Animated,
  ActivityIndicator,
  PressableProps 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DesignTokens } from '../../design-tokens';

interface AuthButtonProps extends Omit<PressableProps, 'style'> {
  title: string;
  variant?: 'blue' | 'emerald' | 'purple' | 'teal';
  size?: 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  outline?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  title,
  variant = 'blue',
  size = 'lg',
  loading = false,
  icon,
  outline = false,
  fullWidth = true,
  disabled = false,
  onPress,
  ...props
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const variantConfig = DesignTokens.colors[variant];

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const buttonHeight = size === 'lg' ? 'h-16' : 'h-14';
  const textSize = size === 'lg' ? 'text-lg' : 'text-base';
  const iconSize = size === 'lg' ? 24 : 20;

  const isDisabled = disabled || loading;

  // Convert hex to RGB for gradient colors
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const primaryRgb = hexToRgb(variantConfig.primary);
  
  const gradientColors: readonly [string, string, ...string[]] = outline 
    ? ['transparent', 'transparent'] as const
    : primaryRgb 
      ? [
          `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.9)`,
          `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.7)`,
          `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.9)`
        ] as const
      : ['rgba(59, 130, 246, 0.9)', 'rgba(59, 130, 246, 0.7)', 'rgba(59, 130, 246, 0.9)'] as const;

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
        width: fullWidth ? '100%' : 'auto',
      }}
    >
      <Pressable
        onPress={isDisabled ? undefined : onPress}
        onPressIn={isDisabled ? undefined : handlePressIn}
        onPressOut={isDisabled ? undefined : handlePressOut}
        className={`
          ${buttonHeight}
          ${fullWidth ? 'w-full' : 'px-8'}
          rounded-xl
          border
          ${outline 
            ? `border-${variant}-400/40 bg-transparent` 
            : `border-${variant}-300/20`
          }
          overflow-hidden
          ${isDisabled ? 'opacity-50' : 'opacity-100'}
        `}
        style={{
          shadowColor: outline ? 'transparent' : variantConfig.primary,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: isDisabled ? 0 : 0.25,
          shadowRadius: 16,
          elevation: isDisabled ? 0 : 8,
        }}
        {...props}
      >
                 {/* Glassmorphism Background */}
         {!outline && (
           <LinearGradient
             colors={gradientColors}
             start={{ x: 0, y: 0 }}
             end={{ x: 1, y: 1 }}
             style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
           />
         )}
         
         {/* Outline glassmorphism background */}
         {outline && (
           <LinearGradient
             colors={variantConfig.gradientColors}
             start={{ x: 0, y: 0 }}
             end={{ x: 1, y: 1 }}
             style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
           />
         )}
         
         {/* Shimmer Effect */}
         {!isDisabled && (
           <LinearGradient
             colors={['transparent', 'rgba(255,255,255,0.1)', 'transparent']}
             start={{ x: 0, y: 0 }}
             end={{ x: 1, y: 0 }}
             style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
           />
         )}
        
        {/* Button Content */}
        <View className="flex-1 flex-row items-center justify-center space-x-3 px-6">
          {/* Loading Spinner */}
          {loading && (
            <ActivityIndicator 
              size="small" 
              color={outline ? variantConfig.primary : '#FFFFFF'} 
            />
          )}
          
          {/* Icon */}
          {!loading && icon && (
            <View style={{ width: iconSize, height: iconSize }}>
              {icon}
            </View>
          )}
          
          {/* Title */}
          <Text
            className={`
              ${textSize}
              font-semibold
              ${outline ? variantConfig.text : 'text-white'}
              ${loading ? 'ml-2' : ''}
            `}
          >
            {title}
          </Text>
        </View>
        
        {/* Inner glow */}
        {!outline && (
          <View className="absolute inset-x-0 top-0 h-px bg-white/20" />
        )}
      </Pressable>
    </Animated.View>
  );
}; 