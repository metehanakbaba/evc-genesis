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

// Transaction Components
export { TransactionGrid } from './TransactionGrid';
export type { TransactionGridProps } from './TransactionGrid';

export { TransactionTable } from './TransactionTable';
export type { TransactionTableProps } from './TransactionTable';

export { TransactionFilterModal } from './TransactionFilterModal';
export type { TransactionFilterModalProps } from './TransactionFilterModal';

// Skeleton Components
export { 
  TransactionGridSkeleton, 
  TransactionTableSkeleton, 
  LoadMoreSkeleton, 
  EndOfListIndicator 
} from './TransactionSkeleton';

// Infinite Scroll Hooks
export { useInfiniteTransactions } from '../hooks/useInfiniteTransactions';
export { useIntersectionObserver, useInfiniteScrollTrigger } from '../hooks/useIntersectionObserver';

// Performance Hooks
export { useDebounce, useSearchDebounce } from '../hooks/useDebounce';

// Re-export commonly used types for convenience
export type { PLNTransaction } from '../types/wallet.types';

// Re-export transaction color utilities
export {
  getTransactionTypeConfig,
  getTransactionStatusConfig,
  getTransactionTypeLabel,
  getTransactionStatusLabel,
  getTransactionStyling,
  TRANSACTION_TYPES,
  TRANSACTION_STATUSES,
  type TransactionType,
  type TransactionStatus,
} from '../utils/transactionColorUtils'; 