/**
 * 🔋 Charge Station Domain Types
 * 
 * Type definitions for charge station entities, status management, and operations.
 * Based on chargeStation.ts schema definitions.
 * 
 * @module StationTypes
 * @version 2.0.0
 * @author EV Charging Team
 */

import type { PaginationParams } from './common.types.js';

// 🔋 Station Status Enumeration
export type StationStatus = 'available' | 'charging' | 'offline' | 'maintenance';

// 🔌 Connector Type Enumeration
export type ConnectorType = 'Type1' | 'Type2' | 'CCS' | 'CHAdeMO';

// ⚡ Charge Station Entity
export interface ChargeStation {
  id: string;
  name: string;
  location: string;
  status: StationStatus;
  powerOutput: number;
  connectorType: ConnectorType;
  pricePerKwh: number;
  isActive: boolean;
  lastHeartbeat?: string;
  createdAt: string;
  updatedAt: string;
}

// 📝 Station Registration Request
export interface StationRegistrationRequest {
  name: string;
  location: string;
  powerOutput: number;
  connectorType: ConnectorType;
  pricePerKwh: number;
  isActive?: boolean;
}

// 🔄 Status Update Request
export interface StatusUpdateRequest {
  status: StationStatus;
  updateHeartbeat?: boolean;
}

// 🔍 Station Search Query
export interface StationSearchQuery extends PaginationParams {
  location?: string;
  connectorType?: ConnectorType;
  maxPricePerKwh?: number;
  minPowerOutput?: number;
  status?: StationStatus;
}

// 📊 Station Statistics
export interface StationStats {
  totalStations: number;
  availableStations: number;
  chargingStations: number;
  offlineStations: number;
  maintenanceStations: number;
} 