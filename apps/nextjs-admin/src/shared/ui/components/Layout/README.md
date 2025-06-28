# Layout System Components

Type-safe, responsive layout components that follow the design system patterns from ComponentShowcase.tsx. These components provide a clean, reusable alternative to manual grid classes and glassmorphism styling.

## Components Overview

### 🏗️ Container
Main page container with background, animated orbs, and size management.

### 📐 Grid  
Responsive grid system with type-safe column configuration.

### 📦 GridItem
Individual grid items with glassmorphism variants and responsive spanning.

### 📝 SectionHeader
Consistent section headers with icons, descriptions, and size variants.

---

## Quick Start

```tsx
import { Container, Grid, GridItem, SectionHeader } from '@/shared/ui';
import { CursorArrowRaysIcon } from '@heroicons/react/24/outline';

function MyPage() {
  return (
    <Container size="lg" withBackground withOrbs>
      <Grid cols={1} mdCols={2} gap="lg">
        <GridItem variant="glass" padding="md">
          <SectionHeader 
            title="My Section" 
            description="Section description"
            icon={CursorArrowRaysIcon}
          />
          <div className="space-y-4">
            {/* Your content */}
          </div>
        </GridItem>
      </Grid>
    </Container>
  );
}
```

---

## Component Reference

### `<Container />`

Page-level container with background patterns and animated orbs.

**Props:**
```tsx
interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';        // Default: 'lg'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';      // Default: 'md'
  withBackground?: boolean;                           // Default: true
  withOrbs?: boolean;                                 // Default: false
  centered?: boolean;                                 // Default: true
  as?: keyof JSX.IntrinsicElements;                  // Default: 'div'
}
```

**Size Mapping:**
- `sm`: `max-w-2xl` (768px)
- `md`: `max-w-4xl` (896px)  
- `lg`: `max-w-6xl` (1152px)
- `xl`: `max-w-7xl` (1280px)
- `full`: `max-w-full`

**Examples:**
```tsx
// Full page with animated background
<Container size="xl" withBackground withOrbs>
  {/* Page content */}
</Container>

// Simple content container
<Container size="md" withBackground={false}>
  {/* Clean content */}
</Container>
```

---

### `<Grid />`

Responsive grid system with type-safe column configuration.

**Props:**
```tsx
interface GridProps {
  children: ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 6 | 12;                    // Default: 1
  mdCols?: 1 | 2 | 3 | 4 | 6 | 12;                  // Breakpoint: md (768px+)
  lgCols?: 1 | 2 | 3 | 4 | 6 | 12;                  // Breakpoint: lg (1024px+)
  gap?: 'sm' | 'md' | 'lg' | 'xl';                   // Default: 'md'
  as?: keyof JSX.IntrinsicElements;                  // Default: 'div'
}
```

**Gap Sizes:**
- `sm`: `gap-4` (1rem)
- `md`: `gap-6` (1.5rem)
- `lg`: `gap-8` (2rem)
- `xl`: `gap-12` (3rem)

**Examples:**
```tsx
// Responsive grid: 1 col mobile, 2 cols tablet, 3 cols desktop
<Grid cols={1} mdCols={2} lgCols={3} gap="lg">
  <GridItem>Item 1</GridItem>
  <GridItem>Item 2</GridItem>
  <GridItem>Item 3</GridItem>
</Grid>

// Simple 2-column grid
<Grid cols={2} gap="md">
  <GridItem>Left</GridItem>
  <GridItem>Right</GridItem>
</Grid>
```

---

### `<GridItem />`

Individual grid items with glassmorphism styling and responsive spanning.

**Props:**
```tsx
interface GridItemProps {
  children: ReactNode;
  className?: string;
  id?: string;
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  mdSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  lgSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  variant?: 'default' | 'glass' | 'solid' | 'minimal';    // Default: 'glass'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';           // Default: 'md'
  as?: keyof JSX.IntrinsicElements;                       // Default: 'section'
}
```

**Variants:**
- `default`: Standard dark container
- `glass`: Glassmorphism with backdrop blur (ComponentShowcase pattern)
- `solid`: Solid background with shadow
- `minimal`: Border-only, minimal styling

**Padding Sizes:**
- `none`: No padding
- `sm`: `p-4` (1rem)
- `md`: `p-6` (1.5rem)
- `lg`: `p-8` (2rem)
- `xl`: `p-12` (3rem)

**Examples:**
```tsx
// Glass effect card spanning 2 columns on medium screens
<GridItem variant="glass" span={1} mdSpan={2} padding="lg">
  <SectionHeader title="Wide Section" />
  {/* Content */}
</GridItem>

// Full-width minimal container
<GridItem variant="minimal" span={12} padding="sm">
  {/* Minimal content */}
</GridItem>
```

---

### `<SectionHeader />`

Consistent section headers with icons, descriptions, and variants.

**Props:**
```tsx
interface SectionHeaderProps {
  title: string;
  description?: string;
  icon?: IconComponent;                               // Heroicons compatible
  children?: ReactNode;                               // Additional content
  className?: string;
  titleLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';  // Default: 'h2'
  size?: 'sm' | 'md' | 'lg' | 'xl';                   // Default: 'md'
  variant?: 'default' | 'primary' | 'secondary';      // Default: 'default'
}
```

**Size Mapping:**
- `sm`: `text-lg` title, `h-5 w-5` icon
- `md`: `text-xl` title, `h-6 w-6` icon
- `lg`: `text-2xl` title, `h-7 w-7` icon
- `xl`: `text-3xl` title, `h-8 w-8` icon

**Variants:**
- `default`: White title, gray description, primary icon
- `primary`: Blue title and icon
- `secondary`: Gray title and icon

**Examples:**
```tsx
import { CursorArrowRaysIcon } from '@heroicons/react/24/outline';

// Standard section header
<SectionHeader 
  title="Button Components"
  description="Interactive elements for user actions"
  icon={CursorArrowRaysIcon}
/>

// Large primary header with additional content
<SectionHeader 
  title="Dashboard Overview"
  description="System statistics and metrics"
  icon={ChartBarIcon}
  size="lg"
  variant="primary"
>
  <Badge variant="success">Live</Badge>
</SectionHeader>
```

---

## Layout Patterns

### 📱 Responsive Sections

```tsx
<Grid cols={1} mdCols={2} lgCols={3} gap="lg">
  {/* Small sections on mobile, 2 on tablet, 3 on desktop */}
  <GridItem variant="glass">
    <SectionHeader title="Section 1" icon={Icon1} />
    {/* Content */}
  </GridItem>
  <GridItem variant="glass">
    <SectionHeader title="Section 2" icon={Icon2} />
    {/* Content */}
  </GridItem>
  <GridItem variant="glass">
    <SectionHeader title="Section 3" icon={Icon3} />
    {/* Content */}
  </GridItem>
</Grid>
```

### 📊 Mixed Layout Sizes

```tsx
<Grid cols={1} mdCols={2} lgCols={3} gap="lg">
  {/* Regular sections */}
  <GridItem variant="glass">
    <SectionHeader title="Forms" icon={DocumentTextIcon} />
  </GridItem>
  <GridItem variant="glass">
    <SectionHeader title="Buttons" icon={CursorArrowRaysIcon} />
  </GridItem>
  
  {/* Full-width statistics section */}
  <GridItem variant="solid" span={1} mdSpan={2} lgSpan={3} padding="lg">
    <SectionHeader title="Statistics" icon={ChartBarIcon} size="lg" />
    {/* Wide content */}
  </GridItem>
</Grid>
```

### 🎨 Different Visual Styles

```tsx
<Grid cols={1} mdCols={2} gap="lg">
  {/* Glass card */}
  <GridItem variant="glass" padding="md">
    <SectionHeader title="Glass Effect" />
  </GridItem>
  
  {/* Solid card */}
  <GridItem variant="solid" padding="md">
    <SectionHeader title="Solid Background" />
  </GridItem>
  
  {/* Minimal card */}
  <GridItem variant="minimal" padding="lg">
    <SectionHeader title="Minimal Style" />
  </GridItem>
</Grid>
```

---

## Migration from Manual Grid

### ❌ Old Pattern (ComponentShowcase.tsx)
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  <section className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/30 rounded-lg p-6 shadow-xl shadow-gray-900/10">
    <div className="flex items-center gap-2 mb-4">
      <Icon className="h-6 w-6 text-primary-400" />
      <h2 className="text-xl font-semibold text-white">Title</h2>
    </div>
    {/* Content */}
  </section>
</div>
```

### ✅ New Pattern (Layout Components)
```tsx
<Grid cols={1} mdCols={2} gap="lg">
  <GridItem variant="glass" padding="md">
    <SectionHeader title="Title" icon={Icon} />
    {/* Content */}
  </GridItem>
</Grid>
```

## Benefits

✅ **Type Safety**: All props are strictly typed with TypeScript
✅ **Consistency**: Follows design system patterns automatically  
✅ **Responsive**: Built-in responsive behavior with breakpoints
✅ **Reusable**: Component-based approach reduces duplication
✅ **Maintainable**: Centralized styling logic
✅ **Accessible**: Semantic HTML and ARIA support
✅ **Flexible**: Multiple variants and customization options

---

## Design System Compliance

These components automatically follow the design system rules:

- ✅ Dark theme colors (`bg-gray-800`, `text-white`, etc.)
- ✅ Glassmorphism effects (`backdrop-blur-xl`, transparency)
- ✅ Consistent spacing and typography
- ✅ Semantic HTML structure
- ✅ Proper focus states and accessibility
- ✅ Responsive design patterns

All components are built following the patterns established in ComponentShowcase.tsx and the design system documentation. 