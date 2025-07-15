'use client';

import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import type { CoreManagementItem } from '../hooks/useDashboardData';

interface CoreManagementSectionProps {
  readonly coreManagement: readonly CoreManagementItem[];
}

/**
 * Core Management modules section with floating cards - REVOLUTIONARY VERSION
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

    return (
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 grid-align-stretch">
        {coreManagement.map((module, index) => (
          <div
            key={module.path}
            style={{ animationDelay: `${index * 200}ms` }}
            className="group relative cursor-pointer transform translate-y-8 opacity-0 animate-slide-in-up hover:scale-105 hover:-translate-y-4 transition-all duration-700 h-full"
            onClick={() => handleModuleClick(module.path)}
          >
            {/* Background glow */}
            <div
              className={`absolute -inset-6 bg-gradient-to-r ${module.gradient} rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-700`}
            />

            {/* Main container with fixed height */}
            <div
              className={`relative h-full min-h-[320px] p-8 bg-gradient-to-br ${module.gradient} border border-white/10 rounded-3xl hover:border-white/20 backdrop-blur-xl shadow-2xl hover:shadow-4xl transition-all duration-700 flex flex-col overflow-hidden`}
            >
              {/* Header section */}
              <div className="flex items-start justify-between mb-6 flex-shrink-0">
                {/* Icon */}
                <div
                  className={`relative w-16 h-16 rounded-3xl ${
                    module.variant === 'blue'
                      ? 'bg-gradient-to-br from-blue-500/30 to-blue-400/20 border border-blue-400/40'
                      : module.variant === 'purple'
                        ? 'bg-gradient-to-br from-purple-500/30 to-purple-400/20 border border-purple-400/40'
                        : 'bg-gradient-to-br from-teal-500/30 to-teal-400/20 border border-teal-400/40'
                  } flex items-center justify-center group-hover:scale-110 transition-transform duration-500 flex-shrink-0`}
                >
                  <module.icon
                    className={`w-8 h-8 ${
                      module.variant === 'blue'
                        ? 'text-blue-300'
                        : module.variant === 'purple'
                          ? 'text-purple-300'
                          : 'text-teal-300'
                    } drop-shadow-lg`}
                  />
                  <div
                    className={`absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r ${
                      module.variant === 'blue'
                        ? 'from-blue-400 to-blue-500'
                        : module.variant === 'purple'
                          ? 'from-purple-400 to-purple-500'
                          : 'from-teal-400 to-teal-500'
                    } rounded-full animate-ping`}
                  />
                </div>

                {/* Stats */}
                <div className="text-right transform group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                  <div className="text-sm text-gray-400 mb-1 text-truncate-title">
                    Current Volume
                  </div>
                  <div
                    className={`text-xl font-bold mb-2 text-truncate-title ${
                      module.variant === 'blue'
                        ? 'text-blue-300'
                        : module.variant === 'purple'
                          ? 'text-purple-300'
                          : 'text-teal-300'
                    }`}
                  >
                    {module.stats}
                  </div>
                  <span
                    className={`px-3 py-1 bg-gradient-to-r border rounded-full text-xs backdrop-blur-sm whitespace-nowrap ${
                      module.variant === 'blue'
                        ? 'from-blue-500/20 to-blue-400/20 border-blue-400/30 text-blue-300'
                        : module.variant === 'purple'
                          ? 'from-purple-500/20 to-purple-400/20 border-purple-400/30 text-purple-300'
                          : 'from-teal-500/20 to-teal-400/20 border-teal-400/30 text-teal-300'
                    }`}
                  >
                    {module.badge}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col min-h-0">
                <h3 className="text-xl font-bold text-white group-hover:text-blue-100 transition-colors duration-300 mb-3 text-truncate-title">
                  {module.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300 text-truncate-multi flex-1">
                  {module.description}
                </p>
              </div>

              {/* Decorations */}
              <div className="absolute bottom-6 right-6 w-20 h-20 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <div
                  className={`w-full h-full border rounded-full animate-pulse ${
                    module.variant === 'blue'
                      ? 'border-blue-400'
                      : module.variant === 'purple'
                        ? 'border-purple-400'
                        : 'border-teal-400'
                  }`}
                />
                <div
                  className={`absolute inset-3 border rounded-full animate-pulse delay-300 ${
                    module.variant === 'blue'
                      ? 'border-blue-300'
                      : module.variant === 'purple'
                        ? 'border-purple-300'
                        : 'border-teal-300'
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </section>
    );
  });

CoreManagementSection.displayName = 'CoreManagementSection';
