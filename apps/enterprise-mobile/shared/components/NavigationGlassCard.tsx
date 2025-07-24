import React from 'react';
import { View, Text } from 'react-native';
import { GlassCard } from './GlassCard';
import { ColorVariant, DesignTokens } from '../design-tokens';

interface NavigationGlassCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  badge?: string;
  variant?: ColorVariant;
  onPress: () => void;
  className?: string;
}

export const NavigationGlassCard: React.FC<NavigationGlassCardProps> = ({
  title,
  description,
  icon,
  badge,
  variant = 'blue',
  onPress,
  className = ''
}) => {
  const variantConfig = DesignTokens.colors[variant];

  return (
    <GlassCard
      variant={variant}
      size="lg"
      onPress={onPress}
      className={`min-h-[140px] ${className}`}
    >
      <View className="flex-1 justify-between">
        {/* Header */}
        <View className="flex-row items-start justify-between mb-4">
          <View className="flex-1">
            <Text className="text-white text-lg font-bold mb-1">
              {title}
            </Text>
            <Text className="text-gray-300 text-sm leading-relaxed">
              {description}
            </Text>
          </View>
          
          {/* Icon */}
          {icon && (
            <View className={`
              w-12 h-12 
              rounded-xl 
              bg-gradient-to-br from-white/15 to-white/5
              border border-white/25
              items-center justify-center
            `}>
              <View className={variantConfig.text}>
                {icon}
              </View>
            </View>
          )}
        </View>

        {/* Badge */}
        {badge && (
          <View className="flex-row justify-end">
            <View className={`
              px-3 py-1.5 
              rounded-full 
              ${variantConfig.badge}
              border
            `}>
              <Text className={`${variantConfig.text} text-xs font-medium`}>
                {badge}
              </Text>
            </View>
          </View>
        )}
      </View>
    </GlassCard>
  );
}; 