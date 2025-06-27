/**
 * 🌐 Web Platform Adapter
 * 
 * Web-specific adapter for shared API with Redux integration.
 * Handles web authentication state and error management.
 * 
 * @module WebAdapter
 * @version 2.0.0
 * @author EV Charging Team
 */

import { createEVChargingApi, defaultApiConfig } from '../evChargingApi.js';

/**
 * 🔧 Create Web API Instance
 * Pre-configured API instance for web applications with Redux
 */
export const createWebApi = (config?: {
  baseUrl?: string;
  getToken?: () => string | null;
  onAuthError?: () => void;
}) => {
  // Default web configuration
  const webConfig = {
    baseUrl: config?.baseUrl || defaultApiConfig.baseUrl,
    getToken: config?.getToken || (() => {
      // Default: get token from localStorage
      return localStorage.getItem('authToken');
    }),
    onAuthError: config?.onAuthError || (() => {
      // Default: clear token and redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }),
  };

  return createEVChargingApi(webConfig);
};

/**
 * 🎯 Web API Helpers
 * Utility functions for web-specific operations
 */
export const webApiHelpers = {
  // Store token in localStorage
  setAuthToken: (token: string) => {
    localStorage.setItem('authToken', token);
  },

  // Remove token from localStorage
  clearAuthToken: () => {
    localStorage.removeItem('authToken');
  },

  // Get token from localStorage
  getAuthToken: () => {
    return localStorage.getItem('authToken');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },
} as const; 