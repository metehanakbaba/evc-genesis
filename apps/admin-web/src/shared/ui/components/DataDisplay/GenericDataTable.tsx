/**
 * 📊 Generic Data Table Component
 * 
 * Reusable table component that abstracts the common table patterns from:
 * - UserTable, StationTable, TransactionTable, SessionTable
 * 
 * Features:
 * - Configurable columns via props
 * - Infinite scroll support with throttling
 * - Customizable action buttons
 * - Sorting and filtering capabilities
 * - Consistent table design and behavior
 * - Built-in loading states and skeletons
 * - Responsive design with horizontal scroll
 * 
 * @module GenericDataTable
 * @version 1.0.0
 * @author EV Charging Team
 */

import type React from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Button } from '@ui/forms';
import { useInfiniteScrollTrigger } from '../../hooks/useInfiniteScrollTrigger';
import { LoadMoreSkeleton, EndOfListIndicator } from './DataGridSkeleton';
import type { GridItem, ActionButton } from './GenericDataGrid';

// Table column configuration
export interface TableColumn<T extends GridItem> {
  readonly id: string;
  readonly label: string;
  readonly accessor?: keyof T | ((item: T) => React.ReactNode);
  readonly render?: (item: T, value: any) => React.ReactNode;
  readonly sortable?: boolean;
  readonly width?: string;
  readonly className?: string;
  readonly headerClassName?: string;
  readonly align?: 'left' | 'center' | 'right';
  readonly sticky?: boolean;
}

// Sorting configuration
export interface SortConfig {
  readonly column: string;
  readonly direction: 'asc' | 'desc';
}

export interface GenericDataTableProps<T extends GridItem> {
  readonly items: T[];
  readonly columns: TableColumn<T>[];
  readonly actions?: ActionButton[];
  readonly className?: string;
  readonly tableClassName?: string;
  readonly rowClassName?: string | ((item: T, index: number) => string);
  // Infinite scroll props
  readonly onLoadMore?: () => void;
  readonly isLoadingMore?: boolean;
  readonly hasNextPage?: boolean;
  readonly total?: number;
  // Sorting props
  readonly sortConfig?: SortConfig;
  readonly onSort?: (column: string) => void;
  // Selection props
  readonly selectedItems?: Set<string>;
  readonly onSelectItem?: (itemId: string) => void;
  readonly onSelectAll?: (selected: boolean) => void;
  readonly selectable?: boolean;
  // Loading state
  readonly isLoading?: boolean;
  readonly emptyState?: React.ReactNode;
  // Row interaction
  readonly onRowClick?: (item: T) => void;
  readonly hoverable?: boolean;
}

/**
 * 🎨 Table Header Component
 */
interface TableHeaderProps<T extends GridItem> {
  readonly columns: TableColumn<T>[];
  readonly sortConfig?: SortConfig;
  readonly onSort?: (column: string) => void;
  readonly selectable?: boolean;
  readonly selectedItems?: Set<string>;
  readonly onSelectAll?: (selected: boolean) => void;
  readonly totalItems: number;
  readonly hasActions: boolean;
}

const TableHeader = <T extends GridItem>({
  columns,
  sortConfig,
  onSort,
  selectable,
  selectedItems,
  onSelectAll,
  totalItems,
  hasActions,
}: TableHeaderProps<T>): React.ReactElement => {
  const isAllSelected = selectedItems && selectedItems.size === totalItems && totalItems > 0;
  const isIndeterminate = selectedItems && selectedItems.size > 0 && selectedItems.size < totalItems;

  return (
    <thead className="bg-gray-800/60 backdrop-blur-sm">
      <tr className="border-b border-blue-400/10">
        {/* Selection Column - Modern indicator */}
        {selectable && (
          <th className="px-4 py-3 text-left w-12">
            <div className="flex items-center justify-center">
              <button
                onClick={() => onSelectAll?.(!isAllSelected)}
                className={`
                  w-6 h-6 rounded-lg transition-all duration-300 ease-out
                  flex items-center justify-center relative overflow-hidden
                  ${isAllSelected || isIndeterminate
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/50 shadow-lg shadow-blue-500/25'
                    : 'bg-gray-800/50 border border-gray-600/30 hover:border-blue-500/30 hover:bg-gray-700/50'
                  }
                  hover:scale-110 active:scale-95
                  group
                `}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                
                {/* Selection indicator */}
                <div className={`
                  w-2 h-2 rounded-sm transition-all duration-200
                  ${isAllSelected 
                    ? 'bg-blue-400 scale-100' 
                    : isIndeterminate 
                      ? 'bg-blue-400/70 scale-75' 
                      : 'bg-transparent scale-0'
                  }
                `} />
              </button>
            </div>
          </th>
        )}

        {/* Data Columns */}
        {columns.map((column) => (
          <th
            key={column.id}
            className={`
              px-4 py-3 text-left text-xs font-semibold text-blue-300 uppercase tracking-wider
              ${column.sticky ? 'sticky left-0 bg-gray-800/90 z-10' : ''}
              ${column.sortable ? 'cursor-pointer hover:text-blue-200 transition-colors' : ''}
              ${column.headerClassName || ''}
            `}
            style={{ width: column.width }}
            onClick={() => column.sortable && onSort?.(column.id)}
          >
            <div className="flex items-center gap-2">
              <span>{column.label}</span>
              {column.sortable && (
                <div className="flex flex-col">
                  <ChevronUpIcon 
                    className={`w-3 h-3 ${
                      sortConfig?.column === column.id && sortConfig.direction === 'asc'
                        ? 'text-blue-400'
                        : 'text-gray-500'
                    }`}
                  />
                  <ChevronDownIcon 
                    className={`w-3 h-3 -mt-1 ${
                      sortConfig?.column === column.id && sortConfig.direction === 'desc'
                        ? 'text-blue-400'
                        : 'text-gray-500'
                    }`}
                  />
                </div>
              )}
            </div>
          </th>
        ))}

        {/* Actions Column */}
        {hasActions && (
          <th className="px-4 py-3 text-right text-xs font-semibold text-blue-300 uppercase tracking-wider">
            Actions
          </th>
        )}
      </tr>
    </thead>
  );
};

/**
 * 🎨 Table Row Component
 */
interface TableRowProps<T extends GridItem> {
  readonly item: T;
  readonly index: number;
  readonly columns: TableColumn<T>[];
  readonly actions?: ActionButton[];
  readonly selectable?: boolean;
  readonly isSelected?: boolean;
  readonly onSelectItem?: (itemId: string) => void;
  readonly onRowClick?: (item: T) => void;
  readonly hoverable?: boolean;
  readonly className?: string;
}

const TableRow = <T extends GridItem>({
  item,
  index,
  columns,
  actions = [],
  selectable,
  isSelected,
  onSelectItem,
  onRowClick,
  hoverable = true,
  className = '',
}: TableRowProps<T>): React.ReactElement => {
  const baseRowClass = `
    border-b border-blue-400/5 transition-all duration-300 ease-out group/row
    ${hoverable ? 'hover:bg-gradient-to-r hover:from-blue-500/5 hover:via-blue-400/3 hover:to-transparent' : ''}
    ${onRowClick ? 'cursor-pointer' : ''}
    ${isSelected ? 'bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-blue-500/10 border-blue-400/20' : ''}
    ${selectable ? 'cursor-pointer' : ''}
    hover:shadow-lg hover:shadow-blue-500/5
    ${className}
  `;

  const getCellValue = (column: TableColumn<T>) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(item);
    }
    if (typeof column.accessor === 'string') {
      return item[column.accessor];
    }
    return '';
  };

  const renderCell = (column: TableColumn<T>) => {
    const value = getCellValue(column);
    
    if (column.render) {
      return column.render(item, value);
    }
    
    return value;
  };

  return (
    <tr 
      className={baseRowClass}
      onClick={(e) => {
        // If selectable, toggle selection when clicking anywhere on the row
        if (selectable && !e.defaultPrevented) {
          onSelectItem?.(item.id);
        }
        // Also call the onRowClick if provided
        onRowClick?.(item);
      }}
      style={{ animationDelay: `${index * 50}ms` }}
    >
                   {/* Selection Column - Modern indicator */}
      {selectable && (
        <td className="px-4 py-4">
          <div className="flex items-center justify-center">
            <div className={`
              w-5 h-5 rounded-lg transition-all duration-300 ease-out
              flex items-center justify-center relative overflow-hidden
              ${isSelected
                ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-400/60 shadow-lg shadow-blue-500/30 scale-110'
                : 'bg-gray-800/30 border border-gray-600/20 group-hover/row:border-blue-500/40 group-hover/row:bg-gray-700/40'
              }
              group-hover/row:scale-105
            `}>
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/row:translate-x-[100%] transition-transform duration-500"></div>
              
              {/* Selection indicator */}
              <div className={`
                w-2.5 h-2.5 rounded-sm transition-all duration-200 relative z-10
                ${isSelected 
                  ? 'bg-blue-400 scale-100 shadow-sm shadow-blue-400/50' 
                  : 'bg-transparent scale-0 group-hover/row:bg-blue-400/20 group-hover/row:scale-50'
                }
              `} />
            </div>
          </div>
        </td>
      )}

      {/* Data Columns */}
      {columns.map((column) => (
        <td
          key={column.id}
          className={`
            px-4 py-4 text-sm text-gray-300
            ${column.sticky ? 'sticky left-0 bg-gray-800/90' : ''}
            ${column.align === 'center' ? 'text-center' : ''}
            ${column.align === 'right' ? 'text-right' : ''}
            ${column.className || ''}
          `}
        >
          {renderCell(column)}
        </td>
      ))}

                     {/* Actions Column */}
        {actions.length > 0 && (
          <td className="px-4 py-4 text-right" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-end gap-2 opacity-0 group-hover/row:opacity-100 transition-all duration-300 transform translate-x-2 group-hover/row:translate-x-0">
            {actions.filter(action => !action.show || action.show(item)).map((action, actionIndex) => {
              const ActionIcon = action.icon;
              const isMainAction = actionIndex === 0;

                             return (
                 <Button
                   key={action.label}
                   size="sm"
                   variant="ghost"
                   onClick={() => action.onClick(item)}
                   className={
                     isMainAction
                       ? `
                         relative overflow-hidden group/view
                         bg-gradient-to-r from-gray-700/40 via-gray-600/30 to-gray-700/40
                         hover:from-gray-600/50 hover:via-gray-500/40 hover:to-gray-600/50
                         text-gray-300 hover:text-white
                         border border-gray-600/30 hover:border-gray-500/50
                         shadow-md hover:shadow-lg
                         transition-all duration-300 ease-out
                         hover:scale-[1.02] active:scale-[0.98]
                         flex items-center justify-center gap-2
                         before:absolute before:inset-0 before:bg-gradient-to-r 
                         before:from-transparent before:via-white/10 before:to-transparent
                         before:translate-x-[-100%] hover:before:translate-x-[100%]
                         before:transition-transform before:duration-500
                       `
                       : `
                         relative overflow-hidden p-2 group/${action.label.toLowerCase()}
                         ${getTableActionButtonClasses(action.variant || 'secondary')}
                         transition-all duration-300 ease-out delay-[${actionIndex * 25}ms]
                         hover:scale-110 active:scale-95
                         flex items-center
                       `
                   }
                 >
                   <ActionIcon className={`w-4 h-4 ${getTableActionIconAnimation(action.label, isMainAction)}`} />
                   {isMainAction && <span className="ml-2 font-medium">{action.label}</span>}
                 </Button>
               );
            })}
          </div>
        </td>
      )}
    </tr>
  );
};

/**
 * 💀 Table Skeleton Component
 */
interface TableSkeletonProps {
  readonly columns: number;
  readonly rows?: number;
  readonly hasActions?: boolean;
  readonly selectable?: boolean;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({
  columns,
  rows = 5,
  hasActions = false,
  selectable = false,
}) => {
  const totalColumns = columns + (selectable ? 1 : 0) + (hasActions ? 1 : 0);

  return (
    <tbody>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex} className="border-b border-gray-700/30">
          {Array.from({ length: totalColumns }).map((_, colIndex) => (
            <td key={colIndex} className="px-4 py-4">
              <div 
                className="h-4 bg-gray-700 rounded animate-pulse"
                style={{ 
                  width: `${Math.random() * 40 + 60}%`,
                  animationDelay: `${(rowIndex * totalColumns + colIndex) * 100}ms`
                }}
              />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

/**
 * 🚀 Generic Data Table Component
 */
export const GenericDataTable = <T extends GridItem>({
  items,
  columns,
  actions = [],
  className = '',
  tableClassName = '',
  rowClassName = '',
  onLoadMore,
  isLoadingMore = false,
  hasNextPage = false,
  total = 0,
  sortConfig,
  onSort,
  selectedItems,
  onSelectItem,
  onSelectAll,
  selectable = false,
  isLoading = false,
  emptyState,
  onRowClick,
  hoverable = true,
}: GenericDataTableProps<T>): React.ReactElement => {
  // Infinite scroll trigger
  const loadMoreRef = useInfiniteScrollTrigger(
    () => {
      if (onLoadMore && hasNextPage && !isLoadingMore) {
        onLoadMore();
      }
    },
    {
      enabled: hasNextPage && !isLoadingMore,
      rootMargin: '100px',
      throttleMs: 500,
    }
  );

  const getRowClassName = (item: T, index: number): string => {
    if (typeof rowClassName === 'function') {
      return rowClassName(item, index);
    }
    return rowClassName;
  };

  // Empty state
  if (!isLoading && items.length === 0) {
    return (
      <div className={`bg-gray-800/40 border border-gray-700/50 rounded-2xl overflow-hidden backdrop-blur-xl ${className}`}>
        {emptyState || (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-gray-400 text-lg font-medium mb-2">No data available</div>
            <div className="text-gray-500 text-sm">No items to display</div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Revolutionary Table Container - Inspired by StationsPage */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/5 via-blue-400/3 to-transparent border border-blue-400/20 backdrop-blur-xl shadow-2xl">
        {/* Floating Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 overflow-x-auto">
          <table className={`w-full ${tableClassName}`}>
            {/* Header */}
            <TableHeader
              columns={columns}
              sortConfig={sortConfig}
              onSort={onSort}
              selectable={selectable}
              selectedItems={selectedItems}
              onSelectAll={onSelectAll}
              totalItems={items.length}
              hasActions={actions.length > 0}
            />

            {/* Body */}
            {isLoading ? (
              <TableSkeleton
                columns={columns.length}
                hasActions={actions.length > 0}
                selectable={selectable}
              />
            ) : (
              <tbody>
                {items.map((item, index) => (
                  <TableRow
                    key={item.id}
                    item={item}
                    index={index}
                    columns={columns}
                    actions={actions}
                    selectable={selectable}
                    isSelected={selectedItems?.has(item.id)}
                    onSelectItem={onSelectItem}
                    onRowClick={onRowClick}
                    hoverable={hoverable}
                    className={getRowClassName(item, index)}
                  />
                ))}
              </tbody>
            )}
          </table>
        </div>

        {/* Loading More */}
        {isLoadingMore && (
          <div className="relative z-10 border-t border-blue-400/10 p-6">
            <LoadMoreSkeleton />
          </div>
        )}
      </div>

      {/* Load More Trigger */}
      {hasNextPage && !isLoadingMore && (
        <div 
          ref={loadMoreRef as React.RefObject<HTMLDivElement>}
          className="h-10 flex items-center justify-center"
        >
          {/* Invisible trigger element */}
        </div>
      )}

      {/* End of List Indicator */}
      {!hasNextPage && items.length > 0 && total > 0 && (
        <div className="mt-6">
          <EndOfListIndicator total={total} itemName="rows" variant="minimal" />
        </div>
      )}
    </div>
  );
};

// Revolutionary action button styling for tables - matches original design
const getTableActionButtonClasses = (variant: string): string => {
  switch (variant) {
    case 'primary':
      return `
        bg-gradient-to-r from-blue-500/15 via-blue-400/10 to-blue-500/15
        hover:from-blue-500/25 hover:via-blue-400/20 hover:to-blue-500/25
        text-blue-400 hover:text-blue-300
        border border-blue-500/30 hover:border-blue-400/50
        shadow-sm shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20
      `;
    case 'danger':
      return `
        bg-gradient-to-r from-red-500/15 via-red-400/10 to-red-500/15
        hover:from-red-500/25 hover:via-red-400/20 hover:to-red-500/25
        text-red-400 hover:text-red-300
        border border-red-500/30 hover:border-red-400/50
        shadow-sm shadow-red-500/10 hover:shadow-lg hover:shadow-red-500/20
      `;
    case 'secondary':
    default:
      return `
        bg-gradient-to-r from-gray-500/15 via-gray-400/10 to-gray-500/15
        hover:from-gray-500/25 hover:via-gray-400/20 hover:to-gray-500/25
        text-gray-400 hover:text-gray-300
        border border-gray-500/30 hover:border-gray-400/50
        shadow-sm shadow-gray-500/10 hover:shadow-lg hover:shadow-gray-500/20
      `;
  }
};

// Revolutionary action icon animations for tables - matches original design
const getTableActionIconAnimation = (actionLabel: string, isMainAction: boolean): string => {
  if (isMainAction) {
    return 'group-hover/view:scale-110 transition-transform duration-300';
  }
  
  switch (actionLabel.toLowerCase()) {
    case 'edit':
      return 'group-hover/edit:rotate-12 transition-transform duration-300';
    case 'delete':
      return 'group-hover/delete:scale-110 transition-transform duration-300';
    default:
      return 'group-hover:scale-110 transition-transform duration-300';
  }
};

export default GenericDataTable; 