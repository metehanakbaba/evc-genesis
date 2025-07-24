/**
 * ⚡ Charging Station Types
 * 
 * Type definitions for charging station functionality
 */

export interface ChargingStation {
  id: string;
  name: string;
  address: string;
  coordinates: { latitude: number; longitude: number };
  status: 'available' | 'busy' | 'maintenance' | 'offline';
  availablePorts: number;
  totalPorts: number;
  maxPower: number; // kW
  pricePerKwh: number;
  amenities: string[];
  distance: number; // km
  estimatedTime: number; // minutes
  connectorTypes: string[];
  network: string;
  rating: number;
  isSuperfast: boolean;
}

export interface StationMapModalProps {
  visible: boolean;
  onClose: () => void;
}

export interface StationCardProps {
  station: ChargingStation;
  onPress: (station: ChargingStation) => void;
}

export interface StationDetailBottomSheetProps {
  station: ChargingStation | null;
  onClose: () => void;
  onReserve: (station: ChargingStation) => void;
  onNavigate: (station: ChargingStation) => void;
} 