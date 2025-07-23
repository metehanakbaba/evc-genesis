/**
 * 🔒 Authentication Storage Utilities
 * 
 * Unified auth token management using localStorage with SSR safety.
 * Platform-agnostic storage solution.
 * 
 * @author EV Charging Team
 */

/**
 * 📦 Local Storage Helper with SSR Safety
 */
const localStorageHelper = {
  /**
   * Check if localStorage is available (SSR safe)
   */
  isAvailable(): boolean {
    try {
      return typeof window !== 'undefined' && window.localStorage !== undefined;
    } catch {
      return false;
    }
  },

  /**
   * Set item with TTL
   */
  setItem(key: string, value: string, ttlDays: number = 7): void {
    if (!this.isAvailable()) {
      console.warn('localStorage not available - storage operation skipped');
      return;
    }

    try {
      const item = {
        value,
        timestamp: Date.now(),
        ttl: ttlDays * 24 * 60 * 60 * 1000, // Convert days to milliseconds
      };
      localStorage.setItem(`evc_${key}`, JSON.stringify(item));
    } catch (error) {
      console.error('Failed to set localStorage item:', error);
    }
  },

  /**
   * Get item with TTL check
   */
  getItem(key: string): string | null {
    if (!this.isAvailable()) {
      return null;
    }

    try {
      const storedData = localStorage.getItem(`evc_${key}`);
      if (!storedData) return null;

      const item = JSON.parse(storedData);
      
      // Check if item has expired
      if (item.ttl && Date.now() > item.timestamp + item.ttl) {
        this.removeItem(key);
        return null;
      }

      return item.value || storedData; // Fallback for backward compatibility
    } catch (error) {
      console.error('Failed to get localStorage item:', error);
      return null;
    }
  },

  /**
   * Remove item
   */
  removeItem(key: string): void {
    if (!this.isAvailable()) {
      return;
    }

    try {
      localStorage.removeItem(`evc_${key}`);
    } catch (error) {
      console.error('Failed to remove localStorage item:', error);
    }
  },

  /**
   * Clear all EVC items
   */
  clear(): void {
    if (!this.isAvailable()) {
      return;
    }

    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('evc_')) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  }
};

/**
 * 🔐 Auth Storage Interface
 * 
 * Unified interface using localStorage with SSR safety
 */
export const authStorage = {
  /**
   * Set authentication token in localStorage
   */
  setToken: (token: string): void => {
    localStorageHelper.setItem('authToken', token, 7); // 7 days TTL
  },

  /**
   * Get authentication token from localStorage
   */
  getToken: (): string | null => {
    return localStorageHelper.getItem('authToken');
  },

  /**
   * Remove authentication token from localStorage
   */
  removeToken: (): void => {
    localStorageHelper.removeItem('authToken');
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!localStorageHelper.getItem('authToken');
  },

  /**
   * Clear all auth data
   */
  clear: (): void => {
    localStorageHelper.clear();
  },

  /**
   * Set user data in localStorage
   */
  setUserData: (userData: any): void => {
    localStorageHelper.setItem('userData', JSON.stringify(userData), 7);
  },

  /**
   * Get user data from localStorage
   */
  getUserData: (): any => {
    const userData = localStorageHelper.getItem('userData');
    if (!userData) return null;
    
    try {
      return JSON.parse(userData);
    } catch {
      return null;
    }
  }
} as const; 