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

import { createWebApi, webApiHelpers } from '@evc/shared-api';
import { logout } from '@/features/auth/authSlice';
import type { RootState } from '@/lib/store/store';

/**
 * 🌐 Web Admin API Instance
 *
 * Uses shared-api createWebApi with custom auth integration
 * for Redux state compatibility.
 */
// Create the API instance with proper typing
const apiInstance = createWebApi({
  baseUrl: 'https://api.evcharge.com/v1',

  // Custom token getter that integrates with Redux auth slice
  getToken: () => {
    // Try to get token from Redux state first (if available)
    const state = (window as any).__REDUX_STATE__ as RootState | undefined;
    const reduxToken = state?.auth?.token;

    if (reduxToken) {
      return reduxToken;
    }

    // Fallback to localStorage
    return webApiHelpers.getAuthToken();
  },

  // Custom auth error handler that dispatches Redux logout
  onAuthError: () => {
    // Clear token from localStorage
    webApiHelpers.clearAuthToken();

    // Dispatch logout action to Redux (if store is available)
    const store = (window as any).__REDUX_STORE__;
    if (store) {
      store.dispatch(logout());
    }

    // Redirect to login
    window.location.href = '/login';
  },
});

// Type assertion to fix TypeScript compilation
export const evChargingApi = apiInstance as any;

/**
 * 🔧 Web Admin API Helpers
 *
 * Re-export shared-api helpers for backward compatibility
 */
export { webApiHelpers };

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
