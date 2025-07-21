/**
 * 🔄 Sessions Components & Hooks Index
 *
 * Centralized exports for all session-related components and functionality.
 * Provides clean imports for session management features.
 *
 * @module SessionsIndex
 * @version 1.0.0
 * @author EV Charging Team
 */

// ✅ Session API Functions
export { generateMockSessions } from '../api/sessionsApi';
export { useDebounce, useSearchDebounce } from '../hooks/useDebounce';
// ✅ Session Hooks
export { useInfiniteSessions } from '../hooks/useInfiniteSessions';
export { useSessionActions } from '../hooks/useSessionActions';
export { useSessionStatistics } from '../hooks/useSessionStatistics';
// ✅ Session Types
export type {
  ChargingSession,
  LiveChargingSession,
  SessionStatistics,
  SessionsQueryParams,
} from '../types/session.types';
export type { SessionFilterModalProps } from './SessionFilterModal';
// ✅ Session Filter Modal
export { SessionFilterModal } from './SessionFilterModal';
export type { SessionGridProps } from './SessionGrid';
export { SessionGrid } from './SessionGrid';
// ✅ Session Skeleton Components
export {
  EndOfListIndicator,
  LoadMoreSkeleton,
  SessionGridSkeleton,
  SessionTableSkeleton,
} from './SessionSkeleton';
export type { SessionTableProps } from './SessionTable';
// ✅ Session Display Components
export { SessionTable } from './SessionTable';
