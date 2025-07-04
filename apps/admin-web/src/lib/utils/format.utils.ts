/**
 * Format currency with locale
 */
export const formatCurrency = (
  amount: number,
  currency = 'PLN',
  locale = 'pl-PL',
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Format energy (kWh) with units
 */
export const formatEnergy = (kwh: number): string => {
  if (kwh < 1) {
    return `${Math.round(kwh * 1000)} Wh`;
  }
  if (kwh >= 1000) {
    return `${(kwh / 1000).toFixed(1)} MWh`;
  }
  return `${kwh.toFixed(1)} kWh`;
};

/**
 * Format power (kW) with units
 */
export const formatPower = (kw: number): string => {
  if (kw < 1) {
    return `${Math.round(kw * 1000)} W`;
  }
  if (kw >= 1000) {
    return `${(kw / 1000).toFixed(1)} MW`;
  }
  return `${kw} kW`;
};

/**
 * Format percentage
 */
export const formatPercentage = (value: number, decimals = 0): string => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Format phone number for display
 */
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');

  // Poland phone number format for example +48 12 345 67 89
  if (cleaned.startsWith('48') && cleaned.length === 12) {
    return `+48 ${cleaned.slice(2, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7, 9)} ${cleaned.slice(9)}`;
  }

  // Other countries phone number format
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8)}`;
  }

  return phone;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength)}...`;
};
