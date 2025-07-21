import {
  BanknotesIcon,
  BoltIcon,
  CreditCardIcon,
  DocumentTextIcon,
  RectangleStackIcon,
  Squares2X2Icon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import type React from 'react';
import { useMemo } from 'react';
import { useDeepMemo } from '@/shared/ui/hooks/useReactCompilerOptimized';
import { RevolutionaryStationIcon } from '@/features/admin/components/RevolutionaryStationIcon';

interface NetworkStat {
  readonly title: string;
  readonly value: string;
  readonly icon: React.ComponentType<{ className?: string }>;
  readonly variant: 'blue' | 'emerald' | 'purple' | 'teal';
  readonly trend: string;
  readonly description: string;
  readonly gradient: string;
  readonly glowColor: string;
}

export interface CoreManagementItem {
  readonly title: string;
  readonly path: string;
  readonly icon: React.ComponentType<{ className?: string }>;
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
  readonly icon: React.ComponentType<{ className?: string }>;
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
  readonly icon: React.ComponentType<{ className?: string }>;
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
 * Custom hook for dashboard data with enhanced performance optimization
 */
export const useDashboardData = (): DashboardData => {
  const isDeveloperMode = useMemo(
    () =>
      process.env.NODE_ENV === 'development' ||
      (typeof window !== 'undefined' &&
        localStorage.getItem('devMode') === 'true'),
    [],
  );

  // ✅ Use useDeepMemo for complex data structures to prevent unnecessary re-renders
  const networkStats = useDeepMemo<readonly NetworkStat[]>(
    () => [
      {
        title: 'Active Stations',
        value: '156',
        icon: RevolutionaryStationIcon,
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
        value: '24,680 zł',
        icon: BanknotesIcon,
        variant: 'teal' as const,
        trend: '+18% vs yesterday',
        description: 'Payment transactions via Stripe',
        gradient: 'from-teal-500/15 via-cyan-400/10 to-blue-500/5',
        glowColor: 'teal',
      },
    ],
    [],
    // Custom equality check for deep object comparison
    (prev, next) => {
      if (prev.length !== next.length) return false;
      return prev.every((item, index) => 
        item.title === next[index]?.title && 
        item.value === next[index]?.value &&
        item.variant === next[index]?.variant
      );
    }
  );

  const coreManagement = useDeepMemo<readonly CoreManagementItem[]>(
    () => [
      {
        title: 'Charging Stations',
        path: '/stations',
        icon: RevolutionaryStationIcon,
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
        icon: UserGroupIcon,
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
        icon: CreditCardIcon,
        description: 'Process payments, manage balances and transactions',
        variant: 'teal' as const,
        stats: '1.2M zł volume',
        designType: 'financial',
        badge: 'Payments',
        gradient: 'from-teal-500/20 via-cyan-400/15 to-blue-500/10',
        accentColor: 'teal',
      },
    ],
    [],
    (prev, next) => prev.length === next.length && prev.every((item, index) => item.path === next[index]?.path)
  );

  const activeOperations = useDeepMemo<readonly ActiveOperation[]>(
    () => [
      {
        title: 'Live Charging Sessions',
        path: '/sessions',
        icon: BoltIcon,
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

  const developerTools = useDeepMemo<readonly DeveloperTool[]>(
    () =>
      isDeveloperMode
        ? [
            {
              title: 'Component Showcase',
              path: '/showcase',
              icon: Squares2X2Icon,
              description: 'UI component library',
              variant: 'cyan' as const,
            },
            {
              title: 'Design System',
              path: '/design-system',
              icon: DocumentTextIcon,
              description: 'Design documentation',
              variant: 'purple' as const,
            },
            {
              title: 'Layout Examples',
              path: '/layout-examples',
              icon: RectangleStackIcon,
              description: 'Grid system examples',
              badge: 'New',
              variant: 'teal' as const,
            },
          ]
        : [],
    [isDeveloperMode],
  );

  return useDeepMemo(
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
