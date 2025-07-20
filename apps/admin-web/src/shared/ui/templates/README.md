# Template Components

> **Page-level layouts combining organisms for complete page structures**

Templates are the highest level of the atomic design hierarchy, providing complete page layouts by combining organisms, molecules, and atoms. They define the overall structure and layout patterns for different types of pages in the application.

## Design Philosophy

Templates follow these core principles:

- **Page-Level Structure**: Define complete page layouts and organization
- **Organism Composition**: Combine multiple organisms into cohesive layouts
- **Layout Patterns**: Establish reusable page structure patterns
- **Responsive Design**: Handle layout across all screen sizes
- **Content Agnostic**: Focus on structure rather than specific content

## Template Categories

### Dashboard Templates
**Purpose**: Layout patterns for dashboard and admin interfaces

```typescript
<DashboardTemplate
  header={<DashboardHeader />}
  sidebar={<NavigationSidebar />}
  main={<DashboardContent />}
  aside={<NotificationPanel />}
  layout="sidebar-main-aside"
/>
```

**Organism Composition**: Navigation + Content Areas + Status Panels

### Content Templates
**Purpose**: Layout patterns for content-heavy pages

```typescript
<ContentTemplate
  hero={<HeroSection />}
  navigation={<BreadcrumbNavigation />}
  content={<ArticleContent />}
  sidebar={<RelatedContent />}
  layout="hero-nav-content-sidebar"
/>
```

**Organism Composition**: Hero Sections + Navigation + Content Areas

### Form Templates
**Purpose**: Layout patterns for forms and data entry

```typescript
<FormTemplate
  header={<FormHeader />}
  steps={<FormSteps />}
  form={<FormContent />}
  actions={<FormActions />}
  layout="header-steps-form-actions"
/>
```

**Organism Composition**: Form Sections + Navigation + Actions

## Layout Patterns

### Grid-Based Layouts

Templates use CSS Grid for flexible, responsive layouts:

```typescript
// Dashboard grid template
const DashboardTemplate = ({ header, sidebar, main, aside }) => {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr] grid-cols-[250px_1fr_300px]">
      {/* Header spans full width */}
      <header className="col-span-3 border-b bg-white">
        {header}
      </header>
      
      {/* Sidebar */}
      <aside className="border-r bg-gray-50">
        {sidebar}
      </aside>
      
      {/* Main content */}
      <main className="p-6 overflow-auto">
        {main}
      </main>
      
      {/* Right sidebar */}
      <aside className="border-l bg-gray-50 p-4">
        {aside}
      </aside>
    </div>
  );
};
```

### Responsive Breakpoints

Templates adapt to different screen sizes:

```typescript
const ResponsiveDashboardTemplate = ({ children, ...props }) => {
  return (
    <div className={cn(
      // Mobile: single column
      'grid grid-rows-[auto_1fr]',
      // Tablet: sidebar + main
      'md:grid-cols-[250px_1fr]',
      // Desktop: sidebar + main + aside
      'lg:grid-cols-[250px_1fr_300px]',
      // Large screens: wider sidebar
      'xl:grid-cols-[300px_1fr_350px]'
    )}>
      {children}
    </div>
  );
};
```

## Template Composition

### Slot-Based Architecture

Templates use a slot-based approach for flexible content placement:

```typescript
interface TemplateSlots {
  header?: React.ReactNode;
  navigation?: React.ReactNode;
  sidebar?: React.ReactNode;
  main: React.ReactNode;
  aside?: React.ReactNode;
  footer?: React.ReactNode;
}

const PageTemplate: React.FC<TemplateSlots> = ({
  header,
  navigation,
  sidebar,
  main,
  aside,
  footer
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      {header && (
        <header className="flex-none">
          {header}
        </header>
      )}
      
      {navigation && (
        <nav className="flex-none border-b">
          {navigation}
        </nav>
      )}
      
      <div className="flex-1 flex">
        {sidebar && (
          <aside className="flex-none w-64 border-r">
            {sidebar}
          </aside>
        )}
        
        <main className="flex-1 overflow-auto">
          {main}
        </main>
        
        {aside && (
          <aside className="flex-none w-80 border-l">
            {aside}
          </aside>
        )}
      </div>
      
      {footer && (
        <footer className="flex-none border-t">
          {footer}
        </footer>
      )}
    </div>
  );
};
```

### Context Providers

Templates can provide context for their child components:

```typescript
const DashboardTemplate = ({ children, user, settings }) => {
  return (
    <DashboardContext.Provider value={{ user, settings }}>
      <ThemeProvider theme={settings.theme}>
        <LayoutProvider layout="dashboard">
          <div className="dashboard-template">
            {children}
          </div>
        </LayoutProvider>
      </ThemeProvider>
    </DashboardContext.Provider>
  );
};
```

## Usage Guidelines

### When to Create Templates

Create a template when you have:

1. **Repeated Page Structures**: Same layout pattern used across multiple pages
2. **Complex Layouts**: Multi-area layouts with specific positioning requirements
3. **Responsive Patterns**: Layout that needs to adapt significantly across screen sizes
4. **Shared Context**: Pages that need common context or state management

### Template Best Practices

```typescript
// ✅ Good: Flexible slot-based template
<DashboardTemplate
  header={<AppHeader user={user} />}
  sidebar={<NavigationSidebar routes={routes} />}
  main={<PageContent />}
  aside={<NotificationPanel />}
/>

// ✅ Good: Responsive layout handling
<ResponsiveTemplate
  mobile={<MobileLayout />}
  tablet={<TabletLayout />}
  desktop={<DesktopLayout />}
/>

// ❌ Avoid: Too specific to content
<UserProfilePageTemplate
  userName="John Doe"
  userEmail="john@example.com"
  userAvatar="/avatar.jpg"
/>
```

### Performance Considerations

Templates should optimize for layout performance:

```typescript
// Memoized template to prevent unnecessary re-renders
const DashboardTemplate = React.memo(({
  header,
  sidebar,
  main,
  aside,
  layout = 'default'
}) => {
  // Memoize layout classes
  const layoutClasses = useMemo(() => 
    getLayoutClasses(layout), 
    [layout]
  );

  return (
    <div className={layoutClasses}>
      {header}
      {sidebar}
      {main}
      {aside}
    </div>
  );
});
```

## Responsive Design

### Mobile-First Approach

Templates start with mobile layouts and enhance for larger screens:

```typescript
const ContentTemplate = ({ hero, content, sidebar }) => {
  return (
    <div className={cn(
      // Mobile: single column stack
      'flex flex-col',
      // Tablet: content + sidebar
      'md:flex-row',
      // Desktop: hero + content + sidebar
      'lg:grid lg:grid-cols-[1fr_300px] lg:grid-rows-[auto_1fr]'
    )}>
      {/* Hero spans full width on desktop */}
      <section className="lg:col-span-2">
        {hero}
      </section>
      
      {/* Content area */}
      <main className="flex-1 p-6">
        {content}
      </main>
      
      {/* Sidebar */}
      <aside className={cn(
        // Mobile: full width at bottom
        'w-full mt-6',
        // Tablet+: fixed width sidebar
        'md:w-80 md:mt-0 md:border-l md:p-6'
      )}>
        {sidebar}
      </aside>
    </div>
  );
};
```

### Breakpoint Management

Use consistent breakpoints across templates:

```typescript
const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

const useResponsiveLayout = () => {
  const [layout, setLayout] = useState('mobile');

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      if (width >= 1024) setLayout('desktop');
      else if (width >= 768) setLayout('tablet');
      else setLayout('mobile');
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  return layout;
};
```

## Accessibility Guidelines

### Semantic Structure

Templates should maintain proper semantic HTML structure:

```typescript
const AccessibleTemplate = ({ header, nav, main, aside, footer }) => {
  return (
    <div className="template-container">
      <header role="banner">
        {header}
      </header>
      
      <nav role="navigation" aria-label="Main navigation">
        {nav}
      </nav>
      
      <main role="main" id="main-content">
        {main}
      </main>
      
      <aside role="complementary" aria-label="Sidebar content">
        {aside}
      </aside>
      
      <footer role="contentinfo">
        {footer}
      </footer>
    </div>
  );
};
```

### Skip Links

Provide skip links for keyboard navigation:

```typescript
const TemplateWithSkipLinks = ({ children }) => {
  return (
    <>
      <div className="skip-links">
        <a href="#main-content" className="sr-only focus:not-sr-only">
          Skip to main content
        </a>
        <a href="#navigation" className="sr-only focus:not-sr-only">
          Skip to navigation
        </a>
      </div>
      {children}
    </>
  );
};
```

### Focus Management

Handle focus management for complex layouts:

```typescript
const FocusManagementTemplate = ({ children, onLayoutChange }) => {
  const mainRef = useRef(null);

  useEffect(() => {
    // Focus main content when layout changes
    if (mainRef.current) {
      mainRef.current.focus();
    }
  }, [onLayoutChange]);

  return (
    <div className="template">
      <main
        ref={mainRef}
        tabIndex={-1}
        className="focus:outline-none"
      >
        {children}
      </main>
    </div>
  );
};
```

## Testing Templates

### Layout Testing

Test template layouts across different screen sizes:

```typescript
import { render, screen } from '@testing-library/react';
import { DashboardTemplate } from './DashboardTemplate';

describe('DashboardTemplate', () => {
  it('renders all layout sections', () => {
    render(
      <DashboardTemplate
        header={<div data-testid="header">Header</div>}
        sidebar={<div data-testid="sidebar">Sidebar</div>}
        main={<div data-testid="main">Main</div>}
        aside={<div data-testid="aside">Aside</div>}
      />
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('main')).toBeInTheDocument();
    expect(screen.getByTestId('aside')).toBeInTheDocument();
  });

  it('handles responsive layout changes', () => {
    const { container } = render(
      <DashboardTemplate main={<div>Content</div>} />
    );

    // Test mobile layout
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 640,
    });

    // Test desktop layout
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });

    // Verify layout classes change
    expect(container.firstChild).toHaveClass('lg:grid-cols-[250px_1fr_300px]');
  });
});
```

### Visual Regression Testing

```typescript
// Storybook stories for template layouts
export const DashboardLayouts = () => (
  <div className="space-y-8">
    <DashboardTemplate
      header={<div className="h-16 bg-blue-100">Header</div>}
      sidebar={<div className="h-64 bg-gray-100">Sidebar</div>}
      main={<div className="h-64 bg-white">Main Content</div>}
      aside={<div className="h-64 bg-gray-50">Aside</div>}
    />
  </div>
);

export const ResponsiveBreakpoints = () => (
  <div className="space-y-4">
    <div className="w-full max-w-sm">
      <h3>Mobile</h3>
      <DashboardTemplate main={<div>Mobile Layout</div>} />
    </div>
    <div className="w-full max-w-4xl">
      <h3>Desktop</h3>
      <DashboardTemplate main={<div>Desktop Layout</div>} />
    </div>
  </div>
);
```

## Development Guidelines

### Creating New Templates

1. **Identify Layout Patterns**: Find repeated page structures
2. **Design Responsive Behavior**: Plan mobile-first responsive design
3. **Define Slots**: Create flexible content placement system
4. **Handle Edge Cases**: Consider empty states and optional sections
5. **Add Accessibility**: Ensure semantic structure and navigation
6. **Test Layouts**: Verify responsive behavior and accessibility
7. **Document Usage**: Provide clear usage examples and guidelines

### Code Quality Standards

- **Semantic HTML**: Use proper semantic elements and ARIA roles
- **Responsive Design**: Mobile-first, progressive enhancement
- **Performance**: Optimize layout calculations and re-renders
- **Accessibility**: WCAG 2.1 AA compliance for layout and navigation
- **Testing**: Layout testing across breakpoints and devices
- **Documentation**: Clear examples of template usage patterns

## Future Templates

### Planned Templates

- **AuthTemplate**: Login, registration, and authentication flows
- **ErrorTemplate**: Error pages with consistent layout
- **LandingTemplate**: Marketing and landing page layouts
- **DocumentTemplate**: Documentation and content-heavy pages
- **WizardTemplate**: Multi-step form and wizard layouts

### Template System Evolution

- **Dynamic Layouts**: Runtime layout switching based on user preferences
- **Layout Persistence**: Remember user layout preferences
- **Advanced Responsive**: Container queries for component-level responsiveness
- **Layout Analytics**: Track layout usage and performance metrics

## Related Documentation

- **[Organisms](../organisms/README.md)**: Components used within templates
- **[Layout Components](../components/Layout/README.md)**: Layout-specific components
- **[Responsive Design Guide](../docs/responsive-design.md)**: Responsive design patterns
- **[Accessibility Guide](../docs/accessibility.md)**: Accessibility best practices

---

**Component Level**: Templates  
**Total Templates**: In Development  
**Layout Patterns**: Grid-based, Flexbox, Responsive  
**Status**: 🚧 In Progress  
**Last Updated**: January 2025