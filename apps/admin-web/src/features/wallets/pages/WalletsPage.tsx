'use client';

import {
  ArrowPathIcon,
  BanknotesIcon,
  ChartBarIcon,
  EyeIcon,
  PlusIcon,
  ReceiptRefundIcon,
  WalletIcon,
} from '@heroicons/react/24/outline';
import { SearchFilterBar, EmptyState } from '@/shared/ui/molecules';
import { Button } from '@ui/forms';
import { MainLayout, PageHeader, PageContainer } from '@ui/layout';
import { Breadcrumb } from '@/shared/ui/components/Navigation';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useState, useMemo } from 'react';

// ✅ Import new reusable components
import { 
  TransactionGrid, 
  TransactionTable, 
  TransactionFilterModal 
} from '../components';

// ✅ Import API hooks and types
import { 
  useWalletStatistics,
  useTransactionActions,
  type PLNTransaction,
} from '../api/walletApi';

// ✅ Import infinite scroll hooks
import { useInfiniteTransactions } from '../hooks/useInfiniteTransactions';

// ✅ Import debounce hook
import { useSearchDebounce } from '../hooks/useDebounce';

// ✅ Import skeleton components
import { TransactionGridSkeleton, TransactionTableSkeleton } from '../components/TransactionSkeleton';

/**
 * 💳 Wallet Management Statistics
 * Revolutionary floating stats with financial data
 */
interface WalletStats {
  readonly title: string;
  readonly value: string;
  readonly icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  readonly variant: 'teal' | 'blue' | 'emerald' | 'purple' | 'amber';
  readonly trend: string;
  readonly description: string;
  readonly isLive?: boolean;
}

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
 * - ✅ Now uses reusable components and API hooks
 * - ✅ Clean separation of concerns
 */
const WalletsPage: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // ✅ Debounce search query to prevent excessive API calls
  const debouncedSearchQuery = useSearchDebounce(searchQuery, 300);

  // ✅ Use infinite scroll hook for data fetching
  const {
    transactions,
    isLoading,
    isLoadingMore,
    hasNextPage,
    loadMore,
    total,
  } = useInfiniteTransactions({
    filters: {
      searchQuery: debouncedSearchQuery,
      typeFilter,
      statusFilter,
    },
    pageSize: 20,
  });

  const { 
    totalBalance, 
  } = useWalletStatistics();

  const { viewDetails, retryTransaction } = useTransactionActions();

  // Revolutionary floating stats with financial data
  const walletStats: WalletStats[] = [
    {
      title: 'Total Balance',
      value: totalBalance.formatted,
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

  // ✅ Filtering is now handled by useInfiniteTransactions hook

  /**
   * 🎨 Clear All Filters
   */
  const handleClearFilters = () => {
    setTypeFilter('all');
    setStatusFilter('all');
    setSearchQuery('');
  };

  return (
    <MainLayout
      showNotifications={true}
      notificationCount={3}
      headerVariant="default"
    >
      {/* Revolutionary Page Header with Teal Theme */}
      <PageContainer paddingY="md">
        {/* Revolutionary Breadcrumb Navigation */}
        <Breadcrumb 
          currentPageLabel="PLN Wallet"
          variant="teal"
        />

        <PageHeader
          title="PLN Wallet Management"
          description="Financial operations & transaction processing"
          variant="teal"
          actionButton={{
            label: "New Transaction",
            onClick: () => {
              /* Add transaction logic */
            },
            icon: PlusIcon,
            iconAnimation: "rotate-90"
          }}
        />
      </PageContainer>

      <PageContainer paddingY="lg" className="space-y-10">
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

                    {/* Revolutionary Interactive Elements */}
                    <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                      <div className="relative overflow-hidden rounded-lg">
                        <Button
                          size="sm"
                          variant="ghost"
                          className={`
                            w-full relative overflow-hidden backdrop-blur-sm
                            bg-gradient-to-r from-${stat.variant}-500/15 via-${stat.variant}-400/10 to-${stat.variant}-500/15
                            border border-${stat.variant}-400/30 hover:border-${stat.variant}-300/50
                            text-${stat.variant}-300 hover:text-white
                            shadow-lg hover:shadow-${stat.variant}-500/25 hover:shadow-xl
                            transition-all duration-300 ease-out
                            hover:scale-[1.02] active:scale-[0.98]
                            group/button flex items-center justify-center
                          `}
                        >
                          {/* Shine Effect */}
                          <div className={`
                            absolute inset-0 z-0
                            bg-gradient-to-r from-transparent via-white/15 to-transparent
                            translate-x-[-100%] group-hover/button:translate-x-[100%]
                            transition-transform duration-700 ease-out
                          `}></div>
                          
                          {/* Button Content */}
                          <div className="flex items-center gap-2 relative z-10">
                            <EyeIcon className={`w-4 h-4 text-${stat.variant}-400 group-hover/button:text-white transition-colors duration-300`} />
                            <span className="font-medium text-sm">View Details</span>
                            <div className={`w-1 h-1 bg-${stat.variant}-400 rounded-full opacity-60 group-hover/button:opacity-100 transition-opacity duration-300`}></div>
                          </div>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Revolutionary Transaction Management Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
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

          {/* Search & Filter Controls - Using New SearchFilterBar Component */}
          <SearchFilterBar
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search transactions, amounts..."
            onFilterClick={() => setIsFilterModalOpen(true)}
            isFilterActive={typeFilter !== 'all' || statusFilter !== 'all'}
            filterLabel="Filters"
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            variant="primary"
            className="mb-8"
          />

          {/* ✅ Loading States */}
          {isLoading && viewMode === 'table' && (
            <TransactionTableSkeleton count={10} />
          )}

          {isLoading && viewMode === 'grid' && (
            <TransactionGridSkeleton count={6} />
          )}

          {/* ✅ Use new reusable TransactionTable component with infinite scroll */}
          {!isLoading && viewMode === 'table' && (
            <TransactionTable
              transactions={transactions}
              onViewDetails={viewDetails}
              onRetryTransaction={retryTransaction}
              showRetryButton={true}
              onLoadMore={loadMore}
              isLoadingMore={isLoadingMore}
              hasNextPage={hasNextPage}
              total={total}
            />
          )}

          {/* ✅ Use new reusable TransactionGrid component with infinite scroll */}
          {!isLoading && viewMode === 'grid' && (
            <TransactionGrid
              transactions={transactions}
              onViewDetails={viewDetails}
              onRetryTransaction={retryTransaction}
              showRetryButton={true}
              onLoadMore={loadMore}
              isLoadingMore={isLoadingMore}
              hasNextPage={hasNextPage}
              total={total}
            />
          )}

          {/* Empty State - Using New EmptyState Component */}
          {!isLoading && transactions.length === 0 && (
            <EmptyState
              icon={BanknotesIcon}
              title="No transactions found"
              description="Try adjusting your search or filter criteria"
              actionLabel="Clear Filters"
              onAction={handleClearFilters}
              variant="teal"
            />
          )}
        </section>
      </PageContainer>

      {/* ✅ Use new reusable TransactionFilterModal component */}
      <TransactionFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        typeFilter={typeFilter}
        statusFilter={statusFilter}
        onTypeChange={setTypeFilter}
        onStatusChange={setStatusFilter}
        onClearFilters={handleClearFilters}
      />
    </MainLayout>
  );
};

export default WalletsPage;
