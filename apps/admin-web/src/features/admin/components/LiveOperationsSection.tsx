'use client';

import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import type { ActiveOperation } from '../hooks/useDashboardData';

interface LiveOperationsSectionProps {
  readonly activeOperations: readonly ActiveOperation[];
}

/**
 * Revolutionary Live Operations Section - SessionsPage-inspired Design
 */
export const LiveOperationsSection: React.FC<LiveOperationsSectionProps> =
  React.memo(({ activeOperations }) => {
    const router = useRouter();

    const handleOperationClick = useCallback(
      (path: string) => {
        router.push(path);
      },
      [router],
    );

    return (
      <div className="space-y-6">
        {activeOperations.map((operation, index) => (
          <div
            key={operation.path}
            className="group relative"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {/* Subtle Floating Operation Card */}
            <div
              className="relative p-6 bg-gradient-to-br from-gray-800/40 via-gray-700/30 to-gray-800/20 border border-gray-600/30 rounded-2xl backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.005] hover:-translate-y-0.5 cursor-pointer"
              onClick={() => handleOperationClick(operation.path)}
            >
              {/* Subtle Live Pulse Indicator */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse opacity-60"></div>

              {/* Subtle Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  {/* Refined Icon with Subtle Pulse */}
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/10 border border-emerald-400/25 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <operation.icon className="w-6 h-6 text-emerald-400" />
                      <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    </div>

                    <div className="flex flex-col">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-medium text-white group-hover:text-emerald-300 transition-colors duration-300">
                          {operation.title}
                        </h3>
                        <span className="px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-emerald-400/10 border border-emerald-400/30 rounded-full text-xs font-medium text-emerald-300 backdrop-blur-sm">
                          {operation.badge}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                        {operation.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Refined Stats & Action Section */}
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-2xl font-light text-white group-hover:text-emerald-300 transition-colors duration-300">
                      {operation.stats}
                    </div>
                    <div className="flex items-center gap-1 text-emerald-400">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium">Live</span>
                    </div>
                  </div>

                  {/* Refined Action Button */}
                  <div
                    className="
                      relative overflow-hidden group/monitor
                      bg-gradient-to-r from-emerald-500/15 via-emerald-400/10 to-emerald-500/15
                      hover:from-emerald-500/25 hover:via-emerald-400/20 hover:to-emerald-500/25
                      text-emerald-300 hover:text-white
                      border border-emerald-500/30 hover:border-emerald-400/50
                      shadow-sm shadow-emerald-500/10 hover:shadow-lg hover:shadow-emerald-500/20
                      transition-all duration-300 ease-out
                      hover:scale-105 active:scale-95
                      flex items-center px-4 py-2 rounded-xl
                    "
                  >
                    <span className="relative z-10 text-sm font-medium">
                      Monitor
                    </span>
                  </div>
                </div>
              </div>

              {/* Subtle Floating Accents */}
              <div className="absolute bottom-3 right-3 w-8 h-8 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                <div className="w-full h-full border border-emerald-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  });

LiveOperationsSection.displayName = 'LiveOperationsSection';
