# UI Hooks

> **Shared custom hooks for component composition, theming, and interactions**

UI hooks provide reusable logic for component behavior, state management, and interactions within the atomic design system. They encapsulate common patterns and enable consistent behavior across all component levels.

## Design Philosophy

UI hooks follow these core principles:

- **Reusable Logic**: Extract common component behavior into shareable hooks
- **Consistent Patterns**: Provide unified interfaces for similar functionality
- **Performance Optimized**: Minimize re-renders and optimize calculations
- **Type Safe**: Comprehensive TypeScript interfaces and return types
- **Composable**: Hooks that work well together and with component composition

## Available Hooks

### useComponentTheme
**Purpose**: Theme management and class generation for components

```typescript
const { tokens, classes, variants } = useComponentTheme('blue', 'md', {
  includeGlow: true,
  includeBorder: true,
  includeHover: true
});
```

**Features**:
- Dynamic theme token retrieval
- Automatic class generation based on variant and size
- Customizable feature flags for different styling aspects
- Memoized calculations for performance
- TypeScript support for all theme properties

**Usage Example**:
```typescript
function ThemedButton({ variant = 'blue', size = 'md', children }) {
  const { classes, tokens } = useComponentTheme(variant, size, {
    includeHover: true,
    includeGlow: true
  });

  return (
    <button 
      className={classes.button}
      style={{
        animationDuration: tokens.animations.durations.normal
      }}
    >
      {children}
    </button>
  );
}
```

### useAnimation
**Purpose**: Animation control and timing management

```typescript
const { 
  animationClasses, 
  isAnimating, 
  startAnimation, 
  stopAnimation 
} = useAnimation({
  animated: true,
  speed: 1.2,
  delay: 0.5,
  easing: 'smooth'
});
```

**Features**:
- Centralized animation state management
- Performance-optimized animation classes
- Customizable timing and easing functions
- Animation lifecycle control
- Reduced motion preference handling

**Usage Example**:
```typescript
function AnimatedCard({ children, animated = true }) {
  const { animationClasses, startAnimation } = useAnimation({
    animated,
    speed: 1,
    easing: 'smooth'
  });

  return (
    <div 
      className={`card ${animationClasses}`}
      onMouseEnter={startAnimation}
    >
      {children}
    </div>
  );
}
```

### useComposition
**Purpose**: Component composition utilities and prop enhancement

```typescript
const { 
  composedProps, 
  enhanceChildren, 
  mergeRefs 
} = useComposition(props, {
  enhanceWithTheme: true,
  enhanceWithAnimation: true,
  forwardRef: true
});
```

**Features**:
- Automatic prop composition and merging
- Child component enhancement
- Ref forwarding and merging
- Theme and animation prop injection
- Performance-optimized prop calculations

**Usage Example**:
```typescript
const ComposedCard = React.forwardRef((props, ref) => {
  const { composedProps, enhanceChildren } = useComposition(props, {
    enhanceWithTheme: true,
    enhanceWithAnimation: true
  });

  return (
    <div ref={ref} {...composedProps}>
      {enhanceChildren(props.children)}
    </div>
  );
});
```

### useReactCompilerOptimized
**Purpose**: React Compiler optimization utilities and performance helpers

```typescript
const {
  memoizedValue,
  optimizedCallback,
  stableRef
} = useReactCompilerOptimized({
  value: expensiveCalculation,
  callback: handleClick,
  dependencies: [dep1, dep2]
});
```

**Features**:
- React Compiler compatibility optimizations
- Automatic memoization for expensive calculations
- Stable callback references
- Dependency tracking and optimization
- Performance monitoring and debugging

**Usage Example**:
```typescript
function OptimizedComponent({ data, onUpdate }) {
  const {
    memoizedValue,
    optimizedCallback
  } = useReactCompilerOptimized({
    value: () => processData(data),
    callback: onUpdate,
    dependencies: [data]
  });

  return (
    <div onClick={optimizedCallback}>
      {memoizedValue}
    </div>
  );
}
```

## Hook Composition Patterns

### Combining Multiple Hooks

Hooks are designed to work together seamlessly:

```typescript
function useEnhancedComponent(props) {
  // Theme management
  const { classes, tokens } = useComponentTheme(
    props.variant, 
    props.size
  );

  // Animation control
  const { animationClasses, startAnimation } = useAnimation({
    animated: props.animated,
    speed: props.animationSpeed
  });

  // Composition utilities
  const { composedProps, enhanceChildren } = useComposition(props, {
    enhanceWithTheme: true,
    enhanceWithAnimation: true
  });

  // Performance optimization
  const { optimizedCallback } = useReactCompilerOptimized({
    callback: props.onClick,
    dependencies: [props.onClick]
  });

  return {
    classes: `${classes.base} ${animationClasses}`,
    tokens,
    composedProps: {
      ...composedProps,
      onClick: optimizedCallback,
      onMouseEnter: startAnimation
    },
    enhanceChildren
  };
}
```

### Custom Hook Creation

Create domain-specific hooks using base UI hooks:

```typescript
function useStatCard({ value, trend, variant, animated }) {
  // Base theme and animation
  const { classes, tokens } = useComponentTheme(variant, 'md');
  const { animationClasses, isAnimating } = useAnimation({ animated });

  // Stat-specific logic
  const formattedValue = useMemo(() => 
    formatStatValue(value), 
    [value]
  );

  const trendData = useMemo(() => 
    calculateTrend(trend), 
    [trend]
  );

  const [isHovered, setIsHovered] = useState(false);

  // Performance optimization
  const { optimizedCallback } = useReactCompilerOptimized({
    callback: () => setIsHovered(!isHovered),
    dependencies: [isHovered]
  });

  return {
    classes: `${classes.card} ${animationClasses}`,
    formattedValue,
    trendData,
    isHovered,
    isAnimating,
    toggleHover: optimizedCallback,
    tokens
  };
}
```

## Performance Optimization

### Memoization Strategies

Hooks use strategic memoization to optimize performance:

```typescript
function useComponentTheme(variant, size, options = {}) {
  // Memoize theme tokens
  const tokens = useMemo(() => 
    getThemeTokens(variant, size), 
    [variant, size]
  );

  // Memoize class generation
  const classes = useMemo(() => 
    generateClasses(variant, size, options, tokens), 
    [variant, size, options, tokens]
  );

  // Memoize variant-specific data
  const variants = useMemo(() => 
    getVariantData(variant), 
    [variant]
  );

  return { tokens, classes, variants };
}
```

### Callback Optimization

Prevent unnecessary re-renders with stable callbacks:

```typescript
function useAnimation({ animated, speed, delay, easing }) {
  const [isAnimating, setIsAnimating] = useState(false);

  // Stable callback references
  const startAnimation = useCallback(() => {
    if (animated) {
      setIsAnimating(true);
    }
  }, [animated]);

  const stopAnimation = useCallback(() => {
    setIsAnimating(false);
  }, []);

  // Memoized animation classes
  const animationClasses = useMemo(() => {
    if (!animated || !isAnimating) return '';
    
    return generateAnimationClasses({ speed, delay, easing });
  }, [animated, isAnimating, speed, delay, easing]);

  return {
    animationClasses,
    isAnimating,
    startAnimation,
    stopAnimation
  };
}
```

## Testing Hooks

### Hook Testing Patterns

Use React Testing Library's `renderHook` for testing:

```typescript
import { renderHook, act } from '@testing-library/react';
import { useComponentTheme } from './useComponentTheme';

describe('useComponentTheme', () => {
  it('returns correct theme tokens for variant', () => {
    const { result } = renderHook(() => 
      useComponentTheme('blue', 'md')
    );

    expect(result.current.tokens.colors.primary).toBe('rgb(59 130 246)');
    expect(result.current.classes.base).toContain('text-blue-500');
  });

  it('updates when variant changes', () => {
    const { result, rerender } = renderHook(
      ({ variant, size }) => useComponentTheme(variant, size),
      { initialProps: { variant: 'blue', size: 'md' } }
    );

    expect(result.current.tokens.colors.primary).toBe('rgb(59 130 246)');

    rerender({ variant: 'emerald', size: 'md' });

    expect(result.current.tokens.colors.primary).toBe('rgb(16 185 129)');
  });

  it('memoizes expensive calculations', () => {
    const spy = jest.spyOn(console, 'log');
    
    const { rerender } = renderHook(() => 
      useComponentTheme('blue', 'md')
    );

    // First render should calculate
    expect(spy).toHaveBeenCalledWith('Calculating theme tokens...');
    
    spy.mockClear();
    
    // Second render with same props should not recalculate
    rerender();
    expect(spy).not.toHaveBeenCalled();
  });
});
```

### Animation Hook Testing

Test animation state and timing:

```typescript
describe('useAnimation', () => {
  it('manages animation state correctly', () => {
    const { result } = renderHook(() => 
      useAnimation({ animated: true })
    );

    expect(result.current.isAnimating).toBe(false);

    act(() => {
      result.current.startAnimation();
    });

    expect(result.current.isAnimating).toBe(true);

    act(() => {
      result.current.stopAnimation();
    });

    expect(result.current.isAnimating).toBe(false);
  });

  it('respects reduced motion preferences', () => {
    // Mock reduced motion preference
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });

    const { result } = renderHook(() => 
      useAnimation({ animated: true })
    );

    act(() => {
      result.current.startAnimation();
    });

    // Should not animate when reduced motion is preferred
    expect(result.current.animationClasses).toBe('');
  });
});
```

## Accessibility Considerations

### Motion Preferences

Hooks respect user accessibility preferences:

```typescript
function useAccessibleAnimation(options) {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  
  const { animationClasses, ...animationState } = useAnimation({
    ...options,
    animated: options.animated && !prefersReducedMotion
  });

  return {
    ...animationState,
    animationClasses: prefersReducedMotion ? '' : animationClasses,
    prefersReducedMotion
  };
}
```

### Focus Management

Provide hooks for focus management:

```typescript
function useFocusManagement() {
  const focusRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const focusElement = useCallback(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  }, []);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return {
    focusRef,
    isFocused,
    focusElement,
    focusProps: {
      onFocus: handleFocus,
      onBlur: handleBlur
    }
  };
}
```

## Development Guidelines

### Creating New Hooks

1. **Identify Reusable Logic**: Find patterns repeated across components
2. **Design Clean Interface**: Create intuitive and consistent APIs
3. **Add TypeScript Types**: Comprehensive interfaces for parameters and returns
4. **Optimize Performance**: Use memoization and stable references
5. **Handle Edge Cases**: Consider error states and boundary conditions
6. **Add Tests**: Comprehensive unit tests for all functionality
7. **Document Usage**: Clear examples and API documentation

### Hook Naming Conventions

- **use[Feature]**: Core functionality hooks (useAnimation, useTheme)
- **use[Component][Feature]**: Component-specific hooks (useStatCardState)
- **use[Behavior]**: Behavior-focused hooks (useHover, useFocus)
- **use[Data][Operation]**: Data manipulation hooks (useFormatValue)

### Code Quality Standards

- **TypeScript Strict**: All hooks must pass strict type checking
- **Performance**: Optimize for minimal re-renders and calculations
- **Testing**: Unit tests covering all functionality and edge cases
- **Documentation**: JSDoc comments and usage examples
- **Accessibility**: Consider accessibility implications and preferences

## Related Documentation

- **[Components](../README.md)**: Components that use these hooks
- **[Theme System](../theme/README.md)**: Theming tokens and configuration
- **[Utils](../utils/README.md)**: Utility functions used by hooks
- **[Performance Guide](../docs/performance.md)**: Performance optimization patterns

---

**Hook Categories**: Theme, Animation, Composition, Performance  
**Total Hooks**: 4  
**Test Coverage**: Comprehensive unit tests  
**Status**: ✅ Complete  
**Last Updated**: January 2025