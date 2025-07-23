/**
 * 🔒 Storage Adapter Types
 * 
 * Universal storage interface that works across web and mobile platforms.
 * Provides type-safe storage operations with SSR compatibility.
 * 
 * @module StorageTypes
 * @version 2.0.0
 * @author EV Charging Team
 */

/**
 * 📦 Storage Adapter Interface
 * 
 * Unified interface for storage operations across platforms
 */
export interface IStorageAdapter {
  /**
   * Store a value with the given key
   */
  setItem(key: string, value: string): Promise<void> | void;
  
  /**
   * Retrieve a value by key
   */
  getItem(key: string): Promise<string | null> | string | null;
  
  /**
   * Remove a value by key
   */
  removeItem(key: string): Promise<void> | void;
  
  /**
   * Clear all stored values
   */
  clear(): Promise<void> | void;
  
  /**
   * Get all keys in storage
   */
  getAllKeys?(): Promise<string[]> | string[];
}

/**
 * 🎯 Platform-Specific Storage Options
 */
export interface StorageOptions {
  /**
   * Encryption key for sensitive data (optional)
   */
  encryptionKey?: string;
  
  /**
   * Namespace prefix for keys
   */
  namespace?: string;
  
  /**
   * Enable/disable SSR safety checks
   */
  ssrSafe?: boolean;
  
  /**
   * Default expiration time in seconds
   */
  defaultTTL?: number;
}

/**
 * 🔐 Auth Storage Interface
 * 
 * Specialized interface for authentication storage
 */
export interface IAuthStorage {
  /**
   * Set authentication token
   */
  setToken(token: string): Promise<void> | void;
  
  /**
   * Get authentication token
   */
  getToken(): Promise<string | null> | string | null;
  
  /**
   * Remove authentication token
   */
  removeToken(): Promise<void> | void;
  
  /**
   * Check if user is authenticated
   */
  isAuthenticated(): Promise<boolean> | boolean;
  
  /**
   * Clear all auth data
   */
  clear(): Promise<void> | void;
  
  /**
   * Set user data
   */
  setUserData?(userData: any): Promise<void> | void;
  
  /**
   * Get user data
   */
  getUserData?(): Promise<any> | any;
}

/**
 * 🌐 Platform Types
 */
export type Platform = 'web' | 'mobile' | 'universal';

/**
 * 📱 Storage Item with TTL
 */
export interface StorageItem {
  value: string;
  timestamp: number;
  ttl?: number;
}

/**
 * ⚡ Storage Event Types
 */
export interface StorageEvent {
  type: 'set' | 'get' | 'remove' | 'clear';
  key?: string;
  value?: string;
  platform: Platform;
  timestamp: number;
}

/**
 * 🔧 Storage Factory Options
 */
export interface StorageFactoryOptions extends StorageOptions {
  platform: Platform;
  AsyncStorage?: any; // For React Native
} 