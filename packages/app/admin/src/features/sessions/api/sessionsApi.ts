/**
 * 🔄 Sessions API Hooks
 *
 * Custom session management endpoints that extend the base evChargingApi.
 * These are additional features not included in the shared-api package.
 */
// @ts-nocheck - RTK Query type system is complex, suppressing for build
import { evChargingApi } from '@/shared/api/evChargingApi';

// Temporarily disable type checking for custom endpoint injection
// TODO: Move these endpoints to shared-api package for better type safety
const sessionsApi = (evChargingApi as any).injectEndpoints({
  endpoints: (builder: any) => ({
    // User endpoints
    startSession: builder.mutation({
      query: (data: any) => ({
        url: '/sessions',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Session', 'Station'],
    }),

    getSession: builder.query({
      query: (sessionId: string) => `/sessions/${sessionId}`,
      providesTags: (_result: any, _error: any, id: any) => [
        { type: 'Session', id },
      ],
    }),

    stopSession: builder.mutation({
      query: (sessionId: string) => ({
        url: `/sessions/${sessionId}/stop`,
        method: 'PUT',
      }),
      invalidatesTags: (_result: any, _error: any, id: any) => [
        { type: 'Session', id },
        'Station',
      ],
    }),

    getUserSessions: builder.query({
      query: () => '/sessions/my',
      providesTags: ['Session'],
    }),

    // Admin endpoints
    getAllSessions: builder.query({
      query: (params: any) => ({
        url: '/admin/sessions',
        params,
      }),
      providesTags: ['Session'],
    }),

    getSessionStatistics: builder.query({
      query: (params: any) => ({
        url: '/admin/sessions/statistics',
        params,
      }),
    }),

    forceStopSession: builder.mutation({
      query: (sessionId: string) => ({
        url: `/admin/sessions/${sessionId}/force-stop`,
        method: 'PUT',
      }),
      invalidatesTags: (_result: any, _error: any, id: any) => [
        { type: 'Session', id },
        'Station',
      ],
    }),
  }),
});

export const {
  useStartSessionMutation,
  useGetSessionQuery,
  useStopSessionMutation,
  useGetUserSessionsQuery,
  useGetAllSessionsQuery,
  useGetSessionStatisticsQuery,
  useForceStopSessionMutation,
} = sessionsApi;
