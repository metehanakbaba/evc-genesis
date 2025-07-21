/**
 * ⏱️ Session Debounce Hook
 * 
 * Custom hook for debouncing values to improve performance.
 * Particularly useful for search inputs and filter changes.
 * 
 * @module useSessionDebounce
 * @version 1.0.0
 * @author EV Charging Team
 */

import { useState, useEffect } from 'react';

/**
 * 🚀 useDebounce Hook
 * Debounces a value with specified delay
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up a timer to update the debounced value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to clear the timeout if value changes before delay
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * 🔍 useSearchDebounce Hook
 * Specialized debounce for search queries with trimming
 */
export const useSearchDebounce = (searchQuery: string, delay: number = 300): string => {
  const [debouncedQuery, setDebouncedQuery] = useState<string>(searchQuery.trim());

  useEffect(() => {
    const trimmedQuery = searchQuery.trim();
    
    const handler = setTimeout(() => {
      setDebouncedQuery(trimmedQuery);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, delay]);

  return debouncedQuery;
}; 