# 📱 **EXPO MIGRATION PLAN** - EV Charging Admin Mobile

**React Native + Expo 52 Development Roadmap with Detailed Action Items**

---

## 🎯 **OVERVIEW**

Bu doküman Expo 52 tabanlı React Native geliştirme sürecinin detaylı planını içerir. **Web-Admin'den mobile platform'a %90 kod paylaşımı** ile migration stratejisi.

### **🚀 Project Goals**
- **Target Completion**: 16 hafta (4 ay)
- **Code Sharing**: %90+ (Business logic %95, UI %85)
- **Performance**: 60 FPS real-time data + <2s startup
- **Platform Coverage**: iOS 15+ & Android 7+ (API 24+)
- **Bundle Size**: <25MB optimized with Hermes

---

## 📊 **CURRENT STATUS (Updated January 2025)**

### **✅ Completed Phases**
- **Phase 1**: Nx Monorepo Foundation (100%)
- **Phase 2**: Shared API Architecture (95%)
- **Phase 3**: Schema Synchronization (100%)

### **🔄 In Progress**
- **Phase 3.1**: Web-Admin Integration (70% complete)
  - **Critical Issues**: 83/153 TypeScript errors fixed
  - **Blocker**: Store integration, hook exports, config issues

### **⏳ Next Phases**
- **Phase 4**: Expo Foundation Setup (Week 6-8)
- **Phase 5**: Feature Parity Development (Week 9-12)
- **Phase 6**: Production Optimization (Week 13-15)
- **Phase 7**: App Store Deployment (Week 16)

---

## 🔴 **PHASE 3.1: WEB-ADMIN INTEGRATION** (Week 5 - CRITICAL)

> **MUST COMPLETE BEFORE Expo Development** - TypeScript errors blocking shared-api usage

### **Critical Action Items (This Week)**

#### **1. Store Integration Fix**
```bash
# File: apps/web-admin/src/app/store/store.ts
cd apps/web-admin/src/app/store/

# CURRENT ISSUE: evChargingApi missing Redux properties
# SOLUTION: Import complete API instance from shared-api
```

**Required Changes:**
```typescript
// BEFORE (broken)
import { evChargingApi } from '../../shared/api/evChargingApi';

// AFTER (fixed)
import { createWebApi } from '@evc-unified/shared-api';

const api = createWebApi({
  baseUrl: process.env.REACT_APP_API_URL,
  getToken: () => localStorage.getItem('authToken'),
  onAuthError: () => {
    localStorage.clear();
    window.location.href = '/login';
  }
});

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer, // ✅ Now has reducerPath
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware), // ✅ Now has middleware
});
```

#### **2. Hook Exports Fix**
```bash
# File: shared-api/src/index.ts
cd shared-api/src/

# CURRENT ISSUE: RTK Query hooks not exported
# SOLUTION: Export auto-generated hooks
```

**Required Changes:**
```typescript
// Add to shared-api/src/index.ts
export {
  // RTK Query auto-generated hooks
  useLoginMutation,
  useRegisterMutation,
  useGetCurrentUserQuery,
  useLogoutMutation,
  useGetStationsQuery,
  useUpdateStationStatusMutation,
  useStartSessionMutation,
  useStopSessionMutation,
  useGetWalletBalanceQuery,
  useGetTransactionsQuery,
  // ... all other hooks
} from './lib/evChargingApi.js';
```

#### **3. TypeScript Config Fix**
```bash
# File: apps/web-admin/tsconfig.app.json
# CURRENT ISSUE: emitDeclarationOnly without declaration
```

**Required Changes:**
```json
{
  "extends": "./tsconfig.json", 
  "compilerOptions": {
    "declaration": true,
    "emitDeclarationOnly": false,
    "outDir": "../../dist/apps/web-admin"
  }
}
```

#### **4. Validation Commands**
```bash
# Target: 0 TypeScript errors
npx nx run web-admin:typecheck
npx nx run web-admin:build
npx nx run shared-api:build

# Success criteria
echo "✅ 0 TypeScript errors"
echo "✅ Web-admin builds successfully" 
echo "✅ All shared-api hooks accessible"
```

**🎯 Deadline**: Week 5 end (Critical for Expo development)

---

## 🟡 **PHASE 4: EXPO FOUNDATION** (Week 6-8)

### **Week 6: Core Expo Setup** 📱

#### **Day 1-2: Expo CLI & EAS Setup**
```bash
# Install global tools
npm install -g @expo/cli@latest eas-cli@latest

# Verify Expo setup
cd apps/mobile-admin
expo --version  # Should be 0.21.8+
eas --version   # Should be latest

# Initialize EAS
eas login
eas init --id your-expo-project-id
```

#### **Day 3-4: Tamagui Complete Integration**
```bash
# Install Tamagui for React Native
expo install @tamagui/core @tamagui/config @tamagui/animations-react-native
expo install @tamagui/font-inter @tamagui/shorthands @tamagui/themes

# Configuration files needed:
# - tamagui.config.ts
# - babel.config.js (Tamagui plugin)
# - metro.config.js (SVG transformer)
```

**tamagui.config.ts:**
```typescript
import { config } from '@tamagui/config/v3'
import { createTamagui } from '@tamagui/core'

const appConfig = createTamagui(config)
export type Conf = typeof appConfig
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}
export default appConfig
```

#### **Day 5-7: Navigation & Platform Detection**
```bash
# React Navigation v7 setup
expo install @react-navigation/native @react-navigation/stack
expo install react-native-screens react-native-safe-area-context
expo install react-native-gesture-handler

# Platform detection enhancement
# Update shared-ui/src/lib/platform/PlatformDetector.ts
```

**Navigation Structure:**
```typescript
// Apps/mobile-admin/src/navigation/AppNavigator.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Stations" component={StationsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### **Week 7: Shared Components Migration** 🔄

#### **Universal Button Implementation**
```typescript
// shared-ui/src/lib/UniversalButton.tsx (Web)
import { Button as TamaguiButton } from '@tamagui/core';

// shared-ui/src/lib/UniversalButton.native.tsx (Mobile)
import { Button as TamaguiButton } from '@tamagui/core';

// Same API, platform-optimized implementation
export const UniversalButton = ({ title, onPress, variant = 'primary' }) => {
  return (
    <TamaguiButton
      onPress={onPress}
      backgroundColor={variant === 'primary' ? '$blue10' : '$gray8'}
      pressStyle={{ scale: 0.97 }}
      animation="bouncy"
    >
      {title}
    </TamaguiButton>
  );
};
```

### **Week 8: Shared API Mobile Integration** 🔗

#### **AsyncStorage Authentication Setup**
```typescript
// apps/mobile-admin/src/services/mobileApi.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMobileApi, createMobileApiHelpers } from '@evc-unified/shared-api';

export const api = createMobileApi({
  baseUrl: process.env.EXPO_PUBLIC_API_URL || 'https://api.evcharge.com/v1',
  AsyncStorage,
  onAuthError: () => {
    // Navigate to login screen
    navigation.navigate('Login');
  },
});

export const { setAuthToken, clearAuthToken, isAuthenticated } = 
  createMobileApiHelpers(AsyncStorage);
```

**🎯 Week 8 Success Criteria:**
- ✅ Native apps running on iOS/Android simulators
- ✅ Shared API working with AsyncStorage
- ✅ Basic navigation functional
- ✅ Tamagui components rendering correctly

---

## 🟢 **PHASE 5: FEATURE PARITY** (Week 9-12)

### **Week 9-10: Authentication & Core Features** 🔐

#### **Login/Register Screens (Tamagui)**
```typescript
// apps/mobile-admin/src/screens/LoginScreen.tsx
import { YStack, XStack, Input, Button, Text } from '@tamagui/core';
import { useLoginMutation } from '@evc-unified/shared-api';

export function LoginScreen({ navigation }) {
  const [login, { isLoading }] = useLoginMutation();
  
  return (
    <YStack padding="$4" space="$4" backgroundColor="$background">
      <Text fontSize="$8" fontWeight="bold">EV Admin Mobile</Text>
      
      <Input
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <Input
        placeholder="Password"
        secureTextEntry
      />
      
      <Button
        onPress={handleLogin}
        backgroundColor="$blue10"
        disabled={isLoading}
        animation="bouncy"
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>
    </YStack>
  );
}
```

#### **Biometric Authentication (Expo)**
```bash
# Install Expo LocalAuthentication
expo install expo-local-authentication

# Implementation
import * as LocalAuthentication from 'expo-local-authentication';

const authenticateWithBiometrics = async () => {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  if (hasHardware) {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate to access EV Admin',
      biometryType: LocalAuthentication.AuthenticationType.FINGERPRINT,
    });
    return result.success;
  }
  return false;
};
```

#### **Station Management Mobile** 🏢
```typescript
// apps/mobile-admin/src/screens/StationsScreen.tsx
import { FlatList } from 'react-native';
import { YStack, Card, Text, Circle } from '@tamagui/core';
import { useGetStationsQuery } from '@evc-unified/shared-api';

export function StationsScreen() {
  const { data: stations, isLoading } = useGetStationsQuery();
  
  return (
    <YStack flex={1} padding="$2">
      <FlatList
        data={stations}
        renderItem={({ item: station }) => (
          <Card margin="$2" padding="$3">
            <XStack space="$3" alignItems="center">
              <Circle
                size="$2"
                backgroundColor={station.status === 'available' ? '$green9' : '$red9'}
              />
              <YStack flex={1}>
                <Text fontWeight="bold">{station.name}</Text>
                <Text color="$gray10">{station.location}</Text>
                <Text fontSize="$2">{station.powerOutput}kW • ₺{station.pricePerKwh}/kWh</Text>
              </YStack>
            </XStack>
          </Card>
        )}
        refreshing={isLoading}
        onRefresh={() => refetch()}
      />
    </YStack>
  );
}
```

### **Week 11-12: Advanced Features** ⚡

#### **Real-time Data (WebSocket Mobile)**
```typescript
// apps/mobile-admin/src/hooks/useRealtimeData.ts
import { useEffect } from 'react';
import { AppState } from 'react-native';

export function useRealtimeData() {
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'active') {
        // Reconnect WebSocket when app comes to foreground
        connectWebSocket();
      } else if (nextAppState === 'background') {
        // Disconnect to save battery
        disconnectWebSocket();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription?.remove();
  }, []);
}
```

#### **Map Integration (Expo)**
```bash
# Install react-native-maps via Expo
expo install react-native-maps

# iOS: Add to app.json
"ios": {
  "infoPlist": {
    "NSLocationWhenInUseUsageDescription": "This app uses location to show nearby charging stations."
  }
}

# Android: Add to app.json  
"android": {
  "permissions": ["ACCESS_FINE_LOCATION"]
}
```

**Map Implementation:**
```typescript
// apps/mobile-admin/src/components/StationMap.tsx
import MapView, { Marker } from 'react-native-maps';

export function StationMap({ stations }) {
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 41.0082,
        longitude: 28.9784, // Istanbul center
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
    >
      {stations.map((station) => (
        <Marker
          key={station.id}
          coordinate={{
            latitude: station.latitude,
            longitude: station.longitude,
          }}
          title={station.name}
          description={`${station.powerOutput}kW • ${station.status}`}
          pinColor={station.status === 'available' ? 'green' : 'red'}
        />
      ))}
    </MapView>
  );
}
```

#### **Push Notifications (Expo)**
```bash
# Install Expo Notifications
expo install expo-notifications expo-device

# Configure notifications
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Usage for charging session alerts
const sendChargingAlert = async (sessionId, message) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Charging Session Update',
      body: message,
      data: { sessionId },
    },
    trigger: null, // Send immediately
  });
};
```

**🎯 Week 12 Success Criteria:**
- ✅ Complete authentication flow (biometric included)
- ✅ Station management with map integration
- ✅ Real-time data updates (background/foreground)
- ✅ Push notifications functional
- ✅ 85%+ visual parity with web admin achieved

---

## 🔵 **PHASE 6: EXPO OPTIMIZATIONS** (Week 13-15)

### **Week 13: EAS Build & Distribution** 🚀

#### **EAS Configuration Setup**
```bash
# Initialize EAS configuration
eas build:configure

# Creates eas.json with optimized profiles
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": { "simulator": true },
      "android": { "buildType": "apk" }
    },
    "preview": {
      "distribution": "internal", 
      "ios": { "simulator": false },
      "android": { "buildType": "apk" }
    },
    "production": {
      "ios": { "buildType": "ipa" },
      "android": { "buildType": "app-bundle" }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-apple-id@email.com",
        "ascAppId": "app-store-connect-app-id",
        "appleTeamId": "your-team-id"
      },
      "android": {
        "serviceAccountKeyPath": "path/to/service-account.json",
        "track": "internal"
      }
    }
  }
}
```

#### **OTA Updates Configuration**
```bash
# Setup OTA updates
eas update:configure

# Creates branches for different environments
eas branch:create development
eas branch:create staging  
eas branch:create production

# Deploy updates
eas update --branch production --message "Bug fixes and performance improvements"
```

#### **App Store Connect & Play Console Setup**
```bash
# iOS App Store preparation
# 1. Create app in App Store Connect
# 2. Setup certificates and provisioning profiles
# 3. Configure app metadata, screenshots, descriptions

# Android Play Console preparation  
# 1. Create app in Play Console
# 2. Generate upload key
# 3. Setup app signing and metadata
```

### **Week 14: Performance Optimization** ⚡

#### **Hermes Engine Optimization**
```javascript
// metro.config.js - Hermes specific optimizations
module.exports = {
  transformer: {
    hermesParser: true, // Use Hermes parser for better performance
    minifierConfig: {
      mangle: {
        keep_fnames: true, // Keep function names for debugging
      },
    },
  },
};

// app.json - Enable Hermes
"expo": {
  "jsEngine": "hermes",
  "android": {
    "jsEngine": "hermes" 
  },
  "ios": {
    "jsEngine": "hermes"
  }
}
```

#### **Bundle Size Optimization**
```bash
# Analyze bundle size
npx react-native-bundle-visualizer

# Tree shaking optimization
# 1. Use import { specific } from 'library' instead of import * 
# 2. Configure Tamagui for compile-time optimization
# 3. Remove unused dependencies

# Expected results:
# - Bundle size: <25MB (target)
# - Startup time: <2 seconds
# - Memory usage: <100MB
```

#### **Real-time Performance Tuning**
```typescript
// WebSocket optimization for mobile
import { AppState } from 'react-native';

class MobileWebSocketManager {
  private reconnectInterval: number = 1000;
  private maxReconnectAttempts: number = 5;
  
  constructor() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }
  
  handleAppStateChange = (nextAppState: string) => {
    if (nextAppState === 'background') {
      // Reduce update frequency in background
      this.setUpdateInterval(30000); // 30 seconds
    } else if (nextAppState === 'active') {
      // Resume normal frequency
      this.setUpdateInterval(5000); // 5 seconds
    }
  };
  
  // Battery-optimized real-time updates
  private setUpdateInterval(interval: number) {
    // Implementation for dynamic update frequency
  }
}
```

### **Week 15: Testing & QA** 🧪

#### **Detox E2E Testing Setup**
```bash
# Install Detox for E2E testing
npm install --save-dev detox @config-plugins/detox

# Configure Detox
npx detox init

# Test scenarios
# 1. Login flow
# 2. Station list navigation
# 3. Real-time data updates
# 4. Offline behavior
# 5. Background/foreground transitions
```

#### **Physical Device Testing**
```bash
# Create development builds for testing
eas build --profile development --platform ios
eas build --profile development --platform android

# Install on devices for testing
# 1. iPhone 12+ (iOS 15+)
# 2. Samsung Galaxy S21+ (Android 10+) 
# 3. OnePlus 8 (Android 11+)

# Test scenarios:
# - Network connectivity changes
# - Background app refresh
# - Push notifications
# - Biometric authentication
# - Memory management
```

#### **Performance Monitoring**
```typescript
// Performance monitoring with Expo
import * as TaskManager from 'expo-task-manager';

// Monitor key metrics
const monitorPerformance = () => {
  // 1. App startup time
  // 2. API response times
  // 3. Memory usage
  // 4. Battery consumption
  // 5. Network usage
};

// Crash reporting setup
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'your-sentry-dsn',
});
```

**🎯 Week 15 Success Criteria:**
- ✅ EAS builds successful for iOS/Android
- ✅ Performance targets met (60 FPS, <2s startup)
- ✅ E2E tests passing on multiple devices
- ✅ OTA updates working smoothly
- ✅ Memory leaks resolved

---

## ⚡ **PHASE 7: PRODUCTION DEPLOYMENT** (Week 16)

### **App Store Submission** 📱

#### **iOS App Store**
```bash
# Final production build
eas build --platform ios --profile production

# Submit to App Store
eas submit --platform ios --latest

# App Store Review preparation:
# 1. App metadata complete
# 2. Screenshots for all devices (iPhone, iPad)
# 3. App description in Turkish & English
# 4. Privacy policy and terms of service
# 5. Age rating configuration
```

#### **Android Play Store**
```bash
# Final production build  
eas build --platform android --profile production

# Submit to Play Store
eas submit --platform android --latest

# Play Console preparation:
# 1. App metadata and descriptions
# 2. Screenshots for phones and tablets
# 3. Feature graphic and icon
# 4. Content rating questionnaire
# 5. Privacy policy compliance
```

### **Production Infrastructure**

#### **OTA Update Strategy**
```bash
# Production update workflow
eas update --branch production --message "Post-launch hotfixes"

# Rollback strategy if needed
eas update:rollback --branch production

# A/B testing for features
eas update --branch production-a --message "Feature A test"
eas update --branch production-b --message "Feature B test"
```

#### **Monitoring & Analytics**
```typescript
// Production monitoring setup
import { Analytics } from 'expo-analytics';
import * as Sentry from '@sentry/react-native';

// Key metrics to track:
// 1. App opens and session duration
// 2. Feature usage (station management, sessions)
// 3. API error rates
// 4. Crash reports and performance issues
// 5. User retention and engagement
```

### **Documentation & Handover**

#### **Technical Documentation**
```markdown
# Create comprehensive docs:
# 1. API integration guide
# 2. Component library documentation  
# 3. Build and deployment guide
# 4. Troubleshooting and FAQ
# 5. Performance optimization guide
```

#### **User Documentation**
```markdown
# Create user guides:
# 1. Admin mobile app user manual
# 2. Feature comparison (web vs mobile)
# 3. Troubleshooting guide for admins
# 4. Video tutorials for key workflows
```

**🎯 Week 16 Success Criteria:**
- ✅ Apps live on App Store and Play Store
- ✅ Production monitoring active
- ✅ OTA update pipeline working
- ✅ Documentation complete
- ✅ Support processes established

---

## 📊 **SUCCESS METRICS & KPIs**

### **Technical Performance**
| Metric | Target | Measurement |
|--------|--------|-------------|
| Code Sharing | 90%+ | Shared logic vs platform-specific |
| Bundle Size | <25MB | EAS build analysis |
| Startup Time | <2 seconds | Performance monitoring |
| Frame Rate | 60 FPS | React DevTools Profiler |
| Memory Usage | <100MB | Xcode/Android Studio |
| API Response | <500ms | Network monitoring |

### **Development Efficiency**
| Metric | Target | Current |
|--------|--------|---------|
| Build Time | <3 min | With EAS caching |
| Hot Reload | <2 sec | Expo dev server |
| TypeScript Errors | 0 | Currently: 70 remaining |
| Test Coverage | >80% | Jest + Detox |
| Deploy Time | <10 min | EAS OTA updates |

### **Business Impact**
| Metric | Target | Timeline |
|--------|--------|----------|
| Visual Parity | 85-90% | Week 12 |
| Feature Parity | 95% | Week 14 |
| Admin Adoption | 80% | Week 18 |
| Performance Satisfaction | >90% | Week 20 |

---

## 🚨 **RISK MITIGATION**

### **Technical Risks**
1. **Expo Limitations**
   - **Risk**: Some native features not available
   - **Mitigation**: Use Expo dev builds for custom native code
   - **Fallback**: Eject to bare React Native if needed

2. **Performance Issues**
   - **Risk**: 60 FPS not achievable with complex lists
   - **Mitigation**: Implement FlatList optimizations, lazy loading
   - **Fallback**: Native list components if needed

3. **Bundle Size Exceeded**
   - **Risk**: >25MB app size
   - **Mitigation**: Dynamic imports, asset optimization
   - **Fallback**: Remove non-essential features

### **Timeline Risks**
1. **Phase 3.1 Delays**
   - **Risk**: TypeScript errors not resolved in time
   - **Mitigation**: Parallel work on mobile setup
   - **Fallback**: Use shared-api dev build temporarily

2. **App Store Review Delays**
   - **Risk**: App Store rejection
   - **Mitigation**: TestFlight beta testing, compliance review
   - **Fallback**: OTA updates for critical fixes

### **Resource Risks**
1. **Development Capacity**
   - **Risk**: Single developer bottleneck
   - **Mitigation**: Clear documentation, modular development
   - **Fallback**: External contractor support

---

## 📞 **SUPPORT & ESCALATION**

### **Technical Support**
- **Expo Support**: https://expo.dev/support
- **React Native Community**: https://reactnative.dev/community
- **Tamagui Discord**: https://discord.gg/tamagui

### **Escalation Path**
1. **Level 1**: Documentation and community forums
2. **Level 2**: Expo support tickets
3. **Level 3**: Commercial support if needed

---

**🎯 Bu plan hafızamdaki bilgiler ve mevcut proje durumu baz alınarak oluşturulmuştur. Phase 3.1'i tamamlamak kritik önceliğe sahiptir!**

---

## 🚨 **IMMEDIATE NEXT STEPS (Next 7 Days)**

### **Day 1-2: Critical Bug Fixes**
```bash
# 1. Fix store integration
cd apps/web-admin/src/app/store/
# Edit store.ts - import correct API instance

# 2. Fix shared-api exports  
cd shared-api/src/
# Edit index.ts - export RTK Query hooks

# 3. TypeScript config fix
# Fix tsconfig.app.json emitDeclarationOnly issue
```

### **Day 3-4: Integration Testing**
```bash
# 1. Build test
npx nx run web-admin:build

# 2. Type check
npx nx run web-admin:typecheck  

# 3. Functional test
npm run dev # Test login, station management
```

### **Day 5-7: Mobile Foundation Prep**
```bash
# 1. Tamagui mobile setup
cd apps/mobile-admin

# 2. Navigation setup
# Install @react-navigation/native v7

# 3. First mobile build
npm run ios # Test on simulator
```

---

**🎯 Bu plan hafızamdaki bilgiler ve mevcut proje durumu baz alınarak oluşturulmuştur. Phase 3.1'i tamamlamak kritik önceliğe sahiptir!** 