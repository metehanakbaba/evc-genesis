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
  baseUrl: 'http://128.140.8.185',

  // Custom token getter that integrates with cookie storage
  getToken: () => {
    // Get token from cookie storage (single source of truth)
    return authStorage.getToken();
  },

  // Custom auth error handler that clears auth state
  onAuthError: () => {
    // Clear auth storage
    authStorage.clear();

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
