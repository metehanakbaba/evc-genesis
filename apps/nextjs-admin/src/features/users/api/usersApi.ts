import { evChargingApi } from '@/shared/api/evChargingApi';
import type { ApiResponse, PaginationResponse } from '@/types/global.types';
import type {
  CreateUserRequest,
  PaymentMethod,
  UpdateProfileRequest,
  UpdateUserRequest,
  UserProfile,
  UserStatistics,
  UsersQueryParams,
} from '../types/user.types';

interface UsersResponse {
  readonly users: ReadonlyArray<UserProfile>;
  readonly pagination: PaginationResponse;
}

const usersApi = evChargingApi.injectEndpoints({
  endpoints: (builder) => ({
    // User endpoints
    getUserProfile: builder.query<ApiResponse<UserProfile>, void>({
      query: () => '/user/profile',
      providesTags: ['User'],
    }),

    updateUserProfile: builder.mutation<
      ApiResponse<UserProfile>,
      UpdateProfileRequest
    >({
      query: (data) => ({
        url: '/user/profile',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    getPaymentMethods: builder.query<
      ApiResponse<{ methods: ReadonlyArray<PaymentMethod> }>,
      void
    >({
      query: () => '/user/payment-methods',
    }),

    addPaymentMethod: builder.mutation<
      ApiResponse<PaymentMethod>,
      { token: string }
    >({
      query: (data) => ({
        url: '/user/payment-methods',
        method: 'POST',
        body: data,
      }),
    }),

    deletePaymentMethod: builder.mutation<ApiResponse<void>, string>({
      query: (paymentMethodId) => ({
        url: `/user/payment-methods/${paymentMethodId}`,
        method: 'DELETE',
      }),
    }),

    // Admin endpoints
    getAllUsers: builder.query<ApiResponse<UsersResponse>, UsersQueryParams>({
      query: (params) => ({
        url: '/admin/users',
        params,
      }),
      providesTags: ['User'],
    }),

    getUser: builder.query<ApiResponse<UserProfile>, string>({
      query: (userId) => `/admin/users/${userId}`,
      providesTags: (_result, _error, id) => [{ type: 'User', id }],
    }),

    createUser: builder.mutation<ApiResponse<UserProfile>, CreateUserRequest>({
      query: (data) => ({
        url: '/admin/users',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    updateUser: builder.mutation<
      ApiResponse<UserProfile>,
      { id: string; data: UpdateUserRequest }
    >({
      query: ({ id, data }) => ({
        url: `/admin/users/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'User', id },
        'User',
      ],
    }),

    deleteUser: builder.mutation<ApiResponse<void>, string>({
      query: (userId) => ({
        url: `/admin/users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'User', id }, 'User'],
    }),

    getUserStatistics: builder.query<ApiResponse<UserStatistics>, void>({
      query: () => '/admin/users/statistics',
    }),

    resetUserPassword: builder.mutation<
      ApiResponse<void>,
      { userId: string; newPassword: string }
    >({
      query: ({ userId, newPassword }) => ({
        url: `/admin/users/${userId}/reset-password`,
        method: 'POST',
        body: { new_password: newPassword },
      }),
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useGetPaymentMethodsQuery,
  useAddPaymentMethodMutation,
  useDeletePaymentMethodMutation,
  useGetAllUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserStatisticsQuery,
  useResetUserPasswordMutation,
} = usersApi;
