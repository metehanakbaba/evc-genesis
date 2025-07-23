/**
 * 📋 Common API Types
 * 
 * Shared response structures and base types used across all API endpoints.
 * Based on common.ts schema definitions.
 * 
 * @module CommonTypes
 * @version 2.0.0
 * @author EV Charging Team
 */

// 🎯 Standard API Response Types
export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
  message: string;
  meta: ResponseMeta;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: ValidationError[];
  };
  meta: ResponseMeta;
}

export interface ResponseMeta {
  timestamp: string;
  requestId?: string;
  version: string;
}

export interface ValidationError {
  field: string;
  message: string;
  value?: unknown;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: Pagination;
}

// 🏷️ RTK Query Tag Types
export type ApiTagType = 
  | 'Station' 
  | 'Session' 
  | 'User' 
  | 'Transaction' 
  | 'Wallet'
  | 'AdminProfile'
  | 'UserProfile' 
  | 'WalletBalance'
  | 'PaymentMethods'
  | 'WalletStats';

export interface ApiTag {
  type: ApiTagType;
  id?: string | number;
}

// 🔧 Query Parameters
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface DateRangeParams {
  startDate?: string;
  endDate?: string;
} 