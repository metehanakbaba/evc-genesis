import { SparklesIcon, XMarkIcon } from '@heroicons/react/24/outline';
import type React from 'react';
import { AIInsightsWidget } from '@/features/admin/components/AIInsights';
import { IntelligenceSection } from '@/features/admin/components/Intelligence';

export interface IntelligenceBottomModalProps {
  /** Modal open state */
  isOpen: boolean;
  /** Close modal handler */
  onClose: () => void;
}

/**
 * AI Intelligence Center Bottom Modal
 * Aşağıdan yukarı açılan modal versiyonu
 */
export const IntelligenceBottomModal: React.FC<IntelligenceBottomModalProps> = ({
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

      {/* Bottom Modal */}
      <div
        className={`
          fixed bottom-0 left-0 right-0 h-[80vh] 
          bg-gradient-to-t from-gray-900 via-gray-800 to-gray-900 
          border-t border-gray-700/50 
          backdrop-blur-xl shadow-2xl
          transform transition-transform duration-500 ease-out z-50
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}
          rounded-t-3xl
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
                AI Intelligence Center
              </h2>
              <p className="text-xs text-gray-400">Aşağıdan Yukarı Açılan Panel</p>
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

        {/* Drag Handle */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2">
          <div className="w-12 h-1 bg-gray-500 rounded-full"></div>
        </div>
      </div>
    </>
  );
}; 