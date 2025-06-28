export interface IntelligenceEvent {
  readonly id: string;
  readonly type:
    | 'anomaly'
    | 'payment'
    | 'system'
    | 'security'
    | 'performance'
    | 'prediction';
  readonly title: string;
  readonly description: string;
  readonly timestamp: Date;
  readonly severity: 'low' | 'medium' | 'high' | 'critical';
  readonly confidence: number;
  readonly action?: string;
  readonly data?: Record<string, unknown>;
}

export interface EventType {
  readonly id: string;
  readonly label: string;
  readonly icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  readonly count: number;
}

export interface IntelligenceFilterProps {
  readonly selectedFilter: string;
  readonly isFilterOpen: boolean;
  readonly eventTypes: readonly EventType[];
  readonly filteredEventsCount: number;
  readonly onFilterChange: (filterId: string) => void;
  readonly onToggleFilter: () => void;
}

export interface IntelligenceEventCardProps {
  readonly event: IntelligenceEvent;
  readonly index: number;
}

export interface IntelligenceHeaderProps {
  readonly title: string;
  readonly description: string;
}

export interface IntelligenceLiveIndicatorProps {
  readonly lastUpdate: Date;
}
