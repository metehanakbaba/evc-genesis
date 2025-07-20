'use client';

import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  ArrowUpIcon,
  BoltIcon,
  CheckCircleIcon,
  ClockIcon,
  EyeIcon,
  ReceiptRefundIcon,
  WalletIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@ui/forms';
import type React from 'react';
import type { PLNTransaction } from '../types/wallet.types';
// ✅ Import shared business logic
import { formatTransactionDate } from '@evc/shared-business-logic';
// ✅ Import centralized color utilities
import { 
  getTransactionTypeConfig, 
  getTransactionStatusConfig,
  getTransactionTypeLabel 
} from '../utils/transactionColorUtils';
// ✅ Import infinite scroll hooks
import { useInfiniteScrollTrigger } from '../hooks/useIntersectionObserver';
// ✅ Import skeleton components
import { LoadMoreSkeleton, EndOfListIndicator } from './TransactionSkeleton';

// Type for icon components
type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

/**
 * 🎯 Transaction Grid Props
 */
export interface TransactionGridProps {
  readonly transactions: PLNTransaction[];
  readonly onViewDetails?: (transaction: PLNTransaction) => void;
  readonly onRetryTransaction?: (transaction: PLNTransaction) => void;
  readonly showRetryButton?: boolean;
  readonly className?: string;
  // ✅ Infinite scroll props
  readonly onLoadMore?: () => void;
  readonly isLoadingMore?: boolean;
  readonly hasNextPage?: boolean;
  readonly total?: number;
}

/**
 * 🚀 Revolutionary Transaction Grid Component
 * Reusable grid component for displaying PLN transactions
 */
export const TransactionGrid: React.FC<TransactionGridProps> = ({
  transactions,
  onViewDetails,
  onRetryTransaction,
  showRetryButton = true,
  className = "",
  onLoadMore,
  isLoadingMore = false,
  hasNextPage = false,
  total = 0,
}) => {
  // ✅ Infinite scroll trigger with throttling
  const loadMoreRef = useInfiniteScrollTrigger(
    () => {
      if (onLoadMore && hasNextPage && !isLoadingMore) {
        onLoadMore();
      }
    },
    {
      enabled: hasNextPage && !isLoadingMore,
      rootMargin: '100px',
      throttleMs: 500, // ✅ Prevent rapid successive calls
    }
  );
  // Icon mapping for transaction types
  const getTransactionIcon = (type: string): IconComponent => {
    switch (type) {
      case 'ADD_PLN_FUNDS':
        return ArrowDownTrayIcon;
      case 'CHARGING_PAYMENT':
        return BoltIcon;
      case 'REFUND':
        return ReceiptRefundIcon;
      case 'TRANSFER':
        return ArrowUpIcon;
      default:
        return WalletIcon;
    }
  };

  return (
    <div className={className}>
      {/* Transaction Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {transactions.map((transaction, index) => {
        // ✅ Use color configuration based on transaction type and status
        const typeConfig = getTransactionTypeConfig(transaction.type);
        const statusConfig = getTransactionStatusConfig(transaction.status);
        const TransactionIcon = getTransactionIcon(transaction.type);
        const typeLabel = getTransactionTypeLabel(transaction.type);
        const isPending = transaction.status === 'PENDING';

        return (
          <div
            key={transaction.id}
            className="group relative"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Revolutionary Floating Transaction Card */}
            <div
              className={`relative p-6 ${typeConfig.bgColor} border ${typeConfig.borderColor} rounded-2xl backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer hover:${typeConfig.shadowColor}`}
            >
              {/* Pending Status Pulse */}
              {isPending && (
                <div
                  className={`absolute -top-2 -right-2 w-4 h-4 ${typeConfig.pulseColor} rounded-full animate-ping opacity-75`}
                ></div>
              )}

              {/* Floating Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

              {/* Transaction Header */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl ${typeConfig.badgeColor} flex items-center justify-center`}
                    >
                      <TransactionIcon className={`w-6 h-6 ${typeConfig.textColor}`} />
                    </div>
                    <div>
                      <div
                        className={`text-sm font-medium ${typeConfig.textColor} mb-1`}
                      >
                        {typeLabel}
                      </div>
                      <div className="text-white font-semibold text-lg">
                        {transaction.amount.formatted}
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div
                    className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusConfig.badgeColor}`}
                  >
                    {transaction.status === 'COMPLETED' && (
                      <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                    )}
                    {transaction.status === 'PENDING' && (
                      <ClockIcon className="w-4 h-4 text-amber-400" />
                    )}
                    {transaction.status === 'FAILED' && (
                      <XCircleIcon className="w-4 h-4 text-red-400" />
                    )}
                    <span
                      className={`text-xs font-medium ${statusConfig.textColor}`}
                    >
                      {transaction.status}
                    </span>
                  </div>
                </div>

                {/* Transaction Description */}
                <div className="mb-4">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {transaction.description}
                  </p>
                </div>

                {/* Transaction Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Transaction ID</span>
                    <span className="text-gray-300 font-mono">
                      {transaction.id.slice(-8)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Date</span>
                    <span className="text-gray-300">
                      {/* ✅ Use shared business logic for date formatting */}
                      {formatTransactionDate(transaction.createdAt)}
                    </span>
                  </div>
                  {transaction.stripePaymentIntentId && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Stripe ID</span>
                      <span className="text-gray-300 font-mono text-xs">
                        {transaction.stripePaymentIntentId.slice(-8)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Revolutionary Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onViewDetails?.(transaction)}
                    className="
                      flex-1 relative overflow-hidden group/view
                      bg-gradient-to-r from-gray-700/40 via-gray-600/30 to-gray-700/40
                      hover:from-gray-600/50 hover:via-gray-500/40 hover:to-gray-600/50
                      text-gray-300 hover:text-white
                      border border-gray-600/30 hover:border-gray-500/50
                      shadow-md hover:shadow-lg
                      transition-all duration-300 ease-out
                      hover:scale-[1.02] active:scale-[0.98]
                      flex items-center justify-center gap-2
                      before:absolute before:inset-0 before:bg-gradient-to-r 
                      before:from-transparent before:via-white/10 before:to-transparent
                      before:translate-x-[-100%] hover:before:translate-x-[100%]
                      before:transition-transform before:duration-500
                    "
                  >
                    <div className="flex items-center gap-2 relative z-10">
                      <EyeIcon className="w-4 h-4 group-hover/view:scale-110 transition-transform duration-300" />
                      <span className="font-medium">View Details</span>
                    </div>
                  </Button>
                  {showRetryButton &&
                    transaction.type === 'CHARGING_PAYMENT' &&
                    transaction.status === 'FAILED' && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onRetryTransaction?.(transaction)}
                        className="
                          relative overflow-hidden p-3 group/retry
                          bg-gradient-to-r from-teal-500/15 via-teal-400/10 to-teal-500/15
                          hover:from-teal-500/25 hover:via-teal-400/20 hover:to-teal-500/25
                          text-teal-400 hover:text-teal-300
                          border border-teal-500/30 hover:border-teal-400/50
                          shadow-sm shadow-teal-500/10 hover:shadow-lg hover:shadow-teal-500/20
                          transition-all duration-300 ease-out
                          hover:scale-110 active:scale-95
                          flex items-center
                        "
                      >
                        <ArrowPathIcon className="w-4 h-4 group-hover/retry:rotate-180 transition-transform duration-500" />
                      </Button>
                    )}
                </div>
              </div>
            </div>
          </div>
          );
        })}
      </div>

      {/* ✅ Infinite Scroll Loading Indicators */}
      {isLoadingMore && (
        <div className="mt-8">
          <LoadMoreSkeleton />
        </div>
      )}

      {/* ✅ Load More Trigger (invisible) */}
      {hasNextPage && !isLoadingMore && (
        <div 
          ref={loadMoreRef as React.RefObject<HTMLDivElement>}
          className="h-10 flex items-center justify-center"
        >
          {/* Invisible trigger element */}
        </div>
      )}

      {/* ✅ End of List Indicator */}
      {!hasNextPage && transactions.length > 0 && total > 0 && (
        <div className="mt-8">
          <EndOfListIndicator total={total} />
        </div>
      )}
    </div>
  );
};

export default TransactionGrid; 