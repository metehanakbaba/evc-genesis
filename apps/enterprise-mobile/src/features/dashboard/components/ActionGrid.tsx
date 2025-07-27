/**
 * 🏠 Enhanced Action Grid Component
 *
 * Grid of action buttons with premium animations
 */

import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ActionGridItem } from '../types';
import { SPACING } from '../../../shared/constants';
import { AnimatedGridItem, StaggeredGridContainer } from './animations';

interface ActionGridProps {
  items: ActionGridItem[];
}

export function ActionGrid({ items }: ActionGridProps) {
  return (
    <StaggeredGridContainer animationDelay={300}>
      {items.map((item, index) => (
        <AnimatedGridItem key={item.id} item={item} index={index} delay={200}>
          <View className="flex-1 overflow-hidden" style={{ borderRadius: 18 }}>
            {/* Background Image */}
            {item.backgroundImage && (
              <Image
                source={item.backgroundImage}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0.5,
                  borderRadius: 18,
                }}
                resizeMode="cover"
              />
            )}

            {/* Gradient Overlays */}
            <LinearGradient
              colors={['rgba(31,41,55,0.8)', 'rgba(17,24,39,0.8)', 'rgba(15,23,42,0.8)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 18,
              }}
            />
            <LinearGradient
              colors={[`${item.color}33`, `${item.color}20`, `${item.color}10`]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1.2, y: 0.8 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 18,
              }}
            />

            <View
              style={{
                padding: SPACING.md,
                borderWidth: 1,
                borderColor: `${item.color}20`,
                borderRadius: 18,
              }}>
              {/* Icon */}
              <LinearGradient
                colors={[`${item.color}30`, `${item.color}20`, `${item.color}10`]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: SPACING.sm,
                  borderWidth: 1,
                  borderColor: `${item.color}25`,
                }}>
                <Ionicons name={item.icon as any} size={20} color={item.color} />
              </LinearGradient>

              {/* Content */}
              <Text
                className="text-base font-bold tracking-tight text-white"
                style={{ marginBottom: SPACING.xs }}>
                {item.title}
              </Text>
              <Text
                className="text-xs leading-relaxed text-gray-400"
                style={{ marginBottom: SPACING.sm }}>
                {item.subtitle}
              </Text>

              {/* Status */}
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      backgroundColor: item.statusColor,
                      marginRight: SPACING.xs,
                      shadowColor: item.shadowColor,
                      shadowOpacity: 0.6,
                      shadowRadius: 2,
                    }}
                  />
                  <Text className="text-xs font-medium" style={{ color: item.statusColor }}>
                    {item.statusText}
                  </Text>
                </View>
                {item.additionalInfo && (
                  <View className="flex-row items-center">
                    <Ionicons name="flash" size={10} color={item.additionalInfoColor} />
                    <Text
                      className="text-xs font-medium"
                      style={{
                        marginLeft: 2,
                        color: item.additionalInfoColor,
                      }}>
                      {item.additionalInfo}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </AnimatedGridItem>
      ))}
    </StaggeredGridContainer>
  );
}
