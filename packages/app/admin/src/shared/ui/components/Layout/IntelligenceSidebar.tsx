import { SparklesIcon, XMarkIcon } from '@heroicons/react/24/outline';
import type React from 'react';
import { AIInsightsWidget } from '@/features/admin/components/AIInsights';
import { IntelligenceSection } from '@/features/admin/components/Intelligence';

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
          fixed top-0 left-0 h-full w-[640px] 
          bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 
          border-r border-gray-700/50 
          backdrop-blur-xl shadow-2xl
          transform transition-transform duration-300 ease-out z-50
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <SparklesIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                Intelligence Center
              </h2>
              <p className="text-xs text-gray-400">AI-Powered Insights</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="h-full overflow-y-auto pb-20 p-6 space-y-8">
          {/* AI Insights Widget */}
          <div className="transform scale-100">
            <AIInsightsWidget />
          </div>

          {/* Intelligence Section */}
          <div className="transform scale-100">
            <IntelligenceSection />
          </div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: '1s' }}
          />
        </div>
      </div>
    </>
  );
};
