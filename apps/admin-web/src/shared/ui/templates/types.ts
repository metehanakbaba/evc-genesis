import type { ReactNode } from 'react';
import type { BaseComponentProps } from '../atoms/types';

/**
 * Base interfaces for template components
 */

// Base template props
export interface BaseTemplateProps extends BaseComponentProps {
  // Templates typically manage layout and structure
  header?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
  main?: ReactNode;
}

// Page template props
export interface PageTemplateProps extends BaseTemplateProps {
  title?: string;
  description?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

// Dashboard template props
export interface DashboardTemplateProps extends PageTemplateProps {
  widgets?: ReactNode[];
  actions?: ReactNode;
}

// Common template prop combinations
export type TemplateProps = BaseTemplateProps;
export type LayoutTemplateProps = TemplateProps & {
  layout?: 'default' | 'sidebar' | 'fullwidth';
};
