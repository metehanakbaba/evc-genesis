/**
 * Layout Category - Structural components for organizing content
 * Components for page structure, grids, containers, and spatial organization
 */

// Container Components
export { Container } from './Container';
export type { ContainerProps } from './Container';

// Grid System
export { Grid } from './Grid';
export type { GridProps } from './Grid';

export { GridItem } from './GridItem';
export type { GridItemProps } from './GridItem';

// Section Components
export { SectionHeader } from './SectionHeader';
export type { SectionHeaderProps, IconComponent } from './SectionHeader';

// Header Components
export { AppHeader } from './AppHeader';
export type { AppHeaderProps } from './AppHeader';

// Sidebar Components
export { IntelligenceSidebar } from './IntelligenceSidebar';
export type { IntelligenceSidebarProps } from './IntelligenceSidebar';

export { NotificationSidebar } from './NotificationSidebar';
export type { NotificationSidebarProps } from './NotificationSidebar';

// Main Layout Component
export { MainLayout } from './MainLayout';
export type { MainLayoutProps } from './MainLayout';

// Scroll Management
export { ScrollToTop } from './ScrollToTop';

// Layout Enums
export {
  GridColumns,
  GridGap,
  GridItemVariant,
  GridItemSpan,
  Padding,
  ContainerSize,
  SectionHeaderSize,
  SectionHeaderVariant,
  HeadingLevel,
} from './enums';

// Export type guards
export {
  isValidGridColumns,
  isValidGridGap,
  isValidGridItemVariant,
  isValidPadding,
  isValidContainerSize,
} from './enums';
