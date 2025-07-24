/**
 * 👥 User Management Endpoints
 * 
 * RTK Query endpoints for user operations and administration.
 * Includes user CRUD, role management, and profile operations.
 * 
 * @module UsersEndpoints
 * @version 2.0.0
 * @author EV Charging Team
 */

import type { EndpointBuilder } from '@reduxjs/toolkit/query';
import type {
  User,
  UserRole,
  CreateUserRequest,
  UpdateUserRequest,
  UserListResponse,
  UserProfile,
} from '../types/user.types';
import type { 
  AdminUserQuery 
} from '../types/admin.types';
import { transformResponse, transformVoidResponse } from '../baseApi';

export const usersEndpoints = (
  builder: EndpointBuilder<any, any, any>
) => ({

  // 📊 Get All Users (Admin)
  getUsers: builder.query<UserListResponse, AdminUserQuery>({
    query: (params) => ({
      url: '/users',
      params,
    }),
    transformResponse,
    providesTags: (result) => 
      result?.data 
        ? [
            ...result.data.map(({ id }) => ({ type: 'User' as const, id })),
            'User',
          ]
        : ['User'],
  }),

  // 🎯 Get User by ID
  getUser: builder.query<User, string>({
    query: (id) => `/users/${id}`,
    transformResponse,
    providesTags: (result, error, id) => [{ type: 'User', id }],
  }),

  // ➕ Create New User (Admin)
  createUser: builder.mutation<User, CreateUserRequest>({
    query: (newUser) => ({
      url: '/users',
      method: 'POST',
      body: newUser,
    }),
    transformResponse,
    invalidatesTags: ['User'],
  }),

  // ✏️ Update User
  updateUser: builder.mutation<User, { id: string; updates: UpdateUserRequest }>({
    query: ({ id, updates }) => ({
      url: `/users/${id}`,
      method: 'PUT',
      body: updates,
    }),
    transformResponse,
    invalidatesTags: (result, error, { id }) => [{ type: 'User', id }, 'User'],
  }),

  // 🗑️ Delete User (Admin)
  deleteUser: builder.mutation<void, string>({
    query: (id) => ({
      url: `/users/${id}`,
      method: 'DELETE',
    }),
    transformResponse: transformVoidResponse,
    invalidatesTags: (result, error, id) => [{ type: 'User', id }, 'User'],
  }),

  // 👤 Get User Profile
  getUserProfile: builder.query<UserProfile, string>({
    query: (id) => `/users/${id}/profile`,
    transformResponse,
    providesTags: (result, error, id) => [{ type: 'UserProfile', id }],
  }),

  // ✏️ Update User Profile
  updateUserProfile: builder.mutation<UserProfile, { id: string; profile: Partial<UserProfile> }>({
    query: ({ id, profile }) => ({
      url: `/users/${id}/profile`,
      method: 'PUT',
      body: profile,
    }),
    transformResponse,
    invalidatesTags: (result, error, { id }) => [
      { type: 'UserProfile', id },
      { type: 'User', id }
    ],
  }),

  // 🔄 Change User Role (Admin)
  changeUserRole: builder.mutation<User, { id: string; role: UserRole }>({
    query: ({ id, role }) => ({
      url: `/users/${id}/role`,
      method: 'PATCH',
      body: { role },
    }),
    transformResponse,
    invalidatesTags: (result, error, { id }) => [{ type: 'User', id }, 'User'],
  }),

  // 🚫 Suspend User (Admin)
  suspendUser: builder.mutation<void, string>({
    query: (id) => ({
      url: `/users/${id}/suspend`,
      method: 'POST',
    }),
    transformResponse: transformVoidResponse,
    invalidatesTags: (result, error, id) => [{ type: 'User', id }, 'User'],
  }),

  // ✅ Activate User (Admin)
  activateUser: builder.mutation<void, string>({
    query: (id) => ({
      url: `/users/${id}/activate`,
      method: 'POST',
    }),
    transformResponse: transformVoidResponse,
    invalidatesTags: (result, error, id) => [{ type: 'User', id }, 'User'],
  }),
}); 