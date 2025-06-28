/**
 * 🔋 Station Management Endpoints
 * 
 * RTK Query endpoints for EV charging station operations.
 * Includes station CRUD, status monitoring, and analytics.
 * 
 * @module StationsEndpoints  
 * @version 2.0.0
 * @author EV Charging Team
 */

import type { EndpointBuilder } from '@reduxjs/toolkit/query';
import type {
  ChargeStation,
  StationStatus,
  CreateStationRequest,
  UpdateStationRequest,
  StationQuery,
  StationListResponse,
  StationStats 
} from '../types/station.types';
import { transformResponse, transformVoidResponse, createApiTags } from '../baseApi';

export const stationsEndpoints = (
  builder: EndpointBuilder<any, any, any>
) => ({
  // 📊 Get All Stations
  getStations: builder.query<StationListResponse, StationQuery>({
    query: (params) => ({
      url: '/stations',
      params,
    }),
    transformResponse,
    providesTags: (result) => 
      result?.data 
        ? [
            ...result.data.map(({ id }) => ({ type: 'Station' as const, id })),
            'Station',
          ]
        : ['Station'],
  }),

  // 🎯 Get Station by ID
  getStation: builder.query<ChargeStation, string>({
    query: (id) => `/stations/${id}`,
    transformResponse,
    providesTags: (result, error, id) => [{ type: 'Station', id }],
  }),

  // ➕ Create New Station
  createStation: builder.mutation<ChargeStation, CreateStationRequest>({
    query: (newStation) => ({
      url: '/stations',
      method: 'POST',
      body: newStation,
    }),
    transformResponse,
    invalidatesTags: ['Station'],
  }),

  // ✏️ Update Station
  updateStation: builder.mutation<ChargeStation, { id: string; updates: UpdateStationRequest }>({
    query: ({ id, updates }) => ({
      url: `/stations/${id}`,
      method: 'PUT',
      body: updates,
    }),
    transformResponse,
    invalidatesTags: (result, error, { id }) => [{ type: 'Station', id }, 'Station'],
  }),

  // 🗑️ Delete Station
  deleteStation: builder.mutation<void, string>({
    query: (id) => ({
      url: `/stations/${id}`,
      method: 'DELETE',
    }),
    transformResponse: transformVoidResponse,
    invalidatesTags: (result, error, id) => [{ type: 'Station', id }, 'Station'],
  }),

  // 📈 Get Station Statistics
  getStationStats: builder.query<StationStats, { stationId?: string; period?: string }>({
    query: (params) => ({
      url: '/stations/stats',
      params,
    }),
    transformResponse,
    providesTags: ['StationStats'],
  }),

  // 🔄 Update Station Status
  updateStationStatus: builder.mutation<ChargeStation, { id: string; status: StationStatus }>({
    query: ({ id, status }) => ({
      url: `/stations/${id}/status`,
      method: 'PATCH',
      body: { status },
    }),
    transformResponse,
    invalidatesTags: (result, error, { id }) => [{ type: 'Station', id }, 'Station'],
  }),

  // 🔧 Get Station Maintenance Log
  getStationMaintenance: builder.query<any[], string>({
    query: (stationId) => `/stations/${stationId}/maintenance`,
    transformResponse,
    providesTags: (result, error, stationId) => [
      { type: 'StationMaintenance', id: stationId }
    ],
  }),

  // 📋 Add Maintenance Record
  addMaintenanceRecord: builder.mutation<any, { stationId: string; record: any }>({
    query: ({ stationId, record }) => ({
      url: `/stations/${stationId}/maintenance`,
      method: 'POST',
      body: record,
    }),
    transformResponse,
    invalidatesTags: (result, error, { stationId }) => [
      { type: 'StationMaintenance', id: stationId },
      { type: 'Station', id: stationId }
    ],
  }),

  // 🌍 Get Nearby Stations
  getNearbyStations: builder.query<ChargeStation[], { lat: number; lng: number; radius?: number }>({
    query: ({ lat, lng, radius = 10 }) => ({
      url: '/stations/nearby',
      params: { lat, lng, radius },
    }),
    transformResponse,
    providesTags: ['Station'],
  }),

  // ⚡ Get Station Power Consumption
  getStationPowerData: builder.query<any[], { stationId: string; period: string }>({
    query: ({ stationId, period }) => ({
      url: `/stations/${stationId}/power`,
      params: { period },
    }),
    transformResponse,
    providesTags: (result, error, { stationId }) => [
      { type: 'StationPower', id: stationId }
    ],
  }),
}); 