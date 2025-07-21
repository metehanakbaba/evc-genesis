/**
 * 📊 Session Statistics Hook
 *
 * Custom hook for session statistics and metrics.
 * Provides live session data and performance metrics.
 *
 * @module useSessionStatistics
 * @version 1.0.0
 * @author EV Charging Team
 */

import { useMemo } from 'react';

export interface SessionStatisticsResult {
  activeSessions: {
    count: number;
    formatted: string;
  };
  totalPowerOutput: {
    value: number;
    formatted: string;
  };
  completedToday: {
    count: number;
    formatted: string;
  };
  revenueFlow: {
    amount: number;
    formatted: string;
  };
}

/**
 * 🚀 useSessionStatistics Hook
 * Provides session statistics with formatted values
 */
export const useSessionStatistics = (): SessionStatisticsResult => {
  return useMemo(() => {
    // Mock data - in real implementation, this would come from API
    const activeSessions = 23;
    const totalPowerMW = 3.2;
    const completedToday = 187;
    const revenueAmount = 8524;

    return {
      activeSessions: {
        count: activeSessions,
        formatted: activeSessions.toString(),
      },
      totalPowerOutput: {
        value: totalPowerMW,
        formatted: `${totalPowerMW} MW`,
      },
      completedToday: {
        count: completedToday,
        formatted: completedToday.toString(),
      },
      revenueFlow: {
        amount: revenueAmount,
        formatted: `${revenueAmount.toLocaleString('pl-PL')} zł`,
      },
    };
  }, []);
};
