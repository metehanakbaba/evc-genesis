import { ConnectorType } from "@evc/shared-business-logic";
import { IconComponent } from "@/shared/ui";
import { BoltIcon, FireIcon, MapPinIcon,  } from "@heroicons/react/20/solid";

interface ConnectorTypeOption {
    id: ConnectorType,
    label: string;
    icon: IconComponent,
    color: string;
    description: string; 
}

export const CONNECTOR_TYPES: ConnectorTypeOption[] = [
  { 
    id: 'CCS', 
    label: 'CCS (Combined Charging System)', 
    icon: BoltIcon, 
    color: 'blue',
    description: 'Most common DC fast charging standard'
  },
  { 
    id: 'CHAdeMO', 
    label: 'CHAdeMO', 
    icon: BoltIcon, 
    color: 'purple',
    description: 'Japanese DC fast charging standard'
  },
  { 
    id: 'Type2', 
    label: 'Type 2 (Mennekes)', 
    icon: BoltIcon, 
    color: 'emerald',
    description: 'European AC charging standard'
  },
  {
    id: 'CCS_CHAdeMO',
    label: 'CCS + CHAdeMO', 
    icon: BoltIcon, 
    color: 'yellow',
    description: 'Combination of CCS and CHAdeMO standards'
  }
];

export const POWER_LEVELS = [
  { 
    id: '22', 
    label: '22 kW', 
    icon: BoltIcon, 
    color: 'blue',
    description: 'Standard AC charging'
  },
  { 
    id: '50', 
    label: '50 kW', 
    icon: BoltIcon, 
    color: 'emerald',
    description: 'DC fast charging'
  },
  { 
    id: '75', 
    label: '75 kW', 
    icon: FireIcon, 
    color: 'amber',
    description: 'High-power DC charging'
  },
  { 
    id: '150', 
    label: '150 kW', 
    icon: FireIcon, 
    color: 'red',
    description: 'Ultra-fast charging'
  },
  { 
    id: '350', 
    label: '350 kW', 
    icon: FireIcon, 
    color: 'red',
    description: 'Maximum power charging'
  },
];

export const WARSAW_AREAS = [
  { 
    id: 'center', 
    label: 'City Center', 
    icon: MapPinIcon, 
    color: 'blue',
    coords: { lat: 52.2297, lng: 21.0122 },
    description: 'Central Warsaw business district'
  },
  { 
    id: 'mokotow', 
    label: 'Mokotów', 
    icon: MapPinIcon, 
    color: 'emerald',
    coords: { lat: 52.1672, lng: 21.043 },
    description: 'Shopping and residential area'
  },
  { 
    id: 'wilanow', 
    label: 'Wilanów', 
    icon: MapPinIcon, 
    color: 'purple',
    coords: { lat: 52.1655, lng: 21.0895 },
    description: 'Modern residential district'
  },
  { 
    id: 'praga', 
    label: 'Praga', 
    icon: MapPinIcon, 
    color: 'amber',
    coords: { lat: 52.2506, lng: 21.0408 },
    description: 'Historic district across Vistula'
  },
];