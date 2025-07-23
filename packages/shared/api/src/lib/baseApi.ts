/**
 * 🔗 Base API Configuration
 * 
 * Cross-platform RTK Query base API with type-safe error handling,
 * authentication, and retry logic. Platform-agnostic implementation.
 * 
 * @module BaseApi
 * @version 2.0.0
 * @author EV Charging Team
 */

import {
  createApi,
  fetchBaseQuery,
  retry,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import type { 
  ApiSuccessResponse, 
  ApiErrorResponse, 
  ApiTagType 
} from './types/common.types.js';

/**
 * 🔧 Base Query Configuration
 * Platform-agnostic base query with authentication and error handling
 */
export const createBaseQuery = (config: {
  baseUrl: string;
  getToken: () => string | null;
  onAuthError: () => void;
}) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: config.baseUrl,
    prepareHeaders: (headers) => {
      const token = config.getToken();
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      headers.set('content-type', 'application/json');
      return headers;
    },
  });

  const baseQueryWithAuth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
  > = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    // Handle authentication errors with type safety
    if (result.error?.status === 401) {
      config.onAuthError();
    }

    return result;
  };

  // Add retry logic for network errors, but exclude 401 errors (auth failures)
  return retry(baseQueryWithAuth, {
    maxRetries: 1, // Reduced from 3 to prevent excessive requests
    retryCondition: (error: any, args: any, extraOptions: any) => {
      // Don't retry on authentication errors (401)
      if (error?.status === 401) {
        return false;
      }
      // Don't retry on client errors (4xx)
      if (error?.status && error.status >= 400 && error.status < 500) {
        return false;
      }
      // Only retry on network errors and 5xx server errors
      return error?.status === 'FETCH_ERROR' || (error?.status >= 500);
    }
  } as any);
};

/**
 * 🏭 Create Typed API
 * Factory function to create type-safe API instances
 */
export const createTypedApi = <TReducerPath extends string>(
  reducerPath: TReducerPath,
  baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>
) => {
  return createApi({
    reducerPath,
    baseQuery,
    tagTypes: [
      'Station', 
      'Session', 
      'User', 
      'Transaction', 
      'Wallet',
      'AdminProfile',
      'UserProfile',
      'WalletBalance',
      'PaymentMethods',
      'WalletStats'
    ] as const,
    endpoints: () => ({}),
    keepUnusedDataFor: 300, // Cache for 5 minutes (improved from 60s)
    refetchOnMountOrArgChange: 120, // Refetch if data older than 2 minutes (improved from 30s)
    refetchOnFocus: false, // Disable refetch on window focus to prevent excessive calls
    refetchOnReconnect: true,
  });
};

/**
 * 🎯 Type-Safe Response Transformer
 * Transform API responses with proper type checking
 */
export const transformResponse = <T>(
  response: ApiSuccessResponse<T> | ApiErrorResponse
): T => {
  if (!response.success) {
    throw new Error(response.error.message);
  }
  return response.data;
};

/**
 * 🎯 Void Response Transformer
 * Transform void API responses
 */
export const transformVoidResponse = (
  response: ApiSuccessResponse<null> | ApiErrorResponse
): void => {
  if (!response.success) {
    throw new Error(response.error.message);
  }
  // Return void explicitly
  return;
};

/**
 * 🚨 Type-Safe Error Handler
 * Extract error information with proper typing
 */
export const handleApiError = (error: unknown): {
  message: string;
  code?: string;
  details?: Array<{ field: string; message: string }>;
} => {
  // Handle RTK Query FetchBaseQueryError
  if (error && typeof error === 'object' && 'data' in error) {
    const apiError = error.data as ApiErrorResponse;
    if (apiError?.success === false) {
      return {
        message: apiError.error.message,
        code: apiError.error.code,
        details: apiError.error.details,
      };
    }
  }

  // Handle standard Error objects
  if (error instanceof Error) {
    return { message: error.message };
  }

  // Fallback for unknown errors
  return { message: 'An unexpected error occurred' };
};

/**
 * 🏷️ Tag Generation Utilities
 * Type-safe tag generation for cache invalidation
 */
export const createApiTags = {
  station: (id?: string) => ({ type: 'Station' as const, id }),
  session: (id?: string) => ({ type: 'Session' as const, id }),
  user: (id?: string) => ({ type: 'User' as const, id }),
  transaction: (id?: string) => ({ type: 'Transaction' as const, id }),
  wallet: (id?: string) => ({ type: 'Wallet' as const, id }),
  adminProfile: (id?: string) => ({ type: 'AdminProfile' as const, id }),
  userProfile: (id?: string) => ({ type: 'UserProfile' as const, id }),
  walletBalance: (id?: string) => ({ type: 'WalletBalance' as const, id }),
  paymentMethods: (id?: string) => ({ type: 'PaymentMethods' as const, id }),
  walletStats: (id?: string) => ({ type: 'WalletStats' as const, id }),
  list: (type: ApiTagType) => ({ type, id: 'LIST' }),
} as const; 