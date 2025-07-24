import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, AntDesign } from '@expo/vector-icons';
import { useI18n } from '../../../src/features/common/i18n';
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
  const { t } = useI18n();
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
      setError(t.auth.phoneRequired);
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setError(t.auth.phoneInvalid);
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="flex-1 px-6 justify-center"
          >
            {/* Header Section */}
            <View className="items-center" style={{ marginBottom: 20 }}>
              {/* User Icon */}
              <View className="w-18 h-18 rounded-2xl bg-white/8 items-center justify-center" style={{ marginBottom: 16 }}>
                <Feather name="user" size={28} color="#6B7280" />
              </View>
              
              <Text className="text-xl font-bold text-white" style={{ marginBottom: 6 }}>
                {t.auth.welcomeToEvc}
              </Text>
              <Text className="text-gray-400 text-center text-sm px-8 leading-5">
                {t.auth.phoneSubtitle}
              </Text>
            </View>

            {/* Main Input Container - Better positioned */}
            <View style={{ marginBottom: 28 }}>
              {/* Phone Input */}
              <View style={{ marginBottom: 16 }}>
                <GlassInput
                  placeholder={t.auth.phonePlaceholder}
                  value={phoneNumber}
                  onChangeText={handlePhoneChange}
                  keyboardType="phone-pad"
                  variant="blue"
                  size="lg"
                  error={error}
                  leftIcon={
                    <View className="flex-row items-center">
                      <Text className="text-white text-sm font-medium mr-2">🇹🇷</Text>
                      <Text className="text-gray-400 text-sm">+90</Text>
                    </View>
                  }
                  rightIcon={phoneNumber.length > 0 ? (
                    <Feather name="check-circle" size={18} color="#059669" />
                  ) : undefined}
                />
              </View>

              {/* Continue Button - No icon as requested */}
              <AuthButton
                title={t.auth.continue}
                variant="emerald"
                size="lg"
                loading={isLoading}
                onPress={handleContinue}
                type="primary"
                iconPosition="none"
              />
            </View>

          {/* Alternative Login Options */}
          <View style={{ marginBottom: 24 }}>
            {/* OR Divider with proper spacing */}
            <View className="flex-row items-center space-x-4" style={{ paddingVertical: 12, marginBottom: 24 }}>
              <View className="flex-1 h-px bg-gray-600" />
              <Text className="text-gray-400 text-sm px-4">{t.auth.or}</Text>
              <View className="flex-1 h-px bg-gray-600" />
            </View>

            {/* Social Login Buttons with proper spacing between them */}
            <View>
              <View style={{ marginBottom: 16 }}>
                <AuthButton
                  title={t.auth.continueWithGoogle}
                  variant="blue"
                  size="lg"
                  type="social"
                  iconPosition="absolute-left"
                  icon={<AntDesign name="google" size={22} color="#DB4437" />}
                  onPress={() => console.log('Google login')}
                />
              </View>

              <AuthButton
                title={t.auth.continueWithApple}
                variant="blue"
                size="lg"
                type="social"
                iconPosition="absolute-left"
                icon={<AntDesign name="apple1" size={22} color="#FFFFFF" />}
                onPress={() => console.log('Apple login')}
              />
            </View>
          </View>

          {/* Footer */}
          <View className="items-center" style={{ marginTop: 24 }}>
            <Text className="text-gray-500 text-xs text-center leading-4 px-4">
              {t.auth.termsText}{' '}
              <Text className="text-blue-400">{t.auth.termsConditions}</Text>, {t.auth.termsText.toLowerCase()}{' '}
              <Text className="text-blue-400">{t.auth.privacyPolicy}</Text>, {t.auth.ageConfirmation}
            </Text>
          </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}; 