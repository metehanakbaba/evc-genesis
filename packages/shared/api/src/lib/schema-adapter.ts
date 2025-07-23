/**
 * 🔗 Schema Adapter
 * 
 * Converts root OpenAPI schemas to TypeScript types for shared-api usage.
 * Ensures consistency between API definitions and implementation.
 * 
 * @module SchemaAdapter
 * @version 2.0.0
 * @author EV Charging Team
 */

import type { UserRole } from './types/user.types';
import type { StationStatus, ConnectorType } from './types/station.types';
import type { TransactionType } from './types/wallet.types';
import type { Pagination } from './types/common.types';

// 🎯 User Types from Root Schema
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

export interface AuthSuccessResponse {
  token: string;
  user: User;
  expiresIn: string; // Changed from number to string to match API response
}

// 🔋 Station Types from Root Schema
export interface ChargeStation {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  status: StationStatus;
  powerOutput: number;
  connectorType: ConnectorType;
  pricePerKwh: number;
  lastHeartbeat: string;
  createdAt: string;
  updatedAt: string;
}

export interface StationRegistrationRequest {
  name: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  powerOutput: number;
  connectorType: ConnectorType;
  pricePerKwh: number;
}

export interface StatusUpdateRequest {
  status: StationStatus;
  lastHeartbeat: string;
}

export interface StationSearchQuery {
  latitude?: number;
  longitude?: number;
  radius?: number;
  status?: StationStatus;
  connectorType?: ConnectorType;
}

export interface StationStats {
  totalStations: number;
  activeStations: number;
  totalSessions: number;
  totalRevenue: number;
}

// 💰 Wallet Types from Root Schema
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'cancelled';

export interface PLNAmount {
  amount: number;
  currency: 'PLN';
  formatted: string;
}

export interface PLNTransaction {
  id: string;
  userId: string;
  walletId: string;
  type: TransactionType;
  status: TransactionStatus;
  amount: PLNAmount;
  stripePaymentIntentId?: string;
  chargingSessionId?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface FullPLNTransaction extends PLNTransaction {
  user: User;
  station?: ChargeStation;
}

export interface WalletBalance {
  userId: string;
  balance: PLNAmount;
  pendingAmount: PLNAmount;
  updatedAt: string;
}

export interface CreatePaymentIntentRequest {
  amount: number;
  currency: 'PLN';
  metadata?: Record<string, unknown>;
}

export interface ProcessChargingPaymentRequest {
  chargingSessionId: string;
  amount: number;
  stationId: string;
}

export interface TransactionQuery {
  userId?: string;
  type?: TransactionType;
  status?: TransactionStatus;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface WalletStats {
  totalBalance: PLNAmount;
  totalTransactions: number;
  totalRevenue: PLNAmount;
  activeUsers: number;
}

// 🔧 Admin Types from Root Schema
export interface AdminCreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: UserRole;
  isActive?: boolean;
}

export interface AdminUpdateUserRequest {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  role?: UserRole;
  isActive?: boolean;
}

export interface AdminUserQuery {
  role?: UserRole;
  isActive?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export interface AdminAdjustBalanceRequest {
  userId: string;
  amount: number;
  reason: string;
}

export interface AdminProcessRefundRequest {
  transactionId: string;
  amount?: number;
  reason: string;
}

export interface AdminDashboardStats {
  users: {
    total: number;
    active: number;
    new: number;
  };
  stations: {
    total: number;
    active: number;
    offline: number;
  };
  transactions: {
    total: number;
    volume: PLNAmount;
    revenue: PLNAmount;
  };
  wallet: {
    totalBalance: PLNAmount;
    totalTransactions: number;
  };
}

export type SystemHealthStatus = 'healthy' | 'degraded' | 'critical';

export interface AdminActivityLog {
  id: string;
  adminId: string;
  action: string;
  resource: string;
  resourceId: string;
  details: Record<string, unknown>;
  timestamp: string;
}

export interface AdminActivityQuery {
  adminId?: string;
  action?: string;
  resource?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

// 📋 Common Types from Root Schema (API Response structures)
export interface PaginatedResponse<T> {
  items: T[];
  pagination: Pagination;
}

// 🔧 Query Parameters
export interface DateRangeParams {
  startDate?: string;
  endDate?: string;
} 