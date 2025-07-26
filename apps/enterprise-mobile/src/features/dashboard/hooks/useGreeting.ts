/**
 * 🏠 useGreeting Hook
 * 
 * Hook for time-based greeting functionality
 */

import { useMemo } from 'react';
import { GreetingData } from '../types';

export function useGreeting(): GreetingData {
  return useMemo(() => {
    const hour = new Date().getHours();
    const isEvening = hour >= 18 || hour < 6;
    const isMorning = hour >= 6 && hour < 12;
    const isAfternoon = hour >= 12 && hour < 18;
    
    if (isEvening) {
      return {
        message: "Good Evening",
        icon: "moon",
        colors: ['#6366F1', '#4F46E5', '#3730A3'] as const,
        shadowColor: '#6366F1',
        isEvening: true,
        isMorning: false,
        isAfternoon: false,
      };
    }
    
    if (isMorning) {
      return {
        message: "Good Morning",
        icon: "sunny",
        colors: ['#F59E0B', '#D97706', '#92400E'] as const,
        shadowColor: '#F59E0B',
        isEvening: false,
        isMorning: true,
        isAfternoon: false,
      };
    }
    
    return {
      message: "Good Afternoon",
      icon: "partly-sunny",
      colors: ['#10B981', '#059669', '#047857'] as const,
      shadowColor: '#10B981',
      isEvening: false,
      isMorning: false,
      isAfternoon: true,
    };
  }, []);
} 