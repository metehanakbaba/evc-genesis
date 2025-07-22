/**
 * Global type definitions for the EV Charging Admin App
 */

// API Response types
export interface ApiResponse<T> {
  readonly success: boolean;
  readonly data: T;
  readonly message: string;
  readonly meta: {
    readonly timestamp: string;
    readonly requestId: string;
    readonly version: string;
  };
}

export interface ApiError {
  readonly success: false;
  readonly error: {
    readonly code: string;
    readonly message: string;
    readonly details?: Record<string, unknown>;
  };
  readonly meta: {
    readonly timestamp: string;
    readonly requestId: string;
    readonly version: string;
  };
}

// Pagination types
export interface PaginationParams {
  readonly page?: number;
  readonly limit?: number;
}

export interface PaginationResponse {
  readonly page: number;
  readonly limit: number;
  readonly total: number;
  readonly pages: number;
}

// Common status types
export type StationStatus = 'active' | 'maintenance' | 'offline';
export type ConnectorStatus = 'available' | 'occupied' | 'faulted' | 'reserved';
export type SessionStatus =
  | 'starting'
  | 'charging'
  | 'completed'
  | 'failed'
  | 'cancelled';

// Location types
export interface Location {
  readonly lat: number;
  readonly lng: number;
  readonly address: string;
}

// User role types - Updated to match API specification
export type UserRole = 'CUSTOMER' | 'ADMIN' | 'FIELD_WORKER';
