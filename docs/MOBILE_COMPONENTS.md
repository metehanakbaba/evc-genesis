# 📱 Mobile Components Documentation

> **Enterprise mobile app components with React Native 0.79, Expo 53, and NativeWind glassmorphism design system**

## Overview

The enterprise mobile application features a comprehensive component library built with glassmorphism design principles, providing a premium user experience that matches the web admin interface. All components are built using NativeWind for consistent Tailwind CSS styling.

## Component Architecture

### Feature-Based Organization

```
apps/enterprise-mobile/src/features/
├── common/
│   └── ui/                    # Shared UI components
├── auth/
│   └── components/            # Authentication components
├── dashboard/
│   └── components/            # Dashboard-specific components
├── charging-stations/
│   └── components/            # Station management components
├── wallet/
│   └── components/            # Wallet and payment components
└── qr-scanner/
    └── components/            # QR scanning components
```

## Dashboard Components

### ActionGrid

**Location**: `apps/enterprise-mobile/src/features/dashboard/components/ActionGrid.tsx`

A sophisticated grid component displaying action items with premium glassmorphism effects and enhanced visual layering.

#### Features

- **Enhanced Glassmorphism**: Multi-layer gradient overlays with sophisticated opacity blending
- **Premium Border System**: Glassmorphism border effects with color-specific accent gradients
- **Background Image Support**: Optional background images with optimized opacity (0.3) for better text readability
- **Color Psychology Integration**: Dynamic color theming based on item variants
- **Staggered Animations**: Coordinated entrance animations via StaggeredGridContainer
- **Touch Feedback**: Pressable items with scale animations via AnimatedGridItem

#### Design Specifications

| Property | Value | Purpose |
|----------|-------|---------|
| **Border Radius** | 18px | Mobile-optimized proportions |
| **Background Opacity** | 0.3 | Optimized for text readability over images |
| **Gradient Layers** | 3 layers | Sophisticated depth with base, accent, and border |
| **Padding** | `SPACING.md` (16px) | Compact mobile layout |
| **Border System** | 1px colored border | Enhanced visual definition |
| **Icon Container** | 40×40px, radius 12px | Compact mobile icon presentation |

#### Gradient Layer System

1. **Base Gradient**: Dark overlay for content readability
   ```typescript
   colors: [
     'rgba(17,24,39,0.95)', 
     'rgba(31,41,55,0.9)', 
     'rgba(15,23,42,0.95)'
   ]
   ```

2. **Color Accent Overlay**: Dynamic color theming
   ```typescript
   colors: [
     `${item.color}26`, 
     `${item.color}1F`, 
     `${item.color}14`,
     `${item.color}0D`
   ]
   ```

3. **Glassmorphism Border**: Premium border effects
   ```typescript
   colors: [`${item.color}4D`, `${item.color}33`, `${item.color}1A`]
   ```

#### Recent Updates (January 2025)

- **Mobile-First Optimization**: Compact layout with reduced padding and refined proportions
- **Enhanced Visual Definition**: Added subtle colored borders for better visual separation
- **Improved Readability**: Reduced background image opacity from 0.5 to 0.3
- **Refined Radius**: Optimized 18px border radius for mobile screen proportions
- **Compact Spacing**: Reduced padding to `SPACING.md` for efficient mobile layout

#### Usage Example

```typescript
import { ActionGrid } from '@/features/dashboard/components';

const actionItems = [
  {
    id: '1',
    title: 'Charging Stations',
    icon: 'flash',
    color: '#3B82F6',
    statusText: 'Online',
    statusColor: '#10B981',
    backgroundImage: require('@/assets/dashboard/station.jpg'),
    additionalInfo: 'Active',
    additionalInfoColor: '#10B981'
  }
];

<ActionGrid items={actionItems} />
```

### WalletBalanceCard

**Location**: `apps/enterprise-mobile/src/features/dashboard/components/WalletBalanceCard.tsx`

A premium wallet balance display component with teal/cyan financial theme and glassmorphism effects.

#### Features

- **Compact Layout**: Optimized for mobile screens with reduced padding and font sizes
- **Glassmorphism Effects**: Multi-layer gradient overlays with LinearGradient
- **Background Image**: Sunset EV charging scene with opacity overlay
- **Animated Counter**: Smooth number animations with customizable duration
- **Status Indicators**: Auto-recharge status with pulse animation
- **Touch Feedback**: Pressable with scale animation (0.98 scale on press)
- **Premium Styling**: Teal color psychology for financial trust and reliability

#### Props Interface

```typescript
interface WalletBalanceCardProps {
  walletBalance: WalletBalance;
  onPress: () => void;
  isLoading?: boolean;
}

interface WalletBalance {
  amount: number;
  currency: string;
  autoRechargeEnabled: boolean;
}
```

#### Usage Example

```typescript
import { WalletBalanceCard } from '@/features/dashboard/components';

<WalletBalanceCard
  walletBalance={{
    amount: 45200,
    currency: 'TRY',
    autoRechargeEnabled: true
  }}
  onPress={() => navigate('/wallet')}
  isLoading={false}
/>
```

#### Design Specifications

| Property | Value | Purpose |
|----------|-------|---------|
| **Padding** | `SPACING.lg` (24px) | Compact mobile layout |
| **Min Height** | 100px | Reduced from 140px for mobile |
| **Border Radius** | 24px | Consistent with design system |
| **Font Size** | 24px (balance), 12px (labels) | Mobile-optimized typography |
| **Icon Size** | 18px (wallet), 14px (status) | Compact icon sizing |
| **Shadow** | Teal glow with 16px radius | Premium depth effect |

#### Recent Updates (January 2025)

- **Compact Layout**: Reduced padding from `SPACING.xl` to `SPACING.lg`
- **Mobile Typography**: Decreased font sizes for better mobile readability
- **Optimized Icons**: Smaller icon sizes (18px wallet, 14px status icons)
- **Improved Spacing**: Reduced margins and padding throughout component
- **Enhanced Touch Targets**: Maintained accessibility while optimizing space

### StatCard

**Location**: `apps/enterprise-mobile/src/features/dashboard/components/StatCard.tsx`

Statistical display component with glassmorphism effects and color psychology variants.

#### Features

- **Color Variants**: Blue (infrastructure), Emerald (operations), Purple (users), Teal (financial)
- **Glassmorphism**: LinearGradient backgrounds with overlay effects
- **Trend Indicators**: Visual trend display with color coding
- **Icon Integration**: Customizable icon containers with glow effects
- **Responsive Layout**: Adapts to different screen sizes

### NavigationCard

**Location**: `apps/enterprise-mobile/src/features/dashboard/components/NavigationCard.tsx`

Navigation component for dashboard feature access with premium styling.

#### Features

- **Pressable Navigation**: Touch feedback with scale animation
- **Badge System**: Status badges with variant-specific colors
- **Icon Support**: Customizable icons with glassmorphism containers
- **Description Text**: Secondary information display
- **Variant Theming**: Consistent color psychology across variants

## Shared UI Components

### GlassCard (Base Component)

**Location**: `apps/enterprise-mobile/shared/components/GlassCard.tsx`

Base glassmorphism component used throughout the application.

#### Features

- **Multi-layer Gradients**: Sophisticated gradient overlays
- **Border Glow**: Variant-specific border colors with opacity
- **Accent Dots**: Animated floating accent elements
- **Size Variants**: sm, md, lg with proportional scaling
- **Touch Support**: Optional Pressable wrapper with animations

#### Usage Example

```typescript
import { GlassCard } from '@/shared/components';

<GlassCard variant="blue" size="lg" onPress={handlePress}>
  <Text className="text-white text-xl font-bold">
    Content goes here
  </Text>
</GlassCard>
```

## Animation Components

### AnimatedCounter

**Location**: `apps/enterprise-mobile/src/features/dashboard/components/animations/AnimatedCounter.tsx`

Smooth number animation component for displaying changing values.

#### Features

- **Smooth Transitions**: Configurable animation duration
- **Currency Support**: Automatic currency formatting
- **Loading States**: Loading indicator during data fetch
- **Custom Styling**: Configurable text styles
- **Completion Callbacks**: Animation completion events

### PulseStatusIndicator

**Location**: `apps/enterprise-mobile/src/features/dashboard/components/animations/PulseStatusIndicator.tsx`

Animated status indicator with pulse effects.

#### Features

- **Pulse Animation**: Customizable pulse speed and intensity
- **Color Variants**: Status-specific color coding
- **Ring Effects**: Optional outer ring animation
- **Size Options**: Multiple size variants
- **Active States**: Different animations for active/inactive states

## Design System

### Color Psychology

The mobile components follow a consistent color psychology system:

| Variant | Primary Color | Psychology | Use Cases |
|---------|---------------|------------|-----------|
| **Blue** | `#3B82F6` | Infrastructure & Technical | Charging stations, technical systems |
| **Emerald** | `#10B981` | Live Operations & Real-time | Active sessions, live monitoring |
| **Purple** | `#8B5CF6` | User Management & Premium | Customer accounts, premium features |
| **Teal** | `#14B8A6` | Financial & Trust | Wallet operations, transactions |

### Spacing System

```typescript
export const SPACING = {
  xs: 4,   // 0.25rem
  sm: 8,   // 0.5rem
  md: 16,  // 1rem
  lg: 24,  // 1.5rem
  xl: 32,  // 2rem
  xxl: 40, // 2.5rem
} as const;
```

### Typography Scale

| Size | Font Size | Line Height | Usage |
|------|-----------|-------------|-------|
| **xs** | 12px | 16px | Labels, captions |
| **sm** | 14px | 20px | Secondary text |
| **base** | 16px | 24px | Body text |
| **lg** | 18px | 28px | Subheadings |
| **xl** | 20px | 28px | Headings |
| **2xl** | 24px | 32px | Large headings |
| **3xl** | 30px | 36px | Display text |

## Performance Optimizations

### Mobile-Specific Optimizations

1. **Reduced Blur Effects**: LinearGradient overlays instead of CSS backdrop-blur
2. **Optimized Shadows**: Simplified shadow levels for better performance
3. **Touch Targets**: Minimum 44px height following iOS guidelines
4. **GPU Acceleration**: Native animation performance with Reanimated
5. **Memory Management**: Proper cleanup of animations and subscriptions

### Bundle Size Optimization

- **Tree Shaking**: Only used Tailwind classes included
- **Component Lazy Loading**: Load components on demand
- **Image Optimization**: Proper image formats and sizes
- **Dependency Management**: Minimal external dependencies

## Testing

### Component Testing

```typescript
import { render, screen, fireEvent } from '@testing-library/react-native';
import { WalletBalanceCard } from '../WalletBalanceCard';

describe('WalletBalanceCard', () => {
  const mockWalletBalance = {
    amount: 45200,
    currency: 'TRY',
    autoRechargeEnabled: true
  };

  it('renders wallet balance correctly', () => {
    render(
      <WalletBalanceCard
        walletBalance={mockWalletBalance}
        onPress={jest.fn()}
      />
    );
    
    expect(screen.getByText('₺452.00')).toBeTruthy();
    expect(screen.getByText('WALLET BALANCE')).toBeTruthy();
  });

  it('handles press events', () => {
    const onPress = jest.fn();
    render(
      <WalletBalanceCard
        walletBalance={mockWalletBalance}
        onPress={onPress}
      />
    );
    
    fireEvent.press(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalled();
  });
});
```

## Accessibility

### WCAG Compliance

All components follow WCAG 2.1 AA guidelines:

- **Touch Targets**: Minimum 44px × 44px touch areas
- **Color Contrast**: 4.5:1 ratio for normal text, 3:1 for large text
- **Screen Reader**: Proper accessibility labels and hints
- **Focus Management**: Keyboard navigation support
- **Semantic HTML**: Proper role and state attributes

### Accessibility Props

```typescript
<WalletBalanceCard
  walletBalance={walletBalance}
  onPress={handlePress}
  accessibilityLabel="Wallet balance card"
  accessibilityHint="Tap to view wallet details"
  accessibilityRole="button"
/>
```

## Best Practices

### Component Development

1. **Consistent Naming**: Use descriptive, consistent naming conventions
2. **TypeScript**: Full type safety with comprehensive interfaces
3. **Props Validation**: Proper prop types and default values
4. **Error Boundaries**: Graceful error handling
5. **Performance**: Memoization and optimization where needed

### Styling Guidelines

1. **NativeWind Classes**: Use Tailwind classes for consistent styling
2. **Variant System**: Follow established color psychology
3. **Responsive Design**: Consider different screen sizes
4. **Touch Feedback**: Provide appropriate touch feedback
5. **Animation**: Smooth, purposeful animations

### Code Organization

1. **Feature-Based**: Organize components by feature
2. **Shared Components**: Extract reusable components
3. **Index Exports**: Clean export structure
4. **Documentation**: Comprehensive JSDoc comments
5. **Testing**: Unit tests for all components

## Migration Guide

### From Legacy Components

If migrating from older component versions:

1. **Update Imports**: Use new feature-based import paths
2. **Props Changes**: Check for updated prop interfaces
3. **Styling Updates**: Migrate to NativeWind classes
4. **Animation Updates**: Use new animation components
5. **Testing Updates**: Update test files for new structure

### Breaking Changes

- **Component Names**: Some components renamed for clarity
- **Prop Interfaces**: Updated TypeScript interfaces
- **Import Paths**: New feature-based import structure
- **Styling**: Migration from StyleSheet to NativeWind

## Resources

- **[NativeWind Documentation](https://www.nativewind.dev/)**
- **[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)**
- **[Expo LinearGradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)**
- **[React Native Testing Library](https://callstack.github.io/react-native-testing-library/)**

---

**Last Updated**: January 2025  
**Version**: 1.0.0  
**Status**: ✅ Complete Implementation with Glassmorphism Design System