'use client';

// ✅ Import shared business logic
import { formatTransactionDate } from '@evc/shared-business-logic';
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
// ✅ Import infinite scroll hooks
import { useInfiniteScrollTrigger } from '../hooks/useIntersectionObserver';
import type { PLNTransaction } from '../types/wallet.types';
// ✅ Import centralized color utilities
import {
  getTransactionStatusConfig,
  getTransactionTypeConfig,
  getTransactionTypeLabel,
} from '../utils/transactionColorUtils';
// ✅ Import skeleton components
import { EndOfListIndicator, LoadMoreSkeleton } from './TransactionSkeleton';

// Type for icon components
type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

/**
 * 🎯 Transaction Table Props
 */
export interface TransactionTableProps {
  readonly transactions: PLNTransaction[];
  readonly onViewDetails?: (transaction: PLNTransaction) => void;
  readonly onRetryTransaction?: (transaction: PLNTransaction) => void;
  readonly showRetryButton?: boolean;
  readonly className?: string;
  readonly columns?: {
    type?: boolean;
    amount?: boolean;
    status?: boolean;
    description?: boolean;
    date?: boolean;
    actions?: boolean;
  };
  // ✅ Infinite scroll props
  readonly onLoadMore?: () => void;
  readonly isLoadingMore?: boolean;
  readonly hasNextPage?: boolean;
  readonly total?: number;
}

/**
 * 🚀 Revolutionary Transaction Table Component
 * Reusable table component for displaying PLN transactions
 */
export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  onViewDetails,
  onRetryTransaction,
  showRetryButton = true,
  className = '',
  columns = {
    type: true,
    amount: true,
    status: true,
    description: true,
    date: true,
    actions: true,
  },
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
    },
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
      {/* Transaction Table */}
      <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl overflow-hidden backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/30 border-b border-gray-600/30">
              <tr>
                {columns.type && (
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                    Type
                  </th>
                )}
                {columns.amount && (
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                    Amount
                  </th>
                )}
                {columns.status && (
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                    Status
                  </th>
                )}
                {columns.description && (
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                    Description
                  </th>
                )}
                {columns.date && (
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                    Date
                  </th>
                )}
                {columns.actions && (
                  <th className="text-right py-4 px-6 text-sm font-medium text-gray-300">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/30">
              {transactions.map((transaction) => {
                // ✅ Use color configuration based on transaction type and status
                const typeConfig = getTransactionTypeConfig(transaction.type);
                const statusConfig = getTransactionStatusConfig(
                  transaction.status,
                );
                const TransactionIcon = getTransactionIcon(transaction.type);
                const typeLabel = getTransactionTypeLabel(transaction.type);

                return (
                  <tr
                    key={transaction.id}
                    className="hover:bg-gray-700/20 transition-colors group"
                  >
                    {columns.type && (
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg ${typeConfig.badgeColor} flex items-center justify-center`}
                          >
                            <TransactionIcon
                              className={`w-4 h-4 ${typeConfig.textColor}`}
                            />
                          </div>
                          <span
                            className={`text-sm font-medium ${typeConfig.textColor}`}
                          >
                            {typeLabel}
                          </span>
                        </div>
                      </td>
                    )}

                    {columns.amount && (
                      <td className="py-4 px-6">
                        <span className="text-white font-semibold">
                          {transaction.amount.formatted}
                        </span>
                      </td>
                    )}

                    {columns.status && (
                      <td className="py-4 px-6">
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${statusConfig.badgeColor}`}
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
                      </td>
                    )}

                    {columns.description && (
                      <td className="py-4 px-6">
                        <div className="max-w-xs">
                          <p className="text-gray-300 text-sm truncate">
                            {transaction.description}
                          </p>
                          <p className="text-gray-500 text-xs font-mono">
                            ID: {transaction.id.slice(-8)}
                          </p>
                        </div>
                      </td>
                    )}

                    {columns.date && (
                      <td className="py-4 px-6">
                        <span className="text-gray-300 text-sm">
                          {/* ✅ Use shared business logic for date formatting */}
                          {formatTransactionDate(transaction.createdAt)}
                        </span>
                      </td>
                    )}

                    {columns.actions && (
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 justify-end opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onViewDetails?.(transaction)}
                            className="
                            relative overflow-hidden p-2 group/action
                            bg-gradient-to-r from-gray-700/40 via-gray-600/30 to-gray-700/40
                            hover:from-gray-600/50 hover:via-gray-500/40 hover:to-gray-600/50
                            text-gray-300 hover:text-white
                            border border-gray-600/30 hover:border-gray-500/50
                            transition-all duration-300 ease-out
                            hover:scale-110 active:scale-95
                            flex items-center
                          "
                          >
                            <EyeIcon className="w-4 h-4 group-hover/action:scale-110 transition-transform duration-300" />
                          </Button>
                          {showRetryButton &&
                            transaction.type === 'CHARGING_PAYMENT' &&
                            transaction.status === 'FAILED' && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() =>
                                  onRetryTransaction?.(transaction)
                                }
                                className="
                                relative overflow-hidden p-2 group/retry
                                bg-gradient-to-r from-teal-500/15 via-teal-400/10 to-teal-500/15
                                hover:from-teal-500/25 hover:via-teal-400/20 hover:to-teal-500/25
                                text-teal-400 hover:text-teal-300
                                border border-teal-500/30 hover:border-teal-400/50
                                shadow-sm shadow-teal-500/10 hover:shadow-md hover:shadow-teal-500/20
                                transition-all duration-300 ease-out
                                hover:scale-110 active:scale-95
                                flex items-center
                              "
                              >
                                <ArrowPathIcon className="w-4 h-4 group-hover/retry:rotate-180 transition-transform duration-500" />
                              </Button>
                            )}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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

export default TransactionTable;
