import React, { ComponentType, ReactElement, cloneElement, isValidElement } from 'react';
import { BaseComponentProps } from '../atoms/types';

/**
 * Utility functions for composing atomic components
 */

// Type for component composition
export type ComposableComponent<T = {}> = ComponentType<T & BaseComponentProps>;

/**
 * Compose multiple components together with shared props
 */
export function composeComponents<T extends BaseComponentProps>(
  components: ComposableComponent<T>[],
  sharedProps: Partial<T> = {}
): ComposableComponent<T> {
  return function ComposedComponent(props: T) {
    return (
      <>
        {components.map((Component, index) => (
          <Component key={index} {...sharedProps} {...props} />
        ))}
      </>
    );
  };
}

/**
 * Create a compound component with sub-components
 */
export function createCompoundComponent<
  TMain extends BaseComponentProps,
  TSubComponents extends Record<string, ComposableComponent<any>>
>(
  MainComponent: ComposableComponent<TMain>,
  subComponents: TSubComponents
): ComposableComponent<TMain> & TSubComponents {
  const CompoundComponent = MainComponent as ComposableComponent<TMain> & TSubComponents;
  
  Object.keys(subComponents).forEach((key) => {
    (CompoundComponent as any)[key] = subComponents[key];
  });
  
  return CompoundComponent;
}

/**
 * Enhance a component with additional props or behavior
 */
export function enhanceComponent<TOriginal, TEnhanced>(
  OriginalComponent: ComposableComponent<TOriginal>,
  enhancer: (props: TEnhanced) => Partial<TOriginal>
): ComposableComponent<TEnhanced> {
  return function EnhancedComponent(props: TEnhanced) {
    const enhancedProps = enhancer(props);
    return <OriginalComponent {...enhancedProps} {...(props as any)} />;
  };
}

/**
 * Clone and enhance React elements with additional props
 */
export function enhanceElement<T extends BaseComponentProps>(
  element: ReactElement,
  additionalProps: Partial<T>
): ReactElement {
  if (!isValidElement(element)) {
    return element;
  }
  
  return cloneElement(element, {
    ...(element.props as any),
    ...additionalProps,
  });
}

/**
 * Render children with enhanced props
 */
export function renderEnhancedChildren<T extends BaseComponentProps>(
  children: React.ReactNode,
  enhancedProps: Partial<T>
): React.ReactNode {
  if (!children) return null;
  
  if (Array.isArray(children)) {
    return children.map((child, index) => {
      if (isValidElement(child)) {
        return enhanceElement(child, { ...enhancedProps, key: index });
      }
      return child;
    });
  }
  
  if (isValidElement(children)) {
    return enhanceElement(children, enhancedProps);
  }
  
  return children;
}

/**
 * Create a slot-based component system
 */
export interface SlotProps extends BaseComponentProps {
  name: string;
}

export function createSlotComponent<T extends Record<string, any>>(
  slots: T
): ComposableComponent<{ slots?: Partial<T> }> {
  return function SlotComponent({ slots: providedSlots = {}, children, ...props }) {
    const mergedSlots = { ...slots, ...providedSlots };
    
    return (
      <div {...props}>
        {Object.entries(mergedSlots).map(([slotName, SlotComponent]) => {
          if (typeof SlotComponent === 'function') {
            return <SlotComponent key={slotName} />;
          }
          return SlotComponent;
        })}
        {children}
      </div>
    );
  };
}