'use client';

import {
  ArrowDownTrayIcon,
  ArrowUpIcon,
  BoltIcon,
  CheckCircleIcon,
  ClockIcon,
  ReceiptRefundIcon,
  ViewColumnsIcon,
  WalletIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Modal } from '@ui/display';
import { Button } from '@ui/forms';
import type React from 'react';

// Type for icon components
type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

/**
 * 🎯 Filter Option Interface
 */
interface FilterOption {
  readonly id: string;
  readonly label: string;
  readonly icon: IconComponent;
  readonly color: string;
}

/**
 * 🎯 Transaction Filter Modal Props
 */
export interface TransactionFilterModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly typeFilter: string;
  readonly statusFilter: string;
  readonly onTypeChange: (value: string) => void;
  readonly onStatusChange: (value: string) => void;
  readonly onClearFilters: () => void;
  readonly customTypeOptions?: FilterOption[];
  readonly customStatusOptions?: FilterOption[];
}

/**
 * 🚀 Revolutionary Transaction Filter Modal Component
 * Reusable filter modal for transaction filtering
 */
export const TransactionFilterModal: React.FC<TransactionFilterModalProps> = ({
  isOpen,
  onClose,
  typeFilter,
  statusFilter,
  onTypeChange,
  onStatusChange,
  onClearFilters,
  customTypeOptions,
  customStatusOptions,
}) => {
  // Default transaction type options
  const defaultTypeOptions: FilterOption[] = [
    { id: 'all', label: 'All Types', icon: WalletIcon, color: 'gray' },
    { id: 'ADD_PLN_FUNDS', label: 'Top-up', icon: ArrowDownTrayIcon, color: 'emerald' },
    { id: 'CHARGING_PAYMENT', label: 'Payment', icon: BoltIcon, color: 'blue' },
    { id: 'REFUND', label: 'Refund', icon: ReceiptRefundIcon, color: 'amber' },
    { id: 'TRANSFER', label: 'Transfer', icon: ArrowUpIcon, color: 'purple' },
  ];

  // Default transaction status options
  const defaultStatusOptions: FilterOption[] = [
    { id: 'all', label: 'All Status', icon: ViewColumnsIcon, color: 'gray' },
    { id: 'COMPLETED', label: 'Completed', icon: CheckCircleIcon, color: 'emerald' },
    { id: 'PENDING', label: 'Pending', icon: ClockIcon, color: 'amber' },
    { id: 'FAILED', label: 'Failed', icon: XCircleIcon, color: 'red' },
    { id: 'CANCELLED', label: 'Cancelled', icon: XMarkIcon, color: 'red' },
  ];

  // Use custom options if provided, otherwise use defaults
  const typeOptions = customTypeOptions || defaultTypeOptions;
  const statusOptions = customStatusOptions || defaultStatusOptions;

  /**
   * 🎨 Render Filter Option Button
   */
  const renderFilterOption = (
    option: FilterOption,
    isSelected: boolean,
    onClick: () => void
  ) => {
    const IconComponent = option.icon;
    
    return (
      <button
        key={option.id}
        onClick={onClick}
        className={`
          group relative p-4 rounded-xl border transition-all duration-300 ease-out
          ${isSelected
            ? `bg-gradient-to-r from-${option.color}-500/20 via-${option.color}-400/15 to-${option.color}-500/20 
               border-${option.color}-400/50 text-${option.color}-300 shadow-lg shadow-${option.color}-500/20
               scale-[1.02]`
            : `bg-gradient-to-r from-gray-700/30 via-gray-600/20 to-gray-700/30
               border-gray-600/30 text-gray-300 hover:bg-gray-600/40 hover:border-gray-500/50
               hover:scale-[1.01]`
          }
          overflow-hidden
          before:absolute before:inset-0 before:bg-gradient-to-r 
          before:from-transparent before:via-white/5 before:to-transparent
          before:translate-x-[-100%] hover:before:translate-x-[100%]
          before:transition-transform before:duration-700
        `}
      >
        <div className="flex items-center gap-3 relative z-10">
          <div
            className={`
              w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
              ${isSelected
                ? `bg-${option.color}-500/20 border border-${option.color}-400/30`
                : `bg-gray-600/30 border border-gray-500/30 group-hover:bg-gray-500/40`
              }
            `}
          >
            <IconComponent 
              className={`
                w-5 h-5 transition-transform duration-300
                ${isSelected 
                  ? `text-${option.color}-400 scale-110` 
                  : `text-gray-400 group-hover:text-gray-300 group-hover:scale-105`
                }
              `} 
            />
          </div>
          <span className="font-medium text-sm">{option.label}</span>
        </div>
      </button>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Transaction Filters"
      description="Select transaction types and status to filter results"
      size="lg"
      variant="default"
      footer={
        <div className="flex gap-3 justify-end">
          <Button
            variant="ghost"
            onClick={onClearFilters}
            className="
              relative overflow-hidden group/clear
              bg-gradient-to-r from-gray-700/40 via-gray-600/30 to-gray-700/40
              hover:from-gray-600/50 hover:via-gray-500/40 hover:to-gray-600/50
              text-gray-300 hover:text-white
              border border-gray-600/30 hover:border-gray-500/50
              transition-all duration-300 ease-out
              hover:scale-[1.02] active:scale-[0.98]
              flex items-center
              before:absolute before:inset-0 before:bg-gradient-to-r 
              before:from-transparent before:via-white/10 before:to-transparent
              before:translate-x-[-100%] hover:before:translate-x-[100%]
              before:transition-transform before:duration-500
            "
          >
            <div className="flex items-center gap-2 relative z-10">
              <XMarkIcon className="w-4 h-4 group-hover/clear:rotate-90 transition-transform duration-300" />
              <span className="font-medium">Clear All</span>
            </div>
          </Button>
          <Button
            variant="primary"
            onClick={onClose}
            className="
              relative overflow-hidden group/apply
              bg-gradient-to-r from-teal-600 via-teal-500 to-teal-600
              hover:from-teal-500 hover:via-teal-400 hover:to-teal-500
              text-white font-semibold
              shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-400/30
              border border-teal-400/20 hover:border-teal-300/40
              transition-all duration-300 ease-out
              hover:scale-[1.02] active:scale-[0.98]
              flex items-center
              before:absolute before:inset-0 before:bg-gradient-to-r 
              before:from-transparent before:via-white/20 before:to-transparent
              before:translate-x-[-100%] hover:before:translate-x-[100%]
              before:transition-transform before:duration-700
            "
          >
            <span className="relative z-10 font-medium">Apply Filters</span>
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Revolutionary Transaction Type Selection */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Transaction Type</h3>
          <div className="grid grid-cols-2 gap-3">
            {typeOptions.map((type) =>
              renderFilterOption(
                type,
                typeFilter === type.id,
                () => onTypeChange(type.id)
              )
            )}
          </div>
        </div>

        {/* Revolutionary Transaction Status Selection */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Status</h3>
          <div className="grid grid-cols-2 gap-3">
            {statusOptions.map((status) =>
              renderFilterOption(
                status,
                statusFilter === status.id,
                () => onStatusChange(status.id)
              )
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TransactionFilterModal; 