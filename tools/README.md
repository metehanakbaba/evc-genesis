# 🛠️ Development Tools & API Automation

Comprehensive toolset for EV Charging project automation including Linear workspace setup and Notion API integration.

## 🚀 Quick Setup (5 minutes)

### 1. Get Linear API Key
1. Go to [Linear Settings → API](https://linear.app/settings/api)
2. Create a new Personal API Key
3. Copy the key (starts with `lin_api_`)

### 2. Install & Configure
```bash
cd tools
npm install
cp .env.example .env
# Edit .env and add your LINEAR_API_KEY
```

### 3. Run Automated Setup
```bash
export LINEAR_API_KEY="lin_api_your_key_here"
npm run setup
```

**That's it!** Your Linear workspace will be fully configured in ~2 minutes.

---

## 📋 What Gets Created Automatically

### ✅ **6 Teams**
- 🏢 **Platform Team** (PLATFORM) - Infrastructure & orchestration
- 🌐 **Web Team** (WEB) - Next.js web app
- 📱 **Mobile Team** (MOBILE) - Expo mobile app  
- 🔗 **API Team** (API) - Shared APIs & types
- 🏪 **State Team** (STATE) - Redux & business logic
- 🎨 **Design Team** (DESIGN) - UI components & tokens

### ✅ **16 Labels**
**Scope**: single-repo, cross-repo, ecosystem-wide  
**Impact**: breaking-change, feature, bugfix, docs  
**Platform**: web, mobile, shared, infrastructure  
**Priority**: P0-ecosystem, P1-breaking, P2-feature, P3-nice

### ✅ **4 Projects**
- 🚀 **Multi-Repo Migration** (8 weeks)
- 📱 **Expo 53 Enhancement** (4 weeks)
- 🔗 **Cross-Repo Integration** (6 weeks)
- 📊 **Enterprise Monitoring** (10 weeks)

### ✅ **4 Milestones**
- 🏗️ **Foundation** (Week 1-2)
- 🚀 **Repository Split** (Week 3-4)
- 🔗 **Submodule Integration** (Week 5-6)
- 📊 **Enterprise Integration** (Week 7-8)

### ✅ **3 Initial Tasks**
- 🏢 Create 10 Enterprise Repositories
- 🔧 Develop Git History Preservation Scripts
- 📱 Verify Expo 53 Compatibility

---

## 🔧 Available APIs

### **1. Linear GraphQL API**
```javascript
// Direct GraphQL queries
const { LinearClient } = require('@linear/sdk');
const linear = new LinearClient({ apiKey: process.env.LINEAR_API_KEY });

// Create team
await linear.teamCreate({
  name: "Platform Team",
  key: "PLATFORM",
  description: "Infrastructure team"
});

// Create issue
await linear.issueCreate({
  title: "Setup repositories",
  teamId: teamId,
  priority: 1
});
```

### **2. Linear REST API**
```bash
# Using curl
curl -X POST https://api.linear.app/graphql \
  -H "Authorization: Bearer $LINEAR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"query": "mutation { teamCreate(input: {...}) { team { id } } }"}'
```

### **3. Linear Webhooks**
```javascript
// Setup webhooks for automation
const webhook = await linear.webhookCreate({
  url: "https://your-app.com/webhook",
  label: "EV Charging Automation",
  resourceTypes: ["Issue", "Project"]
});
```

---

## 🤖 Advanced Automation

### **GitHub Integration**
```javascript
// Auto-sync with GitHub repos
const githubIntegration = {
  repositories: [
    "your-org/evc-admin-web",
    "your-org/evc-admin-mobile",
    // ... all 10 repos
  ],
  automation: {
    "pr_opened": "create_linear_issue",
    "pr_merged": "update_issue_status",
    "issue_created": "sync_to_linear"
  }
};
```

### **Slack Integration**
```javascript
// Notify teams on Linear updates
const slackIntegration = {
  channels: {
    "platform-team": "#platform-dev",
    "web-team": "#web-dev", 
    "mobile-team": "#mobile-dev"
  },
  triggers: [
    "issue_created",
    "issue_completed",
    "project_milestone_reached"
  ]
};
```

### **Notion Production Integration**
```javascript
// Production Notion integration with live databases
const { notionHelpers, NOTION_CONFIG } = require('./notion/config');

// Test connection to production databases
await notionHelpers.testConnection();

// Sync documentation to Engineering Docs database
await syncDocumentationToNotion();

// Update KPIs in Goals Tracker database
await updateKPIs();
```

**Production Integration:**
```bash
cd tools/notion
npm install
npm run test        # Test connection to 4 production databases
npm run sync-docs   # Sync docs/ folder to Notion
npm run update-kpis # Update project metrics
npm run explore     # Explore database contents
```

**API Testing & Development:**
```bash
cd tools/notion-test
npm install
npm test  # Test API capabilities and explore workspace
```

---

## 🔗 Notion Production Integration

### **Overview**
The `tools/notion` directory contains the production-ready Notion integration that connects to 4 live databases in your Notion workspace. This integration provides automated documentation sync, KPI tracking, and project management capabilities.

### **Connected Databases**
1. **Issue Tracking** (`21c0c129-40cf-8066-967a-d82ad57cfe5f`)
   - Project issues and task management
   - GitHub integration for issue tracking
   - Status and priority management

2. **Engineering Docs** (`2180c129-40cf-8068-920d-c37c7f4a1ee0`)
   - Centralized documentation hub
   - Auto-sync from `docs/` folder
   - Categorized by document type (Architecture, API, Mobile, etc.)

3. **Goals Tracker** (`2180c129-40cf-80c0-b957-d70bdc1357ce`)
   - KPI and metrics tracking
   - Progress monitoring and reporting
   - Automated metric collection from codebase

4. **Projects** (`2180c129-40cf-80c6-9431-e89a1ea27890`)
   - High-level project planning
   - Team assignment and progress tracking
   - Repository and milestone management

### **Available Commands**
```bash
cd tools/notion

# Test connection and database access
npm run test

# Sync all documentation from docs/ folder
npm run sync-docs

# Update project metrics and KPIs
npm run update-kpis

# Explore database contents and schemas
npm run explore
```

### **Automated Features**
- **Documentation Sync**: Automatically converts and syncs all `.md` files from `docs/` to Engineering Docs database
- **KPI Collection**: Gathers project metrics including TypeScript errors, code coverage, build performance
- **Smart Categorization**: Auto-categorizes documents based on filename patterns
- **Progress Tracking**: Calculates and updates goal progress percentages
- **Error Handling**: Robust error handling with retry logic and clear error messages

### **Integration Workflow**
```javascript
// Daily development workflow
await notionHelpers.testConnection();           // Verify connectivity
await syncDocumentationToNotion();             // Sync latest docs
await updateKPIs();                             // Update project metrics
```

### **Configuration**
The integration is pre-configured with your workspace settings in `config.js`:
```javascript
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

---

## 🧪 Notion API Testing Tool

### **Overview**
The `tools/notion-test` directory contains a comprehensive Notion API testing utility that helps you:
- Test API connection and authentication
- Explore available databases and pages in your workspace
- Understand database schemas and properties
- Validate permissions and capabilities

### **Features**
- ✅ **Connection Testing**: Verify API key and workspace access
- ✅ **Database Discovery**: List all accessible databases with schemas
- ✅ **Page Exploration**: Browse pages and their content structure
- ✅ **Permission Validation**: Check what operations are available
- ✅ **Capability Assessment**: Understand API limits and possibilities

### **Quick Start**
```bash
# Navigate to the testing tool
cd tools/notion-test

# Install dependencies
npm install

# Run comprehensive API test
npm test

# Expected output:
# 🧪 Testing Notion API Capabilities...
# 1️⃣ Testing connection...
# ✅ Connected as: [Your Name]
# 2️⃣ Searching for databases...
# ✅ Found X databases
# 3️⃣ Searching for pages...
# ✅ Found X pages
# ... and more detailed analysis
```

### **What Gets Tested**
1. **Basic Authentication**: Validates API key and user permissions
2. **Database Access**: Lists all databases you can read/write
3. **Page Access**: Shows available pages and their hierarchy
4. **Schema Analysis**: Examines database properties and types
5. **Operation Permissions**: Tests what CRUD operations are possible
6. **Content Reading**: Verifies ability to read page blocks and content

### **Configuration**
Update the API key in `test-api.js`:
```javascript
const NOTION_API_KEY = "your-notion-api-key-here";
```

### **Integration with Project Specs**
This testing tool supports the implementation of:
- **Notion Integration System** (`.kiro/specs/notion-integration-system/`)
- **Documentation Sync System** (`.kiro/specs/documentation-sync-system/`)

The test results help determine what databases and pages are available for:
- Project management and issue tracking
- Documentation synchronization
- KPI and metrics tracking
- Team collaboration workflows

---

## 📊 Custom Scripts

### **Bulk Task Creation**
```bash
# Create all 12 migration tasks
npm run create-tasks
```

### **Team Assignment**
```bash
# Assign tasks to team members
node scripts/assign-tasks.js --team=platform --assignee=john@company.com
```

### **Progress Reporting**
```bash
# Generate progress report
node scripts/generate-report.js --project=migration --format=json
```

### **Dependency Mapping**
```bash
# Map task dependencies
node scripts/map-dependencies.js --milestone=foundation
```

---

## 🔍 API Examples

### **Create Cross-Repo Issue**
```javascript
const crossRepoIssue = await linear.issueCreate({
  title: "🔗 Update shared API types",
  description: `
## Affected Repositories
- [ ] evc-shared-api
- [ ] evc-shared-types  
- [ ] evc-admin-web
- [ ] evc-admin-mobile

## Coordination Required
This change affects multiple repositories and requires coordinated deployment.
  `,
  teamId: platformTeamId,
  projectId: migrationProjectId,
  labelIds: [crossRepoLabelId, breakingChangeLabelId],
  priority: 1
});
```

### **Create Milestone with Tasks**
```javascript
const milestone = await linear.projectMilestoneCreate({
  projectId: migrationProjectId,
  name: "🏗️ Foundation",
  targetDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
});

// Create tasks for milestone
const tasks = [
  { title: "Setup repositories", estimate: 3 },
  { title: "Migration scripts", estimate: 2 },
  { title: "Expo verification", estimate: 1 }
];

for (const task of tasks) {
  await linear.issueCreate({
    ...task,
    projectMilestoneId: milestone.projectMilestone.id
  });
}
```

### **Bulk Label Creation**
```javascript
const labelCategories = {
  scope: ["single-repo", "cross-repo", "ecosystem-wide"],
  priority: ["P0-ecosystem", "P1-breaking", "P2-feature", "P3-nice"],
  platform: ["web", "mobile", "shared", "infrastructure"]
};

for (const [category, labels] of Object.entries(labelCategories)) {
  for (const label of labels) {
    await linear.issueLabelCreate({
      name: label,
      color: getColorForCategory(category),
      description: `${category} label: ${label}`
    });
  }
}
```

---

## 🚨 Troubleshooting

### **Common Issues**

**API Key Invalid**
```bash
# Test your API key
curl -H "Authorization: Bearer $LINEAR_API_KEY" \
     https://api.linear.app/graphql \
     -d '{"query": "{ viewer { id name } }"}'
```

**Rate Limiting**
```javascript
// Add delays between API calls
await new Promise(resolve => setTimeout(resolve, 500));
```

**Team Creation Fails**
```javascript
// Check if team key already exists
const existingTeams = await linear.teams();
const exists = existingTeams.nodes.find(t => t.key === "PLATFORM");
```

### **Validation Scripts**
```bash
# Verify workspace setup
node scripts/validate-setup.js

# Check API connectivity  
node scripts/test-api.js

# Verify all teams created
node scripts/check-teams.js
```

---

## 🎯 Next Steps After Setup

1. **Invite Team Members**
   ```bash
   node scripts/invite-members.js --team=platform --emails=dev1@company.com,dev2@company.com
   ```

2. **Configure GitHub Integration**
   - Go to Linear Settings → Integrations → GitHub
   - Connect your repositories
   - Enable automatic issue linking

3. **Setup Slack Notifications**
   - Install Linear Slack app
   - Configure team channels
   - Set notification preferences

4. **Start Development**
   - Begin with Task 1.1: Create 10 Enterprise Repositories
   - Use Linear to track progress
   - Coordinate cross-repo changes

---

## 📈 Success Metrics

After API setup, you should have:
- ✅ 6 teams with clear ownership
- ✅ 16 labels for proper categorization  
- ✅ 4 projects with timelines
- ✅ 4 milestones with target dates
- ✅ 3 initial tasks ready to start
- ✅ Automated workflow ready

**Total setup time: ~5 minutes** 🚀

**Ready to start your multi-repo migration!**