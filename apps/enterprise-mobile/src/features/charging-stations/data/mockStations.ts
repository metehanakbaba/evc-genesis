/**
 * 🗺️ Mock Charging Station Data
 * 
 * Sample charging stations around Poland area
 */

import { ChargingStation } from '../types/station.types';

export const mockChargingStations: ChargingStation[] = [
  {
    id: 'station_1',
    name: 'Warsaw Central EV Hub',
    address: 'Warszawa Centralna, Warsaw',
    coordinates: { latitude: 52.2297, longitude: 21.0122 },
    status: 'available',
    availablePorts: 3,
    totalPorts: 4,
    maxPower: 150,
    pricePerKwh: 2.80,
    amenities: ['Café', 'Restroom', 'WiFi', 'Shopping'],
    distance: 1.2,
    estimatedTime: 5,
    connectorTypes: ['CCS', 'CHAdeMO', 'Type 2'],
    network: 'Orlen Charge',
    rating: 4.8,
    isSuperfast: true
  },
  {
    id: 'station_2',
    name: 'Kraków Old Town Station',
    address: 'Rynek Główny, Kraków',
    coordinates: { latitude: 50.0647, longitude: 19.9450 },
    status: 'busy',
    availablePorts: 0,
    totalPorts: 6,
    maxPower: 75,
    pricePerKwh: 2.35,
    amenities: ['Restaurant', 'Shopping Center'],
    distance: 2.8,
    estimatedTime: 12,
    connectorTypes: ['CCS', 'Type 2'],
    network: 'Ionity',
    rating: 4.5,
    isSuperfast: false
  },
  {
    id: 'station_3',
    name: 'Gdańsk Tech Park',
    address: 'Gdański Park Technologiczny, Gdańsk',
    coordinates: { latitude: 54.3520, longitude: 18.6466 },
    status: 'available',
    availablePorts: 8,
    totalPorts: 8,
    maxPower: 200,
    pricePerKwh: 3.20,
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
    name: 'Wrocław Coastal Station',
    address: 'Wrocław Rynek, Wrocław',
    coordinates: { latitude: 51.1079, longitude: 17.0385 },
    status: 'maintenance',
    availablePorts: 0,
    totalPorts: 2,
    maxPower: 50,
    pricePerKwh: 2.10,
    amenities: ['Historic View', 'Park'],
    distance: 4.1,
    estimatedTime: 18,
    connectorTypes: ['Type 2'],
    network: 'GreenWay',
    rating: 4.2,
    isSuperfast: false
  },
  {
    id: 'station_5',
    name: 'Poznań Historic District',
    address: 'Stary Rynek, Poznań',
    coordinates: { latitude: 52.4064, longitude: 16.9252 },
    status: 'available',
    availablePorts: 2,
    totalPorts: 3,
    maxPower: 100,
    pricePerKwh: 2.65,
    amenities: ['Historic Sites', 'Traditional Restaurants'],
    distance: 5.2,
    estimatedTime: 22,
    connectorTypes: ['CCS', 'Type 2'],
    network: 'Orlen Charge',
    rating: 4.6,
    isSuperfast: false
  }
]; 