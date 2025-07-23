'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { loginSuccess, logout } from '@/features/auth/authSlice';
import { evChargingApi } from '@/shared/api/evChargingApi';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * 🔒 Authentication Guard Component
 * 
 * Simplified auth guard that works with Redux persistence middleware.
 * Automatically validates stored tokens and fetches user data.
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
  
  // Get current user query to validate token and fetch fresh user data
  const { data: currentUser, error, isLoading: isValidating } = evChargingApi.useGetCurrentUserQuery(
    undefined,
    { 
      skip: !token || isPublicRoute, // Skip if no token or on public route
      refetchOnMountOrArgChange: true 
    }
  );

  // Initialize auth state
  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }

    // If we have a token but no user data yet, let the API query handle it
    if (token && !user && !isValidating) {
      setIsLoading(false);
      return;
    }

    // If no token and not authenticated, we're done loading
    if (!token && !isAuthenticated) {
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  }, [token, user, isAuthenticated, isValidating]);

  // Handle API query results
  useEffect(() => {
    if (currentUser && !isValidating && !error) {
      // If we have fresh user data from API but Redux state is incomplete, update it
      if (token && (!user || user.id !== currentUser.id)) {
        dispatch(loginSuccess({
          user: currentUser,
          token: token
        }));
      }
    }

    if (error && !isValidating && token) {
      // Invalid token - clear auth state
      console.warn('Auth token validation failed:', error);
      dispatch(logout());
      
      // Clear persisted state
      if (typeof window !== 'undefined') {
        localStorage.removeItem('evc-auth-state');
      }
      
      if (!isPublicRoute) {
        router.push('/auth');
      }
    }
  }, [currentUser, error, isValidating, token, user, dispatch, router, isPublicRoute]);

  // Handle redirects based on auth state
  useEffect(() => {
    if (isLoading || isValidating) return;

    // Redirect unauthenticated users from protected routes
    if (!isAuthenticated && !isPublicRoute) {
      router.push('/auth');
      return;
    }

    // Redirect authenticated users from auth pages to dashboard
    if (isAuthenticated && user && isPublicRoute) {
      const urlParams = new URLSearchParams(window.location.search);
      const redirectUrl = urlParams.get('redirect');
      
      if (redirectUrl) {
        router.push(redirectUrl);
      } else {
        // Role-based redirection
        switch (user.role) {
          case 'ADMIN':
            router.push('/admin');
            break;
          default:
            router.push('/');
        }
      }
    }
  }, [isLoading, isValidating, isAuthenticated, user, isPublicRoute, router]);

  // If on public route, render children directly
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // Show loading state
  if (isLoading || isValidating) {
    return <>{fallback}</>;
  }

  // Check authentication status
  if (!isAuthenticated || !user) {
    return <>{fallback}</>;
  }

  // User is authenticated and has data, render children
  return <>{children}</>;
};

// Simple loading spinner component
const AuthLoadingSpinner: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-12 h-12 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
      <p className="text-white font-medium">Loading...</p>
    </div>
  </div>
); 