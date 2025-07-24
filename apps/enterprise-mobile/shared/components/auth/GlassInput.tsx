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

  const inputHeight = size === 'lg' ? 'h-14' : 'h-12'; // Reduced height for better proportions

  return (
    <View className="space-y-1">
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
            <View className="mr-3 opacity-80">
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
                    fontSize: 13,
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
              style={{
                color: '#FFFFFF',
                fontSize: size === 'lg' ? 16 : 14,
                fontWeight: '500',
                backgroundColor: 'transparent',
                paddingTop: label ? 8 : 0,
                paddingBottom: 0,
                lineHeight: size === 'lg' ? 18 : 20,
                textAlignVertical: 'center',
                includeFontPadding: false,
                height: '100%',
              }}
              placeholderTextColor="rgba(156, 163, 175, 0.5)"
              selectionColor={variantConfig.primary}
              multiline={false}
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