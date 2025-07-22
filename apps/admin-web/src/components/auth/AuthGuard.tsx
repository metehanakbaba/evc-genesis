'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { loginSuccess, logout } from '@/features/auth/authSlice';
import { authStorage } from '@/lib/utils/auth-storage';
import { evChargingApi } from '@/shared/api/evChargingApi';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * 🔒 Authentication Guard Component
 * 
 * Protects components by checking authentication status.
 * Synchronizes auth state between localStorage, cookies, and Redux.
 */
export const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  fallback = <AuthLoadingSpinner /> 
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { isAuthenticated, token, user } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  // Define public routes that don't need auth protection
  const publicRoutes = ['/auth', '/login'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  
  // Get current user query to validate token (skip for public routes)
  const { data: currentUser, error, isLoading: isValidating } = evChargingApi.useGetCurrentUserQuery(
    undefined,
    { 
      skip: !token || isPublicRoute, // Skip if no token or on public route
      refetchOnMountOrArgChange: true 
    }
  );

  // If on public route, render children directly without auth checks
  if (isPublicRoute) {
    return <>{children}</>;
  }

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Only run on client side
        if (typeof window === 'undefined') {
          setIsLoading(false);
          return;
        }

        // Check for token in cookie storage (single source of truth)
        const storedToken = authStorage.getToken();

        // If we have a stored token but no Redux state, restore auth state
        if (storedToken && !isAuthenticated) {
          // The useGetCurrentUserQuery will validate the token
          // If valid, we'll update Redux state in the next useEffect
          setIsLoading(false);
          return;
        }

        // If no token at all, ensure we're logged out
        if (!storedToken && !token) {
          dispatch(logout());
          setIsLoading(false);
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Auth initialization error:', error);
        dispatch(logout());
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [dispatch, isAuthenticated, token]);

  // Handle current user query results
  useEffect(() => {
    if (currentUser && !isValidating && !error) {
      // Valid token and user data - update Redux state
      const storedToken = authStorage.getToken();
      if (storedToken && !isAuthenticated) {
        dispatch(loginSuccess({
          user: currentUser,
          token: storedToken
        }));
      }
    }

    if (error && !isValidating) {
      // Invalid token - clear everything and redirect to auth
      authStorage.clear();
      dispatch(logout());
      router.push('/auth');
    }
  }, [currentUser, error, isValidating, isAuthenticated, dispatch, router]);

  // Show loading state
  if (isLoading || isValidating) {
    return <>{fallback}</>;
  }

  // Check authentication status
  const storedToken = authStorage.getToken();
  
  if (!isAuthenticated && !storedToken) {
    router.push('/auth');
    return <>{fallback}</>;
  }

  // User is authenticated, render children
  return <>{children}</>;
};

/**
 * Loading spinner component for auth check
 */
const AuthLoadingSpinner: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      <p className="text-slate-400">Verifying authentication...</p>
    </div>
  </div>
); 