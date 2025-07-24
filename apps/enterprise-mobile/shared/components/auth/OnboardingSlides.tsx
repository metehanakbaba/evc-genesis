import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView,
  Animated,
  Dimensions,
  Pressable
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { AuthButton } from './AuthButton';

const { width, height } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  iconName: keyof typeof Feather.glyphMap;
  variant: 'blue' | 'emerald' | 'purple' | 'teal';
  features: string[];
  gradient: readonly [string, string, string];
}

interface OnboardingSlidesProps {
  onComplete: () => void;
  onSkip: () => void;
}

const slides: OnboardingSlide[] = [
  {
    id: 'find-stations',
    title: 'Find Charging Stations',
    description: 'Discover thousands of charging stations across Turkey with real-time availability',
    iconName: 'map-pin',
    variant: 'blue',
    features: [
      'Real-time station status on map',
      'Filter by distance and connector type',
      'CCS, CHAdeMO and Type2 support',
      'Station details and user reviews'
    ],
    gradient: ['rgba(59, 130, 246, 0.2)', 'rgba(147, 197, 253, 0.1)', 'transparent'] as const
  },
  {
    id: 'smart-charging',
    title: 'Smart Charging',
    description: 'AI-powered charging optimization for the best experience and efficiency',
    iconName: 'zap',
    variant: 'emerald',
    features: [
      'Automatic charging scheduling',
      'Real-time charging status tracking',
      'Energy cost calculation',
      'Fast charging route planning'
    ],
    gradient: ['rgba(16, 185, 129, 0.2)', 'rgba(110, 231, 183, 0.1)', 'transparent'] as const
  },
  {
    id: 'digital-wallet',
    title: 'Digital Wallet',
    description: 'Secure and fast payment system for seamless charging experience',
    iconName: 'credit-card',
    variant: 'teal',
    features: [
      'Instant balance top-up and payments',
      'Detailed spending analytics',
      'Auto-pay and subscription options',
      'Cashback and loyalty programs'
    ],
    gradient: ['rgba(20, 184, 166, 0.2)', 'rgba(45, 212, 191, 0.1)', 'transparent'] as const
  },
  {
    id: 'premium-experience',
    title: 'Premium Experience',
    description: 'Advanced features and personalized services for power users',
    iconName: 'star',
    variant: 'purple',
    features: [
      'Personalized dashboard and analytics',
      '24/7 premium customer support',
      'Station reservations and priority access',
      'Carbon footprint tracking'
    ],
    gradient: ['rgba(139, 92, 246, 0.2)', 'rgba(168, 85, 247, 0.1)', 'transparent'] as const
  }
];

export const OnboardingSlides: React.FC<OnboardingSlidesProps> = ({
  onComplete,
  onSkip
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLastSlide, setIsLastSlide] = useState(false);
  
  // Animation refs
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setIsLastSlide(currentIndex === slides.length - 1);
    
    // Animate current slide
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(progressAnim, {
        toValue: currentIndex / (slides.length - 1),
        duration: 400,
        useNativeDriver: false,
      })
    ]).start();
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

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <StatusBar style="light" />
      
      {/* Clean Background */}
      <LinearGradient
        colors={['#111827', '#1F2937', '#111827'] as const}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />

      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <Text className="text-lg font-bold text-white">
          EV Charging
        </Text>
        <Pressable onPress={onSkip}>
          <Text className="text-gray-400 font-medium">Skip</Text>
        </Pressable>
      </View>

      {/* Progress Bar */}
      <View className="px-6 mb-8">
        <View className="h-1 bg-gray-700 rounded-full overflow-hidden">
          <Animated.View
            className="h-full rounded-full"
            style={{
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
              backgroundColor: currentSlide.variant === 'blue' ? '#3B82F6' :
                             currentSlide.variant === 'emerald' ? '#10B981' :
                             currentSlide.variant === 'teal' ? '#14B8A6' : '#8B5CF6'
            }}
          />
        </View>
        <Text className="text-gray-400 text-sm mt-2 text-center">
          {currentIndex + 1} of {slides.length}
        </Text>
      </View>

      {/* Slides Content */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        className="flex-1"
      >
        {slides.map((slide, index) => (
          <Animated.View
            key={slide.id}
            style={{
              width,
              opacity: index === currentIndex ? fadeAnim : 0.3,
              transform: [{ translateY: index === currentIndex ? slideAnim : 20 }],
            }}
            className="flex-1 px-6"
          >
            <View className="flex-1 justify-center space-y-8">
              {/* Icon and Title */}
              <View className="items-center space-y-6">
                {/* Icon Container */}
                <View 
                  className={`
                    w-24 h-24 rounded-3xl items-center justify-center
                    ${slide.variant === 'blue' ? 'bg-blue-500/20' : ''}
                    ${slide.variant === 'emerald' ? 'bg-emerald-500/20' : ''}
                    ${slide.variant === 'teal' ? 'bg-teal-500/20' : ''}
                    ${slide.variant === 'purple' ? 'bg-purple-500/20' : ''}
                  `}
                >
                  <Feather 
                    name={slide.iconName} 
                    size={40} 
                    color={
                      slide.variant === 'blue' ? '#60A5FA' :
                      slide.variant === 'emerald' ? '#34D399' :
                      slide.variant === 'teal' ? '#4DD0E1' : '#A78BFA'
                    } 
                  />
                </View>

                <View className="space-y-3">
                  <Text className="text-3xl font-bold text-white text-center">
                    {slide.title}
                  </Text>
                  <Text className="text-gray-300 text-center text-lg leading-7 px-4">
                    {slide.description}
                  </Text>
                </View>
              </View>

              {/* Features List */}
              <View className="space-y-4">
                {slide.features.map((feature, featureIndex) => (
                  <View
                    key={featureIndex}
                    className="flex-row items-center space-x-4 px-4"
                  >
                    <View 
                      className={`
                        w-8 h-8 rounded-xl items-center justify-center
                        ${slide.variant === 'blue' ? 'bg-blue-500/20' : ''}
                        ${slide.variant === 'emerald' ? 'bg-emerald-500/20' : ''}
                        ${slide.variant === 'teal' ? 'bg-teal-500/20' : ''}
                        ${slide.variant === 'purple' ? 'bg-purple-500/20' : ''}
                      `}
                    >
                      <Feather 
                        name="check" 
                        size={16} 
                        color={
                          slide.variant === 'blue' ? '#60A5FA' :
                          slide.variant === 'emerald' ? '#34D399' :
                          slide.variant === 'teal' ? '#4DD0E1' : '#A78BFA'
                        } 
                      />
                    </View>
                    <Text className="flex-1 text-gray-300 text-base leading-6">
                      {feature}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </Animated.View>
        ))}
      </ScrollView>

      {/* Navigation Dots */}
      <View className="flex-row justify-center space-x-2 px-6 mb-8">
        {slides.map((_, index) => (
          <Pressable
            key={index}
            onPress={() => goToSlide(index)}
            className={`
              h-2 rounded-full transition-all duration-300
              ${index === currentIndex 
                ? 'w-8' 
                : 'w-2 bg-gray-600'
              }
            `}
            style={index === currentIndex ? {
              backgroundColor: currentSlide.variant === 'blue' ? '#3B82F6' :
                             currentSlide.variant === 'emerald' ? '#10B981' :
                             currentSlide.variant === 'teal' ? '#14B8A6' : '#8B5CF6'
            } : undefined}
          />
        ))}
      </View>

      {/* Navigation Buttons */}
      <View className="flex-row justify-between items-center px-6 pb-8">
        <Pressable
          onPress={previousSlide}
          disabled={currentIndex === 0}
          className={`
            w-14 h-14 rounded-xl items-center justify-center border
            ${currentIndex === 0 
              ? 'bg-gray-700/50 border-gray-600/30' 
              : 'bg-white/5 border-white/10'
            }
          `}
        >
          <Feather 
            name="arrow-left" 
            size={20} 
            color={currentIndex === 0 ? '#6B7280' : '#FFFFFF'} 
          />
        </Pressable>

        <View className="flex-1 px-6">
          <AuthButton
            title={isLastSlide ? 'Get Started!' : 'Continue'}
            variant={currentSlide.variant}
            size="lg"
            onPress={nextSlide}
            icon={<Feather name={isLastSlide ? 'check' : 'arrow-right'} size={20} color="#FFFFFF" />}
          />
        </View>

        <Pressable
          onPress={nextSlide}
          disabled={isLastSlide}
          className={`
            w-14 h-14 rounded-xl items-center justify-center border
            ${isLastSlide 
              ? 'bg-gray-700/50 border-gray-600/30' 
              : 'bg-white/5 border-white/10'
            }
          `}
        >
          <Feather 
            name="arrow-right" 
            size={20} 
            color={isLastSlide ? '#6B7280' : '#FFFFFF'} 
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}; 