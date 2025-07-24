# 📱 Mobile Development Guide

> **Enterprise mobile app development with React Native 0.79, Expo 53, and NativeWind**

## Overview

The enterprise mobile application is built using the latest React Native 0.79.5 with Expo 53 and NativeWind for styling. This setup provides a modern, performant mobile development experience with Tailwind CSS styling that matches the web admin interface.

## Tech Stack

- **React Native**: 0.79.5 (Latest stable)
- **Expo**: ~53.0.0 (SDK 53)
- **React**: 19.0.0 (Latest)
- **NativeWind**: ^4.1.23 (Tailwind CSS for React Native)
- **Tailwind CSS**: ^3.4.0
- **React Native Reanimated**: ~3.17.4 (60fps animations)
- **React Native SVG**: ~15.11.2 (Latest)
- **TypeScript**: ~5.8.3

## Quick Start

### Prerequisites

```bash
# Install Expo CLI and EAS CLI
npm install -g @expo/cli eas-cli

# Verify installation
expo --version
eas --version
```

### Development Setup

```bash
# Navigate to mobile app
cd apps/enterprise-mobile

# Install dependencies (if not already done from root)
npm install

# Start development server
npm run start
# or
expo start

# Run on specific platforms
npm run ios      # iOS Simulator
npm run android  # Android Emulator
npm run web      # Web browser
```

### Device Testing

```bash
# Install Expo Go app on your device
# Scan QR code from terminal or use:
expo start --tunnel  # For testing on physical devices
```

## NativeWind Configuration

### Tailwind Configuration

The mobile app uses NativeWind v4 with the following configuration:

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Babel Configuration

```javascript
// babel.config.js
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

### Metro Configuration

```javascript
// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' });
```

### Global Styles

```css
/* global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### TypeScript Support

```typescript
// nativewind-env.d.ts
/// <reference types="nativewind/types" />
```

## Styling with NativeWind

### Basic Usage

NativeWind allows you to use Tailwind CSS classes directly in React Native components:

```typescript
import { View, Text } from 'react-native';

export default function MyComponent() {
  return (
    <View className="flex-1 bg-blue-500 items-center justify-center">
      <Text className="text-white text-xl font-bold">
        Hello NativeWind!
      </Text>
    </View>
  );
}
```

### Responsive Design

```typescript
<View className="w-full md:w-1/2 lg:w-1/3">
  <Text className="text-sm md:text-base lg:text-lg">
    Responsive text
  </Text>
</View>
```

### Dark Mode Support

```typescript
<View className="bg-white dark:bg-gray-900">
  <Text className="text-gray-900 dark:text-white">
    Dark mode text
  </Text>
</View>
```

### Custom Styling

For complex styles, you can still use StyleSheet:

```typescript
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  customShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

<View className="bg-white rounded-lg p-4" style={styles.customShadow}>
  <Text>Card with custom shadow</Text>
</View>
```

## Animation with Reanimated

The app includes React Native Reanimated v4 for smooth 60fps animations:

```typescript
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring 
} from 'react-native-reanimated';

export default function AnimatedComponent() {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(scale.value === 1 ? 1.2 : 1);
  };

  return (
    <Animated.View 
      className="w-20 h-20 bg-blue-500 rounded-full"
      style={animatedStyle}
      onTouchEnd={handlePress}
    />
  );
}
```

## Component Architecture

### Shared Design System

The mobile app shares design principles with the web admin using atomic design:

```typescript
// Atomic component example
const Button = ({ variant = 'primary', size = 'md', children, ...props }) => {
  const baseClasses = 'rounded-lg font-medium transition-colors';
  const variantClasses = {
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-gray-200 text-gray-900',
  };
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  };

  return (
    <Pressable 
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
      {...props}
    >
      <Text className="text-center">{children}</Text>
    </Pressable>
  );
};
```

### Screen Structure

```typescript
// Screen component example
import { SafeAreaView, ScrollView, View, Text } from 'react-native';

export default function DashboardScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View className="p-4">
          <Text className="text-2xl font-bold text-gray-900 mb-4">
            Dashboard
          </Text>
          
          {/* Stats Cards */}
          <View className="grid grid-cols-2 gap-4 mb-6">
            <StatCard title="Active Stations" value="156" />
            <StatCard title="Total Sessions" value="1,234" />
          </View>
          
          {/* Chart Section */}
          <View className="bg-white rounded-lg p-4 shadow-sm">
            <Text className="text-lg font-semibold mb-4">Usage Analytics</Text>
            {/* Chart component */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
```

## Development Workflow

### File Structure

```
apps/enterprise-mobile/
├── App.tsx                 # Main app component
├── app.json               # Expo configuration
├── babel.config.js        # Babel configuration
├── metro.config.js        # Metro bundler config
├── tailwind.config.js     # Tailwind CSS config
├── global.css             # Global styles
├── nativewind-env.d.ts    # TypeScript declarations
├── src/
│   ├── components/        # Reusable components
│   ├── screens/          # Screen components
│   ├── navigation/       # Navigation setup
│   ├── hooks/           # Custom hooks
│   ├── utils/           # Utility functions
│   └── types/           # TypeScript types
└── assets/              # Images, fonts, etc.
```

### Development Commands

```bash
# Development
npm run start           # Start Expo dev server
npm run ios            # Run on iOS simulator
npm run android        # Run on Android emulator
npm run web            # Run in web browser

# Building
expo build:ios         # Build for iOS
expo build:android     # Build for Android
eas build --platform all  # Build with EAS

# Publishing
expo publish           # Publish to Expo
eas submit            # Submit to app stores
```

### Hot Reloading

NativeWind supports hot reloading for Tailwind classes:

1. Save your file with new Tailwind classes
2. The app automatically reloads with new styles
3. No need to restart the development server

## Testing

### Unit Testing

```bash
# Install testing dependencies
npm install --save-dev jest @testing-library/react-native

# Run tests
npm test
```

### Component Testing

```typescript
import { render, screen } from '@testing-library/react-native';
import Button from '../Button';

describe('Button Component', () => {
  it('renders with correct styles', () => {
    render(<Button variant="primary">Test Button</Button>);
    
    const button = screen.getByText('Test Button');
    expect(button).toBeTruthy();
  });
});
```

## Performance Optimization

### Bundle Size

- NativeWind only includes used Tailwind classes
- Tree-shaking removes unused code
- Expo optimizes bundle for production builds

### Animation Performance

- Use React Native Reanimated for 60fps animations
- Avoid animating layout properties when possible
- Use `useNativeDriver: true` for transform animations

### Memory Management

```typescript
// Optimize images
import { Image } from 'expo-image';

<Image
  source={{ uri: 'https://example.com/image.jpg' }}
  className="w-full h-48"
  contentFit="cover"
  cachePolicy="memory-disk"
/>
```

## Deployment

### Development Builds

```bash
# Create development build
eas build --profile development --platform ios
eas build --profile development --platform android
```

### Production Builds

```bash
# Create production builds
eas build --profile production --platform all
```

### App Store Submission

```bash
# Submit to app stores
eas submit --platform ios
eas submit --platform android
```

## Troubleshooting

### Common Issues

#### Metro bundler issues
```bash
# Clear Metro cache
npx expo start --clear
```

#### NativeWind styles not applying
```bash
# Restart with cache clear
npx expo start --clear
# Check tailwind.config.js content paths
```

#### iOS build issues
```bash
# Clean iOS build
cd ios && xcodebuild clean
```

#### Android build issues
```bash
# Clean Android build
cd android && ./gradlew clean
```

### Debug Tools

- **Flipper**: React Native debugging
- **Expo Dev Tools**: Built-in debugging
- **React Native Debugger**: Standalone debugger

## Best Practices

### Code Organization

1. **Atomic Components**: Build reusable UI components
2. **Screen Components**: Keep screens focused and simple
3. **Custom Hooks**: Extract reusable logic
4. **Type Safety**: Use TypeScript for all components

### Styling Guidelines

1. **Consistent Spacing**: Use Tailwind spacing scale
2. **Color Palette**: Match web admin color scheme
3. **Typography**: Consistent font sizes and weights
4. **Responsive Design**: Consider different screen sizes

### Performance

1. **Lazy Loading**: Load screens and components on demand
2. **Image Optimization**: Use appropriate image formats and sizes
3. **State Management**: Keep state minimal and focused
4. **Memory Leaks**: Clean up subscriptions and timers

## Resources

- **[Expo Documentation](https://docs.expo.dev/)**
- **[NativeWind Documentation](https://www.nativewind.dev/)**
- **[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)**
- **[Tailwind CSS](https://tailwindcss.com/docs)**

---

**Last Updated**: January 2025  
**Version**: 1.0.0  
**Status**: ✅ Complete Setup