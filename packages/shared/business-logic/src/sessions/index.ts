/**
 * ⚡ Sessions Domain Business Logic
 * 
 * Centralized business logic for charging session management, cost calculations,
 * duration formatting, and session validation.
 * 
 * Extracted from: apps/admin-web/src/features/sessions/pages/SessionsPage.tsx
 */

// ===============================
// TYPES & INTERFACES
// ===============================

export type SessionStatus = 'starting' | 'charging' | 'completed' | 'failed' | 'cancelled';
export type SessionConnectorType = 'CCS' | 'CHAdeMO' | 'Type2' | 'CCS_CHAdeMO';

export interface SessionStatusConfig {
  readonly color: string;
  readonly icon: string;
  readonly text: string;
  readonly bgColor: string;
  readonly borderColor: string;
  readonly textColor: string;
  readonly badgeColor: string;
  readonly pulseColor: string;
}

export interface LiveChargingSession {
  readonly id: string;
  readonly connector_id: string;
  readonly user_id: string;
  readonly station_id: string;
  readonly station_name: string;
  readonly user_email: string;
  readonly status: SessionStatus;
  readonly connector_type: SessionConnectorType;
  readonly power_output: number; // kW
  readonly started_at: string;
  readonly ended_at?: string;
  readonly energy_delivered: number; // kWh
  readonly current_cost: number; // TL
  readonly total_cost?: number; // TL
  readonly estimated_completion?: string;
  readonly created_at: string;
  readonly updated_at: string;
}

export interface SessionFilterOptions {
  readonly searchQuery: string;
  readonly statusFilter: string;
}

export interface ChargingCostBreakdown {
  readonly energyCost: number;
  readonly sessionFee: number;
  readonly taxes: number;
  readonly total: number;
}

export interface SessionStatistics {
  readonly totalSessions: number;
  readonly activeSessions: number;
  readonly completedSessions: number;
  readonly failedSessions: number;
  readonly totalEnergyDelivered: number;
  readonly totalRevenue: number;
  readonly averageSessionDuration: number;
  readonly averageEnergyPerSession: number;
}

// ===============================
// SESSION STATUS BUSINESS LOGIC
// ===============================

/**
 * 🎨 Get Session Status Configuration
 * Returns styling and display configuration for session status
 * 
 * @param status - Session status
 * @returns Status configuration object
 */
export const getSessionStatusConfig = (status: SessionStatus): SessionStatusConfig => {
  const configs: Record<SessionStatus, SessionStatusConfig> = {
    starting: {
      color: 'amber',
      icon: 'PlayIcon',
      text: 'Starting',
      bgColor: 'bg-gradient-to-br from-amber-500/15 via-amber-400/8 to-transparent',
      borderColor: 'border-amber-400/25 hover:border-amber-300/40',
      textColor: 'text-amber-400',
      badgeColor: 'bg-amber-500/10 border border-amber-500/20',
      pulseColor: 'bg-amber-500',
    },
    charging: {
      color: 'emerald',
      icon: 'BoltIcon',
      text: 'Charging',
      bgColor: 'bg-gradient-to-br from-emerald-500/15 via-emerald-400/8 to-transparent',
      borderColor: 'border-emerald-400/25 hover:border-emerald-300/40',
      textColor: 'text-emerald-400',
      badgeColor: 'bg-emerald-500/10 border border-emerald-500/20',
      pulseColor: 'bg-emerald-500',
    },
    completed: {
      color: 'blue',
      icon: 'CheckCircleIcon',
      text: 'Completed',
      bgColor: 'bg-gradient-to-br from-blue-500/15 via-blue-400/8 to-transparent',
      borderColor: 'border-blue-400/25 hover:border-blue-300/40',
      textColor: 'text-blue-400',
      badgeColor: 'bg-blue-500/10 border border-blue-500/20',
      pulseColor: 'bg-blue-500',
    },
    failed: {
      color: 'red',
      icon: 'XCircleIcon',
      text: 'Failed',
      bgColor: 'bg-gradient-to-br from-red-500/15 via-red-400/8 to-transparent',
      borderColor: 'border-red-400/25 hover:border-red-300/40',
      textColor: 'text-red-400',
      badgeColor: 'bg-red-500/10 border border-red-500/20',
      pulseColor: 'bg-red-500',
    },
    cancelled: {
      color: 'gray',
      icon: 'XCircleIcon',
      text: 'Cancelled',
      bgColor: 'bg-gradient-to-br from-gray-500/15 via-gray-400/8 to-transparent',
      borderColor: 'border-gray-400/25 hover:border-gray-300/40',
      textColor: 'text-gray-400',
      badgeColor: 'bg-gray-500/10 border border-gray-500/20',
      pulseColor: 'bg-gray-500',
    },
  };
  
  return configs[status];
};

/**
 * 🔍 Filter Sessions
 * Applies search and status filters to session list
 * 
 * @param sessions - Array of sessions to filter
 * @param options - Filter options (search, status)
 * @returns Filtered session array
 */
export const filterSessions = (
  sessions: LiveChargingSession[],
  options: SessionFilterOptions
): LiveChargingSession[] => {
  const { searchQuery, statusFilter } = options;
  
  return sessions.filter((session) => {
    // Search filter - station name, user email, connector type
    const matchesSearch = searchQuery === '' ||
      session.station_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.user_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.connector_type.toLowerCase().includes(searchQuery.toLowerCase());
      
    // Status filter
    const matchesStatus = statusFilter === 'all' || session.status === statusFilter;

    return matchesSearch && matchesStatus;
  });
};

/**
 * 🎯 Get Status Filter Options
 * Returns list of all available status options for filtering
 */
export const getSessionStatusFilterOptions = () => [
  { value: 'all', label: 'All Statuses' },
  { value: 'starting', label: 'Starting' },
  { value: 'charging', label: 'Charging' },
  { value: 'completed', label: 'Completed' },
  { value: 'failed', label: 'Failed' },
  { value: 'cancelled', label: 'Cancelled' },
];

// ===============================
// TIME & DURATION BUSINESS LOGIC
// ===============================

/**
 * 🕒 Format Session Duration
 * Converts start/end time to human-readable duration
 * 
 * @param startTime - Session start time (ISO string)
 * @param endTime - Session end time (ISO string, optional for ongoing sessions)
 * @returns Formatted duration string
 */
export const formatSessionDuration = (startTime: string, endTime?: string): string => {
  const start = new Date(startTime);
  const end = endTime ? new Date(endTime) : new Date();
  const diffMs = end.getTime() - start.getTime();
  
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours === 0) {
    return `${minutes}m`;
  }
  
  return `${hours}h ${minutes}m`;
};

/**
 * ⏱️ Calculate Estimated Completion Time
 * Estimates when a charging session will complete
 * 
 * @param startTime - Session start time
 * @param targetEnergy - Target energy to deliver (kWh)
 * @param currentEnergy - Current energy delivered (kWh)
 * @param powerOutput - Current power output (kW)
 * @returns Estimated completion time (ISO string)
 */
export const calculateEstimatedCompletion = (
  startTime: string,
  targetEnergy: number,
  currentEnergy: number,
  powerOutput: number
): string => {
  if (powerOutput === 0 || currentEnergy >= targetEnergy) {
    return new Date().toISOString();
  }
  
  const remainingEnergy = targetEnergy - currentEnergy;
  const remainingHours = remainingEnergy / powerOutput;
  const remainingMs = remainingHours * 60 * 60 * 1000;
  
  const completionTime = new Date(Date.now() + remainingMs);
  return completionTime.toISOString();
};

/**
 * ⏰ Format Time to Local
 * Converts ISO time to local time format
 * 
 * @param isoTime - ISO time string
 * @param options - Formatting options
 * @returns Formatted local time
 */
export const formatTimeToLocal = (
  isoTime: string,
  options: { includeDate?: boolean; format24h?: boolean } = {}
): string => {
  const { includeDate = false, format24h = true } = options;
  const date = new Date(isoTime);
  
  if (includeDate) {
    return date.toLocaleString();
  }
  
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: !format24h,
  });
};

// ===============================
// COST CALCULATION BUSINESS LOGIC
// ===============================

/**
 * 💰 Calculate Session Cost
 * Calculates total cost for a charging session
 * 
 * @param energyDelivered - Energy delivered in kWh
 * @param pricePerKwh - Price per kWh
 * @param sessionFee - Fixed session fee (optional)
 * @param taxRate - Tax rate as decimal (e.g., 0.18 for 18%)
 * @returns Cost breakdown object
 */
export const calculateSessionCost = (
  energyDelivered: number,
  pricePerKwh: number,
  sessionFee: number = 0,
  taxRate: number = 0.18
): ChargingCostBreakdown => {
  const energyCost = energyDelivered * pricePerKwh;
  const subtotal = energyCost + sessionFee;
  const taxes = subtotal * taxRate;
  const total = subtotal + taxes;
  
  return {
    energyCost: Math.round(energyCost * 100) / 100,
    sessionFee: Math.round(sessionFee * 100) / 100,
    taxes: Math.round(taxes * 100) / 100,
    total: Math.round(total * 100) / 100,
  };
};

/**
 * 💰 Calculate Real-time Cost
 * Calculates current cost for an ongoing session
 * 
 * @param session - Live charging session
 * @param pricePerKwh - Current price per kWh
 * @returns Current cost
 */
export const calculateRealtimeCost = (
  session: LiveChargingSession,
  pricePerKwh: number
): number => {
  const costBreakdown = calculateSessionCost(
    session.energy_delivered,
    pricePerKwh
  );
  return costBreakdown.total;
};

/**
 * 📊 Calculate Cost Per Minute
 * Calculates average cost per minute for a session
 * 
 * @param totalCost - Total session cost
 * @param startTime - Session start time
 * @param endTime - Session end time (optional)
 * @returns Cost per minute
 */
export const calculateCostPerMinute = (
  totalCost: number,
  startTime: string,
  endTime?: string
): number => {
  const start = new Date(startTime);
  const end = endTime ? new Date(endTime) : new Date();
  const durationMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
  
  if (durationMinutes === 0) return 0;
  
  return Math.round((totalCost / durationMinutes) * 100) / 100;
};

// ===============================
// SESSION VALIDATION BUSINESS LOGIC
// ===============================

/**
 * ✅ Validate Session Status Transition
 * Checks if a session status transition is valid
 * 
 * @param currentStatus - Current session status
 * @param newStatus - Desired new status
 * @returns Whether transition is valid
 */
export const isValidSessionStatusTransition = (
  currentStatus: SessionStatus,
  newStatus: SessionStatus
): boolean => {
  const validTransitions: Record<SessionStatus, SessionStatus[]> = {
    starting: ['charging', 'failed', 'cancelled'],
    charging: ['completed', 'failed', 'cancelled'],
    completed: [], // Terminal state
    failed: [], // Terminal state
    cancelled: [], // Terminal state
  };
  
  return validTransitions[currentStatus]?.includes(newStatus) || false;
};

/**
 * 🔍 Check Session Activity
 * Determines if a session is currently active
 * 
 * @param session - Session object
 * @returns Whether session is active
 */
export const isSessionActive = (session: LiveChargingSession): boolean => {
  return session.status === 'charging' || session.status === 'starting';
};

/**
 * ⚡ Validate Session Energy
 * Validates energy delivery values
 * 
 * @param energyDelivered - Energy delivered in kWh
 * @param maxCapacity - Maximum battery capacity (optional)
 * @returns Validation result
 */
export const validateSessionEnergy = (
  energyDelivered: number,
  maxCapacity?: number
): { isValid: boolean; error?: string } => {
  if (energyDelivered < 0) {
    return { isValid: false, error: 'Energy delivered cannot be negative' };
  }
  
  if (maxCapacity && energyDelivered > maxCapacity) {
    return { isValid: false, error: 'Energy delivered exceeds battery capacity' };
  }
  
  return { isValid: true };
};

/**
 * 📊 Validate Session Duration
 * Validates session duration
 * 
 * @param startTime - Session start time
 * @param endTime - Session end time (optional)
 * @param maxDurationHours - Maximum allowed duration in hours
 * @returns Validation result
 */
export const validateSessionDuration = (
  startTime: string,
  endTime?: string,
  maxDurationHours: number = 24
): { isValid: boolean; error?: string } => {
  const start = new Date(startTime);
  const end = endTime ? new Date(endTime) : new Date();
  
  if (end < start) {
    return { isValid: false, error: 'End time cannot be before start time' };
  }
  
  const durationHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  
  if (durationHours > maxDurationHours) {
    return { isValid: false, error: `Session duration exceeds maximum of ${maxDurationHours} hours` };
  }
  
  return { isValid: true };
};

// ===============================
// SESSION STATISTICS BUSINESS LOGIC
// ===============================

/**
 * 📈 Calculate Session Statistics
 * Calculates various statistics from session data
 * 
 * @param sessions - Array of sessions
 * @returns Session statistics object
 */
export const calculateSessionStatistics = (sessions: LiveChargingSession[]): SessionStatistics => {
  const totalSessions = sessions.length;
  const activeSessions = sessions.filter(s => isSessionActive(s)).length;
  const completedSessions = sessions.filter(s => s.status === 'completed').length;
  const failedSessions = sessions.filter(s => s.status === 'failed').length;
  
  // Energy statistics
  const totalEnergyDelivered = sessions.reduce((sum, s) => sum + s.energy_delivered, 0);
  const averageEnergyPerSession = totalSessions > 0 ? totalEnergyDelivered / totalSessions : 0;
  
  // Revenue statistics
  const totalRevenue = sessions.reduce((sum, s) => sum + (s.total_cost || s.current_cost), 0);
  
  // Duration statistics
  const completedSessionsWithDuration = sessions.filter(s => s.status === 'completed' && s.ended_at);
  const totalDurationMinutes = completedSessionsWithDuration.reduce((sum, s) => {
    const start = new Date(s.started_at);
    const end = new Date(s.ended_at!);
    return sum + ((end.getTime() - start.getTime()) / (1000 * 60));
  }, 0);
  
  const averageSessionDuration = completedSessionsWithDuration.length > 0 
    ? totalDurationMinutes / completedSessionsWithDuration.length 
    : 0;
  
  return {
    totalSessions,
    activeSessions,
    completedSessions,
    failedSessions,
    totalEnergyDelivered: Math.round(totalEnergyDelivered * 100) / 100,
    totalRevenue: Math.round(totalRevenue * 100) / 100,
    averageSessionDuration: Math.round(averageSessionDuration),
    averageEnergyPerSession: Math.round(averageEnergyPerSession * 100) / 100,
  };
};

/**
 * 🔄 Get Default Session Filters
 * Returns default filter state
 */
export const getDefaultSessionFilters = (): SessionFilterOptions => ({
  searchQuery: '',
  statusFilter: 'all',
});

/**
 * ⚡ Calculate Power Utilization
 * Calculates power utilization across active sessions
 * 
 * @param sessions - Array of sessions
 * @returns Power utilization statistics
 */
export const calculatePowerUtilization = (sessions: LiveChargingSession[]) => {
  const activeSessions = sessions.filter(s => isSessionActive(s));
  const totalActivePower = activeSessions.reduce((sum, s) => sum + s.power_output, 0);
  const averagePowerPerSession = activeSessions.length > 0 
    ? totalActivePower / activeSessions.length 
    : 0;
  
  return {
    activeSessions: activeSessions.length,
    totalActivePower: Math.round(totalActivePower),
    averagePowerPerSession: Math.round(averagePowerPerSession),
    powerDistribution: activeSessions.map(s => ({
      sessionId: s.id,
      stationName: s.station_name,
      powerOutput: s.power_output,
      connectorType: s.connector_type,
    })),
  };
}; 