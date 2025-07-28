'use client';

import React, {useState} from 'react';
import { Button } from '@ui/forms';
import { ComponentSize } from '../../theme/theme.config';

export interface ActionButton<T> {
  readonly id: string;
  readonly label: string;
  readonly onClick: (item: T) => void;
  readonly variant?:
    | "primary"
    | "secondary"
    | "ghost"
    | "destructive"
    | "outline";
  readonly icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  readonly show?: (item: T) => boolean;
  readonly disabled?: (item: T) => boolean;
  readonly tooltip?: string;
  readonly opensActionPane?: boolean;
  readonly size?: ComponentSize;
  readonly className?: string;
}

export interface GenericDataPaneProps<T> {
  readonly items: T[];
  readonly selectedItem: T | null;
  readonly onSelectItem: (item: T) => void;
  readonly renderListItem: (item: T) => React.ReactNode;
  readonly renderDetails: (item: T) => React.ReactNode;
  readonly renderAction?: (item: T) => React.ReactNode;
  readonly actions?: ActionButton<T>[];
  readonly size?: "sm" | "md" | "lg" | "xl" | "full";
  readonly listWidthRatio?: number;
  readonly listPosition?: "left" | "right";
  readonly emptyState?: React.ReactNode;
  readonly className?: string;
  readonly scrollable?: boolean;
  readonly scrollHeight?: string;
  readonly isLoading?: boolean;
  readonly error?: Error | null;
  readonly onRefresh?: () => void;
}

export function GenericDataPane<T>(props: GenericDataPaneProps<T>): React.ReactElement {
  const {
    items,
    selectedItem,
    onSelectItem,
    renderListItem,
    renderDetails,
    renderAction,
    actions = [],
    size = "md",
    listWidthRatio = 1 / 3,
    listPosition = "left",
    emptyState = (
      <div className="text-gray-400 text-center p-8 select-none">
        No data available
      </div>
    ),
    className = "",
    scrollHeight,
    isLoading = false,
    error = null,
    onRefresh,
  } = props;

  const [mode, setMode] = useState<"empty" | "details" | "action">(selectedItem ? "details" : "empty");

  React.useEffect(() => {
    if (!selectedItem) {
      setMode("empty");
    } else if (mode === "empty") {
      setMode("details");
    }
  }, [selectedItem]);

  const widthClassMap: Record<NonNullable<typeof size>, string> = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    full: "w-full max-w-full",
  };

  const listWidthPercent = Math.min(Math.max(listWidthRatio, 0.1), 0.9) * 100;
  const detailWidthPercent = 100 - listWidthPercent;
  const listOrder = listPosition === "left" ? 0 : 1;
  const detailOrder = listPosition === "left" ? 1 : 0;

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
    <div
      className={`w-full ${widthClassMap[size]} bg-gray-900 rounded-2xl border border-gray-700/50 overflow-hidden backdrop-blur-xl shadow-lg flex flex-col md:flex-row ${className}`}
      style={{
        height: scrollHeight || '50%',
        maxHeight: '80vh',
      }}
      role="region"
      aria-label="Generic Data Display"
    >
      <aside
        className="flex flex-col border-b border-gray-700/40 md:border-b-0 md:border-r border-gray-700/40 bg-gray-800/60 backdrop-blur-md"
        style={{
          flexBasis: `${listWidthPercent}%`,
          order: listOrder,
          minWidth: "200px",
          maxWidth: `${listWidthPercent}%`,
          height: "100%",
        }}
      >
        <ul
          className="overflow-y-auto flex-1 divide-y divide-gray-700/30"
          role="list"
          tabIndex={0}
          aria-label="Item list"
        >
          {items.map((item, index) => {
            const isSelected = selectedItem === item;
            return (
              <li
                key={index}
                className={`cursor-pointer select-none p-2 hover:bg-blue-500/20 transition-colors duration-150 ${isSelected ? "bg-blue-600/40 font-semibold" : "font-normal"}`}
                onClick={() => {
                  onSelectItem(item);
                  setMode("details");
                }}
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

      <section
        className="flex flex-col flex-1 p-4 bg-gray-900"
        style={{
          flexBasis: `${detailWidthPercent}%`,
          order: detailOrder,
          minWidth: 0,
          height: "100%",
        }}
        aria-live="polite"
        aria-label="Detail view"
      >
        {mode === "empty" && (
          <div className="text-gray-400 text-center select-none mt-16">
            Select an item to see details
          </div>
        )}

        {mode === "details" && selectedItem && (
          <>
            <div className="flex flex-col flex-1 overflow-y-auto min-h-0">
              {renderDetails(selectedItem)}
            </div>

            {actions.length > 0 && (
              <nav
                className="mt-2 flex flex-wrap gap-2 justify-end flex-shrink-0"
                aria-label="Detail actions"
              >
                {actions
                  .filter((action) =>
                    action.show ? action.show(selectedItem) : true
                  )
                  .map((action) => {
                    const Icon = action.icon;
                    const disabled = action.disabled?.(selectedItem) ?? false;
                    const opensPane =
                      action.opensActionPane ?? Boolean(renderAction);
                    return (
                      <Button
                        key={action.id}
                        size={action.size}
                        variant={
                          action.variant === "destructive"
                            ? "destructive"
                            : action.variant || "secondary"
                        }
                        onClick={() => {
                          action.onClick(selectedItem);
                          if (opensPane) {
                            setMode("action");
                          }
                        }}
                        disabled={disabled}
                        aria-label={action.tooltip}
                        className="flex items-center gap-1"
                      >
                        {Icon && (
                          <Icon className="w-3 h-3" aria-hidden="true" />
                        )}
                        {action.label}
                      </Button>
                    );
                  })}
              </nav>
            )}
          </>
        )}

        {mode === "action" && selectedItem && renderAction && (
          <div className="flex flex-col flex-1 overflow-y-auto min-h-0">
            <div className="flex-1 overflow-y-auto min-h-0">
              {renderAction(selectedItem)}
            </div>
            <div className="mt-4 flex justify-end flex-shrink-0">
              <Button
                size="sm"
                variant="destructive"
                onClick={() => setMode("details")}
              >
                Back
              </Button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}