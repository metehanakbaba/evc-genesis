import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignalIcon } from '@heroicons/react/24/outline';

/**
 * Dashboard footer with status and navigation controls
 */
export const DashboardFooter: React.FC = React.memo(() => {
  const navigate = useNavigate();

  const handleRefresh = useCallback(() => {
    window.location.reload();
  }, []);

  const handleSettings = useCallback(() => {
    navigate('/settings');
  }, [navigate]);

  return (
    <footer className="pt-12 border-t border-gray-700/30 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <SignalIcon className="w-4 h-4" />
            <span>Connected</span>
          </div>
          <div className="w-1 h-1 bg-gray-500 rounded-full" />
          <span>Last sync: Just now</span>
          <div className="w-1 h-1 bg-gray-500 rounded-full" />
          <span>v2.1.0</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className="px-4 py-2 text-sm bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-lg text-gray-300 hover:text-white transition-colors"
          >
            Refresh
          </button>
          <button
            onClick={handleSettings}
            className="px-4 py-2 text-sm bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg text-blue-400 hover:text-blue-300 transition-colors"
          >
            Settings
          </button>
        </div>
      </div>
    </footer>
  );
});

DashboardFooter.displayName = 'DashboardFooter';
