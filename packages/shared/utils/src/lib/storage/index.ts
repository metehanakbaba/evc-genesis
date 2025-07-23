/**
 * 🔒 Storage Module Exports
 * 
 * Unified exports for all storage adapters and utilities.
 * Provides easy access to platform-specific storage solutions.
 * 
 * @module StorageIndex
 * @version 2.0.0
 * @author EV Charging Team
 */

// Type definitions
export type {
  IStorageAdapter,
  IAuthStorage,
  StorageOptions,
  StorageFactoryOptions,
  Platform,
  StorageItem,
  StorageEvent,
} from './storage.types';

// Storage adapters
export { WebStorageAdapter } from './web.adapter';
export { MobileStorageAdapter } from './mobile.adapter';

// Factory and utilities
export {
  StorageFactory,
  UnifiedAuthStorage,
  PlatformDetector,
  createWebAuthStorage,
  createMobileAuthStorage,
  createUniversalAuthStorage,
} from './storage.factory';

/**
 * 🎯 Quick Access Exports
 * 
 * Most commonly used functions for quick setup
 */

// Default web auth storage (most common use case)
export const createDefaultWebAuthStorage = () => createWebAuthStorage();

// Default mobile auth storage factory
export const createDefaultMobileAuthStorage = (AsyncStorage: any) => 
  createMobileAuthStorage(AsyncStorage);

// Universal storage that auto-detects platform
export const createDefaultAuthStorage = (AsyncStorage?: any) => 
  createUniversalAuthStorage(AsyncStorage); 