/**
 * 💳 Wallet Components Index
 *
 * Centralized export for all wallet-related components.
 * Provides clean imports for reusable wallet components.
 *
 * @module WalletComponents
 * @version 1.0.0
 * @author EV Charging Team
 */

// Performance Hooks
export { useDebounce, useSearchDebounce } from '../hooks/useDebounce';
// Infinite Scroll Hooks
export { useInfiniteTransactions } from '../hooks/useInfiniteTransactions';
export {
  useInfiniteScrollTrigger,
  useIntersectionObserver,
} from '../hooks/useIntersectionObserver';
// Re-export commonly used types for convenience
export type { PLNTransaction } from '../types/wallet.types';
// Re-export transaction color utilities
export {
  getTransactionStatusConfig,
  getTransactionStatusLabel,
  getTransactionStyling,
  getTransactionTypeConfig,
  getTransactionTypeLabel,
  TRANSACTION_STATUSES,
  TRANSACTION_TYPES,
  type TransactionStatus,
  type TransactionType,
} from '../utils/transactionColorUtils';
export type { TransactionFilterModalProps } from './TransactionFilterModal';
export { TransactionFilterModal } from './TransactionFilterModal';
export type { TransactionGridProps } from './TransactionGrid';
// Transaction Components
export { TransactionGrid } from './TransactionGrid';
// Skeleton Components
export {
  EndOfListIndicator,
  LoadMoreSkeleton,
  TransactionGridSkeleton,
  TransactionTableSkeleton,
} from './TransactionSkeleton';
export type { TransactionTableProps } from './TransactionTable';
export { TransactionTable } from './TransactionTable';
