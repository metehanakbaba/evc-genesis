import type React from 'react';
import { memo, useState, useEffect } from 'react';
import RevolutionaryLoadingVisual from '../RevolutionaryLoadingVisual/RevolutionaryLoadingVisual';

/**
 * Loading phase type for progression tracking
 */
export type LoadingPhase = 0 | 1 | 2 | 3;

/**
 * Props for RevolutionaryLoader component
 */
export interface RevolutionaryLoaderProps {
  /** Enable debug mode to show additional information */
  debugMode?: boolean;
  /** Debug delay in milliseconds for testing */
  debugDelay?: number;
  /** Custom loading messages for each phase */
  loadingMessages?: [string, string, string, string];
  /** Animation speed multiplier */
  animationSpeed?: number;
  /** Optional CSS class name */
  className?: string;
}

/**
 * Default loading messages for each phase
 */
const DEFAULT_LOADING_MESSAGES: [string, string, string, string] = [
  'Initializing Revolutionary Experience',
  'Loading Ultra-Sophisticated Components',
  'Preparing Floating Animations',
  'Finalizing Modern Interface',
];

/**
 * Revolutionary Loading Component with enhanced visual and debugging animations
 * Features 4-phase progression, floating particles, and debug information
 */
const RevolutionaryLoader: React.FC<RevolutionaryLoaderProps> = ({
  debugMode = false,
  debugDelay = 2000,
  loadingMessages = DEFAULT_LOADING_MESSAGES,
  animationSpeed = 1,
  className = '',
}) => {
  const [loadingPhase, setLoadingPhase] = useState<LoadingPhase>(0);
  const [dots, setDots] = useState('');

  useEffect(() => {
    // Loading phase progression for visual feedback
    const phaseTimer = setInterval(() => {
      setLoadingPhase((prev) => ((prev + 1) % 4) as LoadingPhase);
    }, 500 / animationSpeed);

    // Animated dots for loading text
    const dotsTimer = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 400 / animationSpeed);

    return () => {
      clearInterval(phaseTimer);
      clearInterval(dotsTimer);
    };
  }, [animationSpeed]);

  const getLoadingMessage = (): string => {
    return loadingMessages[loadingPhase];
  };

  const getPhaseElements = () => {
    const elements = [
      {
        className:
          'absolute top-1/4 left-1/4 w-8 h-8 bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-full blur-sm transition-all duration-500',
        animation: 'animate-ping',
        condition: loadingPhase >= 1,
      },
      {
        className:
          'absolute bottom-1/4 right-1/4 w-6 h-6 bg-gradient-to-r from-yellow-500/30 to-orange-500/30 rounded-full blur-sm transition-all duration-500',
        animation: 'animate-pulse',
        condition: loadingPhase >= 2,
      },
      {
        className:
          'absolute top-2/3 left-2/3 w-4 h-4 bg-gradient-to-r from-red-500/30 to-pink-500/30 rounded-full blur-sm transition-all duration-500',
        animation: 'animate-bounce',
        condition: loadingPhase >= 3,
      },
    ];

    return elements;
  };

  return (
    <div
      className={`fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center z-50 ${className}`}
    >
      {/* Debug Mode Indicator */}
      {debugMode && (
        <div className="absolute top-4 left-4 bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 px-3 py-1 rounded-full text-xs font-mono">
          🔧 DEBUG MODE ACTIVE
        </div>
      )}

      {/* Enhanced Floating Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-96 h-96 border border-blue-500/10 rounded-full animate-pulse" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-cyan-500/10 rounded-full animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-purple-500/10 rounded-full animate-pulse delay-2000" />
        </div>
        <div
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl animate-bounce"
          style={{ animationDuration: `${3 / animationSpeed}s` }}
        />
        <div
          className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-bounce delay-1000"
          style={{ animationDuration: `${4 / animationSpeed}s` }}
        />
        <div className="absolute top-10 right-10 w-16 h-16 bg-gradient-to-r from-indigo-600/20 to-blue-600/20 rounded-full blur-2xl animate-float" />

        {/* Debug: Phase-based floating elements */}
        {getPhaseElements().map((element, index) => (
          <div
            key={index}
            className={`${element.className} ${element.condition ? `${element.animation} scale-100 opacity-100` : 'scale-0 opacity-0'}`}
          />
        ))}
      </div>

      {/* Main Content with Revolutionary Visual */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Revolutionary Loading Visual */}
        <RevolutionaryLoadingVisual
          size={128}
          animationSpeed={animationSpeed}
        />

        {/* Revolutionary Spinner with Progress Indication */}
        <div className="relative mb-6">
          <div className="w-20 h-20 border-4 border-gray-600/30 rounded-full relative">
            <div
              className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-cyan-500 rounded-full animate-spin"
              style={{ animationDuration: `${1 / animationSpeed}s` }}
            />
            <div
              className="absolute inset-2 border-2 border-transparent border-b-purple-500 border-l-pink-500 rounded-full animate-reverse"
              style={{ animationDuration: `${1.5 / animationSpeed}s` }}
            />

            {/* Progress ring */}
            <div
              className="absolute inset-1 border-2 border-transparent border-t-green-400 rounded-full transition-all duration-1000"
              style={{
                transform: `rotate(${loadingPhase * 90}deg)`,
                opacity: 0.6,
              }}
            />
          </div>
        </div>

        {/* Enhanced Loading Text with Debug Info */}
        <div className="text-center">
          <div className="text-white font-medium text-lg">
            {getLoadingMessage()}
            {dots}
          </div>
          <div className="text-gray-400 text-sm mt-2 animate-pulse">
            Phase {loadingPhase + 1}/4 • Revolutionary Design System
          </div>

          {/* Debug Progress Bar */}
          <div className="mt-4 w-64 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500 ease-out"
              style={{ width: `${(loadingPhase + 1) * 25}%` }}
            />
          </div>

          {/* Animation Debug Info */}
          <div className="mt-3 text-xs text-gray-500 font-mono">
            🎭 Loading Animations: Active • 🚀 Route Transition: Preparing
          </div>

          {debugMode && (
            <div className="mt-2 text-xs text-yellow-400 font-mono">
              ⏱️ Debug Delay: {debugDelay}ms • 🎯 Testing Revolutionary
              Transitions
            </div>
          )}
        </div>
      </div>

      {/* Revolutionary Loading Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/40 rounded-full animate-ping"
            style={{
              left: `${20 + i * 6}%`,
              top: `${30 + Math.sin(i) * 40}%`,
              animationDelay: `${i * 200}ms`,
              animationDuration: `${2 / animationSpeed}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(RevolutionaryLoader);
