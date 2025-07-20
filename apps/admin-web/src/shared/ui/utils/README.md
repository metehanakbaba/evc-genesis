# UI Utilities

> **Utility functions for component composition, theming, and common operations**

UI utilities provide essential helper functions that support the atomic design system. They handle common operations like class name management, theme calculations, animation utilities, and component composition helpers.

## Design Philosophy

UI utilities follow these core principles:

- **Pure Functions**: Predictable, side-effect-free utility functions
- **Performance Optimized**: Efficient implementations with minimal overhead
- **Type Safe**: Comprehensive TypeScript interfaces and return types
- **Composable**: Functions that work well together and with components
- **Reusable**: Generic utilities that work across different contexts

## Available Utilities

### Class Utilities (`class-utils.ts`)
**Purpose**: Class name manipulation and conditional styling

```typescript
import { cn, createThemeClasses, getVariantClasses } from '@/shared/ui/utils';

// Conditional class names with filtering
const classes = cn(
  'base-class',
  condition && 'conditional-class',
  { 'active': isActive, 'disabled': isDisabled },
  undefined, // filtered out
  null,      // filtered out
  customClasses
);

// Theme-based class generation
const themeClasses = createThemeClasses('blue', 'md', {
  includeGlow: true,
  includeBorder: true,
  includeHover: true
});

// Variant-specific classes
const variantClasses = getVariantClasses('emerald', {
  includeBackground: true,
  includeText: true,
  includeBorder: false
});
```

**Key Functions**:
- `cn()`: Enhanced class name concatenation with filtering
- `createThemeClasses()`: Generate theme-based CSS classes
- `getVariantClasses()`: Get variant-specific styling classes
- `mergeClasses()`: Intelligent class merging with conflict resolution

### Theme Utilities (`theme-utils.ts`)
**Purpose**: Theme token retrieval and color manipulation

```typescript
import { 
  getThemeTokens, 
  getVariantColors, 
  calculateOpacity,
  generateGradient 
} from '@/shared/ui/utils';

// Get complete theme tokens
const tokens = getThemeTokens('blue', 'md');

// Get variant-specific colors
const colors = getVariantColors('emerald');

// Calculate opacity values
const opacityValue = calculateOpacity('medium'); // 0.15

// Generate CSS gradients
const gradient = generateGradient('purple', 'radial', {
  from: 'center',
  to: 'edges',
  opacity: 0.2
});
```

**Key Functions**:
- `getThemeTokens()`: Retrieve complete theme configuration
- `getVariantColors()`: Get color palette for specific variants
- `calculateOpacity()`: Convert opacity names to values
- `generateGradient()`: Create CSS gradient strings
- `interpolateColor()`: Color interpolation for animations

### Animation Utilities (`animation-utils.ts`)
**Purpose**: Animation timing, easing, and coordination

```typescript
import { 
  getAnimationDuration, 
  getEasingFunction, 
  calculateStaggerDelay,
  createAnimationSequence 
} from '@/shared/ui/utils';

// Get standardized animation durations
const duration = getAnimationDuration('normal'); // '300ms'

// Get easing function values
const easing = getEasingFunction('smooth'); // 'cubic-bezier(0.4, 0, 0.2, 1)'

// Calculate staggered delays for multiple elements
const delays = calculateStaggerDelay(5, 0.1); // [0, 0.1, 0.2, 0.3, 0.4]

// Create coordinated animation sequences
const sequence = createAnimationSequence([
  { element: 'background', delay: 0, duration: 300 },
  { element: 'content', delay: 150, duration: 200 },
  { element: 'accents', delay: 300, duration: 400 }
]);
```

**Key Functions**:
- `getAnimationDuration()`: Standardized animation timing
- `getEasingFunction()`: CSS easing function values
- `calculateStaggerDelay()`: Staggered animation timing
- `createAnimationSequence()`: Coordinated animation sequences
- `optimizeAnimationPerformance()`: Performance optimization helpers

### Composition Utilities (`composition.tsx`)
**Purpose**: Component composition and prop manipulation

```typescript
import { 
  composeComponents, 
  enhanceProps, 
  mergeRefs,
  createSlotComponent 
} from '@/shared/ui/utils';

// Compose multiple components
const EnhancedCard = composeComponents(
  withTheme('blue'),
  withAnimation({ animated: true }),
  withInteraction({ onClick: true })
)(BaseCard);

// Enhance props with additional functionality
const enhancedProps = enhanceProps(originalProps, {
  addTheme: true,
  addAnimation: true,
  addAccessibility: true
});

// Merge multiple refs
const combinedRef = mergeRefs(ref1, ref2, ref3);

// Create slot-based components
const SlotCard = createSlotComponent({
  slots: ['header', 'body', 'footer'],
  defaultSlot: 'body'
});
```

**Key Functions**:
- `composeComponents()`: Higher-order component composition
- `enhanceProps()`: Prop enhancement and injection
- `mergeRefs()`: Multiple ref merging
- `createSlotComponent()`: Slot-based component creation
- `withTheme()`, `withAnimation()`: Enhancement HOCs

## Utility Categories

### String and Class Manipulation

```typescript
// Class name utilities
export const cn = (...classes: ClassValue[]): string => {
  return clsx(classes);
};

export const createThemeClasses = (
  variant: Variant,
  size: Size,
  options: ThemeClassOptions = {}
): string => {
  const baseClasses = getBaseClasses(size);
  const variantClasses = getVariantClasses(variant, options);
  const sizeClasses = getSizeClasses(size);
  
  return cn(baseClasses, variantClasses, sizeClasses);
};

export const getVariantClasses = (
  variant: Variant,
  options: VariantClassOptions = {}
): string => {
  const colors = getVariantColors(variant);
  
  return cn(
    options.includeBackground && `bg-${variant}-500/10`,
    options.includeText && `text-${variant}-600`,
    options.includeBorder && `border-${variant}-200`,
    options.includeGlow && `shadow-${variant}-500/25`
  );
};
```

### Mathematical Calculations

```typescript
// Animation and timing calculations
export const calculateStaggerDelay = (
  count: number,
  baseDelay: number = 0.1
): number[] => {
  return Array.from({ length: count }, (_, i) => i * baseDelay);
};

export const interpolateValue = (
  start: number,
  end: number,
  progress: number
): number => {
  return start + (end - start) * progress;
};

export const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};
```

### Type Guards and Validation

```typescript
// Type checking utilities
export const isValidVariant = (value: any): value is Variant => {
  return ['blue', 'emerald', 'purple', 'teal'].includes(value);
};

export const isValidSize = (value: any): value is Size => {
  return ['xs', 'sm', 'md', 'lg', 'xl'].includes(value);
};

export const validateProps = <T extends Record<string, any>>(
  props: T,
  schema: PropSchema<T>
): ValidationResult<T> => {
  const errors: string[] = [];
  const validatedProps: Partial<T> = {};

  for (const [key, validator] of Object.entries(schema)) {
    const value = props[key];
    const result = validator(value);
    
    if (result.isValid) {
      validatedProps[key] = result.value;
    } else {
      errors.push(`${key}: ${result.error}`);
    }
  }

  return {
    isValid: errors.length === 0,
    props: validatedProps as T,
    errors
  };
};
```

## Performance Optimization

### Memoization Utilities

```typescript
// Memoization for expensive calculations
export const memoize = <Args extends any[], Return>(
  fn: (...args: Args) => Return,
  getKey?: (...args: Args) => string
): ((...args: Args) => Return) => {
  const cache = new Map<string, Return>();
  
  return (...args: Args): Return => {
    const key = getKey ? getKey(...args) : JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

// Memoized theme token retrieval
export const getThemeTokens = memoize(
  (variant: Variant, size: Size) => {
    return {
      colors: getVariantColors(variant),
      sizes: getSizeTokens(size),
      animations: getAnimationTokens(),
      spacing: getSpacingTokens(size)
    };
  },
  (variant, size) => `${variant}-${size}`
);
```

### Debouncing and Throttling

```typescript
// Performance utilities for event handling
export const debounce = <Args extends any[]>(
  fn: (...args: Args) => void,
  delay: number
): ((...args: Args) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

export const throttle = <Args extends any[]>(
  fn: (...args: Args) => void,
  limit: number
): ((...args: Args) => void) => {
  let inThrottle: boolean;
  
  return (...args: Args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
```

## Usage Patterns

### Component Enhancement

```typescript
// Using utilities to enhance components
function EnhancedButton({ 
  variant = 'blue', 
  size = 'md', 
  animated = true,
  children,
  ...props 
}) {
  // Generate theme classes
  const themeClasses = createThemeClasses(variant, size, {
    includeGlow: true,
    includeHover: true
  });

  // Get animation properties
  const animationDuration = getAnimationDuration('normal');
  const easing = getEasingFunction('smooth');

  // Compose final classes
  const classes = cn(
    'button-base',
    themeClasses,
    animated && 'transition-all',
    props.className
  );

  return (
    <button
      {...props}
      className={classes}
      style={{
        transitionDuration: animationDuration,
        transitionTimingFunction: easing,
        ...props.style
      }}
    >
      {children}
    </button>
  );
}
```

### Complex Calculations

```typescript
// Using utilities for complex layout calculations
function useResponsiveGrid(itemCount: number, minItemWidth: number = 250) {
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const calculateColumns = throttle(() => {
      const containerWidth = window.innerWidth - 64; // Account for padding
      const maxColumns = Math.floor(containerWidth / minItemWidth);
      const optimalColumns = Math.min(maxColumns, itemCount);
      setColumns(Math.max(1, optimalColumns));
    }, 100);

    calculateColumns();
    window.addEventListener('resize', calculateColumns);
    return () => window.removeEventListener('resize', calculateColumns);
  }, [itemCount, minItemWidth]);

  return {
    columns,
    gridClasses: cn(
      'grid gap-6',
      `grid-cols-${columns}`,
      'auto-rows-fr'
    )
  };
}
```

## Testing Utilities

### Test Helpers

```typescript
// Testing utilities for component testing
export const createMockTheme = (variant: Variant = 'blue'): ThemeTokens => ({
  colors: getVariantColors(variant),
  sizes: getSizeTokens('md'),
  animations: getAnimationTokens(),
  spacing: getSpacingTokens('md')
});

export const renderWithTheme = (
  component: React.ReactElement,
  theme: Partial<ThemeTokens> = {}
) => {
  const mockTheme = { ...createMockTheme(), ...theme };
  
  return render(
    <ThemeProvider theme={mockTheme}>
      {component}
    </ThemeProvider>
  );
};

export const expectClassesToContain = (
  element: HTMLElement,
  expectedClasses: string[]
) => {
  expectedClasses.forEach(className => {
    expect(element).toHaveClass(className);
  });
};
```

### Utility Testing

```typescript
import { cn, createThemeClasses, calculateStaggerDelay } from '../utils';

describe('UI Utilities', () => {
  describe('cn', () => {
    it('concatenates class names correctly', () => {
      expect(cn('a', 'b', 'c')).toBe('a b c');
    });

    it('filters out falsy values', () => {
      expect(cn('a', false && 'b', null, undefined, 'c')).toBe('a c');
    });

    it('handles conditional objects', () => {
      expect(cn({ active: true, disabled: false })).toBe('active');
    });
  });

  describe('createThemeClasses', () => {
    it('generates correct theme classes', () => {
      const classes = createThemeClasses('blue', 'md', {
        includeGlow: true,
        includeBorder: true
      });
      
      expect(classes).toContain('text-blue-600');
      expect(classes).toContain('border-blue-200');
      expect(classes).toContain('shadow-blue-500/25');
    });
  });

  describe('calculateStaggerDelay', () => {
    it('calculates staggered delays correctly', () => {
      const delays = calculateStaggerDelay(3, 0.1);
      expect(delays).toEqual([0, 0.1, 0.2]);
    });
  });
});
```

## Development Guidelines

### Creating New Utilities

1. **Identify Common Patterns**: Find repeated logic across components
2. **Design Pure Functions**: Create predictable, side-effect-free functions
3. **Add TypeScript Types**: Comprehensive interfaces for parameters and returns
4. **Optimize Performance**: Consider memoization and efficient algorithms
5. **Handle Edge Cases**: Account for invalid inputs and boundary conditions
6. **Add Tests**: Unit tests covering all functionality and edge cases
7. **Document Usage**: Clear examples and API documentation

### Code Quality Standards

- **Pure Functions**: No side effects, predictable outputs
- **TypeScript Strict**: All utilities must pass strict type checking
- **Performance**: Optimize for common use cases and large datasets
- **Testing**: Comprehensive unit test coverage
- **Documentation**: JSDoc comments and usage examples
- **Consistency**: Follow established patterns and naming conventions

## Related Documentation

- **[Hooks](../hooks/README.md)**: Hooks that use these utilities
- **[Components](../README.md)**: Components that use these utilities
- **[Theme System](../theme/README.md)**: Theme tokens and configuration
- **[Performance Guide](../docs/performance.md)**: Performance optimization patterns

---

**Utility Categories**: Classes, Theme, Animation, Composition  
**Total Functions**: 20+  
**Test Coverage**: Comprehensive unit tests  
**Status**: ✅ Complete  
**Last Updated**: January 2025