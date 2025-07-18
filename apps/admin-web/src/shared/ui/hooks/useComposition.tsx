import React, { useMemo, useCallback, useState, ReactElement, isValidElement, cloneElement } from 'react';
import { BaseComponentProps } from '../atoms/types';

/**
 * Hook for managing component composition
 */
export function useComposition<T extends BaseComponentProps>(
  baseProps: T,
  enhancedProps: Partial<T> = {}
) {
  const composedProps = useMemo(() => {
    return { ...baseProps, ...enhancedProps };
  }, [baseProps, enhancedProps]);

  const enhanceChild = useCallback(
    (child: ReactElement, additionalProps: Partial<T> = {}) => {
      if (!isValidElement(child)) return child;
      
      return cloneElement(child, {
        ...(child.props as any),
        ...composedProps,
        ...additionalProps,
      });
    },
    [composedProps]
  );

  const enhanceChildren = useCallback(
    (children: React.ReactNode, additionalProps: Partial<T> = {}) => {
      if (!children) return null;
      
      if (Array.isArray(children)) {
        return children.map((child, index) => {
          if (isValidElement(child)) {
            return enhanceChild(child, { ...additionalProps, key: index });
          }
          return child;
        });
      }
      
      if (isValidElement(children)) {
        return enhanceChild(children, additionalProps);
      }
      
      return children;
    },
    [enhanceChild]
  );

  return {
    composedProps,
    enhanceChild,
    enhanceChildren,
  };
}

/**
 * Hook for managing slot-based composition
 */
export function useSlots<T extends Record<string, any>>(
  defaultSlots: T,
  providedSlots: Partial<T> = {}
) {
  const slots = useMemo(() => {
    return { ...defaultSlots, ...providedSlots };
  }, [defaultSlots, providedSlots]);

  const renderSlot = useCallback(
    (slotName: keyof T, props: any = {}) => {
      const SlotComponent = slots[slotName];
      
      if (!SlotComponent) return null;
      
      if (typeof SlotComponent === 'function') {
        return <SlotComponent {...props} />;
      }
      
      if (isValidElement(SlotComponent)) {
        return cloneElement(SlotComponent, props);
      }
      
      return SlotComponent;
    },
    [slots]
  );

  const hasSlot = useCallback(
    (slotName: keyof T) => {
      return Boolean(slots[slotName]);
    },
    [slots]
  );

  return {
    slots,
    renderSlot,
    hasSlot,
  };
}

/**
 * Hook for managing compound component state
 */
export function useCompoundComponent<TState extends Record<string, any>>(
  initialState: TState
) {
  const [state, setState] = useState(initialState);

  const updateState = useCallback(
    (updates: Partial<TState>) => {
      setState(prev => ({ ...prev, ...updates }));
    },
    []
  );

  const resetState = useCallback(() => {
    setState(initialState);
  }, [initialState]);

  const createChildProps = useCallback(
    <TChildProps extends BaseComponentProps>(
      childProps: TChildProps,
      stateProps: Partial<TState> = {}
    ) => {
      return {
        ...childProps,
        ...state,
        ...stateProps,
        updateState,
        resetState,
      };
    },
    [state, updateState, resetState]
  );

  return {
    state,
    updateState,
    resetState,
    createChildProps,
  };
}

/**
 * Hook for managing component variants and their composition
 */
export function useVariantComposition<TVariants extends Record<string, any>>(
  variants: TVariants,
  activeVariant: keyof TVariants
) {
  const currentVariant = useMemo(() => {
    return variants[activeVariant];
  }, [variants, activeVariant]);

  const composeWithVariant = useCallback(
    <TProps extends BaseComponentProps>(
      baseProps: TProps,
      variantOverrides: Partial<TProps> = {}
    ) => {
      return {
        ...baseProps,
        ...currentVariant,
        ...variantOverrides,
      };
    },
    [currentVariant]
  );

  const getVariantClasses = useCallback(
    (baseClasses: string = '') => {
      const variantClasses = currentVariant?.className || '';
      return [baseClasses, variantClasses].filter(Boolean).join(' ');
    },
    [currentVariant]
  );

  return {
    currentVariant,
    composeWithVariant,
    getVariantClasses,
  };
}

/**
 * Hook for managing responsive composition
 */
export function useResponsiveComposition<T extends BaseComponentProps>(
  baseProps: T,
  breakpointProps: {
    sm?: Partial<T>;
    md?: Partial<T>;
    lg?: Partial<T>;
    xl?: Partial<T>;
    '2xl'?: Partial<T>;
  } = {}
) {
  const responsiveProps = useMemo(() => {
    // This would typically integrate with a breakpoint detection hook
    // For now, we'll merge all props (in a real implementation, 
    // you'd detect the current breakpoint and apply appropriate props)
    return {
      ...baseProps,
      ...breakpointProps.md, // Default to medium breakpoint
    };
  }, [baseProps, breakpointProps]);

  const getResponsiveClasses = useCallback(
    (baseClasses: string = '') => {
      const classes = [baseClasses];
      
      Object.entries(breakpointProps).forEach(([breakpoint, props]) => {
        if (props?.className) {
          classes.push(`${breakpoint}:${props.className}`);
        }
      });
      
      return classes.filter(Boolean).join(' ');
    },
    [breakpointProps]
  );

  return {
    responsiveProps,
    getResponsiveClasses,
  };
}