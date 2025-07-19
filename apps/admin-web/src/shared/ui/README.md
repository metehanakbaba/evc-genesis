# Atomic Design System

This directory contains the atomic design system for the admin-web application, providing a structured approach to building UI components through composition of smaller, focused pieces.

## Architecture

The system follows atomic design principles with a clear hierarchy:

```
src/shared/ui/
├── atoms/           # Basic building blocks (buttons, inputs, icons)
├── molecules/       # Simple combinations of atoms (form fields, cards)
├── organisms/       # Complex combinations (navigation, sections)
├── templates/       # Page-level layouts
├── hooks/          # Shared UI hooks
├── utils/          # Utility functions
├── theme/          # Design tokens and theming
└── components/     # Legacy components (to be migrated)
```

## Design Principles

### 1. Atomic Design Hierarchy

- **Atoms**: Smallest, indivisible UI components (GlowOrb, AccentDot, IconContainer)
- **Molecules**: Simple combinations of atoms with a single responsibility (StatValue, TrendIndicator)
- **Organisms**: Complex components combining multiple molecules (StatCard, RouteTransition)
- **Templates**: Page-level layouts combining organisms

### 2. Composition Over Inheritance

Components are built by composing smaller pieces rather than extending large base classes:

```typescript
// Instead of a monolithic component
<RevolutionaryStatCard />

// Use composed atomic components
<StatCard>
  <StatCard.Background>
    <GlowOrb variant="blue" />
    <AccentDot position="top-right" />
  </StatCard.Background>
  <StatCard.Content>
    <StatValue value="1,234" title="Active Sessions" />
    <TrendIndicator trend="+12%" />
  </StatCard.Content>
</StatCard>
```

### 3. Consistent Theming

All components use a unified theming system with:

- **Variants**: `blue`, `emerald`, `purple`, `teal`
- **Sizes**: `xs`, `sm`, `md`, `lg`, `xl`
- **Animations**: Consistent timing and easing functions
- **Effects**: Standardized blur, glow, and opacity values

## Usage

### Basic Component Usage

```typescript
import { GlowOrb, StatCard, useComponentTheme } from '@/shared/ui';

function MyComponent() {
  const { classes } = useComponentTheme('blue', 'md');
  
  return (
    <div className={classes.base}>
      <GlowOrb variant="blue" size="lg" animated />
      <StatCard
        title="Active Users"
        value="1,234"
        variant="blue"
        trend="+12%"
      />
    </div>
  );
}
```

### Composition with Hooks

```typescript
import { useComposition, useAnimation } from '@/shared/ui';

function AnimatedCard({ children, ...props }) {
  const { composedProps, enhanceChildren } = useComposition(props);
  const { animationClasses } = useAnimation({ animated: true });
  
  return (
    <div className={`${composedProps.className} ${animationClasses}`}>
      {enhanceChildren(children)}
    </div>
  );
}
```

### Theme Customization

```typescript
import { useComponentTheme, createThemeClasses } from '@/shared/ui';

function ThemedComponent({ variant = 'blue', size = 'md' }) {
  const { tokens, classes } = useComponentTheme(variant, size);
  
  const customClasses = createThemeClasses(variant, size, {
    includeGlow: true,
    includeBorder: true,
    includeHover: true,
  });
  
  return (
    <div 
      className={customClasses}
      style={{
        animationDuration: tokens.animations.durations.normal,
      }}
    >
      Content
    </div>
  );
}
```

## Component Categories

### Atoms

Basic building blocks that cannot be broken down further:

- `GlowOrb` - Animated gradient orbs with inline CSS gradients for optimal performance
- `AccentDot` - Small floating accent elements with positioning and animation
- `IconContainer` - Interactive icon wrapper with hover effects and accessibility
- `GeometricDecoration` - Reusable geometric shapes with pattern variants
- `TextElement` - Typography atoms with semantic HTML and truncation support

**Recent Updates:**
- ✅ **GlowOrb Performance Optimization**: Removed dependency on `atomicTokens` and implemented inline gradient definitions for better compatibility and performance
- ✅ **Complete Type Safety**: All atoms include comprehensive TypeScript interfaces
- ✅ **Full Test Coverage**: 181 unit tests covering all atomic components

### Molecules

Simple combinations of atoms:

- `StatValue` - Value display with icon and formatting
- `TrendIndicator` - Status and trend display
- `BackgroundEffects` - Collections of animated background elements
- `FloatingAccents` - Coordinated floating accent collections

### Organisms

Complex combinations for complete UI sections:

- `StatCard` - Complete statistics card with all effects
- `RouteTransition` - Page transition system
- `Card` - Unified card component with variants

## Migration Strategy

The system is designed to gradually replace existing components:

1. **Phase 1**: Create atomic components alongside existing ones
2. **Phase 2**: Build molecules and organisms using atoms
3. **Phase 3**: Replace existing components with atomic versions
4. **Phase 4**: Remove duplicate components and optimize

## Development Guidelines

### Creating New Components

1. **Start with atoms**: Break complex components into smallest possible pieces
2. **Use composition**: Build larger components by combining smaller ones
3. **Follow naming conventions**: Use descriptive, purpose-based names
4. **Include TypeScript types**: Comprehensive interfaces for all props
5. **Add tests**: Unit tests for atoms, integration tests for molecules/organisms
6. **Document usage**: JSDoc comments and usage examples

### Best Practices

- **Single Responsibility**: Each component should have one clear purpose
- **Prop Consistency**: Use standard prop patterns across similar components
- **Performance**: Optimize for re-renders and bundle size
- **Accessibility**: Ensure all components meet WCAG guidelines
- **Testing**: Comprehensive test coverage for all component levels

## Utilities

### Hooks

- `useComponentTheme` - Theme management and class generation
- `useAnimation` - Animation control and timing
- `useComposition` - Component composition utilities
- `useHoverAnimation` - Hover effect management

### Utilities

- `cn()` - Class name concatenation with filtering
- `createThemeClasses()` - Dynamic theme class generation
- `getVariantColors()` - Variant-specific color retrieval
- `composeComponents()` - Component composition helpers

## Theme System

The atomic design system includes a comprehensive theming system:

```typescript
// Variant colors
const variants = {
  blue: { primary: 'blue-500', glow: 'blue-400/15' },
  emerald: { primary: 'emerald-500', glow: 'emerald-400/15' },
  // ...
};

// Size scale
const sizes = {
  xs: { scale: '0.75', spacing: '0.25rem' },
  md: { scale: '1', spacing: '0.75rem' },
  // ...
};

// Animation system
const animations = {
  durations: { fast: '150ms', normal: '300ms' },
  easings: { smooth: 'cubic-bezier(0.4, 0, 0.2, 1)' },
};
```

## Contributing

When adding new components:

1. Follow the atomic design hierarchy
2. Use existing design tokens and utilities
3. Include comprehensive TypeScript types
4. Add unit tests and documentation
5. Update this README with new components

For questions or guidance, refer to the design document at `.kiro/specs/component-granular-refactoring/design.md`.