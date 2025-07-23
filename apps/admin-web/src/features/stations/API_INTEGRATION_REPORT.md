# 🔌 Station API Integration Report

## 📊 Current vs Required API Schema Analysis

### **Provided APIs**
```typescript
// POST /api/admin/charge-stations - Create Station
{
  "name": "string",
  "location": {
    "latitude": 90,
    "longitude": 180,
    "address": "string", 
    "city": "string",
    "country": "string"
  },
  "powerOutput": 1000,
  "connectorType": "CCS", 
  "pricePerKWh": 0
}

// GET /api/admin/charge-stations - Get All Stations
// PATCH /api/admin/charge-stations - Update Station Status 
{
  "status": "AVAILABLE"
}
```

### **Current Implementation Gaps**

#### 1. **Location Schema Mismatch** ❌
**Current:**
```typescript
interface Location {
  readonly lat: number;
  readonly lng: number; 
  readonly address: string;
}
```

**Required:**
```typescript
interface Location {
  readonly latitude: number;
  readonly longitude: number;
  readonly address: string;
  readonly city: string;
  readonly country: string;
}
```

#### 2. **Station Creation Schema Mismatch** ❌
**Current CreateStationRequest:**
```typescript
{
  readonly name: string;
  readonly location: Location;
  readonly connectors: ReadonlyArray<{
    readonly type: Connector['type'];
    readonly power: number;
  }>;
}
```

**Required CreateStationRequest:**
```typescript
{
  readonly name: string;
  readonly location: {
    readonly latitude: number;
    readonly longitude: number;
    readonly address: string;
    readonly city: string;
    readonly country: string;
  };
  readonly powerOutput: number;
  readonly connectorType: string;
  readonly pricePerKWh: number;
}
```

#### 3. **API URL Mismatch** ❌
**Current:** `/admin/stations`
**Required:** `/api/admin/charge-stations`

### **Missing Critical APIs** 🚨

#### Essential for Full CRUD Operations:
```typescript
// 1. Get Single Station Details
GET /api/admin/charge-stations/:id

// 2. Update Station with ID  
PATCH /api/admin/charge-stations/:id
{
  "name"?: "string",
  "location"?: { ... },
  "powerOutput"?: number,
  "connectorType"?: "string", 
  "pricePerKWh"?: number,
  "status"?: "AVAILABLE" | "MAINTENANCE" | "OFFLINE"
}

// 3. Delete Station
DELETE /api/admin/charge-stations/:id
```

**⚠️ Note:** Current PATCH endpoint without ID parameter is incomplete for station updates.

### **Required Data Model Updates**

#### 1. **Enhanced Station Interface**
```typescript
interface Station {
  readonly id: string;
  readonly name: string;
  readonly location: {
    readonly latitude: number;  // Changed from lat
    readonly longitude: number; // Changed from lng
    readonly address: string;
    readonly city: string;      // NEW
    readonly country: string;   // NEW
  };
  readonly powerOutput: number;        // NEW
  readonly connectorType: string;      // NEW - Single type vs array
  readonly pricePerKWh: number;       // NEW
  readonly status: StationStatus;
  // Keep existing optional fields
  readonly connectors?: ReadonlyArray<Connector>; // For compatibility
  readonly amenities?: ReadonlyArray<string>;
  readonly operating_hours?: string;
  readonly distance?: number;
}
```

#### 2. **Updated CreateStationRequest**
```typescript
interface CreateStationRequest {
  readonly name: string;
  readonly location: {
    readonly latitude: number;
    readonly longitude: number;
    readonly address: string;
    readonly city: string;
    readonly country: string;
  };
  readonly powerOutput: number;
  readonly connectorType: 'CCS' | 'CHAdeMO' | 'Type2' | 'AC' | 'DC';
  readonly pricePerKWh: number;
}
```

### **Implementation Priority**

#### 🔥 **Phase 1: Critical (This Sprint)**
1. ✅ Update Location interface 
2. ✅ Update Station interface
3. ✅ Update CreateStationRequest interface
4. ✅ Fix API endpoints URLs
5. ✅ Create station form with map integration

#### 🚀 **Phase 2: Essential (Next Sprint)**  
1. ⏳ Request missing API endpoints from backend team
2. ⏳ Implement station details page
3. ⏳ Implement station edit functionality
4. ⏳ Add comprehensive error handling

### **Warsaw Map Integration Requirements**

#### Location Picker Specifications:
- **Initial Center:** Warsaw coordinates (52.2297, 21.0122)
- **Free Map Service:** OpenStreetMap with Leaflet
- **Functionality:** Click to select location, reverse geocoding for address
- **City/Country:** Auto-populate with "Warsaw" and "Poland" as defaults
- **Validation:** Ensure coordinates are within Poland boundaries

### **Redux Integration Notes**

Current RTK Query setup is solid:
- ✅ evChargingApi with injectEndpoints pattern
- ✅ Proper tag invalidation for cache management  
- ✅ Error handling via formatApiError
- ✅ Redux store with auth integration

Only requires endpoint URL updates and schema alignment.

### **Recommended Actions**

#### **Immediate (This Session):**
1. Update type definitions for schema alignment
2. Fix API endpoint URLs 
3. Create station creation form with basic map
4. Update hooks to use real API endpoints
5. Implement station actions (delete, status toggle)

#### **Next Session:**
1. Request missing API endpoints from backend team
2. Add comprehensive form validation
3. Enhance map integration with advanced features
4. Add detailed error handling and user feedback

### **Risk Assessment**

#### **Low Risk** 🟢
- Type updates and endpoint URL changes
- Station creation form implementation
- Mock data replacement with real API

#### **Medium Risk** 🟡  
- Missing API endpoints may require backend changes
- Map integration complexity for address validation

#### **High Risk** 🔴
- PATCH endpoint without ID parameter needs clarification
- Connector data model changes may affect existing UI components

---

**📅 Last Updated:** 2024-01-15
**👨‍💻 Developer:** EV Charging Team 