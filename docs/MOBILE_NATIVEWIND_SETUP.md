# Mobile NativeWind Setup - Monorepo Configuration

## Overview
This document outlines the complete setup of NativeWind in the enterprise mobile app within an Nx monorepo environment.

## Configuration Files

### 1. Package.json
```json
{
  "name": "@evc/enterprise-mobile",
  "dependencies": {
    "expo": "~53.0.0",
    "expo-status-bar": "~2.2.3",
    "nativewind": "^4.1.23",
    "react": "19.0.0",
    "react-native": "0.79.5",
    "react-native-svg": "~15.11.2",
    "tailwindcss": "^3.4.0"
  }
}
```

### 2. Tailwind Config (tailwind.config.js)
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './app/**/*.{js,ts,tsx}',
    './src/**/*.{js,ts,tsx}',
    // Include shared packages from monorepo
    '../../packages/shared/**/*.{js,ts,tsx}',
    '../../packages/ui/**/*.{js,ts,tsx}',
    '../../packages/design/**/*.{js,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### 3. Metro Config (metro.config.js)
```javascript
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

// Get the default Expo Metro config
const config = getDefaultConfig(__dirname);

// Configure for monorepo
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

// Watch all files within the monorepo
config.watchFolders = [workspaceRoot];

// Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
config.resolver.disableHierarchicalLookup = true;

module.exports = withNativeWind(config, { input: './global.css' });
```

### 4. Babel Config (babel.config.js)
```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
    ],
    plugins: [
      "nativewind/babel",
      "react-native-reanimated/plugin",
    ],
  };
};
```

### 5. TypeScript Config (tsconfig.json)
```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "~/*": ["src/*"]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts",
    "nativewind.d.ts"
  ]
}
```

### 6. NativeWind Types (nativewind.d.ts)
```typescript
/// <reference types="nativewind/types" />
```

### 7. Global CSS (global.css)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Nx Integration

### Project Configuration (project.json)
```json
{
  "name": "@evc/enterprise-mobile",
  "projectType": "application",
  "tags": ["type:app", "platform:mobile"],
  "targets": {
    "start": {
      "executor": "@nx/expo:start",
      "options": { "port": 8081 }
    },
    "run-ios": {
      "executor": "@nx/expo:run",
      "options": { "platform": "ios" }
    },
    "run-android": {
      "executor": "@nx/expo:run",
      "options": { "platform": "android" }
    }
  }
}
```

## Usage Examples

### Basic Component with NativeWind
```tsx
import React from 'react';
import { View, Text } from 'react-native';

export const ExampleComponent = () => {
  return (
    <View className="flex-1 bg-blue-50 justify-center items-center p-4">
      <View className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <Text className="text-2xl font-bold text-gray-900 text-center mb-4">
          Welcome
        </Text>
        <View className="bg-blue-500 rounded-md p-3">
          <Text className="text-white text-center font-semibold">
            NativeWind is working!
          </Text>
        </View>
      </View>
    </View>
  );
};
```

## Commands

### Development
```bash
# Start the mobile app
npm run mobile:start
# or
nx start @evc/enterprise-mobile

# Run on iOS
npm run mobile:ios
# or
nx run-ios @evc/enterprise-mobile

# Run on Android
npm run mobile:android
# or
nx run-android @evc/enterprise-mobile
```

### Testing
```bash
# Run tests
nx test @evc/enterprise-mobile

# Run linting
nx lint @evc/enterprise-mobile
```

## Key Features

1. **Monorepo Support**: Configured to work with shared packages
2. **Hot Reloading**: Changes to CSS and components update instantly
3. **TypeScript Support**: Full type safety with NativeWind
4. **Expo Integration**: Works seamlessly with Expo development workflow
5. **Shared Design System**: Can use design tokens from shared packages

## Troubleshooting

### Common Issues

1. **Styles not applying**: Clear Metro cache with `--clear` flag
2. **Module resolution errors**: Check `nodeModulesPaths` in metro.config.js
3. **TypeScript errors**: Ensure `nativewind.d.ts` is included in tsconfig.json

### Cache Clearing
```bash
# Clear Metro cache
nx start @evc/enterprise-mobile --clear

# Clear npm cache
npm start -- --reset-cache
```

## Next Steps

1. Create shared design tokens package
2. Implement responsive design utilities
3. Add custom Tailwind plugins for mobile-specific needs
4. Set up automated testing for styled components