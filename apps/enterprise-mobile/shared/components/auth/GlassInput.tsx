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
import { DesignTokens } from '../../design-tokens';

interface GlassInputProps extends TextInputProps {
  label?: string;
  variant?: 'blue' | 'emerald' | 'purple' | 'teal';
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  size?: 'md' | 'lg';
}

export const GlassInput: React.FC<GlassInputProps> = ({
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
          outputRange: [size === 'lg' ? 16 : 12, -8],
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

  const borderColor = error 
    ? 'border-red-400/40' 
    : isFocused 
      ? `border-${variant}-300/60` 
      : `border-${variant}-400/25`;

  const inputHeight = size === 'lg' ? 'h-16' : 'h-14';

  return (
    <View className="space-y-2">
      <View className={`relative ${inputHeight} rounded-xl border ${borderColor} overflow-hidden`}>
        {/* Glassmorphism Background */}
                 <LinearGradient
           colors={
             error 
               ? ['rgba(239, 68, 68, 0.08)', 'rgba(220, 38, 38, 0.04)', 'rgba(185, 28, 28, 0.02)']
               : isFocused
                 ? [
                     `rgba(${variantConfig.primary.replace('#', '').match(/.{2}/g)?.map(x => parseInt(x, 16)).join(', ')}, 0.12)`,
                     `rgba(${variantConfig.primary.replace('#', '').match(/.{2}/g)?.map(x => parseInt(x, 16)).join(', ')}, 0.06)`,
                     `rgba(${variantConfig.primary.replace('#', '').match(/.{2}/g)?.map(x => parseInt(x, 16)).join(', ')}, 0.02)`
                   ]
                 : variantConfig.gradientColors
           }
           start={{ x: 0, y: 0 }}
           end={{ x: 1, y: 1 }}
           style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
         />
        
        {/* Subtle overlay */}
        <View className="absolute inset-0 bg-gray-900/20" />
        
        {/* Input Container */}
        <View className="flex-1 flex-row items-center px-4 relative z-10">
          {/* Left Icon */}
          {leftIcon && (
            <View className="mr-3 opacity-70">
              {leftIcon}
            </View>
          )}
          
          {/* Input Field */}
          <View className="flex-1 relative">
            {/* Floating Label */}
            {label && (
              <Animated.Text
                style={[
                  labelStyle,
                  {
                    position: 'absolute',
                    left: 0,
                    color: error 
                      ? '#F87171' 
                      : isFocused 
                        ? variantConfig.primary 
                        : '#9CA3AF',
                    fontSize: 14,
                    fontWeight: '500',
                    backgroundColor: 'transparent',
                    paddingHorizontal: 4,
                  }
                ]}
              >
                {label}
              </Animated.Text>
            )}
            
            <TextInput
              value={value}
              onChangeText={onChangeText}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={`
                text-white text-base font-medium bg-transparent
                ${label ? 'pt-3' : ''}
                ${size === 'lg' ? 'text-lg' : 'text-base'}
              `}
              placeholderTextColor="rgba(156, 163, 175, 0.6)"
              selectionColor={variantConfig.primary}
              {...props}
            />
          </View>
          
          {/* Right Icon */}
          {rightIcon && (
            <Pressable 
              onPress={onRightIconPress}
              className="ml-3 opacity-70 active:opacity-100"
            >
              {rightIcon}
            </Pressable>
          )}
        </View>
        
        {/* Focus Ring */}
        {isFocused && (
          <View 
            className="absolute inset-0 rounded-xl border-2 opacity-60"
            style={{ borderColor: variantConfig.primary }}
          />
        )}
      </View>
      
      {/* Error Message */}
      {error && (
        <Text className="text-red-400 text-sm font-medium ml-1">
          {error}
        </Text>
      )}
    </View>
  );
}; 