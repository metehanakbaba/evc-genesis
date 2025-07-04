/**
 * 🔐 Auth API Hooks
 *
 * Re-export authentication hooks from shared evChargingApi.
 * No need to inject endpoints - they already exist in shared-api.
 */
import { evChargingApi } from '@/shared/api/evChargingApi';

// Extract authentication hooks from shared API
export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  evChargingApi;
