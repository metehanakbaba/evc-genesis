/**
 * Format date to localized string
 */
export const formatDate = (
  date: string | Date,
  options?: Intl.DateTimeFormatOptions,
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('tr-TR', options);
};

/**
 * Format date and time to localized string
 */
export const formatDateTime = (
  date: string | Date,
  options?: Intl.DateTimeFormatOptions,
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    ...options,
  };
  return dateObj.toLocaleString('tr-TR', defaultOptions);
};

/**
 * Get time difference in seconds
 */
const getTimeDiffInSeconds = (date: Date): number => {
  const now = new Date();
  return Math.floor((now.getTime() - date.getTime()) / 1000);
};

/**
 * Format relative time based on time units
 */
const formatRelativeTime = (value: number, unit: string): string => {
  return `${value} ${unit}${value > 1 ? 's' : ''} ago`;
};

/**
 * Get relative time string (e.g., "2 hours ago")
 */
export const getRelativeTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const seconds = getTimeDiffInSeconds(dateObj);

  const timeUnits = [
    { limit: 60, divisor: 1, unit: 'second' },
    { limit: 3600, divisor: 60, unit: 'minute' },
    { limit: 86400, divisor: 3600, unit: 'hour' },
    { limit: 2592000, divisor: 86400, unit: 'day' },
  ];

  if (seconds < 60) {
    return 'just now';
  }

  for (const { limit, divisor, unit } of timeUnits) {
    if (seconds < limit) {
      const value = Math.floor(seconds / divisor);
      return formatRelativeTime(value, unit);
    }
  }

  return formatDate(dateObj);
};

/**
 * Format duration in minutes to human readable string
 */
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  }

  return `${hours}h ${remainingMinutes}m`;
};
