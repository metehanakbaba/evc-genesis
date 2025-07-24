/**
 * 💳 Wallet Feature
 * 
 * Export all wallet related components, hooks, and utilities
 */

// Components
export { WalletManagementModal } from './components/WalletManagementModal';
export { WalletOverview } from './components/WalletOverview';
export { TransactionHistory } from './components/TransactionHistory';
export { PaymentMethods } from './components/PaymentMethods';
export { WalletSettings } from './components/WalletSettings';

// Hooks
export { useWallet } from './hooks/useWallet';

// Types
export type { 
  WalletData,
  Transaction,
  PaymentMethod,
  WalletManagementModalProps,
  WalletSettings as WalletSettingsType,
  WalletTab
} from './types/wallet.types';

// Data
export { 
  mockWalletData, 
  mockTransactions, 
  mockPaymentMethods 
} from './data/mockWallet'; 