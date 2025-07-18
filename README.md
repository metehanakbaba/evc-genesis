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
- ✅ **React 19.1.0 + Next.js 15** with App Router
- ✅ **NX Monorepo** with optimized build system  
- ✅ **Admin Web App** fully functional
- ✅ **Shared Business Logic** across platforms
- 🔄 **Mobile App** in development (Expo 52)

### Key Features
- **Real-time Charging Station Monitoring**
- **User & Session Management** 
- **Wallet & Transaction Processing**
- **Admin Dashboard with Analytics**
- **Mobile-first Design System**
- **Multi-platform Support**

## 🏗️ Architecture

```
evc-frontend-admin/
├── 📱 apps/                    # Applications
│   ├── admin-web/              # Next.js 15 Admin Panel
│   └── admin-mobile/           # React Native + Expo 52
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
- **Mobile**: React Native, Expo 52, Tamagui
- **State Management**: Redux Toolkit, RTK Query
- **Styling**: Tailwind CSS, Headless UI
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
The project now uses an **Atomic Design System** for UI components:

- **Atoms** (`src/shared/ui/atoms/`): Basic building blocks (GlowOrb, AccentDot, IconContainer)
- **Molecules** (`src/shared/ui/molecules/`): Simple combinations (StatValue, TrendIndicator)
- **Organisms** (`src/shared/ui/organisms/`): Complex components (StatCard, RouteTransition)
- **Templates** (`src/shared/ui/templates/`): Page-level layouts

```typescript
// Example: Composing components atomically
<StatCard>
  <StatCard.Background>
    <GlowOrb variant="blue" size="lg" />
    <AccentDot position="top-right" animated />
  </StatCard.Background>
  <StatCard.Content>
    <StatValue value="1,234" title="Active Sessions" />
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
cd apps/admin-mobile
expo start
```

### Mobile Features
- **Cross-platform**: iOS & Android support
- **Biometric Auth**: Fingerprint/Face ID
- **Push Notifications**: Real-time alerts
- **Offline Support**: Local data caching
- **Maps Integration**: Station locations

## 📚 Documentation

### Quick Links
- **[📖 Complete Documentation](./docs/README.md)** - Comprehensive system guide
- **[🚀 Quick Start](./docs/QUICK_START.md)** - Fast setup guide
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
- Notion integration with full content sync
- Automated documentation and KPI tracking

### In Progress 🔄
- Mobile application development
- API endpoint completion
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
