# 🚀 QuickFilterButtons - Universal Filter Component

A reusable quick filter component that provides consistent filter UI across all pages with theme variants and configurable filter groups.

## Features

- ✅ **Universal Design**: Use across Users, Stations, Sessions, Wallets, etc.
- ✅ **Theme Variants**: Purple, Blue, Emerald, Teal, Amber themes
- ✅ **Configurable**: Multiple filter groups with custom options
- ✅ **Consistent**: Same design language across the entire app
- ✅ **TypeScript**: Full type safety with proper interfaces

## Usage

### Basic Usage

```tsx
import { QuickFilterButtons, type QuickFilterGroup } from '@/shared/ui';
import { 
  UserGroupIcon, 
  UserIcon, 
  ShieldCheckIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline';

const MyPage = () => {
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const quickFilterGroups: QuickFilterGroup[] = [
    {
      id: 'role',
      title: 'User Roles',
      icon: UserGroupIcon,
      selectedValue: roleFilter,
      onChange: setRoleFilter,
      options: [
        { id: 'all', label: 'All Roles', icon: UserGroupIcon, color: 'purple' },
        { id: 'user', label: 'Customer', icon: UserIcon, color: 'blue' },
        { id: 'admin', label: 'Administrator', icon: ShieldCheckIcon, color: 'purple' },
      ],
    },
    {
      id: 'status',
      title: 'Account Status',
      icon: CheckCircleIcon,
      selectedValue: statusFilter,
      onChange: setStatusFilter,
      options: [
        { id: 'all', label: 'All Status', icon: UserGroupIcon, color: 'purple' },
        { id: 'active', label: 'Active', icon: CheckCircleIcon, color: 'emerald' },
        { id: 'inactive', label: 'Inactive', icon: UserIcon, color: 'red' },
      ],
    },
  ];

  return (
    <QuickFilterButtons
      filterGroups={quickFilterGroups}
      variant="purple"
    />
  );
};
```

### Theme Variants

```tsx
// Purple theme (Users page)
<QuickFilterButtons filterGroups={userFilters} variant="purple" />

// Blue theme (Stations page)
<QuickFilterButtons filterGroups={stationFilters} variant="blue" />

// Emerald theme (Sessions page)
<QuickFilterButtons filterGroups={sessionFilters} variant="emerald" />

// Teal theme (Wallets page)
<QuickFilterButtons filterGroups={walletFilters} variant="teal" />
```

### Available Colors for Options

- `emerald` - Green theme
- `blue` - Blue theme  
- `purple` - Purple theme
- `amber` - Orange/yellow theme
- `red` - Red theme
- `teal` - Teal theme
- `gray` - Gray theme

## Props

### QuickFilterButtonsProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `filterGroups` | `QuickFilterGroup[]` | required | Array of filter groups to display |
| `variant` | `'emerald' \| 'blue' \| 'purple' \| 'teal' \| 'amber' \| 'default'` | `'default'` | Theme variant for group titles |
| `className` | `string` | `''` | Additional CSS classes |

### QuickFilterGroup

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique identifier for the group |
| `title` | `string` | Display title for the group |
| `icon` | `IconComponent` | Icon component for the group title |
| `selectedValue` | `string` | Currently selected option ID |
| `onChange` | `(value: string) => void` | Callback when option is selected |
| `options` | `QuickFilterOption[]` | Array of filter options |

### QuickFilterOption

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique identifier for the option |
| `label` | `string` | Display label for the option |
| `icon` | `IconComponent` | Icon component for the option |
| `color` | `'emerald' \| 'blue' \| 'purple' \| 'amber' \| 'red' \| 'gray' \| 'teal'` | Color theme for selected state |

## Examples

### Stations Page Usage

```tsx
const stationQuickFilters: QuickFilterGroup[] = [
  {
    id: 'status',
    title: 'Operational Status',
    icon: CheckCircleIcon,
    selectedValue: statusFilter,
    onChange: setStatusFilter,
    options: [
      { id: 'all', label: 'All', icon: UserGroupIcon, color: 'blue' },
      { id: 'active', label: 'Operational', icon: CheckCircleIcon, color: 'emerald' },
      { id: 'offline', label: 'Offline', icon: XCircleIcon, color: 'red' },
      { id: 'maintenance', label: 'Maintenance', icon: WrenchScrewdriverIcon, color: 'amber' },
    ],
  },
  {
    id: 'connector',
    title: 'Connector Standards',
    icon: BoltIcon,
    selectedValue: connectorFilter,
    onChange: setConnectorFilter,
    options: [
      { id: 'all', label: 'All', icon: BoltIcon, color: 'blue' },
      { id: 'CCS2', label: 'CCS2', icon: BoltIcon, color: 'blue' },
      { id: 'CHAdeMO', label: 'CHAdeMO', icon: BoltIcon, color: 'purple' },
      { id: 'Type2', label: 'Type2', icon: BoltIcon, color: 'emerald' },
    ],
  },
];

<QuickFilterButtons filterGroups={stationQuickFilters} variant="blue" />
```

### Sessions Page Usage

```tsx
const sessionQuickFilters: QuickFilterGroup[] = [
  {
    id: 'status',
    title: 'Session Status',
    icon: BoltIcon,
    selectedValue: statusFilter,
    onChange: setStatusFilter,
    options: [
      { id: 'all', label: 'All', icon: BoltIcon, color: 'emerald' },
      { id: 'active', label: 'Active', icon: PlayIcon, color: 'emerald' },
      { id: 'completed', label: 'Completed', icon: CheckCircleIcon, color: 'blue' },
      { id: 'failed', label: 'Failed', icon: XCircleIcon, color: 'red' },
    ],
  },
];

<QuickFilterButtons filterGroups={sessionQuickFilters} variant="emerald" />
```

## Design System Integration

This component follows the atomic design principles:
- **Molecule**: Combines multiple atoms (buttons, icons, text)
- **Reusable**: Can be used across organisms and templates
- **Consistent**: Maintains design system standards
- **Themeable**: Supports multiple color variants

## Migration Guide

To migrate from hardcoded filter buttons:

1. **Import the component**:
   ```tsx
   import { QuickFilterButtons, type QuickFilterGroup } from '@/shared/ui';
   ```

2. **Create filter groups configuration**:
   ```tsx
   const quickFilterGroups = useMemo((): QuickFilterGroup[] => [
     // Your filter groups here
   ], [dependencies]);
   ```

3. **Replace hardcoded buttons**:
   ```tsx
   // Before: Hardcoded buttons
   <div className="flex gap-3">
     <button onClick={() => setFilter('all')}>All</button>
     <button onClick={() => setFilter('active')}>Active</button>
   </div>

   // After: Universal component
   <QuickFilterButtons 
     filterGroups={quickFilterGroups} 
     variant="purple" 
   />
   ```

## Benefits

- **75% Less Code**: Reduce boilerplate filter UI code
- **Consistency**: Same design across all pages
- **Maintainability**: Central component for all updates
- **Type Safety**: Full TypeScript support
- **Flexibility**: Highly configurable for different use cases
