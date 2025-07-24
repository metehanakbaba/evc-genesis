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
import { DesignTokens } from '../../../../shared/design-tokens';

interface ButtonProps extends Omit<PressableProps, 'style'> {
  title: string;
  variant?: 'blue' | 'emerald' | 'purple' | 'teal';
  size?: 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right' | 'none';
  outline?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'blue',
  size = 'lg',
  loading = false,
  icon,
  iconPosition = 'none',
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

  const sizeStyles = {
    md: {
      padding: 'px-6 py-3',
      text: 'text-base font-medium',
      height: 'min-h-[48px]'
    },
    lg: {
      padding: 'px-8 py-4',
      text: 'text-lg font-semibold',
      height: 'min-h-[56px]'
    }
  };

  const currentSizeStyle = sizeStyles[size];

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
        width: fullWidth ? '100%' : 'auto',
      }}
    >
      <Pressable
        onPress={disabled || loading ? undefined : onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className={`
          relative
          ${currentSizeStyle.padding}
          ${currentSizeStyle.height}
          rounded-xl
          overflow-hidden
          items-center
          justify-center
          ${disabled ? 'opacity-50' : ''}
          ${fullWidth ? 'w-full' : ''}
        `}
        disabled={disabled || loading}
        {...props}
      >
        {/* Background */}
        {!outline ? (
          <LinearGradient
            colors={[variantConfig.primary, `${variantConfig.primary}CC`]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          />
        ) : (
          <View 
            className={`absolute inset-0 bg-transparent border-2 ${variantConfig.border} rounded-xl`}
          />
        )}

        {/* Content Container */}
        <View className="flex-row items-center justify-center space-x-2">
          {/* Left Icon */}
          {icon && iconPosition === 'left' && !loading && (
            <View className="mr-2">
              {icon}
            </View>
          )}

          {/* Loading Indicator */}
          {loading && (
            <ActivityIndicator 
              size="small" 
              color={outline ? variantConfig.primary : '#FFFFFF'} 
              className="mr-2"
            />
          )}

          {/* Button Text */}
          <Text 
            className={`
              ${currentSizeStyle.text}
              ${outline ? variantConfig.text : 'text-white'}
              text-center
            `}
          >
            {title}
          </Text>

          {/* Right Icon */}
          {icon && iconPosition === 'right' && !loading && (
            <View className="ml-2">
              {icon}
            </View>
          )}
        </View>

        {/* Shimmer Effect */}
        <View className="absolute inset-0 opacity-20">
          <LinearGradient
            colors={['transparent', 'rgba(255,255,255,0.1)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          />
        </View>
      </Pressable>
    </Animated.View>
  );
}; 