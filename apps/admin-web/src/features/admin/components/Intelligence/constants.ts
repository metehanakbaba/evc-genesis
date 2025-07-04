import {
  BeakerIcon,
  BugAntIcon,
  ComputerDesktopIcon,
  CpuChipIcon,
  CurrencyDollarIcon,
  ShieldExclamationIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import type { EventType, IntelligenceEvent } from './types';

export const MOCK_EVENTS: readonly IntelligenceEvent[] = [
  {
    id: '1',
    type: 'anomaly',
    title: 'Unusual charging pattern detected',
    description:
      'Station TR-IST-045 showing 300% higher usage than normal peak hours',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    severity: 'high',
    confidence: 87,
    action: 'Investigate capacity upgrade',
    data: { stationId: 'TR-IST-045', usageIncrease: '300%' },
  },
  {
    id: '2',
    type: 'payment',
    title: 'Large payment transaction',
    description: 'Corporate account paid ₺15,430 for fleet charging services',
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
    severity: 'medium',
    confidence: 95,
    data: { amount: '₺15,430', accountType: 'corporate' },
  },
  {
    id: '3',
    type: 'system',
    title: 'Model update deployed',
    description: 'Pricing optimization model v2.1.3 deployed to production',
    timestamp: new Date(Date.now() - 12 * 60 * 1000),
    severity: 'low',
    confidence: 100,
    action: 'Monitor performance metrics',
    data: { version: 'v2.1.3', model: 'pricing-optimizer' },
  },
] as const;

export const EVENT_TYPES: readonly EventType[] = [
  {
    id: 'all',
    label: 'All Events',
    icon: SparklesIcon,
    count: MOCK_EVENTS.length,
  },
  { id: 'anomaly', label: 'Anomalies', icon: ShieldExclamationIcon, count: 1 },
  { id: 'payment', label: 'Payments', icon: CurrencyDollarIcon, count: 1 },
  { id: 'system', label: 'System', icon: ComputerDesktopIcon, count: 1 },
  { id: 'security', label: 'Security', icon: BugAntIcon, count: 1 },
  { id: 'prediction', label: 'AI Predictions', icon: BeakerIcon, count: 1 },
  { id: 'performance', label: 'Performance', icon: CpuChipIcon, count: 1 },
] as const;
