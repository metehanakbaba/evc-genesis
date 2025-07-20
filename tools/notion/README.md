# 🚀 EV Charging Admin - Notion Integration

Simple, focused Notion integration for project management and documentation sync.

## 🎯 Overview

This integration works with your existing 4 Notion databases:

- **Issue Tracking** - Project issues and tasks
- **Engineering Docs** - Documentation management
- **Goals Tracker** - KPIs and metrics
- **Projects** - Project management

## ⚡ Quick Start

### 1. Install Dependencies

```bash
cd tools/notion
npm install
```

### 2. Test Connection

```bash
npm run test
```

### 3. Sync Documentation

```bash
npm run sync-docs
```

## 📋 Available Commands

### Connection & Setup

```bash
npm run test          # Test API connection and database access
npm run explore       # Explore database contents and schemas
```

### Documentation Sync

```bash
npm run sync-docs     # Sync docs/ folder to Engineering Docs database
```

### Metrics & KPIs

```bash
npm run update-kpis   # Update Goals Tracker with current metrics
```

### Project Management

```bash
npm run analyze-projects  # Analyze and sync comprehensive project structure
npm run project-report    # Generate detailed project status report
```

## 🗂️ Database Configuration

The integration is pre-configured with your existing database IDs:

```javascript
databases: {
  issueTracking: '21c0c129-40cf-8066-967a-d82ad57cfe5f',
  engineeringDocs: '2180c129-40cf-8068-920d-c37c7f4a1ee0',
  goalsTracker: '2180c129-40cf-80c0-b957-d70bdc1357ce',
  projects: '2180c129-40cf-80c6-9431-e89a1ea27890'
}
```

## 🔄 Documentation Sync

The sync process:

1. **Scans documentation files** with comprehensive metadata collection (modification times, file sizes, paths)
2. **Intelligent sync caching** - Only processes files that have changed since last sync
3. **Smart change detection** - Compares timestamps, file sizes, and Notion page existence
4. Extracts title from first heading or filename
5. **Converts markdown content to Notion blocks** with comprehensive processing
6. Categorizes based on filename patterns
7. Creates or updates pages in Engineering Docs database **with complete content**
8. **Replaces existing page content** with fresh markdown conversion
9. **Updates persistent sync cache** to track processed files
10. **Reports detailed sync statistics** including files processed vs skipped

### Enhanced Content Conversion Features
- ✅ **Full Content Sync Implementation** → Complete markdown-to-Notion block conversion now active
- ✅ **Enhanced File Metadata Tracking** → Comprehensive collection of file modification times, sizes, and paths
- ✅ **Intelligent Sync Caching** → Persistent cache system avoids unnecessary API calls for unchanged files
- ✅ **Performance Optimization** → Only syncs modified files based on timestamps, size changes, and page existence
- ✅ **Smart Content Processing** → Auto-truncates content to respect Notion API limits (2000 chars per block)
- ✅ **Headings** (H1, H2, H3) → Notion heading blocks with intelligent length management
- ✅ **Paragraphs** → Notion paragraph blocks with auto-truncation at logical boundaries
- ✅ **Code Block Intelligence** → Large code blocks automatically split with continuation markers
- ✅ **Advanced Language Detection** → Code blocks preserve syntax highlighting from markdown
- ✅ **Smart Language Mapping** → Automatically maps unsupported languages (tsx, jsx, sh, vue, etc.) to Notion-compatible equivalents
- ✅ **Bullet Lists** → Notion bulleted list items with smart content limits
- ✅ **Content Replacement System** → Updates existing pages with fresh content while preserving metadata
- ✅ **Batch Processing** → Handles large documents with 100-block API batching
- ✅ **Smart Chunking** → Splits content at logical boundaries to preserve formatting
- ✅ **Enhanced Sync Reporting** → Detailed statistics with file sizes (KB), block counts, modification dates, and sync reasons

### Auto-categorization Rules

- Files with `EXPO`, `MOBILE` → Mobile
- Files with `DOCKER`, `DEPLOY` → Deployment
- Files with `ARCHITECTURE`, `ENTERPRISE` → Architecture
- Files with `API` → API
- Files with `ROADMAP`, `PLAN` → Planning
- Default → Development

## 🎯 KPI Tracking

Automatically tracks project metrics with corrected database schema:

- **TypeScript Errors**: Quality metric tracking compilation issues
- **Documentation Files**: Count of markdown documentation files
- **Dependencies**: Production and development dependency counts
- **Applications**: Number of apps in the monorepo
- **Shared Packages**: Count of shared library packages
- **Build Performance**: Overall build system performance metrics

### KPI Status Calculation
- **Completed**: Target achieved or exceeded
- **In Progress**: 50-80% of target (or within acceptable range)
- **At Risk**: Below 50% of target (or exceeding limits for negative metrics)
- **Not Started**: No progress toward target

### Priority Assignment
- **P1-High**: Quality metrics (TypeScript errors, code coverage)
- **P2-Medium**: Performance metrics (build speed, bundle size)
- **P3-Low**: Development metrics (dependency counts, documentation)

## 📊 Project Analysis

Comprehensive project structure analysis and portfolio management:

### Features
- **10+ Major Projects**: Analyzes complete project portfolio including Core Platform, Mobile App, Infrastructure, Security, and more
- **Multi-Category Organization**: Automatically categorizes projects by Frontend, Backend, Mobile, DevOps, Infrastructure, and Documentation
- **Budget & Timeline Tracking**: Tracks project budgets (total: $260K+), start dates, and completion percentages
- **Progress Monitoring**: Real-time progress tracking with current vs target values
- **Status Management**: Monitors project status (Planning, In Progress, Done, Not Started)
- **Priority Assessment**: Assigns priority levels (High, Medium, Low) based on project importance and impact
- **Rich Descriptions**: AI-generated project summaries with technical details and current status
- **Component Mapping**: Links projects to their corresponding codebase components and directories

### Project Categories
- **🏗️ Infrastructure**: Multi-repo strategy, enterprise architecture
- **🌐 Frontend**: Core platform, design system, UI components
- **📱 Mobile**: Expo integration, React Native development
- **🔧 DevOps**: Docker optimization, Notion integration, monitoring
- **🔒 Backend**: API development, security, authentication
- **📚 Documentation**: Knowledge base, API docs, user guides

### Portfolio Summary
The analysis provides comprehensive portfolio insights:
- **Total Projects**: 10+ major initiatives
- **Total Budget**: $260,000+ across all projects
- **Average Progress**: 70%+ completion rate
- **Active Projects**: 7 currently in progress
- **Completed Projects**: 2 fully delivered (Notion Integration, Docker Optimization)

## 🔧 Configuration

Edit `config.js` to modify:

- API key (if needed)
- Database IDs (if changed)
- Sync settings
- File paths

## 🚨 Troubleshooting

### Connection Issues

```bash
# Check API key validity
npm run test

# Common fixes:
# 1. Verify API key is active
# 2. Check integration workspace access
# 3. Ensure databases are shared with integration
```

### Sync Issues

```bash
# Check database permissions
npm run explore

# Verify file paths exist
ls -la ../../docs/
```

## 📊 Usage Examples

### Basic Workflow

```bash
# 1. Test everything works
npm run test

# 2. Sync documentation
npm run sync-docs

# 3. Update metrics
npm run update-kpis

# 4. Explore results
npm run explore
```

### Integration with Development

```bash
# After updating docs
npm run sync-docs

# After completing features
npm run update-kpis
```

## 🎉 Success Indicators

✅ **Setup Complete When:**

- Connection test passes
- All 4 databases are accessible
- Documentation sync works
- KPI updates succeed

✅ **Daily Workflow Ready When:**

- Docs auto-sync on changes
- Metrics update regularly
- Team can access updated Notion workspace

---

**🚀 Ready to sync! Your Notion workspace is now integrated.**
