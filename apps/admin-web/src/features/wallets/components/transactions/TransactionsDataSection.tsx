'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { GenericDataPane } from '@/shared/ui/components/DataDisplay/GeneticDataPane';
import { Input, Textarea, useToast, Checkbox } from '@/shared/ui';
import { EmptyState } from '@/shared/ui';
import { RangeOption } from '@/shared/ui/molecules/Ranges/RangeSelector';
import { Transaction, TransactionType, TransactionStatus, TransactionRefundData, RefundRequest } from '../../../../../../../packages/shared/api/src/lib/types/wallet.types';
import { ClockIcon, CurrencyDollarIcon, DocumentDuplicateIcon,ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import { Button } from '@/shared/ui';
import { useTransactionActions } from '../../hooks/useTransactions';

interface TransactionsDataSectionProps {
  transactions: Transaction[];
  hasNextPage?: boolean;
  userId?: string;
  onSelectTransaction: (transaction: Transaction) => void;
  selectedTransaction: Transaction | null;
  scrollable?: boolean;
  scrollHeight?: string;
  error?: Error | null;
  isLoading?: boolean;
  onRefresh?: () => void;
  onLoadMore?: () => void;
  onClearFilters?: () => void;
}

interface FilterParams {
  type?: TransactionType | 'all';
  status?: TransactionStatus | 'all';
  userId?: string;
  search?: string;
  minAmount?: number;
  maxAmount?: number;
  fromDate?: string;
  toDate?: string;
}

const amountRangeOptions: RangeOption[] = [
  { id: 'upTo100', label: '> 100', from: undefined, to: 100 },
  { id: '100to500', label: '100 to 500', from: 100, to: 500 },
  { id: 'above500', label: '< 500', from: 500, to: undefined },
];

export const TransactionsDataSection: React.FC<TransactionsDataSectionProps> = ({
  transactions,
  userId,
  onSelectTransaction,
  selectedTransaction,
  scrollable = false,
  scrollHeight = '50%',
}) => {

  const [filterParams, setFilterParams] = useState<FilterParams>({
    userId,
    type: 'all',
    status: 'all',
    search: '',
    minAmount: undefined,
    maxAmount: undefined,
    fromDate: undefined,
    toDate: undefined,
  });

  const [refundForm, setRefundForm] = useState<TransactionRefundData>({
    amount: 0,
    reason: '',
    notifyUser: false,
  });

  const { showToast } = useToast();
  const { refundTransaction } = useTransactionActions();

  const isRefundValid = refundForm.amount !== 0 && refundForm.reason.trim().length >= 5;

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      if (filterParams.userId && tx.userId !== filterParams.userId) return false;
      if (filterParams.type && filterParams.type !== 'all' && tx.type !== filterParams.type) return false;
      if (filterParams.status && filterParams.status !== 'all' && tx.status !== filterParams.status) return false;
      if (filterParams.search && !tx.id.includes(filterParams.search)) return false;
      if (filterParams.minAmount !== undefined && tx.amount.value < filterParams.minAmount) return false;
      if (filterParams.maxAmount !== undefined && tx.amount.value > filterParams.maxAmount) return false;
      if (filterParams.fromDate && tx.createdAt < filterParams.fromDate) return false;
      if (filterParams.toDate && tx.createdAt > filterParams.toDate) return false;
      return true;
    });
  }, [transactions, filterParams]);

  const renderListItem = (tx: Transaction) => (
    <div className="w-full px-3 py-2 flex items-center justify-between">
      <span className="font-mono text-sm text-indigo-300 break-all">{tx.id}</span>
      <Button
        className="text-gray-400 hover:text-indigo-300 p-1"
        onClick={() => {
          navigator.clipboard.writeText(tx.id);
          showToast({ title: 'Copied!', type: 'info', duration: 1500 });
        }}
      >
        <DocumentDuplicateIcon className="h-4 w-4" />
      </Button>
    </div>
  );

  const renderDetails = (tx: Transaction) => (

      <div className="rounded-xl px-4 py-3 bg-gray-900/50 border border-gray-700 space-y-3 text-sm overflow-auto">
        <div>
          <div className="text-gray-400 mb-1 text-xs">Transaction ID</div>
          <div className="text-white font-mono text-sm">{tx.id}</div>
        </div>
        <hr className="border-gray-700" />

        <div>
          <div className="text-gray-400 mb-1 text-xs">User ID</div>
          <div className="text-white font-mono text-sm">{tx.userId}</div>
        </div>
        <hr className="border-gray-700" />

        <div className="flex gap-4">
          <div>
            <div className="text-gray-400 mb-1 text-xs">Type</div>
            <div className="text-indigo-400 font-semibold text-sm">{tx.type}</div>
          </div>

          <div>
            <div className="text-gray-400 mb-1 text-xs">Status</div>
            <div className={
              tx.status === 'COMPLETED'
                ? 'text-emerald-400 text-sm'
                : 'text-amber-400 text-sm'
            }>
              {tx.status}
            </div>
          </div>
        </div>

      <div>
        <div className="text-gray-400 mb-1">Amount</div>
        <div className="text-white text-base font-semibold">
          {tx.amount.value.toFixed(2)} {tx.amount.currency}
        </div>
      </div>
      <hr className="border-gray-700" />

      <div className="flex gap-6">
        <div>
          <div className="text-gray-400 mb-1">Created Date</div>
          <div className="text-gray-300">{new Date(tx.createdAt).toLocaleDateString()}</div>
        </div>
        <div>
          <div className="text-gray-400 mb-1">Created Time</div>
          <div className="text-gray-300">{new Date(tx.createdAt).toLocaleTimeString()}</div>
        </div>
      </div>
    </div>
  );

  const handleRefund = async () => {
    if (!selectedTransaction || !isRefundValid) return;

    try {
      await refundTransaction(selectedTransaction.id, refundForm);
      
      showToast({
        type: 'success',
        title: 'Refund processed',
        message: 'The refund was successfully processed.',
        duration: 4000,
      });

      // Reset form
      setRefundForm({ amount: 0, reason: '', notifyUser: false });
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Refund failed',
        message: 'Failed to process refund. Please try again.',
        duration: 4000,
      });
    }
  };

  const renderAction = (tx: Transaction) => (
    <div className="space-y-4 p-4">
      <h3 className="text-lg font-semibold text-white mb-4">Refund Transaction</h3>
      <div className="bg-gray-800/50 p-4 rounded-lg mb-4">
        <div className="text-sm text-gray-400">Transaction ID</div>
        <div className="text-white font-mono">{tx.id}</div>
        <div className="text-sm text-gray-400 mt-2">Original Amount</div>
        <div className="text-white">{tx.amount.value.toFixed(2)} {tx.amount.currency}</div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Refund Amount</label>
        <Input
          type="number"
          placeholder="Enter refund amount"
          value={refundForm.amount.toString()}
          onChange={(e) => setRefundForm((prev) => ({ ...prev, amount: Number(e.target.value) }))}
        />
        <div className="text-xs text-gray-400 mt-1">Use negative values for deductions</div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Reason</label>
        <Textarea
          placeholder="Enter reason for refund..."
          value={refundForm.reason}
          onChange={(e) => setRefundForm((prev) => ({ ...prev, reason: e.target.value }))}
          rows={3}
        />
        <div className="text-xs text-gray-400 mt-1">Minimum 5 characters required</div>
      </div>
      
      <div>
        <Checkbox
          checked={refundForm.notifyUser}
          onChange={(checked) => setRefundForm((prev) => ({ ...prev, notifyUser: checked }))}
          label="Notify User"
          description="Send email notification to user about the refund"
        />
      </div>
      
      <div className="flex justify-end gap-2 pt-4 border-t border-gray-700">
        <Button 
          onClick={handleRefund} 
          disabled={!isRefundValid}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-xl transition-colors duration-200"
        >
          Process Refund
        </Button>
      </div>
    </div>
  );

  return (
    <GenericDataPane
      items={filteredTransactions}
      selectedItem={selectedTransaction}
      onSelectItem={onSelectTransaction}
      renderListItem={renderListItem}
      renderDetails={renderDetails}
      renderAction={renderAction}
      actions={[{
        id: 'refund',
        label: 'Request refund',
        onClick: () => {},
        variant: 'outline',
        size: 'md',
        className: "bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl transition-colors duration-200",
        opensActionPane: true,
      }]}
      emptyState={
        <EmptyState
          icon={ExclamationTriangleIcon}
          title="No transactions"
          description="Here are the details of transaction"
          variant="emerald"
        />
      }
      size="full"
      listWidthRatio={0.4}
      listPosition="left"
      scrollable={true}
      scrollHeight={scrollHeight}
    />
  );
};
