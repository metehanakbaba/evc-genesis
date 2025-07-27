# ⚡ Charging Request API Documentation

> **API endpoints and data structures for the charging request system**

## Overview

The Charging Request API provides comprehensive functionality for managing both station booking and mobile charging requests. The system supports dual service types with complete vehicle compatibility and location-based services.

## Base URL

```
Production: https://api.evcharging.com/v1
Development: http://localhost:3001/api/v1
```

## Authentication

All API endpoints require authentication via Bearer token:

```http
Authorization: Bearer <your-jwt-token>
```

## Core Data Types

### ChargingRequestType

```typescript
export type ChargingRequestType = 'station' | 'mobile';
```

### Location

```typescript
export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  postalCode: string;
}
```

### Vehicle

```typescript
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
```

### ChargingStation

```typescript
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
```

### MobileChargingTechnician

```typescript
export interface MobileChargingTechnician {
  id: string;
  name: string;
  rating: number;
  estimatedArrival: number;
  vehicleInfo: string;
  phoneNumber: string;
  isAvailable: boolean;
}
```

## Request Data Structures

### Base ChargingRequestData

```typescript
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
```

### StationBookingData

```typescript
export interface StationBookingData extends ChargingRequestData {
  selectedStation: ChargingStation;
  connectorType: string;
  estimatedChargingTime: number;
}
```

### MobileChargingData

```typescript
export interface MobileChargingData extends ChargingRequestData {
  serviceType: 'standard' | 'premium' | 'emergency';
  assignedTechnician?: MobileChargingTechnician;
  estimatedCost: number;
  additionalServices: string[];
}
```

### ChargingRequestStep

```typescript
export interface ChargingRequestStep {
  id: string;
  title: string;
  subtitle: string;
  isCompleted: boolean;
  isActive: boolean;
  icon: string;
}
```

## API Endpoints

### Station Booking Endpoints

#### Get Available Stations

```http
GET /charging-request/stations
```

**Query Parameters:**
- `latitude` (number, required): User's latitude
- `longitude` (number, required): User's longitude
- `radius` (number, optional): Search radius in km (default: 10)
- `connectorType` (string, optional): Filter by connector type
- `minPower` (number, optional): Minimum charging power in kW

**Response:**
```json
{
  "success": true,
  "data": {
    "stations": [
      {
        "id": "station_123",
        "name": "Downtown Charging Hub",
        "location": {
          "latitude": 41.0082,
          "longitude": 28.9784,
          "address": "Taksim Square, Istanbul",
          "city": "Istanbul",
          "postalCode": "34437"
        },
        "distance": 2.5,
        "availableConnectors": 3,
        "totalConnectors": 8,
        "chargingSpeed": "150kW DC Fast",
        "pricePerKwh": 2.45,
        "amenities": ["WiFi", "Cafe", "Restroom"],
        "rating": 4.7,
        "isOperational": true,
        "estimatedWaitTime": 5
      }
    ],
    "totalCount": 15
  }
}
```

#### Create Station Booking

```http
POST /charging-request/station-booking
```

**Request Body:**
```json
{
  "type": "station",
  "vehicle": {
    "id": "vehicle_456",
    "make": "Tesla",
    "model": "Model 3",
    "year": 2023,
    "batteryCapacity": 75,
    "currentBatteryLevel": 25,
    "chargingPortType": "CCS",
    "licensePlate": "34ABC123"
  },
  "requestedLocation": {
    "latitude": 41.0082,
    "longitude": 28.9784,
    "address": "Taksim Square, Istanbul",
    "city": "Istanbul",
    "postalCode": "34437"
  },
  "targetBatteryLevel": 80,
  "urgencyLevel": "medium",
  "selectedStation": {
    "id": "station_123",
    "name": "Downtown Charging Hub"
  },
  "connectorType": "CCS",
  "estimatedChargingTime": 45,
  "preferredTimeSlot": {
    "start": "2025-01-27T14:00:00Z",
    "end": "2025-01-27T16:00:00Z"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "bookingId": "booking_789",
    "status": "confirmed",
    "estimatedCost": 67.50,
    "confirmationCode": "CHG789",
    "steps": [
      {
        "id": "step_1",
        "title": "Booking Confirmed",
        "subtitle": "Your station has been reserved",
        "isCompleted": true,
        "isActive": false,
        "icon": "checkmark-circle"
      },
      {
        "id": "step_2",
        "title": "Navigate to Station",
        "subtitle": "Follow directions to charging station",
        "isCompleted": false,
        "isActive": true,
        "icon": "navigate"
      }
    ]
  }
}
```

### Mobile Charging Endpoints

#### Get Available Technicians

```http
GET /charging-request/mobile-technicians
```

**Query Parameters:**
- `latitude` (number, required): Service location latitude
- `longitude` (number, required): Service location longitude
- `serviceType` (string, optional): 'standard' | 'premium' | 'emergency'
- `urgencyLevel` (string, optional): 'low' | 'medium' | 'high'

**Response:**
```json
{
  "success": true,
  "data": {
    "technicians": [
      {
        "id": "tech_456",
        "name": "Mehmet Yılmaz",
        "rating": 4.9,
        "estimatedArrival": 25,
        "vehicleInfo": "Mercedes Sprinter - Mobile Charging Unit",
        "phoneNumber": "+90 555 123 4567",
        "isAvailable": true
      }
    ],
    "averageWaitTime": 30,
    "serviceArea": "Istanbul Metropolitan Area"
  }
}
```

#### Create Mobile Charging Request

```http
POST /charging-request/mobile-charging
```

**Request Body:**
```json
{
  "type": "mobile",
  "vehicle": {
    "id": "vehicle_456",
    "make": "BMW",
    "model": "iX3",
    "year": 2024,
    "batteryCapacity": 80,
    "currentBatteryLevel": 15,
    "chargingPortType": "CCS",
    "licensePlate": "34XYZ789"
  },
  "requestedLocation": {
    "latitude": 41.0082,
    "longitude": 28.9784,
    "address": "Levent Business District, Istanbul",
    "city": "Istanbul",
    "postalCode": "34330"
  },
  "targetBatteryLevel": 80,
  "urgencyLevel": "high",
  "serviceType": "premium",
  "specialInstructions": "Office parking garage, Level B2",
  "additionalServices": ["battery_health_check", "tire_pressure_check"],
  "preferredTimeSlot": {
    "start": "2025-01-27T16:00:00Z",
    "end": "2025-01-27T18:00:00Z"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "requestId": "mobile_req_123",
    "status": "technician_assigned",
    "estimatedCost": 156.00,
    "assignedTechnician": {
      "id": "tech_456",
      "name": "Mehmet Yılmaz",
      "rating": 4.9,
      "estimatedArrival": 25,
      "vehicleInfo": "Mercedes Sprinter - Mobile Charging Unit",
      "phoneNumber": "+90 555 123 4567",
      "isAvailable": true
    },
    "trackingUrl": "https://track.evcharging.com/mobile_req_123",
    "steps": [
      {
        "id": "step_1",
        "title": "Request Received",
        "subtitle": "Your mobile charging request is confirmed",
        "isCompleted": true,
        "isActive": false,
        "icon": "checkmark-circle"
      },
      {
        "id": "step_2",
        "title": "Technician Assigned",
        "subtitle": "Mehmet is on the way to your location",
        "isCompleted": true,
        "isActive": false,
        "icon": "person"
      },
      {
        "id": "step_3",
        "title": "En Route",
        "subtitle": "Estimated arrival: 25 minutes",
        "isCompleted": false,
        "isActive": true,
        "icon": "car"
      }
    ]
  }
}
```

### Request Management Endpoints

#### Get Request Status

```http
GET /charging-request/{requestId}/status
```

**Response:**
```json
{
  "success": true,
  "data": {
    "requestId": "mobile_req_123",
    "type": "mobile",
    "status": "in_progress",
    "currentStep": "charging",
    "progress": 65,
    "estimatedCompletion": "2025-01-27T17:30:00Z",
    "steps": [
      {
        "id": "step_1",
        "title": "Request Received",
        "isCompleted": true,
        "isActive": false
      },
      {
        "id": "step_2",
        "title": "Technician Assigned",
        "isCompleted": true,
        "isActive": false
      },
      {
        "id": "step_3",
        "title": "Technician Arrived",
        "isCompleted": true,
        "isActive": false
      },
      {
        "id": "step_4",
        "title": "Charging in Progress",
        "isCompleted": false,
        "isActive": true
      }
    ]
  }
}
```

#### Cancel Request

```http
DELETE /charging-request/{requestId}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "requestId": "mobile_req_123",
    "status": "cancelled",
    "cancellationFee": 25.00,
    "refundAmount": 131.00,
    "message": "Request cancelled successfully"
  }
}
```

#### Get Request History

```http
GET /charging-request/history
```

**Query Parameters:**
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 20)
- `type` (string, optional): Filter by request type
- `status` (string, optional): Filter by status

**Response:**
```json
{
  "success": true,
  "data": {
    "requests": [
      {
        "id": "mobile_req_123",
        "type": "mobile",
        "status": "completed",
        "createdAt": "2025-01-27T14:00:00Z",
        "completedAt": "2025-01-27T17:30:00Z",
        "totalCost": 156.00,
        "vehicle": {
          "make": "BMW",
          "model": "iX3",
          "licensePlate": "34XYZ789"
        },
        "location": {
          "address": "Levent Business District, Istanbul"
        }
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 87,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

## Error Handling

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": {
      "field": "targetBatteryLevel",
      "message": "Target battery level must be between 20 and 100"
    }
  }
}
```

### Common Error Codes

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `VALIDATION_ERROR` | Request validation failed | 400 |
| `UNAUTHORIZED` | Authentication required | 401 |
| `FORBIDDEN` | Insufficient permissions | 403 |
| `NOT_FOUND` | Resource not found | 404 |
| `STATION_UNAVAILABLE` | Selected station is not available | 409 |
| `NO_TECHNICIANS_AVAILABLE` | No mobile technicians available | 409 |
| `INSUFFICIENT_BALANCE` | Insufficient wallet balance | 402 |
| `SERVICE_AREA_UNAVAILABLE` | Location outside service area | 422 |
| `RATE_LIMIT_EXCEEDED` | Too many requests | 429 |
| `INTERNAL_ERROR` | Server error | 500 |

## Rate Limiting

API requests are rate-limited to prevent abuse:

- **Standard endpoints**: 100 requests per minute
- **Search endpoints**: 50 requests per minute
- **Booking endpoints**: 10 requests per minute

Rate limit headers are included in responses:

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1643723400
```

## Webhooks

The system supports webhooks for real-time updates:

### Webhook Events

- `request.created` - New charging request created
- `request.updated` - Request status updated
- `request.completed` - Request completed
- `request.cancelled` - Request cancelled
- `technician.assigned` - Mobile technician assigned
- `technician.arrived` - Technician arrived at location
- `charging.started` - Charging session started
- `charging.completed` - Charging session completed

### Webhook Payload Example

```json
{
  "event": "request.updated",
  "timestamp": "2025-01-27T15:30:00Z",
  "data": {
    "requestId": "mobile_req_123",
    "type": "mobile",
    "status": "in_progress",
    "progress": 65,
    "estimatedCompletion": "2025-01-27T17:30:00Z"
  }
}
```

## SDK Examples

### JavaScript/TypeScript

```typescript
import { ChargingRequestAPI } from '@evcharging/sdk';

const api = new ChargingRequestAPI({
  baseURL: 'https://api.evcharging.com/v1',
  apiKey: 'your-api-key'
});

// Create mobile charging request
const mobileRequest = await api.createMobileChargingRequest({
  type: 'mobile',
  vehicle: userVehicle,
  requestedLocation: currentLocation,
  targetBatteryLevel: 80,
  urgencyLevel: 'medium',
  serviceType: 'premium'
});

// Track request status
const status = await api.getRequestStatus(mobileRequest.requestId);
```

### React Native Integration

```typescript
import { useMutation, useQuery } from '@tanstack/react-query';
import { chargingRequestAPI } from '@/lib/api';
import { useDashboard } from '@/features/dashboard/hooks';

// Dashboard integration with charging request system
export const DashboardWithChargingRequest = () => {
  const {
    mobileChargingFeatures,
    isCharging,
    chargingProgress,
    isAvailable,
    handlers: { handleMobileChargingPress, handleRequestCharging }
  } = useDashboard();

  return (
    <MobileChargingCard
      features={mobileChargingFeatures}
      onPress={handleMobileChargingPress}
      onRequestCharging={handleRequestCharging}  // Integrated charging request
      isCharging={isCharging}
      chargingProgress={chargingProgress}
      isAvailable={isAvailable}
    />
  );
};

// Hook for creating charging requests
export const useCreateChargingRequest = () => {
  return useMutation({
    mutationFn: chargingRequestAPI.createRequest,
    onSuccess: (data) => {
      // Navigate to tracking screen
      navigation.navigate('RequestTracking', { requestId: data.requestId });
    }
  });
};

// Hook for tracking request status
export const useRequestStatus = (requestId: string) => {
  return useQuery({
    queryKey: ['request-status', requestId],
    queryFn: () => chargingRequestAPI.getStatus(requestId),
    refetchInterval: 30000, // Poll every 30 seconds
    enabled: !!requestId
  });
};
```

## Testing

### Test Environment

```
Base URL: https://api-staging.evcharging.com/v1
Test API Key: test_sk_1234567890abcdef
```

### Test Data

The staging environment includes test data for:
- Mock charging stations in major cities
- Simulated mobile technicians
- Test vehicles with various connector types
- Sample request flows with different scenarios

### Postman Collection

A comprehensive Postman collection is available for API testing:

```bash
# Import collection
curl -o charging-request-api.postman_collection.json \
  https://api.evcharging.com/docs/postman/charging-request-collection.json
```

## Support

For API support and questions:

- **Documentation**: [https://docs.evcharging.com/api](https://docs.evcharging.com/api)
- **Support Email**: api-support@evcharging.com
- **Developer Portal**: [https://developers.evcharging.com](https://developers.evcharging.com)
- **Status Page**: [https://status.evcharging.com](https://status.evcharging.com)

---

**Last Updated**: January 27, 2025  
**API Version**: v1.0.0  
**Maintainers**: EV Charging API Team