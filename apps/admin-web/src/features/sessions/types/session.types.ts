import type { SessionStatus } from '@/types/global.types';

export interface ChargingSession {
  readonly id: string;
  readonly connector_id: string;
  readonly user_id: string;
  readonly station_id: string;
  readonly status: SessionStatus;
  readonly started_at: string;
  readonly ended_at?: string;
  readonly energy_delivered?: number;
  readonly current_cost?: number;
  readonly total_cost?: number;
  readonly total_energy?: number;
  readonly duration_minutes?: number;
  readonly estimated_completion?: string;
}

// ✅ Extended interface for live charging sessions (matches SessionsPage structure)
export interface LiveChargingSession {
  readonly id: string;
  readonly connector_id: string;
  readonly user_id: string;
  readonly station_id: string;
  readonly station_name: string;
  readonly user_email: string;
  readonly status: SessionStatus;
  readonly connector_type: 'CCS' | 'CHAdeMO' | 'Type2' | 'CCS_CHAdeMO';
  readonly power_output: number; // kW
  readonly started_at: string;
  readonly ended_at?: string;
  readonly energy_delivered: number; // kWh
  readonly current_cost: number; // TL
  readonly total_cost?: number; // TL
  readonly estimated_completion?: string;
  readonly created_at: string;
  readonly updated_at: string;
}

export interface StartSessionRequest {
  readonly connector_id: string;
  readonly payment_method_id: string;
}

export interface StartSessionResponse {
  readonly session_id: string;
  readonly connector_id: string;
  readonly status: SessionStatus;
  readonly started_at: string;
  readonly estimated_cost: number;
}

export interface SessionsQueryParams {
  readonly page?: number;
  readonly limit?: number;
  readonly status?: SessionStatus;
  readonly user_id?: string;
  readonly station_id?: string;
  readonly date_from?: string;
  readonly date_to?: string;
}

export interface SessionStatistics {
  readonly total_sessions: number;
  readonly active_sessions: number;
  readonly total_energy_delivered: number;
  readonly total_revenue: number;
  readonly average_session_duration: number;
  readonly average_energy_per_session: number;
}
