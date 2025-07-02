'use client';

import React from 'react';
import { BoltIcon } from '@heroicons/react/24/outline';

interface RevolutionaryStationIconProps {
  className?: string;
  glowing?: boolean;
}

/**
 * Revolutionary charging station icon with advanced effects
 */
export const RevolutionaryStationIcon: React.FC<RevolutionaryStationIconProps> = React.memo(({
  className = "w-6 h-6",
  glowing = false,
}) => (
  <div className="relative">
    {/* Main icon using BoltIcon for professional appearance */}
    <BoltIcon 
      className={`${className} text-current ${glowing ? 'animate-pulse' : ''}`}
    />
    
    {/* Glow effect */}
    {glowing && (
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-md animate-ping" />
    )}
  </div>
));

RevolutionaryStationIcon.displayName = 'RevolutionaryStationIcon';
