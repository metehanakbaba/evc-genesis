/**
 * 🎨 Transaction Color Utilities
 *
 * Centralized color configuration for transaction types and statuses.
 * Ensures consistent visual styling across all wallet components.
 *
 * @module TransactionColorUtils
 * @version 1.0.0
 * @author EV Charging Team
 */

/**
 * 🎨 Transaction Type Color Configuration
 * Maps transaction types to their complete visual styling
 */
export const getTransactionTypeConfig = (type: string) => {
  switch (type) {
    case 'ADD_PLN_FUNDS':
      return {
        // Grid card styles
        bgColor:
          'bg-gradient-to-br from-emerald-500/10 via-emerald-400/5 to-transparent',
        borderColor: 'border-emerald-400/25 hover:border-emerald-300/40',
        badgeColor: 'bg-emerald-500/10 border border-emerald-500/20',
        textColor: 'text-emerald-400',
        pulseColor: 'bg-emerald-500',
        shadowColor: 'shadow-emerald-500/20',
        // Filter options
        filterColor: 'emerald',
        label: 'Top-up',
      };
    case 'CHARGING_PAYMENT':
      return {
        bgColor:
          'bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-transparent',
        borderColor: 'border-blue-400/25 hover:border-blue-300/40',
        badgeColor: 'bg-blue-500/10 border border-blue-500/20',
        textColor: 'text-blue-400',
        pulseColor: 'bg-blue-500',
        shadowColor: 'shadow-blue-500/20',
        filterColor: 'blue',
        label: 'Payment',
      };
    case 'REFUND':
      return {
        bgColor:
          'bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-transparent',
        borderColor: 'border-amber-400/25 hover:border-amber-300/40',
        badgeColor: 'bg-amber-500/10 border border-amber-500/20',
        textColor: 'text-amber-400',
        pulseColor: 'bg-amber-500',
        shadowColor: 'shadow-amber-500/20',
        filterColor: 'amber',
        label: 'Refund',
      };
    case 'TRANSFER':
      return {
        bgColor:
          'bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-transparent',
        borderColor: 'border-purple-400/25 hover:border-purple-300/40',
        badgeColor: 'bg-purple-500/10 border border-purple-500/20',
        textColor: 'text-purple-400',
        pulseColor: 'bg-purple-500',
        shadowColor: 'shadow-purple-500/20',
        filterColor: 'purple',
        label: 'Transfer',
      };
    default:
      return {
        bgColor:
          'bg-gradient-to-br from-gray-500/10 via-gray-400/5 to-transparent',
        borderColor: 'border-gray-400/25 hover:border-gray-300/40',
        badgeColor: 'bg-gray-500/10 border border-gray-500/20',
        textColor: 'text-gray-400',
        pulseColor: 'bg-gray-500',
        shadowColor: 'shadow-gray-500/20',
        filterColor: 'gray',
        label: 'Unknown',
      };
  }
};

/**
 * 🎨 Transaction Status Color Configuration
 * Maps transaction statuses to their visual styling
 */
export const getTransactionStatusConfig = (status: string) => {
  switch (status) {
    case 'COMPLETED':
      return {
        badgeColor: 'bg-emerald-500/10 border border-emerald-500/20',
        textColor: 'text-emerald-400',
        filterColor: 'emerald',
        label: 'Completed',
      };
    case 'PENDING':
      return {
        badgeColor: 'bg-amber-500/10 border border-amber-500/20',
        textColor: 'text-amber-400',
        filterColor: 'amber',
        label: 'Pending',
      };
    case 'FAILED':
      return {
        badgeColor: 'bg-red-600/15 border border-red-600/25',
        textColor: 'text-red-400',
        filterColor: 'red',
        label: 'Failed',
      };
    case 'CANCELLED':
      return {
        badgeColor: 'bg-red-500/10 border border-red-500/20',
        textColor: 'text-red-300',
        filterColor: 'red',
        label: 'Cancelled',
      };
    default:
      return {
        badgeColor: 'bg-gray-500/10 border border-gray-500/20',
        textColor: 'text-gray-400',
        filterColor: 'gray',
        label: 'Unknown',
      };
  }
};

/**
 * 🎯 Get Transaction Type Label
 * Returns human-readable label for transaction type
 */
export const getTransactionTypeLabel = (type: string): string => {
  return getTransactionTypeConfig(type).label;
};

/**
 * 🎯 Get Transaction Status Label
 * Returns human-readable label for transaction status
 */
export const getTransactionStatusLabel = (status: string): string => {
  return getTransactionStatusConfig(status).label;
};

/**
 * 🎨 Get Combined Transaction Styling
 * Returns both type and status configurations for easy access
 */
export const getTransactionStyling = (type: string, status: string) => {
  return {
    type: getTransactionTypeConfig(type),
    status: getTransactionStatusConfig(status),
  };
};

/**
 * 🔄 Transaction Types Array
 * For generating filter options and form selects
 */
export const TRANSACTION_TYPES = [
  'ADD_PLN_FUNDS',
  'CHARGING_PAYMENT',
  'REFUND',
  'TRANSFER',
] as const;

/**
 * 📊 Transaction Statuses Array
 * For generating filter options and form selects
 */
export const TRANSACTION_STATUSES = [
  'COMPLETED',
  'PENDING',
  'FAILED',
  'CANCELLED',
] as const;

export type TransactionType = (typeof TRANSACTION_TYPES)[number];
export type TransactionStatus = (typeof TRANSACTION_STATUSES)[number];
