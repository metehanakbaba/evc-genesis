/**
 * 🏭 Storage Factory
 * 
 * Factory for creating platform-specific storage adapters.
 * Provides unified auth storage interface across platforms.
 * 
 * @module StorageFactory
 * @version 2.0.0
 * @author EV Charging Team
 */

import type { 
  IStorageAdapter, 
  IAuthStorage, 
  StorageFactoryOptions, 
  Platform 
} from './storage.types';
import { WebStorageAdapter } from './web.adapter';
import { MobileStorageAdapter } from './mobile.adapter';

/**
 * 🔧 Storage Factory
 * 
 * Creates platform-appropriate storage adapters
 */
export class StorageFactory {
  /**
   * Create storage adapter based on platform
   */
  static createAdapter(options: StorageFactoryOptions): IStorageAdapter {
    const { platform, AsyncStorage, ...storageOptions } = options;

    switch (platform) {
      case 'web':
        return new WebStorageAdapter(storageOptions);
      
      case 'mobile':
        if (!AsyncStorage) {
          throw new Error('AsyncStorage is required for mobile platform');
        }
        return new MobileStorageAdapter(AsyncStorage, storageOptions);
      
      case 'universal':
        // Auto-detect platform
        if (typeof window !== 'undefined' && window.localStorage) {
          return new WebStorageAdapter(storageOptions);
        } else if (AsyncStorage) {
          return new MobileStorageAdapter(AsyncStorage, storageOptions);
        } else {
          throw new Error('No suitable storage adapter found for universal platform');
        }
      
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }

  /**
   * Create auth storage with unified interface
   */
  static createAuthStorage(options: StorageFactoryOptions): IAuthStorage {
    const adapter = this.createAdapter(options);
    return new UnifiedAuthStorage(adapter);
  }
}

/**
 * 🔐 Unified Auth Storage Implementation
 * 
 * Provides auth-specific storage operations using any storage adapter
 */
export class UnifiedAuthStorage implements IAuthStorage {
  private adapter: IStorageAdapter;
  private isAsync: boolean;

  constructor(adapter: IStorageAdapter) {
    this.adapter = adapter;
    // Check if adapter returns promises (mobile) or sync values (web)
    this.isAsync = typeof adapter.getItem('test') === 'object';
  }

  /**
   * Set authentication token
   */
  setToken(token: string): Promise<void> | void {
    const ttl = 7 * 24 * 60 * 60; // 7 days in seconds
    
    if (this.isAsync) {
      return (this.adapter.setItem as any)('authToken', token, ttl);
    } else {
      return (this.adapter.setItem as any)('authToken', token, ttl);
    }
  }

  /**
   * Get authentication token
   */
  getToken(): Promise<string | null> | string | null {
    return this.adapter.getItem('authToken');
  }

  /**
   * Remove authentication token
   */
  removeToken(): Promise<void> | void {
    return this.adapter.removeItem('authToken');
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): Promise<boolean> | boolean {
    const token = this.adapter.getItem('authToken');
    
    if (this.isAsync) {
      return (token as Promise<string | null>).then(t => !!t);
    } else {
      return !!(token as string | null);
    }
  }

  /**
   * Clear all auth data
   */
  clear(): Promise<void> | void {
    return this.adapter.clear();
  }

  /**
   * Set user data
   */
  setUserData(userData: any): Promise<void> | void {
    const userDataString = JSON.stringify(userData);
    const ttl = 7 * 24 * 60 * 60; // 7 days in seconds
    
    if (this.isAsync) {
      return (this.adapter.setItem as any)('userData', userDataString, ttl);
    } else {
      return (this.adapter.setItem as any)('userData', userDataString, ttl);
    }
  }

  /**
   * Get user data
   */
  getUserData(): Promise<any> | any {
    const userData = this.adapter.getItem('userData');
    
    if (this.isAsync) {
      return (userData as Promise<string | null>).then(data => {
        if (!data) return null;
        try {
          return JSON.parse(data);
        } catch {
          return null;
        }
      });
    } else {
      if (!userData) return null;
      try {
        return JSON.parse(userData as string);
      } catch {
        return null;
      }
    }
  }
}

/**
 * 🎯 Platform Detection Helpers
 */
export const PlatformDetector = {
  /**
   * Detect current platform
   */
  detectPlatform(): Platform {
    if (typeof window !== 'undefined' && window.localStorage) {
      return 'web';
    }
    // In React Native, window is undefined or doesn't have localStorage
    return 'mobile';
  },

  /**
   * Check if running in web environment
   */
  isWeb(): boolean {
    return typeof window !== 'undefined' && window.localStorage !== undefined;
  },

  /**
   * Check if running in mobile environment
   */
  isMobile(): boolean {
    return !this.isWeb();
  },

  /**
   * Check if SSR safe
   */
  isSSRSafe(): boolean {
    return typeof window !== 'undefined';
  }
};

/**
 * 🚀 Quick Setup Functions
 */
export const createWebAuthStorage = (options?: { namespace?: string }) => {
  return StorageFactory.createAuthStorage({
    platform: 'web',
    namespace: options?.namespace || 'evc',
    ssrSafe: true,
  });
};

export const createMobileAuthStorage = (AsyncStorage: any, options?: { namespace?: string }) => {
  return StorageFactory.createAuthStorage({
    platform: 'mobile',
    AsyncStorage,
    namespace: options?.namespace || 'evc',
  });
};

export const createUniversalAuthStorage = (AsyncStorage?: any, options?: { namespace?: string }) => {
  return StorageFactory.createAuthStorage({
    platform: 'universal',
    AsyncStorage,
    namespace: options?.namespace || 'evc',
    ssrSafe: true,
  });
}; 