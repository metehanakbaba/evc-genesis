/**
 * 🔔 Notification Card Component (Shared)
 * 
 * TypeSafe reusable notification card with Apple-style minimal color usage
 * Colors only used for meaningful semantic states, most content is neutral
 */

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export type NotificationType = 'success' | 'danger' | 'warning' | 'info' | 'loading' | 'neutral';

export interface NotificationCardProps {
  type: NotificationType;
  title: string;
  subtitle: string;
  count?: number;
  onPress: () => void;
  spacing?: {
    sm: number;
    md: number;
  };
}

// Apple-style minimal color palette - colors only for semantic meaning
const notificationConfig = {
  // Success - only for actual successful completion
  success: {
    icon: 'checkmark-circle' as const,
    colors: ['rgba(16, 185, 129, 0.08)', 'rgba(5, 150, 105, 0.04)', 'rgba(4, 120, 87, 0.02)'] as const,
    shadowColor: '#10B981',
    borderColor: 'rgba(16, 185, 129, 0.15)',
    iconBg: 'rgba(16, 185, 129, 0.15)',
    iconColor: '#10B981',
    badgeColor: '#10B981'
  },
  // Danger - only for critical errors/warnings
  danger: {
    icon: 'alert-circle' as const,
    colors: ['rgba(239, 68, 68, 0.08)', 'rgba(220, 38, 38, 0.04)', 'rgba(185, 28, 28, 0.02)'] as const,
    shadowColor: '#EF4444',
    borderColor: 'rgba(239, 68, 68, 0.15)',
    iconBg: 'rgba(239, 68, 68, 0.15)',
    iconColor: '#EF4444',
    badgeColor: '#EF4444'
  },
  // Warning - only for attention-required situations
  warning: {
    icon: 'warning' as const,
    colors: ['rgba(245, 158, 11, 0.08)', 'rgba(217, 119, 6, 0.04)', 'rgba(180, 83, 9, 0.02)'] as const,
    shadowColor: '#F59E0B',
    borderColor: 'rgba(245, 158, 11, 0.15)',
    iconBg: 'rgba(245, 158, 11, 0.15)',
    iconColor: '#F59E0B',
    badgeColor: '#F59E0B'
  },
  // Info - only for important informational content
  info: {
    icon: 'information-circle' as const,
    colors: ['rgba(59, 130, 246, 0.08)', 'rgba(37, 99, 235, 0.04)', 'rgba(29, 78, 216, 0.02)'] as const,
    shadowColor: '#3B82F6',
    borderColor: 'rgba(59, 130, 246, 0.15)',
    iconBg: 'rgba(59, 130, 246, 0.15)',
    iconColor: '#3B82F6',
    badgeColor: '#3B82F6'
  },
  // Loading - only for active processes
  loading: {
    icon: 'time' as const,
    colors: ['rgba(139, 92, 246, 0.08)', 'rgba(124, 58, 237, 0.04)', 'rgba(109, 40, 217, 0.02)'] as const,
    shadowColor: '#8B5CF6',
    borderColor: 'rgba(139, 92, 246, 0.15)',
    iconBg: 'rgba(139, 92, 246, 0.15)',
    iconColor: '#8B5CF6',
    badgeColor: '#8B5CF6'
  },
  // Neutral - Apple-style default for most content
  neutral: {
    icon: 'ellipse' as const,
    colors: ['rgba(107, 114, 128, 0.06)', 'rgba(75, 85, 99, 0.03)', 'rgba(55, 65, 81, 0.02)'] as const,
    shadowColor: '#6B7280',
    borderColor: 'rgba(107, 114, 128, 0.12)',
    iconBg: 'rgba(107, 114, 128, 0.12)',
    iconColor: '#9CA3AF',
    badgeColor: '#6B7280'
  }
} as const;

export function NotificationCard({ 
  type, 
  title, 
  subtitle, 
  count, 
  onPress,
  spacing = { sm: 8, md: 16 }
}: NotificationCardProps) {
  const config = notificationConfig[type];

  return (
    <Pressable
      onPress={onPress}
      className="active:scale-98 overflow-hidden"
      style={{
        borderRadius: 14,
        shadowColor: config.shadowColor,
        shadowOpacity: type === 'neutral' ? 0.06 : 0.12,
        shadowRadius: 6,
        elevation: type === 'neutral' ? 2 : 4
      }}
    >
      <LinearGradient
        colors={config.colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          padding: spacing.md,
          borderWidth: 1,
          borderColor: config.borderColor,
          borderRadius: 14
        }}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            <View 
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                backgroundColor: config.iconBg,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: spacing.sm
              }}
            >
              <Ionicons name={config.icon} size={16} color={config.iconColor} />
            </View>
            <View className="flex-1">
              <Text className="text-white text-sm font-semibold">
                {title}
              </Text>
              <Text className="text-gray-400 text-xs mt-0.5">
                {subtitle}
              </Text>
            </View>
          </View>
          
          <View className="flex-row items-center">
            {count && (
              <View 
                style={{
                  backgroundColor: config.badgeColor,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 10,
                  marginRight: spacing.sm
                }}
              >
                <Text className="text-black text-xs font-bold">{count}</Text>
              </View>
            )}
            <Ionicons name="chevron-forward" size={16} color="#6B7280" />
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
} 