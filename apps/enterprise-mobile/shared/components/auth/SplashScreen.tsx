import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  Animated,
  Dimensions
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useI18n } from '../../../src/features/common/i18n';

const { width } = Dimensions.get('window');

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const { t } = useI18n();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Splash animation sequence
    Animated.sequence([
      // Logo fade in and scale
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        })
      ]),
      // Progress bar animation
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      })
    ]).start(() => {
      // Complete splash after animations
      setTimeout(onComplete, 500);
    });
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <StatusBar style="light" />
      
      {/* Green Gradient Background */}
      <LinearGradient
        colors={['#1F2937', '#065F46', '#1F2937'] as const}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 }}
      >
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
          className="items-center space-y-8"
        >
          {/* Logo Icon */}
          <View className="w-20 h-20 rounded-2xl bg-emerald-500 items-center justify-center mb-4">
            <Feather name="zap" size={40} color="#FFFFFF" />
          </View>

          {/* Brand Name */}
          <Text className="text-4xl font-bold text-emerald-400 text-center">
            {t.auth.brandName}
          </Text>

          {/* Tagline */}
          <Text className="text-gray-300 text-center text-lg px-4">
            {t.auth.tagline}
          </Text>
        </Animated.View>

        {/* Loading Progress Bar */}
        <View className="absolute bottom-20 left-8 right-8">
          <View className="h-1 bg-gray-700 rounded-full overflow-hidden">
            <Animated.View
              className="h-full bg-emerald-400 rounded-full"
              style={{
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              }}
            />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}; 