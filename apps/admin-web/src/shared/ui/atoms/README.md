# Atomic Components

> **The fundamental building blocks of our design system**

Atoms are the smallest, most basic UI components that cannot be broken down further. They serve as the foundation for all other components in the atomic design system and represent the core visual and interactive elements.

## Design Philosophy

Atoms follow these core principles:

- **Single Responsibility**: Each atom has one clear, focused purpose
- **Reusability**: Designed to be used across multiple contexts
- **Composability**: Built to work together in larger components
- **Consistency**: Unified theming and behavior patterns
- **Accessibility**: WCAG compliant with proper semantic markup

## Available Atoms

### GlowOrb
**Purpose**: Animated gradient orbs for background effects and visual enhancement

```typescript
<GlowOrb 
  variant="blue" 
  size="lg" 
  intensity="medium" 
  animated 
/>
```

**Key Features**:
- 4 color variants (blue, emerald, purple, teal)
- 5 size options (xs, sm, md, lg, xl)
- 3 intensity levels (subtle, medium, strong)
- Smooth CSS animations with customizable timing
- Optimized inline gradients for performance

### AccentDot
**Purpose**: Small floating accent elements for visual decoration

```typescript
<AccentDot 
  variant="emerald" 
  size="sm" 
  position="top-right" 
  animated 
/>
```

**Key Features**:
- 5 positioning options (corners + center)
- Coordinated animation timing
- Opacity and scale controls
- Responsive positioning

### IconContainer
**Purpose**: Standardized icon wrapper with interactive states

```typescript
<IconContainer 
  icon={UserIcon} 
  variant="blue" 
  size="md" 
  glowEffect 
  onClick={handleClick}
/>
```

**Key Features**:
- Interactive states (hover, focus, disabled)
- Accessibility support (keyboard navigation)
- Glow effects and scaling animations
- Consistent sizing and spacing

### GeometricDecoration
**Purpose**: Reusable geometric shapes for visual enhancement

```typescript
<GeometricDecoration 
  shape="circle" 
  pattern="dashed" 
  thickness="medium" 
  variant="purple"
/>
```

**Key Features**:
- 5 shape types (circle, ring, line, arc, dots)
- 4 pattern options (solid, dashed, dotted, gradient)
- 3 thickness levels
- Flexible positioning

### TextElement
**Purpose**: Typography atoms with semantic HTML and styling variants

```typescript
<TextElement 
  as="h2" 
  size="lg" 
  weight="semibold" 
  color="primary" 
  truncate={2}
>
  Heading Text
</TextElement>
```

**Key Features**:
- Semantic HTML elements (h1-h6, p, span, div, label)
- 6 font weight options
- Multi-line truncation support
- Responsive text sizing
- Accessibility-compliant markup

## Common Props Pattern

All atoms share a consistent prop interface:

```typescript
interface BaseAtomProps {
  // Styling
  variant?: 'blue' | 'emerald' | 'purple' | 'teal';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  // Behavior
  animated?: boolean;
  animationSpeed?: number;
  animationDelay?: number;
  
  // Layout
  className?: string;
  style?: React.CSSProperties;
  
  // Testing
  'data-testid'?: string;
  
  // Accessibility
  'aria-label'?: string;
  'aria-hidden'?: boolean;
}
```

## Theming System

### Variants
Each atom supports four color variants:

```typescript
const variants = {
  blue: {
    primary: 'rgb(59 130 246)',      // blue-500
    secondary: 'rgb(147 197 253)',   // blue-300
    accent: 'rgb(59 130 246 / 0.15)', // blue-500/15
  },
  emerald: {
    primary: 'rgb(16 185 129)',      // emerald-500
    secondary: 'rgb(110 231 183)',   // emerald-300
    accent: 'rgb(16 185 129 / 0.15)', // emerald-500/15
  },
  // ... purple, teal
};
```

### Sizes
Consistent sizing scale across all atoms:

```typescript
const sizes = {
  xs: { scale: 0.75, spacing: '0.25rem' },
  sm: { scale: 0.875, spacing: '0.5rem' },
  md: { scale: 1, spacing: '0.75rem' },
  lg: { scale: 1.125, spacing: '1rem' },
  xl: { scale: 1.25, spacing: '1.25rem' },
};
```

## Usage Guidelines

### Composition Patterns

**Building Molecules**: Combine atoms to create more complex components

```typescript
// StatValue molecule composed from atoms
function StatValue({ value, title, icon: Icon }) {
  return (
    <div className="flex items-center gap-3">
      <IconContainer icon={Icon} variant="blue" size="md" />
      <div>
        <TextElement as="div" size="sm" color="secondary">
          {title}
        </TextElement>
        <TextElement as="div" size="lg" weight="semibold">
          {value}
        </TextElement>
      </div>
    </div>
  );
}
```

**Background Effects**: Layer atoms for visual depth

```typescript
// Background composition
<div className="relative">
  <GlowOrb variant="blue" size="lg" intensity="subtle" />
  <AccentDot variant="blue" position="top-right" />
  <GeometricDecoration shape="circle" pattern="dashed" />
  <div className="relative z-10">
    {/* Content */}
  </div>
</div>
```

### Performance Considerations

- **Limit Animation Count**: Avoid too many animated atoms simultaneously
- **Use Appropriate Sizes**: Match atom sizes to their context
- **Optimize Renders**: Use React.memo for frequently re-rendered atoms
- **CSS Over JS**: Prefer CSS animations over JavaScript-based animations

### Accessibility Best Practices

- **Semantic Markup**: Use appropriate HTML elements (TextElement)
- **Keyboard Navigation**: Ensure interactive atoms are keyboard accessible
- **Screen Readers**: Provide proper ARIA labels and descriptions
- **Motion Preferences**: Respect user's reduced motion settings
- **Color Contrast**: Ensure sufficient contrast ratios

## Testing Atoms

### Unit Testing Pattern

```typescript
import { render, screen } from '@testing-library/react';
import { GlowOrb } from './GlowOrb';

describe('GlowOrb', () => {
  it('renders with correct variant classes', () => {
    render(<GlowOrb variant="blue" data-testid="glow-orb" />);
    const orb = screen.getByTestId('glow-orb');
    expect(orb).toHaveClass('bg-blue-500/15');
  });

  it('applies size classes correctly', () => {
    render(<GlowOrb size="lg" data-testid="glow-orb" />);
    expect(screen.getByTestId('glow-orb')).toHaveClass('w-32', 'h-32');
  });

  it('handles animation props', () => {
    render(<GlowOrb animated animationSpeed={2} data-testid="glow-orb" />);
    const orb = screen.getByTestId('glow-orb');
    expect(orb).toHaveStyle({ animationDuration: '1.5s' });
  });
});
```

### Visual Regression Testing

```typescript
// Storybook stories for visual testing
export const AllVariants = () => (
  <div className="flex gap-4">
    <GlowOrb variant="blue" />
    <GlowOrb variant="emerald" />
    <GlowOrb variant="purple" />
    <GlowOrb variant="teal" />
  </div>
);

export const AllSizes = () => (
  <div className="flex items-center gap-4">
    <GlowOrb size="xs" />
    <GlowOrb size="sm" />
    <GlowOrb size="md" />
    <GlowOrb size="lg" />
    <GlowOrb size="xl" />
  </div>
);
```

## Migration from Legacy Components

### Replacing Inline Styles

```typescript
// Before: Inline styles and hardcoded values
<div 
  className="w-8 h-8 rounded-full bg-blue-500 opacity-20 animate-pulse"
  style={{ filter: 'blur(8px)' }}
/>

// After: Atomic component with consistent theming
<GlowOrb variant="blue" size="sm" intensity="subtle" animated />
```

### Consolidating Duplicate Elements

```typescript
// Before: Duplicate icon implementations
<div className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200">
  <Icon className="w-5 h-5 text-blue-600" />
</div>

// After: Standardized atom
<IconContainer icon={Icon} variant="blue" size="md" />
```

## Development Guidelines

### Creating New Atoms

1. **Identify the Need**: Ensure the component is truly atomic (indivisible)
2. **Follow Patterns**: Use existing prop patterns and theming
3. **Add TypeScript**: Comprehensive interfaces and prop validation
4. **Write Tests**: Unit tests covering all variants and props
5. **Document Usage**: JSDoc comments and usage examples
6. **Update Index**: Add to atoms/index.ts exports

### Code Quality Standards

- **TypeScript Strict Mode**: All atoms must pass strict type checking
- **ESLint Compliance**: Follow project linting rules
- **Performance**: Optimize for re-renders and bundle size
- **Accessibility**: Meet WCAG 2.1 AA standards
- **Browser Support**: Test across supported browser matrix

## Related Documentation

- **[Molecules](../molecules/README.md)**: Components built from atoms
- **[Organisms](../organisms/README.md)**: Complex compositions
- **[Theme System](../theme/README.md)**: Design tokens and theming
- **[Hooks](../hooks/README.md)**: Shared UI hooks for atoms

---

**Component Level**: Atoms  
**Total Components**: 5  
**Test Coverage**: 181 unit tests  
**Status**: ✅ Complete  
**Last Updated**: January 2025