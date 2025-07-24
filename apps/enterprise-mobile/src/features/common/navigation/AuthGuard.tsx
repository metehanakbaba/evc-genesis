/**
 * 🛡️ Auth Guard Component
 * 
 * Business logic driven authentication guard for protected routes
 */

import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { authValidationUtils } from '@evc/shared-business-logic';

// ============================================================================
// AUTH CONTEXT
// ============================================================================

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  completeAuth: (userData?: Partial<User>) => void; // New method for auth completion
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Simulate checking stored auth token
    const checkAuthStatus = async () => {
      setIsLoading(true);
      // TODO: Check stored auth token here
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Use business logic for validation
    const validation = authValidationUtils.validateLoginForm(email, password);
    
    if (!validation.isValid) {
      setIsLoading(false);
      return false;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock successful login
    setIsAuthenticated(true);
    setUser({ email, id: '1', name: 'Test User' });
    setIsLoading(false);
    
    return true;
  };

  const completeAuth = (userData?: Partial<User>) => {
    // Complete authentication flow (used by AuthNavigator)
    const defaultUser = {
      id: Date.now().toString(),
      email: 'user@example.com',
      name: 'EV Driver'
    };
    
    setIsAuthenticated(true);
    setUser({ ...defaultUser, ...userData });
    setIsLoading(false);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isLoading,
      user,
      login,
      logout,
      completeAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthService() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthService must be used within an AuthProvider');
  }
  return context;
}

// ============================================================================
// AUTH GUARD COMPONENT
// ============================================================================

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requireAuth?: boolean;
}

export function AuthGuard({ 
  children, 
  fallback,
  requireAuth = true 
}: AuthGuardProps) {
  const { isAuthenticated, isLoading, user } = useAuthService();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <View className="flex-1 bg-gray-900 items-center justify-center">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-gray-300 mt-4 text-lg">
          Checking authentication...
        </Text>
      </View>
    );
  }

  // If auth is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return fallback || (
      <View className="flex-1 bg-gray-900 items-center justify-center">
        <Text className="text-red-400 text-lg">
          Authentication required
        </Text>
      </View>
    );
  }

  // If auth is not required but user is authenticated (redirect authenticated users)
  if (!requireAuth && isAuthenticated) {
    return fallback || (
      <View className="flex-1 bg-gray-900 items-center justify-center">
        <Text className="text-blue-400 text-lg">
          Already authenticated
        </Text>
      </View>
    );
  }

  return <>{children}</>;
}

// ============================================================================
// AUTH STATUS HOOK
// ============================================================================

export function useAuthGuard() {
  const { isAuthenticated, isLoading, user, login, logout, completeAuth } = useAuthService();

  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    completeAuth,
    canAccess: (requireAuth: boolean = true) => {
      if (isLoading) return false;
      return requireAuth ? isAuthenticated : !isAuthenticated;
    }
  };
} 