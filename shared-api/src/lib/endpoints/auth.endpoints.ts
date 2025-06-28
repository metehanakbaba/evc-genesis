/**
 * 🔐 Authentication Endpoints
 * 
 * RTK Query endpoints for user authentication and authorization.
 * Provides login, logout, registration, and token management.
 * 
 * @module AuthEndpoints
 * @version 2.0.0
 * @author EV Charging Team
 */

import type { EndpointBuilder } from '@reduxjs/toolkit/query';
import type {
  UserLoginRequest, 
  UserRegistrationRequest, 
  User, 
  UserRole,
  ApiSuccessResponse,
  ApiErrorResponse,
  AuthSuccessResponse 
} from '../types/user.types';
import { transformResponse, transformVoidResponse, createApiTags } from '../baseApi';

export const authEndpoints = (
  builder: EndpointBuilder<any, any, any>
) => ({
  // 🔑 User Login
  login: builder.mutation<AuthSuccessResponse, UserLoginRequest>({
    query: (credentials) => ({
      url: '/auth/login',
      method: 'POST',
      body: credentials,
    }),
    transformResponse,
    invalidatesTags: ['User'],
  }),

  // 📝 User Registration
  register: builder.mutation<AuthSuccessResponse, UserRegistrationRequest>({
    query: (userData) => ({
      url: '/auth/register',
      method: 'POST',
      body: userData,
    }),
    transformResponse,
    invalidatesTags: ['User'],
  }),

  // 🚪 User Logout
  logout: builder.mutation<void, void>({
    query: () => ({
      url: '/auth/logout',
      method: 'POST',
    }),
    transformResponse: transformVoidResponse,
    invalidatesTags: (result, error) => {
      if (!error) {
        return ['User', 'Session'];
      }
      return [];
    },
  }),

  // 👤 Get Current User
  getCurrentUser: builder.query<User, void>({
    query: () => '/auth/me',
    transformResponse,
    providesTags: ['User'],
  }),

  // 🔄 Refresh Token
  refreshToken: builder.mutation<AuthSuccessResponse, void>({
    query: () => ({
      url: '/auth/refresh',
      method: 'POST',
    }),
    transformResponse,
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