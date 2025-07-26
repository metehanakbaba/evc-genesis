/**
 * 🏠 Recent Activity Component
 * 
 * Apple-style minimal activity list - colors only for semantic meaning
 */

import React from 'react';
import { View, Text } from 'react-native';
import { ActivityItem } from '../types';
import { SPACING } from '../../../shared/constants';
import { NotificationCard, NotificationType } from '../../../../shared/components';

interface RecentActivityProps {
  activities: ActivityItem[];
  onActivityPress: (activity: ActivityItem) => void;
}

// Apple-style semantic mapping - most activities are neutral
const getActivityNotificationType = (activity: ActivityItem): NotificationType => {
  // Use status field for semantic meaning
  if (activity.status === 'success' || activity.status === 'completed') {
    // Only show success for important completions
    if (activity.type === 'session_completed' || activity.type === 'payment') {
      return 'success';
    }
  }
  
  if (activity.status === 'failed') {
    return 'danger';
  }
  
  if (activity.status === 'pending') {
    return 'loading';
  }
  
  // Most activities are neutral - Apple's approach
  return 'neutral';
};

export function RecentActivity({ activities, onActivityPress }: RecentActivityProps) {
  return (
    <View style={{ paddingHorizontal: SPACING.lg, marginBottom: SPACING.xl }}>
      {/* Apple-style simple header */}
      <Text className="text-white text-lg font-bold" style={{ marginBottom: SPACING.md }}>
        Recent Activity
      </Text>
      
      <View style={{ gap: SPACING.xs }}>
        {activities.map((activity) => (
          <NotificationCard
            key={activity.id}
            type={getActivityNotificationType(activity)}
            title={activity.title}
            subtitle={activity.subtitle}
            onPress={() => onActivityPress(activity)}
            spacing={SPACING}
          />
        ))}
      </View>
    </View>
  );
} 