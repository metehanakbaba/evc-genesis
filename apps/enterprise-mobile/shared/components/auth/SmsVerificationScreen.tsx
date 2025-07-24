import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  TextInput,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { AuthButton } from './AuthButton';

interface SmsVerificationScreenProps {
  phoneNumber: string;
  onVerify: (code: string) => void;
  onResendCode: () => void;
  onBack: () => void;
}

export const SmsVerificationScreen: React.FC<SmsVerificationScreenProps> = ({
  phoneNumber,
  onVerify,
  onResendCode,
  onBack
}) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const inputRefs = useRef<(TextInput | null)[]>(Array(6).fill(null));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Start countdown timer
    const timer = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCodeChange = (text: string, index: number) => {
    if (text.length > 1) return;
    
    setError('');
    
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto-focus next input
    if (text.length === 1 && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all digits are entered
    if (text.length === 1 && index === 5) {
      const fullCode = newCode.join('');
      if (fullCode.length === 6) {
        handleVerify(fullCode);
      }
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (event.nativeEvent.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (verificationCode?: string) => {
    const codeToVerify = verificationCode || code.join('');
    
    if (codeToVerify.length !== 6) {
      setError('Please enter the 6-digit code');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // For demo, accept any 6-digit code
      onVerify(codeToVerify);
    }, 1500);
  };

  const handleResendCode = () => {
    if (!canResend) return;
    
    setCanResend(false);
    setResendTimer(60);
    setCode(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    
    // Restart timer
    const timer = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    onResendCode();
  };

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

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <Animated.View
          style={{ opacity: fadeAnim }}
          className="flex-1 px-6 py-8"
        >
          {/* Header with Back Button */}
          <View className="flex-row items-center mb-12">
            <Pressable
              onPress={onBack}
              className="w-12 h-12 rounded-xl bg-white/10 items-center justify-center mr-4"
            >
              <Feather name="arrow-left" size={20} color="#FFFFFF" />
            </Pressable>
            
            <View className="flex-1">
              <Text className="text-2xl font-bold text-white">Verify Phone</Text>
              <Text className="text-gray-400 text-sm mt-1">
                Code sent to {phoneNumber}
              </Text>
            </View>
          </View>

          {/* Verification Content */}
          <View className="flex-1 justify-center">
            <View className="items-center mb-12">
              {/* SMS Icon */}
              <View className="w-20 h-20 mb-6 rounded-2xl bg-blue-500/20 items-center justify-center">
                <Feather name="message-square" size={32} color="#60A5FA" />
              </View>
              
              <Text className="text-xl font-semibold text-white mb-3">
                Enter Verification Code
              </Text>
              <Text className="text-gray-400 text-center text-base px-8">
                Please enter the 6-digit code sent to your phone number
              </Text>
            </View>

            {/* Code Input Grid */}
            <View className="flex-row justify-between space-x-3 mb-8">
              {code.map((digit, index) => (
                <View
                  key={index}
                  className={`
                    flex-1 h-16 rounded-xl border-2 bg-white/5 overflow-hidden
                    ${digit ? 'border-blue-400/60' : 'border-white/20'}
                    ${error ? 'border-red-400/60' : ''}
                  `}
                >
                  <TextInput
                    ref={ref => { inputRefs.current[index] = ref; }}
                    value={digit}
                    onChangeText={(text) => handleCodeChange(text, index)}
                    onKeyPress={(event) => handleKeyPress(event, index)}
                    keyboardType="numeric"
                    maxLength={1}
                    textAlign="center"
                    className="flex-1 text-white text-2xl font-bold"
                    selectionColor="#60A5FA"
                    autoFocus={index === 0}
                  />
                </View>
              ))}
            </View>

            {/* Error Message */}
            {error && (
              <Text className="text-red-400 text-sm font-medium text-center mb-6">
                {error}
              </Text>
            )}

            {/* Verify Button */}
            <AuthButton
              title="Verify Code"
              variant="blue"
              size="lg"
              loading={isLoading}
              onPress={() => handleVerify()}
              icon={<Feather name="check" size={20} color="#FFFFFF" />}
            />
          </View>

          {/* Resend Section */}
          <View className="items-center space-y-4">
            <Text className="text-gray-400 text-sm">
              Didn't receive the code?
            </Text>
            
            {canResend ? (
              <Pressable
                onPress={handleResendCode}
                className="px-6 py-3 rounded-xl bg-blue-500/10 border border-blue-400/25"
              >
                <Text className="text-blue-300 font-semibold">
                  Resend Code
                </Text>
              </Pressable>
            ) : (
              <View className="px-6 py-3 rounded-xl bg-gray-500/10 border border-gray-400/25">
                <Text className="text-gray-400 font-semibold">
                  Resend in {resendTimer}s
                </Text>
              </View>
            )}
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}; 