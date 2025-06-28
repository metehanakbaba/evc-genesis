import { evChargingApi } from '@/shared/api/evChargingApi';
import type { ApiResponse, PaginationResponse } from '@/types/global.types';
import type {
  AdminStationsQueryParams,
  CreateStationRequest,
  Station,
  StationsQueryParams,
  UpdateStationRequest,
} from '../types/station.types';

interface StationsResponse {
  readonly stations: ReadonlyArray<Station>;
  readonly total: number;
}

interface AdminStationsResponse {
  readonly stations: ReadonlyArray<Station>;
  readonly pagination: PaginationResponse;
}

const stationsApi = evChargingApi.injectEndpoints({
  endpoints: (builder) => ({
    // Public endpoints
    getNearbyStations: builder.query<
      ApiResponse<StationsResponse>,
      StationsQueryParams
    >({
      query: ({ lat, lng, radius, available_only }) => ({
        url: '/stations',
        params: {
          lat,
          lng,
          radius,
          available_only,
        },
      }),
      providesTags: ['Station'],
    }),

    getStation: builder.query<ApiResponse<Station>, string>({
      query: (stationId) => `/stations/${stationId}`,
      providesTags: (_result, _error, id) => [{ type: 'Station', id }],
    }),

    // Admin endpoints
    getAllStations: builder.query<
      ApiResponse<AdminStationsResponse>,
      AdminStationsQueryParams
    >({
      query: (params) => ({
        url: '/admin/stations',
        params,
      }),
      providesTags: ['Station'],
    }),

    createStation: builder.mutation<ApiResponse<Station>, CreateStationRequest>(
      {
        query: (station) => ({
          url: '/admin/stations',
          method: 'POST',
          body: station,
        }),
        invalidatesTags: ['Station'],
      },
    ),

    updateStation: builder.mutation<
      ApiResponse<Station>,
      { id: string; data: UpdateStationRequest }
    >({
      query: ({ id, data }) => ({
        url: `/admin/stations/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Station', id },
        'Station',
      ],
    }),

    deleteStation: builder.mutation<ApiResponse<void>, string>({
      query: (stationId) => ({
        url: `/admin/stations/${stationId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Station', id },
        'Station',
      ],
    }),
  }),
});

export const {
  useGetNearbyStationsQuery,
  useGetStationQuery,
  useGetAllStationsQuery,
  useCreateStationMutation,
  useUpdateStationMutation,
  useDeleteStationMutation,
} = stationsApi;
