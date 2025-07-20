import type { Station } from '../types/station.types';

// Mock demo data for stations - Polish locations with PLN pricing
export const mockStations: Station[] = [
  {
    id: 'station-001',
    name: 'Warszawa Galeria Mokotów Supercharger',
    location: {
      address: 'Galeria Mokotów, ul. Wołoska 12, Mokotów, Warszawa',
      lat: 52.1672,
      lng: 21.0430,
    },
    connectors: [
      {
        id: 'conn-001-1',
        type: 'CCS2',
        power: 150,
        status: 'available',
      },
      {
        id: 'conn-001-2',
        type: 'CHAdeMO',
        power: 100,
        status: 'available',
      },
    ],
    status: 'active',
    amenities: ['restroom', 'cafe', 'shopping'],
    operating_hours: '24/7',
    pricing: {
      per_kwh: 1.80,
      currency: 'PLN',
    },
  },
  {
    id: 'station-002',
    name: 'Kraków Lotnisko Balice Fast Hub',
    location: {
      address: 'Port Lotniczy Kraków-Balice, ul. Kapitana Mieczysława Medweckiego 1',
      lat: 50.0777,
      lng: 19.7848,
    },
    connectors: [
      {
        id: 'conn-002-1',
        type: 'CCS2',
        power: 75,
        status: 'occupied',
        current_session: {
          id: 'session-123',
          user_id: 'user-456',
          started_at: '2024-01-15T10:30:00Z',
        },
      },
      {
        id: 'conn-002-2',
        type: 'Type2',
        power: 22,
        status: 'available',
      },
      {
        id: 'conn-002-3',
        type: 'CCS2',
        power: 150,
        status: 'available',
      },
    ],
    status: 'active',
    amenities: ['restroom', 'restaurant', 'wifi'],
    operating_hours: '24/7',
    pricing: {
      per_kwh: 2.10,
      currency: 'PLN',
    },
  },
  {
    id: 'station-003',
    name: 'Gdańsk Stare Miasto Station',
    location: {
      address: 'ul. Długa 47, Stare Miasto, Gdańsk',
      lat: 54.3520,
      lng: 18.6466,
    },
    connectors: [
      {
        id: 'conn-003-1',
        type: 'Type2',
        power: 22,
        status: 'faulted',
      },
      {
        id: 'conn-003-2',
        type: 'AC',
        power: 11,
        status: 'faulted',
      },
    ],
    status: 'maintenance',
    amenities: ['parking'],
    operating_hours: '06:00-22:00',
    pricing: {
      per_kwh: 1.45,
      currency: 'PLN',
    },
  },
  {
    id: 'station-004',
    name: 'Wrocław Sky Tower Business Center',
    location: {
      address: 'Sky Tower, ul. Powstańców Śląskich 95, Wrocław',
      lat: 51.0904,
      lng: 17.0225,
    },
    connectors: [
      {
        id: 'conn-004-1',
        type: 'CHAdeMO',
        power: 50,
        status: 'faulted',
      },
      {
        id: 'conn-004-2',
        type: 'CCS2',
        power: 75,
        status: 'faulted',
      },
    ],
    status: 'offline',
    amenities: ['parking', 'security'],
    operating_hours: '07:00-19:00',
    pricing: {
      per_kwh: 1.95,
      currency: 'PLN',
    },
  },
  {
    id: 'station-005',
    name: 'Poznań Stary Browar Charging Point',
    location: {
      address: 'Stary Browar, ul. Półwiejska 42, Poznań',
      lat: 52.4064,
      lng: 16.9252,
    },
    connectors: [
      {
        id: 'conn-005-1',
        type: 'CCS2',
        power: 100,
        status: 'available',
      },
      {
        id: 'conn-005-2',
        type: 'Type2',
        power: 22,
        status: 'occupied',
        current_session: {
          id: 'session-789',
          user_id: 'user-321',
          started_at: '2024-01-15T14:15:00Z',
        },
      },
    ],
    status: 'active',
    amenities: ['restroom', 'cafe', 'shopping'],
    operating_hours: '24/7',
    pricing: {
      per_kwh: 1.75,
      currency: 'PLN',
    },
  },
  {
    id: 'station-006',
    name: 'Łódź Manufaktura Mall Station',
    location: {
      address: 'Manufaktura, ul. Karskiego 5, Łódź',
      lat: 51.7833,
      lng: 19.4500,
    },
    connectors: [
      {
        id: 'conn-006-1',
        type: 'CCS2',
        power: 150,
        status: 'available',
      },
      {
        id: 'conn-006-2',
        type: 'CHAdeMO',
        power: 100,
        status: 'available',
      },
      {
        id: 'conn-006-3',
        type: 'Type2',
        power: 22,
        status: 'reserved',
      },
    ],
    status: 'active',
    amenities: ['restroom', 'shopping', 'restaurant'],
    operating_hours: '24/7',
    pricing: {
      per_kwh: 1.65,
      currency: 'PLN',
    },
  },
  {
    id: 'station-007',
    name: 'Szczecin Port Charging Hub',
    location: {
      address: 'ul. Bytomska 7, Port Szczecin',
      lat: 53.4285,
      lng: 14.5528,
    },
    connectors: [
      {
        id: 'conn-007-1',
        type: 'CCS2',
        power: 75,
        status: 'occupied',
        current_session: {
          id: 'session-456',
          user_id: 'user-789',
          started_at: '2024-01-15T12:00:00Z',
        },
      },
      {
        id: 'conn-007-2',
        type: 'Type2',
        power: 22,
        status: 'available',
      },
    ],
    status: 'active',
    amenities: ['restroom', 'cafe', 'port_view'],
    operating_hours: '06:00-24:00',
    pricing: {
      per_kwh: 1.85,
      currency: 'PLN',
    },
  },
  {
    id: 'station-008',
    name: 'Lublin Uniwersytet Marii Curie-Skłodowskiej',
    location: {
      address: 'UMCS Campus, Plac Marii Curie-Skłodowskiej 5, Lublin',
      lat: 51.2465,
      lng: 22.5684,
    },
    connectors: [
      {
        id: 'conn-008-1',
        type: 'Type2',
        power: 22,
        status: 'available',
      },
      {
        id: 'conn-008-2',
        type: 'AC',
        power: 11,
        status: 'available',
      },
    ],
    status: 'active',
    amenities: ['parking', 'library', 'university'],
    operating_hours: '08:00-20:00',
    pricing: {
      per_kwh: 1.35,
      currency: 'PLN',
    },
  },
  {
    id: 'station-009',
    name: 'Katowice Spodek Arena Charger',
    location: {
      address: 'al. Korfantego 35, Katowice',
      lat: 50.2649,
      lng: 19.0238,
    },
    connectors: [
      {
        id: 'conn-009-1',
        type: 'CCS2',
        power: 50,
        status: 'available',
      },
    ],
    status: 'active',
    amenities: ['restroom', 'arena', 'events'],
    operating_hours: '09:00-21:00',
    pricing: {
      per_kwh: 2.25,
      currency: 'PLN',
    },
  },
  {
    id: 'station-010',
    name: 'Bydgoszcz Opera Nova Station',
    location: {
      address: 'ul. Focha 5, Bydgoszcz',
      lat: 53.1235,
      lng: 18.0084,
    },
    connectors: [
      {
        id: 'conn-010-1',
        type: 'CHAdeMO',
        power: 50,
        status: 'faulted',
      },
      {
        id: 'conn-010-2',
        type: 'Type2',
        power: 22,
        status: 'faulted',
      },
    ],
    status: 'maintenance',
    amenities: ['parking', 'culture'],
    operating_hours: '24/7',
    pricing: {
      per_kwh: 1.55,
      currency: 'PLN',
    },
  },
];

// Filter function for demo data
export const filterMockStations = (
  stations: Station[],
  filters: {
    searchQuery?: string;
    statusFilter?: string;
    connectorTypeFilter?: string;
  }
): Station[] => {
  return stations.filter((station) => {
    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesSearch = 
        station.name.toLowerCase().includes(query) ||
        station.location.address.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Status filter
    if (filters.statusFilter && filters.statusFilter !== 'all') {
      if (station.status !== filters.statusFilter) return false;
    }

    // Connector type filter
    if (filters.connectorTypeFilter && filters.connectorTypeFilter !== 'all') {
      const hasConnectorType = station.connectors.some(
        connector => connector.type === filters.connectorTypeFilter
      );
      if (!hasConnectorType) return false;
    }

    return true;
  });
}; 