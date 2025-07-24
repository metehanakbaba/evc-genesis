import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Pressable,
  Animated,
  TextInputProps
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DesignTokens } from '../../../../shared/design-tokens';

interface InputProps extends TextInputProps {
  label?: string;
  variant?: 'blue' | 'emerald' | 'purple' | 'teal';
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  size?: 'md' | 'lg';
}

export const Input: React.FC<InputProps> = ({
  label,
  variant = 'blue',
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  size = 'md',
  value,
  onChangeText,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const variantConfig = DesignTokens.colors[variant];

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    if (!value) {
      setIsFocused(false);
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const labelStyle = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [size === 'lg' ? 20 : 16, -10],
        }),
      },
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.85],
        }),
      },
    ],
  };

  const sizeStyles = {
    md: {
      container: 'h-14',
      input: 'text-base',
      padding: 'px-4 pt-5 pb-3'
    },
    lg: {
      container: 'h-16',
      input: 'text-lg',
      padding: 'px-5 pt-6 pb-4'
    }
  };

  const currentSizeStyle = sizeStyles[size];

  return (
    <View className="mb-4">
      {/* Input Container */}
      <View 
        className={`
          relative 
          ${currentSizeStyle.container}
          rounded-xl
          border-2
          ${error ? 'border-red-400/50' : isFocused ? variantConfig.border.replace('/20', '/40') : variantConfig.border}
          overflow-hidden
        `}
      >
        {/* Background Gradient */}
        <LinearGradient
          colors={[
            isFocused ? variantConfig.gradientColors[0] : 'rgba(0,0,0,0.3)',
            isFocused ? variantConfig.gradientColors[1] : 'rgba(0,0,0,0.2)',
            isFocused ? variantConfig.gradientColors[2] : 'rgba(0,0,0,0.1)'
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />

        {/* Content Container */}
        <View className={`flex-row items-center ${currentSizeStyle.padding} h-full`}>
          {/* Left Icon */}
          {leftIcon && (
            <View className="mr-3 opacity-70">
              {leftIcon}
            </View>
          )}

          {/* Input Field Container */}
          <View className="flex-1 relative">
            {/* Animated Label */}
            {label && (
              <Animated.Text
                style={[
                  labelStyle,
                  {
                    position: 'absolute',
                    left: 0,
                    color: error ? '#EF4444' : 
                           isFocused ? variantConfig.primary : '#9CA3AF',
                    fontSize: 14,
                    fontWeight: '500',
                    zIndex: 1,
                  }
                ]}
              >
                {label}
              </Animated.Text>
            )}

            {/* Text Input */}
            <TextInput
              value={value}
              onChangeText={onChangeText}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={`
                ${currentSizeStyle.input}
                text-white
                ${label ? 'pt-3' : 'pt-0'}
              `}
              placeholderTextColor="#6B7280"
              selectionColor={variantConfig.primary}
              {...props}
            />
          </View>

          {/* Right Icon */}
          {rightIcon && (
            <Pressable 
              onPress={onRightIconPress}
              className="ml-3 p-1 opacity-70"
            >
              {rightIcon}
            </Pressable>
          )}
        </View>

        {/* Focus Ring */}
        {isFocused && (
          <View 
            className={`absolute inset-0 rounded-xl border-2 ${variantConfig.border.replace('/20', '/60')} pointer-events-none`}
          />
        )}
      </View>

      {/* Error Message */}
      {error && (
        <Text className="text-red-400 text-sm mt-1 ml-1">
          {error}
        </Text>
      )}
    </View>
  );
}; 