/**
 * Layout Category - Structural components for organizing content
 * Components for page structure, grids, containers, and spatial organization
 */

export type { AppHeaderProps } from './AppHeader';
// Header Components
export { AppHeader } from './AppHeader';
export type { ContainerProps } from './Container';
// Container Components
export { Container } from './Container';
// Layout Enums
// Export type guards
export {
  ContainerSize,
  GridColumns,
  GridGap,
  GridItemSpan,
  GridItemVariant,
  HeadingLevel,
  isValidContainerSize,
  isValidGridColumns,
  isValidGridGap,
  isValidGridItemVariant,
  isValidPadding,
  Padding,
  SectionHeaderSize,
  SectionHeaderVariant,
} from './enums';
export type { GridProps } from './Grid';
// Grid System
export { Grid } from './Grid';
export type { GridItemProps } from './GridItem';
export { GridItem } from './GridItem';
export type { IntelligenceSidebarProps } from './IntelligenceSidebar';
// Sidebar Components
export { IntelligenceSidebar } from './IntelligenceSidebar';
export type { MainLayoutProps } from './MainLayout';
// Main Layout Component
export { MainLayout } from './MainLayout';
export type { NotificationSidebarProps } from './NotificationSidebar';
export { NotificationSidebar } from './NotificationSidebar';

// Scroll Management
export { ScrollToTop } from './ScrollToTop';
export type { IconComponent, SectionHeaderProps } from './SectionHeader';
// Section Components
export { SectionHeader } from './SectionHeader';
