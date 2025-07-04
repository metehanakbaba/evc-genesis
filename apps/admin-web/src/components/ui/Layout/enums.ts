/**
 * Layout System Enums
 *
 * Centralized enums for all layout components to ensure type safety,
 * better IDE support, and consistent values across the system.
 */

/**
 * Grid System Enums
 */
export enum GridColumns {
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Six = 6,
  Twelve = 12,
}

export enum GridGap {
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
  ExtraLarge = 'xl',
}

/**
 * Grid Item Enums
 */
export enum GridItemVariant {
  Default = 'default',
  Glass = 'glass',
  Solid = 'solid',
  Minimal = 'minimal',
}

export enum GridItemSpan {
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
  Seven = 7,
  Eight = 8,
  Nine = 9,
  Ten = 10,
  Eleven = 11,
  Twelve = 12,
}

/**
 * Spacing & Padding Enums
 */
export enum Padding {
  None = 'none',
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
  ExtraLarge = 'xl',
}

/**
 * Container Size Enums
 */
export enum ContainerSize {
  Small = 'sm', // max-w-2xl
  Medium = 'md', // max-w-4xl
  Large = 'lg', // max-w-6xl
  ExtraLarge = 'xl', // max-w-7xl
  Full = 'full', // max-w-full
}

/**
 * Section Header Enums
 */
export enum SectionHeaderSize {
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
  ExtraLarge = 'xl',
}

export enum SectionHeaderVariant {
  Default = 'default',
  Primary = 'primary',
  Secondary = 'secondary',
}

export enum HeadingLevel {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
}

/**
 * Type Guards for Runtime Validation
 */
export const isValidGridColumns = (value: any): value is GridColumns => {
  return Object.values(GridColumns).includes(value);
};

export const isValidGridGap = (value: any): value is GridGap => {
  return Object.values(GridGap).includes(value);
};

export const isValidGridItemVariant = (
  value: any,
): value is GridItemVariant => {
  return Object.values(GridItemVariant).includes(value);
};

export const isValidPadding = (value: any): value is Padding => {
  return Object.values(Padding).includes(value);
};

export const isValidContainerSize = (value: any): value is ContainerSize => {
  return Object.values(ContainerSize).includes(value);
};

/**
 * Enum Value Maps for CSS Classes
 * These provide the mapping from enum values to actual CSS classes
 */
export const GridColumnsMap = {
  [GridColumns.One]: 'grid-cols-1',
  [GridColumns.Two]: 'grid-cols-2',
  [GridColumns.Three]: 'grid-cols-3',
  [GridColumns.Four]: 'grid-cols-4',
  [GridColumns.Six]: 'grid-cols-6',
  [GridColumns.Twelve]: 'grid-cols-12',
} as const;

export const GridGapMap = {
  [GridGap.Small]: 'gap-4',
  [GridGap.Medium]: 'gap-6',
  [GridGap.Large]: 'gap-8',
  [GridGap.ExtraLarge]: 'gap-12',
} as const;

export const PaddingMap = {
  [Padding.None]: '',
  [Padding.Small]: 'p-4',
  [Padding.Medium]: 'p-6',
  [Padding.Large]: 'p-8',
  [Padding.ExtraLarge]: 'p-12',
} as const;

export const ContainerSizeMap = {
  [ContainerSize.Small]: 'max-w-2xl',
  [ContainerSize.Medium]: 'max-w-4xl',
  [ContainerSize.Large]: 'max-w-6xl',
  [ContainerSize.ExtraLarge]: 'max-w-7xl',
  [ContainerSize.Full]: 'max-w-full',
} as const;
