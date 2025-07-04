/**
 * 🔗 Shared API Types
 * 
 * Cross-platform TypeScript types for RTK Query API endpoints.
 * Based on comprehensive schema system from /schemas folder.
 * 
 * @module SharedApiTypes
 * @version 2.0.0
 * @author EV Charging Team
 */

import type { UserRole } from './types/user.types';
import type { StationStatus, ConnectorType } from './types/station.types';
import type { TransactionType } from './types/wallet.types';
import type { ApiSuccessResponse, ApiErrorResponse, ResponseMeta, ValidationError, Pagination, ApiTagType, ApiTag } from './types/common.types';

// 👤 User Domain Types (from user.ts schema)
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserRegistrationRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: UserRole;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface ProfileUpdateRequest {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

// 🔋 Charge Station Domain Types (from chargeStation.ts schema)
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

export interface StationRegistrationRequest {
  name: string;
  location: string;
  powerOutput: number;
  connectorType: ConnectorType;
  pricePerKwh: number;
  isActive?: boolean;
}

export interface StatusUpdateRequest {
  status: StationStatus;
  updateHeartbeat?: boolean;
}

export interface StationSearchQuery {
  location?: string;
  connectorType?: ConnectorType;
  maxPricePerKwh?: number;
  minPowerOutput?: number;
}

// 💰 PLN Wallet Domain Types (from wallet.ts schema)
export type TransactionStatus = 
  | 'PENDING' 
  | 'PROCESSING' 
  | 'COMPLETED' 
  | 'FAILED' 
  | 'CANCELLED';

export interface PLNAmount {
  amount: number;
  currency: 'PLN';
  formatted: string;
}

export interface PLNTransaction {
  id: string;
  userId?: string; // Not included in client responses for security
  walletId?: string; // Not included in client responses for security
  type: TransactionType;
  status: TransactionStatus;
  amount: PLNAmount;
  description: string;
  stripePaymentIntentId?: string;
  chargingSessionId?: string;
  chargeStationId?: string;
  metadata?: Record<string, unknown>;
  errorMessage?: string;
  processedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentIntentRequest {
  amount: number;
  returnUrl?: string;
  cancelUrl?: string;
  metadata?: Record<string, string>;
}

export interface ProcessChargingPaymentRequest {
  chargingSessionId: string;
  chargeStationId: string;
  amount: number;
  description?: string;
  powerConsumed?: number;
  chargingDuration?: number;
  metadata?: Record<string, unknown>;
}

export interface TransactionQuery {
  limit?: number;
  offset?: number;
  type?: TransactionType;
  status?: TransactionStatus;
  startDate?: string;
  endDate?: string;
}

// 🔧 Admin Domain Types (from admin.ts schema)
// Note: Admin types are now primarily defined in schema-adapter.ts
// Remove duplicate AdminCreateUserRequest to avoid export conflicts

export interface AdminUpdateUserRequest {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  role?: UserRole;
  isActive?: boolean;
}

export interface AdminProcessRefundRequest {
  amount?: number;
  reason: string;
}

// 🎫 Authentication Response Types
export interface AuthSuccessResponse {
  token: string;
  user: User;
  expiresAt: string;
}

// 🔗 API Base Query Configuration
export interface ApiBaseQueryConfig {
  baseUrl: string;
  timeout?: number;
  retry?: {
    maxRetries: number;
    retryCondition?: (error: unknown) => boolean;
  };
} 