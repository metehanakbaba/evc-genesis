/**
 * 📊 Dashboard Types
 *
 * Type definitions for the EV charging admin dashboard.
 * Includes stats, operations, and developer tools.
 */

export interface RevolutionaryStat {
  readonly id: string;
  readonly title: string;
  readonly value: string;
  readonly change: string;
  readonly trend: 'up' | 'down' | 'stable';
  readonly color: 'emerald' | 'blue' | 'purple' | 'green' | 'yellow' | 'red';
  readonly icon: string;
  readonly description: string;
  readonly sparklineData: readonly number[];
}

export interface LiveOperation {
  readonly id: string;
  readonly title: string;
  readonly count: number;
  readonly unit?: string;
  readonly status: 'active' | 'completed' | 'revenue' | 'warning';
  readonly details: string;
}

export interface DeveloperTool {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly status: 'healthy' | 'warning' | 'error';
  readonly lastUpdate: Date;
}

export interface DashboardData {
  readonly revolutionaryStats: readonly RevolutionaryStat[];
  readonly liveOperations: readonly LiveOperation[];
  readonly developerTools: readonly DeveloperTool[];
  readonly isDeveloperMode: boolean;
}

// Chart data types
export interface ChartDataPoint {
  readonly label: string;
  readonly value: number;
  readonly color?: string;
}

export interface RevenueChartData {
  readonly labels: readonly string[];
  readonly datasets: readonly {
    readonly label: string;
    readonly data: readonly number[];
    readonly borderColor: string;
    readonly backgroundColor: string;
    readonly fill: boolean;
  }[];
}

// Station and activity types
export interface TopStation {
  readonly id: string;
  readonly name: string;
  readonly location: string;
  readonly sessions: number;
  readonly revenue: number;
  readonly efficiency: number;
}

export interface RecentActivity {
  readonly id: string;
  readonly type: 'session_start' | 'session_end' | 'maintenance' | 'alert';
  readonly title: string;
  readonly description: string;
  readonly timestamp: Date;
  readonly stationId?: string;
  readonly userId?: string;
}
