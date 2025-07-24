import React from 'react';
import { View, Text } from 'react-native';
import { Card } from '../../common/ui/Card';
import { DesignTokens } from '../../../../shared/design-tokens';

interface StatCardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
  trend?: string;
  description?: string;
  variant?: 'blue' | 'emerald' | 'purple' | 'teal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value, 
  icon,
  trend,
  description,
  variant = 'blue',
  size = 'md',
  className = ''
}) => {
  const variantConfig = DesignTokens.colors[variant];

  return (
    <Card 
      variant={variant}
      size={size}
      className={`min-h-[160px] ${className}`}
      showAccent={true}
    >
      <View className="flex-1 justify-between">
        {/* Header */}
        <View className="flex-row items-start justify-between">
          <View className="flex-1">
            <Text className="text-gray-300 text-sm font-medium mb-2">
              {title}
            </Text>
            <Text className="text-white text-2xl font-bold mb-1">
              {value}
            </Text>
          </View>
          
          {/* Icon */}
          {icon && (
            <View className={`
              w-12 h-12 
              rounded-xl 
              bg-gradient-to-br from-white/10 to-white/5
              border border-white/20
              items-center justify-center
            `}>
              <View className={variantConfig.text}>
                {icon}
              </View>
            </View>
          )}
        </View>

        {/* Footer */}
        <View className="space-y-2">
          {trend && (
            <Text className={`${variantConfig.text} text-sm font-medium`}>
              {trend}
            </Text>
          )}
          {description && (
            <Text className="text-gray-400 text-xs leading-relaxed">
              {description}
            </Text>
          )}
        </View>
      </View>
    </Card>
  );
}; 