import type React from 'react';
import { memo, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Transition phase types
 */
export type TransitionPhase = 'enter' | 'exit';

/**
 * Props for RouteTransition component
 */
export interface RouteTransitionProps {
  /** Children to render with transition effects */
  children: React.ReactNode;
  /** Enable debug mode to show transition indicators */
  debugMode?: boolean;
  /** Animation speed multiplier */
  animationSpeed?: number;
  /** Exit animation duration in milliseconds */
  exitDuration?: number;
  /** Enter animation delay in milliseconds */
  enterDelay?: number;
  /** Optional CSS class name */
  className?: string;
}

/**
 * Revolutionary animated route wrapper with spectacular exit animations
 * Features multi-axis transforms, blur effects, floating elements, and particles
 */
const RouteTransition: React.FC<RouteTransitionProps> = ({
  children,
  debugMode = false,
  animationSpeed = 1,
  exitDuration = 400,
  enterDelay = 50,
  className = '',
}) => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [displayPath, setDisplayPath] = useState(pathname);
  const [transitionPhase, setTransitionPhase] =
    useState<TransitionPhase>('enter');
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (debugMode) {
      console.log('🎭 Route Transition Debug:', {
        from: displayPath,
        to: pathname,
        phase: 'exit-start',
      });
    }

    // Spectacular exit animation sequence
    setTransitionPhase('exit');
    setIsExiting(true);
    setIsVisible(false);

    // Longer exit animation for spectacular effect
    const timer = setTimeout(() => {
      setDisplayPath(pathname);
      setIsExiting(false);
      setTransitionPhase('enter');

      if (debugMode) {
        console.log('🚀 Route Transition Debug:', {
          route: pathname,
          phase: 'enter-start',
        });
      }

      // Smooth enter animation
      setTimeout(() => {
        setIsVisible(true);
        if (debugMode) {
          console.log('✨ Route Transition Debug:', {
            route: pathname,
            phase: 'enter-complete',
          });
        }
      }, enterDelay / animationSpeed);
    }, exitDuration / animationSpeed);

    return () => clearTimeout(timer);
  }, [pathname, debugMode, animationSpeed, exitDuration, enterDelay]);

  useEffect(() => {
    // Initial enter animation
    setIsVisible(true);
    setTransitionPhase('enter');
  }, []);

  const getTransformStyle = () => {
    if (isVisible) {
      return 'translateY(0) translateX(0) scale(1) rotateY(0deg)';
    } else if (isExiting) {
      return 'translateY(-30px) translateX(-50px) scale(0.85) rotateY(-8deg)';
    } else {
      return 'translateY(25px) translateX(15px) scale(0.95) rotateY(4deg)';
    }
  };

  const getFilterStyle = () => {
    if (isVisible) {
      return 'blur(0px) brightness(1) saturate(1)';
    } else if (isExiting) {
      return 'blur(12px) brightness(0.6) saturate(0.7)';
    } else {
      return 'blur(6px) brightness(0.9) saturate(1.1)';
    }
  };

  const getContainerTransform = () => {
    return isExiting
      ? 'perspective(1000px) rotateX(5deg) scale(0.9)'
      : 'perspective(1000px) rotateX(0deg) scale(1)';
  };

  const getOpacity = () => {
    if (isVisible) return 1;
    if (isExiting) return 0.2;
    return 0;
  };

  const getBackgroundElementStyle = (
    baseTransform: string,
    exitTransform: string,
    enterTransform: string,
  ) => {
    if (isVisible) {
      return { transform: baseTransform, opacity: 1 };
    } else if (isExiting) {
      return { transform: exitTransform, opacity: 0.3 };
    } else {
      return { transform: enterTransform, opacity: 0 };
    }
  };

  const getAccentElementStyle = (
    baseTransform: string,
    exitTransform: string,
    enterTransform: string,
    baseOpacity: number,
    exitOpacity: number,
  ) => {
    if (isVisible) {
      return { transform: baseTransform, opacity: baseOpacity };
    } else if (isExiting) {
      return { transform: exitTransform, opacity: exitOpacity };
    } else {
      return { transform: enterTransform, opacity: 0 };
    }
  };

  return (
    <div className={`relative min-h-screen overflow-hidden ${className}`}>
      {/* Debug Transition Indicator */}
      {debugMode && (
        <div className="fixed top-4 right-4 z-50 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-mono border border-gray-600/50">
          🎭 {transitionPhase.toUpperCase()} • {displayPath}
        </div>
      )}

      {/* Revolutionary Background Elements with Exit Animations */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Spectacular Animated Gradient Orbs */}
        <div
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-600/15 to-cyan-600/15 rounded-full blur-3xl transition-all duration-500 ease-in-out"
          style={getBackgroundElementStyle(
            'translateY(0) translateX(0) scale(1) rotate(0deg)',
            'translateY(-40px) translateX(-60px) scale(1.5) rotate(-45deg)',
            'translateY(20px) translateX(20px) scale(0.8) rotate(15deg)',
          )}
        />
        <div
          className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-purple-600/15 to-pink-600/15 rounded-full blur-3xl transition-all duration-500 ease-in-out delay-100"
          style={getBackgroundElementStyle(
            'translateY(0) translateX(0) scale(1) rotate(0deg)',
            'translateY(50px) translateX(70px) scale(1.4) rotate(90deg)',
            'translateY(-15px) translateX(-15px) scale(0.9) rotate(-10deg)',
          )}
        />
        <div
          className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-r from-indigo-600/15 to-blue-600/15 rounded-full blur-2xl transition-all duration-500 ease-in-out delay-200"
          style={getBackgroundElementStyle(
            'translateX(0) translateY(0) scale(1) rotate(0deg)',
            'translateX(80px) translateY(-30px) scale(1.6) rotate(135deg)',
            'translateX(-12px) translateY(8px) scale(0.85) rotate(-20deg)',
          )}
        />

        {/* Revolutionary Exit Particles */}
        {isExiting && (
          <>
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-blue-400/60 to-cyan-400/60 rounded-full transition-all duration-500"
                style={{
                  left: `${30 + i * 8}%`,
                  top: `${40 + Math.sin(i) * 20}%`,
                  transform: `translateX(${i * 15}px) translateY(${-i * 10}px) scale(${1 + i * 0.1})`,
                  opacity: 0.8 - i * 0.1,
                  animationDelay: `${i * 50}ms`,
                }}
              />
            ))}
          </>
        )}
      </div>

      {/* Spectacular Revolutionary Page Transition */}
      <div
        className="relative z-10 transition-all duration-400 ease-in-out"
        style={{
          transform: getTransformStyle(),
          opacity: getOpacity(),
        }}
        key={displayPath}
      >
        {/* Synchronized Spectacular Page Container */}
        <div
          className="relative min-h-screen transition-all duration-400 ease-in-out"
          style={{
            filter: getFilterStyle(),
            transform: getContainerTransform(),
          }}
        >
          {children}
        </div>
      </div>

      {/* Spectacular Revolutionary Floating Accent Elements */}
      <div className="fixed inset-0 pointer-events-none z-20">
        <div
          className="absolute top-10 right-10 w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-400 ease-in-out shadow-lg shadow-blue-500/50"
          style={getAccentElementStyle(
            'scale(1) rotate(0deg) translateX(0) translateY(0)',
            'scale(2) rotate(180deg) translateX(40px) translateY(-20px)',
            'scale(0) rotate(-90deg) translateX(-10px) translateY(5px)',
            0.8,
            0.3,
          )}
        />
        <div
          className="absolute bottom-10 left-10 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-400 ease-in-out delay-100 shadow-lg shadow-purple-500/50"
          style={getAccentElementStyle(
            'scale(1) rotate(0deg) translateX(0) translateY(0)',
            'scale(1.8) rotate(-270deg) translateX(-50px) translateY(30px)',
            'scale(0) rotate(120deg) translateX(8px) translateY(-8px)',
            0.6,
            0.4,
          )}
        />
        <div
          className="absolute top-1/2 left-10 w-2 h-2 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full transition-all duration-400 ease-in-out delay-200 shadow-lg shadow-indigo-500/50"
          style={getAccentElementStyle(
            'scale(1) rotate(0deg) translateX(0) translateY(0)',
            'scale(1.5) rotate(360deg) translateX(-30px) translateY(-40px)',
            'scale(0) rotate(-45deg) translateX(5px) translateY(-3px)',
            0.7,
            0.2,
          )}
        />

        {/* Revolutionary Exit Trail Effect */}
        {isExiting && (
          <div className="absolute inset-0">
            <div
              className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent transform -translate-y-1/2 transition-all duration-400"
              style={{
                transform: 'translateY(-50%) scaleX(1) translateX(0)',
                animation: 'slideOut 400ms ease-in-out forwards',
              }}
            />
            <div
              className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent transform translate-y-4 transition-all duration-400 delay-100"
              style={{
                animation: 'slideOut 400ms ease-in-out forwards 100ms',
              }}
            />
          </div>
        )}
      </div>

      {/* Revolutionary Exit Overlay */}
      {isExiting && (
        <div
          className="fixed inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 transition-opacity duration-400 z-5"
          style={{ opacity: 0.6 }}
        />
      )}
    </div>
  );
};

export default memo(RouteTransition);
