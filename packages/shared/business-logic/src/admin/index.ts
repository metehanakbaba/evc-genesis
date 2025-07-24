/**
 * Admin/Dashboard Business Logic Domain
 * Centralized logic for dashboard components, time formatting, and admin utilities
 */

import { UserRole } from "../users";

// =====================================
// Time & Date Formatting Utilities
// =====================================

/**
 * Format time difference as "X ago" string
 */
export const formatTimeAgo = (date: Date): string => {
  const diff = Date.now() - date.getTime();
  const seconds = Math.floor(diff / 1000);

  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

/**
 * Format current timestamp for build info
 */
export const formatBuildTimestamp = (): string => {
  const now = new Date();
  return `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`;
};

/**
 * Format time for live updates display
 */
export const formatLiveUpdateTime = (date: Date): string => {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

// =====================================
// Dashboard Statistics & Calculations
// =====================================

export interface DashboardMetrics {
  readonly totalStations: number;
  readonly activeStations: number;
  readonly totalUsers: number;
  readonly activeSessions: number;
  readonly dailyRevenue: number;
  readonly powerOutput: number;
}

/**
 * Calculate dashboard statistics from raw data
 */
export const calculateDashboardStats = (metrics: DashboardMetrics) => {
  const stationAvailability = metrics.totalStations > 0 
    ? Math.round((metrics.activeStations / metrics.totalStations) * 100) 
    : 0;
  
  const averagePowerPerStation = metrics.activeStations > 0 
    ? Math.round(metrics.powerOutput / metrics.activeStations) 
    : 0;
  
  const revenuePerSession = metrics.activeSessions > 0 
    ? Math.round(metrics.dailyRevenue / metrics.activeSessions) 
    : 0;

  return {
    stationAvailability,
    averagePowerPerStation,
    revenuePerSession,
    utilizationRate: Math.round((metrics.activeSessions / metrics.activeStations) * 100),
  };
};

/**
 * Format revenue values with currency
 */
export const formatRevenue = (amount: number): string => {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M zł`;
  }
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(1)}K zł`;
  }
  return `${amount.toFixed(0)} zł`;
};

/**
 * Format power values with units
 */
export const formatPowerOutput = (watts: number): string => {
  if (watts >= 1000000) {
    return `${(watts / 1000000).toFixed(1)} MW`;
  }
  if (watts >= 1000) {
    return `${(watts / 1000).toFixed(1)} kW`;
  }
  return `${watts} W`;
};

// =====================================
// AI Insights & Intelligence Logic
// =====================================

export type InsightType = 'trend' | 'prediction' | 'recommendation' | 'optimization';
export type InsightImpact = 'positive' | 'negative' | 'neutral';
export type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';

export interface AIInsight {
  readonly id: string;
  readonly type: InsightType;
  readonly title: string;
  readonly value: string;
  readonly change: number;
  readonly impact: InsightImpact;
  readonly confidence: number;
  readonly description: string;
}

/**
 * Get styling configuration for AI insight types
 */
export const getInsightTypeConfig = (type: InsightType) => {
  const configs = {
    trend: {
      color: 'blue',
      icon: 'ChartBarIcon',
      gradient: 'from-blue-500/20 via-blue-400/15 to-cyan-500/10',
      border: 'border-blue-400/30',
      textColor: 'text-blue-400',
    },
    prediction: {
      color: 'purple',
      icon: 'CpuChipIcon',
      gradient: 'from-purple-500/20 via-purple-400/15 to-pink-500/10',
      border: 'border-purple-400/30',
      textColor: 'text-purple-400',
    },
    recommendation: {
      color: 'yellow',
      icon: 'LightBulbIcon',
      gradient: 'from-yellow-500/20 via-amber-400/15 to-orange-500/10',
      border: 'border-yellow-400/30',
      textColor: 'text-yellow-400',
    },
    optimization: {
      color: 'green',
      icon: 'ChartPieIcon',
      gradient: 'from-green-500/20 via-emerald-400/15 to-lime-500/10',
      border: 'border-green-400/30',
      textColor: 'text-green-400',
    },
  };
  return configs[type];
};

/**
 * Get styling configuration for severity levels
 */
export const getSeverityConfig = (severity: SeverityLevel) => {
  const configs = {
    low: {
      color: 'green',
      icon: 'CheckCircleIcon',
      gradient: 'from-green-500/20 via-emerald-400/15 to-lime-500/10',
      border: 'border-green-400/30',
      textColor: 'text-green-400',
    },
    medium: {
      color: 'yellow',
      icon: 'ExclamationTriangleIcon',
      gradient: 'from-yellow-500/20 via-amber-400/15 to-orange-500/10',
      border: 'border-yellow-400/30',
      textColor: 'text-yellow-400',
    },
    high: {
      color: 'orange',
      icon: 'ExclamationCircleIcon',
      gradient: 'from-orange-500/20 via-red-400/15 to-pink-500/10',
      border: 'border-orange-400/30',
      textColor: 'text-orange-400',
    },
    critical: {
      color: 'red',
      icon: 'XCircleIcon',
      gradient: 'from-red-500/20 via-pink-400/15 to-rose-500/10',
      border: 'border-red-400/30',
      textColor: 'text-red-400',
    },
  };
  return configs[severity];
};

/**
 * Calculate confidence level category
 */
export const getConfidenceLevel = (confidence: number): 'low' | 'medium' | 'high' => {
  if (confidence >= 80) return 'high';
  if (confidence >= 60) return 'medium';
  return 'low';
};

/**
 * Filter insights by type and confidence
 */
export const filterInsights = (
  insights: AIInsight[],
  filters: {
    type?: InsightType;
    minConfidence?: number;
    impact?: InsightImpact;
  }
): AIInsight[] => {
  return insights.filter((insight) => {
    if (filters.type && insight.type !== filters.type) return false;
    if (filters.minConfidence && insight.confidence < filters.minConfidence) return false;
    if (filters.impact && insight.impact !== filters.impact) return false;
    return true;
  });
};

// =====================================
// System Status & Health Monitoring
// =====================================

export interface SystemStatus {
  readonly api: 'operational' | 'degraded' | 'down';
  readonly database: 'operational' | 'degraded' | 'down';
  readonly payment: 'operational' | 'degraded' | 'down';
  readonly charging: 'operational' | 'degraded' | 'down';
}

/**
 * Get overall system health status
 */
export const getSystemHealth = (status: SystemStatus): 'healthy' | 'warning' | 'critical' => {
  const services = Object.values(status);
  
  if (services.every(service => service === 'operational')) {
    return 'healthy';
  }
  
  if (services.some(service => service === 'down')) {
    return 'critical';
  }
  
  return 'warning';
};

/**
 * Get status indicator configuration
 */
export const getStatusIndicatorConfig = (status: 'operational' | 'degraded' | 'down') => {
  const configs = {
    operational: {
      color: 'green',
      icon: 'CheckCircleIcon',
      text: 'Operational',
      bgColor: 'bg-green-500',
      textColor: 'text-green-400',
    },
    degraded: {
      color: 'yellow',
      icon: 'ExclamationTriangleIcon',
      text: 'Degraded',
      bgColor: 'bg-yellow-500',
      textColor: 'text-yellow-400',
    },
    down: {
      color: 'red',
      icon: 'XCircleIcon',
      text: 'Down',
      bgColor: 'bg-red-500',
      textColor: 'text-red-400',
    },
  };
  return configs[status];
};

// =====================================
// Dashboard Navigation & Routing
// =====================================

export interface DashboardRoute {
  readonly path: string;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
  readonly variant: 'blue' | 'purple' | 'teal' | 'emerald';
  readonly stats: string;
  readonly badge?: string;
}

/**
 * Get navigation route configuration
 */
export const getRouteConfig = (path: string): DashboardRoute | null => {
  const routes: Record<string, DashboardRoute> = {
    '/stations': {
      path: '/stations',
      title: 'Charging Stations',
      description: 'Manage charging infrastructure and monitor station status',
      icon: 'RevolutionaryStationIcon',
      variant: 'blue',
      stats: '156 stations',
      badge: 'Infrastructure',
    },
    '/users': {
      path: '/users',
      title: 'User Management',
      description: 'Manage user accounts, roles and permissions',
      icon: 'UserGroupIcon',
      variant: 'purple',
      stats: '2,847 users',
      badge: 'Users',
    },
    '/wallets': {
      path: '/wallets',
      title: 'Payment System',
      description: 'Process payments, manage balances and transactions',
      icon: 'CreditCardIcon',
      variant: 'teal',
      stats: '1.2M zł volume',
      badge: 'Payments',
    },
    '/sessions': {
      path: '/sessions',
      title: 'Live Charging Sessions',
      description: 'Monitor ongoing charging sessions in real-time',
      icon: 'BoltIcon',
      variant: 'emerald',
      stats: '23 active',
      badge: 'Live',
    },
  };
  
  return routes[path] || null;
};

/**
 * Check if user has access to route
 */
export const hasRouteAccess = (
  userRole: UserRole,
  route: string
): boolean => {
  const adminOnlyRoutes = ['/users', '/system'];
  
  if (userRole === 'ADMIN') return true;
  if (userRole === 'FIELD_WORKER') {
    return !adminOnlyRoutes.includes(route);
  }
  if (userRole === 'CUSTOMER') {
    return ['/sessions', '/wallets'].includes(route);
  }
  
  return false;
};

// Types are already exported inline above 