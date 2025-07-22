'use client';

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { loginSuccess, logout, type User } from '../authSlice';
import { authStorage } from '@/lib/utils/auth-storage';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

/**
 * 🔒 Auth Middleware Hook
 * 
 * Provides auth functions that integrate with both Redux and middleware cookies.
 * Ensures proper synchronization between client state and server-side middleware.
 */
export const useAuthMiddleware = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuthenticated, user, token } = useAppSelector((state) => state.auth);

  /**
   * Login function that sets both Redux state and cookie storage
   */
  const login = useCallback((userData: { user: User; token: string }) => {
    // Update Redux state
    dispatch(loginSuccess(userData));
    
    // Store token in cookie (single source of truth)
    authStorage.setToken(userData.token);
    
    // Navigate to dashboard or redirect URL
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get('redirect') || '/';
    router.push(redirectUrl);
  }, [dispatch, router]);

  /**
   * Logout function that clears both Redux state and cookie storage
   */
  const handleLogout = useCallback(() => {
    // Clear Redux state
    dispatch(logout());
    
    // Clear cookie storage
    authStorage.clear();
    
    // Navigate to auth page
    router.push('/auth');
  }, [dispatch, router]);

  /**
   * Check if user is authenticated (checks both Redux and cookie storage)
   */
  const isUserAuthenticated = useCallback(() => {
    const storedToken = authStorage.getToken();
    return isAuthenticated && !!token && !!storedToken;
  }, [isAuthenticated, token]);

  /**
   * Sync auth state if there's a mismatch between cookie storage and Redux
   */
  const syncAuthState = useCallback(() => {
    const storedToken = authStorage.getToken();
    
    // If we have a stored token but no Redux state, clear everything
    if (storedToken && !isAuthenticated) {
      authStorage.clear();
    }
    
    // If we have Redux state but no stored token, clear Redux
    if (!storedToken && isAuthenticated) {
      dispatch(logout());
    }
  }, [isAuthenticated, dispatch]);

  return {
    // State
    isAuthenticated: isUserAuthenticated(),
    user,
    token,
    
    // Actions
    login,
    logout: handleLogout,
    syncAuthState,
  };
}; 