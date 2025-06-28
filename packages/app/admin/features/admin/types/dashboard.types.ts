export interface DashboardStats {
  readonly totalStations: number;
  readonly activeStations: number;
  readonly totalSessions: number;
  readonly activeSessions: number;
  readonly totalUsers: number;
  readonly activeUsers: number;
  readonly todayRevenue: number;
  readonly weekRevenue: number;
  readonly monthRevenue: number;
  readonly todayEnergy: number;
  readonly weekEnergy: number;
  readonly monthEnergy: number;
}

export interface RevenueChartData {
  readonly date: string;
  readonly revenue: number;
  readonly sessions: number;
}

export interface StationUtilization {
  readonly stationId: string;
  readonly stationName: string;
  readonly utilizationRate: number;
  readonly totalSessions: number;
  readonly totalEnergy: number;
  readonly revenue: number;
}

export interface RecentActivity {
  readonly id: string;
  readonly type:
    | 'session_started'
    | 'session_ended'
    | 'station_offline'
    | 'new_user';
  readonly message: string;
  readonly timestamp: string;
  readonly metadata?: Record<string, unknown>;
}

export interface DashboardData {
  readonly stats: DashboardStats;
  readonly revenueChart: ReadonlyArray<RevenueChartData>;
  readonly topStations: ReadonlyArray<StationUtilization>;
  readonly recentActivity: ReadonlyArray<RecentActivity>;
}
