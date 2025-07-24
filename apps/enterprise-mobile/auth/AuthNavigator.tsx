import React, { useState } from 'react';
import { 
  SplashScreen,
  PhoneLoginScreen, 
  SmsVerificationScreen, 
  OnboardingSlides 
} from '../shared/components';

type AuthState = 'splash' | 'phone' | 'sms' | 'onboarding' | 'complete';

interface AuthNavigatorProps {
  onAuthComplete: () => void;
}

export const AuthNavigator: React.FC<AuthNavigatorProps> = ({ onAuthComplete }) => {
  const [authState, setAuthState] = useState<AuthState>('splash');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSplashComplete = () => {
    setAuthState('phone');
  };

  const handlePhoneSubmit = (phone: string) => {
    setPhoneNumber(phone);
    setAuthState('sms');
  };

  const handleSmsVerify = (code: string) => {
    // Here you would typically verify the code with your backend
    console.log('SMS verified with code:', code);
    setAuthState('onboarding');
  };

  const handleOnboardingComplete = () => {
    setAuthState('complete');
    onAuthComplete();
  };

  const handleResendSms = () => {
    // Here you would resend the SMS code
    console.log('Resending SMS to:', phoneNumber);
  };

  const handleBackToPhone = () => {
    setAuthState('phone');
  };

  const handleSkipOnboarding = () => {
    setAuthState('complete');
    onAuthComplete();
  };

  switch (authState) {
    case 'splash':
      return <SplashScreen onComplete={handleSplashComplete} />;
      
    case 'phone':
      return <PhoneLoginScreen onContinue={handlePhoneSubmit} />;
    
    case 'sms':
      return (
        <SmsVerificationScreen
          phoneNumber={phoneNumber}
          onVerify={handleSmsVerify}
          onResendCode={handleResendSms}
          onBack={handleBackToPhone}
        />
      );
    
    case 'onboarding':
      return (
        <OnboardingSlides
          onComplete={handleOnboardingComplete}
          onSkip={handleSkipOnboarding}
        />
      );
    
    default:
      return null;
  }
}; 