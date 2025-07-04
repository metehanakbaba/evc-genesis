/**
 * 🔋 Stations Domain Business Logic
 * 
 * Centralized business logic for charging station management, status validation,
 * power calculations, and connector type operations.
 * 
 * Extracted from: apps/admin-web/src/features/stations/pages/StationsPage.tsx
 */

// ===============================
// TYPES & INTERFACES
// ===============================

export type StationStatus = 'AVAILABLE' | 'CHARGING' | 'MAINTENANCE' | 'OFFLINE';
export type ConnectorType = 'CCS' | 'CHAdeMO' | 'Type2' | 'CCS_CHAdeMO';

export interface StationStatusConfig {
  readonly color: string;
  readonly icon: string;
  readonly text: string;
  readonly bgColor: string;
  readonly borderColor: string;
  readonly textColor: string;
}

export interface ChargingStation {
  readonly id: string;
  readonly name: string;
  readonly location: string;
  readonly status: StationStatus;
  readonly powerOutput: number;
  readonly connectorType: ConnectorType;
  readonly pricePerKwh: number;
  readonly isActive: boolean;
  readonly lastHeartbeat: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface StationFilterOptions {
  readonly searchQuery: string;
  readonly statusFilter: string;
  readonly connectorFilter: string;
}

export interface ConnectorTypeInfo {
  readonly type: ConnectorType;
  readonly displayName: string;
  readonly maxPower: number;
  readonly description: string;
}

// ===============================
// STATION STATUS BUSINESS LOGIC
// ===============================

/**
 * 🎨 Get Station Status Configuration
 * Returns styling and display configuration for station status
 * 
 * @param status - Station status
 * @returns Status configuration object
 */
export const getStationStatusConfig = (status: StationStatus): StationStatusConfig => {
  const configs: Record<StationStatus, StationStatusConfig> = {
    AVAILABLE: {
      color: 'emerald',
      icon: 'CheckCircleIcon',
      text: 'Available',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      textColor: 'text-emerald-400',
    },
    CHARGING: {
      color: 'amber',
      icon: 'BoltIcon',
      text: 'Charging',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      textColor: 'text-amber-400',
    },
    MAINTENANCE: {
      color: 'orange',
      icon: 'WrenchScrewdriverIcon',
      text: 'Maintenance',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20',
      textColor: 'text-orange-400',
    },
    OFFLINE: {
      color: 'red',
      icon: 'XCircleIcon',
      text: 'Offline',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
      textColor: 'text-red-400',
    },
  };
  
  return configs[status];
};

/**
 * 🔍 Filter Stations
 * Applies search, status, and connector filters to station list
 * 
 * @param stations - Array of stations to filter
 * @param options - Filter options (search, status, connector)
 * @returns Filtered station array
 */
export const filterStations = (
  stations: ChargingStation[],
  options: StationFilterOptions
): ChargingStation[] => {
  const { searchQuery, statusFilter, connectorFilter } = options;
  
  return stations.filter((station) => {
    // Search filter - name, location
    const matchesSearch = searchQuery === '' ||
      station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.location.toLowerCase().includes(searchQuery.toLowerCase());
      
    // Status filter
    const matchesStatus = statusFilter === 'all' || station.status === statusFilter;
    
    // Connector filter
    const matchesConnector = connectorFilter === 'all' || station.connectorType === connectorFilter;

    return matchesSearch && matchesStatus && matchesConnector;
  });
};

// ===============================
// CONNECTOR TYPE BUSINESS LOGIC
// ===============================

/**
 * 🔌 Get Connector Type Information
 * Returns detailed information about connector types
 * 
 * @param type - Connector type
 * @returns Connector type information
 */
export const getConnectorTypeInfo = (type: ConnectorType): ConnectorTypeInfo => {
  const connectorInfo: Record<ConnectorType, ConnectorTypeInfo> = {
    CCS: {
      type: 'CCS',
      displayName: 'CCS (Combined Charging System)',
      maxPower: 350,
      description: 'Fast DC charging for most European EVs',
    },
    CHAdeMO: {
      type: 'CHAdeMO',
      displayName: 'CHAdeMO',
      maxPower: 100,
      description: 'Japanese standard DC fast charging',
    },
    Type2: {
      type: 'Type2',
      displayName: 'Type 2 (Mennekes)',
      maxPower: 43,
      description: 'European standard AC charging',
    },
    CCS_CHAdeMO: {
      type: 'CCS_CHAdeMO',
      displayName: 'CCS + CHAdeMO',
      maxPower: 350,
      description: 'Dual connector supporting both standards',
    },
  };
  
  return connectorInfo[type];
};

/**
 * 🔌 Get Available Connector Types
 * Returns list of all available connector types for filtering
 */
export const getConnectorTypeOptions = () => [
  { value: 'all', label: 'All Connectors' },
  { value: 'CCS', label: 'CCS' },
  { value: 'CHAdeMO', label: 'CHAdeMO' },
  { value: 'Type2', label: 'Type 2' },
  { value: 'CCS_CHAdeMO', label: 'CCS + CHAdeMO' },
];

/**
 * 🔌 Get Status Filter Options
 * Returns list of all available status options for filtering
 */
export const getStatusFilterOptions = () => [
  { value: 'all', label: 'All Statuses' },
  { value: 'AVAILABLE', label: 'Available' },
  { value: 'CHARGING', label: 'Charging' },
  { value: 'MAINTENANCE', label: 'Maintenance' },
  { value: 'OFFLINE', label: 'Offline' },
];

// ===============================
// POWER CALCULATION BUSINESS LOGIC
// ===============================

/**
 * ⚡ Calculate Charging Time
 * Estimates charging time based on battery capacity and power output
 * 
 * @param batteryCapacity - Battery capacity in kWh
 * @param currentCharge - Current charge percentage (0-100)
 * @param targetCharge - Target charge percentage (0-100)
 * @param powerOutput - Station power output in kW
 * @param efficiency - Charging efficiency (default 0.9)
 * @returns Estimated charging time in minutes
 */
export const calculateChargingTime = (
  batteryCapacity: number,
  currentCharge: number,
  targetCharge: number,
  powerOutput: number,
  efficiency: number = 0.9
): number => {
  if (currentCharge >= targetCharge) return 0;
  
  const energyNeeded = (batteryCapacity * (targetCharge - currentCharge)) / 100;
  const effectivePower = powerOutput * efficiency;
  
  return Math.ceil((energyNeeded / effectivePower) * 60); // Convert to minutes
};

/**
 * 💰 Calculate Charging Cost
 * Calculates estimated cost for a charging session
 * 
 * @param energyDelivered - Energy delivered in kWh
 * @param pricePerKwh - Price per kWh in local currency
 * @param sessionFee - Optional session fee
 * @returns Total cost
 */
export const calculateChargingCost = (
  energyDelivered: number,
  pricePerKwh: number,
  sessionFee: number = 0
): number => {
  return (energyDelivered * pricePerKwh) + sessionFee;
};

/**
 * ⚡ Calculate Power Efficiency
 * Calculates power efficiency based on actual vs theoretical power
 * 
 * @param actualPower - Actual power delivered in kW
 * @param ratedPower - Rated power capacity in kW
 * @returns Efficiency percentage (0-100)
 */
export const calculatePowerEfficiency = (
  actualPower: number,
  ratedPower: number
): number => {
  if (ratedPower === 0) return 0;
  return Math.min(100, Math.round((actualPower / ratedPower) * 100));
};

// ===============================
// STATION VALIDATION BUSINESS LOGIC
// ===============================

/**
 * ✅ Validate Station Status
 * Checks if a station status transition is valid
 * 
 * @param currentStatus - Current station status
 * @param newStatus - Desired new status
 * @returns Whether transition is valid
 */
export const isValidStatusTransition = (
  currentStatus: StationStatus,
  newStatus: StationStatus
): boolean => {
  // Define valid transitions
  const validTransitions: Record<StationStatus, StationStatus[]> = {
    AVAILABLE: ['CHARGING', 'MAINTENANCE', 'OFFLINE'],
    CHARGING: ['AVAILABLE', 'OFFLINE'],
    MAINTENANCE: ['AVAILABLE', 'OFFLINE'],
    OFFLINE: ['AVAILABLE', 'MAINTENANCE'],
  };
  
  return validTransitions[currentStatus]?.includes(newStatus) || false;
};

/**
 * 🔍 Check Station Availability
 * Determines if a station is available for charging
 * 
 * @param station - Station object
 * @returns Whether station is available
 */
export const isStationAvailable = (station: ChargingStation): boolean => {
  return station.status === 'AVAILABLE' && 
         station.isActive && 
         isStationOnline(station);
};

/**
 * 📡 Check Station Online Status
 * Determines if a station is online based on last heartbeat
 * 
 * @param station - Station object
 * @param timeoutMinutes - Timeout in minutes (default 5)
 * @returns Whether station is online
 */
export const isStationOnline = (
  station: ChargingStation,
  timeoutMinutes: number = 5
): boolean => {
  const lastHeartbeat = new Date(station.lastHeartbeat);
  const now = new Date();
  const diffMinutes = (now.getTime() - lastHeartbeat.getTime()) / (1000 * 60);
  
  return diffMinutes <= timeoutMinutes;
};

/**
 * 📊 Validate Station Data
 * Validates station data for creation/updates
 * 
 * @param stationData - Station data to validate
 * @returns Validation result with errors
 */
export const validateStationData = (stationData: Partial<ChargingStation>): {
  isValid: boolean;
  errors: Record<string, string>;
} => {
  const errors: Record<string, string> = {};
  
  // Name validation
  if (!stationData.name || stationData.name.trim().length < 3) {
    errors.name = 'Station name must be at least 3 characters long';
  }
  
  // Location validation
  if (!stationData.location || stationData.location.trim().length < 5) {
    errors.location = 'Location must be at least 5 characters long';
  }
  
  // Power output validation
  if (!stationData.powerOutput || stationData.powerOutput <= 0) {
    errors.powerOutput = 'Power output must be greater than 0';
  }
  
  // Price validation
  if (stationData.pricePerKwh !== undefined && stationData.pricePerKwh < 0) {
    errors.pricePerKwh = 'Price per kWh cannot be negative';
  }
  
  // Connector type validation
  const validConnectors: ConnectorType[] = ['CCS', 'CHAdeMO', 'Type2', 'CCS_CHAdeMO'];
  if (!stationData.connectorType || !validConnectors.includes(stationData.connectorType)) {
    errors.connectorType = 'Please select a valid connector type';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// ===============================
// STATION STATISTICS BUSINESS LOGIC
// ===============================

/**
 * 📈 Calculate Station Statistics
 * Calculates various statistics from station data
 * 
 * @param stations - Array of stations
 * @returns Station statistics object
 */
export const calculateStationStats = (stations: ChargingStation[]) => {
  const totalStations = stations.length;
  const availableStations = stations.filter(s => s.status === 'AVAILABLE').length;
  const chargingStations = stations.filter(s => s.status === 'CHARGING').length;
  const maintenanceStations = stations.filter(s => s.status === 'MAINTENANCE').length;
  const offlineStations = stations.filter(s => s.status === 'OFFLINE').length;
  const onlineStations = stations.filter(s => isStationOnline(s)).length;
  
  // Power statistics
  const totalPower = stations.reduce((sum, s) => sum + s.powerOutput, 0);
  const averagePower = totalStations > 0 ? Math.round(totalPower / totalStations) : 0;
  const activePower = stations
    .filter(s => s.status === 'CHARGING')
    .reduce((sum, s) => sum + s.powerOutput, 0);
  
  // Connector type distribution
  const connectorStats = stations.reduce((acc, station) => {
    acc[station.connectorType] = (acc[station.connectorType] || 0) + 1;
    return acc;
  }, {} as Record<ConnectorType, number>);
  
  return {
    totalStations,
    availableStations,
    chargingStations,
    maintenanceStations,
    offlineStations,
    onlineStations,
    availabilityRate: totalStations > 0 ? Math.round((availableStations / totalStations) * 100) : 0,
    onlineRate: totalStations > 0 ? Math.round((onlineStations / totalStations) * 100) : 0,
    totalPower,
    averagePower,
    activePower,
    connectorStats,
    utilizationRate: totalStations > 0 ? Math.round((chargingStations / totalStations) * 100) : 0,
  };
};

/**
 * 🔄 Get Default Station Filters
 * Returns default filter state
 */
export const getDefaultStationFilters = (): StationFilterOptions => ({
  searchQuery: '',
  statusFilter: 'all',
  connectorFilter: 'all',
}); 