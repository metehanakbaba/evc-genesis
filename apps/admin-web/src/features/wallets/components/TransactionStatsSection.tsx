'use client';

import {
  ArrowTrendingUpIcon,
  ArrowPathIcon,
  BanknotesIcon,
  ChartBarIcon,
  ReceiptRefundIcon,
  WalletIcon,
} from '@heroicons/react/24/outline';
import type React from 'react';

// Type for icon components
type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

/**
 * 💳 Wallet Management Statistics
 * Revolutionary floating stats with financial data
 */
interface TransactionStats {
  readonly title: string;
  readonly value: string;
  readonly icon: IconComponent;
  readonly bgColor: string;
  readonly borderColor: string;
  readonly iconColor: string;
  readonly accentColor: string;
  readonly trend: string;
  readonly description: string;
  readonly isLive?: boolean;
}

interface TransactionStatsData {
  totalBalance: { formatted: string; amount: number };
  dailyVolume: { formatted: string; count: number };
  revenue: { formatted: string; percentage: string };
  refundLiabilities: { formatted: string; pending: number };
}

interface TransactionStatsSectionProps {
  transactionStats: TransactionStatsData;
}

/**
 * 📊 Transaction Statistics Section Component
 * Displays enterprise treasury management analytics
 */
export const TransactionStatsSection: React.FC<TransactionStatsSectionProps> = ({ transactionStats }) => {
  const { totalBalance, dailyVolume, revenue, refundLiabilities } = transactionStats;

  // Enterprise treasury and financial management statistics
  const statsConfig: TransactionStats[] = [
    {
      title: 'Consolidated Balance',
      value: totalBalance.formatted,
      icon: WalletIcon,
      bgColor: 'from-teal-500/15 via-teal-400/8 to-transparent',
      borderColor: 'border-teal-400/30 hover:border-teal-300/50',
      iconColor: 'text-teal-400',
      accentColor: 'bg-teal-500',
      trend: '+2,847 zł this week',
      description:
        'Real-time aggregate digital wallet liquidity across all customer accounts with automated reconciliation and multi-currency support',
      isLive: true,
    },
    {
      title: 'Daily Transaction Volume',
      value: dailyVolume.formatted,
      icon: ArrowPathIcon,
      bgColor: 'from-blue-500/15 via-blue-400/8 to-transparent',
      borderColor: 'border-blue-400/30 hover:border-blue-300/50',
      iconColor: 'text-blue-400',
      accentColor: 'bg-blue-500',
      trend: '+156 since morning',
      description:
        'Real-time payment processing velocity including charging transactions, wallet top-ups, and automated billing cycles',
    },
    {
      title: 'Revenue Recognition',
      value: revenue.formatted,
      icon: ChartBarIcon,
      bgColor: 'from-emerald-500/15 via-emerald-400/8 to-transparent',
      borderColor: 'border-emerald-400/30 hover:border-emerald-300/50',
      iconColor: 'text-emerald-400',
      accentColor: 'bg-emerald-500',
      trend: `${revenue.percentage}% vs last month`,
      description:
        'Comprehensive revenue streams from energy consumption, infrastructure utilization, and premium service offerings',
    },
    {
      title: 'Refund Liabilities',
      value: refundLiabilities.formatted,
      icon: ReceiptRefundIcon,
      bgColor: 'from-amber-500/15 via-amber-400/8 to-transparent',
      borderColor: 'border-amber-400/30 hover:border-amber-300/50',
      iconColor: 'text-amber-400',
      accentColor: 'bg-amber-500',
      trend: `${refundLiabilities.pending} pending`,
      description:
        'Outstanding customer reimbursement obligations requiring payment processor validation and compliance approval',
      isLive: true,
    },
  ];

  return (
    <section>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-3 h-8 bg-gradient-to-b from-teal-400 to-teal-300 rounded-full"></div>
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BanknotesIcon className="w-6 h-6 text-teal-400" />
            Financial Operations Dashboard
          </h2>
          <p className="text-gray-400">
            Real-time treasury analytics, liquidity monitoring, and payment infrastructure intelligence
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsConfig.map((stat, index) => (
          <div
            key={stat.title}
            className="group relative"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {/* Revolutionary MinimalStatCard Design - Fixed Height */}
            <div
              className={`
              relative p-6 bg-gradient-to-br ${stat.bgColor}
              border ${stat.borderColor}
              rounded-2xl backdrop-blur-xl shadow-2xl hover:shadow-3xl
              transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1
              cursor-pointer h-[300px] flex flex-col
            `}
            >
              {/* Live indicator */}
              {stat.isLive && (
                <div
                  className={`absolute -top-2 -right-2 w-4 h-4 ${stat.accentColor} rounded-full animate-ping opacity-75`}
                ></div>
              )}

              {/* Floating background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

              <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl ${stat.bgColor} border ${stat.borderColor} flex items-center justify-center backdrop-blur-sm`}
                  >
                    <stat.icon className={`w-7 h-7 ${stat.iconColor}`} />
                  </div>
                  <ArrowTrendingUpIcon
                    className={`w-5 h-5 ${stat.iconColor}`}
                  />
                </div>

                {/* Main Content - Fixed spacing */}
                <div className="flex-1 flex flex-col">
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-white mb-2">
                      {stat.value}
                    </div>
                    <div className={`text-sm font-medium ${stat.iconColor}`}>
                      {stat.title}
                    </div>
                  </div>

                  <div className={`text-xs ${stat.iconColor} mb-4 font-medium`}>
                    {stat.trend}
                  </div>
                </div>

                {/* Description - Fixed at bottom */}
                <div className="mt-auto">
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};