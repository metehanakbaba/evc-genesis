import type { ReactNode } from 'react';
import { cn } from '../../../utils/cn';

/**
 * Container Component Props
 */
export interface ContainerProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  readonly padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  readonly withBackground?: boolean;
  readonly withOrbs?: boolean;
  readonly centered?: boolean;
  readonly as?: React.ElementType;
}

/**
 * Size Mappings
 */
const sizeMap = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
} as const;

const paddingMap = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-12',
} as const;

/**
 * Animated Background Orbs Component
 */
const AnimatedOrbs: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none">
    {/* Primary Blue Orb */}
    <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
    <div className="absolute top-40 left-32 w-64 h-64 bg-cyan-500/8 rounded-full blur-2xl animate-pulse delay-1000" />

    {/* Secondary Purple Orb */}
    <div className="absolute top-60 right-20 w-80 h-80 bg-purple-500/6 rounded-full blur-3xl animate-pulse delay-500" />
    <div className="absolute top-80 right-40 w-48 h-48 bg-violet-500/10 rounded-full blur-2xl animate-pulse delay-1500" />

    {/* Success Emerald Orb */}
    <div className="absolute bottom-40 left-1/4 w-72 h-72 bg-emerald-500/4 rounded-full blur-3xl animate-pulse delay-2000" />
    <div className="absolute bottom-60 left-1/3 w-40 h-40 bg-green-500/8 rounded-full blur-xl animate-pulse delay-2500" />

    {/* Warning Amber Orb */}
    <div className="absolute bottom-20 right-1/3 w-88 h-88 bg-amber-500/5 rounded-full blur-3xl animate-pulse delay-3000" />
    <div className="absolute bottom-40 right-1/4 w-56 h-56 bg-orange-500/7 rounded-full blur-2xl animate-pulse delay-3500" />

    {/* Info Sky Orb */}
    <div className="absolute top-1/3 left-1/2 w-64 h-64 bg-sky-500/4 rounded-full blur-3xl animate-pulse delay-4000" />

    {/* Danger Rose Orb */}
    <div className="absolute bottom-1/3 right-10 w-60 h-60 bg-rose-500/6 rounded-full blur-3xl animate-pulse delay-4500" />
    <div className="absolute bottom-1/4 right-32 w-32 h-32 bg-red-500/10 rounded-full blur-xl animate-pulse delay-5000" />
  </div>
);

/**
 * Type-safe Container Component with Design System Patterns
 *
 * @example
 * ```tsx
 * <Container size="lg" withBackground withOrbs>
 *   <Grid cols={1} mdCols={2} gap="lg">
 *     <GridItem variant="glass">
 *       <SectionHeader title="My Section" />
 *       Content goes here
 *     </GridItem>
 *   </Grid>
 * </Container>
 * ```
 */
export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  size = 'lg',
  padding = 'md',
  withBackground = true,
  withOrbs = false,
  centered = true,
  as: Component = 'div',
}) => {
  const containerClasses = cn(
    // Base layout
    withBackground &&
      'min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
    withBackground ? 'relative overflow-hidden' : '',
    paddingMap[padding],
    className,
  );

  const contentClasses = cn(
    // Content container
    sizeMap[size],
    centered && 'mx-auto',
    withOrbs && 'relative z-10',
    !withBackground && 'space-y-8',
  );

  const content = <div className={contentClasses}>{children}</div>;

  const ElementComponent = Component as React.ElementType;

  if (withBackground) {
    return (
      <ElementComponent className={containerClasses}>
        {withOrbs && <AnimatedOrbs />}
        {withOrbs ? (
          <div className="relative z-10 backdrop-blur-[0.5px]">{content}</div>
        ) : (
          content
        )}
      </ElementComponent>
    );
  }

  return <ElementComponent className={containerClasses}>{content}</ElementComponent>;
};

Container.displayName = 'Container';
