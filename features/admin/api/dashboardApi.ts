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
      query: (params: { period?: 'day' | 'week' | 'month' }) => ({
// ... existing code ...
 