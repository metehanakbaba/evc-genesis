/**
 * 📱 Mobile Platform Adapter
 * 
 * React Native-specific adapter for shared API with AsyncStorage integration.
 * Handles mobile authentication state and error management.
 * 
 * @module MobileAdapter
 * @version 2.0.0
 * @author EV Charging Team
 */

import { createEVChargingApi, defaultApiConfig } from '../evChargingApi.js';

/**
 * 🔧 Create Mobile API Instance
 * Pre-configured API instance for React Native applications
 */
export const createMobileApi = (config?: {
  baseUrl?: string;
  getToken?: () => Promise<string | null>;
  onAuthError?: () => void;
  AsyncStorage?: any; // AsyncStorage import
}) => {
  // Default mobile configuration
  const mobileConfig = {
    baseUrl: config?.baseUrl || defaultApiConfig.baseUrl,
    getToken: () => {
      // For mobile, we need to handle async token retrieval
      // This is a simplified version - in real implementation,
      // you'd use a more sophisticated token management
      if (config?.AsyncStorage) {
        return config.AsyncStorage.getItem('authToken');
      }
      return null;
    },
    onAuthError: config?.onAuthError || (() => {
      // Default: clear token and navigate to login
      if (config?.AsyncStorage) {
        config.AsyncStorage.removeItem('authToken');
      }
      // Navigation would be handled by the app
      console.warn('Authentication error - please handle navigation to login');
    }),
  };

  return createEVChargingApi(mobileConfig);
};

/**
 * 🎯 Mobile API Helpers Factory
 * Creates utility functions for mobile-specific operations
 */
export const createMobileApiHelpers = (AsyncStorage: any) => ({
  // Store token in AsyncStorage
  setAuthToken: async (token: string) => {
    await AsyncStorage.setItem('authToken', token);
  },

  // Remove token from AsyncStorage
  clearAuthToken: async () => {
    await AsyncStorage.removeItem('authToken');
  },

  // Get token from AsyncStorage
  getAuthToken: async () => {
    return await AsyncStorage.getItem('authToken');
  },

  // Check if user is authenticated
  isAuthenticated: async () => {
    const token = await AsyncStorage.getItem('authToken');
    return !!token;
  },
} as const); 