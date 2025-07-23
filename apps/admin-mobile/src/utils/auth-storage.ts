/**
 * 📱 Mobile Authentication Storage Utilities
 * 
 * React Native auth token management using AsyncStorage.
 * Platform-specific storage solution for mobile applications.
 * 
 * @author EV Charging Team
 */

// Note: AsyncStorage should be imported in the app
// import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * 📦 AsyncStorage Helper with TTL Support
 */
const createAsyncStorageHelper = (AsyncStorage: any) => ({
  /**
   * Set item with TTL
   */
  async setItem(key: string, value: string, ttlDays: number = 7): Promise<void> {
    try {
      const item = {
        value,
        timestamp: Date.now(),
        ttl: ttlDays * 24 * 60 * 60 * 1000, // Convert days to milliseconds
      };
      await AsyncStorage.setItem(`evc_${key}`, JSON.stringify(item));
    } catch (error) {
      console.error('Failed to set AsyncStorage item:', error);
    }
  },

  /**
   * Get item with TTL check
   */
  async getItem(key: string): Promise<string | null> {
    try {
      const storedData = await AsyncStorage.getItem(`evc_${key}`);
      if (!storedData) return null;

      const item = JSON.parse(storedData);
      
      // Check if item has expired
      if (item.ttl && Date.now() > item.timestamp + item.ttl) {
        await this.removeItem(key);
        return null;
      }

      return item.value || storedData; // Fallback for backward compatibility
    } catch (error) {
      console.error('Failed to get AsyncStorage item:', error);
      return null;
    }
  },

  /**
   * Remove item
   */
  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(`evc_${key}`);
    } catch (error) {
      console.error('Failed to remove AsyncStorage item:', error);
    }
  },

  /**
   * Clear all EVC items
   */
  async clear(): Promise<void> {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const evcKeys = allKeys.filter((key: string) => key.startsWith('evc_'));
      if (evcKeys.length > 0) {
        await AsyncStorage.multiRemove(evcKeys);
      }
    } catch (error) {
      console.error('Failed to clear AsyncStorage:', error);
    }
  }
});

/**
 * 🔧 Create Mobile Auth Storage
 * 
 * Factory function to create auth storage with AsyncStorage dependency injection
 */
export const createMobileAuthStorage = (AsyncStorage: any) => {
  const storageHelper = createAsyncStorageHelper(AsyncStorage);

  return {
    /**
     * Set authentication token in AsyncStorage
     */
    async setToken(token: string): Promise<void> {
      await storageHelper.setItem('authToken', token, 7); // 7 days TTL
    },

    /**
     * Get authentication token from AsyncStorage
     */
    async getToken(): Promise<string | null> {
      return await storageHelper.getItem('authToken');
    },

    /**
     * Remove authentication token from AsyncStorage
     */
    async removeToken(): Promise<void> {
      await storageHelper.removeItem('authToken');
    },

    /**
     * Check if user is authenticated
     */
    async isAuthenticated(): Promise<boolean> {
      const token = await storageHelper.getItem('authToken');
      return !!token;
    },

    /**
     * Clear all auth data
     */
    async clear(): Promise<void> {
      await storageHelper.clear();
    },

    /**
     * Set user data in AsyncStorage
     */
    async setUserData(userData: any): Promise<void> {
      await storageHelper.setItem('userData', JSON.stringify(userData), 7);
    },

    /**
     * Get user data from AsyncStorage
     */
    async getUserData(): Promise<any> {
      const userData = await storageHelper.getItem('userData');
      if (!userData) return null;
      
      try {
        return JSON.parse(userData);
      } catch {
        return null;
      }
    }
  };
};

/**
 * 🎯 Default Export (requires AsyncStorage to be passed)
 * 
 * Usage:
 * import AsyncStorage from '@react-native-async-storage/async-storage';
 * const authStorage = createMobileAuthStorage(AsyncStorage);
 */
export default createMobileAuthStorage; 