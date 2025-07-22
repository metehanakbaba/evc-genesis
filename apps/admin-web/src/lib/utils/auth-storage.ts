/**
 * 🔒 Authentication Storage Utilities
 * 
 * Unified auth token management using cookies only.
 * No localStorage confusion - single source of truth.
 * 
 * @author EV Charging Team
 */

/**
 * 🍪 Cookie-based Auth Storage
 * SSR Safe and works with middleware
 */
export const authStorage = {
  /**
   * Set authentication token in cookie
   */
  setToken: (token: string): void => {
    if (typeof document !== 'undefined') {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 7); // 7 days
      document.cookie = `authToken=${token}; path=/; expires=${expiryDate.toUTCString()}; SameSite=Strict; Secure=${window.location.protocol === 'https:'}`;
    }
  },

  /**
   * Get authentication token from cookie
   */
  getToken: (): string | null => {
    if (typeof document !== 'undefined') {
      const cookies = document.cookie.split(';');
      const authCookie = cookies.find(cookie => 
        cookie.trim().startsWith('authToken=')
      );
      
      if (authCookie) {
        return authCookie.split('=')[1]?.trim() || null;
      }
    }
    return null;
  },

  /**
   * Remove authentication token from cookie
   */
  removeToken: (): void => {
    if (typeof document !== 'undefined') {
      document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict';
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!authStorage.getToken();
  },

  /**
   * Clear all auth data
   */
  clear: (): void => {
    authStorage.removeToken();
  }
} as const; 