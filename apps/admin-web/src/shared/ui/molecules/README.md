# Molecule Components

> **Simple combinations of atoms with focused responsibilities**

Molecules are components that combine multiple atoms to create more complex UI elements while maintaining a single, focused responsibility. They represent the first level of composition in our atomic design system.

## Design Philosophy

Molecules follow these core principles:

- **Focused Composition**: Combine 2-5 atoms for a specific purpose
- **Single Responsibility**: Each molecule has one clear function
- **Reusable Logic**: Encapsulate common atom combinations
- **Consistent Interface**: Unified prop patterns across molecules
- **Testable Units**: Easy to test in isolation

## Available Molecules

### StatValue
**Purpose**: Display statistical values with optional icons, trends, and formatting

```typescript
<StatValue
  value="1,234"
  title="Active Users"
  icon={UserIcon}
  trend="+12%"
  variant="blue"
  size="md"
  onClick={handleClick}
/>
```

**Atomic Composition**: `TextElement` + `IconContainer` + `TrendIndicator`

**Key Features**:
- Value formatting (numbers, currency, percentages)
- Optional icon display with consistent theming
- Trend indicators with positive/negative styling
- Interactive states with onClick support
- Horizontal and vertical layout orientations
- Full accessibility with keyboard navigation

### BackgroundEffects
**Purpose**: Orchestrate multiple GlowOrb atoms into coordinated background collections

```typescript
<BackgroundEffects
  variant="emerald"
  pattern="corners"
  orbCount={4}
  intensity="medium"
  animated
/>
```

**Atomic Composition**: Multiple `GlowOrb` atoms

**Key Features**:
- 5 positioning patterns (random, grid, corners, center, edges)
- Dynamic orb count and configuration
- Coordinated animation timing
- Responsive container sizing
- Custom orb configurations
- Performance optimized rendering

### FloatingAccents
**Purpose**: Create coordinated collections of floating accent elements

```typescript
<FloatingAccents
  variant="purple"
  count={6}
  pattern="scattered"
  animationSpeed={1.2}
  size="sm"
/>
```

**Atomic Composition**: Multiple `AccentDot` atoms

**Key Features**:
- Coordinated floating animations
- Multiple positioning patterns
- Staggered animation delays
- Responsive positioning
- Customizable accent properties

### TrendIndicator
**Purpose**: Display live status indicators with animated dots and trend information

```typescript
<TrendIndicator
  status="live"
  trend="+15.3%"
  label="Growth Rate"
  animated
  variant="emerald"
/>
```

**Atomic Composition**: `AccentDot` + `TextElement`

**Key Features**:
- Live status with animated indicators
- Trend direction styling (positive/negative)
- Multiple status types (live, offline, warning)
- Accessible status announcements
- Customizable trend formatting

## Common Props Pattern

All molecules share a consistent prop interface:

```typescript
interface BaseMoleculeProps extends BaseComponentProps {
  // Theming
  variant?: 'blue' | 'emerald' | 'purple' | 'teal';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  // Animation
  animated?: boolean;
  animationSpeed?: number;
  animationDelay?: number;
  
  // Interaction
  onClick?: () => void;
  onHover?: () => void;
  disabled?: boolean;
  
  // Layout
  orientation?: 'horizontal' | 'vertical';
  alignment?: 'start' | 'center' | 'end';
  
  // Accessibility
  'aria-label'?: string;
  'aria-describedby'?: string;
}
```

## Composition Patterns

### Building from Atoms

Molecules demonstrate proper atomic composition:

```typescript
// StatValue molecule implementation
function StatValue({ 
  value, 
  title, 
  icon: Icon, 
  trend, 
  variant = 'blue',
  size = 'md',
  orientation = 'vertical',
  onClick 
}) {
  return (
    <div 
      className={cn(
        'flex gap-3 p-3 rounded-lg transition-colors',
        orientation === 'horizontal' ? 'flex-row items-center' : 'flex-col',
        onClick && 'cursor-pointer hover:bg-gray-50'
      )}
      onClick={onClick}
    >
      {Icon && (
        <IconContainer 
          icon={Icon} 
          variant={variant} 
          size={size} 
          glowEffect={!!onClick}
        />
      )}
      
      <div className="flex-1">
        <TextElement 
          as="div" 
          size="sm" 
          color="secondary"
          className="mb-1"
        >
          {title}
        </TextElement>
        
        <TextElement 
          as="div" 
          size={size === 'lg' ? 'xl' : 'lg'} 
          weight="semibold"
          color="primary"
        >
          {value}
        </TextElement>
        
        {trend && (
          <TrendIndicator 
            trend={trend} 
            variant={variant} 
            size="sm" 
          />
        )}
      </div>
    </div>
  );
}
```

### Coordinated Collections

Molecules can orchestrate multiple atoms:

```typescript
// BackgroundEffects coordinating multiple GlowOrbs
function BackgroundEffects({ 
  pattern = 'random', 
  orbCount = 5, 
  variant = 'blue' 
}) {
  const positions = useMemo(() => 
    generatePositions(pattern, orbCount), 
    [pattern, orbCount]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {positions.map((position, index) => (
        <GlowOrb
          key={index}
          variant={variant}
          size={getSizeForIndex(index, orbCount)}
          intensity="medium"
          animated
          animationDelay={index * 0.5}
          style={{
            position: 'absolute',
            ...position
          }}
        />
      ))}
    </div>
  );
}
```

## Usage Guidelines

### When to Create Molecules

Create a molecule when you have:

1. **Repeated Atom Combinations**: Same atoms used together frequently
2. **Shared Logic**: Common behavior across multiple atom groups
3. **Cohesive Purpose**: Atoms work together for a single goal
4. **Reusable Pattern**: Pattern appears in multiple contexts

### Composition Best Practices

```typescript
// ✅ Good: Focused responsibility
<StatValue 
  value="1,234" 
  title="Users" 
  icon={UserIcon} 
/>

// ✅ Good: Coordinated collection
<BackgroundEffects 
  pattern="corners" 
  variant="blue" 
/>

// ❌ Avoid: Too many responsibilities
<ComplexDashboardWidget 
  stats={[...]} 
  charts={[...]} 
  actions={[...]} 
  navigation={[...]}
/>
```

### Performance Optimization

- **Memoization**: Use React.memo for expensive calculations
- **Lazy Loading**: Defer non-critical molecule rendering
- **Animation Limits**: Avoid too many simultaneous animations
- **Efficient Updates**: Minimize prop changes that trigger re-renders

```typescript
// Optimized molecule with memoization
const StatValue = React.memo(({ value, title, ...props }) => {
  const formattedValue = useMemo(() => 
    formatNumber(value), 
    [value]
  );
  
  return (
    <div {...props}>
      {/* Component implementation */}
    </div>
  );
});
```

## Testing Molecules

### Integration Testing

Test how atoms work together within molecules:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { StatValue } from './StatValue';
import { UserIcon } from '@heroicons/react/24/outline';

describe('StatValue', () => {
  it('composes atoms correctly', () => {
    render(
      <StatValue
        value="1,234"
        title="Active Users"
        icon={UserIcon}
        trend="+12%"
        variant="blue"
      />
    );

    // Test atom composition
    expect(screen.getByText('Active Users')).toBeInTheDocument();
    expect(screen.getByText('1,234')).toBeInTheDocument();
    expect(screen.getByText('+12%')).toBeInTheDocument();
    expect(screen.getByTestId('icon-container')).toBeInTheDocument();
  });

  it('handles interaction correctly', () => {
    const handleClick = jest.fn();
    render(
      <StatValue
        value="1,234"
        title="Users"
        onClick={handleClick}
      />
    );

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies theming consistently', () => {
    render(
      <StatValue
        value="1,234"
        title="Users"
        icon={UserIcon}
        variant="emerald"
        size="lg"
      />
    );

    // Verify theme propagation to atoms
    const iconContainer = screen.getByTestId('icon-container');
    expect(iconContainer).toHaveClass('text-emerald-500');
  });
});
```

### Visual Testing

```typescript
// Storybook stories for molecules
export const StatValueVariants = () => (
  <div className="grid grid-cols-2 gap-4">
    <StatValue value="1,234" title="Blue Variant" variant="blue" />
    <StatValue value="5,678" title="Emerald Variant" variant="emerald" />
    <StatValue value="9,012" title="Purple Variant" variant="purple" />
    <StatValue value="3,456" title="Teal Variant" variant="teal" />
  </div>
);

export const BackgroundEffectPatterns = () => (
  <div className="grid grid-cols-3 gap-4">
    <div className="relative h-32 bg-gray-900 rounded">
      <BackgroundEffects pattern="random" variant="blue" />
    </div>
    <div className="relative h-32 bg-gray-900 rounded">
      <BackgroundEffects pattern="grid" variant="emerald" />
    </div>
    <div className="relative h-32 bg-gray-900 rounded">
      <BackgroundEffects pattern="corners" variant="purple" />
    </div>
  </div>
);
```

## Accessibility Guidelines

### Semantic Structure

Ensure molecules maintain semantic HTML:

```typescript
// ✅ Good: Semantic structure preserved
<StatValue
  value="1,234"
  title="Active Users"
  aria-label="Active users count: 1,234, trending up 12%"
/>

// ✅ Good: Proper heading hierarchy
<div role="region" aria-labelledby="stats-heading">
  <h2 id="stats-heading">Dashboard Statistics</h2>
  <StatValue value="1,234" title="Users" />
  <StatValue value="5,678" title="Sessions" />
</div>
```

### Interactive States

Handle keyboard navigation and focus management:

```typescript
function InteractiveStatValue({ onClick, ...props }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-pressed={false}
      className="focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <StatValue {...props} />
    </div>
  );
}
```

## Migration Strategies

### From Legacy Components

```typescript
// Before: Monolithic component
<LegacyStatCard
  title="Active Users"
  value="1,234"
  icon="user"
  trend="+12%"
  background="blue"
  size="medium"
/>

// After: Composed molecules
<div className="relative p-4 rounded-lg bg-white shadow">
  <BackgroundEffects variant="blue" pattern="corners" intensity="subtle" />
  <div className="relative z-10">
    <StatValue
      title="Active Users"
      value="1,234"
      icon={UserIcon}
      trend="+12%"
      variant="blue"
      size="md"
    />
  </div>
</div>
```

### Gradual Adoption

1. **Identify Patterns**: Find repeated atom combinations
2. **Create Molecules**: Extract common patterns into molecules
3. **Replace Gradually**: Update usage sites incrementally
4. **Remove Duplicates**: Clean up old implementations
5. **Optimize**: Refine based on usage patterns

## Development Guidelines

### Creating New Molecules

1. **Analyze Composition**: Identify 2-5 atoms that work together
2. **Define Purpose**: Ensure single, clear responsibility
3. **Design Interface**: Create consistent prop patterns
4. **Implement Logic**: Handle atom coordination and state
5. **Add Tests**: Integration tests for atom composition
6. **Document Usage**: Examples and composition patterns

### Code Quality Standards

- **Prop Validation**: TypeScript interfaces for all props
- **Error Boundaries**: Handle atom rendering errors gracefully
- **Performance**: Optimize for re-renders and animations
- **Accessibility**: Maintain semantic structure and interactions
- **Testing**: Comprehensive integration test coverage

## Related Documentation

- **[Atoms](../atoms/README.md)**: Building blocks for molecules
- **[Organisms](../organisms/README.md)**: Complex compositions using molecules
- **[Hooks](../hooks/README.md)**: Shared logic for molecule behavior
- **[Utils](../utils/README.md)**: Utility functions for composition

---

**Component Level**: Molecules  
**Total Components**: 4  
**Atomic Composition**: 2-5 atoms per molecule  
**Status**: ✅ Complete  
**Last Updated**: January 2025