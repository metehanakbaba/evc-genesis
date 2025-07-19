# BackgroundEffects Molecule Component

> **Advanced atomic composition component that orchestrates multiple GlowOrb atoms into coordinated background collections**

## Overview

The `BackgroundEffects` component is a sophisticated molecule that demonstrates the power of atomic design by composing multiple `GlowOrb` atoms into visually stunning background effects. It provides five distinct positioning patterns and extensive customization options for creating dynamic, animated backgrounds.

## Features

- ✅ **Atomic Composition**: Built from multiple `GlowOrb` atoms
- ✅ **5 Positioning Patterns**: random, grid, corners, center, edges
- ✅ **Dynamic Configuration**: Customizable orb count and individual properties
- ✅ **Animation Coordination**: Staggered delays for natural movement
- ✅ **Responsive Design**: Container-aware sizing and positioning
- ✅ **Performance Optimized**: Efficient rendering with minimal re-calculations
- ✅ **TypeScript Support**: Comprehensive interfaces and type safety

## API Reference

### Props Interface

```typescript
interface BackgroundEffectsProps extends BaseComponentProps, VariantProps, SizeProps {
  /** Number of orbs to render */
  orbCount?: number;
  /** Animation intensity for all orbs */
  intensity?: 'subtle' | 'medium' | 'strong';
  /** Blur level for all orbs */
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  /** Enable coordinated animations */
  animated?: boolean;
  /** Base animation speed multiplier */
  animationSpeed?: number;
  /** Layout pattern for orb positioning */
  pattern?: 'random' | 'grid' | 'corners' | 'center' | 'edges';
  /** Container dimensions */
  containerWidth?: string;
  containerHeight?: string;
  /** Enable responsive behavior */
  responsive?: boolean;
  /** Custom orb configurations */
  customOrbs?: Array<{
    variant?: 'blue' | 'emerald' | 'purple' | 'teal';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    position?: { top?: string; left?: string; right?: string; bottom?: string };
    animationDelay?: number;
    intensity?: 'subtle' | 'medium' | 'strong';
  }>;
}
```

### Default Values

```typescript
const defaultProps = {
  variant: 'blue',
  size: 'md',
  intensity: 'medium',
  blur: 'md',
  animated: true,
  animationSpeed: 1,
  pattern: 'random',
  containerWidth: '100%',
  containerHeight: '100%',
  responsive: true,
};
```

## Usage Examples

### Basic Usage

```typescript
import { BackgroundEffects } from '@/shared/ui';

// Simple background with random pattern
<BackgroundEffects 
  variant="blue" 
  size="md" 
  pattern="random" 
  animated 
/>
```

### Advanced Configuration

```typescript
// Custom orb configuration with mixed variants
<BackgroundEffects
  orbCount={6}
  intensity="strong"
  pattern="corners"
  animationSpeed={1.2}
  blur="lg"
  customOrbs={[
    { 
      variant: 'emerald', 
      size: 'lg', 
      position: { top: '20%', left: '30%' },
      animationDelay: 0.5
    },
    { 
      variant: 'purple', 
      size: 'md', 
      position: { bottom: '10%', right: '20%' },
      animationDelay: 1.0
    }
  ]}
/>
```

### Responsive Container

```typescript
// Grid pattern with responsive container
<BackgroundEffects
  variant="teal"
  size="lg"
  pattern="grid"
  orbCount={9}
  containerWidth="100%"
  containerHeight="400px"
  responsive
/>
```

### Dashboard Background

```typescript
// Dashboard card background
<div className="relative overflow-hidden rounded-lg bg-gray-900/50 p-6">
  <BackgroundEffects
    variant="blue"
    pattern="corners"
    orbCount={4}
    intensity="subtle"
    animated
  />
  <div className="relative z-10">
    {/* Your content here */}
  </div>
</div>
```

## Positioning Patterns

### Random Pattern
- **Description**: Dynamic positioning using Math.random() for unique layouts
- **Use Case**: General backgrounds, varied visual interest
- **Behavior**: Each orb positioned randomly within container bounds

```typescript
<BackgroundEffects pattern="random" orbCount={5} />
```

### Grid Pattern
- **Description**: Organized grid layout based on orb count
- **Use Case**: Structured backgrounds, organized layouts
- **Behavior**: Orbs arranged in calculated grid formation

```typescript
<BackgroundEffects pattern="grid" orbCount={9} />
```

### Corners Pattern
- **Description**: Strategic corner positioning for frame effects
- **Use Case**: Card backgrounds, bordered content
- **Behavior**: Orbs positioned at container corners

```typescript
<BackgroundEffects pattern="corners" orbCount={4} />
```

### Center Pattern
- **Description**: Circular arrangement around center point
- **Use Case**: Hero sections, focal content
- **Behavior**: Orbs arranged in circle around container center

```typescript
<BackgroundEffects pattern="center" orbCount={6} />
```

### Edges Pattern
- **Description**: Positioned along container edges for border effects
- **Use Case**: Page borders, section dividers
- **Behavior**: Orbs positioned along container edges

```typescript
<BackgroundEffects pattern="edges" orbCount={8} />
```

## Size Configurations

The component automatically adjusts orb sizes based on the `size` prop:

| Size | Orb Sizes | Default Count | Use Case |
|------|-----------|---------------|----------|
| `xs` | xs, xs, sm | 3 | Small cards, compact layouts |
| `sm` | xs, sm, sm, md | 4 | Medium cards, sidebars |
| `md` | sm, md, md, lg | 5 | Standard cards, main content |
| `lg` | md, lg, lg, xl | 6 | Large sections, hero areas |
| `xl` | lg, xl, xl, xl | 8 | Full-page backgrounds, landing pages |

## Animation System

### Coordinated Timing
- **Staggered Delays**: Each orb has a calculated delay (index * 0.5s)
- **Speed Control**: Global animation speed multiplier
- **Natural Movement**: Prevents synchronized, robotic animations

### Performance Optimization
- **Efficient Rendering**: Minimal re-calculations on prop changes
- **Memory Management**: Optimized orb generation and positioning
- **Animation Performance**: Hardware-accelerated CSS animations

## Integration Examples

### With RouteTransition Organism

```typescript
// Used in RouteTransition for dynamic backgrounds
<RouteTransition>
  <BackgroundEffects 
    pattern="random" 
    variant="blue" 
    animated 
  />
  <YourPageContent />
</RouteTransition>
```

### With StatCard Organism

```typescript
// Card background effects
<StatCard>
  <StatCard.Background>
    <BackgroundEffects 
      variant="emerald" 
      pattern="corners" 
      intensity="subtle" 
    />
  </StatCard.Background>
  <StatCard.Content>
    <StatValue value="1,234" title="Active Users" />
  </StatCard.Content>
</StatCard>
```

## Accessibility

- **Pointer Events**: Disabled to prevent interaction interference
- **Reduced Motion**: Respects user motion preferences
- **Screen Readers**: Properly hidden from assistive technology
- **Focus Management**: Does not interfere with keyboard navigation

## Testing

### Unit Tests

```typescript
import { render, screen } from '@testing-library/react';
import { BackgroundEffects } from './BackgroundEffects';

describe('BackgroundEffects', () => {
  it('renders with correct pattern data attribute', () => {
    render(<BackgroundEffects pattern="grid" data-testid="bg-effects" />);
    expect(screen.getByTestId('bg-effects')).toHaveAttribute('data-pattern', 'grid');
  });

  it('generates correct number of orbs', () => {
    render(<BackgroundEffects orbCount={5} data-testid="bg-effects" />);
    const orbs = screen.getAllByTestId(/bg-effects-orb-/);
    expect(orbs).toHaveLength(5);
  });
});
```

### Visual Testing

```typescript
// Storybook stories for visual regression testing
export const RandomPattern = () => (
  <BackgroundEffects pattern="random" variant="blue" />
);

export const GridPattern = () => (
  <BackgroundEffects pattern="grid" variant="emerald" orbCount={9} />
);

export const CustomOrbs = () => (
  <BackgroundEffects
    customOrbs={[
      { variant: 'purple', size: 'lg', position: { top: '10%', left: '10%' } },
      { variant: 'teal', size: 'md', position: { bottom: '10%', right: '10%' } }
    ]}
  />
);
```

## Performance Considerations

### Optimization Tips

1. **Limit Orb Count**: Keep orbCount reasonable (3-8 for most use cases)
2. **Use Appropriate Sizes**: Match size to container and use case
3. **Consider Animation**: Disable animations for performance-critical areas
4. **Pattern Selection**: Random pattern has slight calculation overhead

### Memory Usage

- **Lightweight**: Each orb is a simple div with CSS gradients
- **Efficient**: No heavy JavaScript animations or complex calculations
- **Scalable**: Performance scales linearly with orb count

## Browser Support

- **Modern Browsers**: Full support in all modern browsers
- **CSS Gradients**: Requires CSS gradient support
- **CSS Animations**: Graceful degradation without animation support
- **Responsive**: Works across all screen sizes and devices

## Migration Guide

### From Legacy Background Components

```typescript
// Before: Legacy background component
<LegacyBackground type="orbs" count={5} color="blue" />

// After: BackgroundEffects molecule
<BackgroundEffects 
  variant="blue" 
  orbCount={5} 
  pattern="random" 
  animated 
/>
```

### From Manual GlowOrb Composition

```typescript
// Before: Manual composition
<div className="absolute inset-0">
  <GlowOrb variant="blue" style={{ top: '10%', left: '20%' }} />
  <GlowOrb variant="blue" style={{ top: '60%', right: '15%' }} />
  <GlowOrb variant="blue" style={{ bottom: '20%', left: '30%' }} />
</div>

// After: BackgroundEffects with pattern
<BackgroundEffects 
  variant="blue" 
  pattern="random" 
  orbCount={3} 
/>
```

## Related Components

- **[GlowOrb](../atoms/GlowOrb/README.md)**: Base atom component
- **[FloatingAccents](../FloatingAccents/README.md)**: Complementary molecule
- **[RouteTransition](../organisms/RouteTransition/README.md)**: Consumer organism
- **[StatCard](../organisms/StatCard/README.md)**: Consumer organism

## Contributing

When contributing to BackgroundEffects:

1. **Maintain Atomic Principles**: Keep composition focused on GlowOrb atoms
2. **Add Pattern Tests**: Test new positioning patterns thoroughly
3. **Performance First**: Consider performance impact of new features
4. **Documentation**: Update this README for any API changes
5. **Accessibility**: Ensure changes maintain accessibility compliance

---

**Component Type**: Molecule  
**Atomic Composition**: Multiple GlowOrb atoms  
**Last Updated**: January 2025  
**Version**: 1.0.0  
**Status**: ✅ Complete