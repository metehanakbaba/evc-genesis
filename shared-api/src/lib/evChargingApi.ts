/**
 * 🔗 EV Charging API
 * 
 * Main API instance combining all domain-specific endpoints.
 * Cross-platform compatible with type safety and single responsibility design.
 * 
 * @module EVChargingApi
 * @version 2.0.0
 * @author EV Charging Team
 */

import { createTypedApi, createBaseQuery } from './baseApi.js';
import { authEndpoints } from './endpoints/auth.endpoints.js';
import { usersEndpoints } from './endpoints/users.endpoints.js';
import { stationsEndpoints } from './endpoints/stations.endpoints.js';
import { walletEndpoints } from './endpoints/wallet.endpoints.js';

/**
 * 🏭 Create EV Charging API Factory
 * Platform-agnostic API factory with dependency injection
 */
export const createEVChargingApi = (config: {
  baseUrl: string;
  getToken: () => string | null;
  onAuthError: () => void;
}) => {
  const baseQuery = createBaseQuery(config);
  
  const api = createTypedApi('evChargingApi', baseQuery);

  // Inject all endpoints with single responsibility principle
  return api.injectEndpoints({
    endpoints: (builder) => ({
      // 🔐 Authentication endpoints
      ...authEndpoints(builder),
      
      // 👥 User management endpoints
      ...usersEndpoints(builder),
      
      // 🔋 Station management endpoints
      ...stationsEndpoints(builder),
      
      // 💰 Wallet & transaction endpoints
      ...walletEndpoints(builder),
    }),
    overrideExisting: false,
  });
};

// Type for the API instance
export type EVChargingApi = ReturnType<typeof createEVChargingApi>;

/**
 * 🎯 Default API Configuration
 * Can be overridden per platform
 */
export const defaultApiConfig = {
  baseUrl: 'https://api.evcharge.com/v1',
  timeout: 10000,
  retry: {
    maxRetries: 3,
  },
} as const; 