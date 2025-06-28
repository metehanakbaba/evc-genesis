import React from 'react';

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
                <span className="text-sm text-gray-300">All Systems Operational</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                <span className="text-sm text-gray-300">API v2.1.0 Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                <span className="text-sm text-gray-300">React 19 + Next.js 15</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wide">
              Quick Links
            </h3>
            <div className="space-y-2">
              <a href="/docs" className="block text-sm text-gray-300 hover:text-blue-400 transition-colors">
                Documentation
              </a>
              <a href="/support" className="block text-sm text-gray-300 hover:text-blue-400 transition-colors">
                Support Center
              </a>
              <a href="/api" className="block text-sm text-gray-300 hover:text-blue-400 transition-colors">
                API Reference
              </a>
              <a href="/status" className="block text-sm text-gray-300 hover:text-blue-400 transition-colors">
                System Status
              </a>
            </div>
          </div>

          {/* Company Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wide">
              EV Charging Network
            </h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-300">
                Professional EV charging infrastructure management platform
              </p>
              <p className="text-xs text-gray-400">
                © 2024 EV Charging Team. All rights reserved.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <span className="text-xs text-gray-500">
                  Version 2.1.0
                </span>
                <span className="text-xs text-gray-500">
                  Build {new Date().getFullYear()}.{String(new Date().getMonth() + 1).padStart(2, '0')}.{String(new Date().getDate()).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/30 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">⚡</span>
            </div>
            <span className="text-sm text-gray-300 font-medium">
              EV Charging Admin Dashboard
            </span>
          </div>
          
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <span className="text-xs text-gray-500">
              Last updated: {new Date().toLocaleTimeString()}
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