import type React from 'react';
import { memo } from 'react';
import type { AnimatedBackgroundProps } from '../types/auth.types';

/**
 * Animated background with floating orbs and grid pattern
 */
const AnimatedBackground: React.FC<AnimatedBackgroundProps> = memo(
  ({ isVisible }) => (
    <div className="absolute inset-0">
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-600/20 rounded-full blur-3xl animate-pulse delay-500" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  ),
);

AnimatedBackground.displayName = 'AnimatedBackground';

export default AnimatedBackground;
