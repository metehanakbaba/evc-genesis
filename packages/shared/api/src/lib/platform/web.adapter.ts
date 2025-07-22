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

import { createEVChargingApi, defaultApiConfig } from '../evChargingApi';

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
      // SSR Safe: get token from localStorage only on client side
      if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem('authToken');
      }
      return null;
    }),
    onAuthError: config?.onAuthError || (() => {
      // SSR Safe: clear token and redirect only on client side
      if (typeof window !== 'undefined') {
        if (window.localStorage) {
          localStorage.removeItem('authToken');
        }
        window.location.href = '/login';
      }
    }),
  };

  return createEVChargingApi(webConfig);
};

/**
 * 🎯 Web API Helpers
 * Utility functions for web-specific operations (SSR Safe)
 */
export const webApiHelpers = {
  // Store token in localStorage (SSR Safe)
  setAuthToken: (token: string) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('authToken', token);
    }
  },

  // Remove token from localStorage (SSR Safe)
  clearAuthToken: () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('authToken');
    }
  },

  // Get token from localStorage (SSR Safe)
  getAuthToken: () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('authToken');
    }
    return null;
  },

  // Check if user is authenticated (SSR Safe)
  isAuthenticated: () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('authToken');
    }
    return false;
  },
} as const; 