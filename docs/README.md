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
- 🔄 **Mobile App** in development (Expo 52)

### Key Features

- **Real-time Charging Station Monitoring**
- **User & Session Management**
- **Wallet & Transaction Processing**
- **Admin Dashboard with Analytics**
- **Mobile-first Design System**
- **Multi-platform Support**

### Tech Stack

- **Frontend**: React 19, Next.js 15, TypeScript
- **Mobile**: React Native, Expo 52, Tamagui
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
cd apps/admin-mobile
npm run start
```

### Development Workflow

1. **Feature Development**: Create in appropriate domain package
2. **Component Development**: Add to shared UI components
3. **API Integration**: Use RTK Query endpoints
4. **Testing**: Write unit and integration tests
5. **Documentation**: Update relevant docs

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
cd apps/admin-mobile
expo start
```

### Mobile Architecture

- **React Native**: Cross-platform mobile development
- **Expo 52**: Modern development platform
- **Tamagui**: Universal design system
- **Shared API**: Same backend integration as web

### Platform Features

- **Biometric Authentication**: Fingerprint/Face ID
- **Push Notifications**: Real-time alerts
- **Offline Support**: Local data caching
- **Maps Integration**: Station location display

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
- Notion integration system with live database connections
- **Enhanced documentation sync with full content conversion**
- **Rich markdown-to-Notion block transformation**
- **Content replacement and update capabilities**
- KPI tracking and metrics automation
- Notion API testing tool
- Linear API automation
- Development tooling infrastructure

### In Progress 🔄

- Mobile application development
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
**Version**: 2.1.0  
**License**: MIT  
**Maintainers**: EV Charging Development Team

## 🔗 Recent Updates

### January 2025 - Notion Integration v2.5
- ✅ **Production Notion Integration**: Live connection to 4 databases
- ✅ **Full Content Sync Implementation**: Complete markdown-to-Notion block conversion now active
- ✅ **Enhanced File Metadata Tracking**: Comprehensive file modification times, sizes, and paths collection
- ✅ **Enhanced Content Processing**: Smart content length management with 2000-char API limit handling
- ✅ **Intelligent Code Block Splitting**: Large code blocks automatically split with continuation markers
- ✅ **Advanced Language Detection**: Preserves syntax highlighting from markdown code blocks
- ✅ **Smart Language Mapping**: Automatically maps unsupported languages (tsx, jsx, sh, vue, etc.) to Notion-compatible equivalents
- ✅ **Smart Content Chunking**: Splits long content at logical boundaries to preserve formatting
- ✅ **Content Replacement System**: Updates existing Notion pages with fresh markdown content
- ✅ **Batch Processing**: Handles large documents with 100-block API batching
- ✅ **Automated Documentation Sync**: Real-time sync from docs/ to Notion with full content conversion
- ✅ **Enhanced Sync Reporting**: Detailed statistics including file sizes (KB), block counts, and modification dates
- ✅ **Intelligent Sync Caching**: Smart file change detection with persistent cache to avoid unnecessary syncs
- ✅ **Performance Optimization**: Only syncs modified files based on timestamps, size changes, and Notion page existence
- ✅ **Corrected KPI Tracking System**: Automated project metrics with proper database schema alignment
- ✅ **Enhanced Development Tools**: Comprehensive API testing and validation
- ✅ **Streamlined Workflows**: One-command sync and update operations
- ✅ **Database Schema Validation**: Proper field mapping for Goals Tracker database
- ✅ **Comprehensive Project Analysis**: Complete project portfolio analysis with 10+ major projects
- ✅ **Multi-Category Project Organization**: Automatic categorization by Frontend, Backend, Mobile, DevOps, Infrastructure, and Documentation
- ✅ **Budget and Timeline Management**: Tracks $260K+ total project budget with progress monitoring
- ✅ **Portfolio Insights**: Real-time project status, priority assessment, and completion tracking
- ✅ **AI-Generated Project Summaries**: Rich project descriptions with technical details and current status
