import {
  ChartBarIcon,
  ChartPieIcon,
  CpuChipIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';
import type { AIInsight } from './types';

export const MOCK_INSIGHTS: readonly AIInsight[] = [
  {
    id: '1',
    type: 'prediction',
    title: 'Peak Demand Forecast',
    value: '18:30 - 20:00',
    change: +23,
    impact: 'positive',
    confidence: 89,
    description: 'AI predicts 23% higher demand during evening hours',
  },
  {
    id: '2',
    type: 'optimization',
    title: 'Dynamic Pricing',
    value: '₺2.45/kWh',
    change: +8.5,
    impact: 'positive',
    confidence: 92,
    description:
      'Optimal pricing for maximum revenue while maintaining accessibility',
  },
  {
    id: '3',
    type: 'trend',
    title: 'User Growth',
    value: '+156 users',
    change: +12.7,
    impact: 'positive',
    confidence: 95,
    description: 'Consistent growth trend over past 30 days',
  },
  {
    id: '4',
    type: 'recommendation',
    title: 'Capacity Expansion',
    value: 'Station TR-IST-045',
    change: 0,
    impact: 'neutral',
    confidence: 78,
    description:
      'Consider adding 2 more charging points to handle increased demand',
  },
] as const;

export const INSIGHT_ICONS = {
  trend: ChartBarIcon,
  prediction: CpuChipIcon,
  recommendation: LightBulbIcon,
  optimization: ChartPieIcon,
} as const;

export const INSIGHT_COLORS = {
  trend: 'from-blue-500/20 via-cyan-400/15 to-teal-500/10',
  prediction: 'from-purple-500/20 via-violet-400/15 to-pink-500/10',
  recommendation: 'from-yellow-500/20 via-amber-400/15 to-orange-500/10',
  optimization: 'from-green-500/20 via-emerald-400/15 to-lime-500/10',
} as const;

export const INSIGHT_BORDERS = {
  trend: 'border-blue-400/30',
  prediction: 'border-purple-400/30',
  recommendation: 'border-yellow-400/30',
  optimization: 'border-green-400/30',
} as const;
