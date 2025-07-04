'use client';

import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import type { ActiveOperation } from '../hooks/useDashboardData';

interface LiveOperationsSectionProps {
  readonly activeOperations: readonly ActiveOperation[];
}

/**
 * Live Operations monitoring section with real-time indicators - REVOLUTIONARY VERSION
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
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-3 h-8 bg-gradient-to-b from-emerald-400 to-green-400 rounded-full animate-pulse" />
          <div>
            <h2 className="text-xl font-bold text-white">Live Operations</h2>
            <p className="text-gray-400">Critical real-time monitoring</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {activeOperations.map((operation) => (
            <div
              key={operation.path}
              className="group relative cursor-pointer transform hover:scale-[1.02] transition-all duration-700"
              onClick={() => handleOperationClick(operation.path)}
            >
              {/* Background glow */}
              <div
                className={`absolute -inset-4 bg-gradient-to-r ${operation.gradient} rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-700`}
              />

              {/* Main container */}
              <div
                className={`relative p-8 bg-gradient-to-r ${operation.gradient} border border-emerald-400/30 rounded-3xl hover:border-emerald-300/50 backdrop-blur-xl shadow-2xl hover:shadow-4xl hover:-translate-y-2 transition-all duration-700`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    {/* Icon */}
                    <div className="relative w-18 h-18 rounded-3xl bg-gradient-to-br from-emerald-500/30 to-green-400/20 border border-emerald-400/40 flex items-center justify-center">
                      <operation.icon className="w-10 h-10 text-emerald-300 drop-shadow-lg" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-white">
                          {operation.title}
                        </h3>
                        <span className="px-2 py-1 bg-gradient-to-r from-emerald-500/30 to-green-400/30 border border-emerald-400/40 rounded-full text-xs text-emerald-300 backdrop-blur-sm">
                          {operation.badge}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {operation.description}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="text-right transform group-hover:scale-110 transition-transform duration-500">
                    <div className="text-2xl font-bold text-emerald-300 mb-1">
                      {operation.stats}
                    </div>
                    <div className="flex items-center gap-1 text-emerald-400">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                      <span className="text-xs">Updating now</span>
                    </div>
                  </div>
                </div>

                {/* Floating accents */}
                <div className="absolute top-3 right-3 w-6 h-6 bg-emerald-400 rounded-full animate-ping opacity-50" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  });

LiveOperationsSection.displayName = 'LiveOperationsSection';
