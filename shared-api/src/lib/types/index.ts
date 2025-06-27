/**
 * 📋 Types Barrel Export
 * 
 * Centralized export for all API types with proper organization.
 * Now synchronized with root /schemas/ using schema-adapter.
 * 
 * @module TypesIndex
 * @version 2.0.0
 * @author EV Charging Team
 */

// 🔗 Primary export from schema-adapter (root schemas converted to TypeScript)
export * from '../schema-adapter.js';

// 🔧 Keep local types for extended functionality if needed
// (These should be deprecated in favor of schema-adapter types)
// export * from './common.types.js';
// export * from './user.types.js';
// export * from './station.types.js';
// export * from './wallet.types.js';
// export * from './admin.types.js'; 