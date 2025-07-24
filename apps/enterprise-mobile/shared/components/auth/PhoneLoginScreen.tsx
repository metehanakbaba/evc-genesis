import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { GlassCard } from '../GlassCard';
import { GlassInput } from './GlassInput';
import { AuthButton } from './AuthButton';

const { width, height } = Dimensions.get('window');

interface PhoneLoginScreenProps {
  onContinue: (phoneNumber: string) => void;
}

export const PhoneLoginScreen: React.FC<PhoneLoginScreenProps> = ({
  onContinue
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    // Clean entry animations
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const validatePhoneNumber = (phone: string) => {
    // Clean phone number for validation
    const cleaned = phone.replace(/\D/g, '');
    
    // Turkish mobile numbers: +90 5XX XXX XX XX
    if (cleaned.startsWith('90')) {
      const number = cleaned.slice(2);
      return number.length === 10 && number.startsWith('5');
    }
    
    // Direct mobile number: 5XX XXX XX XX
    if (cleaned.startsWith('5')) {
      return cleaned.length === 10;
    }
    
    // International format validation for other countries
    return cleaned.length >= 10 && cleaned.length <= 15;
  };

  const handleContinue = async () => {
    setError('');
    
    if (!phoneNumber.trim()) {
      setError('Phone number is required');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onContinue(phoneNumber);
    }, 1000);
  };

  const formatPhoneNumber = (text: string) => {
    // Remove all non-digits
    const cleaned = text.replace(/\D/g, '');
    
    // Format Turkish numbers
    if (cleaned.startsWith('90') || (!cleaned.startsWith('5') && cleaned.length > 10)) {
      // International format
      const countryCode = cleaned.slice(0, 2);
      const number = cleaned.slice(2, 12);
      if (number.length <= 3) return `+${countryCode} ${number}`;
      if (number.length <= 6) return `+${countryCode} ${number.slice(0, 3)} ${number.slice(3)}`;
      if (number.length <= 8) return `+${countryCode} ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`;
      return `+${countryCode} ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6, 8)} ${number.slice(8)}`;
    }
    
    // Domestic format for Turkish numbers
    if (cleaned.startsWith('5') || cleaned.length <= 10) {
      if (cleaned.length <= 3) return cleaned;
      if (cleaned.length <= 6) return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
      if (cleaned.length <= 8) return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8, 10)}`;
    }
    
    return text;
  };

  const handlePhoneChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);
    if (error) setError('');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <StatusBar style="light" />
      
      {/* Clean Background with Subtle Gradient */}
      <LinearGradient
        colors={['#111827', '#1F2937', '#111827'] as const}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
          className="flex-1 px-6 justify-center"
        >
          {/* Header Section */}
          <View className="items-center mb-12">
            {/* User Icon */}
            <View className="w-24 h-24 mb-8 rounded-3xl bg-white/10 items-center justify-center">
              <Feather name="user" size={40} color="#60A5FA" />
            </View>
            
            <Text className="text-3xl font-bold text-white mb-3">
              Welcome to EVC
            </Text>
            <Text className="text-gray-400 text-center text-base px-8 leading-6">
              Enter your phone number to get started with our EV charging network
            </Text>
          </View>

          {/* Main Input Container */}
          <View className="space-y-6 mb-8">
            {/* Phone Input */}
            <View className="space-y-2">
              <GlassInput
                placeholder="Enter your phone here"
                value={phoneNumber}
                onChangeText={handlePhoneChange}
                keyboardType="phone-pad"
                variant="blue"
                size="lg"
                error={error}
                leftIcon={
                  <View className="flex-row items-center">
                    <Text className="text-white text-base font-medium mr-2">🇹🇷</Text>
                    <Text className="text-gray-400 text-base">+90</Text>
                  </View>
                }
                rightIcon={phoneNumber.length > 0 ? (
                  <Feather name="check-circle" size={20} color="#10B981" />
                ) : undefined}
              />
            </View>

            {/* Continue Button */}
            <AuthButton
              title="Continue"
              variant="emerald"
              size="lg"
              loading={isLoading}
              onPress={handleContinue}
              icon={<Feather name="arrow-right" size={20} color="#FFFFFF" />}
            />
          </View>

          {/* Alternative Login Options */}
          <View className="space-y-4">
            <View className="flex-row items-center space-x-4">
              <View className="flex-1 h-px bg-gray-700" />
              <Text className="text-gray-500 text-sm">or</Text>
              <View className="flex-1 h-px bg-gray-700" />
            </View>

            {/* Social Login Buttons */}
            <View className="space-y-3">
              <Pressable className="flex-row items-center justify-center h-14 rounded-xl bg-white/5 border border-white/10">
                <Feather name="globe" size={20} color="#DB4437" />
                <Text className="text-white font-medium ml-3">Continue with Google</Text>
              </Pressable>

              <Pressable className="flex-row items-center justify-center h-14 rounded-xl bg-white/5 border border-white/10">
                <Feather name="smartphone" size={20} color="#000000" />
                <Text className="text-white font-medium ml-3">Continue with Apple</Text>
              </Pressable>
            </View>
          </View>

          {/* Footer */}
          <View className="mt-8 items-center">
            <Text className="text-gray-500 text-xs text-center leading-5 px-4">
              By signing up, you agree to our{' '}
              <Text className="text-blue-400">Terms & Conditions</Text>, acknowledge our{' '}
              <Text className="text-blue-400">Privacy Policy</Text>, and confirm that you're over 18.
            </Text>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}; 