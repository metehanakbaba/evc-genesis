'use client';

import React from 'react';
import { WalletIcon, BanknotesIcon, ClockIcon, EyeIcon, ArrowTrendingUpIcon } from '@heroicons/react/20/solid';
import { WalletsStatsData } from '../../types/wallet.types';
import { Button } from '@/shared/ui';

interface WalletsStatsSectionProps {
  stats: WalletsStatsData;
}

export const WalletsStatsSection: React.FC<WalletsStatsSectionProps & { onOpenAnalytics: () => void }> = ({ stats, onOpenAnalytics }) => {
  if (!stats) {
    return (
      <div className="text-gray-400 text-center py-6">
        No wallet statistics available.
      </div>
    );
  }

  const {
    totalBalance,
    totalWallets,
    activeWallets,
    newWalletsThisMonth,
  } = stats;

  const statsConfig = [
    {
      title: 'Total Balance',
      value: totalBalance.amount,
      icon: BanknotesIcon,
      bgColor: 'from-amber-500/15 via-amber-400/8 to-transparent',
      borderColor: 'border-amber-400/30 hover:border-amber-300/50',
      iconColor: 'text-amber-400',
      accentColor: 'bg-amber-500',
      trend: `${totalWallets.count} wallets`,
      description: 'Total balance across all wallets in the system.',
    },
    {
      title: 'Active Wallets',
      value: activeWallets.count,
      icon: WalletIcon,
      bgColor: 'from-emerald-500/15 via-emerald-400/8 to-transparent',
      borderColor: 'border-emerald-400/30 hover:border-emerald-300/50',
      iconColor: 'text-emerald-400',
      accentColor: 'bg-emerald-500',
      trend: `${activeWallets.percentage}% active`,
      description: 'Wallets that are currently marked as active.',
    },
    {
      title: 'New This Month',
      value: newWalletsThisMonth.count,
      icon: ClockIcon,
      bgColor: 'from-indigo-500/15 via-indigo-400/8 to-transparent',
      borderColor: 'border-indigo-400/30 hover:border-indigo-300/50',
      iconColor: 'text-indigo-400',
      accentColor: 'bg-indigo-500',
      trend: '+ growth',
      description: 'Wallets created during the current month.',
    },
    {
      title: 'Used This Month',
      icon: EyeIcon,
      value: '-',
      bgColor: 'from-purple-500/15 via-purple-400/8 to-transparent',
      borderColor: 'border-purple-400/30 hover:border-purple-300/50',
      iconColor: 'text-purple-400',
      accentColor: 'bg-purple-500',
      trend: 'Recent activity',
      description: 'Wallets with transactions in the current month.',
    },
  ];

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-2 h-6 bg-gradient-to-b from-amber-400 to-amber-300 rounded-full"></div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BanknotesIcon className="w-5 h-5 text-amber-400" />
            Wallet System Overview
          </h2>
        </div>

        <Button variant="outline" onClick={onOpenAnalytics}>
          View Analytics
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsConfig.map((stat, index) => (
          <div
            key={stat.title}
            className="group relative"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div
              className={`relative p-4 bg-gradient-to-br ${stat.bgColor} border ${stat.borderColor} rounded-xl backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.015] cursor-pointer h-[220px] flex flex-col`}
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl ${stat.bgColor} border ${stat.borderColor} flex items-center justify-center backdrop-blur-sm`}
                  >
                    <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                  </div>
                  <ArrowTrendingUpIcon
                    className={`w-4 h-4 ${stat.iconColor}`}
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="mb-2">
                    <div className="text-2xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className={`text-sm font-medium ${stat.iconColor}`}>
                      {stat.title}
                    </div>
                  </div>
                  <div className={`text-xs ${stat.iconColor} mb-2 font-medium`}>
                    {stat.trend}
                  </div>
                </div>

                <p className="text-xs text-gray-300 mt-auto leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};