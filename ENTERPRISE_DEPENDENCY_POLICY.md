# 🏢 Enterprise Dependency Management Policy

## 📋 Overview
This document defines the enterprise-level dependency management strategy for the EV Charging Platform monorepo.

## 🎯 Core Principles

### 1. **Centralized Core Dependencies**
- All framework dependencies (React, TypeScript, etc.) managed in root `package.json`
- Exact version pinning for consistency across teams
- Single source of truth for critical dependencies

### 2. **Tiered Architecture**
```
ROOT LEVEL
├── Core Framework (React, TypeScript, ESLint)
├── Build Tools (Nx, Metro, Webpack)
└── Shared Dev Dependencies

APP LEVEL  
├── App-specific libraries
├── UI frameworks (Next.js, Expo)
└── App-specific configurations

PACKAGE LEVEL
├── Package-specific utilities
├── peerDependencies for frameworks
└── Minimal direct dependencies
```

## 📚 Dependency Categories

### 🔥 **Tier 1: Root Dependencies (Centralized)**
These MUST be managed in root package.json:

```json
{
  "dependencies": {
    "react": "19.1.0",
    "react-dom": "19.1.0", 
    "react-native": "0.79.5",
    "expo": "~53.0.0"
  },
  "devDependencies": {
    "typescript": "5.8.3",
    "@types/react": "19.1.0",
    "@types/react-dom": "19.1.0",
    "eslint": "9.25.1",
    "prettier": "3.2.5",
    "@typescript-eslint/parser": "8.15.0",
    "@typescript-eslint/eslint-plugin": "8.15.0",
    "nx": "21.2.1"
  }
}
```

### ⚡ **Tier 2: App Dependencies (Localized)**
App-specific dependencies stay in apps/*/package.json:

```json
{
  "dependencies": {
    // App Framework
    "next": "15.3.4",           // Next.js apps only
    "expo": "~53.0.0",          // Mobile apps only
    
    // App UI Libraries
    "@headlessui/react": "^2.2.4",
    "@heroicons/react": "^2.2.0",
    "lucide-react": "^0.525.0",
    
    // App State Management
    "@reduxjs/toolkit": "^2.8.2",
    "react-redux": "^9.2.0"
  }
}
```

### 🔧 **Tier 3: Package Dependencies (Minimal)**
Packages should have minimal dependencies:

```json
{
  "peerDependencies": {
    "react": ">=19.0.0",
    "typescript": ">=5.8.0"
  },
  "dependencies": {
    // Only package-specific utilities
    "lodash": "^4.17.21"
  }
}
```

## 📐 Version Management Rules

### ✅ **Root Level - Exact Versions**
```json
{
  "react": "19.1.0",           // ✅ Exact version
  "typescript": "5.8.3"       // ✅ Exact version
}
```

### ✅ **App Level - Caret Ranges**
```json
{
  "next": "^15.3.4",          // ✅ Allow patch updates
  "@headlessui/react": "^2.2.4"
}
```

### ✅ **Package Level - Peer Dependencies**
```json
{
  "peerDependencies": {
    "react": ">=19.0.0",      // ✅ Minimum version requirement
    "typescript": ">=5.8.0"
  }
}
```

## 🚀 Implementation Strategy

### Phase 1: Core Centralization
1. Move React, TypeScript, ESLint to root
2. Remove duplicates from sub-packages
3. Update workspace configuration

### Phase 2: App Optimization  
1. Keep app-specific deps in apps
2. Remove framework deps from apps
3. Use workspace: protocol

### Phase 3: Package Cleanup
1. Convert to peerDependencies
2. Minimize direct dependencies
3. Test compatibility

## 📋 Workspace Configuration

```json
{
  "workspaces": [
    "apps/*",
    "packages/shared/*",
    "packages/ui/*",
    "packages/design/*"
  ],
  "resolutions": {
    "react": "19.1.0",
    "typescript": "5.8.3"
  }
}
```

## 🔍 Quality Gates

### Pre-commit Checks
- [ ] No duplicate dependencies across packages
- [ ] Core deps only in root
- [ ] App deps follow tier rules
- [ ] Version consistency verified

### CI/CD Pipeline
- [ ] Dependency audit on every PR
- [ ] Version drift detection
- [ ] Security vulnerability scanning
- [ ] License compliance check

## 📊 Benefits

### 🎯 **Consistency**
- Single React version across all apps
- Unified TypeScript configuration
- Consistent build tools

### ⚡ **Performance**  
- Reduced bundle duplication
- Faster installs with hoisting
- Optimized CI/CD builds

### 🔒 **Security**
- Centralized security updates
- Easier vulnerability management
- Single dependency audit

### 🛠 **Maintenance**
- Simplified upgrades
- Reduced configuration drift
- Clear ownership model

## 📞 Team Guidelines

### For App Developers
- ✅ Add app-specific deps to your app package.json
- ❌ Never add React/TypeScript to app package.json
- ✅ Use workspace: protocol for internal packages

### For Package Developers  
- ✅ Use peerDependencies for frameworks
- ❌ Avoid direct React dependencies
- ✅ Keep dependencies minimal

### For DevOps/Platform Team
- ✅ Manage root dependencies
- ✅ Coordinate major upgrades
- ✅ Monitor dependency drift

---

**Last Updated:** 2025-01-28  
**Owner:** Platform Engineering Team  
**Review Cycle:** Quarterly 