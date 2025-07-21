import { useEffect, useMemo, useRef, useState } from 'react';
import type { AnimationProps } from '../atoms/types';
import { atomicTokens } from '../theme/theme.config';
import {
  animationPresets,
  createAnimationStyle,
  getAnimationClasses,
} from '../utils/animation-utils';

/**
 * Hook for managing component animations
 */
export function useAnimation(
  props: AnimationProps & { trigger?: boolean } = {},
) {
  const {
    animated = false,
    animationSpeed = 1,
    animationDelay = 0,
    trigger = true,
  } = props;
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<HTMLElement>(null);

  const animationClasses = useMemo(() => {
    return getAnimationClasses({ animated, animationSpeed, animationDelay });
  }, [animated, animationSpeed, animationDelay]);

  const animationStyle = useMemo(() => {
    if (!animated) return {};

    return {
      animationDuration: `${300 / animationSpeed}ms`,
      animationDelay: `${animationDelay}ms`,
      animationTimingFunction: atomicTokens.animations.easings.smooth,
    };
  }, [animated, animationSpeed, animationDelay]);

  useEffect(() => {
    if (!animated || !trigger) return;

    setIsAnimating(true);
    const timer = setTimeout(
      () => {
        setIsAnimating(false);
      },
      300 / animationSpeed + animationDelay,
    );

    return () => clearTimeout(timer);
  }, [animated, animationSpeed, animationDelay, trigger]);

  return {
    animationClasses,
    animationStyle,
    isAnimating,
    animationRef,
  };
}

/**
 * Hook for managing hover animations
 */
export function useHoverAnimation(
  hoverScale: boolean = false,
  hoverGlow: boolean = false,
) {
  const [isHovered, setIsHovered] = useState(false);

  const hoverClasses = useMemo(() => {
    const classes: string[] = [];

    if (hoverScale) {
      classes.push('hover:scale-105 active:scale-95');
    }

    if (hoverGlow) {
      classes.push('hover:animate-glow-pulse');
    }

    if (classes.length > 0) {
      classes.push('transition-all duration-300');
    }

    return classes.join(' ');
  }, [hoverScale, hoverGlow]);

  const hoverHandlers = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };

  return {
    hoverClasses,
    hoverHandlers,
    isHovered,
  };
}

/**
 * Hook for managing staggered animations
 */
export function useStaggeredAnimation(
  count: number,
  baseDelay: number = 100,
  trigger: boolean = true,
) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const delays = useMemo(() => {
    return Array.from({ length: count }, (_, index) => index * baseDelay);
  }, [count, baseDelay]);

  useEffect(() => {
    if (!trigger) {
      setActiveIndex(-1);
      return;
    }

    let currentIndex = 0;
    const interval = setInterval(() => {
      setActiveIndex(currentIndex);
      currentIndex++;

      if (currentIndex >= count) {
        clearInterval(interval);
      }
    }, baseDelay);

    return () => clearInterval(interval);
  }, [count, baseDelay, trigger]);

  const getItemProps = (index: number) => ({
    style: {
      animationDelay: `${delays[index]}ms`,
    },
    'data-animation-active': activeIndex >= index,
  });

  return {
    delays,
    activeIndex,
    getItemProps,
  };
}

/**
 * Hook for managing preset animations
 */
export function usePresetAnimation(
  preset: keyof typeof animationPresets,
  trigger: boolean = true,
) {
  const presetConfig = animationPresets[preset];

  const animationStyle = useMemo(() => {
    return createAnimationStyle(presetConfig.animation, {
      duration: presetConfig.duration,
      easing: presetConfig.easing,
      iterationCount: presetConfig.iterationCount,
    });
  }, [presetConfig]);

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (trigger) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [trigger]);

  return {
    animationStyle,
    isActive,
    presetConfig,
  };
}

/**
 * Hook for managing intersection-based animations
 */
export function useIntersectionAnimation(
  options: IntersectionObserverInit = {},
) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      {
        threshold: 0.1,
        ...options,
      },
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [hasAnimated, options]);

  return {
    elementRef,
    isVisible,
    hasAnimated,
  };
}
