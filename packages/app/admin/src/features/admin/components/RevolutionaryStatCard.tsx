'use client';

import React from 'react';

interface RevolutionaryStatCardProps {
  readonly title: string;
  readonly value: string;
  readonly icon: string;
  readonly variant: 'blue' | 'emerald' | 'purple' | 'teal';
  readonly trend: string;
  readonly description: string;
  readonly gradient: string;
  readonly glowColor: string;
}

/**
 * Revolutionary stat card with advanced glassmorphism and animations
 */
export const RevolutionaryStatCard: React.FC<RevolutionaryStatCardProps> =
  React.memo(
    ({ title, value, icon, trend, description, gradient, glowColor, variant }) => {
      const glowColorMap = {
        blue: 'blue',
        emerald: 'emerald', 
        purple: 'purple',
        teal: 'teal'
      };
      
      const actualGlowColor = glowColorMap[variant];
      
      return (
        <div className="group relative">
          {/* Floating background glow */}
          <div
            className={`absolute -inset-4 bg-gradient-to-r ${gradient} rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-700`}
          />

          {/* Main card */}
          <div
            className={`relative p-8 bg-gradient-to-br ${gradient} backdrop-blur-xl border border-white/10 rounded-3xl hover:border-white/20 transition-all duration-700 ease-out transform hover:scale-105 hover:-translate-y-3 shadow-2xl hover:shadow-4xl`}
          >
            {/* Floating accent orbs */}
            <div className={`absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r ${
              variant === 'blue' ? 'from-blue-400 to-blue-500' :
              variant === 'emerald' ? 'from-emerald-400 to-emerald-500' :
              variant === 'purple' ? 'from-purple-400 to-purple-500' :
              'from-teal-400 to-teal-500'
            } rounded-full animate-pulse opacity-80 blur-sm`} />
            
            <div className={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r ${
              variant === 'blue' ? 'from-blue-300 to-blue-400' :
              variant === 'emerald' ? 'from-emerald-300 to-emerald-400' :
              variant === 'purple' ? 'from-purple-300 to-purple-400' :
              'from-teal-300 to-teal-400'
            } rounded-full animate-ping`} />

            {/* Icon container with revolutionary glow */}
            <div className="flex items-start justify-between mb-6">
              <div className={`relative w-16 h-16 rounded-2xl ${
                variant === 'blue' ? 'bg-gradient-to-br from-blue-500/30 to-blue-400/20 border-blue-400/40' :
                variant === 'emerald' ? 'bg-gradient-to-br from-emerald-500/30 to-emerald-400/20 border-emerald-400/40' :
                variant === 'purple' ? 'bg-gradient-to-br from-purple-500/30 to-purple-400/20 border-purple-400/40' :
                'bg-gradient-to-br from-teal-500/30 to-teal-400/20 border-teal-400/40'
              } border flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                <span className={`text-2xl ${
                  variant === 'blue' ? 'text-blue-300' :
                  variant === 'emerald' ? 'text-emerald-300' :
                  variant === 'purple' ? 'text-purple-300' :
                  'text-teal-300'
                } drop-shadow-lg`}>
                  {icon}
                </span>
                
                <div className={`absolute inset-0 ${
                  variant === 'blue' ? 'bg-gradient-to-r from-blue-400/20' :
                  variant === 'emerald' ? 'bg-gradient-to-r from-emerald-400/20' :
                  variant === 'purple' ? 'bg-gradient-to-r from-purple-400/20' :
                  'bg-gradient-to-r from-teal-400/20'
                } to-transparent rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              </div>

              {/* Trend indicator */}
              <div className="text-right transform group-hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium mb-1">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                  <span>Live</span>
                </div>
                <div className="text-xs text-gray-400">{trend}</div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">{value}</div>
              <div className="text-sm font-medium text-gray-300">{title}</div>
              <div className="overflow-hidden">
                <p className="text-xs text-gray-400 leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  {description}
                </p>
              </div>
            </div>

            {/* Floating geometric decoration */}
            <div className="absolute bottom-4 right-4 w-20 h-20 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
              <div className={`w-full h-full border ${
                variant === 'blue' ? 'border-blue-400' :
                variant === 'emerald' ? 'border-emerald-400' :
                variant === 'purple' ? 'border-purple-400' :
                'border-teal-400'
              } rounded-full animate-pulse`} />
              <div className={`absolute inset-2 border ${
                variant === 'blue' ? 'border-blue-300' :
                variant === 'emerald' ? 'border-emerald-300' :
                variant === 'purple' ? 'border-purple-300' :
                'border-teal-300'
              } rounded-full animate-pulse delay-300`} />
            </div>
          </div>
        </div>
      );
    },
  );

RevolutionaryStatCard.displayName = 'RevolutionaryStatCard';
