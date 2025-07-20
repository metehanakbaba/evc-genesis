import type {
  ConnectorStatus,
  Location,
  StationStatus,
} from '@/types/global.types';

export interface Connector {
  readonly id: string;
  readonly type: 'CCS2' | 'CHAdeMO' | 'Type2' | 'AC' | 'DC';
  readonly power: number;
  readonly status: ConnectorStatus;
  readonly current_session?: {
    readonly id: string;
    readonly user_id: string;
    readonly started_at: string;
  };
}

export interface StationPricing {
  readonly per_kwh: number;
  readonly currency: string;
}

export interface Station {
  readonly id: string;
  readonly name: string;
  readonly location: Location;
  readonly connectors: ReadonlyArray<Connector>;
  readonly status: StationStatus;
  readonly amenities?: ReadonlyArray<string>;
  readonly operating_hours?: string;
  readonly pricing?: StationPricing;
  readonly distance?: number;
}

export interface StationsQueryParams {
  readonly lat: number;
  readonly lng: number;
  readonly radius?: number;
  readonly available_only?: boolean;
}

export interface AdminStationsQueryParams {
  readonly page?: number;
  readonly limit?: number;
  readonly status?: StationStatus;
  readonly search?: string;
  readonly connectorType?: string;
}

export interface CreateStationRequest {
  readonly name: string;
  readonly location: Location;
  readonly connectors: ReadonlyArray<{
    readonly type: Connector['type'];
    readonly power: number;
  }>;
}

export interface UpdateStationRequest {
  readonly name?: string;
  readonly status?: StationStatus;
  readonly operating_hours?: string;
  readonly amenities?: ReadonlyArray<string>;
}
