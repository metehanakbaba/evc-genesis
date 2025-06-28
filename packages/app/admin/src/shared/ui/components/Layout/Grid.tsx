import { ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { GridColumns, GridGap, GridColumnsMap, GridGapMap } from './enums';

/**
 * Grid Layout Component Props
 */
export interface GridProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly cols?: GridColumns;
  readonly mdCols?: GridColumns;
  readonly lgCols?: GridColumns;
  readonly gap?: GridGap;
  readonly as?: keyof JSX.IntrinsicElements;
}

/**
 * Grid Column Mapping with responsive prefixes
 */
const mdGridColsMap = {
  [GridColumns.One]: 'md:grid-cols-1',
  [GridColumns.Two]: 'md:grid-cols-2',
  [GridColumns.Three]: 'md:grid-cols-3',
  [GridColumns.Four]: 'md:grid-cols-4',
  [GridColumns.Six]: 'md:grid-cols-6',
  [GridColumns.Twelve]: 'md:grid-cols-12',
} as const;

const lgGridColsMap = {
  [GridColumns.One]: 'lg:grid-cols-1',
  [GridColumns.Two]: 'lg:grid-cols-2',
  [GridColumns.Three]: 'lg:grid-cols-3',
  [GridColumns.Four]: 'lg:grid-cols-4',
  [GridColumns.Six]: 'lg:grid-cols-6',
  [GridColumns.Twelve]: 'lg:grid-cols-12',
} as const;

/**
 * Type-safe Grid Layout Component
 *
 * @example
 * ```tsx
 * <Grid cols={1} mdCols={2} lgCols={3} gap="md">
 *   <GridItem>Content 1</GridItem>
 *   <GridItem>Content 2</GridItem>
 *   <GridItem>Content 3</GridItem>
 * </Grid>
 * ```
 */
export const Grid: React.FC<GridProps> = ({
  children,
  className,
  cols = GridColumns.One,
  mdCols,
  lgCols,
  gap = GridGap.Medium,
  as: Component = 'div',
}) => {
  const gridClasses = cn(
    'grid',
    GridColumnsMap[cols],
    mdCols && mdGridColsMap[mdCols],
    lgCols && lgGridColsMap[lgCols],
    GridGapMap[gap],
    className,
  );

  return <Component className={gridClasses}>{children}</Component>;
};

Grid.displayName = 'Grid';
