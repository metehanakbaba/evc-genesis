import type React from 'react';
import { memo } from 'react';

/**
 * Props for RevolutionaryLoadingVisual component
 */
export interface RevolutionaryLoadingVisualProps {
  /** Size of the loading visual in pixels */
  size?: number;
  /** Optional CSS class name */
  className?: string;
  /** Animation speed multiplier */
  animationSpeed?: number;
}

/**
 * Revolutionary Loading Visual Component with SVG animations and geometric patterns
 * Features floating orbital elements, rotating rings, and power symbol
 */
const RevolutionaryLoadingVisual: React.FC<RevolutionaryLoadingVisualProps> = ({
  size = 128,
  className = '',
  animationSpeed = 1,
}) => {
  const containerSize = `${size}px`;
  const viewBoxSize = 128;
  const scale = size / viewBoxSize;

  return (
    <div
      className={`relative mb-8 ${className}`}
      style={{
        width: containerSize,
        height: containerSize,
      }}
    >
      {/* Main Revolutionary Logo/Visual */}
      <svg
        className="w-full h-full"
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Ring with Rotation */}
        <circle
          cx="64"
          cy="64"
          r="60"
          stroke="url(#gradient1)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="20 10"
          className="animate-spin"
          style={{ animationDuration: `${3 / animationSpeed}s` }}
        />

        {/* Middle Ring with Reverse Rotation */}
        <circle
          cx="64"
          cy="64"
          r="45"
          stroke="url(#gradient2)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="15 8"
          className="animate-reverse"
          style={{ animationDuration: `${1.5 / animationSpeed}s` }}
        />

        {/* Inner Geometric Pattern */}
        <g className="animate-pulse">
          <polygon
            points="64,20 85,45 85,83 64,108 43,83 43,45"
            fill="url(#gradient3)"
            fillOpacity="0.1"
            stroke="url(#gradient3)"
            strokeWidth="1"
          />
          <polygon
            points="64,30 75,50 75,78 64,98 53,78 53,50"
            fill="url(#gradient4)"
            fillOpacity="0.2"
            stroke="url(#gradient4)"
            strokeWidth="1"
          />
        </g>

        {/* Central Power Symbol */}
        <g className="animate-revolutionary-pulse">
          {/* Lightning/Power Symbol */}
          <path
            d="M58 45 L70 45 L62 60 L68 60 L56 83 L64 68 L58 68 L66 53 L58 53 Z"
            fill="url(#gradient5)"
            className="drop-shadow-lg"
          />

          {/* Central Dot */}
          <circle
            cx="64"
            cy="64"
            r="3"
            fill="url(#gradient6)"
            className="animate-ping"
          />
        </g>

        {/* Floating Orbital Elements */}
        <g
          className="animate-revolutionary-float"
          style={{ animationDuration: `${3 / animationSpeed}s` }}
        >
          <circle cx="64" cy="25" r="2" fill="#3B82F6" opacity="0.8" />
          <circle cx="99" cy="64" r="1.5" fill="#8B5CF6" opacity="0.6" />
          <circle cx="64" cy="103" r="2" fill="#06B6D4" opacity="0.7" />
          <circle cx="29" cy="64" r="1.5" fill="#EC4899" opacity="0.5" />
        </g>

        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.5" />
          </linearGradient>

          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.3" />
          </linearGradient>

          <radialGradient id="gradient5" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0.5" />
          </radialGradient>

          <radialGradient id="gradient6" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.8" />
          </radialGradient>
        </defs>
      </svg>

      {/* Floating Accent Elements Around Logo */}
      <div
        className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-bounce opacity-80"
        style={{
          width: `${4 * scale}px`,
          height: `${4 * scale}px`,
          animationDuration: `${1 / animationSpeed}s`,
        }}
      />
      <div
        className="absolute -bottom-2 -left-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce opacity-70"
        style={{
          width: `${3 * scale}px`,
          height: `${3 * scale}px`,
          animationDuration: `${1 / animationSpeed}s`,
          animationDelay: '0.5s',
        }}
      />
      <div
        className="absolute top-1/2 -left-3 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full animate-ping opacity-60"
        style={{
          width: `${2 * scale}px`,
          height: `${2 * scale}px`,
          animationDelay: '1s',
        }}
      />
      <div
        className="absolute top-1/2 -right-3 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full animate-ping opacity-60"
        style={{
          width: `${2 * scale}px`,
          height: `${2 * scale}px`,
          animationDelay: '1.5s',
        }}
      />
    </div>
  );
};

export default memo(RevolutionaryLoadingVisual);
