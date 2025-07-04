'use client';

import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import type { DeveloperTool } from '../hooks/useDashboardData';

interface DeveloperToolsSectionProps {
  readonly developerTools: readonly DeveloperTool[];
  readonly isDeveloperMode: boolean;
}

/**
 * Developer Tools section - only visible in dev mode - REVOLUTIONARY VERSION
 */
export const DeveloperToolsSection: React.FC<DeveloperToolsSectionProps> =
  React.memo(({ developerTools, isDeveloperMode }) => {
    const router = useRouter();

    const handleToolClick = useCallback(
      (path: string) => {
        router.push(path);
      },
      [router],
    );

    if (!isDeveloperMode) return null;

    return (
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-8 bg-gradient-to-b from-amber-400 to-orange-400 rounded-full" />
            <div>
              <h2 className="text-lg font-semibold text-white">
                Developer Tools
              </h2>
              <p className="text-gray-400 text-sm">
                Development utilities & documentation
              </p>
            </div>
          </div>

          <div className="px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs rounded-full">
            DEV MODE
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {developerTools.map((tool, index) => (
            <div
              key={tool.path}
              style={{ animationDelay: `${index * 100}ms` }}
              className="group relative cursor-pointer transform translate-y-4 opacity-0 animate-slide-in-up hover:scale-105 transition-all duration-500"
              onClick={() => handleToolClick(tool.path)}
            >
              {/* Subtle glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-gray-700/20 to-gray-600/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />

              <div className="relative p-6 bg-gray-800/60 border border-gray-700/50 rounded-2xl hover:bg-gray-700/60 hover:border-gray-600/50 backdrop-blur-xl transition-all duration-500">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-700/50 to-gray-600/50 border border-gray-600/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <tool.icon className="w-5 h-5 text-gray-300" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white group-hover:text-blue-200 transition-colors">
                      {tool.title}
                    </h3>
                    {tool.badge && (
                      <span className="inline-block mt-1 px-1.5 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded">
                        {tool.badge}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                  {tool.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  });

DeveloperToolsSection.displayName = 'DeveloperToolsSection';
