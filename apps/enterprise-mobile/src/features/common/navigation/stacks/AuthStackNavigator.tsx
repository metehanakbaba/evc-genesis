/**
 * 🔐 Auth Stack Navigator
 * 
 * Authentication flow using existing AuthNavigator
 */

import React from 'react';
import { AuthNavigator } from '../../../../../auth/AuthNavigator';
import { useAuthGuard } from '../AuthGuard';

export function AuthStackNavigator() {
  const { login } = useAuthGuard();

  const handleAuthComplete = () => {
    // This will be called when auth flow is complete
    // The AuthGuard will handle the navigation automatically
    login('', ''); // Mock login to trigger auth state change
  };

  return <AuthNavigator onAuthComplete={handleAuthComplete} />;
} 