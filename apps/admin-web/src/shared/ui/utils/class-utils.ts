/**
 * Class utility functions for consistent class name handling
 */

/**
 * Conditionally join class names, filtering out falsy values
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Merge class names with conflict resolution
 * Later classes override earlier ones for the same property
 */
export function mergeClasses(
  ...classes: (string | undefined | null | false)[]
): string {
  const classMap = new Map<string, string>();

  classes
    .filter(Boolean)
    .join(' ')
    .split(' ')
    .forEach((className) => {
      if (!className) return;

      // Extract the property prefix (e.g., 'bg', 'text', 'p', etc.)
      const prefix = className.split('-')[0];
      classMap.set(prefix, className);
    });

  return Array.from(classMap.values()).join(' ');
}

/**
 * Create conditional class names based on props
 */
export function createConditionalClasses<T extends Record<string, any>>(
  props: T,
  classMap: Partial<Record<keyof T, string | ((value: any) => string)>>,
): string {
  const classes: string[] = [];

  Object.entries(classMap).forEach(([key, classValue]) => {
    const propValue = props[key];

    if (propValue) {
      if (typeof classValue === 'function') {
        classes.push(classValue(propValue));
      } else if (typeof classValue === 'string') {
        classes.push(classValue);
      }
    }
  });

  return classes.join(' ');
}

/**
 * Create responsive class names
 */
export function createResponsiveClasses(
  baseClass: string,
  breakpoints: {
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    '2xl'?: string;
  } = {},
): string {
  const classes = [baseClass];

  Object.entries(breakpoints).forEach(([breakpoint, className]) => {
    if (className) {
      classes.push(`${breakpoint}:${className}`);
    }
  });

  return classes.join(' ');
}

/**
 * Create state-based class names
 */
export function createStateClasses(
  baseClass: string,
  states: {
    hover?: string;
    focus?: string;
    active?: string;
    disabled?: string;
    loading?: string;
  } = {},
): string {
  const classes = [baseClass];

  Object.entries(states).forEach(([state, className]) => {
    if (className) {
      classes.push(`${state}:${className}`);
    }
  });

  return classes.join(' ');
}

/**
 * Extract and organize Tailwind classes by category
 */
export function organizeClasses(classString: string): {
  layout: string[];
  spacing: string[];
  colors: string[];
  typography: string[];
  effects: string[];
  animations: string[];
  other: string[];
} {
  const classes = classString.split(' ').filter(Boolean);

  const categories = {
    layout: [] as string[],
    spacing: [] as string[],
    colors: [] as string[],
    typography: [] as string[],
    effects: [] as string[],
    animations: [] as string[],
    other: [] as string[],
  };

  classes.forEach((className) => {
    if (
      className.match(/^(w-|h-|flex|grid|block|inline|absolute|relative|fixed)/)
    ) {
      categories.layout.push(className);
    } else if (className.match(/^(p-|m-|space-|gap-)/)) {
      categories.spacing.push(className);
    } else if (className.match(/^(bg-|text-|border-.*-|ring-)/)) {
      categories.colors.push(className);
    } else if (className.match(/^(text-|font-|leading-|tracking-)/)) {
      categories.typography.push(className);
    } else if (className.match(/^(shadow-|blur-|opacity-|backdrop-)/)) {
      categories.effects.push(className);
    } else if (className.match(/^(animate-|transition-|duration-|ease-)/)) {
      categories.animations.push(className);
    } else {
      categories.other.push(className);
    }
  });

  return categories;
}

/**
 * Remove conflicting classes (keeps the last occurrence)
 */
export function removeConflictingClasses(classString: string): string {
  const classes = classString.split(' ').filter(Boolean);
  const seen = new Set<string>();
  const result: string[] = [];

  // Process classes in reverse to keep the last occurrence
  for (let i = classes.length - 1; i >= 0; i--) {
    const className = classes[i];
    const prefix = className.split('-')[0];

    if (!seen.has(prefix)) {
      seen.add(prefix);
      result.unshift(className);
    }
  }

  return result.join(' ');
}

/**
 * Validate Tailwind class names (basic validation)
 */
export function validateTailwindClasses(classString: string): {
  valid: string[];
  invalid: string[];
} {
  const classes = classString.split(' ').filter(Boolean);
  const valid: string[] = [];
  const invalid: string[] = [];

  // Basic Tailwind class pattern validation
  const tailwindPattern = /^([a-z]+:)?[a-z-]+(-\d+|\/\d+)?$/;

  classes.forEach((className) => {
    if (tailwindPattern.test(className)) {
      valid.push(className);
    } else {
      invalid.push(className);
    }
  });

  return { valid, invalid };
}
