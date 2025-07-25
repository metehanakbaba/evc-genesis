import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView,
  Animated,
  Dimensions,
  Pressable,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Feather, MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { AuthButton } from './AuthButton';

const { width, height } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  iconFamily: 'Feather' | 'MaterialIcons' | 'FontAwesome5' | 'Ionicons';
  variant: 'blue' | 'emerald' | 'purple' | 'teal' | 'premium' | 'Tesla';
  features: {
    title: string;
    description: string;
    icon: string;
    iconFamily: 'Feather' | 'MaterialIcons' | 'FontAwesome5' | 'Ionicons';
    premium?: boolean;
  }[];
  gradient: readonly [string, string, string, string];
  accentColor: string;
  shadowColor: string;
  category: 'core' | 'premium' | 'enterprise';
}

interface OnboardingSlidesProps {
  onComplete: () => void;
  onSkip: () => void;
}

const slides: OnboardingSlide[] = [
  {
    id: 'find-stations',
    title: 'Find Charging Stations',
    subtitle: 'Real-time Availability',
    description: 'Locate nearby charging stations with live availability and pricing information.',
    iconName: 'location-on',
    iconFamily: 'MaterialIcons',
    variant: 'blue',
    category: 'core',
    accentColor: '#4FACFE',
    shadowColor: '#2563EB',
    features: [
      {
        title: 'Live station status',
        description: 'Real-time availability updates',
        icon: 'activity',
        iconFamily: 'Feather'
      },
      {
        title: 'Price comparison',
        description: 'Compare charging costs',
        icon: 'attach-money',
        iconFamily: 'MaterialIcons'
      },
      {
        title: 'Quick navigation',
        description: 'GPS directions to stations',
        icon: 'navigation',
        iconFamily: 'MaterialIcons'
      }
    ],
    gradient: [
      'rgba(79, 172, 254, 0.25)', 
      'rgba(59, 130, 246, 0.15)', 
      'rgba(37, 99, 235, 0.08)', 
      'transparent'
    ] as const
  },
  {
    id: 'smart-charging',
    title: 'Smart Charging',
    subtitle: 'Optimize Your Sessions',
    description: 'Schedule charging sessions and track your energy consumption in real-time.',
    iconName: 'electric-bolt',
    iconFamily: 'MaterialIcons',
    variant: 'emerald',
    category: 'core',
    accentColor: '#10B981',
    shadowColor: '#059669',
    features: [
      {
        title: 'Session scheduling',
        description: 'Plan charging times',
        icon: 'schedule',
        iconFamily: 'MaterialIcons'
      },
      {
        title: 'Energy tracking',
        description: 'Monitor consumption',
        icon: 'battery-charging-full',
        iconFamily: 'MaterialIcons'
      },
      {
        title: 'Cost calculator',
        description: 'Track charging expenses',
        icon: 'calculate',
        iconFamily: 'MaterialIcons'
      }
    ],
    gradient: [
      'rgba(16, 185, 129, 0.25)', 
      'rgba(5, 150, 105, 0.18)', 
      'rgba(4, 120, 87, 0.12)', 
      'transparent'
    ] as const
  },
  {
    id: 'digital-wallet',
    title: 'Digital Wallet',
    subtitle: 'Secure Payments',
    description: 'Fast and secure payment system with automatic charging and expense tracking.',
    iconName: 'account-balance-wallet',
    iconFamily: 'MaterialIcons',
    variant: 'teal',
    category: 'core',
    accentColor: '#14B8A6',
    shadowColor: '#0891B2',
    features: [
      {
        title: 'Auto-pay enabled',
        description: 'Seamless transactions',
        icon: 'payment',
        iconFamily: 'MaterialIcons'
      },
      {
        title: 'Expense tracking',
        description: 'Monthly spending reports',
        icon: 'bar-chart',
        iconFamily: 'MaterialIcons'
      },
      {
        title: 'Multiple payment methods',
        description: 'Cards, mobile wallets',
        icon: 'smartphone',
        iconFamily: 'MaterialIcons'
      }
    ],
    gradient: [
      'rgba(20, 184, 166, 0.25)', 
      'rgba(13, 148, 136, 0.18)', 
      'rgba(15, 118, 110, 0.12)', 
      'transparent'
    ] as const
  }
];

export const OnboardingSlides: React.FC<OnboardingSlidesProps> = ({
  onComplete,
  onSkip
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLastSlide, setIsLastSlide] = useState(false);
  
  // Enhanced Animation System
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const particleAnim = useRef(new Animated.Value(0)).current;
  const featureAnimations = useRef(
    slides.map(() => slides[0].features.map(() => new Animated.Value(0)))
  ).current;

  useEffect(() => {
    setIsLastSlide(currentIndex === slides.length - 1);
    
    // Simple & Reliable Animation Sequence
    // Reset animations first
    fadeAnim.setValue(0);
    slideAnim.setValue(30);
    glowAnim.setValue(0);
    particleAnim.setValue(0);
    featureAnimations[currentIndex].forEach(anim => anim.setValue(0));
    
    // Start animations with delay to prevent conflicts
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(progressAnim, {
          toValue: currentIndex / (slides.length - 1),
          duration: 400,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(particleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ]).start();

      // Feature animations with stagger
      featureAnimations[currentIndex].forEach((anim, index) => {
        setTimeout(() => {
          Animated.spring(anim, {
            toValue: 1,
            tension: 60,
            friction: 8,
            useNativeDriver: true,
          }).start();
        }, index * 100);
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      scrollViewRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true
      });
    } else {
      onComplete();
    }
  };

  const previousSlide = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      scrollViewRef.current?.scrollTo({
        x: prevIndex * width,
        animated: true
      });
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    scrollViewRef.current?.scrollTo({
      x: index * width,
      animated: true
    });
  };

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / width);
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < slides.length) {
      setCurrentIndex(newIndex);
    }
  };

  const currentSlide = slides[currentIndex];

  const renderIcon = (iconName: string, iconFamily: string, size: number, color: string) => {
    switch (iconFamily) {
      case 'MaterialIcons':
        return <MaterialIcons name={iconName as any} size={size} color={color} />;
      case 'FontAwesome5':
        return <FontAwesome5 name={iconName as any} size={size} color={color} />;
      case 'Ionicons':
        return <Ionicons name={iconName as any} size={size} color={color} />;
      default:
        return <Feather name={iconName as any} size={size} color={color} />;
    }
  };

    return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      
      {/* Advanced Multi-Layer Background */}
      <View style={{ flex: 1 }}>
        {/* Base Gradient */}
        <LinearGradient
          colors={['#0A0A0B', '#1A1A2E', '#16213E', '#0A0A0B']}
          locations={[0, 0.3, 0.7, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />

        {/* Dynamic Slide Background */}
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.6],
            }),
          }}
        >
          <LinearGradient
            colors={currentSlide.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
          />
        </Animated.View>

        {/* Ambient Particles */}
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: particleAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.3],
            }),
          }}
        >
          {[...Array(8)].map((_, i) => (
            <Animated.View
              key={i}
              style={{
                position: 'absolute',
                width: 3,
                height: 3,
                borderRadius: 1.5,
                backgroundColor: currentSlide.accentColor,
                left: `${15 + (i * 12) % 70}%`,
                top: `${20 + (i * 15) % 60}%`,
                transform: [{
                  scale: particleAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0, 1.5, 0.8],
                  }),
                }],
                shadowColor: currentSlide.accentColor,
                shadowOpacity: 0.8,
                shadowRadius: 6,
                elevation: 4,
              }}
            />
          ))}
        </Animated.View>

        {/* Transparent SafeAreaView */}
        <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top', 'bottom']}>
          {/* Premium Header */}
          <View style={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                  }}
                >
                  <MaterialIcons name="electric-bolt" size={16} color={currentSlide.accentColor} />
                </View>
                <Text style={{ fontSize: 18, fontWeight: '700', color: '#FFFFFF', letterSpacing: -0.5 }}>
                  EVCharge
                </Text>
              </View>
              <Pressable
                onPress={onComplete}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 12,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderWidth: 1,
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                }}
              >
                <Text style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 14, fontWeight: '500' }}>
                  Start
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Enhanced Progress Bar */}
          <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
            <View
              style={{
                height: 6,
                borderRadius: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.12)',
                overflow: 'hidden',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
              }}
            >
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
                  colors={[currentSlide.accentColor, currentSlide.shadowColor]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ flex: 1, borderRadius: 3 }}
                />
              </Animated.View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
              <Text style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 12, fontWeight: '500' }}>
                {currentIndex + 1} of {slides.length}
              </Text>
              <Text style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 12, fontWeight: '500' }}>
                {currentSlide.category.toUpperCase()}
              </Text>
            </View>
          </View>

          {/* Semantic Layout: Header + Content + Footer Structure */}
          <View style={{ flex: 1 }}>
            
            {/* HEADER SECTION - Fixed Height */}
            <View style={{ paddingHorizontal: 24, paddingTop: 20 }}>
              <Animated.View
                style={{
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                  alignItems: 'center',
                }}
              >
                {/* Compact Icon Container */}
                <Animated.View
                  style={{
                    transform: [{ scale: glowAnim }],
                    marginBottom: 20,
                  }}
                >
                  <View
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 24,
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      borderWidth: 1,
                      borderColor: 'rgba(255, 255, 255, 0.15)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      shadowColor: currentSlide.accentColor,
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.3,
                      shadowRadius: 12,
                      elevation: 8,
                    }}
                  >
                    <LinearGradient
                      colors={[
                        `${currentSlide.accentColor}20`,
                        `${currentSlide.shadowColor}10`,
                        `${currentSlide.accentColor}05`,
                      ]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: 23,
                      }}
                    />
                    {renderIcon(currentSlide.iconName, currentSlide.iconFamily, 32, currentSlide.accentColor)}
                  </View>
                </Animated.View>

                {/* Compact Title Section */}
                <View style={{ alignItems: 'center' }}>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: '800',
                      color: '#FFFFFF',
                      textAlign: 'center',
                      marginBottom: 8,
                      letterSpacing: -0.5,
                    }}
                  >
                    {currentSlide.title}
                  </Text>
                  
                  <Text
                    style={{
                      fontSize: 14,
                      color: currentSlide.accentColor,
                      textAlign: 'center',
                      fontWeight: '600',
                      marginBottom: 12,
                    }}
                  >
                    {currentSlide.subtitle}
                  </Text>

                  <Text
                    style={{
                      fontSize: 15,
                      color: 'rgba(255, 255, 255, 0.8)',
                      textAlign: 'center',
                      lineHeight: 22,
                      paddingHorizontal: 20,
                    }}
                  >
                    {currentSlide.description}
                  </Text>
                </View>
              </Animated.View>
            </View>

            {/* CONTENT SECTION - Flexible Height */}
            <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 30, justifyContent: 'center' }}>
              <View style={{ gap: 16 }}>
                                 {currentSlide.features.map((feature, featureIndex) => (
                   <Animated.View
                     key={featureIndex}
                     style={{
                       opacity: featureAnimations[currentIndex] && featureAnimations[currentIndex][featureIndex] 
                         ? featureAnimations[currentIndex][featureIndex] 
                         : 1,
                       transform: [{
                         translateX: featureAnimations[currentIndex] && featureAnimations[currentIndex][featureIndex]
                           ? featureAnimations[currentIndex][featureIndex].interpolate({
                               inputRange: [0, 1],
                               outputRange: [30, 0],
                             })
                           : 0,
                       }],
                     }}
                   >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 16,
                        borderRadius: 12,
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        borderWidth: 1,
                        borderColor: 'rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      {/* Feature Icon */}
                      <View
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          backgroundColor: `${currentSlide.accentColor}15`,
                          borderWidth: 1,
                          borderColor: `${currentSlide.accentColor}25`,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: 14,
                        }}
                      >
                        {renderIcon(feature.icon, feature.iconFamily, 16, currentSlide.accentColor)}
                      </View>

                      {/* Feature Content */}
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: '600',
                            color: '#FFFFFF',
                            marginBottom: 4,
                          }}
                        >
                          {feature.title}
                        </Text>
                        <Text
                          style={{
                            fontSize: 13,
                            color: 'rgba(255, 255, 255, 0.7)',
                            lineHeight: 18,
                          }}
                        >
                          {feature.description}
                        </Text>
                      </View>
                    </View>
                  </Animated.View>
                ))}
              </View>
            </View>
          </View>

          {/* Navigation with Side Buttons */}
          <View style={{ paddingHorizontal: 24, paddingBottom: 32 }}>
            {/* Navigation Dots - Lower Position */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 32, gap: 8 }}>
              {slides.map((_, index) => (
                <Pressable
                  key={index}
                  onPress={() => setCurrentIndex(index)}
                  style={{
                    height: 6,
                    borderRadius: 3,
                    width: index === currentIndex ? 24 : 6,
                    backgroundColor: index === currentIndex 
                      ? currentSlide.accentColor 
                      : 'rgba(255, 255, 255, 0.3)',
                    shadowColor: index === currentIndex ? currentSlide.accentColor : 'transparent',
                    shadowOpacity: 0.6,
                    shadowRadius: 4,
                  }}
                />
              ))}
            </View>

            {/* Side Navigation Buttons */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Pressable
                onPress={() => setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : 0)}
                disabled={currentIndex === 0}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: currentIndex === 0 
                    ? 'rgba(255, 255, 255, 0.03)' 
                    : 'rgba(255, 255, 255, 0.08)',
                  borderWidth: 1,
                  borderColor: currentIndex === 0 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(255, 255, 255, 0.15)',
                  shadowColor: currentIndex === 0 ? 'transparent' : currentSlide.accentColor,
                  shadowOpacity: currentIndex === 0 ? 0 : 0.2,
                  shadowRadius: 8,
                  elevation: currentIndex === 0 ? 0 : 4,
                }}
              >
                <Feather 
                  name="arrow-left" 
                  size={24} 
                  color={currentIndex === 0 ? 'rgba(255, 255, 255, 0.3)' : '#FFFFFF'} 
                />
              </Pressable>

                             <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 20 }}>
                 <Text style={{ 
                   color: 'rgba(255, 255, 255, 0.6)', 
                   fontSize: 14, 
                   fontWeight: '500',
                   textAlign: 'center'
                 }}>
                   Use arrows to navigate features
                 </Text>
               </View>

              <Pressable
                onPress={() => {
                  if (currentIndex < slides.length - 1) {
                    setCurrentIndex(currentIndex + 1);
                  } else {
                    onComplete();
                  }
                }}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  borderWidth: 1,
                  borderColor: 'rgba(255, 255, 255, 0.15)',
                  shadowColor: currentSlide.accentColor,
                  shadowOpacity: 0.3,
                  shadowRadius: 12,
                  elevation: 6,
                }}
              >
                {currentIndex === slides.length - 1 ? (
                  <Feather 
                    name="check" 
                    size={24} 
                    color={currentSlide.accentColor} 
                  />
                ) : (
                  <Feather 
                    name="arrow-right" 
                    size={24} 
                    color="#FFFFFF" 
                  />
                )}
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}; 