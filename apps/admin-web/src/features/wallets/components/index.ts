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
export { TransactionBulkActions } from "./transactions/TransactionBulkActions";
export { TransactionSearchSection }  from "./transactions/TransactionSearchSection";
export { TransactionStatsSection } from "./transactions/TransactionStatsSection";
export { TransactionsDataSection } from "./transactions/TransactionsDataSection"
export { TransactionsModal } from './transactions/TransactionsModal';
export { TransactionRefundModal } from "./transactions/TransactionRefundModal";

export { WalletAnalyticsModal } from './wallets/WalletAnalyticsModal';
export { WalletDetailsModal } from "./wallets/WalletDetailsModal";
export { WalletsBulkActions } from "./wallets/WalletsBulkActions";
export { WalletsDataSection } from "./wallets/WalletsDataSection";
export { WalletsSearchSection } from "./wallets/WalletsSearchSection";
export { WalletsStatsSection } from "./wallets/WalletsStatsSection";
export { WalletUpdateModal } from './wallets/WalletUpdateModal';
export { AdjustBalanceModal } from "./wallets/AdjustBalanceModal";