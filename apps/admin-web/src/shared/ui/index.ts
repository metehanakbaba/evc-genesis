/**
 * Centralized UI component exports
 * All UI components should be imported from this file
 *
 * 📁 Organized by Category:
 * - Forms: Interactive form elements
 * - Navigation: Navigation components
 * - Display: Content display components
 * - Layout: Layout and structure components
 * - Feedback: User feedback components
 */

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
export type { HeroSectionProps } from './components/Display/HeroSection/HeroSection';
export { HeroSection } from './components/Display/HeroSection/HeroSection';
export type { SpinnerProps } from './components/Display/Spinner/Spinner';
export { Spinner } from './components/Display/Spinner/Spinner';
export type { StatCardProps } from './components/Display/StatCard/StatCard';
export { StatCard } from './components/Display/StatCard/StatCard';
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
export type { NavigationCardProps } from './components/Navigation/NavigationCard/NavigationCard';
// ==================== NAVIGATION ====================
export { NavigationCard } from './components/Navigation/NavigationCard/NavigationCard';

// Modal is not exported yet - will need to add when ready

// ==================== FEEDBACK ====================
export { ErrorBoundary } from './components/Feedback/ErrorBoundary/ErrorBoundary';
export type { ToastProps } from './components/Feedback/Toast/Toast';
export { Toast } from './components/Feedback/Toast/Toast';
export {
  ToastProvider,
  toast,
  useToast,
} from './components/Feedback/Toast/ToastContext';
export type {
  ContainerProps,
  GridItemProps,
  GridProps,
  IconComponent,
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
  Padding,
  SectionHeader,
  SectionHeaderSize,
  SectionHeaderVariant,
} from './components/Layout';

// ==================== THEME ====================
export type { Theme } from './theme/theme.config';
export * from './theme/theme.config';
