# 🚀 EV Charging Admin System - Complete Documentation

> **Enterprise-grade EV charging network management system built with React 19, Next.js 15, and Expo 52**

## 📋 Table of Contents

1. [Quick Start](#-quick-start)
2. [Project Overview](#-project-overview)
3. [Architecture](#-architecture)
4. [Development Guide](#-development-guide)
5. [Docker & Deployment](#-docker--deployment)
6. [Mobile Development](#-mobile-development)
7. [API Documentation](#-api-documentation)
8. [Contributing](#-contributing)
9. [Troubleshooting](#-troubleshooting)

---

## ⚡ Quick Start

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- Git

### Installation

```bash
# 1. Clone repository
git clone <repository-url>
cd evc-frontend-admin

# 2. Install dependencies
npm install

# 3. Start development server
cd apps/admin-web && npm run dev
# → http://localhost:3000

# 4. Or use Docker
./infrastructure/docker/docker-start.sh dev
```

### Essential Commands

```bash
# Development
npm run dev              # Web admin development
npm run mobile:start     # Mobile development (Expo)

# Building
npm run build           # Build all packages
npm run docker:build    # Docker production build

# Testing
npm run test            # Run all tests
npm run lint            # Lint all projects

# Notion Integration
cd tools/notion && npm run test             # Test Notion connection
cd tools/notion && npm run sync-docs        # Sync documentation
cd tools/notion && npm run update-kpis      # Update project metrics
cd tools/notion && npm run analyze-projects # Analyze project portfolio
cd tools/notion && npm run project-report   # Generate status report
```

---

## 🎯 Project Overview

### Current Status

- ✅ **React 19.1.0 + Next.js 15** with App Router
- ✅ **NX Monorepo** with optimized build system
- ✅ **Admin Web App** fully functional
- ✅ **Shared Business Logic** across platforms
- ✅ **Mobile App** with NativeWind + Expo 53 (React Native 0.79)

### Key Features

- **Real-time Charging Station Monitoring**
- **User & Session Management**
- **Wallet & Transaction Processing**
- **Admin Dashboard with Analytics**
- **Mobile-first Design System**
- **Multi-platform Support**
- **Charging Request System** - Comprehensive booking system for station and mobile charging services

### Tech Stack

- **Frontend**: React 19, Next.js 15, TypeScript
- **Mobile**: React Native 0.79, Expo 53, NativeWind
- **State Management**: Redux Toolkit, RTK Query
- **Styling**: Tailwind CSS, Headless UI
- **Build System**: NX, Turbopack
- **Deployment**: Docker, Vercel
- **Integration**: Notion API, Linear API, GitHub API

---

## 🏗️ Architecture

### Project Structure

```
evc-frontend-admin/
├── 📱 apps/                    # Applications
│   ├── admin-web/              # Next.js 15 Admin Panel
│   └── enterprise-mobile/      # React Native + Expo 53 + NativeWind
├── 📦 packages/               # Shared Packages
│   ├── shared/
│   │   ├── api/               # RTK Query API client
│   │   ├── business-logic/    # Domain business rules
│   │   ├── store/             # Redux global state
│   │   ├── types/             # TypeScript definitions
│   │   └── utils/             # Utility functions
│   └── design/
│       └── tokens/            # Design system tokens
├── 🛠️ tools/                  # Development tools
├── 🐳 infrastructure/         # Docker & deployment
└── 📋 docs/                   # Documentation
```

### Architecture Principles

- **Clean Architecture**: Separation of concerns with clear boundaries
- **Domain-Driven Design**: Business logic organized by domain
- **Monorepo Benefits**: Shared code, consistent tooling
- **Platform Agnostic**: Shared business logic across web/mobile

### Design System

- **Glassmorphism**: Modern glass-like UI effects
- **Dark Theme**: Professional dark interface
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: 60 FPS animations, optimized bundles

---

## 💻 Development Guide

### Getting Started

```bash
# 1. Setup development environment
npm install

# 2. Start web admin
cd apps/admin-web
npm run dev

# 3. Start mobile development
cd apps/enterprise-mobile
npm run start
```

### Development Workflow

1. **Feature Development**: Create in appropriate domain package
2. **Component Development**: Use atomic design system in `apps/admin-web/src/shared/ui/`
3. **API Integration**: Use RTK Query endpoints
4. **Testing**: Write unit and integration tests
5. **Documentation**: Update relevant docs

### Atomic Design System

The project now implements a comprehensive **Atomic Design System** for building UI components through composition of smaller, focused pieces. This eliminates component duplication and creates a maintainable, reusable component architecture.

#### Component Hierarchy

```
src/shared/ui/
├── atoms/           # Basic building blocks (GlowOrb, AccentDot, IconContainer, GeometricDecoration, TextElement)
├── molecules/       # Simple combinations (StatValue ✅, TrendIndicator, BackgroundEffects, FloatingAccents)
├── organisms/       # Complex components (StatCard, RouteTransition, Card)
├── templates/       # Page-level layouts
├── hooks/          # Shared UI hooks (useComponentTheme, useAnimation, useComposition)
├── utils/          # Utility functions (theme-utils, animation-utils, class-utils, composition)
└── theme/          # Design tokens and theming
```

#### Design Principles

- **Composition Over Inheritance**: Build complex components from simple, reusable pieces
- **Consistent Theming**: Unified variant system (`blue`, `emerald`, `purple`, `teal`) and size scale (`xs`, `sm`, `md`, `lg`, `xl`)
- **Type Safety**: Comprehensive TypeScript interfaces for all component levels
- **Performance**: Optimized hooks with proper memoization
- **Accessibility**: Built-in accessibility attributes and WCAG compliance

#### Usage Examples

```typescript
// Atomic composition approach
import { GlowOrb, AccentDot, StatValue, TrendIndicator } from "@/shared/ui";

function DashboardCard() {
  return (
    <StatCard variant="blue" size="lg">
      <StatCard.Background>
        <GlowOrb variant="blue" size="lg" animated />
        <AccentDot position="top-right" animated />
      </StatCard.Background>
      <StatCard.Content>
        <StatValue value="1,234" title="Active Sessions" />
        <TrendIndicator trend="+12%" status="live" />
      </StatCard.Content>
    </StatCard>
  );
}

// Theme and animation hooks
import { useComponentTheme, useAnimation } from "@/shared/ui";

function ThemedComponent({ variant = "blue", animated = true }) {
  const { classes, tokens } = useComponentTheme(variant, "md");
  const { animationClasses } = useAnimation({ animated, speed: 1.2 });

  return (
    <div className={`${classes.base} ${animationClasses}`}>
      <span style={{ color: tokens.colors.primary }}>Themed Content</span>
    </div>
  );
}
```

#### Migration Strategy

The atomic design system is being implemented alongside existing components:

1. **Phase 1**: ✅ Create atomic structure and base types
2. **Phase 2**: ✅ Build individual atoms (GlowOrb, AccentDot, IconContainer, GeometricDecoration, TextElement)
3. **Phase 3**: 🔄 Compose molecules from atoms
4. **Phase 4**: 🔄 Replace existing components with atomic versions
5. **Phase 5**: 🔄 Remove duplicate components and optimize

#### Key Features

- **Unified Component System**: Single source of truth for all UI components
- **Granular Reusability**: Use individual atoms or composed organisms as needed
- **Consistent API**: Standardized props and interfaces across all components
- **Theme Integration**: Built-in support for variants, sizes, and animations
- **Developer Experience**: Comprehensive TypeScript support and documentation

### Code Standards

- **TypeScript**: Strict mode enabled, no `any` types
- **ESLint**: Consistent code style
- **Prettier**: Automated formatting
- **Conventional Commits**: Structured commit messages

### Key Directories

- **`apps/admin-web/src/features/`**: Feature-specific components
- **`packages/shared/business-logic/`**: Domain business rules
- **`packages/shared/api/`**: API client and endpoints
- **`apps/admin-web/src/shared/ui/`**: Atomic design system components
- **`apps/admin-web/src/components/ui/`**: Legacy UI components (being migrated)
- **`tools/`**: Development automation and API integration tools

### Development Tools & API Integration

The project includes comprehensive tooling for external API integrations:

#### Notion Integration (`tools/notion/`)

```bash
# Production Notion integration
cd tools/notion
npm install
npm run test           # Test connection and database access
npm run sync-docs      # Sync documentation to Notion with full content
npm run update-kpis    # Update project metrics
npm run analyze        # Analyze and sync comprehensive project structure
```

**Features:**

- ✅ **Live Integration**: Connected to 4 production Notion databases
- ✅ **Enhanced Content Sync**: Advanced markdown-to-Notion conversion with intelligent content handling
- ✅ **Smart Content Processing**: Auto-truncates content to respect Notion API limits (2000 chars per block)
- ✅ **Code Block Intelligence**: Large code blocks split with continuation markers and language detection
- ✅ **Rich Content Support**: Headings, paragraphs, code blocks, and lists with proper formatting
- ✅ **Smart Categorization**: Auto-categorizes docs based on filename patterns
- ✅ **Content Replacement**: Updates existing pages with fresh content while preserving metadata
- ✅ **Batch Processing**: Handles large documents with intelligent chunking and batching
- ✅ **KPI Tracking**: Automated project metrics and goals tracking
- ✅ **Issue Management**: Integration with Issue Tracking database
- ✅ **Project Management**: Connected to Projects database for planning
- ✅ **Comprehensive Project Analysis**: Automated analysis and sync of complete project structure with 10+ major projects
- ✅ **Project Portfolio Management**: Tracks budgets, timelines, progress, and categorization across all initiatives
- ✅ **Multi-Category Support**: Organizes projects by Frontend, Backend, Mobile, DevOps, Infrastructure, and Documentation

**Databases:**

- **Issue Tracking**: Project issues and task management
- **Engineering Docs**: Centralized documentation hub
- **Goals Tracker**: KPIs, metrics, and progress monitoring
- **Projects**: High-level project planning and status

#### Notion API Testing (`tools/notion-test/`)

```bash
# Test Notion API capabilities
cd tools/notion-test
npm install
npm test  # Comprehensive API capability testing
```

**Features:**

- ✅ **Connection Testing**: Validate API keys and workspace access
- ✅ **Database Discovery**: List and analyze available databases
- ✅ **Page Exploration**: Browse workspace pages and content
- ✅ **Schema Analysis**: Examine database properties and structures
- ✅ **Permission Validation**: Test CRUD operation capabilities

**Use Cases:**

- Validate Notion integration before implementation
- Explore workspace structure for automation planning
- Test API permissions and capabilities
- Debug connection and authentication issues

#### Linear API Automation (`tools/`)

```bash
# Setup Linear workspace automation
cd tools
npm install
npm run setup  # Automated Linear workspace configuration
```

**Capabilities:**

- Automated team and project creation
- Issue tracking and label management
- GitHub integration and webhook setup
- Progress reporting and analytics

---

## 🐳 Docker & Deployment

### Docker Commands

```bash
# Development
./infrastructure/docker/docker-start.sh dev

# Production
./infrastructure/docker/docker-start.sh prod

# Build standalone image
./infrastructure/docker/docker-build.sh production evc-admin:latest
```

### Environment Configuration

```bash
# Copy environment template
cp infrastructure/environments/env.example .env

# Production setup
cp infrastructure/environments/env.production.example .env.production
```

### Performance Metrics

- **Build Time**: 2-4 minutes (with NX caching)
- **Image Size**: ~617MB optimized
- **Startup Time**: <3 seconds
- **Memory Usage**: <512MB

### Deployment Options

- **Docker Compose**: Local/staging deployment
- **Vercel**: Web app deployment
- **Manual**: Traditional server deployment

---

## 📱 Mobile Development

### Expo Setup

```bash
# Install Expo CLI
npm install -g @expo/cli eas-cli

# Start development
cd apps/enterprise-mobile
expo start
```

### Mobile Architecture

- **React Native 0.79**: Latest cross-platform mobile development
- **Expo 53**: Modern development platform with SDK 53
- **NativeWind**: Tailwind CSS for React Native with consistent design system
- **Shared API**: Same backend integration as web
- **Atomic Components**: Consistent UI with web admin using atomic design principles

### Platform Features

- **Biometric Authentication**: Fingerprint/Face ID
- **Push Notifications**: Real-time alerts
- **Offline Support**: Local data caching
- **Maps Integration**: Station location display
- **Glassmorphism UI**: Premium glass-like effects with LinearGradient overlays
- **Dashboard Components**: WalletBalanceCard, StatCard, NavigationCard with compact mobile layouts
- **Feature-Based Architecture**: Clean organization by features (auth, dashboard, charging-stations, wallet)

### Development Status

- 🔄 **In Progress**: Core features implementation
- ⏳ **Planned**: App store deployment
- 📅 **Timeline**: 16-week development plan

---

## 🔗 API Documentation

### Authentication Endpoints

```typescript
// Login
POST /api/auth/login
Body: { email: string, password: string }

// Register
POST /api/auth/register
Body: { email: string, password: string, name: string }

// Current User
GET /api/auth/me
Headers: { Authorization: "Bearer <token>" }
```

### Station Management

```typescript
// Get Stations
GET /api/stations
Query: { status?, location?, page?, limit? }

// Update Station
PUT /api/stations/:id
Body: { name?, status?, powerOutput?, pricePerKwh? }

// Station Statistics
GET /api/stations/stats
```

### Session Management

```typescript
// Active Sessions
GET /api/sessions/active

// Start Session
POST /api/sessions
Body: { stationId: string, connectorId: string }

// Stop Session
PUT /api/sessions/:id/stop
```

### Error Handling

```typescript
interface ApiError {
  code: string;
  message: string;
  details?: any;
}

// Common error codes
- AUTH_REQUIRED: Authentication required
- INVALID_CREDENTIALS: Invalid login credentials
- STATION_UNAVAILABLE: Station not available
- INSUFFICIENT_BALANCE: Insufficient wallet balance
```

---

## 🤝 Contributing

### Development Process

1. **Fork** the repository
2. **Create** feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** Pull Request

### Coding Guidelines

- Follow TypeScript strict mode
- Write comprehensive tests
- Update documentation
- Follow conventional commits
- Ensure all checks pass

### Pull Request Process

1. **Description**: Clear description of changes
2. **Testing**: All tests must pass
3. **Documentation**: Update relevant docs
4. **Review**: Code review required
5. **Merge**: Squash and merge

---

## 🔧 Troubleshooting

### Common Issues

#### Build Errors

```bash
# Clear NX cache
npm run clean

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run typecheck
```

#### Docker Issues

```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache

# Check logs
docker-compose logs -f
```

#### Development Server Issues

```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Reset development server
cd apps/admin-web
rm -rf .next
npm run dev
```

#### Notion API Integration Issues

```bash
# Test Notion API connection
cd tools/notion-test
npm test

# Common fixes for Notion API issues:
# 1. Verify API key is correct and active
# 2. Check integration has workspace access
# 3. Ensure pages are shared with integration
# 4. Confirm integration permissions are sufficient

# Debug with verbose logging
DEBUG=notion:* npm test
```

### Performance Issues

- **Slow builds**: Check NX cache status
- **Memory issues**: Increase Docker memory limit
- **Hot reload**: Restart development server

### Getting Help

- **Documentation**: Check relevant docs in `/docs`
- **Issues**: Create GitHub issue with details
- **Discussions**: Use GitHub discussions for questions

---

## 📚 Additional Resources

### Documentation Files

- **[Docker Guide](./README_DOCKER.md)**: Complete Docker setup
- **[NX Optimization](./README_NX_OPTIMIZATION.md)**: Build system optimization
- **[Quick Start](./QUICK_START.md)**: Fast setup guide
- **[Mobile Components](./MOBILE_COMPONENTS.md)**: Mobile component library documentation
- **[Mobile Development](./MOBILE_DEVELOPMENT.md)**: React Native + NativeWind guide
- **[Charging Request API](./api/charging-request-api.md)**: API documentation for charging requests
- **[Expo Migration](./EXPO_MIGRATION_PLAN.md)**: Mobile development plan
- **[Git Rules](./GIT_RULES.md)**: Git workflow guidelines

### External Resources

- [React 19 Documentation](https://react.dev)
- [Next.js 15 Guide](https://nextjs.org/docs)
- [Expo Documentation](https://docs.expo.dev)
- [NX Documentation](https://nx.dev)

---

## 📊 Project Status

### Completed ✅

- React 19 + Next.js 15 migration
- NX monorepo optimization
- Admin web application
- Shared business logic
- Docker deployment setup
- **Mobile App with NativeWind**: React Native 0.79 + Expo 53 + Tailwind CSS styling
- **Mobile Dashboard Components**: WalletBalanceCard, StatCard, NavigationCard with glassmorphism effects
- **Feature-Based Mobile Architecture**: Clean organization by features with shared UI components
- **Charging Request System**: Complete TypeScript type system for station booking and mobile charging requests
- **Charging Request API Documentation**: Comprehensive API documentation with endpoints and data structures
- Notion integration system with live database connections
- **Enhanced documentation sync with full content conversion**
- **Rich markdown-to-Notion block transformation**
- **Content replacement and update capabilities**
- KPI tracking and metrics automation
- Notion API testing tool
- Linear API automation
- Development tooling infrastructure

### In Progress 🔄

- Atomic design system molecules (TrendIndicator, BackgroundEffects, FloatingAccents)
- Mobile application feature completion
- Charging request UI components implementation
- API endpoint completion
- Enhanced Notion workflow automation
- Performance optimizations

### Planned 📅

- App store deployment
- Advanced analytics
- Multi-language support
- Enhanced monitoring

---

**Last Updated**: January 2025  
**Version**: 1.0.0  
**Maintainers**: EV Charging Development Team

## 🔗 Recent Updates

### January 2025 - Atomic Design System v1.0

#### 🎨 Atomic Design System Implementation

- ✅ **Complete Foundation Setup**: Atomic design system structure with atoms, molecules, organisms, and templates
- ✅ **Comprehensive Type System**: Full TypeScript interfaces for all component levels with BaseComponentProps, VariantProps, SizeProps, and AnimationProps
- ✅ **Theme Integration**: Unified variant system (blue, emerald, purple, teal) with consistent size scale (xs, sm, md, lg, xl)
- ✅ **Advanced Hooks System**: useComponentTheme, useAnimation, and useComposition hooks for component development
- ✅ **Utility Functions**: Complete set of theme-utils, animation-utils, class-utils, and composition helpers
- ✅ **Component Architecture**: Structured approach eliminating duplication between src/components/ui and src/shared/ui
- ✅ **Migration Strategy**: Phased approach to replace existing monolithic components with atomic compositions
- ✅ **Developer Experience**: Comprehensive documentation, validation tools, and development guidelines
- ✅ **Performance Optimization**: Memoized hooks and optimized rendering for complex component compositions
- ✅ **Accessibility Ready**: Built-in WCAG compliance and accessibility attributes in base component props

#### 🧩 Complete Atomic Components Library

**Atoms - Basic Building Blocks:**
- ✅ **GlowOrb Atom**: Complete implementation with animated gradient orbs, variant-specific colors (blue, emerald, purple, teal), multiple blur levels (sm, md, lg, xl), intensity settings (subtle, medium, strong), customizable animations with speed/delay control, and position management
- ✅ **AccentDot Atom**: Small floating accent elements with positioning options, animation support, and variant-specific styling
- ✅ **IconContainer Atom**: Standardized icon wrapper with interactive states, hover effects, glow effects, and accessibility features
- ✅ **GeometricDecoration Atom**: Reusable geometric shapes (circles, rings, lines, arcs, dots) with pattern variants and positioning
- ✅ **TextElement Atom**: Typography atoms with semantic HTML support, truncation options, and responsive text handling

**Molecules - Composed Components:**
- ✅ **StatValue Molecule**: Statistical value display component composed from TextElement and IconContainer atoms with interactive states, trend indicators, and custom formatting support

#### 🎯 GlowOrb Component Features

The `GlowOrb` component demonstrates the full atomic design system implementation:

```typescript
// Basic usage
<GlowOrb variant="blue" size="lg" animated />

// Advanced configuration with all features
<GlowOrb 
  variant="emerald" 
  size="md" 
  intensity="strong" 
  blur="lg"
  animated
  animationSpeed={1.5}
  animationDelay={200}
  position="background"
  className="top-4 right-4"
  style={{ opacity: 0.8 }}
/>
```

**Key Features:**
- **4 Color Variants**: Blue, emerald, purple, teal with consistent theming
- **5 Size Options**: xs, sm, md, lg, xl with proportional scaling
- **4 Blur Levels**: sm, md, lg, xl for different visual effects
- **3 Intensity Levels**: Subtle (0.1), medium (0.25), strong (0.5) opacity
- **Animation Control**: Customizable speed, delay, and timing
- **Position Management**: Background/foreground z-index handling
- **Type Safety**: Full TypeScript interfaces with comprehensive validation
- **Performance**: Optimized rendering with proper memoization
