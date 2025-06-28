# 🔗 Shared API Package

Cross-platform RTK Query API for EV Charging platform with type safety and single responsibility design.

## 🎯 Features

- **🔒 Type-Safe**: Full TypeScript support with comprehensive schema definitions
- **🌐 Cross-Platform**: Works on both Web and React Native
- **⚡ RTK Query**: Built on Redux Toolkit Query for efficient data fetching
- **🎭 Single Responsibility**: Domain-separated endpoints (Auth, Users, Stations, Wallet)
- **🔄 Auto Caching**: Intelligent cache invalidation and data synchronization
- **🚨 Error Handling**: Comprehensive error handling with type safety
- **🎨 Platform Adapters**: Pre-configured adapters for Web and Mobile

## 📦 Installation

```bash
npm install @evc-unified/shared-api
```

## 🚀 Quick Start

### Web Usage

```typescript
import { createWebApi, webApiHelpers } from '@evc-unified/shared-api';

// Create API instance
const api = createWebApi({
  baseUrl: 'https://api.evcharge.com/v1',
  getToken: () => localStorage.getItem('authToken'),
  onAuthError: () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  },
});

// Use in your Redux store
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Use hooks in components
const { data: user, isLoading } = api.useGetCurrentUserQuery();
const [login] = api.useLoginMutation();
```

### React Native Usage

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMobileApi, createMobileApiHelpers } from '@evc-unified/shared-api';

// Create API instance
const api = createMobileApi({
  baseUrl: 'https://api.evcharge.com/v1',
  AsyncStorage,
  onAuthError: () => {
    // Handle navigation to login screen
    navigation.navigate('Login');
  },
});

// Create helpers
const { setAuthToken, clearAuthToken, isAuthenticated } = createMobileApiHelpers(AsyncStorage);
```

## 🎭 API Endpoints

### 🔐 Authentication
- `login` - User login
- `register` - User registration  
- `logout` - User logout
- `refreshToken` - Token refresh
- `getCurrentUser` - Get current user profile

### 👥 User Management
- `getUsers` - Get all users (Admin)
- `getUserById` - Get user by ID
- `createUser` - Create user (Admin)
- `updateUser` - Update user (Admin)
- `deleteUser` - Delete user (Admin)
- `updateProfile` - Update own profile
- `toggleUserStatus` - Activate/deactivate user

### 🔋 Charge Stations
- `getStations` - Get all stations
- `getStationById` - Get station by ID
- `registerStation` - Register station (Admin)
- `updateStationStatus` - Update station status
- `updateStation` - Update station (Admin)
- `deleteStation` - Delete station (Admin)
- `getStationStats` - Get station statistics
- `searchNearbyStations` - Search nearby stations
- `sendHeartbeat` - Send station heartbeat

### 💰 Wallet & Transactions
- `getWalletBalance` - Get wallet balance
- `getTransactions` - Get transaction history
- `getTransactionById` - Get transaction by ID
- `createPaymentIntent` - Create payment intent
- `processChargingPayment` - Process charging payment
- `getAdminTransactions` - Get all transactions (Admin)
- `adjustUserBalance` - Adjust user balance (Admin)
- `processRefund` - Process refund (Admin)
- `getWalletStats` - Get wallet statistics
- `getAdminUserBalance` - Get user balance (Admin)

## 📋 TypeScript Types

### Domain Types
```typescript
import type {
  User, UserRole,
  ChargeStation, StationStatus, ConnectorType,
  PLNTransaction, TransactionType, TransactionStatus,
  WalletBalance, PLNAmount,
  AdminDashboardStats, SystemHealthStatus
} from '@evc-unified/shared-api';
```

### Request/Response Types
```typescript
import type {
  ApiSuccessResponse, ApiErrorResponse,
  PaginatedResponse, Pagination,
  UserLoginRequest, UserRegistrationRequest,
  StationRegistrationRequest, StatusUpdateRequest,
  CreatePaymentIntentRequest, ProcessChargingPaymentRequest
} from '@evc-unified/shared-api';
```

## 🔧 Configuration

### Custom API Instance
```typescript
import { createEVChargingApi } from '@evc-unified/shared-api';

const customApi = createEVChargingApi({
  baseUrl: process.env.REACT_APP_API_URL,
  getToken: () => getCustomToken(),
  onAuthError: () => handleCustomAuthError(),
});
```

### Platform Helpers

#### Web Helpers
```typescript
import { webApiHelpers } from '@evc-unified/shared-api';

// Token management
webApiHelpers.setAuthToken('your-token');
webApiHelpers.clearAuthToken();
const token = webApiHelpers.getAuthToken();
const isAuth = webApiHelpers.isAuthenticated();
```

#### Mobile Helpers
```typescript
import { createMobileApiHelpers } from '@evc-unified/shared-api';

const helpers = createMobileApiHelpers(AsyncStorage);

// Async token management
await helpers.setAuthToken('your-token');
await helpers.clearAuthToken();
const token = await helpers.getAuthToken();
const isAuth = await helpers.isAuthenticated();
```

## 🚨 Error Handling

```typescript
import { handleApiError } from '@evc-unified/shared-api';

try {
  const result = await api.login(credentials).unwrap();
} catch (error) {
  const { message, code, details } = handleApiError(error);
  console.error(`Error ${code}: ${message}`, details);
}
```

## 📊 Cache Management

The API automatically handles cache invalidation using RTK Query tags:

- `Station` - Charge station data
- `User` - User data  
- `Transaction` - Transaction data
- `Wallet` - Wallet data
- `Session` - Charging session data

## 🎨 Schema Compliance

All endpoints follow the comprehensive API schema system:
- Standard success/error response formats
- Consistent validation patterns
- Type-safe request/response structures
- Domain-driven design principles

## 🔄 Version

Current version: **2.0.0**

Based on comprehensive schema system from `/schemas` folder with full compliance to:
- OpenAPI specifications
- Domain entity interfaces  
- Cross-platform compatibility
- Type safety requirements
