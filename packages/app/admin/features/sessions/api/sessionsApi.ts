/**
 * 🔄 Sessions API Hooks
 * 
 * Custom session management endpoints that extend the base evChargingApi.
 * These are additional features not included in the shared-api package.
 */
import { evChargingApi } from '@/shared/api/evChargingApi';

// Temporarily disable type checking for custom endpoint injection
// TODO: Move these endpoints to shared-api package for better type safety
const sessionsApi = (evChargingApi as any).injectEndpoints({
  endpoints: (builder: any) => ({
    // User endpoints
    startSession: builder.mutation({
      query: (data: any: any) => ({
        url: '/sessions',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Session', 'Station'],
    }),

    getSession: builder.query({
      query: (sessionId: string: any) => `/sessions/${sessionId}`,
      providesTags: (_result: any, _error: any, id: any) => [{ type: 'Session', id }],
    }),

    stopSession: builder.mutation({
      query: (sessionId: string: any) => ({
        url: `/sessions/${sessionId}/stop`,
        method: 'PUT',
      }),
      invalidatesTags: (_result: any, _error: any, id: any) => [
        { type: 'Session', id },
        'Station',
      ],
    }),

    getUserSessions: builder.query({
      query: (: any) => '/sessions/my',
      providesTags: ['Session'],
    }),

    // Admin endpoints
    getAllSessions: builder.query({
      query: (params: any: any) => ({
        url: '/admin/sessions',
        params,
      }),
      providesTags: ['Session'],
    }),

    getSessionStatistics: builder.query({
      query: (params: any: any) => ({
        url: '/admin/sessions/statistics',
        params,
      }),
    }),

    forceStopSession: builder.mutation({
      query: (sessionId: string: any) => ({
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
