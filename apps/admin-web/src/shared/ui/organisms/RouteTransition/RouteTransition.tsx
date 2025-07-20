'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { cn } from '../../utils';
import { BackgroundEffects } from '../../molecules/BackgroundEffects';
import { FloatingAccents } from '../../molecules/FloatingAccents';
import { AccentDot } from '../../atoms/AccentDot';
import type { TransitionOrganismProps } from '../types';

/**
 * Transition phase types
 */
export type TransitionPhase = 'enter' | 'exit';

/**
 * RouteTransition Component Props
 * 
 * Organism component that decomposes the existing RouteTransition into atomic parts
 * and composes them using BackgroundEffects, FloatingAccents, and transition logic.
 * Maintains identical animation behavior and timing to the original.
 */
export interface RouteTransitionProps extends TransitionOrganismProps {
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
}

/**
 * RouteTransition - Organism component for revolutionary page transitions
 * 
 * Decomposes the existing monolithic RouteTransition into atomic components
 * while maintaining exact visual parity and animation behavior. Uses
 * BackgroundEffects and FloatingAccents molecules with coordinated timing.
 * 
 * Features:
 * - Multi-axis transforms with perspective effects
 * - Blur and brightness filters during transitions
 * - Floating background orbs with exit animations
 * - Coordinated accent elements with synchronized timing
 * - Exit particles and trail effects
 * - Debug mode for development
 * 
 * @example
 * ```tsx
 * <RouteTransition
 *   debugMode={false}
 *   animationSpeed={1}
 *   exitDuration={400}
 *   enterDelay={50}
 * >
 *   <YourPageContent />
 * </RouteTransition>
 * ```
 */
export const RouteTransition: React.FC<RouteTransitionProps> = ({
  children,
  debugMode = false,
  animationSpeed = 1,
  exitDuration = 400,
  enterDelay = 50,
  className,
  'data-testid': testId = 'route-transition',
  ...props
}) => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [displayPath, setDisplayPath] = useState(pathname);
  const [transitionPhase, setTransitionPhase] = useState<TransitionPhase>('enter');
  const [isExiting, setIsExiting] = useState(false);

  // Main transition effect - identical to original
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

  // Initial enter animation
  useEffect(() => {
    setIsVisible(true);
    setTransitionPhase('enter');
  }, []);

  // Transform calculations - identical to original
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

  // Build container classes
  const containerClasses = cn(
    'relative min-h-screen overflow-hidden',
    className
  );

  return (
    <div
      className={containerClasses}
      data-testid={testId}
      data-phase={transitionPhase}
      data-exiting={isExiting}
      data-visible={isVisible}
      {...props}
    >
      {/* Debug Transition Indicator - identical to original */}
      {debugMode && (
        <div className="fixed top-4 right-4 z-50 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-mono border border-gray-600/50">
          🎭 {transitionPhase.toUpperCase()} • {displayPath}
        </div>
      )}

      {/* Background Effects - using new BackgroundEffects molecule */}
      <div className="fixed inset-0 pointer-events-none">
        <BackgroundEffects
          variant="blue"
          size="lg"
          pattern="random"
          intensity="medium"
          blur="xl"
          animated
          animationSpeed={animationSpeed}
          customOrbs={[
            {
              variant: 'blue',
              size: 'xl',
              position: { top: '80px', left: '80px' },
              animationDelay: 0,
              intensity: 'medium',
            },
            {
              variant: 'purple',
              size: 'lg',
              position: { bottom: '80px', right: '80px' },
              animationDelay: 0.1,
              intensity: 'medium',
            },
            {
              variant: 'blue',
              size: 'md',
              position: { top: '33%', right: '25%' },
              animationDelay: 0.2,
              intensity: 'medium',
            },
          ]}
          style={{
            // Apply transition-specific transforms
            transform: isVisible
              ? 'translateY(0) translateX(0) scale(1) rotate(0deg)'
              : isExiting
                ? 'translateY(-40px) translateX(-60px) scale(1.5) rotate(-45deg)'
                : 'translateY(20px) translateX(20px) scale(0.8) rotate(15deg)',
            opacity: isVisible ? 1 : isExiting ? 0.3 : 0,
            transition: 'all 500ms ease-in-out',
          }}
          data-testid={`${testId}-background-effects`}
        />

        {/* Exit Particles - using AccentDot atoms */}
        {isExiting && (
          <>
            {Array.from({ length: 8 }).map((_, i) => (
              <AccentDot
                key={`exit-particle-${i}`}
                variant="blue"
                size="xs"
                position="center"
                animated
                animationSpeed={animationSpeed}
                animationDelay={i * 0.05}
                style={{
                  position: 'absolute',
                  left: `${30 + i * 8}%`,
                  top: `${40 + Math.sin(i) * 20}%`,
                  transform: `translateX(${i * 15}px) translateY(${-i * 10}px) scale(${1 + i * 0.1})`,
                  opacity: 0.8 - i * 0.1,
                  width: '8px',
                  height: '8px',
                  background: 'linear-gradient(to right, rgb(96 165 250 / 0.6), rgb(34 211 238 / 0.6))',
                  borderRadius: '50%',
                  transition: 'all 500ms ease-in-out',
                }}
                data-testid={`${testId}-exit-particle-${i}`}
              />
            ))}
          </>
        )}
      </div>

      {/* Main Content Container - identical transform logic */}
      <div
        className="relative z-10 transition-all duration-400 ease-in-out"
        style={{
          transform: getTransformStyle(),
          opacity: getOpacity(),
        }}
        key={displayPath}
        data-testid={`${testId}-content`}
      >
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

      {/* Floating Accents - using new FloatingAccents molecule */}
      <div className="fixed inset-0 pointer-events-none z-20">
        <FloatingAccents
          variant="blue"
          size="md"
          pattern="corners"
          sequence="cascade"
          animated
          animationSpeed={animationSpeed}
          customAccents={[
            {
              variant: 'blue',
              size: 'sm',
              position: { top: '40px', right: '40px' },
              animationDelay: 0,
              opacity: isVisible ? 0.8 : isExiting ? 0.3 : 0,
            },
            {
              variant: 'purple',
              size: 'xs',
              position: { bottom: '40px', left: '40px' },
              animationDelay: 0.1,
              opacity: isVisible ? 0.6 : isExiting ? 0.4 : 0,
            },
            {
              variant: 'blue',
              size: 'xs',
              position: { top: '50%', left: '40px' },
              animationDelay: 0.2,
              opacity: isVisible ? 0.7 : isExiting ? 0.2 : 0,
            },
          ]}
          style={{
            // Apply accent-specific transforms
            transform: isVisible
              ? 'scale(1) rotate(0deg) translateX(0) translateY(0)'
              : isExiting
                ? 'scale(2) rotate(180deg) translateX(40px) translateY(-20px)'
                : 'scale(0) rotate(-90deg) translateX(-10px) translateY(5px)',
            transition: 'all 400ms ease-in-out',
          }}
          data-testid={`${testId}-floating-accents`}
        />

        {/* Exit Trail Effect - identical to original */}
        {isExiting && (
          <div className="absolute inset-0" data-testid={`${testId}-exit-trail`}>
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

      {/* Exit Overlay - identical to original */}
      {isExiting && (
        <div
          className="fixed inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 transition-opacity duration-400 z-5"
          style={{ opacity: 0.6 }}
          data-testid={`${testId}-exit-overlay`}
        />
      )}
    </div>
  );
};

RouteTransition.displayName = 'RouteTransition';