# ⚡ EV Charging Admin Panel - Quick Start

> **Fast track to get the EV Charging Admin Panel running with NX optimization and Notion integration**

## 🚀 **Instant Setup**

```bash
# 1. Clone and install
git clone <repository-url>
cd evc-frontend-admin
npm install

# 2. Start development
cd apps/admin-web && npm run dev
# → http://localhost:3000

# 3. Setup Notion integration (optional)
cd tools/notion && npm install && npm run test

# 4. Production Docker
./infrastructure/docker/docker-start.sh prod
```

## 🎯 **Essential Commands**

### **Development**
```bash
# Local development with hot reload
cd apps/admin-web && npm run dev

# Quick build test (NX optimized)
./infrastructure/docker/docker-start.sh dev
```

### **Docker Deployment**
```bash
# Production deployment
./infrastructure/docker/docker-start.sh prod

# Standalone build
./infrastructure/docker/docker-build.sh production evc-admin:v1.0

# Clean everything
./infrastructure/docker/docker-start.sh clean
```

### **NX Build System**
```bash
# Full workspace build
npm run build

# Clean NX cache
npx nx reset

# Show dependency graph
npx nx graph
```

### **Notion Integration**
```bash
# Test Notion connection
cd tools/notion && npm run test

# Sync documentation with intelligent caching and full content conversion
cd tools/notion && npm run sync-docs

# Update project metrics
cd tools/notion && npm run update-kpis

# Analyze and sync comprehensive project structure
cd tools/notion && npm run analyze
```

## 📊 **Performance at a Glance**

| Feature | Performance | Benefit |
|---------|-------------|---------|
| **Build Speed** | 82% faster | Smart caching |
| **Docker Size** | ~617MB | Optimized layers |
| **Parallel Builds** | 3-5x faster | Concurrent execution |
| **Cache Hits** | 90%+ | Incremental builds |

## 🛠️ **Key Scripts**

### **Infrastructure Scripts**
- `./infrastructure/docker/docker-start.sh dev` - Development mode (hot reload)
- `./infrastructure/docker/docker-start.sh prod` - Production deployment
- `./infrastructure/docker/docker-build.sh` - Build Docker images
- `npm run build` - Full NX workspace build
- `npx nx reset` - Clean NX cache

### **Component Development**
- Components use **Atomic Design System** in `apps/admin-web/src/shared/ui/`
- **Atoms**: Basic building blocks (✅ GlowOrb, 🔄 AccentDot, IconContainer)
- **Molecules**: Simple combinations (StatValue, TrendIndicator)
- **Organisms**: Complex components (StatCard, RouteTransition)

```typescript
// Example: Using atomic components (GlowOrb now available!)
import { GlowOrb } from '@/shared/ui';

// Basic usage
<GlowOrb variant="blue" size="lg" animated />

// Advanced configuration
<GlowOrb 
  variant="emerald" 
  size="md" 
  intensity="strong" 
  blur="lg"
  animated
  animationSpeed={1.5}
  animationDelay={200}
  position="background"
/>

// Future: Full atomic composition
<StatCard variant="blue" size="lg">
  <StatCard.Background>
    <GlowOrb variant="blue" animated />
    <AccentDot position="top-right" />
  </StatCard.Background>
  <StatCard.Content>
    <StatValue value="1,234" title="Active Sessions" />
  </StatCard.Content>
</StatCard>
```

### **Notion Integration Scripts**
- `cd tools/notion && npm run test` - Test API connection
- `cd tools/notion && npm run sync-docs` - Sync documentation with full content conversion
- `cd tools/notion && npm run update-kpis` - Update project metrics
- `cd tools/notion && npm run explore` - Explore database contents

## 🔗 **Quick Access**

- **Admin Panel**: http://localhost:3000
- **NX Graph**: `npx nx graph`
- **Notion Workspace**: Connected to 4 production databases
- **Documentation**: Auto-synced to Notion Engineering Docs

## 📚 **Full Documentation**

- **[Complete NX Guide](./README_NX_OPTIMIZATION.md)** - Detailed NX optimization
- **[Docker Guide](./README_DOCKER.md)** - Docker setup and deployment
- **[Main README](./README.md)** - Full project documentation

---

**Tech Stack**: Next.js 15 + React 19 + NX + Docker
**Status**: ✅ Production ready with NX optimization
**Performance**: 80%+ build improvement with smart caching 