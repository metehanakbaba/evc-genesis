/**
 * 🏠 Recent Activity Component
 * 
 * Display list of recent user activities
 */

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ActivityItem } from '../types';
import { SPACING } from '../../../shared/constants';

interface RecentActivityProps {
  activities: ActivityItem[];
  onActivityPress: (activity: ActivityItem) => void;
}

export function RecentActivity({ activities, onActivityPress }: RecentActivityProps) {
  return (
    <View style={{ paddingHorizontal: SPACING.lg, marginBottom: SPACING.xl }}>
      <Text className="text-white text-lg font-bold" style={{ marginBottom: SPACING.md }}>
        Recent Activity
      </Text>
      
      <View style={{ gap: SPACING.xs }}>
        {activities.map((activity) => (
          <Pressable
            key={activity.id}
            onPress={() => onActivityPress(activity)}
            className="active:scale-98"
            style={{
              padding: SPACING.md,
              backgroundColor: '#1F2937',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#374151'
            }}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <View 
                  className="w-8 h-8 rounded-lg items-center justify-center"
                  style={{ 
                    backgroundColor: activity.color + '15',
                    marginRight: SPACING.sm
                  }}
                >
                  {activity.iconFamily === 'MaterialIcons' ? (
                    <MaterialIcons name={activity.icon as any} size={14} color={activity.color} />
                  ) : (
                    <Ionicons name={activity.icon as any} size={14} color={activity.color} />
                  )}
                </View>
                
                <View className="flex-1">
                  <Text className="text-white text-sm font-medium">{activity.title}</Text>
                  <Text className="text-gray-500 text-xs">{activity.subtitle}</Text>
                </View>
              </View>
              
              <Text className="text-gray-300 text-sm font-medium">{activity.value}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
} 