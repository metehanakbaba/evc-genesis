import { evChargingApi } from '@/shared/api/evChargingApi';
import type { ApiResponse } from '@/types/global.types';
import type { DashboardData, DashboardStats } from '../types/dashboard.types';
import type { EndpointBuilder } from '@reduxjs/toolkit/query';

const dashboardApi = evChargingApi.injectEndpoints({
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
    getDashboardData: builder.query<
      ApiResponse<DashboardData>,
      { period?: 'day' | 'week' | 'month' }
    >({
      query: (params) => ({
        url: '/admin/dashboard',
        params,
      }),
      providesTags: ['Station', 'Session', 'User'],
    }),

    getDashboardStats: builder.query<ApiResponse<DashboardStats>, void>({
      query: () => '/admin/dashboard/stats',
      providesTags: ['Station', 'Session', 'User'],
    }),

    exportReport: builder.mutation<
      ApiResponse<{ downloadUrl: string }>,
      {
        type: 'stations' | 'sessions' | 'users' | 'revenue';
        format: 'csv' | 'pdf';
        from: string;
        to: string;
      }
    >({
      query: (params) => ({
        url: '/admin/reports/export',
        method: 'POST',
        body: params,
      }),
    }),
  }),
});

export const {
  useGetDashboardDataQuery,
  useGetDashboardStatsQuery,
  useExportReportMutation,
} = dashboardApi;
