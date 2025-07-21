'use client';

import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import type { CoreManagementItem } from '../hooks/useDashboardData';
import { 
  ChartBarIcon, 
  CpuChipIcon, 
  SignalIcon, 
  BoltIcon,
  ArrowTrendingUpIcon 
} from '@heroicons/react/24/outline';

interface CoreManagementSectionProps {
  readonly coreManagement: readonly CoreManagementItem[];
}

/**
 * Enhanced Core System Administration - Dashboard Centerpiece
 */
export const CoreManagementSection: React.FC<CoreManagementSectionProps> =
  React.memo(({ coreManagement }) => {
    const router = useRouter();

    const handleModuleClick = useCallback(
      (path: string) => {
        router.push(path);
      },
      [router],
    );

    // System stats for the overview section
    const systemStats = [
      { label: 'Active Stations', value: '2,847', icon: SignalIcon, change: '+12%' },
      { label: 'Network Health', value: '99.7%', icon: CpuChipIcon, change: '+0.3%' },
      { label: 'Energy Output', value: '1.2MW', icon: BoltIcon, change: '+28%' },
      { label: 'Revenue', value: '247K zł', icon: ChartBarIcon, change: '+23%' },
    ];

    return (
      <div className="space-y-8">
        {/* System Overview Dashboard */}
        <div className="bg-gradient-to-br from-gray-900/60 via-gray-800/40 to-gray-900/60 backdrop-blur-sm border border-gray-700/30 rounded-3xl p-8">
          <div className="mb-8">
            <h3 className="text-xl font-light text-white mb-2">System Overview</h3>
            <p className="text-gray-400 text-sm">Real-time infrastructure metrics and performance indicators</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {systemStats.map((stat, index) => (
              <div 
                key={stat.label}
                className="group relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/60 backdrop-blur-sm border border-gray-600/40 rounded-2xl p-6 hover:border-gray-500/60 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      stat.label === 'Active Stations' ? 'bg-blue-500/20 border border-blue-500/30' :
                      stat.label === 'Network Health' ? 'bg-emerald-500/20 border border-emerald-500/30' :
                      stat.label === 'Energy Output' ? 'bg-amber-500/20 border border-amber-500/30' :
                      'bg-purple-500/20 border border-purple-500/30'
                    }`}>
                      <stat.icon className={`w-5 h-5 ${
                        stat.label === 'Active Stations' ? 'text-blue-400' :
                        stat.label === 'Network Health' ? 'text-emerald-400' :
                        stat.label === 'Energy Output' ? 'text-amber-400' :
                        'text-purple-400'
                      }`} />
                    </div>
                    <div className={`flex items-center gap-1 text-xs ${
                      stat.label === 'Active Stations' ? 'text-blue-400' :
                      stat.label === 'Network Health' ? 'text-emerald-400' :
                      stat.label === 'Energy Output' ? 'text-amber-400' :
                      'text-purple-400'
                    }`}>
                      <ArrowTrendingUpIcon className="w-3 h-3" />
                      {stat.change}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-light text-white">{stat.value}</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Management Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {coreManagement.map((module, index) => (
            <div
              key={module.path}
              className="group relative"
              style={{ animationDelay: `${(index + 4) * 150}ms` }}
            >
              {/* Subtle Floating Management Card */}
              <div 
                className="relative p-8 bg-gradient-to-br from-gray-800/40 via-gray-700/30 to-gray-800/20 border border-gray-600/30 rounded-3xl backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] hover:-translate-y-1 cursor-pointer h-full"
                onClick={() => handleModuleClick(module.path)}
              >
                {/* Subtle Live Status Pulse */}
                <div
                  className={`absolute -top-1 -right-1 w-3 h-3 bg-${module.variant}-500 rounded-full animate-pulse opacity-60`}
                ></div>

                {/* Subtle Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>

                {/* Header */}
                <div className="flex items-start justify-between mb-6 relative z-10">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${module.variant}-500/20 to-${module.variant}-400/10 border border-${module.variant}-400/25 flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}
                    >
                      <module.icon 
                        className={`w-8 h-8 text-${module.variant}-400`} 
                      />
                    </div>
                    <div>
                      <h3 className={`text-xl font-light text-white group-hover:text-${module.variant}-300 transition-colors duration-300 mb-1`}>
                        {module.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border bg-gradient-to-r from-${module.variant}-500/20 to-${module.variant}-400/10 border-${module.variant}-400/30 text-${module.variant}-300`}
                        >
                          {module.badge}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Stats with Live Indicator */}
                  <div className="text-right">
                    <div className={`text-2xl font-light text-white group-hover:text-${module.variant}-300 transition-colors duration-300 mb-1`}>{module.stats}</div>
                    <div className="flex items-center gap-1 justify-end">
                      <div className={`w-2 h-2 bg-${module.variant}-400 rounded-full animate-pulse`}></div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide">Live</div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors duration-300 relative z-10">
                  {module.description}
                </p>

                {/* Features */}
                <div className="space-y-3 relative z-10">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Key Capabilities
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {getModuleFeatures(module.title).map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-full border border-gray-700/50 hover:bg-gray-700/50 transition-colors"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Subtle Floating Accents */}
                <div className="absolute bottom-6 right-6 w-12 h-12 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                  <div
                    className={`w-full h-full border border-${module.variant}-400 rounded-full animate-pulse`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  });

CoreManagementSection.displayName = 'CoreManagementSection';

/**
 * Get feature list for each module
 */
function getModuleFeatures(moduleTitle: string): string[] {
  const featuresMap: Record<string, string[]> = {
    'User Management': ['Access Control', 'Roles', 'Activity Logs', 'Permissions'],
    'Station Management': ['Device Control', 'Monitoring', 'Maintenance', 'Diagnostics'],
    'Charging Sessions': ['Session Tracking', 'Analytics', 'Billing', 'Reports'],
    'Wallet Management': ['Payments', 'Refunds', 'History', 'Balance'],
    'Analytics Dashboard': ['Reports', 'Insights', 'Export', 'Metrics'],
    'System Settings': ['Configuration', 'Security', 'Updates', 'Backup'],
  };
  
  return featuresMap[moduleTitle] || ['Management', 'Configuration', 'Monitoring', 'Control'];
}
