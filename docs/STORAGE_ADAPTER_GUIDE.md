# 🔒 Storage Adapter Guide

This guide explains how to use the unified storage adapter system across web and mobile platforms.

## 🎯 Overview

The storage adapter system provides a unified interface for storing authentication data and other persistent data across platforms:

- **Web**: Uses `localStorage` with SSR safety
- **Mobile**: Uses `AsyncStorage` for React Native
- **Universal**: Auto-detects platform and uses appropriate storage

## 📦 Features

- ✅ **TTL Support**: Automatic expiration of stored items
- ✅ **SSR Safe**: Works with Next.js server-side rendering
- ✅ **Type Safe**: Full TypeScript support
- ✅ **Namespaced**: Prevents conflicts with other storage
- ✅ **Platform Agnostic**: Same API across web and mobile
- ✅ **Error Handling**: Graceful fallbacks for storage failures

## 🌐 Web Usage

### Basic Auth Storage (Recommended)

```typescript
// apps/admin-web/src/lib/utils/auth-storage.ts
import { authStorage } from '@/lib/utils/auth-storage';

// Set token (automatically expires in 7 days)
authStorage.setToken('your-jwt-token');

// Get token (returns null if expired)
const token = authStorage.getToken();

// Check if authenticated
const isAuth = authStorage.isAuthenticated();

// Clear all auth data
authStorage.clear();

// Store user data
authStorage.setUserData({ name: 'John', email: 'john@example.com' });

// Get user data
const userData = authStorage.getUserData();
```

### Advanced Web Storage

```typescript
// Using shared storage adapters (when package is configured)
import { createDefaultWebAuthStorage } from '@evc/shared-utils';

const webAuthStorage = createDefaultWebAuthStorage();

// All methods return synchronous values for web
webAuthStorage.setToken('token');
const token = webAuthStorage.getToken(); // string | null
const isAuth = webAuthStorage.isAuthenticated(); // boolean
```

### Direct localStorage with TTL

```typescript
// Direct usage of the localStorage helper
const localStorageHelper = {
  setItem(key: string, value: string, ttlDays: number = 7): void {
    const item = {
      value,
      timestamp: Date.now(),
      ttl: ttlDays * 24 * 60 * 60 * 1000,
    };
    localStorage.setItem(`evc_${key}`, JSON.stringify(item));
  },

  getItem(key: string): string | null {
    const storedData = localStorage.getItem(`evc_${key}`);
    if (!storedData) return null;

    const item = JSON.parse(storedData);
    
    // Check if expired
    if (item.ttl && Date.now() > item.timestamp + item.ttl) {
      localStorage.removeItem(`evc_${key}`);
      return null;
    }

    return item.value;
  }
};
```

## 📱 Mobile Usage

### Basic Setup

```typescript
// apps/admin-mobile/src/utils/auth-storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMobileAuthStorage } from './auth-storage';

// Create auth storage instance
const authStorage = createMobileAuthStorage(AsyncStorage);

// All methods are async for mobile
const useAuth = () => {
  const login = async (token: string) => {
    await authStorage.setToken(token);
  };

  const getToken = async () => {
    return await authStorage.getToken();
  };

  const isAuthenticated = async () => {
    return await authStorage.isAuthenticated();
  };

  const logout = async () => {
    await authStorage.clear();
  };

  return { login, getToken, isAuthenticated, logout };
};
```

### React Native Hooks

```typescript
// Custom hook for mobile auth
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMobileAuthStorage } from '@/utils/auth-storage';

const authStorage = createMobileAuthStorage(AsyncStorage);

export const useAuthStorage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const authenticated = await authStorage.isAuthenticated();
      setIsAuthenticated(authenticated);
    } catch (error) {
      console.error('Failed to check auth status:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (token: string) => {
    try {
      await authStorage.setToken(token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Failed to login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authStorage.clear();
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return {
    isAuthenticated,
    loading,
    login,
    logout,
    checkAuthStatus,
  };
};
```

## 🔄 Migration from Cookies

### Before (Cookie-based)

```typescript
// Old cookie implementation
document.cookie = `authToken=${token}; path=/; expires=${expiryDate.toUTCString()}`;

// Reading cookies
const cookies = document.cookie.split(';');
const authCookie = cookies.find(cookie => 
  cookie.trim().startsWith('authToken=')
);
```

### After (localStorage-based)

```typescript
// New localStorage implementation
authStorage.setToken(token); // Automatically handles TTL

// Reading token
const token = authStorage.getToken(); // Automatically checks TTL
```

## 🛠️ API Integration

### Web API Configuration

```typescript
// apps/admin-web/src/shared/api/evChargingApi.ts
import { createWebApi } from '@evc/shared-api';
import { authStorage } from '@/lib/utils/auth-storage';

const apiInstance = createWebApi({
  baseUrl: 'http://your-api-url',
  
  // Token is automatically sent in Authorization header
  getToken: () => {
    return authStorage.getToken();
  },

  onAuthError: () => {
    authStorage.clear();
    window.location.href = '/auth';
  },
});
```

### Mobile API Configuration

```typescript
// apps/admin-mobile/src/api/index.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMobileApi } from '@evc/shared-api';
import { createMobileAuthStorage } from '@/utils/auth-storage';

const authStorage = createMobileAuthStorage(AsyncStorage);

const apiInstance = createMobileApi({
  baseUrl: 'http://your-api-url',
  AsyncStorage,
  
  // Token retrieval is async for mobile
  getToken: async () => {
    return await authStorage.getToken();
  },

  onAuthError: async () => {
    await authStorage.clear();
    // Navigate to login screen
  },
});
```

## 🔒 Security Considerations

### TTL (Time To Live)

All tokens automatically expire after 7 days by default. You can customize this:

```typescript
// Web
authStorage.setToken(token); // 7 days default

// Mobile  
await authStorage.setToken(token); // 7 days default

// Custom TTL (if using direct storage helper)
localStorageHelper.setItem('token', token, 30); // 30 days
```

### Namespace Protection

All keys are automatically prefixed with `evc_` to prevent conflicts:

```typescript
// Storage key: 'authToken'
// Actual localStorage key: 'evc_authToken'
```

### Error Handling

Storage operations include comprehensive error handling:

```typescript
// Web - operations are silent with console warnings
authStorage.setToken(token); // Won't throw, but logs errors

// Mobile - operations can throw, handle appropriately
try {
  await authStorage.setToken(token);
} catch (error) {
  console.error('Failed to store token:', error);
  // Handle error appropriately
}
```

## 🎛️ Middleware Considerations

Since middleware runs server-side and can't access localStorage, authentication relies on the `Authorization` header:

```typescript
// apps/admin-web/middleware.ts
export function middleware(request: NextRequest) {
  // Primary: Check Authorization header (set by API calls)
  const authToken = request.headers.get('authorization')?.replace('Bearer ', '') ||
                   request.cookies.get('authToken')?.value; // Fallback

  if (!authToken) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }
}
```

## 📊 Storage Structure

### Stored Data Format

```typescript
// localStorage/AsyncStorage value structure
{
  "value": "actual-jwt-token-or-data",
  "timestamp": 1703123456789,
  "ttl": 604800000  // 7 days in milliseconds
}
```

### Keys Used

- `evc_authToken` - JWT authentication token
- `evc_userData` - User profile data
- `evc_*` - Any custom storage keys

## 🔧 Troubleshooting

### Common Issues

1. **SSR Hydration Mismatch**
   ```typescript
   // Always check if window is available
   if (typeof window !== 'undefined') {
     const token = authStorage.getToken();
   }
   ```

2. **Mobile AsyncStorage Not Found**
   ```bash
   npm install @react-native-async-storage/async-storage
   # For iOS
   cd ios && pod install
   ```

3. **Token Not Persisting**
   - Check TTL hasn't expired
   - Verify localStorage/AsyncStorage permissions
   - Check for storage quota limits

### Debug Mode

```typescript
// Enable storage debugging
localStorage.setItem('evc_debug', 'true');

// Or for mobile
await AsyncStorage.setItem('evc_debug', 'true');
```

## 📚 Next Steps

1. **Install AsyncStorage** for mobile apps
2. **Update middleware** to handle Authorization headers
3. **Migrate existing cookie usage** to localStorage
4. **Test SSR compatibility** with your Next.js setup
5. **Configure shared packages** for advanced features 