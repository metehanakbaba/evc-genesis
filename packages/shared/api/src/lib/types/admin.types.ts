/**
 * 🔧 Admin Operations Types
 * 
 * Type definitions for administrative operations, user management, and system oversight.
 * Based on admin.ts schema definitions.
 * 
 * @module AdminTypes
 * @version 2.0.0
 * @author EV Charging Team
 */

import type { UserRole } from './user.types.js';
import type { PaginationParams, DateRangeParams } from './common.types.js';

// 👥 Admin User Management

// ➕ Create User Request
export interface AdminCreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: UserRole;
  isActive?: boolean;
}

// ✏️ Update User Request
export interface AdminUpdateUserRequest {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  role?: UserRole;
  isActive?: boolean;
}

// 🔍 User Search Query
export interface AdminUserQuery extends PaginationParams {
  role?: UserRole;
  isActive?: boolean;
  search?: string; // Search in name, email
}

// 💰 Admin Wallet Management

// 💰 Balance Adjustment Request
export interface AdminAdjustBalanceRequest {
  amount: number;
  reason: string;
  reference?: string;
}

// 🔍 Admin Transaction Query
export interface AdminTransactionQuery extends PaginationParams, DateRangeParams {
  userId?: string;
  type?: string;
  status?: string;
  search?: string;
}

// 🔍 Admin Wallet Query
export interface AdminWalletQuery extends PaginationParams {
  userId?: string;
  email?: string;
  minBalance?: number;
  maxBalance?: number;
}

// 🔄 Process Refund Request
export interface AdminProcessRefundRequest {
  amount?: number;
  reason: string;
}

// 📊 Admin Dashboard Statistics
export interface AdminDashboardStats {
  users: {
    total: number;
    active: number;
    customers: number;
    admins: number;
    fieldWorkers: number;
  };
  stations: {
    total: number;
    available: number;
    charging: number;
    offline: number;
    maintenance: number;
  };
  transactions: {
    today: number;
    thisMonth: number;
    totalVolume: number;
    pendingAmount: number;
  };
  revenue: {
    today: number;
    thisMonth: number;
    thisYear: number;
  };
}

// 📋 System Monitoring
export interface SystemHealthStatus {
  status: 'healthy' | 'warning' | 'critical';
  services: {
    database: 'up' | 'down' | 'degraded';
    paymentGateway: 'up' | 'down' | 'degraded';
    stations: 'up' | 'down' | 'degraded';
  };
  lastChecked: string;
}

// 📊 Activity Log Entry
export interface AdminActivityLog {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  resourceType: 'user' | 'station' | 'transaction' | 'wallet';
  resourceId?: string;
  details: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

// 🔍 Activity Log Query
export interface AdminActivityQuery extends PaginationParams, DateRangeParams {
  adminId?: string;
  action?: string;
  resourceType?: 'user' | 'station' | 'transaction' | 'wallet';
} 