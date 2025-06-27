/**
 * 🔋 Charge Station Endpoints
 * 
 * Type-safe RTK Query endpoints for charge station management operations.
 * Single responsibility: Station CRUD and status operations only.
 * 
 * @module StationsEndpoints
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
  ChargeStation,
  StationRegistrationRequest,
  StatusUpdateRequest,
  StationSearchQuery,
  StationStats 
} from '../types/station.types.js';
import { transformResponse, transformVoidResponse, createApiTags } from '../baseApi.js';

export const stationsEndpoints = (
  builder: EndpointBuilder<any, any, any>
) => ({
  // 📋 Get All Stations
  getStations: builder.query<PaginatedResponse<ChargeStation>, StationSearchQuery>({
    query: (params = {}) => ({
      url: '/stations',
      params,
    }),
    transformResponse: (response: ApiSuccessResponse<PaginatedResponse<ChargeStation>>) =>
      transformResponse(response),
    transformErrorResponse: (response: ApiErrorResponse) => response,
    providesTags: (result) => [
      createApiTags.list('Station'),
      ...(result?.items.map((station) => createApiTags.station(station.id)) || []),
    ],
  }),

  // ⚡ Get Station by ID
  getStationById: builder.query<ChargeStation, string>({
    query: (stationId) => `/stations/${stationId}`,
    transformResponse: (response: ApiSuccessResponse<{ station: ChargeStation }>) =>
      transformResponse(response).station,
    transformErrorResponse: (response: ApiErrorResponse) => response,
    providesTags: (result, error, stationId) => [createApiTags.station(stationId)],
  }),

  // ➕ Register Station (Admin)
  registerStation: builder.mutation<ChargeStation, StationRegistrationRequest>({
    query: (stationData) => ({
      url: '/admin/stations',
      method: 'POST',
      body: stationData,
    }),
    transformResponse: (response: ApiSuccessResponse<{ station: ChargeStation }>) =>
      transformResponse(response).station,
    transformErrorResponse: (response: ApiErrorResponse) => response,
    invalidatesTags: [createApiTags.list('Station')],
  }),

  // 🔄 Update Station Status
  updateStationStatus: builder.mutation<ChargeStation, { id: string; data: StatusUpdateRequest }>({
    query: ({ id, data }) => ({
      url: `/stations/${id}/status`,
      method: 'PATCH',
      body: data,
    }),
    transformResponse: (response: ApiSuccessResponse<{ station: ChargeStation }>) =>
      transformResponse(response).station,
    transformErrorResponse: (response: ApiErrorResponse) => response,
    invalidatesTags: (result, error, { id }) => [
      createApiTags.station(id),
      createApiTags.list('Station'),
    ],
  }),

  // ✏️ Update Station (Admin)
  updateStation: builder.mutation<ChargeStation, { id: string; data: Partial<StationRegistrationRequest> }>({
    query: ({ id, data }) => ({
      url: `/admin/stations/${id}`,
      method: 'PUT',
      body: data,
    }),
    transformResponse: (response: ApiSuccessResponse<{ station: ChargeStation }>) =>
      transformResponse(response).station,
    transformErrorResponse: (response: ApiErrorResponse) => response,
    invalidatesTags: (result, error, { id }) => [
      createApiTags.station(id),
      createApiTags.list('Station'),
    ],
  }),

  // 🗑️ Delete Station (Admin)
  deleteStation: builder.mutation<void, string>({
    query: (stationId) => ({
      url: `/admin/stations/${stationId}`,
      method: 'DELETE',
    }),
    transformResponse: (response: ApiSuccessResponse<null>) =>
      transformVoidResponse(response),
    transformErrorResponse: (response: ApiErrorResponse) => response,
    invalidatesTags: (result, error, stationId) => [
      createApiTags.station(stationId),
      createApiTags.list('Station'),
    ],
  }),

  // 📊 Get Station Statistics (Admin)
  getStationStats: builder.query<StationStats, void>({
    query: () => '/admin/stations/stats',
    transformResponse: (response: ApiSuccessResponse<StationStats>) =>
      transformResponse(response),
    transformErrorResponse: (response: ApiErrorResponse) => response,
    providesTags: [createApiTags.list('Station')],
  }),

  // 🔍 Search Nearby Stations
  searchNearbyStations: builder.query<ChargeStation[], { latitude: number; longitude: number; radius?: number }>({
    query: ({ latitude, longitude, radius = 10 }) => ({
      url: '/stations/nearby',
      params: { lat: latitude, lng: longitude, radius },
    }),
    transformResponse: (response: ApiSuccessResponse<{ stations: ChargeStation[] }>) =>
      transformResponse(response).stations,
    transformErrorResponse: (response: ApiErrorResponse) => response,
    providesTags: (result) => [
      createApiTags.list('Station'),
      ...(result?.map((station) => createApiTags.station(station.id)) || []),
    ],
  }),

  // 💓 Send Station Heartbeat
  sendHeartbeat: builder.mutation<void, string>({
    query: (stationId) => ({
      url: `/stations/${stationId}/heartbeat`,
      method: 'POST',
    }),
    transformResponse: (response: ApiSuccessResponse<null>) =>
      transformVoidResponse(response),
    transformErrorResponse: (response: ApiErrorResponse) => response,
    invalidatesTags: (result, error, stationId) => [createApiTags.station(stationId)],
  }),
}); 