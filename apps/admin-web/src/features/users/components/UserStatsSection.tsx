'use client';

import {
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  CogIcon,
  PlusCircleIcon,
  ShieldCheckIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import type React from 'react';

// Import types from the centralized types file
import type {
  UserStatsSectionProps,
  UserStatConfig,
} from '../types/components.types';

/**
 * 📊 User Statistics Section Component
 * Displays enterprise identity management analytics
 */
const UserStatsSection: React.FC<UserStatsSectionProps> = ({ userStats }) => {
  const { totalUsers, activeUsers, adminUsers, newUsersThisMonth } = userStats;

  // Enterprise identity and access management statistics
  const statsConfig: UserStatConfig[] = [
    {
      title: 'Total Users',
      value: totalUsers.formatted,
      icon: UsersIcon,
      bgColor: 'from-indigo-500/15 via-indigo-400/8 to-transparent',
      borderColor: 'border-indigo-400/30 hover:border-indigo-300/50',
      iconColor: 'text-indigo-400',
      accentColor: 'bg-indigo-500',
      trend: `+${newUsersThisMonth.formatted} this month`,
      description:
        'Total provisioned user identities across all organizational roles and access levels',
      isLive: true,
    },
    {
      title: 'Active Users',
      value: activeUsers.formatted,
      icon: CheckCircleIcon,
      bgColor: 'from-emerald-500/15 via-emerald-400/8 to-transparent',
      borderColor: 'border-emerald-400/30 hover:border-emerald-300/50',
      iconColor: 'text-emerald-400',
      accentColor: 'bg-emerald-500',
      trend: `${activeUsers.percentage}% active`,
      description:
        'User accounts with validated authentication and active session capabilities',
    },
    {
      title: 'Admin Accounts',
      value: adminUsers.formatted,
      icon: ShieldCheckIcon,
      bgColor: 'from-amber-500/15 via-amber-400/8 to-transparent',
      borderColor: 'border-amber-400/30 hover:border-amber-300/50',
      iconColor: 'text-amber-400',
      accentColor: 'bg-amber-500',
      trend: 'Privileged access',
      description:
        'Administrative accounts with full system access and management capabilities',
    },
    {
      title: 'New Accounts',
      value: newUsersThisMonth.formatted,
      icon: PlusCircleIcon,
      bgColor: 'from-purple-500/15 via-purple-400/8 to-transparent',
      borderColor: 'border-purple-400/30 hover:border-purple-300/50',
      iconColor: 'text-purple-400',
      accentColor: 'bg-purple-500',
      trend: '+8 today',
      description:
        'Recently provisioned user accounts within the last 30-day operational cycle',
      isLive: true,
    },
  ];

  return (
    <section>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-3 h-8 bg-gradient-to-b from-purple-400 to-purple-300 rounded-full"></div>
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CogIcon className="w-6 h-6 text-purple-400" />
            Identity Management Analytics
          </h2>
          <p className="text-gray-400">
            Real-time access control metrics and organizational role
            distribution intelligence
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

export default UserStatsSection;
