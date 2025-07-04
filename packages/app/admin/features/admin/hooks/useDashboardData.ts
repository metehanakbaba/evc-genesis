import { useMemo } from 'react';
import type React from 'react';
import {
  BoltIcon,
  UserGroupIcon,
  WalletIcon,
  CurrencyDollarIcon,
  Squares2X2Icon,
  DocumentTextIcon,
  RectangleStackIcon,
} from '@heroicons/react/24/outline';
import { RevolutionaryStationIcon } from '../components/RevolutionaryStationIcon';

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface NetworkStat {
  readonly title: string;
  readonly value: string;
  readonly icon: IconComponent;
  readonly variant: 'blue' | 'emerald' | 'purple' | 'teal';
  readonly trend: string;
  readonly description: string;
  readonly gradient: string;
  readonly glowColor: string;
}

export interface CoreManagementItem {
  readonly title: string;
  readonly path: string;
  readonly icon: IconComponent;
  readonly description: string;
  readonly variant: 'blue' | 'purple' | 'teal';
  readonly stats: string;
  readonly designType: string;
  readonly badge: string;
  readonly gradient: string;
  readonly accentColor: string;
}

export interface ActiveOperation {
  readonly title: string;
  readonly path: string;
  readonly icon: IconComponent;
  readonly description: string;
  readonly variant: 'emerald';
  readonly stats: string;
  readonly urgency: string;
  readonly badge: string;
  readonly gradient: string;
}

export interface DeveloperTool {
  readonly title: string;
  readonly path: string;
  readonly icon: IconComponent;
  readonly description: string;
  readonly variant: 'cyan' | 'purple' | 'teal';
  readonly badge?: string;
}

interface DashboardData {
  readonly networkStats: readonly NetworkStat[];
  readonly coreManagement: readonly CoreManagementItem[];
  readonly activeOperations: readonly ActiveOperation[];
  readonly developerTools: readonly DeveloperTool[];
  readonly isDeveloperMode: boolean;
}

/**
 * Custom hook for dashboard data with memoization for performance
 */
export const useDashboardData = (): DashboardData => {
  const isDeveloperMode = useMemo(
    () => process.env.NODE_ENV !== 'production' || localStorage.getItem('devMode') === 'true',
    [],
  );

  const networkStats = useMemo<readonly NetworkStat[]>(
    () => [
      {
        title: 'Active Stations',
        value: '156',
        icon: RevolutionaryStationIcon as IconComponent,
        variant: 'blue' as const,
        trend: '+8 new this week',
        description: 'Next-gen CCS, CHAdeMO & Type2 infrastructure',
        gradient: 'from-blue-500/15 via-cyan-400/10 to-teal-500/5',
        glowColor: 'blue',
      },
      {
        title: 'Live Sessions',
        value: '23',
        icon: BoltIcon,
        variant: 'emerald' as const,
        trend: '+12% vs last hour',
        description: 'Active charging sessions in progress',
        gradient: 'from-emerald-500/15 via-green-400/10 to-lime-500/5',
        glowColor: 'emerald',
      },
      {
        title: 'Total Users',
        value: '2,847',
        icon: UserGroupIcon,
        variant: 'purple' as const,
        trend: '+156 this month',
        description: 'Registered EV driver accounts',
        gradient: 'from-purple-500/15 via-violet-400/10 to-pink-500/5',
        glowColor: 'purple',
      },
      {
        title: 'Daily Revenue',
        value: '₺24,680',
        icon: CurrencyDollarIcon,
        variant: 'teal' as const,
        trend: '+18% vs yesterday',
        description: 'Payment transactions via Stripe',
        gradient: 'from-teal-500/15 via-cyan-400/10 to-blue-500/5',
        glowColor: 'teal',
      },
    ],
    [],
  );

  const coreManagement = useMemo<readonly CoreManagementItem[]>(
    () => [
      {
        title: 'Charging Stations',
        path: '/stations',
        icon: RevolutionaryStationIcon as IconComponent,
        description:
          'Manage charging infrastructure and monitor station status',
        variant: 'blue' as const,
        stats: '156 stations',
        designType: 'infrastructure',
        badge: 'Infrastructure',
        gradient: 'from-blue-500/20 via-cyan-400/15 to-teal-500/10',
        accentColor: 'blue',
      },
      {
        title: 'User Management',
        path: '/users',
        icon: UserGroupIcon as IconComponent,
        description: 'Manage user accounts, roles and permissions',
        variant: 'purple' as const,
        stats: '2,847 users',
        designType: 'users',
        badge: 'Users',
        gradient: 'from-purple-500/20 via-violet-400/15 to-pink-500/10',
        accentColor: 'purple',
      },
      {
        title: 'Payment System',
        path: '/wallets',
        icon: WalletIcon as IconComponent,
        description: 'Process payments, manage balances and transactions',
        variant: 'teal' as const,
        stats: '₺1.2M volume',
        designType: 'financial',
        badge: 'Payments',
        gradient: 'from-teal-500/20 via-cyan-400/15 to-blue-500/10',
        accentColor: 'teal',
      },
    ],
    [],
  );

  const activeOperations = useMemo<readonly ActiveOperation[]>(
    () => [
      {
        title: 'Live Charging Sessions',
        path: '/sessions',
        icon: BoltIcon as IconComponent,
        description: 'Monitor ongoing charging sessions in real-time',
        variant: 'emerald' as const,
        stats: '23 active',
        urgency: 'live',
        badge: 'Live',
        gradient: 'from-emerald-500/20 via-green-400/15 to-lime-500/10',
      },
    ],
    [],
  );

  const developerTools = useMemo<readonly DeveloperTool[]>(
    () =>
      isDeveloperMode
        ? [
            {
              title: 'Component Showcase',
              path: '/showcase',
              icon: Squares2X2Icon as IconComponent,
              description: 'UI component library',
              variant: 'cyan' as const,
            },
            {
              title: 'Design System',
              path: '/design-system',
              icon: DocumentTextIcon as IconComponent,
              description: 'Design documentation',
              variant: 'purple' as const,
            },
            {
              title: 'Layout Examples',
              path: '/layout-examples',
              icon: RectangleStackIcon as IconComponent,
              description: 'Grid system examples',
              badge: 'New',
              variant: 'teal' as const,
            },
          ]
        : [],
    [isDeveloperMode],
  );

  return useMemo(
    () => ({
      networkStats,
      coreManagement,
      activeOperations,
      developerTools,
      isDeveloperMode,
    }),
    [
      networkStats,
      coreManagement,
      activeOperations,
      developerTools,
      isDeveloperMode,
    ],
  );
};
