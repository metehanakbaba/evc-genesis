/**
 * ⚡ Charging Request Types
 * 
 * Type definitions for charging request functionality
 */

export type ChargingRequestType = 'station' | 'mobile';

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  postalCode: string;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  batteryCapacity: number;
  currentBatteryLevel: number;
  chargingPortType: 'CCS' | 'CHAdeMO' | 'Type2' | 'Tesla';
  licensePlate: string;
}

export interface ChargingStation {
  id: string;
  name: string;
  location: Location;
  distance: number;
  availableConnectors: number;
  totalConnectors: number;
  chargingSpeed: string;
  pricePerKwh: number;
  amenities: string[];
  rating: number;
  isOperational: boolean;
  estimatedWaitTime: number;
}

export interface MobileChargingTechnician {
  id: string;
  name: string;
  rating: number;
  estimatedArrival: number;
  vehicleInfo: string;
  phoneNumber: string;
  isAvailable: boolean;
}

export interface ChargingRequestData {
  type: ChargingRequestType;
  vehicle: Vehicle;
  requestedLocation: Location;
  targetBatteryLevel: number;
  urgencyLevel: 'low' | 'medium' | 'high';
  specialInstructions?: string;
  preferredTimeSlot?: {
    start: Date;
    end: Date;
  };
}

export interface StationBookingData extends ChargingRequestData {
  selectedStation: ChargingStation;
  connectorType: string;
  estimatedChargingTime: number;
}

export interface MobileChargingData extends ChargingRequestData {
  serviceType: 'standard' | 'premium' | 'emergency';
  assignedTechnician?: MobileChargingTechnician;
  estimatedCost: number;
  additionalServices: string[];
}

export interface ChargingRequestStep {
  id: string;
  title: string;
  subtitle: string;
  isCompleted: boolean;
  isActive: boolean;
  icon: string;
}