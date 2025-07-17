# 🎯 Linear API Automation Tools

Automated setup for EV Charging Multi-Repo Migration workspace in Linear using APIs.

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

### **Notion Integration**
```javascript
// Sync documentation
const notionIntegration = {
  database_id: "your-notion-database-id",
  sync_fields: [
    "project_roadmap",
    "team_documentation", 
    "release_notes",
    "architecture_decisions"
  ]
};
```

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