/**
 * 💰 Wallet & Payment Business Logic
 * 
 * Transaction validation, payment calculations, PLN rules vs.
 * Apps'lerden taşınacak wallet business logic'i
 */

export type TransactionType = 'ADD_PLN_FUNDS' | 'CHARGING_PAYMENT' | 'REFUND' | 'TRANSFER';
export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

export interface TransactionBusinessRules {
  readonly minTopUpAmount: number;
  readonly maxTopUpAmount: number;
  readonly refundTimeLimit: number; // hours
  readonly minimumBalance: number;
}

/**
 * 🎨 Transaction Type Configuration Interface
 * For UI styling and display logic
 */
export interface TransactionTypeConfig {
  readonly color: string;
  readonly icon: string; // Icon name for UI components
  readonly text: string;
  readonly description: string;
}

/**
 * 🎯 Transaction Status Configuration Interface
 * For UI styling based on status
 */
export interface TransactionStatusConfig {
  readonly bgColor: string;
  readonly borderColor: string;
  readonly badgeColor: string;
  readonly textColor: string;
  readonly pulseColor: string;
}

/**
 * 💸 Transaction Amount Validation
 * Extracted from: apps/admin-web/src/features/wallets/pages/WalletsPage.tsx
 */
export const validateTransactionAmount = (
  type: TransactionType, 
  amount: number
): { isValid: boolean; error?: string } => {
  if (amount <= 0) {
    return { isValid: false, error: 'Amount must be greater than zero' };
  }
  
  if (type === 'ADD_PLN_FUNDS') {
    if (amount < 10) {
      return { isValid: false, error: 'Minimum top-up amount is 10 PLN' };
    }
    if (amount > 1000) {
      return { isValid: false, error: 'Maximum top-up amount is 1000 PLN' };
    }
  }
  
  return { isValid: true };
};

/**
 * 🎨 Transaction Type Configuration  
 * Extracted from: apps/admin-web/src/features/wallets/pages/WalletsPage.tsx (lines 350-380)
 * Revolutionary transaction type-based styling and display logic
 */
export const getTransactionTypeConfig = (type: TransactionType): TransactionTypeConfig => {
  const configs: Record<TransactionType, TransactionTypeConfig> = {
    ADD_PLN_FUNDS: {
      color: 'emerald',
      icon: 'ArrowDownTray',
      text: 'Top-up',
      description: 'PLN wallet funding'
    },
    CHARGING_PAYMENT: {
      color: 'teal', 
      icon: 'Bolt',
      text: 'Charging',
      description: 'EV charging payment'
    },
    REFUND: {
      color: 'amber',
      icon: 'ReceiptRefund', 
      text: 'Refund',
      description: 'Payment refund'
    },
    TRANSFER: {
      color: 'blue',
      icon: 'ArrowUp',
      text: 'Transfer', 
      description: 'Wallet transfer'
    },
  };
  
  return configs[type];
};

/**
 * 📊 Transaction Status Business Logic
 * Extracted from: apps/admin-web/src/features/wallets/pages/WalletsPage.tsx (lines 382-420)
 * Revolutionary status-based styling configuration
 */
export const getTransactionStatusConfig = (status: TransactionStatus): TransactionStatusConfig => {
  const configs: Record<TransactionStatus, TransactionStatusConfig> = {
    PENDING: {
      bgColor: 'bg-gradient-to-br from-amber-500/15 via-amber-400/8 to-transparent',
      borderColor: 'border-amber-400/25 hover:border-amber-300/40',
      badgeColor: 'bg-amber-500/10 border border-amber-500/20',
      textColor: 'text-amber-400',
      pulseColor: 'bg-amber-500',
    },
    COMPLETED: {
      bgColor: 'bg-gradient-to-br from-emerald-500/15 via-emerald-400/8 to-transparent',
      borderColor: 'border-emerald-400/25 hover:border-emerald-300/40', 
      badgeColor: 'bg-emerald-500/10 border border-emerald-500/20',
      textColor: 'text-emerald-400',
      pulseColor: 'bg-emerald-500',
    },
    FAILED: {
      bgColor: 'bg-gradient-to-br from-red-500/15 via-red-400/8 to-transparent',
      borderColor: 'border-red-400/25 hover:border-red-300/40',
      badgeColor: 'bg-red-500/10 border border-red-500/20', 
      textColor: 'text-red-400',
      pulseColor: 'bg-red-500',
    },
    CANCELLED: {
      bgColor: 'bg-gradient-to-br from-gray-500/15 via-gray-400/8 to-transparent',
      borderColor: 'border-gray-400/25 hover:border-gray-300/40',
      badgeColor: 'bg-gray-500/10 border border-gray-500/20',
      textColor: 'text-gray-400', 
      pulseColor: 'bg-gray-500',
    },
  };
  
  return configs[status];
};

/**
 * 🎨 Combined Transaction Configuration
 * Extracted from: apps/admin-web/src/features/wallets/pages/WalletsPage.tsx (lines 350-420)
 * Combines type and status configuration for complete styling
 */
export const getTransactionConfig = (
  type: TransactionType,
  status: TransactionStatus
) => {
  const typeConfig = getTransactionTypeConfig(type);
  const statusConfig = getTransactionStatusConfig(status);
  
  return {
    ...typeConfig,
    ...statusConfig,
  };
};

/**
 * ⏰ Time-based Business Rules
 * Extracted from: apps/admin-web/src/features/wallets/pages/WalletsPage.tsx (lines 450-465)
 * Enhanced date formatting with business logic for transaction display
 */
export const formatTransactionDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffHours < 48) return 'Yesterday';
  return date.toLocaleDateString();
};

/**
 * 🔍 Transaction Filtering Business Logic
 * Extracted from: apps/admin-web/src/features/wallets/pages/WalletsPage.tsx (lines 422-440)
 * Enhanced filtering with multiple criteria support
 */
export const filterTransactions = (
  transactions: any[],
  filters: {
    searchQuery?: string;
    typeFilter?: string;
    statusFilter?: string;
  }
) => {
  return transactions.filter((transaction) => {
    const matchesSearch = !filters.searchQuery || (
      transaction.description?.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      transaction.id?.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      transaction.amount?.formatted?.toLowerCase().includes(filters.searchQuery.toLowerCase())
    );

    const matchesType = !filters.typeFilter || 
      filters.typeFilter === 'all' || 
      transaction.type === filters.typeFilter;
      
    const matchesStatus = !filters.statusFilter || 
      filters.statusFilter === 'all' || 
      transaction.status === filters.statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });
};

/**
 * 💳 Payment Processing Business Rules
 * Business logic for determining payment capabilities
 */
export const canProcessPayment = (
  type: TransactionType,
  amount: number,
  currentBalance: number
): { canProcess: boolean; reason?: string } => {
  const validation = validateTransactionAmount(type, amount);
  if (!validation.isValid) {
    return { canProcess: false, reason: validation.error as string };
  }
  
  if (type === 'CHARGING_PAYMENT' && currentBalance < amount) {
    return { canProcess: false, reason: 'Insufficient balance for charging payment' };
  }
  
  return { canProcess: true };
};

/**
 * 🔄 Refund Eligibility Business Logic
 */
export const isRefundEligible = (
  transaction: any,
  hoursLimit: number = 24
): { eligible: boolean; reason?: string } => {
  if (transaction.type !== 'CHARGING_PAYMENT') {
    return { eligible: false, reason: 'Only charging payments are eligible for refunds' };
  }
  
  if (transaction.status !== 'COMPLETED') {
    return { eligible: false, reason: 'Only completed transactions can be refunded' };
  }
  
  const transactionDate = new Date(transaction.createdAt);
  const now = new Date();
  const hoursDiff = (now.getTime() - transactionDate.getTime()) / (1000 * 60 * 60);
  
  if (hoursDiff > hoursLimit) {
    return { eligible: false, reason: `Refund period of ${hoursLimit} hours has expired` };
  }
  
  return { eligible: true };
};

// Default configuration
export const DEFAULT_WALLET_RULES: TransactionBusinessRules = {
  minTopUpAmount: 10,
  maxTopUpAmount: 1000, 
  refundTimeLimit: 24,
  minimumBalance: 0,
};

// Factory function
export const createWalletBusinessLogic = (rules: Partial<TransactionBusinessRules> = {}) => {
  const config = { ...DEFAULT_WALLET_RULES, ...rules };
  
  return {
    validateTransactionAmount,
    getTransactionTypeConfig,
    getTransactionStatusConfig,
    getTransactionConfig,
    formatTransactionDate,
    filterTransactions,
    canProcessPayment,
    isRefundEligible,
    config,
  };
};

// Export wallet business logic utilities
export const walletBusinessUtils = {
  validateTransactionAmount,
  getTransactionTypeConfig,
  getTransactionStatusConfig,
  getTransactionConfig,
  formatTransactionDate,
  filterTransactions,
  canProcessPayment,
  isRefundEligible,
  DEFAULT_WALLET_RULES,
}; 