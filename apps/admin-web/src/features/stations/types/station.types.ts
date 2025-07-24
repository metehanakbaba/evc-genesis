import type {
  ConnectorStatus,
  Location,
  StationStatus,
} from '@/types/global.types';

// Legacy types - keeping for compatibility with existing mock data only
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

// Station interface aligned with new API schema
export interface Station {
  readonly id: string;
  readonly name: string;
  readonly location: Location;
  readonly status: StationStatus;
  readonly powerOutput: number;
  readonly connectorType: string;
  readonly pricePerKWh: number;
  
  // Optional fields for compatibility
  readonly amenities?: ReadonlyArray<string>;
  readonly operating_hours?: string;
  readonly distance?: number;
}

export interface StationsQueryParams {
  readonly latitude: number;
  readonly longitude: number;
  readonly radius?: number;
  readonly available_only?: boolean;
}

export interface AdminStationsQueryParams {
  readonly page?: number;
  readonly limit?: number;
  readonly status?: string;
  readonly search?: string;
  readonly connectorType?: string;
}

// CreateStationRequest to match new API schema
export interface CreateStationRequest {
  readonly name: string;
  readonly location: {
    readonly latitude: number;
    readonly longitude: number;
    readonly address: string;
    readonly city: string;
    readonly country: string;
  };
  readonly powerOutput: number;
  readonly connectorType: string;
  readonly pricePerKWh: number;
}



// UpdateStationRequest to match new API schema
export interface UpdateStationRequest {
  readonly name?: string;
  readonly location?: {
    readonly latitude: number;
    readonly longitude: number;
    readonly address: string;
    readonly city: string;
    readonly country: string;
  };
  readonly powerOutput?: number;
  readonly connectorType?: string;
  readonly pricePerKWh?: number;
  readonly status?: string;
}


