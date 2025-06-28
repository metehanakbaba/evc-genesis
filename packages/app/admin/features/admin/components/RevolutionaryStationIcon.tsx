import React from 'react';

interface RevolutionaryStationIconProps {
  readonly className?: string;
}

/**
 * Revolutionary charging station icon with advanced SVG animations
 */
export const RevolutionaryStationIcon: React.FC<RevolutionaryStationIconProps> =
  React.memo(({ className }) => (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 74 69"
      fill="none"
    >
      <defs>
        <linearGradient
          id="dashboardStationGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" className="stop-color-blue-400" />
          <stop offset="50%" className="stop-color-cyan-400" />
          <stop offset="100%" className="stop-color-teal-400" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g transform="translate(-12, -16)" filter="url(#glow)">
        <path
          d="M74.49,82h-61a1.5,1.5,0,1,0,0,3h61a1.5,1.5,0,1,0,0-3Z"
          fill="url(#dashboardStationGradient)"
        />
        <path
          d="M84.48,82h-2a1.5,1.5,0,0,0,0,3h2a1.5,1.5,0,1,0,0-3Z"
          fill="url(#dashboardStationGradient)"
        />
        <path
          d="M68,77a2,2,0,0,0-2-2H24a2,2,0,0,0-2,2v3H68Z"
          fill="url(#dashboardStationGradient)"
        />
        <path
          d="M74,60.3v4.2a1.5,1.5,0,0,1-3,0V55a2,2,0,0,0-2-2H65V21a5,5,0,0,0-5-5H30a5,5,0,0,0-5,5V73H65V56h3v8.5a4.5,4.5,0,0,0,9,0V36H74ZM60,47H30V24a3,3,0,0,1,3-3H57a3,3,0,0,1,3,3Z"
          fill="url(#dashboardStationGradient)"
        />
        <path
          d="M82,31V23H80V17.5a1.5,1.5,0,0,0-3,0V23H74V17.5a1.5,1.5,0,0,0-3,0V23H69v8a3,3,0,0,0,3,3h7A3,3,0,0,0,82,31Z"
          fill="url(#dashboardStationGradient)"
        />
        <path
          d="M45,23A11,11,0,1,0,56,34,11,11,0,0,0,45,23ZM42.6,42l1.2-6.5H40.9L47.4,27l-1.2,6.5h2.9Z"
          fill="url(#dashboardStationGradient)"
          className="animate-pulse"
        />
      </g>
      <style>{`
      .stop-color-blue-400 { stop-color: rgb(96 165 250); }
      .stop-color-cyan-400 { stop-color: rgb(34 211 238); }
      .stop-color-teal-400 { stop-color: rgb(45 212 191); }
    `}</style>
    </svg>
  ));

RevolutionaryStationIcon.displayName = 'RevolutionaryStationIcon';
