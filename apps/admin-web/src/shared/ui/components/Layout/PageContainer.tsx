'use client';

import type React from 'react';

/**
 * 📏 Page Container Size Types
 */
type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * 📏 Page Container Padding Types
 */
type ContainerPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * 📏 Page Container Props Interface
 */
export interface PageContainerProps {
  readonly children: React.ReactNode;
  readonly size?: ContainerSize;
  readonly paddingX?: ContainerPadding;
  readonly paddingY?: ContainerPadding;
  readonly className?: string;
  readonly as?: React.ElementType;
}

/**
 * 📏 Revolutionary Page Container Component
 * 
 * Standardized container wrapper for consistent page layouts
 * Replaces manual max-w-7xl mx-auto px-6 py-6 patterns
 * 
 * @example
 * ```tsx
 * <PageContainer size="xl" paddingX="lg" paddingY="md">
 *   <YourPageContent />
 * </PageContainer>
 * ```
 */
export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  size = 'xl',
  paddingX = 'lg',
  paddingY = 'md',
  className = '',
  as: Component = 'div',
}) => {
  // Size mappings - consistent with existing Container component
  const sizeMap: Record<ContainerSize, string> = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  };

  // Padding mappings - granular control over X and Y padding
  const paddingXMap: Record<ContainerPadding, string> = {
    none: 'px-0',
    sm: 'px-4',
    md: 'px-6',
    lg: 'px-6',
    xl: 'px-8',
  };

  const paddingYMap: Record<ContainerPadding, string> = {
    none: 'py-0',
    sm: 'py-4',
    md: 'py-6',
    lg: 'py-8',
    xl: 'py-12',
  };

  const containerClasses = [
    sizeMap[size],
    'mx-auto',
    paddingXMap[paddingX],
    paddingYMap[paddingY],
    className,
  ].filter(Boolean).join(' ');

  return (
    <Component className={containerClasses}>
      {children}
    </Component>
  );
}; 