'use client';

import React from 'react';
import { WalletIcon, BanknotesIcon, ClockIcon, EyeIcon, ArrowTrendingUpIcon } from '@heroicons/react/20/solid';
import { WalletsStatsData } from '../../types/wallet.types';

interface WalletsStatsSectionProps {
  stats: WalletsStatsData | null;
}

export const WalletsStatsSection: React.FC<WalletsStatsSectionProps> = ({ stats }) => {
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
    walletsUsedThisMonth,
  } = stats;

  const statsConfig = [
    {
      title: 'Total Balance',
      value: totalBalance.formatted,
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
      value: activeWallets.formatted,
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
      value: newWalletsThisMonth.formatted,
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
      value: walletsUsedThisMonth.formatted,
      icon: EyeIcon,
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
      <div className="flex items-center gap-3 mb-8">
        <div className="w-3 h-8 bg-gradient-to-b from-amber-400 to-amber-300 rounded-full"></div>
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BanknotesIcon className="w-6 h-6 text-amber-400" />
            Wallet System Overview
          </h2>
          <p className="text-gray-400">
            Current metrics related to balances and wallet lifecycle.
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
            <div
              className={`relative p-6 bg-gradient-to-br ${stat.bgColor} border ${stat.borderColor} rounded-2xl backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer h-[300px] flex flex-col`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

              <div className="relative z-10 flex flex-col h-full">
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