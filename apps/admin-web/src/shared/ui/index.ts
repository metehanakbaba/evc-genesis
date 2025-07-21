/**
 * Centralized UI component exports
 * All UI components should be imported from this file
 *
 * 📁 Organized by Atomic Design Principles:
 * - Atoms: Basic building blocks
 * - Molecules: Simple combinations of atoms
 * - Organisms: Complex combinations of molecules
 * - Templates: Page-level layouts
 * - Legacy Components: Existing components (to be migrated)
 * - Hooks: Shared UI hooks
 * - Utils: Utility functions
 * - Theme: Design tokens and theming
 */

// ==================== ATOMIC DESIGN SYSTEM ====================
export * from './atoms';
export type {
  BulkAction,
  BulkActionBarProps,
} from './components/DataDisplay/BulkActionBar';
export {
  BulkActionBar,
  useBulkSelection,
} from './components/DataDisplay/BulkActionBar';
export type {
  EndOfListIndicatorProps,
  GridItemSkeletonProps,
  GridSkeletonProps,
} from './components/DataDisplay/DataGridSkeleton';
export {
  EndOfListIndicator,
  GridItemSkeleton,
  GridSkeleton,
  LoadMoreSkeleton,
} from './components/DataDisplay/DataGridSkeleton';
export { default as BulkActionBarExample } from './components/DataDisplay/examples/BulkActionBarExample';
export type {
  ActionButton as GridActionButton,
  GenericDataGridProps,
  GridCardRenderer,
  GridItem as DataGridItem,
  StatusConfig as DataGridStatusConfig,
} from './components/DataDisplay/GenericDataGrid';
// 🗂️ DATA DISPLAY - Generic Data Components
export { GenericDataGrid } from './components/DataDisplay/GenericDataGrid';
export type {
  GenericDataTableProps,
  SortConfig,
  TableColumn,
} from './components/DataDisplay/GenericDataTable';
export { GenericDataTable } from './components/DataDisplay/GenericDataTable';
export type {
  FilterGroup as GenericFilterGroup,
  FilterOption as GenericFilterOption,
  GenericFilterModalProps,
} from './components/DataDisplay/GenericFilterModal';
export { GenericFilterModal } from './components/DataDisplay/GenericFilterModal';
export type {
  StatusBadgeProps as DataStatusBadgeProps,
  StatusConfig as DataStatusConfig,
} from './components/DataDisplay/StatusBadge';
export {
  createStatusConfig,
  StatusBadge as DataStatusBadge,
  StatusConfigurations,
} from './components/DataDisplay/StatusBadge';
export type { BadgeProps } from './components/Display/Badge/Badge';
export { Badge } from './components/Display/Badge/Badge';
// ==================== DISPLAY ====================
export type { CardProps } from './components/Display/Card/Card';
export {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from './components/Display/Card/Card';
export type { FloatingCardProps } from './components/Display/FloatingCard/FloatingCard';
export { FloatingCard } from './components/Display/FloatingCard/FloatingCard';
export type { HeroSectionProps } from './components/Display/HeroSection/HeroSection';
export { HeroSection } from './components/Display/HeroSection/HeroSection';
export type { MinimalStatCardProps } from './components/Display/MinimalStatCard/MinimalStatCard';
export { MinimalStatCard } from './components/Display/MinimalStatCard/MinimalStatCard';
export type { ModalProps } from './components/Display/Modal/Modal';
export { Modal } from './components/Display/Modal/Modal';
export type { RevolutionaryLoaderProps } from './components/Display/RevolutionaryLoader/RevolutionaryLoader';
export { default as RevolutionaryLoader } from './components/Display/RevolutionaryLoader/RevolutionaryLoader';
export type { RevolutionaryLoadingVisualProps } from './components/Display/RevolutionaryLoadingVisual/RevolutionaryLoadingVisual';
export { default as RevolutionaryLoadingVisual } from './components/Display/RevolutionaryLoadingVisual/RevolutionaryLoadingVisual';
export type { SpinnerProps } from './components/Display/Spinner/Spinner';
export { Spinner } from './components/Display/Spinner/Spinner';
export type { StatCardProps } from './components/Display/StatCard/StatCard';
export { StatCard } from './components/Display/StatCard/StatCard';
// ==================== FEEDBACK ====================
export { ErrorBoundary } from './components/Feedback/ErrorBoundary/ErrorBoundary';
export type { ToastProps } from './components/Feedback/Toast/Toast';
export { Toast } from './components/Feedback/Toast/Toast';
export {
  ToastProvider,
  toast,
  useToast,
} from './components/Feedback/Toast/ToastContext';
// ==================== FORMS ====================
export type { ButtonProps } from './components/Forms/Button/Button';
export { Button } from './components/Forms/Button/Button';
export type { CheckboxProps } from './components/Forms/Checkbox/Checkbox';
export { Checkbox } from './components/Forms/Checkbox/Checkbox';
export type { FieldsetProps } from './components/Forms/Fieldset/Fieldset';
export { Fieldset } from './components/Forms/Fieldset/Fieldset';
export type { InputProps } from './components/Forms/Input/Input';
export { Input } from './components/Forms/Input/Input';
export type {
  ListboxOptionType,
  ListboxProps,
} from './components/Forms/Listbox/Listbox';
export { Listbox } from './components/Forms/Listbox/Listbox';
export type {
  RadioGroupProps,
  RadioOption,
} from './components/Forms/RadioGroup/RadioGroup';
export { RadioGroup } from './components/Forms/RadioGroup/RadioGroup';
export type {
  SelectOption,
  SelectProps,
} from './components/Forms/Select/Select';
export { Select } from './components/Forms/Select/Select';
export type { SwitchProps } from './components/Forms/Switch/Switch';
export { Switch } from './components/Forms/Switch/Switch';
export type { TextareaProps } from './components/Forms/Textarea/Textarea';
export { Textarea } from './components/Forms/Textarea/Textarea';
export type {
  ContainerProps,
  GridItemProps,
  GridProps,
  IconComponent,
  PageHeaderProps,
  SectionHeaderProps,
} from './components/Layout';
// ==================== LAYOUT ====================
// Layout Enums
export {
  Container,
  ContainerSize,
  Grid,
  GridColumns,
  GridGap,
  GridItem,
  GridItemSpan,
  GridItemVariant,
  HeadingLevel,
  isValidContainerSize,
  isValidGridColumns,
  isValidGridGap,
  isValidGridItemVariant,
  isValidPadding,
  MainLayout,
  Padding,
  PageHeader,
  SectionHeader,
  SectionHeaderSize,
  SectionHeaderVariant,
} from './components/Layout';
export type { BreadcrumbItem, BreadcrumbProps } from './components/Navigation';
export { Breadcrumb } from './components/Navigation';
// ==================== NAVIGATION ====================
export type { NavigationCardProps } from './components/Navigation/NavigationCard/NavigationCard';
export { NavigationCard } from './components/Navigation/NavigationCard/NavigationCard';
// ==================== HOOKS ====================
export * from './hooks';
export { useDebounce, useSearchDebounce } from './hooks/useDebounce';
// ==================== NEW SHARED COMPONENTS ====================
// 🎣 HOOKS - Shared Hooks
export {
  useInfiniteScrollTrigger,
  useIntersectionObserver,
} from './hooks/useInfiniteScrollTrigger';
export * from './molecules';
export * from './organisms';
export * from './templates';
// ==================== THEME ====================
export type { Theme } from './theme/theme.config';
export * from './theme/theme.config';
// ==================== UTILITIES ====================
export * from './utils';
