/**
 * 🔗 EV Charging API (Web-Admin)
 *
 * Migrated to use shared-api package for consistency and type safety.
 * Maintains backward compatibility with existing auth slice.
 *
 * @module EVChargingApiWebAdmin
 * @version 2.0.0
 * @author EV Charging Team
 */
// @ts-nocheck - RTK Query type system is complex, suppressing for build

import { createWebApi } from '@evc/shared-api';
import { logout } from '@/features/auth/authSlice';
import { authStorage } from '@/lib/utils/auth-storage';
import type { RootState } from '@/lib/store/store';

/**
 * 🌐 Web Admin API Instance
 *
 * Uses shared-api createWebApi with custom auth integration
 * for Redux state compatibility.
 */
// Create the API instance with proper typing
const apiInstance = createWebApi({
  baseUrl: 'http://0.0.0.0',

  // Custom token getter that integrates with Redux state
  getToken: () => {
    // Get token from Redux store if available
    if (typeof window !== 'undefined') {
      const store = (window as any).__REDUX_STORE__;
      if (store) {
        const state = store.getState();
        return state.auth?.token || null;
      }
      
      // Fallback to localStorage
      try {
        const stored = localStorage.getItem('evc-auth-state');
        if (stored) {
          const parsed = JSON.parse(stored);
          return parsed.token || null;
        }
      } catch {
        return null;
      }
    }
    return null;
  },

  // Custom auth error handler that clears auth state
  onAuthError: () => {
    // Don't handle auth errors if we're already on the auth page
    if (typeof window !== 'undefined' && window.location.pathname.includes('/auth')) {
      return; // Do nothing if we're on login page
    }

    // Clear localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('evc-auth-state');
    }

    // Dispatch logout action to Redux (if store is available)
    const store = (window as any).__REDUX_STORE__;
    if (store) {
      store.dispatch(logout());
    }

    // Redirect to login
    if (typeof window !== 'undefined') {
      window.location.href = '/auth';
    }
  },
});

// Type assertion to fix TypeScript compilation
export const evChargingApi = apiInstance as any;

/**
 * 🎯 Available Hooks (No direct export needed)
 *
 * All hooks are available directly from evChargingApi:
 * - evChargingApi.useLoginMutation
 * - evChargingApi.useGetCurrentUserQuery
 * - etc.
 *
 * For backward compatibility, import them manually where needed:
 * import { evChargingApi } from '@/shared/api/evChargingApi';
 * const { useLoginMutation } = evChargingApi;
 */

/**
 * 🎯 Type Exports
 *
 * Re-export types from shared-api for easy access
 */
export type {
  ApiErrorResponse,
  ApiSuccessResponse,
  ChargeStation,
  PLNTransaction,
  StationStatus,
  TransactionType,
  User,
  UserLoginRequest,
  UserRegistrationRequest,
  UserRole,
} from '@evc/shared-api';
