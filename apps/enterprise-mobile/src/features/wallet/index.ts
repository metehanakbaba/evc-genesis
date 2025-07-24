/**
 * 💳 Wallet Feature Exports
 * 
 * Clean architecture exports for Wallet functionality
 */

// Main Components
export { WalletScreen } from './screens/WalletScreen';

// Sub Components
export { WalletOverview } from './components/WalletOverview';
export { TransactionHistory } from './components/TransactionHistory';
export { PaymentMethods } from './components/PaymentMethods';
export { WalletSettings } from './components/WalletSettings';

// Hooks
export { useWallet } from './hooks/useWallet';

// Types
export type { 
  WalletManagementModalProps,
  WalletTab,
  WalletData,
  Transaction,
  PaymentMethod,
  WalletSettings as WalletSettingsType
} from './types/wallet.types';

// Data
export { 
  mockWalletData, 
  mockTransactions, 
  mockPaymentMethods 
} from './data/mockWallet'; 