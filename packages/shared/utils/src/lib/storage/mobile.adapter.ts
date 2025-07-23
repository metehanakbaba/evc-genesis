/**
 * 📱 Mobile Storage Adapter
 * 
 * React Native storage adapter using AsyncStorage.
 * Provides asynchronous operations for mobile applications.
 * 
 * @module MobileStorageAdapter
 * @version 2.0.0
 * @author EV Charging Team
 */

import type { IStorageAdapter, StorageOptions, StorageItem } from './storage.types.ts';

/**
 * 🔧 Mobile Storage Adapter Implementation
 * 
 * Uses AsyncStorage with optional TTL support for React Native
 */
export class MobileStorageAdapter implements IStorageAdapter {
  private namespace: string;
  private defaultTTL?: number;
  private AsyncStorage: any;

  constructor(AsyncStorage: any, options: StorageOptions = {}) {
    if (!AsyncStorage) {
      throw new Error('AsyncStorage is required for MobileStorageAdapter');
    }
    
    this.AsyncStorage = AsyncStorage;
    this.namespace = options.namespace ? `${options.namespace}_` : 'evc_';
    this.defaultTTL = options.defaultTTL;
  }

  /**
   * Get namespaced key
   */
  private getKey(key: string): string {
    return `${this.namespace}${key}`;
  }

  /**
   * Check if an item has expired
   */
  private isExpired(item: StorageItem): boolean {
    if (!item.ttl) return false;
    return Date.now() > item.timestamp + (item.ttl * 1000);
  }

  /**
   * Create a storage item with TTL
   */
  private createStorageItem(value: string, ttl?: number): StorageItem {
    return {
      value,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL,
    };
  }

  /**
   * Set item in AsyncStorage
   */
  async setItem(key: string, value: string, ttl?: number): Promise<void> {
    try {
      const storageItem = this.createStorageItem(value, ttl);
      const namespacedKey = this.getKey(key);
      await this.AsyncStorage.setItem(namespacedKey, JSON.stringify(storageItem));
    } catch (error) {
      console.error('MobileStorageAdapter: Failed to set item', error);
      throw error;
    }
  }

  /**
   * Get item from AsyncStorage
   */
  async getItem(key: string): Promise<string | null> {
    try {
      const namespacedKey = this.getKey(key);
      const storedData = await this.AsyncStorage.getItem(namespacedKey);
      
      if (!storedData) return null;

      // Try to parse as StorageItem (with TTL)
      try {
        const item: StorageItem = JSON.parse(storedData);
        
        // Check if item has expired
        if (this.isExpired(item)) {
          await this.removeItem(key);
          return null;
        }
        
        return item.value;
      } catch {
        // Fallback: treat as raw string (backward compatibility)
        return storedData;
      }
    } catch (error) {
      console.error('MobileStorageAdapter: Failed to get item', error);
      return null;
    }
  }

  /**
   * Remove item from AsyncStorage
   */
  async removeItem(key: string): Promise<void> {
    try {
      const namespacedKey = this.getKey(key);
      await this.AsyncStorage.removeItem(namespacedKey);
    } catch (error) {
      console.error('MobileStorageAdapter: Failed to remove item', error);
      throw error;
    }
  }

  /**
   * Clear all items with this adapter's namespace
   */
  async clear(): Promise<void> {
    try {
      const allKeys = await this.AsyncStorage.getAllKeys();
      const keysToRemove = allKeys.filter((key: string) => 
        key.startsWith(this.namespace)
      );
      
      if (keysToRemove.length > 0) {
        await this.AsyncStorage.multiRemove(keysToRemove);
      }
    } catch (error) {
      console.error('MobileStorageAdapter: Failed to clear storage', error);
      throw error;
    }
  }

  /**
   * Get all keys for this namespace
   */
  async getAllKeys(): Promise<string[]> {
    try {
      const allKeys = await this.AsyncStorage.getAllKeys();
      return allKeys
        .filter((key: string) => key.startsWith(this.namespace))
        .map((key: string) => key.replace(this.namespace, ''));
    } catch (error) {
      console.error('MobileStorageAdapter: Failed to get all keys', error);
      return [];
    }
  }

  /**
   * Clean up expired items
   */
  async cleanupExpired(): Promise<void> {
    try {
      const allKeys = await this.getAllKeys();
      
      // Check each key and remove if expired
      await Promise.all(
        allKeys.map(async (key) => {
          // This will automatically remove expired items
          await this.getItem(key);
        })
      );
    } catch (error) {
      console.error('MobileStorageAdapter: Failed to cleanup expired items', error);
    }
  }

  /**
   * Get multiple items at once (performance optimization)
   */
  async multiGet(keys: string[]): Promise<Array<[string, string | null]>> {
    try {
      const namespacedKeys = keys.map(key => this.getKey(key));
      const results = await this.AsyncStorage.multiGet(namespacedKeys);
      
      return results.map(([namespacedKey, value]: [string, string | null]) => {
        const originalKey = namespacedKey.replace(this.namespace, '');
        
        if (!value) return [originalKey, null];
        
        try {
          const item: StorageItem = JSON.parse(value);
          
          // Check if expired
          if (this.isExpired(item)) {
            // Remove expired item asynchronously
            this.removeItem(originalKey).catch(console.error);
            return [originalKey, null];
          }
          
          return [originalKey, item.value];
        } catch {
          // Fallback: treat as raw string
          return [originalKey, value];
        }
      });
    } catch (error) {
      console.error('MobileStorageAdapter: Failed to multiGet', error);
      return keys.map(key => [key, null]);
    }
  }

  /**
   * Set multiple items at once (performance optimization)
   */
  async multiSet(keyValuePairs: Array<[string, string]>, ttl?: number): Promise<void> {
    try {
      const namespacedPairs = keyValuePairs.map(([key, value]) => {
        const storageItem = this.createStorageItem(value, ttl);
        return [this.getKey(key), JSON.stringify(storageItem)];
      });
      
      await this.AsyncStorage.multiSet(namespacedPairs);
    } catch (error) {
      console.error('MobileStorageAdapter: Failed to multiSet', error);
      throw error;
    }
  }
} 