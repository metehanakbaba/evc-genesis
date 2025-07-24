import React, { useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { Input } from '../../common/ui/Input';
import { Button } from '../../common/ui/Button';

interface LoginScreenProps {
  onContinue: (phone: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onContinue }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleContinue = async () => {
    if (!phoneNumber.trim()) {
      setError('Please enter your phone number');
      return;
    }

    // Basic phone validation
    const phoneRegex = /^(\+48|0)?[4-9][0-9]{8}$/;
    if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
      setError('Please enter a valid Polish phone number');
      return;
    }

    setError('');
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onContinue(phoneNumber);
    }, 1500);
  };

  const formatPhoneNumber = (text: string) => {
    // Remove all non-digits
    const cleaned = text.replace(/\D/g, '');
    
    // Format as Polish phone number
    if (cleaned.length <= 9) {
      let formatted = cleaned;
      if (formatted.length > 3) {
        formatted = formatted.slice(0, 3) + ' ' + formatted.slice(3);
      }
      if (formatted.length > 7) {
        formatted = formatted.slice(0, 7) + ' ' + formatted.slice(7);
      }
      setPhoneNumber(formatted);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <StatusBar style="light" />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={['#1F2937', '#065F46', '#1F2937'] as const}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView 
            contentContainerStyle={{ flex: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View className="flex-1 justify-center px-8">
              {/* Header */}
              <View className="items-center mb-12">
                <View className="w-16 h-16 rounded-2xl bg-emerald-500 items-center justify-center mb-6">
                  <Feather name="smartphone" size={32} color="#FFFFFF" />
                </View>
                
                <Text className="text-3xl font-bold text-white text-center mb-2">
                  Welcome Back
                </Text>
                <Text className="text-gray-300 text-center text-base leading-relaxed">
                  Enter your phone number to continue
                </Text>
              </View>

              {/* Phone Input */}
              <View className="mb-8">
                <Input
                  label="Phone Number"
                  variant="emerald"
                  value={phoneNumber}
                  onChangeText={formatPhoneNumber}
                  placeholder="+48 XXX XXX XXX"
                  keyboardType="phone-pad"
                  maxLength={14}
                  error={error}
                  leftIcon={
                    <Feather name="phone" size={20} color="#6B7280" />
                  }
                />
              </View>

              {/* Continue Button */}
              <Button
                title="Continue"
                variant="emerald"
                size="lg"
                loading={isLoading}
                onPress={handleContinue}
                icon={<Feather name="arrow-right" size={20} color="#FFFFFF" />}
                iconPosition="right"
              />

              {/* Footer */}
              <View className="mt-12 items-center">
                <Text className="text-gray-400 text-sm text-center leading-relaxed">
                  By continuing, you agree to our{'\n'}
                  <Text className="text-emerald-400">Terms of Service</Text> and{' '}
                  <Text className="text-emerald-400">Privacy Policy</Text>
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}; 