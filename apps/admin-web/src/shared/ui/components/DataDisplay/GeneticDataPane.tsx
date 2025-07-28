'use client';

import React from 'react';
import { Button } from '@ui/forms';
import { QuickFilterButtons, QuickFilterGroup } from './QuickFilterButtons';
import RangeSelector, { RangeOption, RangeType } from '../../molecules/Ranges/RangeSelector';

export interface ActionButton<T> {
  readonly id: string;
  readonly label: string;
  readonly onClick: (item: T) => void;
  readonly variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline';
  readonly icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  readonly show?: (item: T) => boolean;
  readonly disabled?: (item: T) => boolean;
  readonly tooltip?: string;
}

export interface GenericDataDisplayProps<T> {
  readonly items: T[];
  readonly selectedItem: T | null;
  readonly onSelectItem: (item: T) => void;
  readonly renderListItem: (item: T) => React.ReactNode;
  readonly renderDetails: (item: T) => React.ReactNode;
  readonly actions?: ActionButton<T>[];
  readonly filters?: QuickFilterGroup[];
  readonly onClearFilters?: () => void;
  readonly size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  readonly listWidthRatio?: number; // fraction between 0 and 1, default 1/3
  readonly listPosition?: 'left' | 'right';
  readonly emptyState?: React.ReactNode;
  readonly className?: string;
  readonly rangeSelectorConfig?: {
    type: RangeType;
    options?: RangeOption[];
    selectedOptionId?: string;
    fromValue?: number | string;
    toValue?: number | string;
    onRangeChange?: (from: number | string | undefined, to: number | string | undefined, optionId?: string) => void;
    minFrom?: number | string;
    maxFrom?: number | string;
    minTo?: number | string;
    maxTo?: number | string;
  };
  readonly scrollable?: boolean;
  readonly scrollHeight?: string;
  readonly isLoading?: boolean;
  readonly error?: Error | null;
  readonly onRefresh?: () => void;
}

/**
 * GenericDataPane Component
 *
 * Displays a list of items on one side and details of the selected item on the other.
 * Supports configurable width variants, list position, filters, and action buttons.
 * Fully controlled component with no internal data state.
 * Optionally renders a RangeSelector component for range filtering.
 */
export function GenericDataPane<T>({
  items,
  selectedItem,
  onSelectItem,
  renderListItem,
  renderDetails,
  actions = [],
  filters = [],
  onClearFilters,
  size = 'md',
  listWidthRatio = 1 / 3,
  listPosition = 'left',
  emptyState = (
    <div className="text-gray-400 text-center p-8 select-none">
      No data available
    </div>
  ),
  className = '',
  rangeSelectorConfig,
  scrollable = false,
  scrollHeight,
  isLoading = false,
  error = null,
  onRefresh,
}: GenericDataDisplayProps<T>): React.ReactElement {
  // Map widthVariant to max width classes
  const widthClassMap: Record<typeof size, string> = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    full: 'w-full max-w-full',
  };

  // Calculate list and detail pane widths in percentage
  const listWidthPercent = Math.min(Math.max(listWidthRatio, 0.1), 0.9) * 100;
  const detailWidthPercent = 100 - listWidthPercent;

  // Determine flex order based on listPosition
  const listOrder = listPosition === 'left' ? 0 : 1;
  const detailOrder = listPosition === 'left' ? 1 : 0;

  // Handle error state
  if (error) {
    return (
      <div
        className={`w-full ${widthClassMap[size]} bg-red-900 rounded-2xl border border-red-700/50 overflow-hidden backdrop-blur-xl shadow-lg p-6 text-red-400 ${className}`}
        role="alert"
      >
        <p>Error: {error.message}</p>
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="mt-4 px-4 py-2 bg-red-700 rounded hover:bg-red-600"
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  // Handle loading state
  if (isLoading) {
    return (
      <div
        className={`w-full ${widthClassMap[size]} bg-gray-900 rounded-2xl border border-gray-700/50 overflow-hidden backdrop-blur-xl shadow-lg p-6 flex items-center justify-center ${className}`}
        role="status"
        aria-live="polite"
      >
        <span>Loading...</span>
      </div>
    );
  }

  // Handle empty state when no items
  if (items.length === 0) {
    return (
      <div
        className={`w-full ${widthClassMap[size]} bg-gray-900 rounded-2xl border border-gray-700/50 overflow-hidden backdrop-blur-xl shadow-lg ${className}`}
      >
        {emptyState}
      </div>
    );
  }

  return (
    <>
      {/* Filters above list and details container */}
      {filters.length > 0 && (
        <div className="flex flex-wrap gap-3 p-4 border-b border-gray-700/30">
          <QuickFilterButtons
            filterGroups={filters}
            variant="default"
            className="!mb-0 w-full"
          />

          {rangeSelectorConfig && (
            <div className="p-4 border-b border-gray-700/30">
              <RangeSelector
                type={rangeSelectorConfig.type}
                size={size === 'full' ? 'sm' : (size === 'xl' ? 'sm' : size)}
                options={rangeSelectorConfig.options}
                selectedOptionId={rangeSelectorConfig.selectedOptionId}
                fromValue={rangeSelectorConfig.fromValue}
                toValue={rangeSelectorConfig.toValue}
                onChange={rangeSelectorConfig.onRangeChange || (() => {})}
                minFrom={rangeSelectorConfig.minFrom}
                maxFrom={rangeSelectorConfig.maxFrom}
                minTo={rangeSelectorConfig.minTo}
                maxTo={rangeSelectorConfig.maxTo}
              />
            </div>
          )}
          {onClearFilters && (
            <div className="flex justify-end w-full">
              <Button
                size="xs"
                variant="ghost"
                onClick={onClearFilters}
                className="text-gray-400 hover:text-gray-200"
                aria-label="Clear all filters"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      )}

      {/* List and Details container */}
      <div
        className={`w-full ${widthClassMap[size]} bg-gray-900 rounded-2xl border border-gray-700/50 overflow-hidden backdrop-blur-xl shadow-lg flex flex-col md:flex-row ${className}`}
        style={{
          minHeight: '400px',
          ...(scrollable && scrollHeight ? { maxHeight: scrollHeight, overflowY: 'auto' } : {}),
        }}
        role="region"
        aria-label="Generic Data Display"
      >
        {/* List Pane */}
        <aside
          className="flex flex-col border-b border-gray-700/40 md:border-b-0 md:border-r border-gray-700/40 bg-gray-800/60 backdrop-blur-md"
          style={{
            flexBasis: `${listWidthPercent}%`,
            order: listOrder,
            minWidth: '200px',
            maxWidth: `${listWidthPercent}%`,
          }}
        >

          {/* List Items */}
          <ul
            className="overflow-auto flex-1 divide-y divide-gray-700/30"
            role="list"
            tabIndex={0}
            aria-label="Item list"
          >
            {items.map((item, index) => {
              const isSelected = selectedItem === item;
              return (
                <li
                  key={index}
                  className={`cursor-pointer select-none p-2 hover:bg-blue-500/20 transition-colors duration-150 ${isSelected ? 'bg-blue-600/40 font-semibold' : 'font-normal'}`}
                  onClick={() => onSelectItem(item)}
                  role="option"
                  aria-selected={isSelected}
                  tabIndex={-1}
                >
                  {renderListItem(item)}
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Detail Pane */}
        <section
          className="flex flex-col flex-1 p-4 overflow-auto bg-gray-900"
          style={{
            flexBasis: `${detailWidthPercent}%`,
            order: detailOrder,
            minWidth: 0,
          }}
          aria-live="polite"
          aria-label="Detail view"
        >
          {selectedItem ? (
            <>
              <div className="flex flex-col flex-1 overflow-auto">
                {renderDetails(selectedItem)}
              </div>

              {/* Action Buttons */}
              {actions.length > 0 && (
                <nav
                  className="mt-2 flex flex-wrap gap-2 justify-end"
                  aria-label="Detail actions"
                >
                  {actions
                    .filter((action) => !action.show || action.show(selectedItem))
                    .map((action) => {
                      const Icon = action.icon;
                      const disabled = action.disabled?.(selectedItem) ?? false;
                      return (
                        <Button
                          key={action.id}
                          size="xs"
                          variant={
                            action.variant === 'destructive'
                              ? 'destructive'
                              : action.variant || 'secondary'
                          }
                          onClick={() => action.onClick(selectedItem)}
                          disabled={disabled}
                          aria-label={action.tooltip}
                          className="flex items-center gap-1"
                        >
                          {Icon && <Icon className="w-3 h-3" aria-hidden="true" />}
                          {action.label}
                        </Button>
                      );
                    })}
                </nav>
              )}
            </>
          ) : (
            <div className="text-gray-400 text-center select-none mt-16">
              Select an item to see details
            </div>
          )}
        </section>
      </div>
    </>
  );
}
