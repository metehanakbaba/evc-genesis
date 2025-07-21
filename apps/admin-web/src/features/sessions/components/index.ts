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

// ✅ Session Display Components
export { SessionTable } from './SessionTable';
export type { SessionTableProps } from './SessionTable';

export { SessionGrid } from './SessionGrid';
export type { SessionGridProps } from './SessionGrid';

// ✅ Session Filter Modal
export { SessionFilterModal } from './SessionFilterModal';
export type { SessionFilterModalProps } from './SessionFilterModal';

// ✅ Session Skeleton Components
export { 
  SessionGridSkeleton, 
  SessionTableSkeleton, 
  LoadMoreSkeleton, 
  EndOfListIndicator 
} from './SessionSkeleton';

// ✅ Session Hooks
export { useInfiniteSessions } from '../hooks/useInfiniteSessions';
export { useSessionActions } from '../hooks/useSessionActions';
export { useSessionStatistics } from '../hooks/useSessionStatistics';
export { useSearchDebounce, useDebounce } from '../hooks/useDebounce';

// ✅ Session Types
export type { 
  LiveChargingSession, 
  ChargingSession,
  SessionsQueryParams,
  SessionStatistics 
} from '../types/session.types';

// ✅ Session API Functions
export { generateMockSessions } from '../api/sessionsApi'; 