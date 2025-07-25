import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  Animated,
  Dimensions,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useI18n } from '../../../src/features/common/i18n';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const { t } = useI18n();
  
  // Enhanced Animation Values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const particleAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const textSlideAnim = useRef(new Animated.Value(50)).current;
  const backgroundShiftAnim = useRef(new Animated.Value(0)).current;
  const enterpriseGridAnim = useRef(new Animated.Value(0)).current;
  const holoAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fast & Smooth Animation Sequence - Aligned with Onboarding
    Animated.sequence([
      // Phase 1: Quick logo appearance
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(backgroundShiftAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        })
      ]),
      
      // Phase 2: Text and content
      Animated.parallel([
        Animated.spring(textSlideAnim, {
          toValue: 0,
          tension: 60,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        })
      ]),
      
      // Phase 3: Progress completion
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: false,
      })
    ]).start(() => {
      // Quick completion
      setTimeout(onComplete, 400);
    });

    // Simple glow animation
    const continuousGlow = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 0.8,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        })
      ])
    );
    continuousGlow.start();

    return () => continuousGlow.stop();
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      
      {/* Enterprise Multi-Layer Background System */}
      <View style={{ flex: 1 }}>
        {/* Harmonized Base Gradient - Matching Onboarding */}
        <LinearGradient
          colors={['#0A0A0B', '#1A1A2E', '#16213E', '#0A0A0B']}
          locations={[0, 0.3, 0.7, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />

        {/* Clean Dynamic Overlay */}
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: backgroundShiftAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.6],
            }),
          }}
        >
          <LinearGradient
            colors={[
              'rgba(79, 172, 254, 0.15)',
              'rgba(16, 185, 129, 0.12)',
              'rgba(20, 184, 166, 0.08)',
              'transparent'
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
          />
        </Animated.View>

        {/* Minimal Ambient Particles */}
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: backgroundShiftAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.3],
            }),
          }}
        >
          {[...Array(6)].map((_, i) => (
            <Animated.View
              key={i}
              style={{
                position: 'absolute',
                width: 3,
                height: 3,
                borderRadius: 1.5,
                backgroundColor: i % 3 === 0 ? '#4FACFE' : i % 3 === 1 ? '#10B981' : '#14B8A6',
                left: `${15 + (i * 15) % 70}%`,
                top: `${20 + (i * 20) % 60}%`,
                transform: [{
                  scale: backgroundShiftAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                }],
                shadowColor: i % 3 === 0 ? '#4FACFE' : i % 3 === 1 ? '#10B981' : '#14B8A6',
                shadowOpacity: 0.8,
                shadowRadius: 4,
                elevation: 4,
              }}
            />
          ))}
        </Animated.View>

        {/* Enterprise SafeAreaView - Transparent */}
        <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top', 'bottom']}>
          {/* Main Enterprise Content Container */}
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 }}>
            
            {/* Clean Logo Container - Matching Onboarding Style */}
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
                marginBottom: 48,
              }}
            >
              {/* Simple Glow Ring */}
              <Animated.View
                style={{
                  position: 'absolute',
                  width: 120,
                  height: 120,
                  borderRadius: 60,
                  backgroundColor: 'transparent',
                  borderWidth: 1,
                  borderColor: glowAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['rgba(79, 172, 254, 0)', 'rgba(79, 172, 254, 0.3)'],
                  }),
                  top: -10,
                  left: -10,
                  shadowColor: '#4FACFE',
                  shadowOpacity: 0.6,
                  shadowRadius: 20,
                  elevation: 10,
                }}
              />

              {/* Main Icon Container - Same as Onboarding */}
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 28,
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  borderWidth: 1,
                  borderColor: 'rgba(255, 255, 255, 0.15)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.3,
                  shadowRadius: 24,
                  elevation: 12,
                  overflow: 'hidden',
                }}
              >
                {/* Inner Gradient - Matching Onboarding */}
                <LinearGradient
                  colors={[
                    'rgba(79, 172, 254, 0.20)',
                    'rgba(59, 130, 246, 0.10)',
                    'rgba(79, 172, 254, 0.05)',
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: 27,
                  }}
                />
                
                {/* Icon */}
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <MaterialIcons name="electric-bolt" size={44} color="#4FACFE" />
                </View>
              </View>
            </Animated.View>

            {/* Enterprise Typography Section */}
            <Animated.View
              style={{
                transform: [{ translateY: textSlideAnim }],
                opacity: fadeAnim,
                alignItems: 'center',
                marginBottom: 40,
              }}
            >
                             {/* Smart Brand Name */}
               <Text
                 style={{
                   fontSize: 42,
                   fontWeight: '900',
                   color: '#FFFFFF',
                   textAlign: 'center',
                   marginBottom: 16,
                   letterSpacing: -1.2,
                   textShadowColor: 'rgba(79, 172, 254, 0.6)',
                   textShadowOffset: { width: 0, height: 3 },
                   textShadowRadius: 12,
                 }}
               >
                 {t.auth.brandName || 'EVCharge'}
               </Text>

               {/* Smart Tagline with Advanced Glassmorphism */}
               <View
                 style={{
                   paddingHorizontal: 32,
                   paddingVertical: 16,
                   borderRadius: 24,
                   backgroundColor: 'rgba(255, 255, 255, 0.04)',
                   borderWidth: 2,
                   borderColor: 'rgba(255, 255, 255, 0.08)',
                   marginBottom: 24,
                   shadowColor: '#4FACFE',
                   shadowOffset: { width: 0, height: 4 },
                   shadowOpacity: 0.2,
                   shadowRadius: 12,
                   elevation: 8,
                 }}
               >
                 <LinearGradient
                   colors={[
                     'rgba(79, 172, 254, 0.08)',
                     'rgba(147, 51, 234, 0.06)',
                     'rgba(79, 172, 254, 0.04)',
                   ]}
                   start={{ x: 0, y: 0 }}
                   end={{ x: 1, y: 1 }}
                   style={{
                     position: 'absolute',
                     top: 0,
                     left: 0,
                     right: 0,
                     bottom: 0,
                     borderRadius: 22,
                   }}
                 />
                 <Text
                   style={{
                     fontSize: 18,
                     color: 'rgba(255, 255, 255, 0.95)',
                     textAlign: 'center',
                     fontWeight: '600',
                     letterSpacing: 0.8,
                   }}
                 >
                   {t.auth.tagline || 'Smart Charging Experience'}
                 </Text>
               </View>

               {/* Status Grid */}
               <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                 <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                   <View
                     style={{
                       width: 8,
                       height: 8,
                       borderRadius: 4,
                       backgroundColor: '#10B981',
                       shadowColor: '#10B981',
                       shadowOpacity: 1,
                       shadowRadius: 6,
                       elevation: 4,
                     }}
                   />
                   <Text style={{ fontSize: 13, color: 'rgba(255, 255, 255, 0.8)', fontWeight: '600' }}>
                     Ready
                   </Text>
                 </View>
                 
                 <View style={{ width: 2, height: 16, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
                 
                 <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                   <MaterialIcons name="verified" size={14} color="#4FACFE" />
                   <Text style={{ fontSize: 13, color: 'rgba(255, 255, 255, 0.8)', fontWeight: '600' }}>
                     Trusted
                   </Text>
                 </View>
                 
                 <View style={{ width: 2, height: 16, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
                 
                 <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                   <MaterialIcons name="flash-on" size={14} color="#4FACFE" />
                   <Text style={{ fontSize: 13, color: 'rgba(255, 255, 255, 0.8)', fontWeight: '600' }}>
                     Fast
                   </Text>
                 </View>
               </View>
            </Animated.View>
          </View>

          {/* Enterprise Progress System */}
          <View style={{ position: 'absolute', bottom: 80, left: 40, right: 40 }}>
            {/* Progress Container with Enterprise Styling */}
            <View
              style={{
                height: 6,
                borderRadius: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                borderWidth: 2,
                borderColor: 'rgba(255, 255, 255, 0.08)',
                overflow: 'hidden',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
                             {/* Elegant Animated Progress Bar */}
               <Animated.View
                 style={{
                   height: '100%',
                   borderRadius: 3,
                   width: progressAnim.interpolate({
                     inputRange: [0, 1],
                     outputRange: ['0%', '100%'],
                   }),
                 }}
               >
                                <LinearGradient
                 colors={['#4FACFE', '#10B981', '#14B8A6']}
                 start={{ x: 0, y: 0 }}
                 end={{ x: 1, y: 0 }}
                 style={{ flex: 1, borderRadius: 3 }}
               />
                 
                 {/* Progress Glow Effect */}
                 <LinearGradient
                   colors={['transparent', 'rgba(255, 255, 255, 0.4)', 'transparent']}
                   start={{ x: 0, y: 0 }}
                   end={{ x: 1, y: 0 }}
                   style={{
                     position: 'absolute',
                     top: 0,
                     left: 0,
                     right: 0,
                     bottom: 0,
                     borderRadius: 3,
                   }}
                 />
               </Animated.View>
            </View>

                         {/* Progress Status */}
             <Text
               style={{
                 fontSize: 14,
                 color: 'rgba(255, 255, 255, 0.7)',
                 textAlign: 'center',
                 marginTop: 20,
                 fontWeight: '600',
                 letterSpacing: 0.8,
                 textShadowColor: 'rgba(79, 172, 254, 0.3)',
                 textShadowOffset: { width: 0, height: 1 },
                 textShadowRadius: 4,
               }}
             >
               Loading...
             </Text>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}; 