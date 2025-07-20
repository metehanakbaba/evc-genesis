/**
 * Layout Component Exports
 * Central export file for all layout-related components
 */

// Layout component exports
export { AppHeader } from './AppHeader';
export type { AppHeaderProps } from './AppHeader';

export { Container } from './Container';
export type { ContainerProps } from './Container';

export { Grid } from './Grid';
export type { GridProps } from './Grid';

export { GridItem } from './GridItem';
export type { GridItemProps } from './GridItem';

export { IntelligenceSidebar } from './IntelligenceSidebar';
export type { IntelligenceSidebarProps } from './IntelligenceSidebar';

export { IntelligenceBottomModal } from './IntelligenceBottomModal';
export type { IntelligenceBottomModalProps } from './IntelligenceBottomModal';

export { MainLayout } from './MainLayout';
export { PageHeader } from './PageHeader';
export type { MainLayoutProps } from './MainLayout';
export type { PageHeaderProps } from './PageHeader';

export { PageContainer } from './PageContainer';
export type { PageContainerProps } from './PageContainer';

export { NotificationSidebar } from './NotificationSidebar';
export type { NotificationSidebarProps } from './NotificationSidebar';

export { SectionHeader } from './SectionHeader';
export type { SectionHeaderProps, IconComponent } from './SectionHeader';

export { ScrollToTop } from './ScrollToTop';

export { FixedCard, FixedCardHeader, FixedCardContent, FixedCardFooter } from './FixedCard';
export type { FixedCardProps } from './FixedCard';

// Layout enums and types
export {
  ContainerSize,
  GridColumns,
  GridGap,
  GridItemSpan,
  GridItemVariant,
  HeadingLevel,
  Padding,
  SectionHeaderSize,
  SectionHeaderVariant,
  isValidContainerSize,
  isValidGridColumns,
  isValidGridGap,
  isValidGridItemVariant,
  isValidPadding,
} from './enums';
