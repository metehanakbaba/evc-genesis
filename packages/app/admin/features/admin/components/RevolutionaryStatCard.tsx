import React from 'react';
import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface RevolutionaryStatCardProps {
  readonly title: string;
  readonly value: string;
  readonly icon: IconComponent;
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
    ({ title, value, icon: Icon, trend, description, gradient, glowColor }) => (
      <div className="group relative">
        {/* Floating background glow */}
        <div
          className={`absolute -inset-4 bg-gradient-to-r ${gradient} rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-700`}
        />

        {/* Main card */}
        <div
          className={`relative p-8 bg-gradient-to-br ${gradient} backdrop-blur-xl border border-white/10 rounded-3xl hover:border-white/20 transition-all duration-700 ease-out transform hover:scale-105 hover:-translate-y-3 shadow-2xl hover:shadow-4xl`}
        >
          {/* Floating accent orb */}
          <div
            className={`absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-${glowColor}-400 to-${glowColor}-500 rounded-full animate-pulse opacity-80 blur-sm`}
          />
          <div
            className={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-${glowColor}-300 to-${glowColor}-400 rounded-full animate-ping`}
          />

          {/* Icon container with revolutionary glow */}
          <div className="flex items-start justify-between mb-6">
            <div
              className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br from-${glowColor}-500/30 to-${glowColor}-400/20 border border-${glowColor}-400/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}
            >
              <Icon
                className={`w-8 h-8 text-${glowColor}-300 drop-shadow-lg`}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-r from-${glowColor}-400/20 to-transparent rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
            </div>

            {/* Trend indicator */}
            <div className="text-right transform group-hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium mb-1">
                <ArrowTrendingUpIcon className="w-4 h-4 animate-bounce" />
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
            <div
              className={`w-full h-full border border-${glowColor}-400 rounded-full animate-pulse`}
            />
            <div
              className={`absolute inset-2 border border-${glowColor}-300 rounded-full animate-pulse delay-300`}
            />
          </div>
        </div>
      </div>
    ),
  );

RevolutionaryStatCard.displayName = 'RevolutionaryStatCard';
