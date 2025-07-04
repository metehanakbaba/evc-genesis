'use client';

import { 
  SparklesIcon, 
  XMarkIcon, 
  ChartBarIcon, 
  BoltIcon, 
  WrenchScrewdriverIcon 
} from '@heroicons/react/24/outline';
import type React from 'react';

export interface IntelligenceSidebarProps {
  /** Sidebar open state */
  isOpen: boolean;
  /** Close sidebar handler */
  onClose: () => void;
}

/**
 * AI Intelligence Center Sidebar
 * Contains Intelligence Section and AI Insights widgets
 */
export const IntelligenceSidebar: React.FC<IntelligenceSidebarProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed right-0 top-0 h-full w-96 bg-gradient-to-b from-purple-900/90 via-gray-900/95 to-gray-800/90 
          backdrop-blur-xl border-l border-purple-500/20 shadow-2xl z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-purple-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <SparklesIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">
                  AI Intelligence Center
                </h2>
                <p className="text-sm text-purple-300">Advanced Analytics</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700/50"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* AI Status */}
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-white">
                AI System Online
              </span>
            </div>
            <p className="text-xs text-purple-300">
              Advanced analytics and predictive insights are active
            </p>
          </div>

          {/* Quick Insights */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white">Quick Insights</h3>

            <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <ChartBarIcon className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-white">
                  Usage Prediction
                </span>
              </div>
              <p className="text-xs text-gray-300">
                Peak usage expected at 6 PM (87% confidence)
              </p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <BoltIcon className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-white">
                  Energy Optimization
                </span>
              </div>
              <p className="text-xs text-gray-300">
                12% energy savings possible with load balancing
              </p>
            </div>

            <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <WrenchScrewdriverIcon className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium text-white">
                  Maintenance Alert
                </span>
              </div>
              <p className="text-xs text-gray-300">
                Station #42 requires maintenance in 3 days
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IntelligenceSidebar;
