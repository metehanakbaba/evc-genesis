# Organism Components

> **Complex combinations of molecules and atoms for complete UI sections**

Organisms are sophisticated components that combine multiple molecules and atoms to create complete, functional UI sections. They represent the highest level of composition before page templates and handle complex interactions and state management.

## Design Philosophy

Organisms follow these core principles:

- **Complete Functionality**: Self-contained UI sections with full feature sets
- **Complex Composition**: Combine multiple molecules and atoms strategically
- **State Management**: Handle internal state and complex interactions
- **Context Awareness**: Adapt behavior based on usage context
- **Performance Optimized**: Efficient rendering of complex compositions

## Available Organisms

### StatCard
**Purpose**: Complete statistical card component with interactive features and visual effects

```typescript
<StatCard
  title="Active Users"
  value="1,234"
  icon={UserIcon}
  trend="+12%"
  description="Users currently online"
  variant="blue"
  size="md"
  onClick={handleCardClick}
/>
```

**Molecular Composition**: `StatValue` + `TrendIndicator` + `BackgroundEffects`

**Key Features**:
- Complete stat display with all visual effects
- Interactive states with hover and click handling
- Background effects with coordinated animations
- Trend indicators with positive/negative styling
- Responsive design with multiple size options
- Full accessibility with keyboard navigation
- Loading and error states

### RouteTransition
**Purpose**: Complex page transition system with coordinated visual effects

```typescript
<RouteTransition
  phase="entering"
  duration={800}
  variant="blue"
  pattern="random"
  onTransitionComplete={handleComplete}
>
  <YourPageContent />
</RouteTransition>
```

**Molecular Composition**: `BackgroundEffects` + `FloatingAccents` + transition logic

**Key Features**:
- Smooth animated transitions between routes
- Coordinated background and accent effects
- Multiple transition phases (entering, active, exiting)
- Customizable timing and easing functions
- Pattern-based visual effects
- Performance optimized animations
- Accessibility-compliant motion handling

### Card
**Purpose**: Unified card component that replaces duplicated card implementations

```typescript
<Card
  variant="elevated"
  size="md"
  interactive
  onClick={handleClick}
  header={
    <Card.Header
      title="Card Title"
      subtitle="Card description"
      action={<Button size="sm">Action</Button>}
    />
  }
>
  <Card.Body>
    <p>Card content goes here</p>
  </Card.Body>
  <Card.Footer>
    <Button variant="primary">Primary Action</Button>
    <Button variant="secondary">Secondary</Button>
  </Card.Footer>
</Card>
```

**Molecular Composition**: Multiple layout molecules + content areas

**Key Features**:
- Flexible composition with header, body, footer sections
- Multiple visual variants (flat, elevated, outlined)
- Interactive states with proper focus management
- Responsive sizing and spacing
- Consistent theming across all variants
- Accessibility-compliant structure

## Complex Composition Patterns

### Multi-Level Composition

Organisms demonstrate sophisticated atomic composition:

```typescript
// StatCard organism implementation
function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  description,
  variant = 'blue',
  size = 'md',
  onClick,
  loading = false,
  error = null
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  if (loading) {
    return <StatCardSkeleton variant={variant} size={size} />;
  }

  if (error) {
    return <StatCardError error={error} onRetry={onRetry} />;
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl transition-all duration-300',
        'bg-white/80 backdrop-blur-sm border border-gray-200/50',
        size === 'sm' && 'p-4',
        size === 'md' && 'p-6',
        size === 'lg' && 'p-8',
        onClick && 'cursor-pointer hover:shadow-lg hover:scale-[1.02]',
        isPressed && 'scale-[0.98]'
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `${title}: ${value}` : undefined}
    >
      {/* Background Effects Molecule */}
      <BackgroundEffects
        variant={variant}
        pattern="corners"
        orbCount={3}
        intensity={isHovered ? 'medium' : 'subtle'}
        animated
      />

      {/* Content Layer */}
      <div className="relative z-10">
        {/* StatValue Molecule */}
        <StatValue
          value={value}
          title={title}
          icon={Icon}
          variant={variant}
          size={size}
          orientation="vertical"
        />

        {/* Trend Indicator Molecule */}
        {trend && (
          <div className="mt-3">
            <TrendIndicator
              trend={trend}
              variant={variant}
              size="sm"
              animated
            />
          </div>
        )}

        {/* Description */}
        {description && (
          <TextElement
            as="p"
            size="sm"
            color="secondary"
            className="mt-2"
          >
            {description}
          </TextElement>
        )}
      </div>

      {/* Floating Accents for Interactive State */}
      {isHovered && (
        <FloatingAccents
          variant={variant}
          count={2}
          pattern="corners"
          size="xs"
          animated
        />
      )}
    </div>
  );
}
```

### State Management

Organisms handle complex state and interactions:

```typescript
// RouteTransition with phase management
function RouteTransition({
  children,
  phase = 'active',
  duration = 600,
  variant = 'blue',
  pattern = 'random',
  onTransitionComplete
}) {
  const [currentPhase, setCurrentPhase] = useState(phase);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (phase !== currentPhase) {
      setIsAnimating(true);
      setCurrentPhase(phase);

      const timer = setTimeout(() => {
        setIsAnimating(false);
        onTransitionComplete?.(phase);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [phase, currentPhase, duration, onTransitionComplete]);

  return (
    <div
      className={cn(
        'relative min-h-screen transition-all',
        currentPhase === 'entering' && 'opacity-0 scale-95',
        currentPhase === 'active' && 'opacity-100 scale-100',
        currentPhase === 'exiting' && 'opacity-0 scale-105'
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {/* Background Effects */}
      <BackgroundEffects
        variant={variant}
        pattern={pattern}
        orbCount={5}
        intensity="subtle"
        animated={currentPhase === 'active'}
      />

      {/* Floating Accents */}
      <FloatingAccents
        variant={variant}
        count={8}
        pattern="scattered"
        animated={!isAnimating}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
```

## Usage Guidelines

### When to Create Organisms

Create an organism when you have:

1. **Complete UI Sections**: Self-contained functional areas
2. **Complex State**: Multiple pieces of state to coordinate
3. **Rich Interactions**: Advanced user interactions and feedback
4. **Multiple Molecules**: 3+ molecules working together
5. **Context-Aware Behavior**: Behavior that adapts to usage context

### Composition Best Practices

```typescript
// ✅ Good: Clear composition hierarchy
<StatCard>
  <StatCard.Background>
    <BackgroundEffects />
  </StatCard.Background>
  <StatCard.Content>
    <StatValue />
    <TrendIndicator />
  </StatCard.Content>
</StatCard>

// ✅ Good: Proper state management
const [cardState, setCardState] = useState('idle');
<StatCard 
  state={cardState}
  onStateChange={setCardState}
/>

// ❌ Avoid: Too many direct atom dependencies
<ComplexOrganism>
  <GlowOrb />
  <AccentDot />
  <IconContainer />
  <TextElement />
  <GeometricDecoration />
  {/* Should use molecules instead */}
</ComplexOrganism>
```

### Performance Optimization

Organisms require careful performance consideration:

```typescript
// Memoized organism with selective re-rendering
const StatCard = React.memo(({
  value,
  title,
  trend,
  variant,
  onClick,
  ...props
}) => {
  // Memoize expensive calculations
  const formattedValue = useMemo(() => 
    formatStatValue(value), 
    [value]
  );

  const trendData = useMemo(() => 
    calculateTrend(trend), 
    [trend]
  );

  // Memoize event handlers
  const handleClick = useCallback(() => {
    onClick?.(value, title);
  }, [onClick, value, title]);

  return (
    <div onClick={handleClick}>
      {/* Component implementation */}
    </div>
  );
});

// Custom comparison for complex props
StatCard.displayName = 'StatCard';
```

### Error Handling

Organisms should handle errors gracefully:

```typescript
function StatCard({ value, title, onError, ...props }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleError = useCallback((error) => {
    setError(error);
    onError?.(error);
  }, [onError]);

  if (error) {
    return (
      <ErrorBoundary
        fallback={<StatCardError error={error} onRetry={() => setError(null)} />}
        onError={handleError}
      >
        <StatCardContent {...props} />
      </ErrorBoundary>
    );
  }

  return <StatCardContent {...props} />;
}
```

## Testing Organisms

### Integration Testing

Test complete organism functionality:

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { StatCard } from './StatCard';
import { UserIcon } from '@heroicons/react/24/outline';

describe('StatCard Organism', () => {
  it('composes molecules and atoms correctly', () => {
    render(
      <StatCard
        title="Active Users"
        value="1,234"
        icon={UserIcon}
        trend="+12%"
        variant="blue"
      />
    );

    // Test molecular composition
    expect(screen.getByTestId('stat-value')).toBeInTheDocument();
    expect(screen.getByTestId('trend-indicator')).toBeInTheDocument();
    expect(screen.getByTestId('background-effects')).toBeInTheDocument();

    // Test content integration
    expect(screen.getByText('Active Users')).toBeInTheDocument();
    expect(screen.getByText('1,234')).toBeInTheDocument();
    expect(screen.getByText('+12%')).toBeInTheDocument();
  });

  it('handles complex interactions', async () => {
    const handleClick = jest.fn();
    render(
      <StatCard
        title="Users"
        value="1,234"
        onClick={handleClick}
      />
    );

    const card = screen.getByRole('button');
    
    // Test hover state
    fireEvent.mouseEnter(card);
    await waitFor(() => {
      expect(screen.getByTestId('floating-accents')).toBeInTheDocument();
    });

    // Test click interaction
    fireEvent.click(card);
    expect(handleClick).toHaveBeenCalledWith('1,234', 'Users');
  });

  it('manages state correctly', async () => {
    const { rerender } = render(
      <RouteTransition phase="entering">
        <div>Content</div>
      </RouteTransition>
    );

    // Test initial state
    expect(screen.getByText('Content')).toHaveClass('opacity-0');

    // Test phase transition
    rerender(
      <RouteTransition phase="active">
        <div>Content</div>
      </RouteTransition>
    );

    await waitFor(() => {
      expect(screen.getByText('Content')).toHaveClass('opacity-100');
    });
  });
});
```

### Visual Regression Testing

```typescript
// Storybook stories for organisms
export const StatCardStates = () => (
  <div className="grid grid-cols-2 gap-6">
    <StatCard title="Default" value="1,234" variant="blue" />
    <StatCard title="Hovered" value="5,678" variant="emerald" />
    <StatCard title="Loading" value="..." loading variant="purple" />
    <StatCard title="Error" error="Failed to load" variant="red" />
  </div>
);

export const RouteTransitionPhases = () => (
  <div className="space-y-4">
    <RouteTransition phase="entering">
      <div className="p-8 bg-white rounded">Entering Phase</div>
    </RouteTransition>
    <RouteTransition phase="active">
      <div className="p-8 bg-white rounded">Active Phase</div>
    </RouteTransition>
    <RouteTransition phase="exiting">
      <div className="p-8 bg-white rounded">Exiting Phase</div>
    </RouteTransition>
  </div>
);
```

## Accessibility Guidelines

### Complex Interactions

Handle sophisticated accessibility requirements:

```typescript
function InteractiveStatCard({
  title,
  value,
  onClick,
  onKeyDown,
  ...props
}) {
  const cardRef = useRef(null);
  const [announceText, setAnnounceText] = useState('');

  const handleInteraction = useCallback((action) => {
    // Update screen reader announcement
    setAnnounceText(`${title} ${value}, ${action}`);
    
    // Handle the action
    onClick?.(value, title);
  }, [title, value, onClick]);

  return (
    <>
      <div
        ref={cardRef}
        role="button"
        tabIndex={0}
        aria-label={`${title}: ${value}`}
        aria-describedby={`${title}-description`}
        onClick={() => handleInteraction('activated')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleInteraction('activated');
          }
          onKeyDown?.(e);
        }}
        className="focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {/* Card content */}
      </div>
      
      {/* Screen reader announcements */}
      <div
        id={`${title}-description`}
        className="sr-only"
        aria-live="polite"
      >
        {announceText}
      </div>
    </>
  );
}
```

### Motion and Animation

Respect user preferences for reduced motion:

```typescript
function AccessibleRouteTransition({ children, ...props }) {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <RouteTransition
      {...props}
      duration={prefersReducedMotion ? 0 : props.duration}
      animated={!prefersReducedMotion}
    >
      {children}
    </RouteTransition>
  );
}
```

## Migration Strategies

### From Monolithic Components

```typescript
// Before: Large monolithic component
<LegacyDashboardCard
  type="stat"
  title="Active Users"
  value="1,234"
  trend="+12%"
  background="animated"
  interactions="hover,click"
  effects="glow,float"
  size="medium"
/>

// After: Composed organism
<StatCard
  title="Active Users"
  value="1,234"
  trend="+12%"
  variant="blue"
  size="md"
  onClick={handleClick}
/>
```

### Incremental Adoption

1. **Identify Complex Sections**: Find UI areas with multiple responsibilities
2. **Map Dependencies**: Understand molecule and atom requirements
3. **Create Organisms**: Build new organisms using existing molecules
4. **Test Integration**: Ensure all parts work together correctly
5. **Replace Gradually**: Update usage sites one at a time
6. **Optimize Performance**: Profile and optimize complex compositions

## Development Guidelines

### Creating New Organisms

1. **Define Scope**: Identify the complete functional area
2. **Plan Composition**: Map out required molecules and atoms
3. **Design State**: Plan state management and data flow
4. **Handle Interactions**: Design complex user interactions
5. **Optimize Performance**: Consider rendering and animation performance
6. **Add Error Handling**: Implement graceful error states
7. **Test Thoroughly**: Integration and accessibility testing
8. **Document Complexity**: Comprehensive usage documentation

### Code Quality Standards

- **State Management**: Use appropriate state management patterns
- **Error Boundaries**: Implement error boundaries for resilience
- **Performance**: Optimize for complex compositions and animations
- **Accessibility**: Handle complex interactions accessibly
- **Testing**: Comprehensive integration and visual testing
- **Documentation**: Document complex composition patterns

## Related Documentation

- **[Molecules](../molecules/README.md)**: Building blocks for organisms
- **[Atoms](../atoms/README.md)**: Fundamental components
- **[Templates](../templates/README.md)**: Page-level layouts using organisms
- **[Hooks](../hooks/README.md)**: Shared logic for organism behavior

---

**Component Level**: Organisms  
**Total Components**: 3  
**Molecular Composition**: 3-5 molecules per organism  
**Status**: ✅ Complete  
**Last Updated**: January 2025