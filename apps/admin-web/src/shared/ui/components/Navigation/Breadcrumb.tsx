'use client';

import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import { Button } from '@ui/forms';
import { useRouter } from 'next/navigation';
import type React from 'react';

/**
 * 🎨 Theme Variant Types
 */
type BreadcrumbVariant = 'blue' | 'purple' | 'emerald' | 'teal' | 'amber' | 'rose' | 'cyan' | 'gray';

/**
 * 🧭 Breadcrumb Item Interface
 */
export interface BreadcrumbItem {
  readonly label: string;
  readonly href?: string;
  readonly isActive?: boolean;
}

/**
 * 🧭 Breadcrumb Props Interface
 */
export interface BreadcrumbProps {
  readonly items?: BreadcrumbItem[];
  readonly currentPageLabel: string;
  readonly variant?: BreadcrumbVariant;
  readonly className?: string;
  readonly showHomeButton?: boolean;
  readonly homeHref?: string;
}

/**
 * 🧭 Revolutionary Breadcrumb Navigation Component
 * 
 * Consistent breadcrumb navigation across all pages with theme support
 * 
 * @example
 * ```tsx
 * <Breadcrumb 
 *   currentPageLabel="PLN Wallet"
 *   variant="teal"
 *   items={[
 *     { label: "Financial", href: "/financial" },
 *     { label: "Payments", href: "/financial/payments" }
 *   ]}
 * />
 * ```
 */
export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items = [],
  currentPageLabel,
  variant = 'blue',
  className = '',
  showHomeButton = true,
  homeHref = '/',
}) => {
  const router = useRouter();

  const themeConfig: Record<BreadcrumbVariant, string> = {
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    emerald: 'text-emerald-400',
    teal: 'text-teal-400',
    amber: 'text-amber-400',
    rose: 'text-rose-400',
    cyan: 'text-cyan-400',
    gray: 'text-gray-400',
  };

  const currentColor = themeConfig[variant];

  return (
    <nav className={`flex items-center gap-2 text-sm text-gray-400 mb-6 ${className}`}>
      {/* Home Button */}
      {showHomeButton && (
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(homeHref)}
            className="
              p-2 hover:bg-gray-700/30 flex items-center gap-1
              bg-gradient-to-r from-gray-700/30 via-gray-600/20 to-gray-700/30
              hover:from-gray-600/40 hover:via-gray-500/30 hover:to-gray-600/40
              border border-gray-600/20 hover:border-gray-500/40
              transition-all duration-300 ease-out
              hover:scale-[1.02] active:scale-[0.98]
            "
          >
            <HomeIcon className="w-4 h-4" />
            <span className="font-medium">Dashboard</span>
          </Button>
          <ChevronRightIcon className="w-4 h-4" />
        </>
      )}

      {/* Additional Items */}
      {items.map((item, index) => (
        <div key={`${item.label}-${index}`} className="flex items-center gap-2">
          {item.href ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(item.href!)}
              className="
                p-2 hover:bg-gray-700/30 flex items-center gap-1
                bg-gradient-to-r from-gray-700/30 via-gray-600/20 to-gray-700/30
                hover:from-gray-600/40 hover:via-gray-500/30 hover:to-gray-600/40
                border border-gray-600/20 hover:border-gray-500/40
                transition-all duration-300 ease-out
                hover:scale-[1.02] active:scale-[0.98]
              "
            >
              <span className="font-medium">{item.label}</span>
            </Button>
          ) : (
            <span className="font-medium text-gray-300">{item.label}</span>
          )}
          <ChevronRightIcon className="w-4 h-4" />
        </div>
      ))}

      {/* Current Page */}
      <span className={`font-medium ${currentColor}`}>
        {currentPageLabel}
      </span>
    </nav>
  );
}; 