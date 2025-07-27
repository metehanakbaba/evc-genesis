/**
 * ⚡ Charging Request Mock Data
 * 
 * Mock data for charging request functionality
 */

import { Vehicle, ChargingStation, MobileChargingTechnician, Location } from '../types';

export const mockVehicles: Vehicle[] = [
  {
    id: '1',
    make: 'Tesla',
    model: 'Model 3',
    year: 2023,
    batteryCapacity: 75,
    currentBatteryLevel: 45,
    chargingPortType: 'CCS',
    licensePlate: 'WA 12345'
  },
  {
    id: '2',
    make: 'BMW',
    model: 'iX3',
    year: 2022,
    batteryCapacity: 80,
    currentBatteryLevel: 23,
    chargingPortType: 'CCS',
    licensePlate: 'WA 67890'
  },
  {
    id: '3',
    make: 'Audi',
    model: 'e-tron GT',
    year: 2024,
    batteryCapacity: 93,
    currentBatteryLevel: 67,
    chargingPortType: 'CCS',
    licensePlate: 'WA 11111'
  }
];

export const mockLocations: Location[] = [
  {
    latitude: 52.2297,
    longitude: 21.0122,
    address: 'Mevcut Konum',
    city: 'Warszawa',
    postalCode: '00-001'
  },
  {
    latitude: 52.2319,
    longitude: 21.0067,
    address: 'Krakowskie Przedmieście 26/28',
    city: 'Warszawa',
    postalCode: '00-927'
  },
  {
    latitude: 52.2394,
    longitude: 21.0362,
    address: 'Marszałkowska 104/122',
    city: 'Warszawa',
    postalCode: '00-017'
  }
];

export const mockChargingStations: ChargingStation[] = [
  {
    id: '1',
    name: 'Warsaw Central Station',
    location: {
      latitude: 52.2297,
      longitude: 21.0122,
      address: 'Aleje Jerozolimskie 54',
      city: 'Warszawa',
      postalCode: '00-024'
    },
    distance: 0.8,
    availableConnectors: 3,
    totalConnectors: 6,
    chargingSpeed: 'Up to 150kW',
    pricePerKwh: 2.40,
    amenities: ['Restoran', 'WiFi', 'Market', 'WC'],
    rating: 4.8,
    isOperational: true,
    estimatedWaitTime: 5
  },
  {
    id: '2',
    name: 'Galeria Mokotów',
    location: {
      latitude: 52.1804,
      longitude: 21.0444,
      address: 'Wołoska 12',
      city: 'Warszawa',
      postalCode: '02-675'
    },
    distance: 1.2,
    availableConnectors: 2,
    totalConnectors: 4,
    chargingSpeed: 'Up to 100kW',
    pricePerKwh: 2.20,
    amenities: ['AVM', 'Restoran', 'Sinema', 'Otopark'],
    rating: 4.6,
    isOperational: true,
    estimatedWaitTime: 10
  },
  {
    id: '3',
    name: 'Arkadia Shopping Center',
    location: {
      latitude: 52.2576,
      longitude: 20.9829,
      address: 'Jana Pawła II 82',
      city: 'Warszawa',
      postalCode: '00-175'
    },
    distance: 2.1,
    availableConnectors: 1,
    totalConnectors: 8,
    chargingSpeed: 'Up to 200kW',
    pricePerKwh: 2.60,
    amenities: ['AVM', 'Restoran', 'Kafe', 'Otopark', 'Oyun Alanı'],
    rating: 4.9,
    isOperational: true,
    estimatedWaitTime: 15
  },
  {
    id: '4',
    name: 'Wilanów Park Station',
    location: {
      latitude: 52.1659,
      longitude: 21.0901,
      address: 'Klimczaka 1',
      city: 'Warszawa',
      postalCode: '02-797'
    },
    distance: 3.5,
    availableConnectors: 4,
    totalConnectors: 6,
    chargingSpeed: 'Up to 120kW',
    pricePerKwh: 2.30,
    amenities: ['Park', 'Kafe', 'WC'],
    rating: 4.7,
    isOperational: true,
    estimatedWaitTime: 0
  }
];

export const mockTechnicians: MobileChargingTechnician[] = [
  {
    id: '1',
    name: 'Mehmet Özkan',
    rating: 4.9,
    estimatedArrival: 15,
    vehicleInfo: 'Beyaz Tesla Service Van - WA 5555',
    phoneNumber: '+48 123 456 789',
    isAvailable: true
  },
  {
    id: '2',
    name: 'Anna Kowalski',
    rating: 4.8,
    estimatedArrival: 25,
    vehicleInfo: 'Mavi BMW Service Van - WA 6666',
    phoneNumber: '+48 987 654 321',
    isAvailable: true
  },
  {
    id: '3',
    name: 'Piotr Nowak',
    rating: 4.7,
    estimatedArrival: 35,
    vehicleInfo: 'Gri Mercedes Service Van - WA 7777',
    phoneNumber: '+48 555 123 456',
    isAvailable: true
  }
];

export const mockServiceTypes = [
  {
    id: 'standard' as const,
    title: 'Standart Hizmet',
    subtitle: '45-90 dakika içinde',
    price: 'zł76',
    features: ['Temel şarj hizmeti', 'Sertifikalı teknisyen', '7/24 destek'],
    gradient: ['#6B7280', '#4B5563'],
    borderColor: '#6B7280'
  },
  {
    id: 'premium' as const,
    title: 'Premium Hizmet',
    subtitle: '15-45 dakika içinde',
    price: 'zł156',
    features: ['Öncelikli hizmet', 'Tesla sertifikalı teknisyen', 'Araç temizlik hizmeti', 'Premium destek'],
    gradient: ['#F59E0B', '#D97706'],
    borderColor: '#F59E0B',
    popular: true
  },
  {
    id: 'emergency' as const,
    title: 'Acil Hizmet',
    subtitle: '5-20 dakika içinde',
    price: 'zł256',
    features: ['Anında müdahale', 'En yakın teknisyen', 'Acil durum desteği', '24/7 öncelik'],
    gradient: ['#EF4444', '#DC2626'],
    borderColor: '#EF4444'
  }
];