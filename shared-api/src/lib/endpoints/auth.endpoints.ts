/**
 * 🔐 Authentication Endpoints
 * 
 * Type-safe RTK Query endpoints for user authentication operations.
 * Single responsibility: Authentication only.
 * 
 * @module AuthEndpoints
 * @version 2.0.0
 * @author EV Charging Team
 */

import type { EndpointBuilder } from '@reduxjs/toolkit/query/react';
import type { 
  ApiSuccessResponse,
  ApiErrorResponse 
} from '../types/common.types.js';
import type { 
  User,
  UserLoginRequest,
  UserRegistrationRequest,
  AuthSuccessResponse 
} from '../types/user.types.js';
import { transformResponse, transformVoidResponse, createApiTags } from '../baseApi.js';

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
    transformResponse: (response: ApiSuccessResponse<AuthSuccessResponse>) =>
      transformResponse(response),
    transformErrorResponse: (response: ApiErrorResponse) => response,
    invalidatesTags: [createApiTags.user()],
  }),

  // 📝 User Registration
  register: builder.mutation<User, UserRegistrationRequest>({
    query: (userData) => ({
      url: '/auth/register',
      method: 'POST',
      body: userData,
    }),
    transformResponse: (response: ApiSuccessResponse<{ user: User }>) =>
      transformResponse(response).user,
    transformErrorResponse: (response: ApiErrorResponse) => response,
    invalidatesTags: [createApiTags.user()],
  }),

  // 🚪 User Logout
  logout: builder.mutation<void, void>({
    query: () => ({
      url: '/auth/logout',
      method: 'POST',
    }),
    transformResponse: (response: ApiSuccessResponse<null>) =>
      transformVoidResponse(response),
    transformErrorResponse: (response: ApiErrorResponse) => response,
    invalidatesTags: [createApiTags.user()],
  }),

  // 🔄 Refresh Token
  refreshToken: builder.mutation<AuthSuccessResponse, void>({
    query: () => ({
      url: '/auth/refresh',
      method: 'POST',
    }),
    transformResponse: (response: ApiSuccessResponse<AuthSuccessResponse>) =>
      transformResponse(response),
    transformErrorResponse: (response: ApiErrorResponse) => response,
    invalidatesTags: [createApiTags.user()],
  }),

  // 👤 Get Current User Profile
  getCurrentUser: builder.query<User, void>({
    query: () => '/auth/me',
    transformResponse: (response: ApiSuccessResponse<{ user: User }>) =>
      transformResponse(response).user,
    transformErrorResponse: (response: ApiErrorResponse) => response,
    providesTags: [createApiTags.user('me')],
  }),
}); 