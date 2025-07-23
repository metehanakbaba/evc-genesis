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
      // SSR Safe: get token from localStorage with TTL check only on client side
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          const storedData = localStorage.getItem('evc_authToken');
          if (!storedData) return null;

          const item = JSON.parse(storedData);
          
          // Check if item has expired
          if (item.ttl && Date.now() > item.timestamp + item.ttl) {
            localStorage.removeItem('evc_authToken');
            return null;
          }

          return item.value || storedData; // Fallback for backward compatibility
        } catch {
          return null;
        }
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
  // Store token in localStorage with TTL (SSR Safe)
  setAuthToken: (token: string, ttlDays: number = 7) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const item = {
          value: token,
          timestamp: Date.now(),
          ttl: ttlDays * 24 * 60 * 60 * 1000, // Convert days to milliseconds
        };
        localStorage.setItem('evc_authToken', JSON.stringify(item));
      } catch (error) {
        console.error('Failed to set auth token:', error);
      }
    }
  },

  // Remove token from localStorage (SSR Safe)
  clearAuthToken: () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.removeItem('evc_authToken');
      } catch (error) {
        console.error('Failed to clear auth token:', error);
      }
    }
  },

  // Get token from localStorage with TTL check (SSR Safe)
  getAuthToken: () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const storedData = localStorage.getItem('evc_authToken');
        if (!storedData) return null;

        const item = JSON.parse(storedData);
        
        // Check if item has expired
        if (item.ttl && Date.now() > item.timestamp + item.ttl) {
          localStorage.removeItem('evc_authToken');
          return null;
        }

        return item.value || storedData; // Fallback for backward compatibility
      } catch (error) {
        console.error('Failed to get auth token:', error);
        return null;
      }
    }
    return null;
  },

  // Check if user is authenticated (SSR Safe)
  isAuthenticated: () => {
    return !!webApiHelpers.getAuthToken();
  },
} as const; 