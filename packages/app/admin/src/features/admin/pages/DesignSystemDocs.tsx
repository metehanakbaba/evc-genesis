import type React from 'react';
import { Badge, Spinner, Button, Input } from '@/shared/ui';
import {
  // Main Section Icons
  BuildingLibraryIcon,
  PuzzlePieceIcon,
  SwatchIcon,
  FolderIcon,
  WrenchScrewdriverIcon,
  SparklesIcon,
  // Stats Icons
  ChartBarIcon,
  CubeIcon,
  BoltIcon,
  TrophyIcon,
  // Navigation Icons
  MagnifyingGlassIcon,
  DocumentTextIcon,
  RocketLaunchIcon,
  // Sub Icons
  ShieldCheckIcon,
  CodeBracketIcon,
  PaintBrushIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

/**
 * 🎨 EV Charging Admin Design System Documentation
 *
 * Comprehensive design standards and architectural patterns
 * for the EV Charging Admin Dashboard application.
 *
 * 🎯 Professional Emoji System:
 * 📋 Documentation: 📋📝📖📊🔍
 * 🛠️ Development: ⚡⚛️🎨📦🔧💻🚀
 * ✅ Quality: ✅❌⚠️🟢🔴🟡
 * 🎯 Actions: 🎯💡🔥⭐🏆
 */

interface DesignSystemSection {
  readonly id: string;
  readonly title: string;
  readonly emoji: string;
  readonly description: string;
  readonly content: React.ReactNode;
}

interface CodeExample {
  readonly title: string;
  readonly code: string;
  readonly language: string;
}

interface ArchitecturalPrinciple {
  readonly title: string;
  readonly description: string;
  readonly examples: ReadonlyArray<string>;
  readonly icon: string;
}

interface ComponentPattern {
  readonly name: string;
  readonly description: string;
  readonly props: ReadonlyArray<{
    readonly name: string;
    readonly type: string;
    readonly required: boolean;
    readonly description: string;
  }>;
  readonly example: string;
}

/**
 * 🏗️ Architectural Principles
 */
const ARCHITECTURAL_PRINCIPLES: ReadonlyArray<ArchitecturalPrinciple> = [
  {
    title: 'TypeScript-First Development',
    description: 'Strict type safety with zero `any` types allowed',
    examples: [
      'All interfaces use readonly properties',
      'Discriminated unions for complex state',
      'Generic constraints properly defined',
      'No non-null assertions (!)',
    ],
    icon: 'ShieldCheckIcon',
  },
  {
    title: 'Feature-Based Architecture',
    description: 'Domain-driven folder structure grouping by business logic',
    examples: [
      'Features contain own API, types, and pages',
      'Shared components in /shared/ui',
      'Co-located store slices with features',
      'Clear separation of concerns',
    ],
    icon: 'BuildingLibraryIcon',
  },
  {
    title: 'Design System Consistency',
    description: 'Centralized theme configuration with component variants',
    examples: [
      'Theme-based styling via theme.config.ts',
      'Consistent spacing and color scales',
      'Reusable component variants',
      'Standardized prop interfaces',
    ],
    icon: 'SwatchIcon',
  },
  {
    title: 'Performance & Accessibility',
    description: 'Optimized for performance with full accessibility support',
    examples: [
      'Headless UI 2.1 components',
      'Memoized components and callbacks',
      'ARIA labels and semantic markup',
      'Keyboard navigation support',
    ],
    icon: 'BoltIcon',
  },
] as const;

/**
 * 🎨 Design Tokens
 */
const DESIGN_TOKENS = {
  colors: {
    primary: 'Headless UI 2.1 Dark Theme',
    semantic: 'Primary, Secondary, Success, Danger, Warning',
    gradients: 'from-gray-900 via-gray-800 to-gray-900',
  },
  typography: {
    fonts: 'Inter (UI) + JetBrains Mono (Code)',
    scale: 'xs, sm, md, lg, xl, 2xl, 3xl, 4xl',
    weights: '300, 400, 500, 600, 700, 800, 900',
  },
  spacing: {
    scale: 'Tailwind CSS spacing scale (0.25rem increments)',
    containers: 'max-w-6xl with responsive breakpoints',
  },
  animation: {
    durations: 'fast: 150ms, normal: 300ms, slow: 500ms',
    easing: 'ease-out for entrances, ease-in for exits',
  },
} as const;

/**
 * 🧩 Component Patterns
 */
const COMPONENT_PATTERNS: ReadonlyArray<ComponentPattern> = [
  {
    name: 'Button',
    description: 'Polymorphic button with variants, sizes, and states',
    props: [
      {
        name: 'variant',
        type: "'primary' | 'secondary' | 'danger' | 'ghost'",
        required: false,
        description: 'Visual style variant',
      },
      {
        name: 'styleType',
        type: "'solid' | 'outline' | 'ghost'",
        required: false,
        description: 'Button style type',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        required: false,
        description: 'Button size',
      },
      {
        name: 'loading',
        type: 'boolean',
        required: false,
        description: 'Show loading spinner',
      },
      {
        name: 'disabled',
        type: 'boolean',
        required: false,
        description: 'Disable button interaction',
      },
    ],
    example: `<Button variant="primary" size="md" loading={false}>
  Click me
</Button>`,
  },
  {
    name: 'Card',
    description: 'Flexible container with header, body, and footer sections',
    props: [
      {
        name: 'variant',
        type: "'default' | 'elevated' | 'interactive'",
        required: false,
        description: 'Card visual style',
      },
      {
        name: 'padding',
        type: "'none' | 'sm' | 'md' | 'lg'",
        required: false,
        description: 'Internal padding',
      },
      {
        name: 'onClick',
        type: '() => void',
        required: false,
        description: 'Makes card interactive',
      },
    ],
    example: `<Card variant="elevated" padding="md">
  <Card.Header title="Title" description="Description" />
  <Card.Body>Content here</Card.Body>
  <Card.Footer>Footer content</Card.Footer>
</Card>`,
  },
] as const;

/**
 * 📁 Folder Structure Standards
 */
const FOLDER_STRUCTURE = `
src/
├── app/                    # Application configuration
│   ├── router/            # Routing configuration
│   ├── store/             # Global store setup
│   └── styles/            # Global styles
├── features/              # Feature-based modules
│   ├── auth/              # Authentication feature
│   │   ├── api/           # Feature-specific API
│   │   ├── pages/         # Feature pages
│   │   └── types/         # Feature types
│   ├── admin/             # Admin dashboard
│   ├── sessions/          # Charging sessions
│   ├── stations/          # Station management
│   └── users/             # User management
├── shared/                # Shared utilities
│   ├── api/               # API configuration
│   ├── ui/                # UI component library
│   │   ├── components/    # Reusable components
│   │   ├── theme/         # Design system config
│   │   └── index.ts       # Centralized exports
│   └── utils/             # Utility functions
└── types/                 # Global type definitions
` as const;

/**
 * 🔧 Development Tools Configuration
 */
const DEV_TOOLS_CONFIG = {
  linting: {
    tool: 'Biome.js',
    benefits:
      '10-100x faster than ESLint, built-in formatter, zero dependencies',
    rules: 'Strict TypeScript, React best practices, accessibility checks',
  },
  bundling: {
    tool: 'Vite',
    features: 'Fast HMR, TypeScript support, path aliases (@/*)',
  },
  styling: {
    framework: 'Tailwind CSS 4.1',
    approach: 'Utility-first with component abstractions',
    theme: 'Headless UI 2.1 Dark Theme',
  },
  state: {
    tool: 'Redux Toolkit + RTK Query',
    pattern: 'Feature slices with normalized state',
  },
} as const;

const CodeBlock: React.FC<{ children: string; language?: string }> = ({
  children,
  language = 'typescript',
}) => (
  <pre className="bg-gray-800 border border-gray-600 rounded-lg p-4 overflow-x-auto">
    <code className="text-green-400 text-sm font-mono">{children}</code>
  </pre>
);

// Icon mapping function
const getIconComponent = (iconName: string) => {
  const iconProps = { className: 'w-6 h-6' };

  switch (iconName) {
    case 'BuildingLibraryIcon':
      return <BuildingLibraryIcon {...iconProps} />;
    case 'PuzzlePieceIcon':
      return <PuzzlePieceIcon {...iconProps} />;
    case 'SwatchIcon':
      return <SwatchIcon {...iconProps} />;
    case 'FolderIcon':
      return <FolderIcon {...iconProps} />;
    case 'WrenchScrewdriverIcon':
      return <WrenchScrewdriverIcon {...iconProps} />;
    case 'SparklesIcon':
      return <SparklesIcon {...iconProps} />;
    default:
      return <DocumentTextIcon {...iconProps} />;
  }
};

const SectionCard: React.FC<{
  section: DesignSystemSection;
  featured?: boolean;
}> = ({ section, featured = false }) => {
  return (
    <div
      id={section.id}
      className={`bg-gray-800 rounded-lg border border-gray-700 overflow-hidden ${featured ? 'ring-2 ring-blue-500/30' : ''}`}
    >
      <div className="border-b border-gray-700 p-6">
        <h3 className="text-xl font-semibold text-white flex items-center gap-3">
          {getIconComponent(section.emoji)}
          {section.title}
          {featured && (
            <span className="ml-auto text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
              Featured
            </span>
          )}
        </h3>
        <p className="text-gray-400 mt-2">{section.description}</p>
      </div>
      <div className="p-6">{section.content}</div>
    </div>
  );
};

/**
 * 🎨 Design System Documentation Component
 */
const DesignSystemDocs: React.FC = () => {
  const sections: ReadonlyArray<DesignSystemSection> = [
    {
      id: 'architecture',
      title: 'Architectural Principles',
      emoji: 'BuildingLibraryIcon',
      description: 'Core principles guiding the application architecture',
      content: (
        <div className="space-y-6">
          {ARCHITECTURAL_PRINCIPLES.map((principle) => (
            <div
              key={principle.title}
              className="border-l-4 border-blue-500 pl-4"
            >
              <h4 className="font-semibold text-gray-200 flex items-center gap-2">
                {getIconComponent(principle.icon)}
                {principle.title}
              </h4>
              <p className="text-gray-400 text-sm mt-1">
                {principle.description}
              </p>
              <ul className="mt-2 space-y-1">
                {principle.examples.map((example) => (
                  <li key={example} className="text-gray-300 text-sm">
                    • {example}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'components',
      title: 'Component Library',
      emoji: 'PuzzlePieceIcon',
      description: 'Reusable, typesafe UI components',
      content: (
        <div className="space-y-6">
          {COMPONENT_PATTERNS.map((pattern) => (
            <div key={pattern.name} className="space-y-3">
              <h4 className="font-semibold text-gray-200">{pattern.name}</h4>
              <p className="text-gray-400 text-sm">{pattern.description}</p>
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-gray-300">Props:</h5>
                {pattern.props.map((prop) => (
                  <div
                    key={prop.name}
                    className="text-xs bg-gray-800 rounded p-2"
                  >
                    <span className="text-blue-400">{prop.name}</span>
                    {prop.required && <span className="text-red-400">*</span>}
                    <span className="text-gray-500">: </span>
                    <span className="text-green-400">{prop.type}</span>
                    <p className="text-gray-400 mt-1">{prop.description}</p>
                  </div>
                ))}
              </div>
              <CodeBlock language="tsx">{pattern.example}</CodeBlock>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'design-tokens',
      title: 'Design Tokens',
      emoji: 'SwatchIcon',
      description: 'Visual design language and token system',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-200">Colors</h4>
            <div className="flex gap-2 mt-2">
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Success</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="warning">Warning</Badge>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-200">Typography</h4>
            <p className="text-gray-400">
              Inter font family with responsive scales
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-200">Animation</h4>
            <div className="flex items-center gap-2">
              <Spinner size="sm" color="primary" />
              <span className="text-gray-400">
                Smooth transitions & micro-interactions
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'folder-structure',
      title: 'Project Structure',
      emoji: 'FolderIcon',
      description: 'Feature-based organization pattern',
      content: <CodeBlock language="bash">{FOLDER_STRUCTURE}</CodeBlock>,
    },
    {
      id: 'dev-tools',
      title: 'Development Tools',
      emoji: 'WrenchScrewdriverIcon',
      description: 'Modern development toolchain configuration',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <div className="flex items-center gap-2 mb-3">
                <BoltIcon className="w-5 h-5 text-yellow-400" />
                <h4 className="font-semibold text-gray-200">Biome.js</h4>
                <Badge variant="outline" size="sm">
                  Fast
                </Badge>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                10-100x faster than ESLint
              </p>
              <div className="space-y-1">
                <div className="text-xs text-gray-300 flex items-center gap-1">
                  <CheckCircleIcon className="w-3 h-3 text-green-400" />
                  Built-in formatter
                </div>
                <div className="text-xs text-gray-300 flex items-center gap-1">
                  <CheckCircleIcon className="w-3 h-3 text-green-400" />
                  Zero dependencies
                </div>
                <div className="text-xs text-gray-300 flex items-center gap-1">
                  <CheckCircleIcon className="w-3 h-3 text-green-400" />
                  TypeScript support
                </div>
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <div className="flex items-center gap-2 mb-3">
                <RocketLaunchIcon className="w-5 h-5 text-blue-400" />
                <h4 className="font-semibold text-gray-200">Vite</h4>
                <Badge variant="primary" size="sm">
                  Modern
                </Badge>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Lightning fast development
              </p>
              <div className="space-y-1">
                <div className="text-xs text-gray-300 flex items-center gap-1">
                  <CheckCircleIcon className="w-3 h-3 text-green-400" />
                  Fast HMR
                </div>
                <div className="text-xs text-gray-300 flex items-center gap-1">
                  <CheckCircleIcon className="w-3 h-3 text-green-400" />
                  TypeScript support
                </div>
                <div className="text-xs text-gray-300 flex items-center gap-1">
                  <CheckCircleIcon className="w-3 h-3 text-green-400" />
                  Path aliases (@/*)
                </div>
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <div className="flex items-center gap-2 mb-3">
                <PaintBrushIcon className="w-5 h-5 text-purple-400" />
                <h4 className="font-semibold text-gray-200">Tailwind CSS</h4>
                <Badge variant="warning" size="sm">
                  4.1
                </Badge>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Utility-first CSS framework
              </p>
              <div className="space-y-1">
                <div className="text-xs text-gray-300 flex items-center gap-1">
                  <CheckCircleIcon className="w-3 h-3 text-green-400" />
                  Component abstractions
                </div>
                <div className="text-xs text-gray-300 flex items-center gap-1">
                  <CheckCircleIcon className="w-3 h-3 text-green-400" />
                  Dark theme optimized
                </div>
                <div className="text-xs text-gray-300 flex items-center gap-1">
                  <CheckCircleIcon className="w-3 h-3 text-green-400" />
                  Custom design tokens
                </div>
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <div className="flex items-center gap-2 mb-3">
                <CubeIcon className="w-5 h-5 text-green-400" />
                <h4 className="font-semibold text-gray-200">Redux Toolkit</h4>
                <Badge variant="secondary" size="sm">
                  RTK
                </Badge>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Modern Redux with RTK Query
              </p>
              <div className="space-y-1">
                <div className="text-xs text-gray-300 flex items-center gap-1">
                  <CheckCircleIcon className="w-3 h-3 text-green-400" />
                  Feature slices
                </div>
                <div className="text-xs text-gray-300 flex items-center gap-1">
                  <CheckCircleIcon className="w-3 h-3 text-green-400" />
                  Normalized state
                </div>
                <div className="text-xs text-gray-300 flex items-center gap-1">
                  <CheckCircleIcon className="w-3 h-3 text-green-400" />
                  API caching
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'best-practices',
      title: 'Best Practices',
      emoji: 'SparklesIcon',
      description: 'Development guidelines and coding standards',
      content: (
        <div className="space-y-6">
          <div className="bg-gray-700 rounded-lg p-5 border border-gray-600">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheckIcon className="w-6 h-6 text-blue-400" />
              <h4 className="font-semibold text-gray-200 text-lg">
                TypeScript Guidelines
              </h4>
              <Badge variant="primary" size="sm">
                Strict
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-gray-300">
                    Readonly interfaces
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-gray-300">
                    Interface over types
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-sm text-gray-300">No 'any' types</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-gray-300">
                    Discriminated unions
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-gray-300">
                    Explicit null handling
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-sm text-gray-300">
                    No non-null assertions
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-5 border border-gray-600">
            <div className="flex items-center gap-3 mb-4">
              <CodeBracketIcon className="w-6 h-6 text-green-400" />
              <h4 className="font-semibold text-gray-200 text-lg">
                React Patterns
              </h4>
              <Badge variant="outline" size="sm">
                Modern
              </Badge>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded border border-gray-600">
                <span className="text-sm text-gray-300">
                  Component line limit
                </span>
                <Badge variant="warning" size="sm">
                  ≤ 50 lines
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded border border-gray-600">
                <span className="text-sm text-gray-300">
                  useCallback for handlers
                </span>
                <Badge variant="outline" size="sm">
                  Required
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded border border-gray-600">
                <span className="text-sm text-gray-300">
                  Memo for pure components
                </span>
                <Badge variant="outline" size="sm">
                  Optimization
                </Badge>
              </div>
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-5 border border-gray-600">
            <div className="flex items-center gap-3 mb-4">
              <PaintBrushIcon className="w-6 h-6 text-purple-400" />
              <h4 className="font-semibold text-gray-200 text-lg">
                Styling Standards
              </h4>
              <Badge variant="secondary" size="sm">
                Design System
              </Badge>
            </div>
            <div className="space-y-3">
              <div className="bg-gray-800 rounded p-3 border border-gray-600">
                <div className="text-sm text-gray-300 mb-2">
                  Theme-based variants
                </div>
                <div className="flex gap-2">
                  <Button variant="primary" size="sm">
                    Primary
                  </Button>
                  <Button variant="secondary" size="sm">
                    Secondary
                  </Button>
                  <Button variant="danger" size="sm">
                    Danger
                  </Button>
                </div>
              </div>
              <div className="bg-gray-800 rounded p-3 border border-gray-600">
                <div className="text-sm text-gray-300 mb-2">
                  Consistent spacing
                </div>
                <div className="text-xs text-gray-400">
                  Design tokens for padding, margins, and gaps
                </div>
              </div>
              <div className="bg-gray-800 rounded p-3 border border-gray-600">
                <div className="text-sm text-gray-300 mb-2">
                  Accessibility first
                </div>
                <div className="text-xs text-gray-400">
                  ARIA labels, keyboard navigation, semantic markup
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ] as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 relative">
              <div className="absolute -top-2 -right-2">
                <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <RocketLaunchIcon className="w-3 h-3" />
                  <span>v1.0</span>
                </div>
              </div>
              <SwatchIcon className="w-16 h-16 text-blue-400 mx-auto" />
              <div className="mt-2 text-sm text-gray-400">Design System</div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-4">
            <DocumentTextIcon className="w-12 h-12 text-blue-400" />
            Design System Documentation
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Comprehensive design standards, architectural patterns, and
            development guidelines for building consistent, scalable, and
            maintainable user interfaces.
          </p>
          <div className="flex justify-center gap-4">
            <Badge variant="primary" size="lg">
              TypeScript
            </Badge>
            <Badge variant="outline" size="lg">
              React 18
            </Badge>
            <Badge variant="warning" size="lg">
              Tailwind CSS
            </Badge>
            <Badge variant="secondary" size="lg">
              Headless UI
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-6 mb-16">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 text-center group hover:border-blue-500/50 transition-colors">
            <div className="text-3xl font-bold text-blue-400 mb-2 flex items-center justify-center gap-2">
              <ChartBarIcon className="w-8 h-8" />
              {sections.length}
            </div>
            <div className="text-gray-400">Documentation Sections</div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 text-center group hover:border-green-500/50 transition-colors">
            <div className="text-3xl font-bold text-green-400 mb-2 flex items-center justify-center gap-2">
              <CubeIcon className="w-8 h-8" />
              15+
            </div>
            <div className="text-gray-400">UI Components</div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 text-center group hover:border-purple-500/50 transition-colors">
            <div className="text-3xl font-bold text-purple-400 mb-2 flex items-center justify-center gap-2">
              <BoltIcon className="w-8 h-8" />
              100%
            </div>
            <div className="text-gray-400">TypeScript Coverage</div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 text-center group hover:border-yellow-500/50 transition-colors">
            <div className="text-3xl font-bold text-yellow-400 mb-2 flex items-center justify-center gap-2">
              <TrophyIcon className="w-8 h-8" />
              A11Y
            </div>
            <div className="text-gray-400">Accessibility Ready</div>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 mb-16">
          <div className="border-b border-gray-700 p-6">
            <h3 className="text-2xl font-semibold text-white flex items-center gap-3">
              <MagnifyingGlassIcon className="w-6 h-6 text-blue-400" />
              Table of Contents
              <Badge variant="primary" size="sm">
                Navigate
              </Badge>
            </h3>
            <p className="text-gray-400 mt-2">
              Navigate through design system documentation
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  className="text-left p-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all duration-200 border border-gray-600 hover:border-blue-500/50 hover:scale-[1.02] group"
                  onClick={() => {
                    document.getElementById(section.id)?.scrollIntoView({
                      behavior: 'smooth',
                    });
                  }}
                >
                  <div className="font-semibold text-white flex items-center gap-3 mb-2">
                    <div className="group-hover:scale-110 transition-transform">
                      {getIconComponent(section.emoji)}
                    </div>
                    <div>
                      {section.title}
                      <div className="text-xs text-blue-400 mt-1">
                        Section {index + 1}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    {section.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Documentation Sections - Two Column Layout */}
        <div className="space-y-12">
          <div className="grid grid-cols-2 gap-8">
            {sections[0] && <SectionCard section={sections[0]} featured />}
            {sections[1] && <SectionCard section={sections[1]} />}
          </div>

          <div className="grid grid-cols-2 gap-8">
            {sections[2] && <SectionCard section={sections[2]} />}
            {sections[3] && <SectionCard section={sections[3]} />}
          </div>

          <div className="grid grid-cols-2 gap-8">
            {sections[4] && <SectionCard section={sections[4]} />}
            {sections[5] && <SectionCard section={sections[5]} />}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gray-700 rounded-full p-3">
                <BoltIcon className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Built with modern tools for exceptional developer experience
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto mb-4">
              This design system evolves with the project, contributing to
              consistency and maintainability. Built with React 18, TypeScript,
              Tailwind CSS, and Headless UI.
            </p>
            <div className="flex justify-center gap-4">
              <Badge variant="secondary">v1.0.0</Badge>
              <Badge variant="primary">Live</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignSystemDocs;
