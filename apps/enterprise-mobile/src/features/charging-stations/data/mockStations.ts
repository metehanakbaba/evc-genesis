/**
 * 🗺️ Mock Charging Station Data
 * 
 * Sample charging stations around Istanbul area
 */

import { ChargingStation } from '../types/station.types';

export const mockChargingStations: ChargingStation[] = [
  {
    id: 'station_1',
    name: 'Maltepe EV Hub',
    address: 'Maltepe Marina, İstanbul',
    coordinates: { latitude: 40.9285, longitude: 29.1467 },
    status: 'available',
    availablePorts: 3,
    totalPorts: 4,
    maxPower: 150,
    pricePerKwh: 4.50,
    amenities: ['Café', 'Restroom', 'WiFi', 'Shopping'],
    distance: 1.2,
    estimatedTime: 5,
    connectorTypes: ['CCS', 'CHAdeMO', 'Type 2'],
    network: 'EV Turkey',
    rating: 4.8,
    isSuperfast: true
  },
  {
    id: 'station_2',
    name: 'Kadıköy Plaza Station',
    address: 'Kadıköy Çarşısı, İstanbul',
    coordinates: { latitude: 40.9081, longitude: 29.1245 },
    status: 'busy',
    availablePorts: 0,
    totalPorts: 6,
    maxPower: 75,
    pricePerKwh: 3.75,
    amenities: ['Restaurant', 'Shopping Center'],
    distance: 2.8,
    estimatedTime: 12,
    connectorTypes: ['CCS', 'Type 2'],
    network: 'Charge Point',
    rating: 4.5,
    isSuperfast: false
  },
  {
    id: 'station_3',
    name: 'Ataşehir Tech Park',
    address: 'Ataşehir Teknokent, İstanbul',
    coordinates: { latitude: 40.9833, longitude: 29.1167 },
    status: 'available',
    availablePorts: 8,
    totalPorts: 8,
    maxPower: 200,
    pricePerKwh: 5.25,
    amenities: ['Business Lounge', 'Conference Rooms', 'WiFi'],
    distance: 3.5,
    estimatedTime: 15,
    connectorTypes: ['CCS', 'CHAdeMO', 'Type 2', 'Tesla Supercharger'],
    network: 'Tesla',
    rating: 4.9,
    isSuperfast: true
  },
  {
    id: 'station_4',
    name: 'Bostancı Coastal Station',
    address: 'Bostancı Sahili, İstanbul',
    coordinates: { latitude: 40.9456, longitude: 29.0944 },
    status: 'maintenance',
    availablePorts: 0,
    totalPorts: 2,
    maxPower: 50,
    pricePerKwh: 3.25,
    amenities: ['Seaside View', 'Park'],
    distance: 4.1,
    estimatedTime: 18,
    connectorTypes: ['Type 2'],
    network: 'Local Grid',
    rating: 4.2,
    isSuperfast: false
  },
  {
    id: 'station_5',
    name: 'Üsküdar Historic District',
    address: 'Üsküdar Merkez, İstanbul',
    coordinates: { latitude: 41.0214, longitude: 29.0078 },
    status: 'available',
    availablePorts: 2,
    totalPorts: 3,
    maxPower: 100,
    pricePerKwh: 4.00,
    amenities: ['Historic Sites', 'Traditional Restaurants'],
    distance: 5.2,
    estimatedTime: 22,
    connectorTypes: ['CCS', 'Type 2'],
    network: 'EV Turkey',
    rating: 4.6,
    isSuperfast: false
  }
]; 