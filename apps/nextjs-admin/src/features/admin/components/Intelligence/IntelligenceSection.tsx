import React, { useState, useMemo, useCallback } from 'react';
import { IntelligenceHeader } from './IntelligenceHeader';
import { IntelligenceFilter } from './IntelligenceFilter';
import { IntelligenceEventCard } from './IntelligenceEventCard';
import { IntelligenceLiveIndicator } from './IntelligenceLiveIndicator';
import { MOCK_EVENTS, EVENT_TYPES } from './constants';

/**
 * Main Intelligence Section - Orchestrates child components
 * Max 50 lines - Single responsibility orchestrator
 */
export const IntelligenceSection: React.FC = React.memo(() => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const filteredEvents = useMemo(() => {
    return selectedFilter === 'all'
      ? MOCK_EVENTS
      : MOCK_EVENTS.filter((event) => event.type === selectedFilter);
  }, [selectedFilter]);

  const handleFilterChange = useCallback((filterId: string) => {
    setSelectedFilter(filterId);
    setIsFilterOpen(false);
  }, []);

  const handleToggleFilter = useCallback(() => {
    setIsFilterOpen((prev) => !prev);
  }, []);

  return (
    <section className="relative">
      <IntelligenceHeader
        title="LLM Intelligence Center"
        description="Real-time AI insights and system monitoring"
      />

      <IntelligenceFilter
        selectedFilter={selectedFilter}
        isFilterOpen={isFilterOpen}
        eventTypes={EVENT_TYPES}
        filteredEventsCount={filteredEvents.length}
        onFilterChange={handleFilterChange}
        onToggleFilter={handleToggleFilter}
      />

      <div className="space-y-4">
        {filteredEvents.map((event, index) => (
          <IntelligenceEventCard key={event.id} event={event} index={index} />
        ))}
      </div>

      <IntelligenceLiveIndicator lastUpdate={new Date()} />

      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" />
      </div>
    </section>
  );
});

IntelligenceSection.displayName = 'IntelligenceSection';
