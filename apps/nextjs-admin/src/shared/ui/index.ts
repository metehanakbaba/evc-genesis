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

// ==================== FORMS ====================
export type { ButtonProps } from './components/Forms/Button/Button';
export { Button } from './components/Forms/Button/Button';

export type { InputProps } from './components/Forms/Input/Input';
export { Input } from './components/Forms/Input/Input';

export type { TextareaProps } from './components/Forms/Textarea/Textarea';
export { Textarea } from './components/Forms/Textarea/Textarea';

export type {
  SelectOption,
  SelectProps,
} from './components/Forms/Select/Select';
export { Select } from './components/Forms/Select/Select';

export type { CheckboxProps } from './components/Forms/Checkbox/Checkbox';
export { Checkbox } from './components/Forms/Checkbox/Checkbox';

export type { SwitchProps } from './components/Forms/Switch/Switch';
export { Switch } from './components/Forms/Switch/Switch';

export type {
  RadioGroupProps,
  RadioOption,
} from './components/Forms/RadioGroup/RadioGroup';
export { RadioGroup } from './components/Forms/RadioGroup/RadioGroup';

export type { FieldsetProps } from './components/Forms/Fieldset/Fieldset';
export { Fieldset } from './components/Forms/Fieldset/Fieldset';

export type {
  ListboxOptionType,
  ListboxProps,
} from './components/Forms/Listbox/Listbox';
export { Listbox } from './components/Forms/Listbox/Listbox';

// ==================== NAVIGATION ====================
export { NavigationCard } from './components/Navigation/NavigationCard/NavigationCard';
export type { NavigationCardProps } from './components/Navigation/NavigationCard/NavigationCard';

// ==================== DISPLAY ====================
export type { CardProps } from './components/Display/Card/Card';
export {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from './components/Display/Card/Card';

export { Badge } from './components/Display/Badge/Badge';
export type { BadgeProps } from './components/Display/Badge/Badge';

export { StatCard } from './components/Display/StatCard/StatCard';
export type { StatCardProps } from './components/Display/StatCard/StatCard';

export { HeroSection } from './components/Display/HeroSection/HeroSection';
export type { HeroSectionProps } from './components/Display/HeroSection/HeroSection';

export { Spinner } from './components/Display/Spinner/Spinner';
export type { SpinnerProps } from './components/Display/Spinner/Spinner';

// Modal is not exported yet - will need to add when ready

// ==================== FEEDBACK ====================
export { ErrorBoundary } from './components/Feedback/ErrorBoundary/ErrorBoundary';

export { Toast } from './components/Feedback/Toast/Toast';
export type { ToastProps } from './components/Feedback/Toast/Toast';
export {
  ToastProvider,
  useToast,
  toast,
} from './components/Feedback/Toast/ToastContext';

// ==================== LAYOUT ====================
export { Grid, GridItem, SectionHeader, Container } from './components/Layout';
export type {
  GridProps,
  GridItemProps,
  SectionHeaderProps,
  IconComponent,
  ContainerProps,
} from './components/Layout';

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
  isValidGridColumns,
  isValidGridGap,
  isValidGridItemVariant,
  isValidPadding,
  isValidContainerSize,
} from './components/Layout';

// ==================== THEME ====================
export type { Theme } from './theme/theme.config';
export * from './theme/theme.config';
