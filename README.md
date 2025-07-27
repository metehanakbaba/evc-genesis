# 🚀 EV Charging Admin System

> **Enterprise-grade EV charging network management system built with React 19, Next.js 15, and Expo 52**

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://docker.com/)

## ⚡ Quick Start

```bash
# 1. Clone and install
git clone <repository-url>
cd evc-frontend-admin
npm install

# 2. Start development
cd apps/admin-web && npm run dev
# → http://localhost:3000

# 3. Or use Docker
./infrastructure/docker/docker-start.sh dev
```

## 🎯 Project Overview

### Current Status
- ✅ **React 19.0.0 + Next.js 15** with App Router
- ✅ **NX Monorepo** with optimized build system  
- ✅ **Admin Web App** fully functional
- ✅ **Shared Business Logic** across platforms
- ✅ **Mobile App** with NativeWind + Expo 53 (React Native 0.79.5)
- ✅ **NativeWind Integration** fully operational with Tailwind CSS styling

### Key Features
- **Real-time Charging Station Monitoring**
- **User & Session Management** 
- **Wallet & Transaction Processing**
- **Admin Dashboard with Analytics**
- **Mobile-first Design System**
- **Multi-platform Support**
- **Charging Request System** - Complete navigation setup with station booking and mobile charging flows, dashboard integration, and modal system

## 🏗️ Architecture

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

### Tech Stack
- **Frontend**: React 19, Next.js 15, TypeScript
- **Mobile**: React Native 0.79.5, Expo 53, NativeWind
- **State Management**: Redux Toolkit, RTK Query
- **Styling**: Tailwind CSS, NativeWind, Headless UI
- **Build System**: NX, Turbopack
- **Deployment**: Docker, Vercel

## 💻 Development

### Essential Commands
```bash
# Development
npm run dev              # Web admin development
npm run mobile:start     # Mobile development (Expo)

# Building  
npm run build           # Build all packages
npm run docker:build    # Docker production build

# Quality
npm run test            # Run all tests
npm run lint            # Lint all projects
npm run typecheck       # TypeScript validation

# Notion Integration
cd tools/notion && npm run test        # Test Notion connection
cd tools/notion && npm run sync-docs   # Sync documentation with full content
cd tools/notion && npm run update-kpis # Update project metrics
```

### Development Workflow
1. **Feature Development**: Create in appropriate domain package
2. **Component Development**: Use atomic design system in `apps/admin-web/src/shared/ui/`
3. **API Integration**: Use RTK Query endpoints
4. **Testing**: Write unit and integration tests
5. **Documentation**: Update relevant docs

### Component Architecture
The project uses a comprehensive **Atomic Design System** for UI components:

- **Atoms** (`src/shared/ui/atoms/`): Basic building blocks (GlowOrb, AccentDot, IconContainer, GeometricDecoration, TextElement)
- **Molecules** (`src/shared/ui/molecules/`): Simple combinations (StatValue, TrendIndicator, BackgroundEffects)
- **Organisms** (`src/shared/ui/organisms/`): Complex components (StatCard, RouteTransition, Card)
- **Templates** (`src/shared/ui/templates/`): Page-level layouts

**Recent Updates:**
- ✅ **All 5 Atomic Components** fully implemented with comprehensive TypeScript interfaces
- ✅ **RouteTransition Organism** complete with dynamic pattern generation using atomic composition
- ✅ **BackgroundEffects & FloatingAccents Molecules** implemented with 5 positioning patterns (random, grid, corners, center, edges)
- ✅ **Performance Optimized** GlowOrb component with inline gradient definitions
- ✅ **206+ Unit Tests** covering all atomic components with full accessibility compliance
- ✅ **StatValue & BackgroundEffects Molecules** complete - demonstrating atomic composition principles
- ✅ **Documentation Consistency** - All component index files now include comprehensive JSDoc headers following atomic design standards

```typescript
// Example: Composing components atomically
<StatCard>
  <StatCard.Background>
    <GlowOrb variant="blue" size="lg" intensity="strong" animated />
    <AccentDot position="top-right" animated />
    <GeometricDecoration shape="circle" variant="emerald" />
  </StatCard.Background>
  <StatCard.Content>
    <StatValue value="1,234" title="Active Sessions" icon={UserIcon} trend="+12%" />
    <TrendIndicator trend="+12%" status="live" />
  </StatCard.Content>
</StatCard>
```

## 🐳 Docker & Deployment

### Quick Docker Commands
```bash
# Development mode
./infrastructure/docker/docker-start.sh dev

# Production mode  
./infrastructure/docker/docker-start.sh prod

# Build standalone image
./infrastructure/docker/docker-build.sh production evc-admin:latest
```

### Performance Metrics
- **Build Time**: 2-4 minutes (with NX caching)
- **Image Size**: ~617MB optimized
- **Startup Time**: <3 seconds
- **Memory Usage**: <512MB

## 📱 Mobile Development

### Expo Setup
```bash
# Install Expo CLI
npm install -g @expo/cli eas-cli

# Start development
cd apps/enterprise-mobile
expo start
```

### Mobile Features
- **Cross-platform**: iOS & Android support with React Native 0.79.5
- **NativeWind Styling**: Tailwind CSS for React Native with consistent design system
- **Live NativeWind Testing**: Comprehensive test component demonstrating full Tailwind CSS integration
- **Enhanced Glassmorphism Design System**: Premium glass-like UI effects with 3-layer gradient system
- **Dashboard Components**: ActionGrid with mobile-first optimization, WalletBalanceCard, StatCard, NavigationCard
- **ActionGrid Mobile-First**: Compact layout with colored borders, optimized readability (0.3 opacity), 18px radius
- **Feature-Based Architecture**: Organized by features (auth, dashboard, charging-stations, wallet, charging-request)
- **Charging Request System**: Complete navigation flows with 5 screens (selection, station flow, mobile flow, station list, confirmation) and seamless dashboard integration
- **Biometric Auth**: Fingerprint/Face ID integration
- **Push Notifications**: Real-time alerts and updates
- **Offline Support**: Local data caching and sync
- **Maps Integration**: Station locations and navigation
- **Shared Components**: Consistent UI with web admin using atomic design principles

## 📚 Documentation

### Quick Links
- **[📖 Complete Documentation](./docs/README.md)** - Comprehensive system guide
- **[🚀 Quick Start](./docs/QUICK_START.md)** - Fast setup guide
- **[🔄 Recent Updates](./docs/RECENT_UPDATES.md)** - Latest changes and optimizations
- **[🎨 Atomic Design System](./docs/ATOMIC_DESIGN_SYSTEM.md)** - Component architecture guide
- **[📱 Mobile Components](./docs/MOBILE_COMPONENTS.md)** - Mobile component library documentation
- **[📱 Mobile Development](./docs/MOBILE_DEVELOPMENT.md)** - React Native + NativeWind guide
- **[⚡ Charging Request API](./docs/api/charging-request-api.md)** - API documentation for charging requests
- **[🐳 Docker Guide](./docs/README_DOCKER.md)** - Complete Docker setup
- **[⚡ NX Optimization](./docs/README_NX_OPTIMIZATION.md)** - Build system optimization
- **[📱 Mobile Plan](./docs/EXPO_MIGRATION_PLAN.md)** - Mobile development roadmap
- **[🔧 Git Rules](./docs/GIT_RULES.md)** - Git workflow guidelines

### In-App Documentation
Access comprehensive documentation within the application:
```
http://localhost:3000/docs
```

## 🤝 Contributing

### Development Process
1. **Fork** the repository
2. **Create** feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** Pull Request

### Code Standards
- **TypeScript**: Strict mode enabled, no `any` types
- **ESLint**: Consistent code style
- **Prettier**: Automated formatting
- **Conventional Commits**: Structured commit messages

## 🔧 Troubleshooting

### Common Issues
```bash
# Clear NX cache
npm run clean

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Docker issues
docker system prune -a
```

### Getting Help
- **📋 Documentation**: Check `/docs` directory
- **🐛 Issues**: Create GitHub issue with details
- **💬 Discussions**: Use GitHub discussions for questions

## 📊 Project Status

### Completed ✅
- React 19 + Next.js 15 migration
- NX monorepo optimization  
- Admin web application
- Shared business logic
- Docker deployment setup
- **Atomic Design System Foundation** with comprehensive type system
- **Mobile App with NativeWind**: React Native 0.79.5 + Expo 53 + Tailwind CSS styling
- **NativeWind Integration Verified**: Comprehensive test component demonstrating full functionality
- **Enhanced Mobile Dashboard Components**: ActionGrid with mobile-first optimization, WalletBalanceCard, StatCard, NavigationCard
- **ActionGrid Mobile-First Updates**: Compact layout, enhanced visual definition, improved readability, colored borders
- **Feature-Based Mobile Architecture**: Clean organization by features with shared UI components
- **Charging Request Navigation System**: Complete implementation with 5 screens, modal integration, mock data, and dashboard navigation flow
- **Notion integration** with full content sync and live database connections
- Automated documentation and KPI tracking

### In Progress 🔄
- Mobile application feature completion
- Charging request API integration
- Real-time tracking implementation
- Performance optimizations
- Documentation improvements

### Planned 📅
- App store deployment
- Advanced analytics
- Multi-language support
- Enhanced monitoring

---

**Version**: 2.0.0  
**License**: MIT  
**Maintainers**: EV Charging Development Team

For detailed documentation, visit: [📖 Complete Documentation](./docs/README.md)
