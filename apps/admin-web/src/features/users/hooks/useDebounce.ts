/**
 * 🔍 Search Debounce Hook
 *
 * Debounces search input to prevent excessive API calls
 * Following WalletsPage pattern for consistency.
 */

import { useEffect, useState } from 'react';

/**
 * Custom hook to debounce search queries
 * Prevents excessive API calls during rapid typing
 */
export const useSearchDebounce = (
  value: string,
  delay: number = 300,
): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
