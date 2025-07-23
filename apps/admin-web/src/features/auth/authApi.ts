/**
 * 🔐 Auth API Hooks
 *
 * Re-export authentication hooks from shared evChargingApi.
 * Includes login, logout, profile management and admin-specific endpoints.
 */
import { evChargingApi } from '@/shared/api/evChargingApi';

// Extract authentication hooks from shared API
export const { 
  useLoginMutation, 
  useRegisterMutation, 
  useLogoutMutation,
  useGetAdminProfileQuery,
  useUpdateAdminProfileMutation,
  useChangePasswordMutation,
  useRefreshTokenMutation,
} = evChargingApi;
