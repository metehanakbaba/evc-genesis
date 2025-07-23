'use client';

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { loginSuccess, logout, type User } from '../authSlice';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useLogoutMutation } from '../authApi';

/**
 * 🔒 Auth Middleware Hook
 * 
 * Simplified auth management with automatic persistence via Redux middleware.
 * No manual localStorage handling needed - handled by store middleware.
 */
export const useAuthMiddleware = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuthenticated, user, token } = useAppSelector((state) => state.auth);
  const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutMutation();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Login function - only updates Redux state, persistence is automatic
   */
  const login = useCallback((userData: { user: User; token: string; expiresIn?: string }) => {
    // Update Redux state - persistence happens automatically via middleware
    dispatch(loginSuccess(userData));
  }, [dispatch]);

  /**
   * Enhanced logout function that calls API and clears state
   */
  const handleLogout = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Try to call logout API to invalidate token on server
      try {
        await logoutMutation().unwrap();
      } catch (error) {
        // Log the error but don't prevent logout - security best practice
        console.warn('Logout API call failed, proceeding with client logout:', error);
      }
      
      // Clear Redux state - localStorage will be cleared automatically via middleware
      dispatch(logout());
      
      // Clear the persisted state manually as well
      if (typeof window !== 'undefined') {
        localStorage.removeItem('evc-auth-state');
      }
      
      // Navigate to auth page
      router.push('/auth');
    } catch (error) {
      console.error('Logout error:', error);
      
      // Force logout even if API fails
      dispatch(logout());
      if (typeof window !== 'undefined') {
        localStorage.removeItem('evc-auth-state');
      }
      router.push('/auth');
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, router, logoutMutation]);

  return {
    // State
    isAuthenticated,
    user,
    token,
    isLoggingOut: isLoggingOut || isLoading,
    
    // Actions
    login,
    logout: handleLogout,
  };
}; 