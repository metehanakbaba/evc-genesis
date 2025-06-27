export interface AIInsight {
  readonly id: string;
  readonly type: 'trend' | 'prediction' | 'recommendation' | 'optimization';
  readonly title: string;
  readonly value: string;
  readonly change: number;
  readonly impact: 'positive' | 'negative' | 'neutral';
  readonly confidence: number;
  readonly description: string;
}

export interface AIInsightsHeaderProps {
  readonly title: string;
  readonly description: string;
  readonly isRefreshing: boolean;
  readonly onRefresh: () => void;
}

export interface AIInsightCardProps {
  readonly insight: AIInsight;
  readonly index: number;
}

export interface AIInsightsFooterProps {
  readonly lastUpdate: Date;
}
