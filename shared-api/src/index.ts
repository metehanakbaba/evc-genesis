/**
 * 🔗 Shared API Package
 * 
 * Cross-platform RTK Query API for EV Charging platform.
 * Type-safe, single responsibility design with platform-agnostic implementation.
 * 
 * @module SharedApi
 * @version 2.0.0
 * @author EV Charging Team
 */

// 🏭 Main API Factory
export { 
  createEVChargingApi, 
  defaultApiConfig,
  type EVChargingApi 
} from './lib/evChargingApi.js';

// 🔧 Base API Utilities
export { 
  createBaseQuery, 
  createTypedApi, 
  transformResponse, 
  transformVoidResponse,
  handleApiError, 
  createApiTags 
} from './lib/baseApi.js';

// 🌐 Platform Adapters
export { createWebApi, webApiHelpers } from './lib/platform/web.adapter.js';
export { createMobileApi, createMobileApiHelpers } from './lib/platform/mobile.adapter.js';

// 🎯 Endpoint Functions (for custom API instances)
export { authEndpoints } from './lib/endpoints/auth.endpoints.js';
export { usersEndpoints } from './lib/endpoints/users.endpoints.js';
export { stationsEndpoints } from './lib/endpoints/stations.endpoints.js';
export { walletEndpoints } from './lib/endpoints/wallet.endpoints.js';

// 📋 All Types (from schema-adapter)
export * from './lib/schema-adapter.js';

// 🎣 RTK Query Hooks (from default instances)
// Note: These will be available only after calling createWebApi or createMobileApi
// For type safety, hooks should be exported from the created API instance
