'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@ui/forms';
import type { LucideIcon } from 'lucide-react';
import React from 'react';

/**
 * 🎯 Bulk Action Configuration
 */
export interface BulkAction {
  readonly id: string;
  readonly label: string;
  readonly icon: LucideIcon | React.ComponentType<{ className?: string }>;
  readonly variant?: 'primary' | 'secondary' | 'danger' | 'success';
  readonly onClick: (selectedIds: readonly string[]) => void;
  readonly show?: (selectedCount: number) => boolean;
  readonly disabled?: (selectedCount: number) => boolean;
  readonly tooltip?: string;
  readonly confirmMessage?: string;
}

/**
 * 🎯 Bulk Action Bar Props
 */
export interface BulkActionBarProps {
  readonly selectedCount: number;
  readonly totalCount?: number;
  readonly selectedIds: readonly string[];
  readonly actions: readonly BulkAction[];
  readonly onClearSelection: () => void;
  readonly entityName?: string; // e.g., "users", "stations"
  readonly className?: string;
  readonly variant?: 'blue' | 'purple' | 'emerald' | 'amber';
}

/**
 * 🎨 Revolutionary Bulk Action Bar Component
 *
 * Features:
 * - Smooth slide-in animation when items are selected
 * - Beautiful gradient design matching our system
 * - Configurable bulk actions with variants
 * - Selection count and clear functionality
 * - Hover effects and animations
 * - Confirmation dialogs for dangerous actions
 */
export const BulkActionBar: React.FC<BulkActionBarProps> = ({
  selectedCount,
  totalCount,
  selectedIds,
  actions,
  onClearSelection,
  entityName = 'items',
  className = '',
  variant = 'blue',
}) => {
  const variantClasses = {
    blue: {
      container:
        'from-blue-500/10 via-blue-400/5 to-blue-500/10 border-blue-400/25',
      accent: 'bg-blue-500',
      text: 'text-blue-300',
      shadow: 'shadow-blue-500/20',
    },
    purple: {
      container:
        'from-purple-500/10 via-purple-400/5 to-purple-500/10 border-purple-400/25',
      accent: 'bg-purple-500',
      text: 'text-purple-300',
      shadow: 'shadow-purple-500/20',
    },
    emerald: {
      container:
        'from-emerald-500/10 via-emerald-400/5 to-emerald-500/10 border-emerald-400/25',
      accent: 'bg-emerald-500',
      text: 'text-emerald-300',
      shadow: 'shadow-emerald-500/20',
    },
    amber: {
      container:
        'from-amber-500/10 via-amber-400/5 to-amber-500/10 border-amber-400/25',
      accent: 'bg-amber-500',
      text: 'text-amber-300',
      shadow: 'shadow-amber-500/20',
    },
  };

  const variantConfig = variantClasses[variant];

  // Handle keyboard navigation
  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClearSelection();
      }
    },
    [onClearSelection],
  );

  // Auto-focus management
  const containerRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (selectedCount > 0 && containerRef.current) {
      // Auto-focus the container when it appears for keyboard navigation
      containerRef.current.focus();
    }
  }, [selectedCount]);

  // Get action button classes based on variant
  const getActionButtonClasses = (actionVariant: string): string => {
    switch (actionVariant) {
      case 'primary':
        return `
          bg-gradient-to-r from-blue-500/20 via-blue-400/15 to-blue-500/20
          hover:from-blue-500/30 hover:via-blue-400/25 hover:to-blue-500/30
          text-blue-300 hover:text-blue-200
          border border-blue-400/40 hover:border-blue-300/60
          shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40
        `;
      case 'danger':
        return `
          bg-gradient-to-r from-red-500/20 via-red-400/15 to-red-500/20
          hover:from-red-500/30 hover:via-red-400/25 hover:to-red-500/30
          text-red-300 hover:text-red-200
          border border-red-400/40 hover:border-red-300/60
          shadow-lg shadow-red-500/25 hover:shadow-red-500/40
        `;
      case 'success':
        return `
          bg-gradient-to-r from-emerald-500/20 via-emerald-400/15 to-emerald-500/20
          hover:from-emerald-500/30 hover:via-emerald-400/25 hover:to-emerald-500/30
          text-emerald-300 hover:text-emerald-200
          border border-emerald-400/40 hover:border-emerald-300/60
          shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40
        `;
      case 'secondary':
      default:
        return `
          bg-gradient-to-r from-gray-500/20 via-gray-400/15 to-gray-500/20
          hover:from-gray-500/30 hover:via-gray-400/25 hover:to-gray-500/30
          text-gray-300 hover:text-gray-200
          border border-gray-400/40 hover:border-gray-300/60
          shadow-lg shadow-gray-500/25 hover:shadow-gray-500/40
        `;
    }
  };

  const handleActionClick = async (action: BulkAction) => {
    // Show confirmation dialog for dangerous actions
    if (action.confirmMessage) {
      const confirmed = window.confirm(
        action.confirmMessage.replace('{count}', selectedCount.toString()),
      );
      if (!confirmed) return;
    }

    try {
      await action.onClick(selectedIds);
    } catch (error) {
      console.error(`Error executing bulk action ${action.id}:`, error);
    }
  };

  if (selectedCount === 0) return null;

  return (
    <section
      ref={containerRef}
      className={`
        fixed bottom-4 left-4 right-4 z-50
        lg:bottom-6 lg:left-1/2 lg:right-auto lg:transform lg:-translate-x-1/2
        transition-all duration-500 ease-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900
        ${selectedCount > 0 ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
        ${className}
      `}
      role="toolbar"
      aria-label={`Bulk actions for ${selectedCount} selected ${entityName}`}
      aria-live="polite"
      aria-atomic="true"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      aria-describedby="bulk-action-help"
    >
      {/* Semantic Bulk Action Container */}
      <div
        className={`
        relative p-4 rounded-2xl backdrop-blur-xl border
        bg-gradient-to-r ${variantConfig.container}
        shadow-2xl ${variantConfig.shadow}
        w-full max-w-none lg:min-w-[400px] lg:max-w-[90vw] xl:max-w-[600px] lg:w-auto
        animate-in slide-in-from-bottom-full duration-500
      `}
      >
        {/* Floating Background Effects */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div
            className={`absolute top-0 left-1/4 w-32 h-32 ${variantConfig.accent} opacity-5 rounded-full blur-2xl`}
          ></div>
          <div
            className={`absolute bottom-0 right-1/4 w-32 h-32 ${variantConfig.accent} opacity-5 rounded-full blur-2xl`}
          ></div>
        </div>

        {/* Content Layout */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Selection Info Header */}
          <header className="flex items-center gap-3 min-w-0">
            {/* Selection Indicator */}
            <div
              className={`
                w-6 h-6 rounded-lg ${variantConfig.accent} opacity-80
                flex items-center justify-center flex-shrink-0
                animate-pulse
              `}
              aria-hidden="true"
            >
              <div className="w-3 h-3 bg-white rounded-sm"></div>
            </div>

            {/* Selection Summary */}
            <div className="min-w-0 flex-1">
              <div
                className="text-white font-semibold text-sm"
                role="status"
                aria-label={`${selectedCount} ${entityName} selected`}
              >
                <span className="tabular-nums">{selectedCount}</span>{' '}
                {entityName} selected
              </div>
              {totalCount && (
                <div
                  className="text-gray-400 text-xs"
                  aria-label={`out of ${totalCount} total`}
                >
                  of <span className="tabular-nums">{totalCount}</span> total
                </div>
              )}
            </div>
          </header>

          {/* Actions Navigation */}
          <nav
            className="flex items-center gap-2 flex-wrap justify-end sm:flex-nowrap"
            aria-label="Bulk actions"
          >
            {/* Bulk Action Buttons */}
            {actions
              .filter((action) => !action.show || action.show(selectedCount))
              .map((action, index) => {
                const ActionIcon = action.icon;
                const isDisabled = action.disabled?.(selectedCount) || false;

                return (
                  <Button
                    key={action.id}
                    size="sm"
                    variant="ghost"
                    onClick={() => handleActionClick(action)}
                    disabled={isDisabled}
                    className={`
                      relative overflow-hidden group/action
                      ${getActionButtonClasses(action.variant || 'secondary')}
                      transition-all duration-300 ease-out delay-[${index * 100}ms]
                      hover:scale-105 active:scale-95
                      disabled:opacity-50 disabled:cursor-not-allowed
                      flex items-center gap-2
                    `}
                    aria-label={`${action.label} ${selectedCount} selected ${entityName}`}
                    aria-describedby={
                      action.tooltip ? `tooltip-${action.id}` : undefined
                    }
                  >
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/action:translate-x-[100%] transition-transform duration-500"></div>

                    {/* Button Content */}
                    <div className="flex items-center gap-2 relative z-10">
                      <ActionIcon className="w-4 h-4" aria-hidden="true" />
                      <span className="font-medium text-sm">
                        {action.label}
                      </span>
                    </div>

                    {/* Tooltip for screen readers */}
                    {action.tooltip && (
                      <span id={`tooltip-${action.id}`} className="sr-only">
                        {action.tooltip}
                      </span>
                    )}
                  </Button>
                );
              })}

            {/* Clear Selection Button */}
            <Button
              size="sm"
              variant="ghost"
              onClick={onClearSelection}
              className="
                relative overflow-hidden group/clear
                bg-gradient-to-r from-gray-600/20 via-gray-500/15 to-gray-600/20
                hover:from-gray-600/30 hover:via-gray-500/25 hover:to-gray-600/30
                text-gray-300 hover:text-white
                border border-gray-500/30 hover:border-gray-400/50
                transition-all duration-300 ease-out
                hover:scale-105 active:scale-95
                p-2
              "
              aria-label="Clear selection"
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/clear:translate-x-[100%] transition-transform duration-500"></div>

              <XMarkIcon className="w-4 h-4 relative z-10" />
            </Button>
          </nav>
        </div>

        {/* Screen reader help text */}
        <div id="bulk-action-help" className="sr-only">
          Press Escape to clear selection. Use Tab to navigate between actions.
        </div>
      </div>
    </section>
  );
};

// Helper hook for managing bulk selections
export const useBulkSelection = <T extends { id: string }>(items: T[]) => {
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());

  const selectedItems = React.useMemo(
    () => items.filter((item) => selectedIds.has(item.id)),
    [items, selectedIds],
  );

  const isSelected = React.useCallback(
    (id: string) => selectedIds.has(id),
    [selectedIds],
  );

  const isAllSelected =
    selectedIds.size > 0 && selectedIds.size === items.length;
  const isIndeterminate =
    selectedIds.size > 0 && selectedIds.size < items.length;

  const toggleItem = React.useCallback((id: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const toggleAll = React.useCallback(
    (checked: boolean) => {
      if (checked) {
        setSelectedIds(new Set(items.map((item) => item.id)));
      } else {
        setSelectedIds(new Set());
      }
    },
    [items],
  );

  const clearSelection = React.useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const selectItems = React.useCallback((ids: string[]) => {
    setSelectedIds(new Set(ids));
  }, []);

  return {
    selectedIds: Array.from(selectedIds),
    selectedItems,
    selectedCount: selectedIds.size,
    isSelected,
    isAllSelected,
    isIndeterminate,
    toggleItem,
    toggleAll,
    clearSelection,
    selectItems,
  };
};
