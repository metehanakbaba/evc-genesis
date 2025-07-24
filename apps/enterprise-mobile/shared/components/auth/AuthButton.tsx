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
  iconPosition?: 'left' | 'right' | 'none' | 'absolute-left'; // Added absolute-left for social buttons
  outline?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'primary' | 'social';
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  title,
  variant = 'blue',
  size = 'lg',
  loading = false,
  icon,
  iconPosition = 'none',
  outline = false,
  fullWidth = true,
  disabled = false,
  type = 'primary',
  onPress,
  ...props
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const variantConfig = DesignTokens.colors[variant];

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const buttonHeight = size === 'lg' ? 'h-14' : 'h-12';
  const textSize = size === 'lg' ? 'text-base' : 'text-sm';
  const iconSize = size === 'lg' ? 22 : 20;

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
          `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.95)`,
          `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.85)`,
          `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.95)`
        ] as const
      : ['rgba(37, 99, 235, 0.95)', 'rgba(37, 99, 235, 0.85)', 'rgba(37, 99, 235, 0.95)'] as const;

  // For social buttons, use neutral styling
  const socialGradientColors: readonly [string, string] = [
    'rgba(255, 255, 255, 0.04)',
    'rgba(255, 255, 255, 0.02)'
  ] as const;

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
          ${type === 'social' 
            ? 'border-white/15 bg-white/5' 
            : outline 
              ? `border-${variant}-300/30 bg-transparent` 
              : `border-${variant}-300/20`
          }
          overflow-hidden
          ${isDisabled ? 'opacity-50' : 'opacity-100'}
          relative
        `}
        style={{
          shadowColor: type === 'social' ? 'transparent' : outline ? 'transparent' : variantConfig.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: isDisabled ? 0 : type === 'social' ? 0 : 0.15,
          shadowRadius: 8,
          elevation: isDisabled ? 0 : type === 'social' ? 0 : 4,
        }}
        {...props}
      >
        {/* Background Gradient */}
        {!outline && type !== 'social' && (
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          />
        )}
        
        {/* Social button background */}
        {type === 'social' && (
          <LinearGradient
            colors={socialGradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          />
        )}
        
        {/* Outline glassmorphism background */}
        {outline && type !== 'social' && (
          <LinearGradient
            colors={variantConfig.gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          />
        )}
        
        {/* Subtle shimmer for primary buttons */}
        {!isDisabled && type !== 'social' && (
          <LinearGradient
            colors={['transparent', 'rgba(255,255,255,0.08)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          />
        )}
        
        {/* Absolute positioned icon for social buttons */}
        {!loading && icon && iconPosition === 'absolute-left' && (
          <View 
            style={{ 
              position: 'absolute',
              left: 16,
              top: 0,
              bottom: 0,
              width: iconSize,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {icon}
          </View>
        )}
        
        {/* Button Content */}
        <View className={`
          flex-1 flex-row items-center px-6
          ${iconPosition === 'absolute-left' 
            ? 'justify-center' 
            : type === 'social' 
              ? 'justify-start' 
              : iconPosition === 'left' 
                ? 'justify-start' 
                : iconPosition === 'right' 
                  ? 'justify-between' 
                  : 'justify-center'
          }
        `}>
          {/* Left Icon (for non-absolute positioned icons) */}
          {!loading && icon && iconPosition === 'left' && (
            <View style={{ width: iconSize, height: iconSize }} className="mr-3">
              {icon}
            </View>
          )}
          
          {/* Loading Spinner */}
          {loading && (
            <ActivityIndicator 
              size="small" 
              color={type === 'social' ? '#FFFFFF' : outline ? variantConfig.primary : '#FFFFFF'} 
              className="mr-2"
            />
          )}
          
          {/* Title */}
          <Text
            className={`
              ${textSize}
              font-medium
              ${type === 'social' 
                ? 'text-white' 
                : outline 
                  ? variantConfig.text 
                  : 'text-white'
              }
              ${iconPosition === 'absolute-left' ? 'text-center' : ''}
            `}
          >
            {title}
          </Text>
          
          {/* Right Icon */}
          {!loading && icon && iconPosition === 'right' && type !== 'social' && (
            <View style={{ width: iconSize, height: iconSize }} className="ml-3">
              {icon}
            </View>
          )}
        </View>
        
        {/* Inner highlight for primary buttons */}
        {!outline && type !== 'social' && (
          <View className="absolute inset-x-0 top-0 h-px bg-white/15" />
        )}
      </Pressable>
    </Animated.View>
  );
}; 