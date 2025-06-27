/**
 * 👥 User Management Endpoints
 * 
 * Type-safe RTK Query endpoints for user management operations.
 * Single responsibility: User CRUD operations only.
 * 
 * @module UsersEndpoints
 * @version 2.0.0
 * @author EV Charging Team
 */

import type { EndpointBuilder } from '@reduxjs/toolkit/query/react';
import type { 
  ApiSuccessResponse,
  ApiErrorResponse,
  PaginatedResponse 
} from '../types/common.types.js';
import type { 
  User,
  ProfileUpdateRequest 
} from '../types/user.types.js';
import type { 
  AdminCreateUserRequest,
  AdminUpdateUserRequest,
  AdminUserQuery 
} from '../types/admin.types.js';
import { transformResponse, transformVoidResponse, createApiTags } from '../baseApi.js';

export const usersEndpoints = (
  builder: EndpointBuilder<any, any, any>
) => ({
  // 📋 Get All Users (Admin)
  getUsers: builder.query<PaginatedResponse<User>, AdminUserQuery>({
    query: (params = {}) => ({
      url: '/admin/users',
      params,
    }),
    transformResponse: (response: ApiSuccessResponse<PaginatedResponse<User>>) =>
      transformResponse(response),
    transformErrorResponse: (response: ApiErrorResponse) => response,
    providesTags: (result) => [
      createApiTags.list('User'),
      ...(result?.items.map((user) => createApiTags.user(user.id)) || []),
    ],
  }),

  // 👤 Get User by ID
  getUserById: builder.query<User, string>({
    query: (userId) => `/admin/users/${userId}`,
    transformResponse: (response: ApiSuccessResponse<{ user: User }>) =>
      transformResponse(response).user,
    transformErrorResponse: (response: ApiErrorResponse) => response,
    providesTags: (result, error, userId) => [createApiTags.user(userId)],
  }),

  // ➕ Create User (Admin)
  createUser: builder.mutation<User, AdminCreateUserRequest>({
    query: (userData) => ({
      url: '/admin/users',
      method: 'POST',
      body: userData,
    }),
    transformResponse: (response: ApiSuccessResponse<{ user: User }>) =>
      transformResponse(response).user,
    transformErrorResponse: (response: ApiErrorResponse) => response,
    invalidatesTags: [createApiTags.list('User')],
  }),

  // ✏️ Update User (Admin)
  updateUser: builder.mutation<User, { id: string; data: AdminUpdateUserRequest }>({
    query: ({ id, data }) => ({
      url: `/admin/users/${id}`,
      method: 'PUT',
      body: data,
    }),
    transformResponse: (response: ApiSuccessResponse<{ user: User }>) =>
      transformResponse(response).user,
    transformErrorResponse: (response: ApiErrorResponse) => response,
    invalidatesTags: (result, error, { id }) => [
      createApiTags.user(id),
      createApiTags.list('User'),
    ],
  }),

  // 🗑️ Delete User (Admin)
  deleteUser: builder.mutation<void, string>({
    query: (userId) => ({
      url: `/admin/users/${userId}`,
      method: 'DELETE',
    }),
    transformResponse: (response: ApiSuccessResponse<null>) =>
      transformVoidResponse(response),
    transformErrorResponse: (response: ApiErrorResponse) => response,
    invalidatesTags: (result, error, userId) => [
      createApiTags.user(userId),
      createApiTags.list('User'),
    ],
  }),

  // 🔄 Update Own Profile
  updateProfile: builder.mutation<User, ProfileUpdateRequest>({
    query: (data) => ({
      url: '/users/profile',
      method: 'PUT',
      body: data,
    }),
    transformResponse: (response: ApiSuccessResponse<{ user: User }>) =>
      transformResponse(response).user,
    transformErrorResponse: (response: ApiErrorResponse) => response,
    invalidatesTags: [createApiTags.user('me')],
  }),

  // ✅ Activate/Deactivate User (Admin)
  toggleUserStatus: builder.mutation<User, { id: string; isActive: boolean }>({
    query: ({ id, isActive }) => ({
      url: `/admin/users/${id}/status`,
      method: 'PATCH',
      body: { isActive },
    }),
    transformResponse: (response: ApiSuccessResponse<{ user: User }>) =>
      transformResponse(response).user,
    transformErrorResponse: (response: ApiErrorResponse) => response,
    invalidatesTags: (result, error, { id }) => [
      createApiTags.user(id),
      createApiTags.list('User'),
    ],
  }),
}); 