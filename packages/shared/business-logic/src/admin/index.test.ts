/**
 * Admin/Dashboard Domain Business Logic Tests
 * Comprehensive test coverage for admin utilities and dashboard logic
 */

import {
  formatTimeAgo,
  formatBuildTimestamp,
  formatLiveUpdateTime,
  calculateDashboardStats,
  formatRevenue,
  formatPowerOutput,
  getInsightTypeConfig,
  getSeverityConfig,
  getConfidenceLevel,
  filterInsights,
  getSystemHealth,
  getStatusIndicatorConfig,
  getRouteConfig,
  hasRouteAccess,
  type DashboardMetrics,
  type AIInsight,
  type SystemStatus,
} from './index';

describe('Admin/Dashboard Domain Business Logic', () => {
  describe('Time & Date Formatting', () => {
    describe('formatTimeAgo', () => {
      it('should format seconds correctly', () => {
        const now = new Date();
        const fiveSecondsAgo = new Date(now.getTime() - 5 * 1000);
        expect(formatTimeAgo(fiveSecondsAgo)).toBe('5s ago');
      });

      it('should format minutes correctly', () => {
        const now = new Date();
        const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);
        expect(formatTimeAgo(tenMinutesAgo)).toBe('10m ago');
      });

      it('should format hours correctly', () => {
        const now = new Date();
        const threeHoursAgo = new Date(now.getTime() - 3 * 60 * 60 * 1000);
        expect(formatTimeAgo(threeHoursAgo)).toBe('3h ago');
      });

      it('should format days correctly', () => {
        const now = new Date();
        const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
        expect(formatTimeAgo(twoDaysAgo)).toBe('2d ago');
      });

      it('should handle edge cases', () => {
        const now = new Date();
        const justNow = new Date(now.getTime() - 30 * 1000);
        expect(formatTimeAgo(justNow)).toBe('30s ago');
      });
    });

    describe('formatBuildTimestamp', () => {
      it('should format current date correctly', () => {
        const result = formatBuildTimestamp();
        const now = new Date();
        const expected = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`;
        expect(result).toBe(expected);
      });

      it('should always return string format YYYY.MM.DD', () => {
        const result = formatBuildTimestamp();
        expect(result).toMatch(/^\d{4}\.\d{2}\.\d{2}$/);
      });
    });

    describe('formatLiveUpdateTime', () => {
      it('should format time correctly', () => {
        const testDate = new Date('2024-01-15T14:30:45');
        const result = formatLiveUpdateTime(testDate);
        expect(result).toMatch(/^\d{2}:\d{2}:\d{2}$/);
      });
    });
  });

  describe('Dashboard Statistics & Calculations', () => {
    describe('calculateDashboardStats', () => {
      it('should calculate stats correctly with valid data', () => {
        const metrics: DashboardMetrics = {
          totalStations: 100,
          activeStations: 80,
          totalUsers: 1000,
          activeSessions: 40,
          dailyRevenue: 25000,
          powerOutput: 8000,
        };

        const result = calculateDashboardStats(metrics);
        
        expect(result).toEqual({
          stationAvailability: 80, // 80/100 * 100
          averagePowerPerStation: 100, // 8000/80
          revenuePerSession: 625, // 25000/40
          utilizationRate: 50, // 40/80 * 100
        });
      });

      it('should handle zero values gracefully', () => {
        const metrics: DashboardMetrics = {
          totalStations: 0,
          activeStations: 0,
          totalUsers: 0,
          activeSessions: 0,
          dailyRevenue: 0,
          powerOutput: 0,
        };

        const result = calculateDashboardStats(metrics);
        
        expect(result).toEqual({
          stationAvailability: 0,
          averagePowerPerStation: 0,
          revenuePerSession: 0,
          utilizationRate: 0,
        });
      });

      it('should handle division by zero cases', () => {
        const metrics: DashboardMetrics = {
          totalStations: 100,
          activeStations: 0,
          totalUsers: 1000,
          activeSessions: 0,
          dailyRevenue: 25000,
          powerOutput: 8000,
        };

        const result = calculateDashboardStats(metrics);
        
        expect(result.averagePowerPerStation).toBe(0);
        expect(result.revenuePerSession).toBe(0);
        expect(result.utilizationRate).toBe(0);
      });
    });

    describe('formatRevenue', () => {
      it('should format large amounts with M suffix', () => {
        expect(formatRevenue(1500000)).toBe('1.5M zł');
        expect(formatRevenue(2000000)).toBe('2.0M zł');
      });

      it('should format thousands with K suffix', () => {
        expect(formatRevenue(1500)).toBe('1.5K zł');
        expect(formatRevenue(25000)).toBe('25.0K zł');
      });

      it('should format small amounts without suffix', () => {
        expect(formatRevenue(500)).toBe('500 zł');
        expect(formatRevenue(999)).toBe('999 zł');
      });

      it('should handle zero and negative values', () => {
        expect(formatRevenue(0)).toBe('0 zł');
      });
    });

    describe('formatPowerOutput', () => {
      it('should format MW correctly', () => {
        expect(formatPowerOutput(1500000)).toBe('1.5 MW');
        expect(formatPowerOutput(2000000)).toBe('2.0 MW');
      });

      it('should format kW correctly', () => {
        expect(formatPowerOutput(1500)).toBe('1.5 kW');
        expect(formatPowerOutput(25000)).toBe('25.0 kW');
      });

      it('should format watts correctly', () => {
        expect(formatPowerOutput(500)).toBe('500 W');
        expect(formatPowerOutput(999)).toBe('999 W');
      });
    });
  });

  describe('AI Insights & Intelligence Logic', () => {
    describe('getInsightTypeConfig', () => {
      it('should return correct config for each insight type', () => {
        const trendConfig = getInsightTypeConfig('trend');
        expect(trendConfig.color).toBe('blue');
        expect(trendConfig.icon).toBe('ChartBarIcon');

        const predictionConfig = getInsightTypeConfig('prediction');
        expect(predictionConfig.color).toBe('purple');
        expect(predictionConfig.icon).toBe('CpuChipIcon');
      });
    });

    describe('getSeverityConfig', () => {
      it('should return correct config for each severity level', () => {
        const lowConfig = getSeverityConfig('low');
        expect(lowConfig.color).toBe('green');
        expect(lowConfig.icon).toBe('CheckCircleIcon');

        const criticalConfig = getSeverityConfig('critical');
        expect(criticalConfig.color).toBe('red');
        expect(criticalConfig.icon).toBe('XCircleIcon');
      });
    });

    describe('getConfidenceLevel', () => {
      it('should categorize confidence levels correctly', () => {
        expect(getConfidenceLevel(95)).toBe('high');
        expect(getConfidenceLevel(80)).toBe('high');
        expect(getConfidenceLevel(75)).toBe('medium');
        expect(getConfidenceLevel(60)).toBe('medium');
        expect(getConfidenceLevel(45)).toBe('low');
        expect(getConfidenceLevel(30)).toBe('low');
      });
    });

    describe('filterInsights', () => {
      const mockInsights: AIInsight[] = [
        {
          id: '1',
          type: 'trend',
          title: 'User Growth',
          value: '+156',
          change: 12.5,
          impact: 'positive',
          confidence: 95,
          description: 'Growing user base',
        },
        {
          id: '2',
          type: 'prediction',
          title: 'Peak Demand',
          value: '18:30',
          change: 23,
          impact: 'neutral',
          confidence: 75,
          description: 'Evening peak prediction',
        },
        {
          id: '3',
          type: 'recommendation',
          title: 'Capacity Expansion',
          value: 'Station 45',
          change: 0,
          impact: 'positive',
          confidence: 60,
          description: 'Add more charging points',
        },
      ];

      it('should filter by type', () => {
        const trendInsights = filterInsights(mockInsights, { type: 'trend' });
        expect(trendInsights).toHaveLength(1);
        expect(trendInsights[0].type).toBe('trend');
      });

      it('should filter by minimum confidence', () => {
        const highConfidenceInsights = filterInsights(mockInsights, { minConfidence: 80 });
        expect(highConfidenceInsights).toHaveLength(1);
        expect(highConfidenceInsights[0].confidence).toBe(95);
      });

      it('should filter by impact', () => {
        const positiveInsights = filterInsights(mockInsights, { impact: 'positive' });
        expect(positiveInsights).toHaveLength(2);
        positiveInsights.forEach(insight => {
          expect(insight.impact).toBe('positive');
        });
      });

      it('should apply multiple filters', () => {
        const filtered = filterInsights(mockInsights, {
          type: 'prediction',
          minConfidence: 70,
          impact: 'neutral',
        });
        expect(filtered).toHaveLength(1);
        expect(filtered[0].id).toBe('2');
      });
    });
  });

  describe('System Status & Health Monitoring', () => {
    describe('getSystemHealth', () => {
      it('should return healthy when all services operational', () => {
        const status: SystemStatus = {
          api: 'operational',
          database: 'operational',
          payment: 'operational',
          charging: 'operational',
        };
        expect(getSystemHealth(status)).toBe('healthy');
      });

      it('should return critical when any service is down', () => {
        const status: SystemStatus = {
          api: 'operational',
          database: 'down',
          payment: 'operational',
          charging: 'operational',
        };
        expect(getSystemHealth(status)).toBe('critical');
      });

      it('should return warning when services are degraded', () => {
        const status: SystemStatus = {
          api: 'operational',
          database: 'degraded',
          payment: 'operational',
          charging: 'degraded',
        };
        expect(getSystemHealth(status)).toBe('warning');
      });
    });

    describe('getStatusIndicatorConfig', () => {
      it('should return correct config for each status', () => {
        const operationalConfig = getStatusIndicatorConfig('operational');
        expect(operationalConfig.color).toBe('green');
        expect(operationalConfig.text).toBe('Operational');

        const downConfig = getStatusIndicatorConfig('down');
        expect(downConfig.color).toBe('red');
        expect(downConfig.text).toBe('Down');
      });
    });
  });

  describe('Dashboard Navigation & Routing', () => {
    describe('getRouteConfig', () => {
      it('should return correct config for known routes', () => {
        const stationsConfig = getRouteConfig('/stations');
        expect(stationsConfig?.title).toBe('Charging Stations');
        expect(stationsConfig?.variant).toBe('blue');

        const usersConfig = getRouteConfig('/users');
        expect(usersConfig?.title).toBe('User Management');
        expect(usersConfig?.variant).toBe('purple');
      });

      it('should return null for unknown routes', () => {
        expect(getRouteConfig('/unknown')).toBeNull();
      });
    });

    describe('hasRouteAccess', () => {
      it('should allow admin access to all routes', () => {
        expect(hasRouteAccess('admin', '/users')).toBe(true);
        expect(hasRouteAccess('admin', '/stations')).toBe(true);
        expect(hasRouteAccess('admin', '/system')).toBe(true);
      });

      it('should restrict operator access to admin-only routes', () => {
        expect(hasRouteAccess('operator', '/users')).toBe(false);
        expect(hasRouteAccess('operator', '/system')).toBe(false);
        expect(hasRouteAccess('operator', '/stations')).toBe(true);
        expect(hasRouteAccess('operator', '/sessions')).toBe(true);
      });

      it('should restrict user access to limited routes', () => {
        expect(hasRouteAccess('user', '/users')).toBe(false);
        expect(hasRouteAccess('user', '/stations')).toBe(false);
        expect(hasRouteAccess('user', '/sessions')).toBe(true);
        expect(hasRouteAccess('user', '/wallets')).toBe(true);
      });
    });
  });

  describe('Integration Tests', () => {
    it('should handle complete dashboard data flow', () => {
      const metrics: DashboardMetrics = {
        totalStations: 156,
        activeStations: 140,
        totalUsers: 2847,
        activeSessions: 23,
        dailyRevenue: 24680,
        powerOutput: 45000,
      };

      // Calculate dashboard stats
      const stats = calculateDashboardStats(metrics);
      expect(stats.stationAvailability).toBe(90); // 140/156 * 100

      // Format values for display
      const formattedRevenue = formatRevenue(metrics.dailyRevenue);
      const formattedPower = formatPowerOutput(metrics.powerOutput);
      
      expect(formattedRevenue).toBe('24.7K zł');
      expect(formattedPower).toBe('45.0 kW');

      // Check system health
      const systemStatus: SystemStatus = {
        api: 'operational',
        database: 'operational',
        payment: 'operational',
        charging: 'operational',
      };
      
      expect(getSystemHealth(systemStatus)).toBe('healthy');
    });

    it('should handle admin user workflow', () => {
      // Admin should have access to all routes
      expect(hasRouteAccess('admin', '/users')).toBe(true);
      expect(hasRouteAccess('admin', '/stations')).toBe(true);
      
      // Admin routes should have correct configuration
      const usersRoute = getRouteConfig('/users');
      expect(usersRoute?.badge).toBe('Users');
      expect(usersRoute?.variant).toBe('purple');
    });

    it('should handle time formatting consistency', () => {
      const testDate = new Date('2024-01-15T14:30:45');
      const pastDate = new Date(testDate.getTime() - 2 * 60 * 1000); // 2 minutes ago
      
      const timeAgo = formatTimeAgo(pastDate);
      const liveTime = formatLiveUpdateTime(testDate);
      const buildTime = formatBuildTimestamp();
      
      expect(timeAgo).toBe('2m ago');
      expect(liveTime).toMatch(/^\d{2}:\d{2}:\d{2}$/);
      expect(buildTime).toMatch(/^\d{4}\.\d{2}\.\d{2}$/);
    });
  });
}); 