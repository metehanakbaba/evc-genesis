import React from 'react';
import { FunnelIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Button } from '@ui/forms';
import type { IntelligenceFilterProps } from './types';

/**
 * Intelligence filter dropdown with event type selection
 * Max 50 lines - Single responsibility component
 */
export const IntelligenceFilter: React.FC<IntelligenceFilterProps> = React.memo(
  ({
    selectedFilter,
    isFilterOpen,
    eventTypes,
    filteredEventsCount,
    onFilterChange,
    onToggleFilter,
  }) => {
    const selectedFilterData =
      eventTypes.find((type) => type.id === selectedFilter) ?? eventTypes[0]!;

    return (
      <div className="mb-8">
        <div className="relative">
          <Button
            onClick={onToggleFilter}
            variant="secondary"
            className="flex items-center gap-3 bg-gray-800/60 hover:bg-gray-700/60 border-gray-600 backdrop-blur-xl transition-all duration-300"
          >
            <FunnelIcon className="w-4 h-4" />
            <selectedFilterData.icon className="w-4 h-4" />
            <span>{selectedFilterData.label}</span>
            <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded-full">
              {filteredEventsCount}
            </span>
            <ChevronDownIcon
              className={`w-4 h-4 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`}
            />
          </Button>

          {isFilterOpen && (
            <div className="absolute top-full left-0 mt-2 w-72 bg-gray-800/95 backdrop-blur-xl border border-gray-600 rounded-xl shadow-2xl z-50">
              <div className="p-2 space-y-1">
                {eventTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => onFilterChange(type.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                      selectedFilter === type.id
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-400/30'
                        : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                    }`}
                  >
                    <type.icon className="w-4 h-4" />
                    <span className="flex-1 text-left">{type.label}</span>
                    <span className="px-2 py-0.5 bg-gray-700/50 text-gray-400 text-xs rounded-full">
                      {type.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
);

IntelligenceFilter.displayName = 'IntelligenceFilter';
