/**
 * 🧪 Import Test File
 * Test all exports from shared-api package
 */

// Test main exports
import { 
  createEVChargingApi, 
  defaultApiConfig,
  createWebApi, 
  webApiHelpers,
  createMobileApi, 
  createMobileApiHelpers,
  transformResponse,
  handleApiError,
  createApiTags
} from './dist/index.js';

// Test type imports (these should not cause runtime errors)
console.log('🧪 Testing shared-api imports...');

// Test API factory
console.log('✅ createEVChargingApi:', typeof createEVChargingApi);
console.log('✅ defaultApiConfig:', defaultApiConfig);

// Test web adapter
console.log('✅ createWebApi:', typeof createWebApi);
console.log('✅ webApiHelpers:', Object.keys(webApiHelpers));

// Test mobile adapter  
console.log('✅ createMobileApi:', typeof createMobileApi);
console.log('✅ createMobileApiHelpers:', typeof createMobileApiHelpers);

// Test utilities
console.log('✅ transformResponse:', typeof transformResponse);
console.log('✅ handleApiError:', typeof handleApiError);
console.log('✅ createApiTags:', Object.keys(createApiTags));

// Test web API creation
const mockWebApi = createWebApi({
  baseUrl: 'https://test.api.com',
  getToken: () => 'mock-token',
  onAuthError: () => console.log('Auth error'),
});

console.log('✅ Web API created:', !!mockWebApi);
console.log('✅ Web API reducer path:', mockWebApi.reducerPath);

// Test mobile helpers
const mockStorage = {
  getItem: async (key) => `mock-${key}`,
  setItem: async (key, value) => console.log(`Set ${key}: ${value}`),
  removeItem: async (key) => console.log(`Remove ${key}`),
};

const mobileHelpers = createMobileApiHelpers(mockStorage);
console.log('✅ Mobile helpers:', Object.keys(mobileHelpers));

// Test error handling
const testError = handleApiError(new Error('Test error'));
console.log('✅ Error handling:', testError.message === 'Test error');

console.log('🎉 All imports successful!'); 