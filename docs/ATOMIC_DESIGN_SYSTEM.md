# 🎨 Atomic Design System Documentation

> **Comprehensive guide to the EV Charging Admin atomic component architecture**

## 📋 Table of Contents

1. [Overview](#-overview)
2. [Architecture](#-architecture)
3. [Component Types](#-component-types)
4. [Usage Guide](#-usage-guide)
5. [Development Guidelines](#-development-guidelines)
6. [Migration Strategy](#-migration-strategy)
7. [API Reference](#-api-reference)

---

## 🎯 Overview

The EV Charging Admin project implements a comprehensive **Atomic Design System** that eliminates component duplication and creates a maintainable, reusable component architecture. This system follows atomic design principles to build complex interfaces from simple, focused pieces.

### Key Benefits

- **🔄 Eliminates Duplication**: Single source of truth for all UI components
- **🧩 Granular Reusability**: Use individual atoms or composed organisms as needed
- **🎨 Consistent Theming**: Unified variant and size system across all components
- **⚡ Performance Optimized**: Memoized hooks and optimized rendering
- **♿ Accessibility Ready**: Built-in WCAG compliance and accessibility attributes
- **🔒 Type Safe**: Comprehensive TypeScript interfaces for all component levels

---

## 🏗️ Architecture

### Directory Structure

```
src/shared/ui/
├── atoms/                  # Basic building blocks
│   ├── index.ts           # Atom exports
│   └── types.ts           # Atom type definitions
├── molecules/             # Simple combinations of atoms
│   ├── index.ts           # Molecule exports
│   └── types.ts           # Molecule type definitions
├── organisms/             # Complex combinations
│   ├── index.ts           # Organism exports
│   └── types.ts           # Organism type definitions
├── templates/             # Page-level layouts
│   ├── index.ts           # Template exports
│   └── types.ts           # Template type definitions
├── hooks/                 # Shared UI hooks
│   ├── useComponentTheme.ts    # Theme management
│   ├── useAnimation.ts         # Animation control
│   ├── useComposition.tsx      # Component composition
│   └── index.ts               # Hook exports
├── utils/                 # Utility functions
│   ├── theme-utils.ts          # Theme utilities
│   ├── animation-utils.ts      # Animation utilities
│   ├── class-utils.ts          # Class name utilities
│   ├── composition.tsx         # Composition helpers
│   └── index.ts               # Utility exports
├── theme/                 # Design tokens
│   └── theme.config.ts         # Theme configuration
├── README.md              # Component documentation
└── index.ts              # Main export file
```

### Design Principles

1. **Composition Over Inheritance**: Build complex components from simple, reusable pieces
2. **Single Responsibility**: Each component has one clear purpose
3. **Consistent API**: Standardized props and interfaces across all components
4. **Theme Integration**: Built-in support for variants, sizes, and animations
5. **Performance First**: Optimized for re-renders and bundle size

---

## 🧩 Component Types

### Atoms - Basic Building Blocks

Atoms are the smallest, most fundamental UI components that cannot be broken down further.

**Implemented Atoms:**

- ✅ `GlowOrb` - Animated gradient orbs with variant-specific colors, blur effects, and intensity controls
- 🔄 `AccentDot` - Small floating accent elements (in progress)
- 🔄 `IconContainer` - Standardized icon wrapper with effects (in progress)
- 🔄 `GeometricDecoration` - Reusable geometric shapes (in progress)
- 🔄 `TextElement` - Typography atoms with variants (in progress)

**GlowOrb Atom - Complete Implementation:**

The `GlowOrb` component is our first fully implemented atomic component, demonstrating the atomic design principles in action.

```typescript
interface GlowOrbProps extends BaseComponentProps, VariantProps, SizeProps {
  position?: "background" | "foreground";
  intensity?: "subtle" | "medium" | "strong";
  blur?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  animationSpeed?: number;
  animationDelay?: number;
  style?: React.CSSProperties;
}
```

**Key Features:**

- **Variant Support**: Blue, emerald, purple, and teal color variants
- **Size System**: Five size options (xs, sm, md, lg, xl) with consistent scaling
- **Blur Effects**: Four blur levels for different visual intensities
- **Animation Control**: Customizable animation speed and delay
- **Intensity Levels**: Subtle, medium, and strong opacity variations
- **Position Management**: Background/foreground z-index handling
- **Type Safety**: Full TypeScript interface with comprehensive prop validation

**Usage Examples:**

```typescript
// Basic usage
<GlowOrb variant="blue" size="lg" />

// Advanced configuration
<GlowOrb
  variant="emerald"
  size="md"
  intensity="strong"
  blur="lg"
  animated
  animationSpeed={1.5}
  animationDelay={200}
  position="background"
/>

// Custom styling
<GlowOrb
  variant="purple"
  size="xl"
  className="top-4 right-4"
  style={{ opacity: 0.8 }}
/>
```

### Molecules - Simple Combinations

Molecules are simple combinations of atoms that work together as a unit.

**Planned Molecules:**

- `StatValue` - Value display with icon and formatting
- `TrendIndicator` - Status and trend display
- `BackgroundEffects` - Collections of animated background elements
- `FloatingAccents` - Coordinated floating accent collections

**Example Molecule:**

```typescript
// StatValue composed from atoms
<StatValue>
  <IconContainer icon={ChartIcon} variant="blue" />
  <TextElement variant="title">{title}</TextElement>
  <TextElement variant="value">{value}</TextElement>
</StatValue>
```

### Organisms - Complex Combinations

Organisms are complex components that combine multiple molecules and atoms.

**Planned Organisms:**

- `StatCard` - Complete statistics card with all effects
- `RouteTransition` - Page transition system
- `Card` - Unified card component with variants

**Example Organism:**

```typescript
// StatCard composed from molecules and atoms
<StatCard>
  <StatCard.Background>
    <BackgroundEffects variant="blue" />
  </StatCard.Background>
  <StatCard.Content>
    <StatValue value="1,234" title="Active Sessions" />
    <TrendIndicator trend="+12%" status="live" />
  </StatCard.Content>
  <StatCard.Accents>
    <FloatingAccents variant="blue" />
  </StatCard.Accents>
</StatCard>
```

### Templates - Page Layouts

Templates combine organisms into complete page layouts.

---

## 📖 Usage Guide

### Basic Usage

```typescript
import { GlowOrb, StatCard, useComponentTheme } from "@/shared/ui";

function DashboardComponent() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <StatCard variant="blue" size="lg" title="Active Sessions" value="1,234" trend="+12%" icon={ChartIcon} />
      <StatCard variant="emerald" size="lg" title="Total Revenue" value="$45,678" trend="+8%" icon={DollarIcon} />
    </div>
  );
}
```

### Advanced Composition

```typescript
import { GlowOrb, AccentDot, StatValue, TrendIndicator, useComponentTheme, useAnimation } from "@/shared/ui";

function CustomDashboardCard({ variant = "blue", animated = true }) {
  const { classes, tokens } = useComponentTheme(variant, "lg");
  const { animationClasses } = useAnimation({ animated, speed: 1.2 });

  return (
    <div className={`${classes.card} ${animationClasses}`}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <GlowOrb variant={variant} size="lg" position="background" animated={animated} />
        <AccentDot variant={variant} position="top-right" animated={animated} />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">
        <StatValue value="1,234" title="Active Sessions" icon={ChartIcon} variant={variant} />
        <TrendIndicator trend="+12%" status="live" animated={animated} />
      </div>
    </div>
  );
}
```

### Theme Customization

```typescript
import { useComponentTheme, createThemeClasses } from "@/shared/ui";

function ThemedComponent({ variant = "blue", size = "md", includeGlow = true }) {
  const { tokens, classes } = useComponentTheme(variant, size);

  const customClasses = createThemeClasses(variant, size, {
    includeGlow,
    includeBorder: true,
    includeHover: true,
  });

  return (
    <div
      className={customClasses}
      style={{
        "--primary-color": tokens.colors.primary,
        "--animation-duration": tokens.animations.durations.normal,
      }}
    >
      <span style={{ color: tokens.colors.primary }}>Themed Content</span>
    </div>
  );
}
```

---

## 🛠️ Development Guidelines

### Creating New Components

#### 1. Start with Atoms

Break complex components into the smallest possible pieces:

```typescript
// ❌ Monolithic component
function ComplexCard() {
  return <div className="card-with-everything">{/* 200+ lines of mixed concerns */}</div>;
}

// ✅ Atomic approach
function ComplexCard() {
  return (
    <Card>
      <Card.Background>
        <GlowOrb />
        <AccentDot />
      </Card.Background>
      <Card.Content>
        <StatValue />
        <TrendIndicator />
      </Card.Content>
    </Card>
  );
}
```

#### 2. Use Composition

Build larger components by combining smaller ones:

```typescript
// Compose molecules from atoms
const StatValue = ({ value, title, icon: Icon, variant }) => (
  <div className="stat-value">
    <IconContainer icon={Icon} variant={variant} />
    <TextElement variant="title">{title}</TextElement>
    <TextElement variant="value">{value}</TextElement>
  </div>
);

// Compose organisms from molecules
const StatCard = ({ children, ...props }) => <Card {...props}>{children}</Card>;
```

#### 3. Follow Naming Conventions

- **Atoms**: Descriptive, single-purpose names (`GlowOrb`, `AccentDot`)
- **Molecules**: Compound names describing function (`StatValue`, `TrendIndicator`)
- **Organisms**: High-level names (`StatCard`, `RouteTransition`)
- **Templates**: Layout-focused names (`DashboardLayout`, `PageTemplate`)

#### 4. Include TypeScript Types

```typescript
// Base interfaces
interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
  "data-testid"?: string;
}

// Specific component props
interface GlowOrbProps extends BaseComponentProps, VariantProps, SizeProps {
  position?: "background" | "foreground";
  intensity?: "subtle" | "medium" | "strong";
  animated?: boolean;
}

// Component implementation
const GlowOrb: React.FC<GlowOrbProps> = ({ variant = "blue", size = "md", position = "background", intensity = "medium", animated = true, className, ...props }) => {
  // Implementation
};
```

#### 5. Add Comprehensive Tests

```typescript
// Unit tests for atoms
describe("GlowOrb", () => {
  it("renders with correct variant classes", () => {
    render(<GlowOrb variant="blue" data-testid="glow-orb" />);
    expect(screen.getByTestId("glow-orb")).toHaveClass("bg-blue-500/15");
  });

  it("applies size classes correctly", () => {
    render(<GlowOrb size="lg" data-testid="glow-orb" />);
    expect(screen.getByTestId("glow-orb")).toHaveClass("w-32", "h-32");
  });
});

// Integration tests for molecules/organisms
describe("StatCard Integration", () => {
  it("composes atoms and molecules correctly", () => {
    render(<StatCard title="Test Stat" value="123" icon={TestIcon} variant="blue" />);

    expect(screen.getByTestId("stat-value")).toBeInTheDocument();
    expect(screen.getByTestId("icon-container")).toBeInTheDocument();
    expect(screen.getByTestId("glow-orb")).toBeInTheDocument();
  });
});
```

### Best Practices

1. **Single Responsibility**: Each component should have one clear purpose
2. **Prop Consistency**: Use standard prop patterns across similar components
3. **Performance**: Optimize for re-renders and bundle size using React.memo and useMemo
4. **Accessibility**: Ensure all components meet WCAG guidelines
5. **Documentation**: Include JSDoc comments and usage examples

---

## 🔄 Migration Strategy

The atomic design system is being implemented alongside existing components in phases:

### Phase 1: Foundation ✅ Complete

- ✅ Create atomic directory structure
- ✅ Set up base interfaces and theme configuration
- ✅ Create utility functions and hooks
- ✅ Establish TypeScript types for all levels

### Phase 2: Build Atoms 🔄 In Progress

- ✅ Implement `GlowOrb` atom component
- [ ] Implement `AccentDot` atom component
- [ ] Implement `IconContainer` atom component
- [ ] Implement `GeometricDecoration` atom component
- [ ] Implement `TextElement` atom component

### Phase 3: Compose Molecules 📅 Planned

- [ ] Build `StatValue` from atoms
- [ ] Build `TrendIndicator` from atoms
- [ ] Build `BackgroundEffects` from atoms
- [ ] Build `FloatingAccents` from atoms

### Phase 4: Create Organisms 📅 Planned

- [ ] Compose `StatCard` from molecules and atoms
- [ ] Refactor `RouteTransition` using atomic components
- [ ] Create unified `Card` component

### Phase 5: Replace and Optimize 📅 Planned

- [ ] Replace existing components with atomic versions
- [ ] Remove duplicate components
- [ ] Optimize bundle size and performance
- [ ] Update all usage sites

---

## 📚 API Reference

### Base Interfaces

```typescript
// Common props for all components
interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
  "data-testid"?: string;
}

// Variant system for consistent theming
interface VariantProps {
  variant?: "blue" | "emerald" | "purple" | "teal";
}

// Size system for consistent scaling
interface SizeProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

// Animation properties
interface AnimationProps {
  animated?: boolean;
  animationSpeed?: number;
  animationDelay?: number;
}
```

### Theme System

```typescript
// Variant colors
const variants = {
  blue: {
    primary: "blue-500",
    secondary: "blue-400",
    glow: "blue-400/15",
    border: "blue-500/20",
  },
  emerald: {
    primary: "emerald-500",
    secondary: "emerald-400",
    glow: "emerald-400/15",
    border: "emerald-500/20",
  },
  // ... other variants
};

// Size scale
const sizes = {
  xs: { scale: "0.75", spacing: "0.25rem", text: "text-xs" },
  sm: { scale: "0.875", spacing: "0.5rem", text: "text-sm" },
  md: { scale: "1", spacing: "0.75rem", text: "text-base" },
  lg: { scale: "1.125", spacing: "1rem", text: "text-lg" },
  xl: { scale: "1.25", spacing: "1.25rem", text: "text-xl" },
};
```

### Hooks

```typescript
// Theme management hook
const useComponentTheme = (variant: Variant, size: Size) => {
  return {
    classes: {
      base: string;
      variant: string;
      size: string;
    };
    tokens: {
      colors: VariantColors;
      sizes: SizeTokens;
      animations: AnimationTokens;
    };
  };
};

// Animation control hook
const useAnimation = (options: AnimationOptions) => {
  return {
    animationClasses: string;
    animationStyle: CSSProperties;
    controls: AnimationControls;
  };
};

// Component composition hook
const useComposition = (props: CompositionProps) => {
  return {
    composedProps: ComposedProps;
    enhanceChildren: (children: ReactNode) => ReactNode;
    slots: SlotComponents;
  };
};
```

### Utilities

```typescript
// Class name utilities
const cn = (...classes: (string | undefined | null | false)[]) => string;
const createThemeClasses = (variant: Variant, size: Size, options: ThemeOptions) => string;
const getVariantColors = (variant: Variant) => VariantColors;

// Animation utilities
const getAnimationClasses = (options: AnimationOptions) => string;
const createAnimationStyle = (options: AnimationOptions) => CSSProperties;

// Composition utilities
const composeComponents = <T>(...components: ComponentType<T>[]) => ComponentType<T>;
const createCompoundComponent = <T>(config: CompoundConfig<T>) => CompoundComponent<T>;
```

---

## 🎯 Next Steps

1. **Start Building Atoms**: Begin implementing individual atom components
2. **Create Component Stories**: Set up Storybook for visual development
3. **Write Tests**: Add comprehensive test coverage for all components
4. **Update Documentation**: Keep this guide updated as components are built
5. **Migrate Gradually**: Replace existing components one by one

For implementation details and current progress, see:

- **Spec Document**: `.kiro/specs/component-granular-refactoring/`
- **Task Tracking**: `.kiro/specs/component-granular-refactoring/tasks.md`
- **Component README**: `apps/admin-web/src/shared/ui/README.md`

---

**Last Updated**: January 2025  
**Version**: 1.0.0  
**Status**: Foundation Complete, Building Atoms  
**Maintainers**: EV Charging Development Team
