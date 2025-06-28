/**
 * 🔗 EV Charging Shared API
 * 
 * Unified API layer for all EV Charging applications.
 * Provides consistent data access patterns across web, mobile, and admin platforms.
 * 
 * @module SharedAPI
 * @version 2.0.0
 * @author EV Charging Team
 */

// 🚀 Core API (RTK Query + Platform Adapters)
export * from './lib/baseApi';
export * from './lib/evChargingApi';

// 🌐 Platform Adapters
export * from './lib/platform/web.adapter';
export * from './lib/platform/mobile.adapter';

// 🔗 API Endpoints (correct file names)
export * from './lib/endpoints/auth.endpoints';
export * from './lib/endpoints/stations.endpoints';
export * from './lib/endpoints/users.endpoints';
export * from './lib/endpoints/wallet.endpoints'; // Fixed: wallet not wallets

// 🎯 Easy-to-use Functions
export {
  // Core API Factory
  createEVChargingApi,
  defaultApiConfig,
  type EVChargingApi,
} from './lib/evChargingApi';

export {
  // Web Platform
  createWebApi,
  webApiHelpers,
} from './lib/platform/web.adapter';

export {
  // Mobile Platform  
  createMobileApi,
  mobileApiHelpers,
} from './lib/platform/mobile.adapter';

// 📊 Helper Functions & Types
export * from './lib/types';

// 📋 All Types (from schema-adapter)
export * from './lib/schema-adapter';

// 🔧 Development Utilities (only in development)
if (process.env['NODE_ENV'] === 'development') {
  // Export test utilities and mock data
  console.debug('🔧 [Shared API] Development mode - Additional utilities available');
}
