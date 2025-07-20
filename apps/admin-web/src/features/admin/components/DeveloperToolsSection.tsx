'use client';

import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import type { DeveloperTool } from '../hooks/useDashboardData';

interface DeveloperToolsSectionProps {
  readonly developerTools: readonly DeveloperTool[];
  readonly isDeveloperMode: boolean;
}

/**
 * Revolutionary Developer Tools Section - SessionsPage-inspired Live Design
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {developerTools.map((tool, index) => (
          <div
            key={tool.path}
            className="group relative"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            {/* Subtle Floating Tool Card */}
            <div
              className="relative p-6 bg-gradient-to-br from-gray-800/40 via-gray-700/30 to-gray-800/20 border border-purple-600/25 rounded-2xl backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.005] hover:-translate-y-0.5 cursor-pointer h-full"
              onClick={() => handleToolClick(tool.path)}
            >
              {/* Subtle Live Pulse Indicator for AI Tools */}
              {tool.badge === 'AI' && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse opacity-60"></div>
              )}

              {/* Subtle Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

              <div className="flex items-start gap-4 relative z-10">
                {/* Refined Icon Container */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                  tool.variant === 'purple' 
                    ? 'from-purple-500/20 to-purple-400/10 border-purple-400/25' 
                    : 'from-cyan-500/20 to-cyan-400/10 border-cyan-400/25'
                } border flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                  <tool.icon className={`w-6 h-6 ${
                    tool.variant === 'purple' ? 'text-purple-400' : 'text-cyan-400'
                  }`} />
                  
                  {/* AI Badge gets extra subtle glow */}
                  {tool.badge === 'AI' && (
                    <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  {/* Title with Subtle Hover Effect */}
                  <h3 className={`text-lg font-medium text-white group-hover:${
                    tool.variant === 'purple' ? 'text-purple-300' : 'text-cyan-300'
                  } transition-colors duration-300 mb-2`}>
                    {tool.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300 mb-4">
                    {tool.description}
                  </p>
                  
                  {/* Refined Badge & Action Section */}
                  <div className="flex items-center justify-between mt-auto">
                    <span className={`px-3 py-1 bg-gradient-to-r ${
                      tool.variant === 'purple' 
                        ? 'from-purple-500/20 to-purple-400/10 border-purple-400/30 text-purple-300'
                        : 'from-cyan-500/20 to-cyan-400/10 border-cyan-400/30 text-cyan-300'
                    } border rounded-full text-xs font-medium backdrop-blur-sm`}>
                      {tool.badge}
                    </span>
                    
                    {/* Subtle Action Indicator */}
                    <div className={`text-xs ${
                      tool.variant === 'purple' ? 'text-purple-500' : 'text-cyan-500'
                    } group-hover:${
                      tool.variant === 'purple' ? 'text-purple-400' : 'text-cyan-400'
                    } transition-colors duration-300 flex items-center gap-1`}>
                      <span>Open</span>
                      <div className={`w-1 h-1 ${
                        tool.variant === 'purple' ? 'bg-purple-400' : 'bg-cyan-400'
                      } rounded-full animate-pulse`}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subtle Floating Accents */}
              <div className="absolute bottom-3 right-3 w-8 h-8 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                <div className={`w-full h-full border ${
                  tool.variant === 'purple' ? 'border-purple-400' : 'border-cyan-400'
                } rounded-full animate-pulse`}></div>
              </div>

              {/* Special AI Sparkle Effect */}
              {tool.badge === 'AI' && (
                <div className="absolute top-3 left-3 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-40"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  });

DeveloperToolsSection.displayName = 'DeveloperToolsSection';
