'use client';

import { EyeIcon } from '@heroicons/react/24/outline';
import { Button } from '@ui/forms';
import type React from 'react';
import { useInfiniteScrollTrigger } from '../../hooks/useInfiniteScrollTrigger';
import { LoadMoreSkeleton, EndOfListIndicator } from './DataGridSkeleton';

// Generic types for the data grid
export interface GridItem {
  readonly id: string;
  readonly [key: string]: any;
}

export interface ActionButton {
  readonly icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  readonly label: string;
  readonly onClick: (item: GridItem) => void;
  readonly variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  readonly className?: string;
  readonly show?: (item: GridItem) => boolean;
}

export interface StatusConfig {
  readonly bgColor: string;
  readonly borderColor: string;
  readonly badgeColor: string;
  readonly textColor: string;
  readonly pulseColor?: string;
  readonly shadowColor?: string;
}

export interface GridCardRenderer<T extends GridItem> {
  readonly renderHeader: (item: T, statusConfig: StatusConfig) => React.ReactNode;
  readonly renderContent: (item: T, statusConfig: StatusConfig) => React.ReactNode;
  readonly renderFooter?: (item: T, statusConfig: StatusConfig) => React.ReactNode;
  readonly getStatusConfig: (item: T) => StatusConfig;
  readonly getAnimationDelay?: (index: number) => string;
}

export interface GenericDataGridProps<T extends GridItem> {
  readonly items: T[];
  readonly renderer: GridCardRenderer<T>;
  readonly actions?: ActionButton[];
  readonly className?: string;
  readonly gridClassName?: string;
  readonly cardClassName?: string;
  // Infinite scroll props
  readonly onLoadMore?: () => void;
  readonly isLoadingMore?: boolean;
  readonly hasNextPage?: boolean;
  readonly total?: number;
  // Grid layout
  readonly columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
}

/**
 * 🚀 Generic Data Grid Component
 * 
 * Reusable grid component that abstracts the common patterns from:
 * - UserGrid, StationGrid, TransactionGrid, SessionGrid
 * 
 * Features:
 * - Configurable card rendering via renderer prop
 * - Infinite scroll support
 * - Customizable action buttons
 * - Responsive grid layout
 * - Consistent hover effects and animations
 * - Loading states and skeletons
 */
export const GenericDataGrid = <T extends GridItem>({
  items,
  renderer,
  actions = [],
  className = '',
  gridClassName = '',
  cardClassName = '',
  onLoadMore,
  isLoadingMore = false,
  hasNextPage = false,
  total = 0,
  columns = {
    sm: 1,
    md: 2,
    lg: 2,
    xl: 3,
    '2xl': 4,
  },
}: GenericDataGridProps<T>): React.ReactElement => {
  // Generate grid classes from columns config
  const gridCols = `
    grid-cols-${columns.sm || 1}
    md:grid-cols-${columns.md || 2}
    lg:grid-cols-${columns.lg || 2}
    xl:grid-cols-${columns.xl || 3}
    2xl:grid-cols-${columns['2xl'] || 4}
  `.replace(/\s+/g, ' ').trim();

  // Infinite scroll trigger with throttling
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

  // Revolutionary action button renderer with original sophisticated design
  const renderActionButtons = (item: T, statusConfig: StatusConfig) => {
    const visibleActions = actions.filter(action => 
      !action.show || action.show(item)
    );

    if (visibleActions.length === 0) return null;

    return (
      <div className="flex gap-2 mt-auto">
        {visibleActions.map((action, index) => {
          const ActionIcon = action.icon;
          const isMainAction = index === 0;
          const actionVariant = action.variant || (isMainAction ? 'ghost' : 'secondary');
          
          return (
            <Button
              key={action.label}
              size="sm"
              variant="ghost"
              onClick={() => action.onClick(item)}
              className={
                isMainAction
                  ? `
                    flex-1 relative overflow-hidden group/view
                    bg-gradient-to-r from-gray-700/40 via-gray-600/30 to-gray-700/40
                    hover:from-gray-600/50 hover:via-gray-500/40 hover:to-gray-600/50
                    text-gray-300 hover:text-white
                    border border-gray-600/30 hover:border-gray-500/50
                    shadow-md hover:shadow-lg
                    transition-all duration-150 ease-out
                    hover:border-gray-400/70 active:border-gray-500/80
                    flex items-center justify-center gap-2
                    before:absolute before:inset-0 before:bg-gradient-to-r 
                    before:from-transparent before:via-white/10 before:to-transparent
                    before:translate-x-[-100%] hover:before:translate-x-[100%]
                    before:transition-transform before:duration-500
                    ${action.className || ''}
                  `
                  : `
                    relative overflow-hidden p-2 group/${action.label.toLowerCase()}
                    ${getRevolutionaryActionButtonClasses(actionVariant)}
                    transition-all duration-150 ease-out
                    hover:border-gray-400/60 active:border-gray-500/70
                    flex items-center
                    ${action.className || ''}
                  `
              }
            >
              <div className="flex items-center gap-2 relative z-10">
                <ActionIcon className={`w-4 h-4 ${getActionIconAnimation(action.label, isMainAction)}`} />
                {isMainAction && (
                  <span className="font-medium">{action.label}</span>
                )}
              </div>
            </Button>
          );
        })}
      </div>
    );
  };

  return (
    <div className={className}>
      {/* Data Grid */}
      <div className={`grid ${gridCols} gap-4 lg:gap-5 xl:gap-6 ${gridClassName}`}>
        {items.map((item, index) => {
          const statusConfig = renderer.getStatusConfig(item);
          const animationDelay = renderer.getAnimationDelay?.(index) || `${index * 100}ms`;

          return (
            <div
              key={item.id}
              className="group relative"
              style={{ animationDelay }}
            >
              {/* Revolutionary Floating Card */}
              <div
                className={`
                  relative p-4 lg:p-5 ${statusConfig.bgColor} 
                  border ${statusConfig.borderColor} 
                  rounded-xl lg:rounded-2xl backdrop-blur-xl 
                  shadow-xl hover:shadow-2xl transition-all duration-150 
                  hover:border-blue-400/60 cursor-pointer 
                  ${statusConfig.shadowColor || ''} 
                  min-h-[280px] flex flex-col
                  ${cardClassName}
                `}
              >
                {/* Floating Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-100 rounded-xl lg:rounded-2xl will-change-opacity"></div>

                {/* Card Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Header */}
                  {renderer.renderHeader(item, statusConfig)}

                  {/* Content */}
                  <div className="flex-1">
                    {renderer.renderContent(item, statusConfig)}
                  </div>

                  {/* Footer (optional) */}
                  {renderer.renderFooter?.(item, statusConfig)}

                  {/* Action Buttons */}
                  {renderActionButtons(item, statusConfig)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Infinite Scroll Loading Indicators */}
      {isLoadingMore && (
        <div className="mt-6 lg:mt-8">
          <LoadMoreSkeleton />
        </div>
      )}

      {/* Load More Trigger (invisible) */}
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
        <div className="mt-6 lg:mt-8">
          <EndOfListIndicator total={total} />
        </div>
      )}
    </div>
  );
};

// Revolutionary action button styling - matches original design
const getRevolutionaryActionButtonClasses = (variant: string): string => {
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

// Revolutionary action icon animations - matches original design
const getActionIconAnimation = (actionLabel: string, isMainAction: boolean): string => {
  if (isMainAction) {
    return 'group-hover/view:text-white transition-colors duration-150';
  }
  
  switch (actionLabel.toLowerCase()) {
    case 'edit':
      return 'group-hover/edit:rotate-12 transition-transform duration-150';
    case 'delete':
      return 'group-hover/delete:text-red-300 transition-colors duration-150';
    default:
      return 'group-hover:text-gray-200 transition-colors duration-150';
  }
};

export default GenericDataGrid; 