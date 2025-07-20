'use client';

import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  ArrowUpIcon,
  BanknotesIcon,
  BoltIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ClockIcon,
  EyeIcon,
  FunnelIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ReceiptRefundIcon,
  TableCellsIcon,
  ViewColumnsIcon,
  WalletIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Modal } from '@ui/display';
import { Button, Input } from '@ui/forms';
import { AppHeader } from '@ui/layout';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useState } from 'react';
import type { PLNTransaction } from '../types/wallet.types';
// ✅ Import shared business logic
import {
  getTransactionConfig,
  formatTransactionDate,
  filterTransactions,
} from '@evc/shared-business-logic';

// Type for icon components - fixed for Heroicons
type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

/**
 * 💳 Wallet Management Statistics
 * Revolutionary floating stats with financial data
 */
interface WalletStats {
  readonly title: string;
  readonly value: string;
  readonly icon: IconComponent;
  readonly variant: 'teal' | 'blue' | 'emerald' | 'purple' | 'amber';
  readonly trend: string;
  readonly description: string;
  readonly isLive?: boolean;
}

/**
 * 🎯 Filter Modal Props for Revolutionary Design
 */
interface FilterModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly typeFilter: string;
  readonly statusFilter: string;
  readonly onTypeChange: (value: string) => void;
  readonly onStatusChange: (value: string) => void;
  readonly onClearFilters: () => void;
}

/**
 * 🚀 Revolutionary Filter Modal Component
 */
const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  typeFilter,
  statusFilter,
  onTypeChange,
  onStatusChange,
  onClearFilters,
}) => {
  const typeOptions = [
    { id: 'all', label: 'All Types', icon: WalletIcon },
    { id: 'ADD_PLN_FUNDS', label: 'Top-up', icon: ArrowDownTrayIcon },
    { id: 'CHARGING_PAYMENT', label: 'Charging', icon: BoltIcon },
    { id: 'REFUND', label: 'Refund', icon: ReceiptRefundIcon },
    { id: 'TRANSFER', label: 'Transfer', icon: ArrowUpIcon },
  ];

  const statusOptions = [
    { id: 'all', label: 'All Status', icon: ViewColumnsIcon },
    { id: 'COMPLETED', label: 'Completed', icon: CheckCircleIcon },
    { id: 'PENDING', label: 'Pending', icon: ClockIcon },
    { id: 'FAILED', label: 'Failed', icon: XCircleIcon },
    { id: 'CANCELLED', label: 'Cancelled', icon: XMarkIcon },
  ];

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
            className="bg-gray-700/30 hover:bg-gray-600/40 text-gray-300"
          >
            <XMarkIcon className="w-4 h-4 mr-2" />
            Clear All
          </Button>
          <Button
            variant="primary"
            onClick={onClose}
            className="bg-teal-600 hover:bg-teal-500 text-white"
          >
            Apply Filters
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Transaction Type Selection */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Transaction Type
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {typeOptions.map((type) => (
              <button
                key={type.id}
                onClick={() => onTypeChange(type.id)}
                className={`p-4 rounded-xl border transition-all duration-200 flex items-center gap-3 ${
                  typeFilter === type.id
                    ? 'bg-teal-500/20 border-teal-400/50 text-teal-300'
                    : 'bg-gray-700/30 border-gray-600/30 text-gray-300 hover:bg-gray-600/40'
                }`}
              >
                <type.icon className="w-5 h-5" />
                <span className="font-medium">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Transaction Status Selection */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Status</h3>
          <div className="grid grid-cols-2 gap-3">
            {statusOptions.map((status) => (
              <button
                key={status.id}
                onClick={() => onStatusChange(status.id)}
                className={`p-4 rounded-xl border transition-all duration-200 flex items-center gap-3 ${
                  statusFilter === status.id
                    ? 'bg-teal-500/20 border-teal-400/50 text-teal-300'
                    : 'bg-gray-700/30 border-gray-600/30 text-gray-300 hover:bg-gray-600/40'
                }`}
              >
                <status.icon className="w-5 h-5" />
                <span className="font-medium">{status.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

/**
 * 🚀 Revolutionary PLN Wallet Management Page - Teal Theme
 * Sophisticated floating card design with financial operations
 *
 * Features:
 * - Wallet balance overview with real-time updates
 * - Transaction history with filtering
 * - Payment processing with Stripe integration
 * - Refund management
 * - Financial analytics and reporting
 * - Revolutionary table view with glassmorphism
 * - Modal-based filtering system
 * - API schema compliant TypeScript
 * - ✅ Now uses shared business logic for cleaner separation
 */
const WalletsPage: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Revolutionary floating stats with financial data
  const walletStats: WalletStats[] = [
    {
      title: 'Total Balance',
      value: '₺1,247.50',
      icon: WalletIcon,
      variant: 'teal',
      trend: '+₺125 this week',
      description: 'Current PLN wallet balance with live transaction updates',
      isLive: true,
    },
    {
      title: 'Transactions Today',
      value: '47',
      icon: ArrowPathIcon,
      variant: 'blue',
      trend: '+12 since morning',
      description: 'Payment transactions processed in the last 24 hours',
    },
    {
      title: 'Total Revenue',
      value: '₺8,524.30',
      icon: ChartBarIcon,
      variant: 'emerald',
      trend: '+18% vs last month',
      description: 'Total revenue from charging sessions and top-ups',
    },
    {
      title: 'Pending Refunds',
      value: '₺89.75',
      icon: ReceiptRefundIcon,
      variant: 'amber',
      trend: '3 pending',
      description: 'Refund requests awaiting processing',
      isLive: true,
    },
  ];

  // API Schema Ready - Mock transactions data
  const transactions: PLNTransaction[] = [
    {
      id: 'txn-001',
      type: 'ADD_PLN_FUNDS',
      status: 'COMPLETED',
      amount: {
        amount: 100.0,
        currency: 'PLN',
        formatted: '100.00 zł',
      },
      description: 'PLN wallet top-up via Stripe',
      stripePaymentIntentId: 'pi_1234567890',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:31:00Z',
    },
    {
      id: 'txn-002',
      type: 'CHARGING_PAYMENT',
      status: 'COMPLETED',
      amount: {
        amount: 45.75,
        currency: 'PLN',
        formatted: '45.75 zł',
      },
      description: 'Charging session at Mall Center Supercharger',
      metadata: {
        sessionId: 'session-001',
        stationId: 'station-001',
        powerConsumed: 45.5,
        duration: 90,
      },
      createdAt: '2024-01-15T09:15:00Z',
      updatedAt: '2024-01-15T09:15:00Z',
    },
    {
      id: 'txn-003',
      type: 'REFUND',
      status: 'PENDING',
      amount: {
        amount: 15.25,
        currency: 'PLN',
        formatted: '15.25 zł',
      },
      description: 'Refund for incomplete charging session',
      metadata: {
        originalTransactionId: 'txn-original-123',
        reason: 'charging_interrupted',
      },
      createdAt: '2024-01-15T08:45:00Z',
      updatedAt: '2024-01-15T08:45:00Z',
    },
    {
      id: 'txn-004',
      type: 'CHARGING_PAYMENT',
      status: 'FAILED',
      amount: {
        amount: 75.0,
        currency: 'PLN',
        formatted: '75.00 zł',
      },
      description: 'Failed payment - insufficient funds',
      createdAt: '2024-01-14T16:20:00Z',
      updatedAt: '2024-01-14T16:20:00Z',
    },
  ];

  // ✅ Use shared business logic for filtering
  const filteredTransactions = filterTransactions(transactions, {
    searchQuery,
    typeFilter,
    statusFilter,
  });

  /**
   * 🎨 Clear All Filters
   */
  const handleClearFilters = () => {
    setTypeFilter('all');
    setStatusFilter('all');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <AppHeader />

      {/* Revolutionary Page Header with Teal Theme */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/')}
            className="p-2 hover:bg-gray-700/30"
          >
            <HomeIcon className="w-4 h-4" />
          </Button>
          <ChevronRightIcon className="w-4 h-4" />
          <span className="text-teal-400 font-medium">PLN Wallet</span>
        </div>

        {/* Page Title */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-4 h-12 bg-gradient-to-b from-teal-400 to-cyan-400 rounded-full"></div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                PLN Wallet Management
              </h1>
              <p className="text-gray-300 text-lg">
                Financial operations & transaction processing
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-10">
        {/* Revolutionary Network Stats Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-8 bg-gradient-to-b from-teal-400 to-teal-300 rounded-full"></div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Financial Overview
              </h2>
              <p className="text-gray-400">
                Real-time wallet statistics and transaction monitoring
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {walletStats.map((stat, index) => (
              <div
                key={stat.title}
                className="group relative"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Revolutionary MinimalStatCard Design */}
                <div
                  className={`
                  relative p-6 bg-gradient-to-br from-${stat.variant}-500/10 via-${stat.variant}-400/5 to-transparent
                  border border-${stat.variant}-400/25 hover:border-${stat.variant}-300/40
                  rounded-2xl backdrop-blur-xl shadow-2xl hover:shadow-3xl
                  transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1
                  cursor-pointer
                `}
                >
                  {/* Live indicator */}
                  {stat.isLive && (
                    <div
                      className={`absolute -top-2 -right-2 w-4 h-4 bg-${stat.variant}-500 rounded-full animate-ping opacity-75`}
                    ></div>
                  )}

                  {/* Floating Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-${stat.variant}-500/10 border border-${stat.variant}-500/20 flex items-center justify-center`}
                      >
                        <stat.icon
                          className={`w-6 h-6 text-${stat.variant}-400`}
                        />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white mb-1">
                          {stat.value}
                        </div>
                        <div
                          className={`text-xs font-medium text-${stat.variant}-400`}
                        >
                          {stat.trend}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-white">
                        {stat.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {stat.description}
                      </p>
                    </div>

                    {/* Interactive Elements */}
                    <div className="mt-4 flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className={`text-${stat.variant}-400 hover:text-${stat.variant}-300 hover:bg-${stat.variant}-500/10 border border-${stat.variant}-500/20 hover:border-${stat.variant}-400/30`}
                      >
                        <EyeIcon className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Revolutionary Transaction Management Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-8 bg-gradient-to-b from-teal-400 to-teal-300 rounded-full"></div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Transaction Management
                </h2>
                <p className="text-gray-400">
                  Search, filter and manage PLN transactions
                </p>
              </div>
            </div>

            <Button
              variant="primary"
              onClick={() => {
                /* Add transaction logic */
              }}
              className="bg-teal-600 hover:bg-teal-500 text-white"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              New Transaction
            </Button>
          </div>

          {/* Search & Filter Controls */}
          <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6 mb-8 backdrop-blur-xl">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                {/* Search Input */}
                <div className="relative flex-1 max-w-md">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search transactions, amounts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-teal-500/50 focus:ring-teal-500/20"
                  />
                </div>

                {/* Revolutionary Filter Button */}
                <Button
                  variant="ghost"
                  onClick={() => setIsFilterModalOpen(true)}
                  className="bg-gray-700/30 hover:bg-gray-600/40 text-gray-300 hover:text-white border border-gray-600/30 min-w-[120px]"
                >
                  <FunnelIcon className="w-4 h-4 mr-2" />
                  Filters
                  {(typeFilter !== 'all' || statusFilter !== 'all') && (
                    <div className="ml-2 w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                  )}
                </Button>
              </div>

              {/* View Mode Toggle - Fixed Icons Only */}
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${
                    viewMode === 'grid'
                      ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
                      : 'bg-gray-700/30 text-gray-400 hover:bg-gray-600/40 hover:text-gray-300'
                  }`}
                >
                  <ViewColumnsIcon className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setViewMode('table')}
                  className={`p-2 ${
                    viewMode === 'table'
                      ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
                      : 'bg-gray-700/30 text-gray-400 hover:bg-gray-600/40 hover:text-gray-300'
                  }`}
                >
                  <TableCellsIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Revolutionary Transactions Table */}
          {viewMode === 'table' && (
            <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl overflow-hidden backdrop-blur-xl">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700/30 border-b border-gray-600/30">
                    <tr>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                        Type
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                        Amount
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                        Status
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                        Description
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-300">
                        Date
                      </th>
                      <th className="text-right py-4 px-6 text-sm font-medium text-gray-300">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/30">
                    {filteredTransactions.map((transaction) => {
                      // ✅ Use shared business logic for transaction configuration
                      const config = getTransactionConfig(
                        transaction.type,
                        transaction.status,
                      );
                      return (
                        <tr
                          key={transaction.id}
                          className="hover:bg-gray-700/20 transition-colors group"
                        >
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-lg ${config.badgeColor} flex items-center justify-center`}
                              >
                                {/* Note: Icon rendering would need to be handled separately in a real implementation */}
                                <span className={`text-sm ${config.textColor}`}>
                                  {config.icon}
                                </span>
                              </div>
                              <span
                                className={`text-sm font-medium ${config.textColor}`}
                              >
                                {config.text}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-white font-semibold">
                              {transaction.amount.formatted}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div
                              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${config.badgeColor}`}
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
                                className={`text-xs font-medium ${config.textColor}`}
                              >
                                {transaction.status}
                              </span>
                            </div>
                          </td>
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
                          <td className="py-4 px-6">
                            <span className="text-gray-300 text-sm">
                              {/* ✅ Use shared business logic for date formatting */}
                              {formatTransactionDate(transaction.createdAt)}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="p-2 bg-gray-700/30 hover:bg-gray-600/40 text-gray-300 hover:text-white"
                              >
                                <EyeIcon className="w-4 h-4" />
                              </Button>
                              {transaction.type === 'CHARGING_PAYMENT' &&
                                transaction.status === 'FAILED' && (
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="p-2 bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 hover:text-teal-300 border border-teal-500/20"
                                  >
                                    <ArrowPathIcon className="w-4 h-4" />
                                  </Button>
                                )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Revolutionary Transactions Grid */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTransactions.map((transaction, index) => {
                // ✅ Use shared business logic for transaction configuration
                const config = getTransactionConfig(
                  transaction.type,
                  transaction.status,
                );
                const isPending = transaction.status === 'PENDING';

                return (
                  <div
                    key={transaction.id}
                    className="group relative"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Revolutionary Floating Transaction Card */}
                    <div
                      className={`relative p-6 ${config.bgColor} border ${config.borderColor} rounded-2xl backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer`}
                    >
                      {/* Pending Status Pulse */}
                      {isPending && (
                        <div
                          className={`absolute -top-2 -right-2 w-4 h-4 ${config.pulseColor} rounded-full animate-ping opacity-75`}
                        ></div>
                      )}

                      {/* Floating Background Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                      {/* Transaction Header */}
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-12 h-12 rounded-xl ${config.badgeColor} flex items-center justify-center`}
                            >
                              {/* Note: Icon rendering would need to be handled separately in a real implementation */}
                              <span className={`text-lg ${config.textColor}`}>
                                {config.icon}
                              </span>
                            </div>
                            <div>
                              <div
                                className={`text-sm font-medium ${config.textColor} mb-1`}
                              >
                                {config.text}
                              </div>
                              <div className="text-white font-semibold text-lg">
                                {transaction.amount.formatted}
                              </div>
                            </div>
                          </div>

                          {/* Status Badge */}
                          <div
                            className={`flex items-center gap-2 px-3 py-1 rounded-full ${config.badgeColor}`}
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
                              className={`text-xs font-medium ${config.textColor}`}
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
                            <span className="text-gray-400">
                              Transaction ID
                            </span>
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

                        {/* Action Buttons - Fixed spacing */}
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="flex-1 bg-gray-700/30 hover:bg-gray-600/40 text-gray-300 hover:text-white flex items-center justify-center gap-2"
                          >
                            <EyeIcon className="w-4 h-4" />
                            <span>View Details</span>
                          </Button>
                          {transaction.type === 'CHARGING_PAYMENT' &&
                            transaction.status === 'FAILED' && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="p-2 bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 hover:text-teal-300 border border-teal-500/20"
                              >
                                <ArrowPathIcon className="w-4 h-4" />
                              </Button>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-700/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BanknotesIcon className="w-12 h-12 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No transactions found
              </h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button
                variant="primary"
                onClick={handleClearFilters}
                className="bg-teal-600 hover:bg-teal-500 text-white"
              >
                <XMarkIcon className="w-4 h-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          )}
        </section>
      </div>

      {/* Revolutionary Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        typeFilter={typeFilter}
        statusFilter={statusFilter}
        onTypeChange={setTypeFilter}
        onStatusChange={setStatusFilter}
        onClearFilters={handleClearFilters}
      />
    </div>
  );
};

export default WalletsPage;
