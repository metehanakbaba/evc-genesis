import { getOptimizedIcon } from '@/lib/utils/iconOptimization';
import type React from 'react';
// ✅ Import shared business logic
import { formatBuildTimestamp, formatLiveUpdateTime } from '@evc/shared-business-logic';

// ✅ Use optimized icon loading
const BoltIcon = getOptimizedIcon('heroicons-outline', 'BoltIcon');

/**
 * 🦶 Dashboard Footer
 *
 * Professional footer for the EV charging admin dashboard.
 * Shows system status, version info, and branding.
 */
export const DashboardFooter: React.FC = () => {
  return (
    <footer className="bg-gray-900/50 backdrop-blur-sm border-t border-gray-700/30 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* System Status */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wide">
              System Status
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-gray-300">
                  All Systems Operational
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                <span className="text-sm text-gray-300">API v2.1.0 Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                <span className="text-sm text-gray-300">
                  React 19 + Next.js 15
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wide">
              Quick Links
            </h3>
            <div className="space-y-2">
              <a
                href="/admin/users"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                User Management
              </a>
              <a
                href="/admin/stations"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Charging Stations
              </a>
              <a
                href="/admin/sessions"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Active Sessions
              </a>
              <a
                href="/admin/wallets"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Payment System
              </a>
            </div>
          </div>

          {/* Build Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wide">
              Build Information
            </h3>
            <div className="space-y-2">
              <div className="text-sm text-gray-300">
                Version: <span className="text-gray-100">2.1.0</span>
              </div>
              <div className="text-sm text-gray-300">
                Build: <span className="text-gray-100">{formatBuildTimestamp()}</span>
              </div>
              <div className="text-sm text-gray-300">
                Environment:{' '}
                <span className="text-gray-100">
                  {process.env.NODE_ENV || 'production'}
                </span>
              </div>
              <div className="text-sm text-gray-300">
                Deploy: <span className="text-gray-100">Stable</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700/30 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
              <BoltIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm text-gray-300 font-medium">
              EV Charging Admin Dashboard
            </span>
          </div>

          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <span className="text-xs text-gray-500">
              Last updated: {formatLiveUpdateTime(new Date())}
            </span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-gray-400">Live</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
