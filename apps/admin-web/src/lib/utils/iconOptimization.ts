import { lazy, ComponentType, SVGProps } from 'react';

/**
 * Icon Performance Optimization Utilities
 * Provides lazy loading and tree-shaking for icon libraries
 */

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

/**
 * Lazy loaded icon cache to prevent duplicate imports
 */
const iconCache = new Map<string, IconComponent>();

/**
 * Heroicons Outline lazy loader
 * Only loads specific icons when needed
 */
export const createLazyHeroIcon = (iconName: string): IconComponent => {
  if (iconCache.has(`heroicons-outline-${iconName}`)) {
    return iconCache.get(`heroicons-outline-${iconName}`)!;
  }

  const LazyIcon = lazy(() =>
    import('@heroicons/react/24/outline').then((module) => ({
      default: (module as any)[iconName] || (() => null),
    })),
  );

  iconCache.set(`heroicons-outline-${iconName}`, LazyIcon);
  return LazyIcon;
};

/**
 * Heroicons Solid lazy loader
 */
export const createLazyHeroIconSolid = (iconName: string): IconComponent => {
  if (iconCache.has(`heroicons-solid-${iconName}`)) {
    return iconCache.get(`heroicons-solid-${iconName}`)!;
  }

  const LazyIcon = lazy(() =>
    import('@heroicons/react/24/solid').then((module) => ({
      default: (module as any)[iconName] || (() => null),
    })),
  );

  iconCache.set(`heroicons-solid-${iconName}`, LazyIcon);
  return LazyIcon;
};

/**
 * Lucide React lazy loader
 */
export const createLazyLucideIcon = (iconName: string): IconComponent => {
  if (iconCache.has(`lucide-${iconName}`)) {
    return iconCache.get(`lucide-${iconName}`)!;
  }

  const LazyIcon = lazy(() =>
    import('lucide-react').then((module) => ({
      default: (module as any)[iconName] || (() => null),
    })),
  );

  iconCache.set(`lucide-${iconName}`, LazyIcon);
  return LazyIcon;
};

/**
 * Preload critical icons during app initialization
 * Reduces perceived loading time for important icons
 */
export const preloadCriticalIcons = async () => {
  const criticalIcons = [
    'BoltIcon',
    'UserIcon',
    'Cog6ToothIcon',
    'ChartBarIcon',
    'ExclamationTriangleIcon',
  ];

  // Preload heroicons in parallel
  await Promise.all(
    criticalIcons.map((iconName) =>
      import('@heroicons/react/24/outline').then((module) => {
        iconCache.set(
          `heroicons-outline-${iconName}`,
          (module as any)[iconName],
        );
      }),
    ),
  );
};

/**
 * Icon bundle optimization helper
 * Dynamically imports only needed icons
 */
export const getOptimizedIcon = (
  library: 'heroicons-outline' | 'heroicons-solid' | 'lucide',
  iconName: string,
): IconComponent => {
  switch (library) {
    case 'heroicons-outline':
      return createLazyHeroIcon(iconName);
    case 'heroicons-solid':
      return createLazyHeroIconSolid(iconName);
    case 'lucide':
      return createLazyLucideIcon(iconName);
    default:
      throw new Error(`Unsupported icon library: ${library}`);
  }
};

/**
 * Clear icon cache (useful for testing or memory management)
 */
export const clearIconCache = () => {
  iconCache.clear();
};

/**
 * Get cache statistics for monitoring
 */
export const getIconCacheStats = () => ({
  size: iconCache.size,
  keys: Array.from(iconCache.keys()),
});
