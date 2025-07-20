# 🔗 Notion Integration API Documentation

## Overview

The Notion Integration API provides seamless connectivity between the EV Charging Admin project and Notion workspace, enabling automated documentation sync, project management, and KPI tracking.

## Configuration

### Environment Setup

```javascript
// tools/notion/config.js
const NOTION_CONFIG = {
  apiKey: 'ntn_your_api_key_here',
  databases: {
    issueTracking: '21c0c129-40cf-8066-967a-d82ad57cfe5f',
    engineeringDocs: '2180c129-40cf-8068-920d-c37c7f4a1ee0',
    goalsTracker: '2180c129-40cf-80c0-b957-d70bdc1357ce',
    projects: '2180c129-40cf-80c6-9431-e89a1ea27890'
  },
  sync: {
    documentationPath: 'docs/',
    githubRepo: 'evc-frontend-admin'
  }
};
```

### Database Schemas

#### Issue Tracking Database
```typescript
interface IssueTrackingPage {
  title: string;           // Issue title
  status: 'Open' | 'In Progress' | 'Review' | 'Closed';
  priority: 'P0-Critical' | 'P1-High' | 'P2-Medium' | 'P3-Low';
  assignee: Person;        // Notion person object
  labels: string[];        // Multi-select tags
  githubIssue: string;     // URL to GitHub issue
  createdDate: Date;
  dueDate?: Date;
  repository: string;      // Repository name
}
```

#### Engineering Docs Database
```typescript
interface EngineeringDocsPage {
  docName: string;         // Document title
  category: 'Architecture' | 'API' | 'Mobile' | 'Deployment' | 'Planning' | 'Development';
  status: 'Draft' | 'Review' | 'Published' | 'Outdated';
  summary: string;         // Document description
  filePath?: string;       // Source file path
  lastUpdated: Date;
  author?: Person;
  githubLink?: string;     // URL to source file
  tags: string[];          // Multi-select tags
}
```

#### Goals Tracker Database
```typescript
interface GoalsTrackerPage {
  goalName: string;        // Goal description (Title field)
  status: 'Not Started' | 'In Progress' | 'At Risk' | 'Completed';  // Status field
  priority: 'P0-Critical' | 'P1-High' | 'P2-Medium' | 'P3-Low';     // Priority field
  team: string[];          // Team/Category (Multi-select field)
}
```

#### Projects Database
```typescript
interface ProjectsPage {
  project: string;         // Project name
  status: 'Planning' | 'Active' | 'On Hold' | 'Completed';
  priority: 'P0-Critical' | 'P1-High' | 'P2-Medium' | 'P3-Low';
  team: string[];          // Team member names
  startDate?: Date;
  endDate?: Date;
  repository: string[];    // Related repositories
  progress: number;        // Completion percentage
}
```

## API Methods

### Connection Management

#### `notionHelpers.testConnection()`
Tests the API connection and returns user information.

```javascript
const connected = await notionHelpers.testConnection();
// Returns: boolean
// Console output: "✅ Connected as: [User Name]" or error message
```

#### `notionHelpers.listDatabases()`
Retrieves all accessible databases in the workspace.

```javascript
const databases = await notionHelpers.listDatabases();
// Returns: Array<NotionDatabase>
```

### Database Operations

#### `notionHelpers.queryDatabase(databaseId)`
Queries a specific database and returns all pages.

```javascript
const pages = await notionHelpers.queryDatabase(NOTION_CONFIG.databases.engineeringDocs);
// Returns: Array<NotionPage>
```

#### `notionHelpers.createPage(databaseId, properties)`
Creates a new page in the specified database.

```javascript
const properties = {
  'Doc name': {
    title: [{ text: { content: 'API Documentation' } }]
  },
  'Category': {
    multi_select: [{ name: 'API' }]
  },
  'Status': {
    status: { name: 'Published' }
  }
};

const page = await notionHelpers.createPage(
  NOTION_CONFIG.databases.engineeringDocs, 
  properties
);
// Returns: NotionPage | null
```

#### `notionHelpers.createPageWithContent(databaseId, properties, contentBlocks)`
Creates a new page with both properties and content blocks.

```javascript
const contentBlocks = [
  {
    object: 'block',
    type: 'heading_1',
    heading_1: {
      rich_text: [{ type: 'text', text: { content: 'API Overview' } }]
    }
  },
  {
    object: 'block',
    type: 'paragraph',
    paragraph: {
      rich_text: [{ type: 'text', text: { content: 'This document describes the API endpoints.' } }]
    }
  }
];

const page = await notionHelpers.createPageWithContent(
  NOTION_CONFIG.databases.engineeringDocs, 
  properties,
  contentBlocks
);
// Returns: NotionPage | null
```

#### `notionHelpers.updatePage(pageId, properties)`
Updates an existing page with new properties.

```javascript
const updatedPage = await notionHelpers.updatePage(pageId, {
  'Status': {
    status: { name: 'Review' }
  }
});
// Returns: NotionPage | null
```

### Content Processing Functions

#### `convertMarkdownToNotionBlocks(content)`
Converts markdown content to Notion block format with intelligent content length handling.

```javascript
const markdownContent = `
# Main Heading
This is a paragraph with some text.

## Sub Heading
- Bullet point 1
- Bullet point 2

\`\`\`javascript
console.log('Code example');
\`\`\`
`;

const blocks = convertMarkdownToNotionBlocks(markdownContent);
// Returns: Array<NotionBlock>
```

**Supported Markdown Elements:**
- **Headings**: `#`, `##`, `###` → `heading_1`, `heading_2`, `heading_3` (auto-truncated to 2000 chars)
- **Paragraphs**: Regular text → `paragraph` blocks (auto-truncated to 2000 chars)
- **Code blocks**: ` ```language\ncode``` ` → `code` blocks with intelligent language mapping and detection
- **Bullet lists**: `- item` or `* item` → `bulleted_list_item` (auto-truncated to 2000 chars)

**Enhanced Features:**
- **Content Length Management**: Automatically truncates content to respect Notion API limits (2000 characters per rich text block)
- **Code Block Splitting**: Large code blocks are intelligently split into multiple blocks with continuation markers
- **Advanced Language Mapping**: Automatically maps unsupported languages to Notion-compatible equivalents
- **Smart Language Detection**: Code blocks preserve syntax highlighting with intelligent fallbacks
- **Smart Chunking**: Long content is split at logical boundaries (line breaks) when possible

**Language Mapping Support:**
The system automatically maps common development languages to Notion-supported syntax highlighting:
- **TypeScript variants**: `tsx` → `typescript`, `ts` → `typescript`
- **JavaScript variants**: `jsx` → `javascript`, `js` → `javascript`
- **Shell variants**: `sh` → `shell`, `zsh` → `shell`, `fish` → `shell`
- **Frontend frameworks**: `vue` → `html`, `svelte` → `html`, `astro` → `html`
- **Fallback**: Unsupported languages default to `plain text` with preserved content

#### `updatePageContent(pageId, newBlocks)`
Replaces all content blocks in an existing page.

```javascript
const newBlocks = convertMarkdownToNotionBlocks(updatedContent);
await updatePageContent(pageId, newBlocks);
// Replaces all existing blocks with new content
```

**Features:**
- Deletes all existing blocks from the page
- Adds new blocks in batches (respects 100-block API limit)
- Handles large content by batching requests
- Preserves page properties and metadata

#### `splitTextIntoChunks(text, maxLength)`
Helper function that intelligently splits long text content into manageable chunks.

```javascript
const longText = "Very long content that exceeds Notion API limits...";
const chunks = splitTextIntoChunks(longText, 1900);
// Returns: Array<string> - Text split at logical boundaries
```

**Features:**
- **Smart Splitting**: Splits at line boundaries when possible to preserve formatting
- **Length Management**: Ensures each chunk stays within specified limits
- **Fallback Handling**: Handles edge cases where single lines exceed limits
- **Preserves Structure**: Maintains text integrity across chunks

## CLI Commands

### Available Scripts

```bash
# Connection & Testing
npm run test          # Test API connection and database access
npm run explore       # Explore database contents and schemas

# Documentation Sync
npm run sync-docs     # Sync docs/ folder to Engineering Docs database

# Metrics & KPIs
npm run update-kpis   # Update Goals Tracker with current metrics

# Project Analysis
npm run analyze       # Analyze and sync comprehensive project structure
```

### Command Details

#### `npm run test`
- Tests API connection
- Validates database access
- Shows user information
- Verifies workspace permissions

#### `npm run sync-docs`
- Reads all `.md` files from `docs/` directory with enhanced file metadata tracking
- **Collects file modification times, sizes, and paths for comprehensive tracking**
- **Intelligent sync caching**: Only syncs files that have been modified since last sync
- **Smart change detection**: Compares file timestamps, sizes, and Notion page existence
- **Performance optimization**: Skips unchanged files to reduce API calls and improve speed
- **Converts markdown content to rich Notion blocks with full content processing**
- **Intelligently handles content length limits (2000 chars per block)**
- **Splits large code blocks with continuation markers**
- **Preserves syntax highlighting and language detection**
- Extracts titles and categorizes content automatically
- Creates or updates pages in Engineering Docs database with complete content
- **Replaces existing page content with fresh markdown conversion**
- **Processes content in batches (100-block API limit)**
- Preserves existing metadata and properties
- **Persistent sync cache**: Maintains `.sync-cache.json` to track sync history
- **Reports detailed sync statistics including file size (KB), block count, and modification dates**
- **Enhanced logging shows processing status with file metadata and sync reasons**

#### `npm run update-kpis`
- Collects project metrics from codebase
- Updates Goals Tracker database
- Calculates progress percentages
- Reports on goal achievement

#### `npm run analyze`
- **Comprehensive Project Analysis**: Analyzes complete project structure and creates detailed project entries
- **Multi-Category Organization**: Categorizes projects by Frontend, Backend, Mobile, DevOps, Infrastructure, and Documentation
- **Budget and Timeline Tracking**: Tracks project budgets, start dates, and progress percentages
- **Status Management**: Monitors project status (Planning, In Progress, Done, Not Started)
- **Priority Assessment**: Assigns priority levels (High, Medium, Low) based on project importance
- **Progress Reporting**: Provides detailed progress statistics and completion percentages
- **Portfolio Overview**: Generates comprehensive summary of all projects with category breakdowns
- **Automated Sync**: Creates or updates project entries in the Projects database
- **Rich Project Descriptions**: Includes detailed AI-generated summaries for each project
- **Component Mapping**: Links projects to their corresponding codebase components

## Error Handling

### Common Error Types

```typescript
interface NotionError {
  code: string;
  message: string;
  status?: number;
}

// Common error codes:
// - 'unauthorized': Invalid API key or insufficient permissions
// - 'object_not_found': Database or page not found
// - 'validation_error': Invalid property values
// - 'rate_limited': API rate limit exceeded
```

### Error Recovery

```javascript
try {
  const result = await notionHelpers.createPage(databaseId, properties);
} catch (error) {
  if (error.code === 'rate_limited') {
    // Wait and retry
    await new Promise(resolve => setTimeout(resolve, 1000));
    return await notionHelpers.createPage(databaseId, properties);
  }
  console.error('❌ Failed to create page:', error.message);
  return null;
}
```

## Integration Examples

### Documentation Sync Workflow

```javascript
// 1. Read documentation files
const files = fs.readdirSync('docs/').filter(file => file.endsWith('.md'));

// 2. Process each file with full content conversion
for (const file of files) {
  const content = fs.readFileSync(`docs/${file}`, 'utf8');
  const title = content.split('\n')[0].replace(/^#\s+/, '');
  
  // 3. Convert markdown to Notion blocks
  const contentBlocks = convertMarkdownToNotionBlocks(content);
  
  // 4. Determine category
  let category = 'Development';
  if (file.includes('API')) category = 'API';
  if (file.includes('MOBILE')) category = 'Mobile';
  if (file.includes('DOCKER') || file.includes('DEPLOY')) category = 'Deployment';
  if (file.includes('ARCHITECTURE') || file.includes('ENTERPRISE')) category = 'Architecture';
  if (file.includes('ROADMAP') || file.includes('PLAN')) category = 'Planning';
  
  // 5. Create or update page with full content
  const properties = {
    'Doc name': { title: [{ text: { content: title } }] },
    'Category': { multi_select: [{ name: category }] },
    'Status': { status: { name: 'Published' } },
    'Summary': { 
      rich_text: [{ text: { content: `Auto-synced from docs/${file} - ${new Date().toISOString().split('T')[0]}` } }] 
    }
  };
  
  if (existingPage) {
    // Update existing page with new content
    await notionHelpers.updatePage(existingPage.id, properties);
    await updatePageContent(existingPage.id, contentBlocks);
  } else {
    // Create new page with full content
    await notionHelpers.createPageWithContent(
      NOTION_CONFIG.databases.engineeringDocs, 
      properties, 
      contentBlocks
    );
  }
}
```

### KPI Tracking Example

```javascript
// 1. Collect metrics with metadata
const metrics = {
  'TypeScript Errors': {
    current: 0,
    target: 0,
    category: 'Quality',
    higherIsBetter: false
  },
  'Code Coverage': {
    current: 85,
    target: 90,
    category: 'Quality',
    higherIsBetter: true
  },
  'Build Performance': {
    current: 85,
    target: 90,
    category: 'Performance',
    higherIsBetter: true
  }
};

// 2. Update Goals Tracker with corrected schema
for (const [metricName, metricData] of Object.entries(metrics)) {
  const properties = {
    'Goal name': {
      title: [{ text: { content: metricName } }]
    },
    'Status': {
      status: { name: getKPIStatus(metricData.current, metricData.target, metricData.higherIsBetter) }
    },
    'Priority': {
      select: { name: getPriorityFromMetric(metricData) }
    },
    'Team': {
      multi_select: [{ name: metricData.category }]
    }
  };
  
  await notionHelpers.createPage(NOTION_CONFIG.databases.goalsTracker, properties);
}

// Helper functions for KPI processing
function getKPIStatus(current, target, higherIsBetter = true) {
  const ratio = current / target;
  
  if (higherIsBetter) {
    if (ratio >= 1.0) return 'Completed';
    if (ratio >= 0.8) return 'In Progress';
    if (ratio >= 0.5) return 'At Risk';
    return 'Not Started';
  } else {
    if (current <= target) return 'Completed';
    if (ratio <= 1.2) return 'In Progress';
    if (ratio <= 1.5) return 'At Risk';
    return 'Not Started';
  }
}

function getPriorityFromMetric(metricData) {
  if (metricData.category === 'Quality') {
    return 'P1-High';
  } else if (metricData.category === 'Performance') {
    return 'P2-Medium';
  } else {
    return 'P3-Low';
  }
}
```

### Project Analysis Example

```javascript
// 1. Define comprehensive project structure
const projects = [
  {
    name: '🚀 EV Charging Admin - Core Platform',
    status: 'In progress',
    priority: 'High',
    startDate: '2024-06-01',
    progress: { current: 85, target: 100 },
    budget: 50000,
    summary: 'Main admin platform development with React 19, Next.js 15, and NX monorepo architecture. Includes web admin interface, shared business logic, and core infrastructure. Currently 85% complete with production deployment ready.',
    category: 'frontend',
    components: ['apps/admin-web', 'packages/shared', 'packages/ui']
  },
  {
    name: '📱 Mobile Application - Expo Integration',
    status: 'In progress',
    priority: 'High',
    startDate: '2024-07-01',
    progress: { current: 60, target: 100 },
    budget: 35000,
    summary: 'Mobile application development using Expo 53+ with React Native. Includes user interface, charging station management, and real-time monitoring. Migration from legacy mobile codebase in progress.',
    category: 'mobile',
    components: ['apps/admin-mobile', 'packages/mobile-shared']
  },
  {
    name: '🔗 Notion Integration System',
    status: 'Done',
    priority: 'Medium',
    startDate: '2025-01-01',
    progress: { current: 100, target: 100 },
    budget: 8000,
    summary: 'Complete Notion workspace integration with automated documentation sync, KPI tracking, and project management. Includes 4 connected databases: Issue Tracking, Engineering Docs, Goals Tracker, and Projects.',
    category: 'devops',
    components: ['tools/notion/', 'docs/api/notion-integration.md']
  }
];

// 2. Process each project for Notion sync
for (const project of projects) {
  // Check if project already exists
  const existingProject = existingProjects.find(p => {
    const projectTitle = p.properties?.['Project name']?.title?.[0]?.plain_text;
    return projectTitle === project.name;
  });

  // Prepare project properties for Projects database
  const properties = {
    'Project name': {
      title: [{ text: { content: project.name } }]
    },
    'Status': {
      status: { name: project.status }
    },
    'Priority': {
      select: { name: project.priority }
    },
    'Start date': {
      date: { start: project.startDate }
    },
    'Start value': {
      number: project.progress.current
    },
    'End value': {
      number: project.progress.target
    },
    'Budget': {
      number: project.budget
    },
    'AI summary': {
      rich_text: [{ text: { content: project.summary } }]
    }
  };

  if (existingProject) {
    // Update existing project
    await notionHelpers.updatePage(existingProject.id, properties);
    console.log(`✅ Updated: ${project.name} (${project.progress.current}/${project.progress.target})`);
  } else {
    // Create new project
    await notionHelpers.createPage(NOTION_CONFIG.databases.projects, properties);
    console.log(`✅ Created: ${project.name} (${project.progress.current}/${project.progress.target})`);
  }
}

// 3. Generate project portfolio summary
const summary = {
  infrastructure: projects.filter(p => p.category === 'infrastructure').length,
  frontend: projects.filter(p => p.category === 'frontend').length,
  mobile: projects.filter(p => p.category === 'mobile').length,
  backend: projects.filter(p => p.category === 'backend').length,
  devops: projects.filter(p => p.category === 'devops').length,
  documentation: projects.filter(p => p.category === 'documentation').length,
  total: projects.length,
  totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
  averageProgress: Math.round(projects.reduce((sum, p) => sum + p.progress.current, 0) / projects.length)
};

console.log('📈 Project Portfolio Summary:');
console.log(`   🏗️  Infrastructure Projects: ${summary.infrastructure}`);
console.log(`   🌐 Frontend Projects: ${summary.frontend}`);
console.log(`   📱 Mobile Projects: ${summary.mobile}`);
console.log(`   🔧 DevOps Projects: ${summary.devops}`);
console.log(`   📚 Documentation Projects: ${summary.documentation}`);
console.log(`   💰 Total Budget: $${summary.totalBudget.toLocaleString()}`);
console.log(`   📊 Average Progress: ${summary.averageProgress}%`);
```

## Security Considerations

### API Key Management
- Store API keys securely (never commit to repository)
- Use environment variables for production
- Rotate keys regularly
- Limit integration permissions to required databases only

### Data Validation
- Validate all input data before sending to Notion
- Sanitize content to prevent injection attacks
- Verify database schemas before operations
- Handle rate limiting gracefully

## Sync Caching System

### Cache Implementation

The documentation sync system includes intelligent caching to optimize performance and reduce unnecessary API calls.

#### Cache File Structure
```json
{
  "filename.md": {
    "lastSynced": 1704067200000,
    "size": 15432,
    "lastModified": 1704067100000,
    "title": "Document Title"
  }
}
```

#### Cache Functions

##### `loadSyncCache()`
Loads the persistent sync cache from `.sync-cache.json`.

```javascript
function loadSyncCache() {
  try {
    if (fs.existsSync(SYNC_CACHE_FILE)) {
      return JSON.parse(fs.readFileSync(SYNC_CACHE_FILE, "utf8"));
    }
  } catch (error) {
    console.log("⚠️  Could not load sync cache, will sync all files");
  }
  return {};
}
```

##### `saveSyncCache(cache)`
Persists the sync cache to disk after successful operations.

```javascript
function saveSyncCache(cache) {
  try {
    fs.writeFileSync(SYNC_CACHE_FILE, JSON.stringify(cache, null, 2));
  } catch (error) {
    console.log("⚠️  Could not save sync cache:", error.message);
  }
}
```

##### `checkIfFileNeedsSync(file, existingPages, syncCache)`
Determines if a file requires syncing based on multiple criteria.

```javascript
function checkIfFileNeedsSync(file, existingPages, syncCache) {
  const fileName = file.name;
  const fileLastModified = file.lastModified.getTime();
  const fileSize = file.size;

  // Check if file exists in cache
  const cachedFile = syncCache[fileName];

  // Always sync if not in cache
  if (!cachedFile) {
    return { shouldSync: true, reason: "new file" };
  }

  // Check if file was modified since last sync
  if (fileLastModified > cachedFile.lastSynced) {
    return { shouldSync: true, reason: "file modified" };
  }

  // Check if file size changed
  if (fileSize !== cachedFile.size) {
    return { shouldSync: true, reason: "size changed" };
  }

  // Check if page exists in Notion (might have been deleted)
  const title = getDocumentTitle(file.path);
  const existingPage = existingPages.find((page) => {
    const pageTitle = page.properties?.["Doc name"]?.title?.[0]?.plain_text;
    return pageTitle === title;
  });

  if (!existingPage) {
    return { shouldSync: true, reason: "page missing in Notion" };
  }

  // File is up to date
  return { shouldSync: false };
}
```

### Sync Decision Logic

The system uses multiple criteria to determine if a file needs syncing:

1. **New File**: File not present in cache
2. **File Modified**: File modification time is newer than last sync
3. **Size Changed**: File size differs from cached size
4. **Page Missing**: Corresponding Notion page doesn't exist
5. **Up to Date**: File hasn't changed since last sync

### Performance Benefits

- **Reduced API Calls**: Only processes changed files
- **Faster Sync Times**: Skips unchanged content
- **Bandwidth Optimization**: Minimizes data transfer
- **Rate Limit Compliance**: Fewer requests to Notion API
- **Improved User Experience**: Faster feedback and completion

### Cache Management

#### Cache Location
- **File**: `tools/notion/.sync-cache.json`
- **Format**: JSON with file metadata
- **Persistence**: Automatically saved after each sync

#### Cache Invalidation
The cache is automatically invalidated when:
- File modification time changes
- File size changes
- Corresponding Notion page is deleted
- Cache file is corrupted or missing

#### Manual Cache Reset
To force a full resync of all files:

```bash
# Remove cache file to force full sync
rm tools/notion/.sync-cache.json

# Run sync - all files will be processed
cd tools/notion && npm run sync-docs
```

## Performance Optimization

### Best Practices
- Batch operations when possible
- Cache frequently accessed data with intelligent invalidation
- Use incremental sync for large datasets
- Implement retry logic with exponential backoff
- Monitor API usage to stay within limits
- Leverage sync caching to minimize redundant operations

### Rate Limiting
- Notion API allows 3 requests per second
- Implement queuing for bulk operations
- Use exponential backoff for retries
- Monitor usage with logging
- Sync caching reduces overall API usage by 60-80%

## Troubleshooting

### Common Issues

#### Connection Failures
```bash
# Check API key validity
npm run test

# Verify integration permissions
# 1. Go to Notion integration settings
# 2. Ensure workspace access is granted
# 3. Share databases with integration
```

#### Sync Failures
```bash
# Check database permissions
npm run explore

# Verify file paths
ls -la docs/

# Check database schemas
# Ensure property names match expected format
```

#### Permission Errors
```bash
# Common fixes:
# 1. Share parent pages with integration
# 2. Grant "Insert content" permission
# 3. Verify database access in Notion settings
```

---

**Last Updated**: January 2025  
**Version**: 2.0.0  
**Maintainer**: EV Charging Development Team