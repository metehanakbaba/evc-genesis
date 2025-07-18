# Design Document

## Overview

This design outlines the refactoring of the admin-web component system to eliminate duplication, create granular reusable components, and establish a clear atomic design hierarchy. The current system has significant duplication between `src/components/ui` and `src/shared/ui/components`, and components are often monolithic with complex internal logic that should be broken down.

## Architecture

### Current State Analysis

The current architecture has several issues:
1. **Duplication**: Identical components exist in both `src/components/ui` and `src/shared/ui/components`
2. **Monolithic Components**: Complex components like `RevolutionaryStatCard` and `RouteTransition` contain multiple responsibilities
3. **Inconsistent Exports**: Different export patterns across similar components
4. **Mixed Abstractions**: Atomic elements mixed with complex composed components

### Target Architecture

The new architecture will follow atomic design principles with a clear hierarchy:

```
src/shared/ui/
├── atoms/           # Basic building blocks
├── molecules/       # Simple combinations of atoms
├── organisms/       # Complex combinations of molecules
├── templates/       # Page-level layouts
├── hooks/          # Shared UI hooks
├── utils/          # UI utilities
└── index.ts        # Single export point
```

## Components and Interfaces

### Atomic Design Hierarchy

#### Atoms (Basic Building Blocks)
- **GlowOrb**: Animated gradient orbs used in backgrounds
- **AccentDot**: Small floating accent elements
- **GradientOverlay**: Reusable gradient overlay effects
- **AnimatedBorder**: Animated border effects
- **IconContainer**: Standardized icon wrapper with variants
- **TextElement**: Typography atoms with variants
- **GeometricDecoration**: Reusable geometric shapes

#### Molecules (Simple Combinations)
- **StatValue**: Value display with icon and trend
- **CardHeader**: Standardized card header with title/description
- **CardBody**: Card content wrapper
- **CardFooter**: Card footer with actions
- **TrendIndicator**: Live status and trend display
- **FloatingAccents**: Collection of floating accent elements
- **BackgroundEffects**: Animated background element collections

#### Organisms (Complex Combinations)
- **StatCard**: Complete stat card composed from atoms/molecules
- **RevolutionaryCard**: Enhanced card with all effects
- **RouteTransition**: Page transition system
- **LoadingVisual**: Complex loading animations

### Component Breakdown Examples

#### RevolutionaryStatCard Decomposition

Current monolithic component will be broken into:

```typescript
// Atoms
<GlowOrb variant="blue" size="lg" position="background" />
<AccentDot variant="blue" size="sm" position="top-right" animated />
<IconContainer variant="blue" size="md" glowEffect />
<GeometricDecoration variant="circles" position="bottom-right" />

// Molecules  
<TrendIndicator status="live" trend="+12%" />
<StatValue value="1,234" title="Active Sessions" />

// Organism
<RevolutionaryStatCard>
  <StatCard.Background>
    <GlowOrb />
    <AccentDot />
  </StatCard.Background>
  <StatCard.Content>
    <StatValue />
    <TrendIndicator />
  </StatCard.Content>
  <StatCard.Decoration>
    <GeometricDecoration />
  </StatCard.Decoration>
</RevolutionaryStatCard>
```

#### RouteTransition Decomposition

```typescript
// Atoms
<AnimatedOrb variant="blue" />
<ExitParticle index={i} />
<TrailEffect direction="horizontal" />

// Molecules
<BackgroundEffects>
  <AnimatedOrb />
  <AnimatedOrb />
  <AnimatedOrb />
</BackgroundEffects>
<FloatingAccents>
  <AccentDot />
  <AccentDot />
  <AccentDot />
</FloatingAccents>
<ExitParticles count={8} />

// Organism
<RouteTransition>
  <RouteTransition.Background>
    <BackgroundEffects />
  </RouteTransition.Background>
  <RouteTransition.Content>
    {children}
  </RouteTransition.Content>
  <RouteTransition.Accents>
    <FloatingAccents />
  </RouteTransition.Accents>
</RouteTransition>
```

## Data Models

### Component Props Interfaces

```typescript
// Base interfaces for all components
interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  'data-testid'?: string;
}

interface VariantProps {
  variant?: 'blue' | 'emerald' | 'purple' | 'teal';
}

interface SizeProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

interface AnimationProps {
  animated?: boolean;
  animationSpeed?: number;
  animationDelay?: number;
}

// Atom-specific interfaces
interface GlowOrbProps extends BaseComponentProps, VariantProps, SizeProps {
  position?: 'background' | 'foreground';
  intensity?: 'subtle' | 'medium' | 'strong';
  blur?: 'sm' | 'md' | 'lg' | 'xl';
}

interface AccentDotProps extends BaseComponentProps, VariantProps, SizeProps, AnimationProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  opacity?: number;
}

interface IconContainerProps extends BaseComponentProps, VariantProps, SizeProps {
  icon: React.ComponentType<{ className?: string }>;
  glowEffect?: boolean;
  hoverScale?: boolean;
}

// Molecule-specific interfaces
interface StatValueProps extends BaseComponentProps {
  value: string;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  variant?: 'blue' | 'emerald' | 'purple' | 'teal';
}

interface TrendIndicatorProps extends BaseComponentProps {
  status?: 'live' | 'offline' | 'warning';
  trend?: string;
  animated?: boolean;
}

// Organism-specific interfaces
interface StatCardProps extends BaseComponentProps, VariantProps, SizeProps {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: string;
  description?: string;
  onClick?: () => void;
}
```

### Theme Configuration

```typescript
interface ComponentTheme {
  variants: {
    blue: VariantTheme;
    emerald: VariantTheme;
    purple: VariantTheme;
    teal: VariantTheme;
  };
  sizes: {
    xs: SizeTheme;
    sm: SizeTheme;
    md: SizeTheme;
    lg: SizeTheme;
    xl: SizeTheme;
  };
  animations: {
    durations: Record<string, number>;
    easings: Record<string, string>;
  };
}

interface VariantTheme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    border: string;
    text: string;
  };
  gradients: {
    background: string;
    glow: string;
    accent: string;
  };
}
```

## Error Handling

### Component Error Boundaries

Each organism-level component will have error boundary protection:

```typescript
interface ComponentErrorBoundaryProps {
  fallback?: React.ComponentType<{ error: Error }>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  children: React.ReactNode;
}

// Usage
<ComponentErrorBoundary fallback={StatCardFallback}>
  <StatCard {...props} />
</ComponentErrorBoundary>
```

### Prop Validation

All components will include comprehensive prop validation:

```typescript
// Runtime prop validation for development
const validateProps = (props: StatCardProps): void => {
  if (process.env.NODE_ENV === 'development') {
    if (!props.title) {
      console.warn('StatCard: title prop is required');
    }
    if (!props.value) {
      console.warn('StatCard: value prop is required');
    }
    // Additional validations...
  }
};
```

### Graceful Degradation

Components will gracefully handle missing or invalid props:

```typescript
const StatCard: React.FC<StatCardProps> = ({
  title = 'Untitled',
  value = '0',
  variant = 'blue',
  icon: Icon = DefaultIcon,
  ...props
}) => {
  // Component implementation with safe defaults
};
```

## Testing Strategy

### Unit Testing Approach

Each atomic component will have comprehensive unit tests:

```typescript
// atoms/GlowOrb.test.tsx
describe('GlowOrb', () => {
  it('renders with correct variant classes', () => {
    render(<GlowOrb variant="blue" />);
    expect(screen.getByTestId('glow-orb')).toHaveClass('bg-blue-500/15');
  });

  it('applies size classes correctly', () => {
    render(<GlowOrb size="lg" />);
    expect(screen.getByTestId('glow-orb')).toHaveClass('w-32', 'h-32');
  });

  it('handles animation props', () => {
    render(<GlowOrb animated animationSpeed={2} />);
    // Test animation behavior
  });
});
```

### Integration Testing

Molecule and organism components will have integration tests:

```typescript
// organisms/StatCard.test.tsx
describe('StatCard Integration', () => {
  it('composes atoms and molecules correctly', () => {
    render(
      <StatCard
        title="Test Stat"
        value="123"
        icon={TestIcon}
        variant="blue"
      />
    );
    
    // Verify all sub-components are rendered
    expect(screen.getByTestId('stat-value')).toBeInTheDocument();
    expect(screen.getByTestId('icon-container')).toBeInTheDocument();
    expect(screen.getByTestId('glow-orb')).toBeInTheDocument();
  });
});
```

### Visual Regression Testing

Components will include visual regression tests:

```typescript
// Visual tests using Storybook and Chromatic
export const StatCardVariants = () => (
  <div className="grid grid-cols-2 gap-4">
    <StatCard variant="blue" title="Blue Variant" value="123" icon={TestIcon} />
    <StatCard variant="emerald" title="Emerald Variant" value="456" icon={TestIcon} />
    <StatCard variant="purple" title="Purple Variant" value="789" icon={TestIcon} />
    <StatCard variant="teal" title="Teal Variant" value="012" icon={TestIcon} />
  </div>
);
```

### Performance Testing

Components will be tested for performance:

```typescript
// Performance tests
describe('StatCard Performance', () => {
  it('renders within performance budget', async () => {
    const startTime = performance.now();
    render(<StatCard {...defaultProps} />);
    const endTime = performance.now();
    
    expect(endTime - startTime).toBeLessThan(16); // 60fps budget
  });

  it('handles re-renders efficiently', () => {
    const { rerender } = render(<StatCard {...defaultProps} />);
    
    // Test multiple re-renders don't cause performance issues
    for (let i = 0; i < 100; i++) {
      rerender(<StatCard {...defaultProps} value={`${i}`} />);
    }
  });
});
```

## Migration Strategy

### Phase 1: Create Atomic Components
1. Extract atoms from existing components
2. Create comprehensive prop interfaces
3. Add unit tests for each atom
4. Document usage patterns

### Phase 2: Build Molecules
1. Compose atoms into molecules
2. Create integration tests
3. Ensure backward compatibility
4. Update documentation

### Phase 3: Refactor Organisms
1. Replace monolithic components with composed versions
2. Maintain existing APIs for backward compatibility
3. Add deprecation warnings for old patterns
4. Update all usage sites

### Phase 4: Cleanup and Optimization
1. Remove duplicate components
2. Consolidate export patterns
3. Optimize bundle size
4. Final documentation update

## File Structure

```
src/shared/ui/
├── atoms/
│   ├── GlowOrb/
│   │   ├── GlowOrb.tsx
│   │   ├── GlowOrb.test.tsx
│   │   ├── GlowOrb.stories.tsx
│   │   └── index.ts
│   ├── AccentDot/
│   ├── IconContainer/
│   └── index.ts
├── molecules/
│   ├── StatValue/
│   ├── TrendIndicator/
│   ├── CardHeader/
│   └── index.ts
├── organisms/
│   ├── StatCard/
│   ├── RouteTransition/
│   └── index.ts
├── hooks/
│   ├── useComponentTheme.ts
│   ├── useAnimation.ts
│   └── index.ts
├── utils/
│   ├── theme.ts
│   ├── animations.ts
│   └── index.ts
└── index.ts
```

This design ensures a clean separation of concerns, eliminates duplication, and creates a maintainable component system that follows atomic design principles while preserving all existing functionality and visual design.