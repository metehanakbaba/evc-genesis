/**
 * 🔐 Authentication Endpoints
 * 
 * RTK Query endpoints for user authentication and authorization.
 * Provides login, logout, registration, token management, and admin profile management.
 * 
 * @module AuthEndpoints
 * @version 2.1.0
 * @author EV Charging Team
 */

import type { EndpointBuilder } from '@reduxjs/toolkit/query';
import type {
  UserLoginRequest, 
  UserRegistrationRequest, 
  User 
} from '../types/user.types';
import type { ApiSuccessResponse } from '../types/common.types';
import { transformResponse, transformVoidResponse } from '../baseApi';

// Admin profile update interface
interface AdminProfileUpdateRequest {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  preferences?: {
    theme?: 'light' | 'dark' | 'auto';
    language?: string;
    notifications?: {
      email?: boolean;
      push?: boolean;
      sms?: boolean;
    };
    dashboard?: {
      defaultView?: string;
      autoRefresh?: boolean;
      refreshInterval?: number;
    };
  };
}

export const authEndpoints = (
  builder: EndpointBuilder<any, any, any>
) => ({
  // 🔑 User Login
  login: builder.mutation<ApiSuccessResponse<{
    token: string;
    user: User;
    expiresIn: string;
  }>, UserLoginRequest>({
    query: (credentials) => ({
      url: '/auth/login',
      method: 'POST',
      body: credentials,
    }),
    // Don't transform response for login - we need the full response structure
    invalidatesTags: ['User'],
  }),

  // 📝 User Registration
  register: builder.mutation<ApiSuccessResponse<{
    token: string;
    user: User;
    expiresIn: string;
  }>, UserRegistrationRequest>({
    query: (userData) => ({
      url: '/auth/register',
      method: 'POST',
      body: userData,
    }),
    // Don't transform response for register - we need the full response structure
    invalidatesTags: ['User'],
  }),

  // 🚪 User Logout
  logout: builder.mutation<ApiSuccessResponse<{}>, void>({
    query: () => ({
      url: '/auth/logout',
      method: 'POST',
    }),
    transformResponse,
    invalidatesTags: (result, error) => {
      if (!error) {
        return ['User', 'Session', 'AdminProfile'];
      }
      return [];
    },
  }),

  // 👤 Get Current User
  getCurrentUser: builder.query<User, void>({
    query: () => '/api/admin/profile',
    transformResponse,
    providesTags: ['User'],
  }),

  // 👨‍💼 Get Admin Profile (Enhanced)
  getAdminProfile: builder.query<User, void>({
    query: () => '/api/admin/profile',
    transformResponse,
    providesTags: ['AdminProfile', 'User'],
  }),

  // ✏️ Update Admin Profile
  updateAdminProfile: builder.mutation<ApiSuccessResponse<User>, AdminProfileUpdateRequest>({
    query: (profileData) => ({
      url: '/api/admin/profile',
      method: 'PUT',
      body: profileData,
    }),
    transformResponse,
    invalidatesTags: ['AdminProfile', 'User'],
  }),

  // 🔄 Refresh Token
  refreshToken: builder.mutation<ApiSuccessResponse<{
    token: string;
    user: User;
    expiresIn: string;
  }>, void>({
    query: () => ({
      url: '/auth/refresh',
      method: 'POST',
    }),
    transformResponse,
    invalidatesTags: ['User'],
  }),

  // 🔒 Change Password
  changePassword: builder.mutation<ApiSuccessResponse<{}>, {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    query: (passwordData) => ({
      url: '/api/admin/change-password',
      method: 'PUT',
      body: passwordData,
    }),
    transformResponse,
    invalidatesTags: ['User'],
  }),

  // 📧 Forgot Password
  forgotPassword: builder.mutation<void, { email: string }>({
    query: ({ email }) => ({
      url: '/auth/forgot-password',
      method: 'POST',
      body: { email },
    }),
    transformResponse: transformVoidResponse,
  }),

  // 🔐 Reset Password
  resetPassword: builder.mutation<void, { token: string; password: string }>({
    query: ({ token, password }) => ({
      url: '/auth/reset-password',
      method: 'POST',
      body: { token, password },
    }),
    transformResponse: transformVoidResponse,
  }),
}); 