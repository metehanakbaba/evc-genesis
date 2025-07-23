/**
 * 🌐 Web Storage Adapter
 * 
 * Web-specific storage adapter using localStorage with SSR safety.
 * Provides synchronous operations for web applications.
 * 
 * @module WebStorageAdapter
 * @version 2.0.0
 * @author EV Charging Team
 */

import type { IStorageAdapter, StorageOptions, StorageItem } from './storage.types.ts';

/**
 * 🔧 Web Storage Adapter Implementation
 * 
 * Uses localStorage with SSR safety and optional TTL support
 */
export class WebStorageAdapter implements IStorageAdapter {
  private namespace: string;
  private ssrSafe: boolean;
  private defaultTTL?: number;

  constructor(options: StorageOptions = {}) {
    this.namespace = options.namespace ? `${options.namespace}_` : 'evc_';
    this.ssrSafe = options.ssrSafe !== false; // Default to true
    this.defaultTTL = options.defaultTTL;
  }

  /**
   * Check if localStorage is available (SSR safe)
   */
  private isLocalStorageAvailable(): boolean {
    if (!this.ssrSafe) return true;
    
    try {
      return typeof window !== 'undefined' && window.localStorage !== undefined;
    } catch {
      return false;
    }
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
   * Set item in localStorage
   */
  setItem(key: string, value: string, ttl?: number): void {
    if (!this.isLocalStorageAvailable()) {
      console.warn('localStorage not available - storage operation skipped');
      return;
    }

    try {
      const storageItem = this.createStorageItem(value, ttl);
      const namespacedKey = this.getKey(key);
      localStorage.setItem(namespacedKey, JSON.stringify(storageItem));
    } catch (error) {
      console.error('WebStorageAdapter: Failed to set item', error);
    }
  }

  /**
   * Get item from localStorage
   */
  getItem(key: string): string | null {
    if (!this.isLocalStorageAvailable()) {
      return null;
    }

    try {
      const namespacedKey = this.getKey(key);
      const storedData = localStorage.getItem(namespacedKey);
      
      if (!storedData) return null;

      // Try to parse as StorageItem (with TTL)
      try {
        const item: StorageItem = JSON.parse(storedData);
        
        // Check if item has expired
        if (this.isExpired(item)) {
          this.removeItem(key);
          return null;
        }
        
        return item.value;
      } catch {
        // Fallback: treat as raw string (backward compatibility)
        return storedData;
      }
    } catch (error) {
      console.error('WebStorageAdapter: Failed to get item', error);
      return null;
    }
  }

  /**
   * Remove item from localStorage
   */
  removeItem(key: string): void {
    if (!this.isLocalStorageAvailable()) {
      return;
    }

    try {
      const namespacedKey = this.getKey(key);
      localStorage.removeItem(namespacedKey);
    } catch (error) {
      console.error('WebStorageAdapter: Failed to remove item', error);
    }
  }

  /**
   * Clear all items with this adapter's namespace
   */
  clear(): void {
    if (!this.isLocalStorageAvailable()) {
      return;
    }

    try {
      const keysToRemove: string[] = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.namespace)) {
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('WebStorageAdapter: Failed to clear storage', error);
    }
  }

  /**
   * Get all keys for this namespace
   */
  getAllKeys(): string[] {
    if (!this.isLocalStorageAvailable()) {
      return [];
    }

    try {
      const keys: string[] = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.namespace)) {
          // Remove namespace prefix
          keys.push(key.replace(this.namespace, ''));
        }
      }
      
      return keys;
    } catch (error) {
      console.error('WebStorageAdapter: Failed to get all keys', error);
      return [];
    }
  }

  /**
   * Clean up expired items
   */
  cleanupExpired(): void {
    if (!this.isLocalStorageAvailable()) {
      return;
    }

    const allKeys = this.getAllKeys();
    allKeys.forEach(key => {
      // This will automatically remove expired items
      this.getItem(key);
    });
  }
} 